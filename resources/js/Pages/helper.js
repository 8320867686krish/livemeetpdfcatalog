import { format } from 'date-fns'
//Paper size object with Millimetres (w x h)
const paperSizeObj = {
    'letter': '216*279',
    'legal': '216*356',
    'tabloid': '279*432',
    'suber_b': '330*483',
    'a0': '841*1189',
    'a1': '594*841',
    'a2': '420*594',
    'a3': '297*420',
    'a4': '210*297',
    'a5': '148*210',
    'a6': '105*148',
    'a7': '74*105',
    'a8': '52*74',
    'a9': '37*52',
    'a10': '26*37',
    'b0': '1000*1414',
    'b1': '707*1000',
    'b2': '500*707',
    'b3': '353*500',
    'b4': '250*353',
    'b5': '176*250',
    'b6': '125*176',
    'b7': '88*125',
    'b8': '62*88',
    'b9': '44*62',
    'b10': '31*44',
    'c0': '917*1297',
    'c1': '648*917',
    'c2': '458*648',
    'c3': '324*458',
    'c4': '229*324',
    'c5': '162*229',
    'c6': '114*162',
    'c7': '81*114',
    'c8': '57*81',
    'c9': '40*57',
    'c10': '28*40'
}

//Default array option for Enabled/Disabled
export const optionsFontFamily = [
    { label: 'Roboto Condensed', value: 'Roboto Condensed', type: 'google' },
    { label: 'Sans Serif', value: 'sans-serif', type: 'google' },
    { label: 'Oswald', value: 'Oswald', type: 'google' },
    { label: 'Open Sans', value: 'Open Sans', type: 'google' },
    { label: 'Raleway', value: 'Raleway', type: 'google' },
    { label: 'Pacifico', value: 'Pacifico', type: 'google' },
    { label: 'Poppins', value: 'Poppins', type: 'google' }
];

//Default array option for Enabled/Disabled
export const optionsGeneralAlignment = [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' }
];

//Default array option for Enabled/Disabled
export const optionsPlan = [
    { label: 'Monthly', value: 1 },
    { label: 'Annually', value: 2 }
];

//Default array option for Enabled/Disabled
export const optionsEnabledDisabled = [
    { label: 'Enabled', value: 1 },
    { label: 'Disabled', value: 0 }
];

//Default array option for Yes/No
export const optionsYesNo = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' }
];

//Default array option for Cover Page Background.
export const optionsCoverPageBackGroup = [
    { label: 'Default', value: 'default', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Custom', value: 'custom', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'None', value: 'none', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
];

//Default array option for product sorting.
export const productSortingOptions = [
    { label: 'Position', value: 'position', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Product Name', value: 'name', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Price', value: 'price', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
];

//Default array option for product sort order.
export const optionsSortOrder = [
    { label: 'Ascending Order', value: 'asc', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: 'Descending Order', value: 'desc', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
];

//Default array option for product per page.
export const ProductPerPageOptions = [
    { label: '4 Products (2 Rows, 2 Columns)', value: '4', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: '6 Products (2 Rows, 3 Columns)', value: '6', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: '9 Products (3 Rows, 3 Columns)', value: '9', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { label: '12 Products (3 Rows, 4 Columns)', value: '12', helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
];

//Default array option for date format
export const optionsDateFormat = [
    { label: format(new Date(), 'y-M-d H:m:s'), value: 'y-M-d H:m:s' },
    { label: format(new Date(), 'yy-MM-dd H:m:s'), value: 'yy-MM-dd H:m:s' },
    { label: format(new Date(), 'dd-MM-yy'), value: 'dd-MM-yy' },
    { label: format(new Date(), 'yyyy-MM-dd'), value: 'yyyy-MM-dd' },
    { label: format(new Date(), 'do MMM y H:m:s'), value: 'do MMM y H:m:s' },
    { label: format(new Date(), 'do MMM y'), value: 'do MMM y' },
    { label: format(new Date(), 'y MMM do H:m:s'), value: 'y MMM do H:m:s' },
    { label: format(new Date(), 'y/M/d H:m:s'), value: 'y/M/d H:m:s' },
    { label: format(new Date(), 'yy/MM/dd H:m:s'), value: 'yy/MM/dd H:m:s' },
    { label: format(new Date(), 'dd/MM/yy'), value: 'dd/MM/yy' },
    { label: format(new Date(), 'yyyy/MM/dd'), value: 'yyyy/MM/dd' },
];

//Default array option for PDF Layout
export const optionsPDFLayout = [
    { label: 'Portrait (Vertical)', value: 'portrait' },
    // { label: 'Landscape (Horizontal)', value: 'landscape' }
];

//Default array option for Paper Layout
export const optionsPaperLayout = [
    { label: 'Letter', value: 'letter' },
    { label: 'Legal', value: 'legal' },
    /* { label: 'Tabloid', value: 'tabloid' },
    { label: 'Super B', value: 'suber_b' },
    { label: 'A0', value: 'a0' },
    { label: 'A1', value: 'a1' },
    { label: 'A2', value: 'a2' }, */
    { label: 'A3', value: 'a3' },
    { label: 'A4', value: 'a4' },
    { label: 'A5', value: 'a5' },
    /* { label: 'A6', value: 'a6' },
    { label: 'A7', value: 'a7' },
    { label: 'A8', value: 'a8' },
    { label: 'A9', value: 'a9' },
    { label: 'A10', value: 'a10' },
    { label: 'B0', value: 'b0' },
    { label: 'B1', value: 'b1' },
    { label: 'B2', value: 'b2' },
    { label: 'B3', value: 'b3' },
    { label: 'B4', value: 'b4' },
    { label: 'B5', value: 'b5' },
    { label: 'B6', value: 'b6' },
    { label: 'B7', value: 'b7' },
    { label: 'B8', value: 'b8' },
    { label: 'B9', value: 'b9' },
    { label: 'B10', value: 'b10' },
    { label: 'C0', value: 'c0' },
    { label: 'C1', value: 'c1' },
    { label: 'C2', value: 'c2' },
    { label: 'C3', value: 'c3' },
    { label: 'C4', value: 'c4' },
    { label: 'C5', value: 'c5' },
    { label: 'C6', value: 'c6' },
    { label: 'C7', value: 'c7' },
    { label: 'C8', value: 'c8' },
    { label: 'C9', value: 'c9' },
    { label: 'C10', value: 'c10' } */
];

//Handle to convert paper size...
export const convertPaperSize = (paperType = 'a4', paperOrientation = 'portrait') => {
    const size = paperSizeObj[paperType].split('*');
    let [width, height] = size;
    let convertHeight = 0;
    if (paperOrientation === 'landscape')
        [height, width] = size;

    if (paperSizeMeasurement === 'cm') {
        width = width / 10;
        height = (height / 10) + (paperOrientation === 'landscape' ? 8.67 : 4);
        convertHeight = height;
    } else if (paperSizeMeasurement === 'in') {
        width = width / 25.4;
        height = height / 25.4;
    }
    // console.log('paper size landscape:', size, width, height, width.toFixed(1), height.toFixed(1), paperSizeMeasurement);
    return {
        width: `${width.toFixed(1)}${paperSizeMeasurement}`,
        height: `${height.toFixed(1)}${paperSizeMeasurement}`,
        convertHeight: convertHeight
    }
}

export const optionsPriceAdjustment = [
    { label: 'None', value: '' },
    { label: 'Increment', value: '0' },
    { label: 'Decrement', value: '1' }
];

export const optionsForRedirectButton = [
    { label: 'Redirect to product page', value: '0' },
    { label: 'Redirect to online store', value: '1' },
    { label: 'Redirect to cart page', value: '2' },
    { label: 'Redirect to checkout page', value: '3' }
];


export const optionsForPrintQuality = [
    { label: 'Redirect to product page', value: '0' },
    { label: 'Redirect to online store', value: '1' },
    { label: 'Redirect to cart page', value: '2' },
    { label: 'Redirect to checkout page', value: '3' }
];

//Default array option for product sorting.
export const optionProductAttributes = [
    { label: 'Product Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'SKU', value: 'sku' },
    { label: 'Bar Code', value: 'barcode' },
    { label: 'Description', value: 'description' }
];

//Default array option for Product Attribute Alignment.
export const optionsProductAttributeAlignment = [
    { label: 'Center', value: 'center' },
    { label: 'Left', value: 'left' },
    { label: 'Line By Line', value: 'line_by_line' }
];

//Validate image types.
export const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

//Convert string to array.
export const convertStrToArr = (str, splitText = ',') => {
    return str.split(splitText)
}

//Convert array to string.
export const convertArrToStr = (arr, joinText = ',') => {
    return arr.join(joinText);
    // return arr.toString();
}

export const displayStringBaseOnLimit = (str = '', limit) => {
    if (str !== null && str.length > limit) {
        return str.substring(0, limit) + '...';
    }
    return str;
}


export const getProductAttribute = (isDisabledBarCode = "false") => {
    return (
        [
            { label: 'Product Name', value: 'name' },
            { label: 'Price', value: 'price' },
            { label: 'SKU', value: 'sku' },
            // { label: 'Bar Code', value: 'barcode', disabled: isDisabledBarCode === 'false' },
            { label: 'Description', value: 'description' },
            { label: 'Stock quantity', value: 'quantity' },
            { label: 'Weight', value: 'weight' },
            { label: 'Tag', value: 'tag' },
            { label: 'Vendor', value: 'vendor' },
            { label: 'Product type', value: 'type' },
            { label: 'Cost per item', value: 'costPerItem' },
        ]
    )
}

//Get the configuration data from the api.
export const fetchMethod = async (methodType = postMethodType, methodName, headers, request, contentType = "application/json") => {
    // console.log('fetchmethod :', methodType, methodName, headers, request)
    try {
        const requestData = {
            method: methodType
        };

        if (methodType === 'POST') {
            requestData.body = JSON.stringify(request)
        }

        if (headers !== '') {
            requestData.headers = {
                "Content-Type": contentType,
                token: btoa(headers),
            }
        }
        let requestUrl = "/" + API_PREFIX + methodName;
        console.log("api prefix ", API_PREFIX);
        console.log("methodName : ", methodName);
        if (['pdfCollections/get', 'collections/remove', 'collections/status'].includes(methodName) && window.location.hostname === 'lara.meetanshi.org') {
            requestUrl = 'https://lara.meetanshi.org/ReactMpdf/api/' + methodName;
        }
        console.log("requsted url ", requestUrl);
        const response = await fetch(
            requestUrl,
            requestData
        );
        if (!response.ok) {
            let error = '';
            // Check for server error (status code in the 500 range)
            // Handle 500 error
            if (response.status >= 500 && response.status < 600)
                error = 'Internal Server Error';
            else
                error = 'Error fetching data'; // Handle other errors (e.g., 404 Not Found)
            return {
                responseCode: 0,
                errorCode: 0,
                message: error
            };
        }

        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return {
            responseCode: 0,
            errorCode: 0,
            message: 'Network error'
        };
    }
}

//Create object to 2D array.
export const objectTo2DArray = (item, size) => {
    const result = [];

    for (let i = 0; i < item.length; i += size) {
        const chunk = item.slice(i, i + size).map((key) => key);
        result.push(chunk);
    }

    return result;
}

//Get specified object key of value from the array.
export const getSpecifiedKeyOfValueFromArray = (arr = [], key = '') => {
    return arr.map(pitem => pitem[key]);
}

export const getCurrentPDFPageSize = (productPageLayoutId, selectedProducts) => {
    let pageSize = selectedProducts.length;
    if (['twoItemGrid', 'twoItemList', 'twoItemLeftList', 'twoItemRightList'].indexOf(productPageLayoutId) > -1) {
        pageSize = Math.ceil(selectedProducts.length / 2);
    } else if (['threeItemGrid', 'threeItemGridReverse', 'threeItemList', 'threeItemLeftList', 'threeItemRightList'].indexOf(productPageLayoutId) > -1) {
        pageSize = Math.ceil(selectedProducts.length / 3);
    } else if (['fourItemGrid', 'fourItemList', 'fourItemLeftList', 'fourItemRightList'].indexOf(productPageLayoutId) > -1) {
        pageSize = Math.ceil(selectedProducts.length / 4);
    } else if (['fiveItemGrid', 'fiveItemList'].indexOf(productPageLayoutId) > -1) {
        pageSize = Math.ceil(selectedProducts.length / 5);
    } else if (['sixItemGrid', 'sixItemList'].indexOf(productPageLayoutId) > -1) {
        pageSize = Math.ceil(selectedProducts.length / 6);
    } else if (['eightItemGrid'].indexOf(productPageLayoutId) > -1) {
        pageSize = Math.ceil(selectedProducts.length / 8);
    } else if (['tenItemGrid'].indexOf(productPageLayoutId) > -1) {
        pageSize = Math.ceil(selectedProducts.length / 10);
    }
    return pageSize;
}

//Display price base on format...
export const formatPrice = (price = 0, placeholder = '') => {
    let formatPrice = Number(price);
    if (placeholder.includes('amount_no_decimals_with_comma_separator'))
        formatPrice = placeholder.replace('{{amount_no_decimals_with_comma_separator}}', formatPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    else if (placeholder.includes('amount_with_comma_separator'))
        formatPrice = placeholder.replace('{{amount_with_comma_separator}}', formatPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    else if (placeholder.includes('amount_no_decimals'))
        formatPrice = placeholder.replace('{{amount_no_decimals}}', formatPrice.toFixed(0));
    else if (placeholder.includes('amount'))
        formatPrice = placeholder.replace('{{amount}}', formatPrice.toFixed(2));

    return formatPrice;
}

//PDF automatic size calculation...
export const autoPDFSize = () => {
    return {
        //Start Letter PDF Preview Setting.....
        letter_oneItemGrid: { main: 1.07, sub: 0.2, isFrontImg: 0, extraFrontImg: 0.15 },
        letter_twoItemGrid: { main: 1.07, sub: 0.2, isFrontImg: 0, extraFrontImg: 0.15 },
        letter_twoItemList: { main: 1.07, sub: 0.2, isFrontImg: 0, extraFrontImg: 0.15 },
        letter_twoItemLeftList: { main: 1.07, sub: 0.2, isFrontImg: 0, extraFrontImg: 0.15 },
        letter_twoItemRightList: { main: 1.07, sub: 0.2, isFrontImg: 0, extraFrontImg: 0.15 },
        letter_threeItemGrid: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.11 },
        letter_threeItemGridReverse: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.11 },
        letter_threeItemList: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.12 },
        letter_threeItemLeftList: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.12 },
        letter_threeItemRightList: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.12 },
        letter_fourItemGrid: { main: 1.07, sub: 0.3, isFrontImg: 0, extraFrontImg: 0.1 },
        letter_fourItemList: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.11 },
        letter_fourItemLeftList: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.11 },
        letter_fourItemRightList: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.11 },
        letter_fiveItemGrid: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.12 },
        letter_fiveItemList: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.11 },
        letter_sixItemGrid: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.12 },
        letter_sixItemList: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.12 },
        letter_eightItemGrid: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.12 },
        letter_tenItemGrid: { main: 1.07, sub: 0.25, isFrontImg: 0, extraFrontImg: 0.12 },
        //Start Legal PDF Preview Setting.....
        legal_oneItemGrid: { main: 2.4, sub: 0.05, isFrontImg: 0, extraFrontImg: 0.15 },
        legal_twoItemGrid: { main: 2.28, sub: 0.15, isFrontImg: 0.5, extraFrontImg: 0.22 },
        legal_twoItemList: { main: 2.28, sub: 0.15, isFrontImg: 0.5, extraFrontImg: 0.22 },
        legal_twoItemLeftList: { main: 2.28, sub: 0.15, isFrontImg: 0.5, extraFrontImg: 0.22 },
        legal_twoItemRightList: { main: 2.28, sub: 0.15, isFrontImg: 0.5, extraFrontImg: 0.22 },
        legal_threeItemGrid: { main: 2.34, sub: 0.15, isFrontImg: 0.5, extraFrontImg: 0.2 },
        legal_threeItemGridReverse: { main: 2.34, sub: 0.15, isFrontImg: 0.5, extraFrontImg: 0.17 },
        legal_threeItemList: { main: 2.4, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.12 },
        legal_threeItemLeftList: { main: 2.4, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.12 },
        legal_threeItemRightList: { main: 2.4, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.12 },
        legal_fourItemGrid: { main: 2.4, sub: 0.05, isFrontImg: 0.2, extraFrontImg: 0.1 },
        legal_fourItemList: { main: 2.4, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.12 },
        legal_fourItemLeftList: { main: 2.4, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.12 },
        legal_fourItemRightList: { main: 2.4, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.12 },
        legal_fiveItemGrid: { main: 2.3, sub: 0.15, isFrontImg: 0.5, extraFrontImg: 0.2 },
        legal_fiveItemList: { main: 2.3, sub: 0.15, isFrontImg: 0.5, extraFrontImg: 0.15 },
        legal_sixItemGrid: { main: 2.4, sub: 0.05, isFrontImg: 0.2, extraFrontImg: 0.1 },
        legal_sixItemList: { main: 2.4, sub: 0.15, isFrontImg: 0.3, extraFrontImg: 0.12 },
        legal_eightItemGrid: { main: 2.4, sub: 0.15, isFrontImg: 0.3, extraFrontImg: 0.12 },
        legal_tenItemGrid: { main: 2.4, sub: 0.15, isFrontImg: 0.3, extraFrontImg: 0.12 },
        //Start A4 PDF Preview Setting.....
        a4_oneItemGrid: { main: 2.3, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.2 },
        a4_twoItemGrid: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_twoItemList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_twoItemLeftList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_twoItemRightList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_threeItemGrid: { main: 2.3, sub: 0.05, isFrontImg: 0.2, extraFrontImg: 0.15 },
        a4_threeItemGridReverse: { main: 2.3, sub: 0.05, isFrontImg: 0.2, extraFrontImg: 0.15 },
        a4_fourItemGrid: { main: 2.3, sub: 0.05, isFrontImg: 0.2, extraFrontImg: 0.15 },
        a4_threeItemList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_threeItemLeftList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_threeItemRightList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_fourItemList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_fourItemLeftList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_fourItemRightList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.2 },
        a4_fiveItemGrid: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.15 },
        a4_fiveItemList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.15 },
        a4_sixItemGrid: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.15 },
        a4_sixItemList: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.15 },
        a4_eightItemGrid: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.15 },
        a4_tenItemGrid: { main: 2.3, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.15 },
        //Start A3 PDF Preview Setting.....
        a3_oneItemGrid: { main: -10, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.15 },
        a3_twoItemGrid: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.17 },
        a3_twoItemList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_twoItemLeftList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_twoItemRightList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_threeItemGrid: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_threeItemGridReverse: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_fourItemGrid: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_threeItemList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_threeItemLeftList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_threeItemRightList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_fourItemList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_fourItemLeftList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_fourItemRightList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_fiveItemGrid: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_fiveItemList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_sixItemGrid: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_sixItemList: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_eightItemGrid: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        a3_tenItemGrid: { main: -10, sub: 0.05, isFrontImg: 0.3, extraFrontImg: 0.16 },
        //Start A5 PDF Preview Setting.....
        a5_oneItemGrid: { main: 11, sub: 0.7, isFrontImg: 0.5, extraFrontImg: 0.3 },
        a5_twoItemGrid: { main: 11, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.3 },
        a5_twoItemList: { main: 11, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.3 },
        a5_twoItemLeftList: { main: 11, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.3 },
        a5_twoItemRightList: { main: 11, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.3 },
        a5_threeItemGrid: { main: 11.12, sub: 0, isFrontImg: 0.5, extraFrontImg: 0.14 },
        a5_threeItemGridReverse: { main: 11.12, sub: 0, isFrontImg: 0.5, extraFrontImg: 0.14 },
        a5_fourItemGrid: { main: 11.12, sub: 0, isFrontImg: 0.5, extraFrontImg: 0.14 },
        a5_threeItemList: { main: 11.12, sub: 0, isFrontImg: 0.5, extraFrontImg: 0.14 },
        a5_threeItemLeftList: { main: 11.12, sub: 0, isFrontImg: 0.5, extraFrontImg: 0.14 },
        a5_threeItemRightList: { main: 11.12, sub: 0, isFrontImg: 0.5, extraFrontImg: 0.14 },
        a5_fourItemList: { main: 11.12, sub: 0, isFrontImg: 0.5, extraFrontImg: 0.15 },
        a5_fourItemLeftList: { main: 11.12, sub: 0, isFrontImg: 0.5, extraFrontImg: 0.15 },
        a5_fourItemRightList: { main: 11.12, sub: 0, isFrontImg: 0.5, extraFrontImg: 0.15 },
        a5_fiveItemGrid: { main: 11.08, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.16 },
        a5_fiveItemList: { main: 11.08, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.16 },
        a5_sixItemGrid: { main: 11.08, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.14 },
        a5_sixItemList: { main: 11.08, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.14 },
        a5_eightItemGrid: { main: 11.08, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.14 },
        a5_tenItemGrid: { main: 11.08, sub: 0.05, isFrontImg: 0.5, extraFrontImg: 0.14 },
    }
}