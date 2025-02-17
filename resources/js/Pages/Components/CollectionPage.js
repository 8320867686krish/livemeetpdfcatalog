import { useState, useEffect, useCallback } from 'react';
import {
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Icon,
    Spinner,
    Pagination,
    TextField,
    Button,
    Checkbox,
    Grid,
    FormLayout,
    Select,
    Divider,
    Text
} from '@shopify/polaris';
import TableNoRecord from './TableNoRecord';
import { ImageMajor, SearchMinor } from '@shopify/polaris-icons';
import { fetchMethod, convertArrToStr } from '../helper';

const resourceName = {
    singular: 'product',
    plural: 'products',
};

const CollectionPage = ({ shopid = '', collectionId = '', selectedProducts = [], parentStateUpdateByChild }) => {
    // const { shopid = '', collectionId = '', parentStateUpdateByChild } = props;
    // const [collectionId, setCollectionId] = useState(_collectionId);
    const [collectionLoader, setCollectionLoader] = useState(false);
    const [collectionList, setCollectionList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [endCursor, setEndCursor] = useState('');
    const [startCursor, setStartCursor] = useState('');
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [loader, setLoader] = useState(false);
    const [queryValue, setQueryValue] = useState('');
    const [selectedResources, setSelectedResources] = useState(selectedProducts);
    // const [selectedAllResources, setSelectedAllResources] = useState([]);

    //Handle search method.
    const handleFiltersQueryChange = (value) => {
        setQueryValue(value);
    };


    //Handle search method.
    const handleSearchProduct = (value) => {
        getProduct();
    };

    const handleQueryClear = () => {
        setQueryValue('');
        getProduct();
    };

    const handleConfigData = (value, field) => {
        parentStateUpdateByChild(field, value);
    }

    //Get the product list...
    const getProduct = async (currentState = '') => {
        setLoader(true);
        const request = { collectionId, startCursor: '', endCursor: '', query: queryValue }
        if (currentState === 'previous') {
            request.startCursor = startCursor;
        } else if (currentState === 'next') {
            request.endCursor = endCursor;
        }

        const responseData = await fetchMethod(postMethodType, 'product/get', shopid, request);
        if (responseData?.data != null) {
            const { data: { products = [], startCursor = '', endCursor = '', hasNextPage = false, hasPreviousPage = false } = {} } = responseData;
            // console.log('product  list :', products);
            setSelectedResources([]);
            setProductList(products);
            setEndCursor(endCursor);
            setStartCursor(startCursor);
            setHasNextPage(hasNextPage);
            setHasPreviousPage(hasPreviousPage);
            setLoader(false);
        }
    }

    //Get collection list from the api..
    useEffect(() => {
        //Fetching the collection list...
        const fetchCollectionData = async () => {
            setCollectionLoader(true);
            const responseData = await fetchMethod(getMethodType, 'collections/get', shopid);
            const { data: { collections = [] } = {} } = responseData;
            collections.unshift({ label: '', value: '' });
            setCollectionList(collections);
            setCollectionLoader(false);
        }

        if (collectionId === '') {
            fetchCollectionData();
        }
    }, [collectionId])

    //After render get the data from the api
    useEffect(() => {
        //Fetching the collection list...
        if (collectionId !== '') {
            clearProductFilter();
            getProduct()
        }
    }, [collectionId])


    //Clear product filter.
    const clearProductFilter = () => {
        setEndCursor("");
        setStartCursor("");
        setHasNextPage(false);
        setHasPreviousPage(false);
        setQueryValue("");
    }

    const handleSelectionChange = (selectedItems) => {
        const selectedIndex = selectedResources.findIndex(item => item.id == selectedItems.id);
        if (selectedIndex > -1) {
            selectedResources.splice(selectedIndex, 1);
            setSelectedResources(selectedResources);
            parentStateUpdateByChild('selectedProducts', selectedResources);
        } else {
            const newSelectedResources = [...new Set([...selectedResources, selectedItems])];
            setSelectedResources(newSelectedResources);
            parentStateUpdateByChild('selectedProducts', newSelectedResources);
        }
    };

    // const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(productList);

    const rowMarkup = productList.map((row, index) => {
        const { id, image, title } = row;
        const selectedRow = selectedResources.some(item => item.id == id);
        return (
            <IndexTable.Row id={id} key={id} selected={selectedRow}>
                <IndexTable.Cell>
                    <Checkbox
                        checked={selectedRow}
                        onChange={() => handleSelectionChange(row)}
                    />
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <div className="image_area">
                        {
                            image !== ''
                                ? <img src={image} alt="Collection" width="38" height="38" />
                                : <Icon source={ImageMajor} tone="base" />
                        }
                    </div>
                </IndexTable.Cell>
                <IndexTable.Cell>{title}</IndexTable.Cell>
            </IndexTable.Row>
        )
    }
    );

    console.log('collectionpage :', shopid, collectionId, typeof collectionId, selectedResources)


    return (
        <Grid>
            <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                <FormLayout>
                    <div className="collection_list_area">
                        <Select
                            label="Collections"
                            // helpText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            name="collectionId"
                            options={collectionList}
                            onChange={(e) => handleConfigData(e, 'collectionId')}
                            value={collectionId}
                            disabled={collectionLoader}
                        />
                        {collectionLoader && <Spinner accessibilityLabel="Small spinner example" size="small" />}
                        {/* <Button><Icon source={RefreshMinor} tone="base" /></Button> */}
                    </div>
                </FormLayout>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Divider />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <div className="mb_10">
                    <Text variant="headingSm" as="h2">
                        Product List
                    </Text>
                </div>
                <div className="table_area">
                    {loader && <Spinner accessibilityLabel="Spinner example" size="large" />}
                    {(!loader && productList.length > 0) && <div className="search_area">
                        <TextField
                            type="text"
                            value={queryValue}
                            onChange={handleFiltersQueryChange}
                            prefix={<Icon source={SearchMinor} color="base" />}
                            clearButton
                            onClearButtonClick={handleQueryClear}
                            name="queryValue"
                            placeholder="Search by title"
                            connectedRight={<Button variant="primary" onClick={handleSearchProduct}>Search</Button>}
                        />
                    </div>}
                    <IndexTable
                        selectable={false}
                        selectedItems={selectedResources}
                        items={productList}
                        resourceName={resourceName}
                        itemCount={productList.length}
                        // selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                        onSelectionChange={handleSelectionChange}
                        emptyState={<TableNoRecord
                            emptyProps={{
                                heading: "No products yet",
                                message: "Please select the collections.",
                                image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                            }}
                        />}
                        headings={[
                            // { title: <Checkbox checked={true} onChange={handleAllSelectionChange} /> },
                            { title: '' },
                            { title: 'Image' },
                            { title: 'Product Name' }
                        ]}
                    >
                        {rowMarkup}
                    </IndexTable>
                    {(!loader && productList.length > 0) &&
                        <div className="pagination_area">
                            <Pagination
                                hasPrevious={hasPreviousPage}
                                onPrevious={() => getProduct("previous")}
                                hasNext={hasNextPage}
                                onNext={() => getProduct("next")}
                            />
                        </div>
                    }
                </div>
            </Grid.Cell>
        </Grid>
    );
}

export default CollectionPage;