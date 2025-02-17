"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Components_PDFPreview_js"],{

/***/ "./resources/js/Pages/Components/PDFPreview.js":
/*!*****************************************************!*\
  !*** ./resources/js/Pages/Components/PDFPreview.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shopify/polaris */ "./node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper */ "./resources/js/Pages/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var FrontImage = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_FrontImage_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/FrontImage */ "./resources/js/Pages/Components/PDFLayout/FrontImage.js"));
});
var BackImage = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_BackImage_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/BackImage */ "./resources/js/Pages/Components/PDFLayout/BackImage.js"));
});
var OneItemGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_OneItemGrid_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/OneItemGrid */ "./resources/js/Pages/Components/PDFLayout/OneItemGrid.js"));
});
var TwoItemGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_TwoItemGrid_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/TwoItemGrid */ "./resources/js/Pages/Components/PDFLayout/TwoItemGrid.js"));
});
var TwoItemList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_TwoItemList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/TwoItemList */ "./resources/js/Pages/Components/PDFLayout/TwoItemList.js"));
});
var TwoItemLeftList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_TwoItemLeftList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/TwoItemLeftList */ "./resources/js/Pages/Components/PDFLayout/TwoItemLeftList.js"));
});
var TwoItemRightList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_TwoItemRightList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/TwoItemRightList */ "./resources/js/Pages/Components/PDFLayout/TwoItemRightList.js"));
});
var ThreeItemGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_ThreeItemGrid_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/ThreeItemGrid */ "./resources/js/Pages/Components/PDFLayout/ThreeItemGrid.js"));
});
var ThreeItemGridReverse = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_ThreeItemGridReverse_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/ThreeItemGridReverse */ "./resources/js/Pages/Components/PDFLayout/ThreeItemGridReverse.js"));
});
var ThreeItemList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_ThreeItemList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/ThreeItemList */ "./resources/js/Pages/Components/PDFLayout/ThreeItemList.js"));
});
var ThreeItemLeftList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_ThreeItemLeftList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/ThreeItemLeftList */ "./resources/js/Pages/Components/PDFLayout/ThreeItemLeftList.js"));
});
var ThreeItemRightList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_ThreeItemRightList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/ThreeItemRightList */ "./resources/js/Pages/Components/PDFLayout/ThreeItemRightList.js"));
});
var FourItemGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_FourItemGrid_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/FourItemGrid */ "./resources/js/Pages/Components/PDFLayout/FourItemGrid.js"));
});
var FourItemList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_FourItemList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/FourItemList */ "./resources/js/Pages/Components/PDFLayout/FourItemList.js"));
});
var FourItemLeftList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_FourItemLeftList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/FourItemLeftList */ "./resources/js/Pages/Components/PDFLayout/FourItemLeftList.js"));
});
var FourItemRightList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_FourItemRightList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/FourItemRightList */ "./resources/js/Pages/Components/PDFLayout/FourItemRightList.js"));
});
var FiveItemGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_FiveItemGrid_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/FiveItemGrid */ "./resources/js/Pages/Components/PDFLayout/FiveItemGrid.js"));
});
var FiveItemList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_FiveItemList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/FiveItemList */ "./resources/js/Pages/Components/PDFLayout/FiveItemList.js"));
});
var SixItemGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_SixItemGrid_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/SixItemGrid */ "./resources/js/Pages/Components/PDFLayout/SixItemGrid.js"));
});
var SixItemList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_SixItemList_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/SixItemList */ "./resources/js/Pages/Components/PDFLayout/SixItemList.js"));
});
var EightItemGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_EightItemGrid_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/EightItemGrid */ "./resources/js/Pages/Components/PDFLayout/EightItemGrid.js"));
});
var TenItemGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_TenItemGrid_js").then(__webpack_require__.bind(__webpack_require__, /*! ./PDFLayout/TenItemGrid */ "./resources/js/Pages/Components/PDFLayout/TenItemGrid.js"));
});




var PDFPreview = function PDFPreview(props) {
  var _props$configData = props.configData,
    _props$configData2 = _props$configData === void 0 ? {} : _props$configData,
    _props$configData2$fr = _props$configData2.frontImage,
    frontImage = _props$configData2$fr === void 0 ? '' : _props$configData2$fr,
    _props$configData2$ba = _props$configData2.backImage,
    backImage = _props$configData2$ba === void 0 ? '' : _props$configData2$ba,
    _props$configData2$he = _props$configData2.headerText,
    headerText = _props$configData2$he === void 0 ? '' : _props$configData2$he,
    _props$configData2$fo = _props$configData2.footerText,
    footerText = _props$configData2$fo === void 0 ? '' : _props$configData2$fo,
    _props$configData2$pr = _props$configData2.productPageLayoutId,
    productPageLayoutId = _props$configData2$pr === void 0 ? '' : _props$configData2$pr,
    _props$configData2$pd = _props$configData2.pdfLayout,
    pdfLayout = _props$configData2$pd === void 0 ? 'portrait' : _props$configData2$pd,
    _props$configData2$pa = _props$configData2.paperLayout,
    paperLayout = _props$configData2$pa === void 0 ? 'a4' : _props$configData2$pa,
    _props$configData2$se = _props$configData2.selectedProducts,
    selectedProducts = _props$configData2$se === void 0 ? [] : _props$configData2$se;

  //inner page padding calculation.
  var innerPagePadding = "20px";
  if (headerText !== '' && footerText !== '') innerPagePadding = "38px 20px";else if (headerText !== '') innerPagePadding = "38px 20px 20px";else if (footerText !== '') innerPagePadding = "20px 20px 38px";
  if (frontImage !== '') {
    frontImage = frontImage.indexOf('data:image') > -1 ? frontImage : "".concat(IMAGE_PREFIX, "uploads/frontImage/").concat(frontImage);

    // frontImage = frontImage.indexOf('data:image') > -1 ? frontImage : `/uploads/frontImage/${frontImage}`;
  }

  if (backImage !== '') {
    backImage = backImage.indexOf('data:image') > -1 ? backImage : "".concat(IMAGE_PREFIX, "uploads/backImage/").concat(backImage);

    // backImage = backImage.indexOf('data:image') > -1 ? backImage : `/uploads/backImage/${backImage}`;
  }

  var _convertPaperSize = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.convertPaperSize)(paperLayout, pdfLayout),
    _convertPaperSize$wid = _convertPaperSize.width,
    pdfWidth = _convertPaperSize$wid === void 0 ? 21 : _convertPaperSize$wid,
    _convertPaperSize$hei = _convertPaperSize.height,
    pdfHeight = _convertPaperSize$hei === void 0 ? 29.7 : _convertPaperSize$hei,
    _convertPaperSize$con = _convertPaperSize.convertHeight,
    convertHeight = _convertPaperSize$con === void 0 ? 0 : _convertPaperSize$con;
  pdfWidth = '100%';
  var pageSize = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.getCurrentPDFPageSize)(productPageLayoutId, selectedProducts);

  //Start Calculate height for main page of pdf generation. base on product layout..
  var mainPageHeight = "".concat(convertHeight * selectedProducts.length);
  var _autoPDFSize = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.autoPDFSize)(),
    _autoPDFSize2 = _autoPDFSize["".concat(paperLayout, "_").concat(productPageLayoutId)],
    _autoPDFSize3 = _autoPDFSize2 === void 0 ? {} : _autoPDFSize2,
    _autoPDFSize3$main = _autoPDFSize3.main,
    extraHeight = _autoPDFSize3$main === void 0 ? 0 : _autoPDFSize3$main,
    _autoPDFSize3$sub = _autoPDFSize3.sub,
    childExtraHeight = _autoPDFSize3$sub === void 0 ? 0 : _autoPDFSize3$sub,
    _autoPDFSize3$isFront = _autoPDFSize3.isFrontImg,
    isFrontImg = _autoPDFSize3$isFront === void 0 ? 0 : _autoPDFSize3$isFront,
    _autoPDFSize3$extraFr = _autoPDFSize3.extraFrontImg,
    extraFrontImg = _autoPDFSize3$extraFr === void 0 ? 0 : _autoPDFSize3$extraFr;
  convertHeight = convertHeight + extraHeight;
  pdfHeight = convertHeight;
  mainPageHeight = convertHeight * pageSize;
  if (pageSize > 3) mainPageHeight += childExtraHeight * 2 * pageSize / 4;
  var isShowFront,
    isShowBack = false;
  if (frontImage !== "") {
    mainPageHeight += convertHeight + isFrontImg;
    isShowFront = true;
  }
  if (backImage !== "") {
    mainPageHeight += convertHeight;
    isShowBack = true;
  }
  //End Calculate height for main page of pdf generation. base on product layout..

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      id: "pdfLayout",
      className: "pdf_layout_area",
      style: {
        height: mainPageHeight + paperSizeMeasurement
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
        fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_3__.Spinner, {
          accessibilityLabel: "Small spinner example",
          size: "large"
        }),
        children: [frontImage !== "" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FrontImage, {
          frontImage: frontImage,
          pdfWidth: pdfWidth,
          pdfHeight: convertHeight + extraFrontImg
        }), productPageLayoutId === 'oneItemGrid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(OneItemGrid, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'twoItemGrid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(TwoItemGrid, _objectSpread({
          isShowFront: isShowFront,
          isShowBack: isShowBack,
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'twoItemList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(TwoItemList, _objectSpread({
          isShowFront: isShowFront,
          isShowBack: isShowBack,
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'twoItemLeftList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(TwoItemLeftList, _objectSpread({
          isShowFront: isShowFront,
          isShowBack: isShowBack,
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'twoItemRightList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(TwoItemRightList, _objectSpread({
          isShowFront: isShowFront,
          isShowBack: isShowBack,
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'threeItemGrid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ThreeItemGrid, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'threeItemGridReverse' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ThreeItemGridReverse, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'threeItemList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ThreeItemList, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'threeItemLeftList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ThreeItemLeftList, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'threeItemRightList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ThreeItemRightList, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'fourItemGrid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FourItemGrid, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'fourItemList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FourItemList, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'fourItemLeftList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FourItemLeftList, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'fourItemRightList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FourItemRightList, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'fiveItemGrid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FiveItemGrid, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'fiveItemList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FiveItemList, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'sixItemGrid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SixItemGrid, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'sixItemList' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SixItemList, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'eightItemGrid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(EightItemGrid, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), productPageLayoutId === 'tenItemGrid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(TenItemGrid, _objectSpread({
          childExtraHeight: childExtraHeight,
          innerPagePadding: innerPagePadding,
          pdfWidth: pdfWidth,
          pdfHeight: pdfHeight
        }, props)), backImage !== "" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(BackImage, {
          backImage: backImage,
          pdfWidth: pdfWidth,
          pdfHeight: convertHeight
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PDFPreview);

/***/ })

}]);