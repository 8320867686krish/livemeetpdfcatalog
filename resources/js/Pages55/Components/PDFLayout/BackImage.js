import ProductImageLayout from './ProductImageLayout';

const BackImage = ({ backImage = "", pdfWidth = 21, pdfHeight = 29.7 }) => {
    return (
        <div id="back_page" className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", /* marginBottom: "30px", */ width: pdfWidth, height: pdfHeight + paperSizeMeasurement }}>
            <div className="inner-page" style={{ /* padding: "20px", */ backgroundColor: "rgb(255, 255, 255)", height: "100%", width: "100%", fontFamily: "Roboto Condensed", color: "rgb(0, 0, 0)", overflow: "hidden" }}>
                <div className="container">
                    <div className="row" style={{ height: "100%"/* , margin: "10px" */ }}>
                        <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
                            <ProductImageLayout {...{ productImage: backImage, backgroundSize: 'contain' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BackImage;