import { Icon } from '@shopify/polaris';
import { ImageMajor } from '@shopify/polaris-icons';
import {
    ListNumberedIcon, ImageIcon
} from '@shopify/polaris-icons';
const SixItemGrid = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'sixItemGrid' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('sixItemGrid', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div style={{ display: "flex", flexDirection: "row", height: "32%" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                        <div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                        <div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "32%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                        <div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                        <div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "32%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                        <div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                        <div>
                            <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default SixItemGrid;