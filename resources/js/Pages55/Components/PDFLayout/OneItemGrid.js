import Header from './Header';
import ProductContentLayout from './ProductContentLayout';
import ProductImageLayout from './ProductImageLayout';
import Footer from './Footer';

const OneItemGrid = (props) => {
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
            productAttributeAlignment = 'center',
            productAttributes = '',
            productDescriptionCharLimit = '',
            productBackgroundColor = '',
            productAttributeLabelColor = '',
            productAttributeValueColor = '',
            productButtonEnabled = "0",
            priceAdjustment = '',
            productChangeInPercentage = '',
            productTaxPercentage = '',
            selectedProducts = [],
            productPageLayoutId = ''
        } = {}
    } = props;
    let pageSize = 1;
    const defaultPDFHeight = pdfHeight;
    const backgroundPosition = "center center";

    return (
        <>
            {selectedProducts.map((pItem, pageIndex) => {
                let { id = '', image = '', barcode = '' } = pItem;
                image = image === '' || image === null ? `${IMAGE_PREFIX}images/no_image.png` : image;

                pdfHeight = pageSize % 2 === 0 ? pdfHeight + childExtraHeight : defaultPDFHeight;
                const _pageSize = `${pageSize++}/${selectedProducts.length}`;
                return (
                    <div key={`pagekey_${id}`} id={`page_id_${pageIndex}`} className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", /* marginBottom: "30px", */ width: pdfWidth, height: pdfHeight + paperSizeMeasurement }}>
                        <div className="inner-page" style={{ padding: innerPagePadding, backgroundColor: backgroundColor, height: "100%", width: "100%", fontFamily: fontFamily, color: fontColor, overflow: "hidden" }}>
                            {(headerText != '' || logo !== '') && <Header {...{ headerText, headerAlignment, fontFamily, fontColor, backgroundColor, logo }} />}
                            <div className="container">
                                <div className="row" style={{ height: "100%", margin: "10px", backgroundColor: productBackgroundColor, color: productAttributeLabelColor }}>
                                    <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                        <ProductImageLayout {...{ productImage: image, productAttributes, barcode,backgroundPosition}} />
                                        <ProductContentLayout {...{ valueColor: productAttributeValueColor, productPageLayoutId, fontColor, backgroundColor, productButtonEnabled, priceAdjustment, productChangeInPercentage, productTaxPercentage, productAttributeAlignment, productAttributes, descriptionCharLimit: productDescriptionCharLimit, productData: pItem }} />
                                    </div>
                                </div>
                            </div>
                            {(footerText != '' || footerPageNoEnabled == '1' || footerDateEnabled == '1') && <Footer {...{ footerText, footerAlignment, fontFamily, fontColor, backgroundColor, footerPageNoEnabled, footerDateEnabled, footerDateFormat, pageSize: _pageSize }} />}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default OneItemGrid;