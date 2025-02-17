import { Suspense, lazy } from 'react';
import { Spinner } from '@shopify/polaris';
const FrontImage = lazy(() => import('./PDFLayout/FrontImage'));
const BackImage = lazy(() => import('./PDFLayout/BackImage'));
const OneItemGrid = lazy(() => import("./PDFLayout/OneItemGrid"));
const TwoItemGrid = lazy(() => import("./PDFLayout/TwoItemGrid"));
const TwoItemList = lazy(() => import("./PDFLayout/TwoItemList"));
const TwoItemLeftList = lazy(() => import("./PDFLayout/TwoItemLeftList"));
const TwoItemRightList = lazy(() => import("./PDFLayout/TwoItemRightList"));
const ThreeItemGrid = lazy(() => import("./PDFLayout/ThreeItemGrid"));
const ThreeItemGridReverse = lazy(() => import("./PDFLayout/ThreeItemGridReverse"));
const ThreeItemList = lazy(() => import("./PDFLayout/ThreeItemList"));
const ThreeItemLeftList = lazy(() => import("./PDFLayout/ThreeItemLeftList"));
const ThreeItemRightList = lazy(() => import("./PDFLayout/ThreeItemRightList"));
const FourItemGrid = lazy(() => import("./PDFLayout/FourItemGrid"));
const FourItemList = lazy(() => import("./PDFLayout/FourItemList"));
const FourItemLeftList = lazy(() => import("./PDFLayout/FourItemLeftList"));
const FourItemRightList = lazy(() => import("./PDFLayout/FourItemRightList"));
const FiveItemGrid = lazy(() => import("./PDFLayout/FiveItemGrid"));
const FiveItemList = lazy(() => import("./PDFLayout/FiveItemList"));
const SixItemGrid = lazy(() => import("./PDFLayout/SixItemGrid"));
const SixItemList = lazy(() => import("./PDFLayout/SixItemList"));
const EightItemGrid = lazy(() => import("./PDFLayout/EightItemGrid"));
const TenItemGrid = lazy(() => import("./PDFLayout/TenItemGrid"));
import { convertPaperSize, getCurrentPDFPageSize, autoPDFSize } from "../helper";

const PDFPreview = (props) => {
    let {
        configData: {
            frontImage = '',
            backImage = '',
            headerText = '',
            footerText = '',
            productPageLayoutId = '',
            pdfLayout = 'portrait',
            paperLayout = 'a4',
            selectedProducts = []
        } = {}
    } = props;

    //inner page padding calculation.
    let innerPagePadding = "20px";
    if (headerText !== '' && footerText !== '')
        innerPagePadding = "38px 20px";
    else if (headerText !== '')
        innerPagePadding = "38px 20px 20px";
    else if (footerText !== '')
        innerPagePadding = "20px 20px 38px";

    if (frontImage !== '') {
        frontImage = frontImage.indexOf('data:image') > -1 ? frontImage : `${IMAGE_PREFIX}uploads/frontImage/${frontImage}`;

        // frontImage = frontImage.indexOf('data:image') > -1 ? frontImage : `/uploads/frontImage/${frontImage}`;
    }

    if (backImage !== '') {
        backImage = backImage.indexOf('data:image') > -1 ? backImage : `${IMAGE_PREFIX}uploads/backImage/${backImage}`;

        // backImage = backImage.indexOf('data:image') > -1 ? backImage : `/uploads/backImage/${backImage}`;
    }

    let { width: pdfWidth = 21, height: pdfHeight = 29.7, convertHeight = 0 } = convertPaperSize(paperLayout, pdfLayout);
    pdfWidth = '100%';
    const pageSize = getCurrentPDFPageSize(productPageLayoutId, selectedProducts);

    //Start Calculate height for main page of pdf generation. base on product layout..
    let mainPageHeight = `${convertHeight * selectedProducts.length}`;
    const { [`${paperLayout}_${productPageLayoutId}`]: { main: extraHeight = 0, sub: childExtraHeight = 0, isFrontImg = 0, extraFrontImg = 0 } = {} } = autoPDFSize();
    convertHeight = convertHeight + extraHeight;
    pdfHeight = convertHeight;
    mainPageHeight = convertHeight * pageSize;
    if (pageSize > 3)
        mainPageHeight += (childExtraHeight * 2) * pageSize / 4;

    let isShowFront, isShowBack = false;
    if (frontImage !== "") {
        mainPageHeight += convertHeight + isFrontImg;
        isShowFront = true;
    }
    if (backImage !== "") {
        mainPageHeight += convertHeight;
        isShowBack = true;
    }
    //End Calculate height for main page of pdf generation. base on product layout..

    return (
        <>
            <div id="pdfLayout" className="pdf_layout_area" style={{ height: mainPageHeight + paperSizeMeasurement }}>
                <Suspense fallback={<Spinner accessibilityLabel="Small spinner example" size="large" />}>
                    {frontImage !== "" && <FrontImage frontImage={frontImage} pdfWidth={pdfWidth} pdfHeight={convertHeight + extraFrontImg} />}
                    {/* Start Product Layout */}
                    {productPageLayoutId === 'oneItemGrid' && <OneItemGrid childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'twoItemGrid' && <TwoItemGrid isShowFront={isShowFront} isShowBack={isShowBack} childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'twoItemList' && <TwoItemList isShowFront={isShowFront} isShowBack={isShowBack} childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'twoItemLeftList' && <TwoItemLeftList isShowFront={isShowFront} isShowBack={isShowBack} childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'twoItemRightList' && <TwoItemRightList isShowFront={isShowFront} isShowBack={isShowBack} childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'threeItemGrid' && <ThreeItemGrid childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'threeItemGridReverse' && <ThreeItemGridReverse childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'threeItemList' && <ThreeItemList childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'threeItemLeftList' && <ThreeItemLeftList childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'threeItemRightList' && <ThreeItemRightList childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'fourItemGrid' && <FourItemGrid childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'fourItemList' && <FourItemList childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'fourItemLeftList' && <FourItemLeftList childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'fourItemRightList' && <FourItemRightList childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'fiveItemGrid' && <FiveItemGrid childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'fiveItemList' && <FiveItemList childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'sixItemGrid' && <SixItemGrid childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'sixItemList' && <SixItemList childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'eightItemGrid' && <EightItemGrid childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {productPageLayoutId === 'tenItemGrid' && <TenItemGrid childExtraHeight={childExtraHeight} innerPagePadding={innerPagePadding} pdfWidth={pdfWidth} pdfHeight={pdfHeight} {...props} />}
                    {/* End Product Layout */}
                    {backImage !== "" && <BackImage backImage={backImage} pdfWidth={pdfWidth} pdfHeight={convertHeight} />}
                </Suspense>
            </div >
            {/* </LegacyCard> */}
        </>
    )
}

export default PDFPreview;