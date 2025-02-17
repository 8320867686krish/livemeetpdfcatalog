"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Components_PDFLayout_FourItemRightList_js"],{

/***/ "./resources/js/Pages/Components/PDFLayout/DefaultTextLayout.js":
/*!**********************************************************************!*\
  !*** ./resources/js/Pages/Components/PDFLayout/DefaultTextLayout.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper */ "./resources/js/Pages/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var DefaultTextLayout = function DefaultTextLayout(data) {
  // console.log('DefaultTextLayout :', data)
  var _data$productAttribut = data.productAttributes,
    productAttributes = _data$productAttribut === void 0 ? [] : _data$productAttribut,
    _data$productData = data.productData,
    productData = _data$productData === void 0 ? {} : _data$productData,
    _data$descriptionChar = data.descriptionCharLimit,
    descriptionCharLimit = _data$descriptionChar === void 0 ? 25 : _data$descriptionChar,
    _data$productButtonEn = data.productButtonEnabled,
    productButtonEnabled = _data$productButtonEn === void 0 ? '0' : _data$productButtonEn,
    _data$priceAdjustment = data.priceAdjustment,
    priceAdjustment = _data$priceAdjustment === void 0 ? '' : _data$priceAdjustment,
    _data$productChangeIn = data.productChangeInPercentage,
    productChangeInPercentage = _data$productChangeIn === void 0 ? "" : _data$productChangeIn,
    _data$productTaxPerce = data.productTaxPercentage,
    productTaxPercentage = _data$productTaxPerce === void 0 ? "" : _data$productTaxPerce,
    _data$fontColor = data.fontColor,
    fontColor = _data$fontColor === void 0 ? "" : _data$fontColor,
    _data$backgroundColor = data.backgroundColor,
    backgroundColor = _data$backgroundColor === void 0 ? "" : _data$backgroundColor;
  var _productData$title = productData.title,
    title = _productData$title === void 0 ? '' : _productData$title,
    _productData$sku = productData.sku,
    sku = _productData$sku === void 0 ? '' : _productData$sku,
    _productData$descript = productData.description,
    description = _productData$descript === void 0 ? '' : _productData$descript,
    _productData$price = productData.price,
    price = _productData$price === void 0 ? '' : _productData$price,
    _productData$storeurl = productData.storeurl,
    storeurl = _productData$storeurl === void 0 ? '' : _productData$storeurl,
    _productData$compareA = productData.compareAtPrice,
    compareAtPrice = _productData$compareA === void 0 ? "" : _productData$compareA;
  var _description = description !== null ? (0,_helper__WEBPACK_IMPORTED_MODULE_1__.displayStringBaseOnLimit)(description, descriptionCharLimit) : '';

  //Get the price without currency..
  if (compareAtPrice !== null) {
    // console.log(
    //     "compare regex price ",
    //     compareAtPrice.match(/[0-9]*\.?[0-9]+/g)[0]
    // );
    if (compareAtPrice.match(/[0-9]*\.?[0-9]+/g)[0] !== "0.00") {
      price = compareAtPrice.replaceAll(",", "");
    } else {
      price = price.replaceAll(",", "");
    }
  } else {
    price = price.replaceAll(",", "");
  }
  var matches = price.match(/[0-9]*\.?[0-9]+/g);
  var orignalPrice = matches[0];

  //Price Calculation...
  var newPrice = Number(orignalPrice),
    taxPrice = 0;
  //Price Adjustment calculation.
  if (priceAdjustment !== '') {
    var changePrice = newPrice * Number(productChangeInPercentage) / 100;
    newPrice = priceAdjustment == '1' ? newPrice - changePrice : newPrice + changePrice;
  }
  //Price Tax calculation.
  if (productTaxPercentage !== '') {
    taxPrice = newPrice * Number(productTaxPercentage) / 100;
    newPrice += taxPrice;
    taxPrice = price.replace(/[0-9]*\.?[0-9]+/g, taxPrice.toFixed(2));
  }
  newPrice = price.replace(/[0-9]*\.?[0-9]+/g, newPrice.toFixed(2));
  var fontSize = "0.7em";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "custom-description",
      style: {
        display: "flex",
        fontSize: fontSize,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "10px"
      },
      children: [productAttributes.includes('name') && title !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "custom-title",
        style: {
          textAlign: "center"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          style: {
            letterSpacing: "0.1px"
          },
          children: title
        })
      }), productAttributes.includes('sku') && sku !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "custom-sku",
        style: {
          opacity: "0.7"
        },
        children: sku
      }), productAttributes.includes('description') && description !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "custom-sku",
        style: {
          opacity: "0.7"
        },
        children: _description
      }), productAttributes.includes('price') && productTaxPercentage > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
          className: "custom-price",
          style: {
            opacity: "0.7"
          },
          children: ["Tax ", taxPrice]
        })
      }), productAttributes.includes('price') && newPrice !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "custom-price",
          style: {
            opacity: "0.7"
          },
          children: newPrice
        })
      }), productButtonEnabled == '1' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        style: {
          opacity: "0.7"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
          href: storeurl,
          style: {
            backgroundColor: fontColor,
            color: backgroundColor,
            textAlign: "center",
            padding: "10px 15px",
            width: "100%",
            display: "block",
            borderRadius: "10px",
            marginTop: "10px",
            textDecoration: "none",
            lineHeight: "normal"
          },
          target: "_blank",
          children: "Buy Now"
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DefaultTextLayout);

/***/ }),

/***/ "./resources/js/Pages/Components/PDFLayout/Footer.js":
/*!***********************************************************!*\
  !*** ./resources/js/Pages/Components/PDFLayout/Footer.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var Footer = function Footer(data) {
  var _data$footerText = data.footerText,
    footerText = _data$footerText === void 0 ? "" : _data$footerText,
    _data$footerAlignment = data.footerAlignment,
    footerAlignment = _data$footerAlignment === void 0 ? "" : _data$footerAlignment,
    _data$fontFamily = data.fontFamily,
    fontFamily = _data$fontFamily === void 0 ? "" : _data$fontFamily,
    _data$fontColor = data.fontColor,
    fontColor = _data$fontColor === void 0 ? "" : _data$fontColor,
    _data$backgroundColor = data.backgroundColor,
    backgroundColor = _data$backgroundColor === void 0 ? "" : _data$backgroundColor,
    _data$footerPageNoEna = data.footerPageNoEnabled,
    footerPageNoEnabled = _data$footerPageNoEna === void 0 ? 0 : _data$footerPageNoEna,
    _data$footerDateEnabl = data.footerDateEnabled,
    footerDateEnabled = _data$footerDateEnabl === void 0 ? 0 : _data$footerDateEnabl,
    _data$footerDateForma = data.footerDateFormat,
    footerDateFormat = _data$footerDateForma === void 0 ? "" : _data$footerDateForma,
    _data$pageSize = data.pageSize,
    pageSize = _data$pageSize === void 0 ? "" : _data$pageSize,
    _data$paddingLeft = data.paddingLeft,
    paddingLeft = _data$paddingLeft === void 0 ? "30px" : _data$paddingLeft,
    _data$paddingRight = data.paddingRight,
    paddingRight = _data$paddingRight === void 0 ? "30px" : _data$paddingRight;
  var alignment = 'center';
  if (footerText !== "" && footerDateEnabled == '1' || footerText !== "" && footerPageNoEnabled == '1' || footerPageNoEnabled == '1' && footerDateEnabled == '1') alignment = 'space-between';else if (footerAlignment === 'left') alignment = 'flex-start';else if (footerAlignment === 'right') alignment = 'flex-end';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    id: "footer",
    style: {
      width: "100%",
      height: "48px",
      paddingTop: "15px",
      paddingBottom: "15px",
      textAlign: footerAlignment,
      fontSize: "18px",
      lineHeight: "1.2",
      position: "absolute",
      left: "0px",
      bottom: "0px",
      fontFamily: fontFamily,
      color: fontColor,
      overflow: "hidden",
      backgroundColor: backgroundColor,
      zIndex: "2",
      display: "flex",
      alignItems: "center"
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      style: {
        /* flex: "1 0 auto", */paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        display: "flex",
        justifyContent: alignment,
        width: '100%' /* alignItems: "flex-end" */
      },
      children: [footerAlignment === 'left' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [footerText !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: footerText
        }), footerPageNoEnabled == "1" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: pageSize
        }), footerDateEnabled == "1" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: (0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date(), footerDateFormat)
        })]
      }), footerAlignment === 'center' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [footerPageNoEnabled == "1" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: pageSize
        }), footerText !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: footerText
        }), footerDateEnabled == "1" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: (0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date(), footerDateFormat)
        })]
      }), footerAlignment === 'right' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [footerDateEnabled == "1" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: (0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date(), footerDateFormat)
        }), footerPageNoEnabled == "1" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: pageSize
        }), footerText !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: footerText
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./resources/js/Pages/Components/PDFLayout/FourItemRightList.js":
/*!**********************************************************************!*\
  !*** ./resources/js/Pages/Components/PDFLayout/FourItemRightList.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header */ "./resources/js/Pages/Components/PDFLayout/Header.js");
/* harmony import */ var _ProductContentLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductContentLayout */ "./resources/js/Pages/Components/PDFLayout/ProductContentLayout.js");
/* harmony import */ var _ProductImageLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductImageLayout */ "./resources/js/Pages/Components/PDFLayout/ProductImageLayout.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Footer */ "./resources/js/Pages/Components/PDFLayout/Footer.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper */ "./resources/js/Pages/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }








var FourItemRightList = function FourItemRightList(props) {
  var displayPerPageProduct = 4;
  var _props$innerPagePaddi = props.innerPagePadding,
    innerPagePadding = _props$innerPagePaddi === void 0 ? '' : _props$innerPagePaddi,
    _props$pdfWidth = props.pdfWidth,
    pdfWidth = _props$pdfWidth === void 0 ? 21 : _props$pdfWidth,
    _props$pdfHeight = props.pdfHeight,
    pdfHeight = _props$pdfHeight === void 0 ? 29.7 : _props$pdfHeight,
    _props$childExtraHeig = props.childExtraHeight,
    childExtraHeight = _props$childExtraHeig === void 0 ? 0 : _props$childExtraHeig,
    _props$configData = props.configData,
    _props$configData2 = _props$configData === void 0 ? {} : _props$configData,
    _props$configData2$fo = _props$configData2.fontFamily,
    fontFamily = _props$configData2$fo === void 0 ? '' : _props$configData2$fo,
    _props$configData2$fo2 = _props$configData2.fontColor,
    fontColor = _props$configData2$fo2 === void 0 ? '' : _props$configData2$fo2,
    _props$configData2$ba = _props$configData2.backgroundColor,
    backgroundColor = _props$configData2$ba === void 0 ? '' : _props$configData2$ba,
    _props$configData2$lo = _props$configData2.logo,
    logo = _props$configData2$lo === void 0 ? '' : _props$configData2$lo,
    _props$configData2$he = _props$configData2.headerText,
    headerText = _props$configData2$he === void 0 ? '' : _props$configData2$he,
    _props$configData2$he2 = _props$configData2.headerAlignment,
    headerAlignment = _props$configData2$he2 === void 0 ? 'center' : _props$configData2$he2,
    _props$configData2$fo3 = _props$configData2.footerText,
    footerText = _props$configData2$fo3 === void 0 ? '' : _props$configData2$fo3,
    _props$configData2$fo4 = _props$configData2.footerAlignment,
    footerAlignment = _props$configData2$fo4 === void 0 ? 'left' : _props$configData2$fo4,
    _props$configData2$fo5 = _props$configData2.footerPageNoEnabled,
    footerPageNoEnabled = _props$configData2$fo5 === void 0 ? 0 : _props$configData2$fo5,
    _props$configData2$fo6 = _props$configData2.footerDateEnabled,
    footerDateEnabled = _props$configData2$fo6 === void 0 ? 0 : _props$configData2$fo6,
    _props$configData2$fo7 = _props$configData2.footerDateFormat,
    footerDateFormat = _props$configData2$fo7 === void 0 ? 'dd/MM/yy' : _props$configData2$fo7,
    _props$configData2$pr = _props$configData2.productAttributeAlignment,
    productAttributeAlignment = _props$configData2$pr === void 0 ? 'center' : _props$configData2$pr,
    _props$configData2$pr2 = _props$configData2.productAttributes,
    productAttributes = _props$configData2$pr2 === void 0 ? '' : _props$configData2$pr2,
    _props$configData2$pr3 = _props$configData2.productDescriptionCharLimit,
    productDescriptionCharLimit = _props$configData2$pr3 === void 0 ? '' : _props$configData2$pr3,
    _props$configData2$pr4 = _props$configData2.productBackgroundColor,
    productBackgroundColor = _props$configData2$pr4 === void 0 ? '' : _props$configData2$pr4,
    _props$configData2$pr5 = _props$configData2.productAttributeLabelColor,
    productAttributeLabelColor = _props$configData2$pr5 === void 0 ? '' : _props$configData2$pr5,
    _props$configData2$pr6 = _props$configData2.productAttributeValueColor,
    productAttributeValueColor = _props$configData2$pr6 === void 0 ? '' : _props$configData2$pr6,
    _props$configData2$pr7 = _props$configData2.productButtonEnabled,
    productButtonEnabled = _props$configData2$pr7 === void 0 ? "0" : _props$configData2$pr7,
    _props$configData2$pr8 = _props$configData2.priceAdjustment,
    priceAdjustment = _props$configData2$pr8 === void 0 ? '' : _props$configData2$pr8,
    _props$configData2$pr9 = _props$configData2.productChangeInPercentage,
    productChangeInPercentage = _props$configData2$pr9 === void 0 ? '' : _props$configData2$pr9,
    _props$configData2$pr10 = _props$configData2.productTaxPercentage,
    productTaxPercentage = _props$configData2$pr10 === void 0 ? '' : _props$configData2$pr10,
    _props$configData2$se = _props$configData2.selectedProducts,
    selectedProducts = _props$configData2$se === void 0 ? [] : _props$configData2$se,
    _props$configData2$pr11 = _props$configData2.productPageLayoutId,
    productPageLayoutId = _props$configData2$pr11 === void 0 ? '' : _props$configData2$pr11;
  var pageArray = (0,_helper__WEBPACK_IMPORTED_MODULE_4__.objectTo2DArray)(selectedProducts, displayPerPageProduct);
  var pageSize = 1;
  var defaultPDFHeight = pdfHeight;
  var i = 1;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: pageArray.map(function (productItem, pageIndex) {
      pdfHeight = pageSize % 2 === 0 ? pdfHeight + childExtraHeight : defaultPDFHeight;
      var _pageSize = "".concat(pageSize++, "/").concat(pageArray.length);
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        id: "page_id_".concat(pageIndex),
        className: "page",
        style: {
          breakAfter: "page",
          zoom: pdfPreviewZoom,
          position: "relative",
          /* marginBottom: "30px", */width: pdfWidth,
          height: pdfHeight + paperSizeMeasurement
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "inner-page",
          style: {
            padding: innerPagePadding,
            backgroundColor: backgroundColor,
            height: "100%",
            width: "100%",
            fontFamily: fontFamily,
            color: fontColor,
            overflow: "hidden"
          },
          children: [(headerText != '' || logo !== '') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Header__WEBPACK_IMPORTED_MODULE_0__["default"], {
            headerText: headerText,
            headerAlignment: headerAlignment,
            fontFamily: fontFamily,
            fontColor: fontColor,
            backgroundColor: backgroundColor,
            logo: logo
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "container",
            children: [productItem.map(function (pItem) {
              var _pItem$id = pItem.id,
                id = _pItem$id === void 0 ? '' : _pItem$id,
                _pItem$image = pItem.image,
                image = _pItem$image === void 0 ? '' : _pItem$image,
                _pItem$barcode = pItem.barcode,
                barcode = _pItem$barcode === void 0 ? '' : _pItem$barcode;
              image = image === '' || image === null ? "".concat(IMAGE_PREFIX, "images/no_image.png") : image;
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "row",
                style: {
                  height: "25%"
                },
                children: i++ % 2 === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                  className: "column-wrapper",
                  style: {
                    margin: "10px",
                    backgroundColor: productBackgroundColor,
                    color: productAttributeLabelColor
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                    className: "column column-2",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ProductContentLayout__WEBPACK_IMPORTED_MODULE_1__["default"], {
                      valueColor: productAttributeValueColor,
                      productPageLayoutId: productPageLayoutId,
                      fontColor: fontColor,
                      backgroundColor: backgroundColor,
                      productButtonEnabled: productButtonEnabled,
                      priceAdjustment: priceAdjustment,
                      productChangeInPercentage: productChangeInPercentage,
                      productTaxPercentage: productTaxPercentage,
                      productAttributeAlignment: productAttributeAlignment,
                      productAttributes: productAttributes,
                      descriptionCharLimit: productDescriptionCharLimit,
                      productData: pItem
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                    className: "column column-2",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                      style: {
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column"
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ProductImageLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        productImage: image,
                        productAttributes: productAttributes,
                        barcode: barcode
                      })
                    })
                  })]
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                  className: "column-wrapper",
                  style: {
                    margin: "10px",
                    backgroundColor: productBackgroundColor,
                    color: productAttributeLabelColor
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                    className: "column column-2",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                      style: {
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column"
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ProductImageLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        productImage: image,
                        productAttributes: productAttributes,
                        barcode: barcode
                      })
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                    className: "column column-2",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ProductContentLayout__WEBPACK_IMPORTED_MODULE_1__["default"], {
                      valueColor: productAttributeValueColor,
                      productPageLayoutId: productPageLayoutId,
                      fontColor: fontColor,
                      backgroundColor: backgroundColor,
                      productButtonEnabled: productButtonEnabled,
                      priceAdjustment: priceAdjustment,
                      productChangeInPercentage: productChangeInPercentage,
                      productTaxPercentage: productTaxPercentage,
                      productAttributeAlignment: productAttributeAlignment,
                      productAttributes: productAttributes,
                      descriptionCharLimit: productDescriptionCharLimit,
                      productData: pItem
                    })
                  })]
                })
              }, "product_".concat(id));
            }), productItem.length < displayPerPageProduct && _toConsumableArray(Array(displayPerPageProduct - productItem.length)).map(function (x, i) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "row",
                style: {
                  height: "25%"
                },
                children: i++ % 2 === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                  className: "column-wrapper",
                  style: {
                    margin: "10px",
                    backgroundColor: productBackgroundColor,
                    color: productAttributeLabelColor
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                    className: "column column-2",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ProductContentLayout__WEBPACK_IMPORTED_MODULE_1__["default"], {
                      isBlank: true
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                    className: "column column-2",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                      style: {
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column"
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ProductImageLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {})
                    })
                  })]
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                  className: "column-wrapper",
                  style: {
                    margin: "10px",
                    backgroundColor: productBackgroundColor,
                    color: productAttributeLabelColor
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                    className: "column column-2",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                      style: {
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column"
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ProductImageLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {})
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                    className: "column column-2",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ProductContentLayout__WEBPACK_IMPORTED_MODULE_1__["default"], {
                      isBlank: true
                    })
                  })]
                })
              }, "blank_product_".concat(i));
            })]
          }), (footerText != '' || footerPageNoEnabled == '1' || footerDateEnabled == '1') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Footer__WEBPACK_IMPORTED_MODULE_3__["default"], {
            footerText: footerText,
            footerAlignment: footerAlignment,
            fontFamily: fontFamily,
            fontColor: fontColor,
            backgroundColor: backgroundColor,
            footerPageNoEnabled: footerPageNoEnabled,
            footerDateEnabled: footerDateEnabled,
            footerDateFormat: footerDateFormat,
            pageSize: _pageSize
          })]
        })
      }, "pagekey_".concat(pageIndex));
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FourItemRightList);

/***/ }),

/***/ "./resources/js/Pages/Components/PDFLayout/Header.js":
/*!***********************************************************!*\
  !*** ./resources/js/Pages/Components/PDFLayout/Header.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var Header = function Header(data) {
  var _ref, _ref2;
  var _data$headerText = data.headerText,
    headerText = _data$headerText === void 0 ? "" : _data$headerText,
    _data$headerAlignment = data.headerAlignment,
    headerAlignment = _data$headerAlignment === void 0 ? "" : _data$headerAlignment,
    _data$fontFamily = data.fontFamily,
    fontFamily = _data$fontFamily === void 0 ? "" : _data$fontFamily,
    _data$fontColor = data.fontColor,
    fontColor = _data$fontColor === void 0 ? "" : _data$fontColor,
    _data$backgroundColor = data.backgroundColor,
    backgroundColor = _data$backgroundColor === void 0 ? "" : _data$backgroundColor,
    _data$logo = data.logo,
    logo = _data$logo === void 0 ? "" : _data$logo,
    _data$paddingLeft = data.paddingLeft,
    paddingLeft = _data$paddingLeft === void 0 ? "30px" : _data$paddingLeft,
    _data$paddingRight = data.paddingRight,
    paddingRight = _data$paddingRight === void 0 ? "30px" : _data$paddingRight;
  var _logo = logo;
  if (_logo !== '') {
    _logo = logo.indexOf('data:image') > -1 ? logo : "".concat(IMAGE_PREFIX, "uploads/logo/").concat(logo);
  }
  var alignment = 'center';
  if (logo !== '' && headerText !== '') alignment = 'space-between';else if (headerAlignment === 'left') alignment = 'flex-start';else if (headerAlignment === 'right') alignment = 'flex-end';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    id: "header",
    style: {
      width: "100%",
      height: "48px",
      paddingTop: "15px",
      paddingBottom: "15px",
      textAlign: headerAlignment,
      fontSize: "18px",
      lineHeight: "1.2",
      position: "absolute",
      left: "0px",
      top: "0px",
      fontFamily: fontFamily,
      color: fontColor,
      overflow: "hidden",
      backgroundColor: backgroundColor,
      zIndex: "2",
      display: "flex",
      alignItems: "center"
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      style: {
        display: 'flex',
        justifyContent: alignment,
        alignItems: 'center',
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        width: "100%"
      },
      children: headerAlignment === 'right' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [_logo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          style: {
            width: "150px",
            height: "20px",
            backgroundSize: "contain",
            backgroundImage: (_ref = "url(" + _logo) !== null && _ref !== void 0 ? _ref : '' + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            transform: "translate(0px, 0px) scale(1)"
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: headerText !== "" ? headerText : ''
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: headerText !== "" ? headerText : ''
        }), _logo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          style: {
            width: "150px",
            height: "20px",
            backgroundSize: "contain",
            backgroundImage: (_ref2 = "url(" + _logo) !== null && _ref2 !== void 0 ? _ref2 : '' + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            transform: "translate(0px, 0px) scale(1)"
          }
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./resources/js/Pages/Components/PDFLayout/LeftTextLayout.js":
/*!*******************************************************************!*\
  !*** ./resources/js/Pages/Components/PDFLayout/LeftTextLayout.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper */ "./resources/js/Pages/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var LeftTextLayout = function LeftTextLayout(data) {
  var _data$productAttribut = data.productAttributes,
    productAttributes = _data$productAttribut === void 0 ? [] : _data$productAttribut,
    _data$productData = data.productData,
    productData = _data$productData === void 0 ? {} : _data$productData,
    _data$descriptionChar = data.descriptionCharLimit,
    descriptionCharLimit = _data$descriptionChar === void 0 ? 25 : _data$descriptionChar,
    _data$productButtonEn = data.productButtonEnabled,
    productButtonEnabled = _data$productButtonEn === void 0 ? '0' : _data$productButtonEn,
    _data$priceAdjustment = data.priceAdjustment,
    priceAdjustment = _data$priceAdjustment === void 0 ? '' : _data$priceAdjustment,
    _data$productChangeIn = data.productChangeInPercentage,
    productChangeInPercentage = _data$productChangeIn === void 0 ? "" : _data$productChangeIn,
    _data$productTaxPerce = data.productTaxPercentage,
    productTaxPercentage = _data$productTaxPerce === void 0 ? "" : _data$productTaxPerce,
    _data$fontColor = data.fontColor,
    fontColor = _data$fontColor === void 0 ? "" : _data$fontColor,
    _data$backgroundColor = data.backgroundColor,
    backgroundColor = _data$backgroundColor === void 0 ? "" : _data$backgroundColor;
  var _productData$title = productData.title,
    title = _productData$title === void 0 ? '' : _productData$title,
    _productData$sku = productData.sku,
    sku = _productData$sku === void 0 ? '' : _productData$sku,
    _productData$descript = productData.description,
    description = _productData$descript === void 0 ? '' : _productData$descript,
    _productData$price = productData.price,
    price = _productData$price === void 0 ? '' : _productData$price,
    _productData$storeurl = productData.storeurl,
    storeurl = _productData$storeurl === void 0 ? '' : _productData$storeurl;
  var _description = description !== null ? (0,_helper__WEBPACK_IMPORTED_MODULE_1__.displayStringBaseOnLimit)(description, descriptionCharLimit) : '';

  //Get the price without currency..
  price = price.replaceAll(',', '');
  var matches = price.match(/[0-9]*\.?[0-9]+/g);
  var orignalPrice = matches[0];

  //Price Calculation...
  var newPrice = Number(orignalPrice),
    taxPrice = 0;
  //Price Adjustment calculation.
  if (priceAdjustment !== '') {
    var changePrice = newPrice * Number(productChangeInPercentage) / 100;
    newPrice = priceAdjustment == '1' ? newPrice - changePrice : newPrice + changePrice;
  }
  //Price Tax calculation.
  if (productTaxPercentage !== '') {
    taxPrice = newPrice * Number(productTaxPercentage) / 100;
    newPrice += taxPrice;
    taxPrice = price.replace(/[0-9]*\.?[0-9]+/g, taxPrice.toFixed(2));
  }
  newPrice = price.replace(/[0-9]*\.?[0-9]+/g, newPrice.toFixed(2));
  var fontSize = "0.7em";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "custom-description",
      style: {
        display: "flex",
        fontSize: fontSize,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        padding: "10px"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "custom-title",
        style: {
          flex: "1 1 auto"
        },
        children: [productAttributes.includes('name') && title !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          style: {
            letterSpacing: "0.1px"
          },
          children: title
        }), productAttributes.includes('sku') && sku !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "custom-sku",
          style: {
            opacity: "0.7"
          },
          children: sku
        }), productAttributes.includes('description') && description !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "custom-sku",
          style: {
            opacity: "0.7"
          },
          children: _description
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        style: {
          flex: "0 1 auto",
          display: "flex",
          opacity: "0.7",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "175px"
        },
        children: [productAttributes.includes('price') && productTaxPercentage > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
            className: "custom-price",
            children: ["Tax ", taxPrice]
          })
        }), productAttributes.includes('price') && newPrice !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
            className: "custom-price",
            children: newPrice
          })
        }), productButtonEnabled == '1' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
            href: storeurl,
            style: {
              backgroundColor: fontColor,
              color: backgroundColor,
              textAlign: "center",
              padding: "10px 15px",
              width: "100%",
              display: "block",
              borderRadius: "10px",
              marginTop: "10px",
              textDecoration: "none",
              lineHeight: "normal"
            },
            target: "_blank",
            children: "Buy Now"
          })
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LeftTextLayout);

/***/ }),

/***/ "./resources/js/Pages/Components/PDFLayout/LineByLineTextLayout.js":
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/Components/PDFLayout/LineByLineTextLayout.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper */ "./resources/js/Pages/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var LineByLineTextLayout = function LineByLineTextLayout(data) {
  var _data$valueColor = data.valueColor,
    valueColor = _data$valueColor === void 0 ? '' : _data$valueColor,
    _data$productAttribut = data.productAttributes,
    productAttributes = _data$productAttribut === void 0 ? [] : _data$productAttribut,
    _data$productData = data.productData,
    productData = _data$productData === void 0 ? {} : _data$productData,
    _data$descriptionChar = data.descriptionCharLimit,
    descriptionCharLimit = _data$descriptionChar === void 0 ? 25 : _data$descriptionChar,
    _data$productButtonEn = data.productButtonEnabled,
    productButtonEnabled = _data$productButtonEn === void 0 ? '0' : _data$productButtonEn,
    _data$priceAdjustment = data.priceAdjustment,
    priceAdjustment = _data$priceAdjustment === void 0 ? '' : _data$priceAdjustment,
    _data$productChangeIn = data.productChangeInPercentage,
    productChangeInPercentage = _data$productChangeIn === void 0 ? "" : _data$productChangeIn,
    _data$productTaxPerce = data.productTaxPercentage,
    productTaxPercentage = _data$productTaxPerce === void 0 ? "" : _data$productTaxPerce,
    _data$fontColor = data.fontColor,
    fontColor = _data$fontColor === void 0 ? "" : _data$fontColor,
    _data$backgroundColor = data.backgroundColor,
    backgroundColor = _data$backgroundColor === void 0 ? "" : _data$backgroundColor;
  var _productData$title = productData.title,
    title = _productData$title === void 0 ? '' : _productData$title,
    _productData$sku = productData.sku,
    sku = _productData$sku === void 0 ? '' : _productData$sku,
    _productData$descript = productData.description,
    description = _productData$descript === void 0 ? '' : _productData$descript,
    _productData$price = productData.price,
    price = _productData$price === void 0 ? '' : _productData$price,
    _productData$storeurl = productData.storeurl,
    storeurl = _productData$storeurl === void 0 ? '' : _productData$storeurl;
  var _description = description !== null ? (0,_helper__WEBPACK_IMPORTED_MODULE_1__.displayStringBaseOnLimit)(description, descriptionCharLimit) : '';

  //Get the price without currency..
  price = price.replaceAll(',', '');
  var matches = price.match(/[0-9]*\.?[0-9]+/g);
  var orignalPrice = matches[0];

  //Price Calculation...
  var newPrice = Number(orignalPrice),
    taxPrice = 0;
  //Price Adjustment calculation.
  if (priceAdjustment !== '') {
    var changePrice = newPrice * Number(productChangeInPercentage) / 100;
    newPrice = priceAdjustment == '1' ? newPrice - changePrice : newPrice + changePrice;
  }
  //Price Tax calculation.
  if (productTaxPercentage !== '') {
    taxPrice = newPrice * Number(productTaxPercentage) / 100;
    newPrice += taxPrice;
    taxPrice = price.replace(/[0-9]*\.?[0-9]+/g, taxPrice.toFixed(2));
  }
  newPrice = price.replace(/[0-9]*\.?[0-9]+/g, newPrice.toFixed(2));
  var fontSize = "0.7em";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "custom-description",
      style: {
        display: "flex",
        flexDirection: "column",
        fontSize: fontSize,
        width: "100%",
        padding: "10px"
      },
      children: [productAttributes.includes('name') && title !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          children: title
        })
      }), productAttributes.includes('sku') && sku !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        style: {
          display: "flex",
          opacity: "0.7"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          style: {
            flex: "1 0 auto"
          },
          children: "SKU : "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          style: {
            flex: "1 1 auto",
            justifyContent: "flex-end",
            display: "flex",
            color: valueColor
          },
          children: sku
        })]
      }), productAttributes.includes('description') && description !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        style: {
          display: "flex",
          opacity: "0.7"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          style: {
            flex: "1 0 auto"
          },
          children: "Description : "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          style: {
            flex: "1 1 auto",
            justifyContent: "flex-end",
            display: "flex",
            color: valueColor
          },
          children: _description
        })]
      }), productAttributes.includes('price') && productTaxPercentage > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        style: {
          display: "flex",
          opacity: "0.7"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          style: {
            flex: "1 0 auto"
          },
          children: "Tax : "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          style: {
            flex: "1 1 auto",
            justifyContent: "flex-end",
            display: "flex",
            color: valueColor
          },
          children: taxPrice
        })]
      }), productAttributes.includes('price') && newPrice !== '' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        style: {
          display: "flex",
          opacity: "0.7"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          style: {
            flex: "1 0 auto"
          },
          children: "Price : "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          style: {
            flex: "1 1 auto",
            justifyContent: "flex-end",
            display: "flex",
            color: valueColor
          },
          children: newPrice
        })]
      }), productButtonEnabled == '1' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        style: {
          opacity: "0.7"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
          href: storeurl,
          style: {
            backgroundColor: fontColor,
            color: backgroundColor,
            textAlign: "center",
            padding: "10px 15px",
            width: "100%",
            display: "block",
            borderRadius: "10px",
            marginTop: "10px",
            textDecoration: "none",
            lineHeight: "normal"
          },
          target: "_blank",
          children: "Buy Now"
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LineByLineTextLayout);

/***/ }),

/***/ "./resources/js/Pages/Components/PDFLayout/ProductContentLayout.js":
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/Components/PDFLayout/ProductContentLayout.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DefaultTextLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DefaultTextLayout */ "./resources/js/Pages/Components/PDFLayout/DefaultTextLayout.js");
/* harmony import */ var _LeftTextLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LeftTextLayout */ "./resources/js/Pages/Components/PDFLayout/LeftTextLayout.js");
/* harmony import */ var _LineByLineTextLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LineByLineTextLayout */ "./resources/js/Pages/Components/PDFLayout/LineByLineTextLayout.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper */ "./resources/js/Pages/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }








var ProductContentLayout = function ProductContentLayout(data) {
  var _data$productAttribut = data.productAttributeAlignment,
    productAttributeAlignment = _data$productAttribut === void 0 ? 'center' : _data$productAttribut,
    _data$productAttribut2 = data.productAttributes,
    productAttributes = _data$productAttribut2 === void 0 ? '' : _data$productAttribut2,
    _data$isBlank = data.isBlank,
    isBlank = _data$isBlank === void 0 ? false : _data$isBlank,
    _data$productPageLayo = data.productPageLayoutId,
    productPageLayoutId = _data$productPageLayo === void 0 ? '' : _data$productPageLayo;
  var productArributeArray = (0,_helper__WEBPACK_IMPORTED_MODULE_4__.convertStrToArr)(productAttributes);
  var contentMargin = ['oneItemGrid', 'twoItemGrid', 'threeItemGrid', 'threeItemGridReverse', 'fourItemGrid', 'fiveItemGrid', 'sixItemGrid', 'eightItemGrid', 'tenItemGrid'].includes(productPageLayoutId) ? "10px 0" : "0 10px";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: isBlank ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "slot-row bottom",
      style: {
        fontSize: "20px",
        lineHeight: "1.3em",
        margin: contentMargin
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        style: {
          width: "100%"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "custom-description",
          style: {
            display: "flex",
            flexDirection: "column"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {})
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            style: {
              display: "flex",
              opacity: "0.7",
              fontSize: "0.9em"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              style: {
                flex: "1 1 auto",
                justifyContent: "flex-end",
                display: "flex"
              }
            })
          })]
        })
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "slot-row bottom",
      style: {
        fontSize: "20px",
        lineHeight: "1.3em",
        margin: contentMargin
      },
      children: [(productAttributeAlignment === '' || productAttributeAlignment === 'center') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_DefaultTextLayout__WEBPACK_IMPORTED_MODULE_1__["default"], _objectSpread({}, _objectSpread(_objectSpread({}, data), {}, {
        productArributeArray: productArributeArray
      }))), productAttributeAlignment === 'left' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_LeftTextLayout__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({}, _objectSpread(_objectSpread({}, data), {}, {
        productArributeArray: productArributeArray
      }))), productAttributeAlignment === 'line_by_line' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_LineByLineTextLayout__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread({}, _objectSpread(_objectSpread({}, data), {}, {
        productArributeArray: productArributeArray
      })))]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductContentLayout);

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
    backgroundSize = _data$backgroundSize === void 0 ? pdfBackgroundImgSize : _data$backgroundSize;
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
          backgroundSize: backgroundSize,
          backgroundImage: "url(" + productImage + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
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