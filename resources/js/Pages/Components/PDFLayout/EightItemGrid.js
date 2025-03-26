import { Fragment } from "react";
import Header from "./Header";
import ProductContentLayout from "./ProductContentLayout";
import ProductImageLayout from "./ProductImageLayout";
import Footer from "./Footer";
import { objectTo2DArray } from "../../helper";
import { A5PaperSize, commonLevel, legalPaperSize, letterPaperSize } from "./commanLevel";

const displayPerPageProduct = 8;

// Function to create rows with two columns
const DrawGridLayout = (data = {}) => {
    const { configData = {}, productItem = [] , paperLayout = ''} = data;
    const {
        productPageLayoutId = "",
        fontColor = "",
        backgroundColor = "",
        productButtonEnabled = "0",
        priceAdjustment = "",
        productChangeInPercentage = "",
        productTaxPercentage = "",
        productAttributeValueColor = "",
        productAttributeAlignment = "",
        productAttributes = "",
        productDescriptionCharLimit = "",
        productBackgroundColor = "",
        productAttributeLabelColor = "",
    } = configData;
    const rows = [];
    let j = 1;
    const emptyItems = displayPerPageProduct - productItem.length;
    if (emptyItems > 0) {
        for (let k = 0; k < emptyItems; k++) {
            productItem.push({});
        }
    }
    for (let i = 0; i < productItem.length; i += 2) {
        rows.push(
            <div
                key={`product_${i / 2}`}
                className="row"
                style={{ height: "25%" }}
            >
                <div className="column-wrapper">
                    {/* Creating columns for each row */}
                    {productItem.slice(i, i + 2).map((pItem) => {
                        let { id = "", image = "", barcode = "" } = pItem;
                        image =
                            image === "" || image === null
                                ? `${IMAGE_PREFIX}images/no_image.png`
                                : image;

                        return (
                            <Fragment
                                key={`column_key_${id !== "" ? id : 2 ** ++j}`}
                            >
                                {Object.keys(pItem).length > 0 ? (
                                    <div
                                        className="column column-2"
                                        style={{
                                            margin: "10px",
                                            backgroundColor:
                                                productBackgroundColor,
                                            color: productAttributeLabelColor,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flex: "1 1 auto",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <ProductImageLayout
                                                {...{
                                                    productImage: image,
                                                    productAttributes,
                                                    barcode,
                                                }}
                                            />
                                            <ProductContentLayout
                                                {...{
                                                    valueColor:
                                                        productAttributeValueColor,
                                                    productPageLayoutId,
                                                    fontColor,
                                                    backgroundColor,
                                                    productButtonEnabled,
                                                    priceAdjustment,
                                                    productChangeInPercentage,
                                                    productTaxPercentage,
                                                    productAttributeAlignment,
                                                    productAttributes,
                                                    descriptionCharLimit:
                                                        productDescriptionCharLimit,
                                                    productData: pItem,
                                                    paperLayout : paperLayout
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="column column-2"
                                        style={{ margin: "10px" }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flex: "1 1 auto",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <ProductImageLayout />
                                        </div>
                                    </div>
                                )}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        );
    }
    return rows;
};

const EightItemGrid = (props) => {
    let {
        innerPagePadding = "",
        pdfWidth = 21,
        pdfHeight = 29.7,
        childExtraHeight = 0,
        configData: {
            fontFamily = "",
            fontColor = "",
            backgroundColor = "",
            logo = "",
            headerText = "",
            headerAlignment = "center",
            footerText = "",
            footerAlignment = "left",
            footerPageNoEnabled = 0,
            footerDateEnabled = 0,
            footerDateFormat = "dd/MM/yy",
            selectedProducts = [],
            paperLayout = "",
        } = {},
        configData = {},
    } = props;
    const pageArray = objectTo2DArray(selectedProducts, displayPerPageProduct);
    let pageSize = 1;
    const defaultPDFHeight = pdfHeight;
    let i = 1;
    return (
        <>
            {pageArray.map((productItem, pageIndex) => {
                pdfHeight =
                    pageSize % 2 === 0
                        ? pdfHeight + childExtraHeight
                        : defaultPDFHeight;
                const _pageSize = `${pageSize++}/${pageArray.length}`;
                const { zoomSize } = commonLevel(paperLayout);
                return (
                    <div
                        key={`pagekey_${pageIndex}`}
                        id={`page_id_${pageIndex}`}
                        className="page"
                        style={{
                            breakAfter: "page",
                            zoom: zoomSize,
                            position: "relative",
                            /* marginBottom: "30px", */ width: pdfWidth,
                            height:
                                paperLayout === "legal"
                                    ? legalPaperSize
                                        : paperLayout === "a5"
                                    ? A5PaperSize
                                    : paperLayout === "letter"
                                    ? letterPaperSize
                                    : pdfHeight + paperSizeMeasurement,
                        }}
                    >
                        <div
                            className="inner-page"
                            style={{
                                padding: innerPagePadding,
                                backgroundColor: backgroundColor,
                                height: "100%",
                                width: "100%",
                                fontFamily: fontFamily,
                                color: fontColor,
                                overflow: "hidden",
                            }}
                        >
                            {(headerText != "" || logo !== "") && (
                                <Header
                                    {...{
                                        headerText,
                                        headerAlignment,
                                        fontFamily,
                                        fontColor,
                                        backgroundColor,
                                        logo,
                                        paperLayout : paperLayout
                                    }}
                                />
                            )}
                            <div className="container">
                                <DrawGridLayout
                                    configData={configData}
                                    productItem={productItem}
                                    paperLayout={paperLayout}
                                />
                            </div>
                            {(footerText != "" ||
                                footerPageNoEnabled == "1" ||
                                footerDateEnabled == "1") && (
                                <Footer
                                    {...{
                                        footerText,
                                        footerAlignment,
                                        fontFamily,
                                        fontColor,
                                        backgroundColor,
                                        footerPageNoEnabled,
                                        footerDateEnabled,
                                        footerDateFormat,
                                        pageSize: _pageSize,
                                        paperLayout : paperLayout
                                    }}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default EightItemGrid;
