import { Icon } from '@shopify/polaris';
import { ImageMajor } from '@shopify/polaris-icons';

const ThreeItemGridReverse = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'threeItemGridReverse' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('threeItemGridReverse', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div style={{ display: "flex", flexDirection: "row", height: "48%" }}>
                    <div style={{ width: "100%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ImageMajor} tone="base" />
                    </div>
                    <div style={{ width: "100%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ImageMajor} tone="base" />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", height: "48%", marginTop: "2px" }}>
                    <div style={{ height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ImageMajor} tone="base" />
                    </div>
                </div>
            </button>
        </div>
    )
}

export default ThreeItemGridReverse;