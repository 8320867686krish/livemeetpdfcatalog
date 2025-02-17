import { Suspense, lazy } from "react";
import { Spinner } from "@shopify/polaris";
const BarCodeLayout = lazy(() => import("./BarCodeLayout"));

const ProductImageLayout = (data = {}) => {
    let {
        productImage = "",
        productAttributes = [],
        barcode = "",
        backgroundSize = pdfBackgroundImgSize,
        backgroundPosition = "top",
    } = data;
    // productImage = `${IMAGE_PREFIX}/images/tshirt1.jpg`;
    // productImage = `${IMAGE_PREFIX}images/tshirt1.jpg`;
    // productImage = `https://cdn.shopify.com/s/files/1/0781/0020/1775/products/stylish-summer-necklace_925x_7962c463-eba6-46c2-ac3d-f2ee0fda3ba5.jpg`;
    return (
        <div className="slot-row top img-container ">
            {productImage !== "" ? (
                <div
                    style={{
                        overflow: "hidden",
                        width: "100%",
                        height: "98%",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundSize: "contain",
                            backgroundImage: "url(" + productImage + ")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: backgroundPosition,
                            transform: "translate(0px, 0px) scale(1)",
                        }}
                    ></div>
                    {productAttributes.includes("barcode") &&
                        barcode !== null &&
                        barcode !== "" && (
                            <Suspense
                                fallback={
                                    <Spinner
                                        accessibilityLabel="Small spinner example"
                                        size="large"
                                    />
                                }
                            >
                                <div >
                                    <BarCodeLayout barCode={barcode} />
                                </div>
                            </Suspense>
                        )}
                </div>
            ) : (
                <div
                    className="slot-placeholder hover-indicator"
                    style={{
                        opacity: "0.4",
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        fontSize: "36px",
                        fontFamily: "sans-serif",
                    }}
                ></div>
            )}
        </div>
    );
};

export default ProductImageLayout;
