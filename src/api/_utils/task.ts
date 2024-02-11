/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientAxios } from "../ClientAxios";
import { FileResponse } from "../_types/file";
import { API_ROUTES } from "../apiRoute";
import { uploadFile } from "./uploadFile";

export function atomicTask<Args extends unknown[]>(
  task: (task: AtomicTask, ...args: Args) => Promise<void>
): (...args: Args) => Promise<void> {
  return async (...args) => {
    const atomic = new AtomicTask();
    let error: any;
    try {
      await task.apply(null, [atomic, ...args]);
    } catch (e) {
      atomic._cancel();
      console.error(e);
      error = e;
    } finally {
      await atomic._complete(error);
    }
  };
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

  async atomicUploadFile(file: File): Promise<FileResponse> {
    return this.run(
      () => uploadFile(file),
      (result) => ClientAxios.delete(API_ROUTES.file.delete(result.uuid))
    );
  }
}

export type { AtomicTask };
