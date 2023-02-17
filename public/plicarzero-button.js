"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          }),
    _typeof(obj)
  );
}

function _regeneratorRuntime() {
  "use strict";
  _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return (obj[key] = value);
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return (
      (generator._invoke = (function (innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg; ; ) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method) context.sent = context._sent = context.arg;
            else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw ((state = "completed"), context.arg);
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (((state = context.done ? "completed" : "suspendedYield"), record.arg === ContinueSentinel)) continue;
              return { value: record.arg, done: context.done };
            }
            "throw" === record.type && ((state = "completed"), (context.method = "throw"), (context.arg = record.arg));
          }
        };
      })(innerFn, self, context)),
      generator
    );
  }
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype));
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await")
          ? PromiseImpl.resolve(value.__await).then(
              function (value) {
                invoke("next", value, resolve, reject);
              },
              function (err) {
                invoke("throw", err, resolve, reject);
              }
            )
          : PromiseImpl.resolve(value).then(
              function (unwrapped) {
                (result.value = unwrapped), resolve(result);
              },
              function (error) {
                return invoke("throw", error, resolve, reject);
              }
            );
      }
      reject(record.arg);
    }
    var previousPromise;
    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return (previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg());
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (((context.delegate = null), "throw" === context.method)) {
        if (delegate.iterator["return"] && ((context.method = "return"), (context.arg = undefined), maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        (context.method = "throw"), (context.arg = new TypeError("The iterator does not provide a 'throw' method"));
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return (context.method = "throw"), (context.arg = record.arg), (context.delegate = null), ContinueSentinel;
    var info = record.arg;
    return info
      ? info.done
        ? ((context[delegate.resultName] = info.value),
          (context.next = delegate.nextLoc),
          "return" !== context.method && ((context.method = "next"), (context.arg = undefined)),
          (context.delegate = null),
          ContinueSentinel)
        : info
      : ((context.method = "throw"), (context.arg = new TypeError("iterator result is not an object")), (context.delegate = null), ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    (record.type = "normal"), delete record.arg, (entry.completion = record);
  }
  function Context(tryLocsList) {
    (this.tryEntries = [{ tryLoc: "root" }]), tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length; ) {
              if (hasOwn.call(iterable, i)) return (next.value = iterable[i]), (next.done = !1), next;
            }
            return (next.value = undefined), (next.done = !0), next;
          };
        return (next.next = next);
      }
    }
    return { next: doneResult };
  }
  function doneResult() {
    return { value: undefined, done: !0 };
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    define(Gp, "constructor", GeneratorFunctionPrototype),
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction),
    (GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction")),
    (exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }),
    (exports.mark = function (genFun) {
      return (
        Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : ((genFun.__proto__ = GeneratorFunctionPrototype), define(genFun, toStringTagSymbol, "GeneratorFunction")),
        (genFun.prototype = Object.create(Gp)),
        genFun
      );
    }),
    (exports.awrap = function (arg) {
      return { __await: arg };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }),
    (exports.AsyncIterator = AsyncIterator),
    (exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn)
        ? iter
        : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
    }),
    defineIteratorMethods(Gp),
    define(Gp, toStringTagSymbol, "Generator"),
    define(Gp, iteratorSymbol, function () {
      return this;
    }),
    define(Gp, "toString", function () {
      return "[object Generator]";
    }),
    (exports.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      return (
        keys.reverse(),
        function next() {
          for (; keys.length; ) {
            var key = keys.pop();
            if (key in object) return (next.value = key), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (exports.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = undefined),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = undefined),
          this.tryEntries.forEach(resetTryEntry),
          !skipTempReset)
        )
          for (var name in this) {
            "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
          }
      },
      stop: function stop() {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return (record.type = "throw"), (record.arg = exception), (context.next = loc), caught && ((context.method = "next"), (context.arg = undefined)), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return (record.type = type), (record.arg = arg), finallyEntry ? ((this.method = "next"), (this.next = finallyEntry.finallyLoc), ContinueSentinel) : this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return (
          "break" === record.type || "continue" === record.type
            ? (this.next = record.arg)
            : "return" === record.type
            ? ((this.rval = this.arg = record.arg), (this.method = "return"), (this.next = "end"))
            : "normal" === record.type && afterLoc && (this.next = afterLoc),
          ContinueSentinel
        );
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return (this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }), "next" === this.method && (this.arg = undefined), ContinueSentinel;
      },
    }),
    exports
  );
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
  return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

var plicarButtonTemplate = document.createElement("template");

var createPlicarButtonInnerHTMLSVG = function createPlicarButtonInnerHTMLSVG(buttonSVG) {
  return '\n  <style>\n  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css");\n\n  button{background:none;color:inherit;border:none;padding:0;font:inherit;cursor:pointer;outline:inherit;}\n  .plicarzero-button-container {\n    position: relative;\n    width: fit-content;\n    display: inline-block;\n  }\n\n  .plicarzero-button{\n    box-sizing:border-box;\n    border-radius:8px;\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap:8px;\n\n    font-family: Pretendard, Apple SD Gothic Neo;\n    font-style: normal;\n    font-weight:600;\n    font-size:14px;\n    text-align:center;\n    letter-spacing:0.1px;\n  }\n\n  .tooltip {\n    font-family: Pretendard, Apple SD Gothic Neo;\n    font-style: normal;\n    color: #FFFFFF;\n    position: absolute;\n    text-align: center;\n    bottom: -43px;\n    width: 196px;\n    height: 38px;\n    line-height: 38px;\n    background: #252626;\n    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);\n    border-radius: 8px;\n    font-weight: 600;\n    font-size: 12px;\n    transition: visibility 150ms linear, opacity 150ms linear;\n\n    visibility: hidden;\n    opacity: 0;\n  }\n\n  .disabled {\n    cursor: auto;\n  }\n\n  .primary {background:#6073FF;color:#FFFFFF;}\n  .secondary {background:#F2F4FC;color:#6073FF;box-shadow: 0px 8px 16px rgba(96, 115, 255, 0.16);-webkit-box-shadow: 0px 8px 16px rgba(96, 115, 255, 0.16);}\n  .tertiary {-webkit-box-shadow:0px 0px 0px 1px #C7C8CC;box-shadow:0px 0px 0px 1px #C7C8CC;color:#0C0D0D;}\n\n  .primary.disabled {\n    background:rgba(150, 150, 153, 0.4);\n    color:#FFFFFF;\n  }\n  .secondary.disabled {\n    background: #F2F4FC;\n    -webkit-box-shadow: 0px 8px 16px rgba(96, 115, 255, 0.16);\n    box-shadow: 0px 8px 16px rgba(96, 115, 255, 0.16);\n    color: rgba(37, 38, 38, 0.4);\n  }\n  .tertiary.disabled {\n    -webkit-box-shadow:0px 0px 0px 1px rgba(199, 200, 204, 0.4);;\n    box-shadow:0px 0px 0px 1px rgba(199, 200, 204, 0.4);;;\n    color: rgba(37, 38, 38, 0.4);\n  }\n  </style>\n      <div class="plicarzero-button-container">\n        <button class="plicarzero-button">\n          '.concat(
    buttonSVG,
    "\n        </button>\n        </div>\n"
  );
};

var plicarButtonSVGs = {
  primary: {
    enable:
      '<svg width="167" height="42" viewBox="0 0 167 42" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <title>PlicAR AR run button</title>\n    <rect width="167" height="42" rx="8" fill="#6073FF"/>\n    <path d="M26.4809 26L27.3012 23.5527H31.0268L31.8539 26H33.7543L30.2543 16.1016H28.0668L24.5805 26H26.4809ZM27.7797 22.1172L29.1195 18.125H29.2016L30.5482 22.1172H27.7797ZM35.0301 26H36.8074V22.377H38.6668L40.6082 26H42.5906L40.451 22.0762C41.6131 21.6045 42.2283 20.6064 42.2352 19.2598C42.2283 17.373 41.0184 16.1016 38.7488 16.1016H35.0301V26ZM36.8074 20.8867V17.5918H38.4754C39.8152 17.5918 40.4168 18.207 40.4168 19.2598C40.4168 20.3193 39.8152 20.8936 38.4754 20.8867H36.8074ZM54.6535 24.5234H49.7316V22.5137H53.6008V21.2695H46.218V19.6699H53.3137V15.7051H44.673V16.9355H51.8098V18.4668H44.7004V22.5137H48.2277V24.5234H43.3605V25.7812H54.6535V24.5234ZM63.3574 16.8262V15.5137H61.8398V16.6895C61.833 18.4531 60.835 20.1006 58.8457 20.791L59.666 21.9805C61.0879 21.4814 62.0859 20.4492 62.6191 19.1367C63.1592 20.2852 64.1162 21.1875 65.4492 21.6387L66.2695 20.4492C64.3623 19.8477 63.3574 18.3779 63.3574 16.8262ZM60.5273 24.8516C60.5273 26.3486 62.1338 27.2031 64.7109 27.2031C67.2676 27.2031 68.8467 26.3486 68.8535 24.8516C68.8467 23.3887 67.2676 22.5205 64.7109 22.5273C62.1338 22.5205 60.5273 23.3887 60.5273 24.8516ZM62.0449 24.8516C62.0449 24.127 63.0156 23.7168 64.7109 23.7168C66.3994 23.7168 67.3496 24.127 67.3496 24.8516C67.3496 25.6172 66.3994 26 64.7109 26C63.0156 26 62.0449 25.6172 62.0449 24.8516ZM67.2129 22.2539H68.7305V19.123H70.4531V17.8652H68.7305V14.8574H67.2129V22.2539ZM82.4477 20.709H71.182V21.9258H76.0492V23.1152H72.5082V27.0664H81.0805V23.1152H77.5531V21.9258H82.4477V20.709ZM72.1937 16.4434H73.8891V18.5625H72.2621V19.793H81.3402V18.5625H79.7133V16.4434H81.4086V15.2266H72.1937V16.4434ZM74.0121 25.8359V24.291H79.6039V25.8359H74.0121ZM75.4066 18.5625V16.4434H78.182V18.5625H75.4066ZM98.0969 24.4824H93.175V22.0762H96.8117V15.6777H95.2941V17.7012H89.5656V15.6777H88.048V22.0762H91.6711V24.4824H86.8039V25.7266H98.0969V24.4824ZM89.5656 20.8457V18.918H95.2941V20.8457H89.5656ZM109.326 14.8574H107.795V27.2168H109.326V14.8574ZM99.0855 23.8125L99.8785 25.0293C104.206 22.9717 105.634 19.8477 105.634 16.1699H99.7145V17.373H104.089C103.816 20.1826 102.326 22.2744 99.0855 23.8125Z" fill="white"/>\n    <g clip-path="url(#clip0_2184_24107)">\n    <path d="M119.01 33.3988V27.4923H121.453C121.696 27.4892 121.937 27.5447 122.154 27.654C122.364 27.7587 122.551 27.9033 122.706 28.0796C122.862 28.2543 122.985 28.4553 123.07 28.6732C123.153 28.8882 123.197 29.1169 123.197 29.3477C123.198 29.587 123.157 29.8247 123.076 30.0498C123.001 30.2689 122.884 30.4712 122.732 30.6456C122.584 30.822 122.402 30.9668 122.196 31.0711C121.981 31.1792 121.743 31.2339 121.502 31.2307H119.59V33.4095L119.01 33.3988ZM119.583 30.703H121.47C121.633 30.7053 121.794 30.6673 121.939 30.5924C122.078 30.5171 122.201 30.4152 122.301 30.2924C122.402 30.1649 122.48 30.021 122.532 29.8668C122.588 29.7023 122.616 29.5298 122.615 29.3562C122.615 29.0076 122.49 28.6707 122.262 28.4072C122.155 28.2869 122.025 28.1892 121.88 28.12C121.736 28.0517 121.578 28.0161 121.419 28.0157H119.583V30.703Z" fill="white"/>\n    <path d="M123.828 27.3262H124.393V32.4178C124.389 32.4866 124.399 32.5556 124.422 32.6207C124.445 32.6857 124.48 32.7455 124.527 32.7965C124.576 32.844 124.635 32.8806 124.7 32.904C124.764 32.9275 124.832 32.9372 124.901 32.9327C124.972 32.9309 125.043 32.9231 125.113 32.9093C125.193 32.8929 125.271 32.8702 125.347 32.8412L125.447 33.2986C125.322 33.3485 125.192 33.3848 125.06 33.4071C124.93 33.4328 124.798 33.447 124.665 33.4497C124.554 33.457 124.442 33.4419 124.337 33.4054C124.231 33.3689 124.134 33.3116 124.051 33.2369C123.973 33.1548 123.913 33.0574 123.874 32.9509C123.835 32.8443 123.819 32.7309 123.826 32.6178L123.828 27.3262Z" fill="white"/>\n    <path d="M126.09 28.1581V27.3262H126.659V28.1581H126.09ZM126.09 33.3986V29.0645H126.659V33.3986H126.09Z" fill="white"/>\n    <path d="M127.295 31.2205C127.294 30.9246 127.347 30.631 127.452 30.3546C127.553 30.0908 127.705 29.8494 127.899 29.6439C128.092 29.4399 128.325 29.277 128.583 29.1652C128.861 29.046 129.161 28.9866 129.464 28.9907C129.837 28.9826 130.205 29.0792 130.526 29.2694C130.825 29.4473 131.065 29.7092 131.217 30.0226L130.669 30.1971C130.551 29.9799 130.375 29.7995 130.161 29.6758C129.957 29.5624 129.73 29.4985 129.497 29.4892C129.264 29.48 129.033 29.5257 128.821 29.6226C128.632 29.7089 128.462 29.8319 128.321 29.9843C128.176 30.1421 128.063 30.3273 127.99 30.529C127.907 30.7501 127.866 30.9845 127.869 31.2205C127.866 31.4562 127.909 31.6902 127.994 31.9099C128.071 32.1171 128.186 32.3078 128.334 32.4716C128.475 32.6279 128.646 32.7551 128.835 32.8461C129.026 32.9379 129.235 32.9852 129.447 32.9844C129.586 32.9847 129.724 32.9647 129.857 32.9248C129.99 32.8885 130.117 32.8341 130.235 32.7631C130.346 32.699 130.447 32.6195 130.535 32.527C130.613 32.4467 130.673 32.35 130.709 32.244L131.257 32.4099C131.196 32.5669 131.106 32.7112 130.992 32.8355C130.872 32.969 130.734 33.0844 130.582 33.178C130.418 33.2775 130.242 33.3535 130.057 33.4036C129.864 33.4567 129.664 33.4831 129.464 33.4823C129.172 33.4857 128.882 33.4281 128.613 33.3131C128.344 33.198 128.102 33.0281 127.903 32.8142C127.707 32.6047 127.553 32.36 127.448 32.0929C127.343 31.8144 127.291 31.5184 127.295 31.2205Z" fill="white"/>\n    <path d="M134.061 27.4922H135.291L137.441 33.3987H136.047L135.582 32.0774H133.744L133.296 33.3987H131.9L134.061 27.4922ZM135.37 31.1369L134.675 29.0412L133.97 31.1306L135.37 31.1369Z" fill="white"/>\n    <path d="M138.082 33.3988V27.4923H140.742C141.008 27.4896 141.27 27.5493 141.509 27.6667C141.74 27.7793 141.947 27.9345 142.121 28.1242C142.292 28.3112 142.428 28.5274 142.522 28.7625C142.618 28.9917 142.668 29.2375 142.669 29.4859C142.669 29.6646 142.646 29.8425 142.603 30.0157C142.559 30.1825 142.495 30.3432 142.412 30.4945C142.33 30.642 142.227 30.7773 142.108 30.8966C141.988 31.0167 141.853 31.1192 141.704 31.2009L143 33.3967H141.464L140.334 31.4924H139.446V33.3967L138.082 33.3988ZM139.446 30.3051H140.691C140.775 30.3048 140.858 30.2836 140.932 30.2435C141.006 30.2034 141.069 30.1457 141.116 30.0753C141.237 29.9042 141.298 29.6977 141.29 29.4881C141.301 29.2758 141.23 29.0674 141.09 28.9072C141.038 28.8439 140.974 28.7923 140.9 28.7556C140.827 28.719 140.747 28.6981 140.665 28.6944H139.461L139.446 30.3051Z" fill="white"/>\n    <path d="M122.748 11.7538C122.783 11.8167 122.834 11.8692 122.896 11.9057C122.958 11.9422 123.029 11.9614 123.101 11.9614C123.173 11.9614 123.243 11.9422 123.305 11.9057C123.367 11.8692 123.418 11.8167 123.453 11.7538L124.516 9.83888L125.455 11.5602C125.51 11.6478 125.596 11.711 125.696 11.7369C125.797 11.7628 125.903 11.7493 125.994 11.6993C126.084 11.6493 126.152 11.5665 126.184 11.4679C126.216 11.3693 126.209 11.2623 126.164 11.1687L125.178 9.36228H127.785C127.855 9.3623 127.924 9.34403 127.986 9.30925C128.047 9.27447 128.098 9.22438 128.134 9.16388C128.17 9.10338 128.189 9.03456 128.191 8.96415C128.192 8.89375 128.175 8.82418 128.142 8.76227C128.108 8.69775 128.057 8.64382 127.994 8.60631C127.932 8.56881 127.86 8.54916 127.787 8.5495H124.813L124.796 8.51758L124.777 8.5495H124.314L124.082 8.97504L124.065 9.00482L122.752 11.3666C122.719 11.4271 122.701 11.4952 122.701 11.5645C122.701 11.6337 122.719 11.7018 122.752 11.7623L122.748 11.7538Z" fill="white"/>\n    <path d="M127.783 24.231H125.183L126.168 22.4224C126.194 22.3758 126.21 22.3245 126.216 22.2716C126.221 22.2187 126.217 22.1652 126.202 22.1141C126.187 22.0631 126.162 22.0154 126.129 21.974C126.096 21.9325 126.055 21.898 126.008 21.8724C125.961 21.8468 125.91 21.8307 125.857 21.825C125.805 21.8192 125.751 21.8239 125.7 21.8388C125.649 21.8537 125.602 21.8786 125.56 21.9119C125.519 21.9452 125.484 21.9864 125.459 22.0331L124.52 23.7544L123.458 21.8394C123.423 21.7765 123.371 21.7241 123.309 21.6876C123.247 21.6511 123.177 21.6318 123.105 21.6318C123.033 21.6318 122.962 21.6511 122.9 21.6876C122.838 21.7241 122.787 21.7765 122.752 21.8394C122.719 21.9 122.701 21.9681 122.701 22.0373C122.701 22.1065 122.719 22.1746 122.752 22.2352L124.065 24.5969L124.082 24.6267L124.314 25.0523H124.777L124.796 25.0821L124.811 25.0523H127.785C127.858 25.0519 127.929 25.032 127.992 24.9945C128.054 24.9571 128.105 24.9036 128.14 24.8395C128.175 24.7773 128.194 24.7069 128.194 24.6352C128.193 24.5636 128.174 24.4933 128.138 24.4315C128.101 24.3697 128.05 24.3186 127.987 24.2834C127.925 24.2482 127.854 24.2301 127.783 24.231Z" fill="white"/>\n    <path d="M131.793 16.3779H128.944L127.812 14.3013C127.761 14.2071 127.674 14.1372 127.571 14.1071C127.468 14.0769 127.357 14.089 127.263 14.1407C127.169 14.1923 127.099 14.2792 127.069 14.3824C127.039 14.4855 127.051 14.5964 127.102 14.6907L128.25 16.795L127.102 18.8993C127.051 18.9935 127.039 19.1044 127.069 19.2075C127.099 19.3107 127.169 19.3976 127.263 19.4493C127.357 19.5009 127.468 19.513 127.571 19.4829C127.674 19.4527 127.761 19.3829 127.812 19.2886L128.951 17.2014H131.793C131.85 17.2054 131.906 17.1978 131.96 17.179C132.013 17.1601 132.062 17.1304 132.104 17.0918C132.145 17.0532 132.178 17.0064 132.201 16.9544C132.223 16.9024 132.235 16.8464 132.235 16.7897C132.235 16.7329 132.223 16.6769 132.201 16.6249C132.178 16.5729 132.145 16.5261 132.104 16.4875C132.062 16.4489 132.013 16.4192 131.96 16.4003C131.906 16.3815 131.85 16.3739 131.793 16.3779Z" fill="white"/>\n    <path d="M122.178 14.1477C122.142 14.0848 122.091 14.0325 122.029 13.9961C121.967 13.9596 121.896 13.9404 121.824 13.9404C121.752 13.9404 121.681 13.9596 121.619 13.9961C121.557 14.0325 121.505 14.0848 121.47 14.1477L120.212 16.4094L120 16.8052L120.212 17.201L121.47 19.4648C121.526 19.5526 121.613 19.6158 121.713 19.6414C121.814 19.667 121.92 19.653 122.011 19.6023C122.101 19.5516 122.169 19.4681 122.2 19.3689C122.231 19.2697 122.223 19.1624 122.178 19.0691L120.922 16.7946L122.182 14.5328C122.213 14.4732 122.229 14.4069 122.228 14.3397C122.227 14.2725 122.21 14.2066 122.178 14.1477Z" fill="white"/>\n    <path d="M141.757 16.6179L137.533 8.76453C137.501 8.70087 137.452 8.64728 137.392 8.60972C137.332 8.57216 137.262 8.5521 137.191 8.55176C137.12 8.55281 137.051 8.57316 136.991 8.61064C136.93 8.64813 136.881 8.70132 136.849 8.76453L135.555 11.1688C135.536 11.206 135.523 11.2463 135.517 11.288L134.179 8.79432C134.147 8.73098 134.098 8.6776 134.038 8.64006C133.979 8.60252 133.909 8.58228 133.839 8.58155H130.609C130.512 8.58881 130.42 8.63287 130.353 8.70489C130.287 8.77691 130.249 8.87156 130.249 8.96985C130.249 9.06814 130.287 9.16279 130.353 9.23481C130.42 9.30684 130.512 9.3509 130.609 9.35816H133.607L137.346 16.3306H134.977C134.859 16.3386 134.748 16.3913 134.667 16.478C134.586 16.5647 134.541 16.679 134.541 16.7977C134.541 16.9164 134.586 17.0306 134.667 17.1173C134.748 17.204 134.859 17.2567 134.977 17.2647H137.372L133.669 24.2521H130.609C130.506 24.2521 130.407 24.2931 130.335 24.3661C130.262 24.4392 130.221 24.5382 130.221 24.6415C130.221 24.7447 130.262 24.8438 130.335 24.9168C130.407 24.9898 130.506 25.0308 130.609 25.0308H133.905C133.976 25.0302 134.045 25.0101 134.105 24.9726C134.166 24.935 134.215 24.8816 134.247 24.8181L135.581 22.3201C135.588 22.347 135.599 22.3728 135.613 22.3967L136.93 24.7968C136.963 24.8576 137.013 24.9082 137.072 24.9434C137.132 24.9786 137.2 24.997 137.27 24.9968C137.34 24.9961 137.41 24.9758 137.469 24.9383C137.529 24.9007 137.578 24.8474 137.61 24.784L141.761 16.9775C141.789 16.9216 141.803 16.8598 141.803 16.7972C141.802 16.7346 141.786 16.6731 141.757 16.6179Z" fill="white"/>\n    </g>\n    <defs>\n    <clipPath id="clip0_2184_24107">\n    <rect width="24" height="24.9686" fill="white" transform="translate(119 8.51562)"/>\n    </clipPath>\n    </defs>\n    </svg>\n    ',
    disable:
      '<svg width="167" height="42" viewBox="0 0 167 42" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <title>PlicAR AR run button</title>\n    <rect width="167" height="42" rx="8" fill="#969699" fill-opacity="0.4"/>\n    <path d="M26.4809 26L27.3012 23.5527H31.0268L31.8539 26H33.7543L30.2543 16.1016H28.0668L24.5805 26H26.4809ZM27.7797 22.1172L29.1195 18.125H29.2016L30.5482 22.1172H27.7797ZM35.0301 26H36.8074V22.377H38.6668L40.6082 26H42.5906L40.451 22.0762C41.6131 21.6045 42.2283 20.6064 42.2352 19.2598C42.2283 17.373 41.0184 16.1016 38.7488 16.1016H35.0301V26ZM36.8074 20.8867V17.5918H38.4754C39.8152 17.5918 40.4168 18.207 40.4168 19.2598C40.4168 20.3193 39.8152 20.8936 38.4754 20.8867H36.8074ZM54.6535 24.5234H49.7316V22.5137H53.6008V21.2695H46.218V19.6699H53.3137V15.7051H44.673V16.9355H51.8098V18.4668H44.7004V22.5137H48.2277V24.5234H43.3605V25.7812H54.6535V24.5234ZM63.3574 16.8262V15.5137H61.8398V16.6895C61.833 18.4531 60.835 20.1006 58.8457 20.791L59.666 21.9805C61.0879 21.4814 62.0859 20.4492 62.6191 19.1367C63.1592 20.2852 64.1162 21.1875 65.4492 21.6387L66.2695 20.4492C64.3623 19.8477 63.3574 18.3779 63.3574 16.8262ZM60.5273 24.8516C60.5273 26.3486 62.1338 27.2031 64.7109 27.2031C67.2676 27.2031 68.8467 26.3486 68.8535 24.8516C68.8467 23.3887 67.2676 22.5205 64.7109 22.5273C62.1338 22.5205 60.5273 23.3887 60.5273 24.8516ZM62.0449 24.8516C62.0449 24.127 63.0156 23.7168 64.7109 23.7168C66.3994 23.7168 67.3496 24.127 67.3496 24.8516C67.3496 25.6172 66.3994 26 64.7109 26C63.0156 26 62.0449 25.6172 62.0449 24.8516ZM67.2129 22.2539H68.7305V19.123H70.4531V17.8652H68.7305V14.8574H67.2129V22.2539ZM82.4477 20.709H71.182V21.9258H76.0492V23.1152H72.5082V27.0664H81.0805V23.1152H77.5531V21.9258H82.4477V20.709ZM72.1937 16.4434H73.8891V18.5625H72.2621V19.793H81.3402V18.5625H79.7133V16.4434H81.4086V15.2266H72.1937V16.4434ZM74.0121 25.8359V24.291H79.6039V25.8359H74.0121ZM75.4066 18.5625V16.4434H78.182V18.5625H75.4066ZM98.0969 24.4824H93.175V22.0762H96.8117V15.6777H95.2941V17.7012H89.5656V15.6777H88.048V22.0762H91.6711V24.4824H86.8039V25.7266H98.0969V24.4824ZM89.5656 20.8457V18.918H95.2941V20.8457H89.5656ZM109.326 14.8574H107.795V27.2168H109.326V14.8574ZM99.0855 23.8125L99.8785 25.0293C104.206 22.9717 105.634 19.8477 105.634 16.1699H99.7145V17.373H104.089C103.816 20.1826 102.326 22.2744 99.0855 23.8125Z" fill="white"/>\n    <g clip-path="url(#clip0_1796_20189)">\n    <path d="M119.01 33.3988V27.4923H121.453C121.696 27.4892 121.937 27.5447 122.154 27.654C122.364 27.7587 122.551 27.9033 122.706 28.0796C122.862 28.2543 122.985 28.4553 123.07 28.6732C123.153 28.8882 123.197 29.1169 123.197 29.3477C123.198 29.587 123.157 29.8247 123.076 30.0498C123.001 30.2689 122.884 30.4712 122.732 30.6456C122.584 30.822 122.402 30.9668 122.196 31.0711C121.981 31.1792 121.743 31.2339 121.502 31.2307H119.59V33.4095L119.01 33.3988ZM119.583 30.703H121.47C121.633 30.7053 121.794 30.6673 121.939 30.5924C122.078 30.5171 122.201 30.4152 122.301 30.2924C122.402 30.1649 122.48 30.021 122.532 29.8668C122.588 29.7023 122.616 29.5298 122.615 29.3562C122.615 29.0076 122.49 28.6707 122.262 28.4072C122.155 28.2869 122.025 28.1892 121.88 28.12C121.736 28.0517 121.578 28.0161 121.419 28.0157H119.583V30.703Z" fill="white"/>\n    <path d="M123.828 27.3262H124.393V32.4178C124.389 32.4866 124.399 32.5556 124.422 32.6207C124.445 32.6857 124.48 32.7455 124.527 32.7965C124.576 32.844 124.635 32.8806 124.7 32.904C124.764 32.9275 124.832 32.9372 124.901 32.9327C124.972 32.9309 125.043 32.9231 125.113 32.9093C125.193 32.8929 125.271 32.8702 125.347 32.8412L125.447 33.2986C125.322 33.3485 125.192 33.3848 125.06 33.4071C124.93 33.4328 124.798 33.447 124.665 33.4497C124.554 33.457 124.442 33.4419 124.337 33.4054C124.231 33.3689 124.134 33.3116 124.051 33.2369C123.973 33.1548 123.913 33.0574 123.874 32.9509C123.835 32.8444 123.819 32.7309 123.826 32.6178L123.828 27.3262Z" fill="white"/>\n    <path d="M126.09 28.1581V27.3262H126.659V28.1581H126.09ZM126.09 33.3986V29.0645H126.659V33.3986H126.09Z" fill="white"/>\n    <path d="M127.295 31.2205C127.294 30.9246 127.347 30.631 127.452 30.3546C127.553 30.0908 127.705 29.8494 127.899 29.6439C128.092 29.4399 128.325 29.277 128.583 29.1652C128.861 29.046 129.161 28.9866 129.464 28.9907C129.837 28.9826 130.205 29.0792 130.526 29.2694C130.825 29.4473 131.065 29.7092 131.217 30.0226L130.669 30.1971C130.551 29.9799 130.375 29.7995 130.161 29.6758C129.957 29.5624 129.73 29.4985 129.497 29.4892C129.264 29.48 129.033 29.5257 128.821 29.6226C128.632 29.7089 128.462 29.8319 128.321 29.9843C128.176 30.1421 128.063 30.3273 127.99 30.529C127.907 30.7501 127.866 30.9845 127.869 31.2205C127.866 31.4562 127.909 31.6902 127.994 31.9099C128.071 32.1171 128.186 32.3078 128.334 32.4716C128.475 32.6279 128.646 32.7551 128.835 32.8461C129.026 32.9379 129.235 32.9852 129.447 32.9844C129.586 32.9847 129.724 32.9647 129.857 32.9248C129.99 32.8885 130.117 32.8341 130.235 32.7631C130.346 32.699 130.447 32.6195 130.535 32.527C130.613 32.4467 130.673 32.35 130.709 32.244L131.257 32.4099C131.196 32.5669 131.106 32.7112 130.992 32.8355C130.872 32.969 130.734 33.0844 130.582 33.178C130.418 33.2775 130.242 33.3535 130.057 33.4036C129.864 33.4567 129.664 33.4831 129.464 33.4823C129.172 33.4857 128.882 33.4281 128.613 33.3131C128.344 33.198 128.102 33.0281 127.903 32.8142C127.707 32.6047 127.553 32.36 127.448 32.0929C127.343 31.8144 127.291 31.5184 127.295 31.2205V31.2205Z" fill="white"/>\n    <path d="M134.061 27.4922H135.291L137.441 33.3987H136.047L135.582 32.0774H133.744L133.296 33.3987H131.9L134.061 27.4922ZM135.37 31.1369L134.675 29.0412L133.97 31.1306L135.37 31.1369Z" fill="white"/>\n    <path d="M138.082 33.3988V27.4923H140.742C141.008 27.4896 141.27 27.5493 141.509 27.6667C141.74 27.7793 141.947 27.9345 142.121 28.1242C142.292 28.3112 142.428 28.5274 142.522 28.7625C142.618 28.9917 142.668 29.2375 142.669 29.4859C142.669 29.6646 142.646 29.8425 142.603 30.0157C142.559 30.1825 142.495 30.3432 142.412 30.4945C142.33 30.642 142.227 30.7773 142.108 30.8966C141.988 31.0167 141.853 31.1192 141.704 31.2009L143 33.3967H141.464L140.334 31.4924H139.446V33.3967L138.082 33.3988ZM139.446 30.3051H140.691C140.775 30.3048 140.858 30.2836 140.932 30.2435C141.006 30.2034 141.069 30.1457 141.116 30.0753C141.237 29.9042 141.298 29.6977 141.29 29.4881C141.301 29.2758 141.23 29.0674 141.09 28.9072C141.038 28.8439 140.974 28.7923 140.9 28.7556C140.827 28.719 140.747 28.6981 140.665 28.6944H139.461L139.446 30.3051Z" fill="white"/>\n    <path d="M122.748 11.7538C122.783 11.8167 122.834 11.8692 122.896 11.9057C122.958 11.9422 123.029 11.9614 123.101 11.9614C123.173 11.9614 123.243 11.9422 123.305 11.9057C123.367 11.8692 123.418 11.8167 123.453 11.7538L124.516 9.83888L125.455 11.5602C125.51 11.6478 125.596 11.711 125.696 11.7369C125.797 11.7628 125.903 11.7493 125.994 11.6993C126.084 11.6493 126.152 11.5665 126.184 11.4679C126.216 11.3693 126.209 11.2623 126.164 11.1687L125.178 9.36228H127.785C127.855 9.3623 127.924 9.34403 127.986 9.30925C128.047 9.27447 128.098 9.22438 128.134 9.16388C128.17 9.10338 128.189 9.03456 128.191 8.96415C128.192 8.89375 128.175 8.82418 128.142 8.76227C128.108 8.69775 128.057 8.64382 127.994 8.60631C127.932 8.56881 127.86 8.54916 127.787 8.5495H124.813L124.796 8.51758L124.777 8.5495H124.314L124.082 8.97504L124.065 9.00482L122.752 11.3666C122.719 11.4271 122.701 11.4952 122.701 11.5645C122.701 11.6337 122.719 11.7018 122.752 11.7623L122.748 11.7538Z" fill="white"/>\n    <path d="M127.783 24.231H125.183L126.168 22.4224C126.194 22.3758 126.21 22.3245 126.216 22.2716C126.221 22.2187 126.217 22.1652 126.202 22.1141C126.187 22.0631 126.162 22.0154 126.129 21.974C126.096 21.9325 126.055 21.898 126.008 21.8724C125.961 21.8468 125.91 21.8307 125.857 21.825C125.805 21.8192 125.751 21.8239 125.7 21.8388C125.649 21.8537 125.602 21.8786 125.56 21.9119C125.519 21.9452 125.484 21.9864 125.459 22.0331L124.52 23.7544L123.458 21.8394C123.423 21.7765 123.371 21.7241 123.309 21.6876C123.247 21.6511 123.177 21.6318 123.105 21.6318C123.033 21.6318 122.962 21.6511 122.9 21.6876C122.838 21.7241 122.787 21.7765 122.752 21.8394V21.8394C122.719 21.9 122.701 21.9681 122.701 22.0373C122.701 22.1065 122.719 22.1746 122.752 22.2352L124.065 24.5969L124.082 24.6267L124.314 25.0523H124.777L124.796 25.0821L124.811 25.0523H127.785C127.858 25.0519 127.929 25.032 127.992 24.9945C128.054 24.9571 128.105 24.9036 128.14 24.8395C128.175 24.7773 128.194 24.7069 128.194 24.6352C128.193 24.5636 128.174 24.4933 128.138 24.4315C128.101 24.3697 128.05 24.3186 127.987 24.2834C127.925 24.2482 127.854 24.2301 127.783 24.231V24.231Z" fill="white"/>\n    <path d="M131.793 16.3779H128.944L127.812 14.3013C127.761 14.2071 127.674 14.1372 127.571 14.1071C127.468 14.0769 127.357 14.089 127.263 14.1407C127.169 14.1923 127.099 14.2792 127.069 14.3824C127.039 14.4855 127.051 14.5964 127.102 14.6907L128.25 16.795L127.102 18.8993C127.051 18.9935 127.039 19.1044 127.069 19.2075C127.099 19.3107 127.169 19.3976 127.263 19.4493C127.357 19.5009 127.468 19.513 127.571 19.4829C127.674 19.4527 127.761 19.3829 127.812 19.2886L128.951 17.2014H131.793C131.85 17.2054 131.906 17.1978 131.96 17.179C132.013 17.1601 132.062 17.1304 132.104 17.0918C132.145 17.0532 132.178 17.0064 132.201 16.9544C132.223 16.9024 132.235 16.8464 132.235 16.7897C132.235 16.7329 132.223 16.6769 132.201 16.6249C132.178 16.5729 132.145 16.5261 132.104 16.4875C132.062 16.4489 132.013 16.4192 131.96 16.4003C131.906 16.3815 131.85 16.3739 131.793 16.3779V16.3779Z" fill="white"/>\n    <path d="M122.178 14.1477C122.142 14.0848 122.091 14.0325 122.029 13.9961C121.967 13.9596 121.896 13.9404 121.824 13.9404C121.752 13.9404 121.681 13.9596 121.619 13.9961C121.557 14.0325 121.505 14.0848 121.47 14.1477L120.212 16.4094L120 16.8052L120.212 17.201L121.47 19.4648C121.526 19.5526 121.613 19.6158 121.713 19.6414C121.814 19.667 121.92 19.653 122.011 19.6023C122.101 19.5516 122.169 19.4681 122.2 19.3689C122.231 19.2697 122.223 19.1624 122.178 19.0691L120.922 16.7946L122.182 14.5328C122.213 14.4732 122.229 14.4069 122.228 14.3397C122.227 14.2725 122.21 14.2066 122.178 14.1477Z" fill="white"/>\n    <path d="M141.757 16.6179L137.533 8.76453C137.501 8.70087 137.452 8.64728 137.392 8.60972C137.332 8.57216 137.262 8.5521 137.191 8.55176V8.55176C137.12 8.55281 137.051 8.57316 136.991 8.61064C136.93 8.64813 136.881 8.70132 136.849 8.76453L135.555 11.1688C135.536 11.206 135.523 11.2463 135.517 11.288L134.179 8.79432C134.147 8.73098 134.098 8.6776 134.038 8.64006C133.979 8.60252 133.909 8.58228 133.839 8.58155H130.609C130.512 8.58881 130.42 8.63287 130.353 8.70489C130.287 8.77691 130.249 8.87156 130.249 8.96985C130.249 9.06814 130.287 9.16279 130.353 9.23481C130.42 9.30684 130.512 9.3509 130.609 9.35816H133.607L137.346 16.3306H134.977C134.859 16.3386 134.748 16.3913 134.667 16.478C134.586 16.5647 134.541 16.679 134.541 16.7977C134.541 16.9164 134.586 17.0306 134.667 17.1173C134.748 17.204 134.859 17.2567 134.977 17.2647H137.372L133.669 24.2521H130.609C130.506 24.2521 130.407 24.2931 130.335 24.3661C130.262 24.4392 130.221 24.5382 130.221 24.6415C130.221 24.7447 130.262 24.8438 130.335 24.9168C130.407 24.9898 130.506 25.0308 130.609 25.0308H133.905C133.976 25.0302 134.045 25.0101 134.105 24.9726C134.166 24.935 134.215 24.8816 134.247 24.8181L135.581 22.3201C135.588 22.347 135.599 22.3728 135.613 22.3967L136.93 24.7968C136.963 24.8576 137.013 24.9082 137.072 24.9434C137.132 24.9786 137.2 24.997 137.27 24.9968V24.9968C137.34 24.9961 137.41 24.9758 137.469 24.9383C137.529 24.9007 137.578 24.8474 137.61 24.784L141.761 16.9775C141.789 16.9216 141.803 16.8598 141.803 16.7972C141.802 16.7346 141.786 16.6731 141.757 16.6179Z" fill="white"/>\n    </g>\n    <defs>\n    <clipPath id="clip0_1796_20189">\n    <rect width="24" height="24.9686" fill="white" transform="translate(119 8.51562)"/>\n    </clipPath>\n    </defs>\n    </svg>\n    ',
  },
  secondary: {
    enable:
      '<svg width="167" height="42" viewBox="0 0 167 42" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <title>PlicAR AR run button</title>\n    <rect width="167" height="42" rx="8" fill="#F2F4FC"/>\n    <path d="M26.4809 26L27.3012 23.5527H31.0268L31.8539 26H33.7543L30.2543 16.1016H28.0668L24.5805 26H26.4809ZM27.7797 22.1172L29.1195 18.125H29.2016L30.5482 22.1172H27.7797ZM35.0301 26H36.8074V22.377H38.6668L40.6082 26H42.5906L40.451 22.0762C41.6131 21.6045 42.2283 20.6064 42.2352 19.2598C42.2283 17.373 41.0184 16.1016 38.7488 16.1016H35.0301V26ZM36.8074 20.8867V17.5918H38.4754C39.8152 17.5918 40.4168 18.207 40.4168 19.2598C40.4168 20.3193 39.8152 20.8936 38.4754 20.8867H36.8074ZM54.6535 24.5234H49.7316V22.5137H53.6008V21.2695H46.218V19.6699H53.3137V15.7051H44.673V16.9355H51.8098V18.4668H44.7004V22.5137H48.2277V24.5234H43.3605V25.7812H54.6535V24.5234ZM63.3574 16.8262V15.5137H61.8398V16.6895C61.833 18.4531 60.835 20.1006 58.8457 20.791L59.666 21.9805C61.0879 21.4814 62.0859 20.4492 62.6191 19.1367C63.1592 20.2852 64.1162 21.1875 65.4492 21.6387L66.2695 20.4492C64.3623 19.8477 63.3574 18.3779 63.3574 16.8262ZM60.5273 24.8516C60.5273 26.3486 62.1338 27.2031 64.7109 27.2031C67.2676 27.2031 68.8467 26.3486 68.8535 24.8516C68.8467 23.3887 67.2676 22.5205 64.7109 22.5273C62.1338 22.5205 60.5273 23.3887 60.5273 24.8516ZM62.0449 24.8516C62.0449 24.127 63.0156 23.7168 64.7109 23.7168C66.3994 23.7168 67.3496 24.127 67.3496 24.8516C67.3496 25.6172 66.3994 26 64.7109 26C63.0156 26 62.0449 25.6172 62.0449 24.8516ZM67.2129 22.2539H68.7305V19.123H70.4531V17.8652H68.7305V14.8574H67.2129V22.2539ZM82.4477 20.709H71.182V21.9258H76.0492V23.1152H72.5082V27.0664H81.0805V23.1152H77.5531V21.9258H82.4477V20.709ZM72.1937 16.4434H73.8891V18.5625H72.2621V19.793H81.3402V18.5625H79.7133V16.4434H81.4086V15.2266H72.1937V16.4434ZM74.0121 25.8359V24.291H79.6039V25.8359H74.0121ZM75.4066 18.5625V16.4434H78.182V18.5625H75.4066ZM98.0969 24.4824H93.175V22.0762H96.8117V15.6777H95.2941V17.7012H89.5656V15.6777H88.048V22.0762H91.6711V24.4824H86.8039V25.7266H98.0969V24.4824ZM89.5656 20.8457V18.918H95.2941V20.8457H89.5656ZM109.326 14.8574H107.795V27.2168H109.326V14.8574ZM99.0855 23.8125L99.8785 25.0293C104.206 22.9717 105.634 19.8477 105.634 16.1699H99.7145V17.373H104.089C103.816 20.1826 102.326 22.2744 99.0855 23.8125Z" fill="#6073FF"/>\n    <g clip-path="url(#clip0_2184_24112)">\n    <path d="M119.01 33.3988V27.4923H121.453C121.696 27.4892 121.937 27.5447 122.154 27.654C122.364 27.7587 122.551 27.9033 122.706 28.0796C122.862 28.2543 122.985 28.4553 123.07 28.6732C123.153 28.8882 123.197 29.1169 123.197 29.3477C123.198 29.587 123.157 29.8247 123.076 30.0498C123.001 30.2689 122.884 30.4712 122.732 30.6456C122.584 30.822 122.402 30.9668 122.196 31.0711C121.981 31.1792 121.743 31.2339 121.502 31.2307H119.59V33.4095L119.01 33.3988ZM119.583 30.703H121.47C121.633 30.7053 121.794 30.6673 121.939 30.5924C122.078 30.5171 122.201 30.4152 122.301 30.2924C122.402 30.1649 122.48 30.021 122.532 29.8668C122.588 29.7023 122.616 29.5298 122.615 29.3562C122.615 29.0076 122.49 28.6707 122.262 28.4072C122.155 28.2869 122.025 28.1892 121.88 28.12C121.736 28.0517 121.578 28.0161 121.419 28.0157H119.583V30.703Z" fill="#6073FF"/>\n    <path d="M123.828 27.3262H124.393V32.4178C124.389 32.4866 124.399 32.5556 124.422 32.6207C124.445 32.6857 124.48 32.7455 124.527 32.7965C124.576 32.844 124.635 32.8806 124.7 32.904C124.764 32.9275 124.832 32.9372 124.901 32.9327C124.972 32.9309 125.043 32.9231 125.113 32.9093C125.193 32.8929 125.271 32.8702 125.347 32.8412L125.447 33.2986C125.322 33.3485 125.192 33.3848 125.06 33.4071C124.93 33.4328 124.798 33.447 124.665 33.4497C124.554 33.457 124.442 33.4419 124.337 33.4054C124.231 33.3689 124.134 33.3116 124.051 33.2369C123.973 33.1548 123.913 33.0574 123.874 32.9509C123.835 32.8443 123.819 32.7309 123.826 32.6178L123.828 27.3262Z" fill="#6073FF"/>\n    <path d="M126.09 28.1581V27.3262H126.659V28.1581H126.09ZM126.09 33.3986V29.0645H126.659V33.3986H126.09Z" fill="#6073FF"/>\n    <path d="M127.295 31.2205C127.294 30.9246 127.347 30.631 127.452 30.3546C127.553 30.0908 127.705 29.8494 127.899 29.6439C128.092 29.4399 128.325 29.277 128.583 29.1652C128.861 29.046 129.161 28.9866 129.464 28.9907C129.837 28.9826 130.205 29.0792 130.526 29.2694C130.825 29.4473 131.065 29.7092 131.217 30.0226L130.669 30.1971C130.551 29.9799 130.375 29.7995 130.161 29.6758C129.957 29.5624 129.73 29.4985 129.497 29.4892C129.264 29.48 129.033 29.5257 128.821 29.6226C128.632 29.7089 128.462 29.8319 128.321 29.9843C128.176 30.1421 128.063 30.3273 127.99 30.529C127.907 30.7501 127.866 30.9845 127.869 31.2205C127.866 31.4562 127.909 31.6902 127.994 31.9099C128.071 32.1171 128.186 32.3078 128.334 32.4716C128.475 32.6279 128.646 32.7551 128.835 32.8461C129.026 32.9379 129.235 32.9852 129.447 32.9844C129.586 32.9847 129.724 32.9647 129.857 32.9248C129.99 32.8885 130.117 32.8341 130.235 32.7631C130.346 32.699 130.447 32.6195 130.535 32.527C130.613 32.4467 130.673 32.35 130.709 32.244L131.257 32.4099C131.196 32.5669 131.106 32.7112 130.992 32.8355C130.872 32.969 130.734 33.0844 130.582 33.178C130.418 33.2775 130.242 33.3535 130.057 33.4036C129.864 33.4567 129.664 33.4831 129.464 33.4823C129.172 33.4857 128.882 33.4281 128.613 33.3131C128.344 33.198 128.102 33.0281 127.903 32.8142C127.707 32.6047 127.553 32.36 127.448 32.0929C127.343 31.8144 127.291 31.5184 127.295 31.2205Z" fill="#6073FF"/>\n    <path d="M134.061 27.4922H135.291L137.441 33.3987H136.047L135.582 32.0774H133.744L133.296 33.3987H131.9L134.061 27.4922ZM135.37 31.1369L134.675 29.0412L133.97 31.1306L135.37 31.1369Z" fill="#6073FF"/>\n    <path d="M138.082 33.3988V27.4923H140.742C141.008 27.4896 141.27 27.5493 141.509 27.6667C141.74 27.7793 141.947 27.9345 142.121 28.1242C142.292 28.3112 142.428 28.5274 142.522 28.7625C142.618 28.9917 142.668 29.2375 142.669 29.4859C142.669 29.6646 142.646 29.8425 142.603 30.0157C142.559 30.1825 142.495 30.3432 142.412 30.4945C142.33 30.642 142.227 30.7773 142.108 30.8966C141.988 31.0167 141.853 31.1192 141.704 31.2009L143 33.3967H141.464L140.334 31.4924H139.446V33.3967L138.082 33.3988ZM139.446 30.3051H140.691C140.775 30.3048 140.858 30.2836 140.932 30.2435C141.006 30.2034 141.069 30.1457 141.116 30.0753C141.237 29.9042 141.298 29.6977 141.29 29.4881C141.301 29.2758 141.23 29.0674 141.09 28.9072C141.038 28.8439 140.974 28.7923 140.9 28.7556C140.827 28.719 140.747 28.6981 140.665 28.6944H139.461L139.446 30.3051Z" fill="#6073FF"/>\n    <path d="M122.748 11.7538C122.783 11.8167 122.834 11.8692 122.896 11.9057C122.958 11.9422 123.029 11.9614 123.101 11.9614C123.173 11.9614 123.243 11.9422 123.305 11.9057C123.367 11.8692 123.418 11.8167 123.453 11.7538L124.516 9.83888L125.455 11.5602C125.51 11.6478 125.596 11.711 125.696 11.7369C125.797 11.7628 125.903 11.7493 125.994 11.6993C126.084 11.6493 126.152 11.5665 126.184 11.4679C126.216 11.3693 126.209 11.2623 126.164 11.1687L125.178 9.36228H127.785C127.855 9.3623 127.924 9.34403 127.986 9.30925C128.047 9.27447 128.098 9.22438 128.134 9.16388C128.17 9.10338 128.189 9.03456 128.191 8.96415C128.192 8.89375 128.175 8.82418 128.142 8.76227C128.108 8.69775 128.057 8.64382 127.994 8.60631C127.932 8.56881 127.86 8.54916 127.787 8.5495H124.813L124.796 8.51758L124.777 8.5495H124.314L124.082 8.97504L124.065 9.00482L122.752 11.3666C122.719 11.4271 122.701 11.4952 122.701 11.5645C122.701 11.6337 122.719 11.7018 122.752 11.7623L122.748 11.7538Z" fill="#6073FF"/>\n    <path d="M127.783 24.231H125.183L126.168 22.4224C126.194 22.3758 126.21 22.3245 126.216 22.2716C126.221 22.2187 126.217 22.1652 126.202 22.1141C126.187 22.0631 126.162 22.0154 126.129 21.974C126.096 21.9325 126.055 21.898 126.008 21.8724C125.961 21.8468 125.91 21.8307 125.857 21.825C125.805 21.8192 125.751 21.8239 125.7 21.8388C125.649 21.8537 125.602 21.8786 125.56 21.9119C125.519 21.9452 125.484 21.9864 125.459 22.0331L124.52 23.7544L123.458 21.8394C123.423 21.7765 123.371 21.7241 123.309 21.6876C123.247 21.6511 123.177 21.6318 123.105 21.6318C123.033 21.6318 122.962 21.6511 122.9 21.6876C122.838 21.7241 122.787 21.7765 122.752 21.8394C122.719 21.9 122.701 21.9681 122.701 22.0373C122.701 22.1065 122.719 22.1746 122.752 22.2352L124.065 24.5969L124.082 24.6267L124.314 25.0523H124.777L124.796 25.0821L124.811 25.0523H127.785C127.858 25.0519 127.929 25.032 127.992 24.9945C128.054 24.9571 128.105 24.9036 128.14 24.8395C128.175 24.7773 128.194 24.7069 128.194 24.6352C128.193 24.5636 128.174 24.4933 128.138 24.4315C128.101 24.3697 128.05 24.3186 127.987 24.2834C127.925 24.2482 127.854 24.2301 127.783 24.231Z" fill="#6073FF"/>\n    <path d="M131.793 16.3779H128.944L127.812 14.3013C127.761 14.2071 127.674 14.1372 127.571 14.1071C127.468 14.0769 127.357 14.089 127.263 14.1407C127.169 14.1923 127.099 14.2792 127.069 14.3824C127.039 14.4855 127.051 14.5964 127.102 14.6907L128.25 16.795L127.102 18.8993C127.051 18.9935 127.039 19.1044 127.069 19.2075C127.099 19.3107 127.169 19.3976 127.263 19.4493C127.357 19.5009 127.468 19.513 127.571 19.4829C127.674 19.4527 127.761 19.3829 127.812 19.2886L128.951 17.2014H131.793C131.85 17.2054 131.906 17.1978 131.96 17.179C132.013 17.1601 132.062 17.1304 132.104 17.0918C132.145 17.0532 132.178 17.0064 132.201 16.9544C132.223 16.9024 132.235 16.8464 132.235 16.7897C132.235 16.7329 132.223 16.6769 132.201 16.6249C132.178 16.5729 132.145 16.5261 132.104 16.4875C132.062 16.4489 132.013 16.4192 131.96 16.4003C131.906 16.3815 131.85 16.3739 131.793 16.3779Z" fill="#6073FF"/>\n    <path d="M122.178 14.1477C122.142 14.0848 122.091 14.0325 122.029 13.9961C121.967 13.9596 121.896 13.9404 121.824 13.9404C121.752 13.9404 121.681 13.9596 121.619 13.9961C121.557 14.0325 121.505 14.0848 121.47 14.1477L120.212 16.4094L120 16.8052L120.212 17.201L121.47 19.4648C121.526 19.5526 121.613 19.6158 121.713 19.6414C121.814 19.667 121.92 19.653 122.011 19.6023C122.101 19.5516 122.169 19.4681 122.2 19.3689C122.231 19.2697 122.223 19.1624 122.178 19.0691L120.922 16.7946L122.182 14.5328C122.213 14.4732 122.229 14.4069 122.228 14.3397C122.227 14.2725 122.21 14.2066 122.178 14.1477Z" fill="#6073FF"/>\n    <path d="M141.757 16.6179L137.533 8.76453C137.501 8.70087 137.452 8.64728 137.392 8.60972C137.332 8.57216 137.262 8.5521 137.191 8.55176C137.12 8.55281 137.051 8.57316 136.991 8.61064C136.93 8.64813 136.881 8.70132 136.849 8.76453L135.555 11.1688C135.536 11.206 135.523 11.2463 135.517 11.288L134.179 8.79432C134.147 8.73098 134.098 8.6776 134.038 8.64006C133.979 8.60252 133.909 8.58228 133.839 8.58155H130.609C130.512 8.58881 130.42 8.63287 130.353 8.70489C130.287 8.77691 130.249 8.87156 130.249 8.96985C130.249 9.06814 130.287 9.16279 130.353 9.23481C130.42 9.30684 130.512 9.3509 130.609 9.35816H133.607L137.346 16.3306H134.977C134.859 16.3386 134.748 16.3913 134.667 16.478C134.586 16.5647 134.541 16.679 134.541 16.7977C134.541 16.9164 134.586 17.0306 134.667 17.1173C134.748 17.204 134.859 17.2567 134.977 17.2647H137.372L133.669 24.2521H130.609C130.506 24.2521 130.407 24.2931 130.335 24.3661C130.262 24.4392 130.221 24.5382 130.221 24.6415C130.221 24.7447 130.262 24.8438 130.335 24.9168C130.407 24.9898 130.506 25.0308 130.609 25.0308H133.905C133.976 25.0302 134.045 25.0101 134.105 24.9726C134.166 24.935 134.215 24.8816 134.247 24.8181L135.581 22.3201C135.588 22.347 135.599 22.3728 135.613 22.3967L136.93 24.7968C136.963 24.8576 137.013 24.9082 137.072 24.9434C137.132 24.9786 137.2 24.997 137.27 24.9968C137.34 24.9961 137.41 24.9758 137.469 24.9383C137.529 24.9007 137.578 24.8474 137.61 24.784L141.761 16.9775C141.789 16.9216 141.803 16.8598 141.803 16.7972C141.802 16.7346 141.786 16.6731 141.757 16.6179Z" fill="#6073FF"/>\n    </g>\n    <defs>\n    <clipPath id="clip0_2184_24112">\n    <rect width="24" height="24.9686" fill="white" transform="translate(119 8.51562)"/>\n    </clipPath>\n    </defs>\n    </svg>\n    ',
    disable:
      '<svg width="167" height="42" viewBox="0 0 167 42" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <title>PlicAR AR run button</title>\n    <rect width="167" height="42" rx="8" fill="#F2F4FC"/>\n    <path d="M24.5805 26L28.0668 16.1016H30.2543L33.7543 26H31.8539L31.0268 23.5527H27.3012L26.4809 26H24.5805ZM30.5482 22.1172L29.2016 18.125H29.1195L27.7797 22.1172H30.5482ZM35.0301 16.1016H38.7488C39.4917 16.1016 40.1229 16.2337 40.6424 16.498C41.1665 16.7578 41.5607 17.1247 41.825 17.5986C42.0939 18.0726 42.2306 18.6263 42.2352 19.2598C42.2306 19.9342 42.0756 20.5153 41.7703 21.0029C41.4695 21.486 41.0298 21.8438 40.451 22.0762L42.5906 26H40.6082L38.6668 22.377H36.8074V26H35.0301V16.1016ZM38.4754 20.8867C39.7697 20.8913 40.4168 20.349 40.4168 19.2598C40.4168 18.722 40.2573 18.3096 39.9383 18.0225C39.6193 17.7354 39.1316 17.5918 38.4754 17.5918H36.8074V20.8867H38.4754ZM54.6535 25.7812H43.3605V24.5234H48.2277V22.5137H44.7004V18.4668H51.8098V16.9355H44.673V15.7051H53.3137V19.6699H46.218V21.2695H53.6008V22.5137H49.7316V24.5234H54.6535V25.7812ZM63.3574 16.8262C63.3574 17.3503 63.4691 17.8516 63.6924 18.3301C63.9157 18.8086 64.2461 19.2324 64.6836 19.6016C65.1211 19.9707 65.6497 20.2533 66.2695 20.4492L65.4492 21.6387C64.793 21.4154 64.2256 21.0895 63.7471 20.6611C63.2731 20.2327 62.8971 19.7246 62.6191 19.1367C62.3457 19.8066 61.9583 20.3877 61.457 20.8799C60.9603 21.3675 60.3633 21.7344 59.666 21.9805L58.8457 20.791C59.4928 20.5677 60.0397 20.2487 60.4863 19.834C60.9329 19.4147 61.2679 18.9362 61.4912 18.3984C61.7191 17.8561 61.8353 17.2865 61.8398 16.6895V15.5137H63.3574V16.8262ZM60.5273 24.8516C60.5273 24.3685 60.696 23.9515 61.0332 23.6006C61.3704 23.2497 61.8535 22.9831 62.4824 22.8008C63.1113 22.6185 63.8542 22.5273 64.7109 22.5273C65.5586 22.5273 66.2923 22.6185 66.9121 22.8008C67.5365 22.9831 68.015 23.2497 68.3477 23.6006C68.6849 23.9515 68.8535 24.3685 68.8535 24.8516C68.8535 25.3438 68.6849 25.7653 68.3477 26.1162C68.015 26.4717 67.5387 26.7406 66.9189 26.9229C66.2992 27.1097 65.5632 27.2031 64.7109 27.2031C63.8542 27.2031 63.1113 27.1097 62.4824 26.9229C61.8535 26.7406 61.3704 26.4717 61.0332 26.1162C60.696 25.7653 60.5273 25.3438 60.5273 24.8516ZM62.0449 24.8516C62.0449 25.2298 62.2751 25.5169 62.7354 25.7129C63.1956 25.9043 63.8542 26 64.7109 26C65.5632 26 66.2148 25.9043 66.666 25.7129C67.1217 25.5169 67.3496 25.2298 67.3496 24.8516C67.3496 24.487 67.1195 24.2067 66.6592 24.0107C66.2035 23.8148 65.554 23.7168 64.7109 23.7168C63.8633 23.7168 63.207 23.8171 62.7422 24.0176C62.2773 24.2135 62.0449 24.4915 62.0449 24.8516ZM67.2129 14.8574H68.7305V17.8652H70.4531V19.123H68.7305V22.2539H67.2129V14.8574ZM82.4477 21.9258H77.5531V23.1152H81.0805V27.0664H72.5082V23.1152H76.0492V21.9258H71.182V20.709H82.4477V21.9258ZM72.1937 15.2266H81.4086V16.4434H79.7133V18.5625H81.3402V19.793H72.2621V18.5625H73.8891V16.4434H72.1937V15.2266ZM79.6039 25.8359V24.291H74.0121V25.8359H79.6039ZM78.182 18.5625V16.4434H75.4066V18.5625H78.182ZM98.0969 25.7266H86.8039V24.4824H91.6711V22.0762H88.048V15.6777H89.5656V17.7012H95.2941V15.6777H96.8117V22.0762H93.175V24.4824H98.0969V25.7266ZM95.2941 20.8457V18.918H89.5656V20.8457H95.2941ZM109.326 27.2168H107.795V14.8574H109.326V27.2168ZM99.0855 23.8125C100.681 23.056 101.877 22.1514 102.674 21.0986C103.476 20.0459 103.948 18.804 104.089 17.373H99.7145V16.1699H105.634C105.634 18.1341 105.19 19.8568 104.301 21.3379C103.413 22.819 101.938 24.0495 99.8785 25.0293L99.0855 23.8125Z" fill="#252626" fill-opacity="0.4"/>\n    <g clip-path="url(#clip0_1796_20194)">\n    <path d="M119.01 33.3988V27.4923H121.453C121.696 27.4892 121.937 27.5447 122.154 27.654C122.364 27.7587 122.551 27.9033 122.706 28.0796C122.862 28.2543 122.985 28.4553 123.07 28.6732C123.153 28.8882 123.197 29.1169 123.197 29.3477C123.198 29.587 123.157 29.8247 123.076 30.0498C123.001 30.2689 122.884 30.4712 122.732 30.6456C122.584 30.822 122.402 30.9668 122.196 31.0711C121.981 31.1792 121.743 31.2339 121.502 31.2307H119.59V33.4095L119.01 33.3988ZM119.583 30.703H121.47C121.633 30.7053 121.794 30.6673 121.939 30.5924C122.078 30.5171 122.201 30.4152 122.301 30.2924C122.402 30.1649 122.48 30.021 122.532 29.8668C122.588 29.7023 122.616 29.5298 122.615 29.3562C122.615 29.0076 122.49 28.6707 122.262 28.4072C122.155 28.2869 122.025 28.1892 121.88 28.12C121.736 28.0517 121.578 28.0161 121.419 28.0157H119.583V30.703Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M123.828 27.3262H124.393V32.4178C124.389 32.4866 124.399 32.5556 124.422 32.6207C124.445 32.6857 124.48 32.7455 124.527 32.7965C124.576 32.844 124.635 32.8806 124.7 32.904C124.764 32.9275 124.832 32.9372 124.901 32.9327C124.972 32.9309 125.043 32.9231 125.113 32.9093C125.193 32.8929 125.271 32.8702 125.347 32.8412L125.447 33.2986C125.322 33.3485 125.192 33.3848 125.06 33.4071C124.93 33.4328 124.798 33.447 124.665 33.4497C124.554 33.457 124.442 33.4419 124.337 33.4054C124.231 33.3689 124.134 33.3116 124.051 33.2369C123.973 33.1548 123.913 33.0574 123.874 32.9509C123.835 32.8444 123.819 32.7309 123.826 32.6178L123.828 27.3262Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M126.09 28.1581V27.3262H126.659V28.1581H126.09ZM126.09 33.3986V29.0645H126.659V33.3986H126.09Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M127.295 31.2205C127.294 30.9246 127.347 30.631 127.452 30.3546C127.553 30.0908 127.705 29.8494 127.899 29.6439C128.092 29.4399 128.325 29.277 128.583 29.1652C128.861 29.046 129.161 28.9866 129.464 28.9907C129.837 28.9826 130.205 29.0792 130.526 29.2694C130.825 29.4473 131.065 29.7092 131.217 30.0226L130.669 30.1971C130.551 29.9799 130.375 29.7995 130.161 29.6758C129.957 29.5624 129.73 29.4985 129.497 29.4892C129.264 29.48 129.033 29.5257 128.821 29.6226C128.632 29.7089 128.462 29.8319 128.321 29.9843C128.176 30.1421 128.063 30.3273 127.99 30.529C127.907 30.7501 127.866 30.9845 127.869 31.2205C127.866 31.4562 127.909 31.6902 127.994 31.9099C128.071 32.1171 128.186 32.3078 128.334 32.4716C128.475 32.6279 128.646 32.7551 128.835 32.8461C129.026 32.9379 129.235 32.9852 129.447 32.9844C129.586 32.9847 129.724 32.9647 129.857 32.9248C129.99 32.8885 130.117 32.8341 130.235 32.7631C130.346 32.699 130.447 32.6195 130.535 32.527C130.613 32.4467 130.673 32.35 130.709 32.244L131.257 32.4099C131.196 32.5669 131.106 32.7112 130.992 32.8355C130.872 32.969 130.734 33.0844 130.582 33.178C130.418 33.2775 130.242 33.3535 130.057 33.4036C129.864 33.4567 129.664 33.4831 129.464 33.4823C129.172 33.4857 128.882 33.4281 128.613 33.3131C128.344 33.198 128.102 33.0281 127.903 32.8142C127.707 32.6047 127.553 32.36 127.448 32.0929C127.343 31.8144 127.291 31.5184 127.295 31.2205V31.2205Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M134.061 27.4922H135.291L137.441 33.3987H136.047L135.582 32.0774H133.744L133.296 33.3987H131.9L134.061 27.4922ZM135.37 31.1369L134.675 29.0412L133.97 31.1306L135.37 31.1369Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M138.082 33.3988V27.4923H140.742C141.008 27.4896 141.27 27.5493 141.509 27.6667C141.74 27.7793 141.947 27.9345 142.121 28.1242C142.292 28.3112 142.428 28.5274 142.522 28.7625C142.618 28.9917 142.668 29.2375 142.669 29.4859C142.669 29.6646 142.646 29.8425 142.603 30.0157C142.559 30.1825 142.495 30.3432 142.412 30.4945C142.33 30.642 142.227 30.7773 142.108 30.8966C141.988 31.0167 141.853 31.1192 141.704 31.2009L143 33.3967H141.464L140.334 31.4924H139.446V33.3967L138.082 33.3988ZM139.446 30.3051H140.691C140.775 30.3048 140.858 30.2836 140.932 30.2435C141.006 30.2034 141.069 30.1457 141.116 30.0753C141.237 29.9042 141.298 29.6977 141.29 29.4881C141.301 29.2758 141.23 29.0674 141.09 28.9072C141.038 28.8439 140.974 28.7923 140.9 28.7556C140.827 28.719 140.747 28.6981 140.665 28.6944H139.461L139.446 30.3051Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M122.748 11.7538C122.783 11.8167 122.834 11.8692 122.896 11.9057C122.958 11.9422 123.029 11.9614 123.101 11.9614C123.173 11.9614 123.243 11.9422 123.305 11.9057C123.367 11.8692 123.418 11.8167 123.453 11.7538L124.516 9.83888L125.455 11.5602C125.51 11.6478 125.596 11.711 125.696 11.7369C125.797 11.7628 125.903 11.7493 125.994 11.6993C126.084 11.6493 126.152 11.5665 126.184 11.4679C126.216 11.3693 126.209 11.2623 126.164 11.1687L125.178 9.36228H127.785C127.855 9.3623 127.924 9.34403 127.986 9.30925C128.047 9.27447 128.098 9.22438 128.134 9.16388C128.17 9.10338 128.189 9.03456 128.191 8.96415C128.192 8.89375 128.175 8.82418 128.142 8.76227C128.108 8.69775 128.057 8.64382 127.994 8.60631C127.932 8.56881 127.86 8.54916 127.787 8.5495H124.813L124.796 8.51758L124.777 8.5495H124.314L124.082 8.97504L124.065 9.00482L122.752 11.3666C122.719 11.4271 122.701 11.4952 122.701 11.5645C122.701 11.6337 122.719 11.7018 122.752 11.7623L122.748 11.7538Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M127.783 24.231H125.183L126.168 22.4224C126.194 22.3758 126.21 22.3245 126.216 22.2716C126.221 22.2187 126.217 22.1652 126.202 22.1141C126.187 22.0631 126.162 22.0154 126.129 21.974C126.096 21.9325 126.055 21.898 126.008 21.8724C125.961 21.8468 125.91 21.8307 125.857 21.825C125.805 21.8192 125.751 21.8239 125.7 21.8388C125.649 21.8537 125.602 21.8786 125.56 21.9119C125.519 21.9452 125.484 21.9864 125.459 22.0331L124.52 23.7544L123.458 21.8394C123.423 21.7765 123.371 21.7241 123.309 21.6876C123.247 21.6511 123.177 21.6318 123.105 21.6318C123.033 21.6318 122.962 21.6511 122.9 21.6876C122.838 21.7241 122.787 21.7765 122.752 21.8394V21.8394C122.719 21.9 122.701 21.9681 122.701 22.0373C122.701 22.1065 122.719 22.1746 122.752 22.2352L124.065 24.5969L124.082 24.6267L124.314 25.0523H124.777L124.796 25.0821L124.811 25.0523H127.785C127.858 25.0519 127.929 25.032 127.992 24.9945C128.054 24.9571 128.105 24.9036 128.14 24.8395C128.175 24.7773 128.194 24.7069 128.194 24.6352C128.193 24.5636 128.174 24.4933 128.138 24.4315C128.101 24.3697 128.05 24.3186 127.987 24.2834C127.925 24.2482 127.854 24.2301 127.783 24.231V24.231Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M131.793 16.3779H128.944L127.812 14.3013C127.761 14.2071 127.674 14.1372 127.571 14.1071C127.468 14.0769 127.357 14.089 127.263 14.1407C127.169 14.1923 127.099 14.2792 127.069 14.3824C127.039 14.4855 127.051 14.5964 127.102 14.6907L128.25 16.795L127.102 18.8993C127.051 18.9935 127.039 19.1044 127.069 19.2075C127.099 19.3107 127.169 19.3976 127.263 19.4493C127.357 19.5009 127.468 19.513 127.571 19.4829C127.674 19.4527 127.761 19.3829 127.812 19.2886L128.951 17.2014H131.793C131.85 17.2054 131.906 17.1978 131.96 17.179C132.013 17.1601 132.062 17.1304 132.104 17.0918C132.145 17.0532 132.178 17.0064 132.201 16.9544C132.223 16.9024 132.235 16.8464 132.235 16.7897C132.235 16.7329 132.223 16.6769 132.201 16.6249C132.178 16.5729 132.145 16.5261 132.104 16.4875C132.062 16.4489 132.013 16.4192 131.96 16.4003C131.906 16.3815 131.85 16.3739 131.793 16.3779V16.3779Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M122.178 14.1477C122.142 14.0848 122.091 14.0325 122.029 13.9961C121.967 13.9596 121.896 13.9404 121.824 13.9404C121.752 13.9404 121.681 13.9596 121.619 13.9961C121.557 14.0325 121.505 14.0848 121.47 14.1477L120.212 16.4094L120 16.8052L120.212 17.201L121.47 19.4648C121.526 19.5526 121.613 19.6158 121.713 19.6414C121.814 19.667 121.92 19.653 122.011 19.6023C122.101 19.5516 122.169 19.4681 122.2 19.3689C122.231 19.2697 122.223 19.1624 122.178 19.0691L120.922 16.7946L122.182 14.5328C122.213 14.4732 122.229 14.4069 122.228 14.3397C122.227 14.2725 122.21 14.2066 122.178 14.1477Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M141.757 16.6179L137.533 8.76453C137.501 8.70087 137.452 8.64728 137.392 8.60972C137.332 8.57216 137.262 8.5521 137.191 8.55176V8.55176C137.12 8.55281 137.051 8.57316 136.991 8.61064C136.93 8.64813 136.881 8.70132 136.849 8.76453L135.555 11.1688C135.536 11.206 135.523 11.2463 135.517 11.288L134.179 8.79432C134.147 8.73098 134.098 8.6776 134.038 8.64006C133.979 8.60252 133.909 8.58228 133.839 8.58155H130.609C130.512 8.58881 130.42 8.63287 130.353 8.70489C130.287 8.77691 130.249 8.87156 130.249 8.96985C130.249 9.06814 130.287 9.16279 130.353 9.23481C130.42 9.30684 130.512 9.3509 130.609 9.35816H133.607L137.346 16.3306H134.977C134.859 16.3386 134.748 16.3913 134.667 16.478C134.586 16.5647 134.541 16.679 134.541 16.7977C134.541 16.9164 134.586 17.0306 134.667 17.1173C134.748 17.204 134.859 17.2567 134.977 17.2647H137.372L133.669 24.2521H130.609C130.506 24.2521 130.407 24.2931 130.335 24.3661C130.262 24.4392 130.221 24.5382 130.221 24.6415C130.221 24.7447 130.262 24.8438 130.335 24.9168C130.407 24.9898 130.506 25.0308 130.609 25.0308H133.905C133.976 25.0302 134.045 25.0101 134.105 24.9726C134.166 24.935 134.215 24.8816 134.247 24.8181L135.581 22.3201C135.588 22.347 135.599 22.3728 135.613 22.3967L136.93 24.7968C136.963 24.8576 137.013 24.9082 137.072 24.9434C137.132 24.9786 137.2 24.997 137.27 24.9968V24.9968C137.34 24.9961 137.41 24.9758 137.469 24.9383C137.529 24.9007 137.578 24.8474 137.61 24.784L141.761 16.9775C141.789 16.9216 141.803 16.8598 141.803 16.7972C141.802 16.7346 141.786 16.6731 141.757 16.6179Z" fill="#252626" fill-opacity="0.4"/>\n    </g>\n    <defs>\n    <clipPath id="clip0_1796_20194">\n    <rect width="24" height="24.9686" fill="white" transform="translate(119 8.51562)"/>\n    </clipPath>\n    </defs>\n    </svg>\n    ',
  },
  tertiary: {
    enable:
      '<svg width="167" height="42" viewBox="0 0 167 42" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <title>PlicAR AR run button</title>\n    <path d="M26.4809 26L27.3012 23.5527H31.0268L31.8539 26H33.7543L30.2543 16.1016H28.0668L24.5805 26H26.4809ZM27.7797 22.1172L29.1195 18.125H29.2016L30.5482 22.1172H27.7797ZM35.0301 26H36.8074V22.377H38.6668L40.6082 26H42.5906L40.451 22.0762C41.6131 21.6045 42.2283 20.6064 42.2352 19.2598C42.2283 17.373 41.0184 16.1016 38.7488 16.1016H35.0301V26ZM36.8074 20.8867V17.5918H38.4754C39.8152 17.5918 40.4168 18.207 40.4168 19.2598C40.4168 20.3193 39.8152 20.8936 38.4754 20.8867H36.8074ZM54.6535 24.5234H49.7316V22.5137H53.6008V21.2695H46.218V19.6699H53.3137V15.7051H44.673V16.9355H51.8098V18.4668H44.7004V22.5137H48.2277V24.5234H43.3605V25.7812H54.6535V24.5234ZM63.3574 16.8262V15.5137H61.8398V16.6895C61.833 18.4531 60.835 20.1006 58.8457 20.791L59.666 21.9805C61.0879 21.4814 62.0859 20.4492 62.6191 19.1367C63.1592 20.2852 64.1162 21.1875 65.4492 21.6387L66.2695 20.4492C64.3623 19.8477 63.3574 18.3779 63.3574 16.8262ZM60.5273 24.8516C60.5273 26.3486 62.1338 27.2031 64.7109 27.2031C67.2676 27.2031 68.8467 26.3486 68.8535 24.8516C68.8467 23.3887 67.2676 22.5205 64.7109 22.5273C62.1338 22.5205 60.5273 23.3887 60.5273 24.8516ZM62.0449 24.8516C62.0449 24.127 63.0156 23.7168 64.7109 23.7168C66.3994 23.7168 67.3496 24.127 67.3496 24.8516C67.3496 25.6172 66.3994 26 64.7109 26C63.0156 26 62.0449 25.6172 62.0449 24.8516ZM67.2129 22.2539H68.7305V19.123H70.4531V17.8652H68.7305V14.8574H67.2129V22.2539ZM82.4477 20.709H71.182V21.9258H76.0492V23.1152H72.5082V27.0664H81.0805V23.1152H77.5531V21.9258H82.4477V20.709ZM72.1937 16.4434H73.8891V18.5625H72.2621V19.793H81.3402V18.5625H79.7133V16.4434H81.4086V15.2266H72.1937V16.4434ZM74.0121 25.8359V24.291H79.6039V25.8359H74.0121ZM75.4066 18.5625V16.4434H78.182V18.5625H75.4066ZM98.0969 24.4824H93.175V22.0762H96.8117V15.6777H95.2941V17.7012H89.5656V15.6777H88.048V22.0762H91.6711V24.4824H86.8039V25.7266H98.0969V24.4824ZM89.5656 20.8457V18.918H95.2941V20.8457H89.5656ZM109.326 14.8574H107.795V27.2168H109.326V14.8574ZM99.0855 23.8125L99.8785 25.0293C104.206 22.9717 105.634 19.8477 105.634 16.1699H99.7145V17.373H104.089C103.816 20.1826 102.326 22.2744 99.0855 23.8125Z" fill="#0C0D0D"/>\n    <g clip-path="url(#clip0_2184_24117)">\n    <path d="M119.01 33.3988V27.4923H121.453C121.696 27.4892 121.937 27.5447 122.154 27.654C122.364 27.7587 122.551 27.9033 122.706 28.0796C122.862 28.2543 122.985 28.4553 123.07 28.6732C123.153 28.8882 123.197 29.1169 123.197 29.3477C123.198 29.587 123.157 29.8247 123.076 30.0498C123.001 30.2689 122.884 30.4712 122.732 30.6456C122.584 30.822 122.402 30.9668 122.196 31.0711C121.981 31.1792 121.743 31.2339 121.502 31.2307H119.59V33.4095L119.01 33.3988ZM119.583 30.703H121.47C121.633 30.7053 121.794 30.6673 121.939 30.5924C122.078 30.5171 122.201 30.4152 122.301 30.2924C122.402 30.1649 122.48 30.021 122.532 29.8668C122.588 29.7023 122.616 29.5298 122.615 29.3562C122.615 29.0076 122.49 28.6707 122.262 28.4072C122.155 28.2869 122.025 28.1892 121.88 28.12C121.736 28.0517 121.578 28.0161 121.419 28.0157H119.583V30.703Z" fill="#0C0D0D"/>\n    <path d="M123.828 27.3262H124.393V32.4178C124.389 32.4866 124.399 32.5556 124.422 32.6207C124.445 32.6857 124.48 32.7455 124.527 32.7965C124.576 32.844 124.635 32.8806 124.7 32.904C124.764 32.9275 124.832 32.9372 124.901 32.9327C124.972 32.9309 125.043 32.9231 125.113 32.9093C125.193 32.8929 125.271 32.8702 125.347 32.8412L125.447 33.2986C125.322 33.3485 125.192 33.3848 125.06 33.4071C124.93 33.4328 124.798 33.447 124.665 33.4497C124.554 33.457 124.442 33.4419 124.337 33.4054C124.231 33.3689 124.134 33.3116 124.051 33.2369C123.973 33.1548 123.913 33.0574 123.874 32.9509C123.835 32.8443 123.819 32.7309 123.826 32.6178L123.828 27.3262Z" fill="#0C0D0D"/>\n    <path d="M126.09 28.1581V27.3262H126.659V28.1581H126.09ZM126.09 33.3986V29.0645H126.659V33.3986H126.09Z" fill="#0C0D0D"/>\n    <path d="M127.295 31.2205C127.294 30.9246 127.347 30.631 127.452 30.3546C127.553 30.0908 127.705 29.8494 127.899 29.6439C128.092 29.4399 128.325 29.277 128.583 29.1652C128.861 29.046 129.161 28.9866 129.464 28.9907C129.837 28.9826 130.205 29.0792 130.526 29.2694C130.825 29.4473 131.065 29.7092 131.217 30.0226L130.669 30.1971C130.551 29.9799 130.375 29.7995 130.161 29.6758C129.957 29.5624 129.73 29.4985 129.497 29.4892C129.264 29.48 129.033 29.5257 128.821 29.6226C128.632 29.7089 128.462 29.8319 128.321 29.9843C128.176 30.1421 128.063 30.3273 127.99 30.529C127.907 30.7501 127.866 30.9845 127.869 31.2205C127.866 31.4562 127.909 31.6902 127.994 31.9099C128.071 32.1171 128.186 32.3078 128.334 32.4716C128.475 32.6279 128.646 32.7551 128.835 32.8461C129.026 32.9379 129.235 32.9852 129.447 32.9844C129.586 32.9847 129.724 32.9647 129.857 32.9248C129.99 32.8885 130.117 32.8341 130.235 32.7631C130.346 32.699 130.447 32.6195 130.535 32.527C130.613 32.4467 130.673 32.35 130.709 32.244L131.257 32.4099C131.196 32.5669 131.106 32.7112 130.992 32.8355C130.872 32.969 130.734 33.0844 130.582 33.178C130.418 33.2775 130.242 33.3535 130.057 33.4036C129.864 33.4567 129.664 33.4831 129.464 33.4823C129.172 33.4857 128.882 33.4281 128.613 33.3131C128.344 33.198 128.102 33.0281 127.903 32.8142C127.707 32.6047 127.553 32.36 127.448 32.0929C127.343 31.8144 127.291 31.5184 127.295 31.2205Z" fill="#0C0D0D"/>\n    <path d="M134.061 27.4922H135.291L137.441 33.3987H136.047L135.582 32.0774H133.744L133.296 33.3987H131.9L134.061 27.4922ZM135.37 31.1369L134.675 29.0412L133.97 31.1306L135.37 31.1369Z" fill="#0C0D0D"/>\n    <path d="M138.082 33.3988V27.4923H140.742C141.008 27.4896 141.27 27.5493 141.509 27.6667C141.74 27.7793 141.947 27.9345 142.121 28.1242C142.292 28.3112 142.428 28.5274 142.522 28.7625C142.618 28.9917 142.668 29.2375 142.669 29.4859C142.669 29.6646 142.646 29.8425 142.603 30.0157C142.559 30.1825 142.495 30.3432 142.412 30.4945C142.33 30.642 142.227 30.7773 142.108 30.8966C141.988 31.0167 141.853 31.1192 141.704 31.2009L143 33.3967H141.464L140.334 31.4924H139.446V33.3967L138.082 33.3988ZM139.446 30.3051H140.691C140.775 30.3048 140.858 30.2836 140.932 30.2435C141.006 30.2034 141.069 30.1457 141.116 30.0753C141.237 29.9042 141.298 29.6977 141.29 29.4881C141.301 29.2758 141.23 29.0674 141.09 28.9072C141.038 28.8439 140.974 28.7923 140.9 28.7556C140.827 28.719 140.747 28.6981 140.665 28.6944H139.461L139.446 30.3051Z" fill="#0C0D0D"/>\n    <path d="M122.748 11.7538C122.783 11.8167 122.834 11.8692 122.896 11.9057C122.958 11.9422 123.029 11.9614 123.101 11.9614C123.173 11.9614 123.243 11.9422 123.305 11.9057C123.367 11.8692 123.418 11.8167 123.453 11.7538L124.516 9.83888L125.455 11.5602C125.51 11.6478 125.596 11.711 125.696 11.7369C125.797 11.7628 125.903 11.7493 125.994 11.6993C126.084 11.6493 126.152 11.5665 126.184 11.4679C126.216 11.3693 126.209 11.2623 126.164 11.1687L125.178 9.36228H127.785C127.855 9.3623 127.924 9.34403 127.986 9.30925C128.047 9.27447 128.098 9.22438 128.134 9.16388C128.17 9.10338 128.189 9.03456 128.191 8.96415C128.192 8.89375 128.175 8.82418 128.142 8.76227C128.108 8.69775 128.057 8.64382 127.994 8.60631C127.932 8.56881 127.86 8.54916 127.787 8.5495H124.813L124.796 8.51758L124.777 8.5495H124.314L124.082 8.97504L124.065 9.00482L122.752 11.3666C122.719 11.4271 122.701 11.4952 122.701 11.5645C122.701 11.6337 122.719 11.7018 122.752 11.7623L122.748 11.7538Z" fill="#0C0D0D"/>\n    <path d="M127.783 24.231H125.183L126.168 22.4224C126.194 22.3758 126.21 22.3245 126.216 22.2716C126.221 22.2187 126.217 22.1652 126.202 22.1141C126.187 22.0631 126.162 22.0154 126.129 21.974C126.096 21.9325 126.055 21.898 126.008 21.8724C125.961 21.8468 125.91 21.8307 125.857 21.825C125.805 21.8192 125.751 21.8239 125.7 21.8388C125.649 21.8537 125.602 21.8786 125.56 21.9119C125.519 21.9452 125.484 21.9864 125.459 22.0331L124.52 23.7544L123.458 21.8394C123.423 21.7765 123.371 21.7241 123.309 21.6876C123.247 21.6511 123.177 21.6318 123.105 21.6318C123.033 21.6318 122.962 21.6511 122.9 21.6876C122.838 21.7241 122.787 21.7765 122.752 21.8394C122.719 21.9 122.701 21.9681 122.701 22.0373C122.701 22.1065 122.719 22.1746 122.752 22.2352L124.065 24.5969L124.082 24.6267L124.314 25.0523H124.777L124.796 25.0821L124.811 25.0523H127.785C127.858 25.0519 127.929 25.032 127.992 24.9945C128.054 24.9571 128.105 24.9036 128.14 24.8395C128.175 24.7773 128.194 24.7069 128.194 24.6352C128.193 24.5636 128.174 24.4933 128.138 24.4315C128.101 24.3697 128.05 24.3186 127.987 24.2834C127.925 24.2482 127.854 24.2301 127.783 24.231Z" fill="#0C0D0D"/>\n    <path d="M131.793 16.3779H128.944L127.812 14.3013C127.761 14.2071 127.674 14.1372 127.571 14.1071C127.468 14.0769 127.357 14.089 127.263 14.1407C127.169 14.1923 127.099 14.2792 127.069 14.3824C127.039 14.4855 127.051 14.5964 127.102 14.6907L128.25 16.795L127.102 18.8993C127.051 18.9935 127.039 19.1044 127.069 19.2075C127.099 19.3107 127.169 19.3976 127.263 19.4493C127.357 19.5009 127.468 19.513 127.571 19.4829C127.674 19.4527 127.761 19.3829 127.812 19.2886L128.951 17.2014H131.793C131.85 17.2054 131.906 17.1978 131.96 17.179C132.013 17.1601 132.062 17.1304 132.104 17.0918C132.145 17.0532 132.178 17.0064 132.201 16.9544C132.223 16.9024 132.235 16.8464 132.235 16.7897C132.235 16.7329 132.223 16.6769 132.201 16.6249C132.178 16.5729 132.145 16.5261 132.104 16.4875C132.062 16.4489 132.013 16.4192 131.96 16.4003C131.906 16.3815 131.85 16.3739 131.793 16.3779Z" fill="#0C0D0D"/>\n    <path d="M122.178 14.1477C122.142 14.0848 122.091 14.0325 122.029 13.9961C121.967 13.9596 121.896 13.9404 121.824 13.9404C121.752 13.9404 121.681 13.9596 121.619 13.9961C121.557 14.0325 121.505 14.0848 121.47 14.1477L120.212 16.4094L120 16.8052L120.212 17.201L121.47 19.4648C121.526 19.5526 121.613 19.6158 121.713 19.6414C121.814 19.667 121.92 19.653 122.011 19.6023C122.101 19.5516 122.169 19.4681 122.2 19.3689C122.231 19.2697 122.223 19.1624 122.178 19.0691L120.922 16.7946L122.182 14.5328C122.213 14.4732 122.229 14.4069 122.228 14.3397C122.227 14.2725 122.21 14.2066 122.178 14.1477Z" fill="#0C0D0D"/>\n    <path d="M141.757 16.6179L137.533 8.76453C137.501 8.70087 137.452 8.64728 137.392 8.60972C137.332 8.57216 137.262 8.5521 137.191 8.55176C137.12 8.55281 137.051 8.57316 136.991 8.61064C136.93 8.64813 136.881 8.70132 136.849 8.76453L135.555 11.1688C135.536 11.206 135.523 11.2463 135.517 11.288L134.179 8.79432C134.147 8.73098 134.098 8.6776 134.038 8.64006C133.979 8.60252 133.909 8.58228 133.839 8.58155H130.609C130.512 8.58881 130.42 8.63287 130.353 8.70489C130.287 8.77691 130.249 8.87156 130.249 8.96985C130.249 9.06814 130.287 9.16279 130.353 9.23481C130.42 9.30684 130.512 9.3509 130.609 9.35816H133.607L137.346 16.3306H134.977C134.859 16.3386 134.748 16.3913 134.667 16.478C134.586 16.5647 134.541 16.679 134.541 16.7977C134.541 16.9164 134.586 17.0306 134.667 17.1173C134.748 17.204 134.859 17.2567 134.977 17.2647H137.372L133.669 24.2521H130.609C130.506 24.2521 130.407 24.2931 130.335 24.3661C130.262 24.4392 130.221 24.5382 130.221 24.6415C130.221 24.7447 130.262 24.8438 130.335 24.9168C130.407 24.9898 130.506 25.0308 130.609 25.0308H133.905C133.976 25.0302 134.045 25.0101 134.105 24.9726C134.166 24.935 134.215 24.8816 134.247 24.8181L135.581 22.3201C135.588 22.347 135.599 22.3728 135.613 22.3967L136.93 24.7968C136.963 24.8576 137.013 24.9082 137.072 24.9434C137.132 24.9786 137.2 24.997 137.27 24.9968C137.34 24.9961 137.41 24.9758 137.469 24.9383C137.529 24.9007 137.578 24.8474 137.61 24.784L141.761 16.9775C141.789 16.9216 141.803 16.8598 141.803 16.7972C141.802 16.7346 141.786 16.6731 141.757 16.6179Z" fill="#0C0D0D"/>\n    </g>\n    <rect x="0.5" y="0.5" width="166" height="41" rx="7.5" stroke="#C7C8CC"/>\n    <defs>\n    <clipPath id="clip0_2184_24117">\n    <rect width="24" height="24.9686" fill="white" transform="translate(119 8.51562)"/>\n    </clipPath>\n    </defs>\n    </svg>\n    ',
    disable:
      '<svg width="167" height="42" viewBox="0 0 167 42" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <title>PlicAR AR run button</title>\n    <path d="M24.5805 26L28.0668 16.1016H30.2543L33.7543 26H31.8539L31.0268 23.5527H27.3012L26.4809 26H24.5805ZM30.5482 22.1172L29.2016 18.125H29.1195L27.7797 22.1172H30.5482ZM35.0301 16.1016H38.7488C39.4917 16.1016 40.1229 16.2337 40.6424 16.498C41.1665 16.7578 41.5607 17.1247 41.825 17.5986C42.0939 18.0726 42.2306 18.6263 42.2352 19.2598C42.2306 19.9342 42.0756 20.5153 41.7703 21.0029C41.4695 21.486 41.0298 21.8438 40.451 22.0762L42.5906 26H40.6082L38.6668 22.377H36.8074V26H35.0301V16.1016ZM38.4754 20.8867C39.7697 20.8913 40.4168 20.349 40.4168 19.2598C40.4168 18.722 40.2573 18.3096 39.9383 18.0225C39.6193 17.7354 39.1316 17.5918 38.4754 17.5918H36.8074V20.8867H38.4754ZM54.6535 25.7812H43.3605V24.5234H48.2277V22.5137H44.7004V18.4668H51.8098V16.9355H44.673V15.7051H53.3137V19.6699H46.218V21.2695H53.6008V22.5137H49.7316V24.5234H54.6535V25.7812ZM63.3574 16.8262C63.3574 17.3503 63.4691 17.8516 63.6924 18.3301C63.9157 18.8086 64.2461 19.2324 64.6836 19.6016C65.1211 19.9707 65.6497 20.2533 66.2695 20.4492L65.4492 21.6387C64.793 21.4154 64.2256 21.0895 63.7471 20.6611C63.2731 20.2327 62.8971 19.7246 62.6191 19.1367C62.3457 19.8066 61.9583 20.3877 61.457 20.8799C60.9603 21.3675 60.3633 21.7344 59.666 21.9805L58.8457 20.791C59.4928 20.5677 60.0397 20.2487 60.4863 19.834C60.9329 19.4147 61.2679 18.9362 61.4912 18.3984C61.7191 17.8561 61.8353 17.2865 61.8398 16.6895V15.5137H63.3574V16.8262ZM60.5273 24.8516C60.5273 24.3685 60.696 23.9515 61.0332 23.6006C61.3704 23.2497 61.8535 22.9831 62.4824 22.8008C63.1113 22.6185 63.8542 22.5273 64.7109 22.5273C65.5586 22.5273 66.2923 22.6185 66.9121 22.8008C67.5365 22.9831 68.015 23.2497 68.3477 23.6006C68.6849 23.9515 68.8535 24.3685 68.8535 24.8516C68.8535 25.3438 68.6849 25.7653 68.3477 26.1162C68.015 26.4717 67.5387 26.7406 66.9189 26.9229C66.2992 27.1097 65.5632 27.2031 64.7109 27.2031C63.8542 27.2031 63.1113 27.1097 62.4824 26.9229C61.8535 26.7406 61.3704 26.4717 61.0332 26.1162C60.696 25.7653 60.5273 25.3438 60.5273 24.8516ZM62.0449 24.8516C62.0449 25.2298 62.2751 25.5169 62.7354 25.7129C63.1956 25.9043 63.8542 26 64.7109 26C65.5632 26 66.2148 25.9043 66.666 25.7129C67.1217 25.5169 67.3496 25.2298 67.3496 24.8516C67.3496 24.487 67.1195 24.2067 66.6592 24.0107C66.2035 23.8148 65.554 23.7168 64.7109 23.7168C63.8633 23.7168 63.207 23.8171 62.7422 24.0176C62.2773 24.2135 62.0449 24.4915 62.0449 24.8516ZM67.2129 14.8574H68.7305V17.8652H70.4531V19.123H68.7305V22.2539H67.2129V14.8574ZM82.4477 21.9258H77.5531V23.1152H81.0805V27.0664H72.5082V23.1152H76.0492V21.9258H71.182V20.709H82.4477V21.9258ZM72.1937 15.2266H81.4086V16.4434H79.7133V18.5625H81.3402V19.793H72.2621V18.5625H73.8891V16.4434H72.1937V15.2266ZM79.6039 25.8359V24.291H74.0121V25.8359H79.6039ZM78.182 18.5625V16.4434H75.4066V18.5625H78.182ZM98.0969 25.7266H86.8039V24.4824H91.6711V22.0762H88.048V15.6777H89.5656V17.7012H95.2941V15.6777H96.8117V22.0762H93.175V24.4824H98.0969V25.7266ZM95.2941 20.8457V18.918H89.5656V20.8457H95.2941ZM109.326 27.2168H107.795V14.8574H109.326V27.2168ZM99.0855 23.8125C100.681 23.056 101.877 22.1514 102.674 21.0986C103.476 20.0459 103.948 18.804 104.089 17.373H99.7145V16.1699H105.634C105.634 18.1341 105.19 19.8568 104.301 21.3379C103.413 22.819 101.938 24.0495 99.8785 25.0293L99.0855 23.8125Z" fill="#252626" fill-opacity="0.4"/>\n    <g clip-path="url(#clip0_1796_20199)">\n    <path d="M119.01 33.3988V27.4923H121.453C121.696 27.4892 121.937 27.5447 122.154 27.654C122.364 27.7587 122.551 27.9033 122.706 28.0796C122.862 28.2543 122.985 28.4553 123.07 28.6732C123.153 28.8882 123.197 29.1169 123.197 29.3477C123.198 29.587 123.157 29.8247 123.076 30.0498C123.001 30.2689 122.884 30.4712 122.732 30.6456C122.584 30.822 122.402 30.9668 122.196 31.0711C121.981 31.1792 121.743 31.2339 121.502 31.2307H119.59V33.4095L119.01 33.3988ZM119.583 30.703H121.47C121.633 30.7053 121.794 30.6673 121.939 30.5924C122.078 30.5171 122.201 30.4152 122.301 30.2924C122.402 30.1649 122.48 30.021 122.532 29.8668C122.588 29.7023 122.616 29.5298 122.615 29.3562C122.615 29.0076 122.49 28.6707 122.262 28.4072C122.155 28.2869 122.025 28.1892 121.88 28.12C121.736 28.0517 121.578 28.0161 121.419 28.0157H119.583V30.703Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M123.828 27.3262H124.393V32.4178C124.389 32.4866 124.399 32.5556 124.422 32.6207C124.445 32.6857 124.48 32.7455 124.527 32.7965C124.576 32.844 124.635 32.8806 124.7 32.904C124.764 32.9275 124.832 32.9372 124.901 32.9327C124.972 32.9309 125.043 32.9231 125.113 32.9093C125.193 32.8929 125.271 32.8702 125.347 32.8412L125.447 33.2986C125.322 33.3485 125.192 33.3848 125.06 33.4071C124.93 33.4328 124.798 33.447 124.665 33.4497C124.554 33.457 124.442 33.4419 124.337 33.4054C124.231 33.3689 124.134 33.3116 124.051 33.2369C123.973 33.1548 123.913 33.0574 123.874 32.9509C123.835 32.8443 123.819 32.7309 123.826 32.6178L123.828 27.3262Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M126.09 28.1581V27.3262H126.659V28.1581H126.09ZM126.09 33.3986V29.0645H126.659V33.3986H126.09Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M127.295 31.2205C127.294 30.9246 127.347 30.631 127.452 30.3546C127.553 30.0908 127.705 29.8494 127.899 29.6439C128.092 29.4399 128.325 29.277 128.583 29.1652C128.861 29.046 129.161 28.9866 129.464 28.9907C129.837 28.9826 130.205 29.0792 130.526 29.2694C130.825 29.4473 131.065 29.7092 131.217 30.0226L130.669 30.1971C130.551 29.9799 130.375 29.7995 130.161 29.6758C129.957 29.5624 129.73 29.4985 129.497 29.4892C129.264 29.48 129.033 29.5257 128.821 29.6226C128.632 29.7089 128.462 29.8319 128.321 29.9843C128.176 30.1421 128.063 30.3273 127.99 30.529C127.907 30.7501 127.866 30.9845 127.869 31.2205C127.866 31.4562 127.909 31.6902 127.994 31.9099C128.071 32.1171 128.186 32.3078 128.334 32.4716C128.475 32.6279 128.646 32.7551 128.835 32.8461C129.026 32.9379 129.235 32.9852 129.447 32.9844C129.586 32.9847 129.724 32.9647 129.857 32.9248C129.99 32.8885 130.117 32.8341 130.235 32.7631C130.346 32.699 130.447 32.6195 130.535 32.527C130.613 32.4467 130.673 32.35 130.709 32.244L131.257 32.4099C131.196 32.5669 131.106 32.7112 130.992 32.8355C130.872 32.969 130.734 33.0844 130.582 33.178C130.418 33.2775 130.242 33.3535 130.057 33.4036C129.864 33.4567 129.664 33.4831 129.464 33.4823C129.172 33.4857 128.882 33.4281 128.613 33.3131C128.344 33.198 128.102 33.0281 127.903 32.8142C127.707 32.6047 127.553 32.36 127.448 32.0929C127.343 31.8144 127.291 31.5184 127.295 31.2205Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M134.061 27.4922H135.291L137.441 33.3987H136.047L135.582 32.0774H133.744L133.296 33.3987H131.9L134.061 27.4922ZM135.37 31.1369L134.675 29.0412L133.97 31.1306L135.37 31.1369Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M138.082 33.3988V27.4923H140.742C141.008 27.4896 141.27 27.5493 141.509 27.6667C141.74 27.7793 141.947 27.9345 142.121 28.1242C142.292 28.3112 142.428 28.5274 142.522 28.7625C142.618 28.9917 142.668 29.2375 142.669 29.4859C142.669 29.6646 142.646 29.8425 142.603 30.0157C142.559 30.1825 142.495 30.3432 142.412 30.4945C142.33 30.642 142.227 30.7773 142.108 30.8966C141.988 31.0167 141.853 31.1192 141.704 31.2009L143 33.3967H141.464L140.334 31.4924H139.446V33.3967L138.082 33.3988ZM139.446 30.3051H140.691C140.775 30.3048 140.858 30.2836 140.932 30.2435C141.006 30.2034 141.069 30.1457 141.116 30.0753C141.237 29.9042 141.298 29.6977 141.29 29.4881C141.301 29.2758 141.23 29.0674 141.09 28.9072C141.038 28.8439 140.974 28.7923 140.9 28.7556C140.827 28.719 140.747 28.6981 140.665 28.6944H139.461L139.446 30.3051Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M122.748 11.7538C122.783 11.8167 122.834 11.8692 122.896 11.9057C122.958 11.9422 123.029 11.9614 123.101 11.9614C123.173 11.9614 123.243 11.9422 123.305 11.9057C123.367 11.8692 123.418 11.8167 123.453 11.7538L124.516 9.83888L125.455 11.5602C125.51 11.6478 125.596 11.711 125.696 11.7369C125.797 11.7628 125.903 11.7493 125.994 11.6993C126.084 11.6493 126.152 11.5665 126.184 11.4679C126.216 11.3693 126.209 11.2623 126.164 11.1687L125.178 9.36228H127.785C127.855 9.3623 127.924 9.34403 127.986 9.30925C128.047 9.27447 128.098 9.22438 128.134 9.16388C128.17 9.10338 128.189 9.03456 128.191 8.96415C128.192 8.89375 128.175 8.82418 128.142 8.76227C128.108 8.69775 128.057 8.64382 127.994 8.60631C127.932 8.56881 127.86 8.54916 127.787 8.5495H124.813L124.796 8.51758L124.777 8.5495H124.314L124.082 8.97504L124.065 9.00482L122.752 11.3666C122.719 11.4271 122.701 11.4952 122.701 11.5645C122.701 11.6337 122.719 11.7018 122.752 11.7623L122.748 11.7538Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M127.783 24.231H125.183L126.168 22.4224C126.194 22.3758 126.21 22.3245 126.216 22.2716C126.221 22.2187 126.217 22.1652 126.202 22.1141C126.187 22.0631 126.162 22.0154 126.129 21.974C126.096 21.9325 126.055 21.898 126.008 21.8724C125.961 21.8468 125.91 21.8307 125.857 21.825C125.805 21.8192 125.751 21.8239 125.7 21.8388C125.649 21.8537 125.602 21.8786 125.56 21.9119C125.519 21.9452 125.484 21.9864 125.459 22.0331L124.52 23.7544L123.458 21.8394C123.423 21.7765 123.371 21.7241 123.309 21.6876C123.247 21.6511 123.177 21.6318 123.105 21.6318C123.033 21.6318 122.962 21.6511 122.9 21.6876C122.838 21.7241 122.787 21.7765 122.752 21.8394C122.719 21.9 122.701 21.9681 122.701 22.0373C122.701 22.1065 122.719 22.1746 122.752 22.2352L124.065 24.5969L124.082 24.6267L124.314 25.0523H124.777L124.796 25.0821L124.811 25.0523H127.785C127.858 25.0519 127.929 25.032 127.992 24.9945C128.054 24.9571 128.105 24.9036 128.14 24.8395C128.175 24.7773 128.194 24.7069 128.194 24.6352C128.193 24.5636 128.174 24.4933 128.138 24.4315C128.101 24.3697 128.05 24.3186 127.987 24.2834C127.925 24.2482 127.854 24.2301 127.783 24.231Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M131.793 16.3779H128.944L127.812 14.3013C127.761 14.2071 127.674 14.1372 127.571 14.1071C127.468 14.0769 127.357 14.089 127.263 14.1407C127.169 14.1923 127.099 14.2792 127.069 14.3824C127.039 14.4855 127.051 14.5964 127.102 14.6907L128.25 16.795L127.102 18.8993C127.051 18.9935 127.039 19.1044 127.069 19.2075C127.099 19.3107 127.169 19.3976 127.263 19.4493C127.357 19.5009 127.468 19.513 127.571 19.4829C127.674 19.4527 127.761 19.3829 127.812 19.2886L128.951 17.2014H131.793C131.85 17.2054 131.906 17.1978 131.96 17.179C132.013 17.1601 132.062 17.1304 132.104 17.0918C132.145 17.0532 132.178 17.0064 132.201 16.9544C132.223 16.9024 132.235 16.8464 132.235 16.7897C132.235 16.7329 132.223 16.6769 132.201 16.6249C132.178 16.5729 132.145 16.5261 132.104 16.4875C132.062 16.4489 132.013 16.4192 131.96 16.4003C131.906 16.3815 131.85 16.3739 131.793 16.3779Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M122.178 14.1477C122.142 14.0848 122.091 14.0325 122.029 13.9961C121.967 13.9596 121.896 13.9404 121.824 13.9404C121.752 13.9404 121.681 13.9596 121.619 13.9961C121.557 14.0325 121.505 14.0848 121.47 14.1477L120.212 16.4094L120 16.8052L120.212 17.201L121.47 19.4648C121.526 19.5526 121.613 19.6158 121.713 19.6414C121.814 19.667 121.92 19.653 122.011 19.6023C122.101 19.5516 122.169 19.4681 122.2 19.3689C122.231 19.2697 122.223 19.1624 122.178 19.0691L120.922 16.7946L122.182 14.5328C122.213 14.4732 122.229 14.4069 122.228 14.3397C122.227 14.2725 122.21 14.2066 122.178 14.1477Z" fill="#252626" fill-opacity="0.4"/>\n    <path d="M141.757 16.6179L137.533 8.76453C137.501 8.70087 137.452 8.64728 137.392 8.60972C137.332 8.57216 137.262 8.5521 137.191 8.55176C137.12 8.55281 137.051 8.57316 136.991 8.61064C136.93 8.64813 136.881 8.70132 136.849 8.76453L135.555 11.1688C135.536 11.206 135.523 11.2463 135.517 11.288L134.179 8.79432C134.147 8.73098 134.098 8.6776 134.038 8.64006C133.979 8.60252 133.909 8.58228 133.839 8.58155H130.609C130.512 8.58881 130.42 8.63287 130.353 8.70489C130.287 8.77691 130.249 8.87156 130.249 8.96985C130.249 9.06814 130.287 9.16279 130.353 9.23481C130.42 9.30684 130.512 9.3509 130.609 9.35816H133.607L137.346 16.3306H134.977C134.859 16.3386 134.748 16.3913 134.667 16.478C134.586 16.5647 134.541 16.679 134.541 16.7977C134.541 16.9164 134.586 17.0306 134.667 17.1173C134.748 17.204 134.859 17.2567 134.977 17.2647H137.372L133.669 24.2521H130.609C130.506 24.2521 130.407 24.2931 130.335 24.3661C130.262 24.4392 130.221 24.5382 130.221 24.6415C130.221 24.7447 130.262 24.8438 130.335 24.9168C130.407 24.9898 130.506 25.0308 130.609 25.0308H133.905C133.976 25.0302 134.045 25.0101 134.105 24.9726C134.166 24.935 134.215 24.8816 134.247 24.8181L135.581 22.3201C135.588 22.347 135.599 22.3728 135.613 22.3967L136.93 24.7968C136.963 24.8576 137.013 24.9082 137.072 24.9434C137.132 24.9786 137.2 24.997 137.27 24.9968C137.34 24.9961 137.41 24.9758 137.469 24.9383C137.529 24.9007 137.578 24.8474 137.61 24.784L141.761 16.9775C141.789 16.9216 141.803 16.8598 141.803 16.7972C141.802 16.7346 141.786 16.6731 141.757 16.6179Z" fill="#252626" fill-opacity="0.4"/>\n    </g>\n    <rect x="0.5" y="0.5" width="166" height="41" rx="7.5" stroke="#C7C8CC" stroke-opacity="0.4"/>\n    <defs>\n    <clipPath id="clip0_1796_20199">\n    <rect width="24" height="24.9686" fill="white" transform="translate(119 8.51562)"/>\n    </clipPath>\n    </defs>\n    </svg>\n    ',
  },
};

var PlicarZeroButton = (function (_HTMLElement) {
  _inherits(PlicarZeroButton, _HTMLElement);

  var _super = _createSuper(PlicarZeroButton);

  function PlicarZeroButton() {
    var _this;

    _classCallCheck(this, PlicarZeroButton);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "viewerUid", "");

    _defineProperty(_assertThisInitialized(_this), "IS_connectedCallback_CALLED", false);

    _defineProperty(_assertThisInitialized(_this), "IS_QR_MODAL_ACTIVE", false);

    _defineProperty(_assertThisInitialized(_this), "activateARBind", function () {});

    _this.attachShadow({
      mode: "open",
    });

    return _this;
  }

  _createClass(PlicarZeroButton, [
    {
      key: "connectedCallback",
      value: (function () {
        var _connectedCallback = _asyncToGenerator(
          _regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      this.IS_connectedCallback_CALLED = true;
                      this.plicarButtonInit();
                      this.loadAmplitude();
                      _context.next = 5;
                      return this.handleViewerIdChange();

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );

        function connectedCallback() {
          return _connectedCallback.apply(this, arguments);
        }

        return connectedCallback;
      })(),
    },
    {
      key: "disconnectedCallback",
      value: (function () {
        var _disconnectedCallback = _asyncToGenerator(
          _regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      this.shadowRoot.querySelector(".plicarzero-button").removeEventListener("click", this.activateARBind);

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              this
            );
          })
        );

        function disconnectedCallback() {
          return _disconnectedCallback.apply(this, arguments);
        }

        return disconnectedCallback;
      })(),
    },
    {
      key: "plicarButtonInit",
      value: function plicarButtonInit() {
        this.viewerUid = this.getAttribute("viewer-uid");
        this.activateARBind = this.activateAR.bind(this);
        this.colorType = this.getAttribute("color-type");
      },
    },
    {
      key: "loadAmplitude",
      value: function loadAmplitude() {
        var userId = this.getAttribute("analytics-user-id");

        if (userId === null) {
          var nanoid = function nanoid() {
            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
            return crypto.getRandomValues(new Uint8Array(t)).reduce(function (t, e) {
              return (t += (e &= 63) < 36 ? e.toString(36) : e < 62 ? (e - 26).toString(36).toUpperCase() : e > 62 ? "-" : "_");
            }, "");
          };

          userId = nanoid();
        }

        this.analyticsUserId = userId;
        var amplitudeApiKey = "30432d1fbcaa1a7c658a03d0a529882a";
        if (window.amplitude && window.amplitude.invoked) {
          this.loadedAmplitudeType = "ts";
          console.log("이미 로드됨 ts");
        } else if (window.amplitude && !window.amplitude.invoked) {
          this.loadedAmplitudeType = "js";
          console.log("이미 로드됨 js");
        } else {
          var amplitudeScript = document.createElement("script");
          console.log("새로 로드해야함!");
          amplitudeScript.classList.add("plicarzero-amplitude-script");
          amplitudeScript.type = "text/javascript";
          var scriptText =
            '!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<g.length;t++)o(e,g[t],!1);for(var r=0;r<m.length;r++)o(e,m[r],!0)};r.invoked=!0;var u=t.createElement("script");u.type="text/javascript",u.integrity="sha384-GHWzi7MsT/TD3t0f+KUaVeuvPUsuVgdUKegrAWlzO4I83+klmUJna8WTuUunlsg6",u.crossOrigin="anonymous",u.async=!0,u.src="https://cdn.amplitude.com/libs/analytics-browser-1.6.6-min.js.gz",u.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var a=t.getElementsByTagName("script")[0];a.parentNode.insertBefore(u,a);for(var c=function(){return this._q=[],this},l=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],p=0;p<l.length;p++)n(c,l[p]);r.Identify=c;for(var d=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],f=0;f<v.length;f++)n(d,v[f]);r.Revenue=d;var g=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],m=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(r),r.createInstance=function(){var e=r._iq.push({_q:[]})-1;return i(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();';
          amplitudeScript.innerHTML = scriptText;
          document.head.appendChild(amplitudeScript);
          this.loadedAmplitudeType = "ts";
        }

        try {
          if (this.loadedAmplitudeType === "ts") {
            this.plicarzero_amplitude = amplitude.createInstance();
          } else {
            this.plicarzero_amplitude = amplitude.getInstance("plicarzero_amplitude");
          }

          this.plicarzero_amplitude.init(amplitudeApiKey, userId);
        } catch (err) {
          console.warn("plicarzero-button amplitude error");
          this.loadedAmplitudeType = "error";
        }
      },
    },
    {
      key: "sendAmplitude",
      value: function sendAmplitude(eventName, eventProps) {
        if (this.loadedAmplitudeType === "error") {
          return;
        }
        console.log("sending~");
        if (this.plicarzero_amplitude) {
          if (this.loadedAmplitudeType === "ts") {
            this.plicarzero_amplitude.track(eventName, eventProps);
          } else {
            amplitude.getInstance("plicarzero_amplitude").logEvent(eventName, eventProps);
          }
        }
      },
    },
    {
      key: "disableButton",
      value: function disableButton() {
        var disableGuideText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "\uAD00\uB9AC\uC790\uC5D0 \uC758\uD574 \uC911\uB2E8\uB41C \uAE30\uB2A5\uC785\uB2C8\uB2E4.";
        var plicarButton = this.shadowRoot.querySelector(".plicarzero-button");
        plicarButton.classList.add("disabled");
        this.VIEWER_ON_OFF = "off";
        var tooltip = document.createElement("div");
        plicarButton.addEventListener("mouseover", function () {
          tooltip.style.visibility = "visible";
          tooltip.style.opacity = "1";
        });
        plicarButton.addEventListener("mouseleave", function () {
          tooltip.style.opacity = "0";
          tooltip.style.visibility = "hidden";
        });
        tooltip.classList.add("tooltip");
        tooltip.textContent = disableGuideText;
        this.shadowRoot.querySelector(".plicarzero-button-container").appendChild(tooltip);
      },
    },
    {
      key: "activateAR",
      value: function activateAR() {
        var userAgent = navigator.userAgent || navigator.vendor;

        if (/android/i.test(userAgent)) {
          this.openSceneViewer();
          this.sendAmplitude("zero_button_android_ar_view");
        } else if (/iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
          this.openIOSARQuickLook();
          this.sendAmplitude("zero_button_ios_ar_view");
        } else {
          this.toggleModal();
          this.sendAmplitude("zero_button_modal_open");
        }
      },
    },
    {
      key: "toggleModal",
      value: function toggleModal() {
        var _this2 = this;

        if (this.IS_QR_MODAL_ACTIVE) {
          document.querySelector(".QRModal").remove();
          this.IS_QR_MODAL_ACTIVE = false;
          return;
        }

        var WebappUrl = "https://stag.argateway.plicarzero.rlabsdev.com";
        var QRMainSrc = "".concat(WebappUrl, "/qrcode_ko.html?plicar-qr=").concat(WebappUrl, "/").concat(this.viewerUid, "?access_type=QRCode&userid=").concat(this.analyticsUserId);
        var QRModalDiv = document.createElement("div");
        QRModalDiv.setAttribute("class", "QRModal");
        QRModalDiv.style.zIndex = "15";
        QRModalDiv.style.width = "100%";
        QRModalDiv.style.height = "100%";
        QRModalDiv.style.position = "fixed";
        QRModalDiv.style.background = "rgba(0, 0, 0, 0.5)";
        QRModalDiv.style.opacity = "1";
        QRModalDiv.style.visibility = "visible";
        QRModalDiv.style.transform = "scale(1.1)";
        QRModalDiv.style.transition = "visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s";
        QRModalDiv.style.top = "0";
        QRModalDiv.style.left = "0";
        var QRModaliframe = document.createElement("iframe");
        QRModaliframe.src = QRMainSrc;
        QRModaliframe.classList.add("plicar-argateway-qrcode-iframe");
        QRModaliframe.height = "750px";
        QRModaliframe.width = "fit-content";
        QRModaliframe.style.border = "0px";
        QRModaliframe.style.top = "50%";
        QRModaliframe.style.left = "50%";
        QRModaliframe.style.position = "absolute";
        QRModaliframe.style.transform = "translate(-50%, -40%)";
        QRModaliframe.style.border = "0";
        QRModalDiv.appendChild(QRModaliframe);

        if (this.IS_QR_MODAL_ACTIVE == false) {
          document.body.appendChild(QRModalDiv);
          this.IS_QR_MODAL_ACTIVE = true;
          QRModalDiv.addEventListener(
            "click",
            function () {
              _this2.toggleModal();
            },
            {
              once: true,
            }
          );
        }
      },
    },
    {
      key: "openSceneViewer",
      value: function openSceneViewer() {
        var noArViewerSigil = "#model-viewer-no-ar-fallback";
        var androidAnchor = document.createElement("a");
        var location = window.location.toString();
        var modelUrl = new URL(this.GLB_URL, location);
        var locationUrl = new URL(location);
        locationUrl.hash = noArViewerSigil;
        var intentParams;
        intentParams = "?file=".concat(encodeURIComponent(modelUrl.toString()));
        intentParams += "&mode=ar_preferred&link=".concat(this.SALES_URL ? encodeURIComponent(this.SALES_URL) : "https://plicar.io");
        intentParams += "&title=".concat(this.CATALOG_PRODUCT_NAME || this.MODEL_NAME || "Let's Play AR!");

        if (this.RESIZABLE != null) {
          intentParams += "&resizable=".concat(this.RESIZABLE);
        }

        if (this.VERTICAL_PLACEMENT != null) {
          intentParams += "&enable_vertical_placement=".concat(this.VERTICAL_PLACEMENT);
        }

        var intent = "intent://arvr.google.com/scene-viewer/1.0".concat(
          intentParams,
          "#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=",
          "https://plicar.io",
          ";end;"
        );

        var undoHashChange = function undoHashChange() {
          if (window.location.hash === noArViewerSigil) {
            window.history.back();
          }
        };

        window.addEventListener("hashchange", undoHashChange, {
          once: true,
        });
        androidAnchor.setAttribute("href", intent);
        androidAnchor.click();
      },
    },
    {
      key: "openIOSARQuickLook",
      value: function openIOSARQuickLook() {
        var objectURL = this.USDZ_URL;

        if (this.RESIZABLE === false) {
          objectURL += "&allowsContentScaling=0";
        }

        var iOSAnchor = document.createElement("a");
        iOSAnchor.setAttribute("rel", "ar");
        var img = document.createElement("img");
        iOSAnchor.appendChild(img);
        iOSAnchor.setAttribute("href", objectURL);
        iOSAnchor.style.display = "none";
        if (!iOSAnchor.isConnected) this.shadowRoot.appendChild(iOSAnchor);
        iOSAnchor.click();
        iOSAnchor.removeChild(img);
      },
    },
    {
      key: "handleViewerIdChange",
      value: (function () {
        var _handleViewerIdChange = _asyncToGenerator(
          _regeneratorRuntime().mark(function _callee3() {
            var API_ENDPOINT, res, parsedResponse, productMetadata;
            return _regeneratorRuntime().wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.prev = 0;
                      API_ENDPOINT = "https://p3misvv8bj.execute-api.ap-northeast-2.amazonaws.com/stag";
                      _context3.next = 4;
                      return fetch("".concat(API_ENDPOINT, "/public/model/viewer?viewer_uid=").concat(this.viewerUid), {
                        credentials: "omit",
                      });

                    case 4:
                      res = _context3.sent;
                      _context3.next = 7;
                      return res.json();

                    case 7:
                      parsedResponse = _context3.sent;
                      productMetadata = parsedResponse.data;

                      if (!(parsedResponse.result != "success")) {
                        _context3.next = 23;
                        break;
                      }

                      plicarButtonTemplate.innerHTML = createPlicarButtonInnerHTMLSVG(plicarButtonSVGs[this.colorType].disable);
                      this.shadowRoot.appendChild(plicarButtonTemplate.content.cloneNode(true));
                      _context3.t0 = parsedResponse.result;
                      _context3.next = _context3.t0 === "fetch_error" ? 15 : _context3.t0 === "viewer_not_found" ? 17 : _context3.t0 === "model_not_published" ? 19 : 21;
                      break;

                    case 15:
                      this.disableButton("뷰어 데이터를 불러오는데 실패했습니다.");
                      return _context3.abrupt("break", 21);

                    case 17:
                      this.disableButton("뷰어 데이터를 찾을 수 없습니다.");
                      return _context3.abrupt("break", 21);

                    case 19:
                      this.disableButton("관리자에 의해 중단된 기능입니다.");
                      return _context3.abrupt("break", 21);

                    case 21:
                      _context3.next = 33;
                      break;

                    case 23:
                      this.GLB_URL = productMetadata.modelGlbURL;
                      this.USDZ_URL = productMetadata.modelUsdzURL;
                      this.SALES_URL = productMetadata.salesURL;
                      this.MODEL_NAME = productMetadata.modelName;
                      this.RESIZABLE = productMetadata.resizable;
                      this.VERTICAL_PLACEMENT = productMetadata.enable_vertical_placement;
                      plicarButtonTemplate.innerHTML = createPlicarButtonInnerHTMLSVG(plicarButtonSVGs[this.colorType].enable);
                      this.shadowRoot.appendChild(plicarButtonTemplate.content.cloneNode(true));
                      this.shadowRoot.querySelector(".plicarzero-button").addEventListener("click", this.activateARBind);
                      this.shadowRoot.querySelector(".plicarzero-button").classList.add(this.colorType);

                    case 33:
                      _context3.next = 41;
                      break;

                    case 35:
                      _context3.prev = 35;
                      _context3.t1 = _context3["catch"](0);
                      console.log("Failed to fetch(GET) urls: ", _context3.t1);
                      plicarButtonTemplate.innerHTML = createPlicarButtonInnerHTMLSVG(plicarButtonSVGs[this.colorType].disable);
                      this.shadowRoot.appendChild(plicarButtonTemplate.content.cloneNode(true));
                      this.disableButton("알 수 없는 오류가 발생했습니다.");

                    case 41:
                      return _context3.abrupt("return");

                    case 42:
                    case "end":
                      return _context3.stop();
                  }
                }
              },
              _callee3,
              this,
              [[0, 35]]
            );
          })
        );

        function handleViewerIdChange() {
          return _handleViewerIdChange.apply(this, arguments);
        }

        return handleViewerIdChange;
      })(),
    },
  ]);

  return PlicarZeroButton;
})(_wrapNativeSuper(HTMLElement));

window.customElements.define("plicarzero-button", PlicarZeroButton);
