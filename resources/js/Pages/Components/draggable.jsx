import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Icon, TextField, Select, InlineError } from "@shopify/polaris";
import { DeleteIcon, DragHandleIcon } from "@shopify/polaris-icons";
import { useAppBridge } from '@shopify/app-bridge-react';

const DraggableTable = ({ productData, setProductData, sortOption, setSortOption, parentCurrency }) => {
    const app = useAppBridge();
    const shopCurrency = app?.shop?.currencyCode;
    const [searchQuery, setSearchQuery] = useState("");
    // const [sortOption, setSortOption] = useState("default");
    const [items, setItems] = useState(() => {
        return [...productData].map((item, index) => ({
            ...item,
            priority: item.priority || index + 1,
        }));
    });

    const handleDragEnd = (result) => {
        if (!result.destination || sortOption !== "default") return;

        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, movedItem);

        // Update priority based on new order
        const reorderedItems = updatedItems.map((item, index) => ({
            ...item,
            priority: index + 1,
        }));

        setItems(reorderedItems);
        setProductData(reorderedItems)
        console.log(`Item "${movedItem.name}" moved from position ${result.source.index + 1} to ${result.destination.index + 1}`);
    };

    const handleDelete = (id) => {
        const itemToDelete = items.find(item => item.id === id);
        const filteredItems = items.filter((item) => item.id !== id);

        const updatedItems = filteredItems.map((item, index) => ({
            ...item,
            priority: index + 1,
        }));

        setItems(updatedItems);
        setProductData(updatedItems);
        console.log(`Deleted item "${itemToDelete?.name}" (previous priority: ${itemToDelete?.priority})`);
    };

    const handleDeleteAll = () => {
        console.log("All items deleted");
        setItems([]);
        setProductData([]);
    };

    // Filter items based on search query
    let filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort items based on selected sorting option
    let sortedItems = [...filteredItems];

    if (sortOption !== "default") {
        sortedItems = [...filteredItems].sort((a, b) => {
            switch (sortOption) {
                case "priceHighLow":
                    return b.price - a.price;
                case "priceLowHigh":
                    return a.price - b.price;
                case "comparePriceHighLow":
                    return b.compareAtPrice - a.compareAtPrice;
                case "comparePriceLowHigh":
                    return a.compareAtPrice - b.compareAtPrice;
                case "titleAZ":
                    return a.name.localeCompare(b.name);
                case "titleZA":
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });
    }

    useEffect(() => {
        setItems([...productData].map((item, index) => ({
            ...item,
            priority: item.priority || index + 1,
        })));
    }, [productData]);

    useEffect(() => {
        console.log("Current Priority Order:");
        console.table(items.map(item => ({
            id: item.id,
            name: item.name,
            priority: item.priority
        })));
    }, [items, productData]);

    useEffect(() => {
        setItems([...productData]);
    }, [productData]);



    return (
        <div style={styles.container}>

            {/* Search and Sort */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }} >
                <div style={{ width: "50%" }}>
                    <TextField
                        label="Search Products"
                        value={searchQuery}
                        onChange={(value) => setSearchQuery(value)}
                        placeholder="Search by product name"
                        autoComplete="off"
                    />
                </div>
                <div style={{ width: "50%" }}>
                    <Select
                        label="Sort by"
                        options={[
                            { label: "Default", value: "default" },
                            { label: "Price: High to Low", value: "priceHighLow" },
                            { label: "Price: Low to High", value: "priceLowHigh" },
                            { label: "Compare Price: High to Low", value: "comparePriceHighLow" },
                            { label: "Compare Price: Low to High", value: "comparePriceLowHigh" },
                            { label: "Title: A-Z", value: "titleAZ" },
                            { label: "Title: Z-A", value: "titleZA" }
                        ]}
                        value={sortOption}
                        onChange={setSortOption}
                        helpText={sortOption != "default" ? "Custom sorting won't work when a filter is applied." : ""}
                    />
                </div>
            </div>

            {/* Warning Message */}
            {/* {sortOption !== "default" && (
                <InlineError message="Custom sorting won't work when a filter is applied." />
            )} */}

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="table" >
                    {(provided) => (
                        <table ref={provided.innerRef} {...provided.droppableProps} style={styles.table}>
                            <thead>
                                <tr style={styles.headerRow}>
                                    <th style={styles.th}>Order</th>
                                    <th style={styles.th}>Product Name</th>
                                    <th style={styles.th}>Price</th>
                                    <th style={styles.th}>Compare at price</th>
                                    <th align="center" style={styles.th}>
                                        <Button onClick={handleDeleteAll} destructive size="slim">
                                            Delete All
                                        </Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedItems.length > 0 ? (
                                    sortedItems.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        // isDragDisabled={sortOption !== "default"}
                                        >
                                            {(provided, snapshot) => (
                                                <tr
                                                    ref={provided.innerRef}
                                                    {...(sortOption === "default" ? provided.draggableProps : {})}
                                                    {...(sortOption === "default" ? provided.dragHandleProps : {})}
                                                    style={{
                                                        ...styles.row,
                                                        backgroundColor: snapshot.isDragging ? "#f0f0f0" : "white",
                                                        boxShadow: snapshot.isDragging ? "0px 4px 10px rgba(0,0,0,0.1)" : "none",
                                                        // opacity: sortOption !== "default" ? 0.5 : 1,
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <td style={styles.td}>
                                                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                            {sortOption === "default" && (
                                                                <span>
                                                                    <Icon source={DragHandleIcon} tone="base" />
                                                                </span>
                                                            )}
                                                            <span>{index + 1}</span>
                                                        </div>
                                                    </td>
                                                    <td style={styles.td}>
                                                        {item.name}
                                                    </td>
                                                    <td style={styles.td}>
                                                        {parentCurrency}  {item.price}
                                                    </td>
                                                    <td style={styles.td}>
                                                        {parentCurrency} {item.compareAtPrice}
                                                    </td>
                                                    <td align="center" style={styles.td}>
                                                        <Button icon={DeleteIcon} onClick={() => handleDelete(item.id)} destructive size="slim" />
                                                    </td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={styles.emptyMessage}>No products found</td>
                                    </tr>
                                )}
                                {provided.placeholder}
                            </tbody>
                        </table>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};




// Styles remain unchanged
const styles = {
    container: {
        width: "100%",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        textAlign: "left",
        fontSize: "20px",
        fontWeight: "bold",
        paddingBottom: "10px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    headerRow: {
        backgroundColor: "#f4f6f8",
        textAlign: "left",
    },
    th: {
        padding: "12px",
        fontSize: "14px",
        fontWeight: "bold",
        borderBottom: "2px solid #dfe3e8",
    },
    row: {
        transition: "background 0.2s ease-in-out",
        cursor: "grab",
    },
    td: {
        padding: "12px",
        fontSize: "14px",
        borderBottom: "1px solid #dfe3e8",
    },
    productImage: {
        width: "50px",
        height: "50px",
        marginRight: "10px",
        verticalAlign: "middle",
        borderRadius: "4px",
    },
    emptyMessage: {
        padding: "20px",
        textAlign: "center",
        fontSize: "14px",
        color: "#6d7175",
    },
};

export default DraggableTable;
