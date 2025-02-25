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

    // Add these utility functions at the top of your file or in a separate utilities file

    /**
     * Normalizes Shopify IDs to a consistent format for comparison
     * Works with both GraphQL GIDs and regular IDs
     */
    const normalizeId = (gid) => {
        if (!gid) return "";
        // For Shopify GID format: "gid://shopify/Product/1234567890"
        if (typeof gid === 'string' && gid.includes('gid://shopify/')) {
            const parts = gid.split('/');
            return parts[parts.length - 1];
        }
        // For numeric IDs or other formats
        return String(gid).replace(/\D/g, '');
    };

    /**
     * Builds maps of existing product and variant IDs for duplicate checking
     */
    const buildExistingIdMaps = (productData) => {
        const productMap = {};
        const variantMap = {};

        productData.forEach(item => {
            const normProductId = normalizeId(item.productId);
            if (normProductId) productMap[normProductId] = true;

            const normVariantId = normalizeId(item.variantId);
            if (normVariantId) variantMap[normVariantId] = true;
        });

        return { productMap, variantMap };
    };

    /**
     * Utility for debugging - checks for duplicate products in your data
     */
    const checkForDuplicates = (productData) => {
        const variantMap = {};
        const productMap = {};
        const duplicates = [];

        productData.forEach((item, index) => {
            const normProductId = normalizeId(item.productId);
            const normVariantId = normalizeId(item.variantId || item.productId);

            const key = normVariantId || normProductId;

            if (variantMap[key]) {
                duplicates.push({
                    index,
                    item,
                    normalizedId: key,
                    duplicateOf: variantMap[key]
                });
            } else {
                variantMap[key] = index;
            }

            // Also track products
            if (normProductId && !item.variantId && productMap[normProductId]) {
                if (!duplicates.some(d => d.index === index)) {
                    duplicates.push({
                        index,
                        item,
                        normalizedProductId: normProductId,
                        duplicateOf: productMap[normProductId]
                    });
                }
            } else if (normProductId && !item.variantId) {
                productMap[normProductId] = index;
            }
        });

        console.log('Duplicate products/variants found:', duplicates);
        return duplicates;
    };


    const handleAddProductClick = () => {
        console.log("Opening product picker...");

        const productPicker = ResourcePicker.create(app, {
            resourceType: ResourcePicker.ResourceType.Product,
            options: {
                initialSelectionIds: getSelectedProductIds(),
                showVariants: true,
            },
        });

        productPicker.subscribe(ResourcePicker.Action.SELECT, (selection) => {
            console.log("Selection from picker:", selection);

            // Get last priority for sorting
            const lastPriority = productData.length > 0
                ? Math.max(...productData.map(item => item.priority))
                : 0;

            // Get maps of existing product/variant IDs
            const { productMap, variantMap } = buildExistingIdMaps(productData);

            // Process new selections
            let selectedProducts = [];
            let newCount = 0;

            selection.selection.forEach(product => {
                const productNormalizedId = normalizeId(product.id);
                console.log(`Processing product: ${product.title}, ID: ${product.id}, Normalized: ${productNormalizedId}`);

                if (product.variants && product.variants.length > 0) {
                    // Process variants
                    product.variants.forEach(variant => {
                        const variantNormalizedId = normalizeId(variant.id);
                        console.log(`  - Variant: ${variant.title}, ID: ${variant.id}, Normalized: ${variantNormalizedId}`);

                        // Check if this variant is already in our data
                        if (!variantMap[variantNormalizedId]) {
                            console.log(`    Adding new variant: ${variantNormalizedId}`);
                            newCount++;

                            selectedProducts.push({
                                id: variant.id,
                                productId: product.id,
                                variantId: variant.id,
                                normalizedProductId: productNormalizedId,
                                normalizedVariantId: variantNormalizedId,
                                name: `${product.title} - ${variant.title}`,
                                priority: lastPriority + newCount,
                                price: variant.price || "N/A",
                                compareAtPrice: variant.compareAtPrice || "N/A",
                                currency: variant.presentmentPrices?.[0]?.price?.currencyCode || "USD"
                            });

                            // Mark as existing to prevent duplicates within this selection
                            variantMap[variantNormalizedId] = true;
                        } else {
                            console.log(`    Skipping existing variant: ${variantNormalizedId}`);
                        }
                    });
                } else {
                    // Process product without variants
                    if (!productMap[productNormalizedId]) {
                        console.log(`  Adding new product: ${productNormalizedId}`);
                        newCount++;

                        selectedProducts.push({
                            id: product.id,
                            productId: product.id,
                            normalizedProductId: productNormalizedId,
                            name: product.title,
                            priority: lastPriority + newCount,
                            price: product.variants?.[0]?.price || "N/A",
                            compareAtPrice: product.variants?.[0]?.compareAtPrice || "N/A",
                            currency: variant.presentmentPrices?.[0]?.price?.currencyCode || "USD"
                        });

                        // Mark as existing
                        productMap[productNormalizedId] = true;
                    } else {
                        console.log(`  Skipping existing product: ${productNormalizedId}`);
                    }
                }
            });

            if (selectedProducts.length > 0) {
                console.log(`Adding ${selectedProducts.length} new products/variants`);
                setProductData(prevData => [...prevData, ...selectedProducts]);

                // Optional: Check for duplicates after adding
                // setTimeout(() => checkForDuplicates(productData), 500);
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