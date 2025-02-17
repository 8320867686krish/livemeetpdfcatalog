import { Icon } from '@shopify/polaris';
import { ImageMajor } from '@shopify/polaris-icons';

const OneItemGrid = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'oneItemGrid' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('oneItemGrid', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex" }}>
                        <Icon source={ImageMajor} tone="base" />
                    </div>
                </div>
            </button>
        </div>
    )
}

export default OneItemGrid;