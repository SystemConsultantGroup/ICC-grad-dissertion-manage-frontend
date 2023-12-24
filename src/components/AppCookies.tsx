/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

const stubSymbol = Symbol("cookieStubInfo");

interface StubInfo {
  data: Record<string, string>;
  writes: Map<string, { value: string } & Cookies.CookieAttributes>;
}
export function stubInfo(stubCookies: Cookies.CookiesStatic): StubInfo {
  return (stubCookies as any)[stubSymbol] as StubInfo;
}

function stubJsCookies(): Cookies.CookiesStatic {
  const info: StubInfo = {
    data: {},
    writes: new Map(),
  };
  return {
    [stubSymbol as never]: info,
    attributes: {},
    converter: {} as Required<Cookies.Converter<string>>,
    get: ((name?: string) => {
      if (name) {
        return info.data[name];
      }
      return info.data;
    }) as any,
    set(name, value, options) {
      info.writes.set(name, { value, ...options });
      return value; // not exact
    },
    remove(name, options) {
      info.writes.set(name, { value: "", expires: 0, ...options });
    },
    withAttributes(_attributes) {
      throw new Error("I'm lazy; if you need it implement yourself");
    },
    withConverter(_converter) {
      throw new Error("not supported");
    },
  } satisfies Cookies.CookiesStatic;
}

export const AppCookies: Cookies.CookiesStatic =
  typeof document !== "undefined" ? Cookies : stubJsCookies();
