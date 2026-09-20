import {
  __exportAll,
  getDraftId,
  getPublishedId,
  getVersionFromId,
  getVersionId,
  isDraftId,
  isVersionId,
  stegaClean
} from "./chunk-TQF76M4J.js";
import {
  CorsOriginError,
  EMPTY,
  Observable,
  _defineProperty,
  anySignal,
  catchError,
  concat,
  defer,
  defineRequester,
  distinctUntilChanged,
  exhaustMap,
  filter,
  finalize,
  formatQueryParseError,
  fromEvent,
  isObservable,
  isQueryParseError,
  lastValueFrom,
  map,
  merge,
  mergeAll,
  mergeMap,
  of,
  share,
  shareReplay,
  skip,
  switchMap,
  takeWhile,
  tap,
  throwError,
  timer
} from "./chunk-YG2ZALVI.js";
import {
  isRecord
} from "./chunk-6K7ISYVF.js";

// ../../node_modules/.pnpm/@sanity+client@8.6.2/node_modules/@sanity/client/dist/config-CgJ16jET.js
function generateHelpUrl(slug) {
  return "https://www.sanity.io/help/" + slug;
}
var VALID_ASSET_TYPES = ["image", "file"];
var VALID_INSERT_LOCATIONS = [
  "before",
  "after",
  "replace"
];
var dataset = (name) => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name)) throw Error("Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters");
};
var projectId = (id) => {
  if (!/^[-a-z0-9]+$/i.test(id)) throw Error("`projectId` can only contain only a-z, 0-9 and dashes");
};
var validateAssetType = (type) => {
  if (VALID_ASSET_TYPES.indexOf(type) === -1) throw Error(`Invalid asset type: ${type}. Must be one of ${VALID_ASSET_TYPES.join(", ")}`);
};
var validateObject = (op, val) => {
  if (typeof val != "object" || !val || Array.isArray(val)) throw Error(`${op}() takes an object of properties`);
};
var validateDocumentId = (op, id) => {
  if (typeof id != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes("..")) throw Error(`${op}(): "${id}" is not a valid document ID`);
};
var requireDocumentId = (op, doc) => {
  if (!doc._id) throw Error(`${op}() requires that the document contains an ID ("_id" property)`);
  validateDocumentId(op, doc._id);
};
var validateDocumentType = (op, type) => {
  if (typeof type != "string") throw Error(`\`${op}()\`: \`${type}\` is not a valid document type`);
};
var requireDocumentType = (op, doc) => {
  if (!doc._type) throw Error(`\`${op}()\` requires that the document contains a type (\`_type\` property)`);
  validateDocumentType(op, doc._type);
};
var validateVersionIdMatch = (builtVersionId, document2) => {
  if (document2._id && document2._id !== builtVersionId) throw Error(`The provided document ID (\`${document2._id}\`) does not match the generated version ID (\`${builtVersionId}\`)`);
};
var validateInsert = (at, selector, items) => {
  let signature = "insert(at, selector, items)";
  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    let valid = VALID_INSERT_LOCATIONS.map((loc) => `"${loc}"`).join(", ");
    throw Error(`${signature} takes an "at"-argument which is one of: ${valid}`);
  }
  if (typeof selector != "string") throw Error(`${signature} takes a "selector"-argument which must be a string`);
  if (!Array.isArray(items)) throw Error(`${signature} takes an "items"-argument which must be an array`);
};
var hasDataset = (config) => {
  if (config.dataset) return config.dataset;
  let resource = config.resource;
  if (resource && resource.type === "dataset") {
    let segments = resource.id.split(".");
    if (segments.length !== 2) throw Error('Dataset resource ID must be in the format "project.dataset"');
    return segments[1];
  }
  throw Error("`dataset` must be provided to perform queries");
};
var requestTag = (tag) => {
  if (typeof tag != "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag)) throw Error("Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long.");
  return tag;
};
var resourceConfig = (config) => {
  let resource = config.resource;
  if (!resource) throw Error("`resource` must be provided to perform resource queries");
  let { type, id } = resource;
  switch (type) {
    case "dataset":
      if (id.split(".").length !== 2) throw Error('Dataset resource ID must be in the format "project.dataset"');
      return;
    case "dashboard":
    case "knowledge-base":
    case "media-library":
    case "canvas":
      return;
    default:
      throw Error(`Unsupported resource type: ${type.toString()}`);
  }
};
var resourceGuard = (service, config) => {
  if (config.resource) throw Error(`\`${service}\` does not support resource-based operations`);
};
function once(fn) {
  let didCall = false, returnValue;
  return (...args) => didCall ? returnValue : (returnValue = fn(...args), didCall = true, returnValue);
}
var createWarningPrinter = (message) => once((...args) => console.warn(message.join(" "), ...args));
var printCdnAndWithCredentialsWarning = createWarningPrinter(["Because you set `withCredentials` to true, we will override your `useCdn`", "setting to be false since (cookie-based) credentials are never set on the CDN"]);
var printCdnWarning = createWarningPrinter([
  "Since you haven't set a value for `useCdn`, we will deliver content using our",
  "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
  "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]);
var printCdnPreviewDraftsWarning = createWarningPrinter(["The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.", "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."]);
var printPreviewDraftsDeprecationWarning = createWarningPrinter(["The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"]);
var printBrowserTokenWarning = createWarningPrinter(["You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.", `See ${generateHelpUrl("js-client-browser-token")} for more information and how to hide this warning.`]);
var printCredentialedTokenWarning = createWarningPrinter(["You have configured Sanity client to use a token, but also provided `withCredentials: true`.", "This is no longer supported - only token will be used - remove `withCredentials: true`."]);
var printNoApiVersionSpecifiedWarning = createWarningPrinter(["Using the Sanity client without specifying an API version is deprecated.", `See ${generateHelpUrl("js-client-api-version")}`]);
var printNoDefaultExport = createWarningPrinter(["The default export of @sanity/client has been deprecated. Use the named export `createClient` instead."]);
var printCreateVersionWithBaseIdWarning = createWarningPrinter(["You have called `createVersion()` with a defined `document`.", "If you are creating a version of a document that already exists, prefer providing `baseId` and `releaseId` instead."]);
var printDeprecatedUriOptionWarning = createWarningPrinter(["The `uri` request option has been renamed to `url`.", "Please update your code to use `url` instead. Support for `uri` will be removed in a future version."]);
var printDeprecatedResourceConfigWarning = createWarningPrinter(["The `~experimental_resource` configuration property has been renamed to `resource`.", "Please update your client configuration to use `resource` instead. Support for `~experimental_resource` will be removed in a future version."]);
var defaultConfig = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: true,
  stega: { enabled: false }
};
var LOCALHOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0"
];
var isLocal = (host) => LOCALHOSTS.indexOf(host) !== -1;
function validateApiVersion(apiVersion) {
  if (apiVersion === "1" || apiVersion === "X") return;
  let apiDate = new Date(apiVersion);
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0)) throw Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
}
function validateApiPerspective(perspective) {
  if (Array.isArray(perspective) && perspective.length > 1 && perspective.includes("raw")) throw TypeError('Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives');
}
var initConfig = (config, prevConfig) => {
  let specifiedConfig = {
    ...prevConfig,
    ...config,
    stega: {
      ...typeof prevConfig.stega == "boolean" ? { enabled: prevConfig.stega } : prevConfig.stega || defaultConfig.stega,
      ...typeof config.stega == "boolean" ? { enabled: config.stega } : config.stega || {}
    }
  };
  specifiedConfig.apiVersion || printNoApiVersionSpecifiedWarning();
  let newConfig = {
    ...defaultConfig,
    ...specifiedConfig,
    apiHost: specifiedConfig.apiHost ?? defaultConfig.apiHost
  };
  newConfig["~experimental_resource"] && !newConfig.resource && (printDeprecatedResourceConfigWarning(), newConfig.resource = newConfig["~experimental_resource"]);
  let resourceConfig$1 = newConfig.resource, projectBased = newConfig.useProjectHostname && !resourceConfig$1;
  if (typeof Promise > "u") {
    let helpUrl = generateHelpUrl("js-client-promise-polyfill");
    throw Error(`No native Promise-implementation found, polyfill needed - see ${helpUrl}`);
  }
  if (projectBased && !newConfig.projectId) throw Error("Configuration must contain `projectId`");
  if (resourceConfig$1 && resourceConfig(newConfig), newConfig.perspective !== void 0 && validateApiPerspective(newConfig.perspective), "encodeSourceMap" in newConfig) throw Error("It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?");
  if ("encodeSourceMapAtPath" in newConfig) throw Error("It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?");
  if (typeof newConfig.stega.enabled != "boolean") throw Error(`stega.enabled must be a boolean, received ${newConfig.stega.enabled}`);
  if (newConfig.stega.enabled && newConfig.stega.studioUrl === void 0) throw Error("stega.studioUrl must be defined when stega.enabled is true");
  if (newConfig.stega.enabled && typeof newConfig.stega.studioUrl != "string" && typeof newConfig.stega.studioUrl != "function") throw Error(`stega.studioUrl must be a string or a function, received ${newConfig.stega.studioUrl}`);
  let isBrowser = typeof window < "u" && window.location && window.location.hostname, isLocalhost = isBrowser && isLocal(window.location.hostname), hasToken = !!newConfig.token;
  newConfig.withCredentials && hasToken && (printCredentialedTokenWarning(), newConfig.withCredentials = false), isBrowser && isLocalhost && hasToken && newConfig.ignoreBrowserTokenWarning !== true ? printBrowserTokenWarning() : newConfig.useCdn === void 0 && printCdnWarning(), projectBased && projectId(newConfig.projectId), newConfig.dataset && dataset(newConfig.dataset), "requestTagPrefix" in newConfig && (newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0), newConfig.apiVersion = `${newConfig.apiVersion}`.replace(/^v/, ""), newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost, newConfig.useCdn === true && newConfig.withCredentials && printCdnAndWithCredentialsWarning(), newConfig.useCdn = newConfig.useCdn !== false && !newConfig.withCredentials, validateApiVersion(newConfig.apiVersion);
  let hostParts = newConfig.apiHost.split("://", 2), protocol = hostParts[0], host = hostParts[1], cdnHost = newConfig.isDefaultApi ? "apicdn.sanity.io" : host;
  return projectBased ? (newConfig.url = `${protocol}://${newConfig.projectId}.${host}/v${newConfig.apiVersion}`, newConfig.cdnUrl = `${protocol}://${newConfig.projectId}.${cdnHost}/v${newConfig.apiVersion}`) : (newConfig.url = `${newConfig.apiHost}/v${newConfig.apiVersion}`, newConfig.cdnUrl = newConfig.url), newConfig;
};

// ../../node_modules/.pnpm/eventsource@5.1.1/node_modules/eventsource/dist/errors.js
var ErrorEvent = class extends Event {
  /**
   * HTTP status code, if this was triggered by an HTTP error
   * Note: this is not part of the spec, but is included for better error handling.
   *
   * @public
   */
  code;
  /**
   * Optional message attached to the error.
   * Note: this is not part of the spec, but is included for better error handling.
   *
   * @public
   */
  message;
  /**
   * Constructs a new `ErrorEvent` instance. This is typically not called directly,
   * but rather emitted by the `EventSource` object when an error occurs.
   *
   * @param type - The type of the event (should be "error")
   * @param errorEventInitDict - Optional properties to include in the error event
   */
  constructor(type, errorEventInitDict) {
    super(type);
    this.code = errorEventInitDict?.code ?? void 0;
    this.message = errorEventInitDict?.message ?? void 0;
  }
  /**
   * Node.js "hides" the `message` and `code` properties of the `ErrorEvent` instance,
   * when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
   * we explicitly include the properties in the `inspect` method.
   *
   * This is automatically called by Node.js when you `console.log` an instance of this class.
   *
   * @param _depth - The current depth
   * @param options - The options passed to `util.inspect`
   * @param inspect - The inspect function to use (prevents having to import it from `util`)
   * @returns A string representation of the error
   */
  [Symbol.for("nodejs.util.inspect.custom")](_depth, options, inspect) {
    return inspect(inspectableError(this), options);
  }
  /**
   * Deno "hides" the `message` and `code` properties of the `ErrorEvent` instance,
   * when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
   * we explicitly include the properties in the `inspect` method.
   *
   * This is automatically called by Deno when you `console.log` an instance of this class.
   *
   * @param inspect - The inspect function to use (prevents having to import it from `util`)
   * @param options - The options passed to `Deno.inspect`
   * @returns A string representation of the error
   */
  [Symbol.for("Deno.customInspect")](inspect, options) {
    return inspect(inspectableError(this), options);
  }
};
function syntaxError(message) {
  const DomException = globalThis.DOMException;
  if (typeof DomException === "function") {
    return new DomException(message, "SyntaxError");
  }
  return new SyntaxError(message);
}
function flattenError(err) {
  if (!(err instanceof Error)) {
    return `${err}`;
  }
  if ("errors" in err && Array.isArray(err.errors)) {
    return err.errors.map(flattenError).join(", ");
  }
  if ("cause" in err && err.cause instanceof Error) {
    return `${err}: ${flattenError(err.cause)}`;
  }
  return err.message;
}
function inspectableError(err) {
  return {
    type: err.type,
    message: err.message,
    code: err.code,
    defaultPrevented: err.defaultPrevented,
    cancelable: err.cancelable,
    timeStamp: err.timeStamp
  };
}

// ../../node_modules/.pnpm/eventsource-parser@4.1.1/node_modules/eventsource-parser/dist/errors.js
var ParseError = class extends Error {
  constructor(message, options) {
    super(message);
    this.name = "ParseError";
    this.type = options.type;
    this.field = options.field;
    this.value = options.value;
    this.line = options.line;
  }
};

// ../../node_modules/.pnpm/eventsource-parser@4.1.1/node_modules/eventsource-parser/dist/parse.js
var LF = 10;
var CR = 13;
var SPACE = 32;
var MAX_FIELD_PREFIX_LENGTH = 6;
function createParser(config) {
  if (typeof config === "function") {
    throw new TypeError("`config` must be an object, got a function instead. Did you mean `createParser({onEvent: fn})`?");
  }
  const { maxBufferSize, onComment, onError, onEvent, onId, onRetry } = config;
  const pendingFragments = [];
  let pendingFragmentsLength = 0;
  let bomPrefix = "";
  let id;
  let data = "";
  let dataLines = 0;
  let eventType;
  let terminated = false;
  let skippingLine = false;
  let skipNextLineFeed = false;
  function feed(chunk) {
    if (terminated) {
      throw new Error("Cannot feed parser: it was terminated after exceeding the configured max buffer size. Call `reset()` to resume parsing.");
    }
    if (bomPrefix !== void 0) {
      chunk = bomPrefix + chunk;
      if (chunk === "" || chunk === "ï" || chunk === "ï»") {
        bomPrefix = chunk;
        return;
      }
      bomPrefix = void 0;
      chunk = chunk.replace(/^(?:\uFEFF|\xEF\xBB\xBF)/, "");
    }
    if (skippingLine || skipNextLineFeed) {
      chunk = resumeAfterSkip(chunk);
      if (!chunk) {
        return;
      }
    }
    if (!pendingFragments.length) {
      const trailing = processLines(chunk);
      if (trailing !== "") {
        storeTrailing(trailing);
      }
      checkBufferSize();
      return;
    }
    if (chunk.indexOf("\n") === -1 && chunk.indexOf("\r") === -1) {
      if (pendingFragmentsLength < MAX_FIELD_PREFIX_LENGTH) {
        const head = pendingFragments.join("") + chunk.slice(0, MAX_FIELD_PREFIX_LENGTH - pendingFragmentsLength);
        if (!shouldBufferTrailing(head)) {
          pendingFragments.length = 0;
          pendingFragmentsLength = 0;
          skippingLine = true;
          return;
        }
      }
      pendingFragments.push(chunk);
      pendingFragmentsLength += chunk.length;
      checkBufferSize();
      return;
    }
    pendingFragments.push(chunk);
    const input = pendingFragments.join("");
    pendingFragments.length = 0;
    pendingFragmentsLength = 0;
    storeTrailing(processLines(input));
    checkBufferSize();
  }
  function resumeAfterSkip(chunk) {
    if (chunk.length === 0) {
      return chunk;
    }
    if (skipNextLineFeed) {
      skipNextLineFeed = false;
      return chunk.charCodeAt(0) === LF ? chunk.slice(1) : chunk;
    }
    const crIndex = chunk.indexOf("\r");
    const lfIndex = chunk.indexOf("\n");
    const lineEnd = crIndex === -1 ? lfIndex : lfIndex === -1 ? crIndex : crIndex < lfIndex ? crIndex : lfIndex;
    if (lineEnd === -1) {
      return "";
    }
    if (lineEnd === chunk.length - 1 && chunk.charCodeAt(lineEnd) === CR) {
      skippingLine = false;
      skipNextLineFeed = true;
      return "";
    }
    skippingLine = false;
    return chunk.slice(lineEnd + (chunk.charCodeAt(lineEnd) === CR && chunk.charCodeAt(lineEnd + 1) === LF ? 2 : 1));
  }
  function storeTrailing(trailing) {
    if (!trailing)
      return;
    if (trailing.charCodeAt(trailing.length - 1) === CR) {
      parseLine(trailing, 0, trailing.length - 1);
      skipNextLineFeed = true;
      return;
    }
    if (shouldBufferTrailing(trailing)) {
      pendingFragments.push(trailing);
      pendingFragmentsLength = trailing.length;
      return;
    }
    skippingLine = true;
  }
  function shouldBufferTrailing(trailing) {
    const firstCharCode = trailing.charCodeAt(0);
    return firstCharCode === 58 && !!onComment || firstCharCode === 100 && isPotentialField(trailing, "data") || firstCharCode === 101 && isPotentialField(trailing, "event") || firstCharCode === 105 && isPotentialField(trailing, "id") || firstCharCode === 114 && isPotentialField(trailing, "retry");
  }
  function checkBufferSize() {
    if (maxBufferSize === void 0)
      return;
    if (pendingFragmentsLength + data.length <= maxBufferSize)
      return;
    terminated = true;
    pendingFragments.length = 0;
    pendingFragmentsLength = 0;
    id = void 0;
    data = "";
    dataLines = 0;
    eventType = void 0;
    skippingLine = false;
    skipNextLineFeed = false;
    onError === null || onError === void 0 ? void 0 : onError(new ParseError(`Buffered data exceeded max buffer size of ${maxBufferSize} characters`, {
      type: "max-buffer-size-exceeded"
    }));
  }
  function processLines(chunk) {
    let searchIndex = 0;
    if (chunk.indexOf("\r") === -1) {
      let lfIndex = chunk.indexOf("\n", searchIndex);
      while (lfIndex !== -1) {
        if (searchIndex === lfIndex) {
          if (id !== void 0) {
            onId === null || onId === void 0 ? void 0 : onId(id);
          }
          if (dataLines > 0) {
            onEvent === null || onEvent === void 0 ? void 0 : onEvent({ id, event: eventType, data });
          }
          id = void 0;
          data = "";
          dataLines = 0;
          eventType = void 0;
          searchIndex = lfIndex + 1;
          lfIndex = chunk.indexOf("\n", searchIndex);
          continue;
        }
        const firstCharCode = chunk.charCodeAt(searchIndex);
        if (isDataPrefix(chunk, searchIndex, firstCharCode)) {
          const valueStart = chunk.charCodeAt(searchIndex + 5) === SPACE ? searchIndex + 6 : searchIndex + 5;
          const value = chunk.slice(valueStart, lfIndex);
          if (dataLines === 0 && chunk.charCodeAt(lfIndex + 1) === LF) {
            if (id !== void 0) {
              onId === null || onId === void 0 ? void 0 : onId(id);
            }
            onEvent === null || onEvent === void 0 ? void 0 : onEvent({ id, event: eventType, data: value });
            id = void 0;
            data = "";
            eventType = void 0;
            searchIndex = lfIndex + 2;
            lfIndex = chunk.indexOf("\n", searchIndex);
            continue;
          }
          data = dataLines === 0 ? value : `${data}
${value}`;
          dataLines++;
        } else if (isEventPrefix(chunk, searchIndex, firstCharCode)) {
          eventType = chunk.slice(chunk.charCodeAt(searchIndex + 6) === SPACE ? searchIndex + 7 : searchIndex + 6, lfIndex) || void 0;
        } else {
          parseLine(chunk, searchIndex, lfIndex);
        }
        searchIndex = lfIndex + 1;
        lfIndex = chunk.indexOf("\n", searchIndex);
      }
      return chunk.slice(searchIndex);
    }
    while (searchIndex < chunk.length) {
      const crIndex = chunk.indexOf("\r", searchIndex);
      const lfIndex = chunk.indexOf("\n", searchIndex);
      let lineEnd = -1;
      if (crIndex !== -1 && lfIndex !== -1) {
        lineEnd = crIndex < lfIndex ? crIndex : lfIndex;
      } else if (crIndex !== -1) {
        if (crIndex === chunk.length - 1) {
          lineEnd = -1;
        } else {
          lineEnd = crIndex;
        }
      } else if (lfIndex !== -1) {
        lineEnd = lfIndex;
      }
      if (lineEnd === -1) {
        break;
      }
      parseLine(chunk, searchIndex, lineEnd);
      searchIndex = lineEnd + 1;
      if (chunk.charCodeAt(searchIndex - 1) === CR && chunk.charCodeAt(searchIndex) === LF) {
        searchIndex++;
      }
    }
    return chunk.slice(searchIndex);
  }
  function parseLine(chunk, start, end) {
    if (start === end) {
      dispatchEvent();
      return;
    }
    const firstCharCode = chunk.charCodeAt(start);
    if (isDataPrefix(chunk, start, firstCharCode)) {
      const valueStart = chunk.charCodeAt(start + 5) === SPACE ? start + 6 : start + 5;
      const value2 = chunk.slice(valueStart, end);
      data = dataLines === 0 ? value2 : `${data}
${value2}`;
      dataLines++;
      return;
    }
    if (isEventPrefix(chunk, start, firstCharCode)) {
      eventType = chunk.slice(chunk.charCodeAt(start + 6) === SPACE ? start + 7 : start + 6, end) || void 0;
      return;
    }
    if (firstCharCode === 105 && chunk.charCodeAt(start + 1) === 100 && chunk.charCodeAt(start + 2) === 58) {
      const value2 = chunk.slice(chunk.charCodeAt(start + 3) === SPACE ? start + 4 : start + 3, end);
      if (!value2.includes("\0"))
        id = value2;
      return;
    }
    if (firstCharCode === 58) {
      if (onComment) {
        const line2 = chunk.slice(start, end);
        onComment(line2.slice(chunk.charCodeAt(start + 1) === SPACE ? 2 : 1));
      }
      return;
    }
    const line = chunk.slice(start, end);
    const fieldSeparatorIndex = line.indexOf(":");
    if (fieldSeparatorIndex === -1) {
      processField(line, "", line);
      return;
    }
    const field = line.slice(0, fieldSeparatorIndex);
    const offset = line.charCodeAt(fieldSeparatorIndex + 1) === SPACE ? 2 : 1;
    const value = line.slice(fieldSeparatorIndex + offset);
    processField(field, value, line);
  }
  function processField(field, value, line) {
    switch (field) {
      case "event":
        eventType = value || void 0;
        break;
      case "data":
        data = dataLines === 0 ? value : `${data}
${value}`;
        dataLines++;
        break;
      case "id":
        if (!value.includes("\0"))
          id = value;
        break;
      case "retry":
        if (/^\d+$/.test(value)) {
          onRetry === null || onRetry === void 0 ? void 0 : onRetry(parseInt(value, 10));
        } else {
          onError === null || onError === void 0 ? void 0 : onError(new ParseError(`Invalid \`retry\` value: "${value}"`, {
            type: "invalid-retry",
            value,
            line
          }));
        }
        break;
      default:
        onError === null || onError === void 0 ? void 0 : onError(new ParseError(`Unknown field "${field.length > 20 ? `${field.slice(0, 20)}…` : field}"`, { type: "unknown-field", field, value, line }));
        break;
    }
  }
  function dispatchEvent() {
    if (id !== void 0) {
      onId === null || onId === void 0 ? void 0 : onId(id);
    }
    if (dataLines > 0) {
      onEvent === null || onEvent === void 0 ? void 0 : onEvent({
        id,
        event: eventType,
        data
      });
    }
    id = void 0;
    data = "";
    dataLines = 0;
    eventType = void 0;
  }
  function reset(options = {}) {
    if (options.consume && pendingFragments.length > 0) {
      const incompleteLine = pendingFragments.join("");
      parseLine(incompleteLine, 0, incompleteLine.length);
    }
    bomPrefix = "";
    id = void 0;
    data = "";
    dataLines = 0;
    eventType = void 0;
    pendingFragments.length = 0;
    pendingFragmentsLength = 0;
    terminated = false;
    skippingLine = false;
    skipNextLineFeed = false;
  }
  return { feed, reset };
}
function isDataPrefix(chunk, i, firstCharCode) {
  return firstCharCode === 100 && chunk.charCodeAt(i + 1) === 97 && chunk.charCodeAt(i + 2) === 116 && chunk.charCodeAt(i + 3) === 97 && chunk.charCodeAt(i + 4) === 58;
}
function isEventPrefix(chunk, i, firstCharCode) {
  return firstCharCode === 101 && chunk.charCodeAt(i + 1) === 118 && chunk.charCodeAt(i + 2) === 101 && chunk.charCodeAt(i + 3) === 110 && chunk.charCodeAt(i + 4) === 116 && chunk.charCodeAt(i + 5) === 58;
}
function isPotentialField(line, field) {
  let i = 1;
  while (i < line.length && i < field.length) {
    if (line.charCodeAt(i) !== field.charCodeAt(i)) {
      return false;
    }
    i++;
  }
  return line.length <= field.length || line.charCodeAt(field.length) === 58;
}

// ../../node_modules/.pnpm/eventsource@5.1.1/node_modules/eventsource/dist/EventSource.js
var DEFAULT_MAX_BUFFER_SIZE = 100 * 1024 * 1024;
var EventSourceImpl = class extends EventTarget {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSED = 2;
  CONNECTING = 0;
  OPEN = 1;
  CLOSED = 2;
  get readyState() {
    return this.#readyState;
  }
  get url() {
    return this.#url.href;
  }
  get withCredentials() {
    return this.#withCredentials;
  }
  get onerror() {
    return this.#onError;
  }
  set onerror(value) {
    if (this.#onError) {
      this.removeEventListener("error", this.#onError);
    }
    this.#onError = value;
    if (value) {
      this.addEventListener("error", value);
    }
  }
  get onmessage() {
    return this.#onMessage;
  }
  set onmessage(value) {
    if (this.#onMessage) {
      this.removeEventListener("message", this.#onMessage);
    }
    this.#onMessage = value;
    if (value) {
      this.addEventListener("message", value);
    }
  }
  get onopen() {
    return this.#onOpen;
  }
  set onopen(value) {
    if (this.#onOpen) {
      this.removeEventListener("open", this.#onOpen);
    }
    this.#onOpen = value;
    if (value) {
      this.addEventListener("open", value);
    }
  }
  addEventListener(type, listener, options) {
    const listen = listener;
    super.addEventListener(type, listen, options);
  }
  removeEventListener(type, listener, options) {
    const listen = listener;
    super.removeEventListener(type, listen, options);
  }
  constructor(url, eventSourceInitDict) {
    super();
    try {
      if (url instanceof URL) {
        this.#url = url;
      } else if (typeof url === "string") {
        this.#url = new URL(url, getBaseURL());
      } else {
        throw new Error("Invalid URL");
      }
    } catch {
      throw syntaxError("An invalid or illegal string was specified");
    }
    this.#parser = createParser({
      maxBufferSize: eventSourceInitDict?.maxBufferSize ?? DEFAULT_MAX_BUFFER_SIZE,
      onEvent: this.#onEvent,
      onError: this.#onParseError,
      onId: this.#onIdChange,
      onRetry: this.#onRetryChange
    });
    this.#readyState = this.CONNECTING;
    this.#reconnectInterval = 3e3;
    this.#fetch = eventSourceInitDict?.fetch ?? globalThis.fetch;
    this.#withCredentials = eventSourceInitDict?.withCredentials ?? false;
    this.#connect();
  }
  close() {
    if (this.#reconnectTimer)
      clearTimeout(this.#reconnectTimer);
    if (this.#readyState === this.CLOSED)
      return;
    if (this.#controller)
      this.#controller.abort();
    this.#readyState = this.CLOSED;
    this.#controller = void 0;
  }
  // PRIVATES FOLLOW
  /**
   * Current connection state
   *
   * @internal
   */
  #readyState;
  /**
   * Original URL used to connect.
   *
   * Note that this will stay the same even after a redirect.
   *
   * @internal
   */
  #url;
  /**
   * The destination URL after a redirect. Is reset on reconnection.
   *
   * @internal
   */
  #redirectUrl;
  /**
   * Whether to include credentials in the request
   *
   * @internal
   */
  #withCredentials;
  /**
   * The fetch implementation to use
   *
   * @internal
   */
  #fetch;
  /**
   * The reconnection time in milliseconds
   *
   * @internal
   */
  #reconnectInterval;
  /**
   * Reference to an ongoing reconnect attempt, if any
   *
   * @internal
   */
  #reconnectTimer;
  /**
   * The last event ID seen by the EventSource, which will be sent as `Last-Event-ID` in the
   * request headers on a reconnection attempt.
   *
   * @internal
   */
  #lastEventId = null;
  /**
   * The AbortController instance used to abort the fetch request
   *
   * @internal
   */
  #controller;
  /**
   * Instance of an EventSource parser (`eventsource-parser` npm module)
   *
   * @internal
   */
  #parser;
  /**
   * Holds the current error handler, attached through `onerror` property directly.
   * Note that `addEventListener('error', …)` will not be stored here.
   *
   * @internal
   */
  #onError = null;
  /**
   * Holds the current message handler, attached through `onmessage` property directly.
   * Note that `addEventListener('message', …)` will not be stored here.
   *
   * @internal
   */
  #onMessage = null;
  /**
   * Holds the current open handler, attached through `onopen` property directly.
   * Note that `addEventListener('open', …)` will not be stored here.
   *
   * @internal
   */
  #onOpen = null;
  /**
   * Connect to the given URL and start receiving events
   *
   * @internal
   */
  #connect() {
    this.#readyState = this.CONNECTING;
    this.#controller = new AbortController();
    const fetch = this.#fetch;
    fetch(this.#url, this.#getRequestOptions()).then(this.#onFetchResponse).catch(this.#onFetchError);
  }
  /**
   * Handles the fetch response
   *
   * @param response - The Fetch(ish) response
   * @internal
   */
  #onFetchResponse = async (response) => {
    this.#parser.reset();
    const { body, redirected, status, headers } = response;
    if (status === 204) {
      this.#failConnection("Server sent HTTP 204, not reconnecting", 204);
      this.close();
      return;
    }
    if (redirected) {
      this.#redirectUrl = new URL(response.url);
    } else {
      this.#redirectUrl = void 0;
    }
    if (status !== 200) {
      this.#failConnection(`Non-200 status code (${status})`, status);
      return;
    }
    const contentType = headers.get("content-type") || "";
    if (!contentType.startsWith("text/event-stream")) {
      this.#failConnection('Invalid content type, expected "text/event-stream"', status);
      return;
    }
    if (this.#readyState === this.CLOSED) {
      return;
    }
    this.#readyState = this.OPEN;
    const openEvent = new Event("open");
    this.dispatchEvent(openEvent);
    if (typeof body !== "object" || !body || !("getReader" in body)) {
      this.#failConnection("Invalid response body, expected a web ReadableStream", status);
      this.close();
      return;
    }
    const decoder = new TextDecoder();
    const reader = body.getReader();
    let open = true;
    do {
      const { done, value } = await reader.read();
      if (this.#readyState === this.CLOSED) {
        open = false;
        break;
      }
      if (value) {
        this.#parser.feed(decoder.decode(value, { stream: !done }));
      }
      if (!done) {
        continue;
      }
      open = false;
      this.#parser.reset();
      this.#scheduleReconnect();
    } while (open);
  };
  /**
   * Handles rejected requests for the EventSource endpoint
   *
   * @param err - The error from `fetch()`
   * @internal
   */
  #onFetchError = (err) => {
    this.#controller = void 0;
    if (err.name === "AbortError" || err.type === "aborted") {
      return;
    }
    this.#scheduleReconnect(flattenError(err));
  };
  /**
   * Get request options for the `fetch()` request
   *
   * @returns The request options
   * @internal
   */
  #getRequestOptions() {
    const lastEvent = this.#lastEventId ? { "Last-Event-ID": this.#lastEventId } : void 0;
    const init = {
      // [spec] Let `corsAttributeState` be `Anonymous`…
      // [spec] …will have their mode set to "cors"…
      mode: "cors",
      redirect: "follow",
      headers: { Accept: "text/event-stream", ...lastEvent },
      cache: "no-store",
      signal: this.#controller?.signal
    };
    if ("window" in globalThis) {
      init.credentials = this.withCredentials ? "include" : "same-origin";
    }
    return init;
  }
  /**
   * Called by EventSourceParser when a blank line ends a block containing a valid `id` field.
   * This runs before `#onEvent` when the same block also contains data.
   *
   * @param value - The value of the `id` field
   * @internal
   */
  #onIdChange = (value) => {
    this.#lastEventId = value;
  };
  /**
   * Called by EventSourceParser instance when an event has successfully been parsed
   * and is ready to be processed.
   *
   * @param event - The parsed event
   * @internal
   */
  #onEvent = (event) => {
    const origin = this.#redirectUrl ? this.#redirectUrl.origin : this.#url.origin;
    const lastEventId = this.#lastEventId ?? "";
    const messageEvent = new MessageEvent(event.event || "message", {
      data: event.data,
      origin,
      lastEventId
    });
    if (messageEvent.origin !== origin) {
      defineEventProperty(messageEvent, "origin", origin);
    }
    if (messageEvent.lastEventId !== lastEventId) {
      defineEventProperty(messageEvent, "lastEventId", lastEventId);
    }
    this.dispatchEvent(messageEvent);
  };
  /**
   * Called by EventSourceParser instance when a new reconnection interval is received
   * from the EventSource endpoint.
   *
   * @param value - The new reconnection interval in milliseconds
   * @internal
   */
  #onRetryChange = (value) => {
    this.#reconnectInterval = value;
  };
  /**
   * Called by EventSourceParser instance when a parse error occurs.
   *
   * @param error - The parser error
   * @internal
   */
  #onParseError = (error) => {
    if (error.type !== "max-buffer-size-exceeded") {
      return;
    }
    this.close();
    this.#failConnection(error.message);
  };
  /**
   * Handles the process referred to in the EventSource specification as "failing a connection".
   *
   * @param error - The error causing the connection to fail
   * @param code - The HTTP status code, if available
   * @internal
   */
  #failConnection(message, code) {
    if (this.#readyState !== this.CLOSED) {
      this.#readyState = this.CLOSED;
    }
    const errorEvent = new ErrorEvent("error", { code, message });
    this.dispatchEvent(errorEvent);
  }
  /**
   * Schedules a reconnection attempt against the EventSource endpoint.
   *
   * @param message - The error causing the connection to fail
   * @param code - The HTTP status code, if available
   * @internal
   */
  #scheduleReconnect(message, code) {
    if (this.#readyState === this.CLOSED) {
      return;
    }
    this.#readyState = this.CONNECTING;
    const errorEvent = new ErrorEvent("error", { code, message });
    this.dispatchEvent(errorEvent);
    const timer2 = setTimeout(this.#reconnect, this.#reconnectInterval);
    if (typeof timer2 === "object" && timer2 !== null && "unref" in timer2) {
      timer2.unref();
    }
    this.#reconnectTimer = timer2;
  }
  /**
   * Reconnects to the EventSource endpoint after a disconnect/failure
   *
   * @internal
   */
  #reconnect = () => {
    this.#reconnectTimer = void 0;
    if (this.#readyState !== this.CONNECTING) {
      return;
    }
    this.#connect();
  };
};
Object.defineProperty(EventSourceImpl, "name", { value: "EventSource" });
Object.defineProperty(EventSourceImpl, Symbol.for("eventsource.supports-fetch-override"), {
  value: true,
  writable: false,
  configurable: false,
  enumerable: false
});
var EventSource = EventSourceImpl;
function getBaseURL() {
  const doc = "document" in globalThis ? globalThis.document : void 0;
  return doc && typeof doc === "object" && "baseURI" in doc && typeof doc.baseURI === "string" ? doc.baseURI : void 0;
}
function defineEventProperty(event, property, value) {
  Object.defineProperty(event, property, {
    value,
    enumerable: true,
    configurable: true
  });
}

// ../../node_modules/.pnpm/@sanity+client@8.6.2/node_modules/@sanity/client/dist/index.js
var ConnectionFailedError = class extends Error {
  constructor(message, options = {}) {
    let { status, ...errorOptions } = options;
    super(message, errorOptions), _defineProperty(this, "name", "ConnectionFailedError"), _defineProperty(this, "status", void 0), this.status = status;
  }
};
var DisconnectError = class extends Error {
  constructor(message, reason, options = {}) {
    super(message, options), _defineProperty(this, "name", "DisconnectError"), _defineProperty(this, "reason", void 0), this.reason = reason;
  }
};
var ChannelError = class extends Error {
  constructor(message, data) {
    super(message), _defineProperty(this, "name", "ChannelError"), _defineProperty(this, "data", void 0), this.data = data;
  }
};
var MessageError = class extends Error {
  constructor(message, data, options = {}) {
    super(message, options), _defineProperty(this, "name", "MessageError"), _defineProperty(this, "data", void 0), this.data = data;
  }
};
var MessageParseError = class extends Error {
  constructor(..._args) {
    super(..._args), _defineProperty(this, "name", "MessageParseError");
  }
};
var REQUIRED_EVENTS = ["channelError", "disconnect"];
function connectEventSource(initEventSource, events) {
  return defer(() => {
    let es = initEventSource();
    return isObservable(es) ? es : of(es);
  }).pipe(mergeMap((es) => connectWithESInstance(es, events)));
}
function connectWithESInstance(es, events) {
  return new Observable((observer) => {
    let requestedEvents = new Set(events), isRequestedEvent = (type) => requestedEvents.has(type), emitOpen = isRequestedEvent("open");
    function onError(evt) {
      if ("data" in evt) {
        let [parseError, event] = parseEvent(evt);
        observer.error(parseError || !event ? new MessageParseError("Unable to parse EventSource error message", { cause: parseError }) : new MessageError(isRecord(event.data) && typeof event.data.message == "string" ? event.data.message : "", event));
        return;
      }
      if (evt.code !== void 0) {
        observer.error(new ConnectionFailedError("EventSource connection failed", { status: evt.code }));
        return;
      }
      if (es.readyState === es.CLOSED) observer.error(new ConnectionFailedError("EventSource connection failed"));
      else {
        let type = "reconnect";
        isRequestedEvent(type) && observer.next({ type });
      }
    }
    function onOpen() {
      let type = "open";
      isRequestedEvent(type) && observer.next({ type });
    }
    function onMessage(message) {
      let [parseError, event] = parseEvent(message);
      if (parseError || !event) {
        observer.error(new MessageParseError("Unable to parse EventSource message", { cause: parseError }));
        return;
      }
      if (message.type === "channelError") {
        let tag = new URL(es.url).searchParams.get("tag");
        observer.error(new ChannelError(extractErrorMessage(event?.data, tag), event.data));
        return;
      }
      if (message.type === "disconnect") {
        observer.error(new DisconnectError(`Server disconnected client: ${isRecord(event.data) && typeof event.data.reason == "string" && event.data.reason || "unknown error"}`));
        return;
      }
      isRequestedEvent(message.type) && observer.next({
        type: message.type,
        id: message.lastEventId,
        ...event.data ? { data: event.data } : {}
      });
    }
    es.addEventListener("error", onError), emitOpen && es.addEventListener("open", onOpen);
    let cleanedEvents = [.../* @__PURE__ */ new Set([...REQUIRED_EVENTS, ...events])].filter((type) => type !== "error" && type !== "open" && type !== "reconnect");
    return cleanedEvents.forEach((type) => es.addEventListener(type, onMessage)), () => {
      es.removeEventListener("error", onError), emitOpen && es.removeEventListener("open", onOpen), cleanedEvents.forEach((type) => es.removeEventListener(type, onMessage)), es.close();
    };
  });
}
function parseEvent(message) {
  try {
    let data = typeof message.data == "string" && JSON.parse(message.data);
    return [null, {
      type: message.type,
      id: message.lastEventId,
      ...isEmptyObject(data) ? {} : { data }
    }];
  } catch (err) {
    return [err, null];
  }
}
function extractErrorMessage(err, tag) {
  let error = isRecord(err) ? err.error : void 0;
  if (!error) {
    let message = isRecord(err) ? err.message : void 0;
    return typeof message == "string" && message || "Unknown listener error";
  }
  if (isRecord(error)) {
    if (isQueryParseError(error)) return formatQueryParseError(error, tag);
    if (typeof error.description == "string") return error.description;
  }
  return typeof error == "string" ? error : JSON.stringify(error, null, 2);
}
function isEmptyObject(data) {
  for (let _ in data) return false;
  return true;
}
function getSelection(sel) {
  if (typeof sel == "string") return { id: sel };
  if (Array.isArray(sel)) return {
    query: "*[_id in $ids]",
    params: { ids: sel }
  };
  if (typeof sel == "object" && sel && "query" in sel && typeof sel.query == "string") return "params" in sel && typeof sel.params == "object" && sel.params !== null ? {
    query: sel.query,
    params: sel.params
  } : { query: sel.query };
  let selectionOpts = [
    "* Document ID (<docId>)",
    "* Array of document IDs",
    "* Object containing `query`"
  ].join("\n");
  throw Error(`Unknown selection - must be one of:

${selectionOpts}`);
}
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldInitSpec(e, t, a) {
  _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _assertClassBrand(e, t, n) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw TypeError("Private element is not present on this object");
}
function _classPrivateFieldSet2(s, a, r) {
  return s.set(_assertClassBrand(s, a), r), r;
}
function _classPrivateFieldGet2(s, a) {
  return s.get(_assertClassBrand(s, a));
}
var BasePatch = class {
  constructor(selection, operations = {}) {
    _defineProperty(this, "selection", void 0), _defineProperty(this, "operations", void 0), this.selection = selection, this.operations = operations;
  }
  /**
  * Sets the given attributes to the document. Does NOT merge objects.
  * The operation is added to the current patch, ready to be commited by `commit()`
  *
  * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
  */
  set(attrs) {
    return this._assign("set", attrs);
  }
  /**
  * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
  * The operation is added to the current patch, ready to be commited by `commit()`
  *
  * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
  */
  setIfMissing(attrs) {
    return this._assign("setIfMissing", attrs);
  }
  /**
  * Performs a "diff-match-patch" operation on the string attributes provided.
  * The operation is added to the current patch, ready to be commited by `commit()`
  *
  * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
  */
  diffMatchPatch(attrs) {
    return validateObject("diffMatchPatch", attrs), this._assign("diffMatchPatch", attrs);
  }
  /**
  * Unsets the attribute paths provided.
  * The operation is added to the current patch, ready to be commited by `commit()`
  *
  * @param attrs - Attribute paths to unset.
  */
  unset(attrs) {
    if (!Array.isArray(attrs)) throw Error("unset(attrs) takes an array of attributes to unset, non-array given");
    return this.operations = Object.assign({}, this.operations, { unset: attrs }), this;
  }
  /**
  * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
  *
  * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
  */
  inc(attrs) {
    return this._assign("inc", attrs);
  }
  /**
  * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
  *
  * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
  */
  dec(attrs) {
    return this._assign("dec", attrs);
  }
  /**
  * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
  *
  * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
  * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
  * @param items - Array of items to insert/replace
  */
  insert(at, selector, items) {
    return validateInsert(at, selector, items), this._assign("insert", {
      [at]: selector,
      items
    });
  }
  /**
  * Append the given items to the array at the given JSONPath
  *
  * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
  * @param items - Array of items to append to the array
  */
  append(selector, items) {
    return this.insert("after", `${selector}[-1]`, items);
  }
  /**
  * Prepend the given items to the array at the given JSONPath
  *
  * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
  * @param items - Array of items to prepend to the array
  */
  prepend(selector, items) {
    return this.insert("before", `${selector}[0]`, items);
  }
  /**
  * Change the contents of an array by removing existing elements and/or adding new elements.
  *
  * @param selector - Attribute or JSONPath expression for array
  * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
  * @param deleteCount - An integer indicating the number of old array elements to remove.
  * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
  */
  splice(selector, start, deleteCount, items) {
    let delAll = deleteCount === void 0 || deleteCount === -1, startIndex = start < 0 ? start - 1 : start, delCount = delAll ? -1 : Math.max(0, start + deleteCount), rangeSelector = `${selector}[${startIndex}:${startIndex < 0 && delCount >= 0 ? "" : delCount}]`;
    return this.insert("replace", rangeSelector, items || []);
  }
  /**
  * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
  *
  * @param rev - Revision to lock the patch to
  */
  ifRevisionId(rev) {
    return this.operations.ifRevisionID = rev, this;
  }
  /**
  * Return a plain JSON representation of the patch
  */
  serialize() {
    return {
      ...getSelection(this.selection),
      ...this.operations
    };
  }
  /**
  * Return a plain JSON representation of the patch
  */
  toJSON() {
    return this.serialize();
  }
  /**
  * Clears the patch of all operations
  */
  reset() {
    return this.operations = {}, this;
  }
  _assign(op, props, merge3 = true) {
    return validateObject(op, props), this.operations = Object.assign({}, this.operations, { [op]: Object.assign({}, merge3 && this.operations[op] || {}, props) }), this;
  }
  _set(op, props) {
    return this._assign(op, props, false);
  }
};
var _client$12 = /* @__PURE__ */ new WeakMap();
var ObservablePatch = class ObservablePatch2 extends BasePatch {
  constructor(selection, operations, client) {
    super(selection, operations), _classPrivateFieldInitSpec(this, _client$12, void 0), _classPrivateFieldSet2(_client$12, this, client);
  }
  /**
  * Clones the patch
  */
  clone() {
    return new ObservablePatch2(this.selection, { ...this.operations }, _classPrivateFieldGet2(_client$12, this));
  }
  commit(options) {
    if (!_classPrivateFieldGet2(_client$12, this)) throw Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");
    let returnFirst = typeof this.selection == "string", opts = Object.assign({
      returnFirst,
      returnDocuments: true
    }, options);
    return _classPrivateFieldGet2(_client$12, this).mutate({ patch: this.serialize() }, opts);
  }
};
var _client2$11 = /* @__PURE__ */ new WeakMap();
var Patch = class Patch2 extends BasePatch {
  constructor(selection, operations, client) {
    super(selection, operations), _classPrivateFieldInitSpec(this, _client2$11, void 0), _classPrivateFieldSet2(_client2$11, this, client);
  }
  /**
  * Clones the patch
  */
  clone() {
    return new Patch2(this.selection, { ...this.operations }, _classPrivateFieldGet2(_client2$11, this));
  }
  commit(options) {
    if (!_classPrivateFieldGet2(_client2$11, this)) throw Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");
    let returnFirst = typeof this.selection == "string", opts = Object.assign({
      returnFirst,
      returnDocuments: true
    }, options);
    return _classPrivateFieldGet2(_client2$11, this).mutate({ patch: this.serialize() }, opts);
  }
};
var defaultMutateOptions = { returnDocuments: false };
var BaseTransaction = class {
  constructor(operations = [], transactionId) {
    _defineProperty(this, "operations", void 0), _defineProperty(this, "trxId", void 0), this.operations = operations, this.trxId = transactionId;
  }
  /**
  * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
  * The operation is added to the current transaction, ready to be commited by `commit()`
  *
  * @param doc - Document to create. Requires a `_type` property.
  */
  create(doc) {
    return validateObject("create", doc), this._add({ create: doc });
  }
  /**
  * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
  * The operation is added to the current transaction, ready to be commited by `commit()`
  *
  * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
  */
  createIfNotExists(doc) {
    let op = "createIfNotExists";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
  * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
  * The operation is added to the current transaction, ready to be commited by `commit()`
  *
  * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
  */
  createOrReplace(doc) {
    let op = "createOrReplace";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
  * Deletes the document with the given document ID
  * The operation is added to the current transaction, ready to be commited by `commit()`
  *
  * @param documentId - Document ID to delete
  */
  delete(documentId) {
    return validateDocumentId("delete", documentId), this._add({ delete: { id: documentId } });
  }
  transactionId(id) {
    return id ? (this.trxId = id, this) : this.trxId;
  }
  /**
  * Return a plain JSON representation of the transaction
  */
  serialize() {
    return [...this.operations];
  }
  /**
  * Return a plain JSON representation of the transaction
  */
  toJSON() {
    return this.serialize();
  }
  /**
  * Clears the transaction of all operations
  */
  reset() {
    return this.operations = [], this;
  }
  _add(mut) {
    return this.operations.push(mut), this;
  }
};
var _client$11 = /* @__PURE__ */ new WeakMap();
var Transaction = class Transaction2 extends BaseTransaction {
  constructor(operations, client, transactionId) {
    super(operations, transactionId), _classPrivateFieldInitSpec(this, _client$11, void 0), _classPrivateFieldSet2(_client$11, this, client);
  }
  /**
  * Clones the transaction
  */
  clone() {
    return new Transaction2([...this.operations], _classPrivateFieldGet2(_client$11, this), this.trxId);
  }
  commit(options) {
    if (!_classPrivateFieldGet2(_client$11, this)) throw Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");
    return _classPrivateFieldGet2(_client$11, this).mutate(this.serialize(), Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {}));
  }
  patch(patchOrDocumentId, patchOps) {
    let isBuilder = typeof patchOps == "function", isPatch = typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof Patch, isMutationSelection = typeof patchOrDocumentId == "object" && ("query" in patchOrDocumentId || "id" in patchOrDocumentId);
    if (isPatch) return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      let patch = patchOps(new Patch(patchOrDocumentId, {}, _classPrivateFieldGet2(_client$11, this)));
      if (!(patch instanceof Patch)) throw Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    if (isMutationSelection) {
      let patch = new Patch(patchOrDocumentId, patchOps || {}, _classPrivateFieldGet2(_client$11, this));
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: {
      id: patchOrDocumentId,
      ...patchOps
    } });
  }
};
var _client2$10 = /* @__PURE__ */ new WeakMap();
var ObservableTransaction = class ObservableTransaction2 extends BaseTransaction {
  constructor(operations, client, transactionId) {
    super(operations, transactionId), _classPrivateFieldInitSpec(this, _client2$10, void 0), _classPrivateFieldSet2(_client2$10, this, client);
  }
  /**
  * Clones the transaction
  */
  clone() {
    return new ObservableTransaction2([...this.operations], _classPrivateFieldGet2(_client2$10, this), this.trxId);
  }
  commit(options) {
    if (!_classPrivateFieldGet2(_client2$10, this)) throw Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");
    return _classPrivateFieldGet2(_client2$10, this).mutate(this.serialize(), Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {}));
  }
  patch(patchOrDocumentId, patchOps) {
    let isBuilder = typeof patchOps == "function";
    if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof ObservablePatch) return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      let patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, _classPrivateFieldGet2(_client2$10, this)));
      if (!(patch instanceof ObservablePatch)) throw Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: {
      id: patchOrDocumentId,
      ...patchOps
    } });
  }
};
var types_exports = __exportAll({ possibleStoreRequestOptions: () => possibleStoreRequestOptions });
var possibleStoreRequestOptions = [
  "headers",
  "signal",
  "tag",
  "timeout",
  "token"
];
function requestOptions(config, overrides = {}) {
  let headers = {};
  config.headers && Object.assign(headers, config.headers);
  let token = overrides.token || config.token;
  token && (headers.Authorization = `Bearer ${token}`), !overrides.useGlobalApi && !config.useProjectHostname && config.projectId && (headers["X-Sanity-Project-ID"] = config.projectId);
  let request = {
    url: overrides.url,
    headers: Object.assign(headers, overrides.headers || {})
  };
  overrides.method && (request.method = overrides.method), overrides.body !== void 0 && (request.body = overrides.body), overrides.query && (request.query = expandQueryArrays(overrides.query)), overrides.signal && (request.signal = overrides.signal), (overrides.withCredentials === void 0 ? config.withCredentials : overrides.withCredentials) && (request.credentials = "include"), typeof overrides.maxRedirects == "number" && (request.redirect = overrides.maxRedirects === 0 ? "manual" : "follow");
  let timeout2 = overrides.timeout === void 0 ? config.timeout : overrides.timeout;
  request.timeout = timeout2 === void 0 ? 3e5 : timeout2 !== 0 && timeout2, overrides.useAbortSignal === false && !request.signal && (request.timeout = typeof request.timeout == "number" && request.timeout > 0 && {
    total: request.timeout,
    signal: false
  });
  let fetchOption = typeof overrides.fetch == "object" && typeof config.fetch == "object" ? {
    ...config.fetch,
    ...overrides.fetch
  } : overrides.fetch || config.fetch;
  return typeof fetchOption == "function" ? request.fetch = fetchOption : typeof fetchOption == "object" && fetchOption && (request.meta = {
    ...request.meta,
    fetchInit: fetchOption
  }), !request.fetch && config.resolveFetch && (request.fetch = config.resolveFetch(typeof config.proxy == "string" ? config.proxy : void 0)), typeof overrides.maxRetries == "number" && (request.maxRetries = overrides.maxRetries), typeof config.lineage == "string" && config.lineage && (request.meta = {
    ...request.meta,
    lineage: config.lineage
  }), request;
}
function expandQueryArrays(query) {
  if (query instanceof URLSearchParams || !query || typeof query != "object" || !Object.values(query).some(Array.isArray)) return query;
  let params = new URLSearchParams();
  for (let [key, value] of Object.entries(query)) if (value != null) {
    if (Array.isArray(value)) for (let item of value) item != null && params.append(key, `${item}`);
    else params.append(key, `${value}`);
  }
  return params;
}
var encodeQueryString = ({ query, params = {}, options = {} }) => {
  let searchParams = new URLSearchParams(), { tag, includeMutations, returnQuery, ...opts } = options;
  tag && searchParams.append("tag", tag), searchParams.append("query", query);
  for (let [key, value] of Object.entries(params)) value !== void 0 && searchParams.append(`$${key}`, JSON.stringify(value));
  for (let [key, value] of Object.entries(opts)) value && searchParams.append(key, `${value}`);
  return returnQuery === false && searchParams.append("returnQuery", "false"), includeMutations === false && searchParams.append("includeMutations", "false"), `?${searchParams}`;
};
var excludeFalsey = (param, defValue) => param === false ? void 0 : param === void 0 ? defValue : param;
var getMutationQuery = (options = {}) => ({
  dryRun: options.dryRun,
  returnIds: true,
  returnDocuments: excludeFalsey(options.returnDocuments, true),
  visibility: options.visibility || "sync",
  autoGenerateArrayKeys: options.autoGenerateArrayKeys,
  skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
});
var indexBy = (docs, attr) => docs.reduce((indexed, doc) => (indexed[attr(doc)] = doc, indexed), /* @__PURE__ */ Object.create(null));
function _fetchRequest(_stega, _params, options) {
  let stega = "stega" in options ? {
    ..._stega,
    ...typeof options.stega == "boolean" ? { enabled: options.stega } : options.stega || {}
  } : _stega, params = stega.enabled ? stegaClean(_params) : _params, mapResponse = options.filterResponse === false ? (res) => res : (res) => res.result, { cache, next, ...opts } = {
    useAbortSignal: options.signal !== void 0,
    resultSourceMap: stega.enabled ? "withKeyArraySelector" : options.resultSourceMap,
    ...options,
    returnQuery: options.filterResponse === false && options.returnQuery !== false
  };
  return {
    stega,
    params,
    mapResponse,
    reqOpts: cache !== void 0 || next !== void 0 ? {
      ...opts,
      fetch: {
        cache,
        next
      }
    } : opts
  };
}
function _fetchObservable(client, httpRequest, _stega, query, _params = {}, options = {}) {
  return _observe(options.signal, (signal) => _fetch$2(client, httpRequest, _stega, query, _params, {
    ...options,
    signal
  }));
}
function _fetch$2(client, httpRequest, _stega, query, _params = {}, options = {}) {
  let { stega, params, mapResponse, reqOpts } = _fetchRequest(_stega, _params, options), request = _dataRequest(client, httpRequest, "query", {
    query,
    params
  }, reqOpts);
  return stega.enabled ? Promise.all([request, import("./stegaEncodeSourceMap-Dj29aWKG-5BQTBDN5.js").then((n) => n.n)]).then(([res, { stegaEncodeSourceMap }]) => {
    let result = stegaEncodeSourceMap(res.result, res.resultSourceMap, stega);
    return mapResponse({
      ...res,
      result
    });
  }) : request.then(mapResponse);
}
function _getDocumentObservable(client, httpRequest, id, opts = {}) {
  return _observe(opts.signal, (signal) => _request(client, httpRequest, _getDocumentOptions(client, id, {
    ...opts,
    signal
  })).then((body) => _mapGetDocument(body, opts.includeAllVersions)));
}
function _getDocument(client, httpRequest, id, opts = {}) {
  return _request(client, httpRequest, _getDocumentOptions(client, id, opts)).then((body) => _mapGetDocument(body, opts.includeAllVersions));
}
function _getDocumentOptions(client, id, opts) {
  let docId = id;
  if (opts.releaseId) {
    let versionId = getVersionFromId(id);
    if (!versionId) {
      if (isDraftId(id)) throw Error(`The document ID (\`${id}\`) is a draft, but \`options.releaseId\` is set as \`${opts.releaseId}\``);
      docId = getVersionId(id, opts.releaseId);
    } else if (versionId !== opts.releaseId) throw Error(`The document ID (\`${id}\`) is already a version of \`${versionId}\` release, but this does not match the provided \`options.releaseId\` (\`${opts.releaseId}\`)`);
  }
  return {
    url: _getDataUrl(client, "doc", docId),
    tag: opts.tag,
    signal: opts.signal,
    query: opts.includeAllVersions === void 0 ? void 0 : { includeAllVersions: opts.includeAllVersions }
  };
}
function _mapGetDocument(body, includeAllVersions) {
  let documents = body.documents;
  return documents ? includeAllVersions ? documents : documents[0] : includeAllVersions ? [] : void 0;
}
function _getDocumentsObservable(client, httpRequest, ids, opts = {}) {
  return _observe(opts.signal, (signal) => _getDocuments(client, httpRequest, ids, {
    ...opts,
    signal
  }));
}
function _getDocuments(client, httpRequest, ids, opts = {}) {
  return _request(client, httpRequest, _getDocumentsOptions(client, ids, opts)).then((body) => _mapGetDocuments(body, ids));
}
function _getDocumentsOptions(client, ids, opts) {
  return {
    url: _getDataUrl(client, "doc", ids.join(",")),
    tag: opts.tag,
    signal: opts.signal
  };
}
function _mapGetDocuments(body, ids) {
  let indexed = indexBy(body.documents || [], (doc) => doc._id);
  return ids.map((id) => indexed[id] || null);
}
function _documentsExistsObservable(client, httpRequest, ids, opts = {}) {
  return _observe(opts.signal, (signal) => _documentsExists(client, httpRequest, ids, {
    ...opts,
    signal
  }));
}
async function _documentsExists(client, httpRequest, ids, opts = {}) {
  let existing = /* @__PURE__ */ new Set();
  if (ids.length === 0) return existing;
  for (let i = 0; i < ids.length; i += 100) {
    let batchIds = ids.slice(i, i + 100), body = await _request(client, httpRequest, {
      url: _getDataUrl(client, "doc", batchIds.map(encodeURIComponent).join(",")),
      tag: opts.tag,
      signal: opts.signal,
      query: { excludeContent: true }
    }), missing = /* @__PURE__ */ new Set();
    for (let omitted of body.omitted || []) omitted.reason === "existence" && missing.add(omitted.id);
    for (let id of batchIds) missing.has(id) || existing.add(id);
  }
  return existing;
}
function _getReleaseDocumentsObservable(client, httpRequest, releaseId, opts = {}) {
  return _observe(opts.signal, (signal) => _getReleaseDocuments(client, httpRequest, releaseId, {
    ...opts,
    signal
  }));
}
function _getReleaseDocuments(client, httpRequest, releaseId, opts = {}) {
  return _dataRequest(client, httpRequest, "query", {
    query: "*[sanity::partOfRelease($releaseId)]",
    params: { releaseId }
  }, opts);
}
function _createIfNotExistsObservable(client, httpRequest, doc, options) {
  return _observe(options?.signal, (signal) => _createIfNotExists(client, httpRequest, doc, {
    ...options,
    signal
  }));
}
function _createOrReplaceObservable(client, httpRequest, doc, options) {
  return _observe(options?.signal, (signal) => _createOrReplace(client, httpRequest, doc, {
    ...options,
    signal
  }));
}
function _createVersionObservable(client, httpRequest, doc, publishedId, options) {
  return _observe(options?.signal, (signal) => _createVersion(client, httpRequest, doc, publishedId, {
    ...options,
    signal
  }));
}
function _createVersionFromBaseObservable(client, httpRequest, publishedId, baseId, releaseId, ifBaseRevisionId, options) {
  return _observe(options?.signal, (signal) => _createVersionFromBase(client, httpRequest, publishedId, baseId, releaseId, ifBaseRevisionId, {
    ...options,
    signal
  }));
}
function _deleteObservable(client, httpRequest, selection, options) {
  return _observe(options?.signal, (signal) => _delete$1(client, httpRequest, selection, {
    ...options,
    signal
  }));
}
function _discardVersionObservable(client, httpRequest, versionId, purge = false, options) {
  return _observe(options?.signal, (signal) => _discardVersion(client, httpRequest, versionId, purge, {
    ...options,
    signal
  }));
}
function _replaceVersionObservable(client, httpRequest, doc, options) {
  return _observe(options?.signal, (signal) => _replaceVersion(client, httpRequest, doc, {
    ...options,
    signal
  }));
}
function _unpublishVersionObservable(client, httpRequest, versionId, publishedId, options) {
  return _observe(options?.signal, (signal) => _unpublishVersion(client, httpRequest, versionId, publishedId, {
    ...options,
    signal
  }));
}
function _mutateObservable(client, httpRequest, mutations, options) {
  return _observe(options?.signal, (signal) => _mutate(client, httpRequest, mutations, {
    ...options,
    signal
  }));
}
function _actionObservable(client, httpRequest, actions, options) {
  return _observe(options?.signal, (signal) => _action(client, httpRequest, actions, {
    ...options,
    signal
  }));
}
function _dataRequestOptions(client, endpoint, body, options = {}) {
  let isMutation = endpoint === "mutate", isAction = endpoint === "actions", isQuery2 = endpoint === "query", strQuery = isMutation || isAction ? "" : encodeQueryString(body), useGet = !isMutation && !isAction && strQuery.length < 11264, stringQuery = useGet ? strQuery : "", returnFirst = options.returnFirst, { timeout: timeout2, token, tag, headers, returnQuery, lastLiveEventId, cacheMode } = options, url = _getDataUrl(client, endpoint, stringQuery);
  return {
    reqOptions: {
      method: useGet ? "GET" : "POST",
      url,
      body: useGet ? void 0 : body,
      query: isMutation && getMutationQuery(options),
      timeout: timeout2,
      headers,
      token,
      tag,
      returnQuery,
      perspective: options.perspective,
      variant: options.variant,
      resultSourceMap: options.resultSourceMap,
      lastLiveEventId: Array.isArray(lastLiveEventId) ? lastLiveEventId[0] : lastLiveEventId,
      cacheMode,
      canUseCdn: isQuery2,
      signal: options.signal,
      fetch: options.fetch,
      useAbortSignal: options.useAbortSignal,
      useCdn: options.useCdn
    },
    isMutation,
    returnFirst
  };
}
function _mapDataResponse(res, isMutation, returnFirst, returnDocuments) {
  if (!isMutation) return res;
  let results = res.results || [];
  if (returnDocuments) return returnFirst ? results[0] && results[0].document : results.map((mut) => mut.document);
  let key = returnFirst ? "documentId" : "documentIds", ids = returnFirst ? results[0] && results[0].id : results.map((mut) => mut.id);
  return {
    transactionId: res.transactionId,
    results,
    [key]: ids
  };
}
function _dataRequest(client, httpRequest, endpoint, body, options = {}) {
  let { reqOptions, isMutation, returnFirst } = _dataRequestOptions(client, endpoint, body, options);
  return _request(client, httpRequest, reqOptions).then((res) => _mapDataResponse(res, isMutation, returnFirst, options.returnDocuments));
}
function _createObservable(client, httpRequest, doc, op, options = {}) {
  return _observe(options.signal, (signal) => _create$1(client, httpRequest, doc, op, {
    ...options,
    signal
  }));
}
function _create$1(client, httpRequest, doc, op, options = {}) {
  let mutation = { [op]: doc }, opts = Object.assign({
    returnFirst: true,
    returnDocuments: true
  }, options);
  return _dataRequest(client, httpRequest, "mutate", { mutations: [mutation] }, opts);
}
function _action(client, httpRequest, actions, options) {
  return _dataRequest(client, httpRequest, "actions", {
    actions: Array.isArray(actions) ? actions : [actions],
    transactionId: options && options.transactionId || void 0,
    skipCrossDatasetReferenceValidation: options && options.skipCrossDatasetReferenceValidation || void 0,
    dryRun: options && options.dryRun || void 0
  }, options);
}
function _mutate(client, httpRequest, mutations, options) {
  let mut;
  return mut = mutations instanceof Patch || mutations instanceof ObservablePatch ? { patch: mutations.serialize() } : mutations instanceof Transaction || mutations instanceof ObservableTransaction ? mutations.serialize() : mutations, _dataRequest(client, httpRequest, "mutate", {
    mutations: Array.isArray(mut) ? mut : [mut],
    transactionId: options && options.transactionId || void 0
  }, options);
}
function _delete$1(client, httpRequest, selection, options) {
  return _dataRequest(client, httpRequest, "mutate", { mutations: [{ delete: getSelection(selection) }] }, options);
}
function _createIfNotExists(client, httpRequest, doc, options) {
  return requireDocumentId("createIfNotExists", doc), _create$1(client, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client, httpRequest, doc, options) {
  return requireDocumentId("createOrReplace", doc), _create$1(client, httpRequest, doc, "createOrReplace", options);
}
function _createVersion(client, httpRequest, doc, publishedId, options) {
  return requireDocumentId("createVersion", doc), requireDocumentType("createVersion", doc), printCreateVersionWithBaseIdWarning(), _action(client, httpRequest, {
    actionType: "sanity.action.document.version.create",
    publishedId,
    document: doc
  }, options);
}
function _createVersionFromBase(client, httpRequest, publishedId, baseId, releaseId, ifBaseRevisionId, options) {
  if (!baseId) throw Error("`createVersion()` requires `baseId` when no `document` is provided");
  if (!publishedId) throw Error("`createVersion()` requires `publishedId` when `baseId` is provided");
  return validateDocumentId("createVersion", baseId), validateDocumentId("createVersion", publishedId), _action(client, httpRequest, {
    actionType: "sanity.action.document.version.create",
    publishedId,
    baseId,
    versionId: releaseId ? getVersionId(publishedId, releaseId) : getDraftId(publishedId),
    ifBaseRevisionId
  }, options);
}
function _discardVersion(client, httpRequest, versionId, purge = false, options) {
  return _action(client, httpRequest, {
    actionType: "sanity.action.document.version.discard",
    versionId,
    purge
  }, options);
}
function _replaceVersion(client, httpRequest, doc, options) {
  return requireDocumentId("replaceVersion", doc), requireDocumentType("replaceVersion", doc), _action(client, httpRequest, {
    actionType: "sanity.action.document.version.replace",
    document: doc
  }, options);
}
function _unpublishVersion(client, httpRequest, versionId, publishedId, options) {
  return _action(client, httpRequest, {
    actionType: "sanity.action.document.version.unpublish",
    versionId,
    publishedId
  }, options);
}
var hasDataConfig = (client) => {
  let config = client.config();
  return config.dataset !== void 0 && config.projectId !== void 0 || config.resource !== void 0;
};
var isQuery = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "query"));
var isMutate = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "mutate"));
var isDoc = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "doc", ""));
var isListener = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "listen"));
var isHistory = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "history", ""));
var isData = (client, uri) => uri.startsWith("/data/") || isQuery(client, uri) || isMutate(client, uri) || isDoc(client, uri) || isListener(client, uri) || isHistory(client, uri);
function _prepareRequest(client, options) {
  options.uri !== void 0 && printDeprecatedUriOptionWarning();
  let uri = options.uri || options.url;
  if (typeof uri != "string") throw TypeError("Request options must include a `url`");
  let config = client.config(), canUseCdn = options.canUseCdn === void 0 ? ["GET", "HEAD"].indexOf(options.method || "GET") >= 0 && isData(client, uri) : options.canUseCdn, useCdn = (options.useCdn ?? config.useCdn) && canUseCdn, tag = options.tag && config.requestTagPrefix ? [config.requestTagPrefix, options.tag].join(".") : options.tag || config.requestTagPrefix;
  if (tag && options.tag !== null && (options.query = {
    tag: requestTag(tag),
    ...options.query
  }), [
    "GET",
    "HEAD",
    "POST"
  ].indexOf(options.method || "GET") >= 0 && isQuery(client, uri)) {
    let resultSourceMap = options.resultSourceMap ?? config.resultSourceMap;
    resultSourceMap !== void 0 && resultSourceMap !== false && (options.query = {
      resultSourceMap,
      ...options.query
    });
    let perspectiveOption = options.perspective || config.perspective;
    perspectiveOption !== void 0 && (perspectiveOption === "previewDrafts" && printPreviewDraftsDeprecationWarning(), validateApiPerspective(perspectiveOption), options.query = {
      perspective: Array.isArray(perspectiveOption) ? perspectiveOption.join(",") : perspectiveOption,
      ...options.query
    }, (Array.isArray(perspectiveOption) && perspectiveOption.length > 0 || perspectiveOption === "previewDrafts" || perspectiveOption === "drafts") && useCdn && (useCdn = false, printCdnPreviewDraftsWarning()));
    let variantOption = options.variant || config.variant;
    typeof variantOption == "string" && (options.query = {
      variant: variantOption,
      ...options.query
    }), typeof variantOption == "object" && (options.query = {
      variantCondition: variantConditionsToQueryArray(variantOption),
      ...options.query
    }), options.lastLiveEventId && (options.query = {
      ...options.query,
      lastLiveEventId: options.lastLiveEventId
    }), options.returnQuery === false && (options.query = {
      returnQuery: "false",
      ...options.query
    }), useCdn && options.cacheMode == "noStale" && (options.query = {
      cacheMode: "noStale",
      ...options.query
    });
  }
  return requestOptions(config, Object.assign({}, options, { url: _getUrl(client, uri, useCdn) }));
}
function _observe(userSignal, run) {
  return new Observable((subscriber) => {
    let controller = new AbortController();
    return run(userSignal ? anySignal([userSignal, controller.signal]) : controller.signal).then((value) => {
      subscriber.next(value), subscriber.complete();
    }, (err) => subscriber.error(err)), () => controller.abort();
  });
}
function _request(client, httpRequest, options) {
  return httpRequest(_prepareRequest(client, options), client.config().requestHandler).then((body) => body);
}
function _requestObservable(client, httpRequest, options) {
  return _observe(options.signal, (signal) => _request(client, httpRequest, {
    ...options,
    signal
  }));
}
function _uploadObservable(client, options) {
  let reqOptions = _prepareRequest(client, options), requester2 = client.config().requester, request = new Observable((subscriber) => requester2(reqOptions).subscribe(subscriber)).pipe(filter((event) => event?.type === "progress" || event?.type === "response"), map((event) => event.type === "progress" ? {
    type: "progress",
    stage: event.stage,
    percent: event.percent,
    total: event.total,
    loaded: event.loaded,
    lengthComputable: event.lengthComputable
  } : {
    type: "response",
    body: event.body
  }));
  return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _getDataUrl(client, operation, path) {
  let config = client.config();
  if (config.resource) return resourceConfig(config), `${resourceDataBase(config)}/${path === void 0 ? operation : `${operation}/${path}`}`.replace(/\/($|\?)/, "$1");
  let baseUri = `/${operation}/${hasDataset(config)}`;
  return `/data${path === void 0 ? baseUri : `${baseUri}/${path}`}`.replace(/\/($|\?)/, "$1");
}
function _getUrl(client, uri, canUseCdn = false) {
  let { url, cdnUrl } = client.config();
  return `${canUseCdn ? cdnUrl : url}/${uri.replace(/^\//, "")}`;
}
function _withAbortSignal(signal) {
  return (input) => new Observable((observer) => {
    let abort = () => observer.error(_createAbortError(signal));
    if (signal && signal.aborted) {
      abort();
      return;
    }
    let subscription = input.subscribe(observer);
    return signal.addEventListener("abort", abort), () => {
      signal.removeEventListener("abort", abort), subscription.unsubscribe();
    };
  });
}
function _createAbortError(signal) {
  return new DOMException(signal?.reason ?? "The operation was aborted.", "AbortError");
}
var resourceDataBase = (config) => {
  let resource = config.resource;
  if (!resource) throw Error("`resource` must be provided to perform resource queries");
  let { type, id } = resource;
  switch (type) {
    case "dataset": {
      let segments = id.split(".");
      if (segments.length !== 2) throw Error('Dataset ID must be in the format "project.dataset"');
      return `/projects/${segments[0]}/datasets/${segments[1]}`;
    }
    case "canvas":
      return `/canvases/${id}`;
    case "knowledge-base":
      return `/knowledge-bases/${id}`;
    case "media-library":
      return `/media-libraries/${id}`;
    case "dashboard":
      return `/dashboards/${id}`;
    default:
      throw Error(`Unsupported resource type: ${type.toString()}`);
  }
};
function variantConditionsToQueryArray(variantConditions) {
  return Object.entries(variantConditions).map(([condition, value]) => `${condition}:${value}`).toSorted();
}
function _generateObservable(client, httpRequest, request) {
  return _requestObservable(client, httpRequest, {
    method: "POST",
    url: `/agent/action/generate/${hasDataset(client.config())}`,
    body: request
  });
}
function _generate(client, httpRequest, request) {
  return _request(client, httpRequest, {
    method: "POST",
    url: `/agent/action/generate/${hasDataset(client.config())}`,
    body: request
  });
}
function _patch(client, httpRequest, request) {
  return _request(client, httpRequest, {
    method: "POST",
    url: `/agent/action/patch/${hasDataset(client.config())}`,
    body: request
  });
}
function _prompt(client, httpRequest, request) {
  return _request(client, httpRequest, {
    method: "POST",
    url: `/agent/action/prompt/${hasDataset(client.config())}`,
    body: request
  });
}
function _transformObservable(client, httpRequest, request) {
  return _requestObservable(client, httpRequest, {
    method: "POST",
    url: `/agent/action/transform/${hasDataset(client.config())}`,
    body: request
  });
}
function _transform(client, httpRequest, request) {
  return _request(client, httpRequest, {
    method: "POST",
    url: `/agent/action/transform/${hasDataset(client.config())}`,
    body: request
  });
}
function _translateObservable(client, httpRequest, request) {
  return _requestObservable(client, httpRequest, {
    method: "POST",
    url: `/agent/action/translate/${hasDataset(client.config())}`,
    body: request
  });
}
function _translate(client, httpRequest, request) {
  return _request(client, httpRequest, {
    method: "POST",
    url: `/agent/action/translate/${hasDataset(client.config())}`,
    body: request
  });
}
var _client$10 = /* @__PURE__ */ new WeakMap();
var _httpRequest$9 = /* @__PURE__ */ new WeakMap();
var ObservableAgentsActionClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client$10, void 0), _classPrivateFieldInitSpec(this, _httpRequest$9, void 0), _classPrivateFieldSet2(_client$10, this, client), _classPrivateFieldSet2(_httpRequest$9, this, httpRequest);
  }
  /**
  * Run an instruction to generate content in a target document.
  * @param request - instruction request
  */
  generate(request) {
    return _generateObservable(_classPrivateFieldGet2(_client$10, this), _classPrivateFieldGet2(_httpRequest$9, this), request);
  }
  /**
  * Transform a target document based on a source.
  * @param request - translation request
  */
  transform(request) {
    return _transformObservable(_classPrivateFieldGet2(_client$10, this), _classPrivateFieldGet2(_httpRequest$9, this), request);
  }
  /**
  * Translate a target document based on a source.
  * @param request - translation request
  */
  translate(request) {
    return _translateObservable(_classPrivateFieldGet2(_client$10, this), _classPrivateFieldGet2(_httpRequest$9, this), request);
  }
};
var _client2$9 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$10 = /* @__PURE__ */ new WeakMap();
var AgentActionsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2$9, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$10, void 0), _classPrivateFieldSet2(_client2$9, this, client), _classPrivateFieldSet2(_httpRequest2$10, this, httpRequest);
  }
  /**
  * Run an instruction to generate content in a target document.
  * @param request - instruction request
  */
  generate(request) {
    return _generate(_classPrivateFieldGet2(_client2$9, this), _classPrivateFieldGet2(_httpRequest2$10, this), request);
  }
  /**
  * Transform a target document based on a source.
  * @param request - translation request
  */
  transform(request) {
    return _transform(_classPrivateFieldGet2(_client2$9, this), _classPrivateFieldGet2(_httpRequest2$10, this), request);
  }
  /**
  * Translate a target document based on a source.
  * @param request - translation request
  */
  translate(request) {
    return _translate(_classPrivateFieldGet2(_client2$9, this), _classPrivateFieldGet2(_httpRequest2$10, this), request);
  }
  /**
  * Run a raw instruction and return the result either as text or json
  * @param request - prompt request
  */
  prompt(request) {
    return _prompt(_classPrivateFieldGet2(_client2$9, this), _classPrivateFieldGet2(_httpRequest2$10, this), request);
  }
  /**
  * Patch a document using a schema aware API.
  * Does not use an LLM, but uses the schema to ensure paths and values matches the schema.
  * @param request - instruction request
  */
  patch(request) {
    return _patch(_classPrivateFieldGet2(_client2$9, this), _classPrivateFieldGet2(_httpRequest2$10, this), request);
  }
};
var _client$9 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$9 = /* @__PURE__ */ new WeakMap();
var ObservableAssetsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client$9, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$9, void 0), _classPrivateFieldSet2(_client$9, this, client), _classPrivateFieldSet2(_httpRequest2$9, this, httpRequest);
  }
  upload(assetType, body, options) {
    return _upload(_classPrivateFieldGet2(_client$9, this), _classPrivateFieldGet2(_httpRequest2$9, this), assetType, body, options);
  }
};
var _client2$8 = /* @__PURE__ */ new WeakMap();
var _httpRequest3 = /* @__PURE__ */ new WeakMap();
var AssetsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2$8, void 0), _classPrivateFieldInitSpec(this, _httpRequest3, void 0), _classPrivateFieldSet2(_client2$8, this, client), _classPrivateFieldSet2(_httpRequest3, this, httpRequest);
  }
  upload(assetType, body, options) {
    let observable = _upload(_classPrivateFieldGet2(_client2$8, this), _classPrivateFieldGet2(_httpRequest3, this), assetType, body, options);
    return lastValueFrom(observable.pipe(filter((event) => event.type === "response"), map((event) => pluckUploadedAsset(event.body))));
  }
};
function isMediaLibraryUploadBody(body) {
  return "asset" in body;
}
function pluckUploadedAsset(body) {
  return isMediaLibraryUploadBody(body) ? body.asset : body.document;
}
function _upload(client, _httpRequest4, assetType, body, opts = {}) {
  validateAssetType(assetType);
  let meta = opts.extract || void 0;
  meta && !meta.length && (meta = ["none"]);
  let config = client.config(), options = optionsFromFile(opts, body), { tag, label, title, description, creditLine, filename, source } = options, isMediaLibrary = config.resource?.type === "media-library", query = isMediaLibrary ? {
    title,
    filename
  } : {
    label,
    title,
    description,
    filename,
    meta,
    creditLine
  };
  source && !isMediaLibrary && (query.sourceId = source.id, query.sourceName = source.name, query.sourceUrl = source.url);
  let headers = options.contentType ? { "Content-Type": options.contentType } : {}, baseRequest = {
    tag,
    method: "POST",
    timeout: options.timeout || 0,
    url: buildAssetUploadUrl(config, assetType),
    headers,
    query,
    body
  };
  return typeof XMLHttpRequest < "u" ? defer(async () => {
    let { uploadWithProgress } = await import("./browserUpload-BTQyjHMj-6UBKDBSU.js"), req = _prepareRequest(client, { ...baseRequest });
    return uploadWithProgress({
      url: appendQuery(req.url, req.query),
      method: req.method ?? "POST",
      headers: req.headers,
      body,
      withCredentials: req.credentials === "include",
      timeout: typeof req.timeout == "object" ? req.timeout.total : req.timeout,
      signal: req.signal
    });
  }).pipe(mergeAll()) : _uploadObservable(client, baseRequest);
}
function appendQuery(url, query) {
  if (!query) return url;
  let qs = (query instanceof URLSearchParams ? query : new URLSearchParams(Object.entries(query).flatMap(([key, value]) => value == null ? [] : [[key, `${value}`]]))).toString();
  return qs ? url + (url.includes("?") ? "&" : "?") + qs : url;
}
function buildAssetUploadUrl(config, assetType) {
  let assetTypeEndpoint = assetType === "image" ? "images" : "files", resource = config.resource;
  if (resource) {
    let { type, id } = resource;
    switch (type) {
      case "dataset":
        throw Error("Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead.");
      case "canvas":
        return `/canvases/${id}/assets/${assetTypeEndpoint}`;
      case "knowledge-base":
        throw Error("Assets are not supported for knowledge-base resources. Use `client.context.imports` to add content instead.");
      case "media-library":
        return `/media-libraries/${id}/upload`;
      case "dashboard":
        return `/dashboards/${id}/assets/${assetTypeEndpoint}`;
      default:
        throw Error(`Unsupported resource type: ${type.toString()}`);
    }
  }
  return `assets/${assetTypeEndpoint}/${hasDataset(config)}`;
}
function optionsFromFile(opts, file) {
  return typeof File > "u" || !(file instanceof File) ? opts : Object.assign({
    filename: opts.preserveFilename === false ? void 0 : file.name,
    contentType: file.type
  }, opts);
}
var defaults_default = (obj, defaults) => Object.keys(defaults).concat(Object.keys(obj)).reduce((target, prop) => (target[prop] = obj[prop] === void 0 ? defaults[prop] : obj[prop], target), {});
var pick = (obj, props) => props.reduce((selection, prop) => (obj[prop] === void 0 || (selection[prop] = obj[prop]), selection), {});
var RETRYABLE_STATUSES = /* @__PURE__ */ new Set([408, 429]);
function reconnectOnConnectionFailure() {
  return function(source) {
    return source.pipe(catchError((err, caught) => err instanceof ConnectionFailedError && (typeof err.status != "number" || err.status < 400 || err.status >= 500 || RETRYABLE_STATUSES.has(err.status)) ? concat(of({ type: "reconnect" }), timer(1e3).pipe(mergeMap(() => caught))) : throwError(() => err)));
  };
}
function resolveEventSourceFetch(config, options = {}) {
  let extraHeaders = options.headers, credentials = options.withCredentials ? "include" : void 0;
  return function eventSourceFetch(url, init) {
    let baseFetch = pickBaseFetch(config), mergedInit = { ...init };
    if (extraHeaders) {
      let headers = new Headers(init?.headers);
      for (let [key, value] of Object.entries(extraHeaders)) headers.set(key, value);
      mergedInit.headers = headers;
    }
    return credentials !== void 0 && (mergedInit.credentials = credentials), baseFetch(typeof url == "string" ? url : url.href, mergedInit);
  };
}
function pickBaseFetch(config) {
  return config.resolveFetch ? config.resolveFetch(typeof config.proxy == "string" ? config.proxy : void 0) : globalThis.fetch.bind(globalThis);
}
var possibleOptions = [
  "includePreviousRevision",
  "includeResult",
  "includeMutations",
  "includeAllVersions",
  "visibility",
  "effectFormat",
  "enableResume",
  "tag"
];
var defaultOptions = { includeResult: true };
function _listen$2(query, params, opts = {}) {
  let { url, requestTagPrefix } = this.config(), tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag, options = {
    ...defaults_default(opts, defaultOptions),
    tag
  }, listenOpts = pick(options, possibleOptions), qs = encodeQueryString({
    query,
    params,
    options: {
      tag,
      ...listenOpts
    }
  }), uri = `${url}${_getDataUrl(this, "listen", qs)}`;
  if (uri.length > 14800) return throwError(() => Error("Query too large for listener"));
  let listenFor = options.events ? options.events : ["mutation"];
  return _connectListenEventSource(this, uri, listenFor);
}
function _connectListenEventSource(client, uri, listenFor) {
  let config = client.config(), { token, withCredentials, headers: configHeaders } = config, headers = {};
  token && (headers.Authorization = `Bearer ${token}`), configHeaders && Object.assign(headers, configHeaders);
  let initEventSource = () => new EventSource(uri, { fetch: resolveEventSourceFetch(config, {
    headers: Object.keys(headers).length ? headers : void 0,
    withCredentials
  }) });
  return connectEventSource(initEventSource, listenFor).pipe(reconnectOnConnectionFailure(), filter((event) => listenFor.includes(event.type)), map((event) => ({
    type: event.type,
    ..."data" in event ? event.data : {}
  })));
}
var possibleRequestOptions = [
  "headers",
  "signal",
  "tag",
  "timeout",
  "token"
];
function commentUrl(id) {
  if (!id) throw Error("Comment ID must be provided");
  return `/collaboration/comments/${encodeURIComponent(id)}`;
}
function resolveCommentResource(client) {
  let { resource, projectId: projectId2, dataset: dataset2 } = client.config();
  if (resource) return resource;
  if (projectId2 && dataset2) return {
    type: "dataset",
    id: `${projectId2}.${dataset2}`
  };
  throw Error("`resource` or `projectId` and `dataset` must be configured to use collaboration comments");
}
function resourceQuery(client) {
  let { collaboration } = client.config(), organizationId = collaboration?.organizationId;
  if (!organizationId) throw Error("`collaboration.organizationId` must be configured to use collaboration comments");
  let resource = resolveCommentResource(client);
  return {
    organizationId,
    resourceId: resource.id,
    resourceType: resource.type
  };
}
function _getTargetDocumentRef(client, documentId) {
  if (!documentId) throw Error("Document ID must be provided");
  let resource = resolveCommentResource(client);
  return `${resource.type}:${resource.id}:${getPublishedId(documentId)}`;
}
function write(client, httpRequest, method, url, body, options = {}) {
  return _requestObservable(client, httpRequest, {
    method,
    url,
    body,
    query: {
      ...resourceQuery(client),
      ...options.transactionId ? { transactionId: options.transactionId } : {}
    },
    ...pick(options, possibleRequestOptions)
  });
}
function writeDocument(commentId, ...args) {
  return write(...args).pipe(map(({ results }) => {
    let result = commentId ? results.find(({ id }) => id === commentId) : results[0];
    if (!result?.document) throw Error("Comment write did not return a comment document");
    return result.document;
  }));
}
function writeMutationResult(...args) {
  return write(...args).pipe(map(({ transactionId, results }) => ({
    transactionId,
    documentIds: results.map((result) => result.id),
    results
  })));
}
function _create(client, httpRequest, body, options) {
  return writeDocument(body._id, client, httpRequest, "POST", "/collaboration/comments", body, options);
}
function _update(client, httpRequest, id, body, options) {
  return writeDocument(id, client, httpRequest, "PATCH", commentUrl(id), body, options);
}
function _delete(client, httpRequest, id, options) {
  return writeMutationResult(client, httpRequest, "DELETE", commentUrl(id), void 0, options);
}
function _addReaction(client, httpRequest, id, shortName, options) {
  return writeDocument(id, client, httpRequest, "POST", `${commentUrl(id)}/reactions`, { shortName }, options);
}
function _removeReaction(client, httpRequest, id, shortName, options) {
  return writeDocument(id, client, httpRequest, "DELETE", `${commentUrl(id)}/reactions/${encodeURIComponent(shortName)}`, void 0, options);
}
function _fetch$1(client, httpRequest, query, params, options) {
  let search = resourceQuery(client);
  return _requestObservable(client, httpRequest, {
    ...encodeQueryString({
      query,
      params
    }).length < 11264 ? {
      method: "GET",
      url: `/collaboration/comments/query${encodeQueryString({
        query,
        params,
        options: search
      })}`
    } : {
      method: "POST",
      url: "/collaboration/comments/query",
      query: search,
      body: {
        query,
        params: params ?? {}
      }
    },
    ...pick(options || {}, possibleRequestOptions)
  }).pipe(map((response) => response.result));
}
function _listen$1(client, query, params, options) {
  let opts = options ?? {}, { requestTagPrefix } = client.config(), tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag, listenOpts = pick({
    ...defaults_default(opts, defaultOptions),
    tag
  }, possibleOptions), qs = encodeQueryString({
    query,
    params,
    options: {
      ...listenOpts,
      ...resourceQuery(client)
    }
  }), uri = `${client.getUrl("/collaboration/comments/listen")}${qs}`;
  return uri.length > 14800 ? throwError(() => Error("Query too large for listener")) : _connectListenEventSource(client, uri, opts.events ? opts.events : ["mutation"]);
}
var _client$8 = /* @__PURE__ */ new WeakMap();
var _httpRequest$8 = /* @__PURE__ */ new WeakMap();
var ObservableCollaborationCommentsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client$8, void 0), _classPrivateFieldInitSpec(this, _httpRequest$8, void 0), _classPrivateFieldSet2(_client$8, this, client), _classPrivateFieldSet2(_httpRequest$8, this, httpRequest);
  }
  /**
  * Create a comment or reply on the configured resource.
  *
  * A top-level comment requires `target`; a reply requires `parentCommentId` (never both).
  * Replies inherit `target`, `status`, and `threadId` from the parent comment.
  *
  * @param body - Comment to create
  * @param options - Optional request options
  * @returns The created comment
  */
  create(body, options) {
    return _create(_classPrivateFieldGet2(_client$8, this), _classPrivateFieldGet2(_httpRequest$8, this), body, options);
  }
  /**
  * Update an existing comment.
  *
  * Updating `status` cascades to the comment's replies.
  *
  * @param id - Comment document ID
  * @param body - Fields to update
  * @param options - Optional request options
  * @returns The updated comment
  */
  update(id, body, options) {
    return _update(_classPrivateFieldGet2(_client$8, this), _classPrivateFieldGet2(_httpRequest$8, this), id, body, options);
  }
  /**
  * Delete a comment and its replies.
  *
  * @param id - Comment document ID
  * @param options - Optional request options
  * @returns Mutation result, where `documentIds` covers the comment and every deleted reply
  */
  delete(id, options) {
    return _delete(_classPrivateFieldGet2(_client$8, this), _classPrivateFieldGet2(_httpRequest$8, this), id, options);
  }
  /**
  * Add the current user's reaction to a comment.
  *
  * @param id - Comment document ID
  * @param shortName - Emoji short name, for example `:+1:`
  * @param options - Optional request options
  * @returns The comment, with the reaction applied
  */
  addReaction(id, shortName, options) {
    return _addReaction(_classPrivateFieldGet2(_client$8, this), _classPrivateFieldGet2(_httpRequest$8, this), id, shortName, options);
  }
  /**
  * Remove the current user's reaction from a comment.
  *
  * @param id - Comment document ID
  * @param shortName - Emoji short name, for example `:+1:`
  * @param options - Optional request options
  * @returns The comment, with the reaction removed
  */
  removeReaction(id, shortName, options) {
    return _removeReaction(_classPrivateFieldGet2(_client$8, this), _classPrivateFieldGet2(_httpRequest$8, this), id, shortName, options);
  }
  /**
  * Build the global document reference used by `target.document._ref`, for use in
  * queries and listeners.
  *
  * The reference is built from the configured `resource` and the published ID of
  * the given document ID, since comment references always use published IDs.
  *
  * @example
  * ```ts
  * client.collaboration.comments.listen(
  *   '*[_type == "sanity.comment" && target.document._ref == $ref]',
  *   {ref: client.collaboration.comments.getTargetDocumentRef('doc-1')},
  * )
  * ```
  *
  * @param documentId - Document ID, in published, draft or version form
  * @returns Global document reference, of the form `resourceType:resourceId:documentId`
  */
  getTargetDocumentRef(documentId) {
    return _getTargetDocumentRef(_classPrivateFieldGet2(_client$8, this), documentId);
  }
  /**
  * Fetch comments on the configured resource.
  *
  * Takes the same `query` and `params` as `client.fetch`, and switches from a
  * GET to a POST for queries too large for the request URL in the same way,
  * but queries the comments endpoint, which accepts none of the query options
  * `client.fetch` does (`perspective`, `useCdn`, `filterResponse`,
  * `resultSourceMap`, stega).
  *
  * The query runs against the organization store, which is not scoped to
  * comments, so filter on `_type == "sanity.comment"`.
  *
  * @param query - GROQ-query to perform
  * @param params - Optional query parameters
  * @param options - Optional request options
  */
  fetch(query, params, options) {
    return _fetch$1(_classPrivateFieldGet2(_client$8, this), _classPrivateFieldGet2(_httpRequest$8, this), query, params, options);
  }
  listen(query, params, options) {
    return _listen$1(_classPrivateFieldGet2(_client$8, this), query, params, options);
  }
};
var _client2$7 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$8 = /* @__PURE__ */ new WeakMap();
var CollaborationCommentsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2$7, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$8, void 0), _classPrivateFieldSet2(_client2$7, this, client), _classPrivateFieldSet2(_httpRequest2$8, this, httpRequest);
  }
  /**
  * Create a comment or reply on the configured resource.
  *
  * A top-level comment requires `target`; a reply requires `parentCommentId` (never both).
  * Replies inherit `target`, `status`, and `threadId` from the parent comment.
  *
  * @param body - Comment to create
  * @param options - Optional request options
  * @returns The created comment
  */
  create(body, options) {
    return lastValueFrom(_create(_classPrivateFieldGet2(_client2$7, this), _classPrivateFieldGet2(_httpRequest2$8, this), body, options));
  }
  /**
  * Update an existing comment.
  *
  * Updating `status` cascades to the comment's replies.
  *
  * @param id - Comment document ID
  * @param body - Fields to update
  * @param options - Optional request options
  * @returns The updated comment
  */
  update(id, body, options) {
    return lastValueFrom(_update(_classPrivateFieldGet2(_client2$7, this), _classPrivateFieldGet2(_httpRequest2$8, this), id, body, options));
  }
  /**
  * Delete a comment and its replies.
  *
  * @param id - Comment document ID
  * @param options - Optional request options
  * @returns Mutation result, where `documentIds` covers the comment and every deleted reply
  */
  delete(id, options) {
    return lastValueFrom(_delete(_classPrivateFieldGet2(_client2$7, this), _classPrivateFieldGet2(_httpRequest2$8, this), id, options));
  }
  /**
  * Add the current user's reaction to a comment.
  *
  * @param id - Comment document ID
  * @param shortName - Emoji short name, for example `:+1:`
  * @param options - Optional request options
  * @returns The comment, with the reaction applied
  */
  addReaction(id, shortName, options) {
    return lastValueFrom(_addReaction(_classPrivateFieldGet2(_client2$7, this), _classPrivateFieldGet2(_httpRequest2$8, this), id, shortName, options));
  }
  /**
  * Remove the current user's reaction from a comment.
  *
  * @param id - Comment document ID
  * @param shortName - Emoji short name, for example `:+1:`
  * @param options - Optional request options
  * @returns The comment, with the reaction removed
  */
  removeReaction(id, shortName, options) {
    return lastValueFrom(_removeReaction(_classPrivateFieldGet2(_client2$7, this), _classPrivateFieldGet2(_httpRequest2$8, this), id, shortName, options));
  }
  /**
  * Build the global document reference used by `target.document._ref`, for use in
  * queries and listeners.
  *
  * The reference is built from the configured `resource` and the published ID of
  * the given document ID, since comment references always use published IDs.
  *
  * @example
  * ```ts
  * const comments = await client.collaboration.comments.fetch(
  *   '*[_type == "sanity.comment" && target.document._ref == $ref]',
  *   {ref: client.collaboration.comments.getTargetDocumentRef('doc-1')},
  * )
  * ```
  *
  * @param documentId - Document ID, in published, draft or version form
  * @returns Global document reference, of the form `resourceType:resourceId:documentId`
  */
  getTargetDocumentRef(documentId) {
    return _getTargetDocumentRef(_classPrivateFieldGet2(_client2$7, this), documentId);
  }
  /**
  * Fetch comments on the configured resource.
  *
  * Takes the same `query` and `params` as `client.fetch`, and switches from a
  * GET to a POST for queries too large for the request URL in the same way,
  * but queries the comments endpoint, which accepts none of the query options
  * `client.fetch` does (`perspective`, `useCdn`, `filterResponse`,
  * `resultSourceMap`, stega).
  *
  * The query runs against the organization store, which is not scoped to
  * comments, so filter on `_type == "sanity.comment"`.
  *
  * @param query - GROQ-query to perform
  * @param params - Optional query parameters
  * @param options - Optional request options
  */
  fetch(query, params, options) {
    return lastValueFrom(_fetch$1(_classPrivateFieldGet2(_client2$7, this), _classPrivateFieldGet2(_httpRequest2$8, this), query, params, options));
  }
  listen(query, params, options) {
    return _listen$1(_classPrivateFieldGet2(_client2$7, this), query, params, options);
  }
};
function _organizationId(client) {
  let organizationId = client.config().context?.organizationId;
  if (!organizationId) throw Error("`context.organizationId` must be configured to query Context documents");
  return organizationId;
}
function storeUrl(client, suffix) {
  return `/context/organizations/${encodeURIComponent(_organizationId(client))}/${suffix}`;
}
function _fetch(client, httpRequest, query, params, options) {
  let url = storeUrl(client, "query");
  return _requestObservable(client, httpRequest, {
    ...encodeQueryString({
      query,
      params
    }).length < 11264 ? {
      method: "GET",
      url: `${url}${encodeQueryString({
        query,
        params
      })}`
    } : {
      method: "POST",
      url,
      body: {
        query,
        params: params ?? {}
      }
    },
    ...pick(options || {}, possibleStoreRequestOptions)
  }).pipe(map((response) => response.result));
}
function _listen(client, query, params, options) {
  let opts = options ?? {}, { requestTagPrefix } = client.config(), tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag, listenOpts = pick({
    ...defaults_default(opts, defaultOptions),
    tag
  }, possibleOptions), qs = encodeQueryString({
    query,
    params,
    options: listenOpts
  }), uri = `${client.getUrl(storeUrl(client, "listen"))}${qs}`;
  return uri.length > 14800 ? throwError(() => Error("Query too large for listener")) : _connectListenEventSource(client, uri, opts.events ? opts.events : ["mutation"]);
}
var ENTRY_TYPE = "sanity.context.entry";
var ISSUE_TYPE = "sanity.context.issue";
var MCP_TYPE = "sanity.context.mcp";
function _one(client, httpRequest, query, params, options) {
  return lastValueFrom(_fetch(client, httpRequest, query, params, options));
}
async function _drainByCreatedAt(client, httpRequest, filter2, params, options) {
  let all = [], cursor;
  for (; ; ) {
    let query = `*[${cursor ? `${filter2} && (_createdAt > $c || (_createdAt == $c && _id > $i))` : filter2}] | order(_createdAt asc, _id asc) [0...200]`, page = await lastValueFrom(_fetch(client, httpRequest, query, cursor ? {
      ...params,
      ...cursor
    } : params, options));
    if (all.push(...page), page.length < 200) return all;
    let last2 = page[page.length - 1];
    cursor = {
      c: last2._createdAt,
      i: last2._id
    };
  }
}
function _readEntry(client, httpRequest, knowledgeBaseId, path, options) {
  return _one(client, httpRequest, `*[_type == "${ENTRY_TYPE}" && knowledgeBaseId == $kb && path == $path][0]`, {
    kb: knowledgeBaseId,
    path
  }, options);
}
async function _listEntries(client, httpRequest, knowledgeBaseId, options) {
  let all = [], after = "";
  for (; ; ) {
    let page = await lastValueFrom(_fetch(client, httpRequest, `*[_type == "${ENTRY_TYPE}" && knowledgeBaseId == $kb && path > $after] | order(path asc) [0...200] {_id, path, title, tldr, status}`, {
      kb: knowledgeBaseId,
      after
    }, options));
    if (all.push(...page), page.length < 200) return all;
    after = page[page.length - 1].path;
  }
}
function _listIssues(client, httpRequest, knowledgeBaseId, status, options) {
  return _drainByCreatedAt(client, httpRequest, `_type == "${ISSUE_TYPE}" && knowledgeBaseId == $kb${status === void 0 ? "" : " && status == $status"}`, status === void 0 ? { kb: knowledgeBaseId } : {
    kb: knowledgeBaseId,
    status
  }, options);
}
function _readIssue(client, httpRequest, knowledgeBaseId, issueId, options) {
  return _one(client, httpRequest, `*[_type == "${ISSUE_TYPE}" && knowledgeBaseId == $kb && _id == $id][0]`, {
    kb: knowledgeBaseId,
    id: issueId
  }, options);
}
function _listInstructions(client, httpRequest, knowledgeBaseId, options) {
  return _drainByCreatedAt(client, httpRequest, '_type == "sanity.context.instruction" && knowledgeBaseId == $kb && schemaVersion == 1', { kb: knowledgeBaseId }, options);
}
function _listMcpEndpoints(client, httpRequest, options) {
  return lastValueFrom(_fetch(client, httpRequest, `*[_type == "${MCP_TYPE}" && organizationId == $org] | order(_createdAt asc, _id asc) [0...500]`, { org: _organizationId(client) }, options));
}
function _readMcpEndpoint(client, httpRequest, name, options) {
  return _one(client, httpRequest, `*[_type == "${MCP_TYPE}" && organizationId == $org && name == $name][0]`, {
    org: _organizationId(client),
    name
  }, options);
}
function _readConversation(client, httpRequest, threadId, options) {
  return _one(client, httpRequest, '*[_type == "sanity.context.conversation" && organizationId == $org && threadId == $threadId][0]', {
    org: _organizationId(client),
    threadId
  }, options);
}
function _classPrivateMethodInitSpec(e, a) {
  _checkPrivateRedeclaration(e, a), a.add(e);
}
var COLLECTION_URL = "/context/knowledge-bases";
function _resolveKnowledgeBaseId(client) {
  let resource = client.config().resource;
  if (resource?.type !== "knowledge-base") throw Error("`resource` of type `knowledge-base` must be configured to use knowledge-base methods");
  return resource.id;
}
function _knowledgeBaseUrl(knowledgeBaseId, suffix = "") {
  return `${COLLECTION_URL}/${encodeURIComponent(knowledgeBaseId)}${suffix}`;
}
function _conversationUrl(client, threadId) {
  let organizationId = client.config().context?.organizationId;
  if (!organizationId) throw Error("`context.organizationId` must be configured to record conversations");
  if (!threadId) throw Error("`threadId` must be provided");
  return `/context/organizations/${encodeURIComponent(organizationId)}/conversations/${encodeURIComponent(threadId)}`;
}
function _query(entries) {
  return Object.fromEntries(Object.entries(entries).flatMap(([key, value]) => value === void 0 ? [] : [[key, `${value}`]]));
}
function _fetchBody(file) {
  return ArrayBuffer.isView(file) ? file.buffer instanceof ArrayBuffer ? new Uint8Array(file.buffer, file.byteOffset, file.byteLength) : Uint8Array.from(file) : file;
}
var _client$7 = /* @__PURE__ */ new WeakMap();
var _httpRequest$7 = /* @__PURE__ */ new WeakMap();
var _ContextClient_brand = /* @__PURE__ */ new WeakSet();
var ContextClient = class {
  constructor(client, httpRequest) {
    _classPrivateMethodInitSpec(this, _ContextClient_brand), _classPrivateFieldInitSpec(this, _client$7, void 0), _classPrivateFieldInitSpec(this, _httpRequest$7, void 0), _defineProperty(
      this,
      /** The knowledge base collection: management addressed per call. */
      "knowledgeBases",
      {
        /** Create a knowledge base. Requires the org-level knowledge-base create grant. */
        create: (params, options) => _request(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), {
          url: COLLECTION_URL,
          method: "POST",
          body: params,
          ...options
        }),
        /** List the organization's knowledge bases. */
        list: (params) => _request(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), {
          url: COLLECTION_URL,
          query: _query({
            organizationId: params.organizationId,
            cursor: params.cursor,
            limit: params.limit
          }),
          signal: params.signal,
          tag: params.tag
        }),
        /** Fetch a knowledge base by its id. */
        get: (knowledgeBaseId, options) => _request(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), {
          url: _knowledgeBaseUrl(knowledgeBaseId),
          ...options
        }),
        /** Edit a knowledge base's configuration. */
        edit: (knowledgeBaseId, params, options) => _request(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), {
          url: _knowledgeBaseUrl(knowledgeBaseId),
          method: "PATCH",
          body: params,
          ...options
        }),
        /** Delete a knowledge base and its generated content. */
        delete: async (knowledgeBaseId, options) => {
          await _request(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), {
            url: _knowledgeBaseUrl(knowledgeBaseId),
            method: "DELETE",
            ...options
          });
        }
      }
    ), _defineProperty(
      this,
      /**
      * Conversation telemetry. `threadId` identifies the conversation within
      * the organization — reuse means the same conversation. Beyond the canned
      * `get`, reads go through {@link fetch} and {@link listen} with GROQ
      * (`_type == "sanity.context.conversation"`).
      *
      * Requires `context.organizationId` in the client configuration.
      */
      "conversations",
      {
        /**
        * Record a conversation. Messages replace the stored transcript
        * wholesale; `metadata` and model fields only overwrite when present.
        * Last write per thread wins — retries are safe.
        */
        save: (params, options) => {
          let { threadId, ...body } = params;
          return _request(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), {
            url: _conversationUrl(_classPrivateFieldGet2(_client$7, this), threadId),
            method: "PUT",
            body,
            ...options
          });
        },
        /**
        * Record the classification your own model produced for one thread:
        * exactly one of `coreMetrics` (a verdict) or `classificationError`
        * (why classification failed).
        */
        classify: (params, options) => {
          let { threadId, ...body } = params;
          return _request(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), {
            url: _conversationUrl(_classPrivateFieldGet2(_client$7, this), threadId),
            method: "PATCH",
            body,
            ...options
          });
        },
        /**
        * One recorded conversation by its thread id, or `null` when the thread
        * was never recorded. Runs:
        *
        * `*[_type == "sanity.context.conversation" && organizationId == $org && threadId == $threadId][0]`
        *
        * For anything more, use {@link fetch}.
        */
        get: (params, options) => _readConversation(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), params.threadId, options)
      }
    ), _defineProperty(
      this,
      /** Imports: feed content into the configured knowledge base. */
      "imports",
      {
        /**
        * Import content. One entry point, discriminated on `type`: inline
        * `text`, a website `crawl`, a Sanity `dataset` bind, or a `file`
        * upload. Processing queues automatically. The file variant stages the
        * upload, PUTs the bytes to a signed storage URL, and confirms; the
        * bytes never pass through the Context API.
        */
        create: (params, options) => params.type === "file" ? _assertClassBrand(_ContextClient_brand, this, _uploadFile).call(this, params, options) : _assertClassBrand(_ContextClient_brand, this, _request2).call(this, "/imports", {
          method: "POST",
          body: params,
          ...options
        }),
        list: (params) => _assertClassBrand(_ContextClient_brand, this, _list).call(this, "/imports", params),
        get: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/imports/${encodeURIComponent(params.importId)}`, options),
        /** A short-lived signed URL for the original uploaded bytes. */
        download: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/imports/${encodeURIComponent(params.importId)}/download`, options),
        delete: async (params, options) => {
          await _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/imports/${encodeURIComponent(params.importId)}`, {
            method: "DELETE",
            ...options
          });
        }
      }
    ), _defineProperty(
      this,
      /** Jobs: poll async work (builds, imports) to a terminal state. */
      "jobs",
      { get: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/jobs/${encodeURIComponent(params.jobId)}`, options) }
    ), _defineProperty(
      this,
      /**
      * Issues: findings from builds awaiting triage. Reads are canned GROQ
      * queries against the organization's document store; for anything more,
      * use {@link fetch}. Reads require `context.organizationId` alongside the
      * knowledge-base `resource` in the client configuration.
      */
      "issues",
      {
        /**
        * Every issue on the knowledge base, oldest first, optionally narrowed
        * to one status. Drains keyset pages internally and resolves with the
        * complete set. Runs:
        *
        * `*[_type == "sanity.context.issue" && knowledgeBaseId == $kb && status == $status] | order(_createdAt asc, _id asc)`
        *
        * (the status clause only when given). For anything more, use {@link fetch}.
        */
        list: (params, options) => _listIssues(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client$7, this)), params?.status, options),
        /**
        * One issue by its document id, or `null` when it does not exist. Runs:
        *
        * `*[_type == "sanity.context.issue" && knowledgeBaseId == $kb && _id == $id][0]`
        *
        * For anything more, use {@link fetch}.
        */
        get: (params, options) => _readIssue(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client$7, this)), params.issueId, options),
        /** Resolve a conflict issue. Mints the standing instruction, same as the dashboard. */
        resolve: (params, options) => {
          let { issueId, ...body } = params;
          return _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/issues/${encodeURIComponent(issueId)}/resolve`, {
            method: "POST",
            body,
            ...options
          });
        },
        dismiss: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/issues/${encodeURIComponent(params.issueId)}/dismiss`, {
          method: "POST",
          ...options
        }),
        reopen: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/issues/${encodeURIComponent(params.issueId)}/reopen`, {
          method: "POST",
          ...options
        }),
        /** Apply already-accepted issues to the knowledge base in one batch. */
        apply: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, "/issues/apply", {
          method: "POST",
          body: params,
          ...options
        })
      }
    ), _defineProperty(
      this,
      /** Instructions: standing decisions that steer every build. */
      "instructions",
      {
        create: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, "/instructions", {
          method: "POST",
          body: params,
          ...options
        }),
        /**
        * Every current-schema instruction on the knowledge base, oldest first.
        * Drains keyset pages internally and resolves with the complete set.
        * Runs:
        *
        * `*[_type == "sanity.context.instruction" && knowledgeBaseId == $kb && schemaVersion == 1] | order(_createdAt asc, _id asc)`
        *
        * For anything more, use {@link fetch}. Requires `context.organizationId`
        * alongside the knowledge-base `resource` in the client configuration.
        */
        list: (options) => _listInstructions(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client$7, this)), options),
        edit: (params, options) => {
          let { instructionId, ...body } = params;
          return _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/instructions/${encodeURIComponent(instructionId)}`, {
            method: "PATCH",
            body,
            ...options
          });
        },
        delete: async (params, options) => {
          await _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/instructions/${encodeURIComponent(params.instructionId)}`, {
            method: "DELETE",
            ...options
          });
        }
      }
    ), _defineProperty(
      this,
      /**
      * Entries: the built outline, one entry per node. Reads are canned GROQ
      * queries against the organization's document store; for anything more,
      * use {@link fetch}. Requires `context.organizationId` alongside the
      * knowledge-base `resource` in the client configuration.
      */
      "entries",
      {
        /**
        * Every entry, path-ordered, as a metadata view (`_id`, `path`,
        * `title`, `tldr`, `status`) with bodies excluded. Drains keyset pages
        * internally and resolves with the complete set. Runs:
        *
        * `*[_type == "sanity.context.entry" && knowledgeBaseId == $kb && path > $after] | order(path asc) [0...200] {_id, path, title, tldr, status}`
        *
        * For bodies, use `entries.get` or {@link fetch}.
        */
        list: (options) => _listEntries(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client$7, this)), options),
        /**
        * One entry with its full body and citations, by outline path (e.g.
        * `billing/refunds`), or `null` when no entry sits at that path. Runs:
        *
        * `*[_type == "sanity.context.entry" && knowledgeBaseId == $kb && path == $path][0]`
        *
        * For anything more, use {@link fetch}.
        */
        get: (params, options) => _readEntry(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client$7, this)), params.path, options),
        /**
        * Rebuild one entry from its already-placed sources, by outline path.
        * Poll the returned job with {@link jobs}; `affectedEntries` lists every
        * entry the rebuild touches.
        */
        rebuild: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/entries/${encodeURIComponent(params.path)}/rebuild`, {
          method: "POST",
          ...options
        })
      }
    ), _defineProperty(
      this,
      /**
      * MCP endpoint configurations, org-owned documents read with canned GROQ
      * queries. Requires `context.organizationId` in the client configuration.
      */
      "mcpEndpoints",
      {
        /**
        * The organization's MCP endpoint configurations, oldest first. Runs:
        *
        * `*[_type == "sanity.context.mcp" && organizationId == $org] | order(_createdAt asc, _id asc) [0...500]`
        *
        * For anything more, use {@link fetch}.
        */
        list: (options) => _listMcpEndpoints(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), options),
        /**
        * One MCP endpoint configuration by its URL name, or `null` when none
        * carries that name. Runs:
        *
        * `*[_type == "sanity.context.mcp" && organizationId == $org && name == $name][0]`
        *
        * For anything more, use {@link fetch}.
        */
        get: (params, options) => _readMcpEndpoint(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), params.name, options)
      }
    ), _defineProperty(
      this,
      /** Sources: the distilled units builds cite. */
      "sources",
      {
        /**
        * List sources, optionally filtered by `status` or the `importId` they
        * came from. `ids` is a lookup mode: it resolves those exact sources
        * (e.g. from an entry's citations) and overrides `status` and `cursor`.
        */
        list: (params) => _assertClassBrand(_ContextClient_brand, this, _list).call(this, "/sources", params, {
          status: params?.status,
          importId: params?.importId,
          ids: params?.ids?.join(",")
        }),
        get: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/sources/${encodeURIComponent(params.sourceId)}`, options),
        /**
        * Distilled source content, optionally a line range: the evidence behind
        * a citation or an issue.
        */
        content: (params, options) => _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/sources/${encodeURIComponent(params.sourceId)}/content`, {
          query: _query({
            startLine: params.startLine,
            endLine: params.endLine
          }),
          ...options
        }),
        delete: async (params, options) => {
          await _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/sources/${encodeURIComponent(params.sourceId)}`, {
            method: "DELETE",
            ...options
          });
        }
      }
    ), _classPrivateFieldSet2(_client$7, this, client), _classPrivateFieldSet2(_httpRequest$7, this, httpRequest);
  }
  /**
  * GROQ over the organization's Context documents (conversation telemetry
  * today; the store holds every Context family and the caller's access
  * decides what a query returns, so filter on `_type`).
  *
  * Requires `context.organizationId` in the client configuration.
  */
  fetch(query, params, options) {
    return lastValueFrom(_fetch(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), query, params, options));
  }
  /**
  * Listen for changes to the organization's Context documents. Mirrors
  * `client.listen(query, params, options)` and emits mutation events by
  * default.
  */
  listen(query, params, options) {
    return _listen(_classPrivateFieldGet2(_client$7, this), query, params, options);
  }
  /**
  * Build the configured knowledge base. The server waits for pending import
  * processing before assembling, so importing and building back to back is
  * safe. Track the returned job with {@link jobs}.
  */
  build(options) {
    return _assertClassBrand(_ContextClient_brand, this, _request2).call(this, "/build", {
      method: "POST",
      ...options
    });
  }
  /** Cancel the running build, if any. */
  cancelBuild(options) {
    return _assertClassBrand(_ContextClient_brand, this, _request2).call(this, "/build/cancel", {
      method: "POST",
      ...options
    });
  }
  /** Run an incremental refresh: re-check sources and apply what changed. */
  refresh(options) {
    return _assertClassBrand(_ContextClient_brand, this, _request2).call(this, "/refresh", {
      method: "POST",
      ...options
    });
  }
};
function _request2(suffix, reqOptions = {}) {
  return _request(_classPrivateFieldGet2(_client$7, this), _classPrivateFieldGet2(_httpRequest$7, this), {
    url: _knowledgeBaseUrl(_resolveKnowledgeBaseId(_classPrivateFieldGet2(_client$7, this)), suffix),
    ...reqOptions
  });
}
function _list(suffix, params, extraQuery) {
  return _assertClassBrand(_ContextClient_brand, this, _request2).call(this, suffix, {
    query: _query({
      cursor: params?.cursor,
      limit: params?.limit,
      ...extraQuery
    }),
    signal: params?.signal,
    tag: params?.tag
  });
}
async function _uploadFile(params, options) {
  let staged = await _assertClassBrand(_ContextClient_brand, this, _request2).call(this, "/imports/uploads", {
    method: "POST",
    body: {
      filename: params.filename,
      ...params.contentType && { contentType: params.contentType }
    },
    ...options
  }), config = _classPrivateFieldGet2(_client$7, this).config(), putResponse = await (config.resolveFetch?.(config.proxy) ?? globalThis.fetch)(staged.uploadUrl, {
    method: "PUT",
    body: _fetchBody(params.file),
    ...params.contentType && { headers: { "content-type": params.contentType } },
    signal: options?.signal
  });
  if (!putResponse.ok) throw Error(`File upload failed: ${putResponse.status} ${putResponse.statusText}`);
  return _assertClassBrand(_ContextClient_brand, this, _request2).call(this, `/imports/uploads/${encodeURIComponent(staged.importId)}/complete`, {
    method: "POST",
    body: {},
    ...options
  });
}
var _client2$6 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$7 = /* @__PURE__ */ new WeakMap();
var ObservableContextClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2$6, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$7, void 0), _defineProperty(
      this,
      /** The knowledge base collection: management addressed per call. */
      "knowledgeBases",
      {
        /** Create a knowledge base. Requires the org-level knowledge-base create grant. */
        create: (params, options) => _observe(options?.signal, (signal) => _request(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), {
          url: COLLECTION_URL,
          method: "POST",
          body: params,
          tag: options?.tag,
          signal
        })),
        /** List the organization's knowledge bases. */
        list: (params) => _observe(params.signal, (signal) => _request(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), {
          url: COLLECTION_URL,
          query: _query({
            organizationId: params.organizationId,
            cursor: params.cursor,
            limit: params.limit
          }),
          tag: params.tag,
          signal
        })),
        /** Fetch a knowledge base by its id. */
        get: (knowledgeBaseId, options) => _observe(options?.signal, (signal) => _request(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), {
          url: _knowledgeBaseUrl(knowledgeBaseId),
          tag: options?.tag,
          signal
        })),
        /** Edit a knowledge base's configuration. */
        edit: (knowledgeBaseId, params, options) => _observe(options?.signal, (signal) => _request(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), {
          url: _knowledgeBaseUrl(knowledgeBaseId),
          method: "PATCH",
          body: params,
          tag: options?.tag,
          signal
        })),
        /** Delete a knowledge base and its generated content. */
        delete: (knowledgeBaseId, options) => _observe(options?.signal, (signal) => _request(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), {
          url: _knowledgeBaseUrl(knowledgeBaseId),
          method: "DELETE",
          tag: options?.tag,
          signal
        }))
      }
    ), _defineProperty(
      this,
      /**
      * Conversation telemetry. `threadId` identifies the conversation within
      * the organization — reuse means the same conversation. Beyond the canned
      * `get`, reads go through {@link fetch} and {@link listen} with GROQ
      * (`_type == "sanity.context.conversation"`).
      *
      * Requires `context.organizationId` in the client configuration.
      */
      "conversations",
      {
        /**
        * Record a conversation. Messages replace the stored transcript
        * wholesale; `metadata` and model fields only overwrite when present.
        * Last write per thread wins — retries are safe.
        */
        save: (params, options) => {
          let { threadId, ...body } = params;
          return _observe(options?.signal, (signal) => _request(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), {
            url: _conversationUrl(_classPrivateFieldGet2(_client2$6, this), threadId),
            method: "PUT",
            body,
            tag: options?.tag,
            signal
          }));
        },
        /**
        * Record the classification your own model produced for one thread:
        * exactly one of `coreMetrics` (a verdict) or `classificationError`
        * (why classification failed).
        */
        classify: (params, options) => {
          let { threadId, ...body } = params;
          return _observe(options?.signal, (signal) => _request(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), {
            url: _conversationUrl(_classPrivateFieldGet2(_client2$6, this), threadId),
            method: "PATCH",
            body,
            tag: options?.tag,
            signal
          }));
        },
        /**
        * One recorded conversation by its thread id, or `null` when the thread
        * was never recorded. Runs:
        *
        * `*[_type == "sanity.context.conversation" && organizationId == $org && threadId == $threadId][0]`
        *
        * For anything more, use {@link fetch}.
        */
        get: (params, options) => _observe(options?.signal, (signal) => _readConversation(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), params.threadId, {
          ...options,
          signal
        }))
      }
    ), _defineProperty(
      this,
      /**
      * Entries: the built outline, one entry per node. Reads are canned GROQ
      * queries against the organization's document store; for anything more,
      * use {@link fetch}. Requires `context.organizationId` alongside the
      * knowledge-base `resource` in the client configuration.
      */
      "entries",
      {
        /**
        * Every entry, path-ordered, as a metadata view (`_id`, `path`,
        * `title`, `tldr`, `status`) with bodies excluded. Drains keyset pages
        * internally and emits the complete set. Runs:
        *
        * `*[_type == "sanity.context.entry" && knowledgeBaseId == $kb && path > $after] | order(path asc) [0...200] {_id, path, title, tldr, status}`
        *
        * For bodies, use `entries.get` or {@link fetch}.
        */
        list: (options) => _observe(options?.signal, (signal) => _listEntries(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client2$6, this)), {
          ...options,
          signal
        })),
        /**
        * One entry with its full body and citations, by outline path (e.g.
        * `billing/refunds`), or `null` when no entry sits at that path. Runs:
        *
        * `*[_type == "sanity.context.entry" && knowledgeBaseId == $kb && path == $path][0]`
        *
        * For anything more, use {@link fetch}.
        */
        get: (params, options) => _observe(options?.signal, (signal) => _readEntry(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client2$6, this)), params.path, {
          ...options,
          signal
        })),
        /**
        * Rebuild one entry from its already-placed sources, by outline path.
        * Poll the returned job with the promise client's `jobs`;
        * `affectedEntries` lists every entry the rebuild touches.
        */
        rebuild: (params, options) => _observe(options?.signal, (signal) => _request(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), {
          url: _knowledgeBaseUrl(_resolveKnowledgeBaseId(_classPrivateFieldGet2(_client2$6, this)), `/entries/${encodeURIComponent(params.path)}/rebuild`),
          method: "POST",
          tag: options?.tag,
          signal
        }))
      }
    ), _defineProperty(
      this,
      /**
      * Issues: findings from builds awaiting triage. Reads are canned GROQ
      * queries against the organization's document store; for anything more,
      * use {@link fetch}. Requires `context.organizationId` alongside the
      * knowledge-base `resource` in the client configuration.
      */
      "issues",
      {
        /**
        * Every issue on the knowledge base, oldest first, optionally narrowed
        * to one status. Drains keyset pages internally and emits the complete
        * set. Runs:
        *
        * `*[_type == "sanity.context.issue" && knowledgeBaseId == $kb && status == $status] | order(_createdAt asc, _id asc)`
        *
        * (the status clause only when given). For anything more, use {@link fetch}.
        */
        list: (params, options) => _observe(options?.signal, (signal) => _listIssues(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client2$6, this)), params?.status, {
          ...options,
          signal
        })),
        /**
        * One issue by its document id, or `null` when it does not exist. Runs:
        *
        * `*[_type == "sanity.context.issue" && knowledgeBaseId == $kb && _id == $id][0]`
        *
        * For anything more, use {@link fetch}.
        */
        get: (params, options) => _observe(options?.signal, (signal) => _readIssue(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client2$6, this)), params.issueId, {
          ...options,
          signal
        }))
      }
    ), _defineProperty(
      this,
      /**
      * Instructions: standing decisions that steer every build. The canned
      * GROQ read; writes are promise-based on `client.context`.
      */
      "instructions",
      {
        /**
        * Every current-schema instruction on the knowledge base, oldest first.
        * Drains keyset pages internally and emits the complete set. Runs:
        *
        * `*[_type == "sanity.context.instruction" && knowledgeBaseId == $kb && schemaVersion == 1] | order(_createdAt asc, _id asc)`
        *
        * For anything more, use {@link fetch}. Requires `context.organizationId`
        * alongside the knowledge-base `resource` in the client configuration.
        */
        list: (options) => _observe(options?.signal, (signal) => _listInstructions(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), _resolveKnowledgeBaseId(_classPrivateFieldGet2(_client2$6, this)), {
          ...options,
          signal
        }))
      }
    ), _defineProperty(
      this,
      /**
      * MCP endpoint configurations, org-owned documents read with canned GROQ
      * queries. Requires `context.organizationId` in the client configuration.
      */
      "mcpEndpoints",
      {
        /**
        * The organization's MCP endpoint configurations, oldest first. Runs:
        *
        * `*[_type == "sanity.context.mcp" && organizationId == $org] | order(_createdAt asc, _id asc) [0...500]`
        *
        * For anything more, use {@link fetch}.
        */
        list: (options) => _observe(options?.signal, (signal) => _listMcpEndpoints(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), {
          ...options,
          signal
        })),
        /**
        * One MCP endpoint configuration by its URL name, or `null` when none
        * carries that name. Runs:
        *
        * `*[_type == "sanity.context.mcp" && organizationId == $org && name == $name][0]`
        *
        * For anything more, use {@link fetch}.
        */
        get: (params, options) => _observe(options?.signal, (signal) => _readMcpEndpoint(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), params.name, {
          ...options,
          signal
        }))
      }
    ), _classPrivateFieldSet2(_client2$6, this, client), _classPrivateFieldSet2(_httpRequest2$7, this, httpRequest);
  }
  /**
  * GROQ over the organization's Context documents (conversation telemetry
  * today; the store holds every Context family and the caller's access
  * decides what a query returns, so filter on `_type`).
  *
  * Requires `context.organizationId` in the client configuration.
  */
  fetch(query, params, options) {
    return _fetch(_classPrivateFieldGet2(_client2$6, this), _classPrivateFieldGet2(_httpRequest2$7, this), query, params, options);
  }
  /**
  * Listen for changes to the organization's Context documents. Mirrors
  * `client.listen(query, params, options)` and emits mutation events by
  * default.
  */
  listen(query, params, options) {
    return _listen(_classPrivateFieldGet2(_client2$6, this), query, params, options);
  }
};
function shareReplayLatest(configOrPredicate, config) {
  return _shareReplayLatest(typeof configOrPredicate == "function" ? {
    predicate: configOrPredicate,
    ...config
  } : configOrPredicate);
}
function _shareReplayLatest(config) {
  return (source) => {
    let latest, emitted = false, { predicate, ...shareConfig } = config, wrapped = source.pipe(tap((value) => {
      config.predicate(value) && (emitted = true, latest = value);
    }), finalize(() => {
      emitted = false, latest = void 0;
    }), share(shareConfig)), emitLatest = new Observable((subscriber) => {
      emitted && subscriber.next(latest), subscriber.complete();
    });
    return merge(wrapped, emitLatest);
  };
}
var requiredApiVersion = "2021-03-25";
var _client$6 = /* @__PURE__ */ new WeakMap();
var LiveClient = class {
  constructor(client) {
    _classPrivateFieldInitSpec(this, _client$6, void 0), _classPrivateFieldSet2(_client$6, this, client);
  }
  /**
  * Requires `apiVersion` to be `2021-03-25` or later.
  */
  events({ includeDrafts = false, tag: _tag, waitFor } = {}) {
    let config = _classPrivateFieldGet2(_client$6, this).config(), { projectId: projectId2, apiVersion: _apiVersion, token, withCredentials, requestTagPrefix, headers: configHeaders } = config, apiVersion = _apiVersion.replace(/^v/, "");
    if (apiVersion !== "X" && apiVersion < requiredApiVersion) throw Error(`The live events API requires API version ${requiredApiVersion} or later. The current API version is ${apiVersion}. Please update your API version to use this feature.`);
    if (includeDrafts && !token && !withCredentials) throw Error("The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role.");
    let path = _getDataUrl(_classPrivateFieldGet2(_client$6, this), "live/events"), url = new URL(_classPrivateFieldGet2(_client$6, this).getUrl(path, false)), tag = _tag && requestTagPrefix ? [requestTagPrefix, _tag].join(".") : _tag;
    tag && url.searchParams.set("tag", tag), includeDrafts && url.searchParams.set("includeDrafts", "true"), waitFor && url.searchParams.set("waitFor", waitFor);
    let eventSourceHeaders = {};
    includeDrafts && token && (eventSourceHeaders.Authorization = `Bearer ${token}`), configHeaders && Object.assign(eventSourceHeaders, configHeaders);
    let eventSourceWithCredentials = !!(includeDrafts && withCredentials), transportCache = eventsCache.get(config.resolveFetch);
    transportCache || (transportCache = /* @__PURE__ */ new Map(), eventsCache.set(config.resolveFetch, transportCache));
    let cacheKey = JSON.stringify([
      url.href,
      typeof config.proxy == "string" ? config.proxy : null,
      eventSourceHeaders,
      eventSourceWithCredentials
    ]), existing = transportCache.get(cacheKey);
    if (existing) return existing;
    let initEventSource = () => new EventSource(url.href, { fetch: resolveEventSourceFetch(config, {
      headers: Object.keys(eventSourceHeaders).length ? eventSourceHeaders : void 0,
      withCredentials: eventSourceWithCredentials
    }) }), events = connectEventSource(initEventSource, [
      "message",
      "restart",
      "welcome",
      "reconnect",
      "goaway"
    ]), checkCors = checkCorsObservable(new URL(_classPrivateFieldGet2(_client$6, this).getUrl("/check/cors", false)), projectId2, eventSourceWithCredentials, pickBaseFetch(config)), observable = events.pipe(reconnectOnConnectionFailure(), mergeMap((event) => event.type === "reconnect" ? checkCors.pipe(mergeMap(() => of(event))) : of(event)), catchError((err) => err instanceof CorsOriginError ? throwError(() => err) : checkCors.pipe(mergeMap(() => {
      throw err;
    }))), map((event) => {
      if (event.type === "message") {
        let { data, ...rest } = event;
        return {
          ...rest,
          tags: data.tags
        };
      }
      return event;
    })).pipe(finalize(() => {
      transportCache.delete(cacheKey), transportCache.size === 0 && eventsCache.delete(config.resolveFetch);
    }), shareReplayLatest({ predicate: (event) => event.type === "welcome" }));
    return transportCache.set(cacheKey, observable), observable;
  }
};
function checkCorsObservable(url, projectId2, requireCredentials, fetcher) {
  return new Observable((observer) => {
    let controller = new AbortController(), { signal } = controller;
    return fetcher(url.href, {
      method: "GET",
      credentials: "omit",
      signal
    }).then((response) => {
      if (!(signal.aborted || !response.ok)) return response.text();
    }).then((text) => {
      if (signal.aborted) return;
      let parsed = text === void 0 ? void 0 : JSON.parse(text), result = isRecord(parsed) ? parsed.result : void 0;
      if (requireCredentials && isRecord(result) && result.withCredentials === false) {
        observer.error(new CorsOriginError({
          projectId: projectId2,
          credentials: true
        }));
        return;
      }
      if (isRecord(result) && result.allowed === false) {
        observer.error(new CorsOriginError({
          projectId: projectId2,
          credentials: requireCredentials
        }));
        return;
      }
      observer.next(), observer.complete();
    }).catch(() => {
      signal.aborted || observer.closed || (observer.next(), observer.complete());
    }), () => controller.abort();
  });
}
var eventsCache = /* @__PURE__ */ new Map();
var _client$5 = /* @__PURE__ */ new WeakMap();
var _httpRequest$6 = /* @__PURE__ */ new WeakMap();
var ObservableDatasetsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client$5, void 0), _classPrivateFieldInitSpec(this, _httpRequest$6, void 0), _classPrivateFieldSet2(_client$5, this, client), _classPrivateFieldSet2(_httpRequest$6, this, httpRequest);
  }
  /**
  * Create a new dataset with the given name
  *
  * @param name - Name of the dataset to create
  * @param options - Options for the dataset, including optional embeddings configuration
  */
  create(name, options) {
    return _modifyObservable(_classPrivateFieldGet2(_client$5, this), _classPrivateFieldGet2(_httpRequest$6, this), "PUT", name, options);
  }
  /**
  * Edit a dataset with the given name
  *
  * @param name - Name of the dataset to edit
  * @param options - New options for the dataset
  */
  edit(name, options) {
    return _modifyObservable(_classPrivateFieldGet2(_client$5, this), _classPrivateFieldGet2(_httpRequest$6, this), "PATCH", name, options);
  }
  /**
  * Delete a dataset with the given name
  *
  * @param name - Name of the dataset to delete
  */
  delete(name) {
    return _modifyObservable(_classPrivateFieldGet2(_client$5, this), _classPrivateFieldGet2(_httpRequest$6, this), "DELETE", name);
  }
  /**
  * Fetch a list of datasets for the configured project
  */
  list() {
    resourceGuard("dataset", _classPrivateFieldGet2(_client$5, this).config());
    let config = _classPrivateFieldGet2(_client$5, this).config(), projectId2 = config.projectId, url = "/datasets";
    return config.useProjectHostname === false && (url = `/projects/${projectId2}/datasets`), _requestObservable(_classPrivateFieldGet2(_client$5, this), _classPrivateFieldGet2(_httpRequest$6, this), {
      url,
      tag: null
    });
  }
  /**
  * Get embeddings settings for a dataset
  *
  * @param name - Name of the dataset
  */
  getEmbeddingsSettings(name) {
    return resourceGuard("dataset", _classPrivateFieldGet2(_client$5, this).config()), dataset(name), _requestObservable(_classPrivateFieldGet2(_client$5, this), _classPrivateFieldGet2(_httpRequest$6, this), {
      url: _embeddingsSettingsUri(_classPrivateFieldGet2(_client$5, this), name),
      tag: null
    });
  }
  /**
  * Edit embeddings settings for a dataset
  *
  * @param name - Name of the dataset
  * @param settings - Embeddings settings to apply
  */
  editEmbeddingsSettings(name, settings) {
    return resourceGuard("dataset", _classPrivateFieldGet2(_client$5, this).config()), dataset(name), _requestObservable(_classPrivateFieldGet2(_client$5, this), _classPrivateFieldGet2(_httpRequest$6, this), {
      method: "PUT",
      url: _embeddingsSettingsUri(_classPrivateFieldGet2(_client$5, this), name),
      body: settings,
      tag: null
    });
  }
};
var _client2$5 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$6 = /* @__PURE__ */ new WeakMap();
var DatasetsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2$5, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$6, void 0), _classPrivateFieldSet2(_client2$5, this, client), _classPrivateFieldSet2(_httpRequest2$6, this, httpRequest);
  }
  /**
  * Create a new dataset with the given name
  *
  * @param name - Name of the dataset to create
  * @param options - Options for the dataset, including optional embeddings configuration
  */
  create(name, options) {
    return resourceGuard("dataset", _classPrivateFieldGet2(_client2$5, this).config()), _modify(_classPrivateFieldGet2(_client2$5, this), _classPrivateFieldGet2(_httpRequest2$6, this), "PUT", name, options);
  }
  /**
  * Edit a dataset with the given name
  *
  * @param name - Name of the dataset to edit
  * @param options - New options for the dataset
  */
  edit(name, options) {
    return resourceGuard("dataset", _classPrivateFieldGet2(_client2$5, this).config()), _modify(_classPrivateFieldGet2(_client2$5, this), _classPrivateFieldGet2(_httpRequest2$6, this), "PATCH", name, options);
  }
  /**
  * Delete a dataset with the given name
  *
  * @param name - Name of the dataset to delete
  */
  delete(name) {
    return resourceGuard("dataset", _classPrivateFieldGet2(_client2$5, this).config()), _modify(_classPrivateFieldGet2(_client2$5, this), _classPrivateFieldGet2(_httpRequest2$6, this), "DELETE", name);
  }
  /**
  * Fetch a list of datasets for the configured project
  */
  list() {
    resourceGuard("dataset", _classPrivateFieldGet2(_client2$5, this).config());
    let config = _classPrivateFieldGet2(_client2$5, this).config(), projectId2 = config.projectId, url = "/datasets";
    return config.useProjectHostname === false && (url = `/projects/${projectId2}/datasets`), _request(_classPrivateFieldGet2(_client2$5, this), _classPrivateFieldGet2(_httpRequest2$6, this), {
      url,
      tag: null
    });
  }
  /**
  * Get embeddings settings for a dataset
  *
  * @param name - Name of the dataset
  */
  getEmbeddingsSettings(name) {
    return resourceGuard("dataset", _classPrivateFieldGet2(_client2$5, this).config()), dataset(name), _request(_classPrivateFieldGet2(_client2$5, this), _classPrivateFieldGet2(_httpRequest2$6, this), {
      url: _embeddingsSettingsUri(_classPrivateFieldGet2(_client2$5, this), name),
      tag: null
    });
  }
  /**
  * Edit embeddings settings for a dataset
  *
  * @param name - Name of the dataset
  * @param settings - Embeddings settings to apply
  */
  editEmbeddingsSettings(name, settings) {
    return resourceGuard("dataset", _classPrivateFieldGet2(_client2$5, this).config()), dataset(name), _request(_classPrivateFieldGet2(_client2$5, this), _classPrivateFieldGet2(_httpRequest2$6, this), {
      method: "PUT",
      url: _embeddingsSettingsUri(_classPrivateFieldGet2(_client2$5, this), name),
      body: settings,
      tag: null
    });
  }
};
function _embeddingsSettingsUri(client, name) {
  let config = client.config();
  return config.useProjectHostname === false ? `/projects/${config.projectId}/datasets/${name}/settings/embeddings` : `/datasets/${name}/settings/embeddings`;
}
function _modifyObservable(client, httpRequest, method, name, options) {
  return resourceGuard("dataset", client.config()), dataset(name), _requestObservable(client, httpRequest, {
    method,
    url: `/datasets/${name}`,
    body: options,
    tag: null
  });
}
function _modify(client, httpRequest, method, name, options) {
  return resourceGuard("dataset", client.config()), dataset(name), _request(client, httpRequest, {
    method,
    url: `/datasets/${name}`,
    body: options,
    tag: null
  });
}
var SYNC_INVOCABLE_FUNCTION_TYPES = ["sanity.function.pubsub"];
var ASYNC_INVOCABLE_FUNCTION_TYPES = [
  "sanity.function.durable",
  "sanity.function.pubsub",
  "sanity.function.queue"
];
var INVOCABLE_FUNCTION_TYPES = [.../* @__PURE__ */ new Set([...SYNC_INVOCABLE_FUNCTION_TYPES, ...ASYNC_INVOCABLE_FUNCTION_TYPES])];
var scopeHeaders = (config, request) => {
  let organizationId = request?.organizationId || config.organizationId;
  if (organizationId) return {
    "X-Sanity-Scope-Type": "organization",
    "X-Sanity-Scope-Id": organizationId
  };
  let { projectId: projectId2 } = config;
  if (!projectId2) throw Error("`functions.invoke()` requires a `projectId` to be set in the client config, or an `organizationId` for a stack deployed at organization scope");
  return {
    "X-Sanity-Scope-Type": "project",
    "X-Sanity-Scope-Id": projectId2
  };
};
var resolveStackId = (config, request) => {
  let stackId = request?.stackId || config.stackId;
  if (!stackId) throw Error("`functions.invoke()` requires a `stackId`, either in the client config or on the request. Function names are only unique within a stack.");
  return stackId;
};
function _resolveFunctionId(client, httpRequest, functionName, stackId, headers, request, sync) {
  return _requestObservable(client, httpRequest, {
    method: "GET",
    url: `/blueprints/stacks/${stackId}`,
    headers,
    signal: request?.signal
  }).pipe(map((stack) => {
    let match = (stack?.resources || []).find((resource) => resource.type?.startsWith("sanity.function.") && resource.name === functionName);
    if (!match) throw Error(`Function "${functionName}" not found in stack "${stackId}"`);
    if (!match.externalId) throw Error(`Function "${functionName}" is declared in stack "${stackId}" but is not deployed`);
    if (!INVOCABLE_FUNCTION_TYPES.includes(match.type)) throw Error(`Function invocation is not supported for ${match.type}`);
    if (sync && !SYNC_INVOCABLE_FUNCTION_TYPES.includes(match.type)) throw Error(`Synchronous function invocation is not supported for ${match.type}`);
    if (!sync && !ASYNC_INVOCABLE_FUNCTION_TYPES.includes(match.type)) throw Error(`Asynchronous function invocation is not supported for ${match.type}`);
    return match.externalId;
  }));
}
function _invoke(client, httpRequest, functionName, request, options) {
  return defer(() => {
    let config = client.config(), headers = scopeHeaders(config, request), stackId = resolveStackId(config, request), sync = options?.sync ?? false;
    return _resolveFunctionId(client, httpRequest, functionName, stackId, headers, request, sync).pipe(mergeMap((functionId) => _requestObservable(client, httpRequest, {
      method: "POST",
      url: `/functions/${functionId}/invoke${sync ? "?sync=true" : ""}`,
      headers,
      body: { event: { data: request?.event?.data ?? {} } },
      timeout: request?.timeout,
      signal: request?.signal
    })));
  });
}
var _client$4 = /* @__PURE__ */ new WeakMap();
var _httpRequest$5 = /* @__PURE__ */ new WeakMap();
var ObservableFunctionsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client$4, void 0), _classPrivateFieldInitSpec(this, _httpRequest$5, void 0), _classPrivateFieldSet2(_client$4, this, client), _classPrivateFieldSet2(_httpRequest$5, this, httpRequest);
  }
  invoke(functionName, request, options) {
    return _invoke(_classPrivateFieldGet2(_client$4, this), _classPrivateFieldGet2(_httpRequest$5, this), functionName, request, options);
  }
};
var _client2$4 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$5 = /* @__PURE__ */ new WeakMap();
var FunctionsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2$4, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$5, void 0), _classPrivateFieldSet2(_client2$4, this, client), _classPrivateFieldSet2(_httpRequest2$5, this, httpRequest);
  }
  invoke(functionName, request, options) {
    return lastValueFrom(_invoke(_classPrivateFieldGet2(_client2$4, this), _classPrivateFieldGet2(_httpRequest2$5, this), functionName, request, options));
  }
};
var _client$3 = /* @__PURE__ */ new WeakMap();
var _httpRequest$4 = /* @__PURE__ */ new WeakMap();
var ObservableMediaLibraryVideoClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client$3, void 0), _classPrivateFieldInitSpec(this, _httpRequest$4, void 0), _classPrivateFieldSet2(_client$3, this, client), _classPrivateFieldSet2(_httpRequest$4, this, httpRequest);
  }
  /**
  * Get video playback information for a media library asset
  *
  * @param assetIdentifier - Asset instance identifier (GDR, video-prefixed ID, or container ID)
  * @param options - Options for transformations and expiration
  */
  getPlaybackInfo(assetIdentifier, options = {}) {
    let config = _classPrivateFieldGet2(_client$3, this).config(), configMediaLibraryId = (config.resource || config["~experimental_resource"])?.id, { instanceId, libraryId } = parseAssetInstanceId(assetIdentifier), effectiveLibraryId = libraryId || configMediaLibraryId;
    if (!effectiveLibraryId) throw Error("Could not determine Media Library ID - you need to provide a valid Media Library ID in the client config or a Media Library GDR");
    let url = buildVideoPlaybackInfoUrl(instanceId, effectiveLibraryId), queryParams = buildQueryParams(options);
    return _requestObservable(_classPrivateFieldGet2(_client$3, this), _classPrivateFieldGet2(_httpRequest$4, this), {
      method: "GET",
      url,
      query: queryParams
    });
  }
};
var _client2$3 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$4 = /* @__PURE__ */ new WeakMap();
var MediaLibraryVideoClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2$3, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$4, void 0), _classPrivateFieldSet2(_client2$3, this, client), _classPrivateFieldSet2(_httpRequest2$4, this, httpRequest);
  }
  /**
  * Get video playback information for a media library asset
  *
  * @param assetIdentifier - Asset instance identifier (GDR, video-prefixed ID, or container ID)
  * @param options - Options for transformations and expiration
  */
  getPlaybackInfo(assetIdentifier, options = {}) {
    let config = _classPrivateFieldGet2(_client2$3, this).config(), configMediaLibraryId = (config.resource || config["~experimental_resource"])?.id, { instanceId, libraryId } = parseAssetInstanceId(assetIdentifier), effectiveLibraryId = libraryId || configMediaLibraryId;
    if (!effectiveLibraryId) throw Error("Could not determine Media Library ID - you need to provide a valid Media Library ID in the client config or a Media Library GDR");
    let url = buildVideoPlaybackInfoUrl(instanceId, effectiveLibraryId), queryParams = buildQueryParams(options);
    return _request(_classPrivateFieldGet2(_client2$3, this), _classPrivateFieldGet2(_httpRequest2$4, this), {
      method: "GET",
      url,
      query: queryParams
    });
  }
};
var ML_GDR_PATTERN = /^media-library:(ml[^:]+):([^:]+)$/;
function isSanityReference(assetIdentifier) {
  return typeof assetIdentifier == "object" && "_ref" in assetIdentifier;
}
function parseAssetInstanceId(assetIdentifier) {
  let ref = isSanityReference(assetIdentifier) ? assetIdentifier._ref : assetIdentifier, match = ML_GDR_PATTERN.exec(ref);
  if (match) {
    let [, libraryId, instanceId] = match;
    return {
      libraryId,
      instanceId
    };
  }
  if (typeof assetIdentifier == "string" && assetIdentifier.startsWith("video-")) return { instanceId: assetIdentifier };
  throw Error(`Invalid video asset instance identifier "${ref}": must be a valid video instance id or a Global Dataset Reference (GDR) to the video asset in the Media Library`);
}
function buildVideoPlaybackInfoUrl(instanceId, libraryId) {
  return `/media-libraries/${libraryId}/video/${instanceId}/playback-info`;
}
function buildQueryParams(options) {
  let params = {};
  if (options.transformations) {
    let { thumbnail, animated, storyboard } = options.transformations;
    thumbnail && (thumbnail.width && (params.thumbnailWidth = thumbnail.width), thumbnail.height && (params.thumbnailHeight = thumbnail.height), thumbnail.time !== void 0 && (params.thumbnailTime = thumbnail.time), thumbnail.fit && (params.thumbnailFit = thumbnail.fit), thumbnail.format && (params.thumbnailFormat = thumbnail.format)), animated && (animated.width && (params.animatedWidth = animated.width), animated.height && (params.animatedHeight = animated.height), animated.start !== void 0 && (params.animatedStart = animated.start), animated.end !== void 0 && (params.animatedEnd = animated.end), animated.fps && (params.animatedFps = animated.fps), animated.format && (params.animatedFormat = animated.format)), storyboard && storyboard.format && (params.storyboardFormat = storyboard.format);
  }
  return options.expiration && (params.expiration = options.expiration), params;
}
var _client$2 = /* @__PURE__ */ new WeakMap();
var _httpRequest$3 = /* @__PURE__ */ new WeakMap();
var ObservableProjectsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client$2, void 0), _classPrivateFieldInitSpec(this, _httpRequest$3, void 0), _classPrivateFieldSet2(_client$2, this, client), _classPrivateFieldSet2(_httpRequest$3, this, httpRequest);
  }
  /**
  * Fetch a list of projects the authenticated user has access to.
  *
  * @param options - Options for the list request
  *   - `includeMembers` - Whether to include members in the response (default: true)
  *   - `includeFeatures` - Whether to include features in the response (default: true)
  *   - `organizationId` - ID of the organization to fetch projects for
  *   - `onlyExplicitMembership` - Whether to include only projects with explicit membership (default: false)
  */
  list(options) {
    let query = {};
    return options?.includeMembers === false && (query.includeMembers = "false"), options?.includeFeatures === false && (query.includeFeatures = "false"), options?.organizationId && (query.organizationId = options.organizationId), options?.onlyExplicitMembership && (query.onlyExplicitMembership = "true"), _requestObservable(_classPrivateFieldGet2(_client$2, this), _classPrivateFieldGet2(_httpRequest$3, this), {
      url: "/projects",
      query
    });
  }
  /**
  * Fetch a project by project ID
  *
  * @param projectId - ID of the project to fetch
  */
  getById(projectId2) {
    return _requestObservable(_classPrivateFieldGet2(_client$2, this), _classPrivateFieldGet2(_httpRequest$3, this), { url: `/projects/${projectId2}` });
  }
};
var _client2$2 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$3 = /* @__PURE__ */ new WeakMap();
var ProjectsClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2$2, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$3, void 0), _classPrivateFieldSet2(_client2$2, this, client), _classPrivateFieldSet2(_httpRequest2$3, this, httpRequest);
  }
  /**
  * Fetch a list of projects the authenticated user has access to.
  *
  * @param options - Options for the list request
  *   - `includeMembers` - Whether to include members in the response (default: true)
  *   - `includeFeatures` - Whether to include features in the response (default: true)
  *   - `organizationId` - ID of the organization to fetch projects for
  *   - `onlyExplicitMembership` - Whether to include only projects with explicit membership (default: false)
  */
  list(options) {
    let query = {};
    return options?.includeMembers === false && (query.includeMembers = "false"), options?.includeFeatures === false && (query.includeFeatures = "false"), options?.organizationId && (query.organizationId = options.organizationId), options?.onlyExplicitMembership && (query.onlyExplicitMembership = "true"), _request(_classPrivateFieldGet2(_client2$2, this), _classPrivateFieldGet2(_httpRequest2$3, this), {
      url: "/projects",
      query
    });
  }
  /**
  * Fetch a project by project ID
  *
  * @param projectId - ID of the project to fetch
  */
  getById(projectId2) {
    return _request(_classPrivateFieldGet2(_client2$2, this), _classPrivateFieldGet2(_httpRequest2$3, this), { url: `/projects/${projectId2}` });
  }
};
function generateReleaseId() {
  let id = "";
  for (; id.length < 8; ) {
    let bytes = crypto.getRandomValues(new Uint8Array(8 - id.length));
    for (let byte of bytes) {
      let index = byte & 63;
      index < 62 && (id += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[index]);
    }
  }
  return id;
}
var getDocumentVersionId = (publishedId, releaseId) => releaseId ? getVersionId(publishedId, releaseId) : getDraftId(publishedId);
function deriveDocumentVersionId(op, { releaseId, publishedId, document: document2 }) {
  if (publishedId && document2._id) {
    let versionId = getDocumentVersionId(publishedId, releaseId);
    return validateVersionIdMatch(versionId, document2), versionId;
  }
  if (document2._id) {
    let isDraft = isDraftId(document2._id), isVersion = isVersionId(document2._id);
    if (!isDraft && !isVersion) throw Error(`\`${op}()\` requires a document with an \`_id\` that is a version or draft ID`);
    if (releaseId) {
      if (isDraft) throw Error(`\`${op}()\` was called with a document ID (\`${document2._id}\`) that is a draft ID, but a release ID (\`${releaseId}\`) was also provided.`);
      let builtVersionId = getVersionFromId(document2._id);
      if (builtVersionId !== releaseId) throw Error(`\`${op}()\` was called with a document ID (\`${document2._id}\`) that is a version ID, but the release ID (\`${releaseId}\`) does not match the document's version ID (\`${builtVersionId}\`).`);
    }
    return document2._id;
  }
  if (publishedId) return getDocumentVersionId(publishedId, releaseId);
  throw Error(`\`${op}()\` requires either a publishedId or a document with an \`_id\``);
}
var getArgs = (releaseOrOptions, maybeOptions) => {
  if (typeof releaseOrOptions == "object" && releaseOrOptions && ("releaseId" in releaseOrOptions || "metadata" in releaseOrOptions)) {
    let { releaseId = generateReleaseId(), metadata = {} } = releaseOrOptions;
    return [
      releaseId,
      metadata,
      maybeOptions
    ];
  }
  return [
    generateReleaseId(),
    {},
    releaseOrOptions
  ];
};
var createRelease = (releaseOrOptions, maybeOptions) => {
  let [releaseId, metadata, options] = getArgs(releaseOrOptions, maybeOptions);
  return {
    action: {
      actionType: "sanity.action.release.create",
      releaseId,
      metadata: {
        ...metadata,
        releaseType: metadata.releaseType || "undecided"
      }
    },
    options
  };
};
var _client$1 = /* @__PURE__ */ new WeakMap();
var _httpRequest$2 = /* @__PURE__ */ new WeakMap();
var ObservableReleasesClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client$1, void 0), _classPrivateFieldInitSpec(this, _httpRequest$2, void 0), _classPrivateFieldSet2(_client$1, this, client), _classPrivateFieldSet2(_httpRequest$2, this, httpRequest);
  }
  /**
  * @public
  *
  * Retrieve a release by id.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to retrieve.
  * @param options - Additional query options including abort signal and query tag.
  * @returns An observable that resolves to the release document {@link ReleaseDocument}.
  *
  * @example Retrieving a release by id
  * ```ts
  * client.observable.releases.get({releaseId: 'my-release'}).pipe(
  *   tap((release) => console.log(release)),
  *   // {
  *   //   _id: '_.releases.my-release',
  *   //   name: 'my-release'
  *   //   _type: 'system.release',
  *   //   metadata: {releaseType: 'asap'},
  *   //   _createdAt: '2021-01-01T00:00:00.000Z',
  *   //   ...
  *   // }
  * ).subscribe()
  * ```
  */
  get({ releaseId }, options) {
    return _getDocumentObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), `_.releases.${releaseId}`, options);
  }
  create(releaseOrOptions, maybeOptions) {
    let { action, options } = createRelease(releaseOrOptions, maybeOptions), { releaseId, metadata } = action;
    return _actionObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), action, options).pipe(map((actionResult) => ({
      ...actionResult,
      releaseId,
      metadata
    })));
  }
  /**
  * @public
  *
  * Edits an existing release, updating the metadata.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to edit.
  *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
  * @param options - Additional action options.
  * @returns An observable that resolves to the `transactionId`.
  */
  edit({ releaseId, patch }, options) {
    let editAction = {
      actionType: "sanity.action.release.edit",
      releaseId,
      patch
    };
    return _actionObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), editAction, options);
  }
  /**
  * @public
  *
  * Publishes all documents in a release at once. For larger releases the effect of the publish
  * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
  * documents and creation of the corresponding published documents with the new content may
  * take some time.
  *
  * During this period both the source and target documents are locked and cannot be
  * modified through any other means.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to publish.
  * @param options - Additional action options.
  * @returns An observable that resolves to the `transactionId`.
  */
  publish({ releaseId }, options) {
    let publishAction = {
      actionType: "sanity.action.release.publish",
      releaseId
    };
    return _actionObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), publishAction, options);
  }
  /**
  * @public
  *
  * An archive action removes an active release. The documents that comprise the release
  * are deleted and therefore no longer queryable.
  *
  * While the documents remain in retention the last version can still be accessed using document history endpoint.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to archive.
  * @param options - Additional action options.
  * @returns An observable that resolves to the `transactionId`.
  */
  archive({ releaseId }, options) {
    let archiveAction = {
      actionType: "sanity.action.release.archive",
      releaseId
    };
    return _actionObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), archiveAction, options);
  }
  /**
  * @public
  *
  * An unarchive action restores an archived release and all documents
  * with the content they had just prior to archiving.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to unarchive.
  * @param options - Additional action options.
  * @returns An observable that resolves to the `transactionId`.
  */
  unarchive({ releaseId }, options) {
    let unarchiveAction = {
      actionType: "sanity.action.release.unarchive",
      releaseId
    };
    return _actionObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), unarchiveAction, options);
  }
  /**
  * @public
  *
  * A schedule action queues a release for publishing at the given future time.
  * The release is locked such that no documents in the release can be modified and
  * no documents that it references can be deleted as this would make the publish fail.
  * At the given time, the same logic as for the publish action is triggered.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to schedule.
  *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
  * @param options - Additional action options.
  * @returns An observable that resolves to the `transactionId`.
  */
  schedule({ releaseId, publishAt }, options) {
    let scheduleAction = {
      actionType: "sanity.action.release.schedule",
      releaseId,
      publishAt
    };
    return _actionObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), scheduleAction, options);
  }
  /**
  * @public
  *
  * An unschedule action stops a release from being published.
  * The documents in the release are considered unlocked and can be edited again.
  * This may fail if another release is scheduled to be published after this one and
  * has a reference to a document created by this one.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to unschedule.
  * @param options - Additional action options.
  * @returns An observable that resolves to the `transactionId`.
  */
  unschedule({ releaseId }, options) {
    let unscheduleAction = {
      actionType: "sanity.action.release.unschedule",
      releaseId
    };
    return _actionObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), unscheduleAction, options);
  }
  /**
  * @public
  *
  * A delete action removes a published or archived release.
  * The backing system document will be removed from the dataset.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to delete.
  * @param options - Additional action options.
  * @returns An observable that resolves to the `transactionId`.
  */
  delete({ releaseId }, options) {
    let deleteAction = {
      actionType: "sanity.action.release.delete",
      releaseId
    };
    return _actionObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), deleteAction, options);
  }
  /**
  * @public
  *
  * Fetch the documents in a release by release id.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to fetch documents for.
  * @param options - Additional mutation options {@link BaseMutationOptions}.
  * @returns An observable that resolves to the documents in the release.
  */
  fetchDocuments({ releaseId }, options) {
    return _getReleaseDocumentsObservable(_classPrivateFieldGet2(_client$1, this), _classPrivateFieldGet2(_httpRequest$2, this), releaseId, options);
  }
};
var _client2$1 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$2 = /* @__PURE__ */ new WeakMap();
var ReleasesClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2$1, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$2, void 0), _classPrivateFieldSet2(_client2$1, this, client), _classPrivateFieldSet2(_httpRequest2$2, this, httpRequest);
  }
  /**
  * @public
  *
  * Retrieve a release by id.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to retrieve.
  * @param options - Additional query options including abort signal and query tag.
  * @returns A promise that resolves to the release document {@link ReleaseDocument}.
  *
  * @example Retrieving a release by id
  * ```ts
  * const release = await client.releases.get({releaseId: 'my-release'})
  * console.log(release)
  * // {
  * //   _id: '_.releases.my-release',
  * //   name: 'my-release'
  * //   _type: 'system.release',
  * //   metadata: {releaseType: 'asap'},
  * //   _createdAt: '2021-01-01T00:00:00.000Z',
  * //   ...
  * // }
  * ```
  */
  get({ releaseId }, options) {
    return _getDocument(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), `_.releases.${releaseId}`, options);
  }
  async create(releaseOrOptions, maybeOptions) {
    let { action, options } = createRelease(releaseOrOptions, maybeOptions), { releaseId, metadata } = action;
    return {
      ...await _action(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), action, options),
      releaseId,
      metadata
    };
  }
  /**
  * @public
  *
  * Edits an existing release, updating the metadata.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to edit.
  *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
  * @param options - Additional action options.
  * @returns A promise that resolves to the `transactionId`.
  */
  edit({ releaseId, patch }, options) {
    let editAction = {
      actionType: "sanity.action.release.edit",
      releaseId,
      patch
    };
    return _action(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), editAction, options);
  }
  /**
  * @public
  *
  * Publishes all documents in a release at once. For larger releases the effect of the publish
  * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
  * documents and creation of the corresponding published documents with the new content may
  * take some time.
  *
  * During this period both the source and target documents are locked and cannot be
  * modified through any other means.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to publish.
  * @param options - Additional action options.
  * @returns A promise that resolves to the `transactionId`.
  */
  publish({ releaseId }, options) {
    let publishAction = {
      actionType: "sanity.action.release.publish",
      releaseId
    };
    return _action(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), publishAction, options);
  }
  /**
  * @public
  *
  * An archive action removes an active release. The documents that comprise the release
  * are deleted and therefore no longer queryable.
  *
  * While the documents remain in retention the last version can still be accessed using document history endpoint.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to archive.
  * @param options - Additional action options.
  * @returns A promise that resolves to the `transactionId`.
  */
  archive({ releaseId }, options) {
    let archiveAction = {
      actionType: "sanity.action.release.archive",
      releaseId
    };
    return _action(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), archiveAction, options);
  }
  /**
  * @public
  *
  * An unarchive action restores an archived release and all documents
  * with the content they had just prior to archiving.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to unarchive.
  * @param options - Additional action options.
  * @returns A promise that resolves to the `transactionId`.
  */
  unarchive({ releaseId }, options) {
    let unarchiveAction = {
      actionType: "sanity.action.release.unarchive",
      releaseId
    };
    return _action(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), unarchiveAction, options);
  }
  /**
  * @public
  *
  * A schedule action queues a release for publishing at the given future time.
  * The release is locked such that no documents in the release can be modified and
  * no documents that it references can be deleted as this would make the publish fail.
  * At the given time, the same logic as for the publish action is triggered.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to schedule.
  *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
  * @param options - Additional action options.
  * @returns A promise that resolves to the `transactionId`.
  */
  schedule({ releaseId, publishAt }, options) {
    let scheduleAction = {
      actionType: "sanity.action.release.schedule",
      releaseId,
      publishAt
    };
    return _action(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), scheduleAction, options);
  }
  /**
  * @public
  *
  * An unschedule action stops a release from being published.
  * The documents in the release are considered unlocked and can be edited again.
  * This may fail if another release is scheduled to be published after this one and
  * has a reference to a document created by this one.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to unschedule.
  * @param options - Additional action options.
  * @returns A promise that resolves to the `transactionId`.
  */
  unschedule({ releaseId }, options) {
    let unscheduleAction = {
      actionType: "sanity.action.release.unschedule",
      releaseId
    };
    return _action(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), unscheduleAction, options);
  }
  /**
  * @public
  *
  * A delete action removes a published or archived release.
  * The backing system document will be removed from the dataset.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to delete.
  * @param options - Additional action options.
  * @returns A promise that resolves to the `transactionId`.
  */
  delete({ releaseId }, options) {
    let deleteAction = {
      actionType: "sanity.action.release.delete",
      releaseId
    };
    return _action(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), deleteAction, options);
  }
  /**
  * @public
  *
  * Fetch the documents in a release by release id.
  *
  * @category Releases
  *
  * @param params - Release action parameters:
  *   - `releaseId` - The id of the release to fetch documents for.
  * @param options - Additional mutation options {@link BaseMutationOptions}.
  * @returns A promise that resolves to the documents in the release.
  */
  fetchDocuments({ releaseId }, options) {
    return _getReleaseDocuments(_classPrivateFieldGet2(_client2$1, this), _classPrivateFieldGet2(_httpRequest2$2, this), releaseId, options);
  }
};
var _client = /* @__PURE__ */ new WeakMap();
var _httpRequest$1 = /* @__PURE__ */ new WeakMap();
var ObservableUsersClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client, void 0), _classPrivateFieldInitSpec(this, _httpRequest$1, void 0), _classPrivateFieldSet2(_client, this, client), _classPrivateFieldSet2(_httpRequest$1, this, httpRequest);
  }
  /**
  * Fetch a user by user ID
  *
  * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
  */
  getById(id) {
    return _requestObservable(_classPrivateFieldGet2(_client, this), _classPrivateFieldGet2(_httpRequest$1, this), { url: `/users/${id}` });
  }
};
var _client2 = /* @__PURE__ */ new WeakMap();
var _httpRequest2$1 = /* @__PURE__ */ new WeakMap();
var UsersClient = class {
  constructor(client, httpRequest) {
    _classPrivateFieldInitSpec(this, _client2, void 0), _classPrivateFieldInitSpec(this, _httpRequest2$1, void 0), _classPrivateFieldSet2(_client2, this, client), _classPrivateFieldSet2(_httpRequest2$1, this, httpRequest);
  }
  /**
  * Fetch a user by user ID
  *
  * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
  */
  getById(id) {
    return _request(_classPrivateFieldGet2(_client2, this), _classPrivateFieldGet2(_httpRequest2$1, this), { url: `/users/${id}` });
  }
};
var _clientConfig = /* @__PURE__ */ new WeakMap();
var _httpRequest = /* @__PURE__ */ new WeakMap();
var ObservableSanityClient = class ObservableSanityClient2 {
  constructor(httpRequest, config = defaultConfig) {
    _defineProperty(
      this,
      /**
      * Upload, fetch and delete assets (images and files) in the configured dataset
      *
      * @category Assets
      */
      "assets",
      void 0
    ), _defineProperty(
      this,
      /**
      * Create, list, edit and delete datasets in the configured project
      *
      * @category Projects & Datasets
      */
      "datasets",
      void 0
    ), _defineProperty(
      this,
      /**
      * Subscribe to live content updates through the Live Content API
      *
      * @category Real-time
      */
      "live",
      void 0
    ), _defineProperty(
      this,
      /**
      * Interact with Media Library assets
      *
      * @category Assets
      */
      "mediaLibrary",
      void 0
    ), _defineProperty(
      this,
      /**
      * Fetch information about the projects the authenticated user has access to
      *
      * @category Projects & Datasets
      */
      "projects",
      void 0
    ), _defineProperty(
      this,
      /**
      * Fetch information about users in the configured project
      *
      * @category Projects & Datasets
      */
      "users",
      void 0
    ), _defineProperty(
      this,
      /**
      * Run Agent Actions - AI-powered operations to generate, transform, translate, prompt and patch documents
      *
      * @category Agent Actions
      */
      "agent",
      void 0
    ), _defineProperty(this, "collaboration", void 0), _defineProperty(this, "functions", void 0), _defineProperty(
      this,
      /**
      * Create and manage content releases and their scheduled publishing
      *
      * @category Releases
      */
      "releases",
      void 0
    ), _defineProperty(
      this,
      /** @beta */
      "context",
      void 0
    ), _classPrivateFieldInitSpec(this, _clientConfig, void 0), _classPrivateFieldInitSpec(this, _httpRequest, void 0), _defineProperty(
      this,
      /**
      * Listen to document changes matching a GROQ query, delivered as server-sent events
      *
      * @category Real-time
      */
      "listen",
      _listen$2
    ), this.config(config), _classPrivateFieldSet2(_httpRequest, this, httpRequest), this.assets = new ObservableAssetsClient(this, _classPrivateFieldGet2(_httpRequest, this)), this.datasets = new ObservableDatasetsClient(this, _classPrivateFieldGet2(_httpRequest, this)), this.live = new LiveClient(this), this.mediaLibrary = { video: new ObservableMediaLibraryVideoClient(this, _classPrivateFieldGet2(_httpRequest, this)) }, this.projects = new ObservableProjectsClient(this, _classPrivateFieldGet2(_httpRequest, this)), this.users = new ObservableUsersClient(this, _classPrivateFieldGet2(_httpRequest, this)), this.agent = { action: new ObservableAgentsActionClient(this, _classPrivateFieldGet2(_httpRequest, this)) }, this.collaboration = { comments: new ObservableCollaborationCommentsClient(this, _classPrivateFieldGet2(_httpRequest, this)) }, this.functions = new ObservableFunctionsClient(this, _classPrivateFieldGet2(_httpRequest, this)), this.releases = new ObservableReleasesClient(this, _classPrivateFieldGet2(_httpRequest, this)), this.context = new ObservableContextClient(this, _classPrivateFieldGet2(_httpRequest, this));
  }
  /**
  * Clone the client - returns a new instance
  *
  * @category Configuration
  */
  clone() {
    return new ObservableSanityClient2(_classPrivateFieldGet2(_httpRequest, this), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0) return { ..._classPrivateFieldGet2(_clientConfig, this) };
    if (_classPrivateFieldGet2(_clientConfig, this) && _classPrivateFieldGet2(_clientConfig, this).allowReconfigure === false) throw Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");
    return _classPrivateFieldSet2(_clientConfig, this, initConfig(newConfig, _classPrivateFieldGet2(_clientConfig, this) || {})), this;
  }
  /**
  * Clone the client with a new (partial) configuration.
  *
  * @category Configuration
  *
  * @param newConfig - New client configuration properties, shallowly merged with existing configuration
  */
  withConfig(newConfig) {
    let thisConfig = this.config();
    return new ObservableSanityClient2(_classPrivateFieldGet2(_httpRequest, this), {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega,
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return _fetchObservable(this, _classPrivateFieldGet2(_httpRequest, this), _classPrivateFieldGet2(_clientConfig, this).stega, query, params, options);
  }
  getDocument(id, options) {
    if (options?.includeAllVersions === true) return _getDocumentObservable(this, _classPrivateFieldGet2(_httpRequest, this), id, {
      ...options,
      includeAllVersions: true
    });
    let opts = {
      signal: options?.signal,
      tag: options?.tag,
      releaseId: options?.releaseId,
      ...options && "includeAllVersions" in options ? { includeAllVersions: false } : {}
    };
    return _getDocumentObservable(this, _classPrivateFieldGet2(_httpRequest, this), id, opts);
  }
  /**
  * Fetch multiple documents in one request.
  * Should be used sparingly - performing a query is usually a better option.
  * The order/position of documents is preserved based on the original array of IDs.
  * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
  *
  * @category Querying
  *
  * @param ids - Document IDs to fetch
  * @param options - Request options
  */
  getDocuments(ids, options) {
    return _getDocumentsObservable(this, _classPrivateFieldGet2(_httpRequest, this), ids, options);
  }
  /**
  * Convenient and bandwidth efficient method of checking wether a set of document IDs exists.
  * Returns a set of the IDs that exist.
  *
  * @category Querying
  *
  * @param ids - Document IDs to check
  * @param options - Request options
  */
  documentsExists(ids, options) {
    return _documentsExistsObservable(this, _classPrivateFieldGet2(_httpRequest, this), ids, options);
  }
  create(document2, options) {
    return _createObservable(this, _classPrivateFieldGet2(_httpRequest, this), document2, "create", options);
  }
  createIfNotExists(document2, options) {
    return _createIfNotExistsObservable(this, _classPrivateFieldGet2(_httpRequest, this), document2, options);
  }
  createOrReplace(document2, options) {
    return _createOrReplaceObservable(this, _classPrivateFieldGet2(_httpRequest, this), document2, options);
  }
  createVersion({ document: document2, publishedId, releaseId, baseId, ifBaseRevisionId }, options) {
    if (!document2) return _createVersionFromBaseObservable(this, _classPrivateFieldGet2(_httpRequest, this), publishedId, baseId, releaseId, ifBaseRevisionId, options);
    let documentVersionId = deriveDocumentVersionId("createVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = {
      ...document2,
      _id: documentVersionId
    }, versionPublishedId = publishedId || getPublishedId(document2._id);
    return _createVersionObservable(this, _classPrivateFieldGet2(_httpRequest, this), documentVersion, versionPublishedId, options);
  }
  delete(selection, options) {
    return _deleteObservable(this, _classPrivateFieldGet2(_httpRequest, this), selection, options);
  }
  /**
  * @public
  *
  * Deletes the draft or release version of a document.
  *
  * @remarks
  * * Discarding a version with no `releaseId` will discard the draft version of the published document.
  * * If the draft or release version does not exist, any error will throw.
  *
  * @category Versions
  *
  * @param params - Version action parameters:
  *   - `releaseId` - The ID of the release to discard the document from.
  *   - `publishedId` - The published ID of the document to discard.
  * @param purge - if `true` the document history is also discarded.
  * @param options - Additional action options.
  * @returns an observable that resolves to the `transactionId`.
  *
  * @example Discarding a release version of a document
  * ```ts
  * client.observable.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
  * // The document with the ID `versions.myRelease.myDocument` will be discarded.
  * ```
  *
  * @example Discarding a draft version of a document
  * ```ts
  * client.observable.discardVersion({publishedId: 'myDocument'})
  * // The document with the ID `drafts.myDocument` will be discarded.
  * ```
  */
  discardVersion({ releaseId, publishedId }, purge, options) {
    let documentVersionId = getDocumentVersionId(publishedId, releaseId);
    return _discardVersionObservable(this, _classPrivateFieldGet2(_httpRequest, this), documentVersionId, purge, options);
  }
  replaceVersion({ document: document2, publishedId, releaseId }, options) {
    let documentVersionId = deriveDocumentVersionId("replaceVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = {
      ...document2,
      _id: documentVersionId
    };
    return _replaceVersionObservable(this, _classPrivateFieldGet2(_httpRequest, this), documentVersion, options);
  }
  /**
  * @public
  *
  * Used to indicate when a document within a release should be unpublished when
  * the release is run.
  *
  * @remarks
  * * If the published document does not exist, an error will be thrown.
  *
  * @category Versions
  *
  * @param params - Version action parameters:
  *   - `releaseId` - The ID of the release to unpublish the document from.
  *   - `publishedId` - The published ID of the document to unpublish.
  * @param options - Additional action options.
  * @returns an observable that resolves to the `transactionId`.
  *
  * @example Unpublishing a release version of a published document
  * ```ts
  * client.observable.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
  * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
  * ```
  */
  unpublishVersion({ releaseId, publishedId }, options) {
    let versionId = getVersionId(publishedId, releaseId);
    return _unpublishVersionObservable(this, _classPrivateFieldGet2(_httpRequest, this), versionId, publishedId, options);
  }
  mutate(operations, options) {
    return _mutateObservable(this, _classPrivateFieldGet2(_httpRequest, this), operations, options);
  }
  /**
  * Create a new buildable patch of operations to perform
  *
  * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
  * @param operations - Optional object of patch operations to initialize the patch instance with
  * @returns Patch instance - call `.commit()` to perform the operations defined
  */
  patch(selection, operations) {
    return new ObservablePatch(selection, operations, this);
  }
  /**
  * Create a new transaction of mutations
  *
  * @category Mutations
  *
  * @param operations - Optional array of mutation operations to initialize the transaction instance with
  */
  transaction(operations) {
    return new ObservableTransaction(operations, this);
  }
  /**
  * Perform action operations against the configured dataset
  *
  * @category Mutations
  *
  * @param operations - Action operation(s) to execute
  * @param options - Action options
  */
  action(operations, options) {
    return _actionObservable(this, _classPrivateFieldGet2(_httpRequest, this), operations, options);
  }
  /**
  * Perform an HTTP request against the Sanity API
  *
  * @category HTTP
  *
  * @param options - Request options
  */
  request(options) {
    return _requestObservable(this, _classPrivateFieldGet2(_httpRequest, this), options);
  }
  /**
  * Get a Sanity API URL for the URI provided
  *
  * @category HTTP
  *
  * @param uri - URI/path to build URL for
  * @param canUseCdn - Whether or not to allow using the API CDN for this route
  */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
  * Get a Sanity API URL for the data operation and path provided
  *
  * @category HTTP
  *
  * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
  * @param path - Path to append after the operation
  */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
var _clientConfig2 = /* @__PURE__ */ new WeakMap();
var _httpRequest2 = /* @__PURE__ */ new WeakMap();
var SanityClient = class SanityClient2 {
  constructor(httpRequest, config = defaultConfig) {
    _defineProperty(
      this,
      /**
      * Upload, fetch and delete assets (images and files) in the configured dataset
      *
      * @category Assets
      */
      "assets",
      void 0
    ), _defineProperty(
      this,
      /**
      * Create, list, edit and delete datasets in the configured project
      *
      * @category Projects & Datasets
      */
      "datasets",
      void 0
    ), _defineProperty(
      this,
      /**
      * Subscribe to live content updates through the Live Content API
      *
      * @category Real-time
      */
      "live",
      void 0
    ), _defineProperty(
      this,
      /**
      * Interact with Media Library assets
      *
      * @category Assets
      */
      "mediaLibrary",
      void 0
    ), _defineProperty(
      this,
      /**
      * Fetch information about the projects the authenticated user has access to
      *
      * @category Projects & Datasets
      */
      "projects",
      void 0
    ), _defineProperty(
      this,
      /**
      * Fetch information about users in the configured project
      *
      * @category Projects & Datasets
      */
      "users",
      void 0
    ), _defineProperty(
      this,
      /**
      * Run Agent Actions - AI-powered operations to generate, transform, translate, prompt and patch documents
      *
      * @category Agent Actions
      */
      "agent",
      void 0
    ), _defineProperty(this, "collaboration", void 0), _defineProperty(this, "functions", void 0), _defineProperty(
      this,
      /**
      * Create and manage content releases and their scheduled publishing
      *
      * @category Releases
      */
      "releases",
      void 0
    ), _defineProperty(
      this,
      /** @beta */
      "context",
      void 0
    ), _defineProperty(
      this,
      /**
      * Observable version of the Sanity client, with the same configuration as the promise-based one
      *
      * @category Configuration
      */
      "observable",
      void 0
    ), _classPrivateFieldInitSpec(this, _clientConfig2, void 0), _classPrivateFieldInitSpec(this, _httpRequest2, void 0), _defineProperty(
      this,
      /**
      * Listen to document changes matching a GROQ query, delivered as server-sent events
      *
      * @category Real-time
      */
      "listen",
      _listen$2
    ), this.config(config), _classPrivateFieldSet2(_httpRequest2, this, httpRequest), this.assets = new AssetsClient(this, _classPrivateFieldGet2(_httpRequest2, this)), this.datasets = new DatasetsClient(this, _classPrivateFieldGet2(_httpRequest2, this)), this.live = new LiveClient(this), this.mediaLibrary = { video: new MediaLibraryVideoClient(this, _classPrivateFieldGet2(_httpRequest2, this)) }, this.projects = new ProjectsClient(this, _classPrivateFieldGet2(_httpRequest2, this)), this.users = new UsersClient(this, _classPrivateFieldGet2(_httpRequest2, this)), this.agent = { action: new AgentActionsClient(this, _classPrivateFieldGet2(_httpRequest2, this)) }, this.collaboration = { comments: new CollaborationCommentsClient(this, _classPrivateFieldGet2(_httpRequest2, this)) }, this.functions = new FunctionsClient(this, _classPrivateFieldGet2(_httpRequest2, this)), this.releases = new ReleasesClient(this, _classPrivateFieldGet2(_httpRequest2, this)), this.context = new ContextClient(this, _classPrivateFieldGet2(_httpRequest2, this)), this.observable = new ObservableSanityClient(httpRequest, config);
  }
  /**
  * Clone the client - returns a new instance
  *
  * @category Configuration
  */
  clone() {
    return new SanityClient2(_classPrivateFieldGet2(_httpRequest2, this), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0) return { ..._classPrivateFieldGet2(_clientConfig2, this) };
    if (_classPrivateFieldGet2(_clientConfig2, this) && _classPrivateFieldGet2(_clientConfig2, this).allowReconfigure === false) throw Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");
    return this.observable && this.observable.config(newConfig), _classPrivateFieldSet2(_clientConfig2, this, initConfig(newConfig, _classPrivateFieldGet2(_clientConfig2, this) || {})), this;
  }
  /**
  * Clone the client with a new (partial) configuration.
  *
  * @category Configuration
  *
  * @param newConfig - New client configuration properties, shallowly merged with existing configuration
  */
  withConfig(newConfig) {
    let thisConfig = this.config();
    return new SanityClient2(_classPrivateFieldGet2(_httpRequest2, this), {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega,
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return _fetch$2(this, _classPrivateFieldGet2(_httpRequest2, this), _classPrivateFieldGet2(_clientConfig2, this).stega, query, params, options);
  }
  getDocument(id, options) {
    if (options?.includeAllVersions === true) return _getDocument(this, _classPrivateFieldGet2(_httpRequest2, this), id, {
      ...options,
      includeAllVersions: true
    });
    let opts = {
      signal: options?.signal,
      tag: options?.tag,
      releaseId: options?.releaseId,
      ...options && "includeAllVersions" in options ? { includeAllVersions: false } : {}
    };
    return _getDocument(this, _classPrivateFieldGet2(_httpRequest2, this), id, opts);
  }
  /**
  * Fetch multiple documents in one request.
  * Should be used sparingly - performing a query is usually a better option.
  * The order/position of documents is preserved based on the original array of IDs.
  * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
  *
  * @category Querying
  *
  * @param ids - Document IDs to fetch
  * @param options - Request options
  */
  getDocuments(ids, options) {
    return _getDocuments(this, _classPrivateFieldGet2(_httpRequest2, this), ids, options);
  }
  /**
  * Convenient and bandwidth efficient method of checking wether a set of document IDs exists.
  * Returns a set of the IDs that exist.
  *
  * @category Querying
  *
  * @param ids - Document IDs to check
  * @param options - Request options
  */
  documentsExists(ids, options) {
    return _documentsExists(this, _classPrivateFieldGet2(_httpRequest2, this), ids, options);
  }
  create(document2, options) {
    return _create$1(this, _classPrivateFieldGet2(_httpRequest2, this), document2, "create", options);
  }
  createIfNotExists(document2, options) {
    return _createIfNotExists(this, _classPrivateFieldGet2(_httpRequest2, this), document2, options);
  }
  createOrReplace(document2, options) {
    return _createOrReplace(this, _classPrivateFieldGet2(_httpRequest2, this), document2, options);
  }
  createVersion({ document: document2, publishedId, releaseId, baseId, ifBaseRevisionId }, options) {
    if (!document2) return _createVersionFromBase(this, _classPrivateFieldGet2(_httpRequest2, this), publishedId, baseId, releaseId, ifBaseRevisionId, options);
    let documentVersionId = deriveDocumentVersionId("createVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = {
      ...document2,
      _id: documentVersionId
    }, versionPublishedId = publishedId || getPublishedId(document2._id);
    return _createVersion(this, _classPrivateFieldGet2(_httpRequest2, this), documentVersion, versionPublishedId, options);
  }
  delete(selection, options) {
    return _delete$1(this, _classPrivateFieldGet2(_httpRequest2, this), selection, options);
  }
  /**
  * @public
  *
  * Deletes the draft or release version of a document.
  *
  * @remarks
  * * Discarding a version with no `releaseId` will discard the draft version of the published document.
  * * If the draft or release version does not exist, any error will throw.
  *
  * @category Versions
  *
  * @param params - Version action parameters:
  *   - `releaseId` - The ID of the release to discard the document from.
  *   - `publishedId` - The published ID of the document to discard.
  * @param purge - if `true` the document history is also discarded.
  * @param options - Additional action options.
  * @returns a promise that resolves to the `transactionId`.
  *
  * @example Discarding a release version of a document
  * ```ts
  * client.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
  * // The document with the ID `versions.myRelease.myDocument` will be discarded.
  * ```
  *
  * @example Discarding a draft version of a document
  * ```ts
  * client.discardVersion({publishedId: 'myDocument'})
  * // The document with the ID `drafts.myDocument` will be discarded.
  * ```
  */
  discardVersion({ releaseId, publishedId }, purge, options) {
    let documentVersionId = getDocumentVersionId(publishedId, releaseId);
    return _discardVersion(this, _classPrivateFieldGet2(_httpRequest2, this), documentVersionId, purge, options);
  }
  replaceVersion({ document: document2, publishedId, releaseId }, options) {
    let documentVersionId = deriveDocumentVersionId("replaceVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = {
      ...document2,
      _id: documentVersionId
    };
    return _replaceVersion(this, _classPrivateFieldGet2(_httpRequest2, this), documentVersion, options);
  }
  /**
  * @public
  *
  * Used to indicate when a document within a release should be unpublished when
  * the release is run.
  *
  * @remarks
  * * If the published document does not exist, an error will be thrown.
  *
  * @category Versions
  *
  * @param params - Version action parameters:
  *   - `releaseId` - The ID of the release to unpublish the document from.
  *   - `publishedId` - The published ID of the document to unpublish.
  * @param options - Additional action options.
  * @returns a promise that resolves to the `transactionId`.
  *
  * @example Unpublishing a release version of a published document
  * ```ts
  * await client.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
  * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
  * ```
  */
  unpublishVersion({ releaseId, publishedId }, options) {
    let versionId = getVersionId(publishedId, releaseId);
    return _unpublishVersion(this, _classPrivateFieldGet2(_httpRequest2, this), versionId, publishedId, options);
  }
  mutate(operations, options) {
    return _mutate(this, _classPrivateFieldGet2(_httpRequest2, this), operations, options);
  }
  /**
  * Create a new buildable patch of operations to perform
  *
  * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
  * @param operations - Optional object of patch operations to initialize the patch instance with
  * @returns Patch instance - call `.commit()` to perform the operations defined
  */
  patch(documentId, operations) {
    return new Patch(documentId, operations, this);
  }
  /**
  * Create a new transaction of mutations
  *
  * @category Mutations
  *
  * @param operations - Optional array of mutation operations to initialize the transaction instance with
  */
  transaction(operations) {
    return new Transaction(operations, this);
  }
  /**
  * Perform action operations against the configured dataset
  * Returns a promise that resolves to the transaction result
  *
  * @category Mutations
  *
  * @param operations - Action operation(s) to execute
  * @param options - Action options
  */
  action(operations, options) {
    return _action(this, _classPrivateFieldGet2(_httpRequest2, this), operations, options);
  }
  /**
  * Perform a request against the Sanity API
  * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
  *
  * @category HTTP
  *
  * @param options - Request options
  * @returns Promise resolving to the response body
  */
  request(options) {
    return _request(this, _classPrivateFieldGet2(_httpRequest2, this), options);
  }
  /**
  * Perform an HTTP request a `/data` sub-endpoint
  * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
  *
  * @deprecated - Use `request()` or your own HTTP library instead
  * @param endpoint - Endpoint to hit (mutate, query etc)
  * @param body - Request body
  * @param options - Request options
  * @internal
  */
  dataRequest(endpoint, body, options) {
    return _dataRequest(this, _classPrivateFieldGet2(_httpRequest2, this), endpoint, body, options);
  }
  /**
  * Get a Sanity API URL for the URI provided
  *
  * @category HTTP
  *
  * @param uri - URI/path to build URL for
  * @param canUseCdn - Whether or not to allow using the API CDN for this route
  */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
  * Get a Sanity API URL for the data operation and path provided
  *
  * @category HTTP
  *
  * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
  * @param path - Path to append after the operation
  */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
function defineCreateClientExports(envOptions, ClassConstructor) {
  let defaultRequester = defineRequester(envOptions).observable, createClient2 = (config) => {
    let { observable: clientRequester, promise: clientRequesterPromise } = defineRequester(envOptions, {
      ignoreWarnings: config.ignoreWarnings,
      maxRetries: config.maxRetries,
      retryDelay: config.retryDelay
    }), performRequest = async (options) => (await clientRequesterPromise({
      redirect: "manual",
      ...options
    })).body, httpRequest = (options, requestHandler) => requestHandler ? requestHandler(options, performRequest) : performRequest(options);
    return new ClassConstructor(httpRequest, {
      ...config,
      requester: clientRequester,
      resolveFetch: config.resolveFetch ?? envOptions.resolveFetch
    });
  };
  return {
    requester: defaultRequester,
    createClient: createClient2
  };
}
function defineDeprecatedCreateClient(createClient2) {
  return function deprecatedCreateClient2(config) {
    return printNoDefaultExport(), createClient2(config);
  };
}
var exp = defineCreateClientExports({ middleware: [] }, SanityClient);
var requester = exp.requester;
var createClient = exp.createClient;
var deprecatedCreateClient = defineDeprecatedCreateClient(createClient);

// ../../node_modules/.pnpm/zustand@5.0.15_@types+react_d6e1d6603700a0185ed179e16b0fda65/node_modules/zustand/esm/middleware.mjs
var shouldDispatchFromDevtools = (api) => !!api.dispatchFromDevtools && typeof api.dispatch === "function";
var trackedConnections = /* @__PURE__ */ new Map();
var getTrackedConnectionState = (name) => {
  const api = trackedConnections.get(name);
  if (!api) return {};
  return Object.fromEntries(
    Object.entries(api.stores).map(([key, api2]) => [key, api2.getState()])
  );
};
var extractConnectionInformation = (store, extensionConnector, options) => {
  if (store === void 0) {
    return {
      type: "untracked",
      connection: extensionConnector.connect(options)
    };
  }
  const existingConnection = trackedConnections.get(options.name);
  if (existingConnection) {
    return { type: "tracked", store, ...existingConnection };
  }
  const newConnection = {
    connection: extensionConnector.connect(options),
    stores: {}
  };
  trackedConnections.set(options.name, newConnection);
  return { type: "tracked", store, ...newConnection };
};
var removeStoreFromTrackedConnections = (name, store) => {
  if (store === void 0) return;
  const connectionInfo = trackedConnections.get(name);
  if (!connectionInfo) return;
  delete connectionInfo.stores[store];
  if (Object.keys(connectionInfo.stores).length === 0) {
    trackedConnections.delete(name);
  }
};
var v8StackLineRe = /^at (?:new |async )?(.+?) \(/;
var geckoStackLineRe = /^([^@]+)@/;
function findCallerName(stack) {
  var _a, _b, _c;
  if (!stack) return void 0;
  const traceLines = stack.split("\n");
  const apiSetStateLineIndex = traceLines.findIndex(
    (traceLine) => traceLine.includes("api.setState")
  );
  if (apiSetStateLineIndex < 0) return void 0;
  const callerLine = ((_a = traceLines[apiSetStateLineIndex + 1]) == null ? void 0 : _a.trim()) || "";
  return ((_b = v8StackLineRe.exec(callerLine)) == null ? void 0 : _b[1]) || ((_c = geckoStackLineRe.exec(callerLine)) == null ? void 0 : _c[1]);
}
var devtoolsImpl = (fn, devtoolsOptions = {}) => (set, get2, api) => {
  const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
  let extensionConnector;
  try {
    extensionConnector = (enabled != null ? enabled : (import.meta.env ? import.meta.env.MODE : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch (e) {
  }
  if (!extensionConnector) {
    return fn(set, get2, api);
  }
  const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
  let isRecording = true;
  api.setState = ((state, replace, nameOrAction) => {
    const r = set(state, replace);
    if (!isRecording) return r;
    const action = nameOrAction === void 0 ? {
      type: anonymousActionType || findCallerName(new Error().stack) || "anonymous"
    } : typeof nameOrAction === "string" ? { type: nameOrAction } : nameOrAction;
    if (store === void 0) {
      connection == null ? void 0 : connection.send(action, get2());
      return r;
    }
    connection == null ? void 0 : connection.send(
      {
        ...action,
        type: `${store}/${action.type}`
      },
      {
        ...getTrackedConnectionState(options.name),
        [store]: api.getState()
      }
    );
    return r;
  });
  api.devtools = {
    cleanup: () => {
      if (connection && typeof connection.unsubscribe === "function") {
        connection.unsubscribe();
      }
      removeStoreFromTrackedConnections(options.name, store);
    }
  };
  const setStateFromDevtools = (...a) => {
    const originalIsRecording = isRecording;
    isRecording = false;
    set(...a);
    isRecording = originalIsRecording;
  };
  const initialState = fn(api.setState, get2, api);
  if (connectionInformation.type === "untracked") {
    connection == null ? void 0 : connection.init(initialState);
  } else {
    connectionInformation.stores[connectionInformation.store] = api;
    connection == null ? void 0 : connection.init(
      Object.fromEntries(
        Object.entries(connectionInformation.stores).map(([key, store2]) => [
          key,
          key === connectionInformation.store ? initialState : store2.getState()
        ])
      )
    );
  }
  if (shouldDispatchFromDevtools(api)) {
    let didWarnAboutReservedActionType = false;
    const originalDispatch = api.dispatch;
    api.dispatch = (...args) => {
      if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && args[0].type === "__setState" && !didWarnAboutReservedActionType) {
        console.warn(
          '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
        );
        didWarnAboutReservedActionType = true;
      }
      originalDispatch(...args);
    };
  }
  connection.subscribe((message) => {
    var _a;
    switch (message.type) {
      case "ACTION":
        if (typeof message.payload !== "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return parseJsonThen(
          message.payload,
          (action) => {
            if (action.type === "__setState") {
              if (store === void 0) {
                setStateFromDevtools(action.state);
                return;
              }
              if (Object.keys(action.state).length !== 1) {
                console.error(
                  `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
                );
              }
              const stateFromDevtools = action.state[store];
              if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                setStateFromDevtools(stateFromDevtools);
              }
              return;
            }
            if (shouldDispatchFromDevtools(api)) {
              api.dispatch(action);
            }
          }
        );
      case "DISPATCH":
        switch (message.payload.type) {
          case "RESET":
            setStateFromDevtools(initialState);
            if (store === void 0) {
              return connection == null ? void 0 : connection.init(api.getState());
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "COMMIT":
            if (store === void 0) {
              connection == null ? void 0 : connection.init(api.getState());
              return;
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "ROLLBACK":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                connection == null ? void 0 : connection.init(api.getState());
                return;
              }
              setStateFromDevtools(state[store]);
              connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                setStateFromDevtools(state[store]);
              }
            });
          case "IMPORT_STATE": {
            const { nextLiftedState } = message.payload;
            const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
            if (!lastComputedState) return;
            if (store === void 0) {
              setStateFromDevtools(lastComputedState);
            } else {
              setStateFromDevtools(lastComputedState[store]);
            }
            connection == null ? void 0 : connection.send(
              null,
              // FIXME no-any
              nextLiftedState
            );
            return;
          }
          case "PAUSE_RECORDING":
            return isRecording = !isRecording;
        }
        return;
    }
  });
  return initialState;
};
var devtools = devtoolsImpl;
var parseJsonThen = (stringified, fn) => {
  let parsed;
  try {
    parsed = JSON.parse(stringified);
  } catch (e) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      e
    );
  }
  if (parsed !== void 0) fn(parsed);
};

// ../../node_modules/.pnpm/zustand@5.0.15_@types+react_d6e1d6603700a0185ed179e16b0fda65/node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/createStateSourceAction-DdAhEfnZ.js
function isDatasetResource(resource) {
  return "projectId" in resource && "dataset" in resource;
}
function isMediaLibraryResource(resource) {
  return "mediaLibraryId" in resource;
}
function isCanvasResource(resource) {
  return "canvasId" in resource;
}
var isReleasePerspective = (perspective) => typeof perspective == "object" && !!perspective && "releaseName" in perspective;
function getEnv(key) {
  if (import.meta.env) return import.meta.env[key];
  if (typeof process < "u" && process.env) return process.env[key];
  if (typeof window < "u" && window.ENV) return window.ENV?.[key];
}
function createStoreState(initialState, devToolsOptions) {
  let store = createStore()(devtools(() => initialState, devToolsOptions));
  return {
    get: store.getState,
    set: (actionKey, updatedState) => {
      let currentState = store.getState(), nextState = typeof updatedState == "function" ? updatedState(currentState) : updatedState;
      currentState !== nextState && store.setState(nextState, false, actionKey);
    },
    observable: new Observable((observer) => {
      let emit = () => observer.next(store.getState());
      emit();
      let unsubscribe = store.subscribe(emit);
      return () => unsubscribe();
    })
  };
}
function defineStore(storeDefinition) {
  return storeDefinition;
}
function createStoreInstance(instance, key, { name, getInitialState, initialize }) {
  let state = createStoreState(getInitialState(instance, key), {
    enabled: !!getEnv("DEV"),
    name: `${name}-${key.name}`
  }), dispose = initialize?.({
    state,
    instance,
    key
  }), disposed = { current: false };
  return {
    state,
    dispose: () => {
      disposed.current || (disposed.current = true, dispose?.());
    },
    isDisposed: () => disposed.current
  };
}
function createActionBinder(keyFn) {
  let instanceRegistry = /* @__PURE__ */ new Map(), storeRegistry = /* @__PURE__ */ new Map();
  return function bindAction(storeDefinition, action) {
    return function boundAction(instance, ...params) {
      let key = keyFn(instance, ...params), compositeKey = storeDefinition.name + (key.name ? `:${key.name}` : ""), instances = instanceRegistry.get(compositeKey);
      instances || (instances = /* @__PURE__ */ new Set(), instanceRegistry.set(compositeKey, instances)), instances.has(instance.instanceId) || (instances.add(instance.instanceId), instance.onDispose(() => {
        instances.delete(instance.instanceId), instances.size === 0 && (storeRegistry.get(compositeKey)?.dispose(), storeRegistry.delete(compositeKey), instanceRegistry.delete(compositeKey));
      }));
      let storeInstance = storeRegistry.get(compositeKey);
      return storeInstance || (storeInstance = createStoreInstance(instance, key, storeDefinition), storeRegistry.set(compositeKey, storeInstance)), action({
        instance,
        state: storeInstance.state,
        key
      }, ...params);
    };
  };
}
var createResourceKey = (instance, resource) => {
  let name, resourceForKey, effectiveResource = resource ?? instance.config.resource;
  if (effectiveResource) {
    if (resourceForKey = effectiveResource, isDatasetResource(effectiveResource)) name = `${effectiveResource.projectId}.${effectiveResource.dataset}`;
    else if (isMediaLibraryResource(effectiveResource)) name = `media-library:${effectiveResource.mediaLibraryId}`;
    else if (isCanvasResource(effectiveResource)) name = `canvas:${effectiveResource.canvasId}`;
    else throw Error(`Received invalid resource: ${JSON.stringify(effectiveResource)}`);
    return {
      name,
      resource: resourceForKey
    };
  }
  let { projectId: projectId2, dataset: dataset2 } = instance.config;
  if (!projectId2 || !dataset2) throw Error("This API requires a project ID and dataset configured.");
  return {
    name: `${projectId2}.${dataset2}`,
    resource: {
      projectId: projectId2,
      dataset: dataset2
    }
  };
};
var bindActionByResource = createActionBinder((instance, { resource }) => createResourceKey(instance, resource));
var bindActionByResourceAndPerspective = createActionBinder((instance, options) => {
  let { resource, perspective } = options, utilizedPerspective = perspective ?? instance.config.perspective ?? "drafts", perspectiveKey;
  perspectiveKey = isReleasePerspective(utilizedPerspective) ? utilizedPerspective.releaseName : typeof utilizedPerspective == "string" ? utilizedPerspective : JSON.stringify(utilizedPerspective);
  let sourceKey = createResourceKey(instance, resource);
  return {
    name: `${sourceKey.name}:${perspectiveKey}`,
    resource: sourceKey.resource,
    perspective: utilizedPerspective
  };
});
var bindActionGlobally = createActionBinder((..._rest) => ({ name: "global" }));
function createStateSourceAction(options) {
  let selector = typeof options == "function" ? options : options.selector, subscribeHandler = options && "onSubscribe" in options ? options.onSubscribe : void 0, isEqual = options && "isEqual" in options ? options.isEqual ?? Object.is : Object.is, selectorContextCache = /* @__PURE__ */ new WeakMap();
  function stateSourceAction(context, ...params) {
    let { state, instance } = context, getCurrent = (currentState) => {
      if (typeof currentState != "object" || !currentState) throw Error(`Expected store state to be an object but got "${typeof currentState}" instead`);
      let instanceCache = selectorContextCache.get(currentState);
      instanceCache || (instanceCache = /* @__PURE__ */ new WeakMap(), selectorContextCache.set(currentState, instanceCache));
      let selectorContext = instanceCache.get(instance);
      return selectorContext || (selectorContext = {
        state: currentState,
        instance
      }, instanceCache.set(instance, selectorContext)), selector(selectorContext, ...params);
    }, values = state.observable.pipe(map(getCurrent), distinctUntilChanged(isEqual));
    subscribeHandler && (values = withSubscribeHook(values, () => subscribeHandler(context, ...params)));
    let sharedValues = values.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    })), subscribe = (onStoreChanged) => {
      let subscription = sharedValues.pipe(skip(1)).subscribe({
        next: () => onStoreChanged?.(),
        error: () => onStoreChanged?.()
      });
      return () => {
        subscription.unsubscribe();
      };
    };
    return {
      getCurrent: () => getCurrent(state.get()),
      subscribe,
      observable: sharedValues
    };
  }
  return stateSourceAction;
}
function withSubscribeHook(obs, fn) {
  return defer(() => {
    let cleanup = fn();
    return cleanup ? obs.pipe(finalize(() => cleanup())) : obs;
  });
}

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/object-CxXlSVg7.js
function isObject(value) {
  return typeof value == "object" && !!value;
}
var hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
var isPlainObject = (value) => {
  if (!isObject(value)) return false;
  let prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
function omitProperty(value, key) {
  if (!value) return {};
  let { [key]: _omitted, ...rest } = value;
  return rest;
}
function pickProperties(value, keys) {
  let result = {};
  for (let key of keys) hasOwn(value, key) && (result[key] = value[key]);
  return result;
}
var areSetsEqual = (left, right) => {
  if (left.size !== right.size) return false;
  let unmatched = [...right];
  outer: for (let leftValue of left) {
    for (let index = 0; index < unmatched.length; index++) if (isDeepEqual(leftValue, unmatched[index])) {
      unmatched.splice(index, 1);
      continue outer;
    }
    return false;
  }
  return unmatched.length === 0;
};
var areMapsEqual = (left, right) => {
  if (left.size !== right.size) return false;
  let unmatched = [...right.entries()];
  outer: for (let [leftKey, leftValue] of left) {
    for (let index = 0; index < unmatched.length; index++) {
      let [rightKey, rightValue] = unmatched[index];
      if (isDeepEqual(leftKey, rightKey) && isDeepEqual(leftValue, rightValue)) {
        unmatched.splice(index, 1);
        continue outer;
      }
    }
    return false;
  }
  return unmatched.length === 0;
};
function isDeepEqual(left, right) {
  if (Object.is(left, right)) return true;
  if (!isObject(left) || !isObject(right)) return false;
  if (left instanceof Date && right instanceof Date) return left.getTime() === right.getTime();
  if (left instanceof RegExp && right instanceof RegExp) return left.source === right.source && left.flags === right.flags;
  if (left instanceof Set && right instanceof Set) return areSetsEqual(left, right);
  if (left instanceof Map && right instanceof Map) return areMapsEqual(left, right);
  if (Array.isArray(left) || Array.isArray(right)) return !Array.isArray(left) || !Array.isArray(right) || left.length !== right.length ? false : left.every((value, index) => isDeepEqual(value, right[index]));
  if (!isPlainObject(left) || !isPlainObject(right)) return false;
  let leftKeys = Object.keys(left), rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) return false;
  for (let key of leftKeys) if (!hasOwn(right, key) || !isDeepEqual(left[key], right[key])) return false;
  return true;
}

// ../../node_modules/.pnpm/@sanity+types@6.15.0_@types+react@19.3.0/node_modules/@sanity/types/lib/index.js
function isObject2(obj) {
  return typeof obj == "object" && !!obj && !Array.isArray(obj);
}
function isKeyedObject(obj) {
  return isObject2(obj) && typeof obj._key == "string";
}
var reKeySegment = /_key\s*==\s*['"](.*)['"]/;
function isKeySegment(segment) {
  return typeof segment == "string" ? reKeySegment.test(segment.trim()) : typeof segment == "object" && "_key" in segment;
}

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/clientStore-BI4D8HhJ.js
var __defProp = Object.defineProperty;
var __exportAll2 = (all, no_symbols) => {
  let target = {};
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
  return no_symbols || __defProp(target, Symbol.toStringTag, { value: "Module" }), target;
};
var LOG_LEVEL_PRIORITY = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4
};
var DEFAULT_CONFIG = {
  level: "warn",
  namespaces: [],
  internal: false,
  timestamps: true,
  enableInProduction: false,
  handler: {
    error: console.error.bind(console),
    warn: console.warn.bind(console),
    info: console.info.bind(console),
    debug: console.debug.bind(console),
    trace: console.debug.bind(console)
  }
};
function parseDebugEnvVar() {
  if (typeof process > "u" || !process.env?.DEBUG) return null;
  let debug = process.env.DEBUG;
  if (!debug.includes("sanity")) return null;
  let config = {}, levelMatch = debug.match(/sanity:(trace|debug|info|warn|error):/), hasLevelSpecifier = !!levelMatch;
  if (config.level = levelMatch ? levelMatch[1] : "debug", debug === "sanity") config.namespaces = ["*"];
  else if (hasLevelSpecifier && debug.match(/sanity:(trace|debug|info|warn|error):\*/)) config.namespaces = ["*"];
  else if (!hasLevelSpecifier && debug.includes("sanity:*")) config.namespaces = ["*"];
  else {
    let namespaces = debug.split(",").filter((s) => s.includes("sanity:")).map((s) => {
      let cleaned = s.replace(/^sanity:/, "");
      return hasLevelSpecifier && cleaned.match(/^(trace|debug|info|warn|error):/) ? cleaned.split(":").slice(1).join(":") : cleaned.split(":")[0];
    }).filter(Boolean).filter((ns) => ns !== "*");
    namespaces.length > 0 && (config.namespaces = namespaces);
  }
  return debug.includes(":internal") && (config.internal = true), config;
}
var envConfig = parseDebugEnvVar();
var globalConfig = {
  ...DEFAULT_CONFIG,
  ...envConfig ?? {}
};
envConfig && ([
  "info",
  "debug",
  "trace"
].includes(globalConfig.level) || globalConfig.level === "warn") && console.info(`[${(/* @__PURE__ */ new Date()).toISOString()}] [INFO] [sdk] Logging auto-configured from DEBUG environment variable`, {
  level: globalConfig.level,
  namespaces: globalConfig.namespaces,
  internal: globalConfig.internal,
  source: "env:DEBUG",
  value: typeof process < "u" ? process.env?.DEBUG : void 0
});
function configureLogging(config) {
  globalConfig = {
    ...globalConfig,
    ...config,
    handler: config.handler ?? globalConfig.handler
  };
}
function isLoggingEnabled() {
  return typeof process < "u" && false ? globalConfig.enableInProduction : true;
}
function isNamespaceEnabled(namespace) {
  return isLoggingEnabled() ? globalConfig.namespaces.includes("*") ? true : globalConfig.namespaces.includes(namespace) : false;
}
function isLevelEnabled(level) {
  return isLoggingEnabled() ? LOG_LEVEL_PRIORITY[level] <= LOG_LEVEL_PRIORITY[globalConfig.level] : false;
}
function formatMessage(namespace, level, message, context) {
  let parts = [];
  if (globalConfig.timestamps) {
    let timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
    parts.push(`[${timestamp2}]`);
  }
  parts.push(`[${level.toUpperCase()}]`), parts.push(`[${namespace}]`);
  let instanceContext = context?.instanceContext;
  return instanceContext && (instanceContext.projectId && parts.push(`[project:${instanceContext.projectId}]`), instanceContext.dataset && parts.push(`[dataset:${instanceContext.dataset}]`), instanceContext.instanceId && parts.push(`[instance:${instanceContext.instanceId.slice(0, 8)}]`)), parts.push(message), [parts.join(" "), context];
}
function sanitizeContext(context) {
  if (!context || Object.keys(context).length === 0) return;
  let sanitized = { ...context }, sensitiveKeys = [
    "token",
    "password",
    "secret",
    "apiKey",
    "authorization"
  ];
  for (let key of Object.keys(sanitized)) sensitiveKeys.some((sensitive) => key.toLowerCase().includes(sensitive)) && (sanitized[key] = "[REDACTED]");
  return sanitized;
}
function createLogger(namespace, baseContext) {
  let logAtLevel = (level, message, context) => {
    if (!isNamespaceEnabled(namespace) || !isLevelEnabled(level) || context?.internal && !globalConfig.internal) return;
    let [formatted, finalContext] = formatMessage(namespace, level, message, sanitizeContext({
      ...baseContext,
      ...context
    }));
    globalConfig.handler[level](formatted, finalContext);
  };
  return {
    namespace,
    error: (message, context) => logAtLevel("error", message, context),
    warn: (message, context) => logAtLevel("warn", message, context),
    info: (message, context) => logAtLevel("info", message, context),
    debug: (message, context) => logAtLevel("debug", message, context),
    trace: (message, context) => logAtLevel("trace", message, {
      ...context,
      internal: true
    }),
    isLevelEnabled: (level) => isNamespaceEnabled(namespace) && isLevelEnabled(level),
    child: (childContext) => createLogger(namespace, {
      ...baseContext,
      ...childContext
    }),
    getInstanceContext: () => baseContext?.instanceContext
  };
}
function getStagingApiHost() {
  if (typeof __SANITY_STAGING__ < "u" && __SANITY_STAGING__ === true) return "https://api.sanity.work";
}
var loggers = /* @__PURE__ */ new WeakMap();
function getAuthLogger(instance) {
  let logger = loggers.get(instance);
  return logger || (logger = createLogger("auth", { instanceContext: {
    instanceId: instance.instanceId,
    projectId: instance.config.projectId,
    dataset: instance.config.dataset
  } }), loggers.set(instance, logger)), logger;
}
var DEFAULT_BASE = "http://localhost";
var DEFAULT_API_VERSION$1 = "2021-06-07";
var REQUEST_TAG_PREFIX = "sanity.sdk.auth";
function resolveAuthMode(config, locationHref) {
  return isStudioConfig(config) ? "studio" : config.auth?.oauth ? "oauth" : detectDashboardContext(locationHref) ? "dashboard" : "standalone";
}
function isStudioConfig(config) {
  return !!config.studio;
}
function detectDashboardContext(locationHref) {
  try {
    let contextParam = new URL(locationHref, DEFAULT_BASE).searchParams.get("_context");
    if (!contextParam) return false;
    let parsed = JSON.parse(contextParam);
    return typeof parsed == "object" && !!parsed && !Array.isArray(parsed) && Object.keys(parsed).length > 0;
  } catch (err) {
    return console.error("Failed to parse dashboard context from initial location:", err), false;
  }
}
var AuthStateType = (function(AuthStateType2) {
  return AuthStateType2.LOGGED_IN = "logged-in", AuthStateType2.LOGGING_IN = "logging-in", AuthStateType2.ERROR = "error", AuthStateType2.LOGGED_OUT = "logged-out", AuthStateType2;
})({});
var REFRESH_INTERVAL = 432e5;
function createTokenRefreshStream(token, clientFactory, apiHost) {
  return new Observable((subscriber) => {
    let subscription = clientFactory({
      apiVersion: DEFAULT_API_VERSION$1,
      requestTagPrefix: REQUEST_TAG_PREFIX,
      useProjectHostname: false,
      useCdn: false,
      token,
      ignoreBrowserTokenWarning: true,
      ...apiHost && { apiHost }
    }).observable.request({
      url: "auth/refresh-token",
      method: "POST",
      tag: "refresh-token",
      body: { token }
    }).subscribe(subscriber);
    return () => subscription.unsubscribe();
  });
}
function shouldRefreshToken(lastRefresh) {
  return !lastRefresh || Date.now() - lastRefresh >= REFRESH_INTERVAL;
}
var refreshStampedToken = ({ state, instance }) => {
  let logger = getAuthLogger(instance), { clientFactory, apiHost, storageArea, storageKey } = state.get().options;
  return state.observable.pipe(map((storeState) => storeState.authState), filter((authState) => authState.type === "logged-in"), distinctUntilChanged((prev, curr) => prev.token === curr.token), filter((authState) => authState.token.includes("-st")), exhaustMap(() => new Observable((subscriber) => {
    let visibilityHandler = () => {
      let currentState = state.get();
      document.visibilityState === "visible" && currentState.authState.type === "logged-in" && shouldRefreshToken(currentState.authState.lastTokenRefresh) && createTokenRefreshStream(currentState.authState.token, clientFactory, apiHost).subscribe({
        next: (response) => {
          state.set("setRefreshStampedToken", (prev) => ({ authState: prev.authState.type === "logged-in" ? {
            ...prev.authState,
            token: response.token,
            lastTokenRefresh: Date.now()
          } : prev.authState })), subscriber.next(response);
        },
        error: (error) => subscriber.error(error)
      });
    }, timerSubscription = timer(REFRESH_INTERVAL, REFRESH_INTERVAL).pipe(filter(() => document.visibilityState === "visible"), switchMap(() => {
      let currentState = state.get().authState;
      if (currentState.type !== "logged-in") throw Error("User logged out before refresh could complete");
      return createTokenRefreshStream(currentState.token, clientFactory, apiHost);
    })).subscribe({
      next: (response) => {
        state.set("setRefreshStampedToken", (prev) => ({ authState: prev.authState.type === "logged-in" ? {
          ...prev.authState,
          token: response.token,
          lastTokenRefresh: Date.now()
        } : prev.authState })), subscriber.next(response);
      },
      error: (error) => subscriber.error(error)
    });
    return document.addEventListener("visibilitychange", visibilityHandler), () => {
      document.removeEventListener("visibilitychange", visibilityHandler), timerSubscription.unsubscribe();
    };
  }).pipe(takeWhile(() => state.get().authState.type === "logged-in"), map((response) => ({ token: response.token }))))).subscribe({
    next: (response) => {
      logger.debug("Token refresh completed, updating state"), state.set("setRefreshStampedToken", (prev) => ({ authState: prev.authState.type === "logged-in" ? {
        ...prev.authState,
        token: response.token,
        lastTokenRefresh: Date.now()
      } : prev.authState })), storageArea?.setItem(storageKey, JSON.stringify({ token: response.token }));
    },
    error: (error) => {
      logger.error("Token refresh failed", { error }), state.set("setRefreshStampedTokenError", { authState: {
        type: "error",
        error
      } });
    }
  });
};
var subscribeToStateAndFetchCurrentUser = ({ state, instance }, fetchOptions) => {
  let logger = getAuthLogger(instance), { clientFactory, apiHost } = state.get().options, useProjectHostname = fetchOptions?.useProjectHostname ?? isStudioConfig(instance.config), projectId2 = instance.config.projectId;
  return state.observable.pipe(map(({ authState, options: storeOptions }) => ({
    authState,
    authMethod: storeOptions.authMethod
  })), filter((value) => value.authState.type === "logged-in" && !value.authState.currentUser), map((value) => ({
    token: value.authState.token,
    authMethod: value.authMethod
  })), distinctUntilChanged((prev, curr) => prev.token === curr.token && prev.authMethod === curr.authMethod)).pipe(map(({ token, authMethod }) => clientFactory({
    apiVersion: DEFAULT_API_VERSION$1,
    requestTagPrefix: REQUEST_TAG_PREFIX,
    token: authMethod === "cookie" ? void 0 : token,
    ignoreBrowserTokenWarning: true,
    useProjectHostname,
    useCdn: false,
    ...authMethod === "cookie" ? { withCredentials: true } : {},
    ...useProjectHostname && projectId2 ? { projectId: projectId2 } : {},
    ...apiHost && { apiHost }
  })), switchMap((client) => client.observable.request({
    url: "/users/me",
    method: "GET",
    tag: "users.get-current"
  }).pipe(
    /**
    * Catch inside switchMap so the outer subscription survives.
    * Without this, a 401 terminates the subscription permanently
    * and subsequent token refreshes via comlink never re-fetch /users/me.
    * @see SDK-1409
    */
    catchError((error) => (logger.error("Failed to fetch current user", { error }), state.set("setError", { authState: {
      type: "error",
      error
    } }), EMPTY))
  ))).subscribe({ next: (currentUser) => {
    logger.info("Current user fetched successfully", { hasEmail: !!currentUser.email }), logger.debug("Current user details", { userId: currentUser.id }), state.set("setCurrentUser", (prev) => ({ authState: prev.authState.type === "logged-in" ? {
      ...prev.authState,
      currentUser
    } : prev.authState }));
  } });
};
function createLoggedInAuthState(token, currentUser, existingLastTokenRefresh) {
  let isStampedToken = token.includes("-st"), lastTokenRefresh = existingLastTokenRefresh ?? (isStampedToken ? Date.now() : void 0);
  return {
    type: "logged-in",
    token,
    currentUser,
    ...lastTokenRefresh !== void 0 && { lastTokenRefresh }
  };
}
function getAuthCode(callbackUrl, locationHref) {
  let loc = new URL(locationHref, DEFAULT_BASE), callbackLocation = callbackUrl ? new URL(callbackUrl, DEFAULT_BASE) : void 0, callbackLocationMatches = !callbackLocation || loc.pathname.toLowerCase().startsWith(callbackLocation.pathname.toLowerCase()), authCode = new URLSearchParams(loc.hash.slice(1)).get("sid") || new URLSearchParams(loc.search).get("sid");
  if (!authCode) {
    let contextParam = new URLSearchParams(loc.search).get("_context");
    if (contextParam) try {
      let parsedContext = JSON.parse(contextParam);
      parsedContext && typeof parsedContext == "object" && typeof parsedContext.sid == "string" && parsedContext.sid && (authCode = parsedContext.sid);
    } catch {
    }
  }
  return authCode && callbackLocationMatches ? authCode : null;
}
function getTokenFromLocation(locationHref) {
  let loc = new URL(locationHref);
  return new URLSearchParams(loc.hash.slice(1)).get("token") || null;
}
function getTokenFromStorage(storageArea, storageKey) {
  if (!storageArea) return null;
  let item = storageArea.getItem(storageKey);
  if (item === null) return null;
  try {
    let parsed = JSON.parse(item);
    if (typeof parsed != "object" || !parsed || !("token" in parsed) || typeof parsed.token != "string") throw Error("Invalid stored auth data structure");
    return parsed.token;
  } catch {
    return storageArea.removeItem(storageKey), null;
  }
}
function getStorageEvents() {
  return typeof window < "u" && typeof window.addEventListener == "function" ? fromEvent(window, "storage") : EMPTY;
}
function getDefaultStorage() {
  try {
    return typeof localStorage < "u" && typeof localStorage.getItem == "function" ? localStorage : void 0;
  } catch {
    return;
  }
}
function getDefaultLocation() {
  try {
    return typeof location > "u" ? DEFAULT_BASE : typeof location.href == "string" ? location.href : DEFAULT_BASE;
  } catch {
    return DEFAULT_BASE;
  }
}
function getCleanedUrl(locationUrl) {
  let loc = new URL(locationUrl), rawHash = loc.hash.startsWith("#") ? loc.hash.slice(1) : loc.hash;
  if (rawHash && rawHash.includes("=")) {
    let hashParams = new URLSearchParams(rawHash);
    hashParams.delete("token"), hashParams.delete("withSid");
    let nextHash = hashParams.toString();
    loc.hash = nextHash ? `#${nextHash}` : "";
  }
  return loc.searchParams.delete("sid"), loc.searchParams.delete("url"), loc.toString();
}
function getClientErrorApiBody(error) {
  let body = error.response?.body;
  return body && typeof body == "object" ? body : void 0;
}
function getClientErrorApiType(error) {
  let body = getClientErrorApiBody(error);
  return body?.error?.type ?? body?.type;
}
function getClientErrorApiDescription(error) {
  let body = getClientErrorApiBody(error);
  return body?.error?.description ?? body?.description;
}
function isProjectUserNotFoundClientError(error) {
  return getClientErrorApiType(error) === "projectUserNotFoundError";
}
function parseDashboardContext(locationHref) {
  try {
    let contextParam = new URL(locationHref, DEFAULT_BASE).searchParams.get("_context");
    if (contextParam) {
      let parsedContext = JSON.parse(contextParam);
      if (parsedContext && typeof parsedContext == "object" && !Array.isArray(parsedContext) && Object.keys(parsedContext).length > 0) return delete parsedContext.sid, parsedContext;
    }
  } catch (err) {
    console.error("Failed to parse dashboard context from initial location:", err);
  }
  return {};
}
function getDashboardInitialState(options) {
  let { authConfig, initialLocationHref } = options, providedToken = authConfig.token, callbackUrl = authConfig.callbackUrl, storageKey = "__sanity_auth_token", dashboardContext = parseDashboardContext(initialLocationHref);
  return providedToken ? {
    authState: createLoggedInAuthState(providedToken, null),
    storageKey,
    storageArea: void 0,
    authMethod: void 0,
    dashboardContext
  } : getAuthCode(callbackUrl, initialLocationHref) || getTokenFromLocation(initialLocationHref) ? {
    authState: {
      type: "logging-in",
      isExchangingToken: false
    },
    storageKey,
    storageArea: void 0,
    authMethod: void 0,
    dashboardContext
  } : {
    authState: {
      type: "logged-out",
      isDestroyingSession: false
    },
    storageKey,
    storageArea: void 0,
    authMethod: void 0,
    dashboardContext
  };
}
function initializeDashboardAuth(context, tokenRefresherRunning2) {
  let subscriptions = [], startedRefresher = false;
  return subscriptions.push(subscribeToStateAndFetchCurrentUser(context, { useProjectHostname: false })), tokenRefresherRunning2 || (startedRefresher = true, subscriptions.push(refreshStampedToken(context))), {
    dispose: () => {
      for (let subscription of subscriptions) subscription.unsubscribe();
    },
    tokenRefresherStarted: startedRefresher
  };
}
function deserializeTokens(raw) {
  if (!raw) return null;
  try {
    let parsed = JSON.parse(raw);
    if (typeof parsed != "object" || !parsed || !("accessToken" in parsed) || typeof parsed.accessToken != "string" || !("expiresAt" in parsed) || typeof parsed.expiresAt != "string") return null;
    let value = parsed;
    return {
      accessToken: value.accessToken,
      tokenType: "bearer",
      expiresIn: value.expiresIn,
      expiresAt: new Date(value.expiresAt),
      ...value.refreshToken !== void 0 && { refreshToken: value.refreshToken }
    };
  } catch {
    return null;
  }
}
function getOauthInitialState(options) {
  let { authConfig, initialLocationHref } = options, storageKey = "__sanity_oauth_tokens", storageArea = authConfig.storageArea ?? getDefaultStorage(), redirectUri = authConfig.oauth?.redirectUri, tokens = deserializeTokens(storageArea?.getItem("__sanity_oauth_tokens") ?? null);
  if (tokens) return {
    authState: createLoggedInAuthState(tokens.accessToken, null),
    storageKey,
    storageArea,
    authMethod: "localstorage",
    dashboardContext: {},
    oauthTokens: tokens
  };
  let { searchParams } = new URL(initialLocationHref, DEFAULT_BASE), isCallback = searchParams.has("code") || searchParams.has("state") || searchParams.has("error");
  if (redirectUri && isCallback) {
    let loc = new URL(initialLocationHref, DEFAULT_BASE), redirect = new URL(redirectUri, DEFAULT_BASE);
    if (loc.origin === redirect.origin && loc.pathname === redirect.pathname) return {
      authState: {
        type: "logging-in",
        isExchangingToken: false
      },
      storageKey,
      storageArea,
      authMethod: void 0,
      dashboardContext: {}
    };
  }
  return {
    authState: {
      type: "logged-out",
      isDestroyingSession: false
    },
    storageKey,
    storageArea,
    authMethod: void 0,
    dashboardContext: {}
  };
}
function subscribeToOAuthStorageEvents({ state }) {
  let { storageArea } = state.get().options;
  return defer(getStorageEvents).pipe(filter((e) => e.storageArea === storageArea && e.key === "__sanity_oauth_tokens"), map(() => deserializeTokens(storageArea?.getItem("__sanity_oauth_tokens") ?? null)), distinctUntilChanged((a, b) => a?.accessToken === b?.accessToken)).subscribe((tokens) => {
    state.set("updateOAuthTokensFromStorageEvent", {
      authState: tokens ? createLoggedInAuthState(tokens.accessToken, null) : {
        type: "logged-out",
        isDestroyingSession: false
      },
      oauthTokens: tokens ?? void 0
    });
  });
}
function initializeOauthAuth(context) {
  let subscriptions = [];
  return subscriptions.push(subscribeToStateAndFetchCurrentUser(context, { useProjectHostname: false })), context.state.get().options?.storageArea && subscriptions.push(subscribeToOAuthStorageEvents(context)), {
    dispose: () => {
      for (let subscription of subscriptions) subscription.unsubscribe();
    },
    tokenRefresherStarted: false
  };
}
var subscribeToStorageEventsAndSetToken = ({ state }) => {
  let { storageArea, storageKey } = state.get().options;
  return defer(getStorageEvents).pipe(filter((e) => e.storageArea === storageArea && e.key === storageKey), map(() => getTokenFromStorage(storageArea, storageKey)), distinctUntilChanged()).subscribe((token) => {
    state.set("updateTokenFromStorageEvent", { authState: token ? createLoggedInAuthState(token, null) : {
      type: "logged-out",
      isDestroyingSession: false
    } });
  });
};
function getStandaloneInitialState(options) {
  let { authConfig, initialLocationHref } = options, providedToken = authConfig.token, callbackUrl = authConfig.callbackUrl, storageKey = "__sanity_auth_token", storageArea = authConfig.storageArea ?? getDefaultStorage();
  if (providedToken) return {
    authState: createLoggedInAuthState(providedToken, null),
    storageKey,
    storageArea,
    authMethod: void 0,
    dashboardContext: {}
  };
  if (getAuthCode(callbackUrl, initialLocationHref) || getTokenFromLocation(initialLocationHref)) return {
    authState: {
      type: "logging-in",
      isExchangingToken: false
    },
    storageKey,
    storageArea,
    authMethod: void 0,
    dashboardContext: {}
  };
  let token = getTokenFromStorage(storageArea, storageKey);
  return token ? {
    authState: createLoggedInAuthState(token, null),
    storageKey,
    storageArea,
    authMethod: "localstorage",
    dashboardContext: {}
  } : {
    authState: {
      type: "logged-out",
      isDestroyingSession: false
    },
    storageKey,
    storageArea,
    authMethod: void 0,
    dashboardContext: {}
  };
}
function initializeStandaloneAuth(context, tokenRefresherRunning2) {
  let subscriptions = [], startedRefresher = false;
  return subscriptions.push(subscribeToStateAndFetchCurrentUser(context, { useProjectHostname: false })), context.state.get().options?.storageArea && subscriptions.push(subscribeToStorageEventsAndSetToken(context)), tokenRefresherRunning2 || (startedRefresher = true, subscriptions.push(refreshStampedToken(context))), {
    dispose: () => {
      for (let subscription of subscriptions) subscription.unsubscribe();
    },
    tokenRefresherStarted: startedRefresher
  };
}
async function checkForCookieAuth(projectId2, clientFactory) {
  if (!projectId2) return false;
  try {
    let user = await clientFactory({
      projectId: projectId2,
      useCdn: false,
      requestTagPrefix: REQUEST_TAG_PREFIX,
      timeout: 1e4
    }).request({
      url: "/users/me",
      withCredentials: true,
      tag: "users.get-current"
    });
    return typeof user == "object" && !!user && typeof user.id == "string";
  } catch {
    return false;
  }
}
function getStudioTokenFromLocalStorage(storageArea, storageKey) {
  return !storageArea || !storageKey ? null : getTokenFromStorage(storageArea, storageKey) || null;
}
function getStudioInitialState(options) {
  let { authConfig, projectId: projectId2, tokenSource } = options, storageArea = authConfig.storageArea ?? getDefaultStorage(), studioStorageKey = `__studio_auth_token_${projectId2 ?? ""}`;
  if (tokenSource) return {
    authState: {
      type: "logging-in",
      isExchangingToken: false
    },
    storageKey: studioStorageKey,
    storageArea,
    authMethod: void 0,
    dashboardContext: {}
  };
  let providedToken = authConfig.token, authMethod, token = getStudioTokenFromLocalStorage(storageArea, studioStorageKey);
  return token && (authMethod = "localstorage"), providedToken ? {
    authState: createLoggedInAuthState(providedToken, null),
    storageKey: studioStorageKey,
    storageArea,
    authMethod,
    dashboardContext: {}
  } : token ? {
    authState: createLoggedInAuthState(token, null),
    storageKey: studioStorageKey,
    storageArea,
    authMethod: "localstorage",
    dashboardContext: {}
  } : {
    authState: {
      type: "logged-out",
      isDestroyingSession: false
    },
    storageKey: studioStorageKey,
    storageArea,
    authMethod: void 0,
    dashboardContext: {}
  };
}
function initializeStudioAuth(context, tokenRefresherRunning2) {
  let tokenSource = context.instance.config.studio?.auth?.token;
  return tokenSource ? initializeWithTokenSource(context, tokenSource) : initializeWithFallback(context, tokenRefresherRunning2);
}
function initializeWithTokenSource(context, tokenSource) {
  let subscriptions = [], studioAuthenticated = context.instance.config.studio?.authenticated === true;
  subscriptions.push(subscribeToStateAndFetchCurrentUser(context, { useProjectHostname: true }));
  let tokenSub = tokenSource.subscribe({ next: (token) => {
    let { state } = context;
    token ? state.set("studioTokenSource", (prev) => ({
      options: {
        ...prev.options,
        authMethod: void 0
      },
      authState: createLoggedInAuthState(token, null)
    })) : studioAuthenticated ? state.set("studioTokenSourceCookieAuth", (prev) => ({
      options: {
        ...prev.options,
        authMethod: "cookie"
      },
      authState: prev.authState.type === "logged-in" ? prev.authState : createLoggedInAuthState("", null)
    })) : state.set("studioTokenSourceLoggedOut", (prev) => ({
      options: {
        ...prev.options,
        authMethod: void 0
      },
      authState: {
        type: "logged-out",
        isDestroyingSession: false
      }
    }));
  } });
  return {
    dispose: () => {
      tokenSub.unsubscribe();
      for (let subscription of subscriptions) subscription.unsubscribe();
    },
    tokenRefresherStarted: false
  };
}
function initializeWithFallback(context, tokenRefresherRunning2) {
  let subscriptions = [], startedRefresher = false;
  subscriptions.push(subscribeToStateAndFetchCurrentUser(context, { useProjectHostname: true })), context.state.get().options?.storageArea && subscriptions.push(subscribeToStorageEventsAndSetToken(context));
  try {
    let { instance, state } = context;
    if (!(state.get().authState?.type === "logged-in" && state.get().authState.token)) {
      let projectIdValue = instance.config.projectId, clientFactory = state.get().options.clientFactory;
      checkForCookieAuth(projectIdValue, clientFactory).then((isCookieAuthEnabled) => {
        isCookieAuthEnabled && state.set("enableCookieAuth", (prev) => ({
          options: {
            ...prev.options,
            authMethod: "cookie"
          },
          authState: prev.authState.type === "logged-in" ? prev.authState : createLoggedInAuthState("", null)
        }));
      });
    }
  } catch {
  }
  return tokenRefresherRunning2 || (startedRefresher = true, subscriptions.push(refreshStampedToken(context))), {
    dispose: () => {
      for (let subscription of subscriptions) subscription.unsubscribe();
    },
    tokenRefresherStarted: startedRefresher
  };
}
var authStore_exports = __exportAll2({
  authStore: () => authStore,
  getAuthMethodState: () => getAuthMethodState,
  getAuthState: () => getAuthState,
  getCurrentUserState: () => getCurrentUserState,
  getDashboardOrganizationId: () => getDashboardOrganizationId,
  getIsInDashboardState: () => getIsInDashboardState,
  getLoginUrlState: () => getLoginUrlState,
  getTokenState: () => getTokenState,
  setAuthToken: () => setAuthToken
});
var tokenRefresherRunning = false;
var authStore = defineStore({
  name: "Auth",
  getInitialState(instance) {
    let logger = getAuthLogger(instance);
    logger.debug("Initializing auth store", {
      hasProvidedToken: !!instance.config.auth?.token,
      hasCustomProviders: !!(instance.config.auth?.providers && instance.config.auth.providers.length > 0)
    });
    let { apiHost: configApiHost, callbackUrl, providers: customProviders, token: providedToken, clientFactory = createClient, initialLocationHref = getDefaultLocation() } = instance.config.auth ?? {}, apiHost = configApiHost ?? getStagingApiHost(), authConfig = instance.config.auth ?? {}, loginDomain = "https://www.sanity.io";
    try {
      apiHost && new URL(apiHost).hostname.endsWith(".sanity.work") && (loginDomain = "https://www.sanity.work");
    } catch {
    }
    let loginUrl = new URL("/login", loginDomain);
    loginUrl.searchParams.set("origin", getCleanedUrl(initialLocationHref)), loginUrl.searchParams.set("type", "stampedToken"), loginUrl.searchParams.set("withSid", "true");
    let mode = resolveAuthMode(instance.config, initialLocationHref), strategyOptions = {
      authConfig,
      projectId: instance.config.projectId,
      initialLocationHref,
      clientFactory,
      tokenSource: instance.config.studio?.auth?.token
    }, result;
    switch (mode) {
      case "studio":
        result = getStudioInitialState(strategyOptions);
        break;
      case "oauth":
        result = getOauthInitialState(strategyOptions);
        break;
      case "dashboard":
        result = getDashboardInitialState(strategyOptions);
        break;
      case "standalone":
        result = getStandaloneInitialState(strategyOptions);
    }
    return logger.debug("Auth state initialized", {
      authStateType: result.authState.type,
      mode,
      authMethod: result.authMethod
    }), {
      authState: result.authState,
      dashboardContext: result.dashboardContext,
      oauthTokens: result.oauthTokens,
      options: {
        apiHost,
        loginUrl: loginUrl.toString(),
        callbackUrl,
        customProviders,
        providedToken,
        clientFactory,
        initialLocationHref,
        storageKey: result.storageKey,
        storageArea: result.storageArea,
        authMethod: result.authMethod,
        oauth: authConfig.oauth
      }
    };
  },
  initialize(context) {
    let logger = getAuthLogger(context.instance), initialLocationHref = context.state.get().options?.initialLocationHref ?? getDefaultLocation(), mode = resolveAuthMode(context.instance.config, initialLocationHref);
    logger.debug("Setting up auth subscriptions", { mode });
    let initResult;
    switch (mode) {
      case "studio":
        initResult = initializeStudioAuth(context, tokenRefresherRunning);
        break;
      case "oauth":
        initResult = initializeOauthAuth(context);
        break;
      case "dashboard":
        initResult = initializeDashboardAuth(context, tokenRefresherRunning);
        break;
      case "standalone":
        initResult = initializeStandaloneAuth(context, tokenRefresherRunning);
    }
    return initResult.tokenRefresherStarted && (tokenRefresherRunning = true), () => {
      logger.debug("Cleaning up auth subscriptions"), initResult.dispose();
    };
  }
});
var getCurrentUserState = bindActionGlobally(authStore, createStateSourceAction(({ state: { authState } }) => authState.type === "logged-in" ? authState.currentUser : null));
var getTokenState = bindActionGlobally(authStore, createStateSourceAction(({ state: { authState } }) => authState.type === "logged-in" ? authState.token : null));
var getAuthMethodState = bindActionGlobally(authStore, createStateSourceAction(({ state: { options } }) => options.authMethod));
var getLoginUrlState = bindActionGlobally(authStore, createStateSourceAction(({ state: { options } }) => options.loginUrl));
var getAuthState = bindActionGlobally(authStore, createStateSourceAction(({ state: { authState } }) => authState));
var getDashboardOrganizationId = bindActionGlobally(authStore, createStateSourceAction(({ state: { dashboardContext } }) => dashboardContext?.orgId));
var getIsInDashboardState = bindActionGlobally(authStore, createStateSourceAction(({ state: { dashboardContext } }) => !!dashboardContext && Object.keys(dashboardContext).length > 0));
var setAuthToken = bindActionGlobally(authStore, ({ state, instance }, token) => {
  let logger = getAuthLogger(instance), currentAuthState = state.get().authState;
  if (token) {
    if (currentAuthState.type !== "logged-in" || currentAuthState.token !== token) {
      logger.info("Setting auth token");
      let currentUser = currentAuthState.type === "logged-in" ? currentAuthState.currentUser : null, preservedLastTokenRefresh = currentAuthState.type === "logged-in" ? currentAuthState.lastTokenRefresh : void 0;
      state.set("setToken", { authState: createLoggedInAuthState(token, currentUser, preservedLastTokenRefresh) });
    }
  } else currentAuthState.type !== "logged-out" && (logger.info("Clearing auth token"), state.set("setToken", { authState: {
    type: "logged-out",
    isDestroyingSession: false
  } }));
});
var clientStore_exports = __exportAll2({
  getClient: () => getClient,
  getClientState: () => getClientState
});
var allowedKeys = Object.keys({
  apiHost: null,
  useCdn: null,
  token: null,
  perspective: null,
  proxy: null,
  withCredentials: null,
  timeout: null,
  maxRetries: null,
  dataset: null,
  projectId: null,
  scope: null,
  apiVersion: null,
  requestTagPrefix: null,
  useProjectHostname: null,
  resource: null
});
var DEFAULT_CLIENT_CONFIG = {
  apiVersion: "2024-11-12",
  useCdn: false,
  ignoreBrowserTokenWarning: true,
  allowReconfigure: false,
  requestTagPrefix: "sanity.sdk"
};
var clientStore = defineStore({
  name: "clientStore",
  getInitialState: (instance) => ({
    clients: {},
    token: getTokenState(instance).getCurrent()
  }),
  initialize(context) {
    let subscription = listenToToken(context), authMethodSubscription = listenToAuthMethod(context);
    return () => {
      subscription.unsubscribe(), authMethodSubscription.unsubscribe();
    };
  }
});
var listenToToken = ({ instance, state }) => getTokenState(instance).observable.subscribe((token) => {
  state.set("setTokenAndResetClients", {
    token,
    clients: {}
  });
});
var listenToAuthMethod = ({ instance, state }) => getAuthMethodState(instance).observable.subscribe((authMethod) => {
  state.set("setAuthMethod", { authMethod });
});
var getClientConfigKey = (options) => JSON.stringify(pickProperties(options, allowedKeys));
var getClient = bindActionGlobally(clientStore, ({ state, instance }, options) => {
  if (!options || typeof options != "object") throw Error('getClient() requires a configuration object with at least an "apiVersion" property. Example: getClient(instance, { apiVersion: "2024-11-12" })');
  let disallowedKeys = Object.keys(options).filter((key2) => !allowedKeys.includes(key2));
  if (disallowedKeys.length > 0) {
    let listFormatter = new Intl.ListFormat("en", {
      style: "long",
      type: "conjunction"
    });
    throw Error(`The client options provided contains unsupported properties: ${listFormatter.format(disallowedKeys)}. Allowed keys are: ${listFormatter.format(allowedKeys)}.`);
  }
  let tokenFromState = state.get().token, { clients, authMethod } = state.get(), projectId2 = options.projectId ?? instance.config.projectId, dataset2 = options.dataset ?? instance.config.dataset, resource;
  options.resource && (isMediaLibraryResource(options.resource) ? resource = {
    type: "media-library",
    id: options.resource.mediaLibraryId
  } : isCanvasResource(options.resource) ? resource = {
    type: "canvas",
    id: options.resource.canvasId
  } : isDatasetResource(options.resource) && (projectId2 = options.resource.projectId, dataset2 = options.resource.dataset));
  let apiHost = options.apiHost ?? instance.config.auth?.apiHost ?? getStagingApiHost(), effectiveOptions = {
    ...DEFAULT_CLIENT_CONFIG,
    ...(options.scope === "global" || !projectId2 || resource) && { useProjectHostname: false },
    token: authMethod === "cookie" ? void 0 : tokenFromState ?? void 0,
    ...options,
    ...projectId2 && { projectId: projectId2 },
    ...dataset2 && { dataset: dataset2 },
    ...resource ? { resource } : { resource: void 0 },
    ...apiHost && { apiHost }
  };
  resource && (delete effectiveOptions.projectId, delete effectiveOptions.dataset), effectiveOptions.token === null || effectiveOptions.token === void 0 ? (delete effectiveOptions.token, authMethod === "cookie" && (effectiveOptions.withCredentials = true)) : delete effectiveOptions.withCredentials;
  let key = getClientConfigKey(effectiveOptions);
  if (clients[key]) return clients[key];
  let client = createClient(effectiveOptions);
  return state.set("addClient", (prev) => ({ clients: {
    ...prev.clients,
    [key]: client
  } })), client;
});
var getClientState = bindActionGlobally(clientStore, createStateSourceAction(({ instance }, options) => getClient(instance, options)));

export {
  ConnectionFailedError,
  DisconnectError,
  isDatasetResource,
  isMediaLibraryResource,
  isCanvasResource,
  isReleasePerspective,
  getEnv,
  defineStore,
  createActionBinder,
  bindActionByResource,
  bindActionByResourceAndPerspective,
  bindActionGlobally,
  createStateSourceAction,
  isObject,
  omitProperty,
  pickProperties,
  isDeepEqual,
  isKeyedObject,
  isKeySegment,
  __exportAll2 as __exportAll,
  configureLogging,
  createLogger,
  getAuthLogger,
  DEFAULT_BASE,
  DEFAULT_API_VERSION$1,
  REQUEST_TAG_PREFIX,
  isStudioConfig,
  AuthStateType,
  createLoggedInAuthState,
  getAuthCode,
  getTokenFromLocation,
  getDefaultLocation,
  getCleanedUrl,
  getClientErrorApiBody,
  getClientErrorApiType,
  getClientErrorApiDescription,
  isProjectUserNotFoundClientError,
  authStore_exports,
  authStore,
  getCurrentUserState,
  getTokenState,
  getLoginUrlState,
  getAuthState,
  getDashboardOrganizationId,
  getIsInDashboardState,
  setAuthToken,
  clientStore_exports,
  getClient,
  getClientState
};
//# sourceMappingURL=chunk-6GTGSWIH.js.map
