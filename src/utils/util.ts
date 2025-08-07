/**
 * assertNever ensures a branch of code can never be reached, and throws a
 * Typescript error if it can.
 */
export function assertNever(a: never): never {
  return a;
}

/**
 * isObject checks if a value is an object.
 */
export function isObject(val: unknown): val is object {
  return Boolean(val && typeof val === "object" && val.constructor === Object);
}

/**
 * isPromise returns whether the current value is a promise.
 */
export function isPromise<T = unknown>(val: unknown): val is Promise<T> {
  if (!val) {
    return false;
  }
  return typeof val === "object" && "then" in val;
}

/**
 * isArrayEqual does a shallow comparison of array contents to ensure they
 * are equal in value and order.
 */
export function isArrayEqual(a: any[], b: any[]): boolean {
  return a.length === b.length && a.every((val, i) => b[i] === val);
}

/**
 * arrayToObject converts a list of `Data` into an object of type
 * `{ [key: string]: Data }`, indexed by parameter `key`. `key`
 * is expected to be a unique identifier for each item in `Data`.
 */
export function arrayToObject<Data extends { [key: string]: any }>(
  data: Data[],
  key: keyof Data
): { [key: string]: Data } {
  return data.reduce(
    (prevMap, nextItem) => ({ ...prevMap, [nextItem[key]]: nextItem }),
    {}
  );
}

/**
 * reorder rearranges items in an array into a new order.
 */
export function reorder<T>(arr: T[], source: number, destination: number): T[] {
  const result = Array.from(arr);
  const [removed] = result.splice(source, 1);
  result.splice(destination, 0, removed);
  return result;
}

const has = Object.prototype.hasOwnProperty;

/**
 * deepEqual deeply compares two variables, returning whether or not they
 * are deeply equal. Note: this function does not support comparing Map/Set/
 * ArrayBuffer/TypedArray/DataView objects.
 *
 * Taken from: https://github.com/lukeed/dequal/blob/master/src/lite.js
 */
export function deepEqual(foo: any, bar: any): boolean {
  var ctor, len;
  if (foo === bar) return true;

  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();

    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && deepEqual(foo[len], bar[len]));
      }
      return len === -1;
    }

    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !deepEqual(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }

  // eslint-disable-next-line no-self-compare
  return foo !== foo && bar !== bar;
}

/**
 * countUniqueValues returns a list of the unique values of `key` in
 * `Data` along with the number of times each appeared. The output is
 * sorted by descending number of appearances.
 *
 * Output format: [unique value of key, number of times value appeared][]
 */
export function countUniqueValues<Data extends { [key: string]: any }>(
  data: Data[],
  key: string
): [string, number][] {
  const countsMap = data.reduce((prevMap, nextItem) => {
    const keyValue = nextItem[key];
    const keyCount = (prevMap[keyValue] || 0) + 1;
    return { ...prevMap, [keyValue]: keyCount };
  }, {} as { [key: string]: number });
  return Object.entries(countsMap).sort(([, a], [, b]) => b - a);
}

/**
 * noop is an empty function for use as a default value.
 */
export function noop() {}

/**
 * browserIsOnWindowsDevice returns true when admin panel is
 * being accessed from a windows device, otherwise false.
 */
export function browserIsOnWindowsDevice(): boolean {
  return window.navigator.userAgent.includes("Win");
}

/**
 * browserIsOnMacDevice returns true when admin panel is
 * being accessed from a macOS device, otherwise false.
 */
export function browserIsOnMacDevice(): boolean {
  return window.navigator.userAgent.includes("Mac");
}

/**
 * isExternalUrl returns whether or not a URL belongs to the admin console
 * or an outside domain/scope. If parsing the URL fails, this function returns
 * true, since it's safer to assume URLs are external.
 */
export function isExternalUrl(url: string) {
  try {
    const el = document.createElement("a");
    el.href = url;

    const isExternalDomain = el.host !== window.location.host;
    const isExternalPath = !el.pathname.startsWith("/admin/");

    return isExternalDomain || isExternalPath;
  } catch {
    return true;
  }
}

/**
 * isAlphanumeric returns whether the current string is alphanumeric.
 */
export function isAlphanumeric(str: string): boolean {
  const regex = /^[\dA-Za-z]+$/;
  return regex.test(str);
}

/**
 * isValidHex returns whether the current string is a valid hex string
 */
export function isValidHex(test: string): boolean {
  var regExp = /^[\dA-Fa-f]+?$/;
  return typeof test === "string" && regExp.test(test);
}

/**
 * isTailscaleIPv4 returns true when the ip matches
 * Tailnet's IPv4 format.
 */
export function isTailscaleIPv4(ip: string): boolean {
  // This isn't totally accurate, since the CGNAT
  // range that Tailscale uses doesn't include all
  // 100.x.y.z addresses, only 100.64-127.y.z.
  // But it's good enough to start.
  return ip.startsWith("100.");
}

/**
 * isTailscaleIPv6 returns true when the ip matches
 * Tailnet's IPv6 format.
 */
export function isTailscaleIPv6(ip: string): boolean {
  return ip.startsWith("fd7a:115c:a1e0");
}

/**
 * isIPv4 returns true when the ip matches
 * the IPv4 format. This does not validate that it is
 * a valid IPv4 string.
 */
export function isIPv4(ip: string): boolean {
  return ip.includes(".");
}

/**
 * isIPv6 returns true when the ip matches
 * the IPv6 format. This does not validate that it is
 * a valid IPv6 string.
 */
export function isIPv6(ip: string): boolean {
  return ip.includes(":");
}

/**
 * isDevInstance returns true when env.DEV is set to true
 */
export function isDevInstance(): boolean {
  return !!import.meta.env.DEV;
}

/**
 * isTestInstance returns true when running automated tests, such as from
 * Vitest.
 */
export function isTestInstance(): boolean {
  return !!import.meta.env.VITEST;
}

/**
 * serverUrl returns the URL for the current server instance.
 * e.g. https://login.tailscale.com
 */
export function serverUrl(): string {
  // TODO(adrian): Fetch this from control instead of using a fixed value.
  let host = "https://login.tailscale.com";
  if (isDevInstance()) {
    host = window.location.protocol + "//" + window.location.host;
  }
  return host;
}

export function isGithubOrg(domain: string): boolean {
  return domain.endsWith(".org.github");
}

/**
 * constructURLWithParams returns url string with the attached query parameters
 * e.g. constructURLWithParams("https://tailscale.com", { q: "search" }) => "https://tailscale.com?q=search"
 */
export function constructURLWithParams(
  url: string,
  params: Record<string, string | number | boolean | undefined>
): string {
  // Filter out undefined values
  const filteredParams = Object.entries(params).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value.toString();
      }
      return acc;
    },
    {}
  );

  // Construct query string if there are any filtered parameters
  const queryString =
    Object.keys(filteredParams).length > 0
      ? "?" + new URLSearchParams(filteredParams).toString()
      : "";

  return url + queryString;
}
