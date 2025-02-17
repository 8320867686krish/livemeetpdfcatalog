import { Fragment } from 'react';
import Header from './Header';
import ProductContentLayout from './ProductContentLayout';
import ProductImageLayout from './ProductImageLayout';
import Footer from './Footer';
import { objectTo2DArray } from "../../helper";

const displayPerPageProduct = 3;

// Function to create rows with two columns
const DrawGridLayout = (data = {}) => {
    const { configData = {}, productItem = [] } = data;
    const { productPageLayoutId = '', fontColor = "", backgroundColor = "", productButtonEnabled = "0", priceAdjustment = "", productChangeInPercentage = "", productTaxPercentage = "", productAttributeValueColor = '', productAttributeAlignment = '', productAttributes = '', productDescriptionCharLimit = '', productBackgroundColor = '', productAttributeLabelColor = '' } = configData;
    const rows = [];
    let j = 1;
    const emptyItems = displayPerPageProduct - productItem.length;
    if (emptyItems > 0) {
        for (let k = 0; k < emptyItems; k++) {
            productItem.push({});
        }
    }
    for (let i = 0; i < productItem.length; i += 3) {
        const product1 = productItem[0]['image'] === '' || productItem[0]['image'] === null ? `${IMAGE_PREFIX}images/no_image.png` : productItem[0]['image'];

        rows.push(
            <>
                <div key={`product_${i ** ++j}`} className="row" style={{ height: "14.85cm", margin: "0 5px", backgroundColor: productBackgroundColor, color: productAttributeLabelColor }}>
                    <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                        <ProductImageLayout {...{ productImage: product1, productAttributes, barCode: productItem[0]['barCode'] }} />
                        <ProductContentLayout {...{ valueColor: productAttributeValueColor, productPageLayoutId, fontColor, backgroundColor, productButtonEnabled, priceAdjustment, productChangeInPercentage, productTaxPercentage, productAttributeAlignment, productAttributes, descriptionCharLimit: productDescriptionCharLimit, productData: productItem[0] }} />
                    </div>
                </div>
                <div key={`product_${i / 3}`} className="row" style={{ height: "14.85cm" }}>
                    <div className="column-wrapper">
                        {/* Creating columns for each row */}
                        {productItem.slice(1, i + 3).map(pItem => {
                            let { id = '', image = '', barcode = '' } = pItem;
                            image = image === '' || image === null ? `${IMAGE_PREFIX}images/no_image.png` : image;

                            return (<Fragment key={`column_key_${id !== undefined ? id : 2 ** ++j}`}>
                                {Object.keys(pItem).length > 0
                                    ?
                                    <div className="column column-2 " style={{ margin: "10px 5px", backgroundColor: productBackgroundColor, color: productAttributeLabelColor }}>
                                        <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                            <ProductImageLayout {...{ productImage: image, productAttributes, barcode }} />
                                            <ProductContentLayout {...{ valueColor: productAttributeValueColor, productPageLayoutId, fontColor, backgroundColor, productButtonEnabled, priceAdjustment, productChangeInPercentage, productTaxPercentage, productAttributeAlignment, productAttributes, descriptionCharLimit: productDescriptionCharLimit, productData: pItem }} />
                                        </div>
                                    </div>
                                    :
                                    <div className="column column-2 " style={{ margin: "10px" }}>
                                        <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                            <ProductImageLayout />
                                        </div>
                                    </div>
                                }
                            </Fragment>
                            )
                        })}
                    </div>
                </div>
            </>
        );
    }
    return rows;
};

const ThreeItemGrid = (props) => {
    let {
        innerPagePadding = '',
        pdfWidth = 21,
        pdfHeight = 29.7,
        childExtraHeight = 0,
        configData: {
            fontFamily = '',
            fontColor = '',
            backgroundColor = '',
            logo = '',
            headerText = '',
            headerAlignment = 'center',
            footerText = '',
            footerAlignment = 'left',
            footerPageNoEnabled = 0,
            footerDateEnabled = 0,
            footerDateFormat = 'dd/MM/yy',
            selectedProducts = []
        } = {},
        configData = {}
    } = props;
    const pageArray = objectTo2DArray(selectedProducts, displayPerPageProduct);
    let pageSize = 1;
    const defaultPDFHeight = pdfHeight;
    let i = 1;
    return (
        <>
            {pageArray.map((productItem, pageIndex) => {
                pdfHeight = pageSize % 2 === 0 ? pdfHeight + childExtraHeight : defaultPDFHeight;
                const _pageSize = `${pageSize++}/${pageArray.length}`;
                return (
                    <div key={`pagekey_${pageIndex}`} id={`page_id_${pageIndex}`} className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", /* marginBottom: "30px", */ width: pdfWidth, height: pdfHeight + paperSizeMeasurement }}>
                        <div className="inner-page" style={{ padding: innerPagePadding, backgroundColor: backgroundColor, height: "100%", width: "100%", fontFamily: fontFamily, color: fontColor, overflow: "hidden" }}>
                            {(headerText != '' || logo !== '') && <Header {...{ headerText, paddingLeft: "25px", paddingRight: "27px", headerAlignment, fontFamily, fontColor, backgroundColor, logo }} />}
                            <div className="container">
                                <DrawGridLayout configData={configData} productItem={productItem} />
                            </div>
                            {(footerText != '' || footerPageNoEnabled == '1' || footerDateEnabled == '1') && <Footer {...{ footerText, paddingLeft: "25px", paddingRight: "25px", footerAlignment, fontFamily, fontColor, backgroundColor, footerPageNoEnabled, footerDateEnabled, footerDateFormat, pageSize: _pageSize }} />}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ThreeItemGrid;