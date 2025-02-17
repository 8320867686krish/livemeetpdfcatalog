//window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.API_PREFIX = 'api/';
window.URL_PREFIX = '/';
// window.URL_PREFIX = '/pdfcatalog/';//staging


window.IMAGE_PREFIX = `${window.location.origin}/public/`;
// window.IMAGE_PREFIX = `${window.location.origin}/pdfcatalog/public/`; //for staging




//PDF Catalog Settings.
window.pdfPreviewZoom = 1; //zoom size will between 0 to 1. 1 means 100%.
window.pdfBackgroundImgSize = 'cover'; //contain, cover
window.paperSizeMeasurement = 'cm'; // "Measurement values availabel cm, mm, in"
window.barcodeRotation = ''; //"default = normal, left, right, invert".
window.barcodePosition = ''; //"top-left, top-right, bottom-left, default = bottom-right".
window.postMethodType = 'POST';
window.getMethodType = 'GET';
window.putMethodType = 'PUT';
window.deleteMethodType = 'DELETE';
window.shopifyApiKey = '5b7fd5bcc773fe3efc10fdc89ce5e8e6';
// window.shopifyApiKey = '67c6b06a5ed3454e8ce7ef18faed64ee';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
