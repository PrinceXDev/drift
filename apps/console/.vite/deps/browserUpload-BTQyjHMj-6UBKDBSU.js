import {
  ClientError,
  Observable,
  ServerError,
  httpResponseFromFetch,
  parseJsonText
} from "./chunk-YG2ZALVI.js";
import "./chunk-6K7ISYVF.js";
import "./chunk-5WRI5ZAA.js";

// ../../node_modules/.pnpm/@sanity+client@8.6.2/node_modules/@sanity/client/dist/browserUpload-BTQyjHMj.js
function uploadWithProgress(options) {
  return new Observable((subscriber) => {
    let xhr = new XMLHttpRequest(), { url, method, headers, body, withCredentials, timeout, signal } = options;
    xhr.open(method, url), xhr.withCredentials = withCredentials, typeof timeout == "number" && timeout > 0 && (xhr.timeout = timeout);
    for (let [key, value] of Object.entries(headers)) xhr.setRequestHeader(key, value);
    xhr.upload.onprogress = (e) => {
      subscriber.next({
        type: "progress",
        stage: "upload",
        percent: e.lengthComputable ? Math.round(e.loaded / e.total * 100) : 0,
        total: e.total || void 0,
        loaded: e.loaded,
        lengthComputable: e.lengthComputable
      });
    }, xhr.onload = () => {
      if (xhr.status >= 400) {
        let errorHeaders = parseXhrResponseHeaders(xhr.getAllResponseHeaders()), canonical = httpResponseFromFetch({
          status: xhr.status,
          statusText: xhr.statusText,
          headers: errorHeaders,
          body: parseJsonText(xhr.responseText, errorHeaders),
          url: xhr.responseURL
        }, url, method);
        subscriber.error(xhr.status >= 500 ? new ServerError(canonical) : new ClientError(canonical));
        return;
      }
      let responseBody;
      try {
        responseBody = JSON.parse(xhr.responseText);
      } catch {
        subscriber.error(Error("Failed to parse upload response as JSON"));
        return;
      }
      subscriber.next({
        type: "response",
        body: responseBody
      }), subscriber.complete();
    }, xhr.onerror = () => {
      subscriber.error(Error("XHR upload network error"));
    }, xhr.ontimeout = () => {
      subscriber.error(new DOMException(`The operation timed out after ${timeout}ms while attempting to reach ${url}`, "TimeoutError"));
    }, xhr.onabort = () => {
      subscriber.error(new DOMException("Upload aborted", "AbortError"));
    };
    let onSignalAbort = () => xhr.abort();
    if (signal) {
      if (signal.aborted) {
        subscriber.error(new DOMException("Upload aborted", "AbortError"));
        return;
      }
      signal.addEventListener("abort", onSignalAbort, { once: true });
    }
    return xhr.send(body), () => {
      signal?.removeEventListener("abort", onSignalAbort), xhr.abort();
    };
  });
}
function parseXhrResponseHeaders(raw) {
  let headers = new Headers();
  for (let line of raw.split("\r\n")) {
    let separator = line.indexOf(":");
    if (!(separator <= 0)) try {
      headers.append(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
    } catch {
    }
  }
  return headers;
}
export {
  uploadWithProgress
};
//# sourceMappingURL=browserUpload-BTQyjHMj-6UBKDBSU.js.map
