import { Icon } from '@shopify/polaris';
import { ImageIcon, ListMajor } from '@shopify/polaris-icons';

const ThreeItemRightList = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'threeItemRightList' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('threeItemRightList', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div style={{ display: "flex", flexDirection: "row", height: "32%" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <Icon source={ImageIcon} tone="base" />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "32%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <Icon source={ImageIcon} tone="base" />
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "32%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <Icon source={ImageIcon} tone="base" />
                    </div>
                </div>
            </button>
        </div>
    )
}

export default ThreeItemRightList;