"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Components_ProductList_js"],{

/***/ "./resources/js/Pages/Components/ProductList.js":
/*!******************************************************!*\
  !*** ./resources/js/Pages/Components/ProductList.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shopify/polaris */ "./node_modules/@shopify/polaris/build/esm/components/IndexTable/IndexTable.js");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shopify/polaris */ "./node_modules/@shopify/polaris/build/esm/components/Icon/Icon.js");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shopify/polaris */ "./node_modules/@shopify/polaris/build/esm/components/Checkbox/Checkbox.js");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shopify/polaris */ "./node_modules/@shopify/polaris/build/esm/components/LegacyCard/LegacyCard.js");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shopify/polaris */ "./node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shopify/polaris */ "./node_modules/@shopify/polaris/build/esm/components/TextField/TextField.js");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @shopify/polaris */ "./node_modules/@shopify/polaris/build/esm/components/Button/Button.js");
/* harmony import */ var _TableNoRecord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableNoRecord */ "./resources/js/Pages/Components/TableNoRecord.js");
/* harmony import */ var _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shopify/polaris-icons */ "./node_modules/@shopify/polaris-icons/dist/icons/ChevronUpMinor.svg.mjs");
/* harmony import */ var _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shopify/polaris-icons */ "./node_modules/@shopify/polaris-icons/dist/icons/ChevronDownMinor.svg.mjs");
/* harmony import */ var _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shopify/polaris-icons */ "./node_modules/@shopify/polaris-icons/dist/icons/SearchMinor.svg.mjs");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper */ "./resources/js/Pages/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["variants"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var resourceName = {
  singular: 'product',
  plural: 'products'
};
var ProductList = function ProductList(_ref) {
  var _ref$shopid = _ref.shopid,
    shopid = _ref$shopid === void 0 ? '' : _ref$shopid,
    _ref$productLimit = _ref.productLimit,
    productLimit = _ref$productLimit === void 0 ? "5" : _ref$productLimit,
    _ref$selectedResource = _ref.selectedResources,
    selectedResources = _ref$selectedResource === void 0 ? [] : _ref$selectedResource,
    parentStateUpdateByChild = _ref.parentStateUpdateByChild,
    _ref$collectionId = _ref.collectionId,
    collectionId = _ref$collectionId === void 0 ? 0 : _ref$collectionId,
    _ref$fetchedProduct = _ref.fetchedProduct,
    fetchedProduct = _ref$fetchedProduct === void 0 ? '' : _ref$fetchedProduct;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    productList = _useState2[0],
    setProductList = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    endCursor = _useState4[0],
    setEndCursor = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    startCursor = _useState6[0],
    setStartCursor = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    hasNextPage = _useState8[0],
    setHasNextPage = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    hasPreviousPage = _useState10[0],
    setHasPreviousPage = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    loader = _useState12[0],
    setLoader = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState14 = _slicedToArray(_useState13, 2),
    queryValue = _useState14[0],
    setQueryValue = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    allProduct = _useState16[0],
    setAllProduct = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState18 = _slicedToArray(_useState17, 2),
    priceFormate = _useState18[0],
    setPriceFormate = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState20 = _slicedToArray(_useState19, 2),
    showVariant = _useState20[0],
    setShowVariant = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(10),
    _useState22 = _slicedToArray(_useState21, 2),
    showLimit = _useState22[0],
    setShowLimit = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState24 = _slicedToArray(_useState23, 2),
    totalProduct = _useState24[0],
    setTotalProduct = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState26 = _slicedToArray(_useState25, 2),
    isProductFetched = _useState26[0],
    setIsProductFetched = _useState26[1];

  //Handle search method.
  var handleFiltersQueryChange = function handleFiltersQueryChange(value) {
    setQueryValue(value);
  };

  //Handle search method.
  var handleSearchProduct = function handleSearchProduct() {
    // parentStateUpdateByChild('selectedProducts', []);
    getProduct({
      query: queryValue,
      collectionId: collectionId
    });
  };

  //Handle the search clear method.
  var handleQueryClear = function handleQueryClear() {
    // parentStateUpdateByChild('selectedProducts', []);
    setQueryValue('');
    getProduct({
      collectionId: collectionId
    });
  };

  //Get the product list...
  var getProduct = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var curObj,
        _curObj$currentState,
        currentState,
        _curObj$query,
        query,
        _curObj$limit,
        limit,
        _curObj$collectionId,
        collectionId,
        request,
        responseData,
        _responseData$data,
        _responseData$data2,
        _responseData$data2$p,
        products,
        _responseData$data2$s,
        _startCursor,
        _responseData$data2$e,
        _endCursor,
        _responseData$data2$h,
        _hasNextPage,
        _responseData$data2$h2,
        _hasPreviousPage,
        _responseData$priceFo,
        _priceFormate,
        _products,
        _totalProduct,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            curObj = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            _curObj$currentState = curObj.currentState, currentState = _curObj$currentState === void 0 ? '' : _curObj$currentState, _curObj$query = curObj.query, query = _curObj$query === void 0 ? '' : _curObj$query, _curObj$limit = curObj.limit, limit = _curObj$limit === void 0 ? showLimit : _curObj$limit, _curObj$collectionId = curObj.collectionId, collectionId = _curObj$collectionId === void 0 ? 0 : _curObj$collectionId;
            setLoader(true);
            request = {
              startCursor: '',
              endCursor: '',
              query: query,
              limit: limit,
              collectionId: collectionId
            };
            if (currentState === 'previous') {
              request.startCursor = startCursor;
            } else if (currentState === 'next') {
              request.endCursor = endCursor;
            }
            _context.next = 7;
            return (0,_helper__WEBPACK_IMPORTED_MODULE_2__.fetchMethod)(postMethodType, 'product/get', shopid, request);
          case 7:
            responseData = _context.sent;
            if ((responseData === null || responseData === void 0 ? void 0 : responseData.data) != null) {
              _responseData$data = responseData.data, _responseData$data2 = _responseData$data === void 0 ? {} : _responseData$data, _responseData$data2$p = _responseData$data2.products, products = _responseData$data2$p === void 0 ? [] : _responseData$data2$p, _responseData$data2$s = _responseData$data2.startCursor, _startCursor = _responseData$data2$s === void 0 ? '' : _responseData$data2$s, _responseData$data2$e = _responseData$data2.endCursor, _endCursor = _responseData$data2$e === void 0 ? '' : _responseData$data2$e, _responseData$data2$h = _responseData$data2.hasNextPage, _hasNextPage = _responseData$data2$h === void 0 ? false : _responseData$data2$h, _responseData$data2$h2 = _responseData$data2.hasPreviousPage, _hasPreviousPage = _responseData$data2$h2 === void 0 ? false : _responseData$data2$h2, _responseData$priceFo = responseData.priceFormate, _priceFormate = _responseData$priceFo === void 0 ? '' : _responseData$priceFo;
              _products = currentState === 'next' ? _toConsumableArray(new Set([].concat(_toConsumableArray(productList), _toConsumableArray(products)))) : products; //For load more pagination
              // const _products = products; //For pagination..
              _totalProduct = 0;
              _products.map(function (pItem) {
                var _pItem$variants = pItem.variants,
                  variants = _pItem$variants === void 0 ? [] : _pItem$variants;
                var _variants$ = variants[0],
                  _variants$2 = _variants$ === void 0 ? {} : _variants$,
                  _variants$2$node = _variants$2.node,
                  _variants$2$node2 = _variants$2$node === void 0 ? {} : _variants$2$node,
                  _variants$2$node2$tit = _variants$2$node2.title,
                  variantsTitle = _variants$2$node2$tit === void 0 ? '' : _variants$2$node2$tit;
                _totalProduct = _totalProduct + (variantsTitle !== 'Default Title' ? variants.length : 1);
              });
              setTotalProduct(_totalProduct);
              setAllProduct(allProduct);
              setProductList(_products);
              setEndCursor(_endCursor);
              setStartCursor(_startCursor);
              setHasNextPage(_hasNextPage);
              setHasPreviousPage(_hasPreviousPage);
              setPriceFormate(_priceFormate);
              setLoader(false);
              setIsProductFetched(true);
            }
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function getProduct() {
      return _ref2.apply(this, arguments);
    };
  }();

  //After render get the data from the api
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    //Fetching the all product list...
    if (isProductFetched === false || fetchedProduct === true) {
      clearProductFilter();
      if (collectionId !== 0) {
        getProduct({
          collectionId: collectionId
        }).then(function () {
          fetchedProduct = false;
        });
      } else {
        getProduct({
          collectionId: collectionId
        }).then(function () {
          fetchedProduct = false;
        });
      }
    }
    console.log("collectionId product List :", collectionId);
  }, [collectionId]);

  //Clear product filter.
  var clearProductFilter = function clearProductFilter() {
    setEndCursor("");
    setStartCursor("");
    setHasNextPage(false);
    setHasPreviousPage(false);
    setQueryValue("");
  };
  var handleSelectionChange = function handleSelectionChange(selectedItems) {
    var selectedIndex = selectedResources.findIndex(function (item) {
      return item.id == selectedItems.id;
    }); //If selected product is object..
    // const selectedIndex = selectedResources.indexOf(selectedItems);
    if (selectedIndex > -1) {
      selectedResources.splice(selectedIndex, 1);
      // setSelectedResources(selectedResources);
      defaultSelectionChange();
      parentStateUpdateByChild('selectedProducts', selectedResources);
    } else {
      var newSelectedResources = _toConsumableArray(new Set([].concat(_toConsumableArray(selectedResources), [selectedItems])));
      // setSelectedResources(newSelectedResources);
      defaultSelectionChange();
      parentStateUpdateByChild('selectedProducts', newSelectedResources);
    }
  };

  //selected all product and return product ids..
  /* const allSelectProduct = () => {
      return getSpecifiedKeyOfValueFromArray(productList, 'id');
  } */

  //Handle to selected checked/uncheck product...
  var handleAllSelectionChange = function handleAllSelectionChange(checked) {
    // const _selectedProducts = checked ? allSelectProduct() : [];
    // const _selectedProducts = checked ? Object.assign([], productList) : []; //Without variant...
    var _selectedProducts = [];
    if (checked) {
      var _totalProduct2 = 0;
      productList.map(function (pItem) {
        var _pItem$variants2 = pItem.variants,
          variants = _pItem$variants2 === void 0 ? [] : _pItem$variants2,
          restParam = _objectWithoutProperties(pItem, _excluded);
        var _variants$3 = variants[0],
          _variants$4 = _variants$3 === void 0 ? {} : _variants$3,
          _variants$4$node = _variants$4.node,
          _variants$4$node2 = _variants$4$node === void 0 ? {} : _variants$4$node,
          _variants$4$node2$tit = _variants$4$node2.title,
          variantsTitle = _variants$4$node2$tit === void 0 ? '' : _variants$4$node2$tit;
        if (variantsTitle !== 'Default Title') {
          variants.map(function (vRow) {
            var _vRow$node = vRow.node,
              _vRow$node2 = _vRow$node === void 0 ? {} : _vRow$node,
              price = _vRow$node2.price,
              title = _vRow$node2.title,
              _vRow$node2$image = _vRow$node2.image,
              vImage = _vRow$node2$image === void 0 ? {} : _vRow$node2$image,
              _vRow$node3 = vRow.node,
              variantObj = _vRow$node3 === void 0 ? {} : _vRow$node3;
            var convertPrice = (0,_helper__WEBPACK_IMPORTED_MODULE_2__.formatPrice)(price, priceFormate);
            var variantImage = vImage !== null && vImage !== void 0 ? vImage : "".concat(IMAGE_PREFIX, "images/no_image.png");
            if (vImage !== null && (vImage === null || vImage === void 0 ? void 0 : vImage.originalSrc) !== '') {
              variantImage = vImage.originalSrc;
            }
            var updateVariantObj = _objectSpread(_objectSpread(_objectSpread({}, pItem), variantObj), {
              image: vImage !== null ? vImage.originalSrc : vImage,
              orignalPrice: price,
              price: convertPrice,
              title: "".concat(pItem === null || pItem === void 0 ? void 0 : pItem.title, " (").concat(title, ")")
            });
            delete updateVariantObj.variants;
            _selectedProducts.push(updateVariantObj);
            _totalProduct2++;
          });
        } else {
          _selectedProducts.push(restParam);
          _totalProduct2++;
        }
      });
      setTotalProduct(_totalProduct2);
    }
    setAllProduct(checked);
    parentStateUpdateByChild('selectedProducts', _selectedProducts);
  };

  //Checked the check box base on selected products.
  var defaultSelectionChange = function defaultSelectionChange() {
    var _allProduct = false;
    if (selectedResources.length > 0 && selectedResources.length === totalProduct) _allProduct = true;else if (selectedResources.length > 0) _allProduct = 'indeterminate';
    setAllProduct(_allProduct);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    defaultSelectionChange();
  }, [selectedResources, productList]);
  var showHideVariants = function showHideVariants(id) {
    setShowVariant(showVariant === id ? '' : id);
  };
  var handleShowLimit = function handleShowLimit(limit) {
    setShowLimit(limit);
    getProduct({
      query: queryValue,
      limit: limit,
      collectionId: collectionId
    });
  };
  var rowMarkup = productList.map(function (row) {
    var id = row.id,
      image = row.image,
      _row$title = row.title,
      MainProdTitle = _row$title === void 0 ? '' : _row$title,
      price = row.price,
      _row$variants = row.variants,
      variants = _row$variants === void 0 ? [] : _row$variants;
    var _variants$5 = variants[0],
      _variants$6 = _variants$5 === void 0 ? {} : _variants$5,
      _variants$6$node = _variants$6.node,
      _variants$6$node2 = _variants$6$node === void 0 ? {} : _variants$6$node,
      _variants$6$node2$tit = _variants$6$node2.title,
      variantsTitle = _variants$6$node2$tit === void 0 ? '' : _variants$6$node2$tit;
    var selectedRow = selectedResources.some(function (item) {
      return item.id == id;
    }); //If selected product is object..
    // const selectedRow = selectedResources.includes(id);
    image = image !== '' ? image : "".concat(IMAGE_PREFIX, "images/no_image.png");
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Row, {
        id: id,
        selected: selectedRow,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Cell, {
          children: variants.length > 0 && variantsTitle !== 'Default Title' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "variant_icon",
            onClick: function onClick() {
              return showHideVariants(id);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_5__.Icon, {
              source: showVariant === id ? _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_6__.S : _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_7__.S,
              color: "base"
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_8__.Checkbox, {
            checked: selectedRow,
            disabled: productLimit === 'false',
            onChange: productLimit === 'false' ? function () {} : function () {
              return handleSelectionChange(row);
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Cell, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "image_area",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
              src: image,
              alt: "Product",
              width: "38",
              height: "38"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Cell, {
          children: MainProdTitle
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Cell, {
          children: variantsTitle !== 'Default Title' ? '' : price
        })]
      }, id), variantsTitle !== 'Default Title' && variants.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("tr", {
        style: {
          display: showVariant === id ? 'table-row' : 'none'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
          colSpan: "4",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("table", {
            className: "Polaris-IndexTable__Table tbl_variants",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("tbody", {
              children: variants.map(function (vRow) {
                var _vRow$node4 = vRow.node,
                  _vRow$node5 = _vRow$node4 === void 0 ? {} : _vRow$node4,
                  id = _vRow$node5.id,
                  title = _vRow$node5.title,
                  price = _vRow$node5.price,
                  _vRow$node5$image = _vRow$node5.image,
                  vImage = _vRow$node5$image === void 0 ? {} : _vRow$node5$image,
                  _vRow$node6 = vRow.node,
                  variantObj = _vRow$node6 === void 0 ? {} : _vRow$node6;
                var selectedVariantRow = selectedResources.some(function (item) {
                  return item.id == id;
                }); //If selected product is object..
                var convertPrice = (0,_helper__WEBPACK_IMPORTED_MODULE_2__.formatPrice)(price, priceFormate);
                var variantImage = vImage !== null && vImage !== void 0 ? vImage : "".concat(IMAGE_PREFIX, "images/no_image.png");
                if (vImage !== null && (vImage === null || vImage === void 0 ? void 0 : vImage.originalSrc) !== '') {
                  variantImage = vImage.originalSrc;
                }
                var updateVariantObj = _objectSpread(_objectSpread(_objectSpread({}, row), variantObj), {
                  image: vImage !== null ? vImage.originalSrc : vImage,
                  orignalPrice: price,
                  price: convertPrice,
                  title: "".concat(MainProdTitle, " (").concat(title, ")")
                });
                delete updateVariantObj.variants;
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Row, {
                  id: "variant_".concat(id),
                  selected: selectedVariantRow,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Cell, {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_8__.Checkbox, {
                      checked: selectedVariantRow,
                      disabled: productLimit === 'false',
                      onChange: productLimit === 'false' ? function () {} : function () {
                        return handleSelectionChange(updateVariantObj);
                      }
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Cell, {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                      className: "image_area",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
                        src: variantImage,
                        alt: "Variant",
                        width: "38",
                        height: "38"
                      })
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Cell, {
                    children: "".concat(MainProdTitle, " (").concat(title, ")")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable.Cell, {
                    children: convertPrice
                  })]
                }, "variant_key_".concat(id));
              })
            })
          })
        })
      }, "variant_".concat(id))]
    });
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_9__.LegacyCard, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "table_area",
      children: [loader && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_10__.Spinner, {
        accessibilityLabel: "Spinner example",
        size: "large"
      }), productList.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "search_area",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_11__.TextField, {
          type: "text",
          value: queryValue,
          onChange: handleFiltersQueryChange,
          prefix: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_5__.Icon, {
            source: _shopify_polaris_icons__WEBPACK_IMPORTED_MODULE_12__.S,
            color: "base"
          }),
          clearButton: true,
          onClearButtonClick: handleQueryClear,
          name: "queryValue",
          placeholder: "Search by name",
          connectedRight: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_13__.Button, {
            variant: "primary",
            onClick: handleSearchProduct,
            children: "Search"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_4__.IndexTable, {
        selectable: false,
        selectedItems: selectedResources,
        items: productList,
        resourceName: resourceName,
        itemCount: productList.length,
        emptyState: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_TableNoRecord__WEBPACK_IMPORTED_MODULE_1__["default"], {
          emptyProps: {
            heading: "No products yet",
            message: "It looks like you do not have any products.",
            image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          }
        }),
        headings: [{
          title: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_8__.Checkbox, {
            checked: allProduct,
            disabled: productLimit === 'false',
            onChange: productLimit === 'false' ? function () {} : handleAllSelectionChange
          })
        }, {
          title: 'Image'
        }, {
          title: 'Product Name'
        }, {
          title: 'Product Price'
        }],
        children: rowMarkup
      }), productList.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: hasNextPage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "show_more",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_13__.Button, {
            variant: "plain",
            onClick: function onClick() {
              return getProduct({
                currentState: "next",
                query: queryValue,
                collectionId: collectionId
              });
            },
            children: "Show more products"
          })
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductList);

/***/ })

}]);