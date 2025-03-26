import React from "react";
import DefaultTextLayout from "./DefaultTextLayout";
import LeftTextLayout from "./LeftTextLayout";
import LineByLineTextLayout from "./LineByLineTextLayout";
import { convertStrToArr } from "../../helper";

const ProductContentLayout = (data) => {
    const {
        productAttributeAlignment = "center",
        productAttributes = "",
        isBlank = false,
        productPageLayoutId = "",
        paperLayout = "",
    } = data;
    console.log("data from product content ",data);
    const productArributeArray = convertStrToArr(productAttributes);
    const contentMargin = [
        "oneItemGrid",
        "twoItemGrid",
        "threeItemGrid",
        "threeItemGridReverse",
        "fourItemGrid",
        "fiveItemGrid",
        "sixItemGrid",
        "eightItemGrid",
        "tenItemGrid",
    ].includes(productPageLayoutId)
        ? "10px 0"
        : "0 10px";
    return (
        <>
            {isBlank ? (
                <div
                    className="slot-row bottom"
                    style={{
                        fontSize: "20px",
                        lineHeight: "1.3em",
                        margin: contentMargin,
                    }}
                >
                    <div style={{ width: "100%" }}>
                        <div
                            className="custom-description"
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <div>
                                <span></span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    opacity: "0.7",
                                    fontSize: "0.9em",
                                }}
                            >
                                <div
                                    style={{
                                        flex: "1 1 auto",
                                        justifyContent: "flex-end",
                                        display: "flex",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="slot-row bottom"
                    style={{
                        fontSize: "20px",
                        lineHeight: "1.3em",
                        margin: contentMargin,
                    }}
                >
                    {(productAttributeAlignment === "" ||
                        productAttributeAlignment === "center") && (
                        <DefaultTextLayout
                            {...{ ...data, productArributeArray }}
                        />
                    )}
                    {productAttributeAlignment === "left" && (
                        <LeftTextLayout
                            {...{ ...data, productArributeArray }}
                        />
                    )}
                    {productAttributeAlignment === "line_by_line" && (
                        <LineByLineTextLayout
                            {...{ ...data, productArributeArray }}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default ProductContentLayout;
