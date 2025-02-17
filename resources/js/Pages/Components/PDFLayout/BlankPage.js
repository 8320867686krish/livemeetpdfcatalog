import React from 'react';

const BlankPage = (props) => {
    const {
        configData: {
            fontFamily = '',
            fontColor = '',
            backgroundColor = ''
        } = {}
    } = props;
    return (
        <div className="page" style={{ breakAfter: "page", zoom: pdfPreviewZoom, position: "relative", /* marginBottom: "30px", */ width: pdfWidth, height: pdfHeight }}>
            <style>
            </style>
            <div className="inner-page" style={{ padding: "20px", backgroundColor: backgroundColor, height: "100%", width: "100%", fontFamily: fontFamily, color: fontColor, overflow: "hidden" }}>
                <div className="container">
                    <div className="row" style={{ height: "100%" }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlankPage;