import { PageFlip } from 'page-flip';
// import '../../../public/css/flip.css';

document.addEventListener('DOMContentLoaded', function () {

    const pageFlip = new PageFlip(
        document.getElementById("demoBookExample"),
        {
            width: 550, // base page width
            height: 733, // base page height

            size: "stretch",
            // set threshold values:
            minWidth: 315,
            maxWidth: 1000,
            minHeight: 420,
            maxHeight: 1350,

            maxShadowOpacity: 0.5, // Half shadow intensity
            showCover: true,
            mobileScrollSupport: false // disable content scrolling on mobile devices
        }
    );

    // load pages
    pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    document.querySelector(".page-total").innerText = pageFlip.getPageCount();
    document.querySelector(
        ".page-orientation"
    ).innerText = pageFlip.getOrientation();

    document.querySelector(".btn-prev").addEventListener("click", () => {
        pageFlip.flipPrev(); // Turn to the previous page (with animation)
    });

    document.querySelector(".btn-next").addEventListener("click", () => {
        pageFlip.flipNext(); // Turn to the next page (with animation)
    });

    // triggered by page turning
    pageFlip.on("flip", (e) => {
        document.querySelector(".page-current").innerText = e.data + 1;
    });

    // triggered when the state of the book changes
    pageFlip.on("changeState", (e) => {
        document.querySelector(".page-state").innerText = e.data;
    });

    // triggered when page orientation changes
    pageFlip.on("changeOrientation", (e) => {
        document.querySelector(".page-orientation").innerText = e.data;
    });
});

const PDFFlip = () => {
    return (
        <>
            <div>
                <button type="button" className="btn-prev">Previous page</button>
                [<span className="page-current">1</span> of <span className="page-total">-</span>]
                <button type="button" className="btn-next">Next page</button>
            </div>

            <div>
                State: <i className="page-state">read</i>, orientation: <i className="page-orientation">landscape</i>
            </div>

            <div className="container">
                <div className="flip-book" id="demoBookExample">
                    <div className="page page-cover page-cover-top" data-density="hard">
                        <div className="page-content">
                            <h2>BOOK TITLE</h2>
                        </div>
                    </div>
                    <div className="page">
                        <div className="page-content">
                            <h2 className="page-header">Page header 1</h2>
                            <div className="page-image" style={{ backgroundImage: "url(" + IMAGE_PREFIX + "/images/1.jpg)" }}></div>
                            <div className="page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.</div>
                            <div className="page-footer">2</div>
                        </div>
                    </div>
                    {/* <!-- PAGES .... --> */}
                    <div className="page">
                        <div className="page-content">
                            <h2 className="page-header">Page header - 15</h2>
                            <div className="page-image" style={{ backgroundImage: "url(" + IMAGE_PREFIX + "/images/7.jpg)" }}></div>
                            <div className="page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.</div>
                            <div className="page-footer">16</div>
                        </div>
                    </div>
                    <div className="page">
                        <div className="page-content">
                            <h2 className="page-header">Page header - 16</h2>
                            <div className="page-image" style={{ backgroundImage: "url(" + IMAGE_PREFIX + "/images/8.jpg)" }}></div>
                            <div className="page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.</div>
                            <div className="page-footer">17</div>
                        </div>
                    </div>
                    <div className="page page-cover page-cover-bottom" data-density="hard">
                        <div className="page-content">
                            <h2>THE END</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PDFFlip;