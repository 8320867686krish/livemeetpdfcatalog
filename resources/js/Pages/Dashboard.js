import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2PDF from "jspdf-html2canvas";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Parser from "html-react-parser";
import html2pdf from "html2pdf.js";
import { encode, decode } from "uint8-to-base64";
import { PDFDocument } from "pdf-lib";
import {
    Page,
    Tabs,
    Layout,
    Grid,
    FormLayout,
    Box,
    LegacyCard,
    Select,
    Divider,
    DropZone,
    LegacyStack,
    Thumbnail,
    TextField,
    ChoiceList,
    Scrollable,
    Text,
    Spinner,
    Button,
    Toast,
    ButtonGroup,
    Icon,
    Banner,
} from "@shopify/polaris";
const ProductList = lazy(() => import("./Components/ProductList"));
const PDFPreview = lazy(() => import("./Components/PDFPreview"));
import CustomColorInput from "./Components/CustomColorInput";
import OneItemGrid from "./Components/PageLayout/OneItemGrid";
import TwoItemGrid from "./Components/PageLayout/TwoItemGrid";
import ThreeItemGrid from "./Components/PageLayout/ThreeItemGrid";
import ThreeItemGridReverse from "./Components/PageLayout/ThreeItemGridReverse";
import FourItemGrid from "./Components/PageLayout/FourItemGrid";
import FiveItemGrid from "./Components/PageLayout/FiveItemGrid";
import SixItemGrid from "./Components/PageLayout/SixItemGrid";
// import SixItemList from './Components/PageLayout/SixItemList';
// import EightItemGrid from './Components/PageLayout/EightItemGrid';
// import TenItemGrid from './Components/PageLayout/TenItemGrid';
import ThreeItemList from "./Components/PageLayout/ThreeItemList";
import ThreeItemLeftList from "./Components/PageLayout/ThreeItemLeftList";
import ThreeItemRightList from "./Components/PageLayout/ThreeItemRightList";
import FourItemList from "./Components/PageLayout/FourItemList";
import FourItemLeftList from "./Components/PageLayout/FourItemLeftList";
import FourItemRightList from "./Components/PageLayout/FourItemRightList";
import FiveItemList from "./Components/PageLayout/FiveItemList";
import TwoItemList from "./Components/PageLayout/TwoItemList";
import TwoItemLeftList from "./Components/PageLayout/TwoItemLeftList";
import TwoItemRightList from "./Components/PageLayout/TwoItemRightList";
import imageCompression from "browser-image-compression";
import {
    NoteMinor,
    RefreshMinor,
    MobileCancelMajor,
} from "@shopify/polaris-icons";
import {
    optionsFontFamily,
    optionsGeneralAlignment,
    optionsYesNo,
    optionsEnabledDisabled,
    optionsDateFormat,
    optionsPDFLayout,
    optionsPaperLayout,
    getProductAttribute,
    optionsProductAttributeAlignment,
    optionsPriceAdjustment,
    validImageTypes,
    convertStrToArr,
    convertArrToStr,
    getCurrentPDFPageSize,
    fetchMethod,
    autoPDFSize,
} from "./helper";
import axios from "axios";
const tabs = [
    {
        id: "general-settings",
        content: "General Settings",
        panelID: "general-settings-content",
    },
    {
        id: "select-collection",
        content: "Select Collection",
        panelID: "select-collection-content",
    },
    /* {
        id: 'product-layout',
        content: 'Product Layout',
        panelID: 'product-layout-content',
    }, */
    {
        id: "pdf-preview",
        content: "PDF Preview",
        panelID: "pdf-preview-content",
    },
];

const pdfHeight = {
    letter: 1250, //1200
    legal: 1575, //1550
    a3: 1350,
    a4: 1350,
    a5: 1350, //1300
};

const defaultFontColor = "#000000";
const defaultBackgroundColor = "#FFFFFF";

//Initial State object define and declare.
const initConfigData = {
    id: 0,
    enabled: 1,
    fontFamily: "Roboto Condensed",
    fontColor: defaultFontColor,
    backgroundColor: defaultBackgroundColor,
    logo: "",
    frontImage: "",
    backImage: "",
    headerText: "",
    headerAlignment: "center",
    footerText: "",
    footerAlignment: "left",
    footerPageNoEnabled: "0",
    footerDateEnabled: "0",
    footerDateFormat: "dd/MM/yy",
    pdfLayout: "portrait",
    paperLayout: "a4",
    productAttributes: "name,price",
    productButtonEnabled: "0",
    productAttributeAlignment: "center",
    productDescriptionCharLimit: "50",
    productAttributeLabelColor: defaultFontColor,
    productAttributeValueColor: defaultFontColor,
    productBackgroundColor: defaultBackgroundColor,
    priceAdjustment: "",
    productChangeInPercentage: "",
    productTaxPercentage: "",
    productPageLayoutId: "sixItemGrid",
    collectionId: "",
    collectionName: "",
    selectedProducts: [],
};

//Function component start.
const Dashboard = (props = {}) => {
    const { shopid = "", activePlan = {} } = props;
    console.log("shopid from dashboard ", shopid);
    const location = useLocation();
    const navigate = useNavigate();
    //Initialize and declare state
    const [configData, setConfigData] = useState(initConfigData);
    const [loader, setLoader] = useState(false);
    const [tabSelected, setTabSelected] = useState(0);
    const [collectionList, setCollectionList] = useState([]);
    const [collectionLoader, setCollectionLoader] = useState(true);
    const [fileLogo, setFileLogo] = useState([]);
    const [fileFrontImage, setFileFrontImage] = useState([]);
    const [fileBackImage, setFileBackImage] = useState([]);
    const [btnSpinner, setBtnSpinner] = useState(false);
    const [activeToastError, setActiveToastError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [activeToastSuccess, setActiveToastSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [activeBannerError, setActiveBannerError] = useState(false);
    const [errorBannerMessage, setErrorBannerMessage] = useState();

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
    const toastSuccess = activeToastSuccess ? (
        <Toast
            content={successMessage}
            duration={3000}
            onDismiss={() => setActiveToastSuccess(false)}
        />
    ) : null;

    //Banner error message component.
    const bannerError = activeBannerError ? (
        <div className="banner_area">
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
    ) : null;

    const bannerTimeout = (duration = 3000) => {
        setTimeout(() => {
            setActiveBannerError(false);
        }, duration);
    };

    //Update state from the child component.
    const updateStateByChild = (key, value) => {
        setConfigData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    //Check selected product length with catalog product limit with current plan.
    useEffect(() => {
        let { activePlan: { catelog_product_limit = "5", name = "" } = {} } =
            props;
        if (
            configData?.selectedProducts !== undefined &&
            configData?.selectedProducts.length > Number(catelog_product_limit)
        ) {
            setActiveBannerError(true);
            setErrorBannerMessage(
                `Product limit reached! Your current plan allows up to ${catelog_product_limit} products per catalog.Please upgrade your plan to increase the limit.`
            );
            bannerTimeout();
        } else {
            setActiveBannerError(false);
            setErrorBannerMessage();
        }
    }, [configData.selectedProducts]);

    //Handle tab change event.
    const handleTabChange = useCallback(
        (selectedTabIndex) => {
            //If Product not selected then PDF layout tab is not open.
            const { selectedProducts = [], collectionId = "" } = configData;
            if (
                selectedTabIndex === 2 &&
                (selectedProducts.length === 0 || collectionId === "")
            ) {
                setErrorMessage(
                    "Please select a collection and at least one product!"
                );
                setActiveToastError(true);
            } else {
                setTabSelected(selectedTabIndex);
            }
        },
        [configData]
    );

    //Handle save button event.
    const handleClick = async (e) => {
        e.preventDefault();
        setLoader(true);
        setBtnSpinner(true);
        const locationState = location?.state ?? {};
        const { totalCatelog = 0 } = locationState;
        const {
            id = 0,
            collectionId = "",
            selectedProducts = [],
            productPageLayoutId = "",
        } = configData;
        const {
            catelog_page_limit = "5",
            catelog_product_limit = "5",
            name = "",
            catelog_limit = "",
        } = activePlan;
        if (
            (totalCatelog >= Number(catelog_limit) ||
                catelog_limit === "false") &&
            id === 0
        ) {
            setErrorMessage(
                `Catalog limit reached! Your current plan allows up to ${catelog_limit === "false" ? 0 : catelog_limit
                } catalogs. Please upgrade your plan to increase the limit.`
            );
            setActiveToastError(true);
            setBtnSpinner(false);
            setLoader(false);
        } else if (collectionId === "" || selectedProducts.length === 0) {
            setErrorMessage(
                "Please select a collection and at least one product!"
            );
            setActiveToastError(true);
            setBtnSpinner(false);
            setLoader(false);
        } else if (
            configData?.selectedProducts.length > Number(catelog_product_limit)
        ) {
            setActiveBannerError(true);
            setErrorBannerMessage(
                `Product limit reached! Your current plan allows up to ${catelog_product_limit} products per catalog.Please upgrade your plan to increase the limit.`
            );
            setBtnSpinner(false);
            setLoader(false);
            bannerTimeout();
        } else if (
            getCurrentPDFPageSize(productPageLayoutId, selectedProducts) >
            Number(catelog_page_limit) ||
            catelog_page_limit === "false"
        ) {
            setActiveBannerError(true);
            setErrorBannerMessage(
                `PDF Page limit reached! Your current plan allows up to ${catelog_page_limit} pages per catalog.Please upgrade your plan to increase the limit.`
            );
            bannerTimeout();
            setBtnSpinner(false);
            setLoader(false);
        } else {
            setActiveBannerError(false);
            setErrorBannerMessage();
            await setTimeout(() => {
                generatePDF(e);
            }, 300);
        }
    };

    //Handle input change event for choose list component.
    const handleChooseConfigData = (field) => (value) => {
        const convertValue = Array.isArray(value)
            ? convertArrToStr(value)
            : value;
        setConfigData((prevState) => ({
            ...prevState,
            [field]: convertValue,
        }));
    };

    //Handle input change event.
    const handleConfigData = (value, field) => {
        value = ["productChangeInPercentage", "productTaxPercentage"].includes(
            field
        )
            ? Math.abs(value)
            : value;
        const convertValue = Array.isArray(value)
            ? convertArrToStr(value)
            : value;
        if (field === "collectionId") {
            const selectedLabel = collectionList.find(
                (option) => option.value === value
            ).label;
            setConfigData({
                ...configData,
                [field]: convertValue,
                collectionName: selectedLabel,
                // 'selectedProducts': []
            });
        } else {
            setConfigData({
                ...configData,
                [field]: convertValue,
            });
        }

        console.log("productPageLayoutId ", productPageLayoutId);
    };

    const redirectToPlan = () => {
        history("plans");
    };

    //Get collection list from the api..
    useEffect(() => {
        //Fetching the collection list...
        const fetchCollectionData = async () => {
            const responseData = await fetchMethod(
                getMethodType,
                "collections/get",
                shopid
            );
            const {
                data: { collections = [] } = {},
                responseCode = "",
                errorCode = 0,
            } = responseData;
            // if (responseCode === 0 && errorCode === 101) {
            //     redirectToPlan();
            // } else {
            collections.unshift({
                label: "Please select the collection",
                value: "",
            });
            setCollectionList(collections);
            setCollectionLoader(false);
            // }
        };
        fetchCollectionData();
    }, []);

    //Get the catalog data by catalog id from the query parameters...
    useEffect(() => {
        // Access the search query parameters
        const queryParams = new URLSearchParams(location.search);

        // Get specific query parameters
        const settingId = queryParams.get("id") ?? 0;

        const getCatalogData = async () => {
            setLoader(true);
            const responseData = await fetchMethod(
                getMethodType,
                `setting/${settingId}`,
                shopid
            );
            const {
                data = {},
                responseCode = "",
                errorCode = 0,
                message = "",
            } = responseData;
            /* if (responseCode === 0 && errorCode === 101) {
                redirectToPlan();
            } else  */ if (responseCode === 0) {
                setErrorMessage(message);
                setActiveToastError(true);
            } else {
                const newData = {
                    ...data,
                    ...{
                        logo: data?.logo ?? "",
                        frontImage: data?.frontImage ?? "",
                        backImage: data?.backImage ?? "",
                    },
                };
                setConfigData(newData);
            }
            setLoader(false);
        };
        if (settingId > 0) {
            getCatalogData();
        }
    }, [location.search]);

    //Handle File upload event for logo.
    const handleLogoDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) => {
            var reader = new window.FileReader();
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onload = function () {
                setConfigData((prevState) => ({
                    ...prevState,
                    logo: reader.result,
                }));
            };
            setFileLogo(acceptedFiles[0]);
        },
        []
    );

    //Handle File upload event for front image.
    const handleFrontImageDropZoneDrop = useCallback(
        async (_dropFiles, acceptedFiles, _rejectedFiles) => {
            const file = acceptedFiles[0];

            // Set up image compression options
            const options = {
                maxSizeMB: 3, // Max size of 1MB after compression
                maxWidthOrHeight: 1920, // Max width or height
                useWebWorker: true, // Use web worker for better performance
            };

            try {
                // Compress the image
                const compressedFile = await imageCompression(file, options);

                // Create a FileReader to convert the compressed image to base64
                const reader = new window.FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onload = function () {
                    setConfigData((prevState) => ({
                        ...prevState,
                        frontImage: reader.result,
                    }));
                };

                // Set the compressed file to the state
                setFileFrontImage(compressedFile);
            } catch (error) {
                console.error("Error compressing image:", error);
            }
        },
        []
    );

    const handleBackImageDropZoneDrop = useCallback(
        async (_dropFiles, acceptedFiles, _rejectedFiles) => {
            const file = acceptedFiles[0];

            // Set up image compression options
            const options = {
                maxSizeMB: 3, // Max size of 1MB after compression
                maxWidthOrHeight: 1920, // Max width or height
                useWebWorker: true, // Use web worker for better performance
            };

            try {
                // Compress the image
                const compressedFile = await imageCompression(file, options);

                // Create a FileReader to convert the compressed image to base64
                const reader = new window.FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onload = function () {
                    setConfigData((prevState) => ({
                        ...prevState,
                        backImage: reader.result,
                    }));
                };

                // Set the compressed file to the state
                setFileBackImage(compressedFile);
            } catch (error) {
                console.error("Error compressing back image:", error);
            }
        },
        []
    );

    //Fileupload note for logo.
    const fileUploadLogo = !fileLogo && (
        <DropZone.FileUpload actionHint="Allowed only 'jpg', 'jpeg' and 'png'." />
    );

    //Fileupload note for front image.
    const fileUploadFrontImage = !fileFrontImage && (
        <DropZone.FileUpload actionHint="Allowed only 'jpg', 'jpeg' and 'png'." />
    );

    //Fileupload note for back image.
    const fileUploadBackImage = !fileBackImage && (
        <DropZone.FileUpload actionHint="Allowed only 'jpg', 'jpeg' and 'png'." />
    );

    //handle upload logo file.
    const uploadedLogoFile = fileLogo && (
        <LegacyStack>
            <Thumbnail
                size="small"
                alt={fileLogo.name}
                source={
                    validImageTypes.includes(fileLogo.type)
                        ? window.URL.createObjectURL(fileLogo)
                        : configData?.logo !== ""
                            ? `${IMAGE_PREFIX}uploads/logo/${configData?.logo}`
                            : NoteMinor
                }
            />
            {fileLogo.size > 0 && (
                <div className="file_data">
                    {fileLogo.name}{" "}
                    <Text variant="bodySm" as="p">
                        {fileLogo.size} bytes
                    </Text>
                </div>
            )}
            {(fileLogo.size > 0 || configData?.logo !== "") && (
                <span
                    className="btnimg_close"
                    onClick={(e) => {
                        e.stopPropagation();
                        setFileLogo([]);
                        handleConfigData("", "logo");
                    }}
                >
                    <Icon source={MobileCancelMajor} tone="base" />
                </span>
            )}
        </LegacyStack>
    );

    //handle upload front image file.
    const uploadedFrontImageFile = fileFrontImage && (
        <LegacyStack>
            <Thumbnail
                size="small"
                alt={fileFrontImage.name}
                source={
                    validImageTypes.includes(fileFrontImage.type)
                        ? window.URL.createObjectURL(fileFrontImage)
                        : configData?.frontImage !== ""
                            ? `${IMAGE_PREFIX}uploads/frontImage/${configData?.frontImage}`
                            : NoteMinor
                }
            />
            {fileFrontImage.size && (
                <div className="file_data">
                    {fileFrontImage.name}{" "}
                    <Text variant="bodySm" as="p">
                        {fileFrontImage.size} bytes
                    </Text>
                </div>
            )}
            {(fileFrontImage.size > 0 || configData?.frontImage !== "") && (
                <span
                    className="btnimg_close"
                    onClick={(e) => {
                        e.stopPropagation();
                        setFileFrontImage([]);
                        handleConfigData("", "frontImage");
                    }}
                >
                    <Icon source={MobileCancelMajor} tone="base" />
                </span>
            )}
        </LegacyStack>
    );

    //handle upload back image file.
    const uploadedBackImageFile = fileBackImage && (
        <LegacyStack>
            <Thumbnail
                size="small"
                alt={fileBackImage.name}
                source={
                    validImageTypes.includes(fileBackImage.type)
                        ? window.URL.createObjectURL(fileBackImage)
                        : configData?.backImage !== ""
                            ? `${IMAGE_PREFIX}uploads/backImage/${configData?.backImage}`
                            : NoteMinor
                }
            />
            {fileBackImage.size && (
                <div className="file_data">
                    {fileBackImage.name}{" "}
                    <Text variant="bodySm" as="p">
                        {fileBackImage.size} bytes
                    </Text>
                </div>
            )}
            {(fileBackImage.size || configData?.backImage !== "") && (
                <span
                    className="btnimg_close"
                    onClick={(e) => {
                        e.stopPropagation();
                        setFileBackImage([]);
                        handleConfigData("", "backImage");
                    }}
                >
                    <Icon source={MobileCancelMajor} tone="base" />
                </span>
            )}
        </LegacyStack>
    );

    //Generat PDF file and call the setting edit api with pdf data...
    const generatePDF = async (e) => {
        e.preventDefault();
        const {
            pdfLayout = "portrait",
            paperLayout = "a4",
            frontImage,
            backImage,
        } = configData;
        // const myDiv = document.getElementById('pdfLayout');
        const pageArray = [];
        const totalPages = document.querySelectorAll('div[id*="page_id_"]');
        console.log("total page dashboard ",totalPages)
        //Front image is added...
        if (frontImage !== "") {
            const frontPageElement = document.getElementById("front_page");
            pageArray.push(frontPageElement);
        }

        for (let i = 0; i < totalPages.length; i++) {
            const pageElement = document.getElementById(`page_id_${i}`);
            pageArray.push(pageElement);
        }

        //Back image is added...
        if (backImage !== "") {
            const backPageElement = document.getElementById("back_page");
            pageArray.push(backPageElement);
        }
        const jsxElement = pageArray.map((hmtlContent) => {
            return `<div
                    style={{
                        zoom: 0.65,
                        // backgroundColor: "blue !important",
                        // borderRadius: "25px",
                        // borderRight: "2px solid black",
                        // boxShadow: "5px 2px 5px 0px rgba(0,0,0,0.50)",
                    }}
                >
                    ${hmtlContent}
                </div>`;
        });
        const jsxToBase = pageArray.map((element) => {
            return window.btoa(element);
        });
        // Start Generate the PDF file base on HTML content..
        // let outputPDF = await html2PDF(pageArray, {
        //     jsPDF: {
        //         orientation: pdfLayout ?? "p",
        //         unit: paperSizeMeasurement ?? "cm",
        //         format: paperLayout,
        //         compress: true,
        //         // precision: 0
        //     },
        //     html2canvas: {
        //         imageTimeout: 0,
        //         logging: false,
        //         // useCORS: false,
        //         useCORS: true,
        //         height: pdfHeight[paperLayout],
        //         scrollX: -window.scrollY,
        //         scrollY: -window.scrollY,
        //         windowWidth: document.documentElement.offsetWidth,
        //         windowHeight: document.documentElement.offsetHeight,
        //         scale: 1,
        //         dpi: 96,
        //         letterRendering: true,
        //         x: 0,
        //         y: 0,
        //     },
        //     margin: 0,
        //     autoResize: true,
        //     applyImageFit: true,
        //     enableLinks: true,
        //     autoPagination: true,
        //     // imageType: 'image/jpeg',
        //     image: { type: "jpeg", quality: 0.3 },
        //     // output: 'demo.pdf',
        //     success: function (pdf) {
        //     },
        // }).then((pdf) => {
        //     pdf.save();
        //     return pdf.output("datauristring");
        // });
        const generatePdf = async () => {
            window.scrollTo(0, 0);
            const options = {
                jsPDF: {
                    // orientation: pdfLayout ?? "p",
                    orientation: "p",
                    // unit: paperSizeMeasurement ?? "cm",
                    unit: "mm",
                    format: paperLayout,
                    // format: [210, 297],
                    // compress: true,
                    // putTotalPages: true,
                    precision: 0,
                },
                // pagebreak: { mode: 'auto', after: '.breakPage' },
                html2canvas: {
                    imageTimeout: 0,
                    allowTaint: true,
                    useCORS: true,
                    scrollX: -window.scrollY,
                    scrollY: -window.scrollY,
                    windowWidth: document.documentElement.offsetWidth,
                    windowHeight: document.documentElement.offsetHeight,
                    scale: 1,
                    dpi: 96,
                    letterRendering: 1,
                    logging: true,
                    onclone: (document) => {
                        const imgs = document.querySelectorAll("img");
                        imgs.forEach((img) => {
                            if (!img.complete) {
                                img.onload = () => { };
                            }
                        });
                    },
                },
                margin: 0,
                // autoResize: true,
                // applyImageFit: true,
                enableLinks: true,
                autoPagination: true,
            };
            try {
                const mergedPdf = await PDFDocument.create();
                for (const element of pageArray) {
                    const pdfBytes = await html2pdf()
                        .set(options)
                        .from(element)
                        .toPdf()
                        .output("arraybuffer");
                    const pdfDoc = await PDFDocument.load(pdfBytes);
                    const [page] = await mergedPdf.copyPages(pdfDoc, [0]);
                    mergedPdf.addPage(page);
                }
                const pdfBytes = await mergedPdf.save();
                let outputPDF =
                    "data:application/pdf;filename=generated.pdf;base64," +
                    encode(pdfBytes);
                const pdfUrlGen = URL.createObjectURL(
                    new Blob([pdfBytes], { type: "application/pdf" })
                );
                const link = document.createElement("a");
                link.href = pdfUrlGen;
                link.download = "download.pdf";
                return outputPDF;
                // link.click();
            } catch (error) {
                console.error("Error generating PDF: ", error);
            }
        };
        const outputPDF = await generatePdf();
        if (outputPDF !== "") {
            const { ...requestData } = configData;
            console.log("configData..", configData);
            const fileSize = outputPDF.length; //new Buffer(outputPDF, 'base64').length;
            if (true) {
                // requestData["pdfUrl"] = "";
                requestData["pdfUrl"] = null;
                requestData["isUpload"] = 0;
                // requestData[""] = pageArray;
                const responseData = await fetchMethod(
                    postMethodType,
                    "setting/edit",
                    shopid,
                    requestData
                );
                const {
                    setting_id = "",
                    message = "",
                    responseCode = "",
                } = responseData;
                if (responseCode === 0) {
                    setErrorMessage(message);
                    setActiveToastError(true);
                    setLoader(false);
                } else {
                    const chunkString = (str, size) => {
                        const numChunks = Math.ceil(str.length / size);
                        const chunks = new Array(numChunks);

                        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
                            chunks[i] = str.substr(o, size);
                        }

                        return chunks;
                    };

                    var flipChunkId = 0;

                    const sendDataInChunks = async (
                        chunks,
                        additionalStringChunks,
                        pageIndex,
                        currentPageCount,
                        totalChunks,
                        additionalStringPageIndex,
                        totalAdditionalStringChunks,
                        isLastRequest
                    ) => {
                        let isLastRequestVariable = false;
                        let lastSendedData = ""
                        setLoader(true);
                        for (let i = 0; i < chunks.length; i++) {
                            try {
                                const formData = {
                                    pdfRequest:
                                        additionalStringChunks[
                                            additionalStringPageIndex
                                        ] == undefined
                                            ? null
                                            : additionalStringChunks[
                                            additionalStringPageIndex
                                            ],
                                    current_page: isLastRequest
                                        ? totalChunks
                                        : currentPageCount,
                                    total_page: totalChunks,
                                    currentBase64Page:
                                        additionalStringPageIndex + 1,
                                    totalBase64Page:
                                        totalAdditionalStringChunks,
                                    settings_id: setting_id,
                                    shop_id: shopid,
                                    page: pageIndex,
                                    isLarge: 1,
                                    collection_id: configData?.collectionId,
                                    collection_name: configData?.collectionName,
                                    isLastRequest: isLastRequest,
                                };
                                if (isLastRequestVariable == false && lastSendedData != additionalStringChunks[
                                    additionalStringPageIndex
                                ]) {
                                    const responseFlipPdfGenrate =
                                        await fetchMethod(
                                            postMethodType,
                                            `flipPdfGenrate/${setting_id}`,
                                            shopid,
                                            formData
                                        );
                                    flipChunkId =
                                        responseFlipPdfGenrate?.data?.flipId;
                                }
                                isLastRequestVariable = isLastRequest;
                                lastSendedData = additionalStringChunks[
                                    additionalStringPageIndex
                                ]
                            } catch (error) {
                                console.error(
                                    `Error sending chunk ${i + 1}:`,
                                    error
                                );
                            }
                        }
                        setBtnSpinner(false);

                        setLoader(false);
                    };

                    const processPagesSequentially = async (
                        pageArray,
                        additionalString
                    ) => {
                        let totalChunks = 0;
                        let currentPageCount = 1;
                        let additionalStringChunks = [];
                        let totalAdditionalStringChunks = 0;

                        // Calculate total chunks for HTML pages
                        for (let i = 0; i < pageArray.length; i++) {
                            const htmlString = pageArray[i].outerHTML;
                            const chunks = chunkString(htmlString, 1000000);
                            totalChunks += chunks.length;
                        }

                        // Calculate chunks for additional string
                        additionalStringChunks = chunkString(
                            additionalString,
                            1000000
                        );
                        totalAdditionalStringChunks =
                            additionalStringChunks.length;

                        // Send data in chunks
                        for (let i = 0; i < pageArray.length; i++) {
                            const htmlString = pageArray[i].outerHTML;
                            const chunks = chunkString(htmlString, 1000000);
                            const isLastRequest = i === pageArray.length - 1; // Check if it's the last page
                            await sendDataInChunks(
                                chunks,
                                additionalStringChunks,
                                i,
                                currentPageCount,
                                totalChunks,
                                i,
                                totalAdditionalStringChunks,
                                isLastRequest
                            );
                            currentPageCount++;
                        }
                    };

                    // Usage example
                    const additionalString = "This is the additional string."; // Replace with your actual string
                    processPagesSequentially(pageArray, outputPDF).then(
                        function () {
                            setConfigData((prevState) => ({
                                ...prevState,
                                id: setting_id,
                                logo: logo ?? "",
                                backImage: backImage ?? "",
                                frontImage: frontImage ?? "",
                            }));
                            setSuccessMessage(message);
                            setActiveToastSuccess(true);
                            navigate(URL_PREFIX, {
                                state: {
                                    responseFlipPdfGenrate: flipChunkId,
                                    flipBack: true,
                                },
                            });
                        }
                    );

                    // function blobToBase64(blob) {
                    //     return new Promise((resolve, reject) => {
                    //         const reader = new FileReader();
                    //         reader.onloadend = () => resolve(reader.result);
                    //         reader.onerror = reject;
                    //         reader.readAsDataURL(blob);
                    //     });
                    // }

                    // async function sendHtmlArrayToServer(htmlArray, url) {
                    //     // Convert the array of HTML elements to a single HTML string
                    //     const htmlString = htmlArray
                    //         .map((htmlElement) => {
                    //             // Ensure the element is a Node or string
                    //             if (typeof htmlElement === "string") {
                    //                 return htmlElement;
                    //             }
                    //             // Serialize the HTML element to a string
                    //             if (htmlElement instanceof Node) {
                    //                 return htmlElement.outerHTML;
                    //             }
                    //             return "";
                    //         })
                    //         .join("");
                    //     // Create a Blob from the HTML string
                    //     const blob = new Blob([htmlString], {
                    //         type: "text/html",
                    //     });
                    //     const base64Data = await blobToBase64(blob);
                    //     // Create a FormData object and append the Blob
                    //     const formData = {
                    //         flipHtml: JSON.stringify(base64Data)
                    //     };

                    //     try {
                    //         // Send the FormData to the server
                    //         const responseFlipPdfGenrate = await fetchMethod(
                    //             postMethodType,
                    //             `flipPdfGenrate/${setting_id}`,
                    //             shopid,
                    //             formData
                    //         );

                    //         // Check if the request was successful
                    //         // if (!response.ok) {
                    //         //     throw new Error(
                    //         //         `Server error: ${response.statusText}`
                    //         //     );
                    //         // }

                    //         // Handle the response if needed
                    //         // const result = await response.json();
                    //     } catch (error) {
                    //         console.error("Error sending data:", error);
                    //     }
                    // }
                    // sendHtmlArrayToServer(pageArray, 'serverUrl');
                    // var flipPdfData = {};
                    // // flipPdfData["settings_id"] = setting_id;
                    // flipPdfData["flipHtml"] = pageArray;
                    // const responseFlipPdfGenrate = await fetchMethod(
                    //     postMethodType,
                    //     `flipPdfGenrate/${setting_id}`,
                    //     shopid,
                    //     flipPdfData
                    // );
                }
            } else {
                requestData["pdfUrl"] = outputPDF;
                requestData["isUpload"] = 1;
                console.log("request data : ", requestData);
                const requestData1 = [];
                // requestData1["pageArray"] = pageArray;
                const responseData = await fetchMethod(
                    postMethodType,
                    "setting/edit",
                    shopid,
                    requestData
                );
                console.log("responseData555 : ", responseData);
                const {
                    setting_id = "",
                    message = "",
                    logo = "",
                    frontImage = "",
                    backImage = "",
                    responseCode = "",
                    errorCode = 0,
                } = responseData;
                /* if (responseCode === 0 && errorCode === 101) {
                        redirectToPlan();
                    } else */ if (responseCode === 0) {
                    setErrorMessage(message);
                    setActiveToastError(true);
                    setBtnSpinner(false);
                    setLoader(false);
                } else {
                    const chunkString = (str, size) => {
                        const numChunks = Math.ceil(str.length / size);
                        const chunks = new Array(numChunks);

                        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
                            chunks[i] = str.substr(o, size);
                        }

                        return chunks;
                    };
                    var flipChunkId = 0;
                    const sendDataInChunks = async (
                        chunks,
                        pageIndex,
                        current_page_count,
                        totalChunks
                    ) => {
                        for (let i = 0; i < chunks.length; i++) {
                            try {
                                console.log(
                                    "Current Page Count:",
                                    current_page_count
                                );
                                const formData = {
                                    uploadRequest: chunks[i],
                                    current_page: current_page_count,
                                    total_page: totalChunks,
                                    settings_id: setting_id,
                                    shop_id: shopid,
                                    page: pageIndex,
                                    isLarge: 0,
                                };

                                const responseFlipPdfGenrate =
                                    await fetchMethod(
                                        postMethodType,
                                        `flipPdfGenrate/${setting_id}`,
                                        shopid,
                                        formData
                                    );

                                console.log(
                                    "responseFlipPdfGenrate:",
                                    responseFlipPdfGenrate?.data?.flipId
                                );
                                flipChunkId =
                                    responseFlipPdfGenrate?.data?.flipId;
                                console.log("flipChunk iD :", flipChunkId);

                                console.log(
                                    `Chunk ${i + 1}/${chunks.length
                                    } sent successfully.`
                                );
                            } catch (error) {
                                console.error(
                                    `Error sending chunk ${i + 1}:`,
                                    error
                                );
                                // Optional: Implement retry logic here
                            }
                        }
                    };

                    const processPagesSequentially = async (pageArray) => {
                        let totalChunks = 0;
                        let current_page_count = 1;

                        // Calculate total chunks
                        for (let i = 0; i < pageArray.length; i++) {
                            const htmlString = pageArray[i].outerHTML;
                            const chunks = chunkString(htmlString, 100000);
                            totalChunks += chunks.length;
                        }

                        // Send data in chunks
                        for (let i = 0; i < pageArray.length; i++) {
                            const htmlString = pageArray[i].outerHTML;
                            const chunks = chunkString(htmlString, 100000);
                            await sendDataInChunks(
                                chunks,
                                i,
                                current_page_count,
                                totalChunks
                            ); // Pass page index
                            current_page_count++; // Increment page count after sending chunks of the current page
                        }
                    };

                    processPagesSequentially(pageArray).then(function () {
                        setConfigData((prevState) => ({
                            ...prevState,
                            id: setting_id,
                            logo: logo ?? "",
                            backImage: backImage ?? "",
                            frontImage: frontImage ?? "",
                        }));
                        setSuccessMessage(message);
                        setActiveToastSuccess(true);
                        navigate(URL_PREFIX, {
                            state: {
                                responseFlipPdfGenrate: flipChunkId,
                                flipBack: true,
                            },
                        });
                    });

                    // function blobToBase64(blob) {
                    //     return new Promise((resolve, reject) => {
                    //         const reader = new FileReader();
                    //         reader.onloadend = () => resolve(reader.result);
                    //         reader.onerror = reject;
                    //         reader.readAsDataURL(blob);
                    //     });
                    // }

                    // async function sendHtmlArrayToServer(htmlArray, url) {
                    //     // Convert the array of HTML elements to a single HTML string
                    //     const htmlString = htmlArray
                    //         .map((htmlElement) => {
                    //             // Ensure the element is a Node or string
                    //             if (typeof htmlElement === "string") {
                    //                 return htmlElement;
                    //             }
                    //             // Serialize the HTML element to a string
                    //             if (htmlElement instanceof Node) {
                    //                 return htmlElement.outerHTML;
                    //             }
                    //             return "";
                    //         })
                    //         .join("");
                    //     // Create a Blob from the HTML string
                    //     const blob = new Blob([htmlString], {
                    //         type: "text/html",
                    //     });
                    //     const base64Data = await blobToBase64(blob);
                    //     // Create a FormData object and append the Blob
                    //     const formData = {
                    //         flipHtml: JSON.stringify(base64Data)
                    //     };

                    //     try {
                    //         // Send the FormData to the server
                    //         const responseFlipPdfGenrate = await fetchMethod(
                    //             postMethodType,
                    //             `flipPdfGenrate/${setting_id}`,
                    //             shopid,
                    //             formData
                    //         );

                    //         // Check if the request was successful
                    //         // if (!response.ok) {
                    //         //     throw new Error(
                    //         //         `Server error: ${response.statusText}`
                    //         //     );
                    //         // }

                    //         // Handle the response if needed
                    //         // const result = await response.json();
                    //     } catch (error) {
                    //         console.error("Error sending data:", error);
                    //     }
                    // }
                    // sendHtmlArrayToServer(pageArray, 'serverUrl');
                    // var flipPdfData = {};
                    // // flipPdfData["settings_id"] = setting_id;
                    // flipPdfData["flipHtml"] = pageArray;
                    // const responseFlipPdfGenrate = await fetchMethod(
                    //     postMethodType,
                    //     `flipPdfGenrate/${setting_id}`,
                    //     shopid,
                    //     flipPdfData
                    // );
                }
            }
        }
        //setBtnSpinner(false);
        //  setLoader(false);
        // const generatePdf = async () => {
        //     const pdf = new jsPDF({
        //         orientation: pdfLayout ?? "p",
        //         unit: paperSizeMeasurement ?? "cm",
        //         format: paperLayout,
        //         compress: true,
        //     });

        //     try {
        //         for (const [index, element] of pageArray.entries()) {
        //             const htmlString = element.outerHTML;

        //             // Add the HTML content to the PDF
        //             await pdf.html(htmlString, {
        //                 x: 10, // Adjust according to your needs
        //                 y: 10, // Adjust according to your needs
        //                 html2canvas: {
        //                     scale: 1, // Set the scale to control the quality
        //                 },
        //                 callback: function (doc) {
        //                     // Add clickable links manually if necessary
        //                     const buyNowLinks = element.querySelectorAll("a");
        //                     buyNowLinks.forEach(link => {
        //                         if (link.textContent.trim() === "Buy Now") {
        //                             const rect = link.getBoundingClientRect();

        //                             // Convert positions to the PDF's units
        //                             const x = pdf.internal.pageSize.width * (rect.left / document.documentElement.clientWidth);
        //                             const y = pdf.internal.pageSize.height * (rect.top / document.documentElement.clientHeight);
        //                             const width = pdf.internal.pageSize.width * (rect.width / document.documentElement.clientWidth);
        //                             const height = pdf.internal.pageSize.height * (rect.height / document.documentElement.clientHeight);

        //                             pdf.link(x, y, width, height, { url: link.href });
        //                         }
        //                     });

        //                     if (index < pageArray.length - 1) {
        //                         pdf.addPage();
        //                     }
        //                 }
        //             });
        //         }

        //         // Save the generated PDF
        //         const outputPDF = pdf.output('datauristring');
        //         pdf.save("download.pdf"); // Save the PDF file
        //     } catch (error) {
        //         console.error("Error generating PDF: ", error);
        //     }
        // };
        // generatePdf()

        //End Generate the PDF file base on HTML content..

        //Check if PDF return the base64 string then API call and save data to the database...
    };

    //Destructring the configuration object...
    const {
        id: settingId = "",
        enabled = 1,
        fontFamily = "Roboto Condensed",
        fontColor = defaultFontColor,
        backgroundColor = defaultBackgroundColor,
        headerText = "",
        headerAlignment = "center",
        footerText = "",
        footerAlignment = "left",
        footerPageNoEnabled = "0",
        footerDateEnabled = "0",
        footerDateFormat = "dd/MM/yy",
        pdfLayout = "portrait",
        paperLayout = "a4",
        productAttributes = "name,price,sku",
        productButtonEnabled = "0",
        productAttributeAlignment = "center",
        productDescriptionCharLimit = "50",
        productAttributeLabelColor = defaultFontColor,
        productAttributeValueColor = defaultFontColor,
        productBackgroundColor = defaultBackgroundColor,
        priceAdjustment = "",
        productChangeInPercentage = "",
        productTaxPercentage = "",
        productPageLayoutId = "sixItemGrid",
        collectionId = "",
        selectedProducts = [],
    } = configData;

    const disabledInputFields = false;
    let {
        barcode = "false",
        isAddFrontBack = "false",
        layout_limit = "3",
        font_limit = "1",
        catelog_product_limit = "5",
    } = activePlan;
    if (font_limit === "true") font_limit = optionsFontFamily.length;
    else if (font_limit === "false") font_limit = 1;

    return (
        <div className="catalog_container">
            {loader && (
                <Spinner
                    accessibilityLabel="Small spinner example"
                    size="large"
                />
            )}
            <Page
                // fullWidth
                backAction={{
                    content: "Products",
                    onAction: () => navigate(URL_PREFIX),
                }}
                title={settingId > 0 ? "Edit Catalog" : "Create a New Catalog"}
                primaryAction={
                    tabSelected === 2 && (
                        <Button
                            variant="primary"
                            size="large"
                            disabled={activeBannerError}
                            onClick={(e) => handleClick(e)}
                            loading={btnSpinner}
                        >
                            Save & Generate PDF
                        </Button>
                    )
                }
            >
                <Layout>
                    <Layout.Section>
                        <div className="tab_area">
                            <div className="mb_15">
                                <Banner title="Product updates">
                                    <p>
                                        <strong>Note:</strong> Product updates
                                        are not automatically synced with PDF
                                        catalogs. Please regenerate the catalogs
                                        to update them with the latest details.
                                    </p>
                                </Banner>
                            </div>
                            {toastError}
                            {toastSuccess}
                            {bannerError}
                            <Tabs
                                tabs={tabs}
                                selected={tabSelected}
                                onSelect={handleTabChange}
                                disabled={btnSpinner}
                            >
                                <Box>
                                    {tabSelected === 0 && (
                                        <>
                                            <LegacyCard sectioned>
                                                <Grid>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 3,
                                                            lg: 3,
                                                            xl: 3,
                                                        }}
                                                    >
                                                        <label className="custom_lbl Polaris-Label__Text">
                                                            Catalog Status
                                                        </label>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 9,
                                                            lg: 9,
                                                            xl: 9,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <ButtonGroup variant="segmented">
                                                                {optionsEnabledDisabled.map(
                                                                    (
                                                                        option,
                                                                        optionIndex
                                                                    ) => {
                                                                        const {
                                                                            label = "",
                                                                            value = "",
                                                                        } =
                                                                            option;
                                                                        // return (<Button key={`btn_optionkey_${optionIndex}`} pressed={enabled === value ? true : false} onClick={() => handleConfigData(value, 'enabled')}>{label}</Button>)
                                                                        return (
                                                                            <Button
                                                                                key={`btn_optionkey_${optionIndex}`}
                                                                                tone={
                                                                                    enabled ===
                                                                                        value
                                                                                        ? "success"
                                                                                        : ""
                                                                                }
                                                                                variant={
                                                                                    enabled ===
                                                                                        value
                                                                                        ? "primary"
                                                                                        : ""
                                                                                }
                                                                                onClick={(
                                                                                    e
                                                                                ) =>
                                                                                    handleConfigData(
                                                                                        value,
                                                                                        "enabled"
                                                                                    )
                                                                                }
                                                                            >
                                                                                {
                                                                                    label
                                                                                }
                                                                            </Button>
                                                                        );
                                                                    }
                                                                )}
                                                            </ButtonGroup>
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 12,
                                                            lg: 12,
                                                            xl: 12,
                                                        }}
                                                    >
                                                        <Divider />
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 6,
                                                            lg: 6,
                                                            xl: 6,
                                                        }}
                                                    >
                                                        <Grid>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <Select
                                                                        label="Select Font Family"
                                                                        name="fontFamily"
                                                                        options={optionsFontFamily.slice(
                                                                            0,
                                                                            Number(
                                                                                font_limit
                                                                            )
                                                                        )}
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "fontFamily"
                                                                            )
                                                                        }
                                                                        value={
                                                                            fontFamily
                                                                        }
                                                                        disabled={
                                                                            disabledInputFields
                                                                        }
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <CustomColorInput
                                                                        settings={{
                                                                            label: "Font Color",
                                                                            defaultValue:
                                                                                fontColor,
                                                                            disabled:
                                                                                disabledInputFields,
                                                                            name: "fontColor",
                                                                            onChange:
                                                                                handleConfigData,
                                                                        }}
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <CustomColorInput
                                                                        settings={{
                                                                            label: "Background Color",
                                                                            defaultValue:
                                                                                backgroundColor,
                                                                            disabled:
                                                                                disabledInputFields,
                                                                            name: "backgroundColor",
                                                                            onChange:
                                                                                handleConfigData,
                                                                        }}
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                        </Grid>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 6,
                                                            lg: 6,
                                                            xl: 6,
                                                        }}
                                                    >
                                                        <label className="custom_lbl Polaris-Label__Text">
                                                            Preview
                                                        </label>
                                                        <div
                                                            className="font_preview"
                                                            style={{
                                                                background:
                                                                    backgroundColor,
                                                                color: fontColor,
                                                                fontFamily:
                                                                    fontFamily,
                                                            }}
                                                        >
                                                            <p>
                                                                Lorem Ipsum is
                                                                simply dummy
                                                                text of the
                                                                printing and
                                                                typesetting
                                                                industry.
                                                            </p>
                                                        </div>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 12,
                                                            lg: 12,
                                                            xl: 12,
                                                        }}
                                                    >
                                                        <Divider />
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <label className="custom_lbl Polaris-Label__Text">
                                                                Logo Image
                                                            </label>
                                                            <DropZone
                                                                allowMultiple={
                                                                    false
                                                                }
                                                                disabled={
                                                                    disabledInputFields
                                                                }
                                                                onDrop={
                                                                    handleLogoDropZoneDrop
                                                                }
                                                                accept={
                                                                    validImageTypes
                                                                }
                                                                errorOverlayText="File type must be valid"
                                                                variableHeight
                                                            >
                                                                {
                                                                    uploadedLogoFile
                                                                }
                                                                {fileUploadLogo}
                                                            </DropZone>
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <label className="custom_lbl Polaris-Label__Text">
                                                                Front Page Image
                                                            </label>
                                                            <DropZone
                                                                allowMultiple={
                                                                    false
                                                                }
                                                                disabled={
                                                                    isAddFrontBack ===
                                                                    "false"
                                                                }
                                                                onDrop={
                                                                    handleFrontImageDropZoneDrop
                                                                }
                                                                accept={
                                                                    validImageTypes
                                                                }
                                                                errorOverlayText="File type must be valid"
                                                                variableHeight
                                                            >
                                                                {
                                                                    uploadedFrontImageFile
                                                                }
                                                                {
                                                                    fileUploadFrontImage
                                                                }
                                                            </DropZone>
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <label className="custom_lbl Polaris-Label__Text">
                                                                Last Page Image
                                                            </label>
                                                            <DropZone
                                                                allowMultiple={
                                                                    false
                                                                }
                                                                disabled={
                                                                    isAddFrontBack ===
                                                                    "false"
                                                                }
                                                                onDrop={
                                                                    handleBackImageDropZoneDrop
                                                                }
                                                                accept={
                                                                    validImageTypes
                                                                }
                                                                errorOverlayText="File type must be valid"
                                                                variableHeight
                                                            >
                                                                {
                                                                    uploadedBackImageFile
                                                                }
                                                                {
                                                                    fileUploadBackImage
                                                                }
                                                            </DropZone>
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <TextField
                                                                name="headerText"
                                                                value={
                                                                    headerText ??
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleConfigData(
                                                                        e,
                                                                        "headerText"
                                                                    )
                                                                }
                                                                disabled={
                                                                    disabledInputFields
                                                                }
                                                                label="Header Text"
                                                                maxLength={50}
                                                                autoComplete="off"
                                                                showCharacterCount
                                                            />
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <Select
                                                                label="Header Text Alignment"
                                                                name="headerAlignment"
                                                                options={
                                                                    optionsGeneralAlignment
                                                                }
                                                                onChange={(e) =>
                                                                    handleConfigData(
                                                                        e,
                                                                        "headerAlignment"
                                                                    )
                                                                }
                                                                value={
                                                                    headerAlignment
                                                                }
                                                                disabled={
                                                                    disabledInputFields
                                                                }
                                                            />
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    ></Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <TextField
                                                                name="footerText"
                                                                value={
                                                                    footerText ??
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleConfigData(
                                                                        e,
                                                                        "footerText"
                                                                    )
                                                                }
                                                                multiline={3}
                                                                maxLength={50}
                                                                autoComplete="off"
                                                                showCharacterCount
                                                                disabled={
                                                                    disabledInputFields
                                                                }
                                                                label="Footer Text"
                                                            />
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <Grid>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <Select
                                                                        label="Footer Text Alignment"
                                                                        name="footerAlignment"
                                                                        options={
                                                                            optionsGeneralAlignment
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "footerAlignment"
                                                                            )
                                                                        }
                                                                        value={
                                                                            footerAlignment
                                                                        }
                                                                        disabled={
                                                                            disabledInputFields
                                                                        }
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <Select
                                                                        label="Add Page No."
                                                                        name="footerPageNoEnabled"
                                                                        options={
                                                                            optionsYesNo
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "footerPageNoEnabled"
                                                                            )
                                                                        }
                                                                        value={
                                                                            footerPageNoEnabled
                                                                        }
                                                                        disabled={
                                                                            disabledInputFields
                                                                        }
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                        </Grid>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <Grid>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <Select
                                                                        label="Display Date"
                                                                        name="footerDateEnabled"
                                                                        options={
                                                                            optionsYesNo
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "footerDateEnabled"
                                                                            )
                                                                        }
                                                                        value={
                                                                            footerDateEnabled
                                                                        }
                                                                        disabled={
                                                                            disabledInputFields
                                                                        }
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <Select
                                                                        label="Date Format"
                                                                        name="footerDateFormat"
                                                                        options={
                                                                            optionsDateFormat
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "footerDateFormat"
                                                                            )
                                                                        }
                                                                        value={
                                                                            footerDateFormat
                                                                        }
                                                                        disabled={
                                                                            footerDateEnabled ==
                                                                                1
                                                                                ? false
                                                                                : true
                                                                        }
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                        </Grid>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 12,
                                                            lg: 12,
                                                            xl: 12,
                                                        }}
                                                    >
                                                        <Divider />
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <Select
                                                                label="Paper Orientation"
                                                                name="pdfLayout"
                                                                options={
                                                                    optionsPDFLayout
                                                                }
                                                                onChange={(e) =>
                                                                    handleConfigData(
                                                                        e,
                                                                        "pdfLayout"
                                                                    )
                                                                }
                                                                value={
                                                                    pdfLayout
                                                                }
                                                                disabled={
                                                                    disabledInputFields
                                                                }
                                                            />
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <Select
                                                                label="Paper Layout"
                                                                name="paperLayout"
                                                                options={
                                                                    optionsPaperLayout
                                                                }
                                                                onChange={(e) =>
                                                                    handleConfigData(
                                                                        e,
                                                                        "paperLayout"
                                                                    )
                                                                }
                                                                value={
                                                                    paperLayout
                                                                }
                                                                disabled={
                                                                    disabledInputFields
                                                                }
                                                            />
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    ></Grid.Cell>
                                                </Grid>
                                            </LegacyCard>
                                            <LegacyCard
                                                title="Product Settings"
                                                sectioned
                                            >
                                                <p className="mb_10">
                                                    Choose product details to
                                                    display and customize them.
                                                </p>
                                                <Grid>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <ChoiceList
                                                                title="Select Attributes"
                                                                choices={getProductAttribute(
                                                                    barcode
                                                                )}
                                                                selected={convertStrToArr(
                                                                    productAttributes
                                                                )}
                                                                onChange={handleChooseConfigData(
                                                                    "productAttributes"
                                                                )}
                                                                allowMultiple
                                                            />
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <Grid>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <Select
                                                                        label="Display Buy Now Button"
                                                                        name="productButtonEnabled"
                                                                        options={
                                                                            optionsYesNo
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "productButtonEnabled"
                                                                            )
                                                                        }
                                                                        value={
                                                                            productButtonEnabled
                                                                        }
                                                                        disabled={
                                                                            disabledInputFields
                                                                        }
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <Select
                                                                        label="Product Attribute Alignment"
                                                                        name="productAttributeAlignment"
                                                                        options={
                                                                            optionsProductAttributeAlignment
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "productAttributeAlignment"
                                                                            )
                                                                        }
                                                                        value={
                                                                            productAttributeAlignment
                                                                        }
                                                                        disabled={
                                                                            disabledInputFields
                                                                        }
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <TextField
                                                                        label="Product Description Character Limit"
                                                                        name="productDescriptionCharLimit"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "productDescriptionCharLimit"
                                                                            )
                                                                        }
                                                                        type="number"
                                                                        value={Math.ceil(
                                                                            productDescriptionCharLimit ??
                                                                            50
                                                                        )}
                                                                        disabled={
                                                                            !convertStrToArr(
                                                                                productAttributes
                                                                            ).includes(
                                                                                "description"
                                                                            )
                                                                        }
                                                                        helpText="Product images will resize according to the description length."
                                                                        max="100"
                                                                        min="0"
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                        </Grid>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <Grid>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <CustomColorInput
                                                                        settings={{
                                                                            label: "Product Background Color",
                                                                            defaultValue:
                                                                                productBackgroundColor,
                                                                            disabled:
                                                                                disabledInputFields,
                                                                            name: "productBackgroundColor",
                                                                            onChange:
                                                                                handleConfigData,
                                                                        }}
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <CustomColorInput
                                                                        settings={{
                                                                            label: "Attribute Label Color",
                                                                            defaultValue:
                                                                                productAttributeLabelColor,
                                                                            disabled:
                                                                                disabledInputFields,
                                                                            name: "productAttributeLabelColor",
                                                                            onChange:
                                                                                handleConfigData,
                                                                        }}
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 12,
                                                                    lg: 12,
                                                                    xl: 12,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <CustomColorInput
                                                                        settings={{
                                                                            label: "Attribute Value Color",
                                                                            defaultValue:
                                                                                productAttributeValueColor,
                                                                            disabled:
                                                                                disabledInputFields,
                                                                            name: "productAttributeValueColor",
                                                                            onChange:
                                                                                handleConfigData,
                                                                        }}
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                        </Grid>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 12,
                                                            lg: 12,
                                                            xl: 12,
                                                        }}
                                                    >
                                                        <Divider />
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <Select
                                                                label="Price Adjustment"
                                                                name="priceAdjustment"
                                                                options={
                                                                    optionsPriceAdjustment
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    console.log(
                                                                        "price adjstent",
                                                                        e
                                                                    );
                                                                    handleConfigData(
                                                                        e,
                                                                        "priceAdjustment"
                                                                    );
                                                                }}
                                                                value={
                                                                    priceAdjustment ??
                                                                    ""
                                                                }
                                                                disabled={
                                                                    disabledInputFields
                                                                }
                                                            />
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <TextField
                                                                label="Change (in %)"
                                                                name="productChangeInPercentage"
                                                                onChange={
                                                                    priceAdjustment ===
                                                                        null ||
                                                                        priceAdjustment ===
                                                                        ""
                                                                        ? () => { }
                                                                        : (e) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "productChangeInPercentage"
                                                                            )
                                                                }
                                                                type="number"
                                                                value={
                                                                    productChangeInPercentage ??
                                                                    "0"
                                                                }
                                                                min={0}
                                                                max={100}
                                                                disabled={
                                                                    priceAdjustment ===
                                                                    null ||
                                                                    priceAdjustment ===
                                                                    ""
                                                                }
                                                                helpText="Minus value converted to positive number."
                                                            />
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 4,
                                                        }}
                                                    >
                                                        <FormLayout>
                                                            <TextField
                                                                label="Tax (in %)"
                                                                name="productTaxPercentage"
                                                                onChange={(e) =>
                                                                    handleConfigData(
                                                                        e,
                                                                        "productTaxPercentage"
                                                                    )
                                                                }
                                                                type="number"
                                                                value={
                                                                    productTaxPercentage ??
                                                                    ""
                                                                }
                                                                disabled={
                                                                    disabledInputFields
                                                                }
                                                                min={0}
                                                                max={100}
                                                                helpText="Minus value converted to positive number."
                                                            />
                                                        </FormLayout>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 12,
                                                            sm: 12,
                                                            md: 12,
                                                            lg: 12,
                                                            xl: 12,
                                                        }}
                                                    >
                                                        <Divider />
                                                    </Grid.Cell>
                                                </Grid>
                                            </LegacyCard>
                                        </>
                                    )}
                                    {tabSelected === 1 && (
                                        <LegacyCard
                                            title="Select Collection"
                                            sectioned
                                        >
                                            <p className="mb_10">
                                                Choose the collection page to
                                                add the PDF Product catalog.
                                            </p>
                                            <Grid>
                                                <Grid.Cell
                                                    columnSpan={{
                                                        xs: 12,
                                                        sm: 12,
                                                        md: 6,
                                                        lg: 6,
                                                        xl: 6,
                                                    }}
                                                >
                                                    <FormLayout>
                                                        <div className="collection_list_area">
                                                            <Select
                                                                label="Collections"
                                                                name="collectionId"
                                                                options={
                                                                    collectionList
                                                                }
                                                                onChange={(e) =>
                                                                    handleConfigData(
                                                                        e,
                                                                        "collectionId"
                                                                    )
                                                                }
                                                                value={
                                                                    collectionId
                                                                }
                                                                disabled={
                                                                    collectionLoader
                                                                }
                                                            />
                                                            {collectionLoader && (
                                                                <Spinner
                                                                    accessibilityLabel="Small spinner example"
                                                                    size="small"
                                                                />
                                                            )}
                                                            {/* <Button><Icon source={RefreshMinor} tone="base" /></Button> */}
                                                        </div>
                                                    </FormLayout>
                                                </Grid.Cell>
                                                <Grid.Cell
                                                    columnSpan={{
                                                        xs: 12,
                                                        sm: 12,
                                                        md: 12,
                                                        lg: 12,
                                                        xl: 12,
                                                    }}
                                                >
                                                    <Divider />
                                                </Grid.Cell>
                                                <Grid.Cell
                                                    columnSpan={{
                                                        xs: 12,
                                                        sm: 12,
                                                        md: 12,
                                                        lg: 12,
                                                        xl: 12,
                                                    }}
                                                >
                                                    <div className="mb_10">
                                                        <Text
                                                            variant="headingSm"
                                                            as="h2"
                                                        >
                                                            Product List
                                                        </Text>
                                                    </div>
                                                    <Suspense
                                                        fallback={
                                                            <Spinner
                                                                accessibilityLabel="Small spinner example"
                                                                size="large"
                                                            />
                                                        }
                                                    >
                                                        <ProductList
                                                            catalogId={
                                                                settingId
                                                            }
                                                            productLimit={
                                                                catelog_product_limit
                                                            }
                                                            shopid={shopid}
                                                            collectionId={
                                                                collectionId
                                                            }
                                                            fetchedProduct={
                                                                true
                                                            }
                                                            selectedResources={
                                                                selectedProducts
                                                            }
                                                            parentStateUpdateByChild={
                                                                updateStateByChild
                                                            }
                                                        />
                                                    </Suspense>
                                                </Grid.Cell>
                                            </Grid>
                                        </LegacyCard>
                                    )}
                                    {tabSelected === 2 && (
                                        <div className="pdf_preview_container">
                                            <Grid>
                                                <Grid.Cell
                                                    columnSpan={{
                                                        xs: 12,
                                                        sm: 12,
                                                        md: 12,
                                                        lg: 12,
                                                        xl: 12,
                                                    }}
                                                >
                                                    <LegacyCard
                                                        title="PDF Catalog Layout"
                                                        sectioned
                                                    >
                                                        <p className="mb_10">
                                                            Choose the PDF
                                                            layout to use.
                                                            Scroll right for
                                                            more options.
                                                        </p>
                                                        <div className="page_layout_container">
                                                            <Scrollable
                                                                focusable
                                                            >
                                                                <div className="page_layout_area">
                                                                    <SixItemGrid
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <FiveItemList
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <FiveItemGrid
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                3 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <FourItemGrid
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                4 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <ThreeItemGrid
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                5 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <FourItemList
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                6 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <FourItemLeftList
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                7 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <FourItemRightList
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                8 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <ThreeItemGridReverse
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                9 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <ThreeItemList
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                10 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <ThreeItemLeftList
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                11 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <ThreeItemRightList
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                12 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <TwoItemList
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                13 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <TwoItemLeftList
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                14 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <TwoItemRightList
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                15 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    <OneItemGrid
                                                                        customClass={
                                                                            Number(
                                                                                layout_limit
                                                                            ) >=
                                                                                16 ||
                                                                                layout_limit ===
                                                                                "true"
                                                                                ? ""
                                                                                : "is-disabled"
                                                                        }
                                                                        onClick={
                                                                            handleConfigData
                                                                        }
                                                                        productPageLayoutId={
                                                                            productPageLayoutId
                                                                        }
                                                                    />
                                                                    {/* <EightItemGrid customClass={(Number(layout_limit) >= 17 || layout_limit === "true") ? '' : 'is-disabled'} onClick={handleConfigData} productPageLayoutId={productPageLayoutId} /> */}
                                                                    {/* <TenItemGrid customClass={(Number(layout_limit) >= 18 || layout_limit === "true") ? '' : 'is-disabled'} onClick={handleConfigData} productPageLayoutId={productPageLayoutId} /> */}
                                                                    {/* <SixItemList customClass={(Number(layout_limit) >= 19 || layout_limit === "true") ? '' : 'is-disabled'} onClick={handleConfigData} productPageLayoutId={productPageLayoutId} /> */}
                                                                </div>
                                                            </Scrollable>
                                                        </div>
                                                    </LegacyCard>
                                                </Grid.Cell>
                                                <Grid.Cell
                                                    columnSpan={{
                                                        xs: 12,
                                                        sm: 12,
                                                        md: 12,
                                                        lg: 12,
                                                        xl: 12,
                                                    }}
                                                >
                                                    <LegacyCard
                                                        title="Font & Color Settings"
                                                        sectioned
                                                    >
                                                        <Grid>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 2,
                                                                    lg: 2,
                                                                    xl: 2,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <Select
                                                                        label="Select Font Family"
                                                                        name="fontFamily"
                                                                        options={optionsFontFamily.slice(
                                                                            0,
                                                                            Number(
                                                                                font_limit
                                                                            )
                                                                        )}
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "fontFamily"
                                                                            )
                                                                        }
                                                                        value={
                                                                            fontFamily
                                                                        }
                                                                        disabled={
                                                                            disabledInputFields
                                                                        }
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 1,
                                                                    lg: 1,
                                                                    xl: 1,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <CustomColorInput
                                                                        settings={{
                                                                            label: "Font",
                                                                            defaultValue:
                                                                                fontColor,
                                                                            disabled:
                                                                                disabledInputFields,
                                                                            name: "fontColor",
                                                                            isShowColorCode: false,
                                                                            onChange:
                                                                                handleConfigData,
                                                                        }}
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 1,
                                                                    lg: 1,
                                                                    xl: 1,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <CustomColorInput
                                                                        settings={{
                                                                            label: "BG Color",
                                                                            defaultValue:
                                                                                backgroundColor,
                                                                            disabled:
                                                                                disabledInputFields,
                                                                            name: "backgroundColor",
                                                                            isShowColorCode: false,
                                                                            onChange:
                                                                                handleConfigData,
                                                                        }}
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 2,
                                                                    lg: 2,
                                                                    xl: 2,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <Select
                                                                        label="Prod. Attr. Alignment"
                                                                        name="productAttributeAlignment"
                                                                        options={
                                                                            optionsProductAttributeAlignment
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleConfigData(
                                                                                e,
                                                                                "productAttributeAlignment"
                                                                            )
                                                                        }
                                                                        value={
                                                                            productAttributeAlignment
                                                                        }
                                                                        disabled={
                                                                            disabledInputFields
                                                                        }
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 1,
                                                                    lg: 1,
                                                                    xl: 1,
                                                                }}
                                                            >
                                                                <FormLayout>
                                                                    <CustomColorInput
                                                                        settings={{
                                                                            label: "BG Color",
                                                                            defaultValue:
                                                                                productBackgroundColor,
                                                                            disabled:
                                                                                disabledInputFields,
                                                                            name: "productBackgroundColor",
                                                                            isShowColorCode: false,
                                                                            onChange:
                                                                                handleConfigData,
                                                                        }}
                                                                    />
                                                                </FormLayout>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 3,
                                                                    lg: 3,
                                                                    xl: 3,
                                                                }}
                                                            >
                                                                <div className="custom_form">
                                                                    <FormLayout>
                                                                        <CustomColorInput
                                                                            settings={{
                                                                                label: "Attr. Label",
                                                                                defaultValue:
                                                                                    productAttributeLabelColor,
                                                                                // disabled:
                                                                                //     productAttributeAlignment ===
                                                                                //     "line_by_line"
                                                                                //         ? false
                                                                                //         : true,
                                                                                name: "productAttributeLabelColor",
                                                                                isShowColorCode: false,
                                                                                onChange:
                                                                                    handleConfigData,
                                                                            }}
                                                                        />
                                                                    </FormLayout>
                                                                    <FormLayout>
                                                                        <CustomColorInput
                                                                            settings={{
                                                                                label: "Attr. Value",
                                                                                defaultValue:
                                                                                    productAttributeValueColor,
                                                                                // disabled:
                                                                                //     productAttributeAlignment ===
                                                                                //     "line_by_line"
                                                                                //         ? false
                                                                                //         : true,
                                                                                name: "productAttributeValueColor",
                                                                                isShowColorCode: false,
                                                                                onChange:
                                                                                    handleConfigData,
                                                                            }}
                                                                        />
                                                                    </FormLayout>
                                                                </div>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 12,
                                                                    sm: 12,
                                                                    md: 2,
                                                                    lg: 2,
                                                                    xl: 2,
                                                                }}
                                                            >
                                                                <div className="custom_form">
                                                                    <div>
                                                                        <label className="custom_lbl Polaris-Label__Text">
                                                                            Logo
                                                                        </label>
                                                                        <DropZone
                                                                            allowMultiple={
                                                                                false
                                                                            }
                                                                            disabled={
                                                                                disabledInputFields
                                                                            }
                                                                            onDrop={
                                                                                handleLogoDropZoneDrop
                                                                            }
                                                                            accept={
                                                                                validImageTypes
                                                                            }
                                                                            errorOverlayText="File type must be valid"
                                                                            variableHeight
                                                                        >
                                                                            {
                                                                                uploadedLogoFile
                                                                            }
                                                                            {
                                                                                fileUploadLogo
                                                                            }
                                                                        </DropZone>
                                                                    </div>
                                                                    <div>
                                                                        <label className="custom_lbl Polaris-Label__Text">
                                                                            Front
                                                                        </label>
                                                                        <DropZone
                                                                            allowMultiple={
                                                                                false
                                                                            }
                                                                            disabled={
                                                                                isAddFrontBack ===
                                                                                "false"
                                                                            }
                                                                            onDrop={
                                                                                handleFrontImageDropZoneDrop
                                                                            }
                                                                            accept={
                                                                                validImageTypes
                                                                            }
                                                                            errorOverlayText="File type must be valid"
                                                                            variableHeight
                                                                        >
                                                                            {
                                                                                uploadedFrontImageFile
                                                                            }
                                                                            {
                                                                                fileUploadFrontImage
                                                                            }
                                                                        </DropZone>
                                                                    </div>
                                                                    <div>
                                                                        <label className="custom_lbl Polaris-Label__Text">
                                                                            Back
                                                                        </label>
                                                                        <DropZone
                                                                            allowMultiple={
                                                                                false
                                                                            }
                                                                            disabled={
                                                                                isAddFrontBack ===
                                                                                "false"
                                                                            }
                                                                            onDrop={
                                                                                handleBackImageDropZoneDrop
                                                                            }
                                                                            accept={
                                                                                validImageTypes
                                                                            }
                                                                            errorOverlayText="File type must be valid"
                                                                            variableHeight
                                                                        >
                                                                            {
                                                                                uploadedBackImageFile
                                                                            }
                                                                            {
                                                                                fileUploadBackImage
                                                                            }
                                                                        </DropZone>
                                                                    </div>
                                                                </div>
                                                            </Grid.Cell>
                                                        </Grid>
                                                    </LegacyCard>
                                                </Grid.Cell>
                                                <Grid.Cell
                                                    columnSpan={{
                                                        xs: 12,
                                                        sm: 12,
                                                        md: 12,
                                                        lg: 12,
                                                        xl: 12,
                                                    }}
                                                >
                                                    <LegacyCard
                                                        title="Catalog PDF Preview"
                                                        sectioned
                                                    >
                                                        <p className="mb_10">
                                                            Customize the
                                                            product catalog and
                                                            see the results in
                                                            real-time before
                                                            generating a PDF.
                                                        </p>
                                                        <Suspense
                                                            fallback={
                                                                <Spinner
                                                                    accessibilityLabel="Small spinner example"
                                                                    size="large"
                                                                />
                                                            }
                                                        >
                                                            <PDFPreview
                                                                configData={
                                                                    configData
                                                                }
                                                                {...props}
                                                            />
                                                        </Suspense>
                                                    </LegacyCard>
                                                </Grid.Cell>
                                            </Grid>
                                        </div>
                                    )}
                                </Box>
                            </Tabs>
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>
        </div>
    );
};

export default Dashboard;
//Function component end.