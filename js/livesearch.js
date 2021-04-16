function liveSearch(str, startIndex) {
    
    var filter = document.getElementById("filter").value;

    switch(filter) {
        case "t":
          filter = "intitle:";
        break;
        case "a":
          filter = "inauthor:";
        break;
        case "e":
          filter = "inpublisher:";
        break;
        case "i":
          filter = "isbn:";
        break;        
      }

    //inizializzazione GET request all'API in AJAX
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        
        //lettura file JSON di risposta
        console.clear();
        var json = JSON.parse(this.responseText);

        var table = document.getElementById('resultTable');
        table.innerHTML = "";

        document.getElementById('q').innerHTML = startIndex;

            for(var i=0; i < json.items.length; i++){
                
                var b = new Book(json.items[i]);

                console.log(b);

                try {
                
                    var title = b.title;
                    var description = b.description;
                    var yearOfPub = b.yearOfPub;
                    var authors = b.authors;
                    var canonicalVolumeLink = b.canonicalVolumeLink;
                    var downloadEpubLink = b.downloadEpubLink;
                    var downloadPdfLink = b.downloadPdfLink;
                    var webReaderLink = b.webReaderLink; 
                    var viewability = b.viewability;
                    var imgLink = b.imgLink;  

                    addTableRow(table, title, description, authors, yearOfPub, canonicalVolumeLink, imgLink, downloadPdfLink, downloadEpubLink, webReaderLink);

                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    xmlhttp.open("GET","livesearch.php?q=" + filter + str + "&startIndex=" + startIndex, true);
    xmlhttp.send();
}


function addTableRow(table, title, description, authors, yearOfPub, canonicalVolumeLink, imgLink, downloadPdfLink, downloadEpubLink, webReaderLink){
        
    var tr1 = document.createElement('tr');
    var tr2 = document.createElement('tr');
    var tr3 = document.createElement('tr');    

    var tdTitle = document.createElement('td');
    var tdBtns = document.createElement('td');
    var tdAuthorYop = document.createElement('td');
    var tdDesc = document.createElement('td');
    var tdImg = document.createElement('td');

    tdTitle.className = "title";
    tdAuthorYop.className = "authorYop";
    tdDesc.className = "desc";
    
    var divTitle = document.createElement("div");
    var divAuthorYop = document.createElement("div");
    var divDesc = document.createElement("div");
           
    divTitle.className = "divTitle";
    divAuthorYop.className = "divAuthorYop";
    divDesc.className = "divDesc";

    //rowspan = numero di righe
    tdImg.rowSpan = "3";

    tdAuthorYop.colSpan = "2";
    tdDesc.colSpan = "2";

    var txtTitle = document.createTextNode(title);
    var txtDesc = document.createTextNode(description); 

    var img = document.createElement("IMG");
    img.src = imgLink;
                    
    var selfAnchorTitle = document.createElement("A");
    selfAnchorTitle.href = canonicalVolumeLink;
    selfAnchorTitle.target = "_blank";
    var selfAnchorImg = document.createElement("A");
    selfAnchorImg.href = canonicalVolumeLink;
    selfAnchorImg.target = "_blank";

    //autori e anno di pubblicazione
    var txtAuthorYop = "";

        for(var i=0; i < authors.length; i++){
            
            if(i==authors.length-1){
                txtAuthorYop += authors[i];
            }else{
                txtAuthorYop += authors[i] + ", ";
            }
        }

    var txtAuthorYop = document.createTextNode(txtAuthorYop + " · " + yearOfPub);

    //download Pdf
    if(downloadPdfLink != ""){

        var downloadBtnPdf = document.createElement("A");
        downloadBtnPdf.className = "linkBtn";
        downloadBtnPdf.href = downloadPdfLink;
        downloadBtnPdf.target = "_blank";
        downloadBtnPdf.innerHTML = "P";
        
        tdBtns.appendChild(downloadBtnPdf);
    }

    //download Epub
    if(downloadEpubLink != ""){

        var downloadBtnEpub = document.createElement("A");
        downloadBtnEpub.className = "linkBtn";
        downloadBtnEpub.href = downloadEpubLink;
        downloadBtnEpub.target = "_blank";
        downloadBtnEpub.innerHTML = "E";

        tdBtns.appendChild(downloadBtnEpub); 
    }

    //web reader
    if(webReaderLink != ""){
        
        var webReaderBtn = document.createElement("A");
        webReaderBtn.className = "linkBtn";                
        webReaderBtn.href = webReaderLink;
        webReaderBtn.target = "_blank";
        webReaderBtn.innerHTML = "R";

        tdBtns.appendChild(webReaderBtn); 
    }

    selfAnchorTitle.appendChild(txtTitle);
    selfAnchorImg.appendChild(img);

    divTitle.appendChild(selfAnchorTitle);
    divAuthorYop.appendChild(txtAuthorYop);
    divDesc.appendChild(txtDesc);

    tdImg.appendChild(selfAnchorImg);
    tdTitle.appendChild(divTitle); 
    tdAuthorYop.appendChild(divAuthorYop);  
    tdDesc.appendChild(divDesc);              
                    
    tr1.appendChild(tdImg);
    tr1.appendChild(tdTitle);
    tr1.appendChild(tdBtns);
    tr2.appendChild(tdAuthorYop);
    tr3.appendChild(tdDesc);

    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);                            
}