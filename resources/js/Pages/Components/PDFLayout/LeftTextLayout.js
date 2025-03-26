import React from "react";
import { displayStringBaseOnLimit, getAbbreviatedWeightUnit } from "../../helper";
import { generateShopifyUrl, getStoreUrlFromShopifyProductUrl } from "./commanLevel";

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
        productPageLayoutId = "",
        redirectValue = "",
        utmSource = ""
    } = data;
    console.log("data from left layout ", data);

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
    const _tags = tags !== null ? displayStringBaseOnLimit(tags, 50) : "";
    const _weight = weight + getAbbreviatedWeightUnit(weight_unit)

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

    const fontSize = "0.7em";


    var shopDomain = getStoreUrlFromShopifyProductUrl(storeurl);
    console.log("shop domain ", shopDomain);
    console.log("redirect value  ", redirectValue);
    var modifiedStoreUrl = storeurl
    if (redirectValue == "0") {
        modifiedStoreUrl = storeurl
    }
    if (redirectValue == "1") {
        modifiedStoreUrl = generateShopifyUrl("", "online_store", shopDomain);
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
                <div className="custom-title" style={{
                    flex: "1 1 auto", ...(productPageLayoutId === "fiveItemList" && { lineHeight: "1.3em", fontSize: "1.2em" }),
                    ...((productPageLayoutId === "fourItemList" || (productPageLayoutId === "fourItemLeftList") || (productPageLayoutId === "fourItemRightList")) && { lineHeight: "1.5em", fontSize: "1.2em" }),
                    ...((productPageLayoutId === "threeItemList" || (productPageLayoutId === "threeItemLeftList") || (productPageLayoutId === "threeItemRightList")) && { lineHeight: "1.9em", fontSize: "1.4em" }),
                    ...((productPageLayoutId === "twoItemList" || (productPageLayoutId === "twoItemLeftList") || (productPageLayoutId === "twoItemRightList")) && { lineHeight: "1.9em", fontSize: "1.4em" }),
                    ...((productPageLayoutId === "oneItemGrid") && { lineHeight: "1.9em", fontSize: "1.4em" })
                }}>
                    {productAttributes.includes("name") && title !== "" && (
                        <span style={{
                            letterSpacing: "1px",

                        }}>{title}</span>
                    )}
                    {productAttributes.includes("sku") && sku !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            SKU : {sku}
                        </div>
                    )}
                    {productAttributes.includes("vendor") && vendor !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Vendor : {vendor}
                        </div>
                    )}
                    {productAttributes.includes("type") && product_type !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Product type : {product_type}
                        </div>
                    )}
                    {productAttributes.includes("quantity") && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Stock quantity :  {stock_quantity === false ? "Not tracked" : stock_quantity > 0 ? stock_quantity + " Units" : "0 Units"}
                        </div>
                    )}
                    {productAttributes.includes("weight") && weight !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Weight : {_weight}
                        </div>
                    )}
                    {productAttributes.includes("tag") && tags !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Tag : {_tags}
                        </div>
                    )}
                    {productAttributes.includes("costPerItem") && cost_per_item !== "" && (
                        <div className="custom-sku" style={{ opacity: "0.7", letterSpacing: "1px" }}>
                            Cost per item : {cost_per_item == "" ? "--" : cost_per_item}
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
                                href={modifiedStoreUrl}
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
