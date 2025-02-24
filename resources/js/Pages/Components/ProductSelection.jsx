import { Button, Card, Page, Text, TextField, LegacyCard, EmptyState, ButtonGroup } from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import DraggableTable from "./draggable";
import createApp from '@shopify/app-bridge';
import { ResourcePicker } from '@shopify/app-bridge/actions';
import ProductFilterModal from "./ProductFilterModal";

const ProductSelection = ({ props }) => {
    const { shopid = "", activePlan = {} } = props;
    console.log("props from product seelction ", props);
    console.log("shopid from product seelction ", shopid);
    const config = {
        apiKey: window.shopifyApiKey,
        host: new URLSearchParams(location.search).get("host"),
        forceRedirect: true
    };

    const [catelogName, setCatelogName] = useState("");
    const [productData, setProductData] = useState([]);
    const [filterModalOpen, setFilterModalOpen] = useState(false);


    const handleFilterApply = (filters) => {
        console.log("Applied Filters:", filters);
        // You can now use these filters to fetch and display filtered products
    };


    useEffect(() => {
        console.log("ProductData updated:", productData);
    }, [productData]);
    const app = createApp(config);

    const getSelectedProductIds = () => {
        const selectedProducts = {};

        productData.forEach(item => {
            const productId = item.productId;
            const variantId = item.variantId ? item.variantId : null;

            if (!selectedProducts[productId]) {
                selectedProducts[productId] = { id: productId, variants: [] };
            }

            if (variantId) {
                selectedProducts[productId].variants.push({ id: variantId });
            }
        });

        // Convert object to array for initialSelectionIds
        return Object.values(selectedProducts);
    };

    
    const handleAddProductClick = () => {
        console.log("Opening product picker...");
    
        const productPicker = ResourcePicker.create(app, {
            resourceType: ResourcePicker.ResourceType.Product,
            options: {
                initialSelectionIds: getSelectedProductIds(), // Pass correctly formatted selections
                showVariants: true, // Allow variant selection
            },
        });
    
        productPicker.subscribe(ResourcePicker.Action.SELECT, (selection) => {
            console.log("Selection from picker:", selection);
    
            const lastPriority = productData.length > 0
                ? Math.max(...productData.map(item => item.priority))
                : 0;
    
            let selectedProducts = [];
    
            selection.selection.forEach((product) => {
                if (product.variants.length > 0) {
                    product.variants.forEach((variant, index) => {
                        const isAlreadySelected = productData.some(existing => existing.variantId === variant.id);
                        if (!isAlreadySelected) {
                            selectedProducts.push({
                                id: variant.id, // Use variant ID directly
                                productId: product.id,
                                variantId: variant.id,
                                name: `${product.title} - ${variant.title}`,
                                priority: lastPriority + selectedProducts.length + 1,
                                price: variant.price || "N/A",
                                compareAtPrice: variant.compareAtPrice || "N/A",
                                currency: variant.presentmentPrices?.[0]?.price?.currencyCode || "USD"
                            });
                        }
                    });
                } else {
                    const isAlreadySelected = productData.some(existing => existing.productId === product.id);
                    if (!isAlreadySelected) {
                        selectedProducts.push({
                            id: product.id,
                            productId: product.id,
                            name: product.title,
                            priority: lastPriority + selectedProducts.length + 1,
                            price: product.variants?.[0]?.price || "N/A",
                            compareAtPrice: product.variants?.[0]?.compareAtPrice || "N/A",
                            currency: product.variants?.[0]?.presentmentPrices?.[0]?.price?.currencyCode || "USD"
                        });
                    }
                }
            });
    
            if (selectedProducts.length > 0) {
                console.log("Processed selected products and variants:", selectedProducts);
                setProductData(prevData => [...prevData, ...selectedProducts]);
            } else {
                console.log("No new products or variants selected.");
            }
    
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
                                <Button onClick={() => setFilterModalOpen(true)}>Add product using filters</Button>
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
                                            <Button onClick={() => setFilterModalOpen(true)}>
                                                Add product using filters
                                            </Button>
                                            <Button external url="https://help.shopify.com">
                                                Add collections
                                            </Button>
                                        </ButtonGroup>
                                    </EmptyState>
                                ) : (
                                    <DraggableTable productData={productData} setProductData={setProductData} />
                                )}
                            </LegacyCard>
                        </div>
                    </Card>
                </div>
            </Page>
            {/* ====================================== Modal =========================================== */}
            <ProductFilterModal
                open={filterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                onApplyFilters={handleFilterApply}
                shopid={shopid}
                productData={productData}
                setProductData={setProductData}
            />
        </>
    );
};

export default ProductSelection;