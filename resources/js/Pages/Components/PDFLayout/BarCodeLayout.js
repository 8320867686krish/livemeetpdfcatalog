var Barcode = require('react-barcode');

const BarCodeLayout = ({ barCode = "" }) => {
    const defaultOption = {
        value: barCode,
        // width: 2,
        height: 50,
        format: "CODE128",
        displayValue: true,
        // fontOptions: "",
        // font: "monospace",
        textAlign: "center",
        textPosition: "bottom",
        textMargin: 2,
        fontSize: 18,
        background: "#FFFFFF",
        lineColor: "#000000",
        // margin: 10,
        // marginTop: undefined,
        // marginBottom: undefined,
        // marginLeft: undefined,
        // marginRight: undefined
    }

    return (
        <div className={`barcode_area ${barcodeRotation} ${barcodePosition}`} style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
            <Barcode {...defaultOption} />
        </div>
    )
}

export default BarCodeLayout;