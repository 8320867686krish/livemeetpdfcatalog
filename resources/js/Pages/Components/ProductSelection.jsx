import { Button, Card, Page, Text, TextField, LegacyCard, EmptyState, ButtonGroup } from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import DraggableTable from "./draggable";
import createApp from '@shopify/app-bridge';
import { ResourcePicker } from '@shopify/app-bridge/actions';

const ProductSelection = () => {
    const config = {
        apiKey: window.shopifyApiKey,
        host: new URLSearchParams(location.search).get("host"),
        forceRedirect: true
    };

    const [catelogName, setCatelogName] = useState("");
    const [productData, setProductData] = useState([]);

    // Debug: Log productData whenever it changes
    useEffect(() => {
        console.log("ProductData updated:", productData);
    }, [productData]);
    const app = createApp(config);

    // Function to get selected product IDs for pre-selection
    const getSelectedProductIds = () => {
        const ids = productData.map(product => ({ id: product.id }));
        console.log("Current selected IDs:", ids);
        return ids;
    };

    // Handle opening product picker
    const handleAddProductClick = () => {
        console.log("Opening product picker...");

        const productPicker = ResourcePicker.create(app, {
            resourceType: ResourcePicker.ResourceType.Product,
            options: {
                initialSelectionIds: getSelectedProductIds(),
            }
        });

        productPicker.subscribe(ResourcePicker.Action.SELECT, (selection) => {
            console.log("Selection from picker:", selection);

            // Create a fresh array of selected products
            const selectedProducts = selection.selection.map((product, index) => ({
                id: product.id,
                name: product.title,
                priority: index + 1, // Simplify priority to just be the index + 1
                image: product.images?.[0]?.originalSrc || "https://via.placeholder.com/50",
                price: product.variants?.[0]?.price || "N/A",
                compareAtPrice: product.variants?.[0]?.compareAtPrice || "N/A",
                currency: product.variants?.[0]?.presentmentPrices?.[0]?.price?.currencyCode || "USD"
            }));

            alert("Processed selected products:", selectedProducts);

            // Simply replace the entire productData with the new selection
            setProductData(selectedProducts);

            productPicker.dispatch(ResourcePicker.Action.CLOSE);
        });

        productPicker.dispatch(ResourcePicker.Action.OPEN);
    };

    return (
        <>
            <Page
                title="Create new catalog"
                subtitle="Pick the products you'd like to add to your catalog. We support adding products using multiple methods including manually, using various filters, tags, and through collections."
                fullWidth
            >
                <div style={{ width: "30%" }}>
                    <TextField
                        label="Enter name for catalog"
                        value={catelogName}
                        onChange={(value) => setCatelogName(value)}
                        autoComplete="off"
                        placeholder="Eg: Example Catalog"
                    />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <Card>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <Text variant="headingMd" as="h6">
                                    Added collections and products
                                </Text>
                                <p>
                                    Drag collection or product to change priority and sort products in the catalog.
                                </p>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <Button onClick={handleAddProductClick}>Add product</Button>
                                <Button>Add product using filters</Button>
                                <Button>Add collections</Button>
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <LegacyCard sectioned>
                                {productData.length === 0 ? (
                                    <EmptyState
                                        heading="Which product do you want to include?"
                                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                    >
                                        <ButtonGroup>
                                            <Button primary onClick={handleAddProductClick}>
                                                Add product
                                            </Button>
                                            <Button onClick={() => console.log("View history clicked")}>
                                                Add product using filters
                                            </Button>
                                            <Button external url="https://help.shopify.com">
                                                Add collections
                                            </Button>
                                        </ButtonGroup>
                                    </EmptyState>
                                ) : (
                                    <DraggableTable productData={productData} />
                                )}
                            </LegacyCard>
                        </div>
                    </Card>
                </div>
            </Page>
        </>
    );
};

export default ProductSelection;