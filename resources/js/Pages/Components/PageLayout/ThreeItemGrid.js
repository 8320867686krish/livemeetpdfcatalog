import { Icon } from '@shopify/polaris';
import { ImageIcon, ImageMajor } from '@shopify/polaris-icons';

const ThreeItemGrid = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'threeItemGrid' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('threeItemGrid', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div style={{ display: "flex", flexDirection: "column", height: "48%" }}>
                    <div style={{ height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <div>
                            <div>
                                <Icon
                                    source={ImageIcon}
                                    tone="base"
                                />
                            </div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>

                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "48%", marginTop: "2px" }}>
                    <div style={{ width: "100%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <div>
                            <div>
                                <Icon
                                    source={ImageIcon}
                                    tone="base"
                                />
                            </div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                    </div>
                    <div style={{ width: "100%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <div>
                            <div>
                                <Icon
                                    source={ImageIcon}
                                    tone="base"
                                />
                            </div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default ThreeItemGrid;