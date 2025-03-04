import React from "react";
import { displayStringBaseOnLimit } from "../../helper";
import { commonLevel } from "./commanLevel";

const DefaultTextLayout = (data) => {
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
        paperLayout = "",
        productPageLayoutId = ""
    } = data;
    console.log("productPageLayoutId ", productPageLayoutId);
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
    let newCompareAtPrice = Number(originalCompareAtPrice),
        compareAtTaxPrice = 0;
    console.log("newPrice", newPrice)
    console.log("newCompareAtPrice", newCompareAtPrice)
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

        compareAtTaxPrice =
            (newCompareAtPrice * Number(productTaxPercentage)) / 100;
        newCompareAtPrice += compareAtTaxPrice;

        taxPrice = price.replace(/[0-9]*\.?[0-9]+/g, taxPrice.toFixed(2));
        compareAtTaxPrice = compareAtPrice.replace(
            /[0-9]*\.?[0-9]+/g,
            compareAtTaxPrice.toFixed(2)
        );
    }

    newPrice = price.replace(/[0-9]*\.?[0-9]+/g, newPrice.toFixed(2));
    newCompareAtPrice = compareAtPrice.replace(
        /[0-9]*\.?[0-9]+/g,
        newCompareAtPrice.toFixed(2)
    );

    // const fontSize = "1em";
    const { letterSpacingBuyNow, letterSpacingTitle, buyNowButtonPadding } =
        commonLevel(paperLayout);

    return (
        <>
            <div
                className="custom-description"
                style={{
                    // display: "flex",
                    // fontSize: fontSize,
                    // flexDirection: "column",
                    // alignItems: "center",
                    // width: "100%",
                    padding: "10px",
                    // letterSpacing: letterSpacingTitle,
                }}
            >
                <div style={{
                    display: "flex",
                    // fontSize: "1em",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    letterSpacing: letterSpacingTitle,
                    // lineHeight : "1.7em"
                    ...(productPageLayoutId === "sixItemGrid" && { lineHeight: "1.7em", fontSize: "1em" }),
                    ...(productPageLayoutId === "fiveItemList" && { lineHeight: "1.4em", fontSize: "1em" }),
                    ...((productPageLayoutId === "fourItemGrid" || productPageLayoutId === "fourItemList" || productPageLayoutId === "fourItemLeftList" || productPageLayoutId === "fourItemRightList") && { lineHeight: "1.5em", fontSize: "1em" }),
                    ...((productPageLayoutId === "threeItemGrid" || productPageLayoutId === "threeItemGridReverse" || productPageLayoutId === "threeItemList" || productPageLayoutId === "threeItemLeftList" || productPageLayoutId === "threeItemRightList") && { lineHeight: "1.5em", fontSize: "1.1em" }),
                    ...((productPageLayoutId === "twoItemList" || productPageLayoutId === "twoItemRightList" || productPageLayoutId === "twoItemLeftList") && { lineHeight: "1.4em", fontSize: "1.1em" }),
                    ...((productPageLayoutId === "oneItemGrid") && { lineHeight: "1.4em", fontSize: "1.3em" }),
                }}>
                    {productAttributes.includes("name") && title !== "" && (
                        <div
                            className="custom-title"
                            style={{ textAlign: "center" }}
                        >
                            <div>{title}</div>
                        </div>
                    )}
                    {productAttributes.includes("sku") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7" }}>
                            SKU : {sku}
                        </div>
                    )}
                    {productAttributes.includes("quantity") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7" }}>
                            Quantity : {sku}
                        </div>
                    )}
                    {productAttributes.includes("weight") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7" }}>
                            Weight : {sku}
                        </div>
                    )}
                    {productAttributes.includes("tag") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7" }}>
                            Tag : {sku}
                        </div>
                    )}
                    {productAttributes.includes("vendor") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7" }}>
                            Vendor : {sku}
                        </div>
                    )}
                    {productAttributes.includes("type") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7" }}>
                            Product type : {sku}
                        </div>
                    )}
                    {productAttributes.includes("costPerItem") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7" }}>
                            Cost per item : {sku}
                        </div>
                    )}
                    {productAttributes.includes("description") &&
                        description !== "" && (
                            <div className="custom-sku" style={{ opacity: "0.7" }}>
                                {_description}
                            </div>
                        )}
                    {productAttributes.includes("price") &&
                        productTaxPercentage > 0 && (
                            <div>
                                <span
                                    className="custom-price"
                                    style={{ opacity: "0.7" }}
                                >
                                    Tax {taxPrice}
                                </span>
                            </div>
                        )}
                    {productAttributes.includes("price") && newPrice !== "" && (
                        <div>
                            <span
                                className="custom-price"
                                style={{
                                    opacity: "0.7",
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >
                                {compareAtPrice > price && (
                                    <span
                                        style={{ textDecoration: "line-through" }}
                                    >
                                        {newCompareAtPrice}
                                    </span>
                                )}
                                <span>{newPrice}</span>
                            </span>
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
                                    padding: buyNowButtonPadding,
                                    width: "100%",
                                    display: "block",
                                    borderRadius: "10px",
                                    marginTop: "10px",
                                    textDecoration: "none",
                                    letterSpacing: letterSpacingBuyNow,
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

export default DefaultTextLayout;
