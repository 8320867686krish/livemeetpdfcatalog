import { useState, useEffect } from "react";
import {
    IndexTable,
    LegacyCard,
    Icon,
    Spinner,
    Pagination,
    TextField,
    Button,
    Checkbox,
    Select,
} from "@shopify/polaris";
import TableNoRecord from "./TableNoRecord";
import {
    SearchMinor,
    ChevronDownMinor,
    ChevronUpMinor,
} from "@shopify/polaris-icons";
import {
    fetchMethod,
    getSpecifiedKeyOfValueFromArray,
    formatPrice,
} from "../helper";

const resourceName = {
    singular: "product",
    plural: "products",
};

const ProductList = ({
    shopid = "",
    productLimit = "5",
    selectedResources = [],
    parentStateUpdateByChild,
    collectionId = 0,
    fetchedProduct = "",
}) => {
    const [productList, setProductList] = useState([]);
    const [endCursor, setEndCursor] = useState("");
    const [startCursor, setStartCursor] = useState("");
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [loader, setLoader] = useState(false);
    const [queryValue, setQueryValue] = useState("");
    const [allProduct, setAllProduct] = useState(false);
    const [priceFormate, setPriceFormate] = useState("");
    const [showVariant, setShowVariant] = useState("");
    const [showLimit, setShowLimit] = useState(10);
    const [totalProduct, setTotalProduct] = useState(0);
    const [isProductFetched, setIsProductFetched] = useState(false);

    //Handle search method.
    const handleFiltersQueryChange = (value) => {
        setQueryValue(value);
    };

    //Handle search method.
    const handleSearchProduct = () => {
        // parentStateUpdateByChild('selectedProducts', []);
        getProduct({ query: queryValue, collectionId: collectionId });
    };

    //Handle the search clear method.
    const handleQueryClear = () => {
        // parentStateUpdateByChild('selectedProducts', []);
        setQueryValue("");
        getProduct({ collectionId: collectionId });
    };

    //Get the product list...
    const getProduct = async (curObj = {}) => {
        const {
            currentState = "",
            query = "",
            limit = showLimit,
            collectionId = 0,
        } = curObj;
        setLoader(true);
        const request = {
            startCursor: "",
            endCursor: "",
            query,
            limit,
            collectionId,
        };
        if (currentState === "previous") {
            request.startCursor = startCursor;
        } else if (currentState === "next") {
            request.endCursor = endCursor;
        }

        const responseData = await fetchMethod(
            postMethodType,
            "product/get",
            shopid,
            request
        );
        if (responseData?.data != null) {
            const {
                data: {
                    products = [],
                    startCursor = "",
                    endCursor = "",
                    hasNextPage = false,
                    hasPreviousPage = false,
                } = {},
                priceFormate = "",
            } = responseData;
            const _products =
                currentState === "next"
                    ? [...new Set([...productList, ...products])]
                    : products; //For load more pagination
            // const _products = products; //For pagination..
            let totalProduct = 0;
            _products.map((pItem) => {
                let { variants = [] } = pItem;
                const {
                    [0]: { node: { title: variantsTitle = "" } = {} } = {},
                } = variants;
                totalProduct =
                    totalProduct +
                    (variantsTitle !== "Default Title" ? variants.length : 1);
            });
            setTotalProduct(totalProduct);
            setAllProduct(allProduct);
            setProductList(_products);
            setEndCursor(endCursor);
            setStartCursor(startCursor);
            setHasNextPage(hasNextPage);
            setHasPreviousPage(hasPreviousPage);
            setPriceFormate(priceFormate);
            setLoader(false);
            setIsProductFetched(true);
        }
    };

    //After render get the data from the api
    useEffect(() => {
        //Fetching the all product list...
        if (isProductFetched === false || fetchedProduct === true) {
            clearProductFilter();
            if (collectionId !== 0) {
                getProduct({ collectionId: collectionId }).then(() => {
                    fetchedProduct = false;
                });
            } else {
                getProduct({ collectionId: collectionId }).then(() => {
                    fetchedProduct = false;
                });
            }
        }
    }, [collectionId]);

    //Clear product filter.
    const clearProductFilter = () => {
        setEndCursor("");
        setStartCursor("");
        setHasNextPage(false);
        setHasPreviousPage(false);
        setQueryValue("");
    };

    const handleSelectionChange = (selectedItems) => {
        if (
            selectedItems.compareAtPrice === null ||
            selectedItems.compareAtPrice === ""
        ) {
            selectedItems.compareAtPrice = null;
        }

        const selectedIndex = selectedResources.findIndex(
            (item) => item.id == selectedItems.id
        ); //If selected product is object..
        // const selectedIndex = selectedResources.indexOf(selectedItems);
        if (selectedIndex > -1) {
            selectedResources.splice(selectedIndex, 1);
            // setSelectedResources(selectedResources);
            defaultSelectionChange();
            parentStateUpdateByChild("selectedProducts", selectedResources);
        } else {
            const newSelectedResources = [
                ...new Set([...selectedResources, selectedItems]),
            ];
            // setSelectedResources(newSelectedResources);
            defaultSelectionChange();
            parentStateUpdateByChild("selectedProducts", newSelectedResources);
        }
    };

    //selected all product and return product ids..
    /* const allSelectProduct = () => {
        return getSpecifiedKeyOfValueFromArray(productList, 'id');
    } */

    //Handle to selected checked/uncheck product...
    const handleAllSelectionChange = (checked) => {
        // const _selectedProducts = checked ? allSelectProduct() : [];
        // const _selectedProducts = checked ? Object.assign([], productList) : []; //Without variant...
        const _selectedProducts = [];
        if (checked) {
            let totalProduct = 0;
            productList.map((pItem) => {
                console.log("pItem ",pItem);
                let { variants = [], ...restParam } = pItem;
                const {
                    [0]: { node: { title: variantsTitle = "" } = {} } = {},
                } = variants;
                if (variantsTitle !== "Default Title") {
                    variants.map((vRow) => {
                        const {
                            node: { price, title, image: vImage = {} } = {},
                            node: variantObj = {},
                        } = vRow;
                        const convertPrice = formatPrice(price, priceFormate);
                        let variantImage =
                            vImage ?? pItem.image;
                        if (vImage !== null && vImage?.originalSrc !== "") {
                            variantImage = vImage.originalSrc;
                        }
                        const updateVariantObj = {
                            ...pItem,
                            ...variantObj,
                            ...{
                                image:
                                    vImage !== null
                                        ? vImage.originalSrc
                                        : vImage,
                                orignalPrice: price,
                                price: convertPrice,
                                title: `${pItem?.title} (${title})`,
                            },
                        };
                        delete updateVariantObj.variants;
                        _selectedProducts.push(updateVariantObj);
                        totalProduct++;
                    });
                } else {
                    _selectedProducts.push(restParam);
                    totalProduct++;
                }
            });
            setTotalProduct(totalProduct);
        }

        setAllProduct(checked);
        parentStateUpdateByChild("selectedProducts", _selectedProducts);
    };

    //Checked the check box base on selected products.
    const defaultSelectionChange = () => {
        let _allProduct = false;
        if (
            selectedResources.length > 0 &&
            selectedResources.length === totalProduct
        )
            _allProduct = true;
        else if (selectedResources.length > 0) _allProduct = "indeterminate";

        setAllProduct(_allProduct);
    };

    useEffect(() => {
        defaultSelectionChange();
    }, [selectedResources, productList]);

    const showHideVariants = (id) => {
        setShowVariant(showVariant === id ? "" : id);
    };

    const handleShowLimit = (limit) => {
        setShowLimit(limit);
        getProduct({ query: queryValue, limit, collectionId: collectionId });
    };

    const rowMarkup = productList.map((row) => {
        let {
            id,
            image,
            title: MainProdTitle = "",
            price,
            compareAtPrice,
            variants = [],
        } = row;
        console.log("row", row);
        const {
            [0]: {
                node: {
                    title: variantsTitle = "",
                    compareAtPrice: variantCompareAtPrice = "",
                } = {},
            } = {},
        } = variants;

        const selectedRow = selectedResources.some((item) => item.id == id); // If selected product is object..
        image = image !== "" ? image : `${IMAGE_PREFIX}images/no_image.png`;

        return (
            <>
                <IndexTable.Row id={id} key={id} selected={selectedRow}>
                    <IndexTable.Cell>
                        {variants.length > 0 &&
                        variantsTitle !== "Default Title" ? (
                            <span
                                className="variant_icon"
                                onClick={() => showHideVariants(id)}
                            >
                                <Icon
                                    source={
                                        showVariant === id
                                            ? ChevronUpMinor
                                            : ChevronDownMinor
                                    }
                                    color="base"
                                />
                            </span>
                        ) : (
                            <Checkbox
                                checked={selectedRow}
                                disabled={productLimit === "false"}
                                onChange={
                                    productLimit === "false"
                                        ? () => {}
                                        : () => handleSelectionChange(row)
                                }
                            />
                        )}
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <div className="image_area">
                            <img
                                src={image}
                                alt="Product"
                                width="38"
                                height="38"
                            />
                        </div>
                    </IndexTable.Cell>
                    <IndexTable.Cell>{MainProdTitle}</IndexTable.Cell>
                    <IndexTable.Cell>
                        {variantsTitle !== "Default Title" ? "" : price}
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        {compareAtPrice !== "" ? compareAtPrice : ""}
                    </IndexTable.Cell>
                </IndexTable.Row>
                {variantsTitle !== "Default Title" && variants.length > 0 && (
                    <tr
                        key={`variant_${id}`}
                        style={{
                            display: showVariant === id ? "table-row" : "none",
                        }}
                    >
                        <td colSpan="5" style={{ padding: 0 }}>
                            <table
                                className="Polaris-IndexTable__Table tbl_variants"
                                style={{ width: "100%" }}
                            >
                                <tbody>
                                    {variants.map((vRow) => {
                                        const {
                                            node: {
                                                id,
                                                title,
                                                price,
                                                compareAtPrice:
                                                    variantCompareAtPrice,
                                                image: vImage = {},
                                            } = {},
                                            node: variantObj = {},
                                        } = vRow;

                                        const selectedVariantRow =
                                            selectedResources.some(
                                                (item) => item.id == id
                                            ); // If selected variant
                                        const convertPrice = formatPrice(
                                            price,
                                            priceFormate
                                        );
                                        const convertCompareAtPrice =
                                            variantCompareAtPrice
                                                ? formatPrice(
                                                      variantCompareAtPrice,
                                                      priceFormate
                                                  )
                                                : null;
                                        let variantImage =
                                            vImage ??
                                            image ??  `${IMAGE_PREFIX}images/no_image.png` ;
                                        if (
                                            vImage !== null &&
                                            vImage?.originalSrc !== ""
                                        ) {
                                            variantImage = vImage.originalSrc;
                                        }

                                        const updateVariantObj = {
                                            ...row,
                                            ...variantObj,
                                            ...{
                                                image: vImage
                                                    ? vImage.originalSrc
                                                    : vImage,
                                                orignalPrice: price,
                                                price: convertPrice,
                                                compareAtPrice:
                                                    convertCompareAtPrice, // Set compareAtPrice for variants
                                                title: `${MainProdTitle} (${title})`,
                                            },
                                        };
                                        delete updateVariantObj.variants;

                                        return (
                                            <IndexTable.Row
                                                id={`variant_${id}`}
                                                key={`variant_key_${id}`}
                                                selected={selectedVariantRow}
                                            >
                                                <IndexTable.Cell>
                                                    <Checkbox
                                                        checked={
                                                            selectedVariantRow
                                                        }
                                                        disabled={
                                                            productLimit ===
                                                            "false"
                                                        }
                                                        onChange={
                                                            productLimit ===
                                                            "false"
                                                                ? () => {}
                                                                : () =>
                                                                      handleSelectionChange(
                                                                          updateVariantObj
                                                                      )
                                                        }
                                                    />
                                                </IndexTable.Cell>
                                                <IndexTable.Cell>
                                                    <div className="image_area">
                                                        <img
                                                            src={variantImage}
                                                            alt="Variant"
                                                            width="38"
                                                            height="38"
                                                        />
                                                    </div>
                                                </IndexTable.Cell>
                                                <IndexTable.Cell>{`${MainProdTitle} (${title})`}</IndexTable.Cell>
                                                <IndexTable.Cell>
                                                    {convertPrice}
                                                </IndexTable.Cell>
                                                <IndexTable.Cell>
                                                    {convertCompareAtPrice}
                                                </IndexTable.Cell>
                                            </IndexTable.Row>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )}
            </>
        );
    });

    return (
        <LegacyCard>
            <div className="table_area">
                {loader && (
                    <Spinner
                        accessibilityLabel="Spinner example"
                        size="large"
                    />
                )}
                {/* {productList.length > 0 && ( */}
                    <div className="search_area">
                        <TextField
                            type="text"
                            value={queryValue}
                            onChange={handleFiltersQueryChange}
                            prefix={<Icon source={SearchMinor} color="base" />}
                            clearButton
                            onClearButtonClick={handleQueryClear}
                            name="queryValue"
                            placeholder="Search by name"
                            connectedRight={
                                <Button
                                    variant="primary"
                                    onClick={handleSearchProduct}
                                >
                                    Search
                                </Button>
                            }
                        />
                    </div>
                {/* )} */}
                <IndexTable
                    selectable={false}
                    selectedItems={selectedResources}
                    items={productList}
                    resourceName={resourceName}
                    itemCount={productList.length}
                    emptyState={
                        <TableNoRecord
                            emptyProps={{
                                heading: "No products yet",
                                message:
                                    "It looks like you do not have any products.",
                                image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
                            }}
                        />
                    }
                    headings={[
                        {
                            title: (
                                <Checkbox
                                    checked={allProduct}
                                    disabled={productLimit === "false"}
                                    onChange={
                                        productLimit === "false"
                                            ? () => {}
                                            : handleAllSelectionChange
                                    }
                                />
                            ),
                        },
                        { title: "Image" },
                        { title: "Product Name" },
                        { title: "Product Price" },
                        { title: "Compare Price" },
                    ]}
                >
                    {rowMarkup}
                </IndexTable>
                {productList.length > 0 && (
                    <>
                        {/* <div className="pagination_area">
                            <div className="page_limit">
                                <Select
                                    label="Show"
                                    options={[{ label: '10', value: "10" },
                                    { label: '25', value: "25" },
                                    { label: '50', value: "50" },]}
                                    onChange={(e) => handleShowLimit(e)}
                                    value={showLimit}
                                />
                            </div>
                            <Pagination
                                hasPrevious={hasPreviousPage}
                                onPrevious={() => getProduct({ currentState: "previous", query: queryValue })}
                                hasNext={hasNextPage}
                                onNext={() => getProduct({ currentState: "next", query: queryValue })}
                            />
                        </div> */}
                        {hasNextPage && (
                            <div className="show_more">
                                <Button
                                    variant="plain"
                                    onClick={() =>
                                        getProduct({
                                            currentState: "next",
                                            query: queryValue,
                                            collectionId: collectionId,
                                        })
                                    }
                                >
                                    Show more products
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </LegacyCard>
    );
};

export default ProductList;
