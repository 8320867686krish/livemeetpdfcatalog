import React from "react";
import { displayStringBaseOnLimit } from "../../helper";

const LeftTextLayout = (data) => {
    const {
        productAttributes = [],
        productData = {},
        descriptionCharLimit = 25,
        productButtonEnabled = "0",
        priceAdjustment = "",
        productChangeInPercentage = "",
        productTaxPercentage = "",
        fontColor = "",
        backgroundColor = "",
    } = data;

    let {
        title = "",
        sku = "",
        description = "",
        price = "",
        compareAtPrice = "",
        storeurl = "",
    } = productData;

    const _description =
        description !== null
            ? displayStringBaseOnLimit(description, descriptionCharLimit)
            : "";

    // Get the price without currency
    price = price.replaceAll(",", "");
    if (compareAtPrice == null) {
        compareAtPrice = "";
    }
    compareAtPrice = compareAtPrice.replaceAll(",", "");

    const priceMatches = price.match(/[0-9]*\.?[0-9]+/g);
    const compareAtPriceMatches = compareAtPrice.match(/[0-9]*\.?[0-9]+/g);

    const originalPrice = priceMatches ? priceMatches[0] : "0";
    const originalCompareAtPrice = compareAtPriceMatches
        ? compareAtPriceMatches[0]
        : "0";

    // Price Calculation
    let newPrice = Number(originalPrice),
        taxPrice = 0;
    let newCompareAtPrice = Number(originalCompareAtPrice);

    // Price Adjustment calculation
    if (priceAdjustment !== "") {
        const changePrice =
            (newPrice * Number(productChangeInPercentage)) / 100;
        newPrice =
            priceAdjustment == "1"
                ? newPrice - changePrice
                : newPrice + changePrice;

        const changeCompareAtPrice =
            (newCompareAtPrice * Number(productChangeInPercentage)) / 100;
        newCompareAtPrice =
            priceAdjustment == "1"
                ? newCompareAtPrice - changeCompareAtPrice
                : newCompareAtPrice + changeCompareAtPrice;
    }

    // Price Tax calculation
    if (productTaxPercentage !== "") {
        taxPrice = (newPrice * Number(productTaxPercentage)) / 100;
        newPrice += taxPrice;

        const compareAtTaxPrice =
            (newCompareAtPrice * Number(productTaxPercentage)) / 100;
        newCompareAtPrice += compareAtTaxPrice;

        taxPrice = price.replace(/[0-9]*\.?[0-9]+/g, taxPrice.toFixed(2));
    }

    newPrice = price.replace(/[0-9]*\.?[0-9]+/g, newPrice.toFixed(2));
    newCompareAtPrice = compareAtPrice.replace(
        /[0-9]*\.?[0-9]+/g,
        newCompareAtPrice.toFixed(2)
    );

    const fontSize = "0.7em";

    return (
        <>
            <div
                className="custom-description"
                style={{
                    display: "flex",
                    fontSize: fontSize,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: "100%",
                    padding: "10px",
                }}
            >
                <div className="custom-title" style={{ flex: "1 1 auto" }}>
                    {productAttributes.includes("name") && title !== "" && (
                        <span style={{ letterSpacing: "1px" }}>{title}</span>
                    )}
                    {productAttributes.includes("sku") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            SKU : {sku}
                        </div>
                    )}
                    {productAttributes.includes("quantity") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Stock quantity : {sku}
                        </div>
                    )}
                    {productAttributes.includes("weight") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Weight : {sku}
                        </div>
                    )}
                    {productAttributes.includes("tag") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Tag : {sku}
                        </div>
                    )}
                    {productAttributes.includes("vendor") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Vendor : {sku}
                        </div>
                    )}
                    {productAttributes.includes("type") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Product type : {sku}
                        </div>
                    )}
                    {productAttributes.includes("costPerItem") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Cost per item : {sku}
                        </div>
                    )}
                    {productAttributes.includes("description") &&
                        description !== "" && (
                            <div
                                className="custom-sku"
                                style={{ opacity: "0.7", letterSpacing: "1px" }}
                            >
                                {_description}
                            </div>
                        )}
                </div>
                <div
                    style={{
                        flex: "0 1 auto",
                        display: "flex",
                        opacity: "0.7",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        width: "175px",
                    }}
                >
                    {productAttributes.includes("price") &&
                        compareAtPrice > price && (
                            <div style={{ letterSpacing: "1px" }}>
                                <span
                                    className="custom-compare-at-price"
                                    style={{
                                        textDecoration: "line-through"
                                    }}
                                >
                                    {newCompareAtPrice}
                                </span>
                            </div>
                        )}
                    {productAttributes.includes("price") && newPrice !== "" && (
                        <div style={{ letterSpacing: "1px" }}>
                            <span className="custom-price">{newPrice}</span>
                        </div>
                    )}
                    {productButtonEnabled == "1" && (
                        <div>
                            <a
                                href={storeurl}
                                style={{
                                    backgroundColor: fontColor,
                                    color: backgroundColor,
                                    textAlign: "center",
                                    padding: "10px 15px",
                                    width: "100%",
                                    display: "block",
                                    borderRadius: "10px",
                                    marginTop: "10px",
                                    textDecoration: "none",
                                    lineHeight: "normal",
                                    letterSpacing: "1px"
                                }}
                                target="_blank"
                            >
                                Buy Now
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LeftTextLayout;
