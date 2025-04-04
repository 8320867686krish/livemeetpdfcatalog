//window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

//window.API_PREFIX = 'api/';
 window.API_PREFIX = 'livemeetpdfcatalog/api/';

//window.URL_PREFIX = '/';
  window.URL_PREFIX = '/livemeetpdfcatalog/';//staging

  //window.IMAGE_PREFIX = `${window.location.origin}/`;
    window.IMAGE_PREFIX = `${window.location.origin}/livemeetpdfcatalog/public/`;







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

  window.shopifyApiKey = 'e303b553ce803b8110423472a72abab8';
//window.shopifyApiKey = 'a9d802912175e6e9468ba898af4a3416';
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