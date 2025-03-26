import React from 'react';
import { Card, EmptyState } from '@shopify/polaris';

const TableNoRecord = ({ emptyProps = {} }) => {
    const { heading = '', image = '', action = {}, message = '' } = emptyProps;
    return (
        <div className="table_no_record_area">
            {/* <Card> */}
            <EmptyState
                heading={heading}
                // action={action}
                image={image}
            >
                <p>{message}</p>
            </EmptyState>
            {/* </Card> */}
        </div>
    );
}

export default TableNoRecord;