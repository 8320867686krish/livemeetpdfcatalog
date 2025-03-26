import React from "react";
import { commonLevel } from "./commanLevel";

const Header = (data) => {
    const {
        headerText = "",
        headerAlignment = "",
        fontFamily = "",
        fontColor = "",
        backgroundColor = "",
        logo = "",
        paddingLeft = "30px",
        paddingRight = "30px",
        paperLayout = "",
    } = data;
    let _logo = logo;
    if (_logo !== "") {
        _logo =
            logo.indexOf("data:image") > -1
                ? logo
                : `${IMAGE_PREFIX}uploads/logo/${logo}`;
    }

    let alignment = "center";
    if (logo !== "" && headerText !== "") alignment = "space-between";
    else if (headerAlignment === "left") alignment = "flex-start";
    else if (headerAlignment === "right") alignment = "flex-end";
    const { headerFontSpacing } = commonLevel(paperLayout);
    return (
        <div
            id="header"
            style={{
                width: "100%",
                height: "48px",
                paddingTop: "15px",
                paddingBottom: "15px",
                textAlign: headerAlignment,
                fontSize: "18px",
                lineHeight: "1.2",
                position: "absolute",
                left: "0px",
                top: "0px",
                fontFamily: fontFamily,
                color: fontColor,
                overflow: "hidden",
                backgroundColor: backgroundColor,
                zIndex: "2",
                display: "flex",
                alignItems: "center",
                letterSpacing: headerFontSpacing,
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: alignment,
                    alignItems: "center",
                    paddingLeft: paddingLeft,
                    paddingRight: paddingRight,
                    width: "100%",
                }}
            >
                {headerAlignment === "right" ? (
                    <>
                        {_logo && (
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundSize: "contain",
                                    backgroundImage: "url(" + _logo ?? "" + ")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "left center",
                                    transform: "translate(0px, 0px) scale(1)",
                                }}
                            ></div>
                        )}
                        <div>{headerText !== "" ? headerText : "  "}</div>
                    </>
                ) : (
                    <>
                        {headerAlignment === "center" ? <>
                            <div style={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>
                                <div style={{ display : "flex" , justifyContent : "center" , width : "100% "}}>
                                    <div>{headerText !== "" ? headerText : "  "}</div>
                                </div>
                                {_logo && (
                                    <div
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            backgroundSize: "contain",
                                            backgroundImage: "url(" + _logo ?? "" + ")",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right center",
                                            transform: "translate(0px, 0px) scale(1)",
                                        }}
                                    ></div>
                                )}
                            </div>
                        </> : <>
                            <>
                                <div>{headerText !== "" ? headerText : "  "}</div>
                                {_logo && (
                                    <div
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            backgroundSize: "contain",
                                            backgroundImage: "url(" + _logo ?? "" + ")",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right center",
                                            transform: "translate(0px, 0px) scale(1)",
                                        }}
                                    ></div>
                                )}
                            </>
                        </>} </>

                )}
            </div>
        </div>
    );
};

export default Header;