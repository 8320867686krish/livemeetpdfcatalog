export function commonLevel(paperLayout) {
    console.log("paperLayout : ", paperLayout);
    let user = localStorage.getItem("domain");
    let a4paperTitlSpacing = user == "difpt6-39.myshopify.com" ? "3px" : "1.5px";
    const zoomSize =
        paperLayout === "a4"
            ? 0.83
            : paperLayout === "a3"
                ? 1.174
                : paperLayout === "a5"
                    ? 0.580
                    : paperLayout === "letter"
                        ? 0.77
                        : paperLayout === "legal"
                            ? 0.851
                            : 0;
    // 0.851

    // const pdfHeightForSpecificPage = paperLayout === "legal" ? "42.4cm" : ""
    const letterSpacingBuyNow =
        paperLayout === "a4"
            ? "1.5px"
            : paperLayout === "letter" || paperLayout === "legal"
                ? "2px"
                : paperLayout === "a3"
                    ? "1px"
                    : paperLayout === "a5"
                        ? "7px"
                        : "10px";
    const letterSpacingTitle =
        paperLayout === "a4"
            ? a4paperTitlSpacing
            : paperLayout === "letter" || paperLayout === "legal"
                ? "2px"
                : paperLayout === "a3"
                    ? "0.6px"
                    : paperLayout === "a5"
                        ? "7px"
                        : "10px";
    const headerFontSpacing =
        paperLayout === "a4"
            ? "1px"
            : paperLayout === "letter" || paperLayout === "legal"
                ? "1px"
                : paperLayout === "a3"
                    ? "0.3px"
                    : paperLayout === "a5"
                        ? "7px"
                        : "10px";
    const footerFontSpacing =
        paperLayout === "a4"
            ? "2px"
            : paperLayout === "letter" || paperLayout === "legal"
                ? "1px"
                : paperLayout === "a3"
                    ? "0.3px"
                    : paperLayout === "a5"
                        ? "7px"
                        : "10px";

    const buyNowButtonPadding =
        paperLayout === "a5" ? "2px 15px 18px 15px" : "5px 15px 10px 15px";
    return {
        zoomSize: zoomSize,
        letterSpacingBuyNow: letterSpacingBuyNow,
        letterSpacingTitle: letterSpacingTitle,
        headerFontSpacing: headerFontSpacing,
        footerFontSpacing: footerFontSpacing,
        buyNowButtonPadding: buyNowButtonPadding,
        // pdfHeightForSpecificPage : pdfHeightForSpecificPage
    };
}

export const legalPaperSize = "42.3cm";
export const A5PaperSize = "36.30cm";
export const letterPaperSize = "36.5cm";


export function generateShopifyUrl(gid, type = "cart", shopDomain) {
    // Extract the numeric ID from GID
    const match = gid.match(/\/(\d+)$/);
    if (!match) {
        console.error("Invalid GID format");
        return null;
    }

    const variantId = match[1];

    if (type === "cart") {
        return `https://${shopDomain}/cart/add?id=${variantId}&quantity=1&return_to=/cart`;
    } else if (type === "checkout") {
        return `https://${shopDomain}/cart/${variantId}:1?checkout`;
    } else {
        console.error("Invalid type. Use 'cart' or 'checkout'.");
        return null;
    }
}

export function getStoreUrlFromShopifyProductUrl(productUrl) {
    try {
      const url = new URL(productUrl);
      return `${url.protocol}//${url.hostname}`;
    } catch (e) {
      console.error("Invalid URL:", e);
      return null;
    }
  }
  