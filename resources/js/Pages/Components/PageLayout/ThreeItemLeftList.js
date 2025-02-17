import { Icon } from '@shopify/polaris';
import { ImageMajor, ListMajor } from '@shopify/polaris-icons';

const ThreeItemLeftList = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'threeItemLeftList' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('threeItemLeftList', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div style={{ display: "flex", flexDirection: "row", height: "32%" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ImageMajor} tone="base" />
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ListMajor} tone="base" />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "32%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ListMajor} tone="base" />
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ImageMajor} tone="base" />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "32%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ImageMajor} tone="base" />
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ListMajor} tone="base" />
                    </div>
                </div>
            </button>
        </div>
    )
}

export default ThreeItemLeftList;