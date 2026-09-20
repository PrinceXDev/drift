import {
  require_client
} from "./chunk-FNIVEC2U.js";
import {
  require_react
} from "./chunk-YOL4SAJZ.js";
import {
  AuthStateType,
  ConnectionFailedError,
  DEFAULT_API_VERSION$1,
  DEFAULT_BASE,
  DisconnectError,
  REQUEST_TAG_PREFIX,
  __exportAll,
  authStore,
  bindActionByResource,
  bindActionByResourceAndPerspective,
  bindActionGlobally,
  configureLogging,
  createActionBinder,
  createLoggedInAuthState,
  createLogger,
  createStateSourceAction,
  defineStore,
  getAuthCode,
  getAuthLogger,
  getAuthState,
  getCleanedUrl,
  getClient,
  getClientErrorApiBody,
  getClientErrorApiDescription,
  getClientState,
  getCurrentUserState,
  getDashboardOrganizationId,
  getDefaultLocation,
  getEnv,
  getIsInDashboardState,
  getLoginUrlState,
  getTokenFromLocation,
  getTokenState,
  isCanvasResource,
  isDatasetResource,
  isDeepEqual,
  isKeySegment,
  isKeyedObject,
  isMediaLibraryResource,
  isObject,
  isProjectUserNotFoundClientError,
  isReleasePerspective,
  isStudioConfig,
  omitProperty,
  pickProperties,
  setAuthToken
} from "./chunk-6GTGSWIH.js";
import "./chunk-TQF76M4J.js";
import {
  BehaviorSubject,
  ClientError,
  CorsOriginError,
  EMPTY,
  NEVER,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
  asyncScheduler,
  auditTime,
  bufferCount,
  bufferWhen,
  catchError,
  combineLatest,
  concat,
  concatMap,
  debounceTime,
  defer,
  distinctUntilChanged,
  filter,
  finalize,
  first,
  firstValueFrom,
  from,
  fromEvent,
  groupBy,
  identity,
  lastValueFrom,
  map,
  merge,
  mergeMap,
  of,
  pairwise,
  partition,
  pipe,
  race,
  retry,
  scan,
  scheduled,
  share,
  shareReplay,
  skip,
  startWith,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  throwError,
  timer,
  withLatestFrom
} from "./chunk-YG2ZALVI.js";
import "./chunk-6K7ISYVF.js";
import {
  __commonJS,
  __toESM
} from "./chunk-5WRI5ZAA.js";

// ../../node_modules/.pnpm/react-compiler-runtime@1.0.0_react@19.3.0/node_modules/react-compiler-runtime/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/react-compiler-runtime@1.0.0_react@19.3.0/node_modules/react-compiler-runtime/dist/index.js"(exports, module) {
    "use no memo";
    "use strict";
    var __create = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
    var index_exports = {};
    __export(index_exports, {
      $dispatcherGuard: () => $dispatcherGuard,
      $makeReadOnly: () => $makeReadOnly,
      $reset: () => $reset,
      $structuralCheck: () => $structuralCheck,
      c: () => c4,
      clearRenderCounterRegistry: () => clearRenderCounterRegistry,
      renderCounterRegistry: () => renderCounterRegistry,
      useRenderCounter: () => useRenderCounter
    });
    module.exports = __toCommonJS(index_exports);
    var React = __toESM2(require_react());
    var { useRef: useRef3, useEffect: useEffect3, isValidElement } = React;
    var _a;
    var ReactSecretInternals = (
      //@ts-ignore
      (_a = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) != null ? _a : React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    );
    var $empty = Symbol.for("react.memo_cache_sentinel");
    var _a2;
    var c4 = (
      // @ts-expect-error
      typeof ((_a2 = React.__COMPILER_RUNTIME) == null ? void 0 : _a2.c) === "function" ? (
        // @ts-expect-error
        React.__COMPILER_RUNTIME.c
      ) : function c22(size) {
        return React.useMemo(() => {
          const $ = new Array(size);
          for (let ii = 0; ii < size; ii++) {
            $[ii] = $empty;
          }
          $[$empty] = true;
          return $;
        }, []);
      }
    );
    var LazyGuardDispatcher = {};
    [
      "readContext",
      "useCallback",
      "useContext",
      "useEffect",
      "useImperativeHandle",
      "useInsertionEffect",
      "useLayoutEffect",
      "useMemo",
      "useReducer",
      "useRef",
      "useState",
      "useDebugValue",
      "useDeferredValue",
      "useTransition",
      "useMutableSource",
      "useSyncExternalStore",
      "useId",
      "unstable_isNewReconciler",
      "getCacheSignal",
      "getCacheForType",
      "useCacheRefresh"
    ].forEach((name) => {
      LazyGuardDispatcher[name] = () => {
        throw new Error(
          `[React] Unexpected React hook call (${name}) from a React compiled function. Check that all hooks are called directly and named according to convention ('use[A-Z]') `
        );
      };
    });
    var originalDispatcher = null;
    LazyGuardDispatcher["useMemoCache"] = (count) => {
      if (originalDispatcher == null) {
        throw new Error(
          "React Compiler internal invariant violation: unexpected null dispatcher"
        );
      } else {
        return originalDispatcher.useMemoCache(count);
      }
    };
    function setCurrent(newDispatcher) {
      ReactSecretInternals.ReactCurrentDispatcher.current = newDispatcher;
      return ReactSecretInternals.ReactCurrentDispatcher.current;
    }
    var guardFrames = [];
    function $dispatcherGuard(kind) {
      const curr = ReactSecretInternals.ReactCurrentDispatcher.current;
      if (kind === 0) {
        guardFrames.push(curr);
        if (guardFrames.length === 1) {
          originalDispatcher = curr;
        }
        if (curr === LazyGuardDispatcher) {
          throw new Error(
            `[React] Unexpected call to custom hook or component from a React compiled function. Check that (1) all hooks are called directly and named according to convention ('use[A-Z]') and (2) components are returned as JSX instead of being directly invoked.`
          );
        }
        setCurrent(LazyGuardDispatcher);
      } else if (kind === 1) {
        const lastFrame = guardFrames.pop();
        if (lastFrame == null) {
          throw new Error(
            "React Compiler internal error: unexpected null in guard stack"
          );
        }
        if (guardFrames.length === 0) {
          originalDispatcher = null;
        }
        setCurrent(lastFrame);
      } else if (kind === 2) {
        guardFrames.push(curr);
        setCurrent(originalDispatcher);
      } else if (kind === 3) {
        const lastFrame = guardFrames.pop();
        if (lastFrame == null) {
          throw new Error(
            "React Compiler internal error: unexpected null in guard stack"
          );
        }
        setCurrent(lastFrame);
      } else {
        throw new Error("React Compiler internal error: unreachable block" + kind);
      }
    }
    function $reset($) {
      for (let ii = 0; ii < $.length; ii++) {
        $[ii] = $empty;
      }
    }
    function $makeReadOnly() {
      throw new Error("TODO: implement $makeReadOnly in react-compiler-runtime");
    }
    var renderCounterRegistry = /* @__PURE__ */ new Map();
    function clearRenderCounterRegistry() {
      for (const counters of renderCounterRegistry.values()) {
        counters.forEach((counter) => {
          counter.count = 0;
        });
      }
    }
    function registerRenderCounter(name, val) {
      let counters = renderCounterRegistry.get(name);
      if (counters == null) {
        counters = /* @__PURE__ */ new Set();
        renderCounterRegistry.set(name, counters);
      }
      counters.add(val);
    }
    function removeRenderCounter(name, val) {
      const counters = renderCounterRegistry.get(name);
      if (counters == null) {
        return;
      }
      counters.delete(val);
    }
    function useRenderCounter(name) {
      const val = useRef3(null);
      if (val.current != null) {
        val.current.count += 1;
      }
      useEffect3(() => {
        if (val.current == null) {
          const counter = { count: 0 };
          registerRenderCounter(name, counter);
          val.current = counter;
        }
        return () => {
          if (val.current !== null) {
            removeRenderCounter(name, val.current);
          }
        };
      });
    }
    var seenErrors = /* @__PURE__ */ new Set();
    function $structuralCheck(oldValue, newValue, variableName, fnName, kind, loc) {
      function error2(l2, r, path, depth) {
        const str = `${fnName}:${loc} [${kind}] ${variableName}${path} changed from ${l2} to ${r} at depth ${depth}`;
        if (seenErrors.has(str)) {
          return;
        }
        seenErrors.add(str);
        console.error(str);
      }
      const depthLimit = 2;
      function recur(oldValue2, newValue2, path, depth) {
        if (depth > depthLimit) {
          return;
        } else if (oldValue2 === newValue2) {
          return;
        } else if (typeof oldValue2 !== typeof newValue2) {
          error2(`type ${typeof oldValue2}`, `type ${typeof newValue2}`, path, depth);
        } else if (typeof oldValue2 === "object") {
          const oldArray = Array.isArray(oldValue2);
          const newArray = Array.isArray(newValue2);
          if (oldValue2 === null && newValue2 !== null) {
            error2("null", `type ${typeof newValue2}`, path, depth);
          } else if (newValue2 === null) {
            error2(`type ${typeof oldValue2}`, "null", path, depth);
          } else if (oldValue2 instanceof Map) {
            if (!(newValue2 instanceof Map)) {
              error2(`Map instance`, `other value`, path, depth);
            } else if (oldValue2.size !== newValue2.size) {
              error2(
                `Map instance with size ${oldValue2.size}`,
                `Map instance with size ${newValue2.size}`,
                path,
                depth
              );
            } else {
              for (const [k, v] of oldValue2) {
                if (!newValue2.has(k)) {
                  error2(
                    `Map instance with key ${k}`,
                    `Map instance without key ${k}`,
                    path,
                    depth
                  );
                } else {
                  recur(v, newValue2.get(k), `${path}.get(${k})`, depth + 1);
                }
              }
            }
          } else if (newValue2 instanceof Map) {
            error2("other value", `Map instance`, path, depth);
          } else if (oldValue2 instanceof Set) {
            if (!(newValue2 instanceof Set)) {
              error2(`Set instance`, `other value`, path, depth);
            } else if (oldValue2.size !== newValue2.size) {
              error2(
                `Set instance with size ${oldValue2.size}`,
                `Set instance with size ${newValue2.size}`,
                path,
                depth
              );
            } else {
              for (const v of newValue2) {
                if (!oldValue2.has(v)) {
                  error2(
                    `Set instance without element ${v}`,
                    `Set instance with element ${v}`,
                    path,
                    depth
                  );
                }
              }
            }
          } else if (newValue2 instanceof Set) {
            error2("other value", `Set instance`, path, depth);
          } else if (oldArray || newArray) {
            if (oldArray !== newArray) {
              error2(
                `type ${oldArray ? "array" : "object"}`,
                `type ${newArray ? "array" : "object"}`,
                path,
                depth
              );
            } else if (oldValue2.length !== newValue2.length) {
              error2(
                `array with length ${oldValue2.length}`,
                `array with length ${newValue2.length}`,
                path,
                depth
              );
            } else {
              for (let ii = 0; ii < oldValue2.length; ii++) {
                recur(oldValue2[ii], newValue2[ii], `${path}[${ii}]`, depth + 1);
              }
            }
          } else if (isValidElement(oldValue2) || isValidElement(newValue2)) {
            if (isValidElement(oldValue2) !== isValidElement(newValue2)) {
              error2(
                `type ${isValidElement(oldValue2) ? "React element" : "object"}`,
                `type ${isValidElement(newValue2) ? "React element" : "object"}`,
                path,
                depth
              );
            } else if (oldValue2.type !== newValue2.type) {
              error2(
                `React element of type ${oldValue2.type}`,
                `React element of type ${newValue2.type}`,
                path,
                depth
              );
            } else {
              recur(
                oldValue2.props,
                newValue2.props,
                `[props of ${path}]`,
                depth + 1
              );
            }
          } else {
            for (const key in newValue2) {
              if (!(key in oldValue2)) {
                error2(
                  `object without key ${key}`,
                  `object with key ${key}`,
                  path,
                  depth
                );
              }
            }
            for (const key in oldValue2) {
              if (!(key in newValue2)) {
                error2(
                  `object with key ${key}`,
                  `object without key ${key}`,
                  path,
                  depth
                );
              } else {
                recur(oldValue2[key], newValue2[key], `${path}.${key}`, depth + 1);
              }
            }
          }
        } else if (typeof oldValue2 === "function") {
          return;
        } else if (isNaN(oldValue2) || isNaN(newValue2)) {
          if (isNaN(oldValue2) !== isNaN(newValue2)) {
            error2(
              `${isNaN(oldValue2) ? "NaN" : "non-NaN value"}`,
              `${isNaN(newValue2) ? "NaN" : "non-NaN value"}`,
              path,
              depth
            );
          }
        } else if (oldValue2 !== newValue2) {
          error2(oldValue2, newValue2, path, depth);
        }
      }
      recur(oldValue, newValue, "", 0);
    }
  }
});

// ../../node_modules/.pnpm/ts-brand@0.2.0/node_modules/ts-brand/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/.pnpm/ts-brand@0.2.0/node_modules/ts-brand/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.make = exports.identity = void 0;
    function identity2(underlying) {
      return underlying;
    }
    exports.identity = identity2;
    function make3(validator) {
      if (!validator) {
        return identity2;
      }
      return function(underlying) {
        validator(underlying);
        return underlying;
      };
    }
    exports.make = make3;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObject.js"(exports, module) {
    function isObject4(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject4;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayAggregator.js
var require_arrayAggregator = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayAggregator.js"(exports, module) {
    function arrayAggregator(array2, setter, iteratee, accumulator) {
      var index2 = -1, length = array2 == null ? 0 : array2.length;
      while (++index2 < length) {
        var value = array2[index2];
        setter(accumulator, value, iteratee(value), array2);
      }
      return accumulator;
    }
    module.exports = arrayAggregator;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createBaseFor.js
var require_createBaseFor = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createBaseFor.js"(exports, module) {
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index2];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    module.exports = createBaseFor;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseFor.js
var require_baseFor = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseFor.js"(exports, module) {
    var createBaseFor = require_createBaseFor();
    var baseFor = createBaseFor();
    module.exports = baseFor;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n, iteratee) {
      var index2 = -1, result = Array(n);
      while (++index2 < n) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_root.js
var require_root = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArray.js"(exports, module) {
    var isArray2 = Array.isArray;
    module.exports = isArray2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubFalse.js"(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isBuffer.js"(exports, module) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isLength.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    module.exports = nodeUtil;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isTypedArray.js"(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray2 = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isPrototype.js"(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_overArg.js"(exports, module) {
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeKeys.js"(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseKeys.js"(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject4 = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject4(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/keys.js
var require_keys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseForOwn.js
var require_baseForOwn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseForOwn.js"(exports, module) {
    var baseFor = require_baseFor();
    var keys = require_keys();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    module.exports = baseForOwn;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createBaseEach.js
var require_createBaseEach = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createBaseEach.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length, index2 = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index2-- : ++index2 < length) {
          if (iteratee(iterable[index2], index2, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    module.exports = createBaseEach;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseEach.js
var require_baseEach = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseEach.js"(exports, module) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module.exports = baseEach;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAggregator.js
var require_baseAggregator = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAggregator.js"(exports, module) {
    var baseEach = require_baseEach();
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection2) {
        setter(accumulator, value, iteratee(value), collection2);
      });
      return accumulator;
    }
    module.exports = baseAggregator;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/eq.js
var require_eq = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array2, key) {
      var length = array2.length;
      while (length--) {
        if (eq(array2[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice2 = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice2.call(data, index2, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    module.exports = listCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackClear.js"(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackDelete.js"(exports, module) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackGet.js"(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackHas.js"(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject4 = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject4(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map3, key) {
      var data = map3.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackSet.js"(exports, module) {
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Stack.js"(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setCacheAdd.js"(exports, module) {
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module.exports = setCacheAdd;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setCacheHas.js"(exports, module) {
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module.exports = setCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_SetCache.js"(exports, module) {
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index2 = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index2 < length) {
        this.add(values[index2]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module.exports = SetCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arraySome.js"(exports, module) {
    function arraySome(array2, predicate) {
      var index2 = -1, length = array2 == null ? 0 : array2.length;
      while (++index2 < length) {
        if (predicate(array2[index2], index2, array2)) {
          return true;
        }
      }
      return false;
    }
    module.exports = arraySome;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cacheHas.js"(exports, module) {
    function cacheHas(cache2, key) {
      return cache2.has(key);
    }
    module.exports = cacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalArrays.js"(exports, module) {
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array2, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array2.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array2);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array2;
      }
      var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array2, other);
      stack.set(other, array2);
      while (++index2 < arrLength) {
        var arrValue = array2[index2], othValue = other[index2];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index2, other, array2, stack) : customizer(arrValue, othValue, index2, array2, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array2);
      stack["delete"](other);
      return result;
    }
    module.exports = equalArrays;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Uint8Array.js"(exports, module) {
    var root = require_root();
    var Uint8Array2 = root.Uint8Array;
    module.exports = Uint8Array2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapToArray.js"(exports, module) {
    function mapToArray(map3) {
      var index2 = -1, result = Array(map3.size);
      map3.forEach(function(value, key) {
        result[++index2] = [key, value];
      });
      return result;
    }
    module.exports = mapToArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setToArray.js"(exports, module) {
    function setToArray(set4) {
      var index2 = -1, result = Array(set4.size);
      set4.forEach(function(value) {
        result[++index2] = value;
      });
      return result;
    }
    module.exports = setToArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalByTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var Uint8Array2 = require_Uint8Array();
    var eq = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module.exports = equalByTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayPush.js"(exports, module) {
    function arrayPush(array2, values) {
      var index2 = -1, length = values.length, offset = array2.length;
      while (++index2 < length) {
        array2[offset + index2] = values[index2];
      }
      return array2;
    }
    module.exports = arrayPush;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isArray2 = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayFilter.js"(exports, module) {
    function arrayFilter(array2, predicate) {
      var index2 = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
      while (++index2 < length) {
        var value = array2[index2];
        if (predicate(value, index2, array2)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubArray.js"(exports, module) {
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getSymbols.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getAllKeys.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalObjects.js"(exports, module) {
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index2 = objLength;
      while (index2--) {
        var key = objProps[index2];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index2 < objLength) {
        key = objProps[index2];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    module.exports = equalObjects;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_DataView.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module.exports = DataView;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Promise.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Set.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Set2 = getNative(root, "Set");
    module.exports = Set2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_WeakMap.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap2 = getNative(root, "WeakMap");
    module.exports = WeakMap2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getTag.js"(exports, module) {
    var DataView = require_DataView();
    var Map2 = require_Map();
    var Promise2 = require_Promise();
    var Set2 = require_Set();
    var WeakMap2 = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag = require_getTag();
    var isArray2 = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module.exports = baseIsEqualDeep;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsEqual.js"(exports, module) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module.exports = baseIsEqual;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsMatch.js"(exports, module) {
    var Stack = require_Stack();
    var baseIsEqual = require_baseIsEqual();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseIsMatch(object, source, matchData, customizer) {
      var index2 = matchData.length, length = index2, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index2--) {
        var data = matchData[index2];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index2 < length) {
        data = matchData[index2];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module.exports = baseIsMatch;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isStrictComparable.js"(exports, module) {
    var isObject4 = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject4(value);
    }
    module.exports = isStrictComparable;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMatchData.js"(exports, module) {
    var isStrictComparable = require_isStrictComparable();
    var keys = require_keys();
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module.exports = getMatchData;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module.exports = matchesStrictComparable;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMatches.js"(exports, module) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module.exports = baseMatches;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKey.js"(exports, module) {
    var isArray2 = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray2(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize2(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
        if (cache2.has(key)) {
          return cache2.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache2.set(key, result) || cache2;
        return result;
      };
      memoized.cache = new (memoize2.Cache || MapCache)();
      return memoized;
    }
    memoize2.Cache = MapCache;
    module.exports = memoize2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize2 = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize2(func, function(key) {
        if (cache2.size === MAX_MEMOIZE_SIZE) {
          cache2.clear();
        }
        return key;
      });
      var cache2 = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string2) {
      var result = [];
      if (string2.charCodeAt(0) === 46) {
        result.push("");
      }
      string2.replace(rePropName, function(match2, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array2, iteratee) {
      var index2 = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
      while (++index2 < length) {
        result[index2] = iteratee(array2[index2], index2, array2);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray2 = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray2(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toString.js
var require_toString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_castPath.js"(exports, module) {
    var isArray2 = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray2(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      var index2 = 0, length = path.length;
      while (object != null && index2 < length) {
        object = object[toKey(path[index2++])];
      }
      return index2 && index2 == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/get.js
var require_get = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/get.js"(exports, module) {
    var baseGet = require_baseGet();
    function get(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseHasIn.js"(exports, module) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hasPath.js"(exports, module) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray2 = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      var index2 = -1, length = path.length, result = false;
      while (++index2 < length) {
        var key = toKey(path[index2]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index2 != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray2(object) || isArguments(object));
    }
    module.exports = hasPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/hasIn.js"(exports, module) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    module.exports = hasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    var get = require_get();
    var hasIn = require_hasIn();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var matchesStrictComparable = require_matchesStrictComparable();
    var toKey = require_toKey();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module.exports = baseMatchesProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/identity.js
var require_identity = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/identity.js"(exports, module) {
    function identity2(value) {
      return value;
    }
    module.exports = identity2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseProperty.js"(exports, module) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module.exports = baseProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_basePropertyDeep.js"(exports, module) {
    var baseGet = require_baseGet();
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    module.exports = basePropertyDeep;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/property.js
var require_property = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/property.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    var toKey = require_toKey();
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module.exports = property;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIteratee.js"(exports, module) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var identity2 = require_identity();
    var isArray2 = require_isArray();
    var property = require_property();
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity2;
      }
      if (typeof value == "object") {
        return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    module.exports = baseIteratee;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createAggregator.js
var require_createAggregator = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createAggregator.js"(exports, module) {
    var arrayAggregator = require_arrayAggregator();
    var baseAggregator = require_baseAggregator();
    var baseIteratee = require_baseIteratee();
    var isArray2 = require_isArray();
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
        return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
      };
    }
    module.exports = createAggregator;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/partition.js
var require_partition = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/partition.js"(exports, module) {
    var createAggregator = require_createAggregator();
    var partition3 = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() {
      return [[], []];
    });
    module.exports = partition3;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = (function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    })();
    module.exports = defineProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/keyBy.js
var require_keyBy = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/keyBy.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var createAggregator = require_createAggregator();
    var keyBy2 = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });
    module.exports = keyBy2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/groupBy.js
var require_groupBy = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/groupBy.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var createAggregator = require_createAggregator();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var groupBy3 = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });
    module.exports = groupBy3;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSortedIndexBy.js
var require_baseSortedIndexBy = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSortedIndexBy.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var MAX_ARRAY_LENGTH = 4294967295;
    var MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;
    var nativeFloor = Math.floor;
    var nativeMin = Math.min;
    function baseSortedIndexBy(array2, value, iteratee, retHighest) {
      var low = 0, high = array2 == null ? 0 : array2.length;
      if (high === 0) {
        return 0;
      }
      value = iteratee(value);
      var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === void 0;
      while (low < high) {
        var mid = nativeFloor((low + high) / 2), computed = iteratee(array2[mid]), othIsDefined = computed !== void 0, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
        if (valIsNaN) {
          var setLow = retHighest || othIsReflexive;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = false;
        } else {
          setLow = retHighest ? computed <= value : computed < value;
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }
    module.exports = baseSortedIndexBy;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSortedIndex.js
var require_baseSortedIndex = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSortedIndex.js"(exports, module) {
    var baseSortedIndexBy = require_baseSortedIndexBy();
    var identity2 = require_identity();
    var isSymbol = require_isSymbol();
    var MAX_ARRAY_LENGTH = 4294967295;
    var HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    function baseSortedIndex(array2, value, retHighest) {
      var low = 0, high = array2 == null ? low : array2.length;
      if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = low + high >>> 1, computed = array2[mid];
          if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return baseSortedIndexBy(array2, value, identity2, retHighest);
    }
    module.exports = baseSortedIndex;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/sortedIndex.js
var require_sortedIndex = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/sortedIndex.js"(exports, module) {
    var baseSortedIndex = require_baseSortedIndex();
    function sortedIndex2(array2, value) {
      return baseSortedIndex(array2, value);
    }
    module.exports = sortedIndex2;
  }
});

// ../../node_modules/.pnpm/react@19.3.0/node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "../../node_modules/.pnpm/react@19.3.0/node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
          case REACT_VIEW_TRANSITION_TYPE:
            return "ViewTransition";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          maybeKey,
          getOwner(),
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
        React,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
          var previousStackTraceLimit = Error.stackTraceLimit;
          Error.stackTraceLimit = 10;
          var debugStackDEV = Error("react-stack-top-frame");
          Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          debugStackDEV,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
          var previousStackTraceLimit = Error.stackTraceLimit;
          Error.stackTraceLimit = 10;
          var debugStackDEV = Error("react-stack-top-frame");
          Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          debugStackDEV,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// ../../node_modules/.pnpm/react@19.3.0/node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "../../node_modules/.pnpm/react@19.3.0/node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// ../../node_modules/.pnpm/@sanity+sdk-react@3.3.0_@ty_4486c437e79c4a2290b23584b94bf357/node_modules/@sanity/sdk-react/dist/useStudioWorkspacesByProjectIdDataset-B5A5kBH9.js
var import_react_compiler_runtime = __toESM(require_dist(), 1);

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/setCleanupTimeout-BiM6q1KF.js
function unref(timer2) {
  let t = timer2;
  typeof t == "object" && t && "unref" in t && typeof t.unref == "function" && t.unref();
}
function setCleanupTimeout(fn, delay) {
  let timer2 = setTimeout(fn, delay);
  return unref(timer2), timer2;
}
function setCleanupInterval(fn, delay) {
  let timer2 = setInterval(fn, delay);
  return unref(timer2), timer2;
}

// ../../node_modules/.pnpm/@sanity+id-utils@1.1.0/node_modules/@sanity/id-utils/dist/index.js
var import_ts_brand = __toESM(require_lib());

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v / 4294967296 & 255, v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255);
}
var parse_default = parse;

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/rng.js
var rnds8 = new Uint8Array(16);

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes) {
  const words = uint8ToUint32(bytes);
  const md5Bytes = wordsToMd5(words, bytes.length * 8);
  return uint32ToUint8(md5Bytes);
}
function uint32ToUint8(input) {
  const bytes = new Uint8Array(input.length * 4);
  for (let i = 0; i < input.length * 4; i++) {
    bytes[i] = input[i >> 2] >>> i % 4 * 8 & 255;
  }
  return bytes;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  const xpad = new Uint32Array(getOutputLength(len)).fill(0);
  xpad.set(x);
  xpad[len >> 5] |= 128 << len % 32;
  xpad[xpad.length - 1] = len;
  x = xpad;
  let a = 1732584193;
  let b = -271733879;
  let c4 = -1732584194;
  let d2 = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c4;
    const oldd = d2;
    a = md5ff(a, b, c4, d2, x[i], 7, -680876936);
    d2 = md5ff(d2, a, b, c4, x[i + 1], 12, -389564586);
    c4 = md5ff(c4, d2, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c4, d2, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c4, d2, x[i + 4], 7, -176418897);
    d2 = md5ff(d2, a, b, c4, x[i + 5], 12, 1200080426);
    c4 = md5ff(c4, d2, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c4, d2, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c4, d2, x[i + 8], 7, 1770035416);
    d2 = md5ff(d2, a, b, c4, x[i + 9], 12, -1958414417);
    c4 = md5ff(c4, d2, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c4, d2, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c4, d2, x[i + 12], 7, 1804603682);
    d2 = md5ff(d2, a, b, c4, x[i + 13], 12, -40341101);
    c4 = md5ff(c4, d2, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c4, d2, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c4, d2, x[i + 1], 5, -165796510);
    d2 = md5gg(d2, a, b, c4, x[i + 6], 9, -1069501632);
    c4 = md5gg(c4, d2, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c4, d2, a, x[i], 20, -373897302);
    a = md5gg(a, b, c4, d2, x[i + 5], 5, -701558691);
    d2 = md5gg(d2, a, b, c4, x[i + 10], 9, 38016083);
    c4 = md5gg(c4, d2, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c4, d2, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c4, d2, x[i + 9], 5, 568446438);
    d2 = md5gg(d2, a, b, c4, x[i + 14], 9, -1019803690);
    c4 = md5gg(c4, d2, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c4, d2, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c4, d2, x[i + 13], 5, -1444681467);
    d2 = md5gg(d2, a, b, c4, x[i + 2], 9, -51403784);
    c4 = md5gg(c4, d2, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c4, d2, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c4, d2, x[i + 5], 4, -378558);
    d2 = md5hh(d2, a, b, c4, x[i + 8], 11, -2022574463);
    c4 = md5hh(c4, d2, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c4, d2, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c4, d2, x[i + 1], 4, -1530992060);
    d2 = md5hh(d2, a, b, c4, x[i + 4], 11, 1272893353);
    c4 = md5hh(c4, d2, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c4, d2, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c4, d2, x[i + 13], 4, 681279174);
    d2 = md5hh(d2, a, b, c4, x[i], 11, -358537222);
    c4 = md5hh(c4, d2, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c4, d2, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c4, d2, x[i + 9], 4, -640364487);
    d2 = md5hh(d2, a, b, c4, x[i + 12], 11, -421815835);
    c4 = md5hh(c4, d2, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c4, d2, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c4, d2, x[i], 6, -198630844);
    d2 = md5ii(d2, a, b, c4, x[i + 7], 10, 1126891415);
    c4 = md5ii(c4, d2, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c4, d2, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c4, d2, x[i + 12], 6, 1700485571);
    d2 = md5ii(d2, a, b, c4, x[i + 3], 10, -1894986606);
    c4 = md5ii(c4, d2, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c4, d2, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c4, d2, x[i + 8], 6, 1873313359);
    d2 = md5ii(d2, a, b, c4, x[i + 15], 10, -30611744);
    c4 = md5ii(c4, d2, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c4, d2, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c4, d2, x[i + 4], 6, -145523070);
    d2 = md5ii(d2, a, b, c4, x[i + 11], 10, -1120210379);
    c4 = md5ii(c4, d2, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c4, d2, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c4 = safeAdd(c4, oldc);
    d2 = safeAdd(d2, oldd);
  }
  return Uint32Array.of(a, b, c4, d2);
}
function uint8ToUint32(input) {
  if (input.length === 0) {
    return new Uint32Array();
  }
  const output = new Uint32Array(getOutputLength(input.length * 8)).fill(0);
  for (let i = 0; i < input.length; i++) {
    output[i >> 2] |= (input[i] & 255) << i % 4 * 8;
  }
  return output;
}
function safeAdd(x, y2) {
  const lsw = (x & 65535) + (y2 & 65535);
  const msw = (x >> 16) + (y2 >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c4, d2, x, s, t) {
  return md5cmn(b & c4 | ~b & d2, a, b, x, s, t);
}
function md5gg(a, b, c4, d2, x, s, t) {
  return md5cmn(b & d2 | c4 & ~d2, a, b, x, s, t);
}
function md5hh(a, b, c4, d2, x, s, t) {
  return md5cmn(b ^ c4 ^ d2, a, b, x, s, t);
}
function md5ii(a, b, c4, d2, x, s, t) {
  return md5cmn(c4 ^ (b | ~d2), a, b, x, s, t);
}
var md5_default = md5;

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; ++i) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35(version2, hash, value, namespace, buf, offset) {
  const valueBytes = typeof value === "string" ? stringToBytes(value) : value;
  const namespaceBytes = typeof namespace === "string" ? parse_default(namespace) : namespace;
  if (typeof namespace === "string") {
    namespace = parse_default(namespace);
  }
  if (namespace?.length !== 16) {
    throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
  }
  let bytes = new Uint8Array(16 + valueBytes.length);
  bytes.set(namespaceBytes);
  bytes.set(valueBytes, namespaceBytes.length);
  bytes = hash(bytes);
  bytes[6] = bytes[6] & 15 | version2;
  bytes[8] = bytes[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }
  return unsafeStringify(bytes);
}

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/v3.js
function v3(value, namespace, buf, offset) {
  return v35(48, md5_default, value, namespace, buf, offset);
}
v3.DNS = DNS;
v3.URL = URL2;

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/sha1.js
function f(s, x, y2, z) {
  switch (s) {
    case 0:
      return x & y2 ^ ~x & z;
    case 1:
      return x ^ y2 ^ z;
    case 2:
      return x & y2 ^ x & z ^ y2 & z;
    case 3:
      return x ^ y2 ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  const K = [1518500249, 1859775393, 2400959708, 3395469782];
  const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  const newBytes = new Uint8Array(bytes.length + 1);
  newBytes.set(bytes);
  newBytes[bytes.length] = 128;
  bytes = newBytes;
  const l2 = bytes.length / 4 + 2;
  const N = Math.ceil(l2 / 16);
  const M = new Array(N);
  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);
    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
    M[i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);
    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }
    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }
    let a = H[0];
    let b = H[1];
    let c4 = H[2];
    let d2 = H[3];
    let e = H[4];
    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c4, d2) + e + K[s] + W[t] >>> 0;
      e = d2;
      d2 = c4;
      c4 = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c4 >>> 0;
    H[3] = H[3] + d2 >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
}
var sha1_default = sha1;

// ../../node_modules/.pnpm/uuid@11.1.1/node_modules/uuid/dist/esm-browser/v5.js
function v5(value, namespace, buf, offset) {
  return v35(80, sha1_default, value, namespace, buf, offset);
}
v5.DNS = DNS;
v5.URL = URL2;

// ../../node_modules/.pnpm/@sanity+id-utils@1.1.0/node_modules/@sanity/id-utils/dist/index.js
var VALID_ID = /^[a-z-A-Z0-9._-]+$/;
var DRAFTS_DIR = "drafts";
var VERSION_DIR = "versions";
var VARIANT_DEFINITIONS_DIR = "_.variants";
var PATH_SEPARATOR = ".";
var DRAFTS_PREFIX = `${DRAFTS_DIR}${PATH_SEPARATOR}`;
var VERSION_PREFIX = `${VERSION_DIR}${PATH_SEPARATOR}`;
var VARIANT_DEFINITION_PREFIX = `${VARIANT_DEFINITIONS_DIR}${PATH_SEPARATOR}`;
function error(error2) {
  return { success: false, error: error2 };
}
function success(value) {
  return { success: true, value };
}
function safe(fn) {
  try {
    return success(fn());
  } catch (err) {
    return error(err instanceof Error ? err : new Error(String(err)));
  }
}
function partition2(array2, predicate) {
  const trueValues = [], falseValues = [];
  for (const element of array2)
    predicate(element) ? trueValues.push(element) : falseValues.push(element);
  return [trueValues, falseValues];
}
var DocumentId = (0, import_ts_brand.make)((id2) => {
  validateAnyId(id2);
  const results = [validatePublishedId, validateDraftId, validateVersionId].map(
    (validator) => safe(() => validator(id2))
  ), [successes, errors] = partition2(results, (res) => res.success);
  if (successes.length > 0)
    return id2;
  if (errors.length > 0)
    throw new AggregateError(
      errors.map((res) => res.error),
      `Invalid Document ID
 - ${errors.map((res) => res.error.message).join(`
 - `)}`
    );
  return id2;
});
var DraftId = (0, import_ts_brand.make)((id2) => {
  validateAnyId(id2), validateDraftId(id2);
});
var PublishedId = (0, import_ts_brand.make)((id2) => {
  validateAnyId(id2), validatePublishedId(id2);
});
var VersionId = (0, import_ts_brand.make)((id2) => {
  validateAnyId(id2), validateVersionId(id2);
});
var VariantDefinitionId = (0, import_ts_brand.make)((id2) => {
  validateAnyId(id2), validateVariantDefinitionId(id2);
});
function validateAnyId(id2) {
  if (id2.length === 0)
    throw new Error("Must be a non-empty string");
  if (!VALID_ID.test(id2))
    throw new Error(
      `Not a valid document ID: "${id2}" – Must match the ${VALID_ID} RegExp`
    );
  return id2;
}
function validateDraftId(id2) {
  if (!id2.startsWith(DRAFTS_PREFIX))
    throw new Error(
      `Not a valid draft ID: "${id2}" – must start with "${DRAFTS_PREFIX}"`
    );
  if (id2.length === DRAFTS_PREFIX.length)
    throw new Error(
      `Not a valid draft ID: "${id2}" – must have at least one character followed by "${DRAFTS_PREFIX}"`
    );
  return id2;
}
function validateVersionId(id2) {
  if (!id2.startsWith(VERSION_PREFIX))
    throw new Error(
      `Not a valid version ID: "${id2}" – must start with "${VERSION_PREFIX}"`
    );
  if (id2.length === VERSION_PREFIX.length)
    throw new Error(
      `Not a valid version ID: "${id2}" – must have at least one character followed by "${VERSION_PREFIX}"`
    );
  const [, versionName, ...documentId] = id2.split(".");
  if (!versionName || !VALID_ID.test(versionName))
    throw new Error(
      `Not a valid version ID: "${id2}" – VERSION must match the ${VALID_ID} RegExp in versions.[VERSION].id`
    );
  if (documentId.length === 0)
    throw new Error(
      `Not a valid version ID: "${id2}" – missing document ID in versions.bundle.[ID]`
    );
  if (versionName === "drafts" || versionName === "versions")
    throw new Error(
      `Not a valid version ID: "${id2}" – invalid VERSION "${versionName}" in versions.[VERSION].id`
    );
  return id2;
}
function validateVariantDefinitionId(id2) {
  if (!id2.startsWith(VARIANT_DEFINITION_PREFIX))
    throw new Error(
      `Not a valid variant definition ID: "${id2}" – must start with "${VARIANT_DEFINITION_PREFIX}"`
    );
  if (id2.length === VARIANT_DEFINITION_PREFIX.length)
    throw new Error(
      `Not a valid variant definition ID: "${id2}" – must have at least one character followed by "${VARIANT_DEFINITION_PREFIX}"`
    );
  return id2;
}
function validatePublishedId(id2) {
  if (id2.startsWith(DRAFTS_PREFIX) || id2.startsWith(VERSION_PREFIX))
    throw new Error(
      `Not a valid published ID: "${id2}" – cannot start with "${DRAFTS_PREFIX}" or "${VERSION_PREFIX}"`
    );
  return id2;
}
function isDraftId(id2) {
  return id2.startsWith(DRAFTS_PREFIX);
}
function isPublishedId(id2) {
  return !isDraftId(id2) && !isVersionId(id2);
}
function isVersionId(id2) {
  return id2.startsWith(VERSION_PREFIX);
}
function getPublishedId(id2) {
  if (isDraftId(id2))
    return PublishedId(id2.slice(DRAFTS_PREFIX.length));
  if (isVersionId(id2)) {
    const [, , ...publishedId] = id2.split(PATH_SEPARATOR);
    return PublishedId(publishedId.join(PATH_SEPARATOR));
  }
  return id2;
}
function getDraftId(id2) {
  if (isVersionId(id2)) {
    const [, , ...publishedId] = id2.split(PATH_SEPARATOR);
    return DraftId(DRAFTS_PREFIX + publishedId.join(PATH_SEPARATOR));
  }
  return isPublishedId(id2) ? DraftId(DRAFTS_PREFIX + id2) : id2;
}
function getVersionId(id2, versionName) {
  return isVersionId(id2) || isDraftId(id2) ? getVersionId(getPublishedId(id2), versionName) : VersionId(VERSION_PREFIX + versionName + PATH_SEPARATOR + id2);
}

// ../../node_modules/.pnpm/@sanity+json-match@1.0.5/node_modules/@sanity/json-match/dist/index.js
function createCursor({
  values,
  fallback,
  validator: validate3
}) {
  let position = 0;
  function peek(offset = 0) {
    return values[position + offset] ?? fallback;
  }
  function consume(expected) {
    const current = peek();
    return typeof expected < "u" && validate3(expected, current, position), position++, current;
  }
  function hasNext() {
    return position < values.length;
  }
  return Object.defineProperty(peek, "position", { get: () => position }), Object.assign(peek, { hasNext, consume });
}
function tokenize(expression) {
  return tokenizePathExpression(
    createCursor({
      values: expression,
      fallback: "",
      validator: (expected, value, position) => {
        if (typeof expected == "string" && expected !== value)
          throw new SyntaxError(
            `Expected \`${expected}\` at position ${position}${value ? ` but got \`${value}\` instead` : ""}`
          );
        if (expected instanceof RegExp && !expected.test(value))
          throw new SyntaxError(
            `Expected character \`${value}\` at position ${position} to match ${expected}`
          );
      }
    })
  );
}
function tokenizePathExpression(cursor) {
  const tokens = [];
  for (; cursor.hasNext(); ) {
    const char = cursor(), position = cursor.position;
    if (/\s/.test(char)) {
      cursor.consume();
      continue;
    }
    switch (char) {
      case '"': {
        tokens.push(parseStringLiteral(cursor));
        continue;
      }
      case "'": {
        tokens.push(parseQuotedIdentifier(cursor));
        continue;
      }
      case "[":
      case "]":
      case ",":
      case ":":
      case "?":
      case "*": {
        cursor.consume(), tokens.push({ type: char, position });
        continue;
      }
      case "$":
      case "@": {
        if (/[a-zA-Z_$]/.test(cursor(1))) {
          tokens.push(parseIdentifier(cursor));
          continue;
        }
        cursor.consume(), tokens.push({ type: "This", position });
        continue;
      }
      case ".": {
        if (cursor.consume(), cursor() === ".") {
          cursor.consume(), tokens.push({ type: "..", position });
          continue;
        }
        tokens.push({ type: ".", position });
        continue;
      }
      case "=":
      case "!":
      case ">":
      case "<": {
        tokens.push(parseOperator(cursor));
        continue;
      }
      default: {
        if (/[0-9]/.test(char) || char === "-" && /[0-9]/.test(cursor(1))) {
          tokens.push(parseNumber(cursor));
          continue;
        }
        if (/[a-zA-Z_$]/.test(char)) {
          tokens.push(parseIdentifierOrBoolean(cursor));
          continue;
        }
        throw new Error(`Unexpected character '${char}' at position ${position}`);
      }
    }
  }
  return tokens.push({ type: "EOF", position: cursor.position }), tokens;
}
function parseStringLiteral(cursor) {
  const position = cursor.position;
  let value = "";
  for (cursor.consume('"'); cursor.hasNext() && cursor() !== '"'; )
    cursor() === "\\" ? value += parseEscapeSequence(cursor) : value += cursor.consume();
  return cursor.consume('"'), { type: "String", value, position };
}
function parseQuotedIdentifier(cursor) {
  const position = cursor.position;
  let value = "";
  for (cursor.consume("'"); cursor.hasNext() && cursor() !== "'"; )
    cursor() === "\\" ? value += parseEscapeSequence(cursor) : value += cursor.consume();
  return cursor.consume("'"), { type: "Identifier", value, position };
}
function parseIdentifier(cursor) {
  const position = cursor.position;
  let value = "";
  for (value += cursor.consume(/[a-zA-Z_$]/); /[a-zA-Z0-9_$]/.test(cursor()); )
    value += cursor.consume();
  return { type: "Identifier", value, position };
}
function parseIdentifierOrBoolean(cursor) {
  const position = cursor.position;
  let value = "";
  for (value += cursor.consume(/[a-zA-Z_$]/); /[a-zA-Z0-9_$]/.test(cursor()); )
    value += cursor.consume();
  return value === "null" ? { type: "Null", position } : value === "true" ? { type: "Boolean", value: true, position } : value === "false" ? { type: "Boolean", value: false, position } : { type: "Identifier", value, position };
}
function parseEscapeSequence(cursor) {
  cursor.consume("\\");
  const escaped = cursor.consume();
  switch (escaped) {
    case '"':
    case "'":
    case "\\":
    case "/":
      return escaped;
    case "b":
      return "\b";
    case "f":
      return "\f";
    case "n":
      return `
`;
    case "r":
      return "\r";
    case "t":
      return "	";
    case "u": {
      let unicode = "";
      for (let i = 0; i < 4; i++)
        unicode += cursor.consume(/[0-9a-fA-F]/);
      return String.fromCharCode(parseInt(unicode, 16));
    }
    default:
      throw new Error(`Invalid escape sequence \\${escaped} at position ${cursor.position - 1}`);
  }
}
function parseOperator(cursor) {
  const position = cursor.position, char = cursor(), next = cursor(1);
  if (char === "=" && next === "=")
    return cursor.consume(), cursor.consume(), { type: "Operator", value: "==", position };
  if (char === "!" && next === "=")
    return cursor.consume(), cursor.consume(), { type: "Operator", value: "!=", position };
  if (char === ">" && next === "=")
    return cursor.consume(), cursor.consume(), { type: "Operator", value: ">=", position };
  if (char === "<" && next === "=")
    return cursor.consume(), cursor.consume(), { type: "Operator", value: "<=", position };
  if (char === ">")
    return cursor.consume(), { type: "Operator", value: ">", position };
  if (char === "<")
    return cursor.consume(), { type: "Operator", value: "<", position };
  throw new SyntaxError(`Invalid operator at position ${position}`);
}
function parseNumber(cursor) {
  const position = cursor.position;
  let value = "";
  for (cursor() === "-" && (value += cursor.consume()); /[0-9]/.test(cursor()); )
    value += cursor.consume();
  if (cursor() === "." && /[0-9]/.test(cursor(1)))
    for (value += cursor.consume(); /[0-9]/.test(cursor()); )
      value += cursor.consume();
  return { type: "Number", value: parseFloat(value), position };
}
var UnexpectedTokenError = class extends SyntaxError {
  constructor(token, expected) {
    super(
      expected ? `Expected ${expected} at position ${token.position} but got ${token.type} instead` : `Unexpected token ${token.type} at position ${token.position}`
    );
  }
};
function parse2(query2) {
  const tokens = tokenize(query2);
  if (tokens.length <= 1) throw new SyntaxError("Empty expression");
  const eof = tokens.at(-1);
  if (eof.type !== "EOF")
    throw new UnexpectedTokenError(eof);
  const cursor = createCursor({
    values: tokens,
    fallback: eof,
    validator: (expectedTokenType, token) => {
      if (token.type !== expectedTokenType)
        throw new UnexpectedTokenError(token, expectedTokenType);
    }
  }), ast = parseExpression(cursor);
  return cursor.consume("EOF"), ast;
}
function parseExpression(cursor) {
  switch (cursor().type) {
    // Path openers
    case "This":
    case "Identifier":
    case "*":
    case "[":
    case ".":
    case "..":
      return parsePath$1(cursor);
    case "String": {
      const { value } = cursor.consume("String");
      return { type: "String", value };
    }
    case "Number": {
      const { value } = cursor.consume("Number");
      return { type: "Number", value };
    }
    case "Boolean": {
      const { value } = cursor.consume("Boolean");
      return { type: "Boolean", value };
    }
    case "Null":
      return cursor.consume("Null"), { type: "Null" };
    default:
      throw new UnexpectedTokenError(cursor());
  }
}
function parsePath$1(cursor) {
  let result;
  if (cursor().type === "." || cursor().type === "..") {
    const recursive = cursor().type === "..";
    if (cursor.consume(), cursor().type === "EOF" || cursor().type === "]" || cursor().type === ",")
      if (recursive)
        result = {
          type: "Path",
          base: {
            type: "Path",
            segment: { type: "This" }
          },
          recursive,
          segment: { type: "Wildcard" }
        };
      else
        throw new UnexpectedTokenError(cursor(), "Path Segment");
    else {
      const segment = parsePathSegment(cursor);
      result = {
        type: "Path",
        base: {
          type: "Path",
          segment: { type: "This" }
        },
        recursive,
        segment
      };
    }
  } else
    result = { type: "Path", segment: parsePathSegment(cursor) };
  for (; ; ) {
    if (cursor().type === "[") {
      const subscript = parseSubscript(cursor);
      result = {
        type: "Path",
        base: result,
        recursive: false,
        segment: subscript
      };
      continue;
    }
    if (cursor().type === "." || cursor().type === "..") {
      const recursive = cursor().type === "..";
      cursor.consume();
      const segment = parsePathSegment(cursor);
      result = {
        type: "Path",
        base: result,
        recursive,
        segment
      };
      continue;
    }
    break;
  }
  return result;
}
function parsePathSegment(cursor) {
  const next = cursor();
  if (next.type === "This")
    return cursor.consume(), { type: "This" };
  if (next.type === "Identifier")
    return cursor.consume(), { type: "Identifier", name: next.value };
  if (next.type === "*")
    return cursor.consume(), { type: "Wildcard" };
  if (next.type === "[")
    return parseSubscript(cursor);
  throw new UnexpectedTokenError(next, "Path Segment");
}
function parseSubscript(cursor) {
  const elements = [];
  for (cursor.consume("["), elements.push(parseSubscriptElement(cursor)); cursor().type === ","; )
    cursor.consume(), elements.push(parseSubscriptElement(cursor));
  return cursor.consume("]"), { type: "Subscript", elements };
}
function parseSubscriptElement(cursor) {
  if (cursor().type === ":" || cursor().type === "Number")
    return parseIndexOrSlice(cursor);
  const nestedExpression = parseExpression(cursor);
  if (cursor().type === "Operator") {
    const { value: operator } = cursor.consume("Operator");
    return {
      type: "Comparison",
      left: nestedExpression,
      operator,
      right: parseExpression(cursor)
    };
  }
  return cursor().type === "?" && nestedExpression.type === "Path" ? (cursor.consume(), {
    type: "Existence",
    base: nestedExpression
  }) : nestedExpression;
}
function parseIndexOrSlice(cursor) {
  if (cursor().type === "Number") {
    const { value: start } = cursor.consume("Number");
    if (cursor().type === ":") {
      if (cursor.consume(), cursor().type === "Number") {
        const { value: end } = cursor.consume("Number");
        return { type: "Slice", start, end };
      }
      return { type: "Slice", start };
    }
    return { type: "Number", value: start };
  }
  if (cursor().type === ":") {
    if (cursor.consume(), cursor().type === "Number") {
      const { value: end } = cursor.consume("Number");
      return { type: "Slice", end };
    }
    return { type: "Path", segment: { type: "Wildcard" } };
  }
  throw new UnexpectedTokenError(cursor(), "Number or Slice");
}
function stringifyExpression(node) {
  switch (node.type) {
    case "String":
    case "Number":
    case "Boolean":
      return JSON.stringify(node.value);
    case "Path":
      return stringifyPath$1(node);
    case "Null":
      return "null";
    default:
      throw new Error(
        `Unknown node type: ${// @ts-expect-error should be `never` type
        node.type}`
      );
  }
}
function stringifyPath$1(node) {
  if (!node) return "";
  const base = stringifyPath$1(node.base), segment = stringifySegment(node.segment);
  return node.recursive ? `${base}..${segment}` : base ? segment.startsWith("[") ? `${base}${segment}` : `${base}.${segment}` : segment;
}
function stringifySegment(segment) {
  switch (segment.type) {
    case "This":
      return "@";
    case "Wildcard":
      return "*";
    case "Subscript":
      return `[${segment.elements.map(stringifySubscriptElement).join(",")}]`;
    case "Identifier":
      return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(segment.name) ? segment.name : escapeIdentifier(segment.name);
    default:
      throw new Error(`Unknown segment type: ${segment.type}`);
  }
}
function escapeIdentifier(value) {
  return `'${JSON.stringify(value).slice(1, -1).replace(/'/g, "\\'").replace(/\\"/g, '"')}'`;
}
function stringifySubscriptElement(node) {
  switch (node.type) {
    case "Slice":
      return `${node.start ?? ""}:${node.end ?? ""}`;
    case "Comparison":
      return `${stringifyExpression(node.left)}${node.operator}${stringifyExpression(node.right)}`;
    case "Existence":
      return `${stringifyPath$1(node.base)}?`;
    case "String":
    case "Number":
    case "Boolean":
    case "Null":
    case "Path":
      return stringifyExpression(node);
    default:
      throw new Error(
        `Unknown subscript element type: ${// @ts-expect-error this should be a `never` type
        node.type}`
      );
  }
}
var KEY_PREFIX = "key:";
var FIELD_PREFIX = "field:";
var INDEX_PREFIX = "index:";
function createPathSet() {
  const root = /* @__PURE__ */ new Map();
  function getKey(segment) {
    return isKeyedObject2(segment) ? `${KEY_PREFIX}${segment._key}` : typeof segment == "string" ? `${FIELD_PREFIX}${segment}` : `${INDEX_PREFIX}${segment}`;
  }
  function add(map3, [head, ...tail]) {
    if (typeof head > "u") return;
    const key = getKey(head);
    if (!tail.length) {
      map3.set(key, true);
      return;
    }
    const cached = map3.get(key);
    if (typeof cached < "u") {
      if (cached === true) return;
      add(cached, tail);
      return;
    }
    const next = /* @__PURE__ */ new Map();
    map3.set(key, next), add(next, tail);
  }
  function has(map3, [head, ...tail]) {
    if (typeof head > "u") return false;
    const key = getKey(head), cached = map3.get(key);
    return typeof cached > "u" ? false : tail.length ? cached === true ? false : has(cached, tail) : cached === true;
  }
  return {
    add: (path) => add(root, path),
    has: (path) => has(root, path)
  };
}
var INDEX_CACHE = /* @__PURE__ */ new WeakMap();
function isRecord(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
function isKeyedObject2(value) {
  return isRecord(value) && typeof value._key == "string";
}
function stringifyPath(path) {
  return path ? typeof path == "string" ? path : Array.isArray(path) ? stringifyPath(parsePath(path)) : stringifyExpression(path) : "";
}
function getIndexForKey(input, key) {
  if (!Array.isArray(input)) return;
  const cached = INDEX_CACHE.get(input);
  if (cached) return cached[key];
  const lookup = input.reduce((acc, next, index2) => (typeof next?._key == "string" && (acc[next._key] = index2), acc), {});
  return INDEX_CACHE.set(input, lookup), lookup[key];
}
function parsePath(path) {
  if (Array.isArray(path)) {
    let result;
    for (const segment of path)
      result = {
        type: "Path",
        base: result,
        recursive: false,
        segment: convertArraySegmentToSegmentNode(segment)
      };
    return result;
  }
  return typeof path == "string" ? parse2(path) : path;
}
function convertArraySegmentToSegmentNode(segment) {
  if (Array.isArray(segment)) {
    const [start, end] = segment;
    return { type: "Subscript", elements: [start === "" && end === "" ? { type: "Path", segment: { type: "Wildcard" } } : { type: "Slice", ...start !== "" && { start }, ...end !== "" && { end } }] };
  }
  if (typeof segment == "string")
    return { type: "Identifier", name: segment };
  if (typeof segment == "number")
    return {
      type: "Subscript",
      elements: [{ type: "Number", value: segment }]
    };
  if (isKeyedObject2(segment))
    return {
      type: "Subscript",
      elements: [{
        type: "Comparison",
        left: { type: "Path", segment: { type: "Identifier", name: "_key" } },
        operator: "==",
        right: { type: "String", value: segment._key }
      }]
    };
  throw new Error(`Unsupported segment type: ${typeof segment}`);
}
function getPathDepth(path) {
  if (!path) return 0;
  if (Array.isArray(path)) return path.length;
  if (typeof path == "string") return getPathDepth(parsePath(path));
  if (path.type !== "Path") return 0;
  const segmentDepth = path.segment.type === "Subscript" || path.segment.type === "Wildcard" || path.segment.type === "Identifier" ? 1 : 0;
  return getPathDepth(path.base) + segmentDepth;
}
function* drop(values, count) {
  let index2 = 0;
  for (const value of values)
    index2 >= count && (yield value), index2++;
}
function* getSegments(node) {
  node.base && (yield* getSegments(node.base)), node.segment.type !== "This" && (yield node);
}
function slicePath(path, start, end) {
  if (!path) return "";
  if (typeof path == "string" || Array.isArray(path)) return slicePath(parsePath(path), start, end);
  if (path.type !== "Path") return "";
  const depth = getPathDepth(path);
  if (typeof start > "u" && (start = 0), start < 0 && (start = start + depth), typeof end > "u" && (end = depth), end < 0 && (end = end + depth), start = Math.max(0, Math.min(start, depth)), end = Math.max(0, Math.min(end, depth)), start >= end) return "";
  if (end < depth) return slicePath(path.base, start, end);
  let base;
  for (const segment of drop(getSegments(path), start))
    base = { ...segment, base };
  return stringifyPath(base);
}
function joinPaths(base, path) {
  if (!base) return stringifyPath(path);
  if (Array.isArray(base) || typeof base == "string") return joinPaths(parsePath(base), path);
  if (base.type !== "Path") return stringifyPath(path);
  if (!path) return stringifyPath(base);
  if (Array.isArray(path) || typeof path == "string") return joinPaths(base, parsePath(path));
  if (path.type !== "Path") return stringifyPath(base);
  for (const segment of getSegments(path))
    base = { ...segment, base };
  return stringifyPath(base);
}
var LITERAL_PATH = [];
function* jsonMatch(value, expr, basePath = []) {
  const visited = createPathSet();
  for (const entry of evaluateExpression({ expr: parsePath(expr), value, path: basePath })) {
    const { path } = entry;
    path !== LITERAL_PATH && (visited.has(path) || (visited.add(path), yield entry));
  }
}
var itemEntry = (item, path, index2) => ({
  value: item,
  path: [...path, isKeyedObject2(item) ? { _key: item._key } : index2]
});
function* evaluateExpression({
  expr,
  value,
  path
}) {
  if (expr)
    switch (expr.type) {
      case "String":
      case "Number":
      case "Boolean": {
        yield { value: expr.value, path: LITERAL_PATH };
        return;
      }
      case "Null": {
        yield { value: null, path: LITERAL_PATH };
        return;
      }
      case "Path": {
        yield* evaluatePath({ expr, value, path });
        return;
      }
      default:
        return;
    }
}
function* evaluatePath({
  expr,
  value,
  path
}) {
  if (!expr) {
    yield { value, path };
    return;
  }
  for (const candidate of evaluatePath({ expr: expr.base, value, path })) {
    if (expr.recursive) {
      yield* evaluateRecursivePath({ segment: expr.segment, ...candidate });
      continue;
    }
    yield* evaluateSegment({ segment: expr.segment, ...candidate });
  }
}
function* evaluateRecursivePath({
  segment,
  value,
  path
}) {
  if (yield* evaluateSegment({ segment, value, path }), Array.isArray(value)) {
    for (let index2 = 0; index2 < value.length; index2++) {
      const item = value[index2];
      yield* evaluateRecursivePath({ segment, ...itemEntry(item, path, index2) });
    }
    return;
  }
  if (isRecord(value)) {
    for (const [key, nestedValue] of Object.entries(value))
      yield* evaluateRecursivePath({ segment, value: nestedValue, path: [...path, key] });
    return;
  }
}
function* evaluateSegment({
  segment,
  value,
  path
}) {
  switch (segment.type) {
    case "This": {
      yield { value, path };
      return;
    }
    case "Identifier": {
      if (Array.isArray(value)) {
        for (let index2 = 0; index2 < value.length; index2++) {
          const item = value[index2];
          yield* evaluateSegment({ segment, ...itemEntry(item, path, index2) });
        }
        return;
      }
      yield {
        value: isRecord(value) ? value[segment.name] : void 0,
        path: [...path, segment.name]
      };
      return;
    }
    case "Subscript": {
      yield* evaluateSubscript({ subscript: segment, value, path });
      return;
    }
    case "Wildcard": {
      if (Array.isArray(value)) {
        for (let index2 = 0; index2 < value.length; index2++) {
          const item = value[index2];
          yield itemEntry(item, path, index2);
        }
        return;
      }
      if (isRecord(value)) {
        for (const [key, nestedValue] of Object.entries(value))
          yield { value: nestedValue, path: [...path, key] };
        return;
      }
      return;
    }
    default:
      return;
  }
}
function* evaluateSubscript({
  value,
  subscript,
  path
}) {
  for (const element of subscript.elements)
    switch (element.type) {
      case "Existence": {
        yield* evaluateExistence({ existence: element, value, path });
        continue;
      }
      case "Comparison": {
        yield* evaluateComparison({ comparison: element, value, path });
        continue;
      }
      case "Path": {
        yield* evaluatePath({ expr: element, value, path });
        continue;
      }
      case "Slice": {
        if (!Array.isArray(value)) continue;
        let start = element.start ?? 0, end = element.end ?? value.length;
        start < 0 && (start = value.length + start), end < 0 && (end = value.length + end), start = Math.max(0, Math.min(start, value.length)), end = Math.max(0, Math.min(end, value.length));
        for (let index2 = start; index2 < end; index2++) {
          const item = value[index2];
          yield itemEntry(item, path, index2);
        }
        continue;
      }
      // handle number nodes in subscripts as array indices
      case "Number": {
        const item = Array.isArray(value) ? value.at(element.value) : void 0;
        yield itemEntry(item, path, element.value);
        continue;
      }
      // strings and booleans are always evaluated as literals
      case "String":
      case "Boolean": {
        yield* evaluateExpression({ expr: element, value, path });
        continue;
      }
      default:
        continue;
    }
}
function* evaluateExistence({
  existence,
  value,
  path
}) {
  if (Array.isArray(value)) {
    for (let index2 = 0; index2 < value.length; index2++) {
      const item = value[index2];
      yield* evaluateExistence({ existence, ...itemEntry(item, path, index2) });
    }
    return;
  }
  for (const candidate of evaluatePath({ expr: existence.base, path, value }))
    if (typeof candidate.value < "u") {
      yield { value, path };
      return;
    }
}
function getKeyFromComparison({ operator, left, right }) {
  if (operator !== "==") return;
  const keyPathNode = [left, right].find(isKeyPath);
  if (!keyPathNode) return;
  const other = left === keyPathNode ? right : left;
  if (other.type === "String")
    return other.value;
}
var isKeyPath = (node) => node.type !== "Path" || node.base || node.recursive || node.segment.type !== "Identifier" ? false : node.segment.name === "_key";
function* removeUndefinedMatches(values) {
  for (const item of values)
    typeof item.value < "u" && (yield item);
}
function* evaluateComparison({
  comparison,
  value,
  path
}) {
  if (Array.isArray(value)) {
    const _key = getKeyFromComparison(comparison);
    if (_key) {
      const index2 = getIndexForKey(value, _key);
      yield {
        value: typeof index2 == "number" ? value[index2] : void 0,
        path: [...path, { _key }]
      };
      return;
    }
    for (let index2 = 0; index2 < value.length; index2++) {
      const item = value[index2];
      yield* evaluateComparison({ comparison, ...itemEntry(item, path, index2) });
    }
    return;
  }
  const leftResult = removeUndefinedMatches(
    evaluateExpression({ expr: comparison.left, value, path })
  ).next(), rightResult = removeUndefinedMatches(
    evaluateExpression({ expr: comparison.right, value, path })
  ).next();
  if (leftResult.done || rightResult.done) return;
  const { value: left } = leftResult.value, { value: right } = rightResult.value;
  if (comparison.operator === "==") {
    left === right && (yield { value, path });
    return;
  }
  if (comparison.operator === "!=") {
    left !== right && (yield { value, path });
    return;
  }
  typeof left != "number" || typeof right != "number" || (comparison.operator === "<" && left < right && (yield { value, path }), comparison.operator === "<=" && left <= right && (yield { value, path }), comparison.operator === ">" && left > right && (yield { value, path }), comparison.operator === ">=" && left >= right && (yield { value, path }));
}

// ../../node_modules/.pnpm/reselect@5.3.0/node_modules/reselect/dist/reselect.mjs
var CACHE_SIZE_CHECK_THRESHOLD = 1e3;
var runCacheSizeCheck = (cacheSize, funcName) => {
  let stack = void 0;
  try {
    throw new Error();
  } catch (e) {
    ;
    ({ stack } = e);
  }
  console.warn(
    `A function memoized with weakMapMemoize${funcName ? ` (\`${funcName}\`)` : ""} has seen over ${cacheSize} distinct values for the same primitive argument position.
Results keyed by primitive arguments are held strongly and are only released by \`clearCache()\`, so this cache will keep growing for as long as the function keeps seeing new values.
If it is called with ever-changing primitives (ids, offsets, timestamps), pass the \`maxSize\` option to bound the cache, switch to \`lruMemoize\`, or call \`.clearCache()\` at a suitable point.
See https://reselect.js.org/api/development-only-checks#cachesizecheck for details.`,
    { stack }
  );
};
var globalDevModeChecks = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once",
  cacheSizeCheck: "once"
};
var StrongRef = class {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value;
  }
};
var getWeakRef = () => typeof WeakRef === "undefined" ? StrongRef : WeakRef;
var Ref = getWeakRef();
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
  return {
    s: UNTERMINATED,
    v: void 0,
    o: null,
    p: null
  };
}
function maybeDeref(r) {
  if (r instanceof Ref) {
    return r.deref();
  }
  return r;
}
function weakMapMemoize(func, options = {}) {
  let fnNode = createCacheNode();
  const { resultEqualityCheck, maxSize } = options;
  const useGenerations = maxSize !== void 0;
  if (useGenerations && (!Number.isInteger(maxSize) || maxSize < 1)) {
    throw new TypeError(
      `maxSize must be a positive integer, received: ${maxSize}`
    );
  }
  let prevNode = null;
  let insertionCount = 0;
  let lastResult;
  let resultsCount = 0;
  let hasWarnedAboutCacheSize = false;
  function maybeFlipGenerations() {
    if (insertionCount >= maxSize) {
      prevNode = fnNode;
      fnNode = createCacheNode();
      insertionCount = 0;
    }
  }
  function memoized() {
    let cacheNode = fnNode;
    const { length } = arguments;
    for (let i = 0, l2 = length; i < l2; i++) {
      const arg = arguments[i];
      if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
        let objectCache = cacheNode.o;
        if (objectCache === null) {
          cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
        }
        const objectNode = objectCache.get(arg);
        if (objectNode === void 0) {
          cacheNode = createCacheNode();
          objectCache.set(arg, cacheNode);
        } else {
          cacheNode = objectNode;
        }
      } else {
        let primitiveCache = cacheNode.p;
        if (primitiveCache === null) {
          cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
        }
        const primitiveNode = primitiveCache.get(arg);
        if (primitiveNode === void 0) {
          cacheNode = createCacheNode();
          primitiveCache.set(arg, cacheNode);
          insertionCount++;
          if (true) {
            if (primitiveCache.size > CACHE_SIZE_CHECK_THRESHOLD) {
              const { cacheSizeCheck } = globalDevModeChecks;
              if (cacheSizeCheck === "always" || cacheSizeCheck === "once" && !hasWarnedAboutCacheSize) {
                hasWarnedAboutCacheSize = true;
                runCacheSizeCheck(primitiveCache.size, func.name);
              }
            }
          }
        } else {
          cacheNode = primitiveNode;
        }
      }
    }
    if (cacheNode.s === TERMINATED) {
      return cacheNode.v;
    }
    if (prevNode !== null) {
      let prevCacheNode = prevNode;
      for (let i = 0, l2 = length; i < l2; i++) {
        const arg = arguments[i];
        let next;
        if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
          const prevObjectCache = prevCacheNode.o;
          next = prevObjectCache !== null ? prevObjectCache.get(arg) : void 0;
        } else {
          const prevPrimitiveCache = prevCacheNode.p;
          next = prevPrimitiveCache !== null ? prevPrimitiveCache.get(arg) : void 0;
        }
        if (next === void 0) {
          prevCacheNode = null;
          break;
        }
        prevCacheNode = next;
      }
      if (prevCacheNode !== null && prevCacheNode.s === TERMINATED) {
        const promotedNode = cacheNode;
        promotedNode.s = TERMINATED;
        promotedNode.v = prevCacheNode.v;
        maybeFlipGenerations();
        return prevCacheNode.v;
      }
    }
    const terminatedNode = cacheNode;
    let result = func.apply(null, arguments);
    resultsCount++;
    if (resultEqualityCheck) {
      const lastResultValue = maybeDeref(lastResult);
      if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
        result = lastResultValue;
        resultsCount !== 0 && resultsCount--;
      }
      const needsWeakRef = typeof result === "object" && result !== null || typeof result === "function";
      lastResult = needsWeakRef ? new Ref(result) : result;
    }
    terminatedNode.s = TERMINATED;
    terminatedNode.v = result;
    if (useGenerations) {
      maybeFlipGenerations();
    }
    return result;
  }
  memoized.clearCache = () => {
    fnNode = createCacheNode();
    prevNode = null;
    insertionCount = 0;
    memoized.resetResultsCount();
    if (true) {
      hasWarnedAboutCacheSize = false;
    }
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}
var runIdentityFunctionCheck = (resultFunc, inputSelectorsResults, outputSelectorResult) => {
  if (inputSelectorsResults.length === 1 && inputSelectorsResults[0] === outputSelectorResult) {
    let isInputSameAsOutput = false;
    try {
      const emptyObject = {};
      if (resultFunc(emptyObject) === emptyObject) isInputSameAsOutput = true;
    } catch {
    }
    if (isInputSameAsOutput) {
      let stack = void 0;
      try {
        throw new Error();
      } catch (e) {
        ;
        ({ stack } = e);
      }
      console.warn(
        "The result function returned its own inputs without modification. e.g\n`createSelector([state => state.todos], todos => todos)`\nThis could lead to inefficient memoization and unnecessary re-renders.\nEnsure transformation logic is in the result function, and extraction logic is in the input selectors.",
        { stack }
      );
    }
  }
};
var withoutResultEqualityCheck = (option) => {
  if (option === null || typeof option !== "object" || !("resultEqualityCheck" in option)) {
    return option;
  }
  const optionCopy = { ...option };
  delete optionCopy.resultEqualityCheck;
  return optionCopy;
};
var runInputStabilityCheck = (inputSelectorResultsObject, options, inputSelectorArgs) => {
  const { memoize: memoize2, memoizeOptions } = options;
  const { inputSelectorResults, inputSelectorResultsCopy } = inputSelectorResultsObject;
  const probeMemoizeOptions = [];
  const { length } = memoizeOptions;
  for (let i = 0; i < length; i++) {
    probeMemoizeOptions.push(withoutResultEqualityCheck(memoizeOptions[i]));
  }
  const createAnEmptyObject = memoize2(() => ({}), ...probeMemoizeOptions);
  const areInputSelectorResultsEqual = createAnEmptyObject.apply(null, inputSelectorResults) === createAnEmptyObject.apply(null, inputSelectorResultsCopy);
  if (!areInputSelectorResultsEqual) {
    let stack = void 0;
    try {
      throw new Error();
    } catch (e) {
      ;
      ({ stack } = e);
    }
    console.warn(
      "An input selector returned a different result when passed same arguments.\nThis means your output selector will likely run more frequently than intended.\nAvoid returning a new reference inside your input selector, e.g.\n`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)`",
      {
        arguments: inputSelectorArgs,
        firstInputs: inputSelectorResults,
        secondInputs: inputSelectorResultsCopy,
        stack
      }
    );
  }
};
var NOT_FOUND = Symbol("NOT_FOUND");
function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
  if (typeof func !== "function") {
    throw new TypeError(errorMessage);
  }
}
function assertIsObject(object, errorMessage = `expected an object, instead received ${typeof object}`) {
  if (typeof object !== "object") {
    throw new TypeError(errorMessage);
  }
}
function assertIsArrayOfFunctions(array2, errorMessage = `expected all items to be functions, instead received the following types: `) {
  if (!array2.every((item) => typeof item === "function")) {
    const itemTypes = array2.map(
      (item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item
    ).join(", ");
    throw new TypeError(`${errorMessage}[${itemTypes}]`);
  }
}
var ensureIsArray = (item) => {
  return Array.isArray(item) ? item : [item];
};
function getDependencies(createSelectorArgs) {
  const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
  assertIsArrayOfFunctions(
    dependencies,
    `createSelector expects all input-selectors to be functions, but received the following types: `
  );
  return dependencies;
}
function collectInputSelectorResults(dependencies, inputSelectorArgs) {
  const inputSelectorResults = [];
  const { length } = dependencies;
  for (let i = 0; i < length; i++) {
    inputSelectorResults.push(dependencies[i].apply(null, inputSelectorArgs));
  }
  return inputSelectorResults;
}
function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
  const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
    memoize: memoizeOrOptions,
    memoizeOptions: memoizeOptionsFromArgs
  } : memoizeOrOptions;
  const createSelector2 = (...createSelectorArgs) => {
    let recomputations = 0;
    let dependencyRecomputations = 0;
    let lastResult;
    let directlyPassedOptions = {};
    let resultFunc = createSelectorArgs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = createSelectorArgs.pop();
    }
    assertIsFunction(
      resultFunc,
      `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
    );
    const combinedOptions = {
      ...createSelectorCreatorOptions,
      ...directlyPassedOptions
    };
    const {
      memoize: memoize2,
      memoizeOptions = [],
      argsMemoize = weakMapMemoize,
      argsMemoizeOptions = []
    } = combinedOptions;
    const finalMemoizeOptions = ensureIsArray(memoizeOptions);
    const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
    const dependencies = getDependencies(createSelectorArgs);
    const memoizedResultFunc = memoize2(function recomputationWrapper() {
      recomputations++;
      return resultFunc.apply(
        null,
        arguments
      );
    }, ...finalMemoizeOptions);
    let firstRun = true;
    const selector = argsMemoize(function dependenciesChecker() {
      dependencyRecomputations++;
      const { length } = dependencies;
      const inputSelectorResults = new Array(length);
      for (let i = 0; i < length; i++) {
        inputSelectorResults[i] = dependencies[i].apply(null, arguments);
      }
      lastResult = memoizedResultFunc.apply(null, inputSelectorResults);
      if (true) {
        const { devModeChecks } = combinedOptions;
        const identityFunctionCheck = devModeChecks !== void 0 && Object.prototype.hasOwnProperty.call(
          devModeChecks,
          "identityFunctionCheck"
        ) ? devModeChecks.identityFunctionCheck : globalDevModeChecks.identityFunctionCheck;
        const inputStabilityCheck = devModeChecks !== void 0 && Object.prototype.hasOwnProperty.call(
          devModeChecks,
          "inputStabilityCheck"
        ) ? devModeChecks.inputStabilityCheck : globalDevModeChecks.inputStabilityCheck;
        if (identityFunctionCheck === "always" || identityFunctionCheck === "once" && firstRun) {
          runIdentityFunctionCheck(
            resultFunc,
            inputSelectorResults,
            lastResult
          );
        }
        if (inputStabilityCheck === "always" || inputStabilityCheck === "once" && firstRun) {
          const inputSelectorResultsCopy = collectInputSelectorResults(
            dependencies,
            arguments
          );
          runInputStabilityCheck(
            { inputSelectorResults, inputSelectorResultsCopy },
            { memoize: memoize2, memoizeOptions: finalMemoizeOptions },
            arguments
          );
        }
        if (firstRun) firstRun = false;
      }
      return lastResult;
    }, ...finalArgsMemoizeOptions);
    return Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      dependencyRecomputations: () => dependencyRecomputations,
      resetDependencyRecomputations: () => {
        dependencyRecomputations = 0;
      },
      lastResult: () => lastResult,
      recomputations: () => recomputations,
      resetRecomputations: () => {
        recomputations = 0;
      },
      memoize: memoize2,
      argsMemoize
    });
  };
  Object.assign(createSelector2, {
    withTypes: () => createSelector2
  });
  return createSelector2;
}
var createSelector = createSelectorCreator(weakMapMemoize);
var createStructuredSelector = Object.assign(
  (inputSelectorsObject, selectorCreator = createSelector) => {
    assertIsObject(
      inputSelectorsObject,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof inputSelectorsObject}`
    );
    const inputSelectorKeys = Object.keys(inputSelectorsObject);
    const dependencies = inputSelectorKeys.map(
      (key) => inputSelectorsObject[key]
    );
    const structuredSelector = selectorCreator(
      dependencies,
      (...inputSelectorResults) => {
        return inputSelectorResults.reduce((composition, value, index2) => {
          composition[inputSelectorKeys[index2]] = value;
          return composition;
        }, {});
      }
    );
    return structuredSelector;
  },
  { withTypes: () => createStructuredSelector }
);

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/version-CD4aBigm.js
function randomId(length = 8) {
  let id2 = "";
  for (; id2.length < length; ) {
    let bytes = crypto.getRandomValues(new Uint8Array(length - id2.length));
    for (let byte of bytes) {
      let index2 = byte & 63;
      index2 < 62 && (id2 += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(index2));
    }
  }
  return id2;
}
function randomUuid() {
  if (typeof crypto.randomUUID == "function") return crypto.randomUUID();
  let bytes = crypto.getRandomValues(new Uint8Array(16)), hex = Array.from(bytes, (byte, index2) => (index2 === 6 && (byte = byte & 15 | 64), index2 === 8 && (byte = byte & 63 | 128), byte.toString(16).padStart(2, "0"))).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
var definitions = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
var gcTimers = /* @__PURE__ */ new Map();
var intervalTimers = /* @__PURE__ */ new Map();
var snapshotCache = /* @__PURE__ */ new WeakMap();
var PENDING_SNAPSHOT = {
  status: "pending",
  data: void 0,
  error: void 0,
  isFetching: false,
  dataUpdatedAt: void 0
};
var entryKey = (fetcherName, rawKey) => `${fetcherName}:${rawKey}`;
var computeTags = (def, data, params) => typeof def.tags == "function" ? def.tags(data, ...params) : def.tags ?? [];
var isUpdaterFn = (updater) => typeof updater == "function";
var applyUpdater = (updater, current) => isUpdaterFn(updater) ? updater(current) : updater;
var needsFetch = (entry, def) => entry.isFetching ? false : entry.status !== "success" || entry.forcedStale || Date.now() - (entry.dataUpdatedAt ?? 0) >= (def.staleTime ?? 3e4);
var asTyped = (entry) => entry;
var toSnapshot = (entry) => {
  if (!entry) return PENDING_SNAPSHOT;
  let cached = snapshotCache.get(entry);
  if (cached) return cached;
  let snapshot;
  return snapshot = entry.status === "success" ? {
    status: "success",
    data: entry.data,
    error: entry.error,
    isFetching: entry.isFetching,
    dataUpdatedAt: entry.dataUpdatedAt
  } : entry.status === "error" ? {
    status: "error",
    data: void 0,
    error: entry.error,
    isFetching: entry.isFetching,
    dataUpdatedAt: void 0
  } : {
    status: "pending",
    data: void 0,
    error: void 0,
    isFetching: entry.isFetching,
    dataUpdatedAt: void 0
  }, snapshotCache.set(entry, snapshot), snapshot;
};
var cacheStore = defineStore({
  name: "FetcherCache",
  getInitialState: () => ({ entries: {} }),
  initialize: () => () => {
    for (let timer2 of gcTimers.values()) clearTimeout(timer2);
    for (let timer2 of intervalTimers.values()) clearInterval(timer2);
    for (let fetch of inflight.values()) fetch.sub.unsubscribe();
    gcTimers.clear(), intervalTimers.clear(), inflight.clear();
  }
});
var updateEntry = (state, key, actionName, updater) => {
  state.set(actionName, (prev) => {
    let next = updater(prev.entries[key]);
    if (next === prev.entries[key]) return prev;
    let entries = { ...prev.entries };
    return next === void 0 ? delete entries[key] : entries[key] = next, { entries };
  });
};
var baseEntry = (def, key, instance, params) => {
  let seeded = def.initialData?.(instance, ...params);
  return seeded ? {
    fetcherName: def.name,
    key,
    params,
    instance,
    status: "success",
    data: seeded.data,
    error: void 0,
    dataUpdatedAt: seeded.dataUpdatedAt,
    isFetching: false,
    version: 0,
    forcedStale: false,
    tags: computeTags(def, seeded.data, params),
    subscriptions: 0
  } : {
    fetcherName: def.name,
    key,
    params,
    instance,
    status: "pending",
    data: void 0,
    error: void 0,
    dataUpdatedAt: void 0,
    isFetching: false,
    version: 0,
    forcedStale: false,
    tags: [],
    subscriptions: 0
  };
};
var startFetch = (state, def, instance, params, force) => {
  let key = entryKey(def.name, def.getKey(instance, ...params)), existing = inflight.get(key);
  if (existing && !force) return existing.promise;
  existing && (existing.sub.unsubscribe(), inflight.delete(key)), updateEntry(state, key, "fetchStart", (prev) => ({
    ...prev ?? baseEntry(def, key, instance, params),
    isFetching: true
  }));
  let startVersion = state.get().entries[key]?.version ?? 0, resolve, reject, promise = new Promise((res, rej) => {
    resolve = res, reject = rej;
  });
  existing && promise.then(existing.resolve, existing.reject);
  let sub = new Subscription();
  return inflight.set(key, {
    sub,
    promise,
    resolve,
    reject,
    startVersion
  }), sub.add(def.fetch(instance)(...params).pipe(take(1)).subscribe({
    next: (data) => {
      let current = state.get().entries[key];
      if (current && current.version !== startVersion) {
        inflight.delete(key), current.isFetching && updateEntry(state, key, "fetchDiscard", (prev) => prev && {
          ...prev,
          isFetching: false
        }), resolve(current.data), sub.unsubscribe();
        return;
      }
      updateEntry(state, key, "fetchSuccess", (prev) => ({
        ...prev ?? baseEntry(def, key, instance, params),
        status: "success",
        data,
        error: void 0,
        dataUpdatedAt: Date.now(),
        isFetching: false,
        forcedStale: false,
        tags: computeTags(def, data, params)
      })), resolve(data);
    },
    error: (error2) => {
      updateEntry(state, key, "fetchError", (prev) => prev && (prev.status === "success" ? {
        ...prev,
        error: error2,
        isFetching: false
      } : {
        ...prev,
        status: "error",
        error: error2,
        isFetching: false
      })), inflight.delete(key), reject(error2);
    },
    complete: () => {
      inflight.delete(key), state.get().entries[key]?.isFetching && updateEntry(state, key, "fetchSettle", (prev) => prev && {
        ...prev,
        isFetching: false
      });
    }
  })), promise;
};
var detach = (promise) => {
  promise.catch(() => {
  });
};
var markStale = (state, key) => updateEntry(state, key, "markStale", (prev) => prev && {
  ...prev,
  forcedStale: true
});
var startInterval = (state, def, instance, params, key) => {
  if (!def.refetchInterval || intervalTimers.has(key)) return;
  let timer2 = setCleanupInterval(() => {
    if (typeof document < "u" && document.hidden) return;
    let entry = state.get().entries[key];
    entry && entry.subscriptions > 0 && detach(startFetch(state, def, instance, params, true));
  }, def.refetchInterval);
  intervalTimers.set(key, timer2);
};
var scheduleGc = (state, def, key) => {
  if (gcTimers.has(key)) return;
  let entry = state.get().entries[key];
  if (!entry || entry.subscriptions > 0) return;
  let timer2 = setCleanupTimeout(() => {
    gcTimers.delete(key);
    let fetch = inflight.get(key);
    fetch && (fetch.sub.unsubscribe(), inflight.delete(key)), updateEntry(state, key, "gc", () => void 0);
  }, def.gcTime ?? 3e5);
  gcTimers.set(key, timer2);
};
var invalidateByTags = bindActionGlobally(cacheStore, ({ state }, targets) => {
  let refetches = [];
  for (let [key, entry] of Object.entries(state.get().entries)) {
    if (!entry.tags.some((tag) => targets.some((target) => tag.type === target.type && (target.id === void 0 || tag.id === target.id))) || (markStale(state, key), entry.subscriptions <= 0)) continue;
    let def = definitions.get(entry.fetcherName);
    def && refetches.push(startFetch(state, def, entry.instance, entry.params, true).catch(() => void 0));
  }
  return Promise.all(refetches).then(() => void 0);
});
function defineFetcher(definition) {
  let def = definition;
  definitions.set(definition.name, def);
  let getState = bindActionGlobally(cacheStore, createStateSourceAction({
    selector: ({ state, instance }, ...params) => {
      let key = entryKey(def.name, def.getKey(instance, ...params)), entry = state.entries[key];
      return toSnapshot(entry && asTyped(entry));
    },
    onSubscribe: ({ state, instance }, ...params) => {
      let key = entryKey(def.name, def.getKey(instance, ...params)), pendingGc = gcTimers.get(key);
      return pendingGc && (clearTimeout(pendingGc), gcTimers.delete(key)), updateEntry(state, key, "subscribe", (prev) => ({
        ...prev ?? baseEntry(def, key, instance, params),
        instance,
        subscriptions: (prev?.subscriptions ?? 0) + 1
      })), startInterval(state, def, instance, params, key), queueMicrotask(() => {
        let entry = state.get().entries[key];
        entry && entry.subscriptions > 0 && needsFetch(entry, def) && detach(startFetch(state, def, instance, params, false));
      }), () => {
        updateEntry(state, key, "unsubscribe", (prev) => prev && {
          ...prev,
          subscriptions: Math.max(0, prev.subscriptions - 1)
        });
        let entry = state.get().entries[key];
        if (!entry || entry.subscriptions > 0) return;
        let interval = intervalTimers.get(key);
        interval && (clearInterval(interval), intervalTimers.delete(key)), scheduleGc(state, def, key);
      };
    }
  })), resolveState = (instance, ...params) => firstValueFrom(getState(instance, ...params).observable.pipe(filter((snapshot) => snapshot.status !== "pending"), map((snapshot) => {
    if (snapshot.status === "error") throw snapshot.error;
    return snapshot.data;
  })));
  return {
    getState,
    resolveState,
    invalidate: bindActionGlobally(cacheStore, ({ state, instance }, ...params) => {
      let key = entryKey(def.name, def.getKey(instance, ...params));
      markStale(state, key);
      let entry = state.get().entries[key];
      entry && entry.subscriptions > 0 && detach(startFetch(state, def, instance, params, true));
    }),
    invalidateAll: bindActionGlobally(cacheStore, ({ state }) => {
      let prefix = `${def.name}:`;
      for (let [key, entry] of Object.entries(state.get().entries)) key.startsWith(prefix) && (markStale(state, key), entry.subscriptions > 0 && detach(startFetch(state, def, entry.instance, entry.params, true)));
    }),
    refetch: bindActionGlobally(cacheStore, ({ state, instance }, ...params) => {
      let key = entryKey(def.name, def.getKey(instance, ...params)), promise = startFetch(state, def, instance, params, true);
      return scheduleGc(state, def, key), promise;
    }),
    setData: bindActionGlobally(cacheStore, ({ state, instance }, params, updater) => {
      let key = entryKey(def.name, def.getKey(instance, ...params)), previous;
      return updateEntry(state, key, "setData", (prev) => {
        previous = prev;
        let from2 = asTyped(prev ?? baseEntry(def, key, instance, params)), nextData = applyUpdater(updater, from2.data);
        return {
          ...from2,
          status: "success",
          data: nextData,
          dataUpdatedAt: from2.dataUpdatedAt ?? Date.now(),
          version: from2.version + 1,
          tags: computeTags(def, nextData, params)
        };
      }), scheduleGc(state, def, key), { undo: () => updateEntry(state, key, "undoSetData", () => previous) };
    })
  };
}
function defineMutation(definition) {
  return (instance, input) => {
    let undos = [], write = (fetcher, params, updater) => {
      undos.push(fetcher.setData(instance, params, updater).undo);
    };
    return definition.onMutate?.(write, input), firstValueFrom(definition.mutationFn(instance)(input)).then((result) => {
      definition.onSuccess?.(write, result, input);
      let targets = typeof definition.invalidates == "function" ? definition.invalidates(result, input) : definition.invalidates ?? [];
      return {
        data: result,
        invalidated: targets.length ? invalidateByTags(instance, targets) : Promise.resolve()
      };
    }, (error2) => {
      for (let i = undos.length - 1; i >= 0; i--) undos[i]();
      throw error2;
    });
  };
}
var COMMENTS_API_VERSION = "v2025-05-06";
var ADDON_DATASET_API_VERSION = "v2025-02-19";
var COMMENTS_STATE_CLEAR_DELAY = 5e3;
var LISTEN_OPTIONS = {
  events: [
    "welcome",
    "mutation",
    "reconnect"
  ],
  includeResult: true,
  includeAllVersions: true,
  visibility: "query",
  tag: "comments.listen"
};
var BASE_FILTERS = ['_type == "comment"', "target.document._ref == $documentId"];
function buildCommentsFilter(documentVersionId) {
  return [...BASE_FILTERS, documentVersionId ? "target.documentVersionId == $documentVersionId" : "!defined(target.documentVersionId)"].join(" && ");
}
function buildCommentsQuery(documentVersionId) {
  return `*[${buildCommentsFilter(documentVersionId)}] {
  _createdAt,
  _id,
  _rev,
  authorId,
  contentSnapshot,
  context,
  lastEditedAt,
  message,
  parentCommentId,
  reactions,
  status,
  target,
  threadId
} | order(_createdAt desc)`;
}
function buildCommentsListenQuery(documentVersionId) {
  return `*[${buildCommentsFilter(documentVersionId)}]`;
}
function assertDatasetResource(resource) {
  if (!isDatasetResource(resource)) throw Error(`Comments are only supported for dataset resources, received: ${JSON.stringify(resource)}`);
  return resource;
}
function isMissingOrForbidden(error2) {
  if (typeof error2 != "object" || !error2 || !("statusCode" in error2)) return false;
  let { statusCode } = error2;
  return statusCode === 403 || statusCode === 404;
}
function requestAddonDataset(client, { projectId, dataset }) {
  return client.observable.request({
    url: `/projects/${projectId}/datasets?datasetProfile=comments&addonFor=${dataset}`,
    tag: "comments.addon-dataset.list"
  }).pipe(map((datasets2) => datasets2?.[0]?.name));
}
function discover(instance, resource) {
  return getClientState(instance, {
    apiVersion: ADDON_DATASET_API_VERSION,
    projectId: resource.projectId,
    useProjectHostname: true
  }).observable.pipe(switchMap((client) => requestAddonDataset(client, resource).pipe(catchError((error2) => isMissingOrForbidden(error2) ? of(void 0) : EMPTY))));
}
async function discoverOnce(instance, resource) {
  let client = await firstValueFrom(getClientState(instance, {
    apiVersion: ADDON_DATASET_API_VERSION,
    projectId: resource.projectId,
    useProjectHostname: true
  }).observable.pipe(take(1)));
  try {
    return await firstValueFrom(requestAddonDataset(client, resource));
  } catch (error2) {
    if (isMissingOrForbidden(error2)) return;
    throw error2;
  }
}
var addonDatasetStore = defineStore({
  name: "CommentsAddonDataset",
  getInitialState: () => ({ status: "unknown" }),
  initialize: ({ instance, state, key }) => {
    let subscription = discover(instance, assertDatasetResource(key.resource)).subscribe((datasetName) => state.set("setAddonDataset", datasetName ? {
      status: "resolved",
      datasetName
    } : { status: "missing" }));
    return () => subscription.unsubscribe();
  }
});
var getAddonDatasetState = bindActionByResource(addonDatasetStore, createStateSourceAction(({ state }) => {
  if (state.status !== "unknown") return state.datasetName ?? null;
}));
var provisionAddonDataset = bindActionByResource(addonDatasetStore, ({ instance, state, key }) => {
  let current = state.get();
  if (current.datasetName) return Promise.resolve(current.datasetName);
  if (current.provisioning) return current.provisioning;
  let resource = assertDatasetResource(key.resource), provisioning = (async () => {
    let existing = await discoverOnce(instance, resource);
    if (existing) return existing;
    let response = await getClient(instance, {
      apiVersion: ADDON_DATASET_API_VERSION,
      projectId: resource.projectId,
      useProjectHostname: true
    }).request({
      url: `/comments/${resource.dataset}/setup`,
      method: "POST",
      tag: "comments.addon-dataset.setup"
    });
    if (!response?.datasetName) throw Error("Creating the comments addon dataset returned no dataset name.");
    return response.datasetName;
  })().then((datasetName) => (state.set("setAddonDataset", {
    status: "resolved",
    datasetName,
    provisioning: void 0
  }), datasetName)).catch((error2) => {
    throw state.set("clearProvisioning", { provisioning: void 0 }), error2;
  });
  return state.set("startProvisioning", { provisioning }), provisioning;
});
var observeAddonDatasetClient = bindActionByResource(addonDatasetStore, ({ instance, key }) => {
  let { projectId } = assertDatasetResource(key.resource);
  return getAddonDatasetState(instance, { resource: key.resource }).observable.pipe(distinctUntilChanged(), filter((datasetName) => datasetName !== void 0), switchMap((datasetName) => typeof datasetName == "string" ? getClientState(instance, {
    apiVersion: COMMENTS_API_VERSION,
    projectId,
    dataset: datasetName
  }).observable : of(null)));
});
var RESERVED_SEGMENT = /\.(true|false|null)(?=$|[.[])/g;
var QUOTED_OR_PLAIN = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[^"']+/g;
function quoteReservedFieldSegments(path) {
  return path.replace(QUOTED_OR_PLAIN, (chunk) => chunk.startsWith('"') || chunk.startsWith("'") ? chunk : chunk.replace(RESERVED_SEGMENT, '["$1"]'));
}
function toCommentFieldPath(path) {
  return quoteReservedFieldSegments(stringifyPath(path));
}
function buildCommentThreads(comments) {
  let repliesByParent = /* @__PURE__ */ new Map();
  for (let comment of comments) {
    if (!comment.parentCommentId) continue;
    let existing = repliesByParent.get(comment.parentCommentId);
    existing ? existing.push(comment) : repliesByParent.set(comment.parentCommentId, [comment]);
  }
  let threads = [];
  for (let parentComment of comments) {
    if (parentComment.parentCommentId) continue;
    let replies = (repliesByParent.get(parentComment.id) ?? []).sort((a, b) => a.createdAt.localeCompare(b.createdAt)), lastReply = replies[replies.length - 1];
    threads.push({
      threadId: parentComment.threadId,
      fieldPath: parentComment.fieldPath,
      parentComment,
      replies,
      commentsCount: replies.length + 1,
      status: parentComment.status,
      lastActivityAt: lastReply ? lastReply.createdAt : parentComment.createdAt
    });
  }
  return threads;
}
function normalizeComment(stored) {
  let { target } = stored;
  return {
    id: stored._id,
    createdAt: stored._createdAt,
    ...stored.authorId ? { authorId: stored.authorId } : {},
    message: stored.message,
    threadId: stored.threadId,
    ...stored.parentCommentId ? { parentCommentId: stored.parentCommentId } : {},
    status: stored.status,
    ...stored.lastEditedAt ? { lastEditedAt: stored.lastEditedAt } : {},
    documentId: target.document._ref,
    documentType: target.documentType,
    fieldPath: target.path?.field ?? "",
    ...target.path?.selection ? { selection: target.path.selection } : {},
    ...stored.contentSnapshot === void 0 ? {} : { contentSnapshot: stored.contentSnapshot },
    reactions: (stored.reactions ?? []).map(({ shortName, userId, addedAt }) => ({
      shortName,
      userId,
      addedAt
    })),
    ...stored._state ? { state: stored._state } : {}
  };
}
function toCommentsEvent(event) {
  if (event.type === "mutation") {
    if (event.transition === "disappear") return {
      type: "disappear",
      commentId: event.documentId
    };
    if (event.result) return event.transition === "appear" ? {
      type: "appear",
      comment: event.result
    } : {
      type: "update",
      comment: event.result,
      transactionId: event.transactionId
    };
  }
}
function observeComments(options) {
  let { client, documentId, documentVersionId } = options, params = {
    documentId,
    ...documentVersionId ? { documentVersionId } : {}
  }, events$ = client.observable.listen(buildCommentsListenQuery(documentVersionId), params, LISTEN_OPTIONS).pipe(share()), mutations$ = events$.pipe(map(toCommentsEvent), filter((event) => event !== void 0));
  return events$.pipe(filter((event) => event.type === "welcome"), switchMap(() => new Observable((observer) => {
    let buffered = [], snapshotReceived = false, mutationSubscription = mutations$.subscribe({
      next: (event) => {
        snapshotReceived ? observer.next(event) : buffered.push(event);
      },
      error: (error2) => observer.error(error2)
    }), snapshotSubscription = client.observable.fetch(buildCommentsQuery(documentVersionId), params, { tag: "comments.list" }).pipe(take(1)).subscribe({
      next: (comments) => {
        observer.next({
          type: "snapshot",
          comments
        }), snapshotReceived = true;
        for (let event of buffered) observer.next(event);
        buffered.length = 0;
      },
      error: (error2) => {
        observer.next({
          type: "error",
          error: error2
        }), observer.complete();
      }
    });
    return () => {
      mutationSubscription.unsubscribe(), snapshotSubscription.unsubscribe(), buffered.length = 0;
    };
  })));
}
function getCommentsKey({ documentId, documentVersionId }) {
  return JSON.stringify([documentId, documentVersionId ?? null]);
}
function parseCommentsKey(key) {
  let [documentId, documentVersionId] = JSON.parse(key);
  return {
    documentId,
    ...documentVersionId ? { documentVersionId } : {}
  };
}
var addSubscriber$1 = (key, subscriptionId) => (prev) => {
  let entry = prev.entries[key], subscribers = [...entry?.subscribers ?? [], subscriptionId];
  return {
    ...prev,
    entries: {
      ...prev.entries,
      [key]: {
        ...entry,
        subscribers
      }
    }
  };
};
var removeSubscriber$1 = (key, subscriptionId) => (prev) => {
  let entry = prev.entries[key];
  if (!entry) return prev;
  let subscribers = entry.subscribers.filter((id2) => id2 !== subscriptionId);
  if (!subscribers.length) {
    let pendingCreates = { ...prev.pendingCreates }, pendingTransactions = { ...prev.pendingTransactions };
    for (let commentId of Object.keys(entry.comments ?? {})) delete pendingCreates[commentId], delete pendingTransactions[commentId];
    return {
      ...prev,
      entries: omitProperty(prev.entries, key),
      pendingCreates,
      pendingTransactions
    };
  }
  return {
    ...prev,
    entries: {
      ...prev.entries,
      [key]: {
        ...entry,
        subscribers
      }
    }
  };
};
var setComments = (key, comments) => (prev) => {
  let entry = prev.entries[key];
  if (!entry) return prev;
  let byId = Object.fromEntries(comments.map((comment) => [comment._id, comment])), pendingCreates = { ...prev.pendingCreates };
  for (let [commentId, localComment] of Object.entries(entry.comments ?? {})) Object.hasOwn(byId, commentId) ? delete pendingCreates[commentId] : (Object.hasOwn(pendingCreates, commentId) || localComment._state) && (byId[commentId] = localComment);
  return {
    ...prev,
    entries: {
      ...prev.entries,
      [key]: {
        ...entry,
        comments: byId,
        error: void 0
      }
    },
    pendingCreates
  };
};
var setCommentsError = (key, error2) => (prev) => {
  let entry = prev.entries[key];
  return entry ? {
    ...prev,
    entries: {
      ...prev.entries,
      [key]: {
        ...entry,
        error: error2
      }
    }
  } : prev;
};
var receiveComment = (key, comment) => (prev) => {
  let entry = prev.entries[key], pendingCreates = omitProperty(prev.pendingCreates, comment._id);
  return entry ? {
    ...prev,
    pendingCreates,
    entries: {
      ...prev.entries,
      [key]: {
        ...entry,
        comments: {
          ...entry.comments,
          [comment._id]: comment
        }
      }
    }
  } : {
    ...prev,
    pendingCreates
  };
};
function isRetryingCreate(existing) {
  let state = existing?._state?.type;
  return state === "createError" || state === "createRetrying";
}
function mergeOptimisticComment(existing, comment) {
  return {
    ...existing,
    ...comment,
    _createdAt: comment._createdAt ?? existing?._createdAt ?? (/* @__PURE__ */ new Date()).toISOString(),
    _rev: comment._rev ?? existing?._rev ?? "",
    ...isRetryingCreate(existing) ? { _state: { type: "createRetrying" } } : {}
  };
}
var addComment = (key, comment) => (prev) => {
  let entry = prev.entries[key];
  if (!entry) return prev;
  let existing = entry.comments && Object.hasOwn(entry.comments, comment._id) ? entry.comments[comment._id] : void 0;
  return {
    ...prev,
    pendingCreates: {
      ...prev.pendingCreates,
      [comment._id]: true
    },
    entries: {
      ...prev.entries,
      [key]: {
        ...entry,
        comments: {
          ...entry.comments,
          [comment._id]: mergeOptimisticComment(existing, comment)
        }
      }
    }
  };
};
var applyCommentUpdate = (commentId, patch) => (prev) => {
  let entries = { ...prev.entries }, changed = false;
  for (let [key, entry] of Object.entries(prev.entries)) {
    let comment = entry?.comments?.[commentId];
    entry && comment && (changed = true, entries[key] = {
      ...entry,
      comments: {
        ...entry.comments,
        [commentId]: {
          ...comment,
          ...patch
        }
      }
    });
  }
  return changed ? {
    ...prev,
    entries
  } : prev;
};
var removeCommentById = (commentId) => (prev) => {
  let entries = { ...prev.entries }, removedIds = /* @__PURE__ */ new Set(), changed = false;
  for (let [key, entry] of Object.entries(prev.entries)) {
    if (!entry?.comments) continue;
    let remaining = Object.fromEntries(Object.entries(entry.comments).filter(([id2, comment]) => {
      let keep = id2 !== commentId && comment.parentCommentId !== commentId;
      return keep || removedIds.add(id2), keep;
    }));
    Object.keys(remaining).length !== Object.keys(entry.comments).length && (changed = true, entries[key] = {
      ...entry,
      comments: remaining
    });
  }
  if (!changed) return prev;
  let pendingCreates = { ...prev.pendingCreates }, pendingTransactions = { ...prev.pendingTransactions };
  for (let id2 of removedIds) delete pendingCreates[id2], delete pendingTransactions[id2];
  return {
    ...prev,
    entries,
    pendingCreates,
    pendingTransactions
  };
};
var setPendingTransaction = (commentId, transactionId) => (prev) => ({
  ...prev,
  pendingTransactions: {
    ...prev.pendingTransactions,
    [commentId]: transactionId
  }
});
var clearPendingTransaction = (commentId) => (prev) => ({
  ...prev,
  pendingTransactions: omitProperty(prev.pendingTransactions, commentId)
});
var setCommentCreateError = (commentId, error2) => (prev) => {
  if (!Object.hasOwn(prev.pendingCreates, commentId)) return prev;
  let next = applyCommentUpdate(commentId, { _state: {
    type: "createError",
    error: error2
  } })(prev);
  return {
    ...next,
    pendingCreates: omitProperty(next.pendingCreates, commentId)
  };
};
var rollbackCommentUpdate = (commentId, transactionId, previous) => (prev) => {
  if (!Object.hasOwn(prev.pendingTransactions, commentId) || prev.pendingTransactions[commentId] !== transactionId) return prev;
  let entries = Object.fromEntries(Object.entries(prev.entries).map(([key, entry]) => entry?.comments?.[commentId] ? [key, {
    ...entry,
    comments: {
      ...entry.comments,
      [commentId]: previous
    }
  }] : [key, entry]));
  return {
    ...prev,
    entries,
    pendingTransactions: omitProperty(prev.pendingTransactions, commentId)
  };
};
var restoreComments = (removed) => (prev) => {
  let entries = { ...prev.entries }, changed = false;
  for (let { key, comments } of removed) {
    let entry = entries[key];
    if (!entry) continue;
    let missing = comments.filter((comment) => !Object.hasOwn(entry.comments ?? {}, comment._id));
    missing.length && (changed = true, entries[key] = {
      ...entry,
      comments: Object.fromEntries([...Object.entries(entry.comments ?? {}), ...missing.map((comment) => [comment._id, comment])])
    });
  }
  return changed ? {
    ...prev,
    entries
  } : prev;
};
function getCommentsOptionsKey(options) {
  return JSON.stringify({
    documentId: options.documentId,
    documentType: options.documentType,
    projectId: options.projectId,
    dataset: options.dataset,
    resource: options.resource,
    perspective: options.perspective,
    fieldPath: options.fieldPath === void 0 ? void 0 : toCommentFieldPath(options.fieldPath),
    status: options.status
  });
}
function parseCommentsOptionsKey(key) {
  return JSON.parse(key);
}
function toCommentsKeyParts(instance, options) {
  let perspective = options.perspective ?? instance.config.perspective;
  return {
    documentId: getPublishedId(DocumentId(options.documentId)),
    ...isReleasePerspective(perspective) ? { documentVersionId: perspective.releaseName } : {}
  };
}
function applyEvent(state, key, event) {
  switch (event.type) {
    case "snapshot":
      state.set("setComments", setComments(key, event.comments));
      return;
    case "appear":
      state.set("receiveComment", receiveComment(key, event.comment));
      return;
    case "disappear":
      state.set("removeComment", removeCommentById(event.commentId));
      return;
    case "error":
      state.set("setCommentsError", setCommentsError(key, event.error));
      return;
    case "update": {
      let pending = state.get().pendingTransactions[event.comment._id];
      if (pending && pending !== event.transactionId) return;
      state.set("receiveComment", receiveComment(key, event.comment)), pending && state.set("clearPendingTransaction", clearPendingTransaction(event.comment._id));
    }
  }
}
var watchSubscribedDocuments = ({ state, instance, key }) => {
  let client$ = observeAddonDatasetClient(instance, { resource: key.resource });
  return state.observable.pipe(map((current) => new Set(Object.keys(current.entries))), distinctUntilChanged((a, b) => a.size === b.size && Array.from(b).every((entry) => a.has(entry))), startWith(/* @__PURE__ */ new Set()), pairwise(), mergeMap(([previous, current]) => [...Array.from(current).filter((entry) => !previous.has(entry)).map((entry) => ({
    key: entry,
    added: true
  })), ...Array.from(previous).filter((entry) => !current.has(entry)).map((entry) => ({
    key: entry,
    added: false
  }))]), groupBy((event) => event.key), mergeMap((group$) => group$.pipe(switchMap((event) => {
    if (!event.added) return EMPTY;
    let { documentId, documentVersionId } = parseCommentsKey(group$.key);
    return client$.pipe(switchMap((client) => client ? observeComments({
      client,
      documentId,
      documentVersionId
    }).pipe(tap((commentsEvent) => applyEvent(state, group$.key, commentsEvent)), catchError((error2) => (state.set("setCommentsError", setCommentsError(group$.key, error2)), EMPTY))) : (state.set("setComments", setComments(group$.key, [])), EMPTY)));
  })))).subscribe({ error: (error2) => state.set("setError", { error: error2 }) });
};
var commentsStore = defineStore({
  name: "Comments",
  getInitialState: () => ({
    entries: {},
    pendingCreates: {},
    pendingTransactions: {}
  }),
  initialize: (context) => {
    let subscription = watchSubscribedDocuments(context);
    return () => subscription.unsubscribe();
  }
});
var normalizedCache = /* @__PURE__ */ new WeakMap();
var filteredCache = /* @__PURE__ */ new WeakMap();
var threadCache = /* @__PURE__ */ new WeakMap();
function normalizeAll(commentsById) {
  let cached = normalizedCache.get(commentsById);
  if (cached) return cached;
  let normalized = Object.values(commentsById).map(normalizeComment).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return normalizedCache.set(commentsById, normalized), normalized;
}
function filterComments(all, fieldPath, status) {
  let byFilter = filteredCache.get(all);
  byFilter || (byFilter = /* @__PURE__ */ new Map(), filteredCache.set(all, byFilter));
  let cacheKey = `${fieldPath ?? "\0"}|${status ?? ""}`, cached = byFilter.get(cacheKey);
  if (cached) return cached;
  let filtered = all.filter((comment) => status && comment.status !== status ? false : fieldPath === void 0 || comment.fieldPath === fieldPath);
  return byFilter.set(cacheKey, filtered), filtered;
}
function selectComments({ state, instance }, options) {
  if (state.error) throw state.error;
  let entry = state.entries[getCommentsKey(toCommentsKeyParts(instance, options))];
  if (entry?.error) throw entry.error;
  if (entry?.comments) return filterComments(normalizeAll(entry.comments), options.fieldPath === void 0 ? void 0 : toCommentFieldPath(options.fieldPath), options.status);
}
function selectCommentThreads(context, options) {
  let comments = selectComments(context, {
    ...options,
    fieldPath: void 0,
    status: void 0
  });
  if (comments === void 0) return;
  let byFilter = threadCache.get(comments);
  byFilter || (byFilter = /* @__PURE__ */ new Map(), threadCache.set(comments, byFilter));
  let fieldPath = options.fieldPath === void 0 ? void 0 : toCommentFieldPath(options.fieldPath), cacheKey = `${fieldPath ?? "\0"}|${options.status ?? ""}`, cached = byFilter.get(cacheKey);
  if (cached) return cached;
  let threads = buildCommentThreads(comments).filter((thread) => options.status && thread.parentComment.status !== options.status ? false : fieldPath === void 0 || thread.fieldPath === fieldPath);
  return byFilter.set(cacheKey, threads), threads;
}
var getCommentsState = bindActionByResource(commentsStore, createStateSourceAction({
  selector: selectComments,
  onSubscribe: ({ state, instance }, options) => {
    let key = getCommentsKey(toCommentsKeyParts(instance, options)), subscriptionId = randomId(16);
    return state.set("addSubscriber", addSubscriber$1(key, subscriptionId)), () => {
      setCleanupTimeout(() => state.set("removeSubscriber", removeSubscriber$1(key, subscriptionId)), COMMENTS_STATE_CLEAR_DELAY);
    };
  }
}));
var getCommentThreadsState = bindActionByResource(commentsStore, createStateSourceAction({
  selector: selectCommentThreads,
  onSubscribe: ({ state, instance }, options) => {
    let key = getCommentsKey(toCommentsKeyParts(instance, options)), subscriptionId = randomId(16);
    return state.set("addSubscriber", addSubscriber$1(key, subscriptionId)), () => {
      setCleanupTimeout(() => state.set("removeSubscriber", removeSubscriber$1(key, subscriptionId)), COMMENTS_STATE_CLEAR_DELAY);
    };
  }
}));
var resolveComments = bindActionByResource(commentsStore, ({ state, instance }, { signal, ...options }) => resolveList(state, instance, options, signal, getCommentsState));
var resolveCommentThreads = bindActionByResource(commentsStore, ({ state, instance }, { signal, ...options }) => resolveList(state, instance, options, signal, getCommentThreadsState));
function resolveList(state, instance, options, signal, getState) {
  let key = getCommentsKey(toCommentsKeyParts(instance, options)), { getCurrent } = getState(instance, options), subscriptionId = randomId(16);
  state.set("addSubscriber", addSubscriber$1(key, subscriptionId));
  let release = () => state.set("removeSubscriber", removeSubscriber$1(key, subscriptionId)), aborted$ = signal ? new Observable((observer) => {
    let listener = () => {
      release(), observer.error(new DOMException("The operation was aborted.", "AbortError"));
    };
    return signal.addEventListener("abort", listener), () => signal.removeEventListener("abort", listener);
  }) : NEVER, resolved$ = state.observable.pipe(map(() => getCurrent()), first((value) => value !== void 0)), promise = firstValueFrom(race([resolved$, aborted$])), releaseLater = () => setCleanupTimeout(release, COMMENTS_STATE_CLEAR_DELAY);
  return promise.then(releaseLater, releaseLater), promise;
}
var PROJECT_API_VERSION = "2025-07-18";
var USERS_STATE_CLEAR_DELAY = 5e3;
var getUsersKey = (instance, { resourceType, organizationId, batchSize = 100, projectId = instance.config.projectId, userId } = {}) => JSON.stringify({
  resourceType,
  organizationId,
  batchSize,
  projectId,
  userId
});
var parseUsersKey = (key) => JSON.parse(key);
var addSubscription = (subscriptionId, key) => (prev) => {
  let group = prev.users[key], subscriptions = [...group?.subscriptions ?? [], subscriptionId];
  return {
    ...prev,
    users: {
      ...prev.users,
      [key]: {
        ...group,
        subscriptions
      }
    }
  };
};
var removeSubscription = (subscriptionId, key) => (prev) => {
  let group = prev.users[key];
  if (!group) return prev;
  let subscriptions = group.subscriptions.filter((id2) => id2 !== subscriptionId);
  return subscriptions.length ? {
    ...prev,
    users: {
      ...prev.users,
      [key]: {
        ...group,
        subscriptions
      }
    }
  } : {
    ...prev,
    users: omitProperty(prev.users, key)
  };
};
var setUsersData = (key, { data, nextCursor, totalCount }) => (prev) => {
  let group = prev.users[key];
  if (!group) return prev;
  let users = [...group.users ?? [], ...data];
  return {
    ...prev,
    users: {
      ...prev.users,
      [key]: {
        ...group,
        users,
        totalCount,
        nextCursor
      }
    }
  };
};
var updateLastLoadMoreRequest = (timestamp, key) => (prev) => {
  let group = prev.users[key];
  return group ? {
    ...prev,
    users: {
      ...prev.users,
      [key]: {
        ...group,
        lastLoadMoreRequest: timestamp
      }
    }
  } : prev;
};
var setUsersError = (key, error2) => (prev) => {
  let group = prev.users[key];
  return group ? {
    ...prev,
    users: {
      ...prev.users,
      [key]: {
        ...group,
        error: error2
      }
    }
  } : prev;
};
var cancelRequest = (key) => (prev) => {
  let group = prev.users[key];
  return !group || group.subscriptions.length ? prev : {
    ...prev,
    users: omitProperty(prev.users, key)
  };
};
var initializeRequest = (key) => (prev) => prev.users[key] ? prev : {
  ...prev,
  users: {
    ...prev.users,
    [key]: { subscriptions: [] }
  }
};
function observeLiveEvents(instance, { resource, onCorsError }) {
  return getClientState(instance, {
    apiVersion: "v2025-05-06",
    resource
  }).observable.pipe(switchMap((client) => defer(() => client.live.events({
    includeDrafts: !!client.config().token,
    tag: "live-events"
  })).pipe(catchError((error2) => {
    if (error2 instanceof CorsOriginError) return onCorsError(error2), EMPTY;
    if (error2 instanceof DisconnectError || error2 instanceof ConnectionFailedError && typeof error2.status == "number" && error2.status >= 400 && error2.status < 500) return EMPTY;
    throw error2;
  }), retry({ delay: 1e3 }))), filter((e) => e.type === "message"));
}
function observeReleases(instance, { resource, onCorsError }) {
  return getClientState(instance, {
    apiVersion: "v2025-05-06",
    resource
  }).observable.pipe(switchMap((client) => {
    let syncTags$ = new BehaviorSubject(void 0);
    return combineLatest([observeLiveEvents(instance, {
      resource,
      onCorsError
    }).pipe(startWith(void 0)), syncTags$]).pipe(filter(([message, syncTags]) => message === void 0 || message.tags.some((tag) => syncTags?.includes(tag))), map(([message]) => message?.id), distinctUntilChanged()).pipe(switchMap((lastLiveEventId) => client.observable.fetch("releases::all()", {}, {
      perspective: "raw",
      filterResponse: false,
      returnQuery: false,
      lastLiveEventId,
      tag: "releases"
    })), tap((response) => {
      syncTags$.next(response.syncTags);
    }), map((response) => response.result));
  }), startWith(void 0));
}
function sortReleases(releases2 = []) {
  return [...releases2].sort((a, b) => {
    let aType = a.metadata?.releaseType, bType = b.metadata?.releaseType;
    if (aType === "undecided" && bType !== "undecided") return -1;
    if (aType !== "undecided" && bType === "undecided") return 1;
    if (aType === "undecided" && bType === "undecided") return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
    if (aType === "scheduled" && bType === "scheduled") {
      let aPublishAt = a.publishAt || a.metadata?.intendedPublishAt;
      if (!aPublishAt) return 1;
      let bPublishAt = b.publishAt || b.metadata?.intendedPublishAt;
      return bPublishAt ? new Date(bPublishAt).getTime() - new Date(aPublishAt).getTime() : -1;
    }
    return aType === "asap" && bType !== "asap" ? 1 : aType !== "asap" && bType === "asap" ? -1 : aType === "asap" && bType === "asap" ? new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime() : 0;
  });
}
var ARCHIVED_RELEASE_STATES = ["archived", "published"];
var STABLE_EMPTY_RELEASES = [];
var releasesStore = defineStore({
  name: "Releases",
  getInitialState: () => ({
    activeReleases: void 0,
    allReleases: void 0
  }),
  initialize: (context) => {
    let subscription = subscribeToReleases(context);
    return () => subscription.unsubscribe();
  }
});
var _getActiveReleasesState = bindActionByResource(releasesStore, createStateSourceAction({ selector: ({ state }) => {
  if (state.error) throw state.error;
  return state.activeReleases;
} }));
var getActiveReleasesState = (instance, options) => _getActiveReleasesState(instance, options ?? {});
var _getAllReleasesState = bindActionByResource(releasesStore, createStateSourceAction({ selector: ({ state }) => {
  if (state.error) throw state.error;
  return state.allReleases;
} }));
var getAllReleasesState = (instance, options) => _getAllReleasesState(instance, options ?? {});
var subscribeToReleases = ({ instance, state, key: { resource } }) => observeReleases(instance, {
  resource,
  onCorsError: (error2) => state.set("setError", { error: error2 })
}).pipe(map((releases2) => {
  let sorted = sortReleases(releases2 ?? STABLE_EMPTY_RELEASES).reverse();
  state.set("setReleases", {
    allReleases: sorted,
    activeReleases: sorted.filter((release) => !ARCHIVED_RELEASE_STATES.includes(release.state))
  });
})).subscribe({ error: (error2) => state.set("setError", { error: error2 }) });
var optionsCache = /* @__PURE__ */ new Map();
var selectInstancePerspective = (context, _) => context.instance.config.perspective;
var selectActiveReleases = (context) => context.state.activeReleases;
var selectOptions = (_context, options) => options;
var memoizedOptionsSelector = createSelector([selectActiveReleases, selectOptions], (activeReleases, options) => {
  if (!options || !activeReleases) return options;
  let releaseIds = activeReleases.map((release) => release._id).join(","), nestedCache = optionsCache.get(releaseIds);
  nestedCache || (nestedCache = /* @__PURE__ */ new Map(), optionsCache.set(releaseIds, nestedCache));
  let optionsKey = JSON.stringify(options), cachedOptions = nestedCache.get(optionsKey);
  return cachedOptions || (cachedOptions = options, nestedCache.set(optionsKey, cachedOptions)), cachedOptions;
});
var _getPerspectiveStateSelector = createStateSourceAction({ selector: createSelector([
  selectInstancePerspective,
  selectActiveReleases,
  memoizedOptionsSelector
], (instancePerspective, activeReleases, memoizedOptions) => {
  let perspective = memoizedOptions?.perspective ?? instancePerspective ?? "drafts";
  if (!isReleasePerspective(perspective)) return perspective;
  if (!activeReleases || activeReleases.length === 0) return;
  let releaseNames = sortReleases(activeReleases).map((release) => release.name), index2 = releaseNames.findIndex((name) => name === perspective.releaseName);
  if (index2 < 0) throw Error(`Release "${perspective.releaseName}" not found in active releases`);
  return ["drafts", ...releaseNames.slice(0, index2 + 1)].filter((name) => !perspective.excludedPerspectives?.includes(name)).reverse();
}) });
var _boundGetPerspectiveState = bindActionByResource(releasesStore, _getPerspectiveStateSelector);
var getPerspectiveState = (instance, ...rest) => _boundGetPerspectiveState(instance, ...rest.length ? rest : [{}]);
var QUERY_STATE_CLEAR_DELAY = 1e3;
var setQueryError = (key, error2) => (prev) => {
  let prevQuery = prev.queries[key];
  return prevQuery ? {
    ...prev,
    queries: {
      ...prev.queries,
      [key]: {
        ...prevQuery,
        error: error2
      }
    }
  } : prev;
};
var setQueryData = (key, result, syncTags) => (prev) => {
  let prevQuery = prev.queries[key];
  return prevQuery ? {
    ...prev,
    queries: {
      ...prev.queries,
      [key]: {
        ...prevQuery,
        result: result ?? null,
        syncTags
      }
    }
  } : prev;
};
var setLastLiveEventId = (key, lastLiveEventId) => (prev) => {
  let prevQuery = prev.queries[key];
  return prevQuery ? {
    ...prev,
    queries: {
      ...prev.queries,
      [key]: {
        ...prevQuery,
        lastLiveEventId
      }
    }
  } : prev;
};
var addSubscriber = (key, subscriptionId) => (prev) => {
  let prevQuery = prev.queries[key], subscribers = [...prevQuery?.subscribers ?? [], subscriptionId];
  return {
    ...prev,
    queries: {
      ...prev.queries,
      [key]: {
        ...prevQuery,
        subscribers
      }
    }
  };
};
var removeSubscriber = (key, subscriptionId) => (prev) => {
  let prevQuery = prev.queries[key];
  if (!prevQuery) return prev;
  let subscribers = prevQuery.subscribers.filter((id2) => id2 !== subscriptionId);
  return subscribers.length ? {
    ...prev,
    queries: {
      ...prev.queries,
      [key]: {
        ...prevQuery,
        subscribers
      }
    }
  } : {
    ...prev,
    queries: omitProperty(prev.queries, key)
  };
};
var EMPTY_ARRAY = [];
var getQueryKey = (instance, options) => JSON.stringify(normalizeOptionsWithPerspective(instance, options));
var parseQueryKey = (key) => JSON.parse(key);
function normalizeOptionsWithPerspective(instance, options) {
  if (options.perspective !== void 0) return options;
  let instancePerspective = instance.config.perspective;
  return {
    ...options,
    perspective: instancePerspective === void 0 ? "drafts" : instancePerspective
  };
}
var queryStore = defineStore({
  name: "QueryStore",
  getInitialState: () => ({ queries: {} }),
  initialize(context) {
    let subscriptions = [listenForNewSubscribersAndFetch(context), listenToLiveClientAndSetLastLiveEventIds(context)];
    return () => {
      for (let subscription of subscriptions) subscription.unsubscribe();
    };
  }
});
var errorHandler = (state) => (error2) => state.set("setError", { error: error2 });
var listenForNewSubscribersAndFetch = ({ state, instance }) => state.observable.pipe(map((s) => new Set(Object.keys(s.queries))), distinctUntilChanged((curr, next) => curr.size === next.size && Array.from(next).every((i) => curr.has(i))), startWith(/* @__PURE__ */ new Set()), pairwise(), mergeMap(([curr, next]) => {
  let added = Array.from(next).filter((i) => !curr.has(i)), removed = Array.from(curr).filter((i) => !next.has(i));
  return [...added.map((key) => ({
    key,
    added: true
  })), ...removed.map((key) => ({
    key,
    added: false
  }))];
}), groupBy((i) => i.key), mergeMap((group$) => group$.pipe(switchMap((e) => {
  if (!e.added) return EMPTY;
  let lastLiveEventId$ = state.observable.pipe(map((s) => s.queries[group$.key]?.lastLiveEventId), distinctUntilChanged()), { query: query2, params, projectId, dataset, tag, resource, perspective: perspectiveFromOptions, ...restOptions } = parseQueryKey(group$.key), perspective$ = isReleasePerspective(perspectiveFromOptions) ? getPerspectiveState(instance, {
    perspective: perspectiveFromOptions,
    resource
  }).observable.pipe(filter(Boolean)) : of(perspectiveFromOptions ?? "drafts"), client$ = getClientState(instance, {
    apiVersion: "v2025-05-06",
    projectId,
    dataset,
    resource
  }).observable;
  return combineLatest({
    lastLiveEventId: lastLiveEventId$,
    client: client$,
    perspective: perspective$
  }).pipe(switchMap(({ lastLiveEventId, client, perspective }) => client.observable.fetch(query2, params, {
    ...restOptions,
    perspective,
    filterResponse: false,
    returnQuery: false,
    lastLiveEventId,
    tag
  })), tap(({ result, syncTags }) => {
    state.set("setQueryData", setQueryData(group$.key, result, syncTags));
  }), catchError((error2) => (state.set("setQueryError", setQueryError(group$.key, error2)), EMPTY)));
})))).subscribe({ error: errorHandler(state) });
var listenToLiveClientAndSetLastLiveEventIds = ({ state, instance, key: { resource } }) => {
  let liveMessages$ = observeLiveEvents(instance, {
    resource,
    onCorsError: (error2) => state.set("setError", { error: error2 })
  }).pipe(share());
  return state.observable.pipe(mergeMap((s) => Object.entries(s.queries)), groupBy(([key]) => key), mergeMap((group$) => {
    let syncTags$ = group$.pipe(map(([, queryState]) => queryState), map((i) => i?.syncTags ?? EMPTY_ARRAY), distinctUntilChanged());
    return combineLatest([liveMessages$, syncTags$]).pipe(filter(([message, syncTags]) => message.tags.some((tag) => syncTags.includes(tag))), tap(([message]) => {
      state.set("setLastLiveEventId", setLastLiveEventId(group$.key, message.id));
    }));
  })).subscribe({ error: errorHandler(state) });
};
function getQueryState(...args) {
  return _getQueryState(...args);
}
var _getQueryState = bindActionByResource(queryStore, createStateSourceAction({
  selector: ({ state, instance }, options) => {
    if (state.error) throw state.error;
    let key = getQueryKey(instance, options), queryState = state.queries[key];
    if (queryState?.error) throw queryState.error;
    return queryState?.result;
  },
  onSubscribe: ({ state, instance }, options) => {
    let subscriptionId = randomId(16), key = getQueryKey(instance, options);
    return state.set("addSubscriber", addSubscriber(key, subscriptionId)), () => {
      setCleanupTimeout(() => state.set("removeSubscriber", removeSubscriber(key, subscriptionId)), QUERY_STATE_CLEAR_DELAY);
    };
  }
}));
function resolveQuery(...args) {
  return _resolveQuery(...args);
}
var _resolveQuery = bindActionByResource(queryStore, ({ state, instance }, { signal, ...options }) => {
  let normalized = normalizeOptionsWithPerspective(instance, options), { getCurrent } = getQueryState(instance, normalized), key = getQueryKey(instance, normalized), subscriptionId = randomId(16);
  state.set("addSubscriber", addSubscriber(key, subscriptionId));
  let aborted$ = signal ? new Observable((observer) => {
    let cleanup = () => {
      signal.removeEventListener("abort", listener);
    }, listener = () => {
      observer.error(new DOMException("The operation was aborted.", "AbortError")), observer.complete(), cleanup();
    };
    return signal.addEventListener("abort", listener), cleanup;
  }).pipe(catchError((error2) => {
    throw error2 instanceof Error && error2.name === "AbortError" && state.set("removeSubscriber", removeSubscriber(key, subscriptionId)), error2;
  })) : NEVER, resolved$ = state.observable.pipe(map(getCurrent), first((i) => i !== void 0)), promise = firstValueFrom(race([resolved$, aborted$])), releaseSubscriber = () => {
    setCleanupTimeout(() => {
      state.set("removeSubscriber", removeSubscriber(key, subscriptionId));
    }, QUERY_STATE_CLEAR_DELAY);
  };
  return promise.then(releaseSubscriber, releaseSubscriber), promise;
});
var CORE_SDK_VERSION = getEnv("PKG_VERSION") || "3.3.0-development";

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/defineProperty-Bho9Ngsi.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && typeof Symbol == "function" && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toPrimitive(t, r) {
  if (_typeof(t) != "object" || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(t, r || "default");
    if (_typeof(i) != "object") return i;
    throw TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return _typeof(i) == "symbol" ? i : i + "";
}
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/regex.js
var regex_default2 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/validate.js
function validate2(uuid) {
  return typeof uuid === "string" && regex_default2.test(uuid);
}
var validate_default2 = validate2;

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/parse.js
function parse3(uuid) {
  if (!validate_default2(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v / 4294967296 & 255, v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255);
}
var parse_default2 = parse3;

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/stringify.js
var byteToHex2 = [];
for (let i = 0; i < 256; ++i) {
  byteToHex2.push((i + 256).toString(16).slice(1));
}
function unsafeStringify2(arr, offset = 0) {
  return (byteToHex2[arr[offset + 0]] + byteToHex2[arr[offset + 1]] + byteToHex2[arr[offset + 2]] + byteToHex2[arr[offset + 3]] + "-" + byteToHex2[arr[offset + 4]] + byteToHex2[arr[offset + 5]] + "-" + byteToHex2[arr[offset + 6]] + byteToHex2[arr[offset + 7]] + "-" + byteToHex2[arr[offset + 8]] + byteToHex2[arr[offset + 9]] + "-" + byteToHex2[arr[offset + 10]] + byteToHex2[arr[offset + 11]] + byteToHex2[arr[offset + 12]] + byteToHex2[arr[offset + 13]] + byteToHex2[arr[offset + 14]] + byteToHex2[arr[offset + 15]]).toLowerCase();
}

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/rng.js
var rnds82 = new Uint8Array(16);
function rng2() {
  return crypto.getRandomValues(rnds82);
}

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/md5.js
function md52(bytes) {
  const words = uint8ToUint322(bytes);
  const md5Bytes = wordsToMd52(words, bytes.length * 8);
  return uint32ToUint82(md5Bytes);
}
function uint32ToUint82(input) {
  const bytes = new Uint8Array(input.length * 4);
  for (let i = 0; i < input.length * 4; i++) {
    bytes[i] = input[i >> 2] >>> i % 4 * 8 & 255;
  }
  return bytes;
}
function getOutputLength2(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd52(x, len) {
  const xpad = new Uint32Array(getOutputLength2(len)).fill(0);
  xpad.set(x);
  xpad[len >> 5] |= 128 << len % 32;
  xpad[xpad.length - 1] = len;
  x = xpad;
  let a = 1732584193;
  let b = -271733879;
  let c4 = -1732584194;
  let d2 = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c4;
    const oldd = d2;
    a = md5ff2(a, b, c4, d2, x[i], 7, -680876936);
    d2 = md5ff2(d2, a, b, c4, x[i + 1], 12, -389564586);
    c4 = md5ff2(c4, d2, a, b, x[i + 2], 17, 606105819);
    b = md5ff2(b, c4, d2, a, x[i + 3], 22, -1044525330);
    a = md5ff2(a, b, c4, d2, x[i + 4], 7, -176418897);
    d2 = md5ff2(d2, a, b, c4, x[i + 5], 12, 1200080426);
    c4 = md5ff2(c4, d2, a, b, x[i + 6], 17, -1473231341);
    b = md5ff2(b, c4, d2, a, x[i + 7], 22, -45705983);
    a = md5ff2(a, b, c4, d2, x[i + 8], 7, 1770035416);
    d2 = md5ff2(d2, a, b, c4, x[i + 9], 12, -1958414417);
    c4 = md5ff2(c4, d2, a, b, x[i + 10], 17, -42063);
    b = md5ff2(b, c4, d2, a, x[i + 11], 22, -1990404162);
    a = md5ff2(a, b, c4, d2, x[i + 12], 7, 1804603682);
    d2 = md5ff2(d2, a, b, c4, x[i + 13], 12, -40341101);
    c4 = md5ff2(c4, d2, a, b, x[i + 14], 17, -1502002290);
    b = md5ff2(b, c4, d2, a, x[i + 15], 22, 1236535329);
    a = md5gg2(a, b, c4, d2, x[i + 1], 5, -165796510);
    d2 = md5gg2(d2, a, b, c4, x[i + 6], 9, -1069501632);
    c4 = md5gg2(c4, d2, a, b, x[i + 11], 14, 643717713);
    b = md5gg2(b, c4, d2, a, x[i], 20, -373897302);
    a = md5gg2(a, b, c4, d2, x[i + 5], 5, -701558691);
    d2 = md5gg2(d2, a, b, c4, x[i + 10], 9, 38016083);
    c4 = md5gg2(c4, d2, a, b, x[i + 15], 14, -660478335);
    b = md5gg2(b, c4, d2, a, x[i + 4], 20, -405537848);
    a = md5gg2(a, b, c4, d2, x[i + 9], 5, 568446438);
    d2 = md5gg2(d2, a, b, c4, x[i + 14], 9, -1019803690);
    c4 = md5gg2(c4, d2, a, b, x[i + 3], 14, -187363961);
    b = md5gg2(b, c4, d2, a, x[i + 8], 20, 1163531501);
    a = md5gg2(a, b, c4, d2, x[i + 13], 5, -1444681467);
    d2 = md5gg2(d2, a, b, c4, x[i + 2], 9, -51403784);
    c4 = md5gg2(c4, d2, a, b, x[i + 7], 14, 1735328473);
    b = md5gg2(b, c4, d2, a, x[i + 12], 20, -1926607734);
    a = md5hh2(a, b, c4, d2, x[i + 5], 4, -378558);
    d2 = md5hh2(d2, a, b, c4, x[i + 8], 11, -2022574463);
    c4 = md5hh2(c4, d2, a, b, x[i + 11], 16, 1839030562);
    b = md5hh2(b, c4, d2, a, x[i + 14], 23, -35309556);
    a = md5hh2(a, b, c4, d2, x[i + 1], 4, -1530992060);
    d2 = md5hh2(d2, a, b, c4, x[i + 4], 11, 1272893353);
    c4 = md5hh2(c4, d2, a, b, x[i + 7], 16, -155497632);
    b = md5hh2(b, c4, d2, a, x[i + 10], 23, -1094730640);
    a = md5hh2(a, b, c4, d2, x[i + 13], 4, 681279174);
    d2 = md5hh2(d2, a, b, c4, x[i], 11, -358537222);
    c4 = md5hh2(c4, d2, a, b, x[i + 3], 16, -722521979);
    b = md5hh2(b, c4, d2, a, x[i + 6], 23, 76029189);
    a = md5hh2(a, b, c4, d2, x[i + 9], 4, -640364487);
    d2 = md5hh2(d2, a, b, c4, x[i + 12], 11, -421815835);
    c4 = md5hh2(c4, d2, a, b, x[i + 15], 16, 530742520);
    b = md5hh2(b, c4, d2, a, x[i + 2], 23, -995338651);
    a = md5ii2(a, b, c4, d2, x[i], 6, -198630844);
    d2 = md5ii2(d2, a, b, c4, x[i + 7], 10, 1126891415);
    c4 = md5ii2(c4, d2, a, b, x[i + 14], 15, -1416354905);
    b = md5ii2(b, c4, d2, a, x[i + 5], 21, -57434055);
    a = md5ii2(a, b, c4, d2, x[i + 12], 6, 1700485571);
    d2 = md5ii2(d2, a, b, c4, x[i + 3], 10, -1894986606);
    c4 = md5ii2(c4, d2, a, b, x[i + 10], 15, -1051523);
    b = md5ii2(b, c4, d2, a, x[i + 1], 21, -2054922799);
    a = md5ii2(a, b, c4, d2, x[i + 8], 6, 1873313359);
    d2 = md5ii2(d2, a, b, c4, x[i + 15], 10, -30611744);
    c4 = md5ii2(c4, d2, a, b, x[i + 6], 15, -1560198380);
    b = md5ii2(b, c4, d2, a, x[i + 13], 21, 1309151649);
    a = md5ii2(a, b, c4, d2, x[i + 4], 6, -145523070);
    d2 = md5ii2(d2, a, b, c4, x[i + 11], 10, -1120210379);
    c4 = md5ii2(c4, d2, a, b, x[i + 2], 15, 718787259);
    b = md5ii2(b, c4, d2, a, x[i + 9], 21, -343485551);
    a = safeAdd2(a, olda);
    b = safeAdd2(b, oldb);
    c4 = safeAdd2(c4, oldc);
    d2 = safeAdd2(d2, oldd);
  }
  return Uint32Array.of(a, b, c4, d2);
}
function uint8ToUint322(input) {
  if (input.length === 0) {
    return new Uint32Array();
  }
  const output = new Uint32Array(getOutputLength2(input.length * 8)).fill(0);
  for (let i = 0; i < input.length; i++) {
    output[i >> 2] |= (input[i] & 255) << i % 4 * 8;
  }
  return output;
}
function safeAdd2(x, y2) {
  const lsw = (x & 65535) + (y2 & 65535);
  const msw = (x >> 16) + (y2 >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft2(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn2(q, a, b, x, s, t) {
  return safeAdd2(bitRotateLeft2(safeAdd2(safeAdd2(a, q), safeAdd2(x, t)), s), b);
}
function md5ff2(a, b, c4, d2, x, s, t) {
  return md5cmn2(b & c4 | ~b & d2, a, b, x, s, t);
}
function md5gg2(a, b, c4, d2, x, s, t) {
  return md5cmn2(b & d2 | c4 & ~d2, a, b, x, s, t);
}
function md5hh2(a, b, c4, d2, x, s, t) {
  return md5cmn2(b ^ c4 ^ d2, a, b, x, s, t);
}
function md5ii2(a, b, c4, d2, x, s, t) {
  return md5cmn2(c4 ^ (b | ~d2), a, b, x, s, t);
}
var md5_default2 = md52;

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v35.js
function stringToBytes2(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; ++i) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}
var DNS2 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL3 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v352(version2, hash, value, namespace, buf, offset) {
  const valueBytes = typeof value === "string" ? stringToBytes2(value) : value;
  const namespaceBytes = typeof namespace === "string" ? parse_default2(namespace) : namespace;
  if (typeof namespace === "string") {
    namespace = parse_default2(namespace);
  }
  if (namespace?.length !== 16) {
    throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
  }
  let bytes = new Uint8Array(16 + valueBytes.length);
  bytes.set(namespaceBytes);
  bytes.set(valueBytes, namespaceBytes.length);
  bytes = hash(bytes);
  bytes[6] = bytes[6] & 15 | version2;
  bytes[8] = bytes[8] & 63 | 128;
  if (buf) {
    offset ??= 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }
  return unsafeStringify2(bytes);
}

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v3.js
function v32(value, namespace, buf, offset) {
  return v352(48, md5_default2, value, namespace, buf, offset);
}
v32.DNS = DNS2;
v32.URL = URL3;

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v4.js
function v4(options, buf, offset) {
  if (!buf && !options && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return _v4(options, buf, offset);
}
function _v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng2();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify2(rnds);
}
var v4_default2 = v4;

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/sha1.js
function f2(s, x, y2, z) {
  switch (s) {
    case 0:
      return x & y2 ^ ~x & z;
    case 1:
      return x ^ y2 ^ z;
    case 2:
      return x & y2 ^ x & z ^ y2 & z;
    case 3:
      return x ^ y2 ^ z;
  }
}
function ROTL2(x, n) {
  return x << n | x >>> 32 - n;
}
function sha12(bytes) {
  const K = [1518500249, 1859775393, 2400959708, 3395469782];
  const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  const newBytes = new Uint8Array(bytes.length + 1);
  newBytes.set(bytes);
  newBytes[bytes.length] = 128;
  bytes = newBytes;
  const l2 = bytes.length / 4 + 2;
  const N = Math.ceil(l2 / 16);
  const M = new Array(N);
  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);
    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
    M[i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / 2 ** 32;
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);
    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }
    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL2(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }
    let a = H[0];
    let b = H[1];
    let c4 = H[2];
    let d2 = H[3];
    let e = H[4];
    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL2(a, 5) + f2(s, b, c4, d2) + e + K[s] + W[t] >>> 0;
      e = d2;
      d2 = c4;
      c4 = ROTL2(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c4 >>> 0;
    H[3] = H[3] + d2 >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
}
var sha1_default2 = sha12;

// ../../node_modules/.pnpm/uuid@14.0.2/node_modules/uuid/dist/v5.js
function v52(value, namespace, buf, offset) {
  return v352(80, sha1_default2, value, namespace, buf, offset);
}
v52.DNS = DNS2;
v52.URL = URL3;

// ../../node_modules/.pnpm/xstate@5.33.2/node_modules/xstate/dist/xstate-dev.development.esm.js
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  {
    console.warn("XState could not find a global object in this environment. Please let the maintainers know and raise an issue here: https://github.com/statelyai/xstate/issues");
  }
}
function getDevTools() {
  const w = getGlobal();
  if (w.__xstate__) {
    return w.__xstate__;
  }
  return void 0;
}
var devToolsAdapter = (service) => {
  if (typeof window === "undefined") {
    return;
  }
  const devTools = getDevTools();
  if (devTools) {
    devTools.register(service);
  }
};

// ../../node_modules/.pnpm/xstate@5.33.2/node_modules/xstate/dist/raise-4d6182c1.development.esm.js
var Mailbox = class {
  constructor(_process) {
    this._process = _process;
    this._active = false;
    this._current = null;
    this._last = null;
  }
  start() {
    this._active = true;
    this.flush();
  }
  clear() {
    if (this._current) {
      this._current.next = null;
      this._last = this._current;
    }
  }
  enqueue(event) {
    const enqueued = {
      value: event,
      next: null
    };
    if (this._current) {
      this._last.next = enqueued;
      this._last = enqueued;
      return;
    }
    this._current = enqueued;
    this._last = enqueued;
    if (this._active) {
      this.flush();
    }
  }
  flush() {
    while (this._current) {
      const consumed = this._current;
      this._process(consumed.value);
      this._current = consumed.next;
    }
    this._last = null;
  }
};
var STATE_DELIMITER = ".";
var TARGETLESS_KEY = "";
var NULL_EVENT = "";
var STATE_IDENTIFIER = "#";
var WILDCARD = "*";
var XSTATE_INIT = "xstate.init";
var XSTATE_ERROR = "xstate.error";
var XSTATE_STOP = "xstate.stop";
function createAfterEvent(delayRef, id2) {
  return {
    type: `xstate.after.${delayRef}.${id2}`
  };
}
function createDoneStateEvent(id2, output) {
  return {
    type: `xstate.done.state.${id2}`,
    output
  };
}
function createDoneActorEvent(invokeId, output) {
  return {
    type: `xstate.done.actor.${invokeId}`,
    output,
    actorId: invokeId
  };
}
function createErrorActorEvent(id2, error2) {
  return {
    type: `xstate.error.actor.${id2}`,
    error: error2,
    actorId: id2
  };
}
function createInitEvent(input) {
  return {
    type: XSTATE_INIT,
    input
  };
}
function reportUnhandledError(err) {
  setTimeout(() => {
    throw err;
  });
}
var symbolObservable = (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
function matchesState(parentStateId, childStateId) {
  const parentStateValue = toStateValue(parentStateId);
  const childStateValue = toStateValue(childStateId);
  if (typeof childStateValue === "string") {
    if (typeof parentStateValue === "string") {
      return childStateValue === parentStateValue;
    }
    return false;
  }
  if (typeof parentStateValue === "string") {
    return parentStateValue in childStateValue;
  }
  return Object.keys(parentStateValue).every((key) => {
    if (!(key in childStateValue)) {
      return false;
    }
    return matchesState(parentStateValue[key], childStateValue[key]);
  });
}
function toStatePath(stateId) {
  if (isArray(stateId)) {
    return stateId;
  }
  const result = [];
  let segment = "";
  for (let i = 0; i < stateId.length; i++) {
    const char = stateId.charCodeAt(i);
    switch (char) {
      // \
      case 92:
        segment += stateId[i + 1];
        i++;
        continue;
      // .
      case 46:
        result.push(segment);
        segment = "";
        continue;
    }
    segment += stateId[i];
  }
  result.push(segment);
  return result;
}
function toStateValue(stateValue) {
  if (isMachineSnapshot(stateValue)) {
    return stateValue.value;
  }
  if (typeof stateValue !== "string") {
    return stateValue;
  }
  const statePath = toStatePath(stateValue);
  return pathToStateValue(statePath);
}
function pathToStateValue(statePath) {
  if (statePath.length === 1) {
    return statePath[0];
  }
  const value = {};
  let marker = value;
  for (let i = 0; i < statePath.length - 1; i++) {
    if (i === statePath.length - 2) {
      marker[statePath[i]] = statePath[i + 1];
    } else {
      const previous = marker;
      marker = {};
      previous[statePath[i]] = marker;
    }
  }
  return value;
}
function mapValues(collection, iteratee) {
  const result = {};
  const collectionKeys = Object.keys(collection);
  for (let i = 0; i < collectionKeys.length; i++) {
    const key = collectionKeys[i];
    result[key] = iteratee(collection[key], key, collection, i);
  }
  return result;
}
function toArrayStrict(value) {
  if (isArray(value)) {
    return value;
  }
  return [value];
}
function toArray(value) {
  if (value === void 0) {
    return [];
  }
  return toArrayStrict(value);
}
function resolveOutput(mapper, context, event, self2) {
  if (typeof mapper === "function") {
    return mapper({
      context,
      event,
      self: self2
    });
  }
  if (!!mapper && typeof mapper === "object" && Object.values(mapper).some((val) => typeof val === "function")) {
    console.warn(`Dynamically mapping values to individual properties is deprecated. Use a single function that returns the mapped object instead.
Found object containing properties whose values are possibly mapping functions: ${Object.entries(mapper).filter(([, value]) => typeof value === "function").map(([key, value]) => `
 - ${key}: ${value.toString().replace(/\n\s*/g, "")}`).join("")}`);
  }
  return mapper;
}
function isArray(value) {
  return Array.isArray(value);
}
function isErrorActorEvent(event) {
  return event.type.startsWith("xstate.error.actor");
}
function toTransitionConfigArray(configLike) {
  return toArrayStrict(configLike).map((transitionLike) => {
    if (typeof transitionLike === "undefined" || typeof transitionLike === "string") {
      return {
        target: transitionLike
      };
    }
    return transitionLike;
  });
}
function normalizeTarget(target) {
  if (target === void 0 || target === TARGETLESS_KEY) {
    return void 0;
  }
  return toArray(target);
}
function toObserver(nextHandler, errorHandler3, completionHandler) {
  const isObserver = typeof nextHandler === "object";
  const self2 = isObserver ? nextHandler : void 0;
  return {
    next: (isObserver ? nextHandler.next : nextHandler)?.bind(self2),
    error: (isObserver ? nextHandler.error : errorHandler3)?.bind(self2),
    complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self2)
  };
}
function createInvokeId(stateNodeId, index2) {
  return `${index2}.${stateNodeId}`;
}
function resolveReferencedActor(machine, src) {
  const match2 = src.match(/^xstate\.invoke\.(\d+)\.(.*)/);
  if (!match2) {
    return machine.implementations.actors[src];
  }
  const [, indexStr, nodeId] = match2;
  const node = machine.getStateNodeById(nodeId);
  const invokeConfig = node.config.invoke;
  return (Array.isArray(invokeConfig) ? invokeConfig[indexStr] : invokeConfig).src;
}
function matchesEventDescriptor(eventType, descriptor) {
  if (descriptor === eventType) {
    return true;
  }
  if (descriptor === WILDCARD) {
    return true;
  }
  if (!descriptor.endsWith(".*")) {
    return false;
  }
  if (/.*\*.+/.test(descriptor)) {
    console.warn(`Wildcards can only be the last token of an event descriptor (e.g., "event.*") or the entire event descriptor ("*"). Check the "${descriptor}" event.`);
  }
  const partialEventTokens = descriptor.split(".");
  const eventTokens = eventType.split(".");
  for (let tokenIndex = 0; tokenIndex < partialEventTokens.length; tokenIndex++) {
    const partialEventToken = partialEventTokens[tokenIndex];
    const eventToken = eventTokens[tokenIndex];
    if (partialEventToken === "*") {
      const isLastToken = tokenIndex === partialEventTokens.length - 1;
      if (!isLastToken) {
        console.warn(`Infix wildcards in transition events are not allowed. Check the "${descriptor}" transition.`);
      }
      return isLastToken;
    }
    if (partialEventToken !== eventToken) {
      return false;
    }
  }
  return true;
}
function createScheduledEventId(actorRef, id2) {
  return `${actorRef.sessionId}.${id2}`;
}
var idCounter = 0;
function createSystem(rootActor, options) {
  const children = /* @__PURE__ */ new Map();
  const keyedActors = /* @__PURE__ */ new Map();
  const reverseKeyedActors = /* @__PURE__ */ new WeakMap();
  const inspectionObservers = /* @__PURE__ */ new Set();
  const timerMap = {};
  const {
    clock,
    logger: logger3
  } = options;
  const scheduler = {
    schedule: (source, target, event, delay, id2 = Math.random().toString(36).slice(2)) => {
      const scheduledEvent = {
        source,
        target,
        event,
        delay,
        id: id2,
        startedAt: Date.now()
      };
      const scheduledEventId = createScheduledEventId(source, id2);
      system._snapshot._scheduledEvents[scheduledEventId] = scheduledEvent;
      const timeout = clock.setTimeout(() => {
        delete timerMap[scheduledEventId];
        delete system._snapshot._scheduledEvents[scheduledEventId];
        system._relay(source, target, event);
      }, delay);
      timerMap[scheduledEventId] = timeout;
    },
    cancel: (source, id2) => {
      const scheduledEventId = createScheduledEventId(source, id2);
      const timeout = timerMap[scheduledEventId];
      delete timerMap[scheduledEventId];
      delete system._snapshot._scheduledEvents[scheduledEventId];
      if (timeout !== void 0) {
        clock.clearTimeout(timeout);
      }
    },
    cancelAll: (actorRef) => {
      for (const scheduledEventId in system._snapshot._scheduledEvents) {
        const scheduledEvent = system._snapshot._scheduledEvents[scheduledEventId];
        if (scheduledEvent.source === actorRef) {
          scheduler.cancel(actorRef, scheduledEvent.id);
        }
      }
    }
  };
  const sendInspectionEvent = (event) => {
    if (!inspectionObservers.size) {
      return;
    }
    const resolvedInspectionEvent = {
      ...event,
      rootId: rootActor.sessionId
    };
    inspectionObservers.forEach((observer) => observer.next?.(resolvedInspectionEvent));
  };
  const system = {
    _snapshot: {
      _scheduledEvents: (options?.snapshot && options.snapshot.scheduler) ?? {}
    },
    _bookId: () => `x:${idCounter++}`,
    _register: (sessionId, actorRef) => {
      children.set(sessionId, actorRef);
      return sessionId;
    },
    _unregister: (actorRef) => {
      children.delete(actorRef.sessionId);
      const systemId = reverseKeyedActors.get(actorRef);
      if (systemId !== void 0) {
        keyedActors.delete(systemId);
        reverseKeyedActors.delete(actorRef);
      }
    },
    get: (systemId) => {
      return keyedActors.get(systemId);
    },
    getAll: () => {
      return Object.fromEntries(keyedActors.entries());
    },
    _set: (systemId, actorRef) => {
      const existing = keyedActors.get(systemId);
      if (existing && existing !== actorRef) {
        throw new Error(`Actor with system ID '${systemId}' already exists.`);
      }
      keyedActors.set(systemId, actorRef);
      reverseKeyedActors.set(actorRef, systemId);
    },
    inspect: (observerOrFn) => {
      const observer = toObserver(observerOrFn);
      inspectionObservers.add(observer);
      return {
        unsubscribe() {
          inspectionObservers.delete(observer);
        }
      };
    },
    _sendInspectionEvent: sendInspectionEvent,
    _relay: (source, target, event) => {
      system._sendInspectionEvent({
        type: "@xstate.event",
        sourceRef: source,
        actorRef: target,
        event
      });
      target._send(event);
    },
    scheduler,
    getSnapshot: () => {
      return {
        _scheduledEvents: {
          ...system._snapshot._scheduledEvents
        }
      };
    },
    start: () => {
      const scheduledEvents = system._snapshot._scheduledEvents;
      system._snapshot._scheduledEvents = {};
      for (const scheduledId in scheduledEvents) {
        const {
          source,
          target,
          event,
          delay,
          id: id2
        } = scheduledEvents[scheduledId];
        scheduler.schedule(source, target, event, delay, id2);
      }
    },
    _clock: clock,
    _logger: logger3
  };
  return system;
}
var executingCustomAction = false;
var $$ACTOR_TYPE = 1;
var ProcessingStatus = (function(ProcessingStatus2) {
  ProcessingStatus2[ProcessingStatus2["NotStarted"] = 0] = "NotStarted";
  ProcessingStatus2[ProcessingStatus2["Running"] = 1] = "Running";
  ProcessingStatus2[ProcessingStatus2["Stopped"] = 2] = "Stopped";
  return ProcessingStatus2;
})({});
var defaultOptions = {
  clock: {
    setTimeout: (fn, ms) => {
      return setTimeout(fn, ms);
    },
    clearTimeout: (id2) => {
      return clearTimeout(id2);
    }
  },
  logger: console.log.bind(console),
  devTools: false
};
var Actor = class {
  /**
   * Creates a new actor instance for the given logic with the provided options,
   * if any.
   *
   * @param logic The logic to create an actor from
   * @param options Actor options
   */
  constructor(logic, options) {
    this.logic = logic;
    this._snapshot = void 0;
    this.clock = void 0;
    this.options = void 0;
    this.id = void 0;
    this.mailbox = new Mailbox(this._process.bind(this));
    this.observers = /* @__PURE__ */ new Set();
    this.eventListeners = /* @__PURE__ */ new Map();
    this.logger = void 0;
    this._processingStatus = ProcessingStatus.NotStarted;
    this._parent = void 0;
    this._syncSnapshot = void 0;
    this.ref = void 0;
    this._actorScope = void 0;
    this.systemId = void 0;
    this.sessionId = void 0;
    this.system = void 0;
    this._doneEvent = void 0;
    this.src = void 0;
    this._deferred = [];
    const resolvedOptions = {
      ...defaultOptions,
      ...options
    };
    const {
      clock,
      logger: logger3,
      parent,
      syncSnapshot,
      id: id2,
      systemId,
      inspect
    } = resolvedOptions;
    this.system = parent ? parent.system : createSystem(this, {
      clock,
      logger: logger3
    });
    if (inspect && !parent) {
      this.system.inspect(toObserver(inspect));
    }
    this.sessionId = this.system._bookId();
    this.id = id2 ?? this.sessionId;
    this.logger = options?.logger ?? this.system._logger;
    this.clock = options?.clock ?? this.system._clock;
    this._parent = parent;
    this._syncSnapshot = syncSnapshot;
    this.options = resolvedOptions;
    this.src = resolvedOptions.src ?? logic;
    this.ref = this;
    this._actorScope = {
      self: this,
      id: this.id,
      sessionId: this.sessionId,
      logger: this.logger,
      defer: (fn) => {
        this._deferred.push(fn);
      },
      system: this.system,
      stopChild: (child) => {
        if (child._parent !== this) {
          throw new Error(`Cannot stop child actor ${child.id} of ${this.id} because it is not a child`);
        }
        child._stop();
      },
      emit: (emittedEvent) => {
        const listeners = this.eventListeners.get(emittedEvent.type);
        const wildcardListener = this.eventListeners.get("*");
        if (!listeners && !wildcardListener) {
          return;
        }
        const allListeners = [...listeners ? listeners.values() : [], ...wildcardListener ? wildcardListener.values() : []];
        for (const handler of allListeners) {
          try {
            handler(emittedEvent);
          } catch (err) {
            reportUnhandledError(err);
          }
        }
      },
      actionExecutor: (action) => {
        const exec = () => {
          this._actorScope.system._sendInspectionEvent({
            type: "@xstate.action",
            actorRef: this,
            action: {
              type: action.type,
              params: action.params
            }
          });
          if (!action.exec) {
            return;
          }
          const saveExecutingCustomAction = executingCustomAction;
          try {
            executingCustomAction = true;
            action.exec(action.info, action.params);
          } finally {
            executingCustomAction = saveExecutingCustomAction;
          }
        };
        if (this._processingStatus === ProcessingStatus.Running) {
          exec();
        } else {
          this._deferred.push(exec);
        }
      }
    };
    this.send = this.send.bind(this);
    this.system._sendInspectionEvent({
      type: "@xstate.actor",
      actorRef: this
    });
    if (systemId) {
      this.systemId = systemId;
      this.system._set(systemId, this);
    }
    this._initState(options?.snapshot ?? options?.state);
    if (systemId && this._snapshot.status !== "active") {
      this.system._unregister(this);
    }
  }
  _initState(persistedState) {
    try {
      this._snapshot = persistedState ? this.logic.restoreSnapshot ? this.logic.restoreSnapshot(persistedState, this._actorScope) : persistedState : this.logic.getInitialSnapshot(this._actorScope, this.options?.input);
    } catch (err) {
      this._snapshot = {
        status: "error",
        output: void 0,
        error: err
      };
    }
  }
  update(snapshot, event) {
    this._snapshot = snapshot;
    let deferredFn;
    while (deferredFn = this._deferred.shift()) {
      try {
        deferredFn();
      } catch (err) {
        this._deferred.length = 0;
        this._snapshot = {
          ...snapshot,
          status: "error",
          error: err
        };
      }
    }
    switch (this._snapshot.status) {
      case "active":
        for (const observer of this.observers) {
          try {
            observer.next?.(snapshot);
          } catch (err) {
            reportUnhandledError(err);
          }
        }
        break;
      case "done":
        for (const observer of this.observers) {
          try {
            observer.next?.(snapshot);
          } catch (err) {
            reportUnhandledError(err);
          }
        }
        this._stopProcedure();
        this._complete();
        this._doneEvent = createDoneActorEvent(this.id, this._snapshot.output);
        if (this._parent) {
          this.system._relay(this, this._parent, this._doneEvent);
        }
        break;
      case "error":
        this._error(this._snapshot.error);
        break;
    }
    this.system._sendInspectionEvent({
      type: "@xstate.snapshot",
      actorRef: this,
      event,
      snapshot
    });
  }
  /**
   * Subscribe an observer to an actor’s snapshot values.
   *
   * @remarks
   * The observer will receive the actor’s snapshot value when it is emitted.
   * The observer can be:
   *
   * - A plain function that receives the latest snapshot, or
   * - An observer object whose `.next(snapshot)` method receives the latest
   *   snapshot
   *
   * @example
   *
   * ```ts
   * // Observer as a plain function
   * const subscription = actor.subscribe((snapshot) => {
   *   console.log(snapshot);
   * });
   * ```
   *
   * @example
   *
   * ```ts
   * // Observer as an object
   * const subscription = actor.subscribe({
   *   next(snapshot) {
   *     console.log(snapshot);
   *   },
   *   error(err) {
   *     // ...
   *   },
   *   complete() {
   *     // ...
   *   }
   * });
   * ```
   *
   * The return value of `actor.subscribe(observer)` is a subscription object
   * that has an `.unsubscribe()` method. You can call
   * `subscription.unsubscribe()` to unsubscribe the observer:
   *
   * @example
   *
   * ```ts
   * const subscription = actor.subscribe((snapshot) => {
   *   // ...
   * });
   *
   * // Unsubscribe the observer
   * subscription.unsubscribe();
   * ```
   *
   * When the actor is stopped, all of its observers will automatically be
   * unsubscribed.
   *
   * @param observer - Either a plain function that receives the latest
   *   snapshot, or an observer object whose `.next(snapshot)` method receives
   *   the latest snapshot
   */
  subscribe(nextListenerOrObserver, errorListener, completeListener) {
    const observer = toObserver(nextListenerOrObserver, errorListener, completeListener);
    if (this._processingStatus !== ProcessingStatus.Stopped) {
      this.observers.add(observer);
    } else {
      switch (this._snapshot.status) {
        case "done":
          try {
            observer.complete?.();
          } catch (err) {
            reportUnhandledError(err);
          }
          break;
        case "error": {
          const err = this._snapshot.error;
          if (!observer.error) {
            reportUnhandledError(err);
          } else {
            try {
              observer.error(err);
            } catch (err2) {
              reportUnhandledError(err2);
            }
          }
          break;
        }
      }
    }
    return {
      unsubscribe: () => {
        this.observers.delete(observer);
      }
    };
  }
  on(type, handler) {
    let listeners = this.eventListeners.get(type);
    if (!listeners) {
      listeners = /* @__PURE__ */ new Set();
      this.eventListeners.set(type, listeners);
    }
    const wrappedHandler = handler.bind(void 0);
    listeners.add(wrappedHandler);
    return {
      unsubscribe: () => {
        listeners.delete(wrappedHandler);
      }
    };
  }
  select(selector, equalityFn = Object.is) {
    return {
      subscribe: (observerOrFn) => {
        const observer = toObserver(observerOrFn);
        const snapshot = this.getSnapshot();
        let previousSelected = selector(snapshot);
        return this.subscribe((snapshot2) => {
          const nextSelected = selector(snapshot2);
          if (!equalityFn(previousSelected, nextSelected)) {
            previousSelected = nextSelected;
            observer.next?.(nextSelected);
          }
        });
      },
      get: () => selector(this.getSnapshot())
    };
  }
  /** Starts the Actor from the initial state */
  start() {
    if (this._processingStatus === ProcessingStatus.Running) {
      return this;
    }
    if (this._syncSnapshot) {
      this.subscribe({
        next: (snapshot) => {
          if (snapshot.status === "active") {
            this.system._relay(this, this._parent, {
              type: `xstate.snapshot.${this.id}`,
              snapshot
            });
          }
        },
        error: () => {
        }
      });
    }
    this.system._register(this.sessionId, this);
    if (this.systemId) {
      this.system._set(this.systemId, this);
    }
    this._processingStatus = ProcessingStatus.Running;
    const initEvent = createInitEvent(this.options.input);
    this.system._sendInspectionEvent({
      type: "@xstate.event",
      sourceRef: this._parent,
      actorRef: this,
      event: initEvent
    });
    const status = this._snapshot.status;
    switch (status) {
      case "done":
        this.update(this._snapshot, initEvent);
        return this;
      case "error":
        this._error(this._snapshot.error);
        return this;
    }
    if (!this._parent) {
      this.system.start();
    }
    if (this.logic.start) {
      try {
        this.logic.start(this._snapshot, this._actorScope);
      } catch (err) {
        this._snapshot = {
          ...this._snapshot,
          status: "error",
          error: err
        };
        this._error(err);
        return this;
      }
    }
    this.update(this._snapshot, initEvent);
    if (this.options.devTools) {
      this.attachDevTools();
    }
    this.mailbox.start();
    return this;
  }
  _process(event) {
    let nextState;
    let caughtError;
    try {
      nextState = this.logic.transition(this._snapshot, event, this._actorScope);
    } catch (err) {
      caughtError = {
        err
      };
    }
    if (caughtError) {
      const {
        err
      } = caughtError;
      this._snapshot = {
        ...this._snapshot,
        status: "error",
        error: err
      };
      this._error(err);
      return;
    }
    this.update(nextState, event);
    if (event.type === XSTATE_STOP) {
      this._stopProcedure();
      this._complete();
    }
  }
  _stop() {
    if (this._processingStatus === ProcessingStatus.Stopped) {
      return this;
    }
    this.mailbox.clear();
    if (this._processingStatus === ProcessingStatus.NotStarted) {
      this._processingStatus = ProcessingStatus.Stopped;
      return this;
    }
    this.mailbox.enqueue({
      type: XSTATE_STOP
    });
    return this;
  }
  /** Stops the Actor and unsubscribe all listeners. */
  stop() {
    if (this._parent) {
      throw new Error("A non-root actor cannot be stopped directly.");
    }
    return this._stop();
  }
  _complete() {
    for (const observer of this.observers) {
      try {
        observer.complete?.();
      } catch (err) {
        reportUnhandledError(err);
      }
    }
    this.observers.clear();
    this.eventListeners.clear();
  }
  _reportError(err) {
    if (!this.observers.size) {
      if (!this._parent) {
        reportUnhandledError(err);
      }
      this.eventListeners.clear();
      return;
    }
    let reportError = false;
    for (const observer of this.observers) {
      const errorListener = observer.error;
      reportError ||= !errorListener;
      try {
        errorListener?.(err);
      } catch (err2) {
        reportUnhandledError(err2);
      }
    }
    this.observers.clear();
    this.eventListeners.clear();
    if (reportError) {
      reportUnhandledError(err);
    }
  }
  _error(err) {
    this._stopProcedure();
    this._reportError(err);
    if (this._parent) {
      this.system._relay(this, this._parent, createErrorActorEvent(this.id, err));
    }
  }
  // TODO: atm children don't belong entirely to the actor so
  // in a way - it's not even super aware of them
  // so we can't stop them from here but we really should!
  // right now, they are being stopped within the machine's transition
  // but that could throw and leave us with "orphaned" active actors
  _stopProcedure() {
    if (this._processingStatus !== ProcessingStatus.Running) {
      return this;
    }
    this.system.scheduler.cancelAll(this);
    this.mailbox.clear();
    this.mailbox = new Mailbox(this._process.bind(this));
    this._processingStatus = ProcessingStatus.Stopped;
    this.system._unregister(this);
    return this;
  }
  /** @internal */
  _send(event) {
    if (this._processingStatus === ProcessingStatus.Stopped) {
      {
        let eventString;
        try {
          eventString = JSON.stringify(event);
        } catch {
          eventString = String(event);
        }
        console.warn(`Event "${event.type}" was sent to stopped actor "${this.id} (${this.sessionId})". This actor has already reached its final state, and will not transition.
Event: ${eventString}`);
      }
      return;
    }
    this.mailbox.enqueue(event);
  }
  /**
   * Sends an event to the running Actor to trigger a transition.
   *
   * @param event The event to send
   */
  send(event) {
    if (typeof event === "string") {
      throw new Error(`Only event objects may be sent to actors; use .send({ type: "${event}" }) instead`);
    }
    this.system._relay(void 0, this, event);
  }
  attachDevTools() {
    const {
      devTools
    } = this.options;
    if (devTools) {
      const resolvedDevToolsAdapter = typeof devTools === "function" ? devTools : devToolsAdapter;
      resolvedDevToolsAdapter(this);
    }
  }
  toJSON() {
    return {
      xstate$$type: $$ACTOR_TYPE,
      id: this.id
    };
  }
  /**
   * Obtain the internal state of the actor, which can be persisted.
   *
   * @remarks
   * The internal state can be persisted from any actor, not only machines.
   *
   * Note that the persisted state is not the same as the snapshot from
   * {@link Actor.getSnapshot}. Persisted state represents the internal state of
   * the actor, while snapshots represent the actor's last emitted value.
   *
   * Can be restored with {@link ActorOptions.state}
   * @see https://stately.ai/docs/persistence
   */
  getPersistedSnapshot(options) {
    return this.logic.getPersistedSnapshot(this._snapshot, options);
  }
  [symbolObservable]() {
    return this;
  }
  /**
   * Read an actor’s snapshot synchronously.
   *
   * @remarks
   * The snapshot represent an actor's last emitted value.
   *
   * When an actor receives an event, its internal state may change. An actor
   * may emit a snapshot when a state transition occurs.
   *
   * Note that some actors, such as callback actors generated with
   * `fromCallback`, will not emit snapshots.
   * @see {@link Actor.subscribe} to subscribe to an actor’s snapshot values.
   * @see {@link Actor.getPersistedSnapshot} to persist the internal state of an actor (which is more than just a snapshot).
   */
  getSnapshot() {
    if (!this._snapshot) {
      throw new Error(`Snapshot can't be read while the actor initializes itself`);
    }
    return this._snapshot;
  }
};
function createActor(logic, ...[options]) {
  return new Actor(logic, options);
}
function resolveCancel(_, snapshot, actionArgs, actionParams, {
  sendId
}) {
  const resolvedSendId = typeof sendId === "function" ? sendId(actionArgs, actionParams) : sendId;
  return [snapshot, {
    sendId: resolvedSendId
  }, void 0];
}
function executeCancel(actorScope, params) {
  actorScope.defer(() => {
    actorScope.system.scheduler.cancel(actorScope.self, params.sendId);
  });
}
function cancel(sendId) {
  function cancel2(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  cancel2.type = "xstate.cancel";
  cancel2.sendId = sendId;
  cancel2.resolve = resolveCancel;
  cancel2.execute = executeCancel;
  return cancel2;
}
function resolveSpawn(actorScope, snapshot, actionArgs, _actionParams, {
  id: id2,
  systemId,
  src,
  input,
  syncSnapshot
}) {
  const logic = typeof src === "string" ? resolveReferencedActor(snapshot.machine, src) : src;
  const resolvedId = typeof id2 === "function" ? id2(actionArgs) : id2;
  let actorRef;
  let resolvedInput = void 0;
  if (logic) {
    resolvedInput = typeof input === "function" ? input({
      context: snapshot.context,
      event: actionArgs.event,
      self: actorScope.self
    }) : input;
    actorRef = createActor(logic, {
      id: resolvedId,
      src,
      parent: actorScope.self,
      syncSnapshot,
      systemId,
      input: resolvedInput
    });
  }
  if (!actorRef) {
    console.warn(
      // oxlint-disable-next-line typescript/restrict-template-expressions,typescript/no-base-to-string
      `Actor type '${src}' not found in machine '${actorScope.id}'.`
    );
  }
  return [cloneMachineSnapshot(snapshot, {
    children: {
      ...snapshot.children,
      [resolvedId]: actorRef
    }
  }), {
    id: id2,
    systemId,
    actorRef,
    src,
    input: resolvedInput
  }, void 0];
}
function executeSpawn(actorScope, {
  actorRef
}) {
  if (!actorRef) {
    return;
  }
  actorScope.defer(() => {
    if (actorRef._processingStatus === ProcessingStatus.Stopped) {
      return;
    }
    actorRef.start();
  });
}
function spawnChild(...[src, {
  id: id2,
  systemId,
  input,
  syncSnapshot = false
} = {}]) {
  function spawnChild2(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  spawnChild2.type = "xstate.spawnChild";
  spawnChild2.id = id2;
  spawnChild2.systemId = systemId;
  spawnChild2.src = src;
  spawnChild2.input = input;
  spawnChild2.syncSnapshot = syncSnapshot;
  spawnChild2.resolve = resolveSpawn;
  spawnChild2.execute = executeSpawn;
  return spawnChild2;
}
function resolveStop(_, snapshot, args, actionParams, {
  actorRef
}) {
  const actorRefOrString = typeof actorRef === "function" ? actorRef(args, actionParams) : actorRef;
  const resolvedActorRef = typeof actorRefOrString === "string" ? snapshot.children[actorRefOrString] : actorRefOrString;
  let children = snapshot.children;
  if (resolvedActorRef) {
    children = {
      ...children
    };
    delete children[resolvedActorRef.id];
  }
  return [cloneMachineSnapshot(snapshot, {
    children
  }), resolvedActorRef, void 0];
}
function unregisterRecursively(actorScope, actorRef) {
  const snapshot = actorRef.getSnapshot();
  if (snapshot && "children" in snapshot) {
    for (const child of Object.values(snapshot.children)) {
      unregisterRecursively(actorScope, child);
    }
  }
  actorScope.system._unregister(actorRef);
}
function executeStop(actorScope, actorRef) {
  if (!actorRef) {
    return;
  }
  unregisterRecursively(actorScope, actorRef);
  if (actorRef._processingStatus !== ProcessingStatus.Running) {
    actorScope.stopChild(actorRef);
    return;
  }
  actorScope.defer(() => {
    actorScope.stopChild(actorRef);
  });
}
function stopChild(actorRef) {
  function stop2(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  stop2.type = "xstate.stopChild";
  stop2.actorRef = actorRef;
  stop2.resolve = resolveStop;
  stop2.execute = executeStop;
  return stop2;
}
function checkAnd(snapshot, {
  context,
  event
}, {
  guards
}) {
  return guards.every((guard) => evaluateGuard(guard, context, event, snapshot));
}
function and(guards) {
  function and2(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  and2.check = checkAnd;
  and2.guards = guards;
  return and2;
}
function evaluateGuard(guard, context, event, snapshot) {
  const {
    machine
  } = snapshot;
  const isInline = typeof guard === "function";
  const resolved = isInline ? guard : machine.implementations.guards[typeof guard === "string" ? guard : guard.type];
  if (!isInline && !resolved) {
    throw new Error(`Guard '${typeof guard === "string" ? guard : guard.type}' is not implemented.'.`);
  }
  if (typeof resolved !== "function") {
    return evaluateGuard(resolved, context, event, snapshot);
  }
  const guardArgs = {
    context,
    event
  };
  const guardParams = isInline || typeof guard === "string" ? void 0 : "params" in guard ? typeof guard.params === "function" ? guard.params({
    context,
    event
  }) : guard.params : void 0;
  if (!("check" in resolved)) {
    return resolved(guardArgs, guardParams);
  }
  const builtinGuard = resolved;
  return builtinGuard.check(
    snapshot,
    guardArgs,
    resolved
    // this holds all params
  );
}
function isAtomicStateNode(stateNode) {
  return stateNode.type === "atomic" || stateNode.type === "final";
}
function getChildren(stateNode) {
  return Object.values(stateNode.states).filter((sn) => sn.type !== "history");
}
function getProperAncestors(stateNode, toStateNode) {
  const ancestors = [];
  if (toStateNode === stateNode) {
    return ancestors;
  }
  let m2 = stateNode.parent;
  while (m2 && m2 !== toStateNode) {
    ancestors.push(m2);
    m2 = m2.parent;
  }
  return ancestors;
}
function getAllStateNodes(stateNodes) {
  const nodeSet = new Set(stateNodes);
  const adjList = getAdjList(nodeSet);
  for (const s of nodeSet) {
    if (s.type === "compound" && (!adjList.get(s) || !adjList.get(s).length)) {
      getInitialStateNodesWithTheirAncestors(s).forEach((sn) => nodeSet.add(sn));
    } else {
      if (s.type === "parallel") {
        for (const child of getChildren(s)) {
          if (child.type === "history") {
            continue;
          }
          if (!nodeSet.has(child)) {
            const initialStates = getInitialStateNodesWithTheirAncestors(child);
            for (const initialStateNode of initialStates) {
              nodeSet.add(initialStateNode);
            }
          }
        }
      }
    }
  }
  for (const s of nodeSet) {
    let m2 = s.parent;
    while (m2) {
      nodeSet.add(m2);
      m2 = m2.parent;
    }
  }
  return nodeSet;
}
function getValueFromAdj(baseNode, adjList) {
  const childStateNodes = adjList.get(baseNode);
  if (!childStateNodes) {
    return {};
  }
  if (baseNode.type === "compound") {
    const childStateNode = childStateNodes[0];
    if (childStateNode) {
      if (isAtomicStateNode(childStateNode)) {
        return childStateNode.key;
      }
    } else {
      return {};
    }
  }
  const stateValue = {};
  for (const childStateNode of childStateNodes) {
    stateValue[childStateNode.key] = getValueFromAdj(childStateNode, adjList);
  }
  return stateValue;
}
function getAdjList(stateNodes) {
  const adjList = /* @__PURE__ */ new Map();
  for (const s of stateNodes) {
    if (!adjList.has(s)) {
      adjList.set(s, []);
    }
    if (s.parent) {
      if (!adjList.has(s.parent)) {
        adjList.set(s.parent, []);
      }
      adjList.get(s.parent).push(s);
    }
  }
  return adjList;
}
function getStateValue(rootNode, stateNodes) {
  const config = getAllStateNodes(stateNodes);
  return getValueFromAdj(rootNode, getAdjList(config));
}
function isInFinalState(stateNodeSet, stateNode) {
  if (stateNode.type === "compound") {
    return getChildren(stateNode).some((s) => s.type === "final" && stateNodeSet.has(s));
  }
  if (stateNode.type === "parallel") {
    return getChildren(stateNode).every((sn) => isInFinalState(stateNodeSet, sn));
  }
  return stateNode.type === "final";
}
var isStateId = (str) => str[0] === STATE_IDENTIFIER;
function getCandidates(stateNode, receivedEventType) {
  const exactMatch = stateNode.transitions.get(receivedEventType);
  const wildcardCandidates = [...stateNode.transitions.keys()].filter((eventDescriptor) => eventDescriptor !== receivedEventType && matchesEventDescriptor(receivedEventType, eventDescriptor)).sort((a, b) => b.length - a.length).flatMap((key) => stateNode.transitions.get(key));
  return exactMatch ? [...exactMatch, ...wildcardCandidates] : wildcardCandidates;
}
function getDelayedTransitions(stateNode) {
  const afterConfig = stateNode.config.after;
  if (!afterConfig) {
    return [];
  }
  const mutateEntryExit = (delay) => {
    const afterEvent = createAfterEvent(delay, stateNode.id);
    const eventType = afterEvent.type;
    stateNode.entry.push(raise(afterEvent, {
      id: eventType,
      delay
    }));
    stateNode.exit.push(cancel(eventType));
    return eventType;
  };
  const delayedTransitions = Object.keys(afterConfig).flatMap((delay) => {
    const configTransition = afterConfig[delay];
    const resolvedTransition = typeof configTransition === "string" ? {
      target: configTransition
    } : configTransition;
    const resolvedDelay = Number.isNaN(+delay) ? delay : +delay;
    const eventType = mutateEntryExit(resolvedDelay);
    return toArray(resolvedTransition).map((transition) => ({
      ...transition,
      event: eventType,
      delay: resolvedDelay
    }));
  });
  return delayedTransitions.map((delayedTransition) => {
    const {
      delay
    } = delayedTransition;
    return {
      ...formatTransition(stateNode, delayedTransition.event, delayedTransition),
      delay
    };
  });
}
function formatTransition(stateNode, descriptor, transitionConfig) {
  const normalizedTarget = normalizeTarget(transitionConfig.target);
  const reenter = transitionConfig.reenter ?? false;
  const target = resolveTarget(stateNode, normalizedTarget);
  if (transitionConfig.cond) {
    throw new Error(`State "${stateNode.id}" has declared \`cond\` for one of its transitions. This property has been renamed to \`guard\`. Please update your code.`);
  }
  const transition = {
    ...transitionConfig,
    actions: toArray(transitionConfig.actions),
    guard: transitionConfig.guard,
    target,
    source: stateNode,
    reenter,
    eventType: descriptor,
    toJSON: () => ({
      ...transition,
      source: `#${stateNode.id}`,
      target: target ? target.map((t) => `#${t.id}`) : void 0
    })
  };
  return transition;
}
function formatTransitions(stateNode) {
  const transitions = /* @__PURE__ */ new Map();
  if (stateNode.config.on) {
    for (const descriptor of Object.keys(stateNode.config.on)) {
      if (descriptor === NULL_EVENT) {
        throw new Error('Null events ("") cannot be specified as a transition key. Use `always: { ... }` instead.');
      }
      const transitionsConfig = stateNode.config.on[descriptor];
      transitions.set(descriptor, toTransitionConfigArray(transitionsConfig).map((t) => formatTransition(stateNode, descriptor, t)));
    }
  }
  if (stateNode.config.onDone) {
    const descriptor = `xstate.done.state.${stateNode.id}`;
    transitions.set(descriptor, toTransitionConfigArray(stateNode.config.onDone).map((t) => formatTransition(stateNode, descriptor, t)));
  }
  for (const invokeDef of stateNode.invoke) {
    if (invokeDef.onDone) {
      const descriptor = `xstate.done.actor.${invokeDef.id}`;
      transitions.set(descriptor, toTransitionConfigArray(invokeDef.onDone).map((t) => formatTransition(stateNode, descriptor, t)));
    }
    if (invokeDef.onError) {
      const descriptor = `xstate.error.actor.${invokeDef.id}`;
      transitions.set(descriptor, toTransitionConfigArray(invokeDef.onError).map((t) => formatTransition(stateNode, descriptor, t)));
    }
    if (invokeDef.onSnapshot) {
      const descriptor = `xstate.snapshot.${invokeDef.id}`;
      transitions.set(descriptor, toTransitionConfigArray(invokeDef.onSnapshot).map((t) => formatTransition(stateNode, descriptor, t)));
    }
  }
  for (const delayedTransition of stateNode.after) {
    let existing = transitions.get(delayedTransition.eventType);
    if (!existing) {
      existing = [];
      transitions.set(delayedTransition.eventType, existing);
    }
    existing.push(delayedTransition);
  }
  return transitions;
}
function formatRouteTransitions(rootStateNode) {
  const routeTransitions = [];
  const collectRoutes = (states) => {
    Object.values(states).forEach((sn) => {
      if (sn.config.route && sn.config.id) {
        const routeId = sn.config.id;
        const userGuard = sn.config.route.guard;
        const routeMatches = ({
          event
        }) => event.to === `#${routeId}`;
        const transition = {
          ...sn.config.route,
          guard: userGuard ? and([routeMatches, userGuard]) : routeMatches,
          target: `#${routeId}`
        };
        routeTransitions.push(formatTransition(rootStateNode, "xstate.route", transition));
      }
      if (sn.states) {
        collectRoutes(sn.states);
      }
    });
  };
  collectRoutes(rootStateNode.states);
  if (routeTransitions.length > 0) {
    rootStateNode.transitions.set("xstate.route", routeTransitions);
  }
}
function formatInitialTransition(stateNode, _target) {
  const resolvedTarget = typeof _target === "string" ? stateNode.states[_target] : _target ? stateNode.states[_target.target] : void 0;
  if (!resolvedTarget && _target) {
    throw new Error(
      // oxlint-disable-next-line typescript/restrict-template-expressions, typescript/no-base-to-string
      `Initial state node "${_target}" not found on parent state node #${stateNode.id}`
    );
  }
  const transition = {
    source: stateNode,
    actions: !_target || typeof _target === "string" ? [] : toArray(_target.actions),
    eventType: null,
    reenter: false,
    target: resolvedTarget ? [resolvedTarget] : [],
    meta: typeof _target === "object" ? _target.meta : void 0,
    description: typeof _target === "object" ? _target.description : void 0,
    toJSON: () => ({
      ...transition,
      source: `#${stateNode.id}`,
      target: resolvedTarget ? [`#${resolvedTarget.id}`] : []
    })
  };
  return transition;
}
function resolveTarget(stateNode, targets) {
  if (targets === void 0) {
    return void 0;
  }
  return targets.map((target) => {
    if (typeof target !== "string") {
      return target;
    }
    if (isStateId(target)) {
      return stateNode.machine.getStateNodeById(target);
    }
    const isInternalTarget = target[0] === STATE_DELIMITER;
    if (isInternalTarget && !stateNode.parent) {
      return getStateNodeByPath(stateNode, target.slice(1));
    }
    const resolvedTarget = isInternalTarget ? stateNode.key + target : target;
    if (stateNode.parent) {
      try {
        const targetStateNode = getStateNodeByPath(stateNode.parent, resolvedTarget);
        return targetStateNode;
      } catch (err) {
        throw new Error(`Invalid transition definition for state node '${stateNode.id}':
${err.message}`);
      }
    } else {
      throw new Error(`Invalid target: "${target}" is not a valid target from the root node. Did you mean ".${target}"?`);
    }
  });
}
function resolveHistoryDefaultTransition(stateNode) {
  const normalizedTarget = normalizeTarget(stateNode.config.target);
  if (!normalizedTarget) {
    if (stateNode.parent.type === "parallel") {
      return {
        target: [stateNode.parent]
      };
    }
    return stateNode.parent.initial;
  }
  return {
    target: normalizedTarget.map((t) => typeof t === "string" ? getStateNodeByPath(stateNode.parent, t) : t)
  };
}
function isHistoryNode(stateNode) {
  return stateNode.type === "history";
}
function getInitialStateNodesWithTheirAncestors(stateNode) {
  const states = getInitialStateNodes(stateNode);
  for (const initialState of states) {
    for (const ancestor of getProperAncestors(initialState, stateNode)) {
      states.add(ancestor);
    }
  }
  return states;
}
function getInitialStateNodes(stateNode) {
  const set4 = /* @__PURE__ */ new Set();
  function iter(descStateNode) {
    if (set4.has(descStateNode)) {
      return;
    }
    set4.add(descStateNode);
    if (descStateNode.type === "compound") {
      iter(descStateNode.initial.target[0]);
    } else if (descStateNode.type === "parallel") {
      for (const child of getChildren(descStateNode)) {
        iter(child);
      }
    }
  }
  iter(stateNode);
  return set4;
}
function getStateNode(stateNode, stateKey) {
  if (isStateId(stateKey)) {
    return stateNode.machine.getStateNodeById(stateKey);
  }
  if (!stateNode.states) {
    throw new Error(`Unable to retrieve child state '${stateKey}' from '${stateNode.id}'; no child states exist.`);
  }
  const result = stateNode.states[stateKey];
  if (!result) {
    throw new Error(`Child state '${stateKey}' does not exist on '${stateNode.id}'`);
  }
  return result;
}
function getStateNodeByPath(stateNode, statePath) {
  if (typeof statePath === "string" && isStateId(statePath)) {
    try {
      return stateNode.machine.getStateNodeById(statePath);
    } catch {
    }
  }
  const arrayStatePath = toStatePath(statePath).slice();
  let currentStateNode = stateNode;
  while (arrayStatePath.length) {
    const key = arrayStatePath.shift();
    if (!key.length) {
      break;
    }
    currentStateNode = getStateNode(currentStateNode, key);
  }
  return currentStateNode;
}
function getStateNodes(stateNode, stateValue) {
  if (typeof stateValue === "string") {
    const childStateNode = stateNode.states[stateValue];
    if (!childStateNode) {
      throw new Error(`State '${stateValue}' does not exist on '${stateNode.id}'`);
    }
    return [stateNode, childStateNode];
  }
  const childStateKeys = Object.keys(stateValue);
  const childStateNodes = childStateKeys.map((subStateKey) => getStateNode(stateNode, subStateKey)).filter(Boolean);
  return [stateNode.machine.root, stateNode].concat(childStateNodes, childStateKeys.reduce((allSubStateNodes, subStateKey) => {
    const subStateNode = getStateNode(stateNode, subStateKey);
    if (!subStateNode) {
      return allSubStateNodes;
    }
    const subStateNodes = getStateNodes(subStateNode, stateValue[subStateKey]);
    return allSubStateNodes.concat(subStateNodes);
  }, []));
}
function transitionAtomicNode(stateNode, stateValue, snapshot, event) {
  const childStateNode = getStateNode(stateNode, stateValue);
  const next = childStateNode.next(snapshot, event);
  if (!next || !next.length) {
    return stateNode.next(snapshot, event);
  }
  return next;
}
function transitionCompoundNode(stateNode, stateValue, snapshot, event) {
  const subStateKeys = Object.keys(stateValue);
  const childStateNode = getStateNode(stateNode, subStateKeys[0]);
  const next = transitionNode(childStateNode, stateValue[subStateKeys[0]], snapshot, event);
  if (!next || !next.length) {
    return stateNode.next(snapshot, event);
  }
  return next;
}
function transitionParallelNode(stateNode, stateValue, snapshot, event) {
  const allInnerTransitions = [];
  for (const subStateKey of Object.keys(stateValue)) {
    const subStateValue = stateValue[subStateKey];
    if (!subStateValue) {
      continue;
    }
    const subStateNode = getStateNode(stateNode, subStateKey);
    const innerTransitions = transitionNode(subStateNode, subStateValue, snapshot, event);
    if (innerTransitions) {
      allInnerTransitions.push(...innerTransitions);
    }
  }
  if (!allInnerTransitions.length) {
    return stateNode.next(snapshot, event);
  }
  return allInnerTransitions;
}
function transitionNode(stateNode, stateValue, snapshot, event) {
  if (typeof stateValue === "string") {
    return transitionAtomicNode(stateNode, stateValue, snapshot, event);
  }
  if (Object.keys(stateValue).length === 1) {
    return transitionCompoundNode(stateNode, stateValue, snapshot, event);
  }
  return transitionParallelNode(stateNode, stateValue, snapshot, event);
}
function getHistoryNodes(stateNode) {
  return Object.keys(stateNode.states).map((key) => stateNode.states[key]).filter((sn) => sn.type === "history");
}
function isDescendant(childStateNode, parentStateNode) {
  let marker = childStateNode;
  while (marker.parent && marker.parent !== parentStateNode) {
    marker = marker.parent;
  }
  return marker.parent === parentStateNode;
}
function hasIntersection(s1, s2) {
  const set1 = new Set(s1);
  const set22 = new Set(s2);
  for (const item of set1) {
    if (set22.has(item)) {
      return true;
    }
  }
  for (const item of set22) {
    if (set1.has(item)) {
      return true;
    }
  }
  return false;
}
function removeConflictingTransitions(enabledTransitions, stateNodeSet, historyValue) {
  const filteredTransitions = /* @__PURE__ */ new Set();
  for (const t1 of enabledTransitions) {
    let t1Preempted = false;
    const transitionsToRemove = /* @__PURE__ */ new Set();
    for (const t2 of filteredTransitions) {
      if (hasIntersection(computeExitSet([t1], stateNodeSet, historyValue), computeExitSet([t2], stateNodeSet, historyValue))) {
        if (isDescendant(t1.source, t2.source)) {
          transitionsToRemove.add(t2);
        } else {
          t1Preempted = true;
          break;
        }
      }
    }
    if (!t1Preempted) {
      for (const t3 of transitionsToRemove) {
        filteredTransitions.delete(t3);
      }
      filteredTransitions.add(t1);
    }
  }
  return Array.from(filteredTransitions);
}
function findLeastCommonAncestor(stateNodes) {
  const [head, ...tail] = stateNodes;
  for (const ancestor of getProperAncestors(head, void 0)) {
    if (tail.every((sn) => isDescendant(sn, ancestor))) {
      return ancestor;
    }
  }
}
function getEffectiveTargetStates(transition, historyValue) {
  if (!transition.target) {
    return [];
  }
  const targets = /* @__PURE__ */ new Set();
  for (const targetNode of transition.target) {
    if (isHistoryNode(targetNode)) {
      if (historyValue[targetNode.id]) {
        for (const node of historyValue[targetNode.id]) {
          targets.add(node);
        }
      } else {
        for (const node of getEffectiveTargetStates(resolveHistoryDefaultTransition(targetNode), historyValue)) {
          targets.add(node);
        }
      }
    } else {
      targets.add(targetNode);
    }
  }
  return [...targets];
}
function getTransitionDomain(transition, historyValue) {
  const targetStates = getEffectiveTargetStates(transition, historyValue);
  if (!targetStates) {
    return;
  }
  if (!transition.reenter && targetStates.every((target) => target === transition.source || isDescendant(target, transition.source))) {
    return transition.source;
  }
  const lca = findLeastCommonAncestor(targetStates.concat(transition.source));
  if (lca) {
    return lca;
  }
  if (transition.reenter) {
    return;
  }
  return transition.source.machine.root;
}
function computeExitSet(transitions, stateNodeSet, historyValue) {
  const statesToExit = /* @__PURE__ */ new Set();
  for (const t of transitions) {
    if (t.target?.length) {
      const domain = getTransitionDomain(t, historyValue);
      if (t.reenter && t.source === domain) {
        statesToExit.add(domain);
      }
      for (const stateNode of stateNodeSet) {
        if (isDescendant(stateNode, domain)) {
          statesToExit.add(stateNode);
        }
      }
    }
  }
  return [...statesToExit];
}
function areStateNodeCollectionsEqual(prevStateNodes, nextStateNodeSet) {
  if (prevStateNodes.length !== nextStateNodeSet.size) {
    return false;
  }
  for (const node of prevStateNodes) {
    if (!nextStateNodeSet.has(node)) {
      return false;
    }
  }
  return true;
}
function initialMicrostep(root, preInitialState, actorScope, initEvent, internalQueue) {
  return microstep([{
    target: [...getInitialStateNodes(root)],
    source: root,
    reenter: true,
    actions: [],
    eventType: null,
    toJSON: null
  }], preInitialState, actorScope, initEvent, true, internalQueue);
}
function microstep(transitions, currentSnapshot, actorScope, event, isInitial, internalQueue) {
  const actions = [];
  if (!transitions.length) {
    return [currentSnapshot, actions];
  }
  const originalExecutor = actorScope.actionExecutor;
  actorScope.actionExecutor = (action) => {
    actions.push(action);
    originalExecutor(action);
  };
  try {
    const mutStateNodeSet = new Set(currentSnapshot._nodes);
    let historyValue = currentSnapshot.historyValue;
    const filteredTransitions = removeConflictingTransitions(transitions, mutStateNodeSet, historyValue);
    let nextState = currentSnapshot;
    if (!isInitial) {
      [nextState, historyValue] = exitStates(nextState, event, actorScope, filteredTransitions, mutStateNodeSet, historyValue, internalQueue, actorScope.actionExecutor);
    }
    nextState = resolveActionsAndContext(nextState, event, actorScope, filteredTransitions.flatMap((t) => t.actions), internalQueue, void 0);
    nextState = enterStates(nextState, event, actorScope, filteredTransitions, mutStateNodeSet, internalQueue, historyValue, isInitial);
    const nextStateNodes = [...mutStateNodeSet];
    if (nextState.status === "done") {
      nextState = resolveActionsAndContext(nextState, event, actorScope, nextStateNodes.sort((a, b) => b.order - a.order).flatMap((state) => state.exit), internalQueue, void 0);
    }
    try {
      if (historyValue === currentSnapshot.historyValue && areStateNodeCollectionsEqual(currentSnapshot._nodes, mutStateNodeSet)) {
        return [nextState, actions];
      }
      return [cloneMachineSnapshot(nextState, {
        _nodes: nextStateNodes,
        historyValue
      }), actions];
    } catch (e) {
      throw e;
    }
  } finally {
    actorScope.actionExecutor = originalExecutor;
  }
}
function getMachineOutput(snapshot, event, actorScope, rootNode, rootCompletionNode) {
  if (rootNode.output === void 0) {
    return;
  }
  const doneStateEvent = createDoneStateEvent(rootCompletionNode.id, rootCompletionNode.output !== void 0 && rootCompletionNode.parent ? resolveOutput(rootCompletionNode.output, snapshot.context, event, actorScope.self) : void 0);
  return resolveOutput(rootNode.output, snapshot.context, doneStateEvent, actorScope.self);
}
function enterStates(currentSnapshot, event, actorScope, filteredTransitions, mutStateNodeSet, internalQueue, historyValue, isInitial) {
  let nextSnapshot = currentSnapshot;
  const statesToEnter = /* @__PURE__ */ new Set();
  const statesForDefaultEntry = /* @__PURE__ */ new Set();
  computeEntrySet(filteredTransitions, historyValue, statesForDefaultEntry, statesToEnter);
  if (isInitial) {
    statesForDefaultEntry.add(currentSnapshot.machine.root);
  }
  const completedNodes = /* @__PURE__ */ new Set();
  for (const stateNodeToEnter of [...statesToEnter].sort((a, b) => a.order - b.order)) {
    mutStateNodeSet.add(stateNodeToEnter);
    const actions = [];
    actions.push(...stateNodeToEnter.entry);
    for (const invokeDef of stateNodeToEnter.invoke) {
      actions.push(spawnChild(invokeDef.src, {
        ...invokeDef,
        syncSnapshot: !!invokeDef.onSnapshot
      }));
    }
    if (statesForDefaultEntry.has(stateNodeToEnter)) {
      const initialActions = stateNodeToEnter.initial.actions;
      actions.push(...initialActions);
    }
    nextSnapshot = resolveActionsAndContext(nextSnapshot, event, actorScope, actions, internalQueue, stateNodeToEnter.invoke.map((invokeDef) => invokeDef.id));
    if (stateNodeToEnter.type === "final") {
      const parent = stateNodeToEnter.parent;
      let ancestorMarker = parent?.type === "parallel" ? parent : parent?.parent;
      let rootCompletionNode = ancestorMarker || stateNodeToEnter;
      if (parent?.type === "compound") {
        internalQueue.push(createDoneStateEvent(parent.id, stateNodeToEnter.output !== void 0 ? resolveOutput(stateNodeToEnter.output, nextSnapshot.context, event, actorScope.self) : void 0));
      }
      while (ancestorMarker?.type === "parallel" && !completedNodes.has(ancestorMarker) && isInFinalState(mutStateNodeSet, ancestorMarker)) {
        completedNodes.add(ancestorMarker);
        internalQueue.push(createDoneStateEvent(ancestorMarker.id));
        rootCompletionNode = ancestorMarker;
        ancestorMarker = ancestorMarker.parent;
      }
      if (ancestorMarker) {
        continue;
      }
      nextSnapshot = cloneMachineSnapshot(nextSnapshot, {
        status: "done",
        output: getMachineOutput(nextSnapshot, event, actorScope, nextSnapshot.machine.root, rootCompletionNode)
      });
    }
  }
  return nextSnapshot;
}
function computeEntrySet(transitions, historyValue, statesForDefaultEntry, statesToEnter) {
  for (const t of transitions) {
    const domain = getTransitionDomain(t, historyValue);
    for (const s of t.target || []) {
      if (!isHistoryNode(s) && // if the target is different than the source then it will *definitely* be entered
      (t.source !== s || // we know that the domain can't lie within the source
      // if it's different than the source then it's outside of it and it means that the target has to be entered as well
      t.source !== domain || // reentering transitions always enter the target, even if it's the source itself
      t.reenter)) {
        statesToEnter.add(s);
        statesForDefaultEntry.add(s);
      }
      addDescendantStatesToEnter(s, historyValue, statesForDefaultEntry, statesToEnter);
    }
    const targetStates = getEffectiveTargetStates(t, historyValue);
    for (const s of targetStates) {
      const ancestors = getProperAncestors(s, domain);
      if (domain?.type === "parallel") {
        ancestors.push(domain);
      }
      addAncestorStatesToEnter(statesToEnter, historyValue, statesForDefaultEntry, ancestors, !t.source.parent && t.reenter ? void 0 : domain);
    }
  }
}
function addDescendantStatesToEnter(stateNode, historyValue, statesForDefaultEntry, statesToEnter) {
  if (isHistoryNode(stateNode)) {
    if (historyValue[stateNode.id]) {
      const historyStateNodes = historyValue[stateNode.id];
      for (const s of historyStateNodes) {
        statesToEnter.add(s);
        addDescendantStatesToEnter(s, historyValue, statesForDefaultEntry, statesToEnter);
      }
      for (const s of historyStateNodes) {
        addProperAncestorStatesToEnter(s, stateNode.parent, statesToEnter, historyValue, statesForDefaultEntry);
      }
    } else {
      const historyDefaultTransition = resolveHistoryDefaultTransition(stateNode);
      for (const s of historyDefaultTransition.target) {
        statesToEnter.add(s);
        if (historyDefaultTransition === stateNode.parent?.initial) {
          statesForDefaultEntry.add(stateNode.parent);
        }
        addDescendantStatesToEnter(s, historyValue, statesForDefaultEntry, statesToEnter);
      }
      for (const s of historyDefaultTransition.target) {
        addProperAncestorStatesToEnter(s, stateNode.parent, statesToEnter, historyValue, statesForDefaultEntry);
      }
    }
  } else {
    if (stateNode.type === "compound") {
      const [initialState] = stateNode.initial.target;
      if (!isHistoryNode(initialState)) {
        statesToEnter.add(initialState);
        statesForDefaultEntry.add(initialState);
      }
      addDescendantStatesToEnter(initialState, historyValue, statesForDefaultEntry, statesToEnter);
      addProperAncestorStatesToEnter(initialState, stateNode, statesToEnter, historyValue, statesForDefaultEntry);
    } else {
      if (stateNode.type === "parallel") {
        for (const child of getChildren(stateNode).filter((sn) => !isHistoryNode(sn))) {
          if (![...statesToEnter].some((s) => isDescendant(s, child))) {
            if (!isHistoryNode(child)) {
              statesToEnter.add(child);
              statesForDefaultEntry.add(child);
            }
            addDescendantStatesToEnter(child, historyValue, statesForDefaultEntry, statesToEnter);
          }
        }
      }
    }
  }
}
function addAncestorStatesToEnter(statesToEnter, historyValue, statesForDefaultEntry, ancestors, reentrancyDomain) {
  for (const anc of ancestors) {
    if (!reentrancyDomain || isDescendant(anc, reentrancyDomain)) {
      statesToEnter.add(anc);
    }
    if (anc.type === "parallel") {
      for (const child of getChildren(anc).filter((sn) => !isHistoryNode(sn))) {
        if (![...statesToEnter].some((s) => isDescendant(s, child))) {
          statesToEnter.add(child);
          addDescendantStatesToEnter(child, historyValue, statesForDefaultEntry, statesToEnter);
        }
      }
    }
  }
}
function addProperAncestorStatesToEnter(stateNode, toStateNode, statesToEnter, historyValue, statesForDefaultEntry) {
  addAncestorStatesToEnter(statesToEnter, historyValue, statesForDefaultEntry, getProperAncestors(stateNode, toStateNode));
}
function exitStates(currentSnapshot, event, actorScope, transitions, mutStateNodeSet, historyValue, internalQueue, _actionExecutor) {
  let nextSnapshot = currentSnapshot;
  const statesToExit = computeExitSet(transitions, mutStateNodeSet, historyValue);
  statesToExit.sort((a, b) => b.order - a.order);
  let changedHistory;
  for (const exitStateNode of statesToExit) {
    for (const historyNode of getHistoryNodes(exitStateNode)) {
      let predicate;
      if (historyNode.history === "deep") {
        predicate = (sn) => isAtomicStateNode(sn) && isDescendant(sn, exitStateNode);
      } else {
        predicate = (sn) => {
          return sn.parent === exitStateNode;
        };
      }
      changedHistory ??= {
        ...historyValue
      };
      changedHistory[historyNode.id] = Array.from(mutStateNodeSet).filter(predicate);
    }
  }
  for (const s of statesToExit) {
    nextSnapshot = resolveActionsAndContext(nextSnapshot, event, actorScope, [...s.exit, ...s.invoke.map((def) => stopChild(def.id))], internalQueue, void 0);
    mutStateNodeSet.delete(s);
  }
  return [nextSnapshot, changedHistory || historyValue];
}
function getAction(machine, actionType) {
  return machine.implementations.actions[actionType];
}
function resolveAndExecuteActionsWithContext(currentSnapshot, event, actorScope, actions, extra, retries) {
  const {
    machine
  } = currentSnapshot;
  let intermediateSnapshot = currentSnapshot;
  for (const action of actions) {
    const isInline = typeof action === "function";
    const resolvedAction = isInline ? action : (
      // the existing type of `.actions` assumes non-nullable `TExpressionAction`
      // it's fine to cast this here to get a common type and lack of errors in the rest of the code
      // our logic below makes sure that we call those 2 "variants" correctly
      getAction(machine, typeof action === "string" ? action : action.type)
    );
    const actionArgs = {
      context: intermediateSnapshot.context,
      event,
      self: actorScope.self,
      system: actorScope.system
    };
    const actionParams = isInline || typeof action === "string" ? void 0 : "params" in action ? typeof action.params === "function" ? action.params({
      context: intermediateSnapshot.context,
      event
    }) : action.params : void 0;
    if (!resolvedAction || !("resolve" in resolvedAction)) {
      actorScope.actionExecutor({
        type: typeof action === "string" ? action : typeof action === "object" ? action.type : action.name || "(anonymous)",
        info: actionArgs,
        params: actionParams,
        exec: resolvedAction
      });
      continue;
    }
    const builtinAction = resolvedAction;
    const [nextState, params, actions2] = builtinAction.resolve(
      actorScope,
      intermediateSnapshot,
      actionArgs,
      actionParams,
      resolvedAction,
      // this holds all params
      extra
    );
    intermediateSnapshot = nextState;
    if ("retryResolve" in builtinAction) {
      retries?.push([builtinAction, params]);
    }
    if ("execute" in builtinAction) {
      actorScope.actionExecutor({
        type: builtinAction.type,
        info: actionArgs,
        params,
        exec: builtinAction.execute.bind(null, actorScope, params)
      });
    }
    if (actions2) {
      intermediateSnapshot = resolveAndExecuteActionsWithContext(intermediateSnapshot, event, actorScope, actions2, extra, retries);
    }
  }
  return intermediateSnapshot;
}
function resolveActionsAndContext(currentSnapshot, event, actorScope, actions, internalQueue, deferredActorIds) {
  const retries = deferredActorIds ? [] : void 0;
  const nextState = resolveAndExecuteActionsWithContext(currentSnapshot, event, actorScope, actions, {
    internalQueue,
    deferredActorIds
  }, retries);
  retries?.forEach(([builtinAction, params]) => {
    builtinAction.retryResolve(actorScope, nextState, params);
  });
  return nextState;
}
function macrostep(snapshot, event, actorScope, internalQueue) {
  if (event.type === WILDCARD) {
    throw new Error(`An event cannot have the wildcard type ('${WILDCARD}')`);
  }
  let nextSnapshot = snapshot;
  const microsteps = [];
  function addMicrostep(step, event2, transitions) {
    actorScope.system._sendInspectionEvent({
      type: "@xstate.microstep",
      actorRef: actorScope.self,
      event: event2,
      snapshot: step[0],
      _transitions: transitions
    });
    microsteps.push(step);
  }
  if (event.type === XSTATE_STOP) {
    nextSnapshot = cloneMachineSnapshot(stopChildren(nextSnapshot, event, actorScope), {
      status: "stopped"
    });
    addMicrostep([nextSnapshot, []], event, []);
    return {
      snapshot: nextSnapshot,
      microsteps
    };
  }
  let nextEvent = event;
  if (nextEvent.type !== XSTATE_INIT) {
    const currentEvent = nextEvent;
    const isErr = isErrorActorEvent(currentEvent);
    const transitions = selectTransitions(currentEvent, nextSnapshot);
    if (isErr && !transitions.length) {
      nextSnapshot = cloneMachineSnapshot(snapshot, {
        status: "error",
        error: currentEvent.error
      });
      addMicrostep([nextSnapshot, []], currentEvent, []);
      return {
        snapshot: nextSnapshot,
        microsteps
      };
    }
    const step = microstep(
      transitions,
      snapshot,
      actorScope,
      nextEvent,
      false,
      // isInitial
      internalQueue
    );
    nextSnapshot = step[0];
    addMicrostep(step, currentEvent, transitions);
  }
  let shouldSelectEventlessTransitions = true;
  const maxIterations = snapshot.machine.options?.maxIterations ?? Infinity;
  let iterationCount = 0;
  while (nextSnapshot.status === "active") {
    iterationCount++;
    if (iterationCount > maxIterations) {
      throw new Error(`Infinite loop detected: the machine has processed more than ${maxIterations} microsteps without reaching a stable state. This usually happens when there's a cycle of transitions (e.g., eventless transitions or raised events causing state A -> B -> C -> A).`);
    }
    let enabledTransitions = shouldSelectEventlessTransitions ? selectEventlessTransitions(nextSnapshot, nextEvent) : [];
    const previousState = enabledTransitions.length ? nextSnapshot : void 0;
    if (!enabledTransitions.length) {
      if (!internalQueue.length) {
        break;
      }
      nextEvent = internalQueue.shift();
      enabledTransitions = selectTransitions(nextEvent, nextSnapshot);
    }
    const step = microstep(enabledTransitions, nextSnapshot, actorScope, nextEvent, false, internalQueue);
    nextSnapshot = step[0];
    shouldSelectEventlessTransitions = nextSnapshot !== previousState;
    addMicrostep(step, nextEvent, enabledTransitions);
  }
  if (nextSnapshot.status !== "active") {
    stopChildren(nextSnapshot, nextEvent, actorScope);
  }
  return {
    snapshot: nextSnapshot,
    microsteps
  };
}
function stopChildren(nextState, event, actorScope) {
  return resolveActionsAndContext(nextState, event, actorScope, Object.values(nextState.children).map((child) => stopChild(child)), [], void 0);
}
function selectTransitions(event, nextState) {
  return nextState.machine.getTransitionData(nextState, event);
}
function selectEventlessTransitions(nextState, event) {
  const enabledTransitionSet = /* @__PURE__ */ new Set();
  const atomicStates = nextState._nodes.filter(isAtomicStateNode);
  for (const stateNode of atomicStates) {
    loop: for (const s of [stateNode].concat(getProperAncestors(stateNode, void 0))) {
      if (!s.always) {
        continue;
      }
      for (const transition of s.always) {
        if (transition.guard === void 0 || evaluateGuard(transition.guard, nextState.context, event, nextState)) {
          enabledTransitionSet.add(transition);
          break loop;
        }
      }
    }
  }
  return removeConflictingTransitions(Array.from(enabledTransitionSet), new Set(nextState._nodes), nextState.historyValue);
}
function resolveStateValue(rootNode, stateValue) {
  const allStateNodes = getAllStateNodes(getStateNodes(rootNode, stateValue));
  return getStateValue(rootNode, [...allStateNodes]);
}
function isMachineSnapshot(value) {
  return !!value && typeof value === "object" && "machine" in value && "value" in value;
}
var machineSnapshotMatches = function matches(testValue) {
  return matchesState(testValue, this.value);
};
var machineSnapshotHasTag = function hasTag(tag) {
  return this.tags.has(tag);
};
var machineSnapshotCan = function can(event) {
  if (!this.machine) {
    console.warn(`state.can(...) used outside of a machine-created State object; this will always return false.`);
  }
  const transitionData = this.machine.getTransitionData(this, event);
  return !!transitionData?.length && // Check that at least one transition is not forbidden
  transitionData.some((t) => t.target !== void 0 || t.actions.length);
};
var machineSnapshotToJSON = function toJSON() {
  const {
    _nodes: nodes,
    tags,
    machine,
    getMeta: getMeta2,
    toJSON: toJSON2,
    can: can2,
    hasTag: hasTag2,
    matches: matches2,
    ...jsonValues
  } = this;
  return {
    ...jsonValues,
    tags: Array.from(tags)
  };
};
var machineSnapshotGetMeta = function getMeta() {
  return this._nodes.reduce((acc, stateNode) => {
    if (stateNode.meta !== void 0) {
      acc[stateNode.id] = stateNode.meta;
    }
    return acc;
  }, {});
};
function createMachineSnapshot(config, machine) {
  return {
    status: config.status,
    output: config.output,
    error: config.error,
    machine,
    context: config.context,
    _nodes: config._nodes,
    value: getStateValue(machine.root, config._nodes),
    tags: new Set(config._nodes.flatMap((sn) => sn.tags)),
    children: config.children,
    historyValue: config.historyValue || {},
    matches: machineSnapshotMatches,
    hasTag: machineSnapshotHasTag,
    can: machineSnapshotCan,
    getMeta: machineSnapshotGetMeta,
    toJSON: machineSnapshotToJSON
  };
}
function cloneMachineSnapshot(snapshot, config = {}) {
  return createMachineSnapshot({
    ...snapshot,
    ...config
  }, snapshot.machine);
}
function serializeHistoryValue(historyValue) {
  if (typeof historyValue !== "object" || historyValue === null) {
    return {};
  }
  const result = {};
  for (const key in historyValue) {
    const value = historyValue[key];
    if (Array.isArray(value)) {
      result[key] = value.map((item) => ({
        id: item.id
      }));
    }
  }
  return result;
}
function getPersistedSnapshot(snapshot, options) {
  const {
    _nodes: nodes,
    tags,
    machine,
    children,
    context,
    can: can2,
    hasTag: hasTag2,
    matches: matches2,
    getMeta: getMeta2,
    toJSON: toJSON2,
    ...jsonValues
  } = snapshot;
  const childrenJson = {};
  for (const id2 in children) {
    const child = children[id2];
    if (typeof child.src !== "string" && (!options || !("__unsafeAllowInlineActors" in options))) {
      throw new Error("An inline child actor cannot be persisted.");
    }
    childrenJson[id2] = {
      snapshot: child.getPersistedSnapshot(options),
      src: child.src,
      systemId: child.systemId,
      syncSnapshot: child._syncSnapshot
    };
  }
  const persisted = {
    ...jsonValues,
    context: persistContext(context),
    children: childrenJson,
    historyValue: serializeHistoryValue(jsonValues.historyValue)
  };
  return persisted;
}
function persistContext(contextPart) {
  let copy;
  for (const key in contextPart) {
    const value = contextPart[key];
    if (value && typeof value === "object") {
      if ("sessionId" in value && "send" in value && "ref" in value) {
        copy ??= Array.isArray(contextPart) ? contextPart.slice() : {
          ...contextPart
        };
        copy[key] = {
          xstate$$type: $$ACTOR_TYPE,
          id: value.id
        };
      } else {
        const result = persistContext(value);
        if (result !== value) {
          copy ??= Array.isArray(contextPart) ? contextPart.slice() : {
            ...contextPart
          };
          copy[key] = result;
        }
      }
    }
  }
  return copy ?? contextPart;
}
function resolveRaise(_, snapshot, args, actionParams, {
  event: eventOrExpr,
  id: id2,
  delay
}, {
  internalQueue
}) {
  const delaysMap = snapshot.machine.implementations.delays;
  if (typeof eventOrExpr === "string") {
    throw new Error(
      // oxlint-disable-next-line typescript/restrict-template-expressions
      `Only event objects may be used with raise; use raise({ type: "${eventOrExpr}" }) instead`
    );
  }
  const resolvedEvent = typeof eventOrExpr === "function" ? eventOrExpr(args, actionParams) : eventOrExpr;
  let resolvedDelay;
  if (typeof delay === "string") {
    const configDelay = delaysMap && delaysMap[delay];
    resolvedDelay = typeof configDelay === "function" ? configDelay(args, actionParams) : configDelay;
  } else {
    resolvedDelay = typeof delay === "function" ? delay(args, actionParams) : delay;
  }
  if (typeof resolvedDelay !== "number") {
    internalQueue.push(resolvedEvent);
  }
  return [snapshot, {
    event: resolvedEvent,
    id: id2,
    delay: resolvedDelay
  }, void 0];
}
function executeRaise(actorScope, params) {
  const {
    event,
    delay,
    id: id2
  } = params;
  if (typeof delay === "number") {
    actorScope.defer(() => {
      const self2 = actorScope.self;
      actorScope.system.scheduler.schedule(self2, self2, event, delay, id2);
    });
    return;
  }
}
function raise(eventOrExpr, options) {
  if (executingCustomAction) {
    console.warn("Custom actions should not call `raise()` directly, as it is not imperative. See https://stately.ai/docs/actions#built-in-actions for more details.");
  }
  function raise2(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  raise2.type = "xstate.raise";
  raise2.event = eventOrExpr;
  raise2.id = options?.id;
  raise2.delay = options?.delay;
  raise2.resolve = resolveRaise;
  raise2.execute = executeRaise;
  return raise2;
}

// ../../node_modules/.pnpm/xstate@5.33.2/node_modules/xstate/dist/xstate-actors.development.esm.js
function fromTransition(transition, initialContext) {
  return {
    config: transition,
    transition: (snapshot, event, actorScope) => {
      return {
        ...snapshot,
        context: transition(snapshot.context, event, actorScope)
      };
    },
    getInitialSnapshot: (_, input) => {
      return {
        status: "active",
        output: void 0,
        error: void 0,
        context: typeof initialContext === "function" ? initialContext({
          input
        }) : initialContext
      };
    },
    getPersistedSnapshot: (snapshot) => snapshot,
    restoreSnapshot: (snapshot) => snapshot
  };
}
var instanceStates = /* @__PURE__ */ new WeakMap();
function fromCallback(callback) {
  const logic = {
    config: callback,
    start: (state, actorScope) => {
      const {
        self: self2,
        system,
        emit: emit3
      } = actorScope;
      const callbackState = {
        receivers: void 0,
        dispose: void 0
      };
      instanceStates.set(self2, callbackState);
      callbackState.dispose = callback({
        input: state.input,
        system,
        self: self2,
        sendBack: (event) => {
          if (self2.getSnapshot().status === "stopped") {
            return;
          }
          if (self2._parent) {
            system._relay(self2, self2._parent, event);
          }
        },
        receive: (listener) => {
          callbackState.receivers ??= /* @__PURE__ */ new Set();
          callbackState.receivers.add(listener);
        },
        emit: emit3
      });
    },
    transition: (state, event, actorScope) => {
      const callbackState = instanceStates.get(actorScope.self);
      if (event.type === XSTATE_STOP) {
        state = {
          ...state,
          status: "stopped",
          error: void 0
        };
        instanceStates.delete(actorScope.self);
        callbackState.receivers?.clear();
        callbackState.dispose?.();
        return state;
      }
      callbackState.receivers?.forEach((receiver) => receiver(event));
      return state;
    },
    getInitialSnapshot: (_, input) => {
      return {
        status: "active",
        output: void 0,
        error: void 0,
        input
      };
    },
    getPersistedSnapshot: (snapshot) => snapshot,
    restoreSnapshot: (snapshot) => snapshot
  };
  return logic;
}
var XSTATE_OBSERVABLE_ERROR = "xstate.observable.error";
var XSTATE_OBSERVABLE_COMPLETE = "xstate.observable.complete";
function fromEventObservable(lazyObservable) {
  const logic = {
    config: lazyObservable,
    transition: (state, event) => {
      if (state.status !== "active") {
        return state;
      }
      switch (event.type) {
        case XSTATE_OBSERVABLE_ERROR:
          return {
            ...state,
            status: "error",
            error: event.data,
            input: void 0,
            _subscription: void 0
          };
        case XSTATE_OBSERVABLE_COMPLETE:
          return {
            ...state,
            status: "done",
            input: void 0,
            _subscription: void 0
          };
        case XSTATE_STOP:
          state._subscription.unsubscribe();
          return {
            ...state,
            status: "stopped",
            input: void 0,
            _subscription: void 0
          };
        default:
          return state;
      }
    },
    getInitialSnapshot: (_, input) => {
      return {
        status: "active",
        output: void 0,
        error: void 0,
        context: void 0,
        input,
        _subscription: void 0
      };
    },
    start: (state, {
      self: self2,
      system,
      emit: emit3
    }) => {
      if (state.status === "done") {
        return;
      }
      state._subscription = lazyObservable({
        input: state.input,
        system,
        self: self2,
        emit: emit3
      }).subscribe({
        next: (value) => {
          if (self2._parent) {
            system._relay(self2, self2._parent, value);
          }
        },
        error: (err) => {
          system._relay(self2, self2, {
            type: XSTATE_OBSERVABLE_ERROR,
            data: err
          });
        },
        complete: () => {
          system._relay(self2, self2, {
            type: XSTATE_OBSERVABLE_COMPLETE
          });
        }
      });
    },
    getPersistedSnapshot: ({
      _subscription,
      ...snapshot
    }) => snapshot,
    restoreSnapshot: (snapshot) => ({
      ...snapshot,
      _subscription: void 0
    })
  };
  return logic;
}
var emptyLogic = fromTransition((_) => void 0, void 0);

// ../../node_modules/.pnpm/xstate@5.33.2/node_modules/xstate/dist/assign-08205f93.development.esm.js
function createSpawner(actorScope, {
  machine,
  context
}, event, spawnedChildren) {
  const spawn = (src, options) => {
    if (typeof src === "string") {
      const logic = resolveReferencedActor(machine, src);
      if (!logic) {
        throw new Error(`Actor logic '${src}' not implemented in machine '${machine.id}'`);
      }
      const actorRef = createActor(logic, {
        id: options?.id,
        parent: actorScope.self,
        syncSnapshot: options?.syncSnapshot,
        input: typeof options?.input === "function" ? options.input({
          context,
          event,
          self: actorScope.self
        }) : options?.input,
        src,
        systemId: options?.systemId
      });
      spawnedChildren[actorRef.id] = actorRef;
      return actorRef;
    } else {
      const actorRef = createActor(src, {
        id: options?.id,
        parent: actorScope.self,
        syncSnapshot: options?.syncSnapshot,
        input: options?.input,
        src,
        systemId: options?.systemId
      });
      return actorRef;
    }
  };
  return (src, options) => {
    const actorRef = spawn(src, options);
    spawnedChildren[actorRef.id] = actorRef;
    actorScope.defer(() => {
      if (actorRef._processingStatus === ProcessingStatus.Stopped) {
        return;
      }
      actorRef.start();
    });
    return actorRef;
  };
}
function resolveAssign(actorScope, snapshot, actionArgs, actionParams, {
  assignment
}) {
  if (!snapshot.context) {
    throw new Error("Cannot assign to undefined `context`. Ensure that `context` is defined in the machine config.");
  }
  const spawnedChildren = {};
  const assignArgs = {
    context: snapshot.context,
    event: actionArgs.event,
    spawn: createSpawner(actorScope, snapshot, actionArgs.event, spawnedChildren),
    self: actorScope.self,
    system: actorScope.system
  };
  let partialUpdate = {};
  if (typeof assignment === "function") {
    partialUpdate = assignment(assignArgs, actionParams);
  } else {
    for (const key of Object.keys(assignment)) {
      const propAssignment = assignment[key];
      partialUpdate[key] = typeof propAssignment === "function" ? propAssignment(assignArgs, actionParams) : propAssignment;
    }
  }
  const updatedContext = Object.assign({}, snapshot.context, partialUpdate);
  return [cloneMachineSnapshot(snapshot, {
    context: updatedContext,
    children: Object.keys(spawnedChildren).length ? {
      ...snapshot.children,
      ...spawnedChildren
    } : snapshot.children
  }), void 0, void 0];
}
function assign(assignment) {
  if (executingCustomAction) {
    console.warn("Custom actions should not call `assign()` directly, as it is not imperative. See https://stately.ai/docs/actions#built-in-actions for more details.");
  }
  function assign3(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  assign3.type = "xstate.assign";
  assign3.assignment = assignment;
  assign3.resolve = resolveAssign;
  return assign3;
}

// ../../node_modules/.pnpm/xstate@5.33.2/node_modules/xstate/dist/StateMachine-e5453556.development.esm.js
var cache = /* @__PURE__ */ new WeakMap();
function memo(object, key, fn) {
  let memoizedData = cache.get(object);
  if (!memoizedData) {
    memoizedData = {
      [key]: fn()
    };
    cache.set(object, memoizedData);
  } else if (!(key in memoizedData)) {
    memoizedData[key] = fn();
  }
  return memoizedData[key];
}
var EMPTY_OBJECT = {};
var toSerializableAction = (action) => {
  if (typeof action === "string") {
    return {
      type: action
    };
  }
  if (typeof action === "function") {
    if ("resolve" in action) {
      return {
        type: action.type
      };
    }
    return {
      type: action.name
    };
  }
  return action;
};
var StateNode = class _StateNode {
  constructor(config, options) {
    this.config = config;
    this.key = void 0;
    this.id = void 0;
    this.type = void 0;
    this.path = void 0;
    this.states = void 0;
    this.history = void 0;
    this.entry = void 0;
    this.exit = void 0;
    this.parent = void 0;
    this.machine = void 0;
    this.meta = void 0;
    this.output = void 0;
    this.order = -1;
    this.description = void 0;
    this.tags = [];
    this.transitions = void 0;
    this.always = void 0;
    this.parent = options._parent;
    this.key = options._key;
    this.machine = options._machine;
    this.path = this.parent ? this.parent.path.concat(this.key) : [];
    this.id = this.config.id || [this.machine.id, ...this.path].join(STATE_DELIMITER);
    this.type = this.config.type || (this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic");
    this.description = this.config.description;
    this.order = this.machine.idMap.size;
    this.machine.idMap.set(this.id, this);
    this.states = this.config.states ? mapValues(this.config.states, (stateConfig, key) => {
      const stateNode = new _StateNode(stateConfig, {
        _parent: this,
        _key: key,
        _machine: this.machine
      });
      return stateNode;
    }) : EMPTY_OBJECT;
    if (this.type === "compound" && !this.config.initial) {
      throw new Error(`No initial state specified for compound state node "#${this.id}". Try adding { initial: "${Object.keys(this.states)[0]}" } to the state config.`);
    }
    this.history = this.config.history === true ? "shallow" : this.config.history || false;
    this.entry = toArray(this.config.entry).slice();
    this.exit = toArray(this.config.exit).slice();
    this.meta = this.config.meta;
    this.output = this.type === "final" || !this.parent ? this.config.output : void 0;
    this.tags = toArray(config.tags).slice();
  }
  /** @internal */
  _initialize() {
    this.transitions = formatTransitions(this);
    if (this.config.always) {
      this.always = toTransitionConfigArray(this.config.always).map((t) => formatTransition(this, NULL_EVENT, t));
    }
    Object.keys(this.states).forEach((key) => {
      this.states[key]._initialize();
    });
  }
  /** The well-structured state node definition. */
  get definition() {
    return {
      id: this.id,
      key: this.key,
      version: this.machine.version,
      type: this.type,
      initial: this.initial ? {
        target: this.initial.target,
        source: this,
        actions: this.initial.actions.map(toSerializableAction),
        eventType: null,
        reenter: false,
        meta: this.initial.meta,
        description: this.initial.description,
        toJSON: () => ({
          target: this.initial.target.map((t) => `#${t.id}`),
          source: `#${this.id}`,
          actions: this.initial.actions.map(toSerializableAction),
          eventType: null,
          meta: this.initial.meta,
          description: this.initial.description
        })
      } : void 0,
      history: this.history,
      states: mapValues(this.states, (state) => state.definition),
      on: this.on,
      transitions: [...this.transitions.values()].flat().map((t) => ({
        ...t,
        actions: t.actions.map(toSerializableAction)
      })),
      entry: this.entry.map(toSerializableAction),
      exit: this.exit.map(toSerializableAction),
      meta: this.meta,
      order: this.order || -1,
      output: this.output,
      invoke: this.invoke,
      description: this.description,
      tags: this.tags
    };
  }
  /** @internal */
  toJSON() {
    return this.definition;
  }
  /** The logic invoked as actors by this state node. */
  get invoke() {
    return memo(this, "invoke", () => toArray(this.config.invoke).map((invokeConfig, i) => {
      const {
        src,
        systemId
      } = invokeConfig;
      const resolvedId = invokeConfig.id ?? createInvokeId(this.id, i);
      const sourceName = typeof src === "string" ? src : `xstate.invoke.${createInvokeId(this.id, i)}`;
      return {
        ...invokeConfig,
        src: sourceName,
        id: resolvedId,
        systemId,
        toJSON() {
          const {
            onDone,
            onError,
            ...invokeDefValues
          } = invokeConfig;
          return {
            ...invokeDefValues,
            type: "xstate.invoke",
            src: sourceName,
            id: resolvedId
          };
        }
      };
    }));
  }
  /** The mapping of events to transitions. */
  get on() {
    return memo(this, "on", () => {
      const transitions = this.transitions;
      return [...transitions].flatMap(([descriptor, t]) => t.map((t2) => [descriptor, t2])).reduce((map3, [descriptor, transition]) => {
        map3[descriptor] = map3[descriptor] || [];
        map3[descriptor].push(transition);
        return map3;
      }, {});
    });
  }
  get after() {
    return memo(this, "delayedTransitions", () => getDelayedTransitions(this));
  }
  get initial() {
    return memo(this, "initial", () => formatInitialTransition(this, this.config.initial));
  }
  /** @internal */
  next(snapshot, event) {
    const eventType = event.type;
    const actions = [];
    let selectedTransition;
    const candidates = memo(this, `candidates-${eventType}`, () => getCandidates(this, eventType));
    for (const candidate of candidates) {
      const {
        guard
      } = candidate;
      const resolvedContext = snapshot.context;
      let guardPassed = false;
      try {
        guardPassed = !guard || evaluateGuard(guard, resolvedContext, event, snapshot);
      } catch (err) {
        const guardType = typeof guard === "string" ? guard : typeof guard === "object" ? guard.type : void 0;
        throw new Error(`Unable to evaluate guard ${guardType ? `'${guardType}' ` : ""}in transition for event '${eventType}' in state node '${this.id}':
${err.message}`);
      }
      if (guardPassed) {
        actions.push(...candidate.actions);
        selectedTransition = candidate;
        break;
      }
    }
    return selectedTransition ? [selectedTransition] : void 0;
  }
  /** All the event types accepted by this state node and its descendants. */
  get events() {
    return memo(this, "events", () => {
      const {
        states
      } = this;
      const events = new Set(this.ownEvents);
      if (states) {
        for (const stateId of Object.keys(states)) {
          const state = states[stateId];
          if (state.states) {
            for (const event of state.events) {
              events.add(`${event}`);
            }
          }
        }
      }
      return Array.from(events);
    });
  }
  /**
   * All the events that have transitions directly from this state node.
   *
   * Excludes any inert events.
   */
  get ownEvents() {
    const keys = Object.keys(Object.fromEntries(this.transitions));
    const events = new Set(keys.filter((descriptor) => {
      return this.transitions.get(descriptor).some((transition) => !(!transition.target && !transition.actions.length && !transition.reenter));
    }));
    return Array.from(events);
  }
};
var STATE_IDENTIFIER2 = "#";
var StateMachine = class _StateMachine {
  constructor(config, implementations) {
    this.config = config;
    this.version = void 0;
    this.schemas = void 0;
    this.implementations = void 0;
    this.options = void 0;
    this.__xstatenode = true;
    this.idMap = /* @__PURE__ */ new Map();
    this.root = void 0;
    this.id = void 0;
    this.states = void 0;
    this.events = void 0;
    this.id = config.id || "(machine)";
    this.implementations = {
      actors: implementations?.actors ?? {},
      actions: implementations?.actions ?? {},
      delays: implementations?.delays ?? {},
      guards: implementations?.guards ?? {}
    };
    this.version = this.config.version;
    this.schemas = this.config.schemas;
    this.options = {
      maxIterations: Infinity,
      ...this.config.options
    };
    this.transition = this.transition.bind(this);
    this.getInitialSnapshot = this.getInitialSnapshot.bind(this);
    this.getPersistedSnapshot = this.getPersistedSnapshot.bind(this);
    this.restoreSnapshot = this.restoreSnapshot.bind(this);
    this.start = this.start.bind(this);
    this.root = new StateNode(config, {
      _key: this.id,
      _machine: this
    });
    this.root._initialize();
    formatRouteTransitions(this.root);
    this.states = this.root.states;
    this.events = this.root.events;
    if (!("output" in this.root) && Object.values(this.states).some((state) => state.type === "final" && "output" in state)) {
      console.warn("Missing `machine.output` declaration (top-level final state with output detected)");
    }
  }
  /**
   * Clones this state machine with the provided implementations.
   *
   * @param implementations Options (`actions`, `guards`, `actors`, `delays`) to
   *   recursively merge with the existing options.
   * @returns A new `StateMachine` instance with the provided implementations.
   */
  provide(implementations) {
    const {
      actions,
      guards,
      actors,
      delays
    } = this.implementations;
    return new _StateMachine(this.config, {
      actions: {
        ...actions,
        ...implementations.actions
      },
      guards: {
        ...guards,
        ...implementations.guards
      },
      actors: {
        ...actors,
        ...implementations.actors
      },
      delays: {
        ...delays,
        ...implementations.delays
      }
    });
  }
  resolveState(config) {
    const resolvedStateValue = resolveStateValue(this.root, config.value);
    const nodeSet = getAllStateNodes(getStateNodes(this.root, resolvedStateValue));
    return createMachineSnapshot({
      _nodes: [...nodeSet],
      context: config.context || {},
      children: {},
      status: isInFinalState(nodeSet, this.root) ? "done" : config.status || "active",
      output: config.output,
      error: config.error,
      historyValue: config.historyValue
    }, this);
  }
  /**
   * Determines the next snapshot given the current `snapshot` and received
   * `event`. Calculates a full macrostep from all microsteps.
   *
   * @param snapshot The current snapshot
   * @param event The received event
   */
  transition(snapshot, event, actorScope) {
    return macrostep(snapshot, event, actorScope, []).snapshot;
  }
  /**
   * Determines the next state given the current `state` and `event`. Calculates
   * a microstep.
   *
   * @param state The current state
   * @param event The received event
   */
  microstep(snapshot, event, actorScope) {
    return macrostep(snapshot, event, actorScope, []).microsteps.map(([s]) => s);
  }
  getTransitionData(snapshot, event) {
    return transitionNode(this.root, snapshot.value, snapshot, event) || [];
  }
  /**
   * The initial state _before_ evaluating any microsteps. This "pre-initial"
   * state is provided to initial actions executed in the initial state.
   *
   * @internal
   */
  _getPreInitialState(actorScope, initEvent, internalQueue) {
    const {
      context
    } = this.config;
    const preInitial = createMachineSnapshot({
      context: typeof context !== "function" && context ? context : {},
      _nodes: [this.root],
      children: {},
      status: "active"
    }, this);
    if (typeof context === "function") {
      const assignment = ({
        spawn,
        event,
        self: self2
      }) => context({
        spawn,
        input: event.input,
        self: self2
      });
      return resolveActionsAndContext(preInitial, initEvent, actorScope, [assign(assignment)], internalQueue, void 0);
    }
    return preInitial;
  }
  /**
   * Returns the initial `State` instance, with reference to `self` as an
   * `ActorRef`.
   */
  getInitialSnapshot(actorScope, input) {
    const initEvent = createInitEvent(input);
    const internalQueue = [];
    let snapshot = createMachineSnapshot({
      context: typeof this.config.context !== "function" && this.config.context ? this.config.context : {},
      _nodes: [this.root],
      children: {},
      status: "active"
    }, this);
    try {
      snapshot = this._getPreInitialState(actorScope, initEvent, internalQueue);
      const [nextState] = initialMicrostep(this.root, snapshot, actorScope, initEvent, internalQueue);
      const {
        snapshot: macroState
      } = macrostep(nextState, initEvent, actorScope, internalQueue);
      return macroState;
    } catch (error2) {
      return cloneMachineSnapshot(snapshot, {
        status: "error",
        error: error2
      });
    }
  }
  start(snapshot) {
    Object.values(snapshot.children).forEach((child) => {
      if (child.getSnapshot().status === "active") {
        child.start();
      }
    });
  }
  getStateNodeById(stateId) {
    const fullPath = toStatePath(stateId);
    const relativePath = fullPath.slice(1);
    const resolvedStateId = isStateId(fullPath[0]) ? fullPath[0].slice(STATE_IDENTIFIER2.length) : fullPath[0];
    const stateNode = this.idMap.get(resolvedStateId);
    if (!stateNode) {
      throw new Error(`Child state node '#${resolvedStateId}' does not exist on machine '${this.id}'`);
    }
    return getStateNodeByPath(stateNode, relativePath);
  }
  get definition() {
    return this.root.definition;
  }
  toJSON() {
    return this.definition;
  }
  getPersistedSnapshot(snapshot, options) {
    return getPersistedSnapshot(snapshot, options);
  }
  restoreSnapshot(snapshot, _actorScope) {
    const children = {};
    const snapshotChildren = snapshot.children;
    Object.keys(snapshotChildren).forEach((actorId) => {
      const actorData = snapshotChildren[actorId];
      const childState = actorData.snapshot;
      const src = actorData.src;
      const logic = typeof src === "string" ? resolveReferencedActor(this, src) : src;
      if (!logic) {
        return;
      }
      const actorRef = createActor(logic, {
        id: actorId,
        parent: _actorScope.self,
        syncSnapshot: actorData.syncSnapshot,
        snapshot: childState,
        src,
        systemId: actorData.systemId
      });
      children[actorId] = actorRef;
    });
    function resolveHistoryReferencedState(root, referenced) {
      if (referenced instanceof StateNode) {
        return referenced;
      }
      try {
        return root.machine.getStateNodeById(referenced.id);
      } catch {
        {
          console.warn(`Could not resolve StateNode for id: ${referenced.id}`);
        }
      }
    }
    function reviveHistoryValue(root, historyValue) {
      if (!historyValue || typeof historyValue !== "object") {
        return {};
      }
      const revived = {};
      for (const key in historyValue) {
        const arr = historyValue[key];
        for (const item of arr) {
          const resolved = resolveHistoryReferencedState(root, item);
          if (!resolved) {
            continue;
          }
          revived[key] ??= [];
          revived[key].push(resolved);
        }
      }
      return revived;
    }
    const revivedHistoryValue = reviveHistoryValue(this.root, snapshot.historyValue);
    const restoredSnapshot = createMachineSnapshot({
      ...snapshot,
      children,
      _nodes: Array.from(getAllStateNodes(getStateNodes(this.root, snapshot.value))),
      historyValue: revivedHistoryValue
    }, this);
    const seen = /* @__PURE__ */ new Set();
    function reviveContext(contextPart, children2) {
      if (seen.has(contextPart)) {
        return;
      }
      seen.add(contextPart);
      for (const key in contextPart) {
        const value = contextPart[key];
        if (value && typeof value === "object") {
          if ("xstate$$type" in value && value.xstate$$type === $$ACTOR_TYPE) {
            contextPart[key] = children2[value.id];
            continue;
          }
          reviveContext(value, children2);
        }
      }
    }
    reviveContext(restoredSnapshot.context, children);
    return restoredSnapshot;
  }
};

// ../../node_modules/.pnpm/xstate@5.33.2/node_modules/xstate/dist/log-c3c57652.development.esm.js
function resolveEmit(_, snapshot, args, actionParams, {
  event: eventOrExpr
}) {
  const resolvedEvent = typeof eventOrExpr === "function" ? eventOrExpr(args, actionParams) : eventOrExpr;
  return [snapshot, {
    event: resolvedEvent
  }, void 0];
}
function executeEmit(actorScope, {
  event
}) {
  actorScope.defer(() => actorScope.emit(event));
}
function emit(eventOrExpr) {
  if (executingCustomAction) {
    console.warn("Custom actions should not call `emit()` directly, as it is not imperative. See https://stately.ai/docs/actions#built-in-actions for more details.");
  }
  function emit3(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  emit3.type = "xstate.emit";
  emit3.event = eventOrExpr;
  emit3.resolve = resolveEmit;
  emit3.execute = executeEmit;
  return emit3;
}
var SpecialTargets = (function(SpecialTargets2) {
  SpecialTargets2["Parent"] = "#_parent";
  SpecialTargets2["Internal"] = "#_internal";
  return SpecialTargets2;
})({});
function resolveSendTo(actorScope, snapshot, args, actionParams, {
  to,
  event: eventOrExpr,
  id: id2,
  delay
}, extra) {
  const delaysMap = snapshot.machine.implementations.delays;
  if (typeof eventOrExpr === "string") {
    throw new Error(
      // oxlint-disable-next-line typescript/restrict-template-expressions
      `Only event objects may be used with sendTo; use sendTo({ type: "${eventOrExpr}" }) instead`
    );
  }
  const resolvedEvent = typeof eventOrExpr === "function" ? eventOrExpr(args, actionParams) : eventOrExpr;
  let resolvedDelay;
  if (typeof delay === "string") {
    const configDelay = delaysMap && delaysMap[delay];
    resolvedDelay = typeof configDelay === "function" ? configDelay(args, actionParams) : configDelay;
  } else {
    resolvedDelay = typeof delay === "function" ? delay(args, actionParams) : delay;
  }
  const resolvedTarget = typeof to === "function" ? to(args, actionParams) : to;
  let targetActorRef;
  if (typeof resolvedTarget === "string") {
    if (resolvedTarget === SpecialTargets.Parent) {
      targetActorRef = actorScope.self._parent;
    } else if (resolvedTarget === SpecialTargets.Internal) {
      targetActorRef = actorScope.self;
    } else if (resolvedTarget.startsWith("#_")) {
      targetActorRef = snapshot.children[resolvedTarget.slice(2)];
    } else {
      targetActorRef = extra.deferredActorIds?.includes(resolvedTarget) ? resolvedTarget : snapshot.children[resolvedTarget];
    }
    if (!targetActorRef) {
      throw new Error(`Unable to send event to actor '${resolvedTarget}' from machine '${snapshot.machine.id}'.`);
    }
  } else {
    targetActorRef = resolvedTarget || actorScope.self;
  }
  return [snapshot, {
    to: targetActorRef,
    targetId: typeof resolvedTarget === "string" ? resolvedTarget : void 0,
    event: resolvedEvent,
    id: id2,
    delay: resolvedDelay
  }, void 0];
}
function retryResolveSendTo(_, snapshot, params) {
  if (typeof params.to === "string") {
    params.to = snapshot.children[params.to];
  }
}
function executeSendTo(actorScope, params) {
  actorScope.defer(() => {
    const {
      to,
      event,
      delay,
      id: id2
    } = params;
    if (typeof delay === "number") {
      actorScope.system.scheduler.schedule(actorScope.self, to, event, delay, id2);
      return;
    }
    actorScope.system._relay(
      actorScope.self,
      // at this point, in a deferred task, it should already be mutated by retryResolveSendTo
      // if it initially started as a string
      to,
      event.type === XSTATE_ERROR ? createErrorActorEvent(actorScope.self.id, event.data) : event
    );
  });
}
function sendTo(to, eventOrExpr, options) {
  if (executingCustomAction) {
    console.warn("Custom actions should not call `sendTo()` directly, as it is not imperative. See https://stately.ai/docs/actions#built-in-actions for more details.");
  }
  function sendTo2(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  sendTo2.type = "xstate.sendTo";
  sendTo2.to = to;
  sendTo2.event = eventOrExpr;
  sendTo2.id = options?.id;
  sendTo2.delay = options?.delay;
  sendTo2.resolve = resolveSendTo;
  sendTo2.retryResolve = retryResolveSendTo;
  sendTo2.execute = executeSendTo;
  return sendTo2;
}
function sendParent(event, options) {
  return sendTo(SpecialTargets.Parent, event, options);
}
function resolveEnqueueActions(actorScope, snapshot, args, actionParams, {
  collect
}) {
  const actions = [];
  const enqueue = function enqueue2(action) {
    actions.push(action);
  };
  enqueue.assign = (...args2) => {
    actions.push(assign(...args2));
  };
  enqueue.cancel = (...args2) => {
    actions.push(cancel(...args2));
  };
  enqueue.raise = (...args2) => {
    actions.push(raise(...args2));
  };
  enqueue.sendTo = (...args2) => {
    actions.push(sendTo(...args2));
  };
  enqueue.sendParent = (...args2) => {
    actions.push(sendParent(...args2));
  };
  enqueue.spawnChild = (...args2) => {
    actions.push(spawnChild(...args2));
  };
  enqueue.stopChild = (...args2) => {
    actions.push(stopChild(...args2));
  };
  enqueue.emit = (...args2) => {
    actions.push(emit(...args2));
  };
  collect({
    context: args.context,
    event: args.event,
    enqueue,
    check: (guard) => evaluateGuard(guard, snapshot.context, args.event, snapshot),
    self: actorScope.self,
    system: actorScope.system
  }, actionParams);
  return [snapshot, void 0, actions];
}
function enqueueActions(collect) {
  function enqueueActions2(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  enqueueActions2.type = "xstate.enqueueActions";
  enqueueActions2.collect = collect;
  enqueueActions2.resolve = resolveEnqueueActions;
  return enqueueActions2;
}
function resolveLog(_, snapshot, actionArgs, actionParams, {
  value,
  label
}) {
  return [snapshot, {
    value: typeof value === "function" ? value(actionArgs, actionParams) : value,
    label
  }, void 0];
}
function executeLog({
  logger: logger3
}, {
  value,
  label
}) {
  if (label) {
    logger3(label, value);
  } else {
    logger3(value);
  }
}
function log(value = ({
  context,
  event
}) => ({
  context,
  event
}), label) {
  function log3(_args, _params) {
    {
      throw new Error(`This isn't supposed to be called`);
    }
  }
  log3.type = "xstate.log";
  log3.value = value;
  log3.label = label;
  log3.resolve = resolveLog;
  log3.execute = executeLog;
  return log3;
}

// ../../node_modules/.pnpm/xstate@5.33.2/node_modules/xstate/dist/xstate.development.esm.js
function assertEvent(event, type) {
  const types = toArray(type);
  const matches2 = types.some((descriptor) => matchesEventDescriptor(event.type, descriptor));
  if (!matches2) {
    const typesText = types.length === 1 ? `type matching "${types[0]}"` : `one of types matching "${types.join('", "')}"`;
    throw new Error(`Expected event ${JSON.stringify(event)} to have ${typesText}`);
  }
}
function createMachine(config, implementations) {
  return new StateMachine(config, implementations);
}
function setup({
  schemas,
  actors,
  actions,
  guards,
  delays
}) {
  return {
    assign,
    sendTo,
    raise,
    log,
    cancel,
    stopChild,
    enqueueActions,
    emit,
    spawnChild,
    createStateConfig: (config) => config,
    createAction: (fn) => fn,
    createMachine: (config) => createMachine({
      ...config,
      schemas
    }, {
      actors,
      actions,
      guards,
      delays
    }),
    extend: (extended) => setup({
      schemas,
      actors,
      actions: {
        ...actions,
        ...extended.actions
      },
      guards: {
        ...guards,
        ...extended.guards
      },
      delays: {
        ...delays,
        ...extended.delays
      }
    })
  };
}

// ../../node_modules/.pnpm/@sanity+comlink@4.0.3/node_modules/@sanity/comlink/dist/index.js
var listenInputFromContext = (config) => ({ context }) => {
  let { count, include, exclude, responseType = "message.received" } = config;
  return {
    count,
    domain: context.domain,
    from: context.connectTo,
    include: include ? Array.isArray(include) ? include : [include] : [],
    exclude: exclude ? Array.isArray(exclude) ? exclude : [exclude] : [],
    responseType,
    target: context.target,
    to: context.name
  };
};
var listenFilter = (input) => (event) => {
  let { data } = event;
  return (!input.include.length || input.include.includes(data.type)) && (!input.exclude.length || !input.exclude.includes(data.type)) && data.domain === input.domain && data.from === input.from && data.to === input.to && (!input.target || event.source === input.target);
};
var eventToMessage = (type) => (event) => ({
  type,
  message: event
});
var messageEvents$ = defer(() => fromEvent(window, "message"));
var createListenLogic = (compatMap) => fromEventObservable(({ input }) => messageEvents$.pipe(compatMap ? map(compatMap) : pipe(), filter(listenFilter(input)), map(eventToMessage(input.responseType)), input.count ? pipe(bufferCount(input.count), concatMap((arr) => arr), take(input.count)) : pipe()));
var FETCH_TIMEOUT_DEFAULT = 1e4;
var MSG_RESPONSE = "comlink/response";
var MSG_HEARTBEAT = "comlink/heartbeat";
var MSG_DISCONNECT = "comlink/disconnect";
var MSG_HANDSHAKE_SYN = "comlink/handshake/syn";
var MSG_HANDSHAKE_SYN_ACK = "comlink/handshake/syn-ack";
var MSG_HANDSHAKE_ACK = "comlink/handshake/ack";
var HANDSHAKE_MSG_TYPES = [
  MSG_HANDSHAKE_SYN,
  MSG_HANDSHAKE_SYN_ACK,
  MSG_HANDSHAKE_ACK
];
var INTERNAL_MSG_TYPES = [
  MSG_RESPONSE,
  MSG_DISCONNECT,
  MSG_HEARTBEAT,
  ...HANDSHAKE_MSG_TYPES
];
var throwOnEvent = (message) => (source) => source.pipe(take(1), map(() => {
  throw Error(message);
}));
var createRequestMachine = () => setup({
  types: {},
  actors: { listen: fromEventObservable(({ input }) => {
    let abortSignal$ = input.signal ? fromEvent(input.signal, "abort").pipe(throwOnEvent(`Request ${input.requestId} aborted`)) : EMPTY, messageFilter = (event) => event.data?.type === "comlink/response" && event.data?.responseTo === input.requestId && !!event.source && input.sources.has(event.source);
    return fromEvent(window, "message").pipe(filter(messageFilter), take(input.sources.size), takeUntil(abortSignal$));
  }) },
  actions: {
    "send message": ({ context }, params) => {
      let { sources, targetOrigin } = context, { message } = params;
      sources.forEach((source) => {
        source.postMessage(message, { targetOrigin });
      });
    },
    "on success": sendTo(({ context }) => context.parentRef, ({ context, self: self2 }) => (context.response && context.resolvable?.resolve(context.response), {
      type: "request.success",
      requestId: self2.id,
      response: context.response,
      responseTo: context.responseTo
    })),
    "on fail": sendTo(({ context }) => context.parentRef, ({ context, self: self2 }) => (context.suppressWarnings || console.warn(`[@sanity/comlink] Received no response to message '${context.type}' on client '${context.from}' (ID: '${context.id}').`), context.resolvable?.reject(Error("No response received")), {
      type: "request.failed",
      requestId: self2.id
    })),
    "on abort": sendTo(({ context }) => context.parentRef, ({ context, self: self2 }) => (context.resolvable?.reject(Error("Request aborted")), {
      type: "request.aborted",
      requestId: self2.id
    }))
  },
  guards: { expectsResponse: ({ context }) => context.expectResponse },
  delays: {
    initialTimeout: 0,
    responseTimeout: ({ context }) => context.responseTimeout ?? 3e3
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAD1gBd0GwT0AzFgJ2QNwdzoKAFVyowAewCuDItTRY8hUuSoBtAAwBdRKAAOE2P1wT8ukLUQBGAEwBWEgBYAnK+eOAzB7sB2DzY8rABoQAE9rDQc3V0cNTw8fAA4NHwBfVJCFHAJiElgwfAgCKGpNHSQQAyMBU3NLBDsrDxI7DTaAjQA2OOcNDxDwhHsNJx9Ou0TOq2cJxP9HdMyMbOU8gqL8ErUrcv1DY1qK+sbm1vaPLp6+gcRnGydo9wDGycWQLKVc9AB3dGNN6jiWCwdAwMrmKoHMxHRCJRKOEiJHwuZKBZwXKzBMKIGyYkhtAkXOweTqOHw2RJvD45Ug-P4CAH0JgsNicMA8LhwAz4fKicTSWTyZafWm-f5QcEVSE1aGgepwhFIlF9aYYrGDC4+JzEppjGzOUkeGbpDIgfASCBwczU5QQ-YyuqIAC0nRuCBd+IJXu9KSpwppZEoYDt1RMsosiEcNjdVjiJEeGisiSTHkcVgWpptuXyhWKIahjqGzi1BqRJINnVcdkcbuTLS9VYC8ISfsUAbp4vzDphCHJIyjBvJNlxNmRNexQ3sJGH43GPj8jWJrZWuXYfyoEC7YcLsbrgRsjkcvkmdgNbopVhIPhVfnsh8ClMz-tWsCkmEwcHgUvt257u8v+6Hse4xnhOdZnImVidPqCRNB4JqpEAA */
  context: ({ input }) => ({
    channelId: input.channelId,
    data: input.data,
    domain: input.domain,
    expectResponse: input.expectResponse ?? false,
    from: input.from,
    id: `msg-${v4_default2()}`,
    parentRef: input.parentRef,
    resolvable: input.resolvable,
    response: null,
    responseTimeout: input.responseTimeout,
    responseTo: input.responseTo,
    signal: input.signal,
    sources: input.sources instanceof Set ? input.sources : /* @__PURE__ */ new Set([input.sources]),
    suppressWarnings: input.suppressWarnings,
    targetOrigin: input.targetOrigin,
    to: input.to,
    type: input.type
  }),
  initial: "idle",
  on: { abort: ".aborted" },
  states: {
    idle: { after: { initialTimeout: [{ target: "sending" }] } },
    sending: {
      entry: {
        type: "send message",
        params: ({ context }) => {
          let { channelId, data, domain, from: from2, id: id2, responseTo, to, type } = context;
          return { message: {
            channelId,
            data,
            domain,
            from: from2,
            id: id2,
            to,
            type,
            responseTo
          } };
        }
      },
      always: [{
        guard: "expectsResponse",
        target: "awaiting"
      }, "success"]
    },
    awaiting: {
      invoke: {
        id: "listen for response",
        src: "listen",
        input: ({ context }) => ({
          requestId: context.id,
          sources: context.sources,
          signal: context.signal
        }),
        onError: "aborted"
      },
      after: { responseTimeout: "failed" },
      on: { message: {
        actions: assign({
          response: ({ event }) => event.data.data,
          responseTo: ({ event }) => event.data.responseTo
        }),
        target: "success"
      } }
    },
    failed: {
      type: "final",
      entry: "on fail"
    },
    success: {
      type: "final",
      entry: "on success"
    },
    aborted: {
      type: "final",
      entry: "on abort"
    }
  },
  output: ({ context, self: self2 }) => ({
    requestId: self2.id,
    response: context.response,
    responseTo: context.responseTo
  })
});
var sendBackAtInterval = fromCallback(({ sendBack, input }) => {
  let send = () => {
    sendBack(input.event);
  };
  input.immediate && send();
  let interval = setInterval(send, input.interval);
  return () => {
    clearInterval(interval);
  };
});
var createConnectionMachine = () => setup({
  types: {},
  actors: {
    requestMachine: createRequestMachine(),
    listen: createListenLogic(),
    sendBackAtInterval
  },
  actions: {
    "buffer message": enqueueActions(({ enqueue }) => {
      enqueue.assign({ buffer: ({ event, context }) => (assertEvent(event, "post"), [...context.buffer, event.data]) }), enqueue.emit(({ event }) => (assertEvent(event, "post"), {
        type: "buffer.added",
        message: event.data
      }));
    }),
    "create request": assign({ requests: ({ context, event, self: self2, spawn }) => {
      assertEvent(event, "request");
      let requests = (Array.isArray(event.data) ? event.data : [event.data]).map((request) => spawn("requestMachine", {
        id: `req-${v4_default2()}`,
        input: {
          channelId: context.channelId,
          data: request.data,
          domain: context.domain,
          expectResponse: request.expectResponse,
          from: context.name,
          parentRef: self2,
          responseTo: request.responseTo,
          sources: context.target,
          targetOrigin: context.targetOrigin,
          to: context.connectTo,
          type: request.type
        }
      }));
      return [...context.requests, ...requests];
    } }),
    "emit received message": enqueueActions(({ enqueue }) => {
      enqueue.emit(({ event }) => (assertEvent(event, "message.received"), {
        type: "message",
        message: event.message.data
      }));
    }),
    "emit status": emit((_, params) => ({
      type: "status",
      status: params.status
    })),
    "post message": raise(({ event }) => (assertEvent(event, "post"), {
      type: "request",
      data: {
        data: event.data.data,
        expectResponse: true,
        type: event.data.type
      }
    })),
    "remove request": enqueueActions(({ context, enqueue, event }) => {
      assertEvent(event, [
        "request.success",
        "request.failed",
        "request.aborted"
      ]), stopChild(event.requestId), enqueue.assign({ requests: context.requests.filter(({ id: id2 }) => id2 !== event.requestId) });
    }),
    respond: raise(({ event }) => (assertEvent(event, "response"), {
      type: "request",
      data: {
        data: event.data,
        type: MSG_RESPONSE,
        responseTo: event.respondTo
      }
    })),
    "send handshake ack": raise({
      type: "request",
      data: { type: MSG_HANDSHAKE_ACK }
    }),
    "send disconnect": raise(() => ({
      type: "request",
      data: { type: MSG_DISCONNECT }
    })),
    "send handshake syn": raise({
      type: "request",
      data: { type: MSG_HANDSHAKE_SYN }
    }),
    "send pending messages": enqueueActions(({ enqueue }) => {
      enqueue.raise(({ context }) => ({
        type: "request",
        data: context.buffer.map(({ data, type }) => ({
          data,
          type
        }))
      })), enqueue.emit(({ context }) => ({
        type: "buffer.flushed",
        messages: context.buffer
      })), enqueue.assign({ buffer: [] });
    }),
    "set target": assign({ target: ({ event }) => (assertEvent(event, "target.set"), event.target) })
  },
  guards: {
    "has target": ({ context }) => !!context.target,
    "should send heartbeats": ({ context }) => context.heartbeat
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDAdpsAbAxAC7oBOMhAdLGIQNoAMAuoqAA4D2sAloV+5ixAAPRAHZRAJgoAWABz0ArHICMy2QGZZCgJwAaEAE9EE+tIrb6ANgkLl46fTuj1AXxf60WHARJgAjgCucJSwAcjIcLAMzEggHNy8-IIiCKLS2hQS6qb2yurisrL6RgjK9LIyCuqq0g7WstZuHhjYePi+gcEUAGboXLiQ0YLxPHwCsSmiCgoykpayDtqS6trqxYjKEk0gnq24FFwQA-jI-DjIdEzDnKNJExuOZpZ12eq29OrSCuupypYUojUaTKCnm5Wk2123gORzA+HilxibBuiXGoBSGnUAIU4gU9FWamUtR+lmUM1EllBEkslMUEnpkJa0JaEFgGAA1lxMFB8LADJghrERqjkhtshk3mTtNo5OpqpYfqCKhTptoqpY1WUtu4dky8BQWWz0Jzue1-EFYIjrgkxqLSupqRRPpoPqJtLI0hIioZENJJE7NnJ8ZYHVk1YyvPrDRyuTyEYLkTa7uixVlMh81KGFhS1j6EPkZlpVjTphr8mkI3sDVhWTHTQBbSLoGAUXwRLgAN0GVyFKNt91KimUFEKXvKC2s9R+6X+jipnzJeSqEJ1UKjNaNJp5EC4sFOrQuCbifeTwg2cgoym0RPxDtqkj0eaB9Ao8zSolMEivZVcq71+33c5CEgeFOCtXskzRM8EDxKRpmkSw3QJbQsmpH5tHmV8JHSbJpDsakV2aSMALOMALhAjoLXAxNbiglI-SxWw1Vw0QNDw0Qfg9KQ7EJSxHHxApK2hQCyOAiAzVgDhMGoI9hX7FMEHSF8cWkelpHURCbBsb481xAEgT9BQJCmWQsiE-URPI8TG1gWBmzAVsyLATtuyRY9ILtWoKmlL82Kqd0tAVJ91LMHFZDKIkVlkNVZHMkiDzE-Adz3UjDx7GiRQHCKnheD53k+HSSkDDIwpBVTqQwuKKEssSDTAUhCAAI3qyg0DIrd8Fkk86MQUMnVM+RynoegTDJH48hGp0vR-FDRqqKqasgOqGua9AQjATAd1NSiul6fpXOtWi7Wy19cslD4vnG7IX3oVjVDUVYEJQqrksW8SdstLqPKy0wKgG1RhtMWogqKhoMjkWp6XxUyFBe3c3tAz70vco6fq+V8PTkGUFzdQqNnELEM2yClrwwzQ4ZShKQJqr7UYU98AS0W9pT4z5pHG0yXwMkNNTyGk3B1TB2AgOBBDXXBDsyhSFG9EovQqN5i1JeRcKqw4Bkl+ToMx8x0j+EaqQ9XMSkBURMgMkEwQWKro2NWNNdPFJAzN0lJGM4slDxhBEJfXyplBd03wW1KxIdnrBxBh4JAyW75C8rJpmDqmIGWkgmpasPjqUcaHooMLHA0uU1UkJOgKW1B6rT1bWor5At0zgcTAkK7hrz1irB0D8cW0UvRPLyv07WqgNq2qAG+l9SnXUz0UOXD5xuMs3Y4+DVJBX7UiKrV6Q8gcfoJO54rFefLLqfJYX1WKYNLxL4NO1NwgA */
  id: "connection",
  context: ({ input }) => ({
    id: input.id || `${input.name}-${v4_default2()}`,
    buffer: [],
    channelId: `chn-${v4_default2()}`,
    connectTo: input.connectTo,
    domain: input.domain ?? "sanity/comlink",
    heartbeat: input.heartbeat ?? false,
    name: input.name,
    requests: [],
    target: input.target,
    targetOrigin: input.targetOrigin
  }),
  on: {
    "target.set": { actions: "set target" },
    "request.success": { actions: "remove request" },
    "request.failed": { actions: "remove request" }
  },
  initial: "idle",
  states: {
    idle: {
      entry: [{
        type: "emit status",
        params: { status: "idle" }
      }],
      on: {
        connect: {
          target: "handshaking",
          guard: "has target"
        },
        post: { actions: "buffer message" }
      }
    },
    handshaking: {
      id: "handshaking",
      entry: [{
        type: "emit status",
        params: { status: "handshaking" }
      }],
      invoke: [{
        id: "send syn",
        src: "sendBackAtInterval",
        input: () => ({
          event: { type: "syn" },
          interval: 500,
          immediate: true
        })
      }, {
        id: "listen for handshake",
        src: "listen",
        input: (input) => listenInputFromContext({
          include: MSG_HANDSHAKE_SYN_ACK,
          count: 1
        })(input)
      }],
      on: {
        syn: { actions: "send handshake syn" },
        request: { actions: "create request" },
        post: { actions: "buffer message" },
        "message.received": { target: "connected" },
        disconnect: { target: "disconnected" }
      },
      exit: "send handshake ack"
    },
    connected: {
      entry: ["send pending messages", {
        type: "emit status",
        params: { status: "connected" }
      }],
      invoke: {
        id: "listen for messages",
        src: "listen",
        input: listenInputFromContext({ exclude: [MSG_RESPONSE, MSG_HEARTBEAT] })
      },
      on: {
        post: { actions: "post message" },
        request: { actions: "create request" },
        response: { actions: "respond" },
        "message.received": { actions: "emit received message" },
        disconnect: { target: "disconnected" }
      },
      initial: "heartbeat",
      states: { heartbeat: {
        initial: "checking",
        states: {
          checking: { always: {
            guard: "should send heartbeats",
            target: "sending"
          } },
          sending: {
            on: { "request.failed": { target: "#handshaking" } },
            invoke: {
              id: "send heartbeat",
              src: "sendBackAtInterval",
              input: () => ({
                event: {
                  type: "post",
                  data: {
                    type: MSG_HEARTBEAT,
                    data: void 0
                  }
                },
                interval: 2e3,
                immediate: false
              })
            }
          }
        }
      } }
    },
    disconnected: {
      id: "disconnected",
      entry: ["send disconnect", {
        type: "emit status",
        params: { status: "disconnected" }
      }],
      on: {
        request: { actions: "create request" },
        post: { actions: "buffer message" },
        connect: {
          target: "handshaking",
          guard: "has target"
        }
      }
    }
  }
});
var createConnection = (input, machine = createConnectionMachine()) => {
  let id2 = input.id || `${input.name}-${v4_default2()}`, actor = createActor(machine, { input: {
    ...input,
    id: id2
  } }), eventHandlers = /* @__PURE__ */ new Map(), unhandledMessages = /* @__PURE__ */ new Map(), on = (type, handler, options) => {
    let handlers = eventHandlers.get(type) || /* @__PURE__ */ new Set();
    eventHandlers.has(type) || eventHandlers.set(type, handlers), handlers.add(handler);
    let unhandledMessagesForType = unhandledMessages.get(type);
    if (unhandledMessagesForType) {
      let replayCount = options?.replay ?? 1;
      Array.from(unhandledMessagesForType).slice(-replayCount).forEach(async ({ data, id: id3 }) => {
        let response = await handler(data);
        response && actor.send({
          type: "response",
          respondTo: id3,
          data: response
        });
      }), unhandledMessages.delete(type);
    }
    return () => {
      handlers.delete(handler);
    };
  }, connect = () => {
    actor.send({ type: "connect" });
  }, disconnect = () => {
    actor.send({ type: "disconnect" });
  }, onStatus = (handler, filter2) => {
    let subscription = actor.on("status", (event) => {
      filter2 && event.status !== filter2 || handler(event.status);
    });
    return () => subscription.unsubscribe();
  }, setTarget = (target) => {
    actor.send({
      type: "target.set",
      target
    });
  }, post = (type, data) => {
    let _data = {
      type,
      data
    };
    actor.send({
      type: "post",
      data: _data
    });
  };
  actor.on("message", async ({ message }) => {
    let handlers = eventHandlers.get(message.type);
    if (handlers) {
      handlers.forEach(async (handler) => {
        let response = await handler(message.data);
        response && actor.send({
          type: "response",
          respondTo: message.id,
          data: response
        });
      });
      return;
    }
    let unhandledMessagesForType = unhandledMessages.get(message.type);
    unhandledMessagesForType ? unhandledMessagesForType.add(message) : unhandledMessages.set(message.type, /* @__PURE__ */ new Set([message]));
  });
  let stop2 = () => {
    actor.stop();
  }, start = () => (actor.start(), stop2);
  return {
    actor,
    connect,
    disconnect,
    id: id2,
    name: input.name,
    machine,
    on,
    onStatus,
    post,
    setTarget,
    start,
    stop: stop2,
    get target() {
      return actor.getSnapshot().context.target;
    }
  };
};
var cleanupConnection = (connection) => {
  connection.disconnect(), setTimeout(() => {
    connection.stop();
  }, 0);
};
var noop = () => {
};
var createController = (input) => {
  let { targetOrigin } = input, targets = /* @__PURE__ */ new Set(), channels = /* @__PURE__ */ new Set(), addTarget = (target) => {
    if (targets.has(target)) return noop;
    if (!targets.size || !channels.size) return targets.add(target), channels.forEach((channel) => {
      channel.connections.forEach((connection) => {
        connection.setTarget(target), connection.connect();
      });
    }), () => {
      targets.delete(target), channels.forEach((channel) => {
        channel.connections.forEach((connection) => {
          connection.target === target && connection.disconnect();
        });
      });
    };
    targets.add(target);
    let targetConnections = /* @__PURE__ */ new Set();
    return channels.forEach((channel) => {
      let connection = createConnection({
        ...channel.input,
        target,
        targetOrigin
      }, channel.machine);
      targetConnections.add(connection), channel.connections.add(connection), channel.subscribers.forEach(({ type, handler, unsubscribers }) => {
        unsubscribers.push(connection.on(type, handler));
      }), channel.internalEventSubscribers.forEach(({ type, handler, unsubscribers }) => {
        let subscription = connection.actor.on(type, handler);
        unsubscribers.push(() => subscription.unsubscribe());
      }), channel.statusSubscribers.forEach(({ handler, unsubscribers }) => {
        unsubscribers.push(connection.onStatus((status) => handler({
          connection: connection.id,
          status
        })));
      }), connection.start(), connection.connect();
    }), () => {
      targets.delete(target), targetConnections.forEach((connection) => {
        cleanupConnection(connection), channels.forEach((channel) => {
          channel.connections.delete(connection);
        });
      });
    };
  }, createChannel = (input2, machine = createConnectionMachine()) => {
    let channel = {
      connections: /* @__PURE__ */ new Set(),
      input: input2,
      internalEventSubscribers: /* @__PURE__ */ new Set(),
      machine,
      statusSubscribers: /* @__PURE__ */ new Set(),
      subscribers: /* @__PURE__ */ new Set()
    };
    channels.add(channel);
    let { connections, internalEventSubscribers, statusSubscribers, subscribers } = channel;
    if (targets.size) targets.forEach((target) => {
      let connection = createConnection({
        ...input2,
        target,
        targetOrigin
      }, machine);
      connections.add(connection);
    });
    else {
      let connection = createConnection({
        ...input2,
        targetOrigin
      }, machine);
      connections.add(connection);
    }
    let post = (...params) => {
      let [type, data] = params;
      connections.forEach((connection) => {
        connection.post(type, data);
      });
    }, on = (type, handler) => {
      let unsubscribers = [];
      connections.forEach((connection) => {
        unsubscribers.push(connection.on(type, handler));
      });
      let subscriber = {
        type,
        handler,
        unsubscribers
      };
      return subscribers.add(subscriber), () => {
        unsubscribers.forEach((unsub) => unsub()), subscribers.delete(subscriber);
      };
    }, onInternalEvent = (type, handler) => {
      let unsubscribers = [];
      connections.forEach((connection) => {
        let subscription = connection.actor.on(type, handler);
        unsubscribers.push(() => subscription.unsubscribe());
      });
      let subscriber = {
        type,
        handler,
        unsubscribers
      };
      return internalEventSubscribers.add(subscriber), () => {
        unsubscribers.forEach((unsub) => unsub()), internalEventSubscribers.delete(subscriber);
      };
    }, onStatus = (handler) => {
      let unsubscribers = [];
      connections.forEach((connection) => {
        unsubscribers.push(connection.onStatus((status) => handler({
          connection: connection.id,
          status
        })));
      });
      let subscriber = {
        handler,
        unsubscribers
      };
      return statusSubscribers.add(subscriber), () => {
        unsubscribers.forEach((unsub) => unsub()), statusSubscribers.delete(subscriber);
      };
    }, stop2 = () => {
      let connections2 = channel.connections;
      connections2.forEach(cleanupConnection), connections2.clear(), channels.delete(channel);
    }, start = () => (connections.forEach((connection) => {
      connection.start(), connection.connect();
    }), stop2);
    return {
      on,
      onInternalEvent,
      onStatus,
      post,
      start,
      stop: stop2
    };
  }, destroy = () => {
    channels.forEach(({ connections }) => {
      connections.forEach(cleanupConnection), connections.clear();
    }), channels.clear(), targets.clear();
  };
  return {
    addTarget,
    createChannel,
    destroy
  };
};
function createPromiseWithResolvers() {
  if (typeof Promise.withResolvers == "function") return Promise.withResolvers();
  let resolve, reject;
  return {
    promise: new Promise((res, rej) => {
      resolve = res, reject = rej;
    }),
    resolve,
    reject
  };
}
var createNodeMachine = () => setup({
  types: {},
  actors: {
    requestMachine: createRequestMachine(),
    listen: createListenLogic()
  },
  actions: {
    "buffer handshake": assign({ handshakeBuffer: ({ event, context }) => (assertEvent(event, "message.received"), [...context.handshakeBuffer, event]) }),
    "buffer message": enqueueActions(({ enqueue }) => {
      enqueue.assign({ buffer: ({ event, context }) => (assertEvent(event, "post"), [...context.buffer, {
        data: event.data,
        resolvable: event.resolvable,
        options: event.options
      }]) }), enqueue.emit(({ event }) => (assertEvent(event, "post"), {
        type: "buffer.added",
        message: event.data
      }));
    }),
    "create request": assign({ requests: ({ context, event, self: self2, spawn }) => {
      assertEvent(event, "request");
      let requests = (Array.isArray(event.data) ? event.data : [event.data]).map((request) => spawn("requestMachine", {
        id: `req-${v4_default2()}`,
        input: {
          channelId: context.channelId,
          data: request.data,
          domain: context.domain,
          expectResponse: request.expectResponse,
          from: context.name,
          parentRef: self2,
          resolvable: request.resolvable,
          responseTimeout: request.options?.responseTimeout,
          responseTo: request.responseTo,
          signal: request.options?.signal,
          sources: context.target,
          suppressWarnings: request.options?.suppressWarnings,
          targetOrigin: context.targetOrigin,
          to: context.connectTo,
          type: request.type
        }
      }));
      return [...context.requests, ...requests];
    } }),
    "emit heartbeat": emit(() => ({ type: "heartbeat" })),
    "emit received message": enqueueActions(({ enqueue }) => {
      enqueue.emit(({ event }) => (assertEvent(event, "message.received"), {
        type: "message",
        message: event.message.data
      }));
    }),
    "emit status": emit((_, params) => ({
      type: "status",
      status: params.status
    })),
    "post message": raise(({ event }) => (assertEvent(event, "post"), {
      type: "request",
      data: {
        data: event.data.data,
        expectResponse: !!event.resolvable,
        type: event.data.type,
        resolvable: event.resolvable,
        options: event.options
      }
    })),
    "process pending handshakes": enqueueActions(({ context, enqueue }) => {
      context.handshakeBuffer.forEach((event) => enqueue.raise(event)), enqueue.assign({ handshakeBuffer: [] });
    }),
    "remove request": enqueueActions(({ context, enqueue, event }) => {
      assertEvent(event, [
        "request.success",
        "request.failed",
        "request.aborted"
      ]), stopChild(event.requestId), enqueue.assign({ requests: context.requests.filter(({ id: id2 }) => id2 !== event.requestId) });
    }),
    "send response": raise(({ event }) => (assertEvent(event, ["message.received", "heartbeat.received"]), {
      type: "request",
      data: {
        type: MSG_RESPONSE,
        responseTo: event.message.data.id,
        data: void 0
      }
    })),
    "send handshake syn ack": raise({
      type: "request",
      data: { type: MSG_HANDSHAKE_SYN_ACK }
    }),
    "send pending messages": enqueueActions(({ enqueue }) => {
      enqueue.raise(({ context }) => ({
        type: "request",
        data: context.buffer.map(({ data, resolvable, options }) => ({
          data: data.data,
          type: data.type,
          expectResponse: !!resolvable,
          resolvable,
          options
        }))
      })), enqueue.emit(({ context }) => ({
        type: "buffer.flushed",
        messages: context.buffer.map(({ data }) => data)
      })), enqueue.assign({ buffer: [] });
    }),
    "set connection config": assign({
      channelId: ({ event }) => (assertEvent(event, "handshake.syn"), event.message.data.channelId),
      target: ({ event }) => (assertEvent(event, "handshake.syn"), event.message.source || void 0),
      targetOrigin: ({ event }) => (assertEvent(event, "handshake.syn"), event.message.origin)
    })
  },
  guards: { hasSource: ({ context }) => context.target !== null }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDsD2EwGIBOYCOArnAC4B0sBAxpXLANoAMAuoqAA6qwCWxXqyrEAA9EAVgYAWUgEYJDUQA4JAZmUSJC0coDsAGhABPRNIYLSErdOkBOAGzbx227YUBfV-rQYc+IrDIAZgCGXAA2kIwsSCAc3Lz8giIIoiakqgBMDKbp2tYS0srp+kYI0ununuhgpFwQ4ZgQ-NVcyABuqADW1V7NdWAILe2UQfHIkZGCsTx8AtFJ6aKipAzWOtrpC7Z5BUWGiNoK6aS26RLW2tLaqkqqFSA9NX2YALa0QTCkuDRcrRHMk5xpgk5ogJLZSNZIVDoVCFLZiohbIVSLkXLZRHZDgxbHcHrV6rFiBNolNRolEVJbCsdGUzsoyhiEcllOC1DowelVmVrOUPPcqqQABZBZAQWDCjotKANJo1NqdboC4Wi8VBSXIKADeXDUbjf4kwFkkEILbg8RZMHKOzWKzKJkHJa086Xa4qZS4pUisUSqU+QgkYnsQ0zcnJaRLDbpZwKNQSBYspm2MEyC5KTnaDSSd18h7K71q32EwMxYPA0BJFLKY5yZxIrKSURM0RnFHSBTrQqQ9babQejBCr2q9XSiBcWCUfjIMCUIn6oNxEPGtTWFFR0RUy7iGzt+3Ip0XURXVZKPvVCfIKczyB+vyzqLzoGzcuIG0MGTyCztjRtjaJjbHVMNAUTdu1PUhz0vYhryLOcSwXMthBfK0ZGsLQGBZekCi0Jso1IdI23WG04zOE4wIg6coIgBox3Imdi1JRdnxNOxSHNSQkWtW0mTjMxMQ7fDzgcbNKn7WjKJeN4Pi+MAfj+e84MfUMFHbZZwxOHZNDyO09gQOQjmAhZJCM9IMjIycKOvQUwCCbBiAAI2sshpNkiB6NLJ9EIQBQbWOdJlMhYCUjbJkchXGsFmsJQMVsWl3BzKp4GiHoAXgjykgAWmkZZ6xy3LZF2EobCy6xsQWJQ42kE4FjA-EwBSxTjSRUhDgqkzgO2BxdykU4AvXFQ-KjMC8yHKV6qNJi6WOdcypcZsXGxe0JG0XySKjM5lKsMyLwsiAxsYzylDfONznUEqrmi+1ThkHqXDONbULi1wgA */
  id: "node",
  context: ({ input }) => ({
    buffer: [],
    channelId: null,
    connectTo: input.connectTo,
    domain: input.domain ?? "sanity/comlink",
    handshakeBuffer: [],
    name: input.name,
    requests: [],
    target: void 0,
    targetOrigin: null
  }),
  invoke: {
    id: "listen for handshake syn",
    src: "listen",
    input: listenInputFromContext({
      include: MSG_HANDSHAKE_SYN,
      responseType: "handshake.syn"
    })
  },
  on: {
    "request.success": { actions: "remove request" },
    "request.failed": { actions: "remove request" },
    "request.aborted": { actions: "remove request" },
    "handshake.syn": {
      actions: "set connection config",
      target: ".handshaking"
    }
  },
  initial: "idle",
  states: {
    idle: {
      entry: [{
        type: "emit status",
        params: { status: "idle" }
      }],
      on: { post: { actions: "buffer message" } }
    },
    handshaking: {
      guard: "hasSource",
      entry: ["send handshake syn ack", {
        type: "emit status",
        params: { status: "handshaking" }
      }],
      invoke: [
        {
          id: "listen for handshake ack",
          src: "listen",
          input: listenInputFromContext({
            include: MSG_HANDSHAKE_ACK,
            count: 1,
            responseType: "handshake.complete"
          }),
          onDone: "connected"
        },
        {
          id: "listen for disconnect",
          src: "listen",
          input: listenInputFromContext({
            include: MSG_DISCONNECT,
            count: 1,
            responseType: "disconnect"
          })
        },
        {
          id: "listen for messages",
          src: "listen",
          input: listenInputFromContext({ exclude: [
            MSG_DISCONNECT,
            MSG_HANDSHAKE_SYN,
            MSG_HANDSHAKE_ACK,
            MSG_HEARTBEAT,
            MSG_RESPONSE
          ] })
        }
      ],
      on: {
        request: { actions: "create request" },
        post: { actions: "buffer message" },
        "message.received": { actions: "buffer handshake" },
        disconnect: { target: "idle" }
      }
    },
    connected: {
      entry: [
        "process pending handshakes",
        "send pending messages",
        {
          type: "emit status",
          params: { status: "connected" }
        }
      ],
      invoke: [
        {
          id: "listen for messages",
          src: "listen",
          input: listenInputFromContext({ exclude: [
            MSG_DISCONNECT,
            MSG_HANDSHAKE_SYN,
            MSG_HANDSHAKE_ACK,
            MSG_HEARTBEAT,
            MSG_RESPONSE
          ] })
        },
        {
          id: "listen for heartbeat",
          src: "listen",
          input: listenInputFromContext({
            include: MSG_HEARTBEAT,
            responseType: "heartbeat.received"
          })
        },
        {
          id: "listen for disconnect",
          src: "listen",
          input: listenInputFromContext({
            include: MSG_DISCONNECT,
            count: 1,
            responseType: "disconnect"
          })
        }
      ],
      on: {
        request: { actions: "create request" },
        post: { actions: "post message" },
        disconnect: { target: "idle" },
        "message.received": { actions: ["send response", "emit received message"] },
        "heartbeat.received": { actions: ["send response", "emit heartbeat"] }
      }
    }
  }
});
var createNode = (input, machine = createNodeMachine()) => {
  let actor = createActor(machine, { input }), eventHandlers = /* @__PURE__ */ new Map(), unhandledMessages = /* @__PURE__ */ new Map(), on = (type, handler, options) => {
    let handlers = eventHandlers.get(type) || /* @__PURE__ */ new Set();
    eventHandlers.has(type) || eventHandlers.set(type, handlers), handlers.add(handler);
    let unhandledMessagesForType = unhandledMessages.get(type);
    if (unhandledMessagesForType) {
      let replayCount = options?.replay ?? 1;
      Array.from(unhandledMessagesForType).slice(-replayCount).forEach(({ data }) => handler(data)), unhandledMessages.delete(type);
    }
    return () => {
      handlers.delete(handler);
    };
  }, cachedStatus, onStatus = (handler, filter2) => {
    let subscription = actor.on("status", (event) => {
      cachedStatus = event.status, !(filter2 && event.status !== filter2) && handler(event.status);
    });
    return cachedStatus && handler(cachedStatus), () => subscription.unsubscribe();
  }, post = (type, data) => {
    let _data = {
      type,
      data
    };
    actor.send({
      type: "post",
      data: _data
    });
  }, fetch = (type, data, options) => {
    let { responseTimeout = FETCH_TIMEOUT_DEFAULT, signal, suppressWarnings } = options || {}, resolvable = createPromiseWithResolvers(), _data = {
      type,
      data
    };
    return actor.send({
      type: "post",
      data: _data,
      resolvable,
      options: {
        responseTimeout,
        signal,
        suppressWarnings
      }
    }), resolvable.promise;
  };
  actor.on("message", ({ message }) => {
    let handlers = eventHandlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => handler(message.data));
      return;
    }
    let unhandledMessagesForType = unhandledMessages.get(message.type);
    unhandledMessagesForType ? unhandledMessagesForType.add(message) : unhandledMessages.set(message.type, /* @__PURE__ */ new Set([message]));
  });
  let stop2 = () => {
    actor.stop();
  }, start = () => (actor.start(), stop2);
  return {
    actor,
    fetch,
    machine,
    on,
    onStatus,
    post,
    start,
    stop: stop2
  };
};

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/getNodeState-B4nG0sjm.js
var getOrCreateNode$1 = ({ state }, options) => {
  let nodes = state.get().nodes, existing = nodes.get(options.name);
  if (existing) {
    if (!isDeepEqual(existing.options, options)) throw Error(`Node "${options.name}" already exists with different options`);
    return existing.node.start(), existing.node;
  }
  let node = createNode(options);
  node.start();
  let entry = {
    node,
    options,
    status: "idle",
    statusUnsub: node.onStatus((status) => {
      let currentNodes = state.get().nodes, currentEntry = currentNodes.get(options.name);
      if (!currentEntry) return;
      let updatedEntry = {
        ...currentEntry,
        status
      };
      state.set("updateNodeStatus", { nodes: new Map(currentNodes).set(options.name, updatedEntry) });
    })
  };
  return nodes.set(options.name, entry), state.set("createNode", { nodes }), node;
};
var releaseNode$1 = ({ state }, name) => {
  let nodes = state.get().nodes, existing = nodes.get(name);
  if (existing) {
    existing.statusUnsub && existing.statusUnsub(), existing.node.stop(), nodes.delete(name), state.set("removeNode", { nodes });
    return;
  }
};
var comlinkNodeStore = defineStore({
  name: "nodeStore",
  getInitialState: () => ({
    nodes: /* @__PURE__ */ new Map(),
    subscriptions: /* @__PURE__ */ new Map()
  }),
  initialize({ state }) {
    return () => {
      state.get().nodes.forEach(({ node }) => {
        node.stop();
      });
    };
  }
});
var releaseNode = bindActionGlobally(comlinkNodeStore, releaseNode$1);
var getOrCreateNode = bindActionGlobally(comlinkNodeStore, getOrCreateNode$1);
var selectNode = (context, nodeInput) => context.state.nodes.get(nodeInput.name);
var getNodeState = bindActionGlobally(comlinkNodeStore, createStateSourceAction({
  selector: createSelector([selectNode], (nodeEntry) => nodeEntry?.status === "connected" ? {
    node: nodeEntry.node,
    status: nodeEntry.status
  } : void 0),
  onSubscribe: ({ state, instance }, nodeInput) => {
    let nodeName = nodeInput.name, subscriberId = Symbol("comlink-node-subscriber");
    getOrCreateNode(instance, nodeInput);
    let subs = state.get().subscriptions.get(nodeName);
    return subs || (subs = /* @__PURE__ */ new Set(), state.get().subscriptions.set(nodeName, subs)), subs.add(subscriberId), () => {
      setCleanupTimeout(() => {
        let activeSubs = state.get().subscriptions.get(nodeName);
        activeSubs && (activeSubs.delete(subscriberId), activeSubs.size === 0 && (state.get().subscriptions.delete(nodeName), releaseNode(instance, nodeName)));
      }, 5e3);
    };
  }
}));

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/index.js
var import_isObject = __toESM(require_isObject());

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_chunks-es/parse.js
function parse4(path) {
  return path.split(/[[.\]]/g).filter(Boolean).map((seg) => seg.includes("==") ? parseSegment(seg) : coerce(seg));
}
var IS_NUMERIC = /^-?\d+$/;
function unquote(str) {
  return str.replace(/^['"]/, "").replace(/['"]$/, "");
}
function parseSegment(segment) {
  const [key, value] = segment.split("==");
  if (key !== "_key")
    throw new Error(
      `Currently only "_key" is supported as path segment. Found ${key}`
    );
  if (typeof value > "u")
    throw new Error('Invalid path segment, expected `key=="value"`');
  return { _key: unquote(value) };
}
function coerce(segment) {
  return IS_NUMERIC.test(segment) ? Number(segment) : segment;
}

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_chunks-es/stringify.js
function isKeyedElement(element) {
  return typeof element == "object" && "_key" in element && typeof element._key == "string";
}
var IS_DOTTABLE = /^[a-z_$]+/;
function stringifySegment2(segment, hasLeading) {
  return Array.isArray(segment) ? `[${segment[0]}:${segment[1] || ""}]` : typeof segment == "number" ? `[${segment}]` : isKeyedElement(segment) ? `[_key==${JSON.stringify(segment._key)}]` : typeof segment == "string" && IS_DOTTABLE.test(segment) ? hasLeading ? segment : `.${segment}` : `['${segment}']`;
}
function stringify(pathArray) {
  return pathArray.map((segment, i) => stringifySegment2(segment, i === 0)).join("");
}

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_chunks-es/arrify.js
function arrify(val) {
  return Array.isArray(val) ? val : [val];
}

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_chunks-es/decode.js
function isCreateIfNotExistsMutation(sanityMutation) {
  return "createIfNotExists" in sanityMutation;
}
function isCreateOrReplaceMutation(sanityMutation) {
  return "createOrReplace" in sanityMutation;
}
function isCreateMutation(sanityMutation) {
  return "create" in sanityMutation;
}
function isDeleteMutation(sanityMutation) {
  return "delete" in sanityMutation;
}
function isPatchMutation(sanityMutation) {
  return "patch" in sanityMutation;
}
function isSetPatch(sanityPatch) {
  return "set" in sanityPatch;
}
function isSetIfMissingPatch(sanityPatch) {
  return "setIfMissing" in sanityPatch;
}
function isDiffMatchPatch(sanityPatch) {
  return "diffMatchPatch" in sanityPatch;
}
function isUnsetPatch(sanityPatch) {
  return "unset" in sanityPatch;
}
function isIncPatch(sanityPatch) {
  return "inc" in sanityPatch;
}
function isDecPatch(sanityPatch) {
  return "inc" in sanityPatch;
}
function isInsertPatch(sanityPatch) {
  return "insert" in sanityPatch;
}
function decodeAll(sanityMutations) {
  return sanityMutations.map(decodeMutation);
}
function decode(encodedMutation) {
  return decodeMutation(encodedMutation);
}
function decodeMutation(encodedMutation) {
  if (isCreateIfNotExistsMutation(encodedMutation))
    return {
      type: "createIfNotExists",
      document: encodedMutation.createIfNotExists
    };
  if (isCreateOrReplaceMutation(encodedMutation))
    return {
      type: "createOrReplace",
      document: encodedMutation.createOrReplace
    };
  if (isCreateMutation(encodedMutation))
    return { type: "create", document: encodedMutation.create };
  if (isDeleteMutation(encodedMutation))
    return { id: encodedMutation.delete.id, type: "delete" };
  if (isPatchMutation(encodedMutation))
    return {
      type: "patch",
      id: encodedMutation.patch.id,
      patches: decodeNodePatches(encodedMutation.patch)
    };
  throw new Error(`Unknown mutation: ${JSON.stringify(encodedMutation)}`);
}
var POSITION_KEYS = ["before", "replace", "after"];
function getInsertPosition(insert4) {
  const positions = POSITION_KEYS.filter((k) => k in insert4);
  if (positions.length > 1)
    throw new Error(
      `Insert patch is ambiguous. Should only contain one of: ${POSITION_KEYS.join(
        ", "
      )}, instead found ${positions.join(", ")}`
    );
  return positions[0];
}
function decodeNodePatches(patch) {
  return [
    ...getSetPatches(patch),
    ...getSetIfMissingPatches(patch),
    ...getUnsetPatches(patch),
    ...getIncPatches(patch),
    ...getDecPatches(patch),
    ...getInsertPatches(patch),
    ...getDiffMatchPatchPatches(patch)
  ];
}
function getSetPatches(patch) {
  return isSetPatch(patch) ? Object.keys(patch.set).map((path) => ({
    path: parse4(path),
    op: { type: "set", value: patch.set[path] }
  })) : [];
}
function getSetIfMissingPatches(patch) {
  return isSetIfMissingPatch(patch) ? Object.keys(patch.setIfMissing).map((path) => ({
    path: parse4(path),
    op: { type: "setIfMissing", value: patch.setIfMissing[path] }
  })) : [];
}
function getDiffMatchPatchPatches(patch) {
  return isDiffMatchPatch(patch) ? Object.keys(patch.diffMatchPatch).map((path) => ({
    path: parse4(path),
    op: { type: "diffMatchPatch", value: patch.diffMatchPatch[path] }
  })) : [];
}
function getUnsetPatches(patch) {
  return isUnsetPatch(patch) ? patch.unset.map((path) => ({
    path: parse4(path),
    op: { type: "unset" }
  })) : [];
}
function getIncPatches(patch) {
  return isIncPatch(patch) ? Object.keys(patch.inc).map((path) => ({
    path: parse4(path),
    op: { type: "inc", amount: patch.inc[path] }
  })) : [];
}
function getDecPatches(patch) {
  return isDecPatch(patch) ? Object.keys(patch.dec).map((path) => ({
    path: parse4(path),
    op: { type: "dec", amount: patch.dec[path] }
  })) : [];
}
function getInsertPatches(patch) {
  if (!isInsertPatch(patch))
    return [];
  const position = getInsertPosition(patch.insert);
  if (!position)
    throw new Error("Insert patch missing position");
  const path = parse4(patch.insert[position]), referenceItem = path.pop(), op = position === "replace" ? {
    type: "insert",
    position,
    referenceItem,
    items: patch.insert.items
  } : {
    type: "insert",
    position,
    referenceItem,
    items: patch.insert.items
  };
  return [{ path, op }];
}

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_chunks-es/encode.js
function encode(mutation) {
  return encodeMutation(mutation);
}
function encodeAll(mutations) {
  return mutations.flatMap(encode);
}
function encodeTransaction(transaction) {
  return {
    transactionId: transaction.id,
    mutations: encodeAll(transaction.mutations)
  };
}
function encodeMutation(mutation) {
  switch (mutation.type) {
    case "create":
      return { [mutation.type]: mutation.document };
    case "createIfNotExists":
      return { [mutation.type]: mutation.document };
    case "createOrReplace":
      return { [mutation.type]: mutation.document };
    case "delete":
      return {
        delete: { id: mutation.id }
      };
    case "patch": {
      const ifRevisionID2 = mutation.options?.ifRevision;
      return mutation.patches.map((patch) => ({
        patch: {
          id: mutation.id,
          ...ifRevisionID2 && { ifRevisionID: ifRevisionID2 },
          ...encodePatch(patch)
        }
      }));
    }
  }
}
function encodePatch(patch) {
  const { path, op } = patch;
  if (op.type === "unset")
    return { unset: [stringify(path)] };
  if (op.type === "insert")
    return {
      insert: {
        [op.position]: stringify([...path, op.referenceItem]),
        items: op.items
      }
    };
  if (op.type === "diffMatchPatch")
    return { diffMatchPatch: { [stringify(path)]: op.value } };
  if (op.type === "inc")
    return { inc: { [stringify(path)]: op.amount } };
  if (op.type === "dec")
    return { dec: { [stringify(path)]: op.amount } };
  if (op.type === "set" || op.type === "setIfMissing")
    return { [op.type]: { [stringify(path)]: op.value } };
  if (op.type === "truncate") {
    const range = [
      op.startIndex,
      typeof op.endIndex == "number" ? op.endIndex : ""
    ].join(":");
    return { unset: [`${stringify(path)}[${range}]`] };
  }
  if (op.type === "upsert")
    return {
      unset: op.items.map(
        (item) => stringify([...path, { _key: item._key }])
      ),
      insert: {
        [op.position]: stringify([...path, op.referenceItem]),
        items: op.items
      }
    };
  if (op.type === "assign")
    return {
      set: Object.fromEntries(
        Object.keys(op.value).map((key) => [
          stringify(path.concat(key)),
          op.value[key]
        ])
      )
    };
  if (op.type === "unassign")
    return {
      unset: op.keys.map((key) => stringify(path.concat(key)))
    };
  if (op.type === "replace")
    return {
      insert: {
        replace: stringify(path.concat(op.referenceItem)),
        items: op.items
      }
    };
  if (op.type === "remove")
    return {
      unset: [stringify(path.concat(op.referenceItem))]
    };
  throw op.type === "insertIfMissing" ? new Error("Patch type insertIfMissing is not supported by Sanity") : new Error(`Unknown operation type ${op.type}`);
}

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_chunks-es/isObject.js
function isObject2(val) {
  return val !== null && typeof val == "object" && !Array.isArray(val);
}

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/index.js
function decode2(mutations) {
  return mutations.map(decodeMutation2);
}
function decodeMutation2(mutation) {
  const [type] = mutation;
  if (type === "delete") {
    const [, id2] = mutation;
    return { id: id2, type };
  } else if (type === "create") {
    const [, document2] = mutation;
    return { type, document: document2 };
  } else if (type === "createIfNotExists") {
    const [, document2] = mutation;
    return { type, document: document2 };
  } else if (type === "createOrReplace") {
    const [, document2] = mutation;
    return { type, document: document2 };
  } else if (type === "patch")
    return decodePatchMutation(mutation);
  throw new Error(`Unrecognized mutation: ${JSON.stringify(mutation)}`);
}
function decodePatchMutation(mutation) {
  const [, type, id2, serializedPath, , revisionId] = mutation, path = parse4(serializedPath);
  if (type === "dec" || type === "inc") {
    const [, , , , [amount]] = mutation;
    return {
      type: "patch",
      id: id2,
      patches: [{ path, op: { type: "inc", amount } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "unset")
    return {
      type: "patch",
      id: id2,
      patches: [{ path, op: { type: "unset" } }],
      ...createOpts(revisionId)
    };
  if (type === "insert") {
    const [, , , , [position, ref, items]] = mutation;
    return {
      type: "patch",
      id: id2,
      patches: [
        {
          path,
          op: {
            type: "insert",
            position,
            items,
            referenceItem: typeof ref == "string" ? { _key: ref } : ref
          }
        }
      ],
      ...createOpts(revisionId)
    };
  }
  if (type === "set") {
    const [, , , , [value]] = mutation;
    return {
      type: "patch",
      id: id2,
      patches: [{ path, op: { type: "set", value } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "setIfMissing") {
    const [, , , , [value]] = mutation;
    return {
      type: "patch",
      id: id2,
      patches: [{ path, op: { type: "setIfMissing", value } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "diffMatchPatch") {
    const [, , , , [value]] = mutation;
    return {
      type: "patch",
      id: id2,
      patches: [{ path, op: { type: "diffMatchPatch", value } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "truncate") {
    const [, , , , [startIndex, endIndex]] = mutation;
    return {
      type: "patch",
      id: id2,
      patches: [{ path, op: { type: "truncate", startIndex, endIndex } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "assign") {
    const [, , , , [value]] = mutation;
    return {
      type: "patch",
      id: id2,
      patches: [{ path, op: { type: "assign", value } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "replace") {
    const [, , , , [ref, items]] = mutation;
    return {
      type: "patch",
      id: id2,
      patches: [
        { path, op: { type: "replace", items, referenceItem: decodeItemRef(ref) } }
      ],
      ...createOpts(revisionId)
    };
  }
  if (type === "upsert") {
    const [, , , , [position, referenceItem, items]] = mutation, decodedReferenceItem = decodeItemRef(referenceItem);
    return {
      type: "patch",
      id: id2,
      patches: [
        {
          path,
          op: {
            type: "upsert",
            items,
            referenceItem: decodedReferenceItem,
            position
          }
        }
      ],
      ...createOpts(revisionId)
    };
  }
  throw new Error(`Invalid mutation type: ${type}`);
}
function decodeItemRef(ref) {
  if (typeof ref == "string")
    return { _key: ref };
  if (typeof ref == "number")
    return ref;
  if (!hasKey$1(ref))
    throw new Error("Cannot decode upsert patch: referenceItem is missing key");
  return ref;
}
function createOpts(revisionId) {
  return revisionId ? { options: { ifRevision: revisionId } } : null;
}
function hasKey$1(item) {
  return (0, import_isObject.default)(item) && "_key" in item;
}
function encode2(mutations) {
  return mutations.flatMap((m2) => encodeMutation$1(m2));
}
function encodeItemRef$1(ref) {
  return typeof ref == "number" ? ref : ref._key;
}
function encodeMutation$1(mutation) {
  if (mutation.type === "create" || mutation.type === "createIfNotExists" || mutation.type === "createOrReplace")
    return [[mutation.type, mutation.document]];
  if (mutation.type === "delete")
    return [["delete", mutation.id]];
  if (mutation.type === "patch")
    return mutation.patches.map(
      (patch2) => maybeAddRevision(
        mutation.options?.ifRevision,
        encodePatchMutation(mutation.id, patch2)
      )
    );
  throw new Error(`Invalid mutation type: ${mutation.type}`);
}
function encodePatchMutation(id2, patch2) {
  const { op } = patch2, path = stringify(patch2.path);
  if (op.type === "unset")
    return ["patch", "unset", id2, path, []];
  if (op.type === "diffMatchPatch")
    return ["patch", "diffMatchPatch", id2, path, [op.value]];
  if (op.type === "inc" || op.type === "dec")
    return ["patch", op.type, id2, path, [op.amount]];
  if (op.type === "set")
    return ["patch", op.type, id2, path, [op.value]];
  if (op.type === "setIfMissing")
    return ["patch", op.type, id2, path, [op.value]];
  if (op.type === "insert")
    return [
      "patch",
      "insert",
      id2,
      path,
      [op.position, encodeItemRef$1(op.referenceItem), op.items]
    ];
  if (op.type === "upsert")
    return [
      "patch",
      "upsert",
      id2,
      path,
      [op.position, encodeItemRef$1(op.referenceItem), op.items]
    ];
  if (op.type === "insertIfMissing")
    return [
      "patch",
      "insertIfMissing",
      id2,
      path,
      [op.position, encodeItemRef$1(op.referenceItem), op.items]
    ];
  if (op.type === "assign")
    return ["patch", "assign", id2, path, [op.value]];
  if (op.type === "unassign")
    return ["patch", "assign", id2, path, [op.keys]];
  if (op.type === "replace")
    return [
      "patch",
      "replace",
      id2,
      path,
      [encodeItemRef$1(op.referenceItem), op.items]
    ];
  if (op.type === "truncate")
    return ["patch", "truncate", id2, path, [op.startIndex, op.endIndex]];
  if (op.type === "remove")
    return ["patch", "remove", id2, path, [encodeItemRef$1(op.referenceItem)]];
  throw new Error(`Invalid operation type: ${op.type}`);
}
function maybeAddRevision(revision, mut) {
  const [mutType, patchType, id2, path, args] = mut;
  return revision ? [mutType, patchType, id2, path, args, revision] : mut;
}
var index$2 = Object.freeze({
  __proto__: null,
  decode: decode2,
  encode: encode2
});
function at(path, operation) {
  return {
    path: typeof path == "string" ? parse4(path) : path,
    op: operation
  };
}
var set = (value) => ({ type: "set", value });
var setIfMissing = (value) => ({
  type: "setIfMissing",
  value
});
var unset = () => ({ type: "unset" });
var diffMatchPatch = (value) => ({
  type: "diffMatchPatch",
  value
});
function insert(items, position, indexOrReferenceItem) {
  return {
    type: "insert",
    referenceItem: indexOrReferenceItem,
    position,
    items: arrify(items)
  };
}
function assertCompatible(formPatchPath) {
  if (formPatchPath.length === 0)
    return formPatchPath;
  for (const element of formPatchPath)
    if (Array.isArray(element))
      throw new Error("Form patch paths cannot include arrays");
  return formPatchPath;
}
function encodePatches(patches) {
  return patches.map((formPatch) => {
    const path = assertCompatible(formPatch.path);
    if (formPatch.type === "unset")
      return at(path, unset());
    if (formPatch.type === "set")
      return at(path, set(formPatch.value));
    if (formPatch.type === "setIfMissing")
      return at(path, setIfMissing(formPatch.value));
    if (formPatch.type === "insert") {
      const arrayPath = path.slice(0, -1), itemRef = formPatch.path[formPatch.path.length - 1];
      return at(
        arrayPath,
        insert(
          formPatch.items,
          formPatch.position,
          itemRef
        )
      );
    }
    if (formPatch.type === "diffMatchPatch")
      return at(path, diffMatchPatch(formPatch.value));
    throw new Error(`Unknown patch type ${formPatch.type}`);
  });
}
var index$1 = Object.freeze({
  __proto__: null,
  encodePatches
});
var index = Object.freeze({
  __proto__: null,
  decode,
  decodeAll,
  encode,
  encodeAll,
  encodeMutation,
  encodePatch,
  encodeTransaction
});
function format(mutations) {
  return mutations.flatMap((m2) => encodeMutation2(m2)).join(`
`);
}
function encodeItemRef(ref) {
  return typeof ref == "number" ? ref : ref._key;
}
function encodeMutation2(mutation) {
  if (mutation.type === "create" || mutation.type === "createIfNotExists" || mutation.type === "createOrReplace")
    return [mutation.type, ": ", JSON.stringify(mutation.document)].join("");
  if (mutation.type === "delete")
    return ["delete ", mutation.id].join(": ");
  if (mutation.type === "patch") {
    const ifRevision = mutation.options?.ifRevision;
    return [
      "patch",
      " ",
      `id=${mutation.id}`,
      ifRevision ? ` (if revision==${ifRevision})` : "",
      `:
`,
      mutation.patches.map((nodePatch) => `  ${formatPatchMutation(nodePatch)}`).join(`
`)
    ].join("");
  }
  throw new Error(`Invalid mutation type: ${mutation.type}`);
}
function formatPatchMutation(patch2) {
  const { op } = patch2, path = stringify(patch2.path);
  if (op.type === "unset")
    return [path, "unset()"].join(": ");
  if (op.type === "diffMatchPatch")
    return [path, `diffMatchPatch(${op.value})`].join(": ");
  if (op.type === "inc" || op.type === "dec")
    return [path, `${op.type}(${op.amount})`].join(": ");
  if (op.type === "set" || op.type === "setIfMissing")
    return [path, `${op.type}(${JSON.stringify(op.value)})`].join(": ");
  if (op.type === "assign")
    return [path, `${op.type}(${JSON.stringify(op.value)})`].join(": ");
  if (op.type === "unassign")
    return [path, `${op.type}(${JSON.stringify(op.keys)})`].join(": ");
  if (op.type === "insert" || op.type === "upsert" || op.type === "insertIfMissing")
    return [
      path,
      `${op.type}(${op.position}, ${encodeItemRef(
        op.referenceItem
      )}, ${JSON.stringify(op.items)})`
    ].join(": ");
  if (op.type === "replace")
    return [
      path,
      `replace(${encodeItemRef(op.referenceItem)}, ${JSON.stringify(
        op.items
      )})`
    ].join(": ");
  if (op.type === "truncate")
    return [path, `truncate(${op.startIndex}, ${op.endIndex}`].join(": ");
  if (op.type === "remove")
    return [path, `remove(${encodeItemRef(op.referenceItem)})`].join(": ");
  throw new Error(`Invalid operation type: ${op.type}`);
}
var compact = Object.freeze({
  __proto__: null,
  format
});

// ../../node_modules/.pnpm/@isaacs+ttlcache@2.1.5/node_modules/@isaacs/ttlcache/dist/esm/index.js
var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
var TIMER_MAX = 2 ** 31 - 1;

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_unstable_store.js
var import_partition = __toESM(require_partition());
var import_keyBy = __toESM(require_keyBy());

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_chunks-es/toTransactions.js
var import_groupBy = __toESM(require_groupBy(), 1);

// ../../node_modules/.pnpm/@sanity+diff-match-patch@3.2.0/node_modules/@sanity/diff-match-patch/dist/index.js
function cloneDiff(diff22) {
  const [type, patch] = diff22;
  return [type, patch];
}
function getCommonOverlap(textA, textB) {
  let text1 = textA, text2 = textB;
  const text1Length = text1.length, text2Length = text2.length;
  if (text1Length === 0 || text2Length === 0)
    return 0;
  text1Length > text2Length ? text1 = text1.substring(text1Length - text2Length) : text1Length < text2Length && (text2 = text2.substring(0, text1Length));
  const textLength = Math.min(text1Length, text2Length);
  if (text1 === text2)
    return textLength;
  let best = 0, length = 1;
  for (let found = 0; found !== -1; ) {
    const pattern = text1.substring(textLength - length);
    if (found = text2.indexOf(pattern), found === -1)
      return best;
    length += found, (found === 0 || text1.substring(textLength - length) === text2.substring(0, length)) && (best = length, length++);
  }
  return best;
}
function getCommonPrefix(text1, text2) {
  if (!text1 || !text2 || text1[0] !== text2[0])
    return 0;
  let pointerMin = 0, pointerMax = Math.min(text1.length, text2.length), pointerMid = pointerMax, pointerStart = 0;
  for (; pointerMin < pointerMid; )
    text1.substring(pointerStart, pointerMid) === text2.substring(pointerStart, pointerMid) ? (pointerMin = pointerMid, pointerStart = pointerMin) : pointerMax = pointerMid, pointerMid = Math.floor((pointerMax - pointerMin) / 2 + pointerMin);
  return pointerMid;
}
function getCommonSuffix(text1, text2) {
  if (!text1 || !text2 || text1[text1.length - 1] !== text2[text2.length - 1])
    return 0;
  let pointerMin = 0, pointerMax = Math.min(text1.length, text2.length), pointerMid = pointerMax, pointerEnd = 0;
  for (; pointerMin < pointerMid; )
    text1.substring(text1.length - pointerMid, text1.length - pointerEnd) === text2.substring(text2.length - pointerMid, text2.length - pointerEnd) ? (pointerMin = pointerMid, pointerEnd = pointerMin) : pointerMax = pointerMid, pointerMid = Math.floor((pointerMax - pointerMin) / 2 + pointerMin);
  return pointerMid;
}
function isHighSurrogate(char) {
  const charCode = char.charCodeAt(0);
  return charCode >= 55296 && charCode <= 56319;
}
function isLowSurrogate(char) {
  const charCode = char.charCodeAt(0);
  return charCode >= 56320 && charCode <= 57343;
}
function bisect(text1, text2, deadline) {
  const text1Length = text1.length, text2Length = text2.length, maxD = Math.ceil((text1Length + text2Length) / 2), vOffset = maxD, vLength = 2 * maxD, v1 = new Array(vLength), v2 = new Array(vLength);
  for (let x = 0; x < vLength; x++)
    v1[x] = -1, v2[x] = -1;
  v1[vOffset + 1] = 0, v2[vOffset + 1] = 0;
  const delta2 = text1Length - text2Length, front = delta2 % 2 !== 0;
  let k1start = 0, k1end = 0, k2start = 0, k2end = 0;
  for (let d2 = 0; d2 < maxD && !(Date.now() > deadline); d2++) {
    for (let k1 = -d2 + k1start; k1 <= d2 - k1end; k1 += 2) {
      const k1Offset = vOffset + k1;
      let x1;
      k1 === -d2 || k1 !== d2 && v1[k1Offset - 1] < v1[k1Offset + 1] ? x1 = v1[k1Offset + 1] : x1 = v1[k1Offset - 1] + 1;
      let y1 = x1 - k1;
      for (; x1 < text1Length && y1 < text2Length && text1.charAt(x1) === text2.charAt(y1); )
        x1++, y1++;
      if (v1[k1Offset] = x1, x1 > text1Length)
        k1end += 2;
      else if (y1 > text2Length)
        k1start += 2;
      else if (front) {
        const k2Offset = vOffset + delta2 - k1;
        if (k2Offset >= 0 && k2Offset < vLength && v2[k2Offset] !== -1) {
          const x2 = text1Length - v2[k2Offset];
          if (x1 >= x2)
            return bisectSplit(text1, text2, x1, y1, deadline);
        }
      }
    }
    for (let k2 = -d2 + k2start; k2 <= d2 - k2end; k2 += 2) {
      const k2Offset = vOffset + k2;
      let x2;
      k2 === -d2 || k2 !== d2 && v2[k2Offset - 1] < v2[k2Offset + 1] ? x2 = v2[k2Offset + 1] : x2 = v2[k2Offset - 1] + 1;
      let y2 = x2 - k2;
      for (; x2 < text1Length && y2 < text2Length && text1.charAt(text1Length - x2 - 1) === text2.charAt(text2Length - y2 - 1); )
        x2++, y2++;
      if (v2[k2Offset] = x2, x2 > text1Length)
        k2end += 2;
      else if (y2 > text2Length)
        k2start += 2;
      else if (!front) {
        const k1Offset = vOffset + delta2 - k2;
        if (k1Offset >= 0 && k1Offset < vLength && v1[k1Offset] !== -1) {
          const x1 = v1[k1Offset], y1 = vOffset + x1 - k1Offset;
          if (x2 = text1Length - x2, x1 >= x2)
            return bisectSplit(text1, text2, x1, y1, deadline);
        }
      }
    }
  }
  return [
    [DIFF_DELETE, text1],
    [DIFF_INSERT, text2]
  ];
}
function bisectSplit(text1, text2, x, y2, deadline) {
  const text1a = text1.substring(0, x), text2a = text2.substring(0, y2), text1b = text1.substring(x), text2b = text2.substring(y2), diffs = doDiff(text1a, text2a, { checkLines: false, deadline }), diffsb = doDiff(text1b, text2b, { checkLines: false, deadline });
  return diffs.concat(diffsb);
}
function findHalfMatch(text1, text2, timeout = 1) {
  if (timeout <= 0)
    return null;
  const longText = text1.length > text2.length ? text1 : text2, shortText = text1.length > text2.length ? text2 : text1;
  if (longText.length < 4 || shortText.length * 2 < longText.length)
    return null;
  const halfMatch1 = halfMatchI(longText, shortText, Math.ceil(longText.length / 4)), halfMatch2 = halfMatchI(longText, shortText, Math.ceil(longText.length / 2));
  let halfMatch;
  if (halfMatch1 && halfMatch2)
    halfMatch = halfMatch1[4].length > halfMatch2[4].length ? halfMatch1 : halfMatch2;
  else {
    if (!halfMatch1 && !halfMatch2)
      return null;
    halfMatch2 ? halfMatch1 || (halfMatch = halfMatch2) : halfMatch = halfMatch1;
  }
  if (!halfMatch)
    throw new Error("Unable to find a half match.");
  let text1A, text1B, text2A, text2B;
  text1.length > text2.length ? (text1A = halfMatch[0], text1B = halfMatch[1], text2A = halfMatch[2], text2B = halfMatch[3]) : (text2A = halfMatch[0], text2B = halfMatch[1], text1A = halfMatch[2], text1B = halfMatch[3]);
  const midCommon = halfMatch[4];
  return [text1A, text1B, text2A, text2B, midCommon];
}
function halfMatchI(longText, shortText, i) {
  const seed = longText.slice(i, i + Math.floor(longText.length / 4));
  let j = -1, bestCommon = "", bestLongTextA, bestLongTextB, bestShortTextA, bestShortTextB;
  for (; (j = shortText.indexOf(seed, j + 1)) !== -1; ) {
    const prefixLength = getCommonPrefix(longText.slice(i), shortText.slice(j)), suffixLength = getCommonSuffix(longText.slice(0, i), shortText.slice(0, j));
    bestCommon.length < suffixLength + prefixLength && (bestCommon = shortText.slice(j - suffixLength, j) + shortText.slice(j, j + prefixLength), bestLongTextA = longText.slice(0, i - suffixLength), bestLongTextB = longText.slice(i + prefixLength), bestShortTextA = shortText.slice(0, j - suffixLength), bestShortTextB = shortText.slice(j + prefixLength));
  }
  return bestCommon.length * 2 >= longText.length ? [
    bestLongTextA || "",
    bestLongTextB || "",
    bestShortTextA || "",
    bestShortTextB || "",
    bestCommon || ""
  ] : null;
}
function charsToLines(diffs, lineArray) {
  for (let x = 0; x < diffs.length; x++) {
    const chars = diffs[x][1], text2 = [];
    for (let y2 = 0; y2 < chars.length; y2++)
      text2[y2] = lineArray[chars.charCodeAt(y2)];
    diffs[x][1] = text2.join("");
  }
}
function linesToChars(textA, textB) {
  const lineArray = [], lineHash = {};
  lineArray[0] = "";
  function diffLinesToMunge(text2) {
    let chars = "", lineStart = 0, lineEnd = -1, lineArrayLength = lineArray.length;
    for (; lineEnd < text2.length - 1; ) {
      lineEnd = text2.indexOf(`
`, lineStart), lineEnd === -1 && (lineEnd = text2.length - 1);
      let line = text2.slice(lineStart, lineEnd + 1);
      (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== void 0) ? chars += String.fromCharCode(lineHash[line]) : (lineArrayLength === maxLines && (line = text2.slice(lineStart), lineEnd = text2.length), chars += String.fromCharCode(lineArrayLength), lineHash[line] = lineArrayLength, lineArray[lineArrayLength++] = line), lineStart = lineEnd + 1;
    }
    return chars;
  }
  let maxLines = 4e4;
  const chars1 = diffLinesToMunge(textA);
  maxLines = 65535;
  const chars2 = diffLinesToMunge(textB);
  return { chars1, chars2, lineArray };
}
function doLineModeDiff(textA, textB, opts) {
  let text1 = textA, text2 = textB;
  const a = linesToChars(text1, text2);
  text1 = a.chars1, text2 = a.chars2;
  const linearray = a.lineArray;
  let diffs = doDiff(text1, text2, {
    checkLines: false,
    deadline: opts.deadline
  });
  charsToLines(diffs, linearray), diffs = cleanupSemantic(diffs), diffs.push([DIFF_EQUAL, ""]);
  let pointer = 0, countDelete = 0, countInsert = 0, textDelete = "", textInsert = "";
  for (; pointer < diffs.length; ) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        countInsert++, textInsert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        countDelete++, textDelete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        if (countDelete >= 1 && countInsert >= 1) {
          diffs.splice(pointer - countDelete - countInsert, countDelete + countInsert), pointer = pointer - countDelete - countInsert;
          const aa = doDiff(textDelete, textInsert, {
            checkLines: false,
            deadline: opts.deadline
          });
          for (let j = aa.length - 1; j >= 0; j--)
            diffs.splice(pointer, 0, aa[j]);
          pointer += aa.length;
        }
        countInsert = 0, countDelete = 0, textDelete = "", textInsert = "";
        break;
      default:
        throw new Error("Unknown diff operation.");
    }
    pointer++;
  }
  return diffs.pop(), diffs;
}
function computeDiff(text1, text2, opts) {
  let diffs;
  if (!text1)
    return [[DIFF_INSERT, text2]];
  if (!text2)
    return [[DIFF_DELETE, text1]];
  const longtext = text1.length > text2.length ? text1 : text2, shorttext = text1.length > text2.length ? text2 : text1, i = longtext.indexOf(shorttext);
  if (i !== -1)
    return diffs = [
      [DIFF_INSERT, longtext.substring(0, i)],
      [DIFF_EQUAL, shorttext],
      [DIFF_INSERT, longtext.substring(i + shorttext.length)]
    ], text1.length > text2.length && (diffs[0][0] = DIFF_DELETE, diffs[2][0] = DIFF_DELETE), diffs;
  if (shorttext.length === 1)
    return [
      [DIFF_DELETE, text1],
      [DIFF_INSERT, text2]
    ];
  const halfMatch = findHalfMatch(text1, text2);
  if (halfMatch) {
    const text1A = halfMatch[0], text1B = halfMatch[1], text2A = halfMatch[2], text2B = halfMatch[3], midCommon = halfMatch[4], diffsA = doDiff(text1A, text2A, opts), diffsB = doDiff(text1B, text2B, opts);
    return diffsA.concat([[DIFF_EQUAL, midCommon]], diffsB);
  }
  return opts.checkLines && text1.length > 100 && text2.length > 100 ? doLineModeDiff(text1, text2, opts) : bisect(text1, text2, opts.deadline);
}
var __defProp$2 = Object.defineProperty;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp$2.call(b, prop) && __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b))
      __propIsEnum$2.call(b, prop) && __defNormalProp$2(a, prop, b[prop]);
  return a;
};
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;
function diff(textA, textB, opts) {
  if (textA === null || textB === null)
    throw new Error("Null input. (diff)");
  const diffs = doDiff(textA, textB, createInternalOpts(opts || {}));
  return adjustDiffForSurrogatePairs(diffs), diffs;
}
function doDiff(textA, textB, options) {
  let text1 = textA, text2 = textB;
  if (text1 === text2)
    return text1 ? [[DIFF_EQUAL, text1]] : [];
  let commonlength = getCommonPrefix(text1, text2);
  const commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength), text2 = text2.substring(commonlength), commonlength = getCommonSuffix(text1, text2);
  const commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength), text2 = text2.substring(0, text2.length - commonlength);
  let diffs = computeDiff(text1, text2, options);
  return commonprefix && diffs.unshift([DIFF_EQUAL, commonprefix]), commonsuffix && diffs.push([DIFF_EQUAL, commonsuffix]), diffs = cleanupMerge(diffs), diffs;
}
function createDeadLine(timeout) {
  let t = 1;
  return typeof timeout < "u" && (t = timeout <= 0 ? Number.MAX_VALUE : timeout), Date.now() + t * 1e3;
}
function createInternalOpts(opts) {
  return __spreadValues$2({
    checkLines: true,
    deadline: createDeadLine(opts.timeout || 1)
  }, opts);
}
function combineChar(data, char, dir) {
  return dir === 1 ? data + char : char + data;
}
function splitChar(data, dir) {
  return dir === 1 ? [data.substring(0, data.length - 1), data[data.length - 1]] : [data.substring(1), data[0]];
}
function hasSharedChar(diffs, i, j, dir) {
  return dir === 1 ? diffs[i][1][diffs[i][1].length - 1] === diffs[j][1][diffs[j][1].length - 1] : diffs[i][1][0] === diffs[j][1][0];
}
function deisolateChar(diffs, i, dir) {
  const inv = dir === 1 ? -1 : 1;
  let insertIdx = null, deleteIdx = null, j = i + dir;
  for (; j >= 0 && j < diffs.length && (insertIdx === null || deleteIdx === null); j += dir) {
    const [op, text22] = diffs[j];
    if (text22.length !== 0) {
      if (op === DIFF_INSERT) {
        insertIdx === null && (insertIdx = j);
        continue;
      } else if (op === DIFF_DELETE) {
        deleteIdx === null && (deleteIdx = j);
        continue;
      } else if (op === DIFF_EQUAL) {
        if (insertIdx === null && deleteIdx === null) {
          const [rest, char2] = splitChar(diffs[i][1], dir);
          diffs[i][1] = rest, diffs[j][1] = combineChar(diffs[j][1], char2, inv);
          return;
        }
        break;
      }
    }
  }
  if (insertIdx !== null && deleteIdx !== null && hasSharedChar(diffs, insertIdx, deleteIdx, dir)) {
    const [insertText, insertChar] = splitChar(diffs[insertIdx][1], inv), [deleteText] = splitChar(diffs[deleteIdx][1], inv);
    diffs[insertIdx][1] = insertText, diffs[deleteIdx][1] = deleteText, diffs[i][1] = combineChar(diffs[i][1], insertChar, dir);
    return;
  }
  const [text2, char] = splitChar(diffs[i][1], dir);
  diffs[i][1] = text2, insertIdx === null ? (diffs.splice(j, 0, [DIFF_INSERT, char]), deleteIdx !== null && deleteIdx >= j && deleteIdx++) : diffs[insertIdx][1] = combineChar(diffs[insertIdx][1], char, inv), deleteIdx === null ? diffs.splice(j, 0, [DIFF_DELETE, char]) : diffs[deleteIdx][1] = combineChar(diffs[deleteIdx][1], char, inv);
}
function adjustDiffForSurrogatePairs(diffs) {
  for (let i = 0; i < diffs.length; i++) {
    const [diffType, diffText] = diffs[i];
    if (diffText.length === 0) continue;
    const firstChar = diffText[0], lastChar = diffText[diffText.length - 1];
    isHighSurrogate(lastChar) && diffType === DIFF_EQUAL && deisolateChar(diffs, i, 1), isLowSurrogate(firstChar) && diffType === DIFF_EQUAL && deisolateChar(diffs, i, -1);
  }
  for (let i = 0; i < diffs.length; i++)
    diffs[i][1].length === 0 && diffs.splice(i, 1);
}
function cleanupSemantic(rawDiffs) {
  let diffs = rawDiffs.map((diff22) => cloneDiff(diff22)), hasChanges = false;
  const equalities = [];
  let equalitiesLength = 0, lastEquality = null, pointer = 0, lengthInsertions1 = 0, lengthDeletions1 = 0, lengthInsertions2 = 0, lengthDeletions2 = 0;
  for (; pointer < diffs.length; )
    diffs[pointer][0] === DIFF_EQUAL ? (equalities[equalitiesLength++] = pointer, lengthInsertions1 = lengthInsertions2, lengthDeletions1 = lengthDeletions2, lengthInsertions2 = 0, lengthDeletions2 = 0, lastEquality = diffs[pointer][1]) : (diffs[pointer][0] === DIFF_INSERT ? lengthInsertions2 += diffs[pointer][1].length : lengthDeletions2 += diffs[pointer][1].length, lastEquality && lastEquality.length <= Math.max(lengthInsertions1, lengthDeletions1) && lastEquality.length <= Math.max(lengthInsertions2, lengthDeletions2) && (diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastEquality]), diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT, equalitiesLength--, equalitiesLength--, pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1, lengthInsertions1 = 0, lengthDeletions1 = 0, lengthInsertions2 = 0, lengthDeletions2 = 0, lastEquality = null, hasChanges = true)), pointer++;
  for (hasChanges && (diffs = cleanupMerge(diffs)), diffs = cleanupSemanticLossless(diffs), pointer = 1; pointer < diffs.length; ) {
    if (diffs[pointer - 1][0] === DIFF_DELETE && diffs[pointer][0] === DIFF_INSERT) {
      const deletion = diffs[pointer - 1][1], insertion = diffs[pointer][1], overlapLength1 = getCommonOverlap(deletion, insertion), overlapLength2 = getCommonOverlap(insertion, deletion);
      overlapLength1 >= overlapLength2 ? (overlapLength1 >= deletion.length / 2 || overlapLength1 >= insertion.length / 2) && (diffs.splice(pointer, 0, [DIFF_EQUAL, insertion.substring(0, overlapLength1)]), diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlapLength1), diffs[pointer + 1][1] = insertion.substring(overlapLength1), pointer++) : (overlapLength2 >= deletion.length / 2 || overlapLength2 >= insertion.length / 2) && (diffs.splice(pointer, 0, [DIFF_EQUAL, deletion.substring(0, overlapLength2)]), diffs[pointer - 1][0] = DIFF_INSERT, diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlapLength2), diffs[pointer + 1][0] = DIFF_DELETE, diffs[pointer + 1][1] = deletion.substring(overlapLength2), pointer++), pointer++;
    }
    pointer++;
  }
  return diffs;
}
var nonAlphaNumericRegex = /[^a-zA-Z0-9]/;
var whitespaceRegex = /\s/;
var linebreakRegex = /[\r\n]/;
var blanklineEndRegex = /\n\r?\n$/;
var blanklineStartRegex = /^\r?\n\r?\n/;
function cleanupSemanticLossless(rawDiffs) {
  const diffs = rawDiffs.map((diff22) => cloneDiff(diff22));
  function diffCleanupSemanticScore(one, two) {
    if (!one || !two)
      return 6;
    const char1 = one.charAt(one.length - 1), char2 = two.charAt(0), nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex), nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex), whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex), whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex), lineBreak1 = whitespace1 && char1.match(linebreakRegex), lineBreak2 = whitespace2 && char2.match(linebreakRegex), blankLine1 = lineBreak1 && one.match(blanklineEndRegex), blankLine2 = lineBreak2 && two.match(blanklineStartRegex);
    return blankLine1 || blankLine2 ? 5 : lineBreak1 || lineBreak2 ? 4 : nonAlphaNumeric1 && !whitespace1 && whitespace2 ? 3 : whitespace1 || whitespace2 ? 2 : nonAlphaNumeric1 || nonAlphaNumeric2 ? 1 : 0;
  }
  let pointer = 1;
  for (; pointer < diffs.length - 1; ) {
    if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
      let equality1 = diffs[pointer - 1][1], edit = diffs[pointer][1], equality2 = diffs[pointer + 1][1];
      const commonOffset = getCommonSuffix(equality1, edit);
      if (commonOffset) {
        const commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset), edit = commonString + edit.substring(0, edit.length - commonOffset), equality2 = commonString + equality2;
      }
      let bestEquality1 = equality1, bestEdit = edit, bestEquality2 = equality2, bestScore = diffCleanupSemanticScore(equality1, edit) + diffCleanupSemanticScore(edit, equality2);
      for (; edit.charAt(0) === equality2.charAt(0); ) {
        equality1 += edit.charAt(0), edit = edit.substring(1) + equality2.charAt(0), equality2 = equality2.substring(1);
        const score = diffCleanupSemanticScore(equality1, edit) + diffCleanupSemanticScore(edit, equality2);
        score >= bestScore && (bestScore = score, bestEquality1 = equality1, bestEdit = edit, bestEquality2 = equality2);
      }
      diffs[pointer - 1][1] !== bestEquality1 && (bestEquality1 ? diffs[pointer - 1][1] = bestEquality1 : (diffs.splice(pointer - 1, 1), pointer--), diffs[pointer][1] = bestEdit, bestEquality2 ? diffs[pointer + 1][1] = bestEquality2 : (diffs.splice(pointer + 1, 1), pointer--));
    }
    pointer++;
  }
  return diffs;
}
function cleanupMerge(rawDiffs) {
  let diffs = rawDiffs.map((diff22) => cloneDiff(diff22));
  diffs.push([DIFF_EQUAL, ""]);
  let pointer = 0, countDelete = 0, countInsert = 0, textDelete = "", textInsert = "", commonlength;
  for (; pointer < diffs.length; )
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        countInsert++, textInsert += diffs[pointer][1], pointer++;
        break;
      case DIFF_DELETE:
        countDelete++, textDelete += diffs[pointer][1], pointer++;
        break;
      case DIFF_EQUAL:
        countDelete + countInsert > 1 ? (countDelete !== 0 && countInsert !== 0 && (commonlength = getCommonPrefix(textInsert, textDelete), commonlength !== 0 && (pointer - countDelete - countInsert > 0 && diffs[pointer - countDelete - countInsert - 1][0] === DIFF_EQUAL ? diffs[pointer - countDelete - countInsert - 1][1] += textInsert.substring(
          0,
          commonlength
        ) : (diffs.splice(0, 0, [DIFF_EQUAL, textInsert.substring(0, commonlength)]), pointer++), textInsert = textInsert.substring(commonlength), textDelete = textDelete.substring(commonlength)), commonlength = getCommonSuffix(textInsert, textDelete), commonlength !== 0 && (diffs[pointer][1] = textInsert.substring(textInsert.length - commonlength) + diffs[pointer][1], textInsert = textInsert.substring(0, textInsert.length - commonlength), textDelete = textDelete.substring(0, textDelete.length - commonlength))), pointer -= countDelete + countInsert, diffs.splice(pointer, countDelete + countInsert), textDelete.length && (diffs.splice(pointer, 0, [DIFF_DELETE, textDelete]), pointer++), textInsert.length && (diffs.splice(pointer, 0, [DIFF_INSERT, textInsert]), pointer++), pointer++) : pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL ? (diffs[pointer - 1][1] += diffs[pointer][1], diffs.splice(pointer, 1)) : pointer++, countInsert = 0, countDelete = 0, textDelete = "", textInsert = "";
        break;
      default:
        throw new Error("Unknown diff operation");
    }
  diffs[diffs.length - 1][1] === "" && diffs.pop();
  let hasChanges = false;
  for (pointer = 1; pointer < diffs.length - 1; )
    diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL && (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) === diffs[pointer - 1][1] ? (diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length), diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1], diffs.splice(pointer - 1, 1), hasChanges = true) : diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) === diffs[pointer + 1][1] && (diffs[pointer - 1][1] += diffs[pointer + 1][1], diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1], diffs.splice(pointer + 1, 1), hasChanges = true)), pointer++;
  return hasChanges && (diffs = cleanupMerge(diffs)), diffs;
}
function trueCount(...args) {
  return args.reduce((n, bool) => n + (bool ? 1 : 0), 0);
}
function cleanupEfficiency(rawDiffs, editCost = 4) {
  let diffs = rawDiffs.map((diff22) => cloneDiff(diff22)), hasChanges = false;
  const equalities = [];
  let equalitiesLength = 0, lastEquality = null, pointer = 0, preIns = false, preDel = false, postIns = false, postDel = false;
  for (; pointer < diffs.length; )
    diffs[pointer][0] === DIFF_EQUAL ? (diffs[pointer][1].length < editCost && (postIns || postDel) ? (equalities[equalitiesLength++] = pointer, preIns = postIns, preDel = postDel, lastEquality = diffs[pointer][1]) : (equalitiesLength = 0, lastEquality = null), postIns = false, postDel = false) : (diffs[pointer][0] === DIFF_DELETE ? postDel = true : postIns = true, lastEquality && (preIns && preDel && postIns && postDel || lastEquality.length < editCost / 2 && trueCount(preIns, preDel, postIns, postDel) === 3) && (diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastEquality]), diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT, equalitiesLength--, lastEquality = null, preIns && preDel ? (postIns = true, postDel = true, equalitiesLength = 0) : (equalitiesLength--, pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1, postIns = false, postDel = false), hasChanges = true)), pointer++;
  return hasChanges && (diffs = cleanupMerge(diffs)), diffs;
}
var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp$1.call(b, prop) && __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b))
      __propIsEnum$1.call(b, prop) && __defNormalProp$1(a, prop, b[prop]);
  return a;
};
var DEFAULT_OPTIONS = {
  /**
   * At what point is no match declared (0.0 = perfection, 1.0 = very loose).
   */
  threshold: 0.5,
  /**
   * How far to search for a match (0 = exact location, 1000+ = broad match).
   * A match this many characters away from the expected location will add
   * 1.0 to the score (0.0 is a perfect match).
   */
  distance: 1e3
};
function applyDefaults(options) {
  return __spreadValues$1(__spreadValues$1({}, DEFAULT_OPTIONS), options);
}
var MAX_BITS$1 = 32;
function bitap(text2, pattern, loc, opts = {}) {
  if (pattern.length > MAX_BITS$1)
    throw new Error("Pattern too long for this browser.");
  const options = applyDefaults(opts), s = getAlphabetFromPattern(pattern);
  function getBitapScore(e, x) {
    const accuracy = e / pattern.length, proximity = Math.abs(loc - x);
    return options.distance ? accuracy + proximity / options.distance : proximity ? 1 : accuracy;
  }
  let scoreThreshold = options.threshold, bestLoc = text2.indexOf(pattern, loc);
  bestLoc !== -1 && (scoreThreshold = Math.min(getBitapScore(0, bestLoc), scoreThreshold), bestLoc = text2.lastIndexOf(pattern, loc + pattern.length), bestLoc !== -1 && (scoreThreshold = Math.min(getBitapScore(0, bestLoc), scoreThreshold)));
  const matchmask = 1 << pattern.length - 1;
  bestLoc = -1;
  let binMin, binMid, binMax = pattern.length + text2.length, lastRd = [];
  for (let d2 = 0; d2 < pattern.length; d2++) {
    for (binMin = 0, binMid = binMax; binMin < binMid; )
      getBitapScore(d2, loc + binMid) <= scoreThreshold ? binMin = binMid : binMax = binMid, binMid = Math.floor((binMax - binMin) / 2 + binMin);
    binMax = binMid;
    let start = Math.max(1, loc - binMid + 1);
    const finish = Math.min(loc + binMid, text2.length) + pattern.length, rd = new Array(finish + 2);
    rd[finish + 1] = (1 << d2) - 1;
    for (let j = finish; j >= start; j--) {
      const charMatch = s[text2.charAt(j - 1)];
      if (d2 === 0 ? rd[j] = (rd[j + 1] << 1 | 1) & charMatch : rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((lastRd[j + 1] | lastRd[j]) << 1 | 1) | lastRd[j + 1], rd[j] & matchmask) {
        const score = getBitapScore(d2, j - 1);
        if (score <= scoreThreshold)
          if (scoreThreshold = score, bestLoc = j - 1, bestLoc > loc)
            start = Math.max(1, 2 * loc - bestLoc);
          else
            break;
      }
    }
    if (getBitapScore(d2 + 1, loc) > scoreThreshold)
      break;
    lastRd = rd;
  }
  return bestLoc;
}
function getAlphabetFromPattern(pattern) {
  const s = {};
  for (let i = 0; i < pattern.length; i++)
    s[pattern.charAt(i)] = 0;
  for (let i = 0; i < pattern.length; i++)
    s[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
  return s;
}
function match(text2, pattern, searchLocation, options = {}) {
  if (text2 === null || pattern === null || searchLocation === null)
    throw new Error("Null input. (match())");
  const loc = Math.max(0, Math.min(searchLocation, text2.length));
  if (text2 === pattern)
    return 0;
  if (text2.length) {
    if (text2.substring(loc, loc + pattern.length) === pattern)
      return loc;
  } else return -1;
  return bitap(text2, pattern, loc, options);
}
function diffText1(diffs) {
  const text2 = [];
  for (let x = 0; x < diffs.length; x++)
    diffs[x][0] !== DIFF_INSERT && (text2[x] = diffs[x][1]);
  return text2.join("");
}
function diffText2(diffs) {
  const text2 = [];
  for (let x = 0; x < diffs.length; x++)
    diffs[x][0] !== DIFF_DELETE && (text2[x] = diffs[x][1]);
  return text2.join("");
}
function levenshtein(diffs) {
  let leven = 0, insertions = 0, deletions = 0;
  for (let x = 0; x < diffs.length; x++) {
    const op = diffs[x][0], data = diffs[x][1];
    switch (op) {
      case DIFF_INSERT:
        insertions += data.length;
        break;
      case DIFF_DELETE:
        deletions += data.length;
        break;
      case DIFF_EQUAL:
        leven += Math.max(insertions, deletions), insertions = 0, deletions = 0;
        break;
      default:
        throw new Error("Unknown diff operation.");
    }
  }
  return leven += Math.max(insertions, deletions), leven;
}
function xIndex(diffs, location2) {
  let chars1 = 0, chars2 = 0, lastChars1 = 0, lastChars2 = 0, x;
  for (x = 0; x < diffs.length && (diffs[x][0] !== DIFF_INSERT && (chars1 += diffs[x][1].length), diffs[x][0] !== DIFF_DELETE && (chars2 += diffs[x][1].length), !(chars1 > location2)); x++)
    lastChars1 = chars1, lastChars2 = chars2;
  return diffs.length !== x && diffs[x][0] === DIFF_DELETE ? lastChars2 : lastChars2 + (location2 - lastChars1);
}
function countUtf8Bytes(str) {
  let bytes = 0;
  for (let i = 0; i < str.length; i++) {
    const codePoint = str.codePointAt(i);
    if (typeof codePoint > "u")
      throw new Error("Failed to get codepoint");
    bytes += utf8len(codePoint);
  }
  return bytes;
}
function adjustIndiciesToUcs2(patches, base, options = {}) {
  let byteOffset = 0, idx = 0;
  function advanceTo(target) {
    for (; byteOffset < target; ) {
      const codePoint = base.codePointAt(idx);
      if (typeof codePoint > "u")
        return idx;
      byteOffset += utf8len(codePoint), codePoint > 65535 ? idx += 2 : idx += 1;
    }
    if (!options.allowExceedingIndices && byteOffset !== target)
      throw new Error("Failed to determine byte offset");
    return idx;
  }
  const adjusted = [];
  for (const patch of patches)
    adjusted.push({
      diffs: patch.diffs.map((diff22) => cloneDiff(diff22)),
      start1: advanceTo(patch.start1),
      start2: advanceTo(patch.start2),
      utf8Start1: patch.utf8Start1,
      utf8Start2: patch.utf8Start2,
      length1: patch.length1,
      length2: patch.length2,
      utf8Length1: patch.utf8Length1,
      utf8Length2: patch.utf8Length2
    });
  return adjusted;
}
function utf8len(codePoint) {
  return codePoint <= 127 ? 1 : codePoint <= 2047 ? 2 : codePoint <= 65535 ? 3 : 4;
}
var MAX_BITS = 32;
var DEFAULT_MARGIN = 4;
function addPadding(patches, margin = DEFAULT_MARGIN) {
  const paddingLength = margin;
  let nullPadding = "";
  for (let x = 1; x <= paddingLength; x++)
    nullPadding += String.fromCharCode(x);
  for (const p2 of patches)
    p2.start1 += paddingLength, p2.start2 += paddingLength, p2.utf8Start1 += paddingLength, p2.utf8Start2 += paddingLength;
  let patch = patches[0], diffs = patch.diffs;
  if (diffs.length === 0 || diffs[0][0] !== DIFF_EQUAL)
    diffs.unshift([DIFF_EQUAL, nullPadding]), patch.start1 -= paddingLength, patch.start2 -= paddingLength, patch.utf8Start1 -= paddingLength, patch.utf8Start2 -= paddingLength, patch.length1 += paddingLength, patch.length2 += paddingLength, patch.utf8Length1 += paddingLength, patch.utf8Length2 += paddingLength;
  else if (paddingLength > diffs[0][1].length) {
    const firstDiffLength = diffs[0][1].length, extraLength = paddingLength - firstDiffLength;
    diffs[0][1] = nullPadding.substring(firstDiffLength) + diffs[0][1], patch.start1 -= extraLength, patch.start2 -= extraLength, patch.utf8Start1 -= extraLength, patch.utf8Start2 -= extraLength, patch.length1 += extraLength, patch.length2 += extraLength, patch.utf8Length1 += extraLength, patch.utf8Length2 += extraLength;
  }
  if (patch = patches[patches.length - 1], diffs = patch.diffs, diffs.length === 0 || diffs[diffs.length - 1][0] !== DIFF_EQUAL)
    diffs.push([DIFF_EQUAL, nullPadding]), patch.length1 += paddingLength, patch.length2 += paddingLength, patch.utf8Length1 += paddingLength, patch.utf8Length2 += paddingLength;
  else if (paddingLength > diffs[diffs.length - 1][1].length) {
    const extraLength = paddingLength - diffs[diffs.length - 1][1].length;
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength), patch.length1 += extraLength, patch.length2 += extraLength, patch.utf8Length1 += extraLength, patch.utf8Length2 += extraLength;
  }
  return nullPadding;
}
function createPatchObject(start1, start2) {
  return {
    diffs: [],
    start1,
    start2,
    utf8Start1: start1,
    utf8Start2: start2,
    length1: 0,
    length2: 0,
    utf8Length1: 0,
    utf8Length2: 0
  };
}
function splitMax(patches, margin = DEFAULT_MARGIN) {
  const patchSize = MAX_BITS;
  for (let x = 0; x < patches.length; x++) {
    if (patches[x].length1 <= patchSize)
      continue;
    const bigpatch = patches[x];
    patches.splice(x--, 1);
    let start1 = bigpatch.start1, start2 = bigpatch.start2, preContext = "";
    for (; bigpatch.diffs.length !== 0; ) {
      const patch = createPatchObject(start1 - preContext.length, start2 - preContext.length);
      let empty = true;
      if (preContext !== "") {
        const precontextByteCount = countUtf8Bytes(preContext);
        patch.length1 = preContext.length, patch.utf8Length1 = precontextByteCount, patch.length2 = preContext.length, patch.utf8Length2 = precontextByteCount, patch.diffs.push([DIFF_EQUAL, preContext]);
      }
      for (; bigpatch.diffs.length !== 0 && patch.length1 < patchSize - margin; ) {
        const diffType = bigpatch.diffs[0][0];
        let diffText = bigpatch.diffs[0][1], diffTextByteCount = countUtf8Bytes(diffText);
        if (diffType === DIFF_INSERT) {
          patch.length2 += diffText.length, patch.utf8Length2 += diffTextByteCount, start2 += diffText.length;
          const diff22 = bigpatch.diffs.shift();
          diff22 && patch.diffs.push(diff22), empty = false;
        } else diffType === DIFF_DELETE && patch.diffs.length === 1 && patch.diffs[0][0] === DIFF_EQUAL && diffText.length > 2 * patchSize ? (patch.length1 += diffText.length, patch.utf8Length1 += diffTextByteCount, start1 += diffText.length, empty = false, patch.diffs.push([diffType, diffText]), bigpatch.diffs.shift()) : (diffText = diffText.substring(0, patchSize - patch.length1 - margin), diffTextByteCount = countUtf8Bytes(diffText), patch.length1 += diffText.length, patch.utf8Length1 += diffTextByteCount, start1 += diffText.length, diffType === DIFF_EQUAL ? (patch.length2 += diffText.length, patch.utf8Length2 += diffTextByteCount, start2 += diffText.length) : empty = false, patch.diffs.push([diffType, diffText]), diffText === bigpatch.diffs[0][1] ? bigpatch.diffs.shift() : bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diffText.length));
      }
      preContext = diffText2(patch.diffs), preContext = preContext.substring(preContext.length - margin);
      const postContext = diffText1(bigpatch.diffs).substring(0, margin), postContextByteCount = countUtf8Bytes(postContext);
      postContext !== "" && (patch.length1 += postContext.length, patch.length2 += postContext.length, patch.utf8Length1 += postContextByteCount, patch.utf8Length2 += postContextByteCount, patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL ? patch.diffs[patch.diffs.length - 1][1] += postContext : patch.diffs.push([DIFF_EQUAL, postContext])), empty || patches.splice(++x, 0, patch);
    }
  }
}
function apply(patches, originalText, opts = {}) {
  if (typeof patches == "string")
    throw new Error("Patches must be an array - pass the patch to `parsePatch()` first");
  let text2 = originalText;
  if (patches.length === 0)
    return [text2, []];
  const parsed = adjustIndiciesToUcs2(patches, text2, {
    allowExceedingIndices: opts.allowExceedingIndices
  }), margin = opts.margin || DEFAULT_MARGIN, deleteThreshold = opts.deleteThreshold || 0.4, nullPadding = addPadding(parsed, margin);
  text2 = nullPadding + text2 + nullPadding, splitMax(parsed, margin);
  let delta2 = 0;
  const results = [];
  for (let x = 0; x < parsed.length; x++) {
    const expectedLoc = parsed[x].start2 + delta2, text1 = diffText1(parsed[x].diffs);
    let startLoc, endLoc = -1;
    if (text1.length > MAX_BITS ? (startLoc = match(text2, text1.substring(0, MAX_BITS), expectedLoc), startLoc !== -1 && (endLoc = match(
      text2,
      text1.substring(text1.length - MAX_BITS),
      expectedLoc + text1.length - MAX_BITS
    ), (endLoc === -1 || startLoc >= endLoc) && (startLoc = -1))) : startLoc = match(text2, text1, expectedLoc), startLoc === -1)
      results[x] = false, delta2 -= parsed[x].length2 - parsed[x].length1;
    else {
      results[x] = true, delta2 = startLoc - expectedLoc;
      let text22;
      if (endLoc === -1 ? text22 = text2.substring(startLoc, startLoc + text1.length) : text22 = text2.substring(startLoc, endLoc + MAX_BITS), text1 === text22)
        text2 = text2.substring(0, startLoc) + diffText2(parsed[x].diffs) + text2.substring(startLoc + text1.length);
      else {
        let diffs = diff(text1, text22, { checkLines: false });
        if (text1.length > MAX_BITS && levenshtein(diffs) / text1.length > deleteThreshold)
          results[x] = false;
        else {
          diffs = cleanupSemanticLossless(diffs);
          let index1 = 0, index2 = 0;
          for (let y2 = 0; y2 < parsed[x].diffs.length; y2++) {
            const mod = parsed[x].diffs[y2];
            mod[0] !== DIFF_EQUAL && (index2 = xIndex(diffs, index1)), mod[0] === DIFF_INSERT ? text2 = text2.substring(0, startLoc + index2) + mod[1] + text2.substring(startLoc + index2) : mod[0] === DIFF_DELETE && (text2 = text2.substring(0, startLoc + index2) + text2.substring(startLoc + xIndex(diffs, index1 + mod[1].length))), mod[0] !== DIFF_DELETE && (index1 += mod[1].length);
          }
        }
      }
    }
  }
  return text2 = text2.substring(nullPadding.length, text2.length - nullPadding.length), [text2, results];
}
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b))
      __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  return a;
};
var DEFAULT_OPTS = {
  margin: 4
};
function getDefaultOpts(opts = {}) {
  return __spreadValues(__spreadValues({}, DEFAULT_OPTS), opts);
}
function make2(a, b, options) {
  if (typeof a == "string" && typeof b == "string") {
    let diffs = diff(a, b, { checkLines: true });
    return diffs.length > 2 && (diffs = cleanupSemantic(diffs), diffs = cleanupEfficiency(diffs)), _make(a, diffs, getDefaultOpts(options));
  }
  if (a && Array.isArray(a) && typeof b > "u")
    return _make(diffText1(a), a, getDefaultOpts(options));
  if (typeof a == "string" && b && Array.isArray(b))
    return _make(a, b, getDefaultOpts(options));
  throw new Error("Unknown call format to make()");
}
function _make(textA, diffs, options) {
  if (diffs.length === 0)
    return [];
  const patches = [];
  let patch = createPatchObject(0, 0), patchDiffLength = 0, charCount1 = 0, charCount2 = 0, utf8Count1 = 0, utf8Count2 = 0, prepatchText = textA, postpatchText = textA;
  for (let x = 0; x < diffs.length; x++) {
    const currentDiff = diffs[x], [diffType, diffText] = currentDiff, diffTextLength = diffText.length, diffByteLength = countUtf8Bytes(diffText);
    switch (!patchDiffLength && diffType !== DIFF_EQUAL && (patch.start1 = charCount1, patch.start2 = charCount2, patch.utf8Start1 = utf8Count1, patch.utf8Start2 = utf8Count2), diffType) {
      case DIFF_INSERT:
        patch.diffs[patchDiffLength++] = currentDiff, patch.length2 += diffTextLength, patch.utf8Length2 += diffByteLength, postpatchText = postpatchText.substring(0, charCount2) + diffText + postpatchText.substring(charCount2);
        break;
      case DIFF_DELETE:
        patch.length1 += diffTextLength, patch.utf8Length1 += diffByteLength, patch.diffs[patchDiffLength++] = currentDiff, postpatchText = postpatchText.substring(0, charCount2) + postpatchText.substring(charCount2 + diffTextLength);
        break;
      case DIFF_EQUAL:
        diffTextLength <= 2 * options.margin && patchDiffLength && diffs.length !== x + 1 ? (patch.diffs[patchDiffLength++] = currentDiff, patch.length1 += diffTextLength, patch.length2 += diffTextLength, patch.utf8Length1 += diffByteLength, patch.utf8Length2 += diffByteLength) : diffTextLength >= 2 * options.margin && patchDiffLength && (addContext(patch, prepatchText, options), patches.push(patch), patch = createPatchObject(-1, -1), patchDiffLength = 0, prepatchText = postpatchText, charCount1 = charCount2, utf8Count1 = utf8Count2);
        break;
      default:
        throw new Error("Unknown diff type");
    }
    diffType !== DIFF_INSERT && (charCount1 += diffTextLength, utf8Count1 += diffByteLength), diffType !== DIFF_DELETE && (charCount2 += diffTextLength, utf8Count2 += diffByteLength);
  }
  return patchDiffLength && (addContext(patch, prepatchText, options), patches.push(patch)), patches;
}
function addContext(patch, text2, opts) {
  if (text2.length === 0)
    return;
  let pattern = text2.substring(patch.start2, patch.start2 + patch.length1), padding = 0;
  for (; text2.indexOf(pattern) !== text2.lastIndexOf(pattern) && pattern.length < MAX_BITS - opts.margin - opts.margin; )
    padding += opts.margin, pattern = text2.substring(patch.start2 - padding, patch.start2 + patch.length1 + padding);
  padding += opts.margin;
  let prefixStart = patch.start2 - padding;
  prefixStart >= 1 && isLowSurrogate(text2[prefixStart]) && prefixStart--;
  const prefix = text2.substring(prefixStart, patch.start2);
  prefix && patch.diffs.unshift([DIFF_EQUAL, prefix]);
  const prefixLength = prefix.length, prefixUtf8Length = countUtf8Bytes(prefix);
  let suffixEnd = patch.start2 + patch.length1 + padding;
  suffixEnd < text2.length && isLowSurrogate(text2[suffixEnd]) && suffixEnd++;
  const suffix = text2.substring(patch.start2 + patch.length1, suffixEnd);
  suffix && patch.diffs.push([DIFF_EQUAL, suffix]);
  const suffixLength = suffix.length, suffixUtf8Length = countUtf8Bytes(suffix);
  patch.start1 -= prefixLength, patch.start2 -= prefixLength, patch.utf8Start1 -= prefixUtf8Length, patch.utf8Start2 -= prefixUtf8Length, patch.length1 += prefixLength + suffixLength, patch.length2 += prefixLength + suffixLength, patch.utf8Length1 += prefixUtf8Length + suffixUtf8Length, patch.utf8Length2 += prefixUtf8Length + suffixUtf8Length;
}
var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
function parse5(textline) {
  if (!textline)
    return [];
  const patches = [], lines = textline.split(`
`);
  let textPointer = 0;
  for (; textPointer < lines.length; ) {
    const m2 = lines[textPointer].match(patchHeader);
    if (!m2)
      throw new Error(`Invalid patch string: ${lines[textPointer]}`);
    const patch = createPatchObject(toInt(m2[1]), toInt(m2[3]));
    for (patches.push(patch), m2[2] === "" ? (patch.start1--, patch.utf8Start1--, patch.length1 = 1, patch.utf8Length1 = 1) : m2[2] === "0" ? (patch.length1 = 0, patch.utf8Length1 = 0) : (patch.start1--, patch.utf8Start1--, patch.utf8Length1 = toInt(m2[2]), patch.length1 = patch.utf8Length1), m2[4] === "" ? (patch.start2--, patch.utf8Start2--, patch.length2 = 1, patch.utf8Length2 = 1) : m2[4] === "0" ? (patch.length2 = 0, patch.utf8Length2 = 0) : (patch.start2--, patch.utf8Start2--, patch.utf8Length2 = toInt(m2[4]), patch.length2 = patch.utf8Length2), textPointer++; textPointer < lines.length; ) {
      const currentLine = lines[textPointer], sign = currentLine.charAt(0);
      if (sign === "@")
        break;
      if (sign === "") {
        textPointer++;
        continue;
      }
      let line;
      try {
        line = decodeURI(currentLine.slice(1));
      } catch (ex) {
        throw new Error(`Illegal escape in parse: ${currentLine}`);
      }
      const utf8Diff = countUtf8Bytes(line) - line.length;
      if (sign === "-")
        patch.diffs.push([DIFF_DELETE, line]), patch.length1 -= utf8Diff;
      else if (sign === "+")
        patch.diffs.push([DIFF_INSERT, line]), patch.length2 -= utf8Diff;
      else if (sign === " ")
        patch.diffs.push([DIFF_EQUAL, line]), patch.length1 -= utf8Diff, patch.length2 -= utf8Diff;
      else
        throw new Error(`Invalid patch mode "${sign}" in: ${line}`);
      textPointer++;
    }
  }
  return patches;
}
function toInt(num) {
  return parseInt(num, 10);
}
function stringify2(patches) {
  return patches.map(stringifyPatch).join("");
}
function stringifyPatch(patch) {
  const { utf8Length1, utf8Length2, utf8Start1, utf8Start2, diffs } = patch;
  let coords1;
  utf8Length1 === 0 ? coords1 = `${utf8Start1},0` : utf8Length1 === 1 ? coords1 = `${utf8Start1 + 1}` : coords1 = `${utf8Start1 + 1},${utf8Length1}`;
  let coords2;
  utf8Length2 === 0 ? coords2 = `${utf8Start2},0` : utf8Length2 === 1 ? coords2 = `${utf8Start2 + 1}` : coords2 = `${utf8Start2 + 1},${utf8Length2}`;
  const text2 = [`@@ -${coords1} +${coords2} @@
`];
  let op;
  for (let x = 0; x < diffs.length; x++) {
    switch (diffs[x][0]) {
      case DIFF_INSERT:
        op = "+";
        break;
      case DIFF_DELETE:
        op = "-";
        break;
      case DIFF_EQUAL:
        op = " ";
        break;
      default:
        throw new Error("Unknown patch operation.");
    }
    text2[x + 1] = `${op + encodeURI(diffs[x][1])}
`;
  }
  return text2.join("").replace(/%20/g, " ");
}

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_chunks-es/utils.js
function keyOf(value) {
  return value !== null && typeof value == "object" && typeof value._key == "string" && value._key || null;
}
function findTargetIndex(array2, pathSegment) {
  if (typeof pathSegment == "number")
    return normalizeIndex(array2.length, pathSegment);
  if (isKeyedElement(pathSegment)) {
    const idx = array2.findIndex((value) => keyOf(value) === pathSegment._key);
    return idx === -1 ? null : idx;
  }
  throw new Error(
    `Expected path segment to be addressing a single array item either by numeric index or by '_key'. Instead saw ${JSON.stringify(
      pathSegment
    )}`
  );
}
function getTargetIdx(position, index2) {
  return position === "before" ? index2 : index2 + 1;
}
function normalizeIndex(length, index2) {
  if (length === 0 && (index2 === -1 || index2 === 0))
    return 0;
  const normalized = index2 < 0 ? length + index2 : index2;
  return normalized >= length || normalized < 0 ? null : normalized;
}
function splice(arr, start, deleteCount, items) {
  const copy = arr.slice();
  return copy.splice(start, deleteCount, ...items || []), copy;
}
function omit(val, props) {
  const copy = { ...val };
  for (const prop of props)
    delete copy[prop];
  return copy;
}
function insert2(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "insert()" on non-array value');
  const index2 = findTargetIndex(currentValue, op.referenceItem);
  if (index2 === null)
    throw new Error(`Found no matching array element to insert ${op.position}`);
  return currentValue.length === 0 ? op.items : splice(currentValue, getTargetIdx(op.position, index2), 0, op.items);
}
function upsert(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "upsert()" on non-array value');
  if (op.items.length === 0)
    return currentValue;
  const replaceItemsMap = {}, insertItems = [];
  op.items.forEach((itemToBeUpserted, i) => {
    const existingIndex = currentValue.findIndex(
      (existingItem) => existingItem?._key === itemToBeUpserted._key
    );
    existingIndex >= 0 ? replaceItemsMap[existingIndex] = i : insertItems.push(itemToBeUpserted);
  });
  const itemsToReplace = Object.keys(replaceItemsMap);
  if (itemsToReplace.length === 0 && insertItems.length == 0)
    return currentValue;
  const next = [...currentValue];
  for (const i of itemsToReplace) {
    const index2 = Number(i);
    next[index2] = op.items[replaceItemsMap[index2]];
  }
  return insert2(
    {
      items: insertItems,
      referenceItem: op.referenceItem,
      position: op.position
    },
    next
  );
}
function insertIfMissing(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "insertIfMissing()" on non-array value');
  if (op.items.length === 0)
    return currentValue;
  const itemsToInsert = op.items.filter(
    (item) => !currentValue.find((existing) => item._key === existing?._key)
  );
  return itemsToInsert.length === 0 ? currentValue : insert2(
    {
      items: itemsToInsert,
      referenceItem: op.referenceItem,
      position: op.position
    },
    currentValue
  );
}
function replace(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "replace()" on non-array value');
  const index2 = findTargetIndex(currentValue, op.referenceItem);
  if (index2 === null)
    throw new Error("Found no matching array element to replace");
  return splice(currentValue, index2, op.items.length, op.items);
}
function remove(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "remove()" on non-array value');
  const index2 = findTargetIndex(currentValue, op.referenceItem);
  if (index2 === null)
    throw new Error("Found no matching array element to replace");
  return splice(currentValue, index2, 1, []);
}
function truncate(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "truncate()" on non-array value');
  return typeof op.endIndex == "number" ? currentValue.slice(0, op.startIndex).concat(currentValue.slice(op.endIndex)) : currentValue.slice(0, op.startIndex);
}
function set2(op, currentValue) {
  return op.value;
}
function setIfMissing2(op, currentValue) {
  return currentValue ?? op.value;
}
function unset2(op) {
}
function inc(op, currentValue) {
  if (typeof currentValue != "number")
    throw new TypeError('Cannot apply "inc()" on non-numeric value');
  return currentValue + op.amount;
}
function dec(op, currentValue) {
  if (typeof currentValue != "number")
    throw new TypeError('Cannot apply "dec()" on non-numeric value');
  return currentValue - op.amount;
}
var hasOwn = Object.prototype.hasOwnProperty.call.bind(
  Object.prototype.hasOwnProperty
);
function isEmpty(v) {
  for (const key in v)
    if (hasOwn(v, key))
      return false;
  return true;
}
function unassign(op, currentValue) {
  if (!isObject2(currentValue))
    throw new TypeError('Cannot apply "unassign()" on non-object value');
  return op.keys.length === 0 ? currentValue : omit(currentValue, op.keys);
}
function assign2(op, currentValue) {
  if (!isObject2(currentValue))
    throw new TypeError('Cannot apply "assign()" on non-object value');
  return isEmpty(op.value) ? currentValue : { ...currentValue, ...op.value };
}
function diffMatchPatch2(op, currentValue) {
  if (typeof currentValue != "string")
    throw new TypeError('Cannot apply "diffMatchPatch()" on non-string value');
  return apply(parse5(op.value), currentValue)[0];
}
var operations = Object.freeze({
  __proto__: null,
  assign: assign2,
  dec,
  diffMatchPatch: diffMatchPatch2,
  inc,
  insert: insert2,
  insertIfMissing,
  remove,
  replace,
  set: set2,
  setIfMissing: setIfMissing2,
  truncate,
  unassign,
  unset: unset2,
  upsert
});

// ../../node_modules/.pnpm/nanoid@5.1.16/node_modules/nanoid/index.browser.js
var random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
var customRandom = (alphabet2, defaultSize, getRandom) => {
  let safeByteCutoff = 256 - 256 % alphabet2.length;
  if (safeByteCutoff === 256) {
    let mask = alphabet2.length - 1;
    return (size = defaultSize) => {
      if (!size) return "";
      let id2 = "";
      while (true) {
        let bytes = getRandom(size);
        let j = size;
        while (j--) {
          id2 += alphabet2[bytes[j] & mask];
          if (id2.length >= size) return id2;
        }
      }
    };
  }
  let step = Math.ceil(1.6 * 256 * defaultSize / safeByteCutoff);
  return (size = defaultSize) => {
    if (!size) return "";
    let id2 = "";
    while (true) {
      let bytes = getRandom(step);
      let j = step;
      while (j--) {
        if (bytes[j] < safeByteCutoff) {
          id2 += alphabet2[bytes[j] % alphabet2.length];
          if (id2.length >= size) return id2;
        }
      }
    }
  };
};
var customAlphabet = (alphabet2, size = 21) => customRandom(alphabet2, size | 0, random);

// ../../node_modules/.pnpm/mendoza@3.0.8/node_modules/mendoza/dist/index.js
var OPS = [
  "Value",
  "Copy",
  "Blank",
  "ReturnIntoArray",
  "ReturnIntoObject",
  "ReturnIntoObjectSameKey",
  "PushField",
  "PushElement",
  "PushParent",
  "Pop",
  "PushFieldCopy",
  "PushFieldBlank",
  "PushElementCopy",
  "PushElementBlank",
  "ReturnIntoObjectPop",
  "ReturnIntoObjectSameKeyPop",
  "ReturnIntoArrayPop",
  "ObjectSetFieldValue",
  "ObjectCopyField",
  "ObjectDeleteField",
  "ArrayAppendValue",
  "ArrayAppendSlice",
  "StringAppendString",
  "StringAppendSlice"
];
var Patcher = class {
  model;
  root;
  patch;
  i;
  inputStack;
  outputStack;
  constructor(model, root, patch) {
    this.model = model, this.root = root, this.patch = patch, this.i = 0, this.inputStack = [], this.outputStack = [];
  }
  read() {
    return this.patch[this.i++];
  }
  process() {
    for (this.inputStack.push({ value: this.root }), this.outputStack.push({ value: this.root }); this.i < this.patch.length; ) {
      let opcode = this.read(), op = OPS[opcode];
      if (!op)
        throw new Error(`Unknown opcode: ${opcode}`);
      let processor = `process${op}`;
      this[processor].apply(this);
    }
    let entry = this.outputStack.pop();
    return this.finalizeOutput(entry);
  }
  inputEntry() {
    return this.inputStack[this.inputStack.length - 1];
  }
  inputKey(entry, idx) {
    return entry.keys || (entry.keys = this.model.objectGetKeys(entry.value).sort()), entry.keys[idx];
  }
  outputEntry() {
    return this.outputStack[this.outputStack.length - 1];
  }
  outputArray() {
    let entry = this.outputEntry();
    return entry.writeValue || (entry.writeValue = this.model.copyArray(entry.value)), entry.writeValue;
  }
  outputObject() {
    let entry = this.outputEntry();
    return entry.writeValue || (entry.writeValue = this.model.copyObject(entry.value)), entry.writeValue;
  }
  outputString() {
    let entry = this.outputEntry();
    return entry.writeValue || (entry.writeValue = this.model.copyString(entry.value)), entry.writeValue;
  }
  finalizeOutput(entry) {
    return entry.writeValue ? this.model.finalize(entry.writeValue) : entry.value;
  }
  // Processors:
  processValue() {
    let value = this.model.wrap(this.read());
    this.outputStack.push({ value });
  }
  processCopy() {
    let input = this.inputEntry();
    this.outputStack.push({ value: input.value });
  }
  processBlank() {
    this.outputStack.push({ value: null });
  }
  processReturnIntoArray() {
    let entry = this.outputStack.pop(), result = this.finalizeOutput(entry), arr = this.outputArray();
    this.model.arrayAppendValue(arr, result);
  }
  processReturnIntoObject() {
    let key = this.read(), entry = this.outputStack.pop(), result = this.finalizeOutput(entry);
    result = this.model.markChanged(result);
    let obj = this.outputObject();
    this.model.objectSetField(obj, key, result);
  }
  processReturnIntoObjectSameKey() {
    let input = this.inputEntry(), entry = this.outputStack.pop(), result = this.finalizeOutput(entry), obj = this.outputObject();
    this.model.objectSetField(obj, input.key, result);
  }
  processPushField() {
    let idx = this.read(), entry = this.inputEntry(), key = this.inputKey(entry, idx), value = this.model.objectGetField(entry.value, key);
    this.inputStack.push({ value, key });
  }
  processPushElement() {
    let idx = this.read(), entry = this.inputEntry(), value = this.model.arrayGetElement(entry.value, idx);
    this.inputStack.push({ value });
  }
  processPop() {
    this.inputStack.pop();
  }
  processPushFieldCopy() {
    this.processPushField(), this.processCopy();
  }
  processPushFieldBlank() {
    this.processPushField(), this.processBlank();
  }
  processPushElementCopy() {
    this.processPushElement(), this.processCopy();
  }
  processPushElementBlank() {
    this.processPushElement(), this.processBlank();
  }
  processReturnIntoObjectPop() {
    this.processReturnIntoObject(), this.processPop();
  }
  processReturnIntoObjectSameKeyPop() {
    this.processReturnIntoObjectSameKey(), this.processPop();
  }
  processReturnIntoArrayPop() {
    this.processReturnIntoArray(), this.processPop();
  }
  processObjectSetFieldValue() {
    this.processValue(), this.processReturnIntoObject();
  }
  processObjectCopyField() {
    this.processPushField(), this.processCopy(), this.processReturnIntoObjectSameKey(), this.processPop();
  }
  processObjectDeleteField() {
    let idx = this.read(), entry = this.inputEntry(), key = this.inputKey(entry, idx), obj = this.outputObject();
    this.model.objectDeleteField(obj, key);
  }
  processArrayAppendValue() {
    let value = this.model.wrap(this.read()), arr = this.outputArray();
    this.model.arrayAppendValue(arr, value);
  }
  processArrayAppendSlice() {
    let left = this.read(), right = this.read(), str = this.outputArray(), val = this.inputEntry().value;
    this.model.arrayAppendSlice(str, val, left, right);
  }
  processStringAppendString() {
    let value = this.model.wrap(this.read()), str = this.outputString();
    this.model.stringAppendValue(str, value);
  }
  processStringAppendSlice() {
    let left = this.read(), right = this.read(), str = this.outputString(), val = this.inputEntry().value;
    this.model.stringAppendSlice(str, val, left, right);
  }
};
function utf8charSize(code) {
  return code >> 16 ? 4 : code >> 11 ? 3 : code >> 7 ? 2 : 1;
}
function utf8stringSize(str) {
  let b = 0;
  for (let i = 0; i < str.length; i++) {
    let code = str.codePointAt(i), size = utf8charSize(code);
    size == 4 && i++, b += size;
  }
  return b;
}
function commonPrefix(str, str2) {
  let len = Math.min(str.length, str2.length), b = 0;
  for (let i = 0; i < len; ) {
    let aPoint = str.codePointAt(i), bPoint = str2.codePointAt(i);
    if (aPoint !== bPoint)
      return b;
    let size = utf8charSize(aPoint);
    b += size, i += size === 4 ? 2 : 1;
  }
  return b;
}
function commonSuffix(str, str2, prefix = 0) {
  let len = Math.min(str.length, str2.length) - prefix, b = 0;
  for (let i = 0; i < len; ) {
    let aPoint = str.codePointAt(str.length - 1 - i), bPoint = str2.codePointAt(str2.length - 1 - i);
    if (aPoint !== bPoint)
      return b;
    let size = utf8charSize(aPoint);
    b += size, i += size === 4 ? 2 : 1;
  }
  return b;
}
var IncrementalModel = class {
  meta;
  constructor(meta) {
    this.meta = meta;
  }
  wrap(data) {
    return this.wrapWithMeta(data, this.meta, this.meta);
  }
  wrapWithMeta(data, startMeta, endMeta = this.meta) {
    return { data, startMeta, endMeta };
  }
  asObject(value) {
    if (!value.content) {
      let fields = {};
      for (let [key, val] of Object.entries(value.data))
        fields[key] = this.wrapWithMeta(val, value.startMeta);
      value.content = { type: "object", fields };
    }
    return value.content;
  }
  asArray(value) {
    if (!value.content) {
      let elements = value.data.map(
        (item) => this.wrapWithMeta(item, value.startMeta)
      ), metas = elements.map(() => this.meta);
      value.content = { type: "array", elements, metas };
    }
    return value.content;
  }
  asString(value) {
    if (!value.content) {
      let str = value.data, part = {
        value: str,
        utf8size: utf8stringSize(str),
        uses: [],
        startMeta: value.startMeta,
        endMeta: value.endMeta
      };
      value.content = this.stringFromParts([part]);
    }
    return value.content;
  }
  stringFromParts(parts) {
    let str = {
      type: "string",
      parts
    };
    for (let part of parts)
      part.uses.push(str);
    return str;
  }
  objectGetKeys(value) {
    return value.content ? Object.keys(value.content.fields) : Object.keys(value.data);
  }
  objectGetField(value, key) {
    return this.asObject(value).fields[key];
  }
  arrayGetElement(value, idx) {
    return this.asArray(value).elements[idx];
  }
  finalize(content) {
    return this.updateEndMeta(content), { content, startMeta: this.meta, endMeta: this.meta };
  }
  markChanged(value) {
    return this.wrap(unwrap(value));
  }
  updateEndMeta(content) {
    if (content.type == "string")
      for (let part of content.parts)
        part.endMeta = this.meta;
    else if (content.type === "array")
      for (let val of content.elements)
        val.content && val.endMeta !== this.meta && this.updateEndMeta(val.content), val.endMeta = this.meta;
    else
      for (let val of Object.values(content.fields))
        val.content && val.endMeta !== this.meta && this.updateEndMeta(val.content), val.endMeta = this.meta;
  }
  copyString(value) {
    if (value) {
      let other = this.asString(value);
      return this.stringFromParts(other.parts.slice());
    } else
      return {
        type: "string",
        parts: []
      };
  }
  copyObject(value) {
    let obj = {
      type: "object",
      fields: {}
    };
    if (value) {
      let other = this.asObject(value);
      Object.assign(obj.fields, other.fields);
    }
    return obj;
  }
  copyArray(value) {
    let arr = value ? this.asArray(value) : null, elements = arr ? arr.elements : [], metas = arr ? arr.metas : [];
    return {
      type: "array",
      elements,
      metas
    };
  }
  objectSetField(target, key, value) {
    target.fields[key] = value;
  }
  objectDeleteField(target, key) {
    delete target.fields[key];
  }
  arrayAppendValue(target, value) {
    target.elements.push(value), target.metas.push(this.meta);
  }
  arrayAppendSlice(target, source, left, right) {
    let arr = this.asArray(source), samePosition = arr.elements.length === left;
    if (target.elements.push(...arr.elements.slice(left, right)), samePosition)
      target.metas.push(...arr.metas.slice(left, right));
    else
      for (let i = left; i < right; i++)
        target.metas.push(this.meta);
  }
  stringAppendValue(target, value) {
    let str = this.asString(value);
    for (let part of str.parts)
      this.stringAppendPart(target, part);
  }
  stringAppendPart(target, part) {
    target.parts.push(part), part.uses.push(target);
  }
  resolveStringPart(str, from2, len) {
    if (len === 0)
      return from2;
    for (let i = from2; i < str.parts.length; i++) {
      let part = str.parts[i];
      if (len === part.utf8size)
        return i + 1;
      if (len < part.utf8size)
        return this.splitString(part, len), i + 1;
      len -= part.utf8size;
    }
    throw new Error("splitting string out of bounds");
  }
  splitString(part, idx) {
    let leftValue, rightValue, leftSize = idx, rightSize = part.utf8size - leftSize;
    if (part.utf8size !== part.value.length) {
      let byteCount = 0;
      for (idx = 0; byteCount < leftSize; idx++) {
        let code = part.value.codePointAt(idx), size = utf8charSize(code);
        size === 4 && idx++, byteCount += size;
      }
    }
    leftValue = part.value.slice(0, idx), rightValue = part.value.slice(idx);
    let newPart = {
      value: rightValue,
      utf8size: rightSize,
      uses: part.uses.slice(),
      startMeta: part.startMeta,
      endMeta: part.endMeta
    };
    part.value = leftValue, part.utf8size = leftSize;
    for (let use2 of part.uses) {
      let ndx = use2.parts.indexOf(part);
      if (ndx === -1)
        throw new Error("bug: mismatch between string parts and use.");
      use2.parts.splice(ndx + 1, 0, newPart);
    }
  }
  stringAppendSlice(target, source, left, right) {
    let str = this.asString(source), firstPart = this.resolveStringPart(str, 0, left), lastPart = this.resolveStringPart(str, firstPart, right - left);
    for (let i = firstPart; i < lastPart; i++) {
      let part = str.parts[i];
      this.stringAppendPart(target, part);
    }
  }
};
function wrap(data, meta) {
  return { data, startMeta: meta, endMeta: meta };
}
function unwrap(value) {
  if (typeof value.data < "u")
    return value.data;
  let result, content = value.content;
  switch (content.type) {
    case "string":
      result = content.parts.map((part) => part.value).join("");
      break;
    case "array":
      result = content.elements.map((val) => unwrap(val));
      break;
    case "object": {
      result = {};
      for (let [key, val] of Object.entries(content.fields))
        result[key] = unwrap(val);
    }
  }
  return value.data = result, result;
}
function getType(value) {
  return value.content ? value.content.type : Array.isArray(value.data) ? "array" : value.data === null ? "null" : typeof value.data;
}
function rebaseValue(left, right) {
  let leftType = getType(left), rightType = getType(right);
  if (leftType !== rightType)
    return right;
  let leftModel = new IncrementalModel(left.endMeta), rightModel = new IncrementalModel(right.endMeta);
  switch (leftType) {
    case "object": {
      let leftObj = leftModel.asObject(left), rightObj = rightModel.asObject(right), identicalFieldCount = 0, leftFieldCount = Object.keys(leftObj.fields).length, rightFieldCount = Object.keys(rightObj.fields).length;
      for (let [key, rightVal] of Object.entries(rightObj.fields)) {
        let leftVal = leftObj.fields[key];
        leftVal && (rightObj.fields[key] = rebaseValue(leftVal, rightVal), rightObj.fields[key] === leftVal && identicalFieldCount++);
      }
      return leftFieldCount === rightFieldCount && leftFieldCount === identicalFieldCount ? left : right;
    }
    case "array": {
      let leftArr = leftModel.asArray(left), rightArr = rightModel.asArray(right);
      if (leftArr.elements.length !== rightArr.elements.length)
        break;
      let numRebased = 0;
      for (let i = 0; i < rightArr.elements.length; i++)
        rightArr.elements[i] = rebaseValue(leftArr.elements[i], rightArr.elements[i]), rightArr.elements[i] !== leftArr.elements[i] && numRebased++;
      return numRebased === 0 ? left : right;
    }
    case "null":
    case "boolean":
    case "number": {
      if (unwrap(left) === unwrap(right))
        return left;
      break;
    }
    case "string": {
      let leftRaw = unwrap(left), rightRaw = unwrap(right);
      if (leftRaw === rightRaw)
        return left;
      let result = rightModel.copyString(null), prefix = commonPrefix(leftRaw, rightRaw), suffix = commonSuffix(leftRaw, rightRaw, prefix), rightLen = utf8stringSize(rightRaw), leftLen = utf8stringSize(leftRaw);
      0 < prefix && rightModel.stringAppendSlice(result, left, 0, prefix), prefix < rightLen - suffix && rightModel.stringAppendSlice(result, right, prefix, rightLen - suffix), leftLen - suffix < leftLen && rightModel.stringAppendSlice(result, left, leftLen - suffix, leftLen);
      let value = rightModel.finalize(result);
      if (unwrap(value) !== rightRaw)
        throw new Error("incorrect string rebase");
      return value;
    }
  }
  return right;
}
function applyPatch$1(left, patch, startMeta) {
  let model = new IncrementalModel(startMeta);
  return new Patcher(model, left, patch).process();
}
var incrementalPatcher = Object.freeze({
  __proto__: null,
  applyPatch: applyPatch$1,
  getType,
  rebaseValue,
  unwrap,
  wrap
});

// ../../node_modules/.pnpm/@sanity+mutate@0.18.2_xstate@5.33.2/node_modules/@sanity/mutate/dist/_unstable_store.js
var import_sortedIndex = __toESM(require_sortedIndex());
var defaultDurationSelector = () => scheduled(of(0), asyncScheduler);
function createDataLoader(options) {
  const durationSelector = options.durationSelector || defaultDurationSelector, requests$ = new BehaviorSubject(void 0), unsubscribes$ = new Subject(), batchResponses = requests$.pipe(
    filter((req) => !!req),
    bufferWhen(durationSelector),
    map((requests) => requests.filter((request) => !request.cancelled)),
    filter((requests) => requests.length > 0),
    mergeMap((requests) => {
      const keys = requests.map((request) => request.key), responses = options.onLoad(keys).pipe(
        takeUntil(
          unsubscribes$.pipe(
            filter(() => requests.every((request) => request.cancelled))
          )
        ),
        mergeMap((batchResult) => {
          if (batchResult.length !== requests.length)
            throw new Error(
              `The length of the returned batch must be equal to the number of batched requests. Requested a batch of length ${requests.length}, but received a batch of ${batchResult.length}.`
            );
          return requests.map((request, i) => ({
            type: "value",
            request,
            response: batchResult[i]
          }));
        })
      ), responseEnds = requests.map((request) => ({
        request,
        type: "complete"
      }));
      return concat(responses, responseEnds);
    }),
    share()
  );
  return (key) => new Observable((subscriber) => {
    const mutableRequestState = { key, cancelled: false }, emit3 = defer(() => (requests$.next(mutableRequestState), EMPTY)), subscription = merge(
      batchResponses.pipe(
        filter((batchResult) => batchResult.request === mutableRequestState),
        takeWhile((batchResult) => batchResult.type !== "complete"),
        map((batchResult) => batchResult.response)
      ),
      emit3
    ).subscribe(subscriber);
    return () => {
      mutableRequestState.cancelled = true, unsubscribes$.next(), subscription.unsubscribe();
    };
  });
}
function createDocumentLoader(fetchDocuments, options) {
  return createDataLoader({
    onLoad: (ids) => fetchDedupedWith(fetchDocuments, ids),
    durationSelector: options?.durationSelector
  });
}
function createDocumentLoaderFromClient(client, options) {
  return createDocumentLoader((ids) => {
    const requestOptions = {
      url: client.getDataUrl("doc", ids.join(",")),
      tag: options?.tag
    };
    return client.observable.request(requestOptions);
  }, options);
}
function fetchDedupedWith(fetchDocuments, ids) {
  const unique = [...new Set(ids)];
  return fetchDocuments(unique).pipe(
    map((results) => prepareResponse(ids, results)),
    map((results) => {
      const byId = (0, import_keyBy.default)(results, (result) => result.id);
      return ids.map((id2) => byId[id2]);
    })
  );
}
function prepareResponse(requestedIds, response) {
  const documents2 = (0, import_keyBy.default)(response.documents, (entry) => entry._id), omitted = (0, import_keyBy.default)(response.omitted, (entry) => entry.id);
  return requestedIds.map((id2) => {
    if (documents2[id2])
      return { id: id2, accessible: true, document: documents2[id2] };
    const omittedEntry = omitted[id2];
    return omittedEntry ? omittedEntry.reason === "permission" ? {
      id: id2,
      accessible: false,
      reason: "permission"
    } : {
      id: id2,
      accessible: false,
      reason: "existence"
    } : { id: id2, accessible: false, reason: "existence" };
  });
}
var EMPTY_ARRAY2 = Object.freeze([]);
var SEED_STATE = Object.freeze({
  inflight: EMPTY_ARRAY2,
  local: EMPTY_ARRAY2,
  base: void 0
});

// ../../node_modules/.pnpm/groq-js@2.0.0/node_modules/groq-js/dist/shared-C7P2VCv4.js
function escapeRegExp(string2) {
  return string2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function pathRegExp(pattern) {
  let re = [];
  for (let part of pattern.split(".")) part === "*" ? re.push("[^.]+") : part === "**" ? re.push(".*") : re.push(escapeRegExp(part));
  return RegExp(`^${re.join(".")}$`);
}
var Path$1 = class {
  pattern;
  patternRe;
  constructor(pattern) {
    this.pattern = pattern, this.patternRe = pathRegExp(pattern);
  }
  matches(str) {
    return this.patternRe.test(str);
  }
  toJSON() {
    return this.pattern;
  }
};
var RFC3339_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([-+]\d{2}:\d{2}))$/;
function parseRFC3339(str) {
  return RFC3339_REGEX.test(str) ? new Date(str) : null;
}
function formatRFC3339(d2) {
  let year = addLeadingZero(d2.getUTCFullYear(), 4), month = addLeadingZero(d2.getUTCMonth() + 1, 2), day = addLeadingZero(d2.getUTCDate(), 2), hour = addLeadingZero(d2.getUTCHours(), 2), minute = addLeadingZero(d2.getUTCMinutes(), 2), second = addLeadingZero(d2.getUTCSeconds(), 2), fractionalSecond = "", millis = d2.getMilliseconds();
  return millis != 0 && (fractionalSecond = `.${addLeadingZero(millis, 3)}`), `${year}-${month}-${day}T${hour}:${minute}:${second}${fractionalSecond}Z`;
}
function addLeadingZero(num, targetLength) {
  let str = num.toString();
  for (; str.length < targetLength; ) str = `0${str}`;
  return str;
}
var StaticValue$1 = class {
  data;
  type;
  constructor(data, type) {
    this.data = data, this.type = type;
  }
  isArray() {
    return this.type === "array";
  }
  async get() {
    return this.data;
  }
  asStatic() {
    return this;
  }
  [Symbol.asyncIterator]() {
    if (Array.isArray(this.data)) return (function* (data) {
      for (let element of data) yield fromJS(element);
    })(this.data);
    throw Error(`Cannot iterate over: ${this.type}`);
  }
};
var NULL_VALUE = new StaticValue$1(null, "null");
var TRUE_VALUE = new StaticValue$1(true, "boolean");
var FALSE_VALUE = new StaticValue$1(false, "boolean");
var DateTime$1 = class DateTime$12 {
  date;
  constructor(date) {
    this.date = date;
  }
  static parseToValue(str) {
    let date = parseRFC3339(str);
    return date ? new StaticValue$1(new DateTime$12(date), "datetime") : NULL_VALUE;
  }
  equals(other) {
    return this.date.getTime() == other.date.getTime();
  }
  add(secs) {
    let copy = new Date(this.date.getTime());
    return copy.setTime(copy.getTime() + secs * 1e3), new DateTime$12(copy);
  }
  difference(other) {
    return (this.date.getTime() - other.date.getTime()) / 1e3;
  }
  compareTo(other) {
    return this.date.getTime() - other.date.getTime();
  }
  toString() {
    return formatRFC3339(this.date);
  }
  toJSON() {
    return this.toString();
  }
};
function fromNumber(num) {
  return Number.isFinite(num) ? new StaticValue$1(num, "number") : NULL_VALUE;
}
function fromString(str) {
  return new StaticValue$1(str, "string");
}
function fromDateTime(dt) {
  return new StaticValue$1(dt, "datetime");
}
function fromPath(path) {
  return new StaticValue$1(path, "path");
}
function isIterator(obj) {
  return obj && typeof obj.next == "function";
}
function fromArray(val) {
  return new StaticValue$1(val, "array");
}
function fromJS(val) {
  return isIterator(val) ? new StreamValue$1(async function* () {
    for await (let value of val) yield fromJS(value);
  }) : val == null ? NULL_VALUE : new StaticValue$1(val, getType2(val));
}
function getType2(data) {
  return data == null ? "null" : Array.isArray(data) ? "array" : data instanceof Path$1 ? "path" : data instanceof DateTime$1 ? "datetime" : typeof data;
}
var StreamValue$1 = class {
  type = "stream";
  generator;
  ticker;
  isDone;
  data;
  constructor(generator) {
    this.generator = generator, this.ticker = null, this.isDone = false, this.data = [];
  }
  isArray() {
    return true;
  }
  async get() {
    let result = [];
    for await (let value of this) result.push(await value.get());
    return result;
  }
  async asStatic() {
    return new StaticValue$1(await this.get(), "array");
  }
  async *[Symbol.asyncIterator]() {
    let i = 0;
    for (; ; ) {
      for (; i < this.data.length; i++) yield this.data[i];
      if (this.isDone) return;
      await this._nextTick();
    }
  }
  _nextTick() {
    if (this.ticker) return this.ticker;
    let currentResolver, currentRejector, setupTicker = () => {
      this.ticker = new Promise((resolve, reject) => {
        currentResolver = resolve, currentRejector = reject;
      });
    }, tick = () => {
      currentResolver(), setupTicker();
    };
    return setupTicker(), (async () => {
      try {
        for await (let value of this.generator()) this.data.push(value), tick();
        this.isDone = true, tick();
      } catch (error2) {
        currentRejector(error2);
      }
    })(), this.ticker;
  }
};
function isSelectorNode$1(node) {
  return [
    "AccessAttribute",
    "SelectorFuncCall",
    "Group",
    "Tuple",
    "ArrayCoerce",
    "Filter",
    "SelectorNested"
  ].includes(node.type);
}
function isSelectorNested$1(node) {
  return [
    "AccessAttribute",
    "ArrayCoerce",
    "Filter",
    "Group",
    "Tuple",
    "SelectorNested"
  ].includes(node.type);
}
var CHARS = /([^!@#$%^&*(),\\/?";:{}|[\]+<>\s-])+/g;
var CHARS_WITH_WILDCARD = /([^!@#$%^&(),\\/?";:{}|[\]+<>\s-])+/g;
var EDGE_CHARS = /(\b\.+|\.+\b)/g;
function matchText(tokens, patterns) {
  return tokens.length === 0 || patterns.length === 0 ? false : patterns.every((pattern) => pattern(tokens));
}
function matchTokenize(text2) {
  return text2.replace(EDGE_CHARS, "").match(CHARS) || [];
}
function matchAnalyzePattern(text2) {
  return matchPatternRegex(text2).map((re) => (tokens) => tokens.some((token) => re.test(token)));
}
function matchPatternRegex(text2) {
  return (text2.replace(EDGE_CHARS, "").match(CHARS_WITH_WILDCARD) || []).map((term) => RegExp(`^${term.slice(0, 1024).replace(/\*/g, ".*")}$`, "i"));
}
function gatherText(value, flatMap2) {
  if (value.type === "string") return {
    parts: flatMap2(value.data),
    success: true
  };
  if (value.type === "array") {
    let success2 = true, parts = [];
    for (let part of value.data) typeof part == "string" ? parts.push(...flatMap2(part)) : success2 = false;
    return {
      parts,
      success: success2
    };
  }
  return value.type === "stream" ? (async () => {
    let success2 = true, parts = [];
    for await (let part of value) part.type === "string" ? parts.push(...flatMap2(part.data)) : success2 = false;
    return {
      parts,
      success: success2
    };
  })() : {
    parts: [],
    success: false
  };
}
function canConstantEvaluate(node) {
  switch (node.type) {
    case "Group":
      return canConstantEvaluate(node.base);
    case "Value":
    case "Parameter":
      return true;
    case "Pos":
    case "Neg":
      return canConstantEvaluate(node.base);
    case "OpCall":
      switch (node.op) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
        case "**":
          return canConstantEvaluate(node.left) && canConstantEvaluate(node.right);
        default:
          return false;
      }
    default:
      return false;
  }
}
function tryConstantEvaluate(node) {
  return canConstantEvaluate(node) ? constantEvaluate(node) : null;
}
function isRecord2(val) {
  return val.constructor === Object || val.constructor === void 0;
}
function staticFromJS(val) {
  return val == null ? NULL_VALUE : typeof val == "boolean" ? val ? TRUE_VALUE : FALSE_VALUE : typeof val == "number" ? fromNumber(val) : typeof val == "string" ? fromString(val) : Array.isArray(val) ? fromArray(val) : typeof val == "object" && isRecord2(val) ? new StaticValue$1(val, "object") : NULL_VALUE;
}
function constantEvaluate(node) {
  switch (node.type) {
    case "Value":
      return staticFromJS(node.value);
    case "Parameter":
      return NULL_VALUE;
    case "Group":
      return constantEvaluate(node.base);
    case "Pos": {
      let base = constantEvaluate(node.base);
      return base.type === "number" ? fromNumber(base.data) : NULL_VALUE;
    }
    case "Neg": {
      let base = constantEvaluate(node.base);
      return base.type === "number" ? fromNumber(-base.data) : NULL_VALUE;
    }
    case "OpCall": {
      let left = constantEvaluate(node.left), right = constantEvaluate(node.right);
      switch (node.op) {
        case "+":
          return left.type === "number" && right.type === "number" ? fromNumber(left.data + right.data) : left.type === "string" && right.type === "string" ? fromString(left.data + right.data) : left.type === "array" && right.type === "array" ? fromArray(left.data.concat(right.data)) : left.type === "object" && right.type === "object" ? new StaticValue$1({
            ...left.data,
            ...right.data
          }, "object") : NULL_VALUE;
        case "-":
          return left.type === "number" && right.type === "number" ? fromNumber(left.data - right.data) : NULL_VALUE;
        case "*":
          return left.type === "number" && right.type === "number" ? fromNumber(left.data * right.data) : NULL_VALUE;
        case "/":
          return left.type === "number" && right.type === "number" ? fromNumber(left.data / right.data) : NULL_VALUE;
        case "%":
          return left.type === "number" && right.type === "number" ? fromNumber(left.data % right.data) : NULL_VALUE;
        case "**":
          return left.type === "number" && right.type === "number" ? fromNumber(left.data ** +right.data) : NULL_VALUE;
        default:
          return NULL_VALUE;
      }
    }
    default:
      return NULL_VALUE;
  }
}
var namespaceRegistry = {
  global: {
    anywhere: { arity: 1 },
    coalesce: {},
    count: { arity: 1 },
    dateTime: { arity: 1 },
    defined: { arity: 1 },
    identity: { arity: 0 },
    length: { arity: 1 },
    path: { arity: 1 },
    string: { arity: 1 },
    references: { arity: (c4) => c4 >= 1 },
    round: { arity: (count) => count >= 1 && count <= 2 },
    now: { arity: 0 },
    boost: { arity: 2 },
    lower: { arity: 1 },
    upper: { arity: 1 }
  },
  string: {
    lower: { arity: 1 },
    upper: { arity: 1 },
    split: { arity: 2 },
    startsWith: { arity: 2 }
  },
  array: {
    join: { arity: 2 },
    compact: { arity: 1 },
    unique: { arity: 1 },
    intersects: { arity: 2 }
  },
  pt: { text: { arity: 1 } },
  delta: {
    operation: {},
    changedAny: {
      arity: 1,
      mode: "delta"
    },
    changedOnly: {
      arity: 1,
      mode: "delta"
    }
  },
  diff: {
    changedAny: { arity: 3 },
    changedOnly: { arity: 3 }
  },
  media: { aspect: { arity: 2 } },
  sanity: {
    projectId: {},
    dataset: {},
    versionOf: { arity: 1 },
    partOfRelease: { arity: 1 }
  },
  math: {
    min: { arity: 1 },
    max: { arity: 1 },
    sum: { arity: 1 },
    avg: { arity: 1 }
  },
  dateTime: { now: { arity: 0 } },
  releases: { all: { arity: 0 } },
  text: {
    query: { arity: 1 },
    semanticSimilarity: { arity: 1 }
  },
  geo: {
    latLng: {},
    contains: {},
    intersects: {},
    distance: {}
  },
  documents: {
    get: {},
    incomingRefCount: {},
    incomingGlobalDocumentReferenceCount: {}
  },
  user: { attributes: {} }
};
var pipeFunctionRegistry = {
  order: { arity: (count) => count >= 1 },
  score: { arity: (count) => count >= 1 }
};
var [ObjectAttributeNode] = [
  2,
  () => [
    ObjectAttributeValueNode,
    ObjectConditionalSplatNode,
    ObjectSplatNode
  ],
  [
    "",
    "",
    ""
  ]
];
var [ExprNode] = [
  3,
  () => [
    AccessAttributeNode,
    AccessElementNode,
    AndNode,
    ArrayNode,
    ArrayCoerceNode,
    AscNode,
    ContextNode,
    DerefNode,
    DescNode,
    EverythingNode,
    FilterNode,
    FlatMapNode,
    FuncCallNode,
    GroupNode,
    InRangeNode,
    MapNode,
    NegNode,
    NotNode,
    ObjectNode,
    OpCallNode,
    OrNode,
    ParameterNode,
    ParentNode,
    PipeFuncCallNode,
    PosNode,
    ProjectionNode,
    SelectNode,
    SelectorNode,
    SliceNode,
    ThisNode,
    TupleNode,
    ValueNode
  ],
  "...............................".split(".")
];
var [OpCall] = [
  4,
  () => [],
  []
];
var [BaseNode] = [
  5,
  () => [],
  [""]
];
var [AndNode] = [
  6,
  () => [
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [ArrayElementNode] = [
  7,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    "",
    ""
  ]
];
var [ArrayNode] = [
  8,
  () => [ArrayElementNode, BaseNode],
  [
    "",
    "",
    "",
    ""
  ]
];
var [ArrayCoerceNode] = [
  9,
  (Base) => [
    ExprNode,
    Base,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [AscNode] = [
  10,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    ""
  ]
];
var [ContextNode] = [
  11,
  () => [BaseNode],
  [
    "",
    "",
    ""
  ]
];
var [DerefNode] = [
  12,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    ""
  ]
];
var [DescNode] = [
  13,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    ""
  ]
];
var [EverythingNode] = [
  14,
  () => [BaseNode],
  ["", ""]
];
var [FuncCallNode] = [
  15,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [GroupNode] = [
  16,
  (Base) => [
    ExprNode,
    Base,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [InRangeNode] = [
  17,
  () => [
    ExprNode,
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [NegNode] = [
  18,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    ""
  ]
];
var [NotNode] = [
  19,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    ""
  ]
];
var [ObjectAttributeValueNode] = [
  20,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    "",
    ""
  ]
];
var [ObjectConditionalSplatNode] = [
  21,
  () => [
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [ObjectNode] = [
  22,
  () => [ObjectAttributeNode, BaseNode],
  [
    "",
    "",
    "",
    ""
  ]
];
var [ObjectSplatNode] = [
  23,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    ""
  ]
];
var [OpCallNode] = [
  24,
  () => [
    OpCall,
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [OrNode] = [
  25,
  () => [
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [ParameterNode] = [
  26,
  () => [BaseNode],
  [
    "",
    "",
    ""
  ]
];
var [ParentNode] = [
  27,
  () => [BaseNode],
  [
    "",
    "",
    ""
  ]
];
var [PipeFuncCallNode] = [
  28,
  () => [
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [PosNode] = [
  29,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    ""
  ]
];
var [SelectAlternativeNode] = [
  30,
  () => [
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [SelectNode] = [
  31,
  () => [
    SelectAlternativeNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [SelectorNode] = [
  32,
  () => [
    SelectorNode,
    AccessAttributeNode,
    SelectorFuncCallNode,
    SelectorNode,
    GroupNode,
    SelectorNode,
    TupleNode,
    SelectorNode,
    ArrayCoerceNode,
    SelectorNode,
    FilterNode,
    SelectorNestedNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [SelectorFuncCallNode] = [
  34,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    "",
    ""
  ]
];
var [SelectorNested] = [
  35,
  () => [
    SelectorNode,
    AccessAttributeNode,
    SelectorNode,
    ArrayCoerceNode,
    SelectorNode,
    FilterNode,
    SelectorNode,
    GroupNode,
    SelectorNode,
    TupleNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [SelectorNestedNode] = [
  37,
  () => [
    SelectorNode,
    SelectorNested,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [ThisNode] = [
  38,
  () => [BaseNode],
  ["", ""]
];
var [TupleNode] = [
  39,
  (Base) => [
    ExprNode,
    Base,
    Array,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [ValueNode] = [
  40,
  (P) => [P],
  [
    "",
    "",
    "",
    ""
  ]
];
var [FlatMapNode] = [
  42,
  () => [
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [MapNode] = [
  43,
  () => [
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [AccessAttributeNode] = [
  44,
  (T) => [
    ExprNode,
    T,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [AccessElementNode] = [
  45,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    "",
    ""
  ]
];
var [SliceNode] = [
  46,
  () => [ExprNode, BaseNode],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [FilterNode] = [
  47,
  (Base) => [
    ExprNode,
    Base,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [ProjectionNode] = [
  48,
  () => [
    ExprNode,
    ExprNode,
    BaseNode
  ],
  [
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [Path] = [
  90,
  () => [],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [StaticValue] = [
  77,
  (P, T) => [
    GroqType,
    P,
    T,
    P,
    T,
    Promise,
    Value,
    Generator,
    Symbol.asyncIterator
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [DateTime] = [
  81,
  () => [
    Date,
    Date,
    DateTimeValue,
    NullValue,
    DateTime,
    DateTime,
    DateTime,
    DateTime
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [GroqType] = [
  91,
  () => [],
  []
];
var [Value] = [
  92,
  () => [AnyStaticValue, StreamValue],
  ["", ""]
];
var [StringValue] = [
  93,
  () => [StaticValue],
  [""]
];
var [NumberValue] = [
  94,
  () => [StaticValue],
  [""]
];
var [NullValue] = [
  95,
  () => [StaticValue],
  [""]
];
var [BooleanValue] = [
  96,
  () => [StaticValue],
  [""]
];
var [DateTimeValue] = [
  97,
  () => [DateTime, StaticValue],
  ["", ""]
];
var [PathValue] = [
  98,
  () => [Path, StaticValue],
  ["", ""]
];
var [ObjectValue] = [
  99,
  () => [Record, StaticValue],
  ["", ""]
];
var [ArrayValue] = [
  100,
  () => [StaticValue],
  [""]
];
var [AnyStaticValue] = [
  101,
  () => [
    StringValue,
    NumberValue,
    NullValue,
    BooleanValue,
    DateTimeValue,
    ObjectValue,
    ArrayValue,
    PathValue
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [StreamValue] = [
  102,
  () => [
    Value,
    AsyncGenerator,
    Promise,
    ArrayValue,
    Promise,
    Value,
    AsyncGenerator,
    Symbol.asyncIterator,
    Promise
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];

// ../../node_modules/.pnpm/groq-js@2.0.0/node_modules/groq-js/dist/evaluator-Cjkvq48Q.js
function isEqual(a, b) {
  return a.type === "string" && b.type === "string" || a.type === "boolean" && b.type === "boolean" || a.type === "null" && b.type === "null" || a.type === "number" && b.type === "number" ? a.data === b.data : a.type === "datetime" && b.type === "datetime" && a.data.equals(b.data);
}
function deepEqual(a, b) {
  if (a === null || b === null) return a === b;
  let typeOfA = typeof a, typeOfB = typeof b;
  if (typeOfA === "undefined" && typeOfB === "undefined") return true;
  if (typeOfA === "function" && typeOfB === "function") return a === b;
  if (typeOfA === "object" && typeOfB === "object") {
    let keysOfA = Object.keys(a), keysOfB = Object.keys(b);
    if (keysOfA.length !== keysOfB.length) return false;
    for (let key of keysOfA) if (!deepEqual(a[key], b[key])) return false;
    return true;
  }
  return a === b;
}
var array = {};
array.join = mappedExecutor((args) => args, (_, arr, sep) => {
  if (arr.type !== "array" || sep.type !== "string") return NULL_VALUE;
  let buf = "", needSep = false;
  for (let elem of arr.data) {
    switch (needSep && (buf += sep.data), getType2(elem)) {
      case "number":
      case "string":
      case "boolean":
      case "datetime":
        buf += `${elem}`;
        break;
      default:
        return NULL_VALUE;
    }
    needSep = true;
  }
  return fromString(buf);
}), array.compact = arrayExecutor(([array2]) => ({ array: array2 }), function* (_, item) {
  item !== null && (yield item);
}), array.unique = arrayExecutor((args) => ({
  array: args[0],
  state: /* @__PURE__ */ new Set()
}), function* (_node, iter, _inner, added) {
  switch (getType2(iter)) {
    case "number":
    case "string":
    case "boolean":
    case "datetime":
      added.has(iter) || (added.add(iter), yield iter);
      break;
    default:
      yield iter;
  }
}), array.intersects = mappedExecutor((args) => args, (_, arr1, arr2) => {
  if (arr1.type !== "array" || arr2.type !== "array") return NULL_VALUE;
  for (let v1 of arr1.data) for (let v2 of arr2.data) if (isEqual(fromJS(v1), fromJS(v2))) return TRUE_VALUE;
  return FALSE_VALUE;
});
var dateTime = {};
dateTime.now = constantExecutor((_, scope) => fromDateTime(new DateTime$1(scope.context.timestamp)));
async function valueAtPath(arg, keyPath) {
  function tryAccessor(arg2, accessor) {
    try {
      return arg2[accessor];
    } catch {
      return;
    }
  }
  let current = await arg.get();
  for (let part of keyPath) if (current = tryAccessor(current, part), !current) break;
  return current;
}
function startsWith2(keyPath, prefix) {
  return prefix.every((item, index2) => keyPath[index2] === item);
}
async function* diffKeyPaths(before, after) {
  let currPaths = [[]];
  for (; currPaths.length > 0; ) {
    let currPath = currPaths.shift() || [], b = fromJS(await valueAtPath(before, currPath)), a = fromJS(await valueAtPath(after, currPath));
    if (a.type !== b.type) yield currPath;
    else if (a.type === "string" && b.type === "string" || a.type === "boolean" && b.type === "boolean" || a.type === "null" && b.type === "null" || a.type === "number" && b.type === "number") a.data !== b.data && (yield currPath);
    else if (a.type === "datetime" && b.type === "datetime") a.data.equals(b.data) || (yield currPath);
    else if (a.type === "object" && b.type === "object") {
      if (!deepEqual(a.data, b.data)) {
        let aKeys = Object.keys(a.data), bKeys = Object.keys(b.data);
        new Set(aKeys.concat(bKeys)).forEach((key) => {
          currPaths.push([...currPath, key]);
        });
      }
    } else if (a.type === "array" && b.type === "array") {
      if (a.data.length !== b.data.length) yield currPath;
      else if (!deepEqual(a.data, b.data)) for (let i = 0; i < b.data.length; i++) currPaths.push([...currPath, i]);
    } else if (a.type === "stream" && b.type === "stream") {
      let arrayA = await a.get(), arrayB = await b.get();
      if (arrayA.length !== arrayB.length) yield currPath;
      else if (!deepEqual(arrayA, arrayB)) for (let i = 0; i < arrayB.length; i++) currPaths.push([...currPath, i]);
    }
  }
}
async function evaluateSelector(node, value, scope) {
  switch (node.type) {
    case "Group":
      return await evaluateSelector(node.base, value, scope);
    case "Tuple":
      let tuplePaths = [];
      for (let member of node.members) {
        let memberPaths = await evaluateSelector(member, value, scope);
        tuplePaths.push(...memberPaths);
      }
      return tuplePaths;
    case "AccessAttribute":
      return node.base ? (await evaluateSelector(node.base, value, scope)).map((path) => [...path, node.name]) : [[node.name]];
    case "ArrayCoerce": {
      let paths = await evaluateSelector(node.base, value, scope), arrayPaths = [];
      for (let keyPath of paths) {
        let innerValue = await valueAtPath(value, keyPath);
        if (Array.isArray(innerValue)) for (let i = 0; i < innerValue.length; i++) arrayPaths.push([...keyPath, i]);
      }
      return arrayPaths;
    }
    case "Filter": {
      let paths = await evaluateSelector(node.base, value, scope), filter2 = {
        ...node,
        base: { type: "This" }
      }, arrayPaths = [];
      for (let keyPath of paths) {
        let innerValue = await valueAtPath(value, keyPath);
        if (Array.isArray(innerValue)) for (let i = 0; i < innerValue.length; i++) {
          let item = innerValue[i];
          (await (await evaluate(filter2, scope.createNested(fromJS([item])))).get()).length > 0 && arrayPaths.push([...keyPath, i]);
        }
      }
      return arrayPaths;
    }
    case "SelectorFuncCall":
      return anywhere(node.arg, scope.createHidden(value));
    case "SelectorNested": {
      let { base, nested: expr } = node, paths = await evaluateSelector(base, value, scope), nestedPaths = [];
      for (let keyPath of paths) {
        let innerValue = await valueAtPath(value, keyPath);
        switch (expr.type) {
          case "AccessAttribute":
          case "ArrayCoerce":
          case "Filter":
            let accessPaths = await evaluateSelector(expr, fromJS(innerValue), scope);
            for (let i = 0; i < accessPaths.length; i++) nestedPaths.push([...keyPath, ...accessPaths[i]]);
            break;
          case "Group":
            let innerResult = await evaluateSelector(expr.base, fromJS(innerValue), scope);
            for (let innerKeyPath of innerResult) nestedPaths.push([...keyPath, ...innerKeyPath]);
            break;
          case "Tuple":
            for (let inner of expr.members) {
              let innerResult2 = await evaluateSelector(inner, fromJS(innerValue), scope);
              for (let innerKeyPath of innerResult2) nestedPaths.push([...keyPath, ...innerKeyPath]);
            }
        }
      }
      return nestedPaths;
    }
  }
}
async function anywhere(expr, scope, base = []) {
  let value = scope.value, pathList = [];
  if (value.isArray()) {
    let arr = await value.get();
    for (let i = 0; i < arr.length; i++) {
      let subPaths = await anywhere(expr, scope.createHidden(fromJS(arr[i])), [...base, i]);
      pathList.push(...subPaths);
    }
  } else if (value.type === "object") {
    let result = await evaluate(expr, scope);
    result.type === "boolean" && result.data === true && pathList.push(base);
    for (let key of Object.keys(value.data)) {
      let subPaths = await anywhere(expr, scope.createHidden(fromJS(value.data[key])), [...base, key]);
      pathList.push(...subPaths);
    }
  }
  return pathList;
}
async function changedAny(before, after, selector, scope) {
  let beforeSelectorScope = scope.createHidden(before), beforePaths = await evaluateSelector(selector, beforeSelectorScope.value, beforeSelectorScope), afterSelectorScope = scope.createHidden(after), afterPaths = await evaluateSelector(selector, afterSelectorScope.value, afterSelectorScope);
  if (beforePaths.length !== afterPaths.length) return TRUE_VALUE;
  for (let path of beforePaths) {
    for (let i = 0; i < path.length; i++) if (typeof path[i] == "number") {
      let slice = path.slice(0, i), beforeArr = await valueAtPath(before, slice), afterArr = await valueAtPath(after, slice);
      if (!Array.isArray(beforeArr) || !Array.isArray(afterArr) || beforeArr.length !== afterArr.length) return TRUE_VALUE;
    }
    if (!deepEqual(await valueAtPath(before, path), await valueAtPath(after, path))) return TRUE_VALUE;
  }
  return FALSE_VALUE;
}
async function changedOnly(before, after, selector, scope) {
  let beforeSelectorScope = scope.createHidden(before), selectedPaths = await evaluateSelector(selector, beforeSelectorScope.value, beforeSelectorScope);
  for await (let diffPath of diffKeyPaths(before, after)) {
    let found = false;
    for (let selectedPath of selectedPaths) if (startsWith2(diffPath, selectedPath)) {
      found = true;
      break;
    }
    if (!found) return FALSE_VALUE;
  }
  return TRUE_VALUE;
}
var diff2 = {};
diff2.changedAny = asyncOnlyExecutor(async (args, scope) => {
  let lhs = args[0], rhs = args[1], selector = args[2];
  if (!isSelectorNode$1(selector)) throw Error("changedAny third argument must be a selector");
  return changedAny(await executeAsync(lhs, scope), await executeAsync(rhs, scope), selector, scope);
}), diff2.changedOnly = asyncOnlyExecutor(async (args, scope) => {
  let lhs = args[0], rhs = args[1], selector = args[2];
  if (!isSelectorNode$1(selector)) throw Error("changedOnly third argument must be a selector");
  return changedOnly(await executeAsync(lhs, scope), await executeAsync(rhs, scope), selector, scope);
});
var delta = {};
delta.operation = constantExecutor((_, scope) => {
  let hasBefore = scope.context.before !== null, hasAfter = scope.context.after !== null;
  return hasBefore && hasAfter ? fromString("update") : hasAfter ? fromString("create") : hasBefore ? fromString("delete") : NULL_VALUE;
}), delta.changedAny = asyncOnlyExecutor(async (args, scope) => {
  let before = scope.context.before || NULL_VALUE, after = scope.context.after || NULL_VALUE, selector = args[0];
  if (!isSelectorNode$1(selector)) throw Error("changedAny first argument must be a selector");
  return changedAny(before, after, selector, scope);
}), delta.changedOnly = asyncOnlyExecutor(async (args, scope) => {
  let before = scope.context.before || NULL_VALUE, after = scope.context.after || NULL_VALUE, selector = args[0];
  if (!isSelectorNode$1(selector)) throw Error("changedOnly first argument must be a selector");
  return changedOnly(before, after, selector, scope);
});
var documents = {};
documents.get = constantExecutor(() => {
  throw Error("not implemented");
}), documents.incomingRefCount = constantExecutor(() => {
  throw Error("not implemented");
}), documents.incomingGlobalDocumentReferenceCount = constantExecutor(() => {
  throw Error("not implemented");
});
var geo = {};
geo.latLng = constantExecutor(() => {
  throw Error("not implemented");
}), geo.contains = constantExecutor(() => {
  throw Error("not implemented");
}), geo.intersects = constantExecutor(() => {
  throw Error("not implemented");
}), geo.distance = constantExecutor(() => {
  throw Error("not implemented");
});
var string = {};
string.lower = mappedExecutor((args) => args, (_, value) => value.type === "string" ? fromString(value.data.toLowerCase()) : NULL_VALUE), string.upper = mappedExecutor((args) => args, (_, value) => value.type === "string" ? fromString(value.data.toUpperCase()) : NULL_VALUE), string.split = mappedExecutor((args) => args, (_, str, sep) => str.type !== "string" || sep.type !== "string" ? NULL_VALUE : str.data.length === 0 ? fromArray([]) : sep.data.length === 0 ? fromArray(Array.from(str.data)) : fromArray(str.data.split(sep.data))), string.startsWith = mappedExecutor((args) => args, (_, str, prefix) => str.type !== "string" || prefix.type !== "string" ? NULL_VALUE : str.data.startsWith(prefix.data) ? TRUE_VALUE : FALSE_VALUE);
var _global = {};
_global.anywhere = constantExecutor(() => {
  throw Error("not implemented");
}), _global.coalesce = {
  async executeAsync(args, scope) {
    for (let arg of args) {
      let value = await executeAsync(arg, scope);
      if (value.type !== "null") return value;
    }
    return NULL_VALUE;
  },
  executeSync(args, scope) {
    for (let arg of args) {
      let value = executeSync(arg, scope);
      if (value.type !== "null") return value;
    }
    return NULL_VALUE;
  }
}, _global.count = arrayReducerExecutor((args) => ({ array: args[0] }), () => 0, (_, count) => count + 1, fromNumber), _global.dateTime = mappedExecutor((args) => args, (_, val) => val.type === "datetime" ? val : val.type === "string" ? DateTime$1.parseToValue(val.data) : NULL_VALUE), _global.defined = mappedExecutor((args) => args, (_, inner) => inner.type === "null" ? FALSE_VALUE : TRUE_VALUE), _global.identity = constantExecutor((_args, scope) => fromString(scope.context.identity)), _global.length = mappedExecutor((args) => args, (_, inner) => inner.type === "string" ? fromNumber(countUTF8(inner.data)) : inner.type === "array" ? fromNumber(inner.data.length) : NULL_VALUE), _global.path = mappedExecutor((args) => args, (_, inner) => inner.type === "string" ? fromPath(new Path$1(inner.data)) : NULL_VALUE), _global.string = mappedExecutor((args) => args, (_, value) => {
  switch (value.type) {
    case "number":
    case "string":
    case "boolean":
    case "datetime":
      return fromString(`${value.data}`);
    default:
      return NULL_VALUE;
  }
}), _global.references = mappedExecutor((args) => [{ type: "This" }, ...args], (_, scopeValue, ...args) => {
  let pathSet = /* @__PURE__ */ new Set();
  for (let path of args) if (path.type === "string") pathSet.add(path.data);
  else if (path.type === "array") for (let elem of path.data) typeof elem == "string" && pathSet.add(elem);
  return pathSet.size === 0 ? FALSE_VALUE : hasReference(scopeValue, pathSet) ? TRUE_VALUE : FALSE_VALUE;
}), _global.round = mappedExecutor((args) => args, (_, value, precValue) => {
  if (value.type !== "number") return NULL_VALUE;
  let num = value.data, prec = 0;
  if (precValue) {
    if (precValue.type !== "number" || precValue.data < 0 || !Number.isInteger(precValue.data)) return NULL_VALUE;
    prec = precValue.data;
  }
  return fromNumber(prec === 0 ? num < 0 ? -Math.round(-num) : Math.round(num) : Number(num.toFixed(prec)));
}), _global.now = constantExecutor((_args, scope) => fromString(scope.context.timestamp.toISOString())), _global.boost = constantExecutor(() => {
  throw Error("unexpected boost call");
}), _global.lower = string.lower, _global.upper = string.upper;
function countUTF8(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    code >= 55296 && code <= 56319 || count++;
  }
  return count;
}
function hasReference(value, pathSet) {
  switch (getType2(value)) {
    case "array":
      for (let v of value) if (hasReference(v, pathSet)) return true;
      break;
    case "object":
      if (value._ref) return pathSet.has(value._ref);
      for (let v of Object.values(value)) if (hasReference(v, pathSet)) return true;
      break;
    default:
  }
  return false;
}
var math = {};
math.min = arrayReducerExecutor((args) => ({ array: args[0] }), () => void 0, (_, n, item) => item === null ? n : typeof item == "number" ? n === void 0 || item < n ? item : n : STOP_ITERATOR, (n) => n === void 0 ? NULL_VALUE : fromNumber(n)), math.max = arrayReducerExecutor((args) => ({ array: args[0] }), () => void 0, (_, n, item) => item === null ? n : typeof item == "number" ? n === void 0 || item > n ? item : n : STOP_ITERATOR, (n) => n === void 0 ? NULL_VALUE : fromNumber(n)), math.sum = arrayReducerExecutor((args) => ({ array: args[0] }), () => 0, (_, n, item) => item === null ? n : typeof item == "number" ? n + item : STOP_ITERATOR, fromNumber), math.avg = arrayReducerExecutor((args) => ({ array: args[0] }), () => ({
  count: 0,
  sum: 0
}), (_, { count, sum }, item) => item === null ? {
  count,
  sum
} : typeof item == "number" ? {
  count: count + 1,
  sum: sum + item
} : STOP_ITERATOR, ({ count, sum }) => count === 0 ? NULL_VALUE : fromNumber(sum / count));
var media = {};
media.aspect = constantExecutor(() => {
  throw Error("not implemented");
});
function portableTextContent(value) {
  if (value.type === "object") return blockText(value.data);
  if (value.type === "array") {
    let texts = arrayText(value.data);
    if (texts.length > 0) return texts.join("\n\n");
  }
  return null;
}
function arrayText(value, result = []) {
  for (let block of value) if (Array.isArray(block)) arrayText(block, result);
  else if (typeof block == "object" && block) {
    let text2 = blockText(block);
    text2 !== null && result.push(text2);
  }
  return result;
}
function blockText(obj) {
  if (typeof obj._type != "string") return null;
  let children = obj.children;
  if (!Array.isArray(children)) return null;
  let result = "";
  for (let child of children) child && typeof child == "object" && typeof child._type == "string" && child._type === "span" && typeof child.text == "string" && (result += child.text);
  return result;
}
var pt = {};
pt.text = mappedExecutor((args) => args, (_, value) => {
  let text2 = portableTextContent(value);
  return text2 === null ? NULL_VALUE : fromString(text2);
});
var releases = {};
releases.all = arrayExecutor(() => ({ array: { type: "Everything" } }), function* (_, value) {
  typeof value == "object" && value && "_type" in value && value._type === "system.release" && (yield value);
});
var sanity = {};
sanity.projectId = constantExecutor((_, scope) => scope.context.sanity ? fromString(scope.context.sanity.projectId) : NULL_VALUE), sanity.dataset = constantExecutor((_, scope) => scope.context.sanity ? fromString(scope.context.sanity.dataset) : NULL_VALUE), sanity.versionOf = mappedExecutor(([value]) => [value, { type: "This" }], (_, value, val) => {
  if (value.type !== "string") return NULL_VALUE;
  let baseId = value.data;
  if (val.type !== "object" || typeof val.data._id != "string") return NULL_VALUE;
  if (val.data._id === baseId) return TRUE_VALUE;
  let components = val.data._id.split(".");
  return components.length >= 2 && components[0] === "drafts" && components.slice(1).join(".") === baseId || components.length >= 3 && components[0] === "versions" && components.slice(2).join(".") === baseId ? TRUE_VALUE : FALSE_VALUE;
}), sanity.partOfRelease = mappedExecutor((args) => [args[0], { type: "This" }], (_, value, val) => {
  if (value.type !== "string") return NULL_VALUE;
  let baseId = value.data;
  if (val.type !== "object" || typeof val.data._id != "string") return NULL_VALUE;
  let components = val.data._id.split(".");
  return components.length >= 3 && components[0] === "versions" && components[1] === baseId ? TRUE_VALUE : FALSE_VALUE;
});
var text = {};
text.query = constantExecutor(() => {
  throw Error("not implemented");
}), text.semanticSimilarity = constantExecutor(() => {
  throw Error("not implemented");
});
var user = {};
user.attributes = constantExecutor(() => {
  throw Error("not implemented");
});
var TYPE_ORDER = {
  datetime: 1,
  number: 2,
  string: 3,
  boolean: 4
};
function partialCompare(a, b) {
  let aType = getType2(a);
  if (aType !== getType2(b)) return null;
  switch (aType) {
    case "number":
    case "boolean":
      return a - b;
    case "string":
      return a < b ? -1 : +(a > b);
    case "datetime":
      return a.compareTo(b);
    default:
      return null;
  }
}
function totalCompare(a, b) {
  let aType = getType2(a), bType = getType2(b), aTypeOrder = TYPE_ORDER[aType] || 100, bTypeOrder = TYPE_ORDER[bType] || 100;
  if (aTypeOrder !== bTypeOrder) return aTypeOrder - bTypeOrder;
  let result = partialCompare(a, b);
  return result === null && (result = 0), result;
}
var Scope$1 = class Scope$12 {
  params;
  source;
  value;
  parent;
  context;
  isHidden = false;
  constructor(params, source, value, context, parent) {
    this.params = params, this.source = source, this.value = value, this.context = context, this.parent = parent;
  }
  createNested(value) {
    return this.isHidden ? new Scope$12(this.params, this.source, value, this.context, this.parent) : new Scope$12(this.params, this.source, value, this.context, this);
  }
  createHidden(value) {
    let result = this.createNested(value);
    return result.isHidden = true, result;
  }
};
async function evaluateScoreAsync(node, scope) {
  if (node.type === "OpCall" && node.op === "match") return evaluateMatchScoreAsync(node.left, node.right, scope);
  if (node.type === "FuncCall" && node.name === "boost") {
    let innerScore = await evaluateScoreAsync(node.args[0], scope), boost = await executeAsync(node.args[1], scope);
    return boost.type === "number" && innerScore > 0 ? innerScore + boost.data : 0;
  }
  switch (node.type) {
    case "Or":
      return await evaluateScoreAsync(node.left, scope) + await evaluateScoreAsync(node.right, scope);
    case "And": {
      let leftScore = await evaluateScoreAsync(node.left, scope), rightScore = await evaluateScoreAsync(node.right, scope);
      return leftScore === 0 || rightScore === 0 ? 0 : leftScore + rightScore;
    }
    default: {
      let res = await executeAsync(node, scope);
      return +(res.type === "boolean" && res.data === true);
    }
  }
}
function evaluateScoreSync(node, scope) {
  if (node.type === "OpCall" && node.op === "match") return evaluateMatchScoreSync(node.left, node.right, scope);
  if (node.type === "FuncCall" && node.name === "boost") {
    let innerScore = evaluateScoreSync(node.args[0], scope), boost = executeSync(node.args[1], scope);
    return boost.type === "number" && innerScore > 0 ? innerScore + boost.data : 0;
  }
  switch (node.type) {
    case "Or":
      return evaluateScoreSync(node.left, scope) + evaluateScoreSync(node.right, scope);
    case "And": {
      let leftScore = evaluateScoreSync(node.left, scope), rightScore = evaluateScoreSync(node.right, scope);
      return leftScore === 0 || rightScore === 0 ? 0 : leftScore + rightScore;
    }
    default: {
      let res = executeSync(node, scope);
      return +(res.type === "boolean" && res.data === true);
    }
  }
}
function evaluateMatchScoreSync(left, right, scope) {
  let result = processMatchScore(executeSync(left, scope), executeSync(right, scope));
  if (typeof result == "number") return result;
  throw Error("Found synchronous value in match()");
}
async function evaluateMatchScoreAsync(left, right, scope) {
  return processMatchScore(await executeAsync(left, scope), await executeAsync(right, scope));
}
function processMatchScore(text2, pattern) {
  let tokens = gatherText(text2, (part) => matchTokenize(part)), terms = gatherText(pattern, (part) => matchPatternRegex(part)), process2 = (tokens2, terms2) => {
    if (!terms2.success || tokens2.parts.length === 0 || terms2.parts.length === 0) return 0;
    let score = 0;
    for (let re of terms2.parts) {
      let freq = tokens2.parts.reduce((c4, token) => c4 + +!!re.test(token), 0);
      score += freq * 2.2 / (freq + 1.2);
    }
    return score;
  };
  return "then" in tokens || "then" in terms ? (async () => process2(await tokens, await terms))() : process2(tokens, terms);
}
function extractOrderArgs(args) {
  let mappers = [], directions = [];
  for (let mapper of args) {
    let direction = "asc";
    mapper.type === "Desc" ? (direction = "desc", mapper = mapper.base) : mapper.type === "Asc" && (mapper = mapper.base), mappers.push(mapper), directions.push(direction);
  }
  return {
    mappers,
    directions
  };
}
function sortArray(aux, directions) {
  return aux.sort((aTuple, bTuple) => {
    for (let i = 0; i < directions.length; i++) {
      let c4 = totalCompare(aTuple[i + 2], bTuple[i + 2]);
      if (directions[i] === "desc" && (c4 = -c4), c4 !== 0) return c4;
    }
    return aTuple[1] - bTuple[1];
  }), aux.map((v) => v[0]);
}
var pipeFunctions = {};
pipeFunctions.order = {
  executeSync({ base, args }, scope) {
    let { mappers, directions } = extractOrderArgs(args), aux = [], idx = 0, n = directions.length;
    for (let value of base.data) {
      let newScope = scope.createNested(fromJS(value)), tuple = [value, idx];
      for (let i = 0; i < n; i++) {
        let result = executeSync(mappers[i], newScope);
        tuple.push(result.data);
      }
      aux.push(tuple), idx++;
    }
    return fromArray(sortArray(aux, directions));
  },
  async executeAsync({ base, args }, scope) {
    let { mappers, directions } = extractOrderArgs(args), aux = [], idx = 0, n = directions.length;
    for await (let value of base) {
      let newScope = scope.createNested(value), tuple = [await value.get(), idx];
      for (let i = 0; i < n; i++) {
        let result = await executeAsync(mappers[i], newScope);
        tuple.push(await result.get());
      }
      aux.push(tuple), idx++;
    }
    return fromArray(sortArray(aux, directions));
  }
}, pipeFunctions.score = {
  async executeAsync({ base, args }, scope) {
    let unknown = [], scored = [];
    for await (let value of base) {
      if (value.type !== "object") {
        unknown.push(await value.get());
        continue;
      }
      let newScope = scope.createNested(value), valueScore = typeof value.data._score == "number" ? value.data._score : 0;
      for (let arg of args) valueScore += await evaluateScoreAsync(arg, newScope);
      let newObject = Object.assign({}, value.data, { _score: valueScore });
      scored.push(newObject);
    }
    return scored.sort((a, b) => b._score - a._score), fromJS(scored);
  },
  executeSync({ base, args }, scope) {
    let unknown = [], scored = [];
    for (let value of base.data) {
      if (getType2(value) !== "object") {
        unknown.push(value);
        continue;
      }
      let valueObj = value, newScope = scope.createNested(fromJS(value)), valueScore = typeof valueObj._score == "number" ? valueObj._score : 0;
      for (let arg of args) valueScore += evaluateScoreSync(arg, newScope);
      let newObject = Object.assign({}, valueObj, { _score: valueScore });
      scored.push(newObject);
    }
    return scored.sort((a, b) => b._score - a._score), fromArray(scored);
  }
};
var namespaces = {
  global: _global,
  string,
  array,
  pt,
  delta,
  diff: diff2,
  media,
  sanity,
  math,
  dateTime,
  releases,
  text,
  geo,
  documents,
  user
};
var operators = {
  "==": function(left, right) {
    return isEqual(left, right) ? TRUE_VALUE : FALSE_VALUE;
  },
  "!=": function(left, right) {
    return isEqual(left, right) ? FALSE_VALUE : TRUE_VALUE;
  },
  ">": function(left, right) {
    if (left.type === "stream" || right.type === "stream") return NULL_VALUE;
    let result = partialCompare(left.data, right.data);
    return result === null ? NULL_VALUE : result > 0 ? TRUE_VALUE : FALSE_VALUE;
  },
  ">=": function(left, right) {
    if (left.type === "stream" || right.type === "stream") return NULL_VALUE;
    let result = partialCompare(left.data, right.data);
    return result === null ? NULL_VALUE : result >= 0 ? TRUE_VALUE : FALSE_VALUE;
  },
  "<": function(left, right) {
    if (left.type === "stream" || right.type === "stream") return NULL_VALUE;
    let result = partialCompare(left.data, right.data);
    return result === null ? NULL_VALUE : result < 0 ? TRUE_VALUE : FALSE_VALUE;
  },
  "<=": function(left, right) {
    if (left.type === "stream" || right.type === "stream") return NULL_VALUE;
    let result = partialCompare(left.data, right.data);
    return result === null ? NULL_VALUE : result <= 0 ? TRUE_VALUE : FALSE_VALUE;
  },
  in: function(left, right) {
    if (right.type === "path") return left.type === "string" ? right.data.matches(left.data) ? TRUE_VALUE : FALSE_VALUE : NULL_VALUE;
    if (right.type === "array") {
      for (let b of right.data) if (isEqual(left, fromJS(b))) return TRUE_VALUE;
      return FALSE_VALUE;
    }
    return right.type === "stream" ? (async () => {
      for await (let b of right) if (isEqual(left, b)) return TRUE_VALUE;
      return FALSE_VALUE;
    })() : NULL_VALUE;
  },
  match: function(left, right) {
    let tokens = gatherText(left, (part) => matchTokenize(part)), patterns = gatherText(right, (part) => matchAnalyzePattern(part)), process2 = (tokens2, patterns2) => patterns2.success && matchText(tokens2.parts, patterns2.parts) ? TRUE_VALUE : FALSE_VALUE;
    return "then" in tokens || "then" in patterns ? (async () => process2(await tokens, await patterns))() : process2(tokens, patterns);
  },
  "+": function(left, right) {
    return left.type === "datetime" && right.type === "number" ? fromDateTime(left.data.add(right.data)) : left.type === "number" && right.type === "datetime" ? fromDateTime(right.data.add(left.data)) : left.type === "number" && right.type === "number" ? fromNumber(left.data + right.data) : left.type === "string" && right.type === "string" ? fromString(left.data + right.data) : left.type === "object" && right.type === "object" ? fromJS({
      ...left.data,
      ...right.data
    }) : left.type === "array" && right.type === "array" ? fromJS(left.data.concat(right.data)) : left.isArray() && right.isArray() ? new StreamValue$1(async function* () {
      for await (let val of left) yield val;
      for await (let val of right) yield val;
    }) : NULL_VALUE;
  },
  "-": function(left, right) {
    return left.type === "datetime" && right.type === "number" ? fromDateTime(left.data.add(-right.data)) : left.type === "datetime" && right.type === "datetime" ? fromNumber(left.data.difference(right.data)) : left.type === "number" && right.type === "number" ? fromNumber(left.data - right.data) : NULL_VALUE;
  },
  "*": numericOperator((a, b) => a * b),
  "/": numericOperator((a, b) => a / b),
  "%": numericOperator((a, b) => a % b),
  "**": numericOperator((a, b) => a ** +b)
};
function numericOperator(impl) {
  return function(left, right) {
    return left.type === "number" && right.type === "number" ? fromNumber(impl(left.data, right.data)) : NULL_VALUE;
  };
}
function evaluate(node, scope) {
  return executeAsync(node, scope);
}
function executeSync(node, scope) {
  return EXECUTORS[node.type].executeSync(node, scope);
}
function executeAsync(node, scope) {
  return EXECUTORS[node.type].executeAsync(node, scope);
}
function asyncOnlyExecutor(executeAsync2) {
  return {
    executeSync() {
      throw Error("executeSync not supported");
    },
    executeAsync: executeAsync2
  };
}
function constantExecutor(fn) {
  return {
    executeSync(node, scope) {
      let value = fn(node, scope);
      if (value.type === "stream") throw Error("Stream encountered in evaluateSync");
      return value;
    },
    async executeAsync(node, scope) {
      return fn(node, scope);
    }
  };
}
function mappedExecutor(map3, reduce) {
  return {
    executeSync(node, scope) {
      let value = reduce(node, ...map3(node).map((node2) => executeSync(node2, scope)));
      if (value.type === "stream") throw Error("Stream/iterator not supported in synchronous mode");
      return value;
    },
    async executeAsync(node, scope) {
      let nodes = map3(node);
      return reduce(node, ...await Promise.all(nodes.map((node2) => executeAsync(node2, scope).then((value) => value.asStatic()))));
    }
  };
}
var STOP_ITERATOR = Symbol();
function arrayReducerExecutor(map3, init, reduce, wrap2) {
  return {
    executeSync(node, scope) {
      let { array: arrayNode, args: argNodes = [] } = map3(node), arr = executeSync(arrayNode, scope);
      if (arr.type !== "array") return NULL_VALUE;
      let args = argNodes.map((node2) => executeSync(node2, scope)), state = init(node, ...args);
      for (let item of arr.data) {
        let result = reduce(node, state, item, ...args);
        if (result === STOP_ITERATOR) return NULL_VALUE;
        state = result;
      }
      return wrap2(state);
    },
    async executeAsync(node, scope) {
      let { array: arrayNode, args: argNodes = [] } = map3(node), arr = await executeAsync(arrayNode, scope);
      if (arr.type !== "array" && arr.type !== "stream") return NULL_VALUE;
      let args = await Promise.all(argNodes.map((node2) => executeAsync(node2, scope).then((v) => v.asStatic()))), state = init(node, ...args);
      if (arr.type === "stream") for await (let item of arr) {
        let result = reduce(node, state, await item.get(), ...args);
        if (result === STOP_ITERATOR) return NULL_VALUE;
        state = result;
      }
      else for (let item of arr.data) {
        let result = reduce(node, state, item, ...args);
        if (result === STOP_ITERATOR) return NULL_VALUE;
        state = result;
      }
      return wrap2(state);
    }
  };
}
function arrayExecutor(map3, reduce, { hidden = false } = {}) {
  return {
    executeSync(node, scope) {
      let mapping = map3(node), arr = executeSync(mapping.array, scope);
      if (arr.type !== "array") return NULL_VALUE;
      let result = [];
      for (let item of arr.data) {
        let inner;
        if (mapping.inner) {
          let newScope = hidden ? scope.createHidden(fromJS(item)) : scope.createNested(fromJS(item));
          inner = executeSync(mapping.inner, newScope).data;
        }
        for (let entry of reduce(node, item, inner, mapping.state)) result.push(entry);
      }
      return fromArray(result);
    },
    async executeAsync(node, scope) {
      let mapping = map3(node), arr = await executeAsync(mapping.array, scope);
      return arr.isArray() ? new StreamValue$1(async function* () {
        for await (let item of arr) {
          let inner;
          if (mapping.inner) {
            let newScope = hidden ? scope.createHidden(item) : scope.createNested(item);
            inner = await (await executeAsync(mapping.inner, newScope)).get();
          }
          for (let entry of reduce(node, await item.get(), inner, mapping.state)) yield fromJS(entry);
        }
      }) : NULL_VALUE;
    }
  };
}
var EXECUTORS = {
  This: constantExecutor((_, scope) => scope.value),
  SelectorNested: constantExecutor(() => {
    throw Error("Unexpected node type: SelectorNested");
  }),
  SelectorFuncCall: constantExecutor(() => {
    throw Error("Unexpected node type: SelectorFuncCall");
  }),
  Everything: constantExecutor((_, scope) => scope.source),
  Parameter: constantExecutor(({ name }, scope) => fromJS(scope.params[name])),
  Context: constantExecutor(({ key }, scope) => {
    if (key === "before" || key === "after") return scope.context[key] || NULL_VALUE;
    throw Error(`unknown context key: ${key}`);
  }),
  Parent: constantExecutor(({ n }, scope) => {
    let current = scope;
    for (let i = 0; i < n; i++) {
      if (!current.parent) return NULL_VALUE;
      current = current.parent;
    }
    return current.value;
  }),
  OpCall: {
    async executeAsync({ op, left, right }, scope) {
      let func = operators[op];
      if (!func) throw Error(`Unknown operator: ${op}`);
      return func(await executeAsync(left, scope), await executeAsync(right, scope));
    },
    executeSync({ op, left, right }, scope) {
      let func = operators[op];
      if (!func) throw Error(`Unknown operator: ${op}`);
      let result = func(executeSync(left, scope), executeSync(right, scope));
      if ("then" in result || result.type === "stream") throw Error(`Operator ${op} not possible in evaluteSync`);
      return result;
    }
  },
  Select: {
    executeSync({ alternatives, fallback }, scope) {
      for (let alt of alternatives) {
        let altCond = executeSync(alt.condition, scope);
        if (altCond.type === "boolean" && altCond.data === true) return executeSync(alt.value, scope);
      }
      return fallback ? executeSync(fallback, scope) : NULL_VALUE;
    },
    async executeAsync({ alternatives, fallback }, scope) {
      for (let alt of alternatives) {
        let altCond = await executeAsync(alt.condition, scope);
        if (altCond.type === "boolean" && altCond.data === true) return executeAsync(alt.value, scope);
      }
      return fallback ? executeAsync(fallback, scope) : NULL_VALUE;
    }
  },
  InRange: mappedExecutor(({ base, left, right }) => [
    base,
    left,
    right
  ], ({ isInclusive }, value, leftValue, rightValue) => {
    let leftCmp = partialCompare(value.data, leftValue.data);
    if (leftCmp === null) return NULL_VALUE;
    let rightCmp = partialCompare(value.data, rightValue.data);
    return rightCmp === null ? NULL_VALUE : isInclusive ? leftCmp >= 0 && rightCmp <= 0 ? TRUE_VALUE : FALSE_VALUE : leftCmp >= 0 && rightCmp < 0 ? TRUE_VALUE : FALSE_VALUE;
  }),
  Filter: arrayExecutor(({ base, expr }) => ({
    array: base,
    inner: expr
  }), function* (_, elem, inner) {
    inner === true && (yield elem);
  }),
  Projection: {
    executeSync({ base, expr }, scope) {
      let baseValue = executeSync(base, scope);
      return baseValue.type === "object" ? executeSync(expr, scope.createNested(baseValue)) : NULL_VALUE;
    },
    async executeAsync({ base, expr }, scope) {
      let baseValue = await executeAsync(base, scope);
      return baseValue.type === "object" ? executeAsync(expr, scope.createNested(baseValue)) : NULL_VALUE;
    }
  },
  FuncCall: {
    executeAsync({ namespace, name, args }, scope) {
      let func = namespaces[namespace]?.[name];
      if (!func) throw Error(`Unknown function: ${namespace}::${name}`);
      return func.executeAsync(args, scope);
    },
    executeSync({ namespace, name, args }, scope) {
      let func = namespaces[namespace]?.[name];
      if (!func) throw Error(`Unknown function: ${namespace}::${name}`);
      return func.executeSync(args, scope);
    }
  },
  PipeFuncCall: {
    async executeAsync({ name, base, args }, scope) {
      let func = pipeFunctions[name];
      if (!func) throw Error(`Unknown pipe function: ${name}`);
      let baseValue = await executeAsync(base, scope);
      return baseValue.type !== "stream" && baseValue.type !== "array" ? NULL_VALUE : func.executeAsync({
        base: baseValue,
        args
      }, scope);
    },
    executeSync({ name, base, args }, scope) {
      let func = pipeFunctions[name];
      if (!func) throw Error(`Unknown pipe function: ${name}`);
      let baseValue = executeSync(base, scope);
      return baseValue.type === "array" ? func.executeSync({
        base: baseValue,
        args
      }, scope) : NULL_VALUE;
    }
  },
  AccessAttribute: mappedExecutor(({ base }) => [base || { type: "This" }], ({ name }, value) => value.type === "object" && value.data.hasOwnProperty(name) ? fromJS(value.data[name]) : NULL_VALUE),
  AccessElement: mappedExecutor(({ base }) => [base], ({ index: index2 }, baseValue) => {
    if (baseValue.type !== "array") return NULL_VALUE;
    let data = baseValue.data;
    return fromJS(data[index2 < 0 ? index2 + data.length : index2]);
  }),
  Slice: mappedExecutor(({ base }) => [base], ({ left, right, isInclusive }, baseValue) => {
    if (baseValue.type !== "array") return NULL_VALUE;
    let array2 = baseValue.data, leftIdx = left, rightIdx = right;
    return leftIdx < 0 && (leftIdx = array2.length + leftIdx), rightIdx < 0 && (rightIdx = array2.length + rightIdx), isInclusive && rightIdx++, leftIdx < 0 && (leftIdx = 0), rightIdx < 0 && (rightIdx = 0), fromArray(array2.slice(leftIdx, rightIdx));
  }),
  Deref: {
    executeSync({ base }, scope) {
      let value = executeSync(base, scope);
      if (value.type !== "object") return NULL_VALUE;
      let id2 = value.data._ref;
      if (typeof id2 != "string") return NULL_VALUE;
      if (scope.context.dereference) {
        let value2 = scope.context.dereference({ _ref: id2 });
        if (value2 && typeof value2 == "object" && "then" in value2) throw Error("Dereference returned promise in synchronous mode");
        return fromJS(value2);
      }
      if (scope.source.type !== "array") return NULL_VALUE;
      for (let doc of scope.source.data) if (doc && typeof doc == "object" && "_id" in doc && id2 === doc._id) return fromJS(doc);
      return NULL_VALUE;
    },
    async executeAsync({ base }, scope) {
      let value = await executeAsync(base, scope);
      if (!scope.source.isArray() || value.type !== "object") return NULL_VALUE;
      let id2 = value.data._ref;
      if (typeof id2 != "string") return NULL_VALUE;
      if (scope.context.dereference) return fromJS(await scope.context.dereference({ _ref: id2 }));
      for await (let doc of scope.source) if (doc.type === "object" && id2 === doc.data._id) return doc;
      return NULL_VALUE;
    }
  },
  Value: constantExecutor(({ value }) => fromJS(value)),
  Group: {
    executeSync({ base }, scope) {
      return executeSync(base, scope);
    },
    executeAsync({ base }, scope) {
      return executeAsync(base, scope);
    }
  },
  Object: {
    executeSync({ attributes }, scope) {
      let result = {};
      for (let attr of attributes) {
        let attrType = attr.type;
        switch (attr.type) {
          case "ObjectAttributeValue": {
            let value = executeSync(attr.value, scope);
            result[attr.name] = value.data;
            break;
          }
          case "ObjectConditionalSplat": {
            let cond = executeSync(attr.condition, scope);
            if (cond.type !== "boolean" || cond.data === false) continue;
            let value = executeSync(attr.value, scope);
            value.type === "object" && Object.assign(result, value.data);
            break;
          }
          case "ObjectSplat": {
            let value = executeSync(attr.value, scope);
            value.type === "object" && Object.assign(result, value.data);
            break;
          }
          default:
            throw Error(`Unknown node type: ${attrType}`);
        }
      }
      return fromJS(result);
    },
    async executeAsync({ attributes }, scope) {
      let result = {};
      for (let attr of attributes) {
        let attrType = attr.type;
        switch (attr.type) {
          case "ObjectAttributeValue": {
            let value = await executeAsync(attr.value, scope);
            result[attr.name] = await value.get();
            break;
          }
          case "ObjectConditionalSplat": {
            let cond = await executeAsync(attr.condition, scope);
            if (cond.type !== "boolean" || cond.data === false) continue;
            let value = await executeAsync(attr.value, scope);
            value.type === "object" && Object.assign(result, value.data);
            break;
          }
          case "ObjectSplat": {
            let value = await executeAsync(attr.value, scope);
            value.type === "object" && Object.assign(result, value.data);
            break;
          }
          default:
            throw Error(`Unknown node type: ${attrType}`);
        }
      }
      return fromJS(result);
    }
  },
  Array: {
    executeSync({ elements }, scope) {
      let result = [];
      for (let element of elements) {
        let value = executeSync(element.value, scope);
        if (element.isSplat) {
          if (value.type === "array") for (let v of value.data) result.push(v);
        } else result.push(value.data);
      }
      return fromArray(result);
    },
    async executeAsync({ elements }, scope) {
      return new StreamValue$1(async function* () {
        for (let element of elements) {
          let value = await executeAsync(element.value, scope);
          if (element.isSplat) {
            if (value.isArray()) for await (let v of value) yield v;
          } else yield value;
        }
      });
    }
  },
  Tuple: constantExecutor(() => {
    throw Error("tuples can not be evaluated");
  }),
  Or: mappedExecutor(({ left, right }) => [left, right], (_, leftValue, rightValue) => leftValue.type === "boolean" && leftValue.data === true || rightValue.type === "boolean" && rightValue.data === true ? TRUE_VALUE : leftValue.type !== "boolean" || rightValue.type !== "boolean" ? NULL_VALUE : FALSE_VALUE),
  And: mappedExecutor(({ left, right }) => [left, right], (_, leftValue, rightValue) => leftValue.type === "boolean" && leftValue.data === false || rightValue.type === "boolean" && rightValue.data === false ? FALSE_VALUE : leftValue.type !== "boolean" || rightValue.type !== "boolean" ? NULL_VALUE : TRUE_VALUE),
  Not: mappedExecutor(({ base }) => [base], (_, value) => value.type === "boolean" ? value.data ? FALSE_VALUE : TRUE_VALUE : NULL_VALUE),
  Neg: mappedExecutor(({ base }) => [base], (_, value) => value.type === "number" ? fromNumber(-value.data) : NULL_VALUE),
  Pos: mappedExecutor(({ base }) => [base], (_, value) => value.type === "number" ? fromNumber(value.data) : NULL_VALUE),
  Asc: constantExecutor(() => NULL_VALUE),
  Desc: constantExecutor(() => NULL_VALUE),
  ArrayCoerce: {
    executeSync({ base }, scope) {
      let value = executeSync(base, scope);
      return value.isArray() ? value : NULL_VALUE;
    },
    async executeAsync({ base }, scope) {
      let value = await executeAsync(base, scope);
      return value.isArray() ? value : NULL_VALUE;
    }
  },
  Map: arrayExecutor(({ base, expr }) => ({
    array: base,
    inner: expr
  }), function* (_, _item, inner) {
    yield inner;
  }, { hidden: true }),
  FlatMap: arrayExecutor(({ base, expr }) => ({
    array: base,
    inner: expr
  }), function* (_, _item, inner) {
    if (Array.isArray(inner)) for (let innerInner of inner) yield innerInner;
    else yield inner;
  }, { hidden: true })
};
function evaluateQuerySync$1(tree, options = {}) {
  return executeSync(tree, scopeFromOptions(options));
}
function scopeFromOptions(options) {
  let root = fromJS(options.root), dataset = fromJS(options.dataset);
  return new Scope$1({ ...options.params }, dataset, root, {
    timestamp: options.timestamp || /* @__PURE__ */ new Date(),
    identity: options.identity === void 0 ? "me" : options.identity,
    sanity: options.sanity,
    after: options.after ? fromJS(options.after) : null,
    before: options.before ? fromJS(options.before) : null,
    dereference: options.dereference
  }, null);
}
var [Document] = [
  53,
  () => [],
  [
    "",
    "",
    ""
  ]
];
var [DereferenceFunction] = [
  54,
  () => [
    Document,
    PromiseLike,
    Document
  ],
  [
    "",
    "",
    "",
    "",
    ""
  ]
];
var [Context] = [
  56,
  () => [
    Date,
    Value,
    Value,
    DereferenceFunction
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
];
var [Scope] = [
  49,
  () => [
    Record,
    Value,
    Value,
    Scope,
    Context,
    Record,
    Value,
    Value,
    Context,
    Scope,
    Value,
    Scope,
    Value,
    Scope
  ],
  ".............................".split(".")
];

// ../../node_modules/.pnpm/obug@2.2.1/node_modules/obug/dist/core.js
function coerce2(value) {
  if (value instanceof Error) return value.stack || value.message;
  return value;
}
function selectColor(colors2, namespace) {
  let hash = 0;
  for (let i = 0; i < namespace.length; i++) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0;
  }
  return colors2[Math.abs(hash) % colors2.length];
}
function matchesTemplate(search, template) {
  let searchIndex = 0;
  let templateIndex = 0;
  let starIndex = -1;
  let matchIndex = 0;
  while (searchIndex < search.length) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
    if (template[templateIndex] === "*") {
      starIndex = templateIndex;
      matchIndex = searchIndex;
      templateIndex++;
    } else {
      searchIndex++;
      templateIndex++;
    }
  } else if (starIndex !== -1) {
    templateIndex = starIndex + 1;
    matchIndex++;
    searchIndex = matchIndex;
  } else return false;
  while (templateIndex < template.length && template[templateIndex] === "*") templateIndex++;
  return templateIndex === template.length;
}
function humanize(value) {
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}s`;
  return `${value}ms`;
}
var globalNamespaces = "";
function createDebug(namespace, options) {
  let prevTime;
  let enableOverride;
  let namespacesCache;
  let enabledCache;
  const debug = ((...args) => {
    if (!debug.enabled) return;
    const curr = Date.now();
    const diff3 = curr - (prevTime || curr);
    prevTime = curr;
    args[0] = coerce2(args[0]);
    if (typeof args[0] !== "string") args.unshift("%O");
    let index2 = 0;
    args[0] = args[0].replace(/%([a-z%])/gi, (match2, format2) => {
      if (match2 === "%%") return "%";
      index2++;
      const formatter = options.formatters[format2];
      if (typeof formatter === "function") {
        const value = args[index2];
        match2 = formatter.call(debug, value);
        args.splice(index2, 1);
        index2--;
      }
      return match2;
    });
    options.formatArgs.call(debug, diff3, args);
    debug.log(...args);
  });
  debug.extend = function(namespace2, delimiter = ":") {
    return createDebug(this.namespace + delimiter + namespace2, {
      useColors: this.useColors,
      color: this.color,
      formatArgs: this.formatArgs,
      formatters: this.formatters,
      inspectOpts: this.inspectOpts,
      log: this.log,
      humanize: this.humanize
    });
  };
  Object.assign(debug, options);
  debug.namespace = namespace;
  Object.defineProperty(debug, "enabled", {
    enumerable: true,
    configurable: false,
    get: () => {
      if (enableOverride != null) return enableOverride;
      if (namespacesCache !== globalNamespaces) {
        namespacesCache = globalNamespaces;
        enabledCache = enabled(namespace);
      }
      return enabledCache;
    },
    set: (v) => {
      enableOverride = v;
    }
  });
  return debug;
}
var names = [];
var skips = [];
function enable(namespaces3) {
  globalNamespaces = namespaces3;
  names = [];
  skips = [];
  const split = globalNamespaces.trim().replace(/\s+/g, ",").split(",").filter(Boolean);
  for (const ns of split) if (ns[0] === "-") skips.push(ns.slice(1));
  else names.push(ns);
}
function enabled(name) {
  for (const skip2 of skips) if (matchesTemplate(name, skip2)) return false;
  for (const ns of names) if (matchesTemplate(name, ns)) return true;
  return false;
}

// ../../node_modules/.pnpm/obug@2.2.1/node_modules/obug/dist/browser.js
var colors = [
  "#0000CC",
  "#0000FF",
  "#0033CC",
  "#0033FF",
  "#0066CC",
  "#0066FF",
  "#0099CC",
  "#0099FF",
  "#00CC00",
  "#00CC33",
  "#00CC66",
  "#00CC99",
  "#00CCCC",
  "#00CCFF",
  "#3300CC",
  "#3300FF",
  "#3333CC",
  "#3333FF",
  "#3366CC",
  "#3366FF",
  "#3399CC",
  "#3399FF",
  "#33CC00",
  "#33CC33",
  "#33CC66",
  "#33CC99",
  "#33CCCC",
  "#33CCFF",
  "#6600CC",
  "#6600FF",
  "#6633CC",
  "#6633FF",
  "#66CC00",
  "#66CC33",
  "#9900CC",
  "#9900FF",
  "#9933CC",
  "#9933FF",
  "#99CC00",
  "#99CC33",
  "#CC0000",
  "#CC0033",
  "#CC0066",
  "#CC0099",
  "#CC00CC",
  "#CC00FF",
  "#CC3300",
  "#CC3333",
  "#CC3366",
  "#CC3399",
  "#CC33CC",
  "#CC33FF",
  "#CC6600",
  "#CC6633",
  "#CC9900",
  "#CC9933",
  "#CCCC00",
  "#CCCC33",
  "#FF0000",
  "#FF0033",
  "#FF0066",
  "#FF0099",
  "#FF00CC",
  "#FF00FF",
  "#FF3300",
  "#FF3333",
  "#FF3366",
  "#FF3399",
  "#FF33CC",
  "#FF33FF",
  "#FF6600",
  "#FF6633",
  "#FF9900",
  "#FF9933",
  "#FFCC00",
  "#FFCC33"
];
function formatArgs(diff3, args) {
  const { useColors } = this;
  args[0] = `${(useColors ? "%c" : "") + this.namespace + (useColors ? " %c" : " ") + args[0] + (useColors ? "%c " : " ")}+${this.humanize(diff3)}`;
  if (!useColors) return;
  const c4 = `color: ${this.color}`;
  args.splice(1, 0, c4, "color: inherit");
  let index2 = 0;
  let lastC = 0;
  args[0].replace(/%[a-z%]/gi, (match2) => {
    if (match2 === "%%") return;
    index2++;
    if (match2 === "%c") lastC = index2;
  });
  args.splice(lastC, 0, c4);
}
var defaultOptions2 = {
  useColors: true,
  formatArgs,
  formatters: {
    /**
    * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
    */
    j(v) {
      try {
        return JSON.stringify(v);
      } catch (error2) {
        return `[UnexpectedJSONParseError]: ${error2.message}`;
      }
    }
  },
  inspectOpts: {},
  humanize,
  log: console.debug || console.log || (() => {
  })
};
function createDebug2(namespace, options) {
  var _ref;
  const color = (_ref = options && options.color) !== null && _ref !== void 0 ? _ref : selectColor(colors, namespace);
  return createDebug(namespace, Object.assign(defaultOptions2, { color }, options));
}
function load() {
  let r;
  try {
    r = localStorage.getItem("debug") || localStorage.getItem("DEBUG");
  } catch (_unused) {
  }
  if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
  return r || "";
}
enable(load());

// ../../node_modules/.pnpm/groq-js@2.0.0/node_modules/groq-js/dist/1-BobtwIDv.js
var MarkProcessor = class {
  _string;
  marks;
  index;
  customFunctions;
  parseOptions;
  allowBoost = false;
  constructor(string2, marks, customFunctions, parseOptions) {
    this._string = string2, this.marks = marks, this.customFunctions = customFunctions, this.index = 0, this.parseOptions = parseOptions;
  }
  hasMark(pos = 0) {
    return this.index + pos < this.marks.length;
  }
  getMark(pos = 0) {
    return this.marks[this.index + pos];
  }
  shift() {
    this.index += 1;
  }
  process(visitor) {
    let mark = this.marks[this.index];
    this.shift();
    let func = visitor[mark.name];
    if (!func) throw Error(`Unknown handler: ${mark.name}`);
    return func.call(visitor, this, mark);
  }
  processString() {
    return this.shift(), this.processStringEnd();
  }
  processStringEnd() {
    let prev = this.marks[this.index - 1], curr = this.marks[this.index];
    return this.shift(), this.string.slice(prev.position, curr.position);
  }
  slice(len) {
    let pos = this.marks[this.index].position;
    return this.string.slice(pos, pos + len);
  }
  get string() {
    return this._string;
  }
};
var WS = /^([\t\n\v\f\r \u0085\u00A0]|(\/\/[^\n]*\n))+/;
var NUM = /^\d+/;
var IDENT = /^[a-zA-Z_][a-zA-Z_0-9]*/;
function parse$1(str) {
  let pos = 0;
  pos = skipWS(str, pos);
  let customFunctions = {};
  for (; pos < str.length && str.substring(pos, pos + 2) === "fn"; ) {
    let funcResult = parseFunctionDeclaration(str, pos);
    if (funcResult.type === "error") return funcResult;
    customFunctions[`${funcResult.namespace}::${funcResult.name}`] = funcResult, pos = skipWS(str, funcResult.position);
  }
  let result = parseExpr(str, pos, 0);
  return result.type === "error" ? result : (pos = skipWS(str, result.position), pos === str.length ? (delete result.position, delete result.failPosition, result.customFunctions = customFunctions, result) : (result.failPosition && (pos = result.failPosition - 1), {
    type: "error",
    message: "Unexpected end of query",
    position: pos
  }));
}
function parseExpr(str, pos, level) {
  let startPos = pos, token = str[pos], marks;
  switch (token) {
    case "+": {
      let rhs = parseExpr(str, skipWS(str, pos + 1), 10);
      if (rhs.type === "error") return rhs;
      marks = [{
        name: "pos",
        position: startPos
      }].concat(rhs.marks), pos = rhs.position;
      break;
    }
    case "-": {
      let rhs = parseExpr(str, skipWS(str, pos + 1), 8);
      if (rhs.type === "error") return rhs;
      marks = [{
        name: "neg",
        position: startPos
      }].concat(rhs.marks), pos = rhs.position;
      break;
    }
    case "(": {
      let result = parseGroupOrTuple(str, pos);
      if (result.type === "error") return result;
      pos = result.position, marks = result.marks;
      break;
    }
    case "!": {
      let rhs = parseExpr(str, skipWS(str, pos + 1), 10);
      if (rhs.type === "error") return rhs;
      marks = [{
        name: "not",
        position: startPos
      }].concat(rhs.marks), pos = rhs.position;
      break;
    }
    case "{": {
      let result = parseObject(str, pos);
      if (result.type === "error") return result;
      marks = result.marks, pos = result.position;
      break;
    }
    case "[":
      if (marks = [{
        name: "array",
        position: pos
      }], pos = skipWS(str, pos + 1), str[pos] !== "]") for (; ; ) {
        str.slice(pos, pos + 3) === "..." && (marks.push({
          name: "array_splat",
          position: pos
        }), pos = skipWS(str, pos + 3));
        let res = parseExpr(str, pos, 0);
        if (res.type === "error") return res;
        if (marks = marks.concat(res.marks), pos = res.position, pos = skipWS(str, pos), str[pos] !== "," || (pos = skipWS(str, pos + 1), str[pos] === "]")) break;
      }
      if (str[pos] === "]") pos++, marks.push({
        name: "array_end",
        position: pos
      });
      else return {
        type: "error",
        message: 'Expected "]" after array expression',
        position: pos
      };
      break;
    case "'":
    case '"': {
      let result = parseString(str, pos);
      if (result.type === "error") return result;
      marks = result.marks, pos = result.position;
      break;
    }
    case "^":
      for (pos++, marks = []; str[pos] === "." && str[pos + 1] === "^"; ) marks.push({
        name: "dblparent",
        position: startPos
      }), pos += 2;
      marks.push({
        name: "parent",
        position: startPos
      });
      break;
    case "@":
      marks = [{
        name: "this",
        position: startPos
      }], pos++;
      break;
    case "*":
      marks = [{
        name: "everything",
        position: startPos
      }], pos++;
      break;
    case "$": {
      let identLen = parseRegex(str, pos + 1, IDENT);
      identLen && (pos += 1 + identLen, marks = [
        {
          name: "param",
          position: startPos
        },
        {
          name: "ident",
          position: startPos + 1
        },
        {
          name: "ident_end",
          position: pos
        }
      ]);
      break;
    }
    default: {
      let numLen = parseRegex(str, pos, NUM);
      if (numLen) {
        pos += numLen;
        let name = "integer";
        if (str[pos] === ".") {
          let fracLen = parseRegex(str, pos + 1, NUM);
          fracLen && (name = "float", pos += 1 + fracLen);
        }
        if (str[pos] === "e" || str[pos] === "E") {
          name = "sci", pos++, (str[pos] === "+" || str[pos] === "-") && pos++;
          let expLen = parseRegex(str, pos, NUM);
          if (!expLen) return {
            type: "error",
            message: "Exponent must be a number",
            position: pos
          };
          pos += expLen;
        }
        marks = [{
          name,
          position: startPos
        }, {
          name: name + "_end",
          position: pos
        }];
        break;
      }
      let identLen = parseRegex(str, pos, IDENT);
      if (identLen) {
        switch (pos += identLen, str[pos]) {
          case ":":
          case "(": {
            let result = parseFuncCall(str, startPos, pos);
            if (result.type === "error") return result;
            marks = result.marks, pos = result.position;
            break;
          }
          default:
            marks = [
              {
                name: "this_attr",
                position: startPos
              },
              {
                name: "ident",
                position: startPos
              },
              {
                name: "ident_end",
                position: pos
              }
            ];
        }
        break;
      }
    }
  }
  if (!marks) return {
    type: "error",
    message: "Expected expression",
    position: pos
  };
  let lhsLevel = 12, trav;
  loop: for (; ; ) {
    let innerPos = skipWS(str, pos);
    if (innerPos === str.length) {
      pos = innerPos;
      break;
    }
    if (trav = parseTraversal(str, innerPos), trav.type === "success") {
      for (marks.unshift({
        name: "traverse",
        position: startPos
      }); trav.type === "success"; ) marks = marks.concat(trav.marks), pos = trav.position, trav = parseTraversal(str, skipWS(str, pos));
      marks.push({
        name: "traversal_end",
        position: pos
      });
      continue;
    }
    switch (str[innerPos]) {
      case "=":
        switch (str[innerPos + 1]) {
          case ">": {
            if (level > 1 || lhsLevel <= 1) break loop;
            let rhs = parseExpr(str, skipWS(str, innerPos + 2), 1);
            if (rhs.type === "error") return rhs;
            marks = marks.concat(rhs.marks), marks.unshift({
              name: "pair",
              position: startPos
            }), pos = rhs.position, lhsLevel = 1;
            break;
          }
          case "=": {
            if (level > 4 || lhsLevel <= 4) break loop;
            let rhs = parseExpr(str, skipWS(str, innerPos + 2), 5);
            if (rhs.type === "error") return rhs;
            marks.unshift({
              name: "comp",
              position: startPos
            }), marks.push({
              name: "op",
              position: innerPos
            }, {
              name: "op_end",
              position: innerPos + 2
            }), marks = marks.concat(rhs.marks), pos = rhs.position, lhsLevel = 4;
            break;
          }
          default:
            break loop;
        }
        break;
      case "+": {
        if (level > 6 || lhsLevel < 6) break loop;
        let rhs = parseExpr(str, skipWS(str, innerPos + 1), 7);
        if (rhs.type === "error") return rhs;
        marks = marks.concat(rhs.marks), marks.unshift({
          name: "add",
          position: startPos
        }), pos = rhs.position, lhsLevel = 6;
        break;
      }
      case "-": {
        if (level > 6 || lhsLevel < 6) break loop;
        let rhs = parseExpr(str, skipWS(str, innerPos + 1), 7);
        if (rhs.type === "error") return rhs;
        marks = marks.concat(rhs.marks), marks.unshift({
          name: "sub",
          position: startPos
        }), pos = rhs.position, lhsLevel = 6;
        break;
      }
      case "*": {
        if (str[innerPos + 1] === "*") {
          if (level > 8 || lhsLevel <= 8) break loop;
          let rhs2 = parseExpr(str, skipWS(str, innerPos + 2), 8);
          if (rhs2.type === "error") return rhs2;
          marks = marks.concat(rhs2.marks), marks.unshift({
            name: "pow",
            position: startPos
          }), pos = rhs2.position, lhsLevel = 8;
          break;
        }
        if (level > 7 || lhsLevel < 7) break loop;
        let rhs = parseExpr(str, skipWS(str, innerPos + 1), 8);
        if (rhs.type === "error") return rhs;
        marks = marks.concat(rhs.marks), marks.unshift({
          name: "mul",
          position: startPos
        }), pos = rhs.position, lhsLevel = 7;
        break;
      }
      case "/": {
        if (level > 7 || lhsLevel < 7) break loop;
        let rhs = parseExpr(str, skipWS(str, innerPos + 1), 8);
        if (rhs.type === "error") return rhs;
        marks = marks.concat(rhs.marks), marks.unshift({
          name: "div",
          position: startPos
        }), pos = rhs.position, lhsLevel = 7;
        break;
      }
      case "%": {
        if (level > 7 || lhsLevel < 7) break loop;
        let rhs = parseExpr(str, skipWS(str, innerPos + 1), 8);
        if (rhs.type === "error") return rhs;
        marks = marks.concat(rhs.marks), marks.unshift({
          name: "mod",
          position: startPos
        }), pos = rhs.position, lhsLevel = 7;
        break;
      }
      case "<":
      case ">": {
        if (level > 4 || lhsLevel <= 4) break loop;
        let nextPos = innerPos + 1;
        str[nextPos] === "=" && nextPos++;
        let rhs = parseExpr(str, skipWS(str, nextPos), 5);
        if (rhs.type === "error") return rhs;
        marks.unshift({
          name: "comp",
          position: startPos
        }), marks.push({
          name: "op",
          position: innerPos
        }, {
          name: "op_end",
          position: nextPos
        }), marks = marks.concat(rhs.marks), pos = rhs.position, lhsLevel = 4;
        break;
      }
      case "|":
        if (str[innerPos + 1] === "|") {
          if (level > 2 || lhsLevel < 2) break loop;
          let rhs = parseExpr(str, skipWS(str, innerPos + 2), 3);
          if (rhs.type === "error") return rhs;
          marks = marks.concat(rhs.marks), marks.unshift({
            name: "or",
            position: startPos
          }), pos = rhs.position, lhsLevel = 2;
        } else {
          if (level > 11 || lhsLevel < 11) break loop;
          let identPos = skipWS(str, innerPos + 1), identLen = parseRegex(str, identPos, IDENT);
          if (!identLen) return {
            type: "error",
            message: "Expected identifier",
            position: identPos
          };
          if (pos = identPos + identLen, str[pos] === "(" || str[pos] === ":") {
            let result = parseFuncCall(str, identPos, pos);
            if (result.type === "error") return result;
            marks = marks.concat(result.marks), marks.unshift({
              name: "pipecall",
              position: startPos
            }), pos = result.position, lhsLevel = 11;
          }
        }
        break;
      case "&": {
        if (str[innerPos + 1] != "&" || level > 3 || lhsLevel < 3) break loop;
        let rhs = parseExpr(str, skipWS(str, innerPos + 2), 4);
        if (rhs.type === "error") return rhs;
        marks = marks.concat(rhs.marks), marks.unshift({
          name: "and",
          position: startPos
        }), pos = rhs.position, lhsLevel = 3;
        break;
      }
      case "!": {
        if (str[innerPos + 1] !== "=" || level > 4 || lhsLevel <= 4) break loop;
        let rhs = parseExpr(str, skipWS(str, innerPos + 2), 5);
        if (rhs.type === "error") return rhs;
        marks.unshift({
          name: "comp",
          position: startPos
        }), marks.push({
          name: "op",
          position: innerPos
        }, {
          name: "op_end",
          position: innerPos + 2
        }), marks = marks.concat(rhs.marks), pos = rhs.position, lhsLevel = 4;
        break;
      }
      case "d":
        if (str.slice(innerPos, innerPos + 4) !== "desc" || level > 4 || lhsLevel < 4) break loop;
        marks.unshift({
          name: "desc",
          position: startPos
        }), pos = innerPos + 4, lhsLevel = 4;
        break;
      case "a":
        if (str.slice(innerPos, innerPos + 3) !== "asc" || level > 4 || lhsLevel < 4) break loop;
        marks.unshift({
          name: "asc",
          position: startPos
        }), pos = innerPos + 3, lhsLevel = 4;
        break;
      default:
        switch (parseRegexStr(str, innerPos, IDENT)) {
          case "in": {
            if (level > 4 || lhsLevel <= 4) break loop;
            pos = skipWS(str, innerPos + 2);
            let isGroup = false;
            str[pos] === "(" && (isGroup = true, pos = skipWS(str, pos + 1));
            let rangePos = pos, result = parseExpr(str, pos, 5);
            if (result.type === "error") return result;
            if (pos = skipWS(str, result.position), str[pos] === "." && str[pos + 1] === ".") {
              let type = "inc_range";
              str[pos + 2] === "." ? (type = "exc_range", pos = skipWS(str, pos + 3)) : pos = skipWS(str, pos + 2);
              let rhs = parseExpr(str, pos, 5);
              if (rhs.type === "error") return rhs;
              marks.unshift({
                name: "in_range",
                position: startPos
              }), marks = marks.concat({
                name: type,
                position: rangePos
              }, result.marks, rhs.marks), pos = rhs.position;
            } else marks.unshift({
              name: "comp",
              position: startPos
            }), marks.push({
              name: "op",
              position: innerPos
            }, {
              name: "op_end",
              position: innerPos + 2
            }), marks = marks.concat(result.marks);
            if (isGroup) {
              if (pos = skipWS(str, pos), str[pos] !== ")") return {
                type: "error",
                message: 'Expected ")" in group',
                position: pos
              };
              pos++;
            }
            lhsLevel = 4;
            break;
          }
          case "match": {
            if (level > 4 || lhsLevel <= 4) break loop;
            let rhs = parseExpr(str, skipWS(str, innerPos + 5), 5);
            if (rhs.type === "error") return rhs;
            marks.unshift({
              name: "comp",
              position: startPos
            }), marks.push({
              name: "op",
              position: innerPos
            }, {
              name: "op_end",
              position: innerPos + 5
            }), marks = marks.concat(rhs.marks), pos = rhs.position, lhsLevel = 4;
            break;
          }
          default:
            break loop;
        }
    }
  }
  let failPosition = trav?.type === "error" && trav.position;
  return {
    type: "success",
    marks,
    position: pos,
    failPosition
  };
}
function parseGroupOrTuple(str, pos) {
  let startPos = pos, marks, rhs = parseExpr(str, skipWS(str, pos + 1), 0);
  if (rhs.type === "error") return rhs;
  switch (pos = skipWS(str, rhs.position), str[pos]) {
    case ",":
      for (marks = [{
        name: "tuple",
        position: startPos
      }].concat(rhs.marks), pos = skipWS(str, pos + 1); ; ) {
        if (rhs = parseExpr(str, pos, 0), rhs.type === "error") return rhs;
        if (marks.push(...rhs.marks), pos = skipWS(str, rhs.position), str[pos] !== ",") break;
        pos = skipWS(str, pos + 1);
      }
      if (str[pos] !== ")") return {
        type: "error",
        message: 'Expected ")" after tuple expression',
        position: pos
      };
      pos++, marks.push({
        name: "tuple_end",
        position: pos
      });
      break;
    case ")":
      pos++, marks = [{
        name: "group",
        position: startPos
      }].concat(rhs.marks);
      break;
    default:
      return {
        type: "error",
        message: `Unexpected character "${str[pos]}"`,
        position: pos
      };
  }
  return {
    type: "success",
    marks,
    position: pos
  };
}
function parseTraversal(str, pos) {
  let startPos = pos;
  switch (str[pos]) {
    case ".": {
      if (pos = skipWS(str, pos + 1), str[pos] === "(") return parseGroupOrTuple(str, pos);
      let identStart = pos, identLen2 = parseRegex(str, pos, IDENT);
      return identLen2 ? (pos += identLen2, {
        type: "success",
        marks: [
          {
            name: "attr_access",
            position: startPos
          },
          {
            name: "ident",
            position: identStart
          },
          {
            name: "ident_end",
            position: pos
          }
        ],
        position: pos
      }) : {
        type: "error",
        message: 'Expected identifier after "."',
        position: pos
      };
    }
    case "-":
      if (str[pos + 1] !== ">") return {
        type: "error",
        message: 'Expected ">" in reference',
        position: pos
      };
      let marks = [{
        name: "deref",
        position: startPos
      }];
      pos += 2;
      let identPos = skipWS(str, pos), identLen = parseRegex(str, identPos, IDENT);
      return identLen && (pos = identPos + identLen, marks.push({
        name: "deref_attr",
        position: identPos
      }, {
        name: "ident",
        position: identPos
      }, {
        name: "ident_end",
        position: pos
      })), {
        type: "success",
        marks,
        position: pos
      };
    case "[": {
      if (pos = skipWS(str, pos + 1), str[pos] === "]") return {
        type: "success",
        marks: [{
          name: "array_postfix",
          position: startPos
        }],
        position: pos + 1
      };
      let rangePos = pos, result = parseExpr(str, pos, 0);
      if (result.type === "error") return result;
      if (pos = skipWS(str, result.position), str[pos] === "." && str[pos + 1] === ".") {
        let type = "inc_range";
        str[pos + 2] === "." ? (type = "exc_range", pos += 3) : pos += 2, pos = skipWS(str, pos);
        let rhs = parseExpr(str, pos, 0);
        return rhs.type === "error" ? rhs : (pos = skipWS(str, rhs.position), str[pos] === "]" ? {
          type: "success",
          marks: [{
            name: "slice",
            position: startPos
          }, {
            name: type,
            position: rangePos
          }].concat(result.marks, rhs.marks),
          position: pos + 1
        } : {
          type: "error",
          message: 'Expected "]" after array expression',
          position: pos
        });
      }
      return str[pos] === "]" ? {
        type: "success",
        marks: [{
          name: "square_bracket",
          position: startPos
        }].concat(result.marks),
        position: pos + 1
      } : {
        type: "error",
        message: 'Expected "]" after array expression',
        position: pos
      };
    }
    case "|":
      if (pos = skipWS(str, pos + 1), str[pos] === "{") {
        let result = parseObject(str, pos);
        return result.type === "error" || result.marks.unshift({
          name: "projection",
          position: startPos
        }), result;
      }
      break;
    case "{": {
      let result = parseObject(str, pos);
      return result.type === "error" || result.marks.unshift({
        name: "projection",
        position: startPos
      }), result;
    }
  }
  return {
    type: "error",
    message: "Unexpected character in traversal",
    position: pos
  };
}
function parseFuncCall(str, startPos, pos) {
  let marks = [];
  if (marks.push({
    name: "func_call",
    position: startPos
  }), str[pos] === ":" && str[pos + 1] === ":") {
    marks.push({
      name: "namespace",
      position: startPos
    }), marks.push({
      name: "ident",
      position: startPos
    }, {
      name: "ident_end",
      position: pos
    }), pos = skipWS(str, pos + 2);
    let nameLen = parseRegex(str, pos, IDENT);
    if (!nameLen) return {
      type: "error",
      message: "Expected function name",
      position: pos
    };
    if (marks.push({
      name: "ident",
      position: pos
    }, {
      name: "ident_end",
      position: pos + nameLen
    }), pos = skipWS(str, pos + nameLen), str[pos] !== "(") return {
      type: "error",
      message: 'Expected "(" after function name',
      position: pos
    };
    pos++, pos = skipWS(str, pos);
  } else marks.push({
    name: "ident",
    position: startPos
  }, {
    name: "ident_end",
    position: pos
  }), pos = skipWS(str, pos + 1);
  let lastPos = pos;
  if (str[pos] !== ")") for (; ; ) {
    let result = parseExpr(str, pos, 0);
    if (result.type === "error") return result;
    if (marks = marks.concat(result.marks), lastPos = result.position, pos = skipWS(str, result.position), str[pos] !== "," || (pos = skipWS(str, pos + 1), str[pos] === ")")) break;
  }
  return str[pos] === ")" ? (marks.push({
    name: "func_args_end",
    position: lastPos
  }), {
    type: "success",
    marks,
    position: pos + 1
  }) : {
    type: "error",
    message: 'Expected ")" after function arguments',
    position: pos
  };
}
function parseObject(str, pos) {
  let marks = [{
    name: "object",
    position: pos
  }];
  pos = skipWS(str, pos + 1);
  loop: for (; str[pos] !== "}"; ) {
    let pairPos = pos;
    if (str.slice(pos, pos + 3) === "...") if (pos = skipWS(str, pos + 3), str[pos] !== "}" && str[pos] !== ",") {
      let expr = parseExpr(str, pos, 0);
      if (expr.type === "error") return expr;
      marks.push({
        name: "object_splat",
        position: pairPos
      }), marks = marks.concat(expr.marks), pos = expr.position;
    } else marks.push({
      name: "object_splat_this",
      position: pairPos
    });
    else {
      let expr = parseExpr(str, pos, 0);
      if (expr.type === "error") return expr;
      let nextPos = skipWS(str, expr.position);
      if (expr.marks[0].name === "str" && str[nextPos] === ":") {
        let value = parseExpr(str, skipWS(str, nextPos + 1), 0);
        if (value.type === "error") return value;
        marks.push({
          name: "object_pair",
          position: pairPos
        }), marks = marks.concat(expr.marks, value.marks), pos = value.position;
      } else marks = marks.concat({
        name: "object_expr",
        position: pos
      }, expr.marks), pos = expr.position;
    }
    if (pos = skipWS(str, pos), str[pos] !== ",") break;
    pos = skipWS(str, pos + 1);
  }
  return str[pos] === "}" ? (pos++, marks.push({
    name: "object_end",
    position: pos
  }), {
    type: "success",
    marks,
    position: pos
  }) : {
    type: "error",
    message: 'Expected "}" after object',
    position: pos
  };
}
function parseString(str, pos) {
  let token = str[pos];
  pos += 1;
  let marks = [{
    name: "str",
    position: pos
  }];
  str: for (; ; pos++) {
    if (pos > str.length) return {
      type: "error",
      message: "Unexpected end of query",
      position: pos
    };
    switch (str[pos]) {
      case token:
        marks.push({
          name: "str_end",
          position: pos
        }), pos++;
        break str;
      case "\\":
        marks.push({
          name: "str_pause",
          position: pos
        }), str[pos + 1] === "u" ? str[pos + 2] === "{" ? (marks.push({
          name: "unicode_hex",
          position: pos + 3
        }), pos = str.indexOf("}", pos + 3), marks.push({
          name: "unicode_hex_end",
          position: pos
        })) : (marks.push({
          name: "unicode_hex",
          position: pos + 2
        }), marks.push({
          name: "unicode_hex_end",
          position: pos + 6
        }), pos += 5) : (marks.push({
          name: "single_escape",
          position: pos + 1
        }), pos += 1), marks.push({
          name: "str_start",
          position: pos + 1
        });
    }
  }
  return {
    type: "success",
    marks,
    position: pos
  };
}
function skipWS(str, pos) {
  return pos + parseRegex(str, pos, WS);
}
function parseRegex(str, pos, re) {
  let m2 = re.exec(str.slice(pos));
  return m2 ? m2[0].length : 0;
}
function parseRegexStr(str, pos, re) {
  let m2 = re.exec(str.slice(pos));
  return m2 ? m2[0] : null;
}
function parseFunctionDeclaration(str, startPos) {
  let pos = startPos, marks = [], namespace = "", name = "";
  if (str.substring(pos, pos + 2) !== "fn") return {
    type: "success",
    position: pos,
    marks
  };
  marks.push({
    name: "func_decl",
    position: startPos
  }), pos = skipWS(str, pos + 2);
  let identStart = pos;
  if (namespace = parseRegexStr(str, pos, IDENT), !namespace) return {
    type: "error",
    message: "Expected function name",
    position: pos
  };
  if (marks.push({
    name: "ident",
    position: identStart
  }, {
    name: "ident_end",
    position: pos + namespace.length
  }), pos = skipWS(str, pos + namespace.length), str.substring(pos, pos + 2) !== "::") return {
    type: "error",
    message: 'Expected "::" after namespace',
    position: pos
  };
  if (pos = skipWS(str, pos + 2), name = parseRegexStr(str, pos, IDENT), !name) return {
    type: "error",
    message: "Expected function name",
    position: pos
  };
  if (marks.push({
    name: "ident",
    position: pos
  }, {
    name: "ident_end",
    position: pos + name.length
  }), pos = skipWS(str, pos + name.length), str[pos] !== "(") return {
    type: "error",
    message: 'Expected "("',
    position: pos
  };
  for (pos = skipWS(str, pos + 1); pos < str.length && str[pos] !== ")"; ) {
    if (str[pos] !== "$") return {
      type: "error",
      message: 'Parameter should start with "$"',
      position: pos
    };
    let startPos2 = pos;
    pos++;
    let paramName = parseRegexStr(str, pos, IDENT);
    if (!paramName) return {
      type: "error",
      message: "Expected function name",
      position: pos
    };
    if (pos += paramName.length, marks.push({
      name: "param",
      position: startPos2
    }, {
      name: "ident",
      position: startPos2 + 1
    }, {
      name: "ident_end",
      position: pos
    }), pos = skipWS(str, pos), str[pos] === ",") pos = skipWS(str, pos + 1);
    else if (str[pos] !== ")") return {
      type: "error",
      message: 'Expected "," or ")"',
      position: pos
    };
  }
  if (str[pos] !== ")") return {
    type: "error",
    message: 'Expected ")"',
    position: pos
  };
  if (marks.push({
    name: "func_params_end",
    position: pos
  }), pos = skipWS(str, pos + 1), str[pos] !== "=") return {
    type: "error",
    message: 'Expected "="',
    position: pos
  };
  pos = skipWS(str, pos + 1);
  let bodyResult = parseExpr(str, pos, 0);
  return bodyResult.type === "error" ? bodyResult : (marks = marks.concat(bodyResult.marks), pos = skipWS(str, bodyResult.position), str[pos] === ";" ? (pos++, {
    type: "success",
    position: pos,
    marks,
    namespace,
    name
  }) : {
    type: "error",
    message: 'Expected ";" after function declaration',
    position: pos
  });
}
function join(a, b) {
  return (base) => b(a(base));
}
function map2(inner) {
  return (base) => ({
    type: "Map",
    base,
    expr: inner({ type: "This" })
  });
}
function flatMap(inner) {
  return (base) => ({
    type: "FlatMap",
    base,
    expr: inner({ type: "This" })
  });
}
function traverseArray(build, right) {
  if (!right) return {
    type: "a-a",
    build
  };
  switch (right.type) {
    case "a-a":
      return {
        type: "a-a",
        build: join(build, right.build)
      };
    case "a-b":
      return {
        type: "a-b",
        build: join(build, right.build)
      };
    case "b-b":
      return {
        type: "a-a",
        build: join(build, map2(right.build))
      };
    case "b-a":
      return {
        type: "a-a",
        build: join(build, flatMap(right.build))
      };
    default:
      throw Error(`unknown type: ${right.type}`);
  }
}
function traversePlain(mapper, right) {
  if (!right) return {
    type: "b-b",
    build: mapper
  };
  switch (right.type) {
    case "a-a":
    case "b-a":
      return {
        type: "b-a",
        build: join(mapper, right.build)
      };
    case "a-b":
    case "b-b":
      return {
        type: "b-b",
        build: join(mapper, right.build)
      };
    default:
      throw Error(`unknown type: ${right.type}`);
  }
}
function traverseElement(mapper, right) {
  if (!right) return {
    type: "a-b",
    build: mapper
  };
  switch (right.type) {
    case "a-a":
    case "b-a":
      return {
        type: "a-a",
        build: join(mapper, right.build)
      };
    case "a-b":
    case "b-b":
      return {
        type: "a-b",
        build: join(mapper, right.build)
      };
    default:
      throw Error(`unknown type: ${right.type}`);
  }
}
function traverseProjection(mapper, right) {
  if (!right) return {
    type: "b-b",
    build: mapper
  };
  switch (right.type) {
    case "a-a":
      return {
        type: "a-a",
        build: join(map2(mapper), right.build)
      };
    case "a-b":
      return {
        type: "a-b",
        build: join(map2(mapper), right.build)
      };
    case "b-a":
      return {
        type: "b-a",
        build: join(mapper, right.build)
      };
    case "b-b":
      return {
        type: "b-b",
        build: join(mapper, right.build)
      };
    default:
      throw Error(`unknown type: ${right.type}`);
  }
}
function walkValidateCustomFunction(node, functionParameters, level = 0) {
  switch (node.type) {
    case "Projection":
      return {
        ...node,
        base: walkValidateCustomFunction(node.base, functionParameters, level),
        expr: walkValidateCustomFunction(node.expr, functionParameters, level + 1)
      };
    case "Filter":
      return {
        ...node,
        base: walkValidateCustomFunction(node.base, functionParameters, level),
        expr: walkValidateCustomFunction(node.expr, functionParameters, level + 1)
      };
    case "Parent":
      if (level - node.n < 0) throw Error(`Invalid use of parent operator (^). No parent n ${node.n} at level ${level}.`);
      return node;
    case "Parameter":
      if (functionParameters.find((p2) => p2.name === node.name)) throw Error(`Function parameters are not allowed outside function declarations: ${node.name}`);
      return node;
    case "Array":
      return {
        ...node,
        elements: node.elements.map((el) => ({
          ...el,
          value: walkValidateCustomFunction(el.value, functionParameters, level)
        }))
      };
    case "PipeFuncCall":
      return {
        ...node,
        base: walkValidateCustomFunction(node.base, functionParameters, level),
        args: node.args.map((arg) => walkValidateCustomFunction(arg, functionParameters, level))
      };
    case "Object":
      return {
        ...node,
        attributes: node.attributes.map((attr) => {
          switch (attr.type) {
            case "ObjectAttributeValue":
              return {
                ...attr,
                value: walkValidateCustomFunction(attr.value, functionParameters, level)
              };
            case "ObjectConditionalSplat":
              return {
                ...attr,
                condition: walkValidateCustomFunction(attr.condition, functionParameters, level),
                value: walkValidateCustomFunction(attr.value, functionParameters, level)
              };
            case "ObjectSplat":
              return {
                ...attr,
                value: walkValidateCustomFunction(attr.value, functionParameters, level)
              };
            default:
              return attr;
          }
        })
      };
    case "FlatMap":
    case "Map":
      return {
        ...node,
        expr: walkValidateCustomFunction(node.expr, functionParameters, level),
        base: walkValidateCustomFunction(node.base, functionParameters, level)
      };
    case "FuncCall":
      return {
        ...node,
        args: node.args.map((arg) => walkValidateCustomFunction(arg, functionParameters, level))
      };
    case "Tuple":
      return {
        ...node,
        members: node.members.map((member) => walkValidateCustomFunction(member, functionParameters, level))
      };
    case "Select": {
      let alternatives = node.alternatives.map((alt) => ({
        ...alt,
        condition: walkValidateCustomFunction(alt.condition, functionParameters, level),
        value: walkValidateCustomFunction(alt.value, functionParameters, level)
      }));
      return node.fallback ? {
        ...node,
        alternatives,
        fallback: walkValidateCustomFunction(node.fallback, functionParameters, level)
      } : {
        ...node,
        alternatives
      };
    }
    case "SelectorNested":
      return {
        ...node,
        base: walkValidateCustomFunction(node.base, functionParameters, level),
        nested: walkValidateCustomFunction(node.nested, functionParameters, level)
      };
    case "SelectorFuncCall":
      return {
        ...node,
        arg: walkValidateCustomFunction(node.arg, functionParameters, level)
      };
    case "AccessAttribute":
    case "AccessElement":
    case "ArrayCoerce":
    case "Asc":
    case "Desc":
    case "Deref":
    case "Group":
    case "Neg":
    case "Not":
    case "Slice":
    case "Pos":
      return node.base ? {
        ...node,
        base: walkValidateCustomFunction(node.base, functionParameters, level)
      } : node;
    case "InRange":
      return {
        ...node,
        base: walkValidateCustomFunction(node.base, functionParameters, level),
        left: walkValidateCustomFunction(node.left, functionParameters, level),
        right: walkValidateCustomFunction(node.right, functionParameters, level)
      };
    case "OpCall":
    case "And":
    case "Or":
      return {
        ...node,
        left: walkValidateCustomFunction(node.left, functionParameters, level),
        right: walkValidateCustomFunction(node.right, functionParameters, level)
      };
    case "Parameter":
    case "Everything":
    case "This":
    case "Value":
    case "Context":
      return node;
    default:
      throw Error(`Handle all cases: ${node.type}`);
  }
}
var ESCAPE_SEQUENCE = {
  "'": "'",
  '"': '"',
  "\\": "\\",
  "/": "/",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "	"
};
function expandHex(str) {
  let charCode = parseInt(str, 16);
  return String.fromCharCode(charCode);
}
var GroqQueryError = class extends Error {
  name = "GroqQueryError";
};
function createExpressionBuilder(parseOptions, recursion = /* @__PURE__ */ new Set()) {
  let exprBuilder = {
    group(p2) {
      return {
        type: "Group",
        base: p2.process(exprBuilder)
      };
    },
    everything() {
      return { type: "Everything" };
    },
    this() {
      return { type: "This" };
    },
    parent() {
      return {
        type: "Parent",
        n: 1
      };
    },
    dblparent(p2) {
      return {
        type: "Parent",
        n: p2.process(exprBuilder).n + 1
      };
    },
    traverse(p2) {
      let base = p2.process(exprBuilder), traversalList = [];
      for (; p2.getMark().name !== "traversal_end"; ) traversalList.push(p2.process(TRAVERSE_BUILDER));
      p2.shift();
      let traversal = null;
      for (let i = traversalList.length - 1; i >= 0; i--) traversal = traversalList[i](traversal);
      if ((base.type === "Everything" || base.type === "Array" || base.type === "PipeFuncCall") && (traversal = traverseArray((val) => val, traversal)), traversal === null) throw Error("BUG: unexpected empty traversal");
      return traversal.build(base);
    },
    this_attr(p2) {
      let name = p2.processString();
      return name === "null" ? {
        type: "Value",
        value: null
      } : name === "true" ? {
        type: "Value",
        value: true
      } : name === "false" ? {
        type: "Value",
        value: false
      } : {
        type: "AccessAttribute",
        name
      };
    },
    neg(p2) {
      return {
        type: "Neg",
        base: p2.process(exprBuilder)
      };
    },
    pos(p2) {
      return {
        type: "Pos",
        base: p2.process(exprBuilder)
      };
    },
    add(p2) {
      return {
        type: "OpCall",
        op: "+",
        left: p2.process(exprBuilder),
        right: p2.process(exprBuilder)
      };
    },
    sub(p2) {
      return {
        type: "OpCall",
        op: "-",
        left: p2.process(exprBuilder),
        right: p2.process(exprBuilder)
      };
    },
    mul(p2) {
      return {
        type: "OpCall",
        op: "*",
        left: p2.process(exprBuilder),
        right: p2.process(exprBuilder)
      };
    },
    div(p2) {
      return {
        type: "OpCall",
        op: "/",
        left: p2.process(exprBuilder),
        right: p2.process(exprBuilder)
      };
    },
    mod(p2) {
      return {
        type: "OpCall",
        op: "%",
        left: p2.process(exprBuilder),
        right: p2.process(exprBuilder)
      };
    },
    pow(p2) {
      return {
        type: "OpCall",
        op: "**",
        left: p2.process(exprBuilder),
        right: p2.process(exprBuilder)
      };
    },
    comp(p2) {
      let left = p2.process(exprBuilder);
      return {
        type: "OpCall",
        op: p2.processString(),
        left,
        right: p2.process(exprBuilder)
      };
    },
    in_range(p2) {
      let base = p2.process(exprBuilder), isInclusive = p2.getMark().name === "inc_range";
      return p2.shift(), {
        type: "InRange",
        base,
        left: p2.process(exprBuilder),
        right: p2.process(exprBuilder),
        isInclusive
      };
    },
    str(p2) {
      let value = "";
      loop: for (; p2.hasMark(); ) {
        let mark = p2.getMark();
        switch (mark.name) {
          case "str_end":
            value += p2.processStringEnd();
            break loop;
          case "str_pause":
            value += p2.processStringEnd();
            break;
          case "str_start":
            p2.shift();
            break;
          case "single_escape": {
            let char = p2.slice(1);
            p2.shift(), value += ESCAPE_SEQUENCE[char];
            break;
          }
          case "unicode_hex":
            p2.shift(), value += expandHex(p2.processStringEnd());
            break;
          default:
            throw Error(`unexpected mark: ${mark.name}`);
        }
      }
      return {
        type: "Value",
        value
      };
    },
    integer(p2) {
      let strValue = p2.processStringEnd();
      return {
        type: "Value",
        value: Number(strValue)
      };
    },
    float(p2) {
      let strValue = p2.processStringEnd();
      return {
        type: "Value",
        value: Number(strValue)
      };
    },
    sci(p2) {
      let strValue = p2.processStringEnd();
      return {
        type: "Value",
        value: Number(strValue)
      };
    },
    object(p2) {
      let attributes = [];
      for (; p2.getMark().name !== "object_end"; ) attributes.push(p2.process(OBJECT_BUILDER));
      return p2.shift(), {
        type: "Object",
        attributes
      };
    },
    array(p2) {
      let elements = [];
      for (; p2.getMark().name !== "array_end"; ) {
        let isSplat = false;
        p2.getMark().name === "array_splat" && (isSplat = true, p2.shift());
        let value = p2.process(exprBuilder);
        elements.push({
          type: "ArrayElement",
          value,
          isSplat
        });
      }
      return p2.shift(), {
        type: "Array",
        elements
      };
    },
    tuple(p2) {
      let members = [];
      for (; p2.getMark().name !== "tuple_end"; ) members.push(p2.process(exprBuilder));
      return p2.shift(), {
        type: "Tuple",
        members
      };
    },
    func_call(p2) {
      let namespace = "global";
      p2.getMark().name === "namespace" && (p2.shift(), namespace = p2.processString());
      let name = p2.processString();
      if (namespace === "global" && name === "select") {
        let result = {
          type: "Select",
          alternatives: []
        };
        for (; p2.getMark().name !== "func_args_end"; ) if (p2.getMark().name === "pair") {
          if (result.fallback) throw new GroqQueryError("unexpected argument to select()");
          p2.shift();
          let condition = p2.process(exprBuilder), value = p2.process(exprBuilder);
          result.alternatives.push({
            type: "SelectAlternative",
            condition,
            value
          });
        } else {
          if (result.fallback) throw new GroqQueryError("unexpected argument to select()");
          result.fallback = p2.process(exprBuilder);
        }
        return p2.shift(), result;
      }
      let args = [];
      for (; p2.getMark().name !== "func_args_end"; ) argumentShouldBeSelector(namespace, name, args.length) ? args.push(p2.process(SELECTOR_BUILDER)) : args.push(p2.process(exprBuilder));
      if (p2.shift(), namespace === "global" && (name === "before" || name === "after") && p2.parseOptions.mode === "delta") return {
        type: "Context",
        key: name
      };
      if (namespace === "global" && name === "boost" && !p2.allowBoost) throw new GroqQueryError("unexpected boost");
      let customFunction = p2.customFunctions[`${namespace}::${name}`];
      if (customFunction !== void 0) {
        let FUNCTION_DECL_BUILDER = createFunctionDeclarationBuilder(parseOptions, recursion), funcDecl = new MarkProcessor(p2.string, customFunction.marks, p2.customFunctions, parseOptions).process(FUNCTION_DECL_BUILDER);
        return validateArity(name, funcDecl.params.length, args.length), mapCustomFunction(funcDecl.body, (body) => walkValidateCustomFunction(body, funcDecl.params), (parameterNode) => resolveFunctionParameter(parameterNode, funcDecl.params, args));
      }
      let funcs = namespaceRegistry[namespace];
      if (!funcs) throw new GroqQueryError(`Undefined namespace: ${namespace}`);
      let funcEntry = funcs[name];
      if (!funcEntry || (funcEntry.arity !== void 0 && validateArity(name, funcEntry.arity, args.length), funcEntry.mode !== void 0 && funcEntry.mode !== p2.parseOptions.mode)) throw new GroqQueryError(`Undefined function: ${name}`);
      return {
        type: "FuncCall",
        namespace,
        name,
        args
      };
    },
    pipecall(p2) {
      let base = p2.process(exprBuilder);
      p2.shift();
      let namespace = "global";
      if (p2.getMark().name === "namespace" && (p2.shift(), namespace = p2.processString()), namespace !== "global") throw new GroqQueryError(`Undefined namespace: ${namespace}`);
      let name = p2.processString(), args = [], oldAllowBoost = p2.allowBoost;
      for (name === "score" && (p2.allowBoost = true); ; ) {
        let markName = p2.getMark().name;
        if (markName === "func_args_end") break;
        if (name === "order") {
          if (markName === "asc") {
            p2.shift(), args.push({
              type: "Asc",
              base: p2.process(exprBuilder)
            });
            continue;
          } else if (markName === "desc") {
            p2.shift(), args.push({
              type: "Desc",
              base: p2.process(exprBuilder)
            });
            continue;
          }
        }
        args.push(p2.process(exprBuilder));
      }
      p2.shift(), p2.allowBoost = oldAllowBoost;
      let funcEntry = pipeFunctionRegistry[name];
      if (!funcEntry) throw new GroqQueryError(`Undefined pipe function: ${name}`);
      return funcEntry.arity && validateArity(name, funcEntry.arity, args.length), {
        type: "PipeFuncCall",
        base,
        name,
        args
      };
    },
    pair() {
      throw new GroqQueryError("unexpected =>");
    },
    and(p2) {
      return {
        type: "And",
        left: p2.process(exprBuilder),
        right: p2.process(exprBuilder)
      };
    },
    or(p2) {
      return {
        type: "Or",
        left: p2.process(exprBuilder),
        right: p2.process(exprBuilder)
      };
    },
    not(p2) {
      return {
        type: "Not",
        base: p2.process(exprBuilder)
      };
    },
    asc() {
      throw new GroqQueryError("unexpected asc");
    },
    desc() {
      throw new GroqQueryError("unexpected desc");
    },
    param(p2) {
      let name = p2.processString();
      return p2.parseOptions.params && p2.parseOptions.params.hasOwnProperty(name) ? {
        type: "Value",
        value: p2.parseOptions.params[name]
      } : {
        type: "Parameter",
        name
      };
    }
  }, OBJECT_BUILDER = {
    object_expr(p2) {
      if (p2.getMark().name === "pair") return p2.shift(), {
        type: "ObjectConditionalSplat",
        condition: p2.process(exprBuilder),
        value: p2.process(exprBuilder)
      };
      let value = p2.process(exprBuilder);
      return {
        type: "ObjectAttributeValue",
        name: extractPropertyKey(value),
        value
      };
    },
    object_pair(p2) {
      let name = p2.process(exprBuilder);
      if (name.type !== "Value") throw Error("name must be string");
      let value = p2.process(exprBuilder);
      return {
        type: "ObjectAttributeValue",
        name: name.value,
        value
      };
    },
    object_splat(p2) {
      return {
        type: "ObjectSplat",
        value: p2.process(exprBuilder)
      };
    },
    object_splat_this() {
      return {
        type: "ObjectSplat",
        value: { type: "This" }
      };
    }
  }, TRAVERSE_BUILDER = {
    square_bracket(p2) {
      let expr = p2.process(exprBuilder), value = tryConstantEvaluate(expr);
      return value && value.type === "number" ? (right) => traverseElement((base) => ({
        type: "AccessElement",
        base,
        index: value.data
      }), right) : value && value.type === "string" ? (right) => traversePlain((base) => ({
        type: "AccessAttribute",
        base,
        name: value.data
      }), right) : (right) => traverseArray((base) => ({
        type: "Filter",
        base,
        expr
      }), right);
    },
    slice(p2) {
      let isInclusive = p2.getMark().name === "inc_range";
      p2.shift();
      let left = p2.process(exprBuilder), right = p2.process(exprBuilder), leftValue = tryConstantEvaluate(left), rightValue = tryConstantEvaluate(right);
      if (!leftValue || !rightValue || leftValue.type !== "number" || rightValue.type !== "number") throw new GroqQueryError("slicing must use constant numbers");
      return (rhs) => traverseArray((base) => ({
        type: "Slice",
        base,
        left: leftValue.data,
        right: rightValue.data,
        isInclusive
      }), rhs);
    },
    projection(p2) {
      let obj = p2.process(exprBuilder);
      return (right) => traverseProjection((base) => ({
        type: "Projection",
        base,
        expr: obj
      }), right);
    },
    attr_access(p2) {
      let name = p2.processString();
      return (right) => traversePlain((base) => ({
        type: "AccessAttribute",
        base,
        name
      }), right);
    },
    deref(p2) {
      let attr = null;
      p2.getMark().name === "deref_attr" && (p2.shift(), attr = p2.processString());
      let wrap2 = (base) => attr ? {
        type: "AccessAttribute",
        base,
        name: attr
      } : base;
      return (right) => traversePlain((base) => wrap2({
        type: "Deref",
        base
      }), right);
    },
    array_postfix() {
      return (right) => traverseArray((base) => ({
        type: "ArrayCoerce",
        base
      }), right);
    }
  }, SELECTOR_BUILDER = {
    group(p2) {
      return p2.process(SELECTOR_BUILDER);
    },
    everything() {
      throw Error("Invalid selector syntax");
    },
    this() {
      throw Error("Invalid selector syntax");
    },
    parent() {
      throw Error("Invalid selector syntax");
    },
    dblparent() {
      throw Error("Invalid selector syntax");
    },
    traverse(p2) {
      let node = p2.process(SELECTOR_BUILDER);
      for (; p2.getMark().name !== "traversal_end"; ) if (p2.getMark().name === "array_postfix") p2.shift(), node = {
        type: "ArrayCoerce",
        base: node
      };
      else if (p2.getMark().name === "square_bracket") {
        p2.shift();
        let expr = p2.process(exprBuilder), value = tryConstantEvaluate(expr);
        if (value && value.type === "number") throw Error("Invalid array access expression");
        node = value && value.type === "string" ? {
          type: "AccessAttribute",
          base: node,
          name: value.data
        } : {
          type: "Filter",
          base: node,
          expr
        };
      } else if (p2.getMark().name === "attr_access") {
        p2.shift();
        let name = p2.processString();
        node = {
          type: "AccessAttribute",
          base: node,
          name
        };
      } else if (p2.getMark().name === "tuple" || p2.getMark().name === "group") {
        let selector = p2.process(SELECTOR_BUILDER);
        if (!isSelectorNested$1(selector)) throw Error(`Unexpected result parsing nested selector: ${selector.type}`);
        node = {
          type: "SelectorNested",
          base: node,
          nested: selector
        };
      } else throw Error("Invalid selector syntax");
      return p2.shift(), node;
    },
    this_attr(p2) {
      return {
        type: "AccessAttribute",
        name: p2.processString()
      };
    },
    attr_access() {
      throw Error("Invalid selector syntax");
    },
    neg() {
      throw Error("Invalid selector syntax");
    },
    pos() {
      throw Error("Invalid selector syntax");
    },
    add() {
      throw Error("Invalid selector syntax");
    },
    sub() {
      throw Error("Invalid selector syntax");
    },
    mul() {
      throw Error("Invalid selector syntax");
    },
    div() {
      throw Error("Invalid selector syntax");
    },
    mod() {
      throw Error("Invalid selector syntax");
    },
    pow() {
      throw Error("Invalid selector syntax");
    },
    comp() {
      throw Error("Invalid selector syntax");
    },
    in_range() {
      throw Error("Invalid selector syntax");
    },
    str() {
      throw Error("Invalid selector syntax");
    },
    integer() {
      throw Error("Invalid selector syntax");
    },
    float() {
      throw Error("Invalid selector syntax");
    },
    sci() {
      throw Error("Invalid selector syntax");
    },
    object() {
      throw Error("Invalid selector syntax");
    },
    array() {
      throw Error("Invalid selector syntax");
    },
    tuple(p2) {
      let selectors = [];
      for (; p2.getMark().name !== "tuple_end"; ) selectors.push(p2.process(SELECTOR_BUILDER));
      return p2.shift(), {
        type: "Tuple",
        members: selectors
      };
    },
    func_call(p2, mark) {
      let func = exprBuilder.func_call(p2, mark);
      if (func.name === "anywhere" && func.args.length === 1) return {
        type: "SelectorFuncCall",
        name: "anywhere",
        arg: func.args[0]
      };
      throw Error("Invalid selector syntax");
    },
    pipecall() {
      throw Error("Invalid selector syntax");
    },
    pair() {
      throw Error("Invalid selector syntax");
    },
    and() {
      throw Error("Invalid selector syntax");
    },
    or() {
      throw Error("Invalid selector syntax");
    },
    not() {
      throw Error("Invalid selector syntax");
    },
    asc() {
      throw Error("Invalid selector syntax");
    },
    desc() {
      throw Error("Invalid selector syntax");
    },
    param() {
      throw Error("Invalid selector syntax");
    }
  };
  return exprBuilder;
}
function extractPropertyKey(node) {
  if (node.type === "AccessAttribute" && !node.base) return node.name;
  if (node.type === "PipeFuncCall" || node.type === "Deref" || node.type === "Map" || node.type === "FlatMap" || node.type === "Projection" || node.type === "Slice" || node.type === "Filter" || node.type === "AccessElement" || node.type === "ArrayCoerce" || node.type === "Group") return extractPropertyKey(node.base);
  throw new GroqQueryError(`Cannot determine property key for type: ${node.type}`);
}
function validateArity(name, arity, count) {
  if (typeof arity == "number") {
    if (count !== arity) throw new GroqQueryError(`Incorrect number of arguments to function ${name}(). Expected ${arity}, got ${count}.`);
  } else if (arity && !arity(count)) throw new GroqQueryError(`Incorrect number of arguments to function ${name}().`);
}
function resolveFunctionParameter(parameter, params, args) {
  if (parameter.type !== "Parameter") throw new GroqQueryError(`Expected parameter node, got ${parameter.type}`);
  let index2 = params.findIndex((p2) => p2.name === parameter.name);
  if (index2 === -1) throw new GroqQueryError(`Missing argument for parameter ${parameter.name} in function call`);
  return args[index2];
}
function mapCustomFunction(body, bodyMapper, parameterMapper = (n) => n) {
  if (body.type === "Projection") {
    if (body.base.type === "Parameter") return {
      type: "Projection",
      base: parameterMapper(body.base),
      expr: bodyMapper(body.expr)
    };
    if (body.base.type === "Deref" && body.base.base.type === "Parameter") return {
      type: "Projection",
      base: {
        type: "Deref",
        base: parameterMapper(body.base.base)
      },
      expr: bodyMapper(body.expr)
    };
  }
  if (body.type === "Map" && body.base.type === "ArrayCoerce" && body.base.base.type === "Parameter") return {
    type: "Map",
    base: {
      type: "ArrayCoerce",
      base: parameterMapper(body.base.base)
    },
    expr: bodyMapper(body.expr)
  };
  throw new GroqQueryError(`Unexpected function body, must be a projection. Got "${body.type}"`);
}
function argumentShouldBeSelector(namespace, functionName, argCount) {
  return namespace == "diff" && argCount == 2 && ["changedAny", "changedOnly"].includes(functionName);
}
var GroqSyntaxError = class extends Error {
  /**
  * 0-based UTF-16 code unit offset from the start of the query string.
  */
  position;
  /**
  * 1-based line number where the error occurred.
  */
  line;
  /**
  * 1-based column number within the line, in UTF-16 code units.
  */
  column;
  name = "GroqSyntaxError";
  constructor(position, query2, detail) {
    super(`Syntax error in GROQ query at position ${position}${detail ? `: ${detail}` : ""}`), this.position = position;
    let line = 1, lineStart = 0;
    for (let i = 0; i < position && i < query2.length; i++) query2[i] === "\n" && (line++, lineStart = i + 1);
    this.line = line, this.column = position - lineStart + 1;
  }
};
function parse6(input, options = {}) {
  let result = parse$1(input);
  if (result.type === "error") throw new GroqSyntaxError(result.position, input, result.message);
  validateCustomFunctions(input, result.customFunctions, options);
  let processor = new MarkProcessor(input, result.marks, result.customFunctions, options), exprBuilder = createExpressionBuilder(options);
  return processor.process(exprBuilder);
}
function createFunctionDeclarationBuilder(parseOptions, recursion = /* @__PURE__ */ new Set()) {
  return { func_decl(p2) {
    let namespace = p2.processString(), name = p2.processString(), functionId = `${namespace}::${name}`;
    if (recursion.has(functionId)) throw new GroqQueryError(`Recursive function definition detected for ${functionId}`);
    let exprBuilder = createExpressionBuilder(parseOptions, /* @__PURE__ */ new Set([...recursion, functionId])), params = [];
    for (; p2.getMark().name !== "func_params_end"; ) {
      let param = p2.process(exprBuilder);
      if (param.type !== "Parameter") throw Error("expected parameter");
      params.push(param);
    }
    if (params.length !== 1) throw new GroqQueryError("Custom functions can only have one parameter");
    return p2.shift(), {
      type: "FuncDeclaration",
      namespace,
      name,
      params,
      body: p2.process(exprBuilder)
    };
  } };
}
function validateCustomFunctions(query2, customFunctions, parseOptions) {
  for (let functionId in customFunctions) {
    if (!customFunctions.hasOwnProperty(functionId)) continue;
    let customFunction = customFunctions[functionId], processor = new MarkProcessor(query2, customFunction.marks, customFunctions, parseOptions), FUNCTION_DECL_BUILDER = createFunctionDeclarationBuilder(parseOptions), funcDecl = processor.process(FUNCTION_DECL_BUILDER);
    mapCustomFunction(funcDecl.body, (body) => walkValidateCustomFunction(body, funcDecl.params));
  }
}
var { compare } = new Intl.Collator("en");
var STRING_TYPE_DATETIME = Symbol("groq-js.type.string_datetime");
var $trace = createDebug2("typeEvaluator:evaluate:trace", { log: console.log.bind(console) });
var $debug = createDebug2("typeEvaluator:evaluate:debug", { log: console.log.bind(console) });
var $warn = createDebug2("typeEvaluator:evaluate:warn");
var OVERRIDE_TYPE_SYMBOL = Symbol("groq-js.type");

// ../../node_modules/.pnpm/@sanity+diff-patch@6.0.0/node_modules/@sanity/diff-patch/dist/index.js
var IS_DOTTABLE_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;
function pathToString(path) {
  return path.reduce((target, segment, i) => {
    if (Array.isArray(segment))
      return `${target}[${segment.join(":")}]`;
    if (isKeyedObject3(segment))
      return `${target}[_key=="${segment._key}"]`;
    if (typeof segment == "number")
      return `${target}[${segment}]`;
    if (typeof segment == "string" && !IS_DOTTABLE_RE.test(segment))
      return `${target}['${segment}']`;
    if (typeof segment == "string")
      return `${target}${i === 0 ? "" : "."}${segment}`;
    throw new Error(`Unsupported path segment "${segment}"`);
  }, "");
}
function isKeyedObject3(obj) {
  return typeof obj == "object" && !!obj && "_key" in obj && typeof obj._key == "string";
}
var DiffError = class extends Error {
  path;
  value;
  serializedPath;
  constructor(message, path, value) {
    const serializedPath = pathToString(path);
    super(`${message} (at '${serializedPath}')`), this.path = path, this.serializedPath = serializedPath, this.value = value;
  }
};
var idPattern = /^[a-z0-9][a-z0-9_.-]+$/i;
var propPattern = /^[a-zA-Z_][a-zA-Z0-9_-]*$/;
var propStartPattern = /^[a-z_]/i;
function validateProperty(property, value, path) {
  if (!propStartPattern.test(property))
    throw new DiffError("Keys must start with a letter (a-z)", path.concat(property), value);
  if (!propPattern.test(property))
    throw new DiffError(
      "Keys can only contain letters, numbers and underscores",
      path.concat(property),
      value
    );
  if (property === "_key" || property === "_ref" || property === "_type") {
    if (typeof value != "string")
      throw new DiffError("Keys must be strings", path.concat(property), value);
    if (!idPattern.test(value))
      throw new DiffError("Invalid key - use less exotic characters", path.concat(property), value);
  }
  return property;
}
function difference(source, target) {
  if ("difference" in Set.prototype)
    return source.difference(target);
  const result = /* @__PURE__ */ new Set();
  for (const item of source)
    target.has(item) || result.add(item);
  return result;
}
function intersection(source, target) {
  if ("intersection" in Set.prototype)
    return source.intersection(target);
  const result = /* @__PURE__ */ new Set();
  for (const item of source)
    target.has(item) && result.add(item);
  return result;
}
var SYSTEM_KEYS = ["_id", "_type", "_createdAt", "_updatedAt", "_rev"];
var DMP_MAX_STRING_SIZE = 1e6;
var DMP_MAX_STRING_LENGTH_CHANGE_RATIO = 0.4;
var DMP_MIN_SIZE_FOR_RATIO_CHECK = 1e4;
function diffValue(source, target, basePath = []) {
  return serializePatches(diffItem(source, target, basePath));
}
function diffItem(source, target, path = [], patches = []) {
  return source === target ? patches : typeof source == "string" && typeof target == "string" ? (diffString(source, target, path, patches), patches) : Array.isArray(source) && Array.isArray(target) ? (diffArray(source, target, path, patches), patches) : isRecord3(source) && isRecord3(target) ? (diffObject(source, target, path, patches), patches) : target === void 0 ? (patches.push({ op: "unset", path }), patches) : (patches.push({ op: "set", path, value: target }), patches);
}
function diffObject(source, target, path, patches) {
  const atRoot = path.length === 0, aKeys = Object.keys(source).filter(atRoot ? isNotIgnoredKey : yes).map((key) => validateProperty(key, source[key], path)), aKeysLength = aKeys.length, bKeys = Object.keys(target).filter(atRoot ? isNotIgnoredKey : yes).map((key) => validateProperty(key, target[key], path)), bKeysLength = bKeys.length;
  for (let i = 0; i < aKeysLength; i++) {
    const key = aKeys[i];
    key in target || patches.push({ op: "unset", path: path.concat(key) });
  }
  for (let i = 0; i < bKeysLength; i++) {
    const key = bKeys[i];
    diffItem(source[key], target[key], path.concat([key]), patches);
  }
  return patches;
}
function diffArray(source, target, path, patches) {
  return isUniquelyKeyed(source) && isUniquelyKeyed(target) ? diffArrayByKey(source, target, path, patches) : diffArrayByIndex(source, target, path, patches);
}
function diffArrayByIndex(source, target, path, patches) {
  if (target.length > source.length && patches.push({
    op: "insert",
    position: "after",
    path: path.concat([-1]),
    items: target.slice(source.length).map(nullifyUndefined)
  }), target.length < source.length) {
    const isSingle = source.length - target.length === 1, unsetItems = source.slice(target.length);
    isUniquelyKeyed(unsetItems) ? patches.push(
      ...unsetItems.map(
        (item) => ({ op: "unset", path: path.concat({ _key: item._key }) })
      )
    ) : patches.push({
      op: "unset",
      path: path.concat([isSingle ? target.length : [target.length, ""]])
    });
  }
  for (let i = 0; i < target.length; i++)
    if (Array.isArray(target[i]))
      throw new DiffError("Multi-dimensional arrays not supported", path.concat(i), target[i]);
  const overlapping = Math.min(source.length, target.length), segmentA = source.slice(0, overlapping), segmentB = target.slice(0, overlapping);
  for (let i = 0; i < segmentA.length; i++)
    diffItem(segmentA[i], nullifyUndefined(segmentB[i]), path.concat(i), patches);
  return patches;
}
function diffArrayByKey(source, target, path, patches) {
  const sourceItemsByKey = new Map(source.map((item) => [item._key, item])), targetItemsByKey = new Map(target.map((item) => [item._key, item])), sourceKeys = new Set(sourceItemsByKey.keys()), targetKeys = new Set(targetItemsByKey.keys()), keysRemovedFromSource = difference(sourceKeys, targetKeys), keysAddedToTarget = difference(targetKeys, sourceKeys), keysInBothArrays = intersection(sourceKeys, targetKeys), sourceKeysStillPresent = Array.from(difference(sourceKeys, keysRemovedFromSource)), targetKeysAlreadyPresent = Array.from(difference(targetKeys, keysAddedToTarget)), keyReorderOperations = [];
  for (let i = 0; i < keysInBothArrays.size; i++) {
    const keyAtPositionInSource = sourceKeysStillPresent[i], keyAtPositionInTarget = targetKeysAlreadyPresent[i];
    keyAtPositionInSource !== keyAtPositionInTarget && keyReorderOperations.push({
      sourceKey: keyAtPositionInSource,
      targetKey: keyAtPositionInTarget
    });
  }
  keyReorderOperations.length && patches.push({
    op: "reorder",
    path,
    snapshot: source,
    reorders: keyReorderOperations
  });
  for (const key of keysInBothArrays)
    diffItem(sourceItemsByKey.get(key), targetItemsByKey.get(key), [...path, { _key: key }], patches);
  for (const keyToRemove of keysRemovedFromSource)
    patches.push({ op: "unset", path: [...path, { _key: keyToRemove }] });
  if (keysAddedToTarget.size) {
    let insertionAnchorKey, itemsPendingInsertion = [];
    const flushPendingInsertions = () => {
      itemsPendingInsertion.length && patches.push({
        op: "insert",
        // Insert after the anchor key if we have one, otherwise insert at the beginning
        ...insertionAnchorKey ? { position: "after", path: [...path, { _key: insertionAnchorKey }] } : { position: "before", path: [...path, 0] },
        items: itemsPendingInsertion
      });
    };
    for (const key of targetKeys)
      keysAddedToTarget.has(key) ? itemsPendingInsertion.push(targetItemsByKey.get(key)) : keysInBothArrays.has(key) && (flushPendingInsertions(), insertionAnchorKey = key, itemsPendingInsertion = []);
    flushPendingInsertions();
  }
  return patches;
}
function shouldUseDiffMatchPatch(source, target) {
  const maxLength = Math.max(source.length, target.length);
  return maxLength > DMP_MAX_STRING_SIZE ? false : maxLength < DMP_MIN_SIZE_FOR_RATIO_CHECK ? true : !(Math.abs(target.length - source.length) / maxLength > DMP_MAX_STRING_LENGTH_CHANGE_RATIO);
}
function getDiffMatchPatch(source, target, path) {
  const last = path.at(-1);
  if (!(typeof last == "string" && last.startsWith("_")) && shouldUseDiffMatchPatch(source, target))
    try {
      const strPatch = stringify2(make2(source, target));
      return { op: "diffMatchPatch", path, value: strPatch };
    } catch {
      return;
    }
}
function diffString(source, target, path, patches) {
  const dmp = getDiffMatchPatch(source, target, path);
  return patches.push(dmp ?? { op: "set", path, value: target }), patches;
}
function isNotIgnoredKey(key) {
  return SYSTEM_KEYS.indexOf(key) === -1;
}
function serializePatches(patches, curr) {
  const [patch, ...rest] = patches;
  if (!patch) return curr ? [curr] : [];
  switch (patch.op) {
    case "set":
    case "diffMatchPatch": {
      const emptyOp = { [patch.op]: {} };
      return curr ? patch.op in curr ? (Object.assign(curr[patch.op], { [pathToString(patch.path)]: patch.value }), serializePatches(rest, curr)) : [curr, ...serializePatches(patches, emptyOp)] : serializePatches(patches, emptyOp);
    }
    case "unset": {
      const emptyOp = { unset: [] };
      return curr ? "unset" in curr ? (curr.unset.push(pathToString(patch.path)), serializePatches(rest, curr)) : [curr, ...serializePatches(patches, emptyOp)] : serializePatches(patches, emptyOp);
    }
    case "insert":
      return curr ? [curr, ...serializePatches(patches)] : [
        {
          insert: {
            [patch.position]: pathToString(patch.path),
            items: patch.items
          }
        },
        ...serializePatches(rest)
      ];
    case "reorder": {
      if (curr) return [curr, ...serializePatches(patches)];
      const tempKeyOperations = {};
      tempKeyOperations.set = {};
      for (const { sourceKey, targetKey } of patch.reorders) {
        const temporaryKey = `__temp_reorder_${sourceKey}__`, finalContentForThisPosition = patch.snapshot[getIndexForKey2(patch.snapshot, targetKey)];
        Object.assign(tempKeyOperations.set, {
          [pathToString([...patch.path, { _key: sourceKey }])]: {
            ...finalContentForThisPosition,
            _key: temporaryKey
          }
        });
      }
      const finalKeyOperations = {};
      finalKeyOperations.set = {};
      for (const { sourceKey, targetKey } of patch.reorders) {
        const temporaryKey = `__temp_reorder_${sourceKey}__`;
        Object.assign(finalKeyOperations.set, {
          [pathToString([...patch.path, { _key: temporaryKey }, "_key"])]: targetKey
        });
      }
      return [tempKeyOperations, finalKeyOperations, ...serializePatches(rest)];
    }
    default:
      return [];
  }
}
function isUniquelyKeyed(arr) {
  const seenKeys = /* @__PURE__ */ new Set();
  for (const item of arr) {
    if (!isKeyedObject3(item) || seenKeys.has(item._key)) return false;
    seenKeys.add(item._key);
  }
  return true;
}
var keyToIndexCache = /* @__PURE__ */ new WeakMap();
function getIndexForKey2(keyedArray, targetKey) {
  const cachedMapping = keyToIndexCache.get(keyedArray);
  if (cachedMapping) return cachedMapping[targetKey];
  const keyToIndexMapping = keyedArray.reduce(
    (mapping, { _key }, arrayIndex) => (mapping[_key] = arrayIndex, mapping),
    {}
  );
  return keyToIndexCache.set(keyedArray, keyToIndexMapping), keyToIndexMapping[targetKey];
}
function isRecord3(value) {
  return typeof value == "object" && !!value && !Array.isArray(value);
}
function nullifyUndefined(item) {
  return item === void 0 ? null : item;
}
function yes(_) {
  return true;
}

// ../../node_modules/.pnpm/@sanity+message-protocol@0.24.0/node_modules/@sanity/message-protocol/dist/index.js
var SDK_CHANNEL_NAME = "dashboard/channels/sdk";
var SDK_NODE_NAME = "dashboard/nodes/sdk";

// ../../node_modules/.pnpm/@sanity+bifur-client@1.0.0/node_modules/@sanity/bifur-client/dist/index.js
var defaultGetNextRequestId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-",
  20
);
var HEARTBEAT = "♥";
function formatRequest(method, params, id2) {
  return JSON.stringify({
    jsonrpc: "2.0",
    method,
    params: addApiVersion(params, "v1"),
    id: id2
  });
}
function tryParse(input) {
  try {
    return [null, JSON.parse(input)];
  } catch (error2) {
    return error2 instanceof Error ? [error2] : [new Error(`${error2}`)];
  }
}
function addApiVersion(params, v) {
  return { ...params, apiVersion: v };
}
var createClient = (connection$, options = {}) => {
  const { token$, getNextRequestId = defaultGetNextRequestId } = options, [heartbeats$, responses$] = partition(
    connection$.pipe(
      switchMap((connection) => fromEvent(connection, "message"))
    ),
    (event) => event.data === HEARTBEAT
  ), parsedResponses$ = responses$.pipe(
    mergeMap((response) => {
      const [err, msg] = tryParse(response.data);
      return err ? (console.warn("Unable to parse message: %s", err.message), EMPTY) : !msg || !msg.jsonrpc ? (console.warn("Received empty or non-jsonrpc message: %s", msg), EMPTY) : of(msg);
    }),
    share()
  ), authedConnection$ = token$ ? combineLatest([token$, connection$]).pipe(
    distinctUntilChanged(
      ([oldToken, oldSocket], [newToken, newSocket]) => oldToken === newToken && oldSocket === newSocket
    ),
    switchMap(
      ([token, ws]) => token ? call(ws, "authorization", {
        authorization: `Bearer ${token}`
      }).pipe(
        take(1),
        map(() => ws)
      ) : of(ws)
    ),
    shareReplay({ refCount: true, bufferSize: 1 })
  ) : connection$;
  function call(ws, method, params = {}) {
    const requestId = getNextRequestId();
    return merge(
      parsedResponses$.pipe(
        filter((rpcResult) => rpcResult.id === requestId),
        map((rpcResult) => rpcResult.result)
      ),
      defer(() => (ws.send(formatRequest(method, params, requestId)), EMPTY))
    );
  }
  function requestMethod(method, params) {
    return authedConnection$.pipe(
      take(1),
      mergeMap((ws) => call(ws, method, params).pipe(take(1)))
    );
  }
  function requestSubscribe(method, params) {
    return authedConnection$.pipe(
      take(1),
      mergeMap(
        (ws) => call(ws, `${method}_subscribe`, params).pipe(
          take(1),
          mergeMap(
            (subscriptionId) => parsedResponses$.pipe(
              filter(
                (message) => message.method === `${method}_subscription` && message.params.subscription === subscriptionId
              ),
              map((message) => message.params.result),
              finalize(() => {
                ws.readyState !== ws.CLOSED && ws.readyState !== ws.CLOSING && ws.send(
                  formatRequest(
                    `${method}_unsubscribe`,
                    { subscriptionId },
                    getNextRequestId()
                  )
                );
              })
            )
          )
        )
      )
    );
  }
  return {
    // heartbeat$ is a stream of date objects representing when the "last message was received"
    // it will keep the connection open until it is unsubscribed and can therefore be used to keep connection alive
    // between requests
    heartbeats: merge(authedConnection$, heartbeats$, responses$).pipe(
      map(() => /* @__PURE__ */ new Date())
    ),
    listen: (method, params) => requestSubscribe(method, params),
    request: (method, params) => requestMethod(method, params)
  };
};
var WebSocketError = class extends Error {
  type;
  code;
  reason;
  constructor(message, type, code, reason) {
    super(message), this.type = type, this.code = code, this.reason = reason;
  }
};
function createConnect(getWebsocketInstance) {
  return (url) => new Observable((subscriber) => {
    const ws = getWebsocketInstance(url);
    let didUnsubscribe = false;
    const onOpen = () => {
      subscriber.next(ws);
    }, onError = () => {
      subscriber.error(
        new WebSocketError("WebSocket connection error", "CONNECTION_ERROR")
      );
    }, onClose = (ev) => {
      didUnsubscribe ? subscriber.complete() : subscriber.error(
        new WebSocketError(
          "WebSocket connection error",
          "CONNECTION_CLOSED",
          ev.code,
          ev.reason
        )
      );
    };
    return ws.onopen = onOpen, ws.onclose = onClose, ws.onerror = onError, () => {
      didUnsubscribe = true, ws.close(1e3, "WebSockets connection closed by client");
    };
  });
}
var timeoutFirstWith = (due, withObservable) => (input$) => race(input$, timer(due).pipe(mergeMap(() => withObservable)));
var id = (arg) => arg;
function fromUrl(url, options = {}) {
  const { timeout, token$ } = options, ourGlobal = globalThis, connect = createConnect(
    (url2, protocols) => new globalThis.WebSocket(url2, protocols)
  );
  return createClient(
    connect(url).pipe(
      timeout ? timeoutFirstWith(
        timeout,
        throwError(
          () => new Error(
            `Timeout after ${timeout} while establishing WebSockets connection`
          )
        )
      ) : id,
      shareReplay({ refCount: true }),
      takeUntil(
        // ensure graceful disconnect in browsers
        isEventTargetLike(ourGlobal) ? fromEvent(ourGlobal, "beforeunload") : NEVER
      )
    ),
    { token$ }
  );
}
function isEventTargetLike(thing) {
  return typeof thing == "object" && thing !== null && "addEventListener" in thing && typeof thing.addEventListener == "function" && "removeEventListener" in thing && typeof thing.removeEventListener == "function";
}

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/index.js
function createSanityInstance(config = {}) {
  let instanceId = randomId(16), disposeListeners = /* @__PURE__ */ new Map(), disposed = { current: false }, instanceContext = {
    instanceId,
    projectId: config.projectId,
    dataset: config.dataset
  }, logger3 = createLogger("sdk", { instanceContext });
  return logger3.info("Sanity instance created", {
    hasProjectId: !!config.projectId,
    hasDataset: !!config.dataset,
    hasAuth: !!config.auth,
    hasPerspective: !!config.perspective
  }), logger3.debug("Instance configuration", {
    projectId: config.projectId,
    dataset: config.dataset,
    perspective: config.perspective,
    hasStudioConfig: !!config.studio,
    hasStudioTokenSource: !!config.studio?.auth?.token,
    hasAuthProviders: !!config.auth?.providers,
    hasAuthToken: !!config.auth?.token
  }), {
    instanceId,
    config,
    isDisposed: () => disposed.current,
    dispose: () => {
      if (disposed.current) {
        logger3.trace("Dispose called on already disposed instance", { internal: true });
        return;
      }
      logger3.trace("Disposing instance", {
        internal: true,
        listenerCount: disposeListeners.size
      }), disposed.current = true, disposeListeners.forEach((listener) => listener()), disposeListeners.clear(), logger3.info("Instance disposed");
    },
    onDispose: (cb) => {
      let listenerId = randomId(16);
      return disposeListeners.set(listenerId, cb), () => {
        disposeListeners.delete(listenerId);
      };
    }
  };
}
var checkPermissions = defineFetcher({
  name: "checkPermissions",
  getKey: (_instance, resourceType, resourceId, permissions) => `${resourceType}:${resourceId}:${[...permissions].sort().join(",")}`,
  fetch: (instance) => (resourceType, resourceId, permissions) => getClientState(instance, {
    apiVersion: "v2025-07-11",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: `/access/${resourceType}/${resourceId}/user-permissions/me/check`,
    query: { permissions },
    tag: "access.check"
  }).pipe(map((response) => response.data)))),
  tags: (_data, resourceType, resourceId) => [{
    type: "access",
    id: `${resourceType}:${resourceId}`
  }]
});
function buildQuery(params) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== void 0).map(([key, value]) => [key, Array.isArray(value) ? value : String(value)]));
}
function serializeInclude$1(include) {
  return include?.length ? [...include].sort().join(",") : void 0;
}
var applications = defineFetcher({
  name: "applications",
  getKey: (_instance, options) => [
    options.organizationId,
    options.type ?? "",
    serializeInclude$1(options.include) ?? "",
    options.limit ?? "",
    options.cursor ?? ""
  ].join(":"),
  fetch: (instance) => (options) => getClientState(instance, {
    apiVersion: "vX",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: "/applications",
    query: buildQuery({
      organizationId: options.organizationId,
      type: options.type,
      include: serializeInclude$1(options.include),
      limit: options.limit,
      cursor: options.cursor
    }),
    tag: "applications.list"
  }))),
  tags: (data) => [{
    type: "application",
    id: "LIST"
  }, ...data.data.map((app) => ({
    type: "application",
    id: app.id
  }))]
});
var application = defineFetcher({
  name: "application",
  getKey: (_instance, applicationId, options) => `${applicationId}:${serializeInclude$1(options?.include) ?? ""}`,
  fetch: (instance) => (applicationId, options) => getClientState(instance, {
    apiVersion: "vX",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: `/applications/${applicationId}`,
    query: buildQuery({ include: serializeInclude$1(options?.include) }),
    tag: "applications.get"
  }))),
  tags: (data) => [{
    type: "application",
    id: data.id
  }]
});
var updateApplication = defineMutation({
  name: "updateApplication",
  mutationFn: (instance) => ({ applicationId, ...body }) => getClientState(instance, {
    apiVersion: "vX",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: `/applications/${applicationId}`,
    method: "PATCH",
    body,
    tag: "applications.update"
  }))),
  invalidates: (_result, { applicationId }) => [{
    type: "application",
    id: "LIST"
  }, {
    type: "application",
    id: applicationId
  }]
});
var deleteApplication = defineMutation({
  name: "deleteApplication",
  mutationFn: (instance) => ({ applicationId }) => getClientState(instance, {
    apiVersion: "vX",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: `/applications/${applicationId}`,
    method: "DELETE",
    tag: "applications.delete"
  }))),
  invalidates: (_result, { applicationId }) => [{
    type: "application",
    id: "LIST"
  }, {
    type: "application",
    id: applicationId
  }]
});
function compareProjectOrganization(projectId, projectOrganizationId, currentDashboardOrgId) {
  return projectOrganizationId === currentDashboardOrgId ? { error: null } : { error: `Project ${projectId} belongs to Organization ${projectOrganizationId ?? "unknown"}, but the Dashboard has Organization ${currentDashboardOrgId} selected` };
}
function normalizeProjectsOptions(options) {
  return {
    organizationId: options?.organizationId,
    includeMembers: options?.includeMembers ?? false,
    includeFeatures: options?.includeFeatures ?? true,
    onlyExplicitMembership: options?.onlyExplicitMembership ?? false
  };
}
function getProjectsCacheKey(_instance, options) {
  let { organizationId, includeMembers, includeFeatures, onlyExplicitMembership } = normalizeProjectsOptions(options);
  return `projects${organizationId ? `:org:${organizationId}` : ""}${includeMembers ? ":members" : ""}${includeFeatures ? ":features" : ""}${onlyExplicitMembership ? ":explicit" : ""}`;
}
var projects = defineFetcher({
  name: "projects",
  getKey: getProjectsCacheKey,
  fetch: (instance) => (options) => getClientState(instance, {
    apiVersion: "v2025-02-19",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: "/projects",
    query: buildQuery(normalizeProjectsOptions(options)),
    tag: "projects.list"
  }))),
  tags: (data) => [{
    type: "project",
    id: "LIST"
  }, ...data.map((project2) => ({
    type: "project",
    id: project2.id
  }))]
});
function normalizeProjectOptions(options) {
  return {
    includeMembers: options?.includeMembers ?? true,
    includeFeatures: options?.includeFeatures ?? true
  };
}
function resolveProjectId$1(instance, options) {
  let projectId = options?.projectId ?? instance.config.projectId;
  if (!projectId) throw Error("A projectId is required to use the project API.");
  return projectId;
}
function getProjectCacheKey(instance, options) {
  let projectId = resolveProjectId$1(instance, options), { includeMembers, includeFeatures } = normalizeProjectOptions(options);
  return `project:${projectId}${includeMembers ? ":members" : ""}${includeFeatures ? ":features" : ""}`;
}
var project = defineFetcher({
  name: "project",
  getKey: getProjectCacheKey,
  fetch: (instance) => (options) => getClientState(instance, {
    apiVersion: "v2025-02-19",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: `/projects/${resolveProjectId$1(instance, options)}`,
    query: buildQuery(normalizeProjectOptions(options)),
    tag: "projects.get"
  }))),
  tags: (data) => [{
    type: "project",
    id: data.id
  }],
  initialData: (instance, options) => {
    if (normalizeProjectOptions(options).includeMembers) return;
    let snapshot = projects.getState(instance).getCurrent();
    if (snapshot.status !== "success") return;
    let projectId = resolveProjectId$1(instance, options), match2 = snapshot.data.find((item) => item.id === projectId);
    return match2 && {
      data: match2,
      dataUpdatedAt: snapshot.dataUpdatedAt
    };
  }
});
var getDashboardOrganizationId$1 = bindActionGlobally(authStore, createStateSourceAction(({ state: { dashboardContext } }) => dashboardContext?.orgId));
function observeOrganizationVerificationState(instance, projectIds) {
  let dashboardOrgId$ = getDashboardOrganizationId$1(instance).observable.pipe(distinctUntilChanged()), projectOrgIdObservables = projectIds.map((id2) => project.getState(instance, { projectId: id2 }).observable.pipe(map((snapshot) => ({
    projectId: id2,
    orgId: snapshot.data?.organizationId ?? null
  })), distinctUntilChanged((prev, curr) => prev.orgId === curr.orgId))), allProjectOrgIds$ = projectOrgIdObservables.length > 0 ? combineLatest(projectOrgIdObservables) : of([]);
  return combineLatest([dashboardOrgId$, allProjectOrgIds$]).pipe(switchMap(([dashboardOrgId, projectOrgDataArray]) => {
    if (!dashboardOrgId || projectOrgDataArray.length === 0) return of({ error: null });
    for (let projectData of projectOrgDataArray) {
      if (!projectData.orgId) continue;
      let result = compareProjectOrganization(projectData.projectId, projectData.orgId, dashboardOrgId);
      if (result.error) return of(result);
    }
    return of({ error: null });
  }), distinctUntilChanged((prev, curr) => prev.error === curr.error));
}
var handleAuthCallback = bindActionGlobally(authStore, async ({ state, instance }, locationHref = getDefaultLocation()) => {
  let logger3 = getAuthLogger(instance), { providedToken, callbackUrl, clientFactory, apiHost, storageArea, storageKey } = state.get().options;
  if (providedToken) return logger3.debug("Skipping auth callback - token already provided"), false;
  let { authState } = state.get();
  if (authState.type === "logging-in" && authState.isExchangingToken) return logger3.debug("Skipping auth callback - token exchange already in progress"), false;
  let cleanedUrl = getCleanedUrl(locationHref), tokenFromUrl = getTokenFromLocation(locationHref);
  if (tokenFromUrl) return logger3.info("Auth token found in URL, logging in"), state.set("setTokenFromUrl", { authState: createLoggedInAuthState(tokenFromUrl, null) }), cleanedUrl;
  let authCode = getAuthCode(callbackUrl, locationHref);
  if (!authCode) return logger3.debug("No auth code found in callback URL"), false;
  let parsedUrl = new URL(locationHref), dashboardContext = {};
  try {
    let contextParam = parsedUrl.searchParams.get("_context");
    if (contextParam) {
      let parsedContext = JSON.parse(contextParam);
      parsedContext && typeof parsedContext == "object" && (delete parsedContext.sid, dashboardContext = parsedContext, logger3.debug("Dashboard context parsed from callback URL", { hasDashboardContext: true }));
    }
  } catch (err) {
    logger3.warn("Failed to parse dashboard context from callback URL", { error: err });
  }
  logger3.info("Exchanging auth code for token"), state.set("exchangeSessionForToken", {
    authState: {
      type: "logging-in",
      isExchangingToken: true
    },
    dashboardContext
  });
  try {
    let client = clientFactory({
      apiVersion: DEFAULT_API_VERSION$1,
      requestTagPrefix: REQUEST_TAG_PREFIX,
      useProjectHostname: false,
      useCdn: false,
      ...apiHost && { apiHost }
    });
    logger3.debug("Fetching token from auth endpoint");
    let { token } = await client.request({
      method: "GET",
      url: "/auth/fetch",
      query: { sid: authCode },
      tag: "fetch-token"
    });
    return logger3.info("Auth token obtained successfully, user logged in"), storageArea?.setItem(storageKey, JSON.stringify({ token })), state.set("setToken", { authState: createLoggedInAuthState(token, null) }), cleanedUrl;
  } catch (error2) {
    return logger3.error("Failed to exchange auth code for token", { error: error2 }), state.set("exchangeSessionForTokenError", { authState: {
      type: "error",
      error: error2
    } }), cleanedUrl;
  }
});
var logout = bindActionGlobally(authStore, async ({ state, instance }) => {
  let logger3 = getAuthLogger(instance), { clientFactory, apiHost, providedToken, storageArea, storageKey } = state.get().options;
  if (providedToken) {
    logger3.debug("Skipping logout - token is statically provided");
    return;
  }
  let { authState } = state.get();
  if (authState.type === "logged-out" && authState.isDestroyingSession) {
    logger3.debug("Skipping logout - already in progress");
    return;
  }
  let token = authState.type === "logged-in" && authState.token;
  try {
    if (token) {
      logger3.info("Logging out user"), state.set("loggingOut", { authState: {
        type: "logged-out",
        isDestroyingSession: true
      } });
      let client = clientFactory({
        token,
        requestTagPrefix: REQUEST_TAG_PREFIX,
        apiVersion: DEFAULT_API_VERSION$1,
        ...apiHost && { apiHost },
        useProjectHostname: false,
        useCdn: false
      });
      logger3.debug("Calling logout endpoint"), await client.request({
        url: "/auth/logout",
        method: "POST",
        tag: "logout"
      });
    } else logger3.debug("No token to logout - already logged out");
  } catch (error2) {
    throw logger3.error("Logout request failed", { error: error2 }), error2;
  } finally {
    logger3.info("User logged out, clearing stored tokens"), state.set("logoutSuccess", {
      authState: {
        type: "logged-out",
        isDestroyingSession: false
      },
      oauthTokens: void 0
    }), storageArea?.removeItem(storageKey), storageArea?.removeItem(`${storageKey}_last_refresh`);
  }
});
function base64UrlEncode(bytes) {
  let binary = "";
  for (let byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function randomString() {
  let bytes = new Uint8Array(32);
  return crypto.getRandomValues(bytes), base64UrlEncode(bytes);
}
function generateCodeVerifier() {
  return randomString();
}
function generateState() {
  return randomString();
}
async function generateCodeChallenge(codeVerifier) {
  let data = new TextEncoder().encode(codeVerifier), digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(digest));
}
var OAUTH_VERIFIER_KEY = "__sanity_oauth_verifier";
var OAUTH_STATE_KEY = "__sanity_oauth_state";
function getResourceIndicator(organizationId) {
  return `urn:io.sanity:organization:${organizationId}`;
}
function serializeTokens(tokens) {
  return JSON.stringify({
    accessToken: tokens.accessToken,
    tokenType: tokens.tokenType,
    expiresIn: tokens.expiresIn,
    expiresAt: tokens.expiresAt.toISOString(),
    ...tokens.refreshToken !== void 0 && { refreshToken: tokens.refreshToken }
  });
}
function getOAuthOptions(state) {
  let { options } = state;
  if (!options.oauth) throw Error("OAuth is not configured on this instance (missing `auth.oauth`).");
  return options;
}
function createOAuthClient(options) {
  return options.clientFactory({
    apiVersion: "v1",
    requestTagPrefix: REQUEST_TAG_PREFIX,
    useProjectHostname: false,
    useCdn: false,
    ...options.apiHost && { apiHost: options.apiHost }
  });
}
function toOAuthTokens(response) {
  return {
    accessToken: response.access_token,
    tokenType: "bearer",
    expiresIn: response.expires_in,
    expiresAt: new Date(Date.now() + response.expires_in * 1e3),
    ...response.refresh_token !== void 0 && { refreshToken: response.refresh_token }
  };
}
var startOAuthAuthorization = bindActionGlobally(authStore, async ({ state, instance }) => {
  let logger3 = getAuthLogger(instance), options = getOAuthOptions(state.get()), codeVerifier = generateCodeVerifier(), oauthState = generateState(), codeChallenge = await generateCodeChallenge(codeVerifier), session = typeof sessionStorage < "u" ? sessionStorage : void 0;
  session?.setItem(OAUTH_VERIFIER_KEY, codeVerifier), session?.setItem(OAUTH_STATE_KEY, oauthState);
  let authorizeUrl = new URL("/v1/auth/oauth/authorize", options.apiHost ?? "https://api.sanity.io");
  authorizeUrl.searchParams.set("response_type", "code"), authorizeUrl.searchParams.set("client_id", options.oauth.clientId), authorizeUrl.searchParams.set("redirect_uri", options.oauth.redirectUri), authorizeUrl.searchParams.set("state", oauthState), authorizeUrl.searchParams.set("code_challenge", codeChallenge), authorizeUrl.searchParams.set("code_challenge_method", "S256"), authorizeUrl.searchParams.append("resource", getResourceIndicator(options.oauth.organizationId)), logger3.info("Starting OAuth authorization"), typeof window < "u" && typeof window.location?.assign == "function" && window.location.assign(authorizeUrl.toString());
});
var handleOAuthCallback = bindActionGlobally(authStore, async ({ state, instance }, locationHref = getDefaultLocation()) => {
  let logger3 = getAuthLogger(instance), options = getOAuthOptions(state.get()), { authState } = state.get();
  if (authState.type === "logging-in" && authState.isExchangingToken) return logger3.debug("Skipping OAuth callback - token exchange already in progress"), false;
  let callbackUrl = new URL(locationHref, DEFAULT_BASE), code = callbackUrl.searchParams.get("code"), returnedState = callbackUrl.searchParams.get("state"), error2 = callbackUrl.searchParams.get("error"), errorDescription = callbackUrl.searchParams.get("error_description"), session = typeof sessionStorage < "u" ? sessionStorage : void 0, cleanedUrlObj = new URL(locationHref, DEFAULT_BASE);
  for (let param of [
    "code",
    "state",
    "error",
    "error_description"
  ]) cleanedUrlObj.searchParams.delete(param);
  let cleanedUrl = cleanedUrlObj.toString();
  if (error2) return logger3.warn("OAuth callback returned an error", {
    error: error2,
    errorDescription
  }), clearOAuthArtifacts(session), state.set("oauthCallbackError", { authState: {
    type: "error",
    error: Error(errorDescription ? `${error2}: ${errorDescription}` : error2)
  } }), cleanedUrl;
  if (!code) return logger3.debug("No OAuth code found in callback URL"), false;
  let storedState = session?.getItem("__sanity_oauth_state") ?? null;
  if (!returnedState || !storedState || returnedState !== storedState) return logger3.error("OAuth state mismatch — rejecting callback"), clearOAuthArtifacts(session), state.set("oauthStateMismatch", { authState: {
    type: "error",
    error: Error("OAuth state mismatch")
  } }), cleanedUrl;
  let codeVerifier = session?.getItem("__sanity_oauth_verifier") ?? null;
  if (!codeVerifier) return logger3.error("OAuth code verifier missing — cannot exchange code"), clearOAuthArtifacts(session), state.set("oauthVerifierMissing", { authState: {
    type: "error",
    error: Error("OAuth code verifier missing")
  } }), cleanedUrl;
  logger3.info("Exchanging OAuth code for tokens"), state.set("oauthExchange", { authState: {
    type: "logging-in",
    isExchangingToken: true
  } });
  try {
    let client = createOAuthClient(options), params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      code_verifier: codeVerifier,
      redirect_uri: options.oauth.redirectUri,
      client_id: options.oauth.clientId,
      resource: getResourceIndicator(options.oauth.organizationId)
    }), tokens = toOAuthTokens(await client.request({
      method: "POST",
      url: "/auth/oauth/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      tag: "oauth.token"
    }));
    return options.storageArea?.setItem(options.storageKey, serializeTokens(tokens)), clearOAuthArtifacts(session), logger3.info("OAuth tokens obtained, user logged in"), state.set("oauthLoggedIn", {
      authState: createLoggedInAuthState(tokens.accessToken, null),
      oauthTokens: tokens
    }), cleanedUrl;
  } catch (exchangeError) {
    return logger3.error("Failed to exchange OAuth code for tokens", { error: exchangeError }), clearOAuthArtifacts(session), state.set("oauthExchangeError", { authState: {
      type: "error",
      error: exchangeError
    } }), cleanedUrl;
  }
});
function isUnrecoverableRefreshError(error2) {
  return error2 instanceof ClientError && error2.statusCode !== 408 && error2.statusCode !== 429;
}
var refreshInFlight = null;
var refreshOAuthTokens = bindActionGlobally(authStore, (context) => refreshInFlight || (refreshInFlight = doRefreshOAuthTokens(context).finally(() => {
  refreshInFlight = null;
}), refreshInFlight));
async function doRefreshOAuthTokens({ state, instance }) {
  let logger3 = getAuthLogger(instance), options = getOAuthOptions(state.get()), current = state.get().oauthTokens;
  if (!current?.refreshToken) return logger3.warn("No refresh token available — logging out"), options.storageArea?.removeItem(options.storageKey), state.set("oauthRefreshNoToken", {
    authState: {
      type: "logged-out",
      isDestroyingSession: false
    },
    oauthTokens: void 0
  }), null;
  try {
    let client = createOAuthClient(options), params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: current.refreshToken,
      client_id: options.oauth.clientId,
      resource: getResourceIndicator(options.oauth.organizationId)
    }), tokens = toOAuthTokens(await client.request({
      method: "POST",
      url: "/auth/oauth/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      tag: "oauth.refresh"
    }));
    return tokens.refreshToken ||= current.refreshToken, options.storageArea?.setItem(options.storageKey, serializeTokens(tokens)), logger3.info("OAuth tokens refreshed"), state.set("oauthRefreshed", {
      authState: createLoggedInAuthState(tokens.accessToken, null),
      oauthTokens: tokens
    }), tokens;
  } catch (error2) {
    throw isUnrecoverableRefreshError(error2) ? (logger3.error("OAuth token refresh failed — logging out", { error: error2 }), options.storageArea?.removeItem(options.storageKey), state.set("oauthRefreshFailed", {
      authState: {
        type: "logged-out",
        isDestroyingSession: false
      },
      oauthTokens: void 0
    }), error2) : (logger3.warn("OAuth token refresh failed — keeping session for retry", { error: error2 }), error2);
  }
}
var revokeOAuthTokens = bindActionGlobally(authStore, async ({ state, instance }) => {
  let logger3 = getAuthLogger(instance), options = getOAuthOptions(state.get()), current = state.get().oauthTokens, token = current?.refreshToken ?? current?.accessToken;
  try {
    if (token) {
      let client = createOAuthClient(options), params = new URLSearchParams({
        token,
        client_id: options.oauth.clientId
      });
      await client.request({
        method: "POST",
        url: "/auth/oauth/revoke",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: params.toString(),
        tag: "oauth.revoke"
      }), logger3.info("OAuth tokens revoked");
    }
  } catch (error2) {
    logger3.warn("OAuth revoke request failed — clearing local state anyway", { error: error2 });
  } finally {
    options.storageArea?.removeItem(options.storageKey), state.set("oauthRevoked", {
      authState: {
        type: "logged-out",
        isDestroyingSession: false
      },
      oauthTokens: void 0
    });
  }
});
var getOAuthTokensState = bindActionGlobally(authStore, createStateSourceAction(({ state }) => state.oauthTokens ?? null));
function clearOAuthArtifacts(session) {
  session?.removeItem(OAUTH_VERIFIER_KEY), session?.removeItem(OAUTH_STATE_KEY);
}
function weaken(node) {
  return Array.isArray(node) ? node.map(weaken) : node && typeof node == "object" ? "_ref" in node ? {
    ...node,
    _weak: true
  } : Object.fromEntries(Object.entries(node).map(([key, value]) => [key, weaken(value)])) : node;
}
function weakenReferencesInContentSnapshot(snapshot) {
  return weaken(snapshot);
}
function requireFieldPath(fieldPath) {
  let normalized = toCommentFieldPath(fieldPath);
  if (!normalized) throw Error("A comment needs a field path. Comments attach to a field, not to a document as a whole.");
  return normalized;
}
function requireCurrentUserId(instance) {
  let userId = getCurrentUserState(instance).getCurrent()?.id;
  if (!userId) throw Error("Writing a comment requires a logged in user.");
  return userId;
}
async function requireAddonDataset(instance, resource) {
  let datasetName = await firstValueFrom(getAddonDatasetState(instance, { resource }).observable.pipe(filter((value) => value !== void 0), take(1)));
  if (!datasetName) throw Error("This project has no comments dataset, so there is no comment to change.");
  return datasetName;
}
async function getWritableClient(instance, resource, { createIfMissing }) {
  let { projectId } = assertDatasetResource(resource), dataset = createIfMissing ? await provisionAddonDataset(instance, { resource }) : await requireAddonDataset(instance, resource);
  return getClient(instance, {
    apiVersion: COMMENTS_API_VERSION,
    projectId,
    dataset
  });
}
function buildCommentPayload(options) {
  let { handle, resource } = options;
  return {
    _id: options.commentId,
    _type: "comment",
    authorId: options.authorId,
    message: options.message,
    threadId: options.threadId,
    ...options.parentCommentId ? { parentCommentId: options.parentCommentId } : {},
    status: options.status,
    reactions: null,
    context: {
      tool: "",
      ...options.context
    },
    ...options.contentSnapshot === void 0 ? {} : { contentSnapshot: weakenReferencesInContentSnapshot(options.contentSnapshot) },
    target: {
      documentRevisionId: options.documentRevisionId ?? "",
      path: {
        field: options.fieldPath,
        ...options.selection ? { selection: options.selection } : {}
      },
      document: {
        _dataset: resource.dataset,
        _projectId: resource.projectId,
        _ref: getPublishedId(DocumentId(handle.documentId)),
        _type: "crossDatasetReference",
        _weak: true
      },
      documentType: handle.documentType,
      ...options.documentVersionId ? { documentVersionId: options.documentVersionId } : {}
    }
  };
}
function findComment(state, commentsKey, commentId) {
  let comments = state.get().entries[commentsKey]?.comments;
  return comments && Object.hasOwn(comments, commentId) ? comments[commentId] : void 0;
}
function findCommentById(state, commentId) {
  for (let entry of Object.values(state.get().entries)) {
    let comments = entry?.comments, comment = comments && Object.hasOwn(comments, commentId) ? comments[commentId] : void 0;
    if (comment) return comment;
  }
}
async function postComment(context, handle, payload) {
  let { state, instance, key } = context, commentsKey = getCommentsKey(toCommentsKeyParts(instance, handle));
  state.set("addComment", addComment(commentsKey, payload));
  try {
    let created = await (await getWritableClient(instance, key.resource, { createIfMissing: true })).createIfNotExists(payload, { tag: "comments.create" });
    return state.set("receiveComment", receiveComment(commentsKey, created)), normalizeComment(created);
  } catch (error2) {
    throw state.set("setCommentCreateError", setCommentCreateError(payload._id, error2 instanceof Error ? error2 : Error(String(error2)))), error2;
  }
}
var createComment = bindActionByResource(commentsStore, async (context, options) => {
  let { instance, key } = context, perspective = options.perspective ?? instance.config.perspective, fieldPath = requireFieldPath(options.fieldPath);
  return postComment(context, options, buildCommentPayload({
    authorId: requireCurrentUserId(instance),
    commentId: options.commentId ?? randomUuid(),
    contentSnapshot: options.contentSnapshot,
    context: options.context,
    documentRevisionId: options.documentRevisionId,
    handle: options,
    message: options.message,
    resource: assertDatasetResource(key.resource),
    fieldPath,
    selection: options.selection,
    status: options.status ?? "open",
    threadId: options.threadId ?? randomUuid(),
    ...isReleasePerspective(perspective) ? { documentVersionId: perspective.releaseName } : {}
  }));
});
var replyToComment = bindActionByResource(commentsStore, async (context, options) => {
  let { instance, key, state } = context, parent = findComment(state, getCommentsKey(toCommentsKeyParts(instance, options)), options.parentCommentId), threadId = options.threadId ?? parent?.threadId;
  if (!threadId) throw Error(`Cannot reply to "${options.parentCommentId}": it is not loaded, so pass its threadId.`);
  let status = parent?.status ?? options.status;
  if (!status) throw Error(`Cannot reply to "${options.parentCommentId}": it is not loaded, so pass its status.`);
  let perspective = options.perspective ?? instance.config.perspective;
  return postComment(context, options, buildCommentPayload({
    authorId: requireCurrentUserId(instance),
    commentId: options.commentId ?? randomUuid(),
    handle: options,
    message: options.message,
    parentCommentId: parent?.parentCommentId ?? options.parentCommentId,
    resource: assertDatasetResource(key.resource),
    fieldPath: requireFieldPath(options.fieldPath ?? parent?.target.path?.field ?? ""),
    status,
    threadId,
    ...isReleasePerspective(perspective) ? { documentVersionId: perspective.releaseName } : {}
  }));
});
var updateComment = bindActionByResource(commentsStore, async ({ state, instance, key }, { commentId, message }) => {
  let lastEditedAt = (/* @__PURE__ */ new Date()).toISOString(), transactionId = randomUuid(), previous = findCommentById(state, commentId);
  previous && (state.set("setPendingTransaction", setPendingTransaction(commentId, transactionId)), state.set("updateComment", applyCommentUpdate(commentId, {
    message,
    lastEditedAt
  })));
  try {
    let client = await getWritableClient(instance, key.resource, { createIfMissing: false });
    await client.transaction().transactionId(transactionId).patch(client.patch(commentId).set({
      message,
      lastEditedAt
    })).commit({ tag: "comments.update" }), previous && state.set("clearPendingTransaction", clearPendingTransaction(commentId));
  } catch (error2) {
    throw previous && state.set("rollbackCommentUpdate", rollbackCommentUpdate(commentId, transactionId, previous)), error2;
  }
});
var setCommentStatus = bindActionByResource(commentsStore, async ({ state, instance, key }, { commentId, status }) => {
  let transactionId = randomUuid(), previousComments = [];
  for (let entry of Object.values(state.get().entries)) for (let candidate of Object.values(entry?.comments ?? {})) (candidate._id === commentId || candidate.parentCommentId === commentId) && (previousComments.push(candidate), state.set("setPendingTransaction", setPendingTransaction(candidate._id, transactionId)), state.set("updateCommentStatus", applyCommentUpdate(candidate._id, { status })));
  try {
    await (await getWritableClient(instance, key.resource, { createIfMissing: false })).mutate([{ patch: {
      id: commentId,
      set: { status }
    } }, { patch: {
      query: '*[_type == "comment" && parentCommentId == $commentId]',
      params: { commentId },
      set: { status }
    } }], {
      transactionId,
      tag: "comments.set-status"
    });
    for (let previous of previousComments) state.set("clearPendingTransaction", clearPendingTransaction(previous._id));
  } catch (error2) {
    for (let previous of previousComments) state.set("rollbackCommentUpdate", rollbackCommentUpdate(previous._id, transactionId, previous));
    throw error2;
  }
});
var removeComment = bindActionByResource(commentsStore, async ({ state, instance, key }, { commentId }) => {
  let removed = Object.entries(state.get().entries).flatMap(([entryKey2, entry]) => {
    let comments = Object.values(entry?.comments ?? {}).filter((comment) => comment._id === commentId || comment.parentCommentId === commentId);
    return comments.length ? [{
      key: entryKey2,
      comments
    }] : [];
  });
  state.set("removeComment", removeCommentById(commentId));
  try {
    await (await getWritableClient(instance, key.resource, { createIfMissing: false })).mutate([{ delete: {
      query: '*[_type == "comment" && parentCommentId == $commentId]',
      params: { commentId }
    } }, { delete: { id: commentId } }], { tag: "comments.remove" });
  } catch (error2) {
    throw state.set("restoreComments", restoreComments(removed)), error2;
  }
});
function createDocumentHandle(handle) {
  return handle;
}
function createDocumentTypeHandle(handle) {
  return handle;
}
function createProjectHandle(handle) {
  return handle;
}
function createDatasetHandle(handle) {
  return handle;
}
function configureLogging2(config) {
  configureLogging(config);
  let configLevel = config.level || "warn", shouldLog = [
    "info",
    "debug",
    "trace"
  ].includes(configLevel) || configLevel === "warn";
  shouldLog && config.handler?.info ? config.handler.info(`[${(/* @__PURE__ */ new Date()).toISOString()}] [INFO] [sdk] Logging configured`, {
    level: configLevel,
    namespaces: config.namespaces || [],
    internal: config.internal || false,
    source: "programmatic"
  }) : shouldLog && console.info(`[${(/* @__PURE__ */ new Date()).toISOString()}] [INFO] [sdk] Logging configured`, {
    level: configLevel,
    namespaces: config.namespaces || [],
    internal: config.internal || false,
    source: "programmatic"
  });
}
function resolveProjectId(instance, options) {
  let projectId = options?.projectId ?? instance.config.projectId;
  if (!projectId) throw Error("A projectId is required to use the datasets API.");
  return projectId;
}
var datasets = defineFetcher({
  name: "datasets",
  getKey: resolveProjectId,
  fetch: (instance) => (options) => getClientState(instance, {
    apiVersion: "v2025-02-19",
    projectId: resolveProjectId(instance, options),
    useProjectHostname: true
  }).observable.pipe(switchMap((client) => client.observable.datasets.list()))
});
function getEditingDocumentId(doc) {
  return doc.liveEdit ? getPublishedId(DocumentId(doc.documentId)) : isReleasePerspective(doc.perspective) ? getVersionId(DocumentId(doc.documentId), doc.perspective.releaseName) : doc.perspective === "published" ? getPublishedId(DocumentId(doc.documentId)) : getDraftId(DocumentId(doc.documentId));
}
function getEffectiveDocumentId(doc) {
  return doc.liveEdit ? doc.documentId : isReleasePerspective(doc.perspective) ? getVersionId(DocumentId(doc.documentId), doc.perspective.releaseName) : getPublishedId(DocumentId(doc.documentId));
}
var isSanityMutatePatch = (value) => !(typeof value != "object" || !value || !("type" in value) || typeof value.type != "string" || value.type !== "patch" || !("id" in value) || typeof value.id != "string" || !("patches" in value) || !Array.isArray(value.patches));
function createDocument(doc, initialValue) {
  let effectiveDocumentId;
  return typeof doc.documentId == "string" && (effectiveDocumentId = getEffectiveDocumentId({
    ...doc,
    documentId: doc.documentId
  })), {
    type: "document.create",
    ...doc,
    ...effectiveDocumentId && { documentId: effectiveDocumentId },
    ...initialValue && { initialValue }
  };
}
function deleteDocument(doc) {
  let effectiveDocumentId = getEffectiveDocumentId(doc);
  return {
    type: "document.delete",
    ...doc,
    documentId: effectiveDocumentId
  };
}
function convertSanityMutatePatch(sanityPatchMutation) {
  return index.encode(sanityPatchMutation).map((i) => {
    let copy = { ...i.patch };
    return "id" in copy && delete copy.id, copy;
  });
}
function editDocument(doc, patches, options) {
  let effectiveDocumentId = getEffectiveDocumentId(doc), preserveOperations = options?.preserveOperations && { preserveOperations: true };
  if (isSanityMutatePatch(patches)) {
    let converted = convertSanityMutatePatch(patches) ?? [];
    return {
      ...doc,
      type: "document.edit",
      documentId: effectiveDocumentId,
      patches: converted,
      ...preserveOperations
    };
  }
  return {
    ...doc,
    type: "document.edit",
    documentId: effectiveDocumentId,
    ...patches && { patches: Array.isArray(patches) ? patches : [patches] },
    ...preserveOperations
  };
}
function publishDocument(doc) {
  let effectiveDocumentId = getEffectiveDocumentId(doc);
  return {
    type: "document.publish",
    ...doc,
    documentId: effectiveDocumentId
  };
}
function unpublishDocument(doc) {
  let effectiveDocumentId = getEffectiveDocumentId(doc);
  return {
    type: "document.unpublish",
    ...doc,
    documentId: effectiveDocumentId
  };
}
function discardDocument(doc) {
  let effectiveDocumentId = getEffectiveDocumentId(doc);
  return {
    type: "document.discard",
    ...doc,
    documentId: effectiveDocumentId
  };
}
function createRelease(handle, metadata = { releaseType: "undecided" }) {
  return {
    type: "release.create",
    ...handle,
    metadata
  };
}
function editRelease(handle, patch) {
  return {
    type: "release.edit",
    ...handle,
    patch
  };
}
function publishRelease(handle) {
  return {
    type: "release.publish",
    ...handle
  };
}
function scheduleRelease(handle, publishAt) {
  return {
    type: "release.schedule",
    ...handle,
    publishAt
  };
}
function unscheduleRelease(handle) {
  return {
    type: "release.unschedule",
    ...handle
  };
}
function archiveRelease(handle) {
  return {
    type: "release.archive",
    ...handle
  };
}
function unarchiveRelease(handle) {
  return {
    type: "release.unarchive",
    ...handle
  };
}
function deleteRelease(handle) {
  return {
    type: "release.delete",
    ...handle
  };
}
var API_VERSION$4 = "v2025-05-06";
function getReleaseDocumentId(releaseId) {
  return `_.releases.${releaseId}`;
}
var RELEASE_ACTION_TYPES = /* @__PURE__ */ new Set([
  "release.create",
  "release.edit",
  "release.publish",
  "release.schedule",
  "release.unschedule",
  "release.archive",
  "release.unarchive",
  "release.delete"
]);
function isReleaseAction(action) {
  return RELEASE_ACTION_TYPES.has(action.type);
}
function generateArrayKey(length = 12) {
  let numBytes = Math.ceil(length / 2), bytes = crypto.getRandomValues(new Uint8Array(numBytes));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, length);
}
function memoize(fn) {
  let cache2 = /* @__PURE__ */ new WeakMap();
  return ((input) => {
    if (!input || typeof input != "object") return fn(input);
    let cached = cache2.get(input);
    if (cached) return cached;
    let result = fn(input);
    return cache2.set(input, result), result;
  });
}
var ensureArrayKeysDeep = memoize((input) => {
  if (!input || typeof input != "object") return input;
  if (Array.isArray(input)) return !input.length || typeof input[0] != "object" || input.every(isKeyedObject) ? input : input.map((item) => !item || typeof item != "object" ? item : isKeyedObject(item) ? ensureArrayKeysDeep(item) : {
    ...ensureArrayKeysDeep(item),
    _key: generateArrayKey()
  });
  let entries = Object.entries(input).map(([key, value]) => [key, ensureArrayKeysDeep(value)]);
  return entries.every(([key, value]) => input[key] === value) ? input : Object.fromEntries(entries);
});
function resolvesArraySegments(input, path) {
  let current = input;
  for (let segment of path) {
    if (typeof segment == "string") {
      current = typeof current == "object" && current && !Array.isArray(current) ? current[segment] : void 0;
      continue;
    }
    if (!Array.isArray(current)) return false;
    if (isKeySegment(segment)) {
      let index2 = getIndexForKey(current, segment._key);
      if (index2 === void 0) return false;
      current = current[index2];
    } else {
      let index2 = segment < 0 ? current.length + segment : segment;
      if (!(index2 in current)) return false;
      current = current[index2];
    }
  }
  return true;
}
function set3(input, pathExpressionValues) {
  let result = Object.entries(pathExpressionValues).flatMap(([pathExpression, replacementValue]) => Array.from(jsonMatch(input, pathExpression)).map((matchEntry) => ({
    ...matchEntry,
    replacementValue
  }))).filter(({ path }) => resolvesArraySegments(input, path)).reduce((acc, { path, replacementValue }) => setDeep(acc, path, replacementValue), input);
  return ensureArrayKeysDeep(result);
}
function setIfMissing3(input, pathExpressionValues) {
  let result = Object.entries(pathExpressionValues).flatMap(([pathExpression, replacementValue]) => Array.from(jsonMatch(input, pathExpression)).map((matchEntry) => ({
    ...matchEntry,
    replacementValue
  }))).filter((matchEntry) => matchEntry.value === null || matchEntry.value === void 0).filter(({ path }) => resolvesArraySegments(input, path)).reduce((acc, { path, replacementValue }) => setDeep(acc, path, replacementValue), input);
  return ensureArrayKeysDeep(result);
}
function unset3(input, pathExpressions) {
  let result = pathExpressions.flatMap((pathExpression) => Array.from(jsonMatch(input, pathExpression))).reverse().reduce((acc, { path }) => unsetDeep(acc, path), input);
  return ensureArrayKeysDeep(result);
}
function insert3(input, { items, ...insertPatch }) {
  let operation, pathExpression;
  if ("before" in insertPatch ? (operation = "before", pathExpression = insertPatch.before) : "after" in insertPatch ? (operation = "after", pathExpression = insertPatch.after) : "replace" in insertPatch && (operation = "replace", pathExpression = insertPatch.replace), !operation || typeof pathExpression != "string" || !pathExpression.length) return input;
  let arrayPath = slicePath(pathExpression, 0, -1), positionPath = slicePath(pathExpression, -1), result = input;
  for (let { path, value } of jsonMatch(input, arrayPath)) {
    if (!Array.isArray(value)) continue;
    let arr = value;
    switch (operation) {
      case "replace": {
        let indexesToRemove = /* @__PURE__ */ new Set(), position = Infinity;
        for (let itemMatch of jsonMatch(arr, positionPath)) {
          if (itemMatch.path.length !== 1) continue;
          let [segment] = itemMatch.path;
          if (typeof segment == "string") continue;
          let index2;
          typeof segment == "number" && (index2 = segment), typeof index2 == "number" && index2 < 0 && (index2 = arr.length + index2), isKeySegment(segment) && (index2 = getIndexForKey(arr, segment._key)), typeof index2 == "number" && (index2 < 0 && (index2 = arr.length + index2), indexesToRemove.add(index2), index2 < position && (position = index2));
        }
        if (position === Infinity) continue;
        arr = arr.map((item, index2) => ({
          item,
          index: index2
        })).filter(({ index: index2 }) => !indexesToRemove.has(index2)).map(({ item }) => item), arr = [
          ...arr.slice(0, position),
          ...items,
          ...arr.slice(position, arr.length)
        ];
        break;
      }
      case "before": {
        let position = Infinity;
        for (let itemMatch of jsonMatch(arr, positionPath)) {
          if (itemMatch.path.length !== 1) continue;
          let [segment] = itemMatch.path;
          if (typeof segment == "string") continue;
          let index2;
          typeof segment == "number" && (index2 = segment), typeof index2 == "number" && index2 < 0 && (index2 = arr.length + index2), isKeySegment(segment) && (index2 = getIndexForKey(arr, segment._key)), typeof index2 == "number" && (index2 < 0 && (index2 = arr.length - index2), index2 < position && (position = index2));
        }
        if (position === Infinity) continue;
        arr = [
          ...arr.slice(0, position),
          ...items,
          ...arr.slice(position, arr.length)
        ];
        break;
      }
      case "after": {
        let position = -Infinity;
        for (let itemMatch of jsonMatch(arr, positionPath)) {
          if (itemMatch.path.length !== 1) continue;
          let [segment] = itemMatch.path;
          if (typeof segment == "string") continue;
          let index2;
          typeof segment == "number" && (index2 = segment), typeof index2 == "number" && index2 < 0 && (index2 = arr.length + index2), isKeySegment(segment) && (index2 = getIndexForKey(arr, segment._key)), typeof index2 == "number" && index2 > position && (position = index2);
        }
        if (position === -Infinity) continue;
        arr = [
          ...arr.slice(0, position + 1),
          ...items,
          ...arr.slice(position + 1, arr.length)
        ];
        break;
      }
      default:
        continue;
    }
    result = setDeep(result, path, arr);
  }
  return ensureArrayKeysDeep(result);
}
function inc2(input, pathExpressionValues) {
  let result = Object.entries(pathExpressionValues).flatMap(([pathExpression, valueToAdd]) => Array.from(jsonMatch(input, pathExpression)).map((matchEntry) => ({
    ...matchEntry,
    valueToAdd
  }))).filter((matchEntry) => typeof matchEntry.value == "number").reduce((acc, { path, value, valueToAdd }) => setDeep(acc, path, value + valueToAdd), input);
  return ensureArrayKeysDeep(result);
}
function dec2(input, pathExpressionValues) {
  let result = inc2(input, Object.fromEntries(Object.entries(pathExpressionValues).filter(([, value]) => typeof value == "number").map(([key, value]) => [key, -value])));
  return ensureArrayKeysDeep(result);
}
function diffMatchPatch3(input, pathExpressionValues) {
  let result = Object.entries(pathExpressionValues).flatMap(([pathExpression, dmp]) => Array.from(jsonMatch(input, pathExpression)).map((m2) => ({
    ...m2,
    dmp
  }))).filter((i) => i.value !== void 0).map(({ path, value, dmp }) => {
    if (typeof value != "string") throw Error(`Can't diff-match-patch \`${JSON.stringify(value)}\` at path \`${stringifyPath(path)}\`, because it is not a string`);
    let [nextValue] = apply(parse5(dmp), value, { allowExceedingIndices: true });
    return {
      path,
      value: nextValue
    };
  }).reduce((acc, { path, value }) => setDeep(acc, path, value), input);
  return ensureArrayKeysDeep(result);
}
function ifRevisionID(input, revisionId) {
  let inputRev = typeof input == "object" && input && "_rev" in input && typeof input._rev == "string" ? input._rev : void 0;
  if (typeof inputRev != "string") throw Error("Patch specified `ifRevisionID` but could not find document's revision ID.");
  if (revisionId !== inputRev) throw Error(`Patch's \`ifRevisionID\` \`${revisionId}\` does not match document's revision ID \`${inputRev}\``);
  return input;
}
function setDeep(input, path, value) {
  let [currentSegment, ...restOfPath] = path;
  if (currentSegment === void 0) return value;
  if (typeof input != "object" || !input) {
    if (typeof currentSegment == "string") return { [currentSegment]: setDeep(null, restOfPath, value) };
    let index2;
    if (isKeySegment(currentSegment)) index2 = 0;
    else if (typeof currentSegment == "number" && currentSegment >= 0) index2 = currentSegment;
    else return input;
    return [...Array.from({ length: index2 }).fill(null), setDeep(null, restOfPath, value)];
  }
  if (Array.isArray(input)) {
    let index2;
    return isKeySegment(currentSegment) ? index2 = getIndexForKey(input, currentSegment._key) ?? input.length : typeof currentSegment == "number" && (index2 = currentSegment < 0 ? input.length + currentSegment : currentSegment), index2 === void 0 ? input : index2 in input ? input.map((nestedInput, i) => i === index2 ? setDeep(nestedInput, restOfPath, value) : nestedInput) : [
      ...input,
      ...Array.from({ length: index2 - input.length }).fill(null),
      setDeep(null, restOfPath, value)
    ];
  }
  return typeof currentSegment == "object" ? input : currentSegment in input ? Object.fromEntries(Object.entries(input).map(([key, nestedInput]) => key === currentSegment ? [key, setDeep(nestedInput, restOfPath, value)] : [key, nestedInput])) : {
    ...input,
    [currentSegment]: setDeep(null, restOfPath, value)
  };
}
function unsetDeep(input, path) {
  let [currentSegment, ...restOfPath] = path;
  if (currentSegment === void 0 || typeof input != "object" || !input) return input;
  let _segment;
  if (isKeySegment(currentSegment) ? _segment = getIndexForKey(input, currentSegment._key) : (typeof currentSegment == "string" || typeof currentSegment == "number") && (_segment = currentSegment), _segment === void 0) return input;
  let segment = _segment;
  return typeof segment == "number" && Array.isArray(input) && (segment = segment < 0 ? input.length + segment : segment), segment in input ? restOfPath.length ? Array.isArray(input) ? input.map((nestedInput, index2) => index2 === segment ? unsetDeep(nestedInput, restOfPath) : nestedInput) : Object.fromEntries(Object.entries(input).map(([key, value]) => key === segment ? [key, unsetDeep(value, restOfPath)] : [key, value])) : Array.isArray(input) ? input.filter((_nestedInput, index2) => index2 !== segment) : Object.fromEntries(Object.entries(input).filter(([key]) => key !== segment.toString())) : input;
}
var patchOperations = Object.freeze({
  ifRevisionID,
  set: set3,
  setIfMissing: setIfMissing3,
  unset: unset3,
  inc: inc2,
  dec: dec2,
  insert: insert3,
  diffMatchPatch: diffMatchPatch3
});
function getId(id2) {
  return !id2 || typeof id2 != "string" ? randomUuid() : id2.endsWith(".") ? `${id2}${randomUuid()}` : id2;
}
function getDocumentIds(selection) {
  if ("id" in selection) {
    let ids = (Array.isArray(selection.id) ? selection.id : [selection.id]).filter((id2) => typeof id2 == "string");
    return Array.from(new Set(ids));
  }
  if ("query" in selection) throw Error("'query' in mutations is not supported.");
  return [];
}
function processMutations({ documents: documents2, mutations, transactionId, timestamp }) {
  if (!mutations.length) return documents2;
  let dataset = { ...documents2 }, now = timestamp || (/* @__PURE__ */ new Date()).toISOString();
  for (let mutation of mutations) {
    if ("create" in mutation) {
      let id2 = getId(mutation.create._id);
      if (dataset[id2]) throw Error(`Cannot create document with \`_id\` \`${id2}\` because another document with the same ID already exists.`);
      dataset[id2] = {
        _createdAt: now,
        _updatedAt: now,
        ...mutation.create,
        _rev: transactionId,
        _id: id2
      };
      continue;
    }
    if ("createOrReplace" in mutation) {
      let id2 = getId(mutation.createOrReplace._id), prev = dataset[id2];
      dataset[id2] = {
        ...mutation.createOrReplace,
        _createdAt: prev?._createdAt || typeof mutation.createOrReplace._createdAt == "string" && mutation.createOrReplace._createdAt || now,
        _updatedAt: prev ? now : typeof mutation.createOrReplace._updatedAt == "string" && mutation.createOrReplace._updatedAt || now,
        _rev: transactionId,
        _id: id2
      };
      continue;
    }
    if ("createIfNotExists" in mutation) {
      let id2 = getId(mutation.createIfNotExists._id);
      if (dataset[id2]) continue;
      dataset[id2] = {
        _createdAt: now,
        _updatedAt: now,
        ...mutation.createIfNotExists,
        _rev: transactionId,
        _id: id2
      };
      continue;
    }
    if ("delete" in mutation) {
      for (let id2 of getDocumentIds(mutation.delete)) dataset[id2] = null;
      continue;
    }
    if ("patch" in mutation) {
      let { patch } = mutation, patched = getDocumentIds(patch).map((id2) => {
        if (!dataset[id2]) throw Error(`Cannot patch document with ID \`${id2}\` because it was not found.`);
        return Object.entries(patchOperations).reduce((acc, [type, operation]) => patch[type] ? operation(acc, patch[type]) : acc, dataset[id2]);
      });
      for (let result of patched) dataset[result._id] = {
        ...result,
        _rev: transactionId,
        _updatedAt: now
      };
      continue;
    }
  }
  return dataset;
}
var OutOfSyncError = class extends Error {
  constructor(message, state) {
    super(message), _defineProperty(
      this,
      /**
      * Attach state to the error for debugging/reporting
      */
      "state",
      void 0
    ), this.name = "OutOfSyncError", this.state = state;
  }
};
var DeadlineExceededError = class extends OutOfSyncError {
  constructor(message, state) {
    super(message, state), this.name = "DeadlineExceededError";
  }
};
var MaxBufferExceededError = class extends OutOfSyncError {
  constructor(message, state) {
    super(message, state), this.name = "MaxBufferExceededError";
  }
};
function toOrderedChains(events) {
  return events.filter((event) => !events.some((other) => other.resultRev === event.previousRev)).map((start) => {
    let chain = [], current = start;
    for (; current; ) {
      chain.push(current);
      let currentResultRev = current.resultRev;
      current = events.find((event) => event.previousRev === currentResultRev);
    }
    return chain;
  });
}
function discardChainTo(chain, revision) {
  let revisionIndex = chain.findIndex((event) => event.resultRev === revision);
  return revisionIndex === -1 ? chain : chain.slice(revisionIndex + 1);
}
function sortListenerEvents(options) {
  let { resolveChainDeadline = 3e4, maxBufferSize = 20 } = options || {};
  return (input$) => input$.pipe(scan((state, event) => {
    if (event.type === "sync") return {
      base: { revision: event.document?._rev },
      buffer: [],
      emitEvents: [event]
    };
    if (event.type === "mutation") {
      if (!state.base) throw Error("Invalid state. Cannot process mutation event without a base sync event");
      let baseRevision = state.base.revision, chains = toOrderedChains(state.buffer.concat(event)).map((chain) => discardChainTo(chain, baseRevision)).filter((chain) => chain.length > 0), applicable = chains.find((chain) => chain[0].previousRev === baseRevision), buffer = chains.filter((chain) => chain !== applicable).flat();
      if (applicable) {
        let last = applicable[applicable.length - 1];
        return {
          base: { revision: last.transition === "disappear" ? void 0 : last.resultRev },
          buffer,
          emitEvents: applicable
        };
      }
      if (buffer.length >= maxBufferSize) throw new MaxBufferExceededError(`Too many unchainable mutation events (${buffer.length}) waiting to resolve.`, {
        base: { revision: baseRevision },
        buffer,
        emitEvents: []
      });
      return {
        base: { revision: baseRevision },
        buffer,
        emitEvents: []
      };
    }
    return {
      ...state,
      emitEvents: [event]
    };
  }, {
    base: void 0,
    buffer: [],
    emitEvents: []
  }), switchMap((state) => state.buffer.length > 0 ? concat(of(state), timer(resolveChainDeadline).pipe(mergeMap(() => throwError(() => new DeadlineExceededError(`Did not resolve chain within a deadline of ${resolveChainDeadline}ms`, state))))) : of(state)), mergeMap((state) => of(...state.emitEvents)));
}
var listen = ({ state }, documentId) => {
  let { sharedListener, fetchDocument } = state.get();
  return sharedListener.events.pipe(concatMap((e) => e.type === "welcome" || e.type === "reset" ? fetchDocument(documentId).pipe(map((document2) => ({
    type: "sync",
    document: document2
  }))) : e.type === "mutation" && e.documentId === documentId ? of(e) : EMPTY), sortListenerEvents(), withLatestFrom(state.observable.pipe(map((s) => s.documentStates[documentId]), filter(Boolean), distinctUntilChanged())), map(([next, documentState]) => {
    if (next.type === "sync") return {
      type: "sync",
      documentId,
      document: next.document,
      revision: next.document?._rev,
      timestamp: next.document?._updatedAt ?? (/* @__PURE__ */ new Date()).toISOString()
    };
    let [document2] = Object.values(processMutations({
      documents: { [documentId]: documentState.remote },
      mutations: next.mutations,
      transactionId: next.transactionId,
      timestamp: next.timestamp
    })), { previousRev, transactionId, timestamp } = next;
    return {
      type: "mutation",
      documentId,
      document: document2 ?? null,
      revision: transactionId,
      timestamp,
      mutations: next.mutations,
      ...previousRev && { previousRev }
    };
  }));
};
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateMethodInitSpec(e, a) {
  _checkPrivateRedeclaration(e, a), a.add(e);
}
function _classPrivateFieldInitSpec(e, t, a) {
  _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _assertClassBrand(e, t, n) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw TypeError("Private element is not present on this object");
}
function _classPrivateFieldGet2(s, a) {
  return s.get(_assertClassBrand(s, a));
}
var _rootMap = /* @__PURE__ */ new WeakMap();
var _idCache = /* @__PURE__ */ new WeakMap();
var _MultiKeyWeakMap_brand = /* @__PURE__ */ new WeakSet();
var MultiKeyWeakMap = class {
  constructor() {
    _classPrivateMethodInitSpec(this, _MultiKeyWeakMap_brand), _classPrivateFieldInitSpec(this, _rootMap, /* @__PURE__ */ new WeakMap()), _classPrivateFieldInitSpec(this, _idCache, /* @__PURE__ */ new WeakMap());
  }
  /**
  * Retrieves the value associated with the array of keys.
  * The keys are de-duplicated and sorted so that the order does not matter.
  */
  get(keys) {
    let arrangedKeys = _assertClassBrand(_MultiKeyWeakMap_brand, this, _arrangeKeys).call(this, keys);
    return _assertClassBrand(_MultiKeyWeakMap_brand, this, _getDeep).call(this, arrangedKeys, _classPrivateFieldGet2(_rootMap, this));
  }
  /**
  * Associates the value with the given array of keys.
  */
  set(keys, value) {
    let arrangedKeys = _assertClassBrand(_MultiKeyWeakMap_brand, this, _arrangeKeys).call(this, keys);
    _assertClassBrand(_MultiKeyWeakMap_brand, this, _setDeep).call(this, arrangedKeys, _classPrivateFieldGet2(_rootMap, this), value);
  }
};
function _assignId(key) {
  var _MultiKeyWeakMap$glob;
  let cachedId = _classPrivateFieldGet2(_idCache, this).get(key);
  if (cachedId !== void 0) return cachedId;
  let id2 = _globalIdCounter._;
  return _classPrivateFieldGet2(_idCache, this).set(key, id2), _globalIdCounter._ = (_MultiKeyWeakMap$glob = _globalIdCounter._, _MultiKeyWeakMap$glob++, _MultiKeyWeakMap$glob), id2;
}
function _arrangeKeys(keys) {
  let keyed = Array.from(new Set(keys)).map((key) => [_assertClassBrand(_MultiKeyWeakMap_brand, this, _assignId).call(this, key), key]);
  return keyed.sort((a, b) => a[0] - b[0]), keyed.map(([, key]) => key);
}
function _getDeep(keys, map3) {
  if (keys.length === 0) return;
  let [firstKey, ...restKeys] = keys, node = map3.get(firstKey);
  if (node) return restKeys.length === 0 ? node.value : _assertClassBrand(_MultiKeyWeakMap_brand, this, _getDeep).call(this, restKeys, node.next);
}
function _setDeep(keys, map3, value) {
  if (keys.length === 0) return;
  let [firstKey, ...restKeys] = keys, node = map3.get(firstKey);
  node || (node = {
    value: void 0,
    next: /* @__PURE__ */ new WeakMap()
  }, map3.set(firstKey, node)), restKeys.length === 0 ? node.value = value : _assertClassBrand(_MultiKeyWeakMap_brand, this, _setDeep).call(this, restKeys, node.next, value);
}
var _globalIdCounter = { _: 0 };
function checkGrant(grantExpr, document2, identity2) {
  let value = evaluateQuerySync$1(grantExpr, {
    params: { document: document2 },
    identity: identity2
  });
  return value.type === "boolean" && value.data;
}
var ActionError = class extends Error {
  constructor(options) {
    super(options.message), _defineProperty(this, "documentId", void 0), _defineProperty(this, "transactionId", void 0), Object.assign(this, options);
  }
};
var PermissionActionError = class extends ActionError {
};
function createMutationApplier(options) {
  let { documentId, transactionId, timestamp, preserveOperations } = options;
  return (documents2, mutations, documentSetName) => {
    try {
      return processMutations({
        documents: documents2,
        transactionId,
        mutations,
        timestamp
      });
    } catch (error2) {
      throw preserveOperations ? new ActionError({
        documentId,
        transactionId,
        message: `Failed to apply patches to the ${documentSetName} document: ${error2 instanceof Error ? error2.message : "Unknown error"}`
      }) : error2;
    }
  };
}
function preserveNumericOperations(baseBefore, userPatches, diffedPatches) {
  if (!baseBefore || !userPatches?.length) return diffedPatches;
  let targets = /* @__PURE__ */ new Map();
  for (let patch of userPatches) for (let [op, sign] of [["inc", 1], ["dec", -1]]) {
    let record = patch[op];
    if (record) {
      for (let [pathExpression, amount] of Object.entries(record)) if (typeof amount == "number") for (let match2 of jsonMatch(baseBefore, pathExpression)) {
        let path = stringifyPath(match2.path), existing = targets.get(path);
        existing ? (existing.expectedValue += sign * amount, existing.delta += sign * amount) : typeof match2.value == "number" && targets.set(path, {
          baseValue: match2.value,
          expectedValue: match2.value + sign * amount,
          delta: sign * amount
        });
      }
    }
  }
  if (!targets.size) return diffedPatches;
  let preserved = /* @__PURE__ */ new Map(), next = diffedPatches.flatMap((patch) => {
    if (!patch.set) return [patch];
    let keptSet = {};
    for (let [path, value] of Object.entries(patch.set)) {
      let target = targets.get(path);
      target && typeof value == "number" && value === target.expectedValue ? preserved.set(path, {
        delta: target.delta,
        baseValue: target.baseValue
      }) : keptSet[path] = value;
    }
    if (Object.keys(keptSet).length === Object.keys(patch.set).length) return [patch];
    let { set: _set, ...rest } = patch, withKept = Object.keys(keptSet).length ? {
      ...rest,
      set: keptSet
    } : rest;
    return Object.keys(withKept).length ? [withKept] : [];
  });
  if (!preserved.size) return next;
  let setIfMissing4 = {}, inc3 = {}, dec4 = {};
  for (let [path, { delta: delta2, baseValue }] of preserved) setIfMissing4[path] = baseValue, delta2 >= 0 ? inc3[path] = delta2 : dec4[path] = -delta2;
  return [...next, {
    setIfMissing: setIfMissing4,
    ...Object.keys(inc3).length && { inc: inc3 },
    ...Object.keys(dec4).length && { dec: dec4 }
  }];
}
function applySingleDocPatch({ base: initialBase, working: initialWorking, documentId, patches, transactionId, timestamp, grants, identity: identity2, notFoundMessage = "Cannot edit document because it does not exist.", permissionMessage = `You do not have permission to edit document "${documentId}".`, preserveOperations }) {
  let base = initialBase, working = initialWorking, userPatches = patches?.map((patch) => ({ patch: {
    id: documentId,
    ...patch
  } }));
  if (!userPatches?.length) return {
    base,
    working,
    diffedPatches: [],
    workingMutations: []
  };
  if (!working[documentId] || !base[documentId]) throw new ActionError({
    documentId,
    transactionId,
    message: notFoundMessage
  });
  let applyMutations2 = createMutationApplier({
    documentId,
    transactionId,
    timestamp,
    preserveOperations
  }), baseBefore = base[documentId];
  base = applyMutations2(base, userPatches, "base");
  let baseAfter = base[documentId], diffedPatches = preserveOperations ? patches : preserveNumericOperations(baseBefore, patches, diffValue(baseBefore, baseAfter)), workingBefore = working[documentId];
  if (!checkGrant(grants.update, workingBefore, identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: permissionMessage
  });
  let workingMutations = diffedPatches.map((patch) => ({ patch: {
    id: documentId,
    ...patch
  } }));
  return working = applyMutations2(working, workingMutations, "working"), {
    base,
    working,
    diffedPatches,
    workingMutations
  };
}
function createGrantsLookup(datasetAcl) {
  let filtersByGrant = {
    create: /* @__PURE__ */ new Set(),
    history: /* @__PURE__ */ new Set(),
    read: /* @__PURE__ */ new Set(),
    update: /* @__PURE__ */ new Set()
  };
  for (let entry of datasetAcl) for (let grant of entry.permissions) {
    let set4 = filtersByGrant[grant];
    set4 && (set4.add(entry.filter), filtersByGrant[grant] = set4);
  }
  return Object.fromEntries(Object.entries(filtersByGrant).map(([grant, filters]) => {
    let combinedFilter = Array.from(filters).map((i) => `(${i})`).join("||");
    return combinedFilter ? [grant, parse6(`$document {"_": ${combinedFilter}}._`)] : [grant, parse6("false")];
  }));
}
var documentsCache = new MultiKeyWeakMap();
var actionsCache = /* @__PURE__ */ new WeakMap();
var nullReplacer = {};
var documentsSelector = createSelector([({ state: { documentStates } }) => documentStates, (_context, { actions }) => actions], (documentStates, actions) => {
  let documentIds = new Set(actions.map((action) => {
    if (typeof action.documentId != "string") return [];
    if (action.liveEdit) return [action.documentId];
    let ids = [getPublishedId(DocumentId(action.documentId)), getDraftId(DocumentId(action.documentId))];
    return isReleasePerspective(action.perspective) && ids.push(getVersionId(DocumentId(action.documentId), action.perspective.releaseName)), ids;
  }).flat()), documents2 = {};
  for (let documentId of documentIds) {
    let local = documentStates[documentId]?.local;
    if (local === void 0) return;
    documents2[documentId] = local;
  }
  let keys = Object.values(documents2).map((doc) => doc === null ? nullReplacer : doc);
  return documentsCache.get(keys) || (documentsCache.set(keys, documents2), documents2);
});
var memoizedActionsSelector = createSelector([documentsSelector, (_state, { actions }) => actions], (documents2, actions) => {
  if (!documents2) return;
  let nestedCache = actionsCache.get(documents2);
  nestedCache || (nestedCache = /* @__PURE__ */ new Map(), actionsCache.set(documents2, nestedCache));
  let normalizedActions = Array.isArray(actions) ? actions : [actions], actionsKey = JSON.stringify(normalizedActions);
  return nestedCache.get(actionsKey) || (nestedCache.set(actionsKey, normalizedActions), normalizedActions);
});
var enNarrowConjunction = new Intl.ListFormat("en", {
  style: "narrow",
  type: "conjunction"
});
function calculatePermissions(...args) {
  return _calculatePermissions(...args);
}
var _calculatePermissions = createSelector([
  ({ state: { grants } }) => grants,
  ({ state: { identity: identity2 } }) => identity2,
  documentsSelector,
  memoizedActionsSelector
], (grants, identity2, documents2, actions) => {
  if (!documents2 || !grants || !actions) return;
  let timestamp = (/* @__PURE__ */ new Date()).toISOString(), reasons = [];
  try {
    processActions({
      actions,
      transactionId: randomId(16),
      working: documents2,
      base: documents2,
      timestamp,
      grants,
      identity: identity2
    });
  } catch (error2) {
    if (error2 instanceof PermissionActionError) reasons.push({
      message: error2.message,
      documentId: error2.documentId,
      type: "access"
    });
    else if (error2 instanceof ActionError) reasons.push({
      message: error2.message,
      documentId: error2.documentId,
      type: "precondition"
    });
    else throw error2;
  }
  for (let action of actions) if (action.type === "document.edit" && !action.patches?.length) {
    let docId = action.documentId, doc;
    doc = action.liveEdit ? documents2[docId] : isReleasePerspective(action.perspective) ? documents2[getVersionId(DocumentId(docId), action.perspective.releaseName)] : documents2[getDraftId(DocumentId(docId))] ?? documents2[getPublishedId(DocumentId(docId))], doc ? checkGrant(grants.update, doc, identity2) || reasons.push({
      type: "access",
      message: `You are not allowed to edit the document with ID "${docId}".`,
      documentId: docId
    }) : isReleasePerspective(action.perspective) ? reasons.push({
      type: "precondition",
      message: `The version document with ID "${docId}" could not be found. Please create it or add it to the release first.`,
      documentId: docId
    }) : reasons.push({
      type: "precondition",
      message: `The document with ID "${docId}" could not be found. Please check that it exists before editing.`,
      documentId: docId
    });
  }
  let allowed = reasons.length === 0;
  if (allowed) return { allowed };
  let sortedReasons = reasons.map((reason, index2) => ({
    ...reason,
    index: index2
  })).sort((a, b) => a.type === b.type ? a.message.localeCompare(b.message, "en-US") : a.type === "access" ? -1 : 1).map(({ index: _index, ...reason }) => reason);
  return {
    allowed,
    reasons: sortedReasons,
    message: enNarrowConjunction.format(sortedReasons.map((i) => i.message))
  };
});
function handleCreate(action, ctx) {
  let { transactionId, timestamp, grants, identity: identity2, outgoingActions, outgoingMutations } = ctx, { base, working } = ctx, documentId = getId(action.documentId);
  if (action.liveEdit) {
    if (working[documentId]) throw new ActionError({
      documentId,
      transactionId,
      message: "This document already exists."
    });
    let newDocBase2 = {
      _type: action.documentType,
      _id: documentId,
      ...action.initialValue
    }, mutations2 = [{ create: {
      _type: action.documentType,
      _id: documentId,
      ...action.initialValue
    } }];
    if (base = processMutations({
      documents: base,
      transactionId,
      mutations: [{ create: newDocBase2 }],
      timestamp
    }), working = processMutations({
      documents: working,
      transactionId,
      mutations: mutations2,
      timestamp
    }), !checkGrant(grants.create, working[documentId], identity2)) throw new PermissionActionError({
      documentId,
      transactionId,
      message: `You do not have permission to create document "${documentId}".`
    });
    return outgoingMutations.push(...mutations2), {
      base,
      working
    };
  }
  let versionId = isReleasePerspective(action.perspective) ? getVersionId(DocumentId(documentId), action.perspective.releaseName) : void 0, draftId = getDraftId(DocumentId(documentId)), publishedId = getPublishedId(DocumentId(documentId));
  if (versionId ? working[versionId] : working[draftId]) {
    let errorDocType = versionId ? "release version" : "draft";
    throw new ActionError({
      documentId,
      transactionId,
      message: `A ${errorDocType} of this document already exists. Please use or discard the existing ${errorDocType} before creating a new one.`
    });
  }
  let newDocBase = {
    ...base[draftId] ?? base[publishedId],
    _type: action.documentType,
    _id: versionId ?? draftId,
    ...action.initialValue
  }, newDocWorking = {
    ...working[draftId] ?? working[publishedId],
    _type: action.documentType,
    _id: versionId ?? draftId,
    ...action.initialValue
  }, mutations = [{ create: newDocWorking }];
  if (base = processMutations({
    documents: base,
    transactionId,
    mutations: [{ create: newDocBase }],
    timestamp
  }), working = processMutations({
    documents: working,
    transactionId,
    mutations,
    timestamp
  }), versionId && !checkGrant(grants.create, working[versionId], identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: `You do not have permission to create a release version for document "${documentId}".`
  });
  if (!versionId && !checkGrant(grants.create, working[draftId], identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: `You do not have permission to create a draft for document "${documentId}".`
  });
  return outgoingMutations.push(...mutations), outgoingActions.push({
    actionType: "sanity.action.document.version.create",
    publishedId,
    attributes: newDocWorking
  }), {
    base,
    working
  };
}
function handleDelete(action, ctx) {
  let { transactionId, timestamp, grants, identity: identity2, outgoingActions, outgoingMutations } = ctx, { base, working } = ctx, documentId = action.documentId;
  if (isReleasePerspective(action.perspective)) throw new ActionError({
    documentId,
    transactionId,
    message: 'Cannot delete a version document. You may want to use the "unpublish" or "discard" actions instead.'
  });
  if (action.liveEdit) {
    if (!working[documentId]) throw new ActionError({
      documentId,
      transactionId,
      message: "The document you are trying to delete does not exist."
    });
    if (!checkGrant(grants.update, working[documentId], identity2)) throw new PermissionActionError({
      documentId,
      transactionId,
      message: "You do not have permission to delete this document."
    });
    let mutations2 = [{ delete: { id: documentId } }];
    return base = processMutations({
      documents: base,
      transactionId,
      mutations: mutations2,
      timestamp
    }), working = processMutations({
      documents: working,
      transactionId,
      mutations: mutations2,
      timestamp
    }), outgoingMutations.push(...mutations2), {
      base,
      working
    };
  }
  let draftId = getDraftId(DocumentId(documentId)), publishedId = getPublishedId(DocumentId(documentId));
  if (!working[publishedId]) throw new ActionError({
    documentId,
    transactionId,
    message: working[draftId] ? "Cannot delete a document without a published version." : "The document you are trying to delete does not exist."
  });
  let cantDeleteDraft = working[draftId] && !checkGrant(grants.update, working[draftId], identity2), cantDeletePublished = working[publishedId] && !checkGrant(grants.update, working[publishedId], identity2);
  if (cantDeleteDraft || cantDeletePublished) throw new PermissionActionError({
    documentId,
    transactionId,
    message: "You do not have permission to delete this document."
  });
  let mutations = [{ delete: { id: publishedId } }, { delete: { id: draftId } }], includeDrafts = working[draftId] ? [draftId] : void 0;
  return base = processMutations({
    documents: base,
    transactionId,
    mutations,
    timestamp
  }), working = processMutations({
    documents: working,
    transactionId,
    mutations,
    timestamp
  }), outgoingMutations.push(...mutations), outgoingActions.push({
    actionType: "sanity.action.document.delete",
    publishedId,
    ...includeDrafts ? { includeDrafts } : {}
  }), {
    base,
    working
  };
}
function handleDiscard(action, ctx) {
  let { transactionId, timestamp, grants, identity: identity2, outgoingActions, outgoingMutations } = ctx, { base, working } = ctx, documentId = getId(action.documentId);
  if (action.liveEdit) throw new ActionError({
    documentId,
    transactionId,
    message: `Cannot discard changes for liveEdit document "${documentId}". LiveEdit documents do not support drafts.`
  });
  let versionId = isReleasePerspective(action.perspective) ? getVersionId(DocumentId(documentId), action.perspective.releaseName) : getDraftId(DocumentId(documentId)), mutations = [{ delete: { id: versionId } }];
  if (!working[versionId]) throw new ActionError({
    documentId,
    transactionId,
    message: `There is no draft or version available to discard for document "${documentId}".`
  });
  if (!checkGrant(grants.update, working[versionId], identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: `You do not have permission to discard changes for document "${documentId}".`
  });
  return base = processMutations({
    documents: base,
    transactionId,
    mutations,
    timestamp
  }), working = processMutations({
    documents: working,
    transactionId,
    mutations,
    timestamp
  }), outgoingMutations.push(...mutations), outgoingActions.push({
    actionType: "sanity.action.document.version.discard",
    versionId
  }), {
    base,
    working
  };
}
function handleEdit(action, ctx) {
  let { transactionId, timestamp, grants, identity: identity2, outgoingActions, outgoingMutations } = ctx, { base, working } = ctx, documentId = getId(action.documentId);
  if (action.liveEdit) {
    let result = applySingleDocPatch({
      base,
      working,
      documentId,
      patches: action.patches,
      transactionId,
      timestamp,
      grants,
      identity: identity2,
      preserveOperations: action.preserveOperations
    });
    return outgoingMutations.push(...result.workingMutations), {
      base: result.base,
      working: result.working
    };
  }
  let versionId = isReleasePerspective(action.perspective) ? getVersionId(DocumentId(documentId), action.perspective.releaseName) : void 0, draftId = getDraftId(DocumentId(documentId)), publishedId = getPublishedId(DocumentId(documentId)), patchDocumentId = isReleasePerspective(action.perspective) ? versionId : draftId, userPatches = action.patches?.map((patch) => ({ patch: {
    id: patchDocumentId,
    ...patch
  } }));
  if (!userPatches?.length) return {
    base,
    working
  };
  if (isReleasePerspective(action.perspective)) {
    if (!working[versionId] && !base[versionId]) throw new ActionError({
      documentId,
      transactionId,
      message: "This document does not exist in the release. Please create it or add it to the release first."
    });
  } else if (!working[draftId] && !working[publishedId] || !base[draftId] && !base[publishedId]) throw new ActionError({
    documentId,
    transactionId,
    message: "Cannot edit document because it does not exist in draft or published form."
  });
  let applyMutations2 = createMutationApplier({
    documentId,
    transactionId,
    timestamp,
    preserveOperations: action.preserveOperations
  }), baseMutations = [];
  !isReleasePerspective(action.perspective) && !base[draftId] && base[publishedId] && baseMutations.push({ create: {
    ...base[publishedId],
    _id: draftId
  } });
  let baseBefore = base[patchDocumentId] ?? base[publishedId];
  userPatches && baseMutations.push(...userPatches), base = applyMutations2(base, baseMutations, "base");
  let baseAfter = base[patchDocumentId], patches = action.preserveOperations ? action.patches ?? [] : preserveNumericOperations(baseBefore, action.patches, diffValue(baseBefore, baseAfter)), workingMutations = [];
  if (!isReleasePerspective(action.perspective) && !working[draftId] && working[publishedId]) {
    let newDraftFromPublished = {
      ...working[publishedId],
      _id: draftId
    };
    if (!checkGrant(grants.create, newDraftFromPublished, identity2)) throw new PermissionActionError({
      documentId,
      transactionId,
      message: "You do not have permission to create a draft for editing this document."
    });
    workingMutations.push({ create: newDraftFromPublished });
  }
  let workingBefore = working[patchDocumentId] ?? working[publishedId];
  if (!checkGrant(grants.update, workingBefore, identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: `You do not have permission to edit document "${documentId}".`
  });
  return workingMutations.push(...patches.map((patch) => ({ patch: {
    id: patchDocumentId,
    ...patch
  } }))), working = applyMutations2(working, workingMutations, "working"), outgoingMutations.push(...workingMutations), outgoingActions.push(...patches.map((patch) => ({
    actionType: "sanity.action.document.edit",
    draftId: patchDocumentId,
    publishedId,
    patch
  }))), {
    base,
    working
  };
}
function handlePublish(action, ctx) {
  let { transactionId, timestamp, grants, identity: identity2, outgoingActions, outgoingMutations } = ctx, { base, working } = ctx, documentId = getId(action.documentId);
  if (action.liveEdit || isReleasePerspective(action.perspective)) throw new ActionError({
    documentId,
    transactionId,
    message: "Cannot publish this document. Publishing is not supported for liveEdit or version (release) documents."
  });
  let draftId = getDraftId(DocumentId(documentId)), publishedId = getPublishedId(DocumentId(documentId)), workingDraft = working[draftId], baseDraft = base[draftId];
  if (!workingDraft || !baseDraft) throw new ActionError({
    documentId,
    transactionId,
    message: `Cannot publish because no draft version was found for document "${documentId}".`
  });
  if (!isDeepEqual(workingDraft, baseDraft)) throw new ActionError({
    documentId,
    transactionId,
    message: "Publish aborted: The document has changed elsewhere. Please try again."
  });
  let newPublishedFromDraft = {
    ...strengthenOnPublish(workingDraft),
    _id: publishedId
  }, mutations = [{ delete: { id: draftId } }, { createOrReplace: newPublishedFromDraft }];
  if (working[draftId] && !checkGrant(grants.update, working[draftId], identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: `Publish failed: You do not have permission to update the draft for "${documentId}".`
  });
  if (working[publishedId] && !checkGrant(grants.update, newPublishedFromDraft, identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: `Publish failed: You do not have permission to update the published version of "${documentId}".`
  });
  if (!working[publishedId] && !checkGrant(grants.create, newPublishedFromDraft, identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: `Publish failed: You do not have permission to publish a new version of "${documentId}".`
  });
  return base = processMutations({
    documents: base,
    transactionId,
    mutations,
    timestamp
  }), working = processMutations({
    documents: working,
    transactionId,
    mutations,
    timestamp
  }), outgoingMutations.push(...mutations), outgoingActions.push({
    actionType: "sanity.action.document.publish",
    draftId,
    publishedId
  }), {
    base,
    working
  };
}
function strengthenOnPublish(draft) {
  let isStrengthenReference = (value) => "_strengthenOnPublish" in value;
  function strengthen(value) {
    if (typeof value != "object" || !value) return value;
    if (isStrengthenReference(value)) {
      let { _strengthenOnPublish, _weak, ...rest } = value;
      return {
        ...rest,
        ..._strengthenOnPublish.weak && { _weak: true }
      };
    }
    return Array.isArray(value) ? value.map(strengthen) : Object.fromEntries(Object.entries(value).map(([k, v]) => [k, strengthen(v)]));
  }
  return strengthen(draft);
}
function handleReleaseArchive(action, ctx) {
  let { base, working, grants, outgoingActions, transactionId, identity: identity2 } = ctx, releaseDocumentId = getReleaseDocumentId(action.releaseId), existing = working[releaseDocumentId] ?? base[releaseDocumentId];
  if (!existing) throw new ActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `Cannot archive release "${action.releaseId}" because it does not exist.`
  });
  if (!checkGrant(grants.update, existing, identity2)) throw new PermissionActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `You do not have permission to archive release "${action.releaseId}".`
  });
  return outgoingActions.push({
    actionType: "sanity.action.release.archive",
    releaseId: action.releaseId
  }), {
    base,
    working
  };
}
function handleReleaseUnarchive(action, ctx) {
  let { base, working, grants, outgoingActions, transactionId, identity: identity2 } = ctx, releaseDocumentId = getReleaseDocumentId(action.releaseId), existing = working[releaseDocumentId] ?? base[releaseDocumentId];
  if (!existing) throw new ActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `Cannot unarchive release "${action.releaseId}" because it does not exist.`
  });
  if (!checkGrant(grants.update, existing, identity2)) throw new PermissionActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `You do not have permission to unarchive release "${action.releaseId}".`
  });
  return outgoingActions.push({
    actionType: "sanity.action.release.unarchive",
    releaseId: action.releaseId
  }), {
    base,
    working
  };
}
function handleReleaseCreate(action, ctx) {
  let { transactionId, timestamp, grants, outgoingActions, outgoingMutations, identity: identity2 } = ctx, { base, working } = ctx, releaseDocumentId = getReleaseDocumentId(action.releaseId);
  if (working[releaseDocumentId] || base[releaseDocumentId]) throw new ActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `A release with id "${action.releaseId}" already exists.`
  });
  let mutations = [{ create: {
    _id: releaseDocumentId,
    _type: "system.release",
    name: action.releaseId,
    state: "active",
    metadata: action.metadata
  } }];
  if (base = processMutations({
    documents: base,
    transactionId,
    mutations,
    timestamp
  }), working = processMutations({
    documents: working,
    transactionId,
    mutations,
    timestamp
  }), !checkGrant(grants.create, working[releaseDocumentId], identity2)) throw new PermissionActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `You do not have permission to create release "${action.releaseId}".`
  });
  return outgoingMutations.push(...mutations), outgoingActions.push({
    actionType: "sanity.action.release.create",
    releaseId: action.releaseId,
    metadata: action.metadata
  }), {
    base,
    working
  };
}
var DELETABLE_STATES = /* @__PURE__ */ new Set(["archived", "published"]);
function handleReleaseDelete(action, ctx) {
  let { transactionId, timestamp, grants, outgoingActions, outgoingMutations, identity: identity2 } = ctx, { base, working } = ctx, releaseDocumentId = getReleaseDocumentId(action.releaseId), existing = working[releaseDocumentId] ?? base[releaseDocumentId];
  if (!existing) throw new ActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `Cannot delete release "${action.releaseId}" because it does not exist.`
  });
  let state = existing.state;
  if (state && typeof state == "string" && !DELETABLE_STATES.has(state)) throw new ActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `Cannot delete release "${action.releaseId}" while it is "${state}". Archive it first.`
  });
  if (!checkGrant(grants.update, existing, identity2)) throw new PermissionActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `You do not have permission to delete release "${action.releaseId}".`
  });
  let mutations = [{ delete: { id: releaseDocumentId } }];
  return base = processMutations({
    documents: base,
    transactionId,
    mutations,
    timestamp
  }), working = processMutations({
    documents: working,
    transactionId,
    mutations,
    timestamp
  }), outgoingMutations.push(...mutations), outgoingActions.push({
    actionType: "sanity.action.release.delete",
    releaseId: action.releaseId
  }), {
    base,
    working
  };
}
function handleReleaseEdit(action, ctx) {
  let { transactionId, timestamp, grants, outgoingActions, outgoingMutations, identity: identity2 } = ctx, { base, working } = ctx, result = applySingleDocPatch({
    base,
    working,
    documentId: getReleaseDocumentId(action.releaseId),
    patches: [action.patch],
    transactionId,
    timestamp,
    grants,
    identity: identity2,
    notFoundMessage: `Cannot edit release "${action.releaseId}" because it does not exist.`,
    permissionMessage: `You do not have permission to edit release "${action.releaseId}".`
  });
  return outgoingMutations.push(...result.workingMutations), outgoingActions.push(...result.diffedPatches.map((patch) => ({
    actionType: "sanity.action.release.edit",
    releaseId: action.releaseId,
    patch
  }))), {
    base: result.base,
    working: result.working
  };
}
function handleReleasePublish(action, ctx) {
  let { base, working, grants, outgoingActions, transactionId, identity: identity2 } = ctx, releaseDocumentId = getReleaseDocumentId(action.releaseId), existing = working[releaseDocumentId] ?? base[releaseDocumentId];
  if (!existing) throw new ActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `Cannot publish release "${action.releaseId}" because it does not exist.`
  });
  if (!checkGrant(grants.update, existing, identity2)) throw new PermissionActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `You do not have permission to publish release "${action.releaseId}".`
  });
  return outgoingActions.push({
    actionType: "sanity.action.release.publish",
    releaseId: action.releaseId
  }), {
    base,
    working
  };
}
function handleReleaseSchedule(action, ctx) {
  let { base, working, grants, outgoingActions, transactionId, identity: identity2 } = ctx, releaseDocumentId = getReleaseDocumentId(action.releaseId);
  if (Number.isNaN(Date.parse(action.publishAt))) throw new ActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `Cannot schedule release "${action.releaseId}": "publishAt" must be a valid ISO 8601 timestamp (received "${action.publishAt}").`
  });
  let existing = working[releaseDocumentId] ?? base[releaseDocumentId];
  if (!existing) throw new ActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `Cannot schedule release "${action.releaseId}" because it does not exist.`
  });
  if (!checkGrant(grants.update, existing, identity2)) throw new PermissionActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `You do not have permission to schedule release "${action.releaseId}".`
  });
  return outgoingActions.push({
    actionType: "sanity.action.release.schedule",
    releaseId: action.releaseId,
    publishAt: action.publishAt
  }), {
    base,
    working
  };
}
function handleReleaseUnschedule(action, ctx) {
  let { base, working, grants, outgoingActions, transactionId, identity: identity2 } = ctx, releaseDocumentId = getReleaseDocumentId(action.releaseId), existing = working[releaseDocumentId] ?? base[releaseDocumentId];
  if (!existing) throw new ActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `Cannot unschedule release "${action.releaseId}" because it does not exist.`
  });
  if (!checkGrant(grants.update, existing, identity2)) throw new PermissionActionError({
    documentId: releaseDocumentId,
    transactionId,
    message: `You do not have permission to unschedule release "${action.releaseId}".`
  });
  return outgoingActions.push({
    actionType: "sanity.action.release.unschedule",
    releaseId: action.releaseId
  }), {
    base,
    working
  };
}
function handleUnpublish(action, ctx) {
  let { transactionId, timestamp, grants, identity: identity2, outgoingActions, outgoingMutations } = ctx, { base, working } = ctx, documentId = getId(action.documentId);
  if (action.liveEdit || isReleasePerspective(action.perspective)) throw new ActionError({
    documentId,
    transactionId,
    message: "Cannot unpublish this document. Unpublishing is not supported for liveEdit or version (release) documents."
  });
  let draftId = getDraftId(DocumentId(documentId)), publishedId = getPublishedId(DocumentId(documentId));
  if (!working[publishedId] && !base[publishedId]) throw new ActionError({
    documentId,
    transactionId,
    message: `Cannot unpublish because the document "${documentId}" is not currently published.`
  });
  let sourceDoc = working[publishedId] ?? base[publishedId], newDraftFromPublished = {
    ...sourceDoc,
    _id: draftId
  }, mutations = [{ delete: { id: publishedId } }, { createIfNotExists: newDraftFromPublished }];
  if (!checkGrant(grants.update, sourceDoc, identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: `You do not have permission to unpublish the document "${documentId}".`
  });
  if (!working[draftId] && !checkGrant(grants.create, newDraftFromPublished, identity2)) throw new PermissionActionError({
    documentId,
    transactionId,
    message: `You do not have permission to create a draft from the published version of "${documentId}".`
  });
  return base = processMutations({
    documents: base,
    transactionId,
    mutations: [{ delete: { id: publishedId } }, { createIfNotExists: {
      ...base[publishedId] ?? sourceDoc,
      _id: draftId
    } }],
    timestamp
  }), working = processMutations({
    documents: working,
    transactionId,
    mutations,
    timestamp
  }), outgoingMutations.push(...mutations), outgoingActions.push({
    actionType: "sanity.action.document.unpublish",
    draftId,
    publishedId
  }), {
    base,
    working
  };
}
function processActions({ actions, transactionId, working: initialWorking, base: initialBase, timestamp, grants, identity: identity2 }) {
  let base = { ...initialBase }, working = { ...initialWorking }, outgoingActions = [], outgoingMutations = [], liveEditAction = actions.find((action) => !isReleaseAction(action) && action.liveEdit), otherAction = actions.find((action) => isReleaseAction(action) || !action.liveEdit);
  if (liveEditAction && otherAction) throw new ActionError({
    documentId: liveEditAction.documentId,
    transactionId,
    message: "Cannot combine liveEdit document actions with other actions in the same transaction. Submit them as separate transactions."
  });
  for (let action of actions) {
    let result = dispatch(action, {
      base,
      working,
      transactionId,
      timestamp,
      grants,
      identity: identity2,
      outgoingActions,
      outgoingMutations
    });
    base = result.base, working = result.working;
  }
  let previousRevs = Object.fromEntries(Object.entries(initialWorking).map(([id2, doc]) => [id2, doc?._rev]));
  return {
    working,
    outgoingActions,
    outgoingMutations,
    previous: initialWorking,
    previousRevs
  };
}
function dispatch(action, ctx) {
  switch (action.type) {
    case "document.create":
      return handleCreate(action, ctx);
    case "document.delete":
      return handleDelete(action, ctx);
    case "document.discard":
      return handleDiscard(action, ctx);
    case "document.edit":
      return handleEdit(action, ctx);
    case "document.publish":
      return handlePublish(action, ctx);
    case "document.unpublish":
      return handleUnpublish(action, ctx);
    case "release.create":
      return handleReleaseCreate(action, ctx);
    case "release.edit":
      return handleReleaseEdit(action, ctx);
    case "release.publish":
      return handleReleasePublish(action, ctx);
    case "release.schedule":
      return handleReleaseSchedule(action, ctx);
    case "release.unschedule":
      return handleReleaseUnschedule(action, ctx);
    case "release.archive":
      return handleReleaseArchive(action, ctx);
    case "release.unarchive":
      return handleReleaseUnarchive(action, ctx);
    case "release.delete":
      return handleReleaseDelete(action, ctx);
    default:
      throw Error(`Unknown action type: "${action.type}". Please contact support if this issue persists.`);
  }
}
var EMPTY_REVISIONS = {};
function queueTransaction(prev, transaction) {
  let { transactionId, actions } = transaction;
  return {
    ...getDocumentIdsFromHandleLikes(actions).reduce((acc, id2) => addSubscriptionIdToDocument(acc, id2, transactionId), prev),
    queued: [...prev.queued, transaction]
  };
}
function removeQueuedTransaction(prev, transactionId) {
  let transaction = prev.queued.find((t) => t.transactionId === transactionId);
  return transaction ? {
    ...getDocumentIdsFromHandleLikes(transaction.actions).reduce((acc, id2) => removeSubscriptionIdFromDocument(acc, id2, transactionId), prev),
    queued: prev.queued.filter((t) => transactionId !== t.transactionId)
  } : prev;
}
function applyFirstQueuedTransaction(prev) {
  let queued = prev.queued.at(0);
  if (!queued || !prev.grants) return prev;
  let ids = getDocumentIdsFromHandleLikes(queued.actions);
  if (ids.some((id2) => prev.documentStates[id2]?.local === void 0)) return prev;
  let working = ids.reduce((acc, id2) => (acc[id2] = prev.documentStates[id2]?.local, acc), {}), timestamp = (/* @__PURE__ */ new Date()).toISOString(), result = processActions({
    ...queued,
    working,
    base: working,
    timestamp,
    grants: prev.grants,
    identity: prev.identity
  }), applied = {
    ...queued,
    ...result,
    base: result.previous,
    timestamp
  };
  return {
    ...prev,
    applied: [...prev.applied, applied],
    queued: prev.queued.filter((t) => t.transactionId !== queued.transactionId),
    documentStates: Object.entries(result.working).reduce((acc, [id2, next]) => {
      let prevDoc = acc[id2];
      return prevDoc && (acc[id2] = {
        ...prevDoc,
        local: next
      }), acc;
    }, { ...prev.documentStates })
  };
}
function batchAppliedTransactions([curr, ...rest]) {
  if (!curr) return;
  if (!curr.actions.length) return batchAppliedTransactions(rest);
  if (curr.actions.length > 1) return {
    ...curr,
    disableBatching: true,
    batchedTransactionIds: [curr.transactionId]
  };
  let [action] = curr.actions;
  if (action.type !== "document.edit" || curr.disableBatching) return {
    ...curr,
    disableBatching: true,
    batchedTransactionIds: [curr.transactionId]
  };
  let editAction = {
    ...curr,
    actions: [action],
    disableBatching: false,
    batchedTransactionIds: [curr.transactionId]
  };
  if (!rest.length) return editAction;
  let next = batchAppliedTransactions(rest);
  if (!next) return;
  if (next.disableBatching) return editAction;
  let nextFirst = next.actions[0], nextLiveEdit = nextFirst && "liveEdit" in nextFirst ? nextFirst.liveEdit : false;
  return !!action.liveEdit == !!nextLiveEdit ? {
    disableBatching: false,
    transactionId: next.transactionId,
    actions: [action, ...next.actions],
    outgoingActions: [...curr.outgoingActions, ...next.outgoingActions],
    batchedTransactionIds: [curr.transactionId, ...next.batchedTransactionIds],
    outgoingMutations: [...curr.outgoingMutations, ...next.outgoingMutations],
    working: {
      ...curr.working,
      ...next.working
    },
    previousRevs: {
      ...next.previousRevs,
      ...curr.previousRevs
    },
    previous: {
      ...next.previous,
      ...curr.previous
    },
    base: {
      ...next.base,
      ...curr.base
    },
    timestamp: curr.timestamp ?? next.timestamp
  } : editAction;
}
function transitionAppliedTransactionsToOutgoing(prev) {
  if (prev.outgoing) return prev;
  let transaction = batchAppliedTransactions(prev.applied);
  if (!transaction) return prev;
  let { transactionId, previousRevs, working, batchedTransactionIds: consumedTransactions } = transaction, timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return {
    ...prev,
    outgoing: transaction,
    applied: prev.applied.filter((i) => !consumedTransactions.includes(i.transactionId)),
    documentStates: Object.entries(previousRevs).reduce((acc, [documentId, previousRev]) => {
      if (working[documentId]?._rev === previousRev) return acc;
      let documentState = prev.documentStates[documentId];
      return documentState && (acc[documentId] = {
        ...documentState,
        unverifiedRevisions: {
          ...documentState.unverifiedRevisions,
          [transactionId]: {
            documentId,
            previousRev,
            transactionId,
            timestamp
          }
        },
        recentOwnTransactionIds: [...(documentState.recentOwnTransactionIds ?? []).slice(-49), transactionId]
      }), acc;
    }, { ...prev.documentStates })
  };
}
function cleanupOutgoingTransaction(prev) {
  let { outgoing } = prev;
  if (!outgoing) return prev;
  let next = prev, ids = getDocumentIdsFromHandleLikes(outgoing.actions);
  for (let transactionId of outgoing.batchedTransactionIds) for (let documentId of ids) next = removeSubscriptionIdFromDocument(next, documentId, transactionId);
  return {
    ...next,
    outgoing: void 0,
    documentStates: evictOrphanedDocumentStates(next.documentStates)
  };
}
function revertOutgoingTransaction(prev) {
  if (!prev.grants) return prev;
  let base = prev;
  if (prev.outgoing) {
    let ids = getDocumentIdsFromHandleLikes(prev.outgoing.actions);
    for (let transactionId of prev.outgoing.batchedTransactionIds) for (let documentId of ids) base = removeSubscriptionIdFromDocument(base, documentId, transactionId);
  }
  let working = Object.fromEntries(Object.entries(base.documentStates).map(([documentId, documentState]) => [documentId, documentState?.remote])), nextApplied = [];
  for (let t of prev.applied) try {
    let next = processActions({
      ...t,
      working,
      grants: prev.grants,
      identity: prev.identity
    });
    working = next.working, nextApplied.push({
      ...t,
      ...next
    });
  } catch (error2) {
    if (error2 instanceof ActionError) continue;
    throw error2;
  }
  return {
    ...base,
    applied: nextApplied,
    outgoing: void 0,
    documentStates: evictOrphanedDocumentStates(Object.fromEntries(Object.entries(base.documentStates).filter((e) => !!e[1]).map(([documentId, documentState]) => {
      let { unverifiedRevisions = {} } = documentState, next = {
        ...documentState,
        unverifiedRevisions: prev.outgoing && prev.outgoing.transactionId in unverifiedRevisions ? omitProperty(unverifiedRevisions, prev.outgoing.transactionId) : unverifiedRevisions
      };
      return !next.subscriptions.length && isAwaitingOwnEcho(next) ? [documentId, next] : [documentId, {
        ...next,
        local: documentId in working ? working[documentId] : next.local
      }];
    })))
  };
}
function extractPatchOperations(mutations, documentId) {
  return mutations ? mutations.flatMap((mutation) => {
    if (!("patch" in mutation) || !mutation.patch) return [];
    let { id: id2, ...operations2 } = mutation.patch;
    return id2 === documentId ? [operations2] : [];
  }) : [];
}
function applyRemoteDocument(prev, { document: document2, documentId, previousRev, revision, timestamp, type, mutations }, events) {
  if (!prev.grants) return prev;
  let prevDocState = prev.documentStates[documentId];
  if (!prevDocState) return prev;
  let prevUnverifiedRevisions = prevDocState.unverifiedRevisions, revisionToVerify = revision ? prevUnverifiedRevisions?.[revision] : void 0, unverifiedRevisions = prevUnverifiedRevisions ?? EMPTY_REVISIONS;
  if (revision && revisionToVerify && (unverifiedRevisions = omitProperty(prevUnverifiedRevisions, revision)), type === "mutation" && revision) {
    let patches = extractPatchOperations(mutations, documentId);
    if (patches.length) {
      let isOwnTransaction = !!revisionToVerify || (prevDocState.recentOwnTransactionIds?.includes(revision) ?? false);
      events.next({
        type: "remote-patches",
        documentId,
        transactionId: revision,
        previousRev,
        timestamp,
        patches,
        origin: isOwnTransaction ? "local" : "remote"
      });
    }
  }
  if (type === "sync" && (unverifiedRevisions = Object.fromEntries(Object.entries(unverifiedRevisions).filter(([, unverifiedRevision]) => unverifiedRevision ? new Date(timestamp).getTime() <= new Date(unverifiedRevision.timestamp).getTime() : false))), revisionToVerify && revisionToVerify.previousRev === previousRev) {
    let modifiesDocument = (transaction) => transaction.working[documentId]?._rev !== transaction.previousRevs[documentId], local2 = !prev.applied.some(modifiesDocument) && (!prev.outgoing || prev.outgoing.transactionId === revision || !modifiesDocument(prev.outgoing)) && !isDeepEqual(prevDocState.local, document2) ? document2 : prevDocState.local;
    return {
      ...prev,
      documentStates: evictOrphanedDocumentStates({
        ...prev.documentStates,
        [documentId]: {
          ...prevDocState,
          remote: document2,
          remoteRev: revision,
          local: local2,
          unverifiedRevisions
        }
      })
    };
  }
  let working = {
    ...prev.applied.at(0)?.previous,
    [documentId]: document2
  }, nextApplied = [];
  for (let curr of prev.applied) try {
    let next = processActions({
      ...curr,
      working,
      grants: prev.grants,
      identity: prev.identity
    });
    working = next.working, nextApplied.push({
      ...curr,
      ...next
    });
  } catch (error2) {
    if (error2 instanceof ActionError) {
      events.next({
        type: "rebase-error",
        transactionId: error2.transactionId,
        documentId: error2.documentId,
        message: error2.message,
        error: error2
      });
      continue;
    }
    throw error2;
  }
  let nextLocal = working[documentId], local = isDeepEqual(prevDocState.local, nextLocal) ? prevDocState.local : nextLocal;
  return {
    ...prev,
    applied: nextApplied,
    documentStates: evictOrphanedDocumentStates({
      ...prev.documentStates,
      [documentId]: {
        ...prevDocState,
        remote: document2,
        remoteRev: revision,
        local,
        unverifiedRevisions
      }
    })
  };
}
function addSubscriptionIdToDocument(prev, documentId, subscriptionId) {
  let prevDocState = prev.documentStates?.[documentId], prevSubscriptions = prevDocState?.subscriptions ?? [];
  return {
    ...prev,
    documentStates: {
      ...prev.documentStates,
      [documentId]: {
        ...prevDocState,
        id: documentId,
        subscriptions: [...prevSubscriptions, subscriptionId]
      }
    }
  };
}
function removeSubscriptionIdFromDocument(prev, documentId, subscriptionId) {
  let prevDocState = prev.documentStates?.[documentId];
  if (!prevDocState) return prev;
  let subscriptions = prevDocState.subscriptions.filter((id2) => id2 !== subscriptionId);
  return !subscriptions.length && !isAwaitingOwnEcho(prevDocState) ? {
    ...prev,
    documentStates: omitProperty(prev.documentStates, documentId)
  } : {
    ...prev,
    documentStates: {
      ...prev.documentStates,
      [documentId]: {
        ...prevDocState,
        subscriptions
      }
    }
  };
}
function isAwaitingOwnEcho(documentState) {
  let expiresAfter = Date.now() - 3e4;
  return Object.values(documentState.unverifiedRevisions ?? {}).some((revision) => !!revision && new Date(revision.timestamp).getTime() > expiresAfter);
}
function evictOrphanedDocumentStates(documentStates) {
  let next = documentStates;
  for (let [documentId, documentState] of Object.entries(documentStates)) documentState && (documentState.subscriptions.length || isAwaitingOwnEcho(documentState) || (next = omitProperty(next, documentId)));
  return next;
}
function manageSubscriberIds({ state }, handles) {
  let documentIds = getDocumentIdsFromHandleLikes(handles), subscriptionId = randomId(16);
  return state.set("addSubscribers", (prev) => documentIds.reduce((acc, id2) => addSubscriptionIdToDocument(acc, id2, subscriptionId), prev)), () => {
    setCleanupTimeout(() => {
      state.set("removeSubscribers", (prev) => documentIds.reduce((acc, id2) => removeSubscriptionIdFromDocument(acc, id2, subscriptionId), prev));
    }, 1e3);
  };
}
function getDocumentIdsFromHandleLikes(handles) {
  return handles.flatMap((handle) => {
    if ("type" in handle && isReleaseAction(handle)) return [getReleaseDocumentId(handle.releaseId)];
    let idsForDocument = [];
    return handle.documentId ? handle.liveEdit ? [handle.documentId] : (isReleasePerspective(handle.perspective) && idsForDocument.push(getVersionId(DocumentId(handle.documentId), handle.perspective.releaseName)), idsForDocument.push(getPublishedId(DocumentId(handle.documentId))), idsForDocument.push(getDraftId(DocumentId(handle.documentId))), idsForDocument) : [];
  });
}
var actionMap = {
  "document.create": "created",
  "document.delete": "deleted",
  "document.discard": "discarded",
  "document.edit": "edited",
  "document.publish": "published",
  "document.unpublish": "unpublished",
  "release.create": "created",
  "release.edit": "edited",
  "release.delete": "deleted"
};
function getDocumentEvents(outgoing) {
  let documentIdsByAction = outgoing.actions.reduce((acc, action) => {
    if (!(action.type in actionMap)) return acc;
    let documentId = isReleaseAction(action) ? getReleaseDocumentId(action.releaseId) : action.documentId;
    if (!documentId) return acc;
    let type = action.type, ids = acc[type] ?? /* @__PURE__ */ new Set();
    return ids.add(documentId), acc[type] = ids, acc;
  }, {});
  return Object.entries(documentIdsByAction).flatMap(([actionType, documentIds]) => Array.from(documentIds ?? []).map((documentId) => ({
    type: actionMap[actionType],
    documentId,
    outgoing
  })));
}
function dedupeListenerEvents(options) {
  let { ttl = 12e4, maxEntries = 1e3 } = options ?? {};
  return (source) => defer(() => {
    let seen = /* @__PURE__ */ new Map();
    return source.pipe(filter((event) => {
      if (event.type !== "mutation") return true;
      let key = `${event.transactionId}#${event.documentId}`, now = Date.now(), expiry = seen.get(key);
      if (expiry !== void 0 && expiry > now) return false;
      seen.delete(key), seen.set(key, now + ttl);
      for (let [existingKey, existingExpiry] of seen) {
        if (seen.size <= maxEntries && existingExpiry > now) break;
        seen.delete(existingKey);
      }
      return true;
    }));
  });
}
function groupTransactionEvents(options) {
  let { flushDeadline = 3e4, maxHeldEvents = 100 } = options ?? {};
  return (source) => new Observable((subscriber) => {
    let open = null, held = [], closeOpen = () => {
      if (!open) return;
      clearTimeout(open.timer);
      let { events } = open;
      open = null;
      for (let event of events) subscriber.next(event);
    }, releaseHeld = () => {
      let queue = held;
      held = [];
      for (let event of queue) processEvent(event);
    }, releaseEverything = () => {
      closeOpen();
      let queue = held;
      held = [];
      for (let event of queue) subscriber.next(event);
    }, processEvent = (event) => {
      if (event.type !== "mutation") {
        releaseEverything(), subscriber.next(event);
        return;
      }
      let isMultiDocument = (event.transactionTotalEvents ?? 0) > 1;
      if (!open) {
        if (!isMultiDocument) {
          subscriber.next(event);
          return;
        }
        open = {
          transactionId: event.transactionId,
          events: [event],
          total: event.transactionTotalEvents,
          timer: setCleanupTimeout(() => {
            closeOpen(), releaseHeld();
          }, flushDeadline)
        };
        return;
      }
      if (event.transactionId === open.transactionId) {
        open.events.push(event), open.events.length >= open.total && (closeOpen(), releaseHeld());
        return;
      }
      held.push(event), held.length > maxHeldEvents && releaseEverything();
    }, subscription = source.subscribe({
      next: processEvent,
      error: (error2) => {
        releaseEverything(), subscriber.error(error2);
      },
      complete: () => {
        releaseEverything(), subscriber.complete();
      }
    });
    return () => {
      open && clearTimeout(open.timer), open = null, held = [], subscription.unsubscribe();
    };
  });
}
var API_VERSION$3 = "v2025-05-06";
function createSharedListener(instance, resource) {
  let dispose$ = new Subject(), events$ = getClientState(instance, {
    apiVersion: API_VERSION$3,
    resource
  }).observable.pipe(switchMap((client) => client.listen("*", {}, {
    events: [
      "mutation",
      "welcome",
      "welcomeback",
      "reconnect",
      "reset"
    ],
    enableResume: true,
    includeResult: false,
    includeAllVersions: true,
    tag: "document-listener"
  })), dedupeListenerEvents(), groupTransactionEvents(), takeUntil(dispose$), share()), [welcome$, mutation$] = partition(events$, (e) => e.type === "welcome");
  return {
    events: merge(welcome$.pipe(shareReplay(1)), mutation$),
    dispose: () => dispose$.next()
  };
}
function createFetchDocument(instance, resource) {
  return function(documentId) {
    return getClientState(instance, {
      apiVersion: API_VERSION$3,
      resource
    }).observable.pipe(switchMap((client) => createDocumentLoaderFromClient(client)(documentId)), map((result) => {
      if (!result.accessible) {
        if (result.reason === "existence") return null;
        throw Error(`Document with ID \`${documentId}\` is inaccessible due to permissions.`);
      }
      return result.document;
    }), first());
  };
}
var documentStore = defineStore({
  name: "Document",
  getInitialState: (instance, { resource }) => ({
    documentStates: {},
    queued: [],
    applied: [],
    sharedListener: createSharedListener(instance, resource),
    fetchDocument: createFetchDocument(instance, resource),
    events: new Subject()
  }),
  initialize(context) {
    let { sharedListener } = context.state.get(), subscriptions = [
      subscribeToQueuedAndApplyNextTransaction(context),
      subscribeToSubscriptionsAndListenToDocuments(context),
      subscribeToAppliedAndSubmitNextTransaction(context),
      subscribeToClientAndFetchDatasetAcl(context),
      subscribeToCurrentUserAndSetIdentity(context)
    ];
    return () => {
      sharedListener.dispose(), subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }
});
function getDocumentState(...args) {
  return _getDocumentState(...args);
}
var _getDocumentState = bindActionByResource(documentStore, createStateSourceAction({
  selector: ({ state: { error: error2, documentStates } }, options) => {
    let { documentId: docId, path, liveEdit, perspective } = options, documentId = DocumentId(docId);
    if (error2) throw error2;
    let document2;
    if (liveEdit) document2 = documentStates[documentId]?.local;
    else {
      let version2;
      if (isReleasePerspective(perspective) && (version2 = documentStates[getVersionId(documentId, perspective.releaseName)]?.local, version2 === void 0)) return;
      let draft = documentStates[getDraftId(documentId)]?.local, published = documentStates[getPublishedId(documentId)]?.local;
      if (draft === void 0 || published === void 0) return;
      document2 = version2 ?? draft ?? published;
    }
    if (!path) return document2;
    let result = jsonMatch(document2, path).next();
    if (result.done) return;
    let { value } = result.value;
    return value;
  },
  onSubscribe: (context, options) => manageSubscriberIds(context, [options])
}));
function resolveDocument(...args) {
  return _resolveDocument(...args);
}
var _resolveDocument = bindActionByResource(documentStore, ({ instance }, docHandle) => firstValueFrom(getDocumentState(instance, {
  ...docHandle,
  path: void 0
}).observable.pipe(filter((i) => i !== void 0))));
var getDocumentSyncStatus = bindActionByResource(documentStore, createStateSourceAction({
  selector: ({ state: { error: error2, documentStates: documents2, outgoing, applied, queued } }, doc) => {
    let documentId = DocumentId(typeof doc == "string" ? doc : doc.documentId);
    if (error2) throw error2;
    if (doc.liveEdit) {
      if (documents2[documentId] === void 0) return;
    } else {
      let version2 = isReleasePerspective(doc.perspective) ? documents2[getVersionId(documentId, doc.perspective.releaseName)] : void 0;
      if (isReleasePerspective(doc.perspective) && version2 === void 0) return;
      let draft = documents2[getDraftId(documentId)], published = documents2[getPublishedId(documentId)];
      if (draft === void 0 || published === void 0) return;
    }
    return !queued.length && !applied.length && !outgoing;
  },
  onSubscribe: (context, doc) => manageSubscriberIds(context, [doc])
}));
var getPermissionsState = bindActionByResource(documentStore, createStateSourceAction({
  selector: calculatePermissions,
  onSubscribe: (context, { actions }) => {
    manageSubscriberIds(context, actions);
  }
}));
var resolvePermissions = bindActionByResource(documentStore, ({ instance }, options) => firstValueFrom(getPermissionsState(instance, options).observable.pipe(filter((i) => i !== void 0))));
var subscribeDocumentEvents = bindActionByResource(documentStore, ({ state }, options) => {
  let { events } = state.get(), subscription = events.subscribe(options.eventHandler);
  return () => subscription.unsubscribe();
});
var subscribeToQueuedAndApplyNextTransaction = ({ state }) => {
  let { events } = state.get();
  return state.observable.pipe(map(applyFirstQueuedTransaction), distinctUntilChanged(), tap((next) => state.set("applyFirstQueuedTransaction", next)), catchError((error2, caught) => {
    if (error2 instanceof ActionError) return state.set("removeQueuedTransaction", (prev) => removeQueuedTransaction(prev, error2.transactionId)), events.next({
      type: "error",
      message: error2.message,
      documentId: error2.documentId,
      transactionId: error2.transactionId,
      error: error2
    }), caught;
    throw error2;
  })).subscribe({ error: (error2) => state.set("setError", { error: error2 }) });
};
var subscribeToAppliedAndSubmitNextTransaction = ({ state, instance, key: { resource } }) => {
  let { events } = state.get();
  return state.observable.pipe(throttle((s) => s.outgoing ? state.observable.pipe(first(({ outgoing }) => !outgoing)) : timer(1e3), {
    leading: false,
    trailing: true
  }), map(transitionAppliedTransactionsToOutgoing), distinctUntilChanged((a, b) => a.outgoing?.transactionId === b.outgoing?.transactionId), tap((next) => state.set("transitionAppliedTransactionsToOutgoing", next)), map((s) => s.outgoing), distinctUntilChanged(), withLatestFrom(getClientState(instance, {
    apiVersion: API_VERSION$4,
    resource
  }).observable), concatMap(([outgoing, client]) => {
    if (!outgoing) return EMPTY;
    let revertOnError = catchError((error2) => {
      state.set("revertOutgoingTransaction", revertOutgoingTransaction);
      let message = error2 instanceof Error ? error2.message : "Request failed";
      return events.next({
        type: "reverted",
        message,
        outgoing,
        error: error2
      }), EMPTY;
    }), toResult = map((result) => ({
      result,
      outgoing
    }));
    return outgoing.actions.some((action) => !isReleaseAction(action) && action.liveEdit) ? client.observable.mutate(outgoing.outgoingMutations, {
      transactionId: outgoing.transactionId,
      visibility: "async",
      returnDocuments: false,
      returnFirst: false,
      tag: "document.mutate",
      skipCrossDatasetReferenceValidation: true
    }).pipe(revertOnError, toResult) : client.observable.action(outgoing.outgoingActions, {
      transactionId: outgoing.transactionId,
      skipCrossDatasetReferenceValidation: true,
      tag: "document.action"
    }).pipe(revertOnError, toResult);
  }), tap(({ outgoing, result }) => {
    state.set("cleanupOutgoingTransaction", cleanupOutgoingTransaction);
    for (let e of getDocumentEvents(outgoing)) events.next(e);
    events.next({
      type: "accepted",
      outgoing,
      result
    });
  })).subscribe({ error: (error2) => state.set("setError", { error: error2 }) });
};
var subscribeToSubscriptionsAndListenToDocuments = (context) => {
  let { state } = context, { events } = state.get();
  return state.observable.pipe(filter((s) => !!s.grants), map((s) => Object.keys(s.documentStates)), distinctUntilChanged((curr, next) => {
    if (curr.length !== next.length) return false;
    let currSet = new Set(curr);
    return next.every((i) => currSet.has(i));
  }), startWith(/* @__PURE__ */ new Set()), pairwise(), switchMap((pair) => {
    let [curr, next] = pair.map((ids) => new Set(ids)), added = Array.from(next).filter((i) => !curr.has(i)), removed = Array.from(curr).filter((i) => !next.has(i)), changes = [...added.map((id2) => ({
      id: id2,
      add: true
    })), ...removed.map((id2) => ({
      id: id2,
      add: false
    }))].sort((a, b) => {
      let aIsDraft = a.id === getDraftId(DocumentId(a.id)), bIsDraft = b.id === getDraftId(DocumentId(b.id));
      return aIsDraft && bIsDraft ? a.id.localeCompare(b.id, "en-US") : aIsDraft ? -1 : bIsDraft ? 1 : a.id.localeCompare(b.id, "en-US");
    });
    return of(...changes);
  }), groupBy((i) => i.id), mergeMap((group) => group.pipe(switchMap((e) => e.add ? listen(context, e.id).pipe(retry({ delay: (error2, retryCount) => {
    if (!(error2 instanceof OutOfSyncError)) return throwError(() => error2);
    let backoff = Math.min(500 * 2 ** (retryCount - 1), 1e4);
    return timer(backoff);
  } }), tap((remote) => state.set("applyRemoteDocument", (prev) => applyRemoteDocument(prev, remote, events)))) : EMPTY)))).subscribe({ error: (error2) => state.set("setError", { error: error2 }) });
};
var subscribeToClientAndFetchDatasetAcl = ({ instance, state, key: { resource } }) => {
  let clientOptions = {
    apiVersion: API_VERSION$4,
    resource
  }, url;
  if (resource && isDatasetResource(resource)) url = `/projects/${resource.projectId}/datasets/${resource.dataset}/acl`;
  else if (resource && isMediaLibraryResource(resource)) url = `/media-libraries/${resource.mediaLibraryId}/acl`;
  else if (resource && isCanvasResource(resource)) url = `/canvases/${resource.canvasId}/acl`;
  else throw Error(`Received invalid resource: ${JSON.stringify(resource)}`);
  return getClientState(instance, clientOptions).observable.pipe(switchMap((client) => client.observable.request({
    url,
    tag: "acl.get"
  }).pipe(retry({ delay: (error2, retryCount) => {
    let isTransientClientError = error2 instanceof ClientError && (error2.statusCode === 408 || error2.statusCode === 429);
    if (error2 instanceof ClientError && !isTransientClientError || error2 instanceof CorsOriginError) return throwError(() => error2);
    let backoff = Math.min(500 * 2 ** (retryCount - 1), 1e4);
    return timer(backoff);
  } }))), tap((datasetAcl) => state.set("setGrants", { grants: createGrantsLookup(datasetAcl) }))).subscribe({ error: (error2) => state.set("setError", { error: error2 }) });
};
var subscribeToCurrentUserAndSetIdentity = ({ instance, state }) => getCurrentUserState(instance).observable.subscribe({
  next: (currentUser) => state.set("setIdentity", { identity: currentUser?.id }),
  error: () => state.set("setIdentity", { identity: void 0 })
});
var MEDIA_LIBRARY_DRAFTED_TYPES = /* @__PURE__ */ new Set(["sanity.asset"]);
function getEffectiveDocumentModel(resource, documentType) {
  return resource ? isCanvasResource(resource) ? {
    liveEdit: true,
    supportsReleases: false
  } : isMediaLibraryResource(resource) ? {
    liveEdit: !(documentType && MEDIA_LIBRARY_DRAFTED_TYPES.has(documentType)),
    supportsReleases: false
  } : {
    liveEdit: void 0,
    supportsReleases: true
  } : {
    liveEdit: void 0,
    supportsReleases: true
  };
}
function describeResource(resource) {
  return resource && isCanvasResource(resource) ? "Canvas" : resource && isMediaLibraryResource(resource) ? "Media Library" : "this resource";
}
function normalizeActionsForResource(actions, resource) {
  let stripped = [], normalized = actions.map((action) => {
    if (action.type !== "document.edit") return action;
    let { liveEdit: forcedLiveEdit, supportsReleases } = getEffectiveDocumentModel(resource, action.documentType), shouldRemovePerspective = isReleasePerspective(action.perspective) && !supportsReleases, shouldForceLiveEdit = forcedLiveEdit === true && !action.liveEdit;
    if (!shouldRemovePerspective && !shouldForceLiveEdit) return action;
    let corrected = { ...action };
    return shouldForceLiveEdit && (corrected.liveEdit = true), shouldRemovePerspective && (corrected.perspective = void 0), corrected.documentId = getEffectiveDocumentId({
      ...corrected,
      documentId: getPublishedId(DocumentId(corrected.documentId))
    }), shouldRemovePerspective && stripped.push({
      documentType: action.documentType,
      documentId: corrected.documentId
    }), corrected;
  });
  if (stripped.length > 0) {
    let docs = stripped.map((e) => `${e.documentType} (${e.documentId})`).join(", ");
    console.warn(`[sanity-sdk] ${describeResource(resource)} does not support release perspectives — falling back to the standard editing path for: ${docs}`);
  }
  return normalized;
}
function applyDocumentActions(...args) {
  return boundApplyDocumentActions(...args);
}
var boundApplyDocumentActions = bindActionByResource(documentStore, _applyDocumentActions);
async function _applyDocumentActions({ state }, { actions, resource, transactionId = randomUuid(), disableBatching }) {
  let { events } = state.get(), transaction = {
    transactionId,
    actions: normalizeActionsForResource(actions, resource),
    ...disableBatching && { disableBatching }
  }, fatalError$ = state.observable.pipe(map((s) => s.error), first(Boolean), map((error2) => ({
    type: "error",
    error: error2
  }))), transactionError$ = events.pipe(filter((e) => e.type === "error"), first((e) => e.transactionId === transactionId)), appliedTransaction$ = state.observable.pipe(map((s) => s.applied), distinctUntilChanged(), map((applied) => applied.find((t) => t.transactionId === transactionId)), first(Boolean)), successfulTransaction$ = events.pipe(filter((e) => e.type === "accepted"), first((e) => e.outgoing.batchedTransactionIds.includes(transactionId))), rejectedTransaction$ = events.pipe(filter((e) => e.type === "reverted"), first((e) => e.outgoing.batchedTransactionIds.includes(transactionId))), appliedTransactionOrError = firstValueFrom(race([
    fatalError$,
    transactionError$,
    appliedTransaction$
  ])), acceptedOrRejectedTransaction = firstValueFrom(race([
    successfulTransaction$,
    rejectedTransaction$,
    transactionError$
  ]));
  state.set("queueTransaction", (prev) => queueTransaction(prev, transaction));
  let result = await appliedTransactionOrError;
  if ("type" in result && result.type === "error") throw result.error;
  let { working: documents2, previous, previousRevs } = result, existingIds = new Set(Object.entries(previous).filter(([, value]) => !!value).map(([key]) => key)), resultingIds = new Set(Object.entries(documents2).filter(([, value]) => !!value).map(([key]) => key)), allIds = /* @__PURE__ */ new Set([...existingIds, ...resultingIds]), updated = [], appeared = [], disappeared = [];
  for (let id2 of allIds) existingIds.has(id2) && resultingIds.has(id2) ? updated.push(id2) : !existingIds.has(id2) && resultingIds.has(id2) ? appeared.push(id2) : !resultingIds.has(id2) && existingIds.has(id2) && disappeared.push(id2);
  async function submitted() {
    let raceResult = await acceptedOrRejectedTransaction;
    if (raceResult.type !== "accepted") throw raceResult.error;
    return raceResult.result;
  }
  return {
    transactionId,
    documents: documents2,
    previous,
    previousRevs,
    appeared,
    updated,
    disappeared,
    submitted
  };
}
function createFavoriteKey(context) {
  return `${context.documentId}:${context.documentType}:${context.resourceId}:${context.resourceType}${context.schemaName ? `:${context.schemaName}` : ""}`;
}
var favorites = defineFetcher({
  name: "favorites",
  getKey: (_instance, context) => createFavoriteKey(context),
  tags: (_data, context) => [{
    type: "favorite",
    id: createFavoriteKey(context)
  }],
  fetch: (instance) => (context) => {
    let nodeStateSource = getNodeState(instance, {
      name: SDK_NODE_NAME,
      connectTo: SDK_CHANNEL_NAME
    }), payload = { document: {
      id: context.documentId,
      type: context.documentType,
      resource: {
        id: context.resourceId,
        type: context.resourceType,
        schemaName: context.schemaName
      }
    } };
    return nodeStateSource.observable.pipe(first((nodeState) => !!nodeState), switchMap((nodeState) => {
      let node = nodeState.node;
      return from(node.fetch("dashboard/v1/events/favorite/query", payload)).pipe(map((response) => ({ isFavorited: response.isFavorited })), catchError((err) => (console.error("Favorites service connection error", err), of({ isFavorited: false }))));
    }));
  }
});
var setFavorite = defineMutation({
  name: "setFavorite",
  mutationFn: (instance) => ({ isFavorited, ...context }) => {
    let nodeStateSource = getNodeState(instance, {
      name: SDK_NODE_NAME,
      connectTo: SDK_CHANNEL_NAME
    }), payload = {
      eventType: isFavorited ? "added" : "removed",
      document: {
        id: context.documentId,
        type: context.documentType,
        resource: {
          id: context.resourceId,
          type: context.resourceType,
          ...context.schemaName ? { schemaName: context.schemaName } : {}
        }
      }
    };
    return nodeStateSource.observable.pipe(first((nodeState) => !!nodeState), switchMap((nodeState) => {
      let node = nodeState.node;
      return from(node.fetch("dashboard/v1/events/favorite/mutate", payload)).pipe(map((response) => {
        if (!response.success) throw Error("Failed to update favorite status");
        return { isFavorited };
      }));
    }));
  },
  invalidates: (_result, input) => [{
    type: "favorite",
    id: createFavoriteKey(input)
  }]
});
function serializeInclude(include) {
  return include?.length ? [...include].sort().join(",") : void 0;
}
var installations = defineFetcher({
  name: "installations",
  getKey: (_instance, options) => [
    options.organizationId,
    serializeInclude(options.include) ?? "",
    options.limit ?? "",
    options.cursor ?? ""
  ].join(":"),
  fetch: (instance) => (options) => getClientState(instance, {
    apiVersion: "vX",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: "/installations",
    query: buildQuery({
      organizationId: options.organizationId,
      include: serializeInclude(options.include),
      limit: options.limit,
      cursor: options.cursor
    }),
    tag: "installations.list"
  }))),
  tags: (data) => [{
    type: "installation",
    id: "LIST"
  }, ...data.data.map((installation2) => ({
    type: "installation",
    id: installation2.id
  }))]
});
var installation = defineFetcher({
  name: "installation",
  getKey: (_instance, installationId, options) => `${installationId}:${serializeInclude(options?.include) ?? ""}`,
  fetch: (instance) => (installationId, options) => getClientState(instance, {
    apiVersion: "vX",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: `/installations/${installationId}`,
    query: buildQuery({ include: serializeInclude(options?.include) }),
    tag: "installations.get"
  }))),
  tags: (data) => [{
    type: "installation",
    id: data.id
  }]
});
function resolveOrganizationId(options) {
  let organizationId = options?.organizationId;
  if (!organizationId) throw Error("An organizationId is required to use the organization API.");
  return organizationId;
}
function normalizeOrganizationOptions(options) {
  return {
    includeMembers: options?.includeMembers ?? false,
    includeFeatures: options?.includeFeatures ?? false
  };
}
function getOrganizationCacheKey(_instance, options) {
  let organizationId = resolveOrganizationId(options), { includeMembers, includeFeatures } = normalizeOrganizationOptions(options);
  return `organization:${organizationId}${includeMembers ? ":members" : ""}${includeFeatures ? ":features" : ""}`;
}
var organization = defineFetcher({
  name: "organization",
  getKey: getOrganizationCacheKey,
  fetch: (instance) => (options) => getClientState(instance, {
    apiVersion: "v2025-02-19",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: `/organizations/${resolveOrganizationId(options)}`,
    query: buildQuery(normalizeOrganizationOptions(options)),
    tag: "organizations.get"
  }))),
  tags: (data) => [{
    type: "organization",
    id: data.id
  }]
});
function normalizeOrganizationsOptions(options) {
  return {
    includeImplicitMemberships: options?.includeImplicitMemberships ?? false,
    includeMembers: options?.includeMembers ?? false,
    includeFeatures: options?.includeFeatures ?? false
  };
}
function getOrganizationsCacheKey(_instance, options) {
  let { includeMembers, includeFeatures, includeImplicitMemberships } = normalizeOrganizationsOptions(options);
  return `organizations${includeMembers ? ":members" : ""}${includeFeatures ? ":features" : ""}${includeImplicitMemberships ? ":implicit" : ""}`;
}
var organizations = defineFetcher({
  name: "organizations",
  getKey: getOrganizationsCacheKey,
  fetch: (instance) => (options) => getClientState(instance, {
    apiVersion: "v2025-02-19",
    scope: "global"
  }).observable.pipe(switchMap((client) => client.observable.request({
    url: "/organizations",
    query: buildQuery(normalizeOrganizationsOptions(options)),
    tag: "organizations.list"
  }))),
  tags: (data) => [{
    type: "organization",
    id: "LIST"
  }, ...data.map((org) => ({
    type: "organization",
    id: org.id
  }))]
});
var usersStore = defineStore({
  name: "UsersStore",
  getInitialState: () => ({ users: {} }),
  initialize: (context) => {
    let subscription = listenForLoadMoreAndFetch(context);
    return () => subscription.unsubscribe();
  }
});
var errorHandler2 = (state) => (error2) => state.set("setError", { error: error2 });
var listenForLoadMoreAndFetch = ({ state, instance }) => state.observable.pipe(map((s) => new Set(Object.keys(s.users))), distinctUntilChanged((curr, next) => curr.size === next.size && Array.from(next).every((i) => curr.has(i))), startWith(/* @__PURE__ */ new Set()), pairwise(), mergeMap(([curr, next]) => {
  let added = Array.from(next).filter((i) => !curr.has(i)), removed = Array.from(curr).filter((i) => !next.has(i));
  return [...added.map((key) => ({
    key,
    added: true
  })), ...removed.map((key) => ({
    key,
    added: false
  }))];
}), groupBy((i) => i.key), mergeMap((group$) => group$.pipe(switchMap((e) => {
  if (!e.added) return EMPTY;
  let { userId, batchSize, ...options } = parseUsersKey(group$.key);
  if (userId) {
    if (userId.startsWith("p")) return getClient(instance, {
      apiVersion: PROJECT_API_VERSION,
      projectId: options.projectId,
      useProjectHostname: true
    }).observable.request({
      method: "GET",
      url: `/users/${userId}`,
      tag: "users.get"
    }).pipe(map((user2) => ({
      data: [{
        sanityUserId: user2.sanityUserId,
        profile: {
          id: user2.id,
          displayName: user2.displayName,
          familyName: user2.familyName ?? void 0,
          givenName: user2.givenName ?? void 0,
          middleName: user2.middleName ?? void 0,
          imageUrl: user2.imageUrl ?? void 0,
          createdAt: user2.createdAt,
          updatedAt: user2.updatedAt,
          isCurrentUser: user2.isCurrentUser,
          email: user2.email,
          provider: user2.provider
        },
        memberships: []
      }],
      totalCount: 1,
      nextCursor: null
    })), catchError((error2) => (state.set("setUsersError", setUsersError(group$.key, error2)), EMPTY)), tap((response) => state.set("setUsersData", setUsersData(group$.key, response))));
    let scope = userId.startsWith("g") ? "global" : void 0, client = getClient(instance, {
      scope,
      apiVersion: "vX"
    }), resourceType2 = options.resourceType || "project", resourceId = resourceType2 === "organization" ? options.organizationId : options.projectId;
    return resourceId ? client.observable.request({
      method: "GET",
      url: `access/${resourceType2}/${resourceId}/users/${userId}`,
      tag: "users.get"
    }).pipe(map((response) => "sanityUserId" in response ? {
      data: [response],
      totalCount: 1,
      nextCursor: null
    } : response), catchError((error2) => (state.set("setUsersError", setUsersError(group$.key, error2)), EMPTY)), tap((response) => state.set("setUsersData", setUsersData(group$.key, response)))) : throwError(() => Error("An organizationId or a projectId is required"));
  }
  let projectId = options.projectId, resourceType = options.resourceType ?? (options.organizationId ? "organization" : projectId ? "project" : "organization"), organizationId$ = options.organizationId ? of(options.organizationId) : getDashboardOrganizationId(instance).observable.pipe(filter((i) => typeof i == "string")), resource$ = resourceType === "project" ? projectId ? of({
    type: "project",
    id: projectId
  }) : throwError(() => Error("Project ID required for this API.")) : organizationId$.pipe(map((id2) => ({
    type: "organization",
    id: id2
  }))), client$ = getClientState(instance, {
    scope: "global",
    apiVersion: "vX"
  }).observable, loadMore$ = state.observable.pipe(map((s) => s.users[group$.key]?.lastLoadMoreRequest), distinctUntilChanged()), cursor$ = state.observable.pipe(map((s) => s.users[group$.key]?.nextCursor), distinctUntilChanged(), filter((cursor) => cursor !== null));
  return combineLatest([
    resource$,
    client$,
    loadMore$
  ]).pipe(withLatestFrom(cursor$), switchMap(([[resource, client], cursor]) => client.observable.request({
    method: "GET",
    url: `access/${resource.type}/${resource.id}/users`,
    tag: "users.list",
    query: cursor ? {
      nextCursor: cursor,
      limit: batchSize.toString()
    } : { limit: batchSize.toString() }
  })), catchError((error2) => (state.set("setUsersError", setUsersError(group$.key, error2)), EMPTY)), tap((response) => state.set("setUsersData", setUsersData(group$.key, response))));
})))).subscribe({ error: errorHandler2(state) });
var getUsersState = bindActionGlobally(usersStore, createStateSourceAction({
  selector: createSelector([
    ({ instance, state }, options) => state.error ?? state.users[getUsersKey(instance, options)]?.error,
    ({ instance, state }, options) => state.users[getUsersKey(instance, options)]?.users,
    ({ instance, state }, options) => state.users[getUsersKey(instance, options)]?.totalCount,
    ({ instance, state }, options) => state.users[getUsersKey(instance, options)]?.nextCursor
  ], (error2, data, totalCount, nextCursor) => {
    if (error2) throw error2;
    if (data !== void 0 && totalCount !== void 0 && nextCursor !== void 0) return {
      data,
      totalCount,
      hasMore: nextCursor !== null
    };
  }),
  onSubscribe: ({ instance, state }, options) => {
    let subscriptionId = randomId(16), key = getUsersKey(instance, options);
    return state.set("addSubscription", addSubscription(subscriptionId, key)), () => {
      setCleanupTimeout(() => state.set("removeSubscription", removeSubscription(subscriptionId, key)), USERS_STATE_CLEAR_DELAY);
    };
  }
}));
var resolveUsers = bindActionGlobally(usersStore, async ({ state, instance }, { signal, ...options }) => {
  let key = getUsersKey(instance, options), { getCurrent } = getUsersState(instance, options), aborted$ = signal ? new Observable((observer) => {
    let cleanup = () => {
      signal.removeEventListener("abort", listener);
    }, listener = () => {
      observer.error(new DOMException("The operation was aborted.", "AbortError")), observer.complete(), cleanup();
    };
    return signal.addEventListener("abort", listener), cleanup;
  }).pipe(catchError((error2) => {
    throw error2 instanceof Error && error2.name === "AbortError" && state.set("cancelRequest", cancelRequest(key)), error2;
  })) : NEVER;
  state.set("initializeRequest", initializeRequest(key));
  let resolved$ = state.observable.pipe(map(getCurrent), first((i) => i !== void 0));
  return firstValueFrom(race([resolved$, aborted$]));
});
var loadMoreUsers = bindActionGlobally(usersStore, async ({ state, instance }, options) => {
  let key = getUsersKey(instance, options), users = getUsersState(instance, options), usersState = users.getCurrent();
  if (!usersState) throw Error("Users not loaded for specified resource. Please call resolveUsers first.");
  if (!usersState.hasMore) throw Error("No more users available to load for this resource.");
  let promise = firstValueFrom(users.observable.pipe(filter((i) => i !== void 0), skip(1))), timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return state.set("updateLastLoadMoreRequest", updateLastLoadMoreRequest(timestamp, key)), await promise;
});
var getUserState = bindActionGlobally(usersStore, ({ instance }, { userId, ...options }) => getUsersState(instance, {
  userId,
  ...options
}).observable.pipe(map((res) => res?.data[0]), distinctUntilChanged((a, b) => a?.profile.updatedAt === b?.profile.updatedAt)));
var resolveUser = bindActionGlobally(usersStore, async ({ instance }, { signal, ...options }) => (await resolveUsers(instance, {
  signal,
  ...options
}))?.data[0]);
function getBifurClient(client, token$) {
  let { resource, dataset, url: baseUrl, requestTagPrefix = "sanity.sdk.presence" } = client.withConfig({ apiVersion: "2022-06-30" }).config(), resourcePath;
  if (resource?.type === "canvas") resourcePath = `canvases/${resource.id}`;
  else if (dataset) resourcePath = dataset;
  else throw Error("Unable to determine presence URL: no canvas resource or dataset configured");
  let urlWithTag = `${`${baseUrl}/socket/${resourcePath}`.replace(/^http/, "ws")}?tag=${requestTagPrefix}`;
  return fromUrl(urlWithTag, { token$ });
}
var handleIncomingMessage = (event) => {
  switch (event.type) {
    case "rollCall":
      return {
        type: "rollCall",
        userId: event.i,
        sessionId: event.session
      };
    case "state": {
      let { sessionId, locations } = event.m;
      return {
        type: "state",
        userId: event.i,
        sessionId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        locations
      };
    }
    case "disconnect":
      return {
        type: "disconnect",
        userId: event.i,
        sessionId: event.m.session,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    default:
      throw Error(`Got unknown presence event: ${JSON.stringify(event)}`);
  }
};
var createConnections = (bifur) => {
  let generation = 0;
  return defer(() => {
    let current = ++generation;
    return bifur.heartbeats.pipe(map(() => current));
  }).pipe(retry({
    delay: (_error, retryCount) => timer(Math.min(24e4, 2 ** retryCount * 100)),
    resetOnSuccess: true
  }), distinctUntilChanged(), share());
};
var createIncomingEvents = (bifur, connections$) => connections$.pipe(switchMap(() => bifur.listen("presence").pipe(catchError(() => EMPTY))), map(handleIncomingMessage), share());
var createUnload = () => typeof window > "u" ? EMPTY : merge(fromEvent(window, "beforeunload"), fromEvent(window, "pagehide")).pipe(map(() => void 0));
var createBifurTransport = (options) => {
  let { client, token$, sessionId } = options, bifur = getBifurClient(client, token$), connections$ = createConnections(bifur), incomingEvents$ = createIncomingEvents(bifur, connections$), dispatchMessage = (message) => {
    switch (message.type) {
      case "rollCall":
        return bifur.request("presence_rollcall", { session: sessionId });
      case "state":
        return bifur.request("presence_announce", { data: {
          locations: message.locations,
          sessionId
        } });
      case "disconnect":
        return bifur.request("presence_disconnect", { session: sessionId });
      default:
        return EMPTY;
    }
  };
  return [
    incomingEvents$,
    dispatchMessage,
    connections$,
    createUnload()
  ];
};
function isKeyedSegment(segment) {
  return typeof segment == "object" && !!segment && !Array.isArray(segment) && "_key" in segment;
}
function isEqualTuple(a, b) {
  return a.length === b.length && a.every((value, index2) => value === b[index2]);
}
function isEqualSegment(a, b) {
  return a === b ? true : isKeyedSegment(a) && isKeyedSegment(b) ? a._key === b._key : Array.isArray(a) && Array.isArray(b) ? isEqualTuple(a, b) : false;
}
function startsWithPath(prefix, candidate) {
  return prefix.length > candidate.length ? false : prefix.every((segment, index2) => isEqualSegment(segment, candidate[index2]));
}
var logger = createLogger("presence");
var PRESENCE_API_VERSION = "2026-03-30";
var SWEEP_INTERVAL = 15e3;
var getInitialState = () => ({
  locations: /* @__PURE__ */ new Map(),
  users: {}
});
var sendSafely = (dispatch2, message) => dispatch2(message).pipe(catchError((error2) => (logger.warn("Failed to send presence message", {
  messageType: message.type,
  error: error2
}), EMPTY)));
var asTrigger = (source$, name) => source$.pipe(map(() => void 0), catchError((error2) => (logger.error("Presence announce trigger failed", {
  trigger: name,
  error: error2
}), EMPTY)));
var locationKey = ({ documentId, path, selection }) => JSON.stringify([
  documentId,
  path,
  selection ?? null
]);
function isEqualLocations(a, b) {
  return a === b ? true : !a || !b || a.length !== b.length ? false : a.every((location2, index2) => locationKey(location2) === locationKey(b[index2]));
}
var presenceStore = defineStore({
  name: "presence",
  getInitialState,
  initialize: (context) => {
    let { instance, state, key: { resource } } = context;
    if (isMediaLibraryResource(resource)) throw Error("Presence is not supported for media library resources.");
    let sessionId = randomId(16), client = isDatasetResource(resource) ? getClient(instance, {
      apiVersion: PRESENCE_API_VERSION,
      projectId: resource.projectId,
      dataset: resource.dataset,
      useProjectHostname: true
    }) : getClient(instance, {
      apiVersion: PRESENCE_API_VERSION,
      resource
    }), token$ = getTokenState(instance).observable.pipe(distinctUntilChanged()), [incomingEvents$, dispatch2, connections$, unload$] = createBifurTransport({
      client,
      token$,
      sessionId
    }), subscription = new Subscription();
    subscription.add(incomingEvents$.subscribe({
      next: (event) => {
        "sessionId" in event && event.sessionId === sessionId || (event.type === "state" ? state.set("presence/state", (prevState) => {
          let newLocations = new Map(prevState.locations);
          return newLocations.set(event.sessionId, {
            userId: event.userId,
            locations: event.locations,
            lastSeenAt: Date.now()
          }), {
            ...prevState,
            locations: newLocations
          };
        }) : event.type === "disconnect" && state.set("presence/disconnect", (prevState) => {
          let newLocations = new Map(prevState.locations);
          return newLocations.delete(event.sessionId), {
            ...prevState,
            locations: newLocations
          };
        }));
      },
      error: (error2) => {
        logger.error("Presence event stream failed", { error: error2 });
      }
    })), subscription.add(connections$.subscribe(() => {
      state.set("presence/reset", (prevState) => ({
        ...prevState,
        locations: /* @__PURE__ */ new Map()
      })), sendSafely(dispatch2, { type: "rollCall" }).subscribe();
    })), subscription.add(connections$.pipe(switchMap(() => timer(SWEEP_INTERVAL, SWEEP_INTERVAL))).subscribe(() => {
      state.set("presence/expire", (prevState) => {
        let cutoff = Date.now() - 9e4, stale = [...prevState.locations].filter(([, s]) => s.lastSeenAt < cutoff);
        if (stale.length === 0) return prevState;
        let newLocations = new Map(prevState.locations);
        for (let [staleSessionId] of stale) newLocations.delete(staleSessionId);
        return {
          ...prevState,
          locations: newLocations
        };
      });
    })), subscription.add(unload$.pipe(switchMap(() => sendSafely(dispatch2, { type: "disconnect" }))).subscribe());
    let localLocations$ = state.observable.pipe(map((s) => s.localLocations), distinctUntilChanged(isEqualLocations)), rollCallRequests$ = incomingEvents$.pipe(filter((event) => event.type === "rollCall" && event.sessionId !== sessionId));
    subscription.add(merge(asTrigger(localLocations$, "locationChange"), asTrigger(rollCallRequests$, "rollCall"), asTrigger(connections$, "connection")).pipe(switchMap(() => timer(0, 3e4)), withLatestFrom(localLocations$), map(([, locations]) => locations), filter((locations) => locations !== void 0), auditTime(200), switchMap((locations) => sendSafely(dispatch2, {
      type: "state",
      locations
    }))).subscribe());
    let userIds$ = state.observable.pipe(map((s) => Array.from(s.locations.values()).map((l2) => l2.userId).filter((id2) => !!id2)), distinctUntilChanged((a, b) => a.length === b.length && a.every((v, i) => v === b[i]))), organizationId$ = isCanvasResource(resource) ? state.observable.pipe(filter((s) => s.organizationId !== void 0 || s.organizationIdError !== void 0), first(), map((s) => s.organizationId)) : of(void 0);
    if (subscription.add(combineLatest([userIds$, organizationId$]).pipe(switchMap(([userIds, organizationId]) => {
      if (userIds.length === 0 || !isDatasetResource(resource) && !organizationId) return of([]);
      let userObservables = userIds.map((userId) => getUserState(instance, {
        userId,
        ...isDatasetResource(resource) ? {
          resourceType: "project",
          projectId: resource.projectId
        } : {
          resourceType: "organization",
          organizationId
        }
      }).pipe(filter((v) => !!v)));
      return combineLatest(userObservables);
    })).subscribe((users) => {
      state.set("presence/users", (prevState) => ({
        ...prevState,
        users: {
          ...prevState.users,
          ...users.reduce((acc, user2) => (user2 && (acc[user2.profile.id] = user2), acc), {})
        }
      }));
    })), isCanvasResource(resource)) {
      let globalClient = getClient(instance, { apiVersion: PRESENCE_API_VERSION });
      subscription.add(globalClient.observable.request({
        url: `/canvases/${resource.canvasId}`,
        tag: "canvases.get"
      }).subscribe({
        next: ({ organizationId }) => {
          state.set("presence/organizationId", (prev) => ({
            ...prev,
            organizationId
          }));
        },
        error: (organizationIdError) => {
          state.set("presence/organizationIdError", (prev) => ({
            ...prev,
            organizationIdError
          }));
        }
      }));
    }
    return () => {
      sendSafely(dispatch2, { type: "disconnect" }).subscribe(), subscription.unsubscribe();
    };
  }
});
var selectLocations = (state) => state.locations;
var selectUsers = (state) => state.users;
var createUnresolvedUser = (userId) => ({
  sanityUserId: userId,
  profile: {
    id: userId,
    displayName: "Unknown user",
    email: "",
    provider: "",
    createdAt: ""
  },
  memberships: []
});
var selectPresence = createSelector(selectLocations, selectUsers, (locations, users) => Array.from(locations.entries()).map(([sessionId, { userId, locations: locs }]) => ({
  user: users[userId] || createUnresolvedUser(userId),
  sessionId,
  locations: locs
})));
var documentPresenceCache = /* @__PURE__ */ new WeakMap();
function selectDocumentPresence(state, options) {
  let cacheKey = JSON.stringify([
    getEditingDocumentId(options),
    options.path ?? null,
    options.excludeVersions ?? false
  ]), perState = documentPresenceCache.get(state);
  perState || (perState = /* @__PURE__ */ new Map(), documentPresenceCache.set(state, perState));
  let cached = perState.get(cacheKey);
  if (cached) return cached;
  let computed = computeDocumentPresence(state, options);
  return perState.set(cacheKey, computed), computed;
}
var scopeId = (documentId, excludeVersions) => excludeVersions ? documentId : getPublishedId(DocumentId(documentId));
var pathOf = (location2) => location2.path;
function matchesQuery(location2, target, { path, excludeVersions }) {
  return scopeId(location2.documentId, excludeVersions) === target ? !path || startsWithPath(path, pathOf(location2)) : false;
}
function toDocumentPresence(users, sessionId, userId, location2) {
  return {
    user: users[userId] || createUnresolvedUser(userId),
    sessionId,
    documentId: location2.documentId,
    path: pathOf(location2),
    lastActiveAt: location2.lastActiveAt,
    ...location2.selection === void 0 ? {} : { selection: location2.selection }
  };
}
function computeDocumentPresence(state, options) {
  let target = scopeId(getEditingDocumentId(options), options.excludeVersions);
  return Array.from(state.locations).flatMap(([sessionId, session]) => session.locations.filter((location2) => matchesQuery(location2, target, options)).map((location2) => toDocumentPresence(state.users, sessionId, session.userId, location2)));
}
var _getPresence = bindActionByResource(presenceStore, createStateSourceAction({ selector: (context) => selectPresence(context.state) }));
function getPresence(instance, params) {
  return _getPresence(instance, params ?? {});
}
var _getDocumentPresence = bindActionByResource(presenceStore, createStateSourceAction({ selector: ({ state }, options) => selectDocumentPresence(state, options) }));
function getDocumentPresence(instance, params) {
  return _getDocumentPresence(instance, params);
}
var _reportPresence = bindActionByResource(presenceStore, ({ state }, { locations }) => {
  let lastActiveAt = (/* @__PURE__ */ new Date()).toISOString(), wireLocations = locations.map((location2) => ({
    type: "document",
    documentId: getEditingDocumentId(location2),
    path: location2.path ?? [],
    lastActiveAt,
    ...location2.selection === void 0 ? {} : { selection: location2.selection }
  }));
  state.set("presence/report", (prevState) => ({
    ...prevState,
    localLocations: wireLocations
  }));
});
function reportPresence(instance, params) {
  return _reportPresence(instance, params);
}
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) % 2147483647;
  return Math.abs(hash).toString(16).padStart(8, "0");
}
var PROJECTION_TAG = "projection";
var STABLE_EMPTY_PROJECTION = {
  data: null,
  isPending: false
};
function validateProjection(projection) {
  if (!projection.startsWith("{") || !projection.endsWith("}")) throw Error(`Invalid projection format: "${projection}". Projections must be enclosed in curly braces, e.g. "{title, 'author': author.name}"`);
  return projection;
}
function createProjectionQuery(documentIds, documentProjections) {
  let projections = Array.from(documentIds).flatMap((id2) => {
    let projectionsForDoc = documentProjections[id2];
    return projectionsForDoc ? Object.entries(projectionsForDoc).map(([projectionHash, projection]) => ({
      documentId: id2,
      projection: validateProjection(projection),
      projectionHash
    })) : [];
  }).reduce((acc, { documentId, projection, projectionHash }) => {
    let obj = acc[projectionHash] ?? {
      documentIds: /* @__PURE__ */ new Set(),
      projection
    };
    return obj.documentIds.add(documentId), acc[projectionHash] = obj, acc;
  }, {});
  return {
    query: `[${Object.entries(projections).map(([projectionHash, { projection }]) => `...*[_id in $__ids_${projectionHash}]{_id,_type,_updatedAt,"__projectionHash":"${projectionHash}","result":{...${projection}}}`).join(",")}]`,
    params: Object.fromEntries(Object.entries(projections).map(([projectionHash, value]) => {
      let idsInProjection = Array.from(value.documentIds).flatMap((id2) => DocumentId(id2));
      return [`__ids_${projectionHash}`, Array.from(idsInProjection)];
    }))
  };
}
function processProjectionQuery({ ids, results, documentStatuses }) {
  let groupedResults = {};
  for (let result of results) {
    let originalId = getPublishedId(DocumentId(result._id)), hash = result.__projectionHash;
    ids.has(originalId) && (groupedResults[originalId] || (groupedResults[originalId] = {}), groupedResults[originalId][hash] || (groupedResults[originalId][hash] = void 0), groupedResults[originalId][hash] = result);
  }
  let finalValues = {};
  for (let originalId of ids) {
    finalValues[originalId] = {};
    let projectionsForDoc = groupedResults[originalId];
    if (projectionsForDoc) for (let hash in projectionsForDoc) {
      let projectionResultData = projectionsForDoc[hash]?.result;
      if (!projectionResultData) {
        finalValues[originalId][hash] = {
          data: null,
          isPending: false
        };
        continue;
      }
      let statusFromStore = documentStatuses?.[originalId];
      finalValues[originalId][hash] = {
        data: {
          ...projectionResultData,
          _status: statusFromStore
        },
        isPending: false
      };
    }
  }
  return finalValues;
}
function buildStatusQueryIds(documentIds, perspective) {
  let ids = [], releaseName = isReleasePerspective(perspective) ? perspective.releaseName : null;
  for (let id2 of documentIds) {
    let publishedId = getPublishedId(DocumentId(id2)), draftId = getDraftId(publishedId);
    ids.push(draftId, publishedId), releaseName && ids.push(getVersionId(publishedId, releaseName));
  }
  return ids;
}
function processStatusQueryResults(results) {
  let documentStatuses = {};
  for (let result of results) {
    let id2 = DocumentId(result._id), updatedAt = result._updatedAt, publishedId = getPublishedId(id2), statusData = documentStatuses[publishedId] ?? {};
    isDraftId(id2) ? statusData.lastEditedDraftAt = updatedAt : isVersionId(id2) ? statusData.lastEditedVersionAt = updatedAt : isPublishedId(id2) && (statusData.lastEditedPublishedAt = updatedAt), documentStatuses[publishedId] = statusData;
  }
  return documentStatuses;
}
var isSetEqual = (a, b) => a.size === b.size && Array.from(a).every((i) => b.has(i));
var subscribeToStateAndFetchBatches = ({ state, instance, key: { resource, perspective } }) => {
  let documentProjections$ = state.observable.pipe(map((s) => s.documentProjections), distinctUntilChanged(isDeepEqual)), activeDocumentIds$ = state.observable.pipe(map(({ subscriptions }) => new Set(Object.keys(subscriptions).map((id2) => DocumentId(id2)))), distinctUntilChanged(isSetEqual)), pendingUpdateSubscription = activeDocumentIds$.pipe(debounceTime(50), startWith(/* @__PURE__ */ new Set()), pairwise(), tap(([prevIds, currIds]) => {
    let newIds = [...currIds].filter((id2) => !prevIds.has(id2));
    newIds.length !== 0 && state.set("updatingPending", (prev) => {
      let nextValues = { ...prev.values };
      for (let id2 of newIds) {
        let projectionsForDoc = prev.documentProjections[id2];
        if (!projectionsForDoc) continue;
        let updatedValuesForDoc = { ...prev.values[id2] ?? {} };
        for (let hash in projectionsForDoc) updatedValuesForDoc[hash] = {
          data: updatedValuesForDoc[hash]?.data ?? null,
          isPending: true
        };
        nextValues[id2] = updatedValuesForDoc;
      }
      return { values: nextValues };
    });
  })).subscribe(), queryExecutionSubscription = combineLatest([activeDocumentIds$, documentProjections$]).pipe(debounceTime(50), distinctUntilChanged(isDeepEqual)).pipe(switchMap(([ids, documentProjections]) => {
    if (!ids.size) return EMPTY;
    let { query: query2, params } = createProjectionQuery(ids, documentProjections), controller = new AbortController(), statusQueryIds = buildStatusQueryIds(ids, perspective), statusQuery = "*[_id in $statusIds]{_id, _updatedAt}", statusParams = { statusIds: statusQueryIds }, projectionQuery$ = new Observable((observer) => {
      let { getCurrent, observable } = getQueryState(instance, {
        query: query2,
        params,
        tag: PROJECTION_TAG,
        perspective,
        resource
      }), subscription = defer(() => getCurrent() === void 0 ? from(resolveQuery(instance, {
        query: query2,
        params,
        tag: PROJECTION_TAG,
        signal: controller.signal,
        perspective,
        resource
      })).pipe(switchMap(() => observable)) : observable).pipe(filter((result) => result !== void 0)).subscribe(observer);
      return () => {
        controller.signal.aborted || controller.abort(), subscription.unsubscribe();
      };
    }), statusQuery$ = new Observable((observer) => {
      let { getCurrent, observable } = getQueryState(instance, {
        query: statusQuery,
        params: statusParams,
        tag: PROJECTION_TAG,
        perspective: "raw",
        resource
      }), subscription = defer(() => getCurrent() === void 0 ? from(resolveQuery(instance, {
        query: statusQuery,
        params: statusParams,
        tag: PROJECTION_TAG,
        signal: controller.signal,
        perspective: "raw",
        resource
      })).pipe(switchMap(() => observable)) : observable).pipe(filter((result) => result !== void 0)).subscribe(observer);
      return () => {
        subscription.unsubscribe();
      };
    });
    return combineLatest([projectionQuery$, statusQuery$]).pipe(filter((pair) => pair[0] !== void 0 && pair[1] !== void 0), map(([projection, status]) => ({
      data: projection,
      ids,
      statusResults: status
    })));
  }), map(({ ids, data, statusResults }) => {
    let documentStatuses = processStatusQueryResults(statusResults);
    return state.set("updateStatuses", (prev) => ({ documentStatuses: {
      ...prev.documentStatuses,
      ...documentStatuses
    } })), processProjectionQuery({
      ids,
      results: data,
      documentStatuses: state.get().documentStatuses,
      perspective
    });
  })).subscribe({
    next: (processedValues) => {
      state.set("updateResult", (prev) => {
        let nextValues = { ...prev.values };
        for (let docId in processedValues) processedValues[docId] && (nextValues[docId] = {
          ...prev.values[docId] ?? {},
          ...processedValues[docId]
        });
        return { values: nextValues };
      });
    },
    error: (err) => {
      console.error("Error fetching projection batches:", err);
    }
  });
  return new Subscription(() => {
    pendingUpdateSubscription.unsubscribe(), queryExecutionSubscription.unsubscribe();
  });
};
var projectionStore = defineStore({
  name: "Projection",
  getInitialState() {
    return {
      values: {},
      documentProjections: {},
      subscriptions: {},
      documentStatuses: {}
    };
  },
  initialize(context) {
    let batchSubscription = subscribeToStateAndFetchBatches(context);
    return () => batchSubscription.unsubscribe();
  }
});
function getProjectionState(...args) {
  return _getProjectionState(...args);
}
var _getProjectionState = bindActionByResourceAndPerspective(projectionStore, createStateSourceAction({
  selector: ({ state }, options) => {
    let documentId = getPublishedId(DocumentId(options.documentId)), projectionHash = hashString(options.projection);
    return state.values[documentId]?.[projectionHash] ?? STABLE_EMPTY_PROJECTION;
  },
  onSubscribe: ({ state }, options) => {
    let { projection, ...docHandle } = options, subscriptionId = randomId(16), documentId = getPublishedId(DocumentId(docHandle.documentId)), validProjection = validateProjection(projection), projectionHash = hashString(validProjection);
    return state.set("addSubscription", (prev) => ({
      documentProjections: {
        ...prev.documentProjections,
        [documentId]: {
          ...prev.documentProjections[documentId],
          [projectionHash]: validProjection
        }
      },
      subscriptions: {
        ...prev.subscriptions,
        [documentId]: {
          ...prev.subscriptions[documentId],
          [projectionHash]: {
            ...prev.subscriptions[documentId]?.[projectionHash],
            [subscriptionId]: true
          }
        }
      }
    })), () => {
      setCleanupTimeout(() => {
        state.set("removeSubscription", (prev) => {
          let documentSubscriptionsForHash = omitProperty(prev.subscriptions[documentId]?.[projectionHash], subscriptionId), hasSubscribersForProjection = !!Object.keys(documentSubscriptionsForHash).length, nextSubscriptions = { ...prev.subscriptions }, nextDocumentProjections = { ...prev.documentProjections }, nextValues = { ...prev.values };
          if (hasSubscribersForProjection) nextSubscriptions[documentId] && (nextSubscriptions[documentId][projectionHash] = documentSubscriptionsForHash);
          else {
            delete nextSubscriptions[documentId][projectionHash], delete nextDocumentProjections[documentId][projectionHash];
            let currentProjectionValue = prev.values[documentId]?.[projectionHash];
            currentProjectionValue && nextValues[documentId] && (nextValues[documentId][projectionHash] = {
              data: currentProjectionValue.data,
              isPending: false
            });
          }
          return Object.values(nextSubscriptions[documentId] ?? {}).some((subs) => Object.keys(subs).length > 0) || (delete nextSubscriptions[documentId], delete nextDocumentProjections[documentId]), {
            subscriptions: nextSubscriptions,
            documentProjections: nextDocumentProjections,
            values: nextValues
          };
        });
      }, 1e3);
    };
  }
}));
function resolveProjection(...args) {
  return _resolveProjection(...args);
}
var _resolveProjection = bindActionByResourceAndPerspective(projectionStore, ({ instance }, options) => firstValueFrom(getProjectionState(instance, options).observable.pipe(filter((state) => !!state?.data))));
function defineProjection(projection) {
  return projection;
}
function getCorsErrorProjectId(error2) {
  if (!(error2 instanceof CorsOriginError)) return null;
  let projMatch = (error2.message || "").match(/manage\/project\/([^/?#]+)/);
  return projMatch ? projMatch[1] : null;
}
function isImportError(error2) {
  if (!(error2 instanceof Error)) return false;
  if (error2.name === "ChunkLoadError") return true;
  let message = error2.message || "";
  return /Loading chunk [\w-]+ failed/i.test(message) || /Failed to fetch dynamically imported module/i.test(message) || /error loading dynamically imported module/i.test(message) || /Import(?:ing)? a module script failed/i.test(message) || /Unable to preload CSS/i.test(message);
}

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/topicStore-BJ54_X6H.js
var stateTopic = (seed) => ({
  kind: "state",
  seed
});
var dashboardEvent = {
  kind: "event",
  ownership: { type: "same_app" }
};
var DASHBOARD_TOPIC_MANIFEST = {
  "applications.base-path": stateTopic(void 0),
  "applications.config": stateTopic(void 0),
  "applications.foreground": stateTopic(void 0),
  "applications.list": stateTopic(void 0),
  "applications.status.update": dashboardEvent,
  "auth.token": stateTopic(void 0),
  "auth.token.refresh": dashboardEvent,
  "navigation.location": stateTopic(void 0),
  "navigation.location.update": dashboardEvent,
  "organizations.current": stateTopic(void 0),
  "panels.mode": stateTopic({
    ok: true,
    value: null
  }),
  "panels.mode.set": dashboardEvent,
  "preferences.color-scheme": stateTopic(void 0),
  "preferences.dock-locked": stateTopic(void 0),
  "users.current": stateTopic(void 0)
};
var topicMigrations = {};
var MessageBusError = class extends Error {
  /** Creates a message bus protocol error. */
  constructor(code, message, options) {
    super(message ?? code, options), _defineProperty(this, "code", void 0), this.name = "MessageBusError", this.code = code;
  }
};
var MESSAGE_BUS_KEY = Symbol.for("sanity.os.bus");
var MESSAGE_BUS_PROTOCOL_KEY = Symbol.for("sanity.os.protocol");
var MESSAGE_BUS_REGISTRY_KEY = Symbol.for("sanity.os.registry");
var MESSAGE_BUS_PENDING_REPLY_KEY = Symbol.for("sanity.os.request");
var DEFAULT_TIMEOUT_MS = 5e3;
var NO_VALUE = Symbol.for("sanity.os.no-value");
function resolveStateSubject(registry, connection, type) {
  if (connection.abort.signal.aborted) throw new MessageBusError("ABORTED");
  let subject = connection.stateSubjects.get(type);
  if (!subject) {
    let topic = registry.topics.get(type);
    topic || console.warn(`[sanity-sdk:message-bus] state topic "${type}" is not declared`);
    let seed = topic?.kind === "state" ? topic.seed : void 0;
    subject = new BehaviorSubject(seed === void 0 ? NO_VALUE : seed), connection.stateSubjects.set(type, subject);
  }
  return subject;
}
function toStateSource(values, getCurrent) {
  let source = values;
  source.getCurrent = getCurrent;
  let firstValue;
  return Object.defineProperty(source, "firstValue", { get: () => firstValue ??= firstValueFrom(values) }), source;
}
function assertCompatibleTopicManifest(registry, manifest) {
  for (let [type, entry] of Object.entries(manifest)) {
    let existing = registry.topics.get(type);
    if (existing && existing.kind !== entry.kind) throw new MessageBusError("PROTOCOL_MISMATCH", `topic "${type}" is declared "${entry.kind}" but the installed bus knows it as "${existing.kind}"`);
    if (existing?.kind === "event" && entry.kind === "event" && existing.ownership.type !== entry.ownership.type) throw new MessageBusError("OWNERSHIP_MISMATCH", `topic "${type}" has conflicting ownership`);
  }
}
function mergeTopicManifest(registry, manifest) {
  assertCompatibleTopicManifest(registry, manifest);
  for (let [type, entry] of Object.entries(manifest)) registry.topics.set(type, entry);
}
function resolveEventSubject(registry, type) {
  let subject = registry.eventSubjects.get(type);
  return subject || (subject = new Subject(), registry.eventSubjects.set(type, subject)), subject;
}
function settleReply(reply, outcome) {
  reply.settled || (reply.settled = true, reply.settlePromise ? reply.settlePromise(outcome) : reply.outcomeBeforeAwait = outcome);
}
function createEventMessage(appId, moduleId, type, payload, pendingReply) {
  let message = {
    type,
    payload,
    meta: {
      appId,
      moduleId,
      timestamp: Date.now()
    },
    reply: (value) => {
      if (pendingReply.settled) {
        console.warn(`[sanity-sdk:message-bus] reply ignored for "${type}": no waiting caller or already replied`);
        return;
      }
      settleReply(pendingReply, {
        ok: true,
        value
      });
    },
    get signal() {
      return pendingReply.responderSignal;
    }
  };
  return message[MESSAGE_BUS_PENDING_REPLY_KEY] = pendingReply, message;
}
function createReplyPromise(pendingReply, options) {
  return new Promise((resolve, reject) => {
    let settlePromise = (outcome) => outcome.ok ? resolve(outcome.value) : reject(outcome.error);
    if (pendingReply.outcomeBeforeAwait) {
      pendingReply.responderAbort.abort(), settlePromise(pendingReply.outcomeBeforeAwait);
      return;
    }
    if (!options.hadResponderAtEmission) {
      reject(new MessageBusError("NO_RESPONDER"));
      return;
    }
    let timeoutMs = options.timeout === void 0 ? DEFAULT_TIMEOUT_MS : options.timeout, timer2, onAbort = () => settleReply(pendingReply, {
      ok: false,
      error: new MessageBusError("ABORTED")
    });
    pendingReply.settlePromise = (outcome) => {
      timer2 !== void 0 && clearTimeout(timer2), options.signal?.removeEventListener("abort", onAbort), pendingReply.responderAbort.abort(), settlePromise(outcome);
    }, timeoutMs !== null && (timer2 = setTimeout(() => settleReply(pendingReply, {
      ok: false,
      error: new MessageBusError("TIMEOUT")
    }), timeoutMs)), options.signal && (options.signal.aborted ? onAbort() : options.signal.addEventListener("abort", onAbort, { once: true }));
  });
}
function createLazyReply(awaitReply) {
  return {
    then: (onFulfilled, onRejected) => awaitReply().then(onFulfilled, onRejected),
    catch: (onRejected) => awaitReply().then(void 0, onRejected),
    finally: (onFinally) => awaitReply().finally(onFinally)
  };
}
function emitEvent(registry, type, payload, options, appId, moduleId) {
  let hadResponderAtEmission = (registry.responderCounts.get(type) ?? 0) > 0, responderAbort = new AbortController(), pendingReply = {
    responderAbort,
    responderSignal: scopeSignal(options?.signal, responderAbort.signal),
    settled: false
  };
  resolveEventSubject(registry, type).next(createEventMessage(appId, moduleId, type, payload, pendingReply));
  let awaitReply = () => pendingReply.replyPromise ??= createReplyPromise(pendingReply, {
    ...options,
    hadResponderAtEmission
  });
  return createLazyReply(awaitReply);
}
var isStateTopic = (registry, type) => registry.topics.get(type)?.kind === "state";
var canRespond = (registry, ownership, appId) => ownership.type === "any_app" || appId === registry.appId;
function emit2(registry, type, payload, options, appId, moduleId, connectionSignal) {
  if (isStateTopic(registry, type)) throw new MessageBusError("OWNERSHIP_MISMATCH", `Cannot emit state topic "${type}" from app "${appId}". The host writes state to each connection through its client handle. Read it with query() or subscribe().`);
  return emitEvent(registry, type, payload, {
    ...options,
    signal: scopeSignal(options?.signal, registry.resetAbort.signal, connectionSignal)
  }, appId, moduleId);
}
function emitState(registry, connection, type, value) {
  let subject = resolveStateSubject(registry, connection, type);
  Object.is(subject.getValue(), value) || subject.next(value);
}
function query(source, type, options, connectionSignal, resetSignal) {
  let current = source.getCurrent();
  if (current !== void 0) return Promise.resolve(current);
  let signal = scopeSignal(options?.signal, resetSignal, connectionSignal);
  if (signal.aborted) return Promise.reject(new MessageBusError("ABORTED"));
  let timeoutMs = options?.timeout === void 0 ? DEFAULT_TIMEOUT_MS : options.timeout;
  return new Promise((resolve, reject) => {
    let timer2 = timeoutMs === null ? void 0 : setTimeout(() => reject(new MessageBusError("TIMEOUT", `query("${type}") timed out`)), timeoutMs), clear = () => {
      timer2 !== void 0 && clearTimeout(timer2);
    }, onAbort = () => {
      clear(), reject(new MessageBusError("ABORTED"));
    };
    signal?.addEventListener("abort", onAbort, { once: true }), source.firstValue.then((value) => {
      clear(), signal?.removeEventListener("abort", onAbort), resolve(value);
    }, (error2) => {
      clear(), signal?.removeEventListener("abort", onAbort), reject(error2);
    });
  });
}
function unsubscribeOnAbort(subscription, signal) {
  if (signal) {
    if (signal.aborted) {
      subscription.unsubscribe();
      return;
    }
    signal.addEventListener("abort", () => subscription.unsubscribe(), { once: true });
  }
}
function scopeSignal(signal, ...lifecycles) {
  return signal ? AbortSignal.any([signal, ...lifecycles]) : AbortSignal.any(lifecycles);
}
function invokeResponder(handler, message) {
  let pendingReply = message[MESSAGE_BUS_PENDING_REPLY_KEY], fail = (error2) => {
    pendingReply && settleReply(pendingReply, {
      ok: false,
      error: new MessageBusError("HANDLER_THREW", void 0, { cause: error2 })
    });
  };
  try {
    let result = handler(message);
    result instanceof Promise && result.catch(fail);
  } catch (error2) {
    fail(error2);
  }
}
function respond(registry, type, handler, options, appId, connectionSignal) {
  let topic = registry.topics.get(type);
  if (topic?.kind === "event" && !canRespond(registry, topic.ownership, appId)) throw new MessageBusError("OWNERSHIP_MISMATCH", `Cannot register a handler for event topic "${type}" from app "${appId}". Only the app that owns this topic can respond to it. Other apps can send it with emit().`);
  registry.responderCounts.set(type, (registry.responderCounts.get(type) ?? 0) + 1);
  let subscription = resolveEventSubject(registry, type).subscribe((message) => invokeResponder(handler, message));
  subscription.add(() => {
    let count = registry.responderCounts.get(type) ?? 0;
    count > 0 && registry.responderCounts.set(type, count - 1);
  }), unsubscribeOnAbort(subscription, scopeSignal(options?.signal, registry.resetAbort.signal, connectionSignal));
}
var bundledMigrations = () => new Map(Object.entries(topicMigrations));
var identityMigration = {
  up: (value) => value,
  down: (value) => value
};
function effectiveTopicVersions(migrations) {
  let versions = /* @__PURE__ */ new Map();
  for (let [topic, steps] of migrations) {
    let version2 = 1;
    for (let step of steps) step.to > version2 && (version2 = step.to);
    versions.set(topic, version2);
  }
  return versions;
}
function migrationTransformAt(steps, version2, select) {
  let step = steps?.find((candidate) => candidate.from === version2);
  return (step ? select(step) : void 0) ?? identityMigration;
}
function migrateVersionedValue(steps, value, from2, to, select) {
  if (from2 === to) return value;
  let current = value;
  if (from2 < to) for (let version2 = from2; version2 < to; version2++) current = migrationTransformAt(steps, version2, select).up(current);
  else for (let version2 = from2; version2 > to; version2--) current = migrationTransformAt(steps, version2 - 1, select).down(current);
  return current;
}
function createTopicCompatibility(installedMigrations, applicationMigrations) {
  let installedVersions = effectiveTopicVersions(installedMigrations), applicationVersions = effectiveTopicVersions(applicationMigrations), applicationVersion = (type) => applicationVersions.get(type) ?? 1, installedVersion = (type) => installedVersions.get(type) ?? 1, migrationChainFor = (type) => (applicationVersion(type) > installedVersion(type) ? applicationMigrations : installedMigrations).get(type), createVersionAdapter = (select) => ({
    toInstalled: (type, value) => migrateVersionedValue(migrationChainFor(type), value, applicationVersion(type), installedVersion(type), select),
    toApplication: (type, value) => migrateVersionedValue(migrationChainFor(type), value, installedVersion(type), applicationVersion(type), select)
  }), stateValueAndEventPayload = createVersionAdapter((step) => step), eventReply = createVersionAdapter((step) => step.reply);
  return {
    toInstalledEmission: stateValueAndEventPayload.toInstalled,
    toApplicationStateValue: stateValueAndEventPayload.toApplication,
    toApplicationEventPayload: stateValueAndEventPayload.toApplication,
    toInstalledEventReply: eventReply.toInstalled,
    toApplicationEventReply: eventReply.toApplication
  };
}
function projectCurrent(input, project2) {
  let lastInput, lastOutput, cached = false;
  return () => {
    let current = input();
    if (current !== void 0) return (!cached || current !== lastInput) && (lastInput = current, lastOutput = project2(current), cached = true), lastOutput;
  };
}
function createStateSource(subject, project2, completeOn) {
  let getCurrent = () => {
    let current = subject.getValue();
    return current === NO_VALUE ? void 0 : current;
  };
  return toStateSource(subject.pipe(filter((value) => value !== NO_VALUE), map(project2), takeUntil(completeOn)), projectCurrent(getCurrent, project2));
}
function migrateEventMessage(message, payload, reply) {
  return {
    type: message.type,
    payload: payload(message.payload),
    meta: message.meta,
    reply: (value) => message.reply(reply(value)),
    get signal() {
      return message.signal;
    }
  };
}
function migrateEventReply(result, project2) {
  let projected;
  return createLazyReply(() => projected ??= Promise.resolve(result).then(project2));
}
function createRejectedConnection(connectionError) {
  let throwConnectionError = () => {
    throw connectionError();
  };
  return {
    emit: throwConnectionError,
    query: () => Promise.reject(connectionError()),
    subscribe: throwConnectionError,
    disconnect: () => {
    }
  };
}
function connectApplicationToMessageBus(installedMessageBus, config) {
  config.appId || throwMissingAppId();
  let { appId } = config, installedProtocol = installedMessageBus[MESSAGE_BUS_PROTOCOL_KEY];
  if (installedProtocol !== 1) return console.error(`[sanity-sdk:message-bus] protocol mismatch for "${appId}": installed ${String(installedProtocol)}, this copy speaks 1`), createRejectedConnection(() => new MessageBusError("PROTOCOL_MISMATCH", `installed message bus speaks protocol ${String(installedProtocol)}, this copy speaks 1`));
  let registry = installedMessageBus[MESSAGE_BUS_REGISTRY_KEY];
  if (!registry) return console.error(`[sanity-sdk:message-bus] incompatible message bus for "${appId}"`), createRejectedConnection(() => new MessageBusError("PROTOCOL_MISMATCH", "installed message bus does not expose a compatible registry"));
  try {
    mergeTopicManifest(registry, DASHBOARD_TOPIC_MANIFEST);
  } catch (error2) {
    return console.error(`[sanity-sdk:message-bus] topic manifest conflict for "${appId}"`, { error: error2 }), createRejectedConnection(() => error2);
  }
  return createConnection2(registry, config);
}
function createClient2(registry, record, compatibility) {
  return {
    appId: record.appId,
    moduleId: record.moduleId,
    closed: record.abort.signal,
    emit: (type, value) => {
      if (record.abort.signal.aborted) {
        console.warn(`[sanity-sdk:message-bus] "${type}" not written: connection "${record.moduleId}" has closed`);
        return;
      }
      emitState(registry, record, type, compatibility.toInstalledEmission(type, value));
    }
  };
}
function createConnectionsSource(registry, self2, compatibility, completeOn) {
  let clients = /* @__PURE__ */ new WeakMap(), clientFor = (record) => {
    let client = clients.get(record);
    return client || (client = createClient2(registry, record, compatibility), clients.set(record, client)), client;
  };
  return defer(() => concat(from([...registry.connections]), registry.connected$)).pipe(filter((record) => record !== self2), map(clientFor), takeUntil(completeOn));
}
function createConnection2(registry, config) {
  let { appId } = config, moduleId = config.moduleId ?? appId, connectionAbort = new AbortController(), connectionSignal = connectionAbort.signal, connectionAborted$ = new ReplaySubject(1);
  connectionSignal.addEventListener("abort", () => connectionAborted$.next(), { once: true });
  let record = {
    appId,
    moduleId,
    stateSubjects: /* @__PURE__ */ new Map(),
    abort: connectionAbort
  }, compatibility = createTopicCompatibility(registry.migrations, config.migrations ?? bundledMigrations()), isState = (type) => isStateTopic(registry, type), applicationStreams = /* @__PURE__ */ new Map(), streamGeneration = registry.generation, cachedStream = (type, create) => {
    streamGeneration !== registry.generation && (applicationStreams.clear(), streamGeneration = registry.generation);
    let stream = applicationStreams.get(type);
    return stream || (stream = create(), applicationStreams.set(type, stream)), stream;
  }, stateSource = (type) => cachedStream(type, () => createStateSource(resolveStateSubject(registry, record, type), (value) => compatibility.toApplicationStateValue(type, value), connectionAborted$)), eventStream = (type) => cachedStream(type, () => resolveEventSubject(registry, type).pipe(map((message) => compatibility.toApplicationEventPayload(type, message.payload)), takeUntil(connectionAborted$))), throwIfDisconnected = () => {
    if (connectionSignal.aborted) throw new MessageBusError("ABORTED");
  }, connection = {
    emit: (type, payload, options) => (throwIfDisconnected(), migrateEventReply(emit2(registry, type, compatibility.toInstalledEmission(type, payload), options, appId, moduleId, connectionSignal), (value) => compatibility.toApplicationEventReply(type, value))),
    query: (type, options) => connectionSignal.aborted ? Promise.reject(new MessageBusError("ABORTED")) : query(stateSource(type), type, options, connectionSignal, registry.resetAbort.signal),
    subscribe: (type, handler, options) => {
      if (throwIfDisconnected(), isState(type)) {
        let source = stateSource(type);
        if (!handler) return source;
        unsubscribeOnAbort(source.subscribe(handler), scopeSignal(options?.signal, registry.resetAbort.signal, connectionSignal));
        return;
      }
      if (!handler) return eventStream(type);
      respond(registry, type, (message) => handler(migrateEventMessage(message, (value) => compatibility.toApplicationEventPayload(type, value), (value) => compatibility.toInstalledEventReply(type, value))), options, appId, connectionSignal);
    },
    disconnect: () => {
      if (!connectionSignal.aborted) {
        connectionAbort.abort();
        for (let subject of record.stateSubjects.values()) subject.complete();
        record.stateSubjects.clear(), registry.connections.delete(record);
      }
    }
  };
  appId === registry.appId && Object.assign(connection, { connections: createConnectionsSource(registry, record, compatibility, connectionAborted$) });
  let instance = connection;
  return instance[MESSAGE_BUS_REGISTRY_KEY] = registry, instance[MESSAGE_BUS_PROTOCOL_KEY] = 1, registry.connections.add(record), registry.connected$.next(record), instance;
}
function throwMissingAppId() {
  throw new MessageBusError("MISSING_APP_ID", "Cannot initialize the message bus without an app ID. Build the application with the Sanity CLI or pass an app ID when connecting.");
}
var resolveAppId = (appId) => appId ?? (typeof __SANITY_APP_ID__ == "string" ? __SANITY_APP_ID__ : void 0);
function getInstalledMessageBus() {
  let bus = globalThis[MESSAGE_BUS_KEY];
  return typeof bus == "object" && bus && MESSAGE_BUS_REGISTRY_KEY in bus ? bus : void 0;
}
function isMessageBusInstalled() {
  return getInstalledMessageBus() !== void 0;
}
function connectMessageBus(options = {}) {
  let installedMessageBus = getInstalledMessageBus();
  if (!installedMessageBus) return;
  let appId = resolveAppId(options.appId);
  if (!appId) {
    console.warn("[sanity-sdk:message-bus] cannot connect without an app ID; build with the Sanity CLI or pass appId");
    return;
  }
  let connection = connectApplicationToMessageBus(installedMessageBus, {
    appId,
    moduleId: options.moduleId
  });
  return MESSAGE_BUS_REGISTRY_KEY in connection ? connection : void 0;
}
var getDashboardMessageBus = createActionBinder((instance) => ({ name: instance.instanceId }))(defineStore({
  name: "dashboardMessageBus",
  getInitialState: () => ({}),
  initialize: ({ state }) => () => state.get().connection?.disconnect()
}), ({ state }, moduleId) => {
  let current = state.get().connection;
  if (current) return current;
  if (!isMessageBusInstalled()) return;
  let connection = connectMessageBus({ moduleId });
  if (connection) return state.set("connect", { connection }), connection;
});
function requireDashboardMessageBus(instance, action) {
  let messageBus = getDashboardMessageBus(instance);
  if (!messageBus) throw Error(`Cannot ${action} without an installed dashboard message bus`);
  return messageBus;
}
function isDashboardEnvironment() {
  return isMessageBusInstalled();
}
var TopicError = class extends Error {
  /** Creates an error for a failed topic. */
  constructor(topic) {
    super(`Topic "${topic}" failed`), _defineProperty(this, "topic", void 0), this.name = "TopicError", this.topic = topic;
  }
};
function isTopicResult(value) {
  return typeof value == "object" && !!value && "ok" in value && typeof value.ok == "boolean";
}
function unwrapTopicResult(topic, value) {
  if (!isTopicResult(value)) return value;
  if (!value.ok) throw new TopicError(topic);
  return value.value;
}
var TOPIC_STATE_CLEAR_DELAY = 1e3;
var bindActionByInstance = createActionBinder((instance) => ({ name: instance.instanceId }));
var dashboardTopicsStore = defineStore({
  name: "dashboardTopics",
  getInitialState: () => ({ topics: {} })
});
var getMessageBus = (instance, topic) => requireDashboardMessageBus(instance, `read topic "${topic}"`);
function getSource(instance, topic) {
  return getMessageBus(instance, topic).subscribe(topic);
}
var updateEntry2 = (topic, update) => (state) => {
  let { [topic]: entry = { subscribers: 0 }, ...rest } = state.topics, next = update(entry);
  return { topics: next.subscribers > 0 ? {
    ...rest,
    [topic]: next
  } : rest };
};
var addSubscriber2 = (topic) => updateEntry2(topic, (entry) => ({
  ...entry,
  subscribers: entry.subscribers + 1
}));
var removeSubscriber2 = (topic) => updateEntry2(topic, (entry) => ({
  ...entry,
  subscribers: entry.subscribers - 1
}));
var getTopicState = bindActionByInstance(dashboardTopicsStore, createStateSourceAction({
  selector: ({ state, instance }, topic) => {
    let current = getSource(instance, topic).getCurrent(), entry = state.topics[topic];
    if (current === void 0 && entry?.error) throw entry.error;
    return unwrapTopicResult(topic, current);
  },
  onSubscribe: ({ state, instance }, topic) => {
    state.set("addSubscriber", addSubscriber2(topic));
    let subscription = getSource(instance, topic).subscribe(() => state.set("publish", updateEntry2(topic, (entry) => ({ ...entry }))));
    return () => {
      subscription.unsubscribe(), setCleanupTimeout(() => state.set("removeSubscriber", removeSubscriber2(topic)), TOPIC_STATE_CLEAR_DELAY);
    };
  }
}));
var resolveTopic = bindActionByInstance(dashboardTopicsStore, ({ state, instance }, topic) => {
  let existing = state.get().topics[topic]?.pending;
  if (existing) return existing;
  let release = () => setCleanupTimeout(() => state.set("removeSubscriber", removeSubscriber2(topic)), TOPIC_STATE_CLEAR_DELAY), pending = getMessageBus(instance, topic).query(topic).then(() => state.set("resolved", updateEntry2(topic, ({ pending: _pending, ...entry }) => entry)), (error2) => state.set("failed", updateEntry2(topic, ({ pending: _pending, ...entry }) => ({
    ...entry,
    error: error2
  }))));
  return pending.then(release, release), state.set("query", updateEntry2(topic, (entry) => ({
    ...entry,
    pending,
    subscribers: entry.subscribers + 1
  }))), pending;
});

// ../../node_modules/.pnpm/@sanity+image-url@2.1.1/node_modules/@sanity/image-url/lib/_chunks-es/compat.js
var example = "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg";
function parseAssetId(ref) {
  const [, id2, dimensionString, format2] = ref.split("-");
  if (!id2 || !dimensionString || !format2)
    throw new Error(`Malformed asset _ref '${ref}'. Expected an id like "${example}".`);
  const [imgWidthStr, imgHeightStr] = dimensionString.split("x"), width = +imgWidthStr, height = +imgHeightStr;
  if (!(isFinite(width) && isFinite(height)))
    throw new Error(`Malformed asset _ref '${ref}'. Expected an id like "${example}".`);
  return { id: id2, width, height, format: format2 };
}
var isRef = (src) => {
  const source = src;
  return source ? typeof source._ref == "string" : false;
};
var isAsset = (src) => {
  const source = src;
  return source ? typeof source._id == "string" : false;
};
var isAssetStub = (src) => {
  const source = src;
  return source && source.asset ? typeof source.asset.url == "string" : false;
};
var isInProgressUpload = (src) => {
  if (typeof src == "object" && src !== null) {
    const obj = src;
    return obj._upload && (!obj.asset || !obj.asset._ref);
  }
  return false;
};
function parseSource(source) {
  if (!source)
    return null;
  let image;
  if (typeof source == "string" && isUrl(source))
    image = {
      asset: { _ref: urlToId(source) }
    };
  else if (typeof source == "string")
    image = {
      asset: { _ref: source }
    };
  else if (isRef(source))
    image = {
      asset: source
    };
  else if (isAsset(source))
    image = {
      asset: {
        _ref: source._id || ""
      }
    };
  else if (isAssetStub(source))
    image = {
      asset: {
        _ref: urlToId(source.asset.url)
      }
    };
  else if (typeof source.asset == "object")
    image = { ...source };
  else
    return null;
  const img = source;
  return img.crop && (image.crop = img.crop), img.hotspot && (image.hotspot = img.hotspot), applyDefaults2(image);
}
function isUrl(url) {
  return /^https?:\/\//.test(`${url}`);
}
function urlToId(url) {
  return `image-${url.split("/").slice(-1)[0]}`.replace(/\.([a-z]+)$/, "-$1");
}
function applyDefaults2(image) {
  if (image.crop && image.hotspot)
    return image;
  const result = { ...image };
  return result.crop || (result.crop = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }), result.hotspot || (result.hotspot = {
    x: 0.5,
    y: 0.5,
    height: 1,
    width: 1
  }), result;
}
var SPEC_NAME_TO_URL_NAME_MAPPINGS = [
  ["width", "w"],
  ["height", "h"],
  ["format", "fm"],
  ["download", "dl"],
  ["blur", "blur"],
  ["sharpen", "sharp"],
  ["invert", "invert"],
  ["orientation", "or"],
  ["minHeight", "min-h"],
  ["maxHeight", "max-h"],
  ["minWidth", "min-w"],
  ["maxWidth", "max-w"],
  ["quality", "q"],
  ["fit", "fit"],
  ["crop", "crop"],
  ["saturation", "sat"],
  ["auto", "auto"],
  ["dpr", "dpr"],
  ["pad", "pad"],
  ["frame", "frame"]
];
function urlForImage(options) {
  let spec = { ...options || {} };
  const source = spec.source;
  delete spec.source;
  const image = parseSource(source);
  if (!image) {
    if (source && isInProgressUpload(source))
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QNViZkAAAAASUVORK5CYII=";
    throw new Error(`Unable to resolve image URL from source (${JSON.stringify(source)})`);
  }
  const id2 = image.asset._ref || image.asset._id || "", asset = parseAssetId(id2), cropLeft = Math.round(image.crop.left * asset.width), cropTop = Math.round(image.crop.top * asset.height), crop = {
    left: cropLeft,
    top: cropTop,
    width: Math.round(asset.width - image.crop.right * asset.width - cropLeft),
    height: Math.round(asset.height - image.crop.bottom * asset.height - cropTop)
  }, hotSpotVerticalRadius = image.hotspot.height * asset.height / 2, hotSpotHorizontalRadius = image.hotspot.width * asset.width / 2, hotSpotCenterX = image.hotspot.x * asset.width, hotSpotCenterY = image.hotspot.y * asset.height, hotspot = {
    left: hotSpotCenterX - hotSpotHorizontalRadius,
    top: hotSpotCenterY - hotSpotVerticalRadius,
    right: hotSpotCenterX + hotSpotHorizontalRadius,
    bottom: hotSpotCenterY + hotSpotVerticalRadius
  };
  return spec.rect || spec.focalPoint || spec.ignoreImageParams || spec.crop || (spec = { ...spec, ...fit({ crop, hotspot }, spec) }), specToImageUrl({ ...spec, asset });
}
function specToImageUrl(spec) {
  const cdnUrl = (spec.baseUrl || "https://cdn.sanity.io").replace(/\/+$/, ""), vanityStub = spec.vanityName ? `/${spec.vanityName}` : "", filename = `${spec.asset.id}-${spec.asset.width}x${spec.asset.height}.${spec.asset.format}${vanityStub}`;
  let baseUrl;
  spec.mediaLibraryId ? baseUrl = `${cdnUrl}/media-libraries/${spec.mediaLibraryId}/images/${filename}` : spec.canvasId ? baseUrl = `${cdnUrl}/images/canvases/${spec.canvasId}/${filename}` : baseUrl = `${cdnUrl}/images/${spec.projectId}/${spec.dataset}/${filename}`;
  const params = [];
  if (spec.rect) {
    const { left, top, width, height } = spec.rect;
    (left !== 0 || top !== 0 || height !== spec.asset.height || width !== spec.asset.width) && params.push(`rect=${left},${top},${width},${height}`);
  }
  spec.bg && params.push(`bg=${spec.bg}`), spec.focalPoint && (params.push(`fp-x=${spec.focalPoint.x}`), params.push(`fp-y=${spec.focalPoint.y}`));
  const flip = [spec.flipHorizontal && "h", spec.flipVertical && "v"].filter(Boolean).join("");
  return flip && params.push(`flip=${flip}`), SPEC_NAME_TO_URL_NAME_MAPPINGS.forEach((mapping) => {
    const [specName, param] = mapping;
    typeof spec[specName] < "u" ? params.push(`${param}=${encodeURIComponent(spec[specName])}`) : typeof spec[param] < "u" && params.push(`${param}=${encodeURIComponent(spec[param])}`);
  }), params.length === 0 ? baseUrl : `${baseUrl}?${params.join("&")}`;
}
function fit(source, spec) {
  let cropRect;
  const imgWidth = spec.width, imgHeight = spec.height;
  if (!(imgWidth && imgHeight))
    return { width: imgWidth, height: imgHeight, rect: source.crop };
  const crop = source.crop, hotspot = source.hotspot, desiredAspectRatio = imgWidth / imgHeight;
  if (crop.width / crop.height > desiredAspectRatio) {
    const height = Math.round(crop.height), width = Math.round(height * desiredAspectRatio), top = Math.max(0, Math.round(crop.top)), hotspotXCenter = Math.round((hotspot.right - hotspot.left) / 2 + hotspot.left);
    let left = Math.max(0, Math.round(hotspotXCenter - width / 2));
    left < crop.left ? left = crop.left : left + width > crop.left + crop.width && (left = crop.left + crop.width - width), cropRect = { left, top, width, height };
  } else {
    const width = crop.width, height = Math.round(width / desiredAspectRatio), left = Math.max(0, Math.round(crop.left)), hotspotYCenter = Math.round((hotspot.bottom - hotspot.top) / 2 + hotspot.top);
    let top = Math.max(0, Math.round(hotspotYCenter - height / 2));
    top < crop.top ? top = crop.top : top + height > crop.top + crop.height && (top = crop.top + crop.height - height), cropRect = { left, top, width, height };
  }
  return {
    width: imgWidth,
    height: imgHeight,
    rect: cropRect
  };
}
var validFits = ["clip", "crop", "fill", "fillmax", "max", "scale", "min"];
var validCrops = ["top", "bottom", "left", "right", "center", "focalpoint", "entropy"];
var validAutoModes = ["format"];
function isSanityModernClientLike(client) {
  return client && "config" in client ? typeof client.config == "function" : false;
}
function isSanityClientLike(client) {
  return client && "clientConfig" in client ? typeof client.clientConfig == "object" : false;
}
function clientConfigToOptions(config) {
  const { apiHost: apiUrl, projectId, dataset } = config, baseOptions = {
    baseUrl: (apiUrl || "https://api.sanity.io").replace(/^https:\/\/api\./, "https://cdn.")
  }, resource = config.resource ?? config["~experimental_resource"];
  if (resource?.type === "media-library") {
    if (typeof resource.id != "string" || resource.id.length === 0)
      throw new Error('Media library clients must include an id in "resource"');
    return { ...baseOptions, mediaLibraryId: resource.id };
  }
  if (resource?.type === "canvas") {
    if (typeof resource.id != "string" || resource.id.length === 0)
      throw new Error('Canvas clients must include an id in "resource"');
    return { ...baseOptions, canvasId: resource.id };
  }
  if (resource?.type === "dataset") {
    if (typeof resource.id != "string" || resource.id.length === 0)
      throw new Error('Dataset clients must include an id in "resource"');
    const [resourceProjectId, resourceDataset] = resource.id.split(".");
    if (!resourceProjectId || !resourceDataset)
      throw new Error(
        'Dataset resource id must be in the format "projectId.dataset", got: ' + resource.id
      );
    return { ...baseOptions, projectId: resourceProjectId, dataset: resourceDataset };
  }
  return { ...baseOptions, projectId, dataset };
}
function rewriteSpecName(key) {
  const specs = SPEC_NAME_TO_URL_NAME_MAPPINGS;
  for (const entry of specs) {
    const [specName, param] = entry;
    if (key === specName || key === param)
      return specName;
  }
  return key;
}
function getOptions(_options) {
  let options = {};
  return isSanityModernClientLike(_options) ? options = clientConfigToOptions(_options.config()) : isSanityClientLike(_options) ? options = clientConfigToOptions(_options.clientConfig) : options = _options || {}, options;
}
function createBuilder(Builder, _options) {
  const options = getOptions(_options);
  return new Builder(null, options);
}
function createImageUrlBuilder(options) {
  return createBuilder(ImageUrlBuilderImpl, options);
}
function constructNewOptions(currentOptions, options) {
  const baseUrl = options.baseUrl || currentOptions.baseUrl, newOptions = { baseUrl };
  for (const key in options)
    if (options.hasOwnProperty(key)) {
      const specKey = rewriteSpecName(key);
      newOptions[specKey] = options[key];
    }
  return { baseUrl, ...newOptions };
}
var ImageUrlBuilderImpl = class _ImageUrlBuilderImpl {
  options;
  constructor(parent, options) {
    this.options = parent ? { ...parent.options || {}, ...options || {} } : { ...options || {} };
  }
  withOptions(options) {
    const newOptions = constructNewOptions(this.options, options);
    return new _ImageUrlBuilderImpl(this, newOptions);
  }
  // The image to be represented. Accepts a Sanity 'image'-document, 'asset'-document or
  // _id of asset. To get the benefit of automatic hot-spot/crop integration with the content
  // studio, the 'image'-document must be provided.
  image(source) {
    return this.withOptions({ source });
  }
  // Specify the dataset
  dataset(dataset) {
    return this.withOptions({ dataset });
  }
  // Specify the projectId
  projectId(projectId) {
    return this.withOptions({ projectId });
  }
  withClient(client) {
    const newOptions = getOptions(client), preservedOptions = { ...this.options };
    return delete preservedOptions.baseUrl, delete preservedOptions.projectId, delete preservedOptions.dataset, delete preservedOptions.mediaLibraryId, delete preservedOptions.canvasId, new _ImageUrlBuilderImpl(null, { ...newOptions, ...preservedOptions });
  }
  // Specify background color
  bg(bg) {
    return this.withOptions({ bg });
  }
  // Set DPR scaling factor
  dpr(dpr) {
    return this.withOptions(dpr && dpr !== 1 ? { dpr } : {});
  }
  // Specify the width of the image in pixels
  width(width) {
    return this.withOptions({ width });
  }
  // Specify the height of the image in pixels
  height(height) {
    return this.withOptions({ height });
  }
  // Specify focal point in fraction of image dimensions. Each component 0.0-1.0
  focalPoint(x, y2) {
    return this.withOptions({ focalPoint: { x, y: y2 } });
  }
  maxWidth(maxWidth) {
    return this.withOptions({ maxWidth });
  }
  minWidth(minWidth) {
    return this.withOptions({ minWidth });
  }
  maxHeight(maxHeight) {
    return this.withOptions({ maxHeight });
  }
  minHeight(minHeight) {
    return this.withOptions({ minHeight });
  }
  // Specify width and height in pixels
  size(width, height) {
    return this.withOptions({ width, height });
  }
  // Specify blur between 0 and 100
  blur(blur) {
    return this.withOptions({ blur });
  }
  sharpen(sharpen) {
    return this.withOptions({ sharpen });
  }
  // Specify the desired rectangle of the image
  rect(left, top, width, height) {
    return this.withOptions({ rect: { left, top, width, height } });
  }
  // Specify the image format of the image. 'jpg', 'pjpg', 'png', 'webp'
  format(format2) {
    return this.withOptions({ format: format2 });
  }
  invert(invert) {
    return this.withOptions({ invert });
  }
  // Rotation in degrees 0, 90, 180, 270
  orientation(orientation) {
    return this.withOptions({ orientation });
  }
  // Compression quality 0-100
  quality(quality) {
    return this.withOptions({ quality });
  }
  // Make it a download link. Parameter is default filename.
  forceDownload(download) {
    return this.withOptions({ download });
  }
  // Flip image horizontally
  flipHorizontal() {
    return this.withOptions({ flipHorizontal: true });
  }
  // Flip image vertically
  flipVertical() {
    return this.withOptions({ flipVertical: true });
  }
  // Ignore crop/hotspot from image record, even when present
  ignoreImageParams() {
    return this.withOptions({ ignoreImageParams: true });
  }
  fit(value) {
    if (validFits.indexOf(value) === -1)
      throw new Error(`Invalid fit mode "${value}"`);
    return this.withOptions({ fit: value });
  }
  crop(value) {
    if (validCrops.indexOf(value) === -1)
      throw new Error(`Invalid crop mode "${value}"`);
    return this.withOptions({ crop: value });
  }
  // Saturation
  saturation(saturation) {
    return this.withOptions({ saturation });
  }
  auto(value) {
    if (validAutoModes.indexOf(value) === -1)
      throw new Error(`Invalid auto mode "${value}"`);
    return this.withOptions({ auto: value });
  }
  // Specify the number of pixels to pad the image
  pad(pad) {
    return this.withOptions({ pad });
  }
  // Vanity URL for more SEO friendly URLs
  vanityName(value) {
    return this.withOptions({ vanityName: value });
  }
  frame(frame) {
    if (frame !== 1)
      throw new Error(`Invalid frame value "${frame}"`);
    return this.withOptions({ frame });
  }
  // Gets the url based on the submitted parameters
  url() {
    return urlForImage(this.options);
  }
  // Alias for url()
  toString() {
    return this.url();
  }
};
function once(fn) {
  let didCall = false, returnValue;
  return (...args) => (didCall || (returnValue = fn(...args), didCall = true), returnValue);
}
var createWarningPrinter = (message) => once((...args) => {
  console.warn(message.join(" "), ...args);
});
var printNoDefaultExport = createWarningPrinter([
  "The default export of @sanity/image-url has been deprecated. Use the named export `createImageUrlBuilder` instead."
]);
function defineDeprecated(createImageUrlBuilder2) {
  return function(options) {
    return printNoDefaultExport(), createImageUrlBuilder2(options);
  };
}

// ../../node_modules/.pnpm/@sanity+image-url@2.1.1/node_modules/@sanity/image-url/lib/index.js
var deprecatedcreateImageUrlBuilder = defineDeprecated(createImageUrlBuilder);

// ../../node_modules/.pnpm/typeid-js@0.3.0/node_modules/typeid-js/dist/chunk-4WQUCFGE.mjs
var alphabet = "0123456789abcdefghjkmnpqrstvwxyz";
var dec3 = new Uint8Array([
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  255,
  18,
  19,
  255,
  20,
  21,
  255,
  22,
  23,
  24,
  25,
  26,
  255,
  27,
  28,
  29,
  30,
  31,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255
]);
function encode3(src) {
  const dst = new Array(26).fill("");
  if (src.length !== 16) {
    throw new Error("Invalid length");
  }
  dst[0] = alphabet[(src[0] & 224) >> 5];
  dst[1] = alphabet[src[0] & 31];
  dst[2] = alphabet[(src[1] & 248) >> 3];
  dst[3] = alphabet[(src[1] & 7) << 2 | (src[2] & 192) >> 6];
  dst[4] = alphabet[(src[2] & 62) >> 1];
  dst[5] = alphabet[(src[2] & 1) << 4 | (src[3] & 240) >> 4];
  dst[6] = alphabet[(src[3] & 15) << 1 | (src[4] & 128) >> 7];
  dst[7] = alphabet[(src[4] & 124) >> 2];
  dst[8] = alphabet[(src[4] & 3) << 3 | (src[5] & 224) >> 5];
  dst[9] = alphabet[src[5] & 31];
  dst[10] = alphabet[(src[6] & 248) >> 3];
  dst[11] = alphabet[(src[6] & 7) << 2 | (src[7] & 192) >> 6];
  dst[12] = alphabet[(src[7] & 62) >> 1];
  dst[13] = alphabet[(src[7] & 1) << 4 | (src[8] & 240) >> 4];
  dst[14] = alphabet[(src[8] & 15) << 1 | (src[9] & 128) >> 7];
  dst[15] = alphabet[(src[9] & 124) >> 2];
  dst[16] = alphabet[(src[9] & 3) << 3 | (src[10] & 224) >> 5];
  dst[17] = alphabet[src[10] & 31];
  dst[18] = alphabet[(src[11] & 248) >> 3];
  dst[19] = alphabet[(src[11] & 7) << 2 | (src[12] & 192) >> 6];
  dst[20] = alphabet[(src[12] & 62) >> 1];
  dst[21] = alphabet[(src[12] & 1) << 4 | (src[13] & 240) >> 4];
  dst[22] = alphabet[(src[13] & 15) << 1 | (src[14] & 128) >> 7];
  dst[23] = alphabet[(src[14] & 124) >> 2];
  dst[24] = alphabet[(src[14] & 3) << 3 | (src[15] & 224) >> 5];
  dst[25] = alphabet[src[15] & 31];
  return dst.join("");
}
function decode3(s) {
  if (s.length !== 26) {
    throw new Error("Invalid length");
  }
  const encoder = new TextEncoder();
  const v = encoder.encode(s);
  if (dec3[v[0]] === 255 || dec3[v[1]] === 255 || dec3[v[2]] === 255 || dec3[v[3]] === 255 || dec3[v[4]] === 255 || dec3[v[5]] === 255 || dec3[v[6]] === 255 || dec3[v[7]] === 255 || dec3[v[8]] === 255 || dec3[v[9]] === 255 || dec3[v[10]] === 255 || dec3[v[11]] === 255 || dec3[v[12]] === 255 || dec3[v[13]] === 255 || dec3[v[14]] === 255 || dec3[v[15]] === 255 || dec3[v[16]] === 255 || dec3[v[17]] === 255 || dec3[v[18]] === 255 || dec3[v[19]] === 255 || dec3[v[20]] === 255 || dec3[v[21]] === 255 || dec3[v[22]] === 255 || dec3[v[23]] === 255 || dec3[v[24]] === 255 || dec3[v[25]] === 255) {
    throw new Error("Invalid base32 character");
  }
  const id2 = new Uint8Array(16);
  id2[0] = dec3[v[0]] << 5 | dec3[v[1]];
  id2[1] = dec3[v[2]] << 3 | dec3[v[3]] >> 2;
  id2[2] = (dec3[v[3]] & 3) << 6 | dec3[v[4]] << 1 | dec3[v[5]] >> 4;
  id2[3] = (dec3[v[5]] & 15) << 4 | dec3[v[6]] >> 1;
  id2[4] = (dec3[v[6]] & 1) << 7 | dec3[v[7]] << 2 | dec3[v[8]] >> 3;
  id2[5] = (dec3[v[8]] & 7) << 5 | dec3[v[9]];
  id2[6] = dec3[v[10]] << 3 | dec3[v[11]] >> 2;
  id2[7] = (dec3[v[11]] & 3) << 6 | dec3[v[12]] << 1 | dec3[v[13]] >> 4;
  id2[8] = (dec3[v[13]] & 15) << 4 | dec3[v[14]] >> 1;
  id2[9] = (dec3[v[14]] & 1) << 7 | dec3[v[15]] << 2 | dec3[v[16]] >> 3;
  id2[10] = (dec3[v[16]] & 7) << 5 | dec3[v[17]];
  id2[11] = dec3[v[18]] << 3 | dec3[v[19]] >> 2;
  id2[12] = (dec3[v[19]] & 3) << 6 | dec3[v[20]] << 1 | dec3[v[21]] >> 4;
  id2[13] = (dec3[v[21]] & 15) << 4 | dec3[v[22]] >> 1;
  id2[14] = (dec3[v[22]] & 1) << 7 | dec3[v[23]] << 2 | dec3[v[24]] >> 3;
  id2[15] = (dec3[v[24]] & 7) << 5 | dec3[v[25]];
  return id2;
}

// ../../node_modules/.pnpm/typeid-js@0.3.0/node_modules/typeid-js/dist/chunk-5QL2QZCM.mjs
function parseUUID(uuid) {
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}

// ../../node_modules/.pnpm/typeid-js@0.3.0/node_modules/typeid-js/dist/chunk-R5Q6Z3GN.mjs
var __pow = Math.pow;

// ../../node_modules/.pnpm/typeid-js@0.3.0/node_modules/typeid-js/dist/chunk-FOHWUNKU.mjs
var DIGITS = "0123456789abcdef";
var UUID = class {
  /** @param bytes - The 16-byte byte array representation. */
  constructor(bytes) {
    this.bytes = bytes;
    if (bytes.length !== 16) {
      throw new TypeError("not 128-bit length");
    }
  }
  /**
   * Builds a byte array from UUIDv7 field values.
   *
   * @param unixTsMs - A 48-bit `unix_ts_ms` field value.
   * @param randA - A 12-bit `rand_a` field value.
   * @param randBHi - The higher 30 bits of 62-bit `rand_b` field value.
   * @param randBLo - The lower 32 bits of 62-bit `rand_b` field value.
   */
  static fromFieldsV7(unixTsMs, randA, randBHi, randBLo) {
    if (!Number.isInteger(unixTsMs) || !Number.isInteger(randA) || !Number.isInteger(randBHi) || !Number.isInteger(randBLo) || unixTsMs < 0 || randA < 0 || randBHi < 0 || randBLo < 0 || unixTsMs > 281474976710655 || randA > 4095 || randBHi > 1073741823 || randBLo > 4294967295) {
      throw new RangeError("invalid field value");
    }
    const bytes = new Uint8Array(16);
    bytes[0] = unixTsMs / __pow(2, 40);
    bytes[1] = unixTsMs / __pow(2, 32);
    bytes[2] = unixTsMs / __pow(2, 24);
    bytes[3] = unixTsMs / __pow(2, 16);
    bytes[4] = unixTsMs / __pow(2, 8);
    bytes[5] = unixTsMs;
    bytes[6] = 112 | randA >>> 8;
    bytes[7] = randA;
    bytes[8] = 128 | randBHi >>> 24;
    bytes[9] = randBHi >>> 16;
    bytes[10] = randBHi >>> 8;
    bytes[11] = randBHi;
    bytes[12] = randBLo >>> 24;
    bytes[13] = randBLo >>> 16;
    bytes[14] = randBLo >>> 8;
    bytes[15] = randBLo;
    return new UUID(bytes);
  }
  /** @returns The 8-4-4-4-12 canonical hexadecimal string representation. */
  toString() {
    let text2 = "";
    for (let i = 0; i < this.bytes.length; i++) {
      text2 += DIGITS.charAt(this.bytes[i] >>> 4);
      text2 += DIGITS.charAt(this.bytes[i] & 15);
      if (i === 3 || i === 5 || i === 7 || i === 9) {
        text2 += "-";
      }
    }
    return text2;
  }
  /** Creates an object from `this`. */
  clone() {
    return new UUID(this.bytes.slice(0));
  }
  /** Returns true if `this` is equivalent to `other`. */
  equals(other) {
    return this.compareTo(other) === 0;
  }
  /**
   * Returns a negative integer, zero, or positive integer if `this` is less
   * than, equal to, or greater than `other`, respectively.
   */
  compareTo(other) {
    for (let i = 0; i < 16; i++) {
      const diff3 = this.bytes[i] - other.bytes[i];
      if (diff3 !== 0) {
        return Math.sign(diff3);
      }
    }
    return 0;
  }
};
var V7Generator = class {
  constructor() {
    this.timestamp = 0;
    this.counter = 0;
    this.random = new DefaultRandom();
  }
  /**
   * Generates a new UUIDv7 object from the current timestamp, or resets the
   * generator upon significant timestamp rollback.
   *
   * This method returns monotonically increasing UUIDs unless the up-to-date
   * timestamp is significantly (by ten seconds or more) smaller than the one
   * embedded in the immediately preceding UUID. If such a significant clock
   * rollback is detected, this method resets the generator and returns a new
   * UUID based on the current timestamp.
   */
  generate() {
    const value = this.generateOrAbort();
    if (value !== void 0) {
      return value;
    } else {
      this.timestamp = 0;
      return this.generateOrAbort();
    }
  }
  /**
   * Generates a new UUIDv7 object from the current timestamp, or returns
   * `undefined` upon significant timestamp rollback.
   *
   * This method returns monotonically increasing UUIDs unless the up-to-date
   * timestamp is significantly (by ten seconds or more) smaller than the one
   * embedded in the immediately preceding UUID. If such a significant clock
   * rollback is detected, this method aborts and returns `undefined`.
   */
  generateOrAbort() {
    const MAX_COUNTER = 4398046511103;
    const ROLLBACK_ALLOWANCE = 1e4;
    const ts = Date.now();
    if (ts > this.timestamp) {
      this.timestamp = ts;
      this.resetCounter();
    } else if (ts + ROLLBACK_ALLOWANCE > this.timestamp) {
      this.counter++;
      if (this.counter > MAX_COUNTER) {
        this.timestamp++;
        this.resetCounter();
      }
    } else {
      return void 0;
    }
    return UUID.fromFieldsV7(this.timestamp, Math.trunc(this.counter / __pow(2, 30)), this.counter & __pow(2, 30) - 1, this.random.nextUint32());
  }
  /** Initializes the counter at a 42-bit random integer. */
  resetCounter() {
    this.counter = this.random.nextUint32() * 1024 + (this.random.nextUint32() & 1023);
  }
};
var getRandomValues = (buffer) => {
  if (typeof UUIDV7_DENY_WEAK_RNG !== "undefined" && UUIDV7_DENY_WEAK_RNG) {
    throw new Error("no cryptographically strong RNG available");
  }
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = Math.trunc(Math.random() * 65536) * 65536 + Math.trunc(Math.random() * 65536);
  }
  return buffer;
};
if (typeof crypto !== "undefined" && crypto.getRandomValues) {
  getRandomValues = (buffer) => crypto.getRandomValues(buffer);
}
var DefaultRandom = class {
  constructor() {
    this.buffer = new Uint32Array(8);
    this.cursor = 99;
  }
  nextUint32() {
    if (this.cursor >= this.buffer.length) {
      getRandomValues(this.buffer);
      this.cursor = 0;
    }
    return this.buffer[this.cursor++];
  }
};
var defaultGenerator;
var uuidv7obj = () => (defaultGenerator || (defaultGenerator = new V7Generator())).generate();
function isValidPrefix(str) {
  if (str.length > 63) {
    return false;
  }
  let code;
  let i;
  let len;
  for (i = 0, len = str.length; i < len; i += 1) {
    code = str.charCodeAt(i);
    if (!(code > 96 && code < 123)) {
      return false;
    }
  }
  return true;
}
var TypeID = class {
  constructor(prefix, suffix = "") {
    this.prefix = prefix;
    this.suffix = suffix;
    if (!isValidPrefix(prefix)) {
      throw new Error("Invalid prefix. Must be at most 63 ascii letters [a-z]");
    }
    this.prefix = prefix;
    if (suffix) {
      this.suffix = suffix;
    } else {
      const uuid = uuidv7obj();
      this.suffix = encode3(uuid.bytes);
    }
    if (this.suffix.length !== 26) {
      throw new Error(`Invalid length. Suffix should have 26 characters, got ${suffix.length}`);
    }
    if (this.suffix[0] > "7") {
      throw new Error("Invalid suffix. First character must be in the range [0-7]");
    }
    const unused = decode3(this.suffix);
  }
  getType() {
    return this.prefix;
  }
  getSuffix() {
    return this.suffix;
  }
  asType(prefix) {
    const self2 = this;
    if (self2.prefix !== prefix) {
      throw new Error(`Cannot convert TypeID of type ${self2.prefix} to type ${prefix}`);
    }
    return self2;
  }
  toUUIDBytes() {
    return decode3(this.suffix);
  }
  toUUID() {
    const uuid = new UUID(this.toUUIDBytes());
    return uuid.toString();
  }
  toString() {
    if (this.prefix === "") {
      return this.suffix;
    }
    return `${this.prefix}_${this.suffix}`;
  }
  static fromString(str) {
    const parts = str.split("_");
    if (parts.length === 1) {
      return new TypeID("", parts[0]);
    }
    if (parts.length === 2) {
      if (parts[0] === "") {
        throw new Error(`Invalid TypeID. Prefix cannot be empty when there's a separator: ${str}`);
      }
      return new TypeID(parts[0], parts[1]);
    }
    throw new Error(`Invalid TypeID string: ${str}`);
  }
  static fromUUIDBytes(prefix, bytes) {
    const suffix = encode3(bytes);
    return new TypeID(prefix, suffix);
  }
  static fromUUID(prefix, uuid) {
    const suffix = encode3(parseUUID(uuid));
    return new TypeID(prefix, suffix);
  }
};
function typeid(prefix = "", suffix = "") {
  return new TypeID(prefix, suffix);
}

// ../../node_modules/.pnpm/@sanity+telemetry@1.1.0_react@19.3.0/node_modules/@sanity/telemetry/dist/_chunks/createDeferredStore-5760b8dc.js
function createNoopLogger() {
  const logger3 = {
    updateUserProperties() {
    },
    trace,
    resume,
    log: log3
  };
  function trace(telemetryTrace) {
    return {
      start() {
      },
      log(data) {
      },
      complete() {
      },
      newContext(name) {
        return logger3;
      },
      error(error2) {
      },
      await: (promise) => promise
    };
  }
  function log3(event, data) {
  }
  function resume(events) {
  }
  return logger3;
}
var noopLogger = createNoopLogger();

// ../../node_modules/.pnpm/@sanity+telemetry@1.1.0_react@19.3.0/node_modules/@sanity/telemetry/dist/index.js
function createTraceId() {
  return typeid("trace").toString();
}
function splitAt(str, index2) {
  return index2 < 1 ? [str, ""] : [str.substring(0, index2), str.substring(index2)];
}
var MAX_LENGTH = 1024;
function trimErrorMessage(errorMessage) {
  const newLineIndex = errorMessage.indexOf("\n");
  const splitIndex = newLineIndex === -1 ? MAX_LENGTH : Math.min(newLineIndex, MAX_LENGTH);
  const [first2, rest] = splitAt(errorMessage, splitIndex);
  return first2 + (rest ? "… (+".concat(rest.length, ")") : "");
}
function createStore(sessionId) {
  const logEntries$ = new Subject();
  const eventSampleTimes = /* @__PURE__ */ new WeakMap();
  function pushTraceError(traceId, telemetryTrace, error2, context) {
    logEntries$.next({
      sessionId,
      type: "trace.error",
      traceId,
      name: telemetryTrace.name,
      version: telemetryTrace.version,
      data: {
        message: trimErrorMessage(error2.message)
      },
      context,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  function pushTraceEntry(type, traceId, telemetryTrace, data, context) {
    logEntries$.next({
      sessionId,
      type,
      traceId,
      name: telemetryTrace.name,
      version: telemetryTrace.version,
      data,
      context,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  function pushLogEntry(type, event, data) {
    logEntries$.next({
      sessionId,
      type,
      version: event.version,
      name: event.name,
      data,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  function resumeEvents(events) {
    events.forEach((event) => {
      logEntries$.next({
        sessionId,
        type: event.event.type,
        version: event.event.version,
        name: event.event.name,
        data: event.data,
        createdAt: event.createdAt
      });
    });
  }
  function pushUserPropertiesEntry(properties) {
    logEntries$.next({
      sessionId,
      type: "userProperties",
      properties,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  function createTrace(traceId, traceDef, context) {
    return {
      start() {
        pushTraceEntry("trace.start", traceId, traceDef, void 0, context);
      },
      newContext(name) {
        return {
          trace(innerTraceDef) {
            return createTrace("".concat(traceId, ".").concat(name), innerTraceDef, context);
          },
          resume: resumeEvents,
          updateUserProperties() {
          },
          log: log3
        };
      },
      log(data) {
        pushTraceEntry("trace.log", traceId, traceDef, data, context);
      },
      complete() {
        pushTraceEntry("trace.complete", traceId, traceDef, void 0, context);
      },
      error(error2) {
        pushTraceError(traceId, traceDef, error2, context);
      },
      await(promise, data) {
        this.start();
        promise.then((result) => {
          this.log(data ? data : result);
          this.complete();
          return result;
        }, (error2) => {
          this.error(error2);
          throw error2;
        });
        return promise;
      }
    };
  }
  function log3(event, data) {
    if (typeof event.maxSampleRate === "number" && event.maxSampleRate > 0) {
      const lastSampledAt = eventSampleTimes.get(event);
      const now = /* @__PURE__ */ new Date();
      if (!lastSampledAt || now.getTime() - lastSampledAt.getTime() > event.maxSampleRate) {
        eventSampleTimes.set(event, now);
        pushLogEntry("log", event, data);
      }
    } else {
      pushLogEntry("log", event, data);
    }
  }
  return {
    events$: logEntries$.asObservable(),
    logger: {
      updateUserProperties(properties) {
        pushUserPropertiesEntry(properties);
      },
      resume: resumeEvents,
      trace: (traceDef, context) => {
        const traceId = createTraceId();
        return createTrace(traceId, traceDef, context);
      },
      log: log3
    }
  };
}
var unrefTimer = (ms) => new Observable((subscriber) => {
  const timeout = setTimeout(() => {
    subscriber.next(void 0);
    subscriber.complete();
  }, ms);
  if (typeof timeout.unref === "function") {
    timeout.unref();
  }
  return () => clearTimeout(timeout);
});
function createBatchedStore(sessionId, options) {
  var _a;
  const store = createStore(sessionId);
  function resolveConsent() {
    return options.resolveConsent().catch((err) => (
      // if we for some reason can't fetch consent we treat it as "undetermined", and try again at next flush
      {
        status: "undetermined"
      }
    ));
  }
  const _buffer = [];
  function consume() {
    const buf = _buffer.slice();
    _buffer.length = 0;
    return buf;
  }
  function submit() {
    const pending = consume();
    if (pending.length === 0) {
      return EMPTY;
    }
    return combineLatest([of(pending), resolveConsent()]).pipe(mergeMap((_ref) => {
      let [events, consent] = _ref;
      if (events.length === 0 || consent.status !== "granted") {
        return EMPTY;
      }
      return from(options.sendEvents(events)).pipe(catchError((err) => {
        _buffer.unshift(...events);
        return EMPTY;
      }));
    }));
  }
  const flushInterval = (_a = options.flushInterval) != null ? _a : 3e4;
  const flush$ = store.events$.pipe(
    tap((ev) => _buffer.push(ev)),
    map(() => {
    }),
    // void to avoid accidental use of events further down the pipe
    throttle(() => unrefTimer(flushInterval), {
      leading: false,
      trailing: true
    }),
    concatMap(() => submit())
  );
  function flush() {
    return lastValueFrom(submit(), {
      defaultValue: void 0
    }).then(() => {
    });
  }
  const subscription = flush$.subscribe();
  function endWithBeacon() {
    if (!options.sendBeacon) {
      end();
      return true;
    }
    const events = consume();
    subscription.unsubscribe();
    return events.length > 0 ? options.sendBeacon(events) : true;
  }
  function end() {
    return flush().then(
      () => {
      },
      // void promise
      () => {
      }
      // ignore errors
    ).finally(() => {
      subscription.unsubscribe();
    });
  }
  return {
    end,
    endWithBeacon,
    // Note: flush may fail
    flush,
    logger: store.logger
  };
}
function defineEvent(options) {
  return {
    type: "log",
    name: options.name,
    version: options.version,
    description: options.description,
    maxSampleRate: options.maxSampleRate,
    schema: void 0
  };
}

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/_exports/_internal.js
function getApplicationOrigin(application2) {
  if (application2.externalUrl !== null) return new URL(application2.externalUrl).origin;
  if (application2.slug === null) return null;
  let staging = globalThis.__SANITY_STAGING__ === true;
  if (application2.isSingleton) {
    let domain2 = staging ? "run.sanity.work" : "sanity.run";
    return `https://${application2.slug}-apps-${application2.organizationId}.${domain2}`;
  }
  let domain = staging ? "studio.sanity.work" : "sanity.studio";
  return `https://${application2.slug}.${domain}`;
}
var TITLE_CANDIDATES = [
  "title",
  "name",
  "label",
  "heading",
  "header",
  "caption"
];
var SUBTITLE_CANDIDATES = [
  "description",
  "subtitle",
  ...TITLE_CANDIDATES
];
var PREVIEW_PROJECTION = `{
  // Get all potential title fields
  "titleCandidates": {
    ${TITLE_CANDIDATES.map((field) => `"${field}": ${field}`).join(",\n      ")}
  },
  // Get all potential subtitle fields
  "subtitleCandidates": {
    ${SUBTITLE_CANDIDATES.map((field) => `"${field}": ${field}`).join(",\n      ")}
  },
  "media": coalesce(
    select(
      defined(asset) => {"type": "image-asset", "_ref": asset._ref},
      defined(image.asset) => {"type": "image-asset", "_ref": image.asset._ref},
      defined(mainImage.asset) => {"type": "image-asset", "_ref": mainImage.asset._ref},
      null
    )
  ),
  _type,
  _id,
  _updatedAt
}`;
function hasImageRef(value) {
  return isObject(value) && "_ref" in value && typeof value._ref == "string";
}
function normalizeMedia(media2, client) {
  if (!media2 || !hasImageRef(media2)) return null;
  let url = createImageUrlBuilder(client).image({ _ref: media2._ref }).url();
  return {
    type: "image-asset",
    _ref: media2._ref,
    url
  };
}
function findFirstDefined(fieldsToSearch, candidates, exclude) {
  if (candidates) for (let field of fieldsToSearch) {
    let value = candidates[field];
    if (typeof value == "string" && value.trim() !== "" && value !== exclude) return value;
  }
}
function transformProjectionToPreview(instance, projectionResult, resource) {
  let title = findFirstDefined(TITLE_CANDIDATES, projectionResult.titleCandidates), subtitle = findFirstDefined(SUBTITLE_CANDIDATES, projectionResult.subtitleCandidates, title), client = getClient(instance, {
    apiVersion: "v2025-05-06",
    resource
  });
  return {
    title: String(title || `${projectionResult._type}: ${projectionResult._id}`),
    subtitle: subtitle || void 0,
    media: normalizeMedia(projectionResult.media, client),
    ...projectionResult._status && { _status: projectionResult._status }
  };
}
var SANITY_CONTROLLED_HOST_SUFFIXES = [".sanity.studio", ".sanity.io"];
function getBrowserHostname(win) {
  let hostname = win.location?.hostname;
  return typeof hostname == "string" && hostname.length > 0 ? hostname.toLowerCase() : null;
}
function isLocalHostname(hostname) {
  return hostname === "localhost" || hostname === "127.0.0.1";
}
function isSanityControlledHostname(hostname) {
  return SANITY_CONTROLLED_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
}
function getTelemetryEnvironment() {
  if (typeof window < "u") {
    let hostname = getBrowserHostname(window);
    return hostname ? isLocalHostname(hostname) ? "development" : isSanityControlledHostname(hostname) ? "production" : null : null;
  }
  return typeof process < "u" && true ? "development" : null;
}
var SDKSessionStarted = defineEvent({
  name: "SDK Session Started",
  version: 1,
  description: "SDK instance created (environment is recorded in the event context)"
});
var SDKHookMounted = defineEvent({
  name: "SDK Hook Mounted",
  version: 1,
  description: "An SDK hook was mounted for the first time in this session"
});
var SDKSessionEnded = defineEvent({
  name: "SDK Session Ended",
  version: 1,
  description: "SDK instance disposed (environment is recorded in the event context)"
});
var SDKError = defineEvent({
  name: "SDK Error",
  version: 1,
  description: "Runtime error caught in the SDK"
});
var telemetryManager_exports = __exportAll({ createTelemetryManager: () => createTelemetryManager });
var log2 = createLogger("telemetry");
function createTelemetryManager(options) {
  let { sessionId, getClient: getClient2, projectId, environment } = options, startedAt = Date.now(), emittedHooks = /* @__PURE__ */ new Set(), cachedConsent = null, resolveConsent = async () => {
    if (cachedConsent) return cachedConsent;
    try {
      cachedConsent = await getClient2().request({
        url: "/intake/telemetry-status",
        tag: "telemetry-consent.sdk"
      });
    } catch {
      cachedConsent = { status: "undetermined" };
    }
    return cachedConsent;
  }, enrichBatch = (batch) => batch.map((event) => {
    let existing = "context" in event ? event.context : void 0;
    return {
      ...event,
      context: {
        ...existing,
        version: CORE_SDK_VERSION,
        environment,
        origin: typeof window < "u" ? window.location.origin : "node"
      }
    };
  }), sendEvents = async (batch) => {
    let client = getClient2();
    return log2.debug("sending event batch", {
      batchSize: batch.length,
      environment
    }), client.request({
      url: "/intake/batch",
      method: "POST",
      body: {
        projectId,
        batch: enrichBatch(batch)
      },
      tag: "telemetry.batch"
    });
  }, store = createBatchedStore(sessionId, {
    flushInterval: 3e4,
    resolveConsent,
    sendEvents
  }), logger3 = store.logger;
  return {
    async checkConsent() {
      let { status } = await resolveConsent();
      return status === "granted";
    },
    logSessionStarted(data) {
      log2.debug("event: SDK Session Started", {
        projectId: data.projectId,
        perspective: data.perspective,
        authMethod: data.authMethod,
        version: CORE_SDK_VERSION,
        environment
      }), logger3.log(SDKSessionStarted, {
        version: CORE_SDK_VERSION,
        ...data
      });
    },
    logHookFirstUsed(hookName) {
      emittedHooks.has(hookName) || (emittedHooks.add(hookName), log2.debug("event: SDK Hook Mounted", { hookName }), logger3.log(SDKHookMounted, { hookName }));
    },
    logError(errorType, hookName) {
      log2.debug("event: SDK Error", {
        errorType,
        hookName
      }), logger3.log(SDKError, {
        errorType,
        hookName
      });
    },
    endSession() {
      let durationSeconds = Math.round((Date.now() - startedAt) / 1e3);
      log2.debug("event: SDK Session Ended", {
        durationSeconds,
        hooksUsed: [...emittedHooks],
        environment
      }), logger3.log(SDKSessionEnded, {
        durationSeconds,
        hooksUsed: [...emittedHooks]
      }), store.flush().catch(() => {
      }), store.end();
    },
    dispose() {
      store.end();
    },
    get hooksUsed() {
      return emittedHooks;
    }
  };
}
var logger2 = createLogger("telemetry");
var telemetryManagers = /* @__PURE__ */ new WeakMap();
var pendingHooks = /* @__PURE__ */ new WeakMap();
var initInFlight = /* @__PURE__ */ new WeakSet();
function initTelemetry(instance, projectId) {
  let environment = getTelemetryEnvironment();
  if (!environment) {
    logger2.trace("initTelemetry skipped: environment not eligible", { internal: true });
    return;
  }
  if (!projectId) {
    logger2.trace("initTelemetry skipped: no projectId", { internal: true });
    return;
  }
  telemetryManagers.has(instance) || initInFlight.has(instance) || (initInFlight.add(instance), logger2.debug("initializing telemetry", {
    projectId,
    environment
  }), Promise.all([
    Promise.resolve().then(() => telemetryManager_exports),
    import("./clientStore-BI4D8HhJ-OC64SIIG.js").then((n) => n.t),
    import("./clientStore-BI4D8HhJ-OC64SIIG.js").then((n) => n.a)
  ]).then(async ([{ createTelemetryManager: createTelemetryManager2 }, { getClient: getClient2 }, { getTokenState: getTokenState2 }]) => {
    if (instance.isDisposed()) {
      initInFlight.delete(instance), logger2.debug("telemetry skipped: instance disposed before imports resolved");
      return;
    }
    let token = getTokenState2(instance).getCurrent();
    if (logger2.trace("auth token check", {
      tokenPresent: !!token,
      internal: true
    }), !token && (logger2.debug("waiting for auth token"), !await new Promise((resolve) => {
      if (instance.isDisposed()) return resolve(false);
      let cleanup = { unsubscribe: () => {
      } }, unsub = instance.onDispose(() => {
        cleanup.unsubscribe(), resolve(false);
      }), received = false, sub = getTokenState2(instance).observable.subscribe((t) => {
        !received && t && (received = true, logger2.debug("auth token received"), unsub(), resolve(true), cleanup.unsubscribe());
      });
      cleanup.unsubscribe = () => sub.unsubscribe(), received && cleanup.unsubscribe();
    }) || instance.isDisposed())) {
      initInFlight.delete(instance), logger2.debug("telemetry skipped: no token resolved or instance disposed");
      return;
    }
    let manager = createTelemetryManager2({
      sessionId: instance.instanceId,
      getClient: () => getClient2(instance, { apiVersion: "2024-11-12" }),
      projectId,
      environment
    }), consented = await manager.checkConsent();
    if (logger2.debug("consent check complete", { consented }), !consented || instance.isDisposed()) {
      initInFlight.delete(instance), manager.dispose();
      return;
    }
    initInFlight.delete(instance), telemetryManagers.set(instance, manager);
    let buffered = pendingHooks.get(instance);
    if (buffered) {
      logger2.debug("flushing buffered hooks", { hooks: Array.from(buffered) });
      for (let hookName of buffered) manager.logHookFirstUsed(hookName);
      pendingHooks.delete(instance);
    }
    let config = instance.config, perspective = typeof config.perspective == "string" ? config.perspective : "published", authMethod = config.auth?.token ? "token" : config.studio?.auth?.token ? "studio" : "default";
    logger2.info("telemetry session started", {
      projectId,
      perspective,
      authMethod,
      environment
    }), manager.logSessionStarted({
      projectId,
      perspective,
      authMethod
    }), instance.onDispose(() => {
      manager.endSession(), telemetryManagers.delete(instance), logger2.debug("telemetry session ended");
    });
  }).catch((err) => {
    initInFlight.delete(instance), logger2.warn("telemetry init failed", { error: err });
  }));
}
function trackHookMounted(instance, hookName) {
  if (!getTelemetryEnvironment()) return;
  let manager = findManager(instance);
  if (manager) {
    logger2.trace("hook mounted (logged)", {
      hookName,
      internal: true
    }), manager.logHookFirstUsed(hookName);
    return;
  }
  let root = getRootInstance(instance), hooks = pendingHooks.get(root);
  hooks || (hooks = /* @__PURE__ */ new Set(), pendingHooks.set(root, hooks)), hooks.has(hookName) || logger2.trace("hook mounted (buffered)", {
    hookName,
    internal: true
  }), hooks.add(hookName);
}
function findManager(instance) {
  return telemetryManagers.get(instance);
}
function getRootInstance(instance) {
  return instance;
}
var TOKEN_REGEX = /(?:[^\s"]+|"[^"]*")+/g;
function isNegationToken(token) {
  return token !== void 0 && token.trim().startsWith("-");
}
function isPrefixToken(token) {
  return token !== void 0 && token.trim().endsWith("*");
}
function isExactMatchToken(token) {
  return !!token && token.length >= 2 && token.startsWith('"') && token.endsWith('"');
}
function createGroqSearchFilter(query2) {
  let trimmedQuery = query2.trim();
  if (!trimmedQuery) return "";
  let tokens = trimmedQuery.match(TOKEN_REGEX) ?? [], reversedIndex = [...tokens].reverse().findIndex((token) => !isNegationToken(token) && !isExactMatchToken(token)), finalIncrementalTokenIndex = reversedIndex === -1 ? -1 : tokens.length - 1 - reversedIndex, finalIncrementalToken = tokens[finalIncrementalTokenIndex], processedTokens = [...tokens];
  return finalIncrementalToken !== void 0 && !isPrefixToken(finalIncrementalToken) && processedTokens.splice(finalIncrementalTokenIndex, 1, `${finalIncrementalToken}*`), `[@] match text::query("${processedTokens.join(" ").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")`;
}

// ../../node_modules/.pnpm/@sanity+sdk-react@3.3.0_@ty_4486c437e79c4a2290b23584b94bf357/node_modules/@sanity/sdk-react/dist/useStudioWorkspacesByProjectIdDataset-B5A5kBH9.js
var React$1 = __toESM(require_react(), 1);
var import_react = __toESM(require_react(), 1);

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/_exports/comlink.js
var destroyController$1 = ({ state }) => {
  let { controller } = state.get();
  controller && (controller.destroy(), state.set("destroyController", {
    controller: null,
    channels: /* @__PURE__ */ new Map()
  }));
};
var getOrCreateChannel$1 = ({ state }, options) => {
  let controller = state.get().controller;
  if (!controller) throw Error("Controller must be initialized before using or creating channels");
  let channels = state.get().channels, existing = channels.get(options.name);
  if (existing) {
    if (!isDeepEqual(existing.options, options)) throw Error(`Channel "${options.name}" already exists with different options`);
    return state.set("incrementChannelRefCount", { channels: new Map(channels).set(options.name, {
      ...existing,
      refCount: existing.refCount + 1
    }) }), existing.channel.start(), existing.channel;
  }
  let channel = controller.createChannel(options);
  return channel.start(), state.set("createChannel", { channels: new Map(channels).set(options.name, {
    channel,
    options,
    refCount: 1
  }) }), channel;
};
var getOrCreateController$1 = ({ state, instance }, targetOrigin) => {
  let { controller, controllerOrigin } = state.get();
  if (controller && controllerOrigin === targetOrigin) return controller;
  controller && destroyController$1({
    state,
    instance,
    key: void 0
  });
  let newController = createController({ targetOrigin });
  return state.set("initializeController", {
    controllerOrigin: targetOrigin,
    controller: newController
  }), newController;
};
var releaseChannel$1 = ({ state }, name) => {
  let channels = state.get().channels, channelEntry = channels.get(name);
  if (channelEntry) {
    let newRefCount = channelEntry.refCount === 0 ? 0 : channelEntry.refCount - 1;
    newRefCount === 0 ? (channelEntry.channel.stop(), channels.delete(name), state.set("releaseChannel", { channels: new Map(channels) })) : state.set("releaseChannel", { channels: new Map(channels).set(name, {
      ...channelEntry,
      refCount: newRefCount
    }) });
  }
};
var comlinkControllerStore = defineStore({
  name: "connectionStore",
  getInitialState: () => ({
    controller: null,
    controllerOrigin: null,
    channels: /* @__PURE__ */ new Map()
  }),
  initialize({ instance }) {
    return () => {
      destroyController(instance);
    };
  }
});
var destroyController = bindActionGlobally(comlinkControllerStore, destroyController$1);
var getOrCreateChannel = bindActionGlobally(comlinkControllerStore, getOrCreateChannel$1);
var getOrCreateController = bindActionGlobally(comlinkControllerStore, getOrCreateController$1);
var releaseChannel = bindActionGlobally(comlinkControllerStore, releaseChannel$1);

// ../../node_modules/.pnpm/@sanity+sdk-react@3.3.0_@ty_4486c437e79c4a2290b23584b94bf357/node_modules/@sanity/sdk-react/dist/useStudioWorkspacesByProjectIdDataset-B5A5kBH9.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var SanityInstanceContext = (0, import_react.createContext)(null);
var useSanityInstance = () => {
  let instance = (0, import_react.useContext)(SanityInstanceContext);
  if (!instance) throw Error("SanityInstance context not found. Please ensure that your component is wrapped in a ResourceProvider or a SanityApp component.");
  return instance;
};
function createStateSourceHook(options) {
  let getState = typeof options == "function" ? options : options.getState, suspense = "shouldSuspend" in options && "suspender" in options ? options : void 0;
  function useHook(...t0) {
    let $ = (0, import_react_compiler_runtime.c)(3), params = t0, instance = useSanityInstance();
    if (suspense?.suspender && suspense?.shouldSuspend?.(instance, ...params)) throw suspense.suspender(instance, ...params);
    let t1;
    $[0] !== instance || $[1] !== params ? (t1 = getState(instance, ...params), $[0] = instance, $[1] = params, $[2] = t1) : t1 = $[2];
    let state = t1;
    return (0, import_react.useSyncExternalStore)(state.subscribe, state.getCurrent);
  }
  return useHook;
}
var useAuthState = createStateSourceHook(getAuthState);
var useNodeState = createStateSourceHook({
  getState: getNodeState,
  shouldSuspend: (instance, nodeInput) => getNodeState(instance, nodeInput).getCurrent() === void 0,
  suspender: (instance, nodeInput) => firstValueFrom(getNodeState(instance, nodeInput).observable.pipe(filter(Boolean)))
});
function useWindowConnection(t0) {
  let $ = (0, import_react_compiler_runtime.c)(19), { name, connectTo, onMessage } = t0, t1;
  $[0] !== connectTo || $[1] !== name ? (t1 = {
    name,
    connectTo
  }, $[0] = connectTo, $[1] = name, $[2] = t1) : t1 = $[2];
  let { node } = useNodeState(t1), t2;
  $[3] === Symbol.for("react.memo_cache_sentinel") ? (t2 = [], $[3] = t2) : t2 = $[3];
  let messageUnsubscribers = (0, import_react.useRef)(t2), instance = useSanityInstance(), t3;
  $[4] !== node || $[5] !== onMessage ? (t3 = () => (onMessage && Object.entries(onMessage).forEach((t42) => {
    let [type, handler] = t42, messageUnsubscribe = node.on(type, handler);
    messageUnsubscribe && messageUnsubscribers.current.push(messageUnsubscribe);
  }), () => {
    messageUnsubscribers.current.forEach(_temp$1), messageUnsubscribers.current = [];
  }), $[4] = node, $[5] = onMessage, $[6] = t3) : t3 = $[6];
  let t4;
  $[7] !== instance || $[8] !== name || $[9] !== node || $[10] !== onMessage ? (t4 = [
    instance,
    name,
    onMessage,
    node
  ], $[7] = instance, $[8] = name, $[9] = node, $[10] = onMessage, $[11] = t4) : t4 = $[11], (0, import_react.useEffect)(t3, t4);
  let t5;
  $[12] === node ? t5 = $[13] : (t5 = (type_0, data) => {
    node.post(type_0, data);
  }, $[12] = node, $[13] = t5);
  let sendMessage = t5, t6;
  $[14] === node ? t6 = $[15] : (t6 = (type_1, data_0, fetchOptions) => node.fetch(type_1, data_0, fetchOptions ?? {}), $[14] = node, $[15] = t6);
  let fetch = t6, t7;
  return $[16] !== fetch || $[17] !== sendMessage ? (t7 = {
    sendMessage,
    fetch
  }, $[16] = fetch, $[17] = sendMessage, $[18] = t7) : t7 = $[18], t7;
}
function _temp$1(unsubscribe) {
  return unsubscribe();
}
var MODULE_SLOT_KEY = Symbol.for("sanity.os.module");
function getDashboardModuleContext() {
  let globals = globalThis, slot = globals[MODULE_SLOT_KEY] ??= /* @__PURE__ */ new WeakMap(), key = React$1.createContext, context = slot.get(key);
  return context || (context = React$1.createContext(void 0), slot.set(key, context)), context;
}
function DashboardTokenRefresh(t0) {
  let $ = (0, import_react_compiler_runtime.c)(11), { children, messageBus } = t0, instance = useSanityInstance(), authState = useAuthState(), processed401ErrorRef = (0, import_react.useRef)(null), t1, t2;
  $[0] !== instance || $[1] !== messageBus ? (t1 = () => {
    let subscription = defer(() => messageBus.subscribe("auth.token")).pipe(catchError(_temp)).subscribe((token) => setAuthToken(instance, token));
    return () => subscription.unsubscribe();
  }, t2 = [instance, messageBus], $[0] = instance, $[1] = messageBus, $[2] = t1, $[3] = t2) : (t1 = $[2], t2 = $[3]), (0, import_react.useEffect)(t1, t2);
  let t3;
  $[4] !== authState.error || $[5] !== authState.type || $[6] !== messageBus ? (t3 = () => {
    let has401Error = authState.type === AuthStateType.ERROR && authState.error?.statusCode === 401;
    has401Error && processed401ErrorRef.current !== authState.error ? (processed401ErrorRef.current = authState.error, messageBus.emit("auth.token.refresh", void 0).catch(_temp2)) : has401Error || (processed401ErrorRef.current = null);
  }, $[4] = authState.error, $[5] = authState.type, $[6] = messageBus, $[7] = t3) : t3 = $[7];
  let t4;
  return $[8] !== authState || $[9] !== messageBus ? (t4 = [authState, messageBus], $[8] = authState, $[9] = messageBus, $[10] = t4) : t4 = $[10], (0, import_react.useEffect)(t3, t4), children;
}
function _temp2(error2) {
  console.warn("[sanity/sdk] Dashboard token refresh failed:", error2);
}
function _temp() {
  return of(null);
}
var DashboardTokenRefreshProvider = (t0) => {
  let $ = (0, import_react_compiler_runtime.c)(7), { children } = t0, instance = useSanityInstance(), t1;
  $[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = getDashboardModuleContext(), $[0] = t1) : t1 = $[0];
  let moduleId = (0, import_react.useContext)(t1), t2;
  $[1] !== instance || $[2] !== moduleId ? (t2 = () => getDashboardMessageBus(instance, moduleId), $[1] = instance, $[2] = moduleId, $[3] = t2) : t2 = $[3];
  let [messageBus] = (0, import_react.useState)(t2);
  if (messageBus) {
    let t3;
    return $[4] !== children || $[5] !== messageBus ? (t3 = (0, import_jsx_runtime.jsx)(DashboardTokenRefresh, {
      messageBus,
      children
    }), $[4] = children, $[5] = messageBus, $[6] = t3) : t3 = $[6], t3;
  }
  return children;
};
function useOrganizationId() {
  let $ = (0, import_react_compiler_runtime.c)(9), instance = useSanityInstance(), t0;
  bb0: {
    if (!isDashboardEnvironment()) {
      let t12;
      $[0] === instance ? t12 = $[1] : (t12 = getDashboardOrganizationId(instance), $[0] = instance, $[1] = t12), t0 = t12;
      break bb0;
    }
    let t1;
    $[2] === instance ? t1 = $[3] : (t1 = getTopicState(instance, "organizations.current"), $[2] = instance, $[3] = t1);
    let source = t1, t2;
    $[4] === source ? t2 = $[5] : (t2 = () => source.getCurrent()?.id ?? void 0, $[4] = source, $[5] = t2);
    let t3;
    $[6] !== source.subscribe || $[7] !== t2 ? (t3 = {
      subscribe: source.subscribe,
      getCurrent: t2
    }, $[6] = source.subscribe, $[7] = t2, $[8] = t3) : t3 = $[8], t0 = t3;
  }
  let { subscribe, getCurrent } = t0;
  return (0, import_react.useSyncExternalStore)(subscribe, getCurrent);
}
var useTopic = createStateSourceHook({
  getState: getTopicState,
  shouldSuspend: (instance, topic) => getTopicState(instance, topic).getCurrent() === void 0,
  suspender: resolveTopic
});
function useStudioWorkspacesByProjectIdDataset() {
  return isDashboardEnvironment() ? useBusStudioWorkspaces() : useComlinkStudioWorkspaces();
}
function toResources(application2) {
  if (application2.type !== "studio") return [];
  let url = getApplicationOrigin(application2) ?? "";
  return (application2.activeDeployment?.workspaces ?? []).map((workspace) => ({
    id: workspace.id,
    name: workspace.name,
    title: workspace.title ?? application2.title,
    basePath: workspace.basePath ?? "",
    projectId: workspace.projectId,
    dataset: workspace.dataset,
    type: "studio",
    userApplicationId: application2.id,
    url
  }));
}
function toWorkspaceMap(applications2) {
  let workspaceMap = {};
  for (let resource of applications2.flatMap(toResources)) {
    let key = `${resource.projectId}:${resource.dataset}`;
    workspaceMap[key] ??= [], workspaceMap[key].push(resource);
  }
  return workspaceMap;
}
function useBusStudioWorkspaces() {
  let $ = (0, import_react_compiler_runtime.c)(6), applications2 = useTopic("applications.list"), t0;
  $[0] === applications2 ? t0 = $[1] : (t0 = applications2 ?? [], $[0] = applications2, $[1] = t0);
  let t1;
  $[2] === t0 ? t1 = $[3] : (t1 = toWorkspaceMap(t0), $[2] = t0, $[3] = t1);
  let workspacesByProjectIdAndDataset = t1, t2;
  return $[4] === workspacesByProjectIdAndDataset ? t2 = $[5] : (t2 = {
    workspacesByProjectIdAndDataset,
    error: null
  }, $[4] = workspacesByProjectIdAndDataset, $[5] = t2), t2;
}
function useComlinkStudioWorkspaces() {
  let $ = (0, import_react_compiler_runtime.c)(8), t0;
  $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = {}, $[0] = t0) : t0 = $[0];
  let [workspacesByProjectIdAndDataset, setWorkspacesByProjectIdAndDataset] = (0, import_react.useState)(t0), [error2, setError] = (0, import_react.useState)(null), t1;
  $[1] === Symbol.for("react.memo_cache_sentinel") ? (t1 = {
    name: SDK_NODE_NAME,
    connectTo: SDK_CHANNEL_NAME
  }, $[1] = t1) : t1 = $[1];
  let { fetch } = useWindowConnection(t1), t2, t3;
  $[2] === fetch ? (t2 = $[3], t3 = $[4]) : (t2 = () => {
    if (!fetch) return;
    let fetchWorkspaces = async function fetchWorkspaces2(signal) {
      try {
        let data = await fetch("dashboard/v1/context", void 0, { signal }), workspaceMap = {}, noProjectIdAndDataset = [];
        data.context.availableResources.forEach((resource) => {
          if (resource.type !== "studio") return;
          if (!resource.projectId || !resource.dataset) {
            noProjectIdAndDataset.push(resource);
            return;
          }
          let key = `${resource.projectId}:${resource.dataset}`;
          workspaceMap[key] || (workspaceMap[key] = []), workspaceMap[key].push(resource);
        }), noProjectIdAndDataset.length > 0 && (workspaceMap["NO_PROJECT_ID:NO_DATASET"] = noProjectIdAndDataset), setWorkspacesByProjectIdAndDataset(workspaceMap), setError(null);
      } catch (t42) {
        let err = t42;
        if (err instanceof Error) {
          if (err.name === "AbortError") return;
          setError("Failed to fetch workspaces");
        }
      }
    }, controller = new AbortController();
    return fetchWorkspaces(controller.signal), () => {
      controller.abort();
    };
  }, t3 = [fetch], $[2] = fetch, $[3] = t2, $[4] = t3), (0, import_react.useEffect)(t2, t3);
  let t4;
  return $[5] !== error2 || $[6] !== workspacesByProjectIdAndDataset ? (t4 = {
    workspacesByProjectIdAndDataset,
    error: error2
  }, $[5] = error2, $[6] = workspacesByProjectIdAndDataset, $[7] = t4) : t4 = $[7], t4;
}

// ../../node_modules/.pnpm/@sanity+sdk-react@3.3.0_@ty_4486c437e79c4a2290b23584b94bf357/node_modules/@sanity/sdk-react/dist/index.js
var import_react_compiler_runtime2 = __toESM(require_dist());
var import_react3 = __toESM(require_react());

// ../../node_modules/.pnpm/react-error-boundary@6.1.5_@types+react@19.3.0_react@19.3.0/node_modules/react-error-boundary/dist/react-error-boundary.js
var import_react2 = __toESM(require_react());
var h = (0, import_react2.createContext)(null);
var c2 = {
  didCatch: false,
  error: null
};
var m = class extends import_react2.Component {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = c2;
  }
  static getDerivedStateFromError(e) {
    return { didCatch: true, error: e };
  }
  resetErrorBoundary(...e) {
    const { didCatch: t } = this.state;
    t && (this.props.onReset?.({
      args: e,
      reason: "imperative-api"
    }), this.setState(c2));
  }
  componentDidCatch(e, t) {
    this.props.onError?.(e, t);
  }
  componentDidUpdate(e, t) {
    const { didCatch: o } = this.state, { resetKeys: s } = this.props;
    o && t.didCatch && C(e.resetKeys, s) && (this.props.onReset?.({
      next: s,
      prev: e.resetKeys,
      reason: "keys"
    }), this.setState(c2));
  }
  render() {
    const { children: e, fallbackRender: t, FallbackComponent: o, fallback: s } = this.props, { didCatch: n, error: a } = this.state;
    let i = e;
    if (n) {
      const u = {
        error: a,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof t == "function")
        i = t(u);
      else if (o)
        i = (0, import_react2.createElement)(o, u);
      else if (s !== void 0)
        i = s;
      else
        throw a;
    }
    return (0, import_react2.createElement)(
      h.Provider,
      {
        value: {
          didCatch: n,
          error: a,
          resetErrorBoundary: this.resetErrorBoundary
        }
      },
      i
    );
  }
};
function C(r = [], e = []) {
  return r.length !== e.length || r.some((t, o) => !Object.is(t, e[o]));
}
function S(r) {
  switch (typeof r) {
    case "object": {
      if (r !== null && "message" in r && typeof r.message == "string")
        return r.message;
      break;
    }
    case "string":
      return r;
  }
}

// ../../node_modules/.pnpm/@sanity+sdk-react@3.3.0_@ty_4486c437e79c4a2290b23584b94bf357/node_modules/@sanity/sdk-react/dist/index.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_client7 = __toESM(require_client());

// ../../node_modules/.pnpm/@sanity+sdk@3.3.0_@types+re_ea8c1b1a1ec903d0f1530713d9c74da2/node_modules/@sanity/sdk/dist/_exports/agent.js
function agentGenerate(instance, options, resource) {
  return getClientState(instance, {
    apiVersion: "vX",
    resource
  }).observable.pipe(switchMap((client) => client.observable.agent.action.generate(options)));
}
function agentTransform(instance, options, resource) {
  return getClientState(instance, {
    apiVersion: "vX",
    resource
  }).observable.pipe(switchMap((client) => client.observable.agent.action.transform(options)));
}
function agentTranslate(instance, options, resource) {
  return getClientState(instance, {
    apiVersion: "vX",
    resource
  }).observable.pipe(switchMap((client) => client.observable.agent.action.translate(options)));
}
function agentPrompt(instance, options, resource) {
  return getClientState(instance, {
    apiVersion: "vX",
    resource
  }).observable.pipe(switchMap((client) => from(client.agent.action.prompt(options))));
}
function agentPatch(instance, options, resource) {
  return getClientState(instance, {
    apiVersion: "vX",
    resource
  }).observable.pipe(switchMap((client) => from(client.agent.action.patch(options))));
}

// ../../node_modules/.pnpm/@sanity+sdk-react@3.3.0_@ty_4486c437e79c4a2290b23584b94bf357/node_modules/@sanity/sdk-react/dist/index.js
function DashboardTokenRefresh2(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(14), { children } = t0, instance = useSanityInstance(), isTokenRefreshInProgress = (0, import_react3.useRef)(false), timeoutRef = (0, import_react3.useRef)(null), processed401ErrorRef = (0, import_react3.useRef)(null), authState = useAuthState(), t1;
  $[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = () => {
    timeoutRef.current &&= (clearTimeout(timeoutRef.current), null);
  }, $[0] = t1) : t1 = $[0];
  let clearRefreshTimeout = t1, t2;
  $[1] === Symbol.for("react.memo_cache_sentinel") ? (t2 = {
    name: SDK_NODE_NAME,
    connectTo: SDK_CHANNEL_NAME
  }, $[1] = t2) : t2 = $[1];
  let windowConnection = useWindowConnection(t2), t3;
  $[2] !== instance || $[3] !== windowConnection ? (t3 = async () => {
    if (!isTokenRefreshInProgress.current) {
      isTokenRefreshInProgress.current = true, clearRefreshTimeout(), timeoutRef.current = setTimeout(() => {
        isTokenRefreshInProgress.current &&= false, timeoutRef.current = null;
      }, 1e4);
      try {
        let res = await windowConnection.fetch("dashboard/v1/auth/tokens/create");
        if (clearRefreshTimeout(), res.token) {
          setAuthToken(instance, res.token);
          let errorContainer = document.getElementById("__sanityError");
          errorContainer && Array.from(errorContainer.getElementsByTagName("div")).some(_temp$8) && errorContainer.remove();
        }
        isTokenRefreshInProgress.current = false;
      } catch {
        isTokenRefreshInProgress.current = false, clearRefreshTimeout();
      }
    }
  }, $[2] = instance, $[3] = windowConnection, $[4] = t3) : t3 = $[4];
  let requestNewToken = t3, t4, t5;
  $[5] === Symbol.for("react.memo_cache_sentinel") ? (t4 = () => () => {
    clearRefreshTimeout();
  }, t5 = [clearRefreshTimeout], $[5] = t4, $[6] = t5) : (t4 = $[5], t5 = $[6]), (0, import_react3.useEffect)(t4, t5);
  let t6;
  $[7] !== authState.error || $[8] !== authState.type || $[9] !== requestNewToken ? (t6 = () => {
    let has401Error = authState.type === AuthStateType.ERROR && authState.error && authState.error?.statusCode === 401 && !isTokenRefreshInProgress.current && processed401ErrorRef.current !== authState.error, isLoggedOut = authState.type === AuthStateType.LOGGED_OUT && !isTokenRefreshInProgress.current;
    has401Error || isLoggedOut ? (processed401ErrorRef.current = authState.type === AuthStateType.ERROR ? authState.error : void 0, requestNewToken()) : (authState.type !== AuthStateType.ERROR || processed401ErrorRef.current !== (authState.type === AuthStateType.ERROR ? authState.error : void 0)) && (processed401ErrorRef.current = null);
  }, $[7] = authState.error, $[8] = authState.type, $[9] = requestNewToken, $[10] = t6) : t6 = $[10];
  let t7;
  return $[11] !== authState || $[12] !== requestNewToken ? (t7 = [authState, requestNewToken], $[11] = authState, $[12] = requestNewToken, $[13] = t7) : t7 = $[13], (0, import_react3.useEffect)(t6, t7), children;
}
function _temp$8(div) {
  return div.textContent?.includes("Uncaught error: Unauthorized - A valid session is required for this endpoint");
}
var ComlinkTokenRefreshProvider = (t0) => {
  let $ = (0, import_react_compiler_runtime2.c)(2), { children } = t0, instance = useSanityInstance(), isInDashboard = getIsInDashboardState(instance).getCurrent(), isStudio = isStudioConfig(instance.config);
  if (isInDashboard && !isStudio) {
    let t1;
    return $[0] === children ? t1 = $[1] : (t1 = (0, import_jsx_runtime2.jsx)(DashboardTokenRefresh2, { children }), $[0] = children, $[1] = t1), t1;
  }
  return children;
};
function useLoginUrl() {
  let $ = (0, import_react_compiler_runtime2.c)(2), instance = useSanityInstance(), t0;
  $[0] === instance ? t0 = $[1] : (t0 = getLoginUrlState(instance), $[0] = instance, $[1] = t0);
  let { subscribe, getCurrent } = t0;
  return (0, import_react3.useSyncExternalStore)(subscribe, getCurrent);
}
function useVerifyOrgProjects(t0, projectIds) {
  let $ = (0, import_react_compiler_runtime2.c)(5), disabled = t0 !== void 0 && t0, instance = useSanityInstance(), [error2, setError] = (0, import_react3.useState)(null), isInactive = disabled || !projectIds || projectIds.length === 0, [prevInactive, setPrevInactive] = (0, import_react3.useState)(isInactive);
  prevInactive !== isInactive && (setPrevInactive(isInactive), isInactive && setError(null));
  let t1, t2;
  return $[0] !== instance || $[1] !== isInactive || $[2] !== projectIds ? (t1 = () => {
    if (isInactive) return;
    let subscription = observeOrganizationVerificationState(instance, projectIds).subscribe((result) => {
      setError(result.error);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, t2 = [
    instance,
    isInactive,
    projectIds
  ], $[0] = instance, $[1] = isInactive, $[2] = projectIds, $[3] = t1, $[4] = t2) : (t1 = $[3], t2 = $[4]), (0, import_react3.useEffect)(t1, t2), error2;
}
var CHUNK_RELOAD_STORAGE_KEY = "__sanity_sdk_chunk_reload_attempted";
function readChunkReloadFlag() {
  try {
    return typeof window > "u" || window.sessionStorage === void 0 ? false : window.sessionStorage.getItem(CHUNK_RELOAD_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}
function setChunkReloadFlag() {
  try {
    if (typeof window > "u" || window.sessionStorage === void 0) return;
    window.sessionStorage.setItem(CHUNK_RELOAD_STORAGE_KEY, "1");
  } catch {
  }
}
function clearChunkReloadFlag() {
  try {
    if (typeof window > "u" || window.sessionStorage === void 0) return;
    window.sessionStorage.removeItem(CHUNK_RELOAD_STORAGE_KEY);
  } catch {
  }
}
var styles = {
  container: {
    padding: "28px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "21px",
    fontSize: "14px"
  },
  heading: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700
  },
  paragraph: { margin: 0 },
  link: {
    appearance: "none",
    background: "transparent",
    border: 0,
    padding: 0,
    font: "inherit",
    textDecoration: "underline",
    cursor: "pointer"
  },
  code: { fontFamily: "-apple-system-ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace" }
};
function Error$1(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(13), { heading, description, code, cta } = t0, t1;
  $[0] === heading ? t1 = $[1] : (t1 = (0, import_jsx_runtime2.jsx)("h1", {
    style: styles.heading,
    children: heading
  }), $[0] = heading, $[1] = t1);
  let t2;
  $[2] === description ? t2 = $[3] : (t2 = description && (0, import_jsx_runtime2.jsx)("p", {
    style: styles.paragraph,
    dangerouslySetInnerHTML: { __html: description }
  }), $[2] = description, $[3] = t2);
  let t3;
  $[4] === code ? t3 = $[5] : (t3 = code && (0, import_jsx_runtime2.jsx)("code", {
    style: styles.code,
    children: code
  }), $[4] = code, $[5] = t3);
  let t4;
  $[6] === cta ? t4 = $[7] : (t4 = cta && (cta.href || cta.onClick) && (0, import_jsx_runtime2.jsx)("p", {
    style: styles.paragraph,
    children: cta.href ? (0, import_jsx_runtime2.jsx)("a", {
      style: styles.link,
      href: cta.href,
      target: "_blank",
      rel: "noopener noreferrer",
      children: cta.text
    }) : (0, import_jsx_runtime2.jsx)("button", {
      style: styles.link,
      onClick: cta.onClick,
      children: cta.text
    })
  }), $[6] = cta, $[7] = t4);
  let t5;
  return $[8] !== t1 || $[9] !== t2 || $[10] !== t3 || $[11] !== t4 ? (t5 = (0, import_jsx_runtime2.jsxs)("div", {
    style: styles.container,
    children: [
      t1,
      t2,
      t3,
      t4
    ]
  }), $[8] = t1, $[9] = t2, $[10] = t3, $[11] = t4, $[12] = t5) : t5 = $[12], t5;
}
function reload() {
  try {
    window.location.reload();
  } catch {
  }
}
function ChunkLoadError(_props) {
  let $ = (0, import_react_compiler_runtime2.c)(4), t0;
  $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = readChunkReloadFlag(), $[0] = t0) : t0 = $[0];
  let alreadyAttempted = t0, t1, t2;
  if ($[1] === Symbol.for("react.memo_cache_sentinel") ? (t1 = () => {
    alreadyAttempted || (setChunkReloadFlag(), reload());
  }, t2 = [alreadyAttempted], $[1] = t1, $[2] = t2) : (t1 = $[1], t2 = $[2]), (0, import_react3.useEffect)(t1, t2), !alreadyAttempted) return null;
  let t3;
  return $[3] === Symbol.for("react.memo_cache_sentinel") ? (t3 = (0, import_jsx_runtime2.jsx)(Error$1, {
    heading: "A new version is available",
    description: "The page tried to load an asset that no longer exists. Reload to continue with the latest version.",
    cta: {
      text: "Reload page",
      onClick: _temp$7
    }
  }), $[3] = t3) : t3 = $[3], t3;
}
function _temp$7() {
  clearChunkReloadFlag(), reload();
}
function CorsErrorComponent(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(6), { projectId, error: error2 } = t0, origin = window.location.origin, t1;
  if ($[0] !== projectId) {
    let url = new URL(`https://sanity.io/manage/project/${projectId}/api`);
    url.searchParams.set("cors", "add"), url.searchParams.set("origin", origin), url.searchParams.set("credentials", "include"), t1 = url.toString(), $[0] = projectId, $[1] = t1;
  } else t1 = $[1];
  let corsUrl = t1, t2;
  return $[2] !== corsUrl || $[3] !== error2 || $[4] !== projectId ? (t2 = (0, import_jsx_runtime2.jsx)(Error$1, {
    heading: "Before you continue…",
    ...projectId ? {
      description: "To access your content, you need to <strong>add the following URL as a CORS origin</strong> to your Sanity project.",
      code: origin,
      cta: {
        text: "Manage CORS configuration",
        href: corsUrl
      }
    } : { description: S(error2) }
  }), $[2] = corsUrl, $[3] = error2, $[4] = projectId, $[5] = t2) : t2 = $[5], t2;
}
function isInIframe() {
  return typeof window < "u" && window.self !== window.top;
}
function isLocalUrl(window2) {
  let url = window2 === void 0 ? "" : window2.location.href;
  return url.startsWith("http://localhost") || url.startsWith("https://localhost") || url.startsWith("http://127.0.0.1") || url.startsWith("https://127.0.0.1");
}
var AuthError = class extends Error {
  constructor(error2) {
    typeof error2 == "object" && error2 && "message" in error2 && typeof error2.message == "string" ? super(error2.message) : super(), this.cause = error2;
  }
};
var ConfigurationError = class extends Error {
  constructor(error2) {
    typeof error2 == "object" && error2 && "message" in error2 && typeof error2.message == "string" ? super(error2.message) : super(), this.cause = error2;
  }
};
function createCallbackHook(callback) {
  function useHook() {
    let $ = (0, import_react_compiler_runtime2.c)(2), instance = useSanityInstance(), t0;
    return $[0] === instance ? t0 = $[1] : (t0 = (...t1) => callback(instance, ...t1), $[0] = instance, $[1] = t0), t0;
  }
  return useHook;
}
var useHandleAuthCallback = createCallbackHook(handleAuthCallback);
function LoginCallback() {
  let $ = (0, import_react_compiler_runtime2.c)(3), handleAuthCallback2 = useHandleAuthCallback(), t0, t1;
  return $[0] === handleAuthCallback2 ? (t0 = $[1], t1 = $[2]) : (t0 = () => {
    let url = new URL(location.href);
    handleAuthCallback2(url.toString()).then(_temp$6);
  }, t1 = [handleAuthCallback2], $[0] = handleAuthCallback2, $[1] = t0, $[2] = t1), (0, import_react3.useEffect)(t0, t1), null;
}
function _temp$6(replacementLocation) {
  replacementLocation && history.replaceState(null, "", replacementLocation);
}
var useLogOut = createCallbackHook(logout);
function DashboardAccessRequest(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(5), { projectId } = t0, t1;
  $[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = {
    name: SDK_NODE_NAME,
    connectTo: SDK_CHANNEL_NAME
  }, $[0] = t1) : t1 = $[0];
  let { fetch } = useWindowConnection(t1), t2, t3;
  return $[1] !== fetch || $[2] !== projectId ? (t2 = () => {
    fetch("dashboard/v1/auth/access/request", {
      resourceType: "project",
      resourceId: projectId
    });
  }, t3 = [fetch, projectId], $[1] = fetch, $[2] = projectId, $[3] = t2, $[4] = t3) : (t2 = $[3], t3 = $[4]), (0, import_react3.useEffect)(t2, t3), null;
}
function LoginError(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(30), { error: error2, resetErrorBoundary } = t0;
  if (!(error2 instanceof AuthError || error2 instanceof ConfigurationError || error2 instanceof ClientError)) throw error2;
  let logout2 = useLogOut(), authState = useAuthState(), instance = useSanityInstance(), { config: t1 } = instance, { projectId } = t1, clientError = error2 instanceof ClientError ? error2 : error2 instanceof AuthError && error2.cause instanceof ClientError ? error2.cause : null, t2;
  $[0] === instance ? t2 = $[1] : (t2 = getIsInDashboardState(instance).getCurrent(), $[0] = instance, $[1] = t2);
  let isInDashboard = t2, t3;
  $[2] === clientError ? t3 = $[3] : (t3 = !!clientError && clientError.statusCode === 401 && isProjectUserNotFoundClientError(clientError), $[2] = clientError, $[3] = t3);
  let isProjectUserNotFound = t3, dashboardAccessProjectId = isProjectUserNotFound && projectId && isInDashboard ? projectId : null, t4;
  $[4] !== logout2 || $[5] !== resetErrorBoundary ? (t4 = async () => {
    await logout2(), resetErrorBoundary();
  }, $[4] = logout2, $[5] = resetErrorBoundary, $[6] = t4) : t4 = $[6];
  let handleRetry = t4, message = "Please try again or contact support if the problem persists.", retry2 = true;
  if (clientError) {
    if (clientError.statusCode === 401) {
      if (isProjectUserNotFound) {
        let t52;
        $[7] === clientError ? t52 = $[8] : (t52 = getClientErrorApiDescription(clientError), $[7] = clientError, $[8] = t52);
        let description = t52;
        description && (message = description), retry2 = false;
      } else isInDashboard || (message = "Signing you out and returning to login...", retry2 = true);
    } else if (clientError.statusCode === 404) {
      let errorMessage = getClientErrorApiBody(clientError)?.message || "";
      message = errorMessage.startsWith("Session with sid") && errorMessage.endsWith("not found") ? "The session ID is invalid or expired." : "The login link is invalid or expired. Please try again.", retry2 = true;
    }
  }
  authState.type !== AuthStateType.ERROR && error2 instanceof ConfigurationError && (message = error2.message, retry2 = true);
  let t5;
  $[9] !== message || $[10] !== retry2 ? (t5 = {
    authErrorMessage: message,
    showRetryCta: retry2
  }, $[9] = message, $[10] = retry2, $[11] = t5) : t5 = $[11];
  let { authErrorMessage, showRetryCta } = t5, hasAutoLoggedOutRef = (0, import_react3.useRef)(false), t6, t7;
  $[12] !== clientError || $[13] !== handleRetry || $[14] !== isInDashboard || $[15] !== isProjectUserNotFound ? (t6 = () => {
    clientError && clientError.statusCode === 401 && !isProjectUserNotFound && !isInDashboard && !hasAutoLoggedOutRef.current && (hasAutoLoggedOutRef.current = true, handleRetry());
  }, t7 = [
    clientError,
    handleRetry,
    isInDashboard,
    isProjectUserNotFound
  ], $[12] = clientError, $[13] = handleRetry, $[14] = isInDashboard, $[15] = isProjectUserNotFound, $[16] = t6, $[17] = t7) : (t6 = $[16], t7 = $[17]), (0, import_react3.useEffect)(t6, t7);
  let t8;
  $[18] === dashboardAccessProjectId ? t8 = $[19] : (t8 = dashboardAccessProjectId && (0, import_jsx_runtime2.jsx)(import_react3.Suspense, {
    fallback: null,
    children: (0, import_jsx_runtime2.jsx)(DashboardAccessRequest, { projectId: dashboardAccessProjectId })
  }), $[18] = dashboardAccessProjectId, $[19] = t8);
  let t9 = error2 instanceof ConfigurationError ? "Configuration Error" : "Authentication Error", t10;
  $[20] !== handleRetry || $[21] !== showRetryCta ? (t10 = showRetryCta ? {
    text: "Retry",
    onClick: handleRetry
  } : void 0, $[20] = handleRetry, $[21] = showRetryCta, $[22] = t10) : t10 = $[22];
  let t11;
  $[23] !== authErrorMessage || $[24] !== t10 || $[25] !== t9 ? (t11 = (0, import_jsx_runtime2.jsx)(Error$1, {
    heading: t9,
    description: authErrorMessage,
    cta: t10
  }), $[23] = authErrorMessage, $[24] = t10, $[25] = t9, $[26] = t11) : t11 = $[26];
  let t12;
  return $[27] !== t11 || $[28] !== t8 ? (t12 = (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [t8, t11] }), $[27] = t11, $[28] = t8, $[29] = t12) : t12 = $[29], t12;
}
if (isInIframe() && !document.querySelector("[data-sanity-core]")) {
  let parsedUrl = new URL(window.location.href), mode = new URLSearchParams(parsedUrl.hash.slice(1)).get("mode"), script = document.createElement("script");
  script.src = mode === "core-ui--staging" ? "https://core.sanity-cdn.work/bridge.js" : "https://core.sanity-cdn.com/bridge.js", script.type = "module", script.async = true, document.head.appendChild(script);
}
function AuthBoundary(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(13), props, t1;
  $[0] === t0 ? (props = $[1], t1 = $[2]) : ({ LoginErrorComponent: t1, ...props } = t0, $[0] = t0, $[1] = props, $[2] = t1);
  let LoginErrorComponent = t1 === void 0 ? LoginError : t1, authState = useAuthState(), sessionResetKey = authState.type === AuthStateType.LOGGED_IN ? authState.token : authState.type, t2;
  $[3] === LoginErrorComponent ? t2 = $[4] : (t2 = function LoginComponentWithLayoutProps(fallbackProps) {
    return isImportError(fallbackProps.error) ? (0, import_jsx_runtime2.jsx)(ChunkLoadError, { ...fallbackProps }) : fallbackProps.error instanceof CorsOriginError ? (0, import_jsx_runtime2.jsx)(CorsErrorComponent, {
      ...fallbackProps,
      projectId: getCorsErrorProjectId(fallbackProps.error)
    }) : (0, import_jsx_runtime2.jsx)(LoginErrorComponent, { ...fallbackProps });
  }, $[3] = LoginErrorComponent, $[4] = t2);
  let FallbackComponent = t2, t3;
  $[5] === sessionResetKey ? t3 = $[6] : (t3 = [sessionResetKey], $[5] = sessionResetKey, $[6] = t3);
  let t4;
  $[7] === props ? t4 = $[8] : (t4 = (0, import_jsx_runtime2.jsx)(AuthSwitch, { ...props }), $[7] = props, $[8] = t4);
  let t5;
  return $[9] !== FallbackComponent || $[10] !== t3 || $[11] !== t4 ? (t5 = (0, import_jsx_runtime2.jsx)(ComlinkTokenRefreshProvider, { children: (0, import_jsx_runtime2.jsx)(DashboardTokenRefreshProvider, { children: (0, import_jsx_runtime2.jsx)(m, {
    FallbackComponent,
    resetKeys: t3,
    children: t4
  }) }) }), $[9] = FallbackComponent, $[10] = t3, $[11] = t4, $[12] = t5) : t5 = $[12], t5;
}
function AuthSwitch(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(16), children, projectIds, props, t1, t2;
  $[0] === t0 ? (children = $[1], projectIds = $[2], props = $[3], t1 = $[4], t2 = $[5]) : ({ CallbackComponent: t1, children, verifyOrganization: t2, projectIds, ...props } = t0, $[0] = t0, $[1] = children, $[2] = projectIds, $[3] = props, $[4] = t1, $[5] = t2);
  let CallbackComponent = t1 === void 0 ? LoginCallback : t1, verifyOrganization = t2 === void 0 || t2, authState = useAuthState(), instance = useSanityInstance(), t3;
  $[6] === instance.config ? t3 = $[7] : (t3 = isStudioConfig(instance.config), $[6] = instance.config, $[7] = t3);
  let isStudio = t3, orgError = useVerifyOrgProjects(!verifyOrganization || isStudio || authState.type !== AuthStateType.LOGGED_IN, projectIds), isLoggedOut = authState.type === AuthStateType.LOGGED_OUT && !authState.isDestroyingSession, loginUrl = useLoginUrl(), t4, t5;
  if ($[8] !== isLoggedOut || $[9] !== isStudio || $[10] !== loginUrl ? (t4 = () => {
    isLoggedOut && !isInIframe() && !isStudio && !isDashboardEnvironment() && (window.location.href = loginUrl);
  }, t5 = [
    isLoggedOut,
    loginUrl,
    isStudio
  ], $[8] = isLoggedOut, $[9] = isStudio, $[10] = loginUrl, $[11] = t4, $[12] = t5) : (t4 = $[11], t5 = $[12]), (0, import_react3.useEffect)(t4, t5), verifyOrganization && orgError) throw new ConfigurationError({ message: orgError });
  switch (authState.type) {
    case AuthStateType.ERROR:
      throw new AuthError(authState.error);
    case AuthStateType.LOGGING_IN: {
      let t6;
      return $[13] !== CallbackComponent || $[14] !== props ? (t6 = (0, import_jsx_runtime2.jsx)(CallbackComponent, { ...props }), $[13] = CallbackComponent, $[14] = props, $[15] = t6) : t6 = $[15], t6;
    }
    case AuthStateType.LOGGED_IN:
      return children;
    case AuthStateType.LOGGED_OUT:
      return null;
    default:
      throw Error(`Invalid auth state: ${authState.type}`);
  }
}
var SDKStudioContext = (0, import_react3.createContext)(null);
SDKStudioContext.displayName = "SDKStudioContext";
var DEFAULT_RESOURCE_NAME = "default";
function getFirstResourceId(result) {
  if (result.status === "fulfilled") return result.value.data?.[0]?.id;
}
async function resolveOrgResources(instance, organizationId) {
  let client = await firstValueFrom(getClientState(instance, {
    apiVersion: "v2026-07-09",
    scope: "global"
  }).observable), [mediaLibrariesResult, canvasesResult] = await Promise.allSettled([client.request({
    url: "/media-libraries",
    query: { organizationId },
    tag: "org-resources.media-libraries"
  }), client.request({
    url: "/canvases",
    query: { organizationId },
    tag: "org-resources.canvases"
  })]), mediaLibraryId = getFirstResourceId(mediaLibrariesResult), canvasId = getFirstResourceId(canvasesResult);
  return {
    mediaLibrary: mediaLibraryId ? { mediaLibraryId } : void 0,
    canvas: canvasId ? { canvasId } : void 0
  };
}
var ResourcesContext = (0, import_react3.createContext)({});
var DEFAULT_MEDIA_LIBRARY_RESOURCE_NAME = "media-library";
var DEFAULT_CANVAS_RESOURCE_NAME = "canvas";
var inferredResourceCache = /* @__PURE__ */ new WeakMap();
function getOrgResourcePromises(instance, organizationId) {
  let promises = inferredResourceCache.get(instance);
  if (!promises) {
    let basePromise = resolveOrgResources(instance, organizationId).then((result) => result, (error2) => (console.warn("[sanity/sdk] Failed to infer org resources:", error2), {
      mediaLibrary: void 0,
      canvas: void 0
    }));
    promises = /* @__PURE__ */ new Map([[DEFAULT_MEDIA_LIBRARY_RESOURCE_NAME, basePromise.then((r) => r.mediaLibrary)], [DEFAULT_CANVAS_RESOURCE_NAME, basePromise.then((r) => r.canvas)]]), inferredResourceCache.set(instance, promises);
  }
  return promises;
}
function InferredResourcesProvider(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(9), { instance, orgId, explicitResources, children } = t0, promises = getOrgResourcePromises(instance, orgId), ml = (0, import_react3.use)(promises.get(DEFAULT_MEDIA_LIBRARY_RESOURCE_NAME)), canvas = (0, import_react3.use)(promises.get(DEFAULT_CANVAS_RESOURCE_NAME)), inferred;
  $[0] !== canvas || $[1] !== ml ? (inferred = {}, ml !== void 0 && (inferred[DEFAULT_MEDIA_LIBRARY_RESOURCE_NAME] = ml), canvas !== void 0 && (inferred[DEFAULT_CANVAS_RESOURCE_NAME] = canvas), $[0] = canvas, $[1] = ml, $[2] = inferred) : inferred = $[2];
  let t1;
  $[3] !== explicitResources || $[4] !== inferred ? (t1 = {
    ...inferred,
    ...explicitResources
  }, $[3] = explicitResources, $[4] = inferred, $[5] = t1) : t1 = $[5];
  let resources = t1, t2;
  return $[6] !== children || $[7] !== resources ? (t2 = (0, import_jsx_runtime2.jsx)(ResourcesContext.Provider, {
    value: resources,
    children
  }), $[6] = children, $[7] = resources, $[8] = t2) : t2 = $[8], t2;
}
function OrganizationResourcesProvider(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(10), { resources: t1, inferMediaLibraryAndCanvas, children } = t0, t2;
  $[0] === t1 ? t2 = $[1] : (t2 = t1 === void 0 ? {} : t1, $[0] = t1, $[1] = t2);
  let explicitResources = t2, instance = useSanityInstance(), orgId = useOrganizationId();
  if (!inferMediaLibraryAndCanvas || !orgId) {
    let t32;
    return $[2] !== children || $[3] !== explicitResources ? (t32 = (0, import_jsx_runtime2.jsx)(ResourcesContext.Provider, {
      value: explicitResources,
      children
    }), $[2] = children, $[3] = explicitResources, $[4] = t32) : t32 = $[4], t32;
  }
  let t3;
  return $[5] !== children || $[6] !== explicitResources || $[7] !== instance || $[8] !== orgId ? (t3 = (0, import_jsx_runtime2.jsx)(InferredResourcesProvider, {
    instance,
    orgId,
    explicitResources,
    children
  }), $[5] = children, $[6] = explicitResources, $[7] = instance, $[8] = orgId, $[9] = t3) : t3 = $[9], t3;
}
var ResourceContext = (0, import_react3.createContext)(void 0);
var PerspectiveContext = (0, import_react3.createContext)(void 0);
var ProjectContext = (0, import_react3.createContext)(void 0);
function SanityInstanceProvider(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(6), { instance, fallback, children } = t0, t1;
  $[0] !== children || $[1] !== fallback ? (t1 = (0, import_jsx_runtime2.jsx)(import_react3.Suspense, {
    fallback,
    children
  }), $[0] = children, $[1] = fallback, $[2] = t1) : t1 = $[2];
  let t2;
  return $[3] !== instance || $[4] !== t1 ? (t2 = (0, import_jsx_runtime2.jsx)(SanityInstanceContext.Provider, {
    value: instance,
    children: t1
  }), $[3] = instance, $[4] = t1, $[5] = t2) : t2 = $[5], t2;
}
var DEFAULT_FALLBACK = (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: "Warning: No fallback provided. Please supply a fallback prop to ensure proper Suspense handling." });
function ResourceProvider(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(35), children, config, fallback, resource;
  $[0] === t0 ? (children = $[1], config = $[2], fallback = $[3], resource = $[4]) : ({ children, fallback, resource, ...config } = t0, $[0] = t0, $[1] = children, $[2] = config, $[3] = fallback, $[4] = resource);
  let parentPerspective = (0, import_react3.useContext)(PerspectiveContext), parentResource = (0, import_react3.useContext)(ResourceContext), parentInstance = (0, import_react3.useContext)(SanityInstanceContext), parentProjectId = (0, import_react3.useContext)(ProjectContext), { projectId, dataset, perspective } = config, t1;
  $[5] !== config || $[6] !== parentInstance ? (t1 = () => parentInstance ?? createSanityInstance(config), $[5] = config, $[6] = parentInstance, $[7] = t1) : t1 = $[7];
  let [instance] = (0, import_react3.useState)(t1), t2;
  bb0: {
    if (projectId && dataset) {
      let t32;
      $[8] !== dataset || $[9] !== projectId ? (t32 = {
        projectId,
        dataset
      }, $[8] = dataset, $[9] = projectId, $[10] = t32) : t32 = $[10], t2 = t32;
      break bb0;
    }
    if (dataset && parentProjectId) {
      let t32;
      $[11] !== dataset || $[12] !== parentProjectId ? (t32 = {
        projectId: parentProjectId,
        dataset
      }, $[11] = dataset, $[12] = parentProjectId, $[13] = t32) : t32 = $[13], t2 = t32;
      break bb0;
    }
    t2 = void 0;
  }
  let configResource = t2, t3;
  bb1: {
    if (resource) {
      t3 = resource;
      break bb1;
    }
    if (configResource) {
      t3 = configResource;
      break bb1;
    }
    if (projectId) {
      t3 = void 0;
      break bb1;
    }
    t3 = parentResource;
  }
  let effectiveResource = t3, t4;
  bb2: {
    if (effectiveResource && isDatasetResource(effectiveResource)) {
      t4 = effectiveResource.projectId;
      break bb2;
    }
    t4 = projectId ?? parentProjectId;
  }
  let effectiveProjectId = t4, t5, t6;
  $[14] !== effectiveResource || $[15] !== instance ? (t5 = () => {
    effectiveResource && isDatasetResource(effectiveResource) && initTelemetry(instance, effectiveResource.projectId);
  }, t6 = [instance, effectiveResource], $[14] = effectiveResource, $[15] = instance, $[16] = t5, $[17] = t6) : (t5 = $[16], t6 = $[17]), (0, import_react3.useEffect)(t5, t6);
  let disposal = (0, import_react3.useRef)(null), t7, t8;
  $[18] !== instance || $[19] !== parentInstance ? (t7 = () => (disposal.current !== null && instance === disposal.current.instance && (clearTimeout(disposal.current.timeoutId), disposal.current = null), () => {
    disposal.current = {
      instance,
      timeoutId: setTimeout(() => {
        !instance.isDisposed() && instance !== parentInstance && instance.dispose();
      }, 0)
    };
  }), t8 = [instance, parentInstance], $[18] = instance, $[19] = parentInstance, $[20] = t7, $[21] = t8) : (t7 = $[20], t8 = $[21]), (0, import_react3.useEffect)(t7, t8);
  let t9 = fallback === void 0 ? DEFAULT_FALLBACK : fallback, t10 = perspective ?? parentPerspective, t11;
  $[22] !== children || $[23] !== t10 ? (t11 = (0, import_jsx_runtime2.jsx)(PerspectiveContext.Provider, {
    value: t10,
    children
  }), $[22] = children, $[23] = t10, $[24] = t11) : t11 = $[24];
  let t12;
  $[25] !== effectiveProjectId || $[26] !== t11 ? (t12 = (0, import_jsx_runtime2.jsx)(ProjectContext.Provider, {
    value: effectiveProjectId,
    children: t11
  }), $[25] = effectiveProjectId, $[26] = t11, $[27] = t12) : t12 = $[27];
  let t13;
  $[28] !== effectiveResource || $[29] !== t12 ? (t13 = (0, import_jsx_runtime2.jsx)(ResourceContext.Provider, {
    value: effectiveResource,
    children: t12
  }), $[28] = effectiveResource, $[29] = t12, $[30] = t13) : t13 = $[30];
  let t14;
  return $[31] !== instance || $[32] !== t13 || $[33] !== t9 ? (t14 = (0, import_jsx_runtime2.jsx)(SanityInstanceProvider, {
    instance,
    fallback: t9,
    children: t13
  }), $[31] = instance, $[32] = t13, $[33] = t9, $[34] = t14) : t14 = $[34], t14;
}
function ResetChunkReloadFlagOnMount() {
  let $ = (0, import_react_compiler_runtime2.c)(1), t0;
  return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = [], $[0] = t0) : t0 = $[0], (0, import_react3.useEffect)(_temp$5, t0), null;
}
function _temp$5() {
  clearChunkReloadFlag();
}
function SDKProvider(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(36), children, config, fallback, inferMediaLibraryAndCanvas, props;
  $[0] === t0 ? (children = $[1], config = $[2], fallback = $[3], inferMediaLibraryAndCanvas = $[4], props = $[5]) : ({ children, config, fallback, inferMediaLibraryAndCanvas, ...props } = t0, $[0] = t0, $[1] = children, $[2] = config, $[3] = fallback, $[4] = inferMediaLibraryAndCanvas, $[5] = props);
  let defaultConfig = Array.isArray(config) ? config[0] : config, defaultProjectId = defaultConfig?.projectId, defaultDataset = defaultConfig?.dataset, t1;
  bb0: {
    let t22;
    $[6] === props.resources ? t22 = $[7] : (t22 = props.resources ?? {}, $[6] = props.resources, $[7] = t22);
    let explicit = t22;
    if (defaultProjectId && defaultDataset && !Object.hasOwn(explicit, "default")) {
      let t32;
      $[8] !== defaultDataset || $[9] !== defaultProjectId ? (t32 = {
        projectId: defaultProjectId,
        dataset: defaultDataset
      }, $[8] = defaultDataset, $[9] = defaultProjectId, $[10] = t32) : t32 = $[10];
      let t42;
      $[11] !== explicit || $[12] !== t32 ? (t42 = {
        [DEFAULT_RESOURCE_NAME]: t32,
        ...explicit
      }, $[11] = explicit, $[12] = t32, $[13] = t42) : t42 = $[13], t1 = t42;
      break bb0;
    }
    t1 = explicit;
  }
  let resourcesValue = t1, t2;
  if ($[14] !== config || $[15] !== resourcesValue) {
    let t32;
    $[17] === resourcesValue ? t32 = $[18] : (t32 = Object.values(resourcesValue).filter(isDatasetResource).map(_temp2$1), $[17] = resourcesValue, $[18] = t32);
    let t42;
    $[19] !== config || $[20] !== t32 ? (t42 = new Set([...t32, ...(Array.isArray(config) ? config : [config]).map(_temp3$1)].filter(_temp4)), $[19] = config, $[20] = t32, $[21] = t42) : t42 = $[21], t2 = Array.from(t42), $[14] = config, $[15] = resourcesValue, $[16] = t2;
  } else t2 = $[16];
  let projectIds = t2, t3;
  $[22] === Symbol.for("react.memo_cache_sentinel") ? (t3 = (0, import_jsx_runtime2.jsx)(ResetChunkReloadFlagOnMount, {}), $[22] = t3) : t3 = $[22];
  let t4 = resourcesValue[DEFAULT_RESOURCE_NAME], t5;
  $[23] !== children || $[24] !== inferMediaLibraryAndCanvas || $[25] !== resourcesValue ? (t5 = (0, import_jsx_runtime2.jsx)(OrganizationResourcesProvider, {
    resources: resourcesValue,
    inferMediaLibraryAndCanvas,
    children
  }), $[23] = children, $[24] = inferMediaLibraryAndCanvas, $[25] = resourcesValue, $[26] = t5) : t5 = $[26];
  let t6;
  $[27] !== projectIds || $[28] !== props || $[29] !== t5 ? (t6 = (0, import_jsx_runtime2.jsx)(AuthBoundary, {
    ...props,
    projectIds,
    children: t5
  }), $[27] = projectIds, $[28] = props, $[29] = t5, $[30] = t6) : t6 = $[30];
  let t7;
  return $[31] !== defaultConfig || $[32] !== fallback || $[33] !== t4 || $[34] !== t6 ? (t7 = (0, import_jsx_runtime2.jsxs)(m, {
    FallbackComponent: ChunkAwareFallback,
    children: [t3, (0, import_jsx_runtime2.jsx)(ResourceProvider, {
      ...defaultConfig,
      resource: t4,
      fallback,
      children: t6
    })]
  }), $[31] = defaultConfig, $[32] = fallback, $[33] = t4, $[34] = t6, $[35] = t7) : t7 = $[35], t7;
}
function _temp4(id2) {
  return !!id2;
}
function _temp3$1(configObj) {
  return configObj.projectId;
}
function _temp2$1(resource) {
  return resource.projectId;
}
function ChunkAwareFallback(fallbackProps) {
  let $ = (0, import_react_compiler_runtime2.c)(2);
  if (isImportError(fallbackProps.error)) {
    let t0;
    return $[0] === fallbackProps ? t0 = $[1] : (t0 = (0, import_jsx_runtime2.jsx)(ChunkLoadError, { ...fallbackProps }), $[0] = fallbackProps, $[1] = t0), t0;
  }
  throw fallbackProps.error;
}
var REDIRECT_URL = "https://sanity.io/welcome";
function deriveConfigFromWorkspace(workspace) {
  return {
    projectId: workspace.projectId,
    dataset: workspace.dataset,
    studio: {
      authenticated: workspace.authenticated,
      auth: workspace.auth.token ? { token: workspace.auth.token } : void 0
    }
  };
}
function SanityApp(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(18), children, configProp, fallback, props;
  $[0] === t0 ? (children = $[1], configProp = $[2], fallback = $[3], props = $[4]) : ({ children, fallback, config: configProp, ...props } = t0, $[0] = t0, $[1] = children, $[2] = configProp, $[3] = fallback, $[4] = props);
  let studioWorkspace = (0, import_react3.useContext)(SDKStudioContext), t1;
  bb0: {
    if (configProp) {
      t1 = configProp;
      break bb0;
    }
    if (studioWorkspace) {
      let t23;
      $[5] === studioWorkspace ? t23 = $[6] : (t23 = deriveConfigFromWorkspace(studioWorkspace), $[5] = studioWorkspace, $[6] = t23), t1 = t23;
      break bb0;
    }
    let t22;
    $[7] === Symbol.for("react.memo_cache_sentinel") ? (t22 = [], $[7] = t22) : t22 = $[7], t1 = t22;
  }
  let resolvedConfig = t1, t2, t3;
  $[8] !== configProp || $[9] !== resolvedConfig || $[10] !== studioWorkspace ? (t2 = () => {
    let timeout, primaryConfig = Array.isArray(resolvedConfig) ? resolvedConfig[0] : resolvedConfig, shouldRedirectWithoutConfig = configProp === void 0 && !studioWorkspace && !primaryConfig;
    return !isInIframe() && !isLocalUrl(window) && (shouldRedirectWithoutConfig || primaryConfig && !isStudioConfig(primaryConfig)) && (timeout = setTimeout(_temp$4, 1e3)), () => clearTimeout(timeout);
  }, t3 = [
    configProp,
    resolvedConfig,
    studioWorkspace
  ], $[8] = configProp, $[9] = resolvedConfig, $[10] = studioWorkspace, $[11] = t2, $[12] = t3) : (t2 = $[11], t3 = $[12]), (0, import_react3.useEffect)(t2, t3);
  let t4;
  return $[13] !== children || $[14] !== fallback || $[15] !== props || $[16] !== resolvedConfig ? (t4 = (0, import_jsx_runtime2.jsx)(SDKProvider, {
    ...props,
    fallback,
    config: resolvedConfig,
    children
  }), $[13] = children, $[14] = fallback, $[15] = props, $[16] = resolvedConfig, $[17] = t4) : t4 = $[17], t4;
}
function _temp$4() {
  console.warn("Redirecting to core", REDIRECT_URL), window.location.replace(REDIRECT_URL);
}
function renderSanityApp(rootElement, namedSources, options, children) {
  if (!rootElement) throw Error("Missing root element to mount application into");
  let { reactStrictMode = false } = options, root = (0, import_client7.createRoot)(rootElement), config = Object.values(namedSources);
  return root.render(reactStrictMode ? (0, import_jsx_runtime2.jsx)(import_react3.StrictMode, { children: (0, import_jsx_runtime2.jsx)(SanityApp, {
    config,
    fallback: (0, import_jsx_runtime2.jsx)("div", { children: "Loading..." }),
    children
  }) }) : (0, import_jsx_runtime2.jsx)(SanityApp, {
    config,
    fallback: (0, import_jsx_runtime2.jsx)("div", { children: "Loading..." }),
    children
  })), () => root.unmount();
}
function createFetcherHook(fetcher) {
  return function useFetcherHook(...params) {
    let instance = useSanityInstance(), source = fetcher.getState(instance, ...params);
    if (source.getCurrent().status === "pending") throw fetcher.resolveState(instance, ...params);
    let previous = (0, import_react3.useRef)(null), snapshot = (0, import_react3.useSyncExternalStore)(source.subscribe, () => {
      let next = source.getCurrent(), prev = previous.current;
      return prev && isDeepEqual(prev, next) ? prev : (previous.current = next, next);
    });
    if (snapshot.status !== "success") throw snapshot.status === "error" ? snapshot.error : fetcher.resolveState(instance, ...params);
    return {
      data: snapshot.data,
      isFetching: snapshot.isFetching,
      error: snapshot.error,
      refetch: () => fetcher.refetch(instance, ...params)
    };
  };
}
var useCheckPermissions = createFetcherHook(checkPermissions);
function normalizeResourceOptions(options, resources, contextResource, contextPerspective) {
  let { resourceName, projectId, dataset, ...rest } = options, resource = options.resource;
  if (resourceName && resource) throw Error(`Resource name ${JSON.stringify(resourceName)} and resource ${JSON.stringify(resource)} cannot be used together.`);
  let resolvedResource;
  if (resource) resolvedResource = resource;
  else if (resourceName) {
    if (!Object.hasOwn(resources, resourceName)) throw Error(`There's no resource named ${JSON.stringify(resourceName)} in context. Please use <ResourceProvider>.`);
    resolvedResource = resources[resourceName];
  }
  !resolvedResource && projectId && dataset && (resolvedResource = {
    projectId,
    dataset
  }), resolvedResource ||= contextResource;
  let resolvedPerspective = Object.hasOwn(options, "perspective") ? options.perspective : contextPerspective;
  return {
    ...rest,
    ...resolvedResource !== void 0 && { resource: resolvedResource },
    ...resolvedPerspective !== void 0 && { perspective: resolvedPerspective }
  };
}
function useEffectiveContextResource() {
  let $ = (0, import_react_compiler_runtime2.c)(5), contextResource = (0, import_react3.useContext)(ResourceContext), instance = (0, import_react3.useContext)(SanityInstanceContext), t0;
  $[0] === instance?.config ? t0 = $[1] : (t0 = instance?.config ?? {}, $[0] = instance?.config, $[1] = t0);
  let { projectId, dataset, resource: configResource } = t0, t1;
  bb0: {
    if (contextResource) {
      t1 = contextResource;
      break bb0;
    }
    if (configResource) {
      t1 = configResource;
      break bb0;
    }
    if (projectId && dataset) {
      let t2;
      $[2] !== dataset || $[3] !== projectId ? (t2 = {
        projectId,
        dataset
      }, $[2] = dataset, $[3] = projectId, $[4] = t2) : t2 = $[4], t1 = t2;
      break bb0;
    }
    t1 = void 0;
  }
  return t1;
}
function useNormalizedResourceOptions(options) {
  let $ = (0, import_react_compiler_runtime2.c)(5), resources = (0, import_react3.useContext)(ResourcesContext), effectiveContextResource = useEffectiveContextResource(), contextPerspective = (0, import_react3.useContext)(PerspectiveContext), t0;
  return $[0] !== contextPerspective || $[1] !== effectiveContextResource || $[2] !== options || $[3] !== resources ? (t0 = normalizeResourceOptions(options, resources, effectiveContextResource, contextPerspective), $[0] = contextPerspective, $[1] = effectiveContextResource, $[2] = options, $[3] = resources, $[4] = t0) : t0 = $[4], t0;
}
function useAgentGenerate(resourceHandle) {
  let $ = (0, import_react_compiler_runtime2.c)(5), instance = useSanityInstance(), t0;
  $[0] === resourceHandle ? t0 = $[1] : (t0 = resourceHandle ?? {}, $[0] = resourceHandle, $[1] = t0);
  let { resource } = useNormalizedResourceOptions(t0), t1;
  return $[2] !== instance || $[3] !== resource ? (t1 = (options) => agentGenerate(instance, options, resource), $[2] = instance, $[3] = resource, $[4] = t1) : t1 = $[4], t1;
}
function useAgentTransform(resourceHandle) {
  let $ = (0, import_react_compiler_runtime2.c)(5), instance = useSanityInstance(), t0;
  $[0] === resourceHandle ? t0 = $[1] : (t0 = resourceHandle ?? {}, $[0] = resourceHandle, $[1] = t0);
  let { resource } = useNormalizedResourceOptions(t0), t1;
  return $[2] !== instance || $[3] !== resource ? (t1 = (options) => agentTransform(instance, options, resource), $[2] = instance, $[3] = resource, $[4] = t1) : t1 = $[4], t1;
}
function useAgentTranslate(resourceHandle) {
  let $ = (0, import_react_compiler_runtime2.c)(5), instance = useSanityInstance(), t0;
  $[0] === resourceHandle ? t0 = $[1] : (t0 = resourceHandle ?? {}, $[0] = resourceHandle, $[1] = t0);
  let { resource } = useNormalizedResourceOptions(t0), t1;
  return $[2] !== instance || $[3] !== resource ? (t1 = (options) => agentTranslate(instance, options, resource), $[2] = instance, $[3] = resource, $[4] = t1) : t1 = $[4], t1;
}
function useAgentPrompt(resourceHandle) {
  let $ = (0, import_react_compiler_runtime2.c)(5), instance = useSanityInstance(), t0;
  $[0] === resourceHandle ? t0 = $[1] : (t0 = resourceHandle ?? {}, $[0] = resourceHandle, $[1] = t0);
  let { resource } = useNormalizedResourceOptions(t0), t1;
  return $[2] !== instance || $[3] !== resource ? (t1 = (options) => firstValueFrom(agentPrompt(instance, options, resource)), $[2] = instance, $[3] = resource, $[4] = t1) : t1 = $[4], t1;
}
function useAgentPatch(resourceHandle) {
  let $ = (0, import_react_compiler_runtime2.c)(5), instance = useSanityInstance(), t0;
  $[0] === resourceHandle ? t0 = $[1] : (t0 = resourceHandle ?? {}, $[0] = resourceHandle, $[1] = t0);
  let { resource } = useNormalizedResourceOptions(t0), t1;
  return $[2] !== instance || $[3] !== resource ? (t1 = (options) => firstValueFrom(agentPatch(instance, options, resource)), $[2] = instance, $[3] = resource, $[4] = t1) : t1 = $[4], t1;
}
var useApplication = createFetcherHook(application);
var useApplications = createFetcherHook(applications);
function createMutationHook(mutation) {
  let idle = {
    status: "idle",
    data: void 0,
    error: void 0
  };
  return function useMutationHook() {
    let instance = useSanityInstance(), [state, setState] = (0, import_react3.useState)(idle), callId = (0, import_react3.useRef)(0), mutate = (0, import_react3.useCallback)((input) => {
      let id2 = ++callId.current;
      return setState((prev) => ({
        status: "pending",
        data: prev.data,
        error: void 0
      })), mutation(instance, input).then(({ data }) => (id2 === callId.current && setState({
        status: "success",
        data,
        error: void 0
      }), data), (error2) => {
        throw id2 === callId.current && setState((prev) => ({
          status: "error",
          data: prev.data,
          error: error2
        })), error2;
      });
    }, [instance]), reset = (0, import_react3.useCallback)(() => {
      callId.current++, setState(idle);
    }, []);
    return {
      mutate,
      isPending: state.status === "pending",
      error: state.error,
      data: state.data,
      reset
    };
  };
}
var useDeleteApplication = createMutationHook(deleteApplication);
var useUpdateApplication = createMutationHook(updateApplication);
var useAuthToken = createStateSourceHook(getTokenState);
var useCurrentUser = createStateSourceHook(getCurrentUserState);
var useClient = createStateSourceHook({
  getState: (instance, options) => {
    if (!options || typeof options != "object") throw Error('useClient() requires a configuration object with at least an "apiVersion" property. Example: useClient({ apiVersion: "2024-11-12" })');
    return getClientState(instance, options);
  },
  getConfig: (options) => options
});
function useFrameConnection(options) {
  let $ = (0, import_react_compiler_runtime2.c)(12), { onMessage, targetOrigin, name, connectTo, heartbeat, onStatus } = options, instance = useSanityInstance(), controllerRef = (0, import_react3.useRef)(null), channelRef = (0, import_react3.useRef)(null), t0, t1;
  $[0] !== connectTo || $[1] !== heartbeat || $[2] !== instance || $[3] !== name || $[4] !== onMessage || $[5] !== onStatus || $[6] !== targetOrigin ? (t0 = () => {
    let controller = getOrCreateController(instance, targetOrigin), channel = getOrCreateChannel(instance, {
      name,
      connectTo,
      heartbeat
    });
    controllerRef.current = controller, channelRef.current = channel, channel.onStatus((event) => {
      onStatus?.(event.status);
    });
    let messageUnsubscribers = [];
    return onMessage && Object.entries(onMessage).forEach((t22) => {
      let [type, handler] = t22, unsubscribe = channel.on(type, handler);
      messageUnsubscribers.push(unsubscribe);
    }), () => {
      messageUnsubscribers.forEach(_temp$3), releaseChannel(instance, name), channelRef.current = null, controllerRef.current = null;
    };
  }, t1 = [
    targetOrigin,
    name,
    connectTo,
    heartbeat,
    onMessage,
    instance,
    onStatus
  ], $[0] = connectTo, $[1] = heartbeat, $[2] = instance, $[3] = name, $[4] = onMessage, $[5] = onStatus, $[6] = targetOrigin, $[7] = t0, $[8] = t1) : (t0 = $[7], t1 = $[8]), (0, import_react3.useEffect)(t0, t1);
  let t2;
  $[9] === Symbol.for("react.memo_cache_sentinel") ? (t2 = (frameWindow) => {
    let removeTarget = controllerRef.current?.addTarget(frameWindow);
    return () => {
      removeTarget?.();
    };
  }, $[9] = t2) : t2 = $[9];
  let connect = t2, t3;
  $[10] === Symbol.for("react.memo_cache_sentinel") ? (t3 = (type_0, data) => {
    channelRef.current?.post(type_0, data);
  }, $[10] = t3) : t3 = $[10];
  let sendMessage = t3, t4;
  return $[11] === Symbol.for("react.memo_cache_sentinel") ? (t4 = {
    connect,
    sendMessage
  }, $[11] = t4) : t4 = $[11], t4;
}
function _temp$3(unsub) {
  return unsub();
}
function useTrackHookUsage(hookName) {
  let instance = useSanityInstance(), tracked = (0, import_react3.useRef)(null);
  tracked.current === null && (tracked.current = true, trackHookMounted(instance, hookName));
}
function trackHookUsage(instance, hookName) {
  trackHookMounted(instance, hookName);
}
function useCommentActions() {
  let $ = (0, import_react_compiler_runtime2.c)(7), instance = useSanityInstance();
  trackHookUsage(instance, "useCommentActions");
  let resources = (0, import_react3.useContext)(ResourcesContext), contextResource = useEffectiveContextResource(), contextPerspective = (0, import_react3.useContext)(PerspectiveContext), t0;
  $[0] !== contextPerspective || $[1] !== contextResource || $[2] !== resources ? (t0 = (options) => normalizeResourceOptions(options, resources, contextResource, contextPerspective), $[0] = contextPerspective, $[1] = contextResource, $[2] = resources, $[3] = t0) : t0 = $[3];
  let resolve = t0, t1;
  return $[4] !== instance || $[5] !== resolve ? (t1 = {
    createComment: (options_0) => createComment(instance, resolve(options_0)),
    replyToComment: (options_1) => replyToComment(instance, resolve(options_1)),
    updateComment: (options_2) => updateComment(instance, resolve(options_2)),
    setCommentStatus: (options_3) => setCommentStatus(instance, resolve(options_3)),
    removeComment: (options_4) => removeComment(instance, resolve(options_4))
  }, $[4] = instance, $[5] = resolve, $[6] = t1) : t1 = $[6], t1;
}
function useCommentList(hookName, options, { getState, resolve }) {
  let instance = useSanityInstance();
  trackHookUsage(instance, hookName);
  let normalized = useNormalizedResourceOptions(options), [isPending, startTransition] = (0, import_react3.useTransition)(), key = getCommentsOptionsKey(normalized), [deferredKey, setDeferredKey] = (0, import_react3.useState)(key), abortRef = (0, import_react3.useRef)(new AbortController());
  (0, import_react3.useEffect)(() => {
    key !== deferredKey && startTransition(() => {
      abortRef.current.signal.aborted || (abortRef.current.abort(), abortRef.current = new AbortController()), setDeferredKey(key);
    });
  }, [deferredKey, key]);
  let deferred = (0, import_react3.useMemo)(() => parseCommentsOptionsKey(deferredKey), [deferredKey]), { getCurrent, subscribe } = (0, import_react3.useMemo)(() => getState(instance, deferred), [
    deferred,
    getState,
    instance
  ]);
  if (getCurrent() === void 0) {
    let currentSignal = abortRef.current.signal;
    throw resolve(instance, {
      ...deferred,
      signal: currentSignal
    });
  }
  return {
    value: (0, import_react3.useSyncExternalStore)(subscribe, getCurrent),
    isPending
  };
}
var SOURCE$1 = {
  getState: getCommentsState,
  resolve: resolveComments
};
function useComments(options) {
  let $ = (0, import_react_compiler_runtime2.c)(3), { value, isPending } = useCommentList("useComments", options, SOURCE$1), t0;
  return $[0] !== isPending || $[1] !== value ? (t0 = {
    comments: value,
    isPending
  }, $[0] = isPending, $[1] = value, $[2] = t0) : t0 = $[2], t0;
}
var SOURCE = {
  getState: getCommentThreadsState,
  resolve: resolveCommentThreads
};
function useCommentThreads(options) {
  let $ = (0, import_react_compiler_runtime2.c)(3), { value, isPending } = useCommentList("useCommentThreads", options, SOURCE), t0;
  return $[0] !== isPending || $[1] !== value ? (t0 = {
    threads: value,
    isPending
  }, $[0] = isPending, $[1] = value, $[2] = t0) : t0 = $[2], t0;
}
function useResource() {
  return useEffectiveContextResource();
}
function useFavoriteContext(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(6), { documentId, documentType, projectId: paramProjectId, dataset: paramDataset, resourceId: paramResourceId, resourceType, schemaName } = t0, { config } = useSanityInstance(), projectId = paramProjectId ?? config?.projectId, dataset = paramDataset ?? config?.dataset;
  if (resourceType === "studio" && (!projectId || !dataset)) throw Error("projectId and dataset are required for studio resources");
  let resourceId = resourceType === "studio" && !paramResourceId ? `${projectId}.${dataset}` : paramResourceId;
  if (!resourceId) throw Error("resourceId is required for media-library and canvas resources");
  let t1;
  return $[0] !== documentId || $[1] !== documentType || $[2] !== resourceId || $[3] !== resourceType || $[4] !== schemaName ? (t1 = {
    documentId,
    documentType,
    resourceId,
    resourceType,
    schemaName
  }, $[0] = documentId, $[1] = documentType, $[2] = resourceId, $[3] = resourceType, $[4] = schemaName, $[5] = t1) : t1 = $[5], t1;
}
var useFavoriteStatus = createFetcherHook(favorites);
function useFavorite(props) {
  let context = useFavoriteContext(props), { data } = useFavoriteStatus(context);
  return data.isFavorited;
}
function useRecordDocumentHistoryEvent(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(10), { documentId, documentType, resourceType, resourceId, schemaName } = t0, t1;
  $[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = {
    name: SDK_NODE_NAME,
    connectTo: SDK_CHANNEL_NAME
  }, $[0] = t1) : t1 = $[0];
  let { sendMessage } = useWindowConnection(t1);
  if (resourceType !== "studio" && !resourceId) throw Error("resourceId is required for media-library and canvas resources");
  let t2;
  $[1] !== documentId || $[2] !== documentType || $[3] !== resourceId || $[4] !== resourceType || $[5] !== schemaName || $[6] !== sendMessage ? (t2 = (eventType) => {
    try {
      let message = {
        type: "dashboard/v1/events/history",
        data: {
          eventType,
          document: {
            id: documentId,
            type: documentType,
            resource: {
              id: resourceId,
              type: resourceType,
              schemaName
            }
          }
        }
      };
      sendMessage(message.type, message.data);
    } catch (t32) {
      let error2 = t32;
      throw console.error("Failed to record history event:", error2), error2;
    }
  }, $[1] = documentId, $[2] = documentType, $[3] = resourceId, $[4] = resourceType, $[5] = schemaName, $[6] = sendMessage, $[7] = t2) : t2 = $[7];
  let recordEvent = t2, t3;
  return $[8] === recordEvent ? t3 = $[9] : (t3 = { recordEvent }, $[8] = recordEvent, $[9] = t3), t3;
}
var useSetFavorite = createMutationHook(setFavorite);
function useUpdateFavorite(props) {
  let $ = (0, import_react_compiler_runtime2.c)(12), context = useFavoriteContext(props), { mutate, isPending, error: error2, reset } = useSetFavorite(), t0;
  $[0] !== context || $[1] !== mutate ? (t0 = () => mutate({
    ...context,
    isFavorited: true
  }), $[0] = context, $[1] = mutate, $[2] = t0) : t0 = $[2];
  let favorite = t0, t1;
  $[3] !== context || $[4] !== mutate ? (t1 = () => mutate({
    ...context,
    isFavorited: false
  }), $[3] = context, $[4] = mutate, $[5] = t1) : t1 = $[5];
  let unfavorite = t1, t2;
  return $[6] !== error2 || $[7] !== favorite || $[8] !== isPending || $[9] !== reset || $[10] !== unfavorite ? (t2 = {
    favorite,
    unfavorite,
    isPending,
    error: error2,
    reset
  }, $[6] = error2, $[7] = favorite, $[8] = isPending, $[9] = reset, $[10] = unfavorite, $[11] = t2) : t2 = $[11], t2;
}
function useResolvedProjectId(options) {
  let $ = (0, import_react_compiler_runtime2.c)(6), t0;
  $[0] === options ? t0 = $[1] : (t0 = options ?? {}, $[0] = options, $[1] = t0);
  let { resource } = useNormalizedResourceOptions(t0), contextProjectId = (0, import_react3.useContext)(ProjectContext), t1;
  return $[2] !== contextProjectId || $[3] !== options?.projectId || $[4] !== resource ? (t1 = options?.projectId ?? contextProjectId ?? (resource && isDatasetResource(resource) ? resource.projectId : void 0), $[2] = contextProjectId, $[3] = options?.projectId, $[4] = resource, $[5] = t1) : t1 = $[5], t1;
}
var useDatasetsBase = createFetcherHook(datasets);
function useDatasets(options) {
  let $ = (0, import_react_compiler_runtime2.c)(3), projectId = useResolvedProjectId(options), t0;
  return $[0] !== options || $[1] !== projectId ? (t0 = projectId ? {
    ...options,
    projectId
  } : options, $[0] = options, $[1] = projectId, $[2] = t0) : t0 = $[2], useDatasetsBase(t0);
}
function useApplyActions() {
  let $ = (0, import_react_compiler_runtime2.c)(4), instance = useSanityInstance(), resources = (0, import_react3.useContext)(ResourcesContext), effectiveContextResource = useEffectiveContextResource(), t0;
  return $[0] !== effectiveContextResource || $[1] !== instance || $[2] !== resources ? (t0 = (actionOrActions, options) => {
    let actions = Array.isArray(actionOrActions) ? actionOrActions : [actionOrActions], optionsResource = options ? normalizeResourceOptions(options, resources, effectiveContextResource).resource : void 0, normalizedActions = actions.map((action) => normalizeResourceOptions(action, resources, effectiveContextResource)), resource;
    for (let action_0 of normalizedActions) {
      let actionResource = action_0.resource;
      if (!resource && actionResource && (resource = actionResource), !isDeepEqual(actionResource, resource)) throw Error(`Mismatched resources found in actions. All actions must belong to the same resource. Found "${JSON.stringify(actionResource)}" but expected "${JSON.stringify(resource)}".`);
    }
    if (optionsResource && resource && !isDeepEqual(optionsResource, resource)) throw Error(`Mismatched resources found in actions. Found top-level resource "${JSON.stringify(optionsResource)}" but expected resource from action handles "${JSON.stringify(resource)}".`);
    let effectiveResource = resource ?? optionsResource ?? effectiveContextResource;
    if (!effectiveResource) throw Error("No resource found. Provide a resource via the action handle or context.");
    return applyDocumentActions(instance, {
      actions: normalizedActions,
      resource: effectiveResource
    });
  }, $[0] = effectiveContextResource, $[1] = instance, $[2] = resources, $[3] = t0) : t0 = $[3], t0;
}
var useApplyDocumentActions = () => useApplyActions();
function useCreateDocument(options) {
  let $ = (0, import_react_compiler_runtime2.c)(3);
  trackHookUsage(useSanityInstance(), "useCreateDocument");
  let apply2 = useApplyDocumentActions(), t0;
  return $[0] !== apply2 || $[1] !== options ? (t0 = async (initialValue, overrides) => {
    let documentId = overrides?.documentId ?? options.documentId ?? randomUuid(), handle = {
      ...options,
      documentId
    };
    return await apply2(createDocument(handle, initialValue)), handle;
  }, $[0] = apply2, $[1] = options, $[2] = t0) : t0 = $[2], t0;
}
var useDocumentValue = createStateSourceHook({
  getState: (instance, options) => getDocumentState(instance, options),
  shouldSuspend: (instance, { path: _path, ...options }) => getDocumentState(instance, options).getCurrent() === void 0,
  suspender: (instance, options) => resolveDocument(instance, options),
  getConfig: identity
});
var wrapHookWithData = (useValue) => {
  function useHook(...params) {
    return { data: useValue(...params) };
  }
  return useHook;
};
var useDocument = wrapHookWithData((options) => {
  useTrackHookUsage("useDocument");
  let normalizedOptions = useNormalizedResourceOptions(options);
  return useDocumentValue(normalizedOptions);
});
function useDocumentEvent(options) {
  let $ = (0, import_react_compiler_runtime2.c)(10);
  useTrackHookUsage("useDocumentEvent");
  let normalizedOptions = useNormalizedResourceOptions(options), datasetHandle, onEvent;
  $[0] === normalizedOptions ? (datasetHandle = $[1], onEvent = $[2]) : ({ onEvent, ...datasetHandle } = normalizedOptions, $[0] = normalizedOptions, $[1] = datasetHandle, $[2] = onEvent);
  let ref = (0, import_react3.useRef)(onEvent), t0;
  $[3] === onEvent ? t0 = $[4] : (t0 = () => {
    ref.current = onEvent;
  }, $[3] = onEvent, $[4] = t0), (0, import_react3.useInsertionEffect)(t0);
  let t1;
  $[5] === Symbol.for("react.memo_cache_sentinel") ? (t1 = (documentEvent) => ref.current(documentEvent), $[5] = t1) : t1 = $[5];
  let stableHandler = t1, instance = useSanityInstance(), t2, t3;
  $[6] !== datasetHandle.resource || $[7] !== instance ? (t2 = () => subscribeDocumentEvents(instance, {
    eventHandler: stableHandler,
    resource: datasetHandle.resource
  }), t3 = [
    instance,
    datasetHandle.resource,
    stableHandler
  ], $[6] = datasetHandle.resource, $[7] = instance, $[8] = t2, $[9] = t3) : (t2 = $[8], t3 = $[9]), (0, import_react3.useEffect)(t2, t3);
}
var noopSubscribe = () => () => {
};
var returnUndefined = () => void 0;
function useDocumentPermissions(actionOrActions) {
  let $ = (0, import_react_compiler_runtime2.c)(13), instance = useSanityInstance();
  trackHookUsage(instance, "useDocumentPermissions");
  let effectiveContextResource = useEffectiveContextResource(), resources = (0, import_react3.useContext)(ResourcesContext), t0;
  if ($[0] !== actionOrActions || $[1] !== effectiveContextResource || $[2] !== resources) {
    bb0: {
      let normalized = Array.isArray(actionOrActions) ? actionOrActions.map((action) => normalizeResourceOptions(action, resources, effectiveContextResource)) : [normalizeResourceOptions(actionOrActions, resources, effectiveContextResource)], resource;
      for (let action_0 of normalized) if (action_0.resource && (resource ||= action_0.resource, !isDeepEqual(action_0.resource, resource))) {
        t0 = {
          actions: normalized,
          resource,
          error: Error(`Mismatched resources found in actions. All actions must belong to the same resource. Found "${JSON.stringify(action_0.resource)}" but expected "${JSON.stringify(resource)}".`)
        };
        break bb0;
      }
      let t12;
      $[4] !== normalized || $[5] !== resource ? (t12 = {
        actions: normalized,
        resource,
        error: void 0
      }, $[4] = normalized, $[5] = resource, $[6] = t12) : t12 = $[6], t0 = t12;
    }
    $[0] = actionOrActions, $[1] = effectiveContextResource, $[2] = resources, $[3] = t0;
  } else t0 = $[3];
  let { actions: normalizedActions, resource: actionResource, error: validationError } = t0, effectiveResource = actionResource ?? effectiveContextResource, t1;
  $[7] !== effectiveResource || $[8] !== normalizedActions ? (t1 = effectiveResource ? {
    resource: effectiveResource,
    actions: normalizedActions
  } : void 0, $[7] = effectiveResource, $[8] = normalizedActions, $[9] = t1) : t1 = $[9];
  let permissionsOptions = t1, t2;
  $[10] !== instance || $[11] !== permissionsOptions ? (t2 = permissionsOptions ? getPermissionsState(instance, permissionsOptions) : void 0, $[10] = instance, $[11] = permissionsOptions, $[12] = t2) : t2 = $[12];
  let stateSource = t2, isDocumentReady = () => stateSource !== void 0 && stateSource.getCurrent() !== void 0, result = (0, import_react3.useSyncExternalStore)(stateSource?.subscribe ?? noopSubscribe, stateSource?.getCurrent ?? returnUndefined);
  if (validationError) throw validationError;
  if (!effectiveResource) throw Error("No resource found. Provide a resource via the action handle or wrap with a resource context.");
  if (!isDocumentReady()) throw firstValueFrom(stateSource.observable.pipe(filter(_temp$2)));
  return result;
}
function _temp$2(permissions) {
  return permissions !== void 0;
}
var useDocumentSyncStatusValue = createStateSourceHook({
  getState: getDocumentSyncStatus,
  shouldSuspend: (instance, doc) => getDocumentSyncStatus(instance, doc).getCurrent() === void 0,
  suspender: (instance, doc) => resolveDocument(instance, doc),
  getConfig: identity
});
var useDocumentSyncStatus = (options) => {
  let normalizedOptions = useNormalizedResourceOptions(options);
  return useDocumentSyncStatusValue(normalizedOptions);
};
var ignoredKeys = [
  "_id",
  "_type",
  "_createdAt",
  "_updatedAt",
  "_rev"
];
function useEditDocument(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(8), doc, path;
  $[0] === t0 ? (doc = $[1], path = $[2]) : ({ path, ...doc } = t0, $[0] = t0, $[1] = doc, $[2] = path);
  let instance = useSanityInstance();
  trackHookUsage(instance, "useEditDocument");
  let normalizedDoc = useNormalizedResourceOptions(doc), apply2 = useApplyDocumentActions(), isDocumentReady = () => getDocumentState(instance, normalizedDoc).getCurrent() !== void 0;
  if (!isDocumentReady()) throw resolveDocument(instance, normalizedDoc);
  let t1;
  return $[3] !== apply2 || $[4] !== instance || $[5] !== normalizedDoc || $[6] !== path ? (t1 = (updater) => {
    let currentPath = path;
    if (currentPath) {
      let currentValue = getDocumentState(instance, {
        ...normalizedDoc,
        path
      }).getCurrent(), nextValue = typeof updater == "function" ? updater(currentValue) : updater;
      return apply2(editDocument(normalizedDoc, { set: { [currentPath]: nextValue } }));
    }
    let current = getDocumentState(instance, {
      ...normalizedDoc,
      path
    }).getCurrent(), nextValue_0 = typeof updater == "function" ? updater(current) : updater;
    if (typeof nextValue_0 != "object" || !nextValue_0) throw Error("No path was provided to `useEditDocument` and the value provided was not a document object.");
    let editActions = Object.keys({
      ...current,
      ...nextValue_0
    }).filter(_temp$12).filter((key_0) => current?.[key_0] !== nextValue_0[key_0]).map((key_1) => key_1 in nextValue_0 ? editDocument(normalizedDoc, { set: { [key_1]: nextValue_0[key_1] } }) : editDocument(normalizedDoc, { unset: [key_1] }));
    return apply2(editActions);
  }, $[3] = apply2, $[4] = instance, $[5] = normalizedDoc, $[6] = path, $[7] = t1) : t1 = $[7], t1;
}
function _temp$12(key) {
  return !ignoredKeys.includes(key);
}
function useQuery(options) {
  let instance = useSanityInstance();
  trackHookUsage(instance, "useQuery");
  let normalized = useNormalizedResourceOptions(options), [isPending, startTransition] = (0, import_react3.useTransition)(), queryKey = getQueryKey(instance, normalized), [deferredQueryKey, setDeferredQueryKey] = (0, import_react3.useState)(queryKey), ref = (0, import_react3.useRef)(new AbortController());
  (0, import_react3.useEffect)(() => {
    queryKey !== deferredQueryKey && startTransition(() => {
      ref && !ref.current.signal.aborted && (ref.current.abort(), ref.current = new AbortController()), setDeferredQueryKey(queryKey);
    });
  }, [deferredQueryKey, queryKey]);
  let { getCurrent, subscribe } = (0, import_react3.useMemo)(() => {
    let deferred = parseQueryKey(deferredQueryKey);
    return getQueryState(instance, deferred);
  }, [instance, deferredQueryKey]);
  if (getCurrent() === void 0) {
    let currentSignal = ref.current.signal, deferred_0 = parseQueryKey(deferredQueryKey);
    throw resolveQuery(instance, {
      ...deferred_0,
      signal: currentSignal
    });
  }
  let data = (0, import_react3.useSyncExternalStore)(subscribe, getCurrent);
  return (0, import_react3.useMemo)(() => ({
    data,
    isPending
  }), [data, isPending]);
}
function useDocuments(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(50), documentType, filter2, orderings, params, rawOptions, search, t1;
  $[0] === t0 ? (documentType = $[1], filter2 = $[2], orderings = $[3], params = $[4], rawOptions = $[5], search = $[6], t1 = $[7]) : ({ batchSize: t1, params, search, filter: filter2, orderings, documentType, ...rawOptions } = t0, $[0] = t0, $[1] = documentType, $[2] = filter2, $[3] = orderings, $[4] = params, $[5] = rawOptions, $[6] = search, $[7] = t1);
  let batchSize = t1 === void 0 ? 25 : t1;
  useTrackHookUsage("useDocuments");
  let options = useNormalizedResourceOptions(rawOptions), [limit, setLimit] = (0, import_react3.useState)(batchSize), t2;
  $[8] === documentType ? t2 = $[9] : (t2 = Array.isArray(documentType) ? documentType : [documentType], $[8] = documentType, $[9] = t2);
  let t3;
  $[10] === t2 ? t3 = $[11] : (t3 = t2.filter(_temp5), $[10] = t2, $[11] = t3);
  let documentTypes = t3, t4;
  $[12] !== batchSize || $[13] !== documentTypes || $[14] !== filter2 || $[15] !== options || $[16] !== orderings || $[17] !== params || $[18] !== search ? (t4 = JSON.stringify({
    filter: filter2,
    search,
    params,
    orderings,
    batchSize,
    types: documentTypes,
    ...options
  }), $[12] = batchSize, $[13] = documentTypes, $[14] = filter2, $[15] = options, $[16] = orderings, $[17] = params, $[18] = search, $[19] = t4) : t4 = $[19];
  let key = t4, [prevKey, setPrevKey] = (0, import_react3.useState)(key);
  prevKey !== key && (setPrevKey(key), setLimit(batchSize));
  let conditions;
  if ($[20] !== documentTypes?.length || $[21] !== filter2 || $[22] !== search) {
    conditions = [];
    let trimmedSearch = search?.trim();
    if (trimmedSearch) {
      let searchFilter = createGroqSearchFilter(trimmedSearch);
      searchFilter && conditions.push(searchFilter);
    }
    documentTypes?.length && conditions.push("(_type in $__types)"), filter2 && conditions.push(`(${filter2})`), $[20] = documentTypes?.length, $[21] = filter2, $[22] = search, $[23] = conditions;
  } else conditions = $[23];
  let filterClause = conditions.length ? `[${conditions.join(" && ")}]` : "", t5;
  $[24] === orderings ? t5 = $[25] : (t5 = orderings ? `| order(${orderings.map(_temp3).join(",")})` : "", $[24] = orderings, $[25] = t5);
  let dataQuery = `*${filterClause}${t5}[0...${limit}]{"documentId":_id,"documentType":_type,...$__handle}`, t6 = `{"count":${`count(*${filterClause})`},"data":${dataQuery}}`, t7;
  $[26] === options.resource ? t7 = $[27] : (t7 = options.resource && isDatasetResource(options.resource) ? pickProperties(options.resource, ["projectId", "dataset"]) : {}, $[26] = options.resource, $[27] = t7);
  let t8;
  $[28] === options ? t8 = $[29] : (t8 = pickProperties(options, ["perspective", "resource"]), $[28] = options, $[29] = t8);
  let t9;
  $[30] !== t7 || $[31] !== t8 ? (t9 = {
    ...t7,
    ...t8
  }, $[30] = t7, $[31] = t8, $[32] = t9) : t9 = $[32];
  let t10;
  $[33] !== documentTypes || $[34] !== params || $[35] !== t9 ? (t10 = {
    ...params,
    __handle: t9,
    __types: documentTypes
  }, $[33] = documentTypes, $[34] = params, $[35] = t9, $[36] = t10) : t10 = $[36];
  let t11;
  $[37] !== options || $[38] !== t10 || $[39] !== t6 ? (t11 = {
    ...options,
    query: t6,
    params: t10
  }, $[37] = options, $[38] = t10, $[39] = t6, $[40] = t11) : t11 = $[40];
  let { data: t12, isPending } = useQuery(t11), { count, data } = t12, hasMore = data.length < count, t13;
  $[41] !== batchSize || $[42] !== count ? (t13 = () => {
    setLimit((prev) => Math.min(prev + batchSize, count));
  }, $[41] = batchSize, $[42] = count, $[43] = t13) : t13 = $[43];
  let loadMore = t13, t14;
  return $[44] !== count || $[45] !== data || $[46] !== hasMore || $[47] !== isPending || $[48] !== loadMore ? (t14 = {
    data,
    hasMore,
    count,
    isPending,
    loadMore
  }, $[44] = count, $[45] = data, $[46] = hasMore, $[47] = isPending, $[48] = loadMore, $[49] = t14) : t14 = $[49], t14;
}
function _temp3(ordering) {
  return [ordering.field, ordering.direction.toLowerCase()].map(_temp22).filter(Boolean).join(" ");
}
function _temp22(str) {
  return str.trim();
}
function _temp5(i) {
  return typeof i == "string";
}
var useInstallation = createFetcherHook(installation);
var useInstallations = createFetcherHook(installations);
var useOrganization = createFetcherHook(organization);
var useOrganizations = createFetcherHook(organizations);
function usePaginatedDocuments({ documentType, filter: filter2 = "", pageSize = 25, params = {}, orderings, search, ...rawOptions }) {
  useTrackHookUsage("usePaginatedDocuments");
  let options = useNormalizedResourceOptions(rawOptions), [pageIndex, setPageIndex] = (0, import_react3.useState)(0), key = JSON.stringify({
    filter: filter2,
    search,
    params,
    orderings,
    pageSize,
    ...options
  }), [prevKey, setPrevKey] = (0, import_react3.useState)(key);
  prevKey !== key && (setPrevKey(key), setPageIndex(0));
  let startIndex = pageIndex * pageSize, endIndex = (pageIndex + 1) * pageSize, documentTypes = (Array.isArray(documentType) ? documentType : [documentType]).filter((i) => typeof i == "string"), filterClause = (0, import_react3.useMemo)(() => {
    let conditions = [], trimmedSearch = search?.trim();
    if (trimmedSearch) {
      let searchFilter = createGroqSearchFilter(trimmedSearch);
      searchFilter && conditions.push(searchFilter);
    }
    return documentTypes?.length && conditions.push("(_type in $__types)"), filter2 && conditions.push(`(${filter2})`), conditions.length ? `[${conditions.join(" && ")}]` : "";
  }, [
    filter2,
    search,
    documentTypes?.length
  ]), dataQuery = `*${filterClause}${orderings ? `| order(${orderings.map((ordering) => [ordering.field, ordering.direction.toLowerCase()].map((str) => str.trim()).filter(Boolean).join(" ")).join(",")})` : ""}[${startIndex}...${endIndex}]{"documentId":_id,"documentType":_type,...$__handle}`, countQuery = `count(*${filterClause})`, { data: { data, count }, isPending } = useQuery({
    ...options,
    query: `{"data":${dataQuery},"count":${countQuery}}`,
    params: {
      ...params,
      __types: documentTypes,
      __handle: {
        ...options.resource && isDatasetResource(options.resource) ? pickProperties(options.resource, ["projectId", "dataset"]) : {},
        ...pickProperties(options, ["perspective", "resource"])
      }
    }
  }), totalPages = Math.ceil(count / pageSize), currentPage = pageIndex + 1, firstPage = (0, import_react3.useCallback)(() => setPageIndex(0), []), previousPage = (0, import_react3.useCallback)(() => setPageIndex((prev) => Math.max(prev - 1, 0)), []), nextPage = (0, import_react3.useCallback)(() => setPageIndex((prev_0) => Math.min(prev_0 + 1, totalPages - 1)), [totalPages]), lastPage = (0, import_react3.useCallback)(() => setPageIndex(totalPages - 1), [totalPages]), goToPage = (0, import_react3.useCallback)((pageNumber) => {
    pageNumber < 1 || pageNumber > totalPages || setPageIndex(pageNumber - 1);
  }, [totalPages]);
  return {
    data,
    isPending,
    pageSize,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    count,
    firstPage,
    hasFirstPage: pageIndex > 0,
    previousPage,
    hasPreviousPage: pageIndex > 0,
    nextPage,
    hasNextPage: pageIndex < totalPages - 1,
    lastPage,
    hasLastPage: pageIndex < totalPages - 1,
    goToPage
  };
}
function usePresence(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(14), t1;
  $[0] === t0 ? t1 = $[1] : (t1 = t0 === void 0 ? {} : t0, $[0] = t0, $[1] = t1);
  let normalizedOptions = useNormalizedResourceOptions(t1);
  if (normalizedOptions.resource && isMediaLibraryResource(normalizedOptions.resource)) throw Error("usePresence() does not support media library resources. Presence tracking requires a canvas or dataset resource.");
  let sanityInstance = useSanityInstance();
  trackHookUsage(sanityInstance, "usePresence");
  let t2;
  $[2] !== normalizedOptions || $[3] !== sanityInstance ? (t2 = getPresence(sanityInstance, normalizedOptions), $[2] = normalizedOptions, $[3] = sanityInstance, $[4] = t2) : t2 = $[4];
  let source = t2, t3;
  $[5] === source ? t3 = $[6] : (t3 = (callback) => source.subscribe(callback), $[5] = source, $[6] = t3);
  let subscribe = t3, t4, t5;
  $[7] === source ? (t4 = $[8], t5 = $[9]) : (t4 = () => source.getCurrent(), t5 = () => source.getCurrent(), $[7] = source, $[8] = t4, $[9] = t5);
  let locations = (0, import_react3.useSyncExternalStore)(subscribe, t4, t5), t6;
  $[10] === locations ? t6 = $[11] : (t6 = locations || [], $[10] = locations, $[11] = t6);
  let t7;
  return $[12] === t6 ? t7 = $[13] : (t7 = { locations: t6 }, $[12] = t6, $[13] = t7), t7;
}
function usePresenceForDocument(options) {
  let $ = (0, import_react_compiler_runtime2.c)(23), excludeVersions, handle, path;
  $[0] === options ? (excludeVersions = $[1], handle = $[2], path = $[3]) : ({ path, excludeVersions, ...handle } = options, $[0] = options, $[1] = excludeVersions, $[2] = handle, $[3] = path);
  let normalizedOptions = useNormalizedResourceOptions(handle);
  if (normalizedOptions.resource && isMediaLibraryResource(normalizedOptions.resource)) throw Error("usePresenceForDocument() does not support media library resources. Presence tracking requires a canvas or dataset resource.");
  let sanityInstance = useSanityInstance();
  trackHookUsage(sanityInstance, "usePresenceForDocument");
  let { resource, perspective } = normalizedOptions, { documentId, liveEdit } = options, t0;
  $[4] === path ? t0 = $[5] : (t0 = JSON.stringify(path ?? null), $[4] = path, $[5] = t0);
  let pathKey = t0, t1;
  $[6] !== documentId || $[7] !== excludeVersions || $[8] !== liveEdit || $[9] !== pathKey || $[10] !== perspective || $[11] !== resource || $[12] !== sanityInstance ? (t1 = getDocumentPresence(sanityInstance, {
    ...resource ? { resource } : {},
    documentId,
    ...perspective ? { perspective } : {},
    ...liveEdit ? { liveEdit } : {},
    ...pathKey === "null" ? {} : { path: JSON.parse(pathKey) },
    ...excludeVersions === void 0 ? {} : { excludeVersions }
  }), $[6] = documentId, $[7] = excludeVersions, $[8] = liveEdit, $[9] = pathKey, $[10] = perspective, $[11] = resource, $[12] = sanityInstance, $[13] = t1) : t1 = $[13];
  let source = t1, t2;
  $[14] === source ? t2 = $[15] : (t2 = (callback) => source.subscribe(callback), $[14] = source, $[15] = t2);
  let subscribe = t2, t3, t4;
  $[16] === source ? (t3 = $[17], t4 = $[18]) : (t3 = () => source.getCurrent(), t4 = () => source.getCurrent(), $[16] = source, $[17] = t3, $[18] = t4);
  let presence = (0, import_react3.useSyncExternalStore)(subscribe, t3, t4), t5;
  $[19] === presence ? t5 = $[20] : (t5 = presence || [], $[19] = presence, $[20] = t5);
  let t6;
  return $[21] === t5 ? t6 = $[22] : (t6 = { presence: t5 }, $[21] = t5, $[22] = t6), t6;
}
function useReportPresence(options) {
  let $ = (0, import_react_compiler_runtime2.c)(37), handle, path, selection, throttleMs;
  $[0] === options ? (handle = $[1], path = $[2], selection = $[3], throttleMs = $[4]) : ({ path, selection, throttleMs, ...handle } = options, $[0] = options, $[1] = handle, $[2] = path, $[3] = selection, $[4] = throttleMs);
  let normalizedOptions = useNormalizedResourceOptions(handle);
  if (normalizedOptions.resource && isMediaLibraryResource(normalizedOptions.resource)) throw Error("useReportPresence() does not support media library resources. Presence tracking requires a canvas or dataset resource.");
  let sanityInstance = useSanityInstance();
  trackHookUsage(sanityInstance, "useReportPresence");
  let { resource, perspective } = normalizedOptions, { documentId, liveEdit } = options, interval = throttleMs ?? (selection ? 250 : 1e3), t0;
  $[5] !== documentId || $[6] !== liveEdit || $[7] !== path || $[8] !== perspective || $[9] !== selection ? (t0 = JSON.stringify([
    documentId,
    path ?? [],
    selection ?? null,
    perspective ?? null,
    liveEdit
  ]), $[5] = documentId, $[6] = liveEdit, $[7] = path, $[8] = perspective, $[9] = selection, $[10] = t0) : t0 = $[10];
  let locationKey2 = t0, t1;
  $[11] === locationKey2 ? t1 = $[12] : (t1 = JSON.parse(locationKey2), $[11] = locationKey2, $[12] = t1);
  let [id2, parsedPath, parsedSelection, parsedPerspective, parsedLiveEdit] = t1, t2;
  $[13] === parsedPerspective ? t2 = $[14] : (t2 = parsedPerspective ? { perspective: parsedPerspective } : {}, $[13] = parsedPerspective, $[14] = t2);
  let t3;
  $[15] === parsedLiveEdit ? t3 = $[16] : (t3 = parsedLiveEdit ? { liveEdit: parsedLiveEdit } : {}, $[15] = parsedLiveEdit, $[16] = t3);
  let t4;
  $[17] === parsedPath ? t4 = $[18] : (t4 = parsedPath.length > 0 ? { path: parsedPath } : {}, $[17] = parsedPath, $[18] = t4);
  let t5;
  $[19] === parsedSelection ? t5 = $[20] : (t5 = parsedSelection ? { selection: parsedSelection } : {}, $[19] = parsedSelection, $[20] = t5);
  let t6;
  $[21] !== id2 || $[22] !== t2 || $[23] !== t3 || $[24] !== t4 || $[25] !== t5 ? (t6 = {
    documentId: id2,
    ...t2,
    ...t3,
    ...t4,
    ...t5
  }, $[21] = id2, $[22] = t2, $[23] = t3, $[24] = t4, $[25] = t5, $[26] = t6) : t6 = $[26];
  let location2 = t6, lastSentAt = (0, import_react3.useRef)(0), pending = (0, import_react3.useRef)(void 0), t7, t8;
  $[27] !== interval || $[28] !== location2 || $[29] !== resource || $[30] !== sanityInstance ? (t7 = () => {
    let send = () => {
      lastSentAt.current = Date.now(), reportPresence(sanityInstance, {
        ...resource ? { resource } : {},
        locations: [location2]
      });
    }, elapsed = Date.now() - lastSentAt.current;
    return elapsed >= interval ? send() : (clearTimeout(pending.current), pending.current = setTimeout(send, interval - elapsed)), () => clearTimeout(pending.current);
  }, t8 = [
    location2,
    interval,
    sanityInstance,
    resource
  ], $[27] = interval, $[28] = location2, $[29] = resource, $[30] = sanityInstance, $[31] = t7, $[32] = t8) : (t7 = $[31], t8 = $[32]), (0, import_react3.useEffect)(t7, t8);
  let t10, t9;
  $[33] !== resource || $[34] !== sanityInstance ? (t9 = () => () => {
    reportPresence(sanityInstance, {
      ...resource ? { resource } : {},
      locations: []
    });
  }, t10 = [sanityInstance, resource], $[33] = resource, $[34] = sanityInstance, $[35] = t10, $[36] = t9) : (t10 = $[35], t9 = $[36]), (0, import_react3.useEffect)(t9, t10);
}
function useDocumentProjection(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(13), docHandle, projection, ref;
  $[0] === t0 ? (docHandle = $[1], projection = $[2], ref = $[3]) : ({ ref, projection, ...docHandle } = t0, $[0] = t0, $[1] = docHandle, $[2] = projection, $[3] = ref);
  let instance = useSanityInstance();
  trackHookUsage(instance, "useDocumentProjection");
  let t1;
  $[4] === projection ? t1 = $[5] : (t1 = projection.trim(), $[4] = projection, $[5] = t1);
  let normalizedProjection = t1, normalizedDocHandle = useNormalizedResourceOptions(docHandle), t2;
  $[6] !== instance || $[7] !== normalizedDocHandle || $[8] !== normalizedProjection ? (t2 = getProjectionState(instance, {
    ...normalizedDocHandle,
    projection: normalizedProjection
  }), $[6] = instance, $[7] = normalizedDocHandle, $[8] = normalizedProjection, $[9] = t2) : t2 = $[9];
  let stateSource = t2;
  if (stateSource.getCurrent()?.data === null) throw resolveProjection(instance, {
    ...normalizedDocHandle,
    projection: normalizedProjection
  });
  let t3;
  return $[10] !== ref || $[11] !== stateSource ? (t3 = (onStoreChanged) => {
    let subscription = new Observable((observer) => {
      if (typeof IntersectionObserver > "u" || typeof HTMLElement > "u") {
        observer.next(true);
        return;
      }
      let intersectionObserver = new IntersectionObserver((t4) => {
        let [entry] = t4;
        return observer.next(entry.isIntersecting);
      }, {
        rootMargin: "0px",
        threshold: 0
      });
      return ref?.current && ref.current instanceof HTMLElement ? intersectionObserver.observe(ref.current) : observer.next(true), () => intersectionObserver.disconnect();
    }).pipe(startWith(false), distinctUntilChanged(), switchMap((isVisible) => isVisible ? new Observable((obs) => (obs.next(), stateSource.subscribe(() => obs.next()))) : EMPTY)).subscribe({ next: onStoreChanged });
    return () => subscription.unsubscribe();
  }, $[10] = ref, $[11] = stateSource, $[12] = t3) : t3 = $[12], (0, import_react3.useSyncExternalStore)(t3, stateSource.getCurrent);
}
function useDocumentPreview(t0) {
  let $ = (0, import_react_compiler_runtime2.c)(13), docHandle, ref;
  $[0] === t0 ? (docHandle = $[1], ref = $[2]) : ({ ref, ...docHandle } = t0, $[0] = t0, $[1] = docHandle, $[2] = ref);
  let instance = useSanityInstance();
  trackHookUsage(instance, "useDocumentPreview");
  let normalizedDocHandle = useNormalizedResourceOptions(docHandle), t1;
  $[3] !== normalizedDocHandle || $[4] !== ref ? (t1 = {
    ...normalizedDocHandle,
    projection: PREVIEW_PROJECTION,
    ref
  }, $[3] = normalizedDocHandle, $[4] = ref, $[5] = t1) : t1 = $[5];
  let projectionResult = useDocumentProjection(t1), t2;
  $[6] !== instance || $[7] !== normalizedDocHandle.resource || $[8] !== projectionResult.data ? (t2 = transformProjectionToPreview(instance, projectionResult.data, normalizedDocHandle.resource), $[6] = instance, $[7] = normalizedDocHandle.resource, $[8] = projectionResult.data, $[9] = t2) : t2 = $[9];
  let previewValue = t2, t3;
  return $[10] !== previewValue || $[11] !== projectionResult.isPending ? (t3 = {
    data: previewValue,
    isPending: projectionResult.isPending
  }, $[10] = previewValue, $[11] = projectionResult.isPending, $[12] = t3) : t3 = $[12], t3;
}
var useProjectBase = createFetcherHook(project);
var useProject = ((options) => {
  let projectId = useResolvedProjectId(options);
  return useProjectBase(projectId ? {
    ...options,
    projectId
  } : options);
});
var useProjects = createFetcherHook(projects);
var useActiveReleasesValue = createStateSourceHook({
  getState: getActiveReleasesState,
  shouldSuspend: (instance, options) => getActiveReleasesState(instance, options ?? {}).getCurrent() === void 0,
  suspender: (instance, options) => firstValueFrom(getActiveReleasesState(instance, options ?? {}).observable.pipe(filter(Boolean)))
});
function useActiveReleases(options) {
  let $ = (0, import_react_compiler_runtime2.c)(2), t0;
  $[0] === options ? t0 = $[1] : (t0 = options ?? {}, $[0] = options, $[1] = t0);
  let normalizedOptions = useNormalizedResourceOptions(t0);
  return useActiveReleasesValue(normalizedOptions);
}
var useAllReleasesValue = createStateSourceHook({
  getState: getAllReleasesState,
  shouldSuspend: (instance, options) => getAllReleasesState(instance, options ?? {}).getCurrent() === void 0,
  suspender: (instance, options) => firstValueFrom(getAllReleasesState(instance, options ?? {}).observable.pipe(filter(Boolean)))
});
function useAllReleases(options) {
  let $ = (0, import_react_compiler_runtime2.c)(2), t0;
  $[0] === options ? t0 = $[1] : (t0 = options ?? {}, $[0] = options, $[1] = t0);
  let normalizedOptions = useNormalizedResourceOptions(t0);
  return useAllReleasesValue(normalizedOptions);
}
var useApplyReleaseActions = () => useApplyActions();
var usePerspectiveValue = createStateSourceHook({
  getState: getPerspectiveState,
  shouldSuspend: (instance, options) => getPerspectiveState(instance, options).getCurrent() === void 0,
  suspender: (instance, _options) => firstValueFrom(getPerspectiveState(instance, _options ?? {}).observable.pipe(filter(Boolean)))
});
function usePerspective(perspectiveHandle) {
  let $ = (0, import_react_compiler_runtime2.c)(2), t0;
  $[0] === perspectiveHandle ? t0 = $[1] : (t0 = perspectiveHandle ?? {}, $[0] = perspectiveHandle, $[1] = t0);
  let normalizedOptions = useNormalizedResourceOptions(t0);
  return usePerspectiveValue(normalizedOptions);
}
function useUser(options) {
  let $ = (0, import_react_compiler_runtime2.c)(17), instance = useSanityInstance();
  trackHookUsage(instance, "useUser");
  let [isPending, startTransition] = (0, import_react3.useTransition)(), t0;
  $[0] !== instance || $[1] !== options ? (t0 = getUsersKey(instance, options), $[0] = instance, $[1] = options, $[2] = t0) : t0 = $[2];
  let key = t0, [deferredKey, setDeferredKey] = (0, import_react3.useState)(key), t1;
  $[3] === deferredKey ? t1 = $[4] : (t1 = parseUsersKey(deferredKey), $[3] = deferredKey, $[4] = t1);
  let deferred = t1, t2;
  $[5] === Symbol.for("react.memo_cache_sentinel") ? (t2 = new AbortController(), $[5] = t2) : t2 = $[5];
  let [ref, setRef] = (0, import_react3.useState)(t2), t3, t4;
  $[6] !== deferredKey || $[7] !== key || $[8] !== ref ? (t3 = () => {
    key !== deferredKey && startTransition(() => {
      ref.signal.aborted || (ref.abort(), setRef(new AbortController())), setDeferredKey(key);
    });
  }, t4 = [
    deferredKey,
    key,
    ref
  ], $[6] = deferredKey, $[7] = key, $[8] = ref, $[9] = t3, $[10] = t4) : (t3 = $[9], t4 = $[10]), (0, import_react3.useEffect)(t3, t4);
  let t5 = deferred, t6;
  $[11] !== instance || $[12] !== t5 ? (t6 = getUsersState(instance, t5), $[11] = instance, $[12] = t5, $[13] = t6) : t6 = $[13];
  let { getCurrent, subscribe } = t6;
  if (getCurrent() === void 0) throw resolveUsers(instance, {
    ...deferred,
    signal: ref.signal
  });
  let data = (0, import_react3.useSyncExternalStore)(subscribe, getCurrent)?.data[0], t7;
  return $[14] !== data || $[15] !== isPending ? (t7 = {
    data,
    isPending
  }, $[14] = data, $[15] = isPending, $[16] = t7) : t7 = $[16], t7;
}
function withResolvedProjectId(options, projectId) {
  return projectId ? options ? options.resourceType === "organization" || options.organizationId || options.projectId ? options : {
    ...options,
    projectId
  } : { projectId } : options;
}
function useUsers(options) {
  let $ = (0, import_react_compiler_runtime2.c)(25), instance = useSanityInstance();
  trackHookUsage(instance, "useUsers");
  let [isPending, startTransition] = (0, import_react3.useTransition)(), resolvedProjectId = useResolvedProjectId(options), t0;
  $[0] !== options || $[1] !== resolvedProjectId ? (t0 = withResolvedProjectId(options, resolvedProjectId), $[0] = options, $[1] = resolvedProjectId, $[2] = t0) : t0 = $[2];
  let effectiveOptions = t0, t1;
  $[3] !== effectiveOptions || $[4] !== instance ? (t1 = getUsersKey(instance, effectiveOptions), $[3] = effectiveOptions, $[4] = instance, $[5] = t1) : t1 = $[5];
  let key = t1, [deferredKey, setDeferredKey] = (0, import_react3.useState)(key), t2;
  $[6] === deferredKey ? t2 = $[7] : (t2 = parseUsersKey(deferredKey), $[6] = deferredKey, $[7] = t2);
  let deferred = t2, t3;
  $[8] === Symbol.for("react.memo_cache_sentinel") ? (t3 = new AbortController(), $[8] = t3) : t3 = $[8];
  let [ref, setRef] = (0, import_react3.useState)(t3), t4, t5;
  $[9] !== deferredKey || $[10] !== key || $[11] !== ref ? (t4 = () => {
    key !== deferredKey && startTransition(() => {
      ref.signal.aborted || (ref.abort(), setRef(new AbortController())), setDeferredKey(key);
    });
  }, t5 = [
    deferredKey,
    key,
    ref
  ], $[9] = deferredKey, $[10] = key, $[11] = ref, $[12] = t4, $[13] = t5) : (t4 = $[12], t5 = $[13]), (0, import_react3.useEffect)(t4, t5);
  let t6;
  $[14] !== deferred || $[15] !== instance ? (t6 = getUsersState(instance, deferred), $[14] = deferred, $[15] = instance, $[16] = t6) : t6 = $[16];
  let { getCurrent, subscribe } = t6;
  if (getCurrent() === void 0) throw resolveUsers(instance, {
    ...deferred,
    signal: ref.signal
  });
  let { data, hasMore } = (0, import_react3.useSyncExternalStore)(subscribe, getCurrent), t7;
  $[17] !== effectiveOptions || $[18] !== instance ? (t7 = () => {
    loadMoreUsers(instance, effectiveOptions);
  }, $[17] = effectiveOptions, $[18] = instance, $[19] = t7) : t7 = $[19];
  let loadMore = t7, t8;
  return $[20] !== data || $[21] !== hasMore || $[22] !== isPending || $[23] !== loadMore ? (t8 = {
    data,
    hasMore,
    isPending,
    loadMore
  }, $[20] = data, $[21] = hasMore, $[22] = isPending, $[23] = loadMore, $[24] = t8) : t8 = $[24], t8;
}
var version = "3.3.0";
function getEnv2(key) {
  if (import.meta.env) return import.meta.env[key];
  if (typeof process < "u" && process.env) return process.env[key];
  if (typeof window < "u" && window.ENV) return window.ENV?.[key];
}
var REACT_SDK_VERSION = getEnv2("PKG_VERSION") || `${version}-development`;
export {
  AuthBoundary,
  AuthStateType,
  CORE_SDK_VERSION,
  ComlinkTokenRefreshProvider,
  REACT_SDK_VERSION,
  ResourceProvider,
  SDKProvider,
  SDKStudioContext,
  SanityApp,
  SanityInstanceProvider,
  application,
  applications,
  applyDocumentActions,
  archiveRelease,
  checkPermissions,
  configureLogging2 as configureLogging,
  createComment,
  createDatasetHandle,
  createDocument,
  createDocumentHandle,
  createDocumentTypeHandle,
  createProjectHandle,
  createRelease,
  createSanityInstance,
  datasets,
  defineProjection,
  deleteApplication,
  deleteDocument,
  deleteRelease,
  discardDocument,
  editDocument,
  editRelease,
  favorites,
  getActiveReleasesState,
  getAllReleasesState,
  getAuthState,
  getClient,
  getClientState,
  getCommentThreadsState,
  getCommentsState,
  getCorsErrorProjectId,
  getCurrentUserState,
  getDashboardOrganizationId,
  getDocumentPresence,
  getDocumentState,
  getDocumentSyncStatus,
  getIndexForKey,
  getIsInDashboardState,
  getLoginUrlState,
  getOAuthTokensState,
  getPathDepth,
  getPermissionsState,
  getPerspectiveState,
  getPresence,
  getProjectionState,
  getQueryState,
  getReleaseDocumentId,
  getTokenState,
  getUserState,
  getUsersState,
  handleAuthCallback,
  handleOAuthCallback,
  installation,
  installations,
  isCanvasResource,
  isDatasetResource,
  isImportError,
  isMediaLibraryResource,
  joinPaths,
  jsonMatch,
  loadMoreUsers,
  logout,
  observeOrganizationVerificationState,
  organization,
  organizations,
  patchOperations,
  processMutations,
  project,
  projects,
  publishDocument,
  publishRelease,
  refreshOAuthTokens,
  removeComment,
  renderSanityApp,
  replyToComment,
  reportPresence,
  resolveCommentThreads,
  resolveComments,
  resolveDocument,
  resolvePermissions,
  resolveProjection,
  resolveQuery,
  resolveUser,
  resolveUsers,
  revokeOAuthTokens,
  scheduleRelease,
  setAuthToken,
  setCommentStatus,
  setFavorite,
  slicePath,
  startOAuthAuthorization,
  stringifyPath,
  subscribeDocumentEvents,
  unarchiveRelease,
  unpublishDocument,
  unscheduleRelease,
  updateApplication,
  updateComment,
  useActiveReleases,
  useAgentGenerate,
  useAgentPatch,
  useAgentPrompt,
  useAgentTransform,
  useAgentTranslate,
  useAllReleases,
  useApplication,
  useApplications,
  useApplyDocumentActions,
  useApplyReleaseActions,
  useAuthState,
  useAuthToken,
  useCheckPermissions,
  useClient,
  useCommentActions,
  useCommentThreads,
  useComments,
  useCreateDocument,
  useCurrentUser,
  useDatasets,
  useDeleteApplication,
  useDocument,
  useDocumentEvent,
  useDocumentPermissions,
  useDocumentPreview,
  useDocumentProjection,
  useDocumentSyncStatus,
  useDocuments,
  useEditDocument,
  useFavorite,
  useFrameConnection,
  useHandleAuthCallback,
  useInstallation,
  useInstallations,
  useLogOut,
  useLoginUrl,
  useOrganization,
  useOrganizations,
  usePaginatedDocuments,
  usePerspective,
  usePresence,
  usePresenceForDocument,
  useProject,
  useProjects,
  useQuery,
  useRecordDocumentHistoryEvent,
  useReportPresence,
  useResource,
  useSanityInstance,
  useStudioWorkspacesByProjectIdDataset,
  useUpdateApplication,
  useUpdateFavorite,
  useUser,
  useUsers,
  useVerifyOrgProjects,
  useWindowConnection
};
//# sourceMappingURL=@sanity_sdk-react.js.map
