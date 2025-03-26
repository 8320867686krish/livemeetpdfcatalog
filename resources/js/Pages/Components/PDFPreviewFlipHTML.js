import { Button, LegacyCard } from '@shopify/polaris';
import HTMLFlipBook from "react-pageflip";

const PDFPreview = (props) => {
    let {
        configData: {
            frontImage = '',
            backImage = '',
            headerText = '',
            footerText = '',
            productPageLayoutId = ''
        } = {}
    } = props;

    /* const generatePDF = (e) => {
        e.preventDefault();
        // htmlContent = document.getElementById('pdfLayout').innerHTML;
        // console.log(htmlContent)

        //React
        // const htmlContent = myDivRef.current.innerHTML;
        // console.log('HTML Content:', htmlContent);

        //Javascript
        const myDiv = document.getElementById('pdfLayout');

        // Access the HTML content using innerHTML
        const htmlContent = myDiv.innerHTML;
        const encode = JSON.stringify(encodeURIComponent(htmlContent))
        console.log(encode);

        console.log(decodeURIComponent(encode));
    } */

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

    return (
        <HTMLFlipBook width={300} height={500}>
            <div className="demoPage" >
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(" + IMAGE_PREFIX + "/images/food.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ padding: "20px", backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "color: rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(https://cdn.shopify.com/s/files/1/0578/8965/2817/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1701774719)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                    <div className="slot-row bottom" style={{ fontSize: "24px", lineHeight: "1.3em", margin: "10px" }}>
                                        <div className="custom-description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div className="custom-title" style={{ textAlign: "center" }}>
                                                <div style={{ letterSpacing: "0.1px" }}>The Collection Snowboard: Oxygen&nbsp;
                                                </div>
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>&nbsp;
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>Default Title</div>
                                            <div>
                                                <span className="custom-price">₹1,025.00 </span>
                                            </div>
                                            <div style={{ opacity: "0.7" }}>Total inventory 50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ padding: "20px", backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "color: rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(https://cdn.shopify.com/s/files/1/0578/8965/2817/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1701774719)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                    <div className="slot-row bottom" style={{ fontSize: "24px", lineHeight: "1.3em", margin: "10px" }}>
                                        <div className="custom-description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div className="custom-title" style={{ textAlign: "center" }}>
                                                <div style={{ letterSpacing: "0.1px" }}>The Collection Snowboard: Oxygen&nbsp;
                                                </div>
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>&nbsp;
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>Default Title</div>
                                            <div>
                                                <span className="custom-price">₹1,025.00 </span>
                                            </div>
                                            <div style={{ opacity: "0.7" }}>Total inventory 50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ padding: "20px", backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "color: rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(https://cdn.shopify.com/s/files/1/0578/8965/2817/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1701774719)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                    <div className="slot-row bottom" style={{ fontSize: "24px", lineHeight: "1.3em", margin: "10px" }}>
                                        <div className="custom-description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div className="custom-title" style={{ textAlign: "center" }}>
                                                <div style={{ letterSpacing: "0.1px" }}>The Collection Snowboard: Oxygen&nbsp;
                                                </div>
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>&nbsp;
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>Default Title</div>
                                            <div>
                                                <span className="custom-price">₹1,025.00 </span>
                                            </div>
                                            <div style={{ opacity: "0.7" }}>Total inventory 50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ padding: "20px", backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "color: rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(https://cdn.shopify.com/s/files/1/0578/8965/2817/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1701774719)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                    <div className="slot-row bottom" style={{ fontSize: "24px", lineHeight: "1.3em", margin: "10px" }}>
                                        <div className="custom-description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div className="custom-title" style={{ textAlign: "center" }}>
                                                <div style={{ letterSpacing: "0.1px" }}>The Collection Snowboard: Oxygen&nbsp;
                                                </div>
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>&nbsp;
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>Default Title</div>
                                            <div>
                                                <span className="custom-price">₹1,025.00 </span>
                                            </div>
                                            <div style={{ opacity: "0.7" }}>Total inventory 50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ padding: "20px", backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "color: rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(https://cdn.shopify.com/s/files/1/0578/8965/2817/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1701774719)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                    <div className="slot-row bottom" style={{ fontSize: "24px", lineHeight: "1.3em", margin: "10px" }}>
                                        <div className="custom-description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div className="custom-title" style={{ textAlign: "center" }}>
                                                <div style={{ letterSpacing: "0.1px" }}>The Collection Snowboard: Oxygen&nbsp;
                                                </div>
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>&nbsp;
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>Default Title</div>
                                            <div>
                                                <span className="custom-price">₹1,025.00 </span>
                                            </div>
                                            <div style={{ opacity: "0.7" }}>Total inventory 50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ padding: "20px", backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "color: rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(https://cdn.shopify.com/s/files/1/0578/8965/2817/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1701774719)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                    <div className="slot-row bottom" style={{ fontSize: "24px", lineHeight: "1.3em", margin: "10px" }}>
                                        <div className="custom-description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div className="custom-title" style={{ textAlign: "center" }}>
                                                <div style={{ letterSpacing: "0.1px" }}>The Collection Snowboard: Oxygen&nbsp;
                                                </div>
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>&nbsp;
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>Default Title</div>
                                            <div>
                                                <span className="custom-price">₹1,025.00 </span>
                                            </div>
                                            <div style={{ opacity: "0.7" }}>Total inventory 50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ padding: "20px", backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "color: rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(https://cdn.shopify.com/s/files/1/0578/8965/2817/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1701774719)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                    <div className="slot-row bottom" style={{ fontSize: "24px", lineHeight: "1.3em", margin: "10px" }}>
                                        <div className="custom-description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div className="custom-title" style={{ textAlign: "center" }}>
                                                <div style={{ letterSpacing: "0.1px" }}>The Collection Snowboard: Oxygen&nbsp;
                                                </div>
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>&nbsp;
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>Default Title</div>
                                            <div>
                                                <span className="custom-price">₹1,025.00 </span>
                                            </div>
                                            <div style={{ opacity: "0.7" }}>Total inventory 50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ padding: "20px", backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "color: rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(https://cdn.shopify.com/s/files/1/0578/8965/2817/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1701774719)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                    <div className="slot-row bottom" style={{ fontSize: "24px", lineHeight: "1.3em", margin: "10px" }}>
                                        <div className="custom-description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div className="custom-title" style={{ textAlign: "center" }}>
                                                <div style={{ letterSpacing: "0.1px" }}>The Collection Snowboard: Oxygen&nbsp;
                                                </div>
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>&nbsp;
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>Default Title</div>
                                            <div>
                                                <span className="custom-price">₹1,025.00 </span>
                                            </div>
                                            <div style={{ opacity: "0.7" }}>Total inventory 50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ padding: "20px", backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "color: rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(https://cdn.shopify.com/s/files/1/0578/8965/2817/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1701774719)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                    <div className="slot-row bottom" style={{ fontSize: "24px", lineHeight: "1.3em", margin: "10px" }}>
                                        <div className="custom-description" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div className="custom-title" style={{ textAlign: "center" }}>
                                                <div style={{ letterSpacing: "0.1px" }}>The Collection Snowboard: Oxygen&nbsp;
                                                </div>
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>&nbsp;
                                            </div>
                                            <div className="custom-sku" style={{ opacity: "0.7", fontSize: "0.9em" }}>Default Title</div>
                                            <div>
                                                <span className="custom-price">₹1,025.00 </span>
                                            </div>
                                            <div style={{ opacity: "0.7" }}>Total inventory 50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demoPage">
                <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", marginBottom: "30px", width: "21cm", height: "29.7cm" }}>
                    <div className="inner-page" style={{ backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "rgb(0, 0, 0)", overflow: "hidden" }}>
                        <div className="container">
                            <div className="row" style={{ height: "100%" }}>
                                <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                                    <div className="slot-row top img-container ">
                                        <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                                            <div style={{ width: "100%", height: "100%", backgroundSize: 'contain', backgroundImage: "url(" + IMAGE_PREFIX + "/images/coffee.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", transform: "translate(0px, 0px) scale(1)" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HTMLFlipBook>
    )
}

export default PDFPreview;