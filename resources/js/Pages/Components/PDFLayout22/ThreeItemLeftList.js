import Header from "./Header";
import ProductContentLayout from "./ProductContentLayout";
import ProductImageLayout from "./ProductImageLayout";
import Footer from "./Footer";
import { objectTo2DArray } from "../../helper";
import { A5PaperSize, commonLevel, legalPaperSize, letterPaperSize } from "./commanLevel";

const ThreeItemLeftList = (props) => {
    const displayPerPageProduct = 3;
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
            productAttributeAlignment = "center",
            productAttributes = "",
            productDescriptionCharLimit = "",
            productBackgroundColor = "",
            productAttributeLabelColor = "",
            productAttributeValueColor = "",
            productButtonEnabled = "0",
            priceAdjustment = "",
            productChangeInPercentage = "",
            productTaxPercentage = "",
            selectedProducts = [],
            productPageLayoutId = "",
            paperLayout = "",
        } = {},
    } = props;
    const pageArray = objectTo2DArray(selectedProducts, displayPerPageProduct);
    let pageSize = 1;
    const defaultPDFHeight = pdfHeight;
    let i = 1;
    return (
        <>
            {pageArray.map((productItem, pageIndex) => {
                pdfHeight =
                    pageSize % 3 === 0
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
                                        paperLayout: paperLayout,
                                    }}
                                />
                            )}
                            <div className="container">
                                {productItem.map((pItem, pIndex) => {
                                    let {
                                        id = "",
                                        image = "",
                                        barcode = "",
                                    } = pItem;
                                    image =
                                        image === "" || image === null
                                            ? `${IMAGE_PREFIX}images/no_image.png`
                                            : image;

                                    return (
                                        <div
                                            key={`product_${id}`}
                                            className="row"
                                            style={{ height: "25%" }}
                                        >
                                            {i++ % 2 === 0 ? (
                                                <div
                                                    className="column-wrapper"
                                                    style={{
                                                        margin: "10px",
                                                        backgroundColor:
                                                            productBackgroundColor,
                                                        color: productAttributeLabelColor,
                                                    }}
                                                >
                                                    <div className="column column-2">
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
                                                                productData:
                                                                    pItem,
                                                                paperLayout:
                                                                    paperLayout,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="column column-2">
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flex: "1 1 auto",
                                                                flexDirection:
                                                                    "column",
                                                            }}
                                                        >
                                                            <ProductImageLayout
                                                                {...{
                                                                    productImage:
                                                                        image,
                                                                    productAttributes,
                                                                    barcode,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className="column-wrapper"
                                                    style={{
                                                        margin: "10px",
                                                        backgroundColor:
                                                            productBackgroundColor,
                                                        color: productAttributeLabelColor,
                                                    }}
                                                >
                                                    <div className="column column-2">
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flex: "1 1 auto",
                                                                flexDirection:
                                                                    "column",
                                                            }}
                                                        >
                                                            <ProductImageLayout
                                                                {...{
                                                                    productImage:
                                                                        image,
                                                                    productAttributes,
                                                                    barcode,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="column column-2">
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
                                                                productData:
                                                                    pItem,
                                                                paperLayout:
                                                                    paperLayout,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                {productItem.length < displayPerPageProduct &&
                                    [
                                        ...Array(
                                            displayPerPageProduct -
                                                productItem.length
                                        ),
                                    ].map((x, i) => {
                                        return (
                                            <div
                                                key={`blank_product_${i}`}
                                                className="row"
                                                style={{ height: "25%" }}
                                            >
                                                {i++ % 2 === 0 ? (
                                                    <div
                                                        className="column-wrapper"
                                                        style={{
                                                            margin: "10px"
                                                        }}
                                                    >
                                                        <div className="column column-2">
                                                            <ProductContentLayout
                                                                isBlank={true}
                                                            />
                                                        </div>
                                                        <div className="column column-2">
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flex: "1 1 auto",
                                                                    flexDirection:
                                                                        "column",
                                                                }}
                                                            >
                                                                <ProductImageLayout />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="column-wrapper"
                                                        style={{
                                                            margin: "10px"
                                                        }}
                                                    >
                                                        <div className="column column-2">
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flex: "1 1 auto",
                                                                    flexDirection:
                                                                        "column",
                                                                }}
                                                            >
                                                                <ProductImageLayout />
                                                            </div>
                                                        </div>
                                                        <div className="column column-2">
                                                            <ProductContentLayout
                                                                isBlank={true}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
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
                                        paperLayout: paperLayout,
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

export default ThreeItemLeftList;
