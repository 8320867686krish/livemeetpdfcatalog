import { Icon } from '@shopify/polaris';
import { ImageIcon, ImageMajor, ListMajor } from '@shopify/polaris-icons';

const FiveItemList = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'fiveItemList' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('fiveItemList', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div style={{ display: "flex", flexDirection: "row", height: "18%" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "18%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "18%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "18%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", height: "18%", marginTop: "2px" }}>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <div>
                            <Icon
                                source={ImageIcon}
                                tone="base"
                            />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", border: "1px solid rgb(201, 204, 208)", margin: "1px", justifyContent: "center", color: "grey", display: "flex", alignItems: "center" }}>
                        <img src={`${IMAGE_PREFIX}images/text.png`} style={{ height: "20px" }} />
                    </div>
                </div>
            </button>
        </div>
    )
}

export default FiveItemList;