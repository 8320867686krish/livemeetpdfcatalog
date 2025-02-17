"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Components_PDFLayout_BackImage_js"],{

/***/ "./resources/js/Pages/Components/PDFLayout/BackImage.js":
/*!**************************************************************!*\
  !*** ./resources/js/Pages/Components/PDFLayout/BackImage.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductImageLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductImageLayout */ "./resources/js/Pages/Components/PDFLayout/ProductImageLayout.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


var BackImage = function BackImage(_ref) {
  var _ref$backImage = _ref.backImage,
    backImage = _ref$backImage === void 0 ? "" : _ref$backImage,
    _ref$pdfWidth = _ref.pdfWidth,
    pdfWidth = _ref$pdfWidth === void 0 ? 21 : _ref$pdfWidth,
    _ref$pdfHeight = _ref.pdfHeight,
    pdfHeight = _ref$pdfHeight === void 0 ? 29.7 : _ref$pdfHeight;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    id: "back_page",
    className: "page",
    style: {
      breakAfter: "page",
      zoom: pdfPreviewZoom,
      position: "relative",
      /* marginBottom: "30px", */width: pdfWidth,
      height: pdfHeight + paperSizeMeasurement
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "inner-page",
      style: {
        /* padding: "20px", */backgroundColor: "rgb(255, 255, 255)",
        height: "100%",
        width: "100%",
        fontFamily: "Roboto Condensed",
        color: "rgb(0, 0, 0)",
        overflow: "hidden"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "container",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "row",
          style: {
            height: "100%" /* , margin: "10px" */
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            style: {
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ProductImageLayout__WEBPACK_IMPORTED_MODULE_0__["default"], {
              productImage: backImage,
              backgroundSize: 'contain'
            })
          })
        })
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackImage);

/***/ }),

/***/ "./resources/js/Pages/Components/PDFLayout/ProductImageLayout.js":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/Components/PDFLayout/ProductImageLayout.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shopify/polaris */ "./node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var BarCodeLayout = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_Pages_Components_PDFLayout_BarCodeLayout_js").then(__webpack_require__.bind(__webpack_require__, /*! ./BarCodeLayout */ "./resources/js/Pages/Components/PDFLayout/BarCodeLayout.js"));
});
var ProductImageLayout = function ProductImageLayout() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _data$productImage = data.productImage,
    productImage = _data$productImage === void 0 ? "" : _data$productImage,
    _data$productAttribut = data.productAttributes,
    productAttributes = _data$productAttribut === void 0 ? [] : _data$productAttribut,
    _data$barcode = data.barcode,
    barcode = _data$barcode === void 0 ? "" : _data$barcode,
    _data$backgroundSize = data.backgroundSize,
    backgroundSize = _data$backgroundSize === void 0 ? pdfBackgroundImgSize : _data$backgroundSize,
    _data$backgroundPosit = data.backgroundPosition,
    backgroundPosition = _data$backgroundPosit === void 0 ? "top" : _data$backgroundPosit;
  // productImage = `${IMAGE_PREFIX}/images/tshirt1.jpg`;
  // productImage = `${IMAGE_PREFIX}images/tshirt1.jpg`;
  // productImage = `https://cdn.shopify.com/s/files/1/0781/0020/1775/products/stylish-summer-necklace_925x_7962c463-eba6-46c2-ac3d-f2ee0fda3ba5.jpg`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "slot-row top img-container ",
    children: productImage !== '' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      style: {
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "relative"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        style: {
          width: "100%",
          height: "100%",
          backgroundSize: 'contain',
          backgroundImage: "url(" + productImage + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: backgroundPosition,
          transform: "translate(0px, 0px) scale(1)"
        }
      }), productAttributes.includes('barcode') && barcode !== null && barcode !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
        fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_shopify_polaris__WEBPACK_IMPORTED_MODULE_2__.Spinner, {
          accessibilityLabel: "Small spinner example",
          size: "large"
        }),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(BarCodeLayout, {
          barCode: barcode
        })
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "slot-placeholder hover-indicator",
      style: {
        opacity: "0.4",
        width: "100%",
        height: "100%",
        textAlign: "center",
        fontSize: "36px",
        fontFamily: "sans-serif"
      }
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductImageLayout);

/***/ })

}]);