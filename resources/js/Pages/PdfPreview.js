import React, { useEffect } from "react";

const PdfPreview = () => {
    useEffect(() => {
        // Dynamically import the required scripts after the component mounts
        const loadScripts = () => {
            const scriptUrls = [
                "https://de19-103-56-183-234.ngrok-free.app/FlipPdfJs/jquerymin.js",
                "https://de19-103-56-183-234.ngrok-free.app/FlipPdfJs/dflip.min.js",
                "https://de19-103-56-183-234.ngrok-free.app/FlipPdfJs/pdf.min.js",
                "https://de19-103-56-183-234.ngrok-free.app/FlipPdfJs/pdfworker.min.js",
                "https://de19-103-56-183-234.ngrok-free.app/FlipPdfJs/three.min.js",
            ];

            scriptUrls.forEach((url) => {
                console.log("url ",url)
                const script = document.createElement("script");
                script.src = url;
                script.async = true;
                document.body.appendChild(script);
            });
        };

        loadScripts();

        return () => {
            // Cleanup any dynamically added scripts when the component is unmounted
            const scripts = document.querySelectorAll(
                'script[src^="https://de19-103-56-183-234.ngrok-free.app/pFlipPdfJs/"]'
            );
            // scripts.forEach((script) => script.remove());
        };
    }, []);

    return (
        <div>
            <div
                className="_df_book"
                id="flipbok_example"
                source="http://localhost:5000/pdf"
            ></div>
        </div>
    );
};

export default PdfPreview;
