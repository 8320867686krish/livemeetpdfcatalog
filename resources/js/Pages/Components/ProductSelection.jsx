import { Button, Card, Page, Text, TextField, LegacyCard, EmptyState, ButtonGroup, Spinner, Toast, Select, Icon, Autocomplete, Tag, LegacyStack, Checkbox, Tooltip, SkeletonBodyText, Modal, Banner } from "@shopify/polaris";
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
    const [catelogName, setCatelogName] = useState("Untitled catelog");
    const [productData, setProductData] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [fetchProductLoader, setFetchProductLoader] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [collectionOptions, setCollectionOptions] = useState([]);
    const [loadingCollections, setLoadingCollections] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [allCollections, setAllCollections] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [productEdit, setProductEdit] = useState([]);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);
    const [excludeNotInStore, setExcludeNotInStore] = useState(false);
    const [showDataTableLoader, setShowDataTableLoader] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState([]);
    const [currency, setCurrency] = useState('');
    const [variantModalOpen, setVariantModalOpen] = useState(false);
    const [isProductWithVariant, setIsProductWithVariant] = useState(false);
    const [activeBannerError, setActiveBannerError] = useState(false);
    const [errorBannerMessage, setErrorBannerMessage] = useState("");

    useEffect(() => {
        console.log("ProductData updated:", productData);
    }, [productData]);
    const app = createApp(config);

    useEffect(() => {
        console.log("Selected Collections:", selectedCollections);
    }, [selectedCollections]);

    const getSelectedProductIds = () => {
        const selectedProducts = {};
        console.log("selected products from getSelectedProductIds ", productData)
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

        return Object.values(selectedProducts);
    };

    const normalizeId = (gid) => {
        if (!gid) return "";
        if (typeof gid === 'string' && gid.includes('gid://shopify/')) {
            const parts = gid.split('/');
            return parts[parts.length - 1];
        }
        return String(gid).replace(/\D/g, '');
    };

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

                const lastPriority = productData.length > 0
                    ? Math.max(...productData.map(item => item.priority))
                    : 0;

                const { productMap, variantMap } = buildExistingIdMaps(productData);

                let selectedProducts = [];
                let newCount = 0;

                selection.selection.forEach(product => {
                    const productNormalizedId = normalizeId(product.id);
                    console.log(`Processing product: ${product.title}, ID: ${product.id}, Normalized: ${productNormalizedId}`);

                    if (product.variants && product.variants.length > 0) {
                        product.variants.forEach(variant => {
                            const variantNormalizedId = normalizeId(variant.id);
                            console.log(`  - Variant: ${variant.title}, ID: ${variant.id}, Normalized: ${variantNormalizedId}`);

                            if (!variantMap[variantNormalizedId]) {
                                console.log(`    Adding new variant: ${variantNormalizedId}`);
                                newCount++;

                                selectedProducts.push({
                                    id: variant.id,
                                    productId: product.id,
                                    variantId: variant.id,
                                    normalizedProductId: productNormalizedId,
                                    normalizedVariantId: variantNormalizedId,
                                    name: variant.title === "Default Title" ? product.title : `${product.title} - ${variant.title}`,
                                    priority: lastPriority + newCount,
                                    price: variant.price || "N/A",
                                    compareAtPrice: variant.compareAtPrice || "N/A",
                                    currency: variant.presentmentPrices?.[0]?.price?.currencyCode || "USD"
                                });

                                variantMap[variantNormalizedId] = true;
                            } else {
                                console.log(`    Skipping existing variant: ${variantNormalizedId}`);
                            }
                        });
                    } else {
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

                            productMap[productNormalizedId] = true;
                        } else {
                            console.log(`  Skipping existing product: ${productNormalizedId}`);
                        }
                    }
                });

                if (selectedProducts.length > 0) {
                    console.log(`Adding ${selectedProducts.length} new products/variants`);
                    setProductData(prevData => [...prevData, ...selectedProducts]);
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
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleProductResponse = (response) => {
        if (response?.status === "success" && Array.isArray(response.products)) {
            const existingProductMap = new Map();
            const existingVariantMap = new Map();

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

                if (isProductWithVariant && product.variants && product.variants.length > 0) {
                    product.variants.forEach(variant => {
                        const variantNormalizedId = normalizeId(variant.id);
                        if (!existingVariantMap.has(variantNormalizedId)) {
                            newProducts.push({
                                id: variant.id,
                                productId: product.id,
                                variantId: variant.id,
                                normalizedProductId: productNormalizedId,
                                normalizedVariantId: variantNormalizedId,
                                name: variant.title === "Default Title" ? product.title : `${product.title} - ${variant.title || 'Default'}`,
                                priority: lastPriority + newProducts.length + 1,
                                price: variant.price || "N/A",
                                compareAtPrice: variant.compareAtPrice || "N/A",
                                currency: "USD"
                            });
                            existingVariantMap.set(variantNormalizedId, true);
                        }
                    });
                } else {
                    if (!existingProductMap.has(productNormalizedId)) {
                        newProducts.push({
                            id: product.id,
                            productId: product.id,
                            normalizedProductId: productNormalizedId,
                            name: product.title,
                            priority: lastPriority + newProducts.length + 1,
                            price: product.variants?.[0]?.price || "N/A",
                            compareAtPrice: product.variants?.[0]?.compareAtPrice || "N/A",
                            currency: "USD"
                        });
                        existingProductMap.set(productNormalizedId, true);
                    }
                }
            });

            console.log(`Adding ${newProducts.length} new products from collections`);
            setProductData(prevData => [...prevData, ...newProducts]);

            // Check for limit exceed and show banner
            if (response.isLimitExceed === true && response.productLimitMessage) {
                setErrorBannerMessage(response.productLimitMessage);
                setActiveBannerError(true);
            }
        } else {
            showToast("No products found for selected collections");
        }
    };

    const handleAddCollectionClick = () => {
        console.log("Opening variant confirmation modal...");
        setVariantModalOpen(true);
    };

    const handleVariantModalConfirm = () => {
        setVariantModalOpen(false);
        console.log("Opening collection picker with isProductWithVariant:", isProductWithVariant);

        const collectionPicker = ResourcePicker.create(app, {
            resourceType: ResourcePicker.ResourceType.Collection,
            options: {},
        });

        collectionPicker.subscribe(ResourcePicker.Action.SELECT, async (selection) => {
            console.log("Selected Collections:", selection.selection);

            const newCollections = selection.selection.map(col => ({
                id: col.id,
                normalizedId: normalizeId(col.id),
                title: col.title,
                handle: col.handle,
            }));

            console.log("Selected Collections: ", newCollections);
            collectionPicker.dispatch(ResourcePicker.Action.CLOSE);

            const selectedCollectionIds = newCollections.map(col => col.id);
            console.log("selectedCollectionIds ", selectedCollectionIds);
            if (selectedCollectionIds.length > 0) {
                setFetchProductLoader(true);
                try {
                    const response = await fetchMethod(
                        postMethodType,
                        `getProductsByCollections`,
                        shopid,
                        {
                            collectionIds: selectedCollectionIds,
                            isProductWithVariant
                        }
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

    const handleVariantModalCancel = () => {
        setVariantModalOpen(false);
        setIsProductWithVariant(false);
    };

    const fetchProductEdit = async (setShowDataTableLoaderInput = true) => {
        if (pdfId && pdfId != null) {
            try {
                setShowDataTableLoader(setShowDataTableLoaderInput);
                const payload = {
                    "setting_id": pdfId
                };
                const responseData = await fetchMethod(postMethodType, "product/edit", shopid, payload);
                console.log("productEdit responseData ", responseData);

                if (responseData?.errorCode == 0) {
                    setCatelogName(responseData?.data?.settings?.catalog_name);
                    setSortOption(responseData?.data?.settings?.sort_by);
                    setExcludeOutOfStock(responseData?.data?.settings?.excludeOutOfStock);
                    setExcludeNotInStore(responseData?.data?.settings?.excludeNotInStore);
                    setSelectedCollections(responseData?.data?.settings?.collectionName?.split(',') || []);

                    const existingProductMap = {};
                    const existingVariantMap = {};
                    productData.forEach(item => {
                        const normProductId = normalizeId(item.productId);
                        if (normProductId) existingProductMap[normProductId] = true;
                        const normVariantId = normalizeId(item.variantId);
                        if (normVariantId) existingVariantMap[normVariantId] = true;
                    });
                    const lastPriority = productData.length > 0
                        ? Math.max(...productData.map(item => item.priority))
                        : 0;

                    let newProducts = [];
                    responseData?.data?.selectedProducts?.forEach((product, index) => {
                        const productNormalizedId = normalizeId(product.id);
                        console.log(`Checking product: ${product.title}, ID: ${product.id}, Normalized ID: ${productNormalizedId}`);
                        if (product.variants && product.variants.length > 0) {
                            product.variants.forEach(variant => {
                                const variantNormalizedId = normalizeId(variant.id);
                                console.log(`  - Checking variant: ${variant.title || 'Default'}, ID: ${variant.id}, Normalized ID: ${variantNormalizedId}`);
                                if (!existingVariantMap[variantNormalizedId]) {
                                    console.log(`    - Adding new variant: ${variantNormalizedId}`);

                                    newProducts.push({
                                        id: variant.id,
                                        productId: product.id,
                                        variantId: variant.id,
                                        normalizedProductId: productNormalizedId,
                                        normalizedVariantId: variantNormalizedId,
                                        name: variant.title === "Default Title" ? product.title : `${product.title} - ${variant.title || 'Default'}`,
                                        priority: lastPriority + newProducts.length + 1,
                                        price: variant.price || "N/A",
                                        compareAtPrice: variant.compareAtPrice || "N/A",
                                        currency: "USD"
                                    });
                                    existingVariantMap[variantNormalizedId] = true;
                                } else {
                                    console.log(`    - Skipping existing variant: ${variantNormalizedId}`);
                                }
                            });
                        } else {
                            if (!existingProductMap[productNormalizedId]) {
                                console.log(`  - Adding new product: ${productNormalizedId}`);
                                newProducts.push({
                                    id: product.id,
                                    productId: product.id,
                                    normalizedProductId: productNormalizedId,
                                    name: product.title,
                                    priority: lastPriority + newProducts.length + 1,
                                    price: product.variants?.[0]?.price || "N/A",
                                    compareAtPrice: product.variants?.[0]?.compareAtPrice || "N/A",
                                    currency: "USD"
                                });
                                existingProductMap[productNormalizedId] = true;
                            } else {
                                console.log(`  - Skipping existing product: ${productNormalizedId}`);
                            }
                        }
                    });
                    setProductData(newProducts);
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

    const fetchCollections = async () => {
        try {
            const responseData = await fetchMethod(getMethodType, "collections/get", shopid);
            console.log("collection responseData ", responseData);

            if (responseData?.message === "suceess") {
                const options = responseData.data.collections.map((col) => ({
                    label: col.label,
                    value: col.value,
                }));
                setCurrency(responseData?.data?.currency);
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

    useEffect(() => {
        const fetchData = async () => {
            setLoadingCollections(true);
            try {
                const [collections, productEditData] = await Promise.all([fetchCollections(), fetchProductEdit()]);
                setAllCollections(collections);
                setFilteredOptions(collections);
                setProductEdit(productEditData);
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
        if (!catelogName || catelogName == "" || catelogName == " ") {
            showToast("Catelog name cannot be empty.");
            return false;
        }
        try {
            setButtonLoader(true);
            const requestData = {
                id: pdfId == null ? 0 : pdfId,
                catalog_name: catelogName,
                sort_by: sortOption,
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
            const response = await fetchMethod(
                postMethodType,
                `product/save`,
                shopid,
                requestData
            );
            console.log("response from product/save ", response);
            if (response?.errorCode == 0) {
                showToast("Data saved successfully!");
                navigate(`${URL_PREFIX}configrations?id=${response?.setting_id}`)
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
                title={pdfId ? "Edit catalog" : "Create new catalog"}
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
                                    Back
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
                            disabled={loadingCollections}
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
                        {activeBannerError && (
                            <div style={{ marginBottom: "20px" }}>
                                <Banner
                                    title="Limitation of selected plan. If you remove this error please upgrade your plan."
                                    action={{
                                        content: "Upgrade Plan",
                                        onAction: () => navigate(`${URL_PREFIX}plans`),
                                    }}
                                    onDismiss={() => setActiveBannerError(false)}
                                    tone="critical"
                                >
                                    <p>{errorBannerMessage}</p>
                                </Banner>
                            </div>
                        )}
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
                                {showDataTableLoader ? <>
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
                                            <DraggableTable
                                                productData={productData}
                                                setProductData={setProductData}
                                                sortOption={sortOption}
                                                setSortOption={setSortOption}
                                                parentCurrency={currency}
                                            />
                                        </>
                                    )}
                                </>}
                            </>
                        }
                    </Card>
                </div>
            </Page>
            <ProductFilterModal
                open={filterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                shopid={shopid}
                productData={productData}
                setProductData={setProductData}
                setActiveBannerError={setActiveBannerError}
                setErrorBannerMessage={setErrorBannerMessage}
            />
            <Modal
                open={variantModalOpen}
                onClose={handleVariantModalCancel}
                title="Include Product Variants"
                primaryAction={{
                    content: 'Confirm',
                    onAction: handleVariantModalConfirm,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: handleVariantModalCancel,
                    },
                ]}
            >
                <Modal.Section>
                    <Checkbox
                        label="Include product variants from selected collections"
                        checked={isProductWithVariant}
                        onChange={(newValue) => setIsProductWithVariant(newValue)}
                    />
                </Modal.Section>
            </Modal>
            {toastMessage && <Toast content={toastMessage} onDismiss={() => setToastMessage(null)} />}
        </>
    );
};

export default ProductSelection;