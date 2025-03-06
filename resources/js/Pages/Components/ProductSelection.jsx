import { Button, Card, Page, Text, TextField, LegacyCard, EmptyState, ButtonGroup, Spinner, Toast, Select, Icon, Autocomplete, Tag, LegacyStack, Checkbox, Tooltip, SkeletonBodyText } from "@shopify/polaris";
import React, { useState, useEffect, useCallback } from "react";
import DraggableTable from "./draggable";
import createApp from '@shopify/app-bridge';
import { ResourcePicker } from '@shopify/app-bridge/actions';
import ProductFilterModal from "./ProductFilterModal";
import { fetchMethod } from "../helper";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    QuestionCircleIcon
} from '@shopify/polaris-icons';
import { Route, useNavigate, useParams } from "react-router-dom";

const ProductSelection = ({ props }) => {
    const { shopid = "", activePlan = {} } = props;
    console.log("props from product seelction ", props);
    console.log("shopid from product seelction ", shopid);
    console.log("host from product seelction ",);
    const host = localStorage.getItem('host')
    const config = {
        apiKey: window.shopifyApiKey,
        host: host,
        forceRedirect: true
    };
    const queryParams = new URLSearchParams(location.search);
    const pdfId = queryParams.get("id");
    console.log("edit pdf id is ", pdfId);
    const navigate = useNavigate()
    const [catelogName, setCatelogName] = useState("");
    const [productData, setProductData] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [selectedCollections, setSelectedCollections] = useState([]); // Store selected collections`
    const [fetchProductLoader, setFetchProductLoader] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [collectionOptions, setCollectionOptions] = useState([]);
    const [loadingCollections, setLoadingCollections] = useState(true); // Loader state
    const [inputValue, setInputValue] = useState("");
    const [allCollections, setAllCollections] = useState([]); // Store all collections
    const [filteredOptions, setFilteredOptions] = useState([]); // Filtered
    const [productEdit, setProductEdit] = useState([]); // Filtered
    const [buttonLoader, setButtonLoader] = useState(false);
    const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);
    const [excludeNotInStore, setExcludeNotInStore] = useState(false);
    const [showDataTableLoader, setShowDataTableLoader] = useState(false);


    const handleCollectionSelect = (selected) => {
        // Map selected values back to objects for UI rendering
        const selectedItems = selected.map(value => {
            return collectionOptions.find(option => option.value === value);
        }).filter(Boolean);

        setSelectedCollections(selectedItems);
    };

    const removeSelectedCollection = (value) => {
        setSelectedCollections(prev => prev.filter(item => item.value !== value));
    };



    const handleFilterApply = (filters) => {
        console.log("Applied Filters:", filters);
        // You can now use these filters to fetch and display filtered products
    };


    useEffect(() => {
        console.log("ProductData updated:", productData);
    }, [productData]);
    const app = createApp(config);

    useEffect(() => {
        console.log("Selected Collections:", selectedCollections);
    }, [selectedCollections]);

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
     * Utility for debugging - checks for duplicate products in data
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

        try {
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
        }
        catch (e) {
            console.log("error while opening add product ", e)
        }
    };

    const getSelectedCollectionIds = () => {
        return selectedCollections.map(col => ({ id: col.id }));
    };

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000); // Hide toast after 3 seconds
    };

    const handleProductResponse = (response) => {
        if (response?.status === "success" && Array.isArray(response.products)) {
            const existingProductMap = new Map();
            const existingVariantMap = new Map();

            // Store existing product and variant IDs to avoid duplicates
            productData.forEach(item => {
                existingProductMap.set(normalizeId(item.productId), true);
                existingVariantMap.set(normalizeId(item.variantId), true);
            });

            const lastPriority = productData.length > 0
                ? Math.max(...productData.map(item => item.priority))
                : 0;

            let newProducts = [];

            response.products.forEach(product => {
                const productNormalizedId = normalizeId(product.id);

                product.variants.forEach(variant => {
                    const variantNormalizedId = normalizeId(variant.id);

                    if (!existingVariantMap.has(variantNormalizedId)) {
                        newProducts.push({
                            id: variant.id,
                            productId: product.id,
                            variantId: variant.id,
                            normalizedProductId: productNormalizedId,
                            normalizedVariantId: variantNormalizedId,
                            name: `${product.title} - ${variant.title || 'Default'}`,
                            priority: lastPriority + newProducts.length + 1,
                            price: variant.price || "N/A",
                            compareAtPrice: variant.compareAtPrice || "N/A",
                            currency: "USD"
                        });

                        existingVariantMap.set(variantNormalizedId, true);
                    }
                });
            });

            console.log(`Adding ${newProducts.length} new products from collections`);

            setProductData(prevData => [...prevData, ...newProducts]);

            showToast(newProducts.length > 0 ? `${newProducts.length} product(s) added` : "No new products found");
        } else {
            showToast("No products found for selected collections");
        }
    };


    const handleAddCollectionClick = () => {
        console.log("Opening collection picker...");

        const collectionPicker = ResourcePicker.create(app, {
            resourceType: ResourcePicker.ResourceType.Collection,
            options: {
                initialSelectionIds: getSelectedCollectionIds(), // Maintain previously selected collections
            },
        });

        collectionPicker.subscribe(ResourcePicker.Action.SELECT, async (selection) => {
            console.log("Selected Collections:", selection.selection);

            // Normalize selection and update state
            const newCollections = selection.selection.map(col => ({
                id: col.id,
                normalizedId: normalizeId(col.id),
                title: col.title,
                handle: col.handle,
            }));

            setSelectedCollections(newCollections);
            console.log("Selected Collections: ", newCollections);
            collectionPicker.dispatch(ResourcePicker.Action.CLOSE);

            // Extract collection IDs
            const selectedCollectionIds = newCollections.map(col => col.id);
            console.log("selectedCollectionIds ", selectedCollectionIds)
            if (selectedCollectionIds.length > 0) {
                setFetchProductLoader(true); // Show loader while fetching products
                try {
                    const response = await fetchMethod(
                        postMethodType,
                        `getProductsByCollections`,
                        shopid,
                        { collectionIds: selectedCollectionIds }
                    );

                    console.log("Products from collections:", response);
                    handleProductResponse(response);
                } catch (error) {
                    console.error("Error fetching collection products:", error);
                    showToast("Failed to fetch collection products");
                } finally {
                    setFetchProductLoader(false);
                }
            }
        });

        collectionPicker.dispatch(ResourcePicker.Action.OPEN);
    };


    // Fetch collections when component mounts
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const responseData = await fetchMethod(getMethodType, "collections/get", shopid);
                console.log("collection responseData ", responseData);

                if (responseData?.message === "suceess") {
                    const options = responseData.data.collections.map((col) => ({
                        label: col.label,
                        value: col.value,
                    }));

                    return [{ label: "Please select collection", value: "" }, ...options];
                } else {
                    console.error("Failed to fetch collections:", responseData);
                    return [];
                }
            } catch (error) {
                console.error("Error fetching collections:", error);
                return [];
            }
        };

        const fetchProductEdit = async () => {
            if (pdfId && pdfId != null) {
                try {
                    setShowDataTableLoader(true);
                    const responseData = await fetchMethod(postMethodType, "product/edit", shopid, { "setting_id": pdfId });
                    console.log("productEdit responseData ", responseData);

                    if (responseData?.errorCode == 0) {
                        setCatelogName(responseData?.data?.settings?.catalog_name);
                        setSortOption(responseData?.data?.settings?.sort_by);
                        setExcludeOutOfStock(responseData?.data?.settings?.excludeOutOfStock);
                        setExcludeNotInStore(responseData?.data?.settings?.excludeNotInStore);
                        console.log("responseData?.data?.collectionName?.split(',')", responseData?.data?.settings?.collectionName?.split(','));
                        setSelectedCollections(responseData?.data?.settings?.collectionName?.split(','));
                        const formattedProducts = responseData?.data?.selectedProducts?.map((product) => ({
                            id: product.id,
                            priority: product.priority,
                            price: product.price,
                            name: product.displayName,
                            compareAtPrice: product.compareAtPrice,

                        })) || [];
                        setProductData(formattedProducts);
                        return responseData.data;
                    } else {
                        console.error("Failed to fetch product edit:", responseData);
                        return null;
                    }
                } catch (error) {
                    console.error("Error fetching product edit:", error);
                    return null;
                }
                finally {
                    setShowDataTableLoader(false);
                }
            }
        };

        const fetchData = async () => {
            setLoadingCollections(true);
            try {
                const [collections, productEditData] = await Promise.all([fetchCollections(), fetchProductEdit()]);

                setAllCollections(collections);
                setFilteredOptions(collections);
                setProductEdit(productEditData); // Assuming `setProductEdit` is your state setter
            } catch (error) {
                console.error("Error in fetching data:", error);
            } finally {
                setLoadingCollections(false);
            }
        };

        fetchData();
    }, [shopid]);


    useEffect(() => {
        const getEditData = async () => {

            try {
                const responseData = await fetchMethod(getMethodType, `setting/${pdfId}`, shopid);
                console.log("responseData getEditData", responseData);
            }
            catch (error) {
                console.error("Error fetching collections:", error);
            }
        }

    }, [pdfId])

    const handleInputChange = useCallback(
        (newValue) => {
            setInputValue(newValue);

            if (newValue.trim() === "") {
                setFilteredOptions(allCollections);
            } else {
                setFilteredOptions(
                    allCollections.filter((option) =>
                        option.label.toLowerCase().includes(newValue.toLowerCase())
                    )
                );
            }
        },
        [allCollections]
    );


    const removeTag = useCallback(
        (tagValue) => () => {
            setSelectedCollections(selectedCollections.filter((value) => value !== tagValue));
        },
        [selectedCollections]
    );

    const handleSaveAndContinue = async () => {
        try {
            setButtonLoader(true);
            // Prepare the data for the API call
            const requestData = {
                id: pdfId == null ? 0 : pdfId, // Assuming pdfId is the ID you want to send
                catalog_name: catelogName,
                sort_by: sortOption, // You can change this based on your requirements
                collectionName: selectedCollections.map(col => col).join(","),
                selectedProducts: productData.map((product, index) => ({
                    product_id: product.id,
                    priority: product.priority
                })),
                excludeNotInStore: excludeNotInStore,
                excludeOutOfStock: excludeOutOfStock,
            };
            console.log("productData from productSelection  ", productData);
            console.log("requestData ", requestData);
            // Make the API call
            const response = await fetchMethod(
                postMethodType,
                `product/save`,
                shopid,
                requestData
            );
            console.log("response from product/save ", response);
            // Handle the response
            if (response?.errorCode == 0) {
                showToast("Data saved successfully!");
                // setTimeout(() => {
                navigate(`${URL_PREFIX}configrations?id=${response?.setting_id}`)
                // }, 2000);
                // You can add any additional logic here, such as redirecting the user
            } else {
                showToast("Failed to save data.");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            showToast("An error occurred while saving data.");
        }
        finally {
            setButtonLoader(false);
        }
    };

    const selectedTagsMarkup =
        selectedCollections.length > 0 ? (
            <LegacyStack spacing="extraTight" alignment="center">
                {selectedCollections.map((collectionId) => {
                    const collection = allCollections.find((col) => col.value === collectionId);
                    return collection ? (
                        <Tag key={collectionId} onRemove={removeTag(collectionId)}>
                            {collection.label}
                        </Tag>
                    ) : null;
                })}
            </LegacyStack>
        ) : null;


    const textField = (
        <Autocomplete.TextField
            onChange={handleInputChange}
            label="Choose collections"
            value={inputValue}
            placeholder="Search collections..."
            verticalContent={selectedTagsMarkup}
            autoComplete="off"
            prefix={loadingCollections && <Spinner size="small" />}
        />
    );



    return (
        <>
            <Page
                title="Create new catalog"
                subtitle="Pick the products you'd like to add to your catalog. We support adding products using multiple methods including manually, using various filters, tags, and through collections."
                fullWidth
            >
                <div style={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: "center",
                    marginBottom: "10px"
                }}>
                    <div>
                        <Button loading={buttonLoader} onClick={() => {
                            navigate(`${URL_PREFIX}`)
                        }}>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    <Icon
                                        source={ChevronLeftIcon}
                                        tone="base"
                                    />
                                </div>
                                <div>
                                    Cancel
                                </div>
                            </div>
                        </Button>
                    </div>
                    {productData.length != 0 ? <div>
                        <Button variant="primary" onClick={handleSaveAndContinue} loading={buttonLoader}>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    Save & continue
                                </div>
                                <div>
                                    <Icon
                                        source={ChevronRightIcon}
                                        tone="base"
                                    />
                                </div>
                            </div>
                        </Button>
                    </div> : <></>
                    }
                </div>
                <div style={{ display: "flex", gap: "30px", alignItems: "end" }}>
                    <div style={{ width: "50%" }}>
                        <TextField
                            label="Enter name for catalog"
                            value={catelogName}
                            onChange={(value) => setCatelogName(value)}
                            autoComplete="off"
                            placeholder="Eg: Example Catalog"
                        />
                    </div>
                    <div style={{ width: "50%", display: "flex", gap: "15px" }}>
                        <div style={{ width: "100%" }}>
                            <Autocomplete
                                allowMultiple
                                options={filteredOptions}
                                selected={selectedCollections}
                                onSelect={setSelectedCollections}
                                textField={textField}
                            />
                        </div>
                    </div>
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
                                <Button onClick={handleAddCollectionClick}>Add collections</Button>
                            </div>
                        </div>
                        {
                            fetchProductLoader ? <div style={{ display: "flex", justifyContent: "center", minHeight: "350px", alignItems: "center" }}>
                                <Spinner accessibilityLabel="Spinner example" size="large" />
                            </div> : <>
                                {showDataTableLoader? <>
                                    <div style={{ padding: "20px" }}>
                                        <LegacyCard>
                                            <div style={{ padding: "20px" }}>
                                                <div style={{ padding: "10px" }}>
                                                    <SkeletonBodyText />
                                                </div>
                                                <div style={{ padding: "10px" }}>
                                                    <SkeletonBodyText />
                                                </div>
                                                <div style={{ padding: "10px" }}>
                                                    <SkeletonBodyText />
                                                </div>
                                                <div style={{ padding: "10px" }}>
                                                    <SkeletonBodyText />
                                                </div>
                                                <div style={{ padding: "10px" }}>
                                                    <SkeletonBodyText />
                                                </div>
                                            </div>
                                        </LegacyCard>
                                    </div>

                                </> : <>
                                    {productData.length === 0 ? (
                                    <div style={{ marginTop: "20px" }}>

                                        <LegacyCard sectioned>
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
                                                    <Button onClick={handleAddCollectionClick}>
                                                        Add collections
                                                    </Button>
                                                </ButtonGroup>
                                            </EmptyState>
                                        </LegacyCard>
                                    </div>
                                    ) : (
                                    <>
                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                            <div style={{ display: "flex", gap: "30px", alignItems: "end" }}>
                                                <div style={{ marginTop: "10px" }}>
                                                    <Checkbox
                                                        label="Exclude product out of stock"
                                                        checked={excludeOutOfStock}
                                                        onChange={() => setExcludeOutOfStock((prevState) => !prevState)
                                                        }
                                                    />
                                                </div>
                                                <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <div>
                                                        <Checkbox
                                                            label="Exclude product not in store"
                                                            checked={excludeNotInStore}
                                                            onChange={() => setExcludeNotInStore((prevState) => !prevState)
                                                            } />
                                                    </div>
                                                    <div>
                                                        <Tooltip content={`This will remove any product that is currently in the Draft or Archived state along with any product where the "Online Store" sales channel is not enabled or that doesn't have any assigned markets..`}>
                                                            <Icon
                                                                source={QuestionCircleIcon}
                                                                tone="base"
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <DraggableTable productData={productData} setProductData={setProductData} sortOption={sortOption} setSortOption={setSortOption} />
                                    </>
                                    )}
                                </>}
                            </>
                        }

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
            {toastMessage && <Toast content={toastMessage} onDismiss={() => setToastMessage(null)} />}
        </>
    );
};

export default ProductSelection;