import { Icon } from '@shopify/polaris';
import { ImageIcon, ListMajor } from '@shopify/polaris-icons';

const TwoItemLeftList = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'twoItemLeftList' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('twoItemLeftList', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div style={{ display: "flex", flexDirection: "row", height: "48%" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <Icon source={ImageIcon} tone="base" />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "48%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <Icon source={ImageIcon} tone="base" />
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                </div>
            </button>
        </div>
    )
}

export default TwoItemLeftList;