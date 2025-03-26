import React from 'react';

const BlankLayout = ({ customClass = "", productPageLayoutId = "", onClick = () => { } }) => {
    return (
        <div className={`page_layout_item${productPageLayoutId === 'blankLayout' ? ' active' : ''}`} onClick={customClass !== "" ? () => { } : () => onClick('blankLayout', 'productPageLayoutId')}>
            <button className={`layout_btn ${customClass}`} disabled={customClass !== "" ? true : false}>
                <div className="item_box_txt">Text</div>
            </button>
        </div>
    );
}

export default BlankLayout;