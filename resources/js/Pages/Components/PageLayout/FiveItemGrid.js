import { Icon } from '@shopify/polaris';
import { ImageIcon, ImageMajor } from '@shopify/polaris-icons';

const FiveItemGrid = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'fiveItemGrid' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('fiveItemGrid', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div style={{ display: "flex", flexDirection: "column", height: "35%" }}>
                    <div style={{
                        height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center"
                    }}>
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
                <div style={{ display: "flex", flexDirection: "column", height: "60%", marginTop: "2px" }}>
                    <div style={{ display: "flex", flexDirection: "row", height: "50%" }}>
                        <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
                            <div>
                                <Icon
                                    source={ImageIcon}
                                    tone="base"
                                />
                            </div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                        <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
                            <div>
                                <Icon
                                    source={ImageIcon}
                                    tone="base"
                                />
                            </div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", height: "50%", marginTop: "2px" }}>
                        <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
                            <div>
                                <Icon
                                    source={ImageIcon}
                                    tone="base"
                                />
                            </div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                        <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
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

export default FiveItemGrid;