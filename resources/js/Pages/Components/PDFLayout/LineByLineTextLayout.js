import React from "react";
import { displayStringBaseOnLimit, getAbbreviatedWeightUnit } from "../../helper";
import { generateShopifyUrl, getStoreUrlFromShopifyProductUrl } from "./commanLevel";

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
        productPageLayoutId = "",
        redirectValue = "",
        utmSource = ""
    } = data;
    console.log("productPageLayoutId ", productPageLayoutId);
    let {
        id = "",
        title = "",
        sku = "",
        description = "",
        price = "",
        compareAtPrice = "",
        storeurl = "",
        stock_quantity = "",
        tags = "",
        weight = "",
        weight_unit = "",
        vendor = "",
        product_type = "",
        cost_per_item = "",
    } = productData;
    const _description =
        description !== null
            ? displayStringBaseOnLimit(description, descriptionCharLimit)
            : "";
    const _tags = tags !== null ? displayStringBaseOnLimit(tags, 40) : "";
    const _weight = weight + getAbbreviatedWeightUnit(weight_unit)
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
        let adjustmentValue = Number(productChangeInPercentage);

        if (priceAdjustment === "0") {
            // Increment by percentage
            newPrice += (newPrice * adjustmentValue) / 100;
            newCompareAtPrice += (newCompareAtPrice * adjustmentValue) / 100;
        } else if (priceAdjustment === "1") {
            // Decrement by percentage
            newPrice -= (newPrice * adjustmentValue) / 100;
            newCompareAtPrice -= (newCompareAtPrice * adjustmentValue) / 100;
        } else if (priceAdjustment === "2") {
            // Increment by fixed value
            newPrice += adjustmentValue;
            newCompareAtPrice += adjustmentValue;
        } else if (priceAdjustment === "3") {
            // Decrement by fixed value
            newPrice -= adjustmentValue;
            newCompareAtPrice -= adjustmentValue;
        }
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

    var shopDomain = getStoreUrlFromShopifyProductUrl(storeurl);
        console.log("shop domain ", shopDomain);
        console.log("redirect value  ", redirectValue);
        var modifiedStoreUrl = storeurl
        if (redirectValue == "0") {
            modifiedStoreUrl = storeurl
        }
        if (redirectValue == "1") {
            modifiedStoreUrl = shopDomain;
            console.log("online modified store url ", modifiedStoreUrl);
        }
        if (redirectValue == "2") {
            modifiedStoreUrl = generateShopifyUrl(id, "cart", shopDomain)
            console.log("modified url before replace ", modifiedStoreUrl);
            modifiedStoreUrl = modifiedStoreUrl.replace("https://", "")
            console.log("modified url after replace ", modifiedStoreUrl);
        }
        if (redirectValue == "3") {
            modifiedStoreUrl = generateShopifyUrl(id, "checkout", shopDomain)
            modifiedStoreUrl = modifiedStoreUrl.replace("https://", "")
        }
        modifiedStoreUrl = modifiedStoreUrl + (utmSource && utmSource != "" ? `?utm_source=${utmSource}` : "")
        console.log("modifiedStoreUrl ", modifiedStoreUrl);

    console.log('line by line layout called ', productData);
    console.log('line by line productAttributes ', productAttributes);
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
                <div style={{
                    ...((productPageLayoutId === "fourItemList" || (productPageLayoutId === "fourItemLeftList") || (productPageLayoutId === "fourItemRightList")) && { lineHeight: "1.6em", fontSize: "1em" }),
                    ...((productPageLayoutId === "threeItemList" || (productPageLayoutId === "threeItemLeftList") || (productPageLayoutId === "threeItemRightList")) && { lineHeight: "1.6em", fontSize: "1.2em" }),
                    ...((productPageLayoutId === "twoItemList" || (productPageLayoutId === "twoItemLeftList") || (productPageLayoutId === "twoItemRightList")) && { lineHeight: "1.9em", fontSize: "1.4em" }),
                    ...((productPageLayoutId === "oneItemGrid") && { lineHeight: "1.9em", fontSize: "1.4em" })
                }}>
                    {productAttributes.includes("name") && title !== "" && (
                        <div style={{}}>
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
                    {productAttributes.includes("vendor") && vendor !== "" && (
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
                                {vendor}
                            </div>
                        </div>
                    )}
                    {productAttributes.includes("type") && product_type !== "" && (
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
                                {product_type}
                            </div>
                        </div>
                    )}
                    {productAttributes.includes("quantity") && stock_quantity != false  &&   (
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
                                {stock_quantity > 0 ? stock_quantity + " Units" : "0 Unit"}
                            </div>
                        </div>
                    )}
                    {productAttributes.includes("weight") && weight !== "" && (
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
                                {_weight}
                            </div>
                        </div>
                    )}
                    {productAttributes.includes("tag") && tags !== "" && (
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
                                {_tags}
                            </div>
                        </div>
                    )}

                    {productAttributes.includes("costPerItem") && cost_per_item !== "" && (
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
                                {cost_per_item == "" ? "--" : cost_per_item}
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
                                href={modifiedStoreUrl}
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
            </div>
        </>
    );
};

export default LineByLineTextLayout;
