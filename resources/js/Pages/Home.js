import React, { useState, useEffect, Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Page,
    Button,
    Text,
    Badge,
    IndexTable,
    useIndexResourceState,
    LegacyCard,
    Spinner,
    Toast,
    Banner,
    Card,
    InlineGrid,
    Grid,
    MediaCard,
    SkeletonDisplayText, SkeletonBodyText,
    SkeletonThumbnail
} from "@shopify/polaris";
import { FileMinor, ThemesMajor } from "@shopify/polaris-icons";
import TableNoRecord from "./Components/TableNoRecord";
import { fetchMethod } from "./helper";

const resourceName = {
    singular: "catalog",
    plural: "catalogs",
};

const Home = (props = {}) => {
    const {
        shopid = "",
        activePlan: { catelog_limit = "2", planExpired = false } = {},
    } = props;
    const storeName = localStorage.getItem("domain");
    const [loader, setLoader] = useState(true);
    const [catalogList, setCatalogList] = useState([]);
    const [themeUrl, setThemeUrl] = useState("");
    const [activeToastError, setActiveToastError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [activeToastSuccess, setActiveToastSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [activeBannerSuccess, setActiveBannerSuccess] = useState(false);
    const [successBannerMessage, setSuccessBannerMessage] = useState("");
    const [activeBannerWarning, setActiveBannerWarning] = useState(false);
    const [warningBannerMessage, setWarningBannerMessage] = useState("");
    const [bannerErrorMessage, setBannerErrorMessage] = useState("Upgrade your plan to create more catelogs");
    const [activeBannerError, setActiveBannerError] = useState(false);
    const [data, setData] = useState(null);
    const [ctaImage, setCtaImage] = useState()
    const [ctaLink, setCtaLink] = useState()
    const [loading, setLoading] = useState(true)
    const [dashboardLoader, setDashboardLoader] = useState(false);
    const [isExtensionActive, setIsExtensionActive] = useState("");

    const location = useLocation();
    console.log("location :", location);

    // const { selectedResources, setSelectedResources } = useIndexResourceState();

    const navigate = useNavigate();

    //Toast error message component.
    const toastError = activeToastError ? (
        <Toast
            content={errorMessage}
            error
            duration={3000}
            onDismiss={() => setActiveToastError(false)}
        />
    ) : null;

    //Toast success message component.
    const toastSaveData = activeToastSuccess ? (
        <Toast
            content={successMessage}
            duration={3000}
            onDismiss={() => setActiveToastSuccess(false)}
        />
    ) : null;

    //Banner error message component.
    const bannerSuccess = activeBannerSuccess ? (
        <div className="banner_area">
            <Banner
                title="Your plan has been updates."
                onDismiss={() => setActiveBannerSuccess(false)}
                tone="success"
            >
                <p>{successBannerMessage}</p>
            </Banner>
        </div>
    ) : null;

    //Banner error message component.
    const bannerWarning = activeBannerWarning ? (
        <div className="banner_area">
            <Banner
                title="Plan has expired."
                action={{
                    content: "Upgrade Plan",
                    onAction: () => navigate(`${URL_PREFIX}plans`),
                }}
                tone="warning"
            >
                <p>{warningBannerMessage}</p>
            </Banner>
        </div>
    ) : null;

    const bannerError = activeBannerError ? (
        <div className="banner_area">
            <Banner
                title="Plan limit has been reached."
                action={{
                    content: "Upgrade Plan",
                    onAction: () => navigate(`${URL_PREFIX}plans`),
                }}
                tone="critical"
            >
                <p>{bannerErrorMessage}</p>
            </Banner>
        </div>
    ) : null;

    const bannerTimeout = (duration = 3000) => {
        setTimeout(() => {
            setActiveBannerSuccess(false);
        }, duration);
    };

    //Call the catalog collection list..
    const getCatalogCollections = async () => {
        const responseData = await fetchMethod(
            "GET",
            "pdfCollections/get",
            shopid
        );
        const {
            responseCode = "",
            errorCode = 0,
            isPayment = false,
            message = "",
            theam_setting_url = "",
            data: { pdfCollections = [] } = {},
        } = responseData;
        // if (responseCode === 0 && errorCode === 101) {
        setActiveBannerWarning(responseCode === 0 && errorCode === 101);
        setWarningBannerMessage(message); //Important: Your current plan has expired. Please upgrade your plan.
        // } else {
        //     setActiveBannerWarning(false);
        // }
        if (isPayment && message !== "") {
            setActiveBannerSuccess(true);
            setSuccessBannerMessage(message);
            bannerTimeout();
        }
        setThemeUrl(theam_setting_url);
        setCatalogList(pdfCollections);
        setLoader(false);
    };

    useEffect(() => {
        getCatalogCollections();
    }, []);

    useEffect(() => {
        if (catalogList.length >= Number(catelog_limit) ||
            catelog_limit === "false") {

            // setActiveBannerWarning(true)
            setActiveBannerError(true)
        }
        else {
            setActiveBannerError(false)
        }
    }, [catalogList])

    //Handle to delete catalog for selected records.
    const deleteSelectedRecord = async () => {
        setLoader(true);
        const request = { Ids: selectedResources };
        const responseData = await fetchMethod(
            "POST",
            "collections/remove",
            shopid,
            request
        );
        const { responseCode = "", message = "" } = responseData;
        if (responseCode === 0) {
            setErrorMessage(message);
            setActiveToastError(true);
        } else {
            getCatalogCollections();
            setSuccessMessage(message);
            setActiveToastSuccess(true);
            clearSelection();
        }
        setLoader(false);
    };

    //Handle to Enabled/Disabled catalog for selected records.
    const enabledDisabledCatalog = async (status) => {
        setLoader(true);
        const request = { Ids: selectedResources, status };
        const responseData = await fetchMethod(
            "POST",
            "collections/status",
            shopid,
            request
        );
        const { responseCode = "", message = "" } = responseData;
        if (responseCode === 0) {
            setErrorMessage(error);
            setActiveToastError(true);
        } else {
            getCatalogCollections();
            setSuccessMessage(message);
            setActiveToastSuccess(true);
            clearSelection();
        }
        setLoader(false);
    };

    //Bulk action define for index table...
    const promotedBulkActions = [
        {
            content: "Enable Catalog",
            onAction: () => enabledDisabledCatalog(1),
        },
        {
            content: "Disable Catalog",
            onAction: () => enabledDisabledCatalog(0),
        },
        {
            content: "Delete Catalog",
            onAction: () => deleteSelectedRecord(),
        },
    ];

    //See the PDF preview in new tab...
    const previewPDF = (e, pdfUrl, user) => {
        let pdUrl = pdfUrl;
        e.stopPropagation();
        if (location.state && location.state.flipBack) {
            pdUrl = location.state.responseFlipPdfGenrate;
        }
        if (user === "old") {
            window.open(`${pdUrl}`, "_blank");
        } else {
            window.open(`${URL_PREFIX}flipBook/${pdUrl}`, "_blank");
        }
        // window.open(`/flipBook/${pdUrl}`, '_blank');
        // navigate("/pdf-preview" , { state : { "pdfUrl" : pdUrl}});
    };

    //Download the PDF file....
    const downloadPDF = (e, pdfUrl) => {
        // alert(pdfUrl);
        e.stopPropagation();
        var link = document.createElement("a");
        link.href = pdfUrl;
        link.download = pdfUrl.split("/").pop() ?? "file.pdf";
        link.dispatchEvent(new MouseEvent("click"));
    };

    const {
        selectedResources,
        allResourcesSelected,
        handleSelectionChange,
        clearSelection,
    } = useIndexResourceState(catalogList);

    //Define the row html for index table.........
    var rIndex = 1;
    const rowMarkup = catalogList.map((row, index) => {
        let { id, shop_id, enabled, pdfUrl, collectionName, catalog_name, flipId } = row;
        pdfUrl =
            pdfUrl !== ""
                ? `${IMAGE_PREFIX}uploads/pdfFile/shop_${shop_id}/collections_${catalog_name}/${pdfUrl}`
                : "";
        console.log("row flip id : ", flipId);
        // const selectedRow = selectedResources.some(item => item.id == id); //If selected product is object..
        const selectedRow = selectedResources.includes(id);
        return (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedRow}
                disabled={
                    index >= Number(catelog_limit) || catelog_limit === "false"
                }
            >
                <IndexTable.Cell>{rIndex++}</IndexTable.Cell>
                <IndexTable.Cell>{catalog_name || "Untitled catalogs"}</IndexTable.Cell>
                <IndexTable.Cell>
                    {enabled ? (
                        <Badge tone="success">Enabled</Badge>
                    ) : (
                        <Badge tone="critical">Disabled</Badge>
                    )}
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <div className="btn_area">
                        {!(
                            index >= Number(catelog_limit) ||
                            catelog_limit === "false"
                        ) && (
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        // navigate(
                                        //     `${URL_PREFIX}dashboard?id=${id}`,
                                        //     { state: { planExpired } }
                                        // )
                                        navigate(
                                            `${URL_PREFIX}add-product?id=${id}`,
                                            { state: { planExpired } }
                                        )
                                    }
                                >
                                    Edit
                                </Button>
                            )}
                        {/* <Button variant="primary" onClick={() => navigate(`${URL_PREFIX}pdf-preview-flip`, { state: { pdfUrl } })}>Flip Preview</Button> */}
                        {flipId && flipId !== null ? (
                            <>
                                <Button
                                    tone="success"
                                    variant="primary"
                                    onClick={(e) =>
                                        previewPDF(e, flipId, "new")
                                    }
                                >
                                    PDF Preview
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    tone="success"
                                    variant="primary"
                                    onClick={(e) =>
                                        previewPDF(e, pdfUrl, "old")
                                    }
                                >
                                    PDF Preview
                                </Button>
                            </>
                        )}
                        <Button onClick={(e) => downloadPDF(e, pdfUrl)}>
                            Download PDF
                        </Button>
                    </div>
                </IndexTable.Cell>
            </IndexTable.Row>
        );
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.meetanshi.com/shopify/related-apps.php?id=3');
                setData(response?.data?.apps);
                setCtaImage(response?.data?.cta_image);
                setCtaLink(response?.data?.cta_link);
                setLoading(false)

            } catch (error) {
                console.error('Response error:', error);
            }
            finally {
            }
        };
        fetchData()
    }, []);

    return (<>
        <Page
            fullWidth
            title="Dashboard"
            subtitle="Manage the available PDF Product catalogs or create new ones."
            primaryAction={
                <Button
                    variant="primary"
                    size="large"
                    disabled={
                        catalogList.length >= Number(catelog_limit) ||
                        catelog_limit === "false" /* || planExpired */
                    }
                    onClick={
                        catalogList.length >= Number(catelog_limit) ||
                            catelog_limit === "false" /* || planExpired */
                            ? () => { }
                            : () =>
                                navigate(`${URL_PREFIX}add-product`, {
                                    state: {
                                        planExpired,
                                        totalCatelog: catalogList.length,
                                    },
                                })
                    }
                >
                    Create a New Catalog
                </Button>
            }
            secondaryActions={[
                {
                    content: "Theme Setting",
                    external: true,
                    icon: ThemesMajor,
                    disabled: themeUrl != "" ? false : true,
                    url: themeUrl,
                },
                {
                    content: "User Guide",
                    icon: FileMinor,
                    external: true,
                    url: "https://helpdesk.meetanshi.com/284038-PDF-Product-Catalog",
                },
            ]}
        >
            {toastError}
            {toastSaveData}
            {bannerSuccess}
            {bannerWarning}
            {bannerError}
            <div className="mb_10">
                <Text variant="headingLg" as="h5">
                    Created Catalogs
                </Text>
            </div>
            <LegacyCard>
                <div className="table_area">
                    {loader ?
                        <Card>
                            <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                                <SkeletonBodyText />
                            </div>
                            <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                                <SkeletonBodyText />
                            </div>
                            <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                                <SkeletonBodyText />
                            </div>
                        </Card>
                        : <IndexTable
                            // selectable={false}
                            items={catalogList}
                            resourceName={resourceName}
                            itemCount={catalogList.length}
                            promotedBulkActions={promotedBulkActions}
                            selectedItemsCount={
                                allResourcesSelected
                                    ? "All"
                                    : selectedResources.length
                            }
                            onSelectionChange={handleSelectionChange}
                            emptyState={
                                <TableNoRecord
                                    emptyProps={{
                                        heading: "Manage Product Catalogs",
                                        message:
                                            "Create a new product catalog to get started!",
                                        // action: { content: 'Create New Catalog', url: 'dashboard' },
                                        image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
                                    }}
                                />
                            }
                            headings={[
                                { title: "Sr No." },
                                { title: "Catalogs name" },
                                { title: "Status" },
                                { title: "Actions" },
                            ]}
                        >
                            {rowMarkup}
                        </IndexTable>
                    }



                </div>
            </LegacyCard>
        </Page>
        <Page>
            <div className='apps' style={{ display: "flex", gap: "10px" }}>
                <div className='appLeft'>
                    <Card style={{ height: "100%" }}>
                        <div style={{ marginBottom: "15px" }}>
                            {loading ? <>
                                <Text variant="headingLg" as="h5">
                                    <SkeletonDisplayText size="small" />
                                </Text>
                            </>
                                :
                                <>
                                    <Text variant="headingLg" as="h5">
                                        Suggested  apps for {storeName}
                                    </Text></>
                            }
                        </div>
                        <InlineGrid gap="400" columns={2}>
                            {data?.map((app) => (
                                <Card key={app.id}>
                                    {loading ? <>
                                        <SkeletonBodyText lines={5} />
                                    </>
                                        :
                                        <>
                                            <div>
                                                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                                    <img
                                                        src={app.image}
                                                        alt={app.title}
                                                        style={{ borderRadius: "10px", height: "50px", widows: "50px" }}
                                                    />
                                                    <Text variant="headingMd" as="h6">
                                                        {app.title}
                                                    </Text>
                                                </div>
                                                <div style={{ marginTop: "10px", }}>
                                                    <Text variant="bodyLg" as="p">
                                                        {app.subtitle}
                                                    </Text>
                                                </div>
                                                <div style={{ marginTop: "10px" }}>
                                                    <Button
                                                        variant="plain"
                                                        onClick={() => window.open(app.link, "_blank")}
                                                    >
                                                        Get app
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    }

                                </Card>
                            ))}
                        </InlineGrid>
                    </Card>
                </div>
                <div
                    className='appRight'

                    onClick={() => {
                        if (ctaLink) {
                            window.open(ctaLink, "_blank");
                        }
                    }}
                >
                    <img
                        src={ctaImage}
                        alt="Recommended apps box"
                        style={{
                        }}
                    />
                </div>
            </div>

            <div style={{
                marginTop: "2%",
                marginBottom: "20px",
            }}>
                <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                        <div style={{ maxHeight: "30%" }}>
                            <MediaCard
                                title="User Guild"
                                primaryAction={{
                                    content: 'user Guide',
                                    onAction: () => { },
                                }}
                                description={
                                    <div >
                                        In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.

                                    </div>
                                }
                            >
                                <img src={`${IMAGE_PREFIX}images/user_guide.png`} alt="Fake Image"
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </MediaCard>
                        </div>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                        <MediaCard
                            title="Theme installation"
                            primaryAction={{
                                loading: dashboardLoader,
                                content: 'Manage installation',
                                onAction: () => {
                                    window.open(
                                        themeUrl
                                    )
                                },
                            }}
                            description={
                                <>
                                    You currently do not have Meteor installed on your live StoreFront. <br />
                                    <div style={{ marginTop: "3%" }}>
                                        {!isExtensionActive ? <Badge tone="success">Active</Badge> : <Badge tone="critical">Inactive</Badge>}
                                    </div>
                                </>
                            }
                        >
                            <img
                                src={`${IMAGE_PREFIX}images/extension.png`}
                                alt="Fake Image"
                                style={{ height: "100%", width: "100%" }}
                            />
                        </MediaCard>
                    </Grid.Cell>
                </Grid>
            </div>
        </Page>
    </>
    );
};

export default Home;
