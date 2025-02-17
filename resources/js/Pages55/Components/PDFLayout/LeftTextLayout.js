import React from "react";
import { displayStringBaseOnLimit } from "../../helper";

const LeftTextLayout = (data) => {
    const { productAttributes = [], productData = {}, descriptionCharLimit = 25, productButtonEnabled = '0', priceAdjustment = '', productChangeInPercentage = "", productTaxPercentage = "", fontColor = "", backgroundColor = "" } = data;
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
            {/* Grid layout */}
            <div className="custom-description" style={{ display: "flex", fontSize: fontSize, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", width: "100%", padding: "10px" }}>
                <div className="custom-title" style={{ flex: "1 1 auto" }}>
                    {(productAttributes.includes('name') && title !== '') && <span style={{ letterSpacing: "0.1px" }}>{title}</span>}
                    {/* {(productAttributes.includes('price') && price !== '') && <div style={{ opacity: "0.7" }}>Total inventory</div>} */}
                    {(productAttributes.includes('sku') && sku !== '') && <div className="custom-sku" style={{ opacity: "0.7" }}>{sku}</div>}
                    {/* {(productAttributes.includes('price') && price !== '') && <div className="custom-sku" style={{ opacity: "0.7" }}>Default Title</div>} */}
                    {(productAttributes.includes('description') && description !== '') && <div className="custom-sku" style={{ opacity: "0.7" }}>{_description}</div>}
                </div>
                <div style={{ flex: "0 1 auto", display: "flex", opacity: "0.7", flexDirection: "column", alignItems: "flex-end", width: "175px" }}>
                    {(productAttributes.includes('price') && productTaxPercentage > 0) && <div><span className="custom-price">Tax {taxPrice}</span></div>}
                    {(productAttributes.includes('price') && newPrice !== '') && <div><span className="custom-price">{newPrice}</span></div>}
                    {/* {(productAttributes.includes('price') && price !== '') && <div style={{ opacity: "0.7" }}>Total inventory 20</div>} */}
                    {/* <div style={{ opacity: "0.7" }}>20</div> */}
                    {productButtonEnabled == '1' && <div><a href={storeurl} style={{ backgroundColor: fontColor, color: backgroundColor, textAlign: "center", padding: "10px 15px", width: "100%", display: "block", borderRadius: "10px", marginTop: "10px", textDecoration: "none", lineHeight: "normal" }} target="_blank">Buy Now</a></div>}
                </div>
            </div>
            {/* {productButtonEnabled == '1' && <div><a href={storeurl} style={{ backgroundColor: fontColor, color: backgroundColor, textAlign: "center", padding: "10px 15px", width: "100%", display: "block", borderRadius: "10px", marginTop: "10px", textDecoration: "none", lineHeight: "normal" }} target="_blank">Buy Now</a></div>} */}
            {/* List layout */}
            {/* <div className="custom-description" style={{display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}>
                <div className="custom-title" style={{flex: "1 1 auto"}}>
                    <span style={{letterSpacing: "0.1px"}}>The 3p Fulfilled Snowboard&nbsp,</span>
                    <div style={{opacity: "0.7"}}>Total inventory</div>
                    <div className="custom-sku" style={{opacity: "0.7"}}>sku-hosted-1</div>
                    <div className="custom-sku" style={{opacity: "0.7"}}>Default Title</div>
                </div>
                <div style={{flex: "0 1 auto", display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                    <div><span className="custom-price">₹2,629.95</span></div>
                    <div style={{opacity: "0.7"}}>20</div>
                </div>
            </div> */}
        </>
    )
}

export default LeftTextLayout;