var isLoading = false; // Prevent duplicate calls

var pdfUrl = "";
var pdfName = "";
var flipstatus = "";
var flipUrl = "";
var designMode = "{{ request.design_mode }}"; // This is a string

function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
    window.btnclick = 0;
}

loadScript('https://code.jquery.com/jquery-3.6.0.min.js', function () {
    if (designMode === "true") {
        document.addEventListener("shopify:section:select", function (event) {
            console.log("designmode", designMode);
            if (!isLoading) {
                isLoading = true;
                loadData().finally(() => (isLoading = false));
            }
        });
    } else {
        console.log("designmode else", designMode);
        if (!isLoading) {
            isLoading = true;
            loadData().finally(() => (isLoading = false));
        }
    }

    async function loadData() {
        try {
            console.log("Fetching PDF data..."); // Debugging line
            const response = await fetch('https://lara.meetanshi.work/livemeetpdfcatalog/api/pdfShow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    collectionId: $('#pdf_collection_id').val(),
                    shop: window.Shopify.shop
                }),
            });

            const data = await response.json();
            pdfUrl = data.pdfUrl;
            console.log("API Response:", data.status);

            if (data.status === "true") {
                let buttonContainer = document.getElementById("buttonContainer");
                let btnStyle = {
                    buttonLabel: buttonContainer.getAttribute("data-button-label"),
                    buttonWidth: buttonContainer.getAttribute("data-button-width"),
                    buttonPadding: buttonContainer.getAttribute("data-button-padding"),
                    buttonThickness: buttonContainer.getAttribute("data-button-thickness"),
                    cornerRadius: buttonContainer.getAttribute("data-corner-radius"),
                    bgColour: buttonContainer.getAttribute("data-bgcolour"),
                    fontColour: buttonContainer.getAttribute("data-fontcolour"),
                    borderColour: buttonContainer.getAttribute("data-bordercolour"),
                    fontSize: buttonContainer.getAttribute("data-font-size")
                    
                };

                data.data.forEach(settings => {
                    let button = document.createElement("button");
                    button.textContent = settings.catalog_name;
                    button.setAttribute("data-url", settings.flipUrl); 

                    button.style.cssText = `
                        width: ${btnStyle.buttonWidth}%;
                        padding: ${btnStyle.buttonPadding}px;
                        border-width: ${btnStyle.buttonThickness}px;
                        border-radius: ${btnStyle.cornerRadius}px;
                        background-color: ${btnStyle.bgColour};
                        color: ${btnStyle.fontColour};
                        border-color: ${btnStyle.borderColour};
                        font-size: ${btnStyle.fontSize}px;
                        border-style: solid;
                        margin: 10px; 
                    `;
                    button.addEventListener("click", function() {
                        if(settings.flipstatus){
                            let pdfUrl = this.getAttribute("data-url");
                            if (pdfUrl) {
                                window.open(pdfUrl, '_blank'); // Open PDF in a new tab
                            }
                        }else{
                              $('body').prepend('<div id="bodyloader"><img src="https://lara.meetanshi.work/livemeetpdfcatalog/public/images/loading-gif.gif" height="50" width="50" /></div>');
                              download(settings.catalog_name);
                        }
                        
                    });

                    buttonContainer.appendChild(button);
                });
            } else {
                if (designMode === "true") {
                    $("#myButton").show();
                } else {
                    $("#myButton").hide();
                }
            }
        } catch (error) {
            console.log("Error fetching PDF data:", error);
        }
    }

    $("#myButton").click(function () {
        if (flipstatus === true) {
            window.open(flipUrl, '_blank');
            //download();
        }
        if (designMode === "false" || flipstatus === false) {
            console.log("Starting download...");
            $('body').prepend('<div id="bodyloader"><img src="https://lara.meetanshi.work/livemeetpdfcatalog/public/images/loading-gif.gif" height="50" width="50" /></div>');
            download();
        }
    });

    async function download(catalog_name) {
        try {
            const response = await fetch('https://lara.meetanshi.work/livemeetpdfcatalog/api/downloadpdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    collectionId: catalog_name,
                    shop: window.Shopify.shop
                }),
            });

            const blob = await response.blob();
            $("#bodyloader").remove();
            $("#labelText").show();

            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = pdfName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.log("Error downloading PDF:", error);
        }
    }
});
