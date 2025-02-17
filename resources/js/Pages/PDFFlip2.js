import React, { useState } from 'react';
// import '../../../public/css/flip2.css';

function PDFFlip() {
    return (
        <div className="pdf-container">
            <div className="source-link">
                <a className="show-source" data="simple-tag-pdf">Show source code</a>
            </div>

            <div className="sample-container"></div>
            {/* <div className="flip-book-container" src="https://3dflipbook.net/books/gallery/Food/Catalago-Natal-22.pdf"></div> */}

            {/* <div className="sample-container-box">
                <div className="sample-container flip-book-container" src="https://3dflipbook.net/books/gallery/Food/Catalago-Natal-22.pdf">

                </div>
            </div> */}



            <script src={`${IMAGE_PREFIX}/js/jquery.min.js`}></script>
            <script type="text/javascript">
                $('.sample-container').FlipBook({{ pdf: 'https://3dflipbook.net/books/gallery/Food/Catalago-Natal-22.pdf' }});
            </script>
            <script src={`${IMAGE_PREFIX}/js/three.min.js`}></script>
            <script src={`${IMAGE_PREFIX}/js/pdf.min.js`}></script>
            <script src={`${IMAGE_PREFIX}/js/3dflipbook.min.js`}></script>
        </div>
    );
}

export default PDFFlip;