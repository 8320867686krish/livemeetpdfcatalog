import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Modal, Button, Select, TextField, Autocomplete, Icon, LegacyStack, Tag, Toast, Frame, Checkbox } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { fetchMethod } from "../helper";

const ProductFilterModal = ({ open, onClose, shopid, setProductData, productData, setActiveBannerError, setErrorBannerMessage }) => {
    const productStatusOptions = [
        { label: "All products", value: "all_products" },
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" },
    ];

    const [productStatus, setProductStatus] = useState("active");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [vendorOptionsList, setVendorOptionsList] = useState([]);
    const [productTypeOptionsList, setProductTypeOptionsList] = useState([]);
    const [productTagsOptionsList, setProductTagsOptionsList] = useState([]);
    const [vendorLoader, setVendorLoader] = useState(false);
    const [productTypeLoader, setProductTypeLoader] = useState(false);
    const [productTagLoader, setProductTagLoder] = useState(false);
    const [fetchProductLoader, setFetchProductLoader] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [isProductWithVariant, setIsProductWithVariant] = useState(false);

    // Fetch vendor list
    useEffect(() => {
        const fetchVendors = async () => {
            setVendorLoader(true);
            try {
                if (vendorOptionsList.length === 0) {
                    const responseData = await fetchMethod(getMethodType, "getAllVendors", shopid);
                    if (responseData?.status === "success" && Array.isArray(responseData.vendors)) {
                        setVendorOptionsList(responseData.vendors);
                    }
                }
            } catch (error) {
                console.error("Error fetching vendors:", error);
            } finally {
                setVendorLoader(false);
            }
        };

        fetchVendors();
    }, [shopid]);

    // Fetch product types
    useEffect(() => {
        const fetchProductTypes = async () => {
            setProductTypeLoader(true);
            try {
                if (productTypeOptionsList.length === 0) {
                    const responseData = await fetchMethod(getMethodType, "getAllProductTypes", shopid);
                    if (responseData?.status === "success" && Array.isArray(responseData.types)) {
                        setProductTypeOptionsList(responseData.types);
                    }
                }
            } catch (error) {
                console.error("Error fetching product types:", error);
            } finally {
                setProductTypeLoader(false);
            }
        };

        fetchProductTypes();
    }, [shopid]);

    // Fetch product tags
    useEffect(() => {
        const fetchProductTags = async () => {
            setProductTagLoder(true);
            try {
                if (productTagsOptionsList.length === 0) {
                    const responseData = await fetchMethod(getMethodType, "getAllProductTags", shopid);
                    if (responseData?.status === "success" && Array.isArray(responseData.tags)) {
                        setProductTagsOptionsList(responseData.tags);
                    }
                }
            } catch (error) {
                console.error("Error fetching product tags:", error);
            } finally {
                setProductTagLoder(false);
            }
        };

        fetchProductTags();
    }, [shopid]);

    // Common Autocomplete Hook
    const useMultiAutocomplete = (optionsList) => {
        const [selected, setSelected] = useState([]);
        const [inputValue, setInputValue] = useState("");
        const [options, setOptions] = useState(optionsList);

        useEffect(() => {
            setOptions(optionsList);
        }, [optionsList]);

        const updateText = useCallback((value) => {
            setInputValue(value);
            if (value === "") {
                setOptions(optionsList);
                return;
            }

            const filterRegex = new RegExp(value, "i");
            setOptions(optionsList.filter((option) => option.label.match(filterRegex)));
        }, [optionsList]);

        const updateSelection = useCallback((selectedItems) => {
            setSelected(selectedItems);
            setInputValue("");
            setOptions(optionsList); // Reset options back to full list after selection
        }, [optionsList]);

        const removeTag = useCallback((tag) => () => {
            setSelected(selected.filter((item) => item !== tag));
            setOptions(optionsList); // Ensure full list is shown again after removal
        }, [selected, optionsList]);

        const verticalContentMarkup = selected.length > 0 ? (
            <LegacyStack spacing="extraTight" alignment="center">
                {selected.map((option) => (
                    <Tag key={option} onRemove={removeTag(option)}>
                        {optionsList.find(o => o.value === option)?.label || option}
                    </Tag>
                ))}
            </LegacyStack>
        ) : null;

        return { selected, inputValue, updateText, updateSelection, options, verticalContentMarkup };
    };

    const vendorAutocomplete = useMultiAutocomplete(vendorOptionsList);
    const productTypeAutocomplete = useMultiAutocomplete(productTypeOptionsList);
    const productTagsAutocomplete = useMultiAutocomplete(productTagsOptionsList);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000); // Hide toast after 3 seconds
    };

    const normalizeId = (gid) => {
        if (!gid) return "";
        if (typeof gid === 'string' && gid.includes('gid://shopify/')) {
            const parts = gid.split('/');
            return parts[parts.length - 1];
        }
        return String(gid).replace(/\D/g, '');
    };

    const fetchFilteredProducts = async () => {
        setFetchProductLoader(true);
        const filters = {
            ...(productStatus !== "all_products" && { productStatus }),
            vendors: vendorAutocomplete.selected,
            productTypes: productTypeAutocomplete.selected,
            productTags: productTagsAutocomplete.selected,
            minPrice,
            maxPrice,
            isProductWithVariant
        };

        const filteredFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => {
                if (Array.isArray(value)) return value.length > 0;
                return value !== "" && value !== null && value !== false;
            })
        );

        try {
            const response = await fetchMethod(
                postMethodType,
                `getProductsUsingFilter`,
                shopid,
                filteredFilters
            );

            console.log("Filtered products response:", response);

            if (response?.status === "success" && Array.isArray(response.products)) {
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
                response.products.forEach((product, index) => {
                    const productNormalizedId = normalizeId(product.id);
                    if (product.variants && product.variants.length > 0 && isProductWithVariant) {
                        product.variants.forEach(variant => {
                            const variantNormalizedId = normalizeId(variant.id);
                            console.log("variantNormalizedId ",variantNormalizedId)
                            console.log("ouuter check ");
                            if (!existingVariantMap[variantNormalizedId]) {
                                console.log("check herer if")
                                console.log("new products check", newProducts)
                                newProducts.push({
                                    id: variant.id,
                                    productId: product.id,
                                    variantId: variant.id,
                                    normalizedProductId: productNormalizedId,
                                    productVariant: product.productVariant || null,
                                    normalizedVariantId: variantNormalizedId,
                                    name: variant.title && variant.title !== "Default Title" ? `${product.title} - ${variant.title}` : product.title,
                                    priority: lastPriority + newProducts.length + 1,
                                    price: variant.price || "N/A",
                                    compareAtPrice: variant.compareAtPrice || "N/A",
                                    currency: "USD"
                                });
                                existingVariantMap[variantNormalizedId] = true;
                                console.log("new products check", newProducts)
                            }
                        });
                    } else {
                        if (!existingProductMap[productNormalizedId]) {
                            console.log("check herer else ")
                            newProducts.push({
                                id: product.id,
                                productId: product.id,
                                normalizedProductId: productNormalizedId,
                                productVariant: product.productVariant || null,
                                name: product.title,
                                priority: lastPriority + newProducts.length + 1,
                                price: product.variants?.[0]?.price || "N/A",
                                compareAtPrice: product.variants?.[0]?.compareAtPrice || "N/A",
                                currency: "USD"
                            });
                            existingProductMap[productNormalizedId] = true;
                        }
                    }
                });
                console.log("new product are this ", newProducts);
                console.log(`Adding ${newProducts.length} new products/variants from API`);
                setProductData(prevData => [...prevData, ...newProducts]);

                const count = newProducts.length || 0;
                if (count > 0) {
                    showToast(`${count} product(s) added successfully`);
                } else {
                    showToast("No new products were added");
                }

                // Pass limit exceed info to parent component
                if (response.isLimitExceed === true && response.productLimitMessage) {
                    setErrorBannerMessage(response.productLimitMessage);
                    setActiveBannerError(true);
                }
            } else {
                showToast("Failed to fetch products");
            }
        } catch (error) {
            showToast("Failed to fetch products");
            console.error("Error fetching filtered products:", error);
        } finally {
            setFetchProductLoader(false);
            onClose();
        }
    };

    const applyFilters = () => fetchFilteredProducts();

    return (
        <>
            <Modal open={open} onClose={onClose} title="Filter Products">
                <Modal.Section>
                    <Select
                        label="Product Status"
                        options={productStatusOptions}
                        onChange={setProductStatus}
                        value={productStatus}
                    />

                    {/* Vendor Autocomplete */}
                    <div style={{ marginTop: "15px" }}>
                        <Autocomplete
                            loading={vendorLoader}
                            allowMultiple
                            options={vendorAutocomplete.options}
                            selected={vendorAutocomplete.selected}
                            onSelect={vendorAutocomplete.updateSelection}
                            textField={
                                <Autocomplete.TextField
                                    label="Vendors"
                                    value={vendorAutocomplete.inputValue}
                                    onChange={vendorAutocomplete.updateText}
                                    prefix={<Icon source={SearchIcon} />}
                                    placeholder="Search Vendors"
                                    verticalContent={vendorAutocomplete.verticalContentMarkup}
                                    autoComplete="off"
                                    loading={vendorLoader}
                                />
                            }
                        />
                    </div>

                    {/* Product Type Autocomplete */}
                    <div style={{ marginTop: "15px" }}>
                        <Autocomplete
                            loading={productTypeLoader}
                            allowMultiple
                            options={productTypeAutocomplete.options}
                            selected={productTypeAutocomplete.selected}
                            onSelect={productTypeAutocomplete.updateSelection}
                            textField={
                                <Autocomplete.TextField
                                    label="Product Types"
                                    value={productTypeAutocomplete.inputValue}
                                    onChange={productTypeAutocomplete.updateText}
                                    prefix={<Icon source={SearchIcon} />}
                                    placeholder="Search Product Types"
                                    verticalContent={productTypeAutocomplete.verticalContentMarkup}
                                    autoComplete="off"
                                    loading={productTypeLoader}
                                />
                            }
                        />
                    </div>

                    {/* Product Tags Autocomplete */}
                    <div style={{ marginTop: "15px" }}>
                        <Autocomplete
                            loading={productTagLoader}
                            allowMultiple
                            options={productTagsAutocomplete.options}
                            selected={productTagsAutocomplete.selected}
                            onSelect={productTagsAutocomplete.updateSelection}
                            textField={
                                <Autocomplete.TextField
                                    label="Product Tags"
                                    value={productTagsAutocomplete.inputValue}
                                    onChange={productTagsAutocomplete.updateText}
                                    prefix={<Icon source={SearchIcon} />}
                                    placeholder="Search Product Tags"
                                    verticalContent={productTagsAutocomplete.verticalContentMarkup}
                                    autoComplete="off"
                                    loading={productTagLoader}
                                />
                            }
                        />
                    </div>

                    <div style={{ marginTop: "15px" }}>
                        Filter products by price
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <div style={{ width: "50%" }}>
                            <TextField
                                label="Min Price"
                                type="number"
                                value={minPrice}
                                onChange={setMinPrice}
                                autoComplete="off"
                                placeholder="Start price"
                            />
                        </div>
                        <div style={{ width: "50%" }}>
                            <TextField
                                label="Max Price"
                                type="number"
                                value={maxPrice}
                                onChange={setMaxPrice}
                                autoComplete="off"
                                placeholder="End price"
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: "15px" }}>
                        <Checkbox
                            label="Include product variants"
                            checked={isProductWithVariant}
                            onChange={(newValue) => setIsProductWithVariant(newValue)}
                        />
                    </div>
                </Modal.Section>

                <Modal.Section>
                    <div align="right" style={{ display: "flex", gap: "15px", justifyContent: "end" }}>
                        <Button loading={fetchProductLoader} onClick={onClose}>Cancel</Button>
                        <Button loading={fetchProductLoader} onClick={applyFilters} variant="primary">Apply Filters</Button>
                    </div>
                </Modal.Section>
            </Modal>
            {toastMessage && <Toast content={toastMessage} onDismiss={() => setToastMessage(null)} />}
        </>
    );
};

export default ProductFilterModal;