import ProductImageLayout from "./ProductImageLayout";
import {
    A5PaperSize,
    commonLevel,
    legalPaperSize,
    letterPaperSize,
} from "./commanLevel";
const FrontImage = ({
    frontImage = "",
    pdfWidth = 21,
    pdfHeight = 20.7,
    paperLayout = "",
    backgroundColor = "",
}) => {
    const { zoomSize } = commonLevel(paperLayout);
    return (
        <div
            id="front_page"
            className="page "
            style={{
                background: backgroundColor,
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
                        : paperLayout == "a3"
                        ? 1600
                        : 1500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                className="inner-page"
                style={{
                    /* padding: "20px", */ backgroundColor: backgroundColor,
                    height: "80%",
                    width: "80%",
                    fontFamily: "Roboto Condensed",
                    color: "rgb(0, 0, 0)",
                    overflow: "hidden",
                }}
            >
                <div className="container">
                    <div
                        className="row"
                        style={{ height: "100%" /* , margin: "10px" */ }}
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
                                    productImage: frontImage,
                                    backgroundSize: "contain",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontImage;
