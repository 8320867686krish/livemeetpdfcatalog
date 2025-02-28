import React from "react";
import { displayStringBaseOnLimit } from "../../helper";

const LineByLineTextLayout = (data) => {
    const {
        valueColor = "",
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
        storeurl = "",
        compareAtPrice = "",
    } = productData;
    const _description =
        description !== null
            ? displayStringBaseOnLimit(description, descriptionCharLimit)
            : "";

    // Get the price without currency
    price = price.replaceAll(",", "");
    var priceMatches = price.match(/[0-9]*\.?[0-9]+/g);
    const originalPrice = priceMatches[0];

    if (compareAtPrice == null) {
        compareAtPrice = "";
    }
    compareAtPrice = compareAtPrice.replaceAll(",", "");
    var compareAtPriceMatches = compareAtPrice.match(/[0-9]*\.?[0-9]+/g);
    const originalCompareAtPrice = compareAtPriceMatches
        ? compareAtPriceMatches[0]
        : null;

    // Price Calculation
    // let newPrice = Number(originalPrice),
    //     taxPrice = 0;
    // if (priceAdjustment !== "") {
    //     const changePrice =
    //         (newPrice * Number(productChangeInPercentage)) / 100;
    //     newPrice =
    //         priceAdjustment == "1"
    //             ? newPrice - changePrice
    //             : newPrice + changePrice;
    // }
    // if (productTaxPercentage !== "") {
    //     taxPrice = (newPrice * Number(productTaxPercentage)) / 100;
    //     newPrice += taxPrice;
    //     taxPrice = price.replace(/[0-9]*\.?[0-9]+/g, taxPrice.toFixed(2));
    // }
    // newPrice = price.replace(/[0-9]*\.?[0-9]+/g, newPrice.toFixed(2));

    // // Adjusted Compare At Price Calculation
    // let newCompareAtPrice = originalCompareAtPrice
    //     ? Number(originalCompareAtPrice)
    //     : null;
    // if (newCompareAtPrice !== null) {
    //     if (priceAdjustment !== "") {
    //         const changeCompareAtPrice =
    //             (newCompareAtPrice * Number(productChangeInPercentage)) / 100;
    //         newCompareAtPrice =
    //             priceAdjustment == "1"
    //                 ? newCompareAtPrice - changeCompareAtPrice
    //                 : newCompareAtPrice + changeCompareAtPrice;
    //     }
    //     if (productTaxPercentage !== "") {
    //         const compareAtTaxPrice =
    //             (newCompareAtPrice * Number(productTaxPercentage)) / 100;
    //         newCompareAtPrice += compareAtTaxPrice;
    //     }
    // }

    // const formattedCompareAtPrice = newCompareAtPrice
    //     ? newCompareAtPrice.toFixed(2)
    //     : null;

    const fontSize = "0.7em";

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


    return (
        <>
            <div
                className="custom-description"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: fontSize,
                    width: "100%",
                    padding: "10px",
                    letterSpacing: "1.5px",
                }}
            >
                {productAttributes.includes("name") && title !== "" && (
                    <div>
                        <span>{title}</span>
                    </div>
                )}
                {productAttributes.includes("sku") && sku !== "" && (
                    <div style={{ display: "flex", opacity: "0.7" }}>
                        <div style={{ flex: "1 0 auto" }}>SKU : </div>
                        <div
                            style={{
                                flex: "1 1 auto",
                                justifyContent: "flex-end",
                                display: "flex",
                                color: valueColor,
                            }}
                        >
                            {sku}
                        </div>
                    </div>
                )}
                {productAttributes.includes("quantity") && sku !== "" && (
                    <div style={{ display: "flex", opacity: "0.7" }}>
                        <div style={{ flex: "1 0 auto" }}>Stock Quantity : </div>
                        <div
                            style={{
                                flex: "1 1 auto",
                                justifyContent: "flex-end",
                                display: "flex",
                                color: valueColor,
                            }}
                        >
                            {sku}
                        </div>
                    </div>
                )}
                {productAttributes.includes("weight") && sku !== "" && (
                    <div style={{ display: "flex", opacity: "0.7" }}>
                        <div style={{ flex: "1 0 auto" }}>Weight : </div>
                        <div
                            style={{
                                flex: "1 1 auto",
                                justifyContent: "flex-end",
                                display: "flex",
                                color: valueColor,
                            }}
                        >
                            {sku}
                        </div>
                    </div>
                )}
                {productAttributes.includes("tag") && sku !== "" && (
                    <div style={{ display: "flex", opacity: "0.7" }}>
                        <div style={{ flex: "1 0 auto" }}>Tag : </div>
                        <div
                            style={{
                                flex: "1 1 auto",
                                justifyContent: "flex-end",
                                display: "flex",
                                color: valueColor,
                            }}
                        >
                            {sku}
                        </div>
                    </div>
                )}
                {productAttributes.includes("vendor") && sku !== "" && (
                    <div style={{ display: "flex", opacity: "0.7" }}>
                        <div style={{ flex: "1 0 auto" }}>Vendor : </div>
                        <div
                            style={{
                                flex: "1 1 auto",
                                justifyContent: "flex-end",
                                display: "flex",
                                color: valueColor,
                            }}
                        >
                            {sku}
                        </div>
                    </div>
                )}
                {productAttributes.includes("type") && sku !== "" && (
                    <div style={{ display: "flex", opacity: "0.7" }}>
                        <div style={{ flex: "1 0 auto" }}>Product type : </div>
                        <div
                            style={{
                                flex: "1 1 auto",
                                justifyContent: "flex-end",
                                display: "flex",
                                color: valueColor,
                            }}
                        >
                            {sku}
                        </div>
                    </div>
                )}
                {productAttributes.includes("costPerItem") && sku !== "" && (
                    <div style={{ display: "flex", opacity: "0.7" }}>
                        <div style={{ flex: "1 0 auto" }}>Cost per item : </div>
                        <div
                            style={{
                                flex: "1 1 auto",
                                justifyContent: "flex-end",
                                display: "flex",
                                color: valueColor,
                            }}
                        >
                            {sku}
                        </div>
                    </div>
                )}
                {productAttributes.includes("description") &&
                    description !== "" && (
                        <div style={{ display: "flex", opacity: "0.7" }}>
                            <div style={{ flex: "1 0 auto" }}>
                                Description :{" "}
                            </div>
                            <div
                                style={{
                                    flex: "1 1 auto",
                                    justifyContent: "flex-end",
                                    display: "flex",
                                    color: valueColor,
                                }}
                            >
                                {_description}
                            </div>
                        </div>
                    )
                }
                {productAttributes.includes("price") &&
                    productTaxPercentage > 0 && (
                        <div style={{ display: "flex", opacity: "0.7" }}>
                            <div style={{ flex: "1 0 auto" }}>Tax : </div>
                            <div
                                style={{
                                    flex: "1 1 auto",
                                    justifyContent: "flex-end",
                                    display: "flex",
                                    color: valueColor,
                                }}
                            >
                                {taxPrice}
                            </div>
                        </div>
                    )}
                {productAttributes.includes("price") && newPrice !== "" && (
                    <div style={{ display: "flex", opacity: "0.7" }}>
                        <div style={{ flex: "1 0 auto" }}>Price : </div>
                        <div
                            style={{
                                flex: "1 1 auto",
                                justifyContent: "flex-end",
                                display: "flex",
                                color: valueColor,
                            }}
                        >
                            {newPrice}
                        </div>
                    </div>
                )}
                {productAttributes.includes("price") &&
                    newCompareAtPrice && compareAtPrice > price && (
                        <div style={{ display: "flex", opacity: "0.7" }}>
                            <div style={{ flex: "1 0 auto" }}>
                                Compare At Price :{" "}
                            </div>
                            <div
                                style={{
                                    flex: "1 1 auto",
                                    justifyContent: "flex-end",
                                    display: "flex",
                                    color: valueColor,
                                }}
                            >
                                <span
                                    style={{ textDecoration: "line-through" }}
                                >
                                    {newCompareAtPrice}
                                </span>
                            </div>
                        </div>
                    )}
                {productButtonEnabled == "1" && (
                    <div style={{ opacity: "0.7" }}>
                        <a
                            href={storeurl}
                            style={{
                                backgroundColor: fontColor,
                                color: backgroundColor,
                                textAlign: "center",
                                padding: "5px 15px 10px 15px",
                                width: "100%",
                                display: "block",
                                borderRadius: "10px",
                                marginTop: "10px",
                                textDecoration: "none",
                                letterSpacing: "2px",
                            }}
                            target="_blank"
                        >
                            Buy Now
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};

export default LineByLineTextLayout;
