import React from "react";
import { displayStringBaseOnLimit } from "../../helper";

const LineByLineTextLayout = (data) => {
    const { valueColor = '', productAttributes = [], productData = {}, descriptionCharLimit = 25, productButtonEnabled = '0', priceAdjustment = '', productChangeInPercentage = "", productTaxPercentage = "", fontColor = "", backgroundColor = "" } = data;
    let { title = '', sku = '', description = '', price = '', storeurl = '' } = productData;
    const _description = description !== null ? displayStringBaseOnLimit(description, descriptionCharLimit) : '';

    //Get the price without currency..
    price = price.replaceAll(',', '');
    var matches = price.match(/[0-9]*\.?[0-9]+/g);
    const orignalPrice = matches[0];

    //Price Calculation...
    let newPrice = Number(orignalPrice), taxPrice = 0;
    //Price Adjustment calculation.
    if (priceAdjustment !== '') {
        const changePrice = newPrice * Number(productChangeInPercentage) / 100;
        newPrice = priceAdjustment == '1' ? newPrice - changePrice : newPrice + changePrice;
    }
    //Price Tax calculation.
    if (productTaxPercentage !== '') {
        taxPrice = newPrice * Number(productTaxPercentage) / 100;
        newPrice += taxPrice;
        taxPrice = price.replace(/[0-9]*\.?[0-9]+/g, taxPrice.toFixed(2));
    }
    newPrice = price.replace(/[0-9]*\.?[0-9]+/g, newPrice.toFixed(2));
    const fontSize = "0.7em";

    return (
        <>
            {/* Grid Layout */}
            <div className="custom-description" style={{ display: "flex", flexDirection: "column", fontSize: fontSize, width: "100%", padding: "10px" }}>
                {(productAttributes.includes('name') && title !== '') && <div><span>{title}</span></div>}
                {/* <div style={{ display: "flex", opacity: "0.7" }}>
                    <div style={{ flex: "1 0 auto" }}>Total Inventory</div>
                    <div style={{ flex: "1 1 auto", justifyContent: "flex-end", display: "flex", color: valueColor }}>20</div>
                </div> */}
                {(productAttributes.includes('sku') && sku !== '') && <div style={{ display: "flex", opacity: "0.7" }}>
                    <div style={{ flex: "1 0 auto" }}>SKU : </div>
                    <div style={{ flex: "1 1 auto", justifyContent: "flex-end", display: "flex", color: valueColor }}>{sku}</div>
                </div>}
                {(productAttributes.includes('description') && description !== '') && <div style={{ display: "flex", opacity: "0.7" }}>
                    <div style={{ flex: "1 0 auto" }}>Description : </div>
                    <div style={{ flex: "1 1 auto", justifyContent: "flex-end", display: "flex", color: valueColor }}>{_description}</div>
                </div>}
                {/* <div style={{ display: "flex", opacity: "0.7" }}>
                    <div style={{ flex: "1 0 auto" }}>Wholesale Price : </div>
                    <div style={{ flex: "1 1 auto", justifyContent: "flex-end", display: "flex", color: valueColor }}>₹749.95</div>
                </div> */}
                {(productAttributes.includes('price') && productTaxPercentage > 0) && <div style={{ display: "flex", opacity: "0.7" }}>
                    <div style={{ flex: "1 0 auto" }}>Tax : </div>
                    <div style={{ flex: "1 1 auto", justifyContent: "flex-end", display: "flex", color: valueColor }}>{taxPrice}</div>
                </div>}
                {(productAttributes.includes('price') && newPrice !== '') && <div style={{ display: "flex", opacity: "0.7" }}>
                    <div style={{ flex: "1 0 auto" }}>Price : </div>
                    <div style={{ flex: "1 1 auto", justifyContent: "flex-end", display: "flex", color: valueColor }}>{newPrice}</div>
                </div>}
                {productButtonEnabled == '1' && <div style={{ opacity: "0.7" }}><a href={storeurl} style={{ backgroundColor: fontColor, color: backgroundColor, textAlign: "center", padding: "10px 15px", width: "100%", display: "block", borderRadius: "10px", marginTop: "10px", textDecoration: "none", lineHeight: "normal" }} target="_blank">Buy Now</a></div>}
            </div>
            {/* List Layout */}
            {/* <div className="custom-description" style={{display: "flex", flexDirection: "column"}}>
                <div><span>The Collection Snowboard: Liquid&nbsp,</span></div>
                <div style={{display: "flex", opacity: "0.7"}}>
                    <div style={{flex: "1 0 auto"}}>Total Inventory</div>
                    <div style={{flex: "1 1 auto", justifyContent: "flex-end", display: "flex"}}>20</div>
                </div>
                <div style={{display: "flex", opacity: "0.7"}}>
                    <div style={{flex: "1 0 auto"}}>SKU</div>
                    <div style={{flex: "1 1 auto", justifyContent: "flex-end", display: "flex"}}>sku-hosted-1</div>
                </div>
                <div style={{display: "flex", opacity: "0.7"}}>
                    <div style={{flex: "1 0 auto"}}>Options</div>
                    <div style={{flex: "1 1 auto", justifyContent: "flex-end", display: "flex"}}>Default Title</div>
                </div>
                <div style={{display: "flex", opacity: "0.7"}}>
                    <div style={{flex: "1 0 auto"}}>Wholesale Price</div>
                    <div style={{flex: "1 1 auto", justifyContent: "flex-end", display: "flex"}}>₹749.95</div>
                </div>
                <div style={{display: "flex", opacity: "0.7"}}>
                    <div style={{flex: "1 0 auto"}}>Retail Price</div>
                    <div style={{flex: "1 1 auto", justifyContent: "flex-end", display: "flex"}}>₹749.95</div>
                </div>
            </div> */}
        </>
    )
}

export default LineByLineTextLayout;