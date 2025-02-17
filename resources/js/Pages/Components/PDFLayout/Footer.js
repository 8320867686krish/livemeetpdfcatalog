import { format, parse } from "date-fns";
import { commonLevel } from "./commanLevel";

const Footer = (data) => {
    const {
        footerText = "",
        footerAlignment = "",
        fontFamily = "",
        fontColor = "",
        backgroundColor = "",
        footerPageNoEnabled = 0,
        footerDateEnabled = 0,
        footerDateFormat = "",
        pageSize = "",
        paddingLeft = "30px",
        paddingRight = "30px",
        paperLayout = "",
    } = data;
    let alignment = "center";
    if (
        (footerText !== "" && footerDateEnabled == "1") ||
        (footerText !== "" && footerPageNoEnabled == "1") ||
        (footerPageNoEnabled == "1" && footerDateEnabled == "1")
    )
        alignment = "space-between";
    else if (footerAlignment === "left") alignment = "flex-start";
    else if (footerAlignment === "right") alignment = "flex-end";

    const { footerFontSpacing } = commonLevel(paperLayout);
    return (
        <div
            id="footer"
            style={{
                width: "100%",
                height: "48px",
                paddingTop: "0px",
                paddingBottom: "15px",
                textAlign: footerAlignment,
                fontSize: "18px",
                lineHeight: "1.2",
                position: "absolute",
                left: "0px",
                bottom: "0px",
                fontFamily: fontFamily,
                color: fontColor,
                overflow: "hidden",
                backgroundColor: backgroundColor,
                zIndex: "2",
                display: "flex",
                alignItems: "center",
                letterSpacing: footerFontSpacing,
            }}
        >
            <div
                style={{
                    /* flex: "1 0 auto", */ paddingLeft: paddingLeft,
                    paddingRight: paddingRight,
                    display: "flex",
                    justifyContent: alignment,
                    width: "100%" /* alignItems: "flex-end" */,
                }}
            >
                {footerAlignment === "left" && (
                    <>
                        {footerText !== "" && <div>{footerText}</div>}
                        {footerPageNoEnabled == "1" && <div>{pageSize}</div>}
                        {footerDateEnabled == "1" && (
                            <div>{format(new Date(), footerDateFormat)}</div>
                        )}
                    </>
                )}
                {footerAlignment === "center" && (
                    <>
                        {footerPageNoEnabled == "1" && <div>{pageSize}</div>}
                        {footerText !== "" && <div>{footerText}</div>}
                        {footerDateEnabled == "1" && (
                            <div>{format(new Date(), footerDateFormat)}</div>
                        )}
                    </>
                )}
                {footerAlignment === "right" && (
                    <>
                        {footerDateEnabled == "1" && (
                            <div>{format(new Date(), footerDateFormat)}</div>
                        )}
                        {footerPageNoEnabled == "1" && <div>{pageSize}</div>}
                        {footerText !== "" && <div>{footerText}</div>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Footer;
