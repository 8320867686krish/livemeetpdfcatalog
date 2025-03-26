import React from 'react';
import { useLocation } from 'react-router-dom';
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page as ReactPdfPage } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const width = 600;
const height = 650;

const Page = React.forwardRef(({ pageNumber }, ref) => {
    return (
        <div ref={ref}>
            <ReactPdfPage pageNumber={pageNumber} width={width} />
        </div>
    );
});

const PDFPreview = () => {

    const location = useLocation();

    return (
        <div className="flip_preview" style={{ width: "650px", height: "fit-content", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Document file={location.state?.pdfUrl}>
                <HTMLFlipBook width={width} height={height}>
                    <Page pageNumber={1} />
                    <Page pageNumber={2} />
                    <Page pageNumber={3} />
                    <Page pageNumber={4} />
                    <Page pageNumber={5} />
                    {/* <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/watch.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/skincare.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/watch.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/skincare.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/watch.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/food.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/skincare.jpg`} alt="Image" /></div>
            <div className="demoPage"><img style={{ width: "100%", maxWidth: "100%", height: "100%" }} src={`${IMAGE_PREFIX}/images/watch.jpg`} alt="Image" /></div> */}

                </HTMLFlipBook>
            </Document>
        </div>
    )
}

export default PDFPreview;