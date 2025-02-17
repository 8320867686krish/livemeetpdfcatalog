import React from "react";
import { displayStringBaseOnLimit } from "../../helper";

const DefaultTextLayout = (data) => {
    // console.log('DefaultTextLayout :', data)
    const { productAttributes = [], productData = {}, descriptionCharLimit = 25, productButtonEnabled = '0', priceAdjustment = '', productChangeInPercentage = "", productTaxPercentage = "", fontColor = "", backgroundColor = "" } = data;
    let { title = '', sku = '', description = '', price = '', storeurl = '',compareAtPrice = ""} = productData;
    const _description = description !== null ? displayStringBaseOnLimit(description, descriptionCharLimit) : '';

    //Get the price without currency..
    if (compareAtPrice !== null) {
        // console.log(
        //     "compare regex price ",
        //     compareAtPrice.match(/[0-9]*\.?[0-9]+/g)[0]
        // );
        if (compareAtPrice.match(/[0-9]*\.?[0-9]+/g)[0] !== "0.00") {
            price = compareAtPrice.replaceAll(",", "");
        } else {
            price = price.replaceAll(",", "");
        }
    } else {
        price = price.replaceAll(",", "");
    }
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
            <div className="custom-description" style={{ display: "flex", fontSize: fontSize, flexDirection: "column", alignItems: "center", width: "100%", padding: "10px" }}>
                {(productAttributes.includes('name') && title !== '') && <div className="custom-title" style={{ textAlign: "center" }}>
                    <div style={{ letterSpacing: "0.1px" }}>{title}</div>
                </div>}
                {(productAttributes.includes('sku') && sku !== '') && <div className="custom-sku" style={{ opacity: "0.7" }}>{sku}</div>}
                {(productAttributes.includes('description') && description !== '') && <div className="custom-sku" style={{ opacity: "0.7" }}>{_description}</div>}
                {(productAttributes.includes('price') && productTaxPercentage > 0) && <div><span className="custom-price" style={{ opacity: "0.7" }}>Tax {taxPrice}</span></div>}
                {(productAttributes.includes('price') && newPrice !== '') && <div><span className="custom-price" style={{ opacity: "0.7" }}>{newPrice}</span></div>}
                {/* {(productAttributes.includes('price') && price !== '') && <div style={{ opacity: "0.7" }}>Total inventory 20</div>} */}
                {productButtonEnabled == '1' && <div style={{ opacity: "0.7" }}><a href={storeurl} style={{ backgroundColor: fontColor, color: backgroundColor, textAlign: "center", padding: "10px 15px", width: "100%", display: "block", borderRadius: "10px", marginTop: "10px", textDecoration: "none", lineHeight: "normal" }} target="_blank">Buy Now</a></div>}
            </div>
            {/* List Layout */}
            {/* <div className="custom-description" style={{display: flex, flexDirection: column, alignItems: center"}}>
                <div className="custom-title" style={{textAlign: center"}}>
                    <div style={{letterSpacing: "0.1px"}}>The 3p Fulfilled Snowboard&nbsp,</div>
                </div>
                <div className="custom-sku" style={{opacity: "0.7"}}>sku-hosted-1</div>
                <div className="custom-sku" style={{opacity: "0.7"}}>Default Title</div>
                <div><span className="custom-price">₹2,629.95 </span></div>
                <div style={{opacity: "0.7"}}>Total inventory 20</div>
            </div> */}
        </>
    )
}

export default DefaultTextLayout;