
  var pdfUrl = "";
  var pdfName = "";
  var flipstatus = "";
  var flipUrl = "";
  var designMode = "{{ request.design_mode}}";
  function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
  window.btnclick = 0;
}
loadScript('https://code.jquery.com/jquery-3.6.0.min.js', function () {
  if(designMode === 'true'){
  document.addEventListener("shopify:section:select", function(event) {
   
      loadData();
  });
  }else{
    loadData();
  }
 async function loadData(){
  try {
      // Make an asynchronous AJAX POST request to send data to the server
      const response = await fetch('https://pdf.meetanshi.work/api/pdfShow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionId:$('#pdf_collection_id').val(),
          shop:window.Shopify.shop
        }),
      });
     
      const data =  await response.json();
      const apiStatus = data.status;
       pdfUrl = data.pdfUrl;
       console.log(apiStatus);
      if (apiStatus == 'true') {
        console.log("if");
        pdfUrl = data.pdfUrl;
        pdfName = data.pdfName;
        flipstatus = data.flipstatus;
        flipUrl = data.flipUrl;
        $("#myButton").show();
      } else {
        if(designMode === 'true'){
          $("#myButton").show();
        }else{
          $("#myButton").hide();
        }
      
      }
    } catch (error) {
      console.log("error",error);
    }

    $("#myButton").click(function () {
      if(flipstatus == true){
          window.open(flipUrl, '_blank');
      }
      else if(designMode == 'false'){
      $('body').prepend('<div id="bodyloader"><img src="https://pdf.meetanshi.work/public/images/loading-gif.gif" height="50" width="50" /></div>');
      download()
      }
    });
    async function download() {
      const response = await fetch('https://pdf.meetanshi.work/api/downloadpdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionId:$('#pdf_collection_id').val(),
          shop: "{{ shop.domain }}"
        }),
      });
      const blob = await response.blob();
      $("#bodyloader").remove();

      //  $("#loader").hide();

      $("#labelText").show();

      // Now you can use the blob as needed, for example, creating a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = pdfName; // Set the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    }

  }
});