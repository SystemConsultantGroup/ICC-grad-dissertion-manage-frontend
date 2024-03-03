/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO: use something like AsyncLocalStorage; which is not available in browser...
let currentTask: AtomicTask | null = null;

export function transactionTask<Args extends unknown[]>(
  task: (task: AtomicTask, ...args: Args) => Promise<void>
): (...args: Args) => Promise<void> {
  return async (...args) => transaction(() => task.call(null, currentTask!, ...args));
}

export async function transaction<R>(block: () => R): Promise<R> {
  const previousAtomic = currentTask;
  const atomic = new AtomicTask();
  currentTask = atomic;
  let error: any;
  try {
    return await block();
  } catch (e) {
    atomic._cancel();
    console.error(e);
    error = e;
    throw e;
  } finally {
    await atomic._complete(error);
    currentTask = previousAtomic;
  }
}

class AtomicTask {
  private onReverts: (() => Promise<void>)[] = [];
  private onCompletes: ((error?: any) => void | Promise<void>)[] = [];

  async _cancel() {
    for (const onRevert of this.onReverts) {
      try {
        await onRevert();
      } catch (e) {
        console.error("error while cancelling AtomicTask:", e);
      }
    }
  }

  async _complete(error?: any) {
    for (const onComplete of this.onCompletes) {
      try {
        await onComplete(error);
      } catch (e) {
        console.error("error while onComplete of AtomicTask:", e);
      }
    }
  }

  async run<T>(task: () => Promise<T>, revert: (value: T) => Promise<void>): Promise<T> {
    const result = await task();
    this.onReverts.push(() => revert(result));
    return result;
  }

  onComplete(callback: (error?: any) => void | Promise<void>) {
    this.onCompletes.push(callback);
  }
}

export type { AtomicTask };

export async function transact<T>(
  task: () => Promise<T>,
  revert: (value: T) => Promise<void>
): Promise<T> {
  if (currentTask !== null) {
    return currentTask.run(task, revert);
  }
  return task();
}
