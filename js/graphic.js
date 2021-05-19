function addTableRow(b, flexbox){
        
    var item = document.createElement('div');
    item.className = "item";

    var flexboxLeft = document.createElement('div');
    flexboxLeft.className = "flexboxLeft";

    var flexboxRight = document.createElement('div');
    flexboxRight.className = "flexboxRight";
    
    var img = document.createElement('div');
    img.className = "img";

    var title = document.createElement('div');
    title.className = "title"; 
    var authorsYoP = document.createElement('div');
    authorsYoP.className = "authorsYoP";
    var desc = document.createElement('div');
    desc.className = "desc"; 
    var btns = document.createElement('div');
    btns.className = "btns";
    var saveBook = document.createElement('div');
    saveBook.className = "saveBook";

    var thumbnail = document.createElement("IMG");
    thumbnail.src = b.imgLink;
    var txtTitle = document.createElement("P");
    var langSpan = document.createElement("span");
    langSpan.className = "langSpan";
    langSpan.innerHTML = " [" + b.lang.toUpperCase() + "]";
    txtTitle.innerHTML = b.title ;
    txtTitle.appendChild(langSpan);

                
    var selfAnchorImg = document.createElement("A");
    selfAnchorImg.href = b.canonicalVolumeLink;
    selfAnchorImg.target = "_blank";

    var selfAnchorTitle = document.createElement("A");
    selfAnchorTitle.href = b.canonicalVolumeLink;
    selfAnchorTitle.target = "_blank";

    //autori e anno di pubblicazione
    var strA = "";

        for(var i=0; i < b.authors.length; i++){
            
            if(i==b.authors.length-1){
                strA += b.authors[i];
            }else{
                strA += b.authors[i] + ", ";
            }
        }

    txtAuthorsYoP = document.createElement("P");
    txtAuthorsYoP.innerHTML = strA + " · " + b.yearOfPub;

    var txtDesc = document.createElement("P");
    txtDesc.innerHTML = b.description;
    
    selfAnchorImg.appendChild(thumbnail);
    selfAnchorTitle.appendChild(txtTitle);

    img.appendChild(selfAnchorImg);
    title.appendChild(selfAnchorTitle);
    authorsYoP.appendChild(txtAuthorsYoP);
    desc.appendChild(txtDesc);

    flexboxLeft.appendChild(img)
    flexboxRight.appendChild(title);
    flexboxRight.appendChild(authorsYoP);
    flexboxRight.appendChild(desc);

        //download Pdf
    if(b.downloadPdfLink != ""){

        var downloadBtnPdf = document.createElement("A");
        downloadBtnPdf.className = "linkBtn";
        downloadBtnPdf.href = b.downloadPdfLink;
        downloadBtnPdf.target = "_blank";
        var pdfTxt = document.createElement("P");
        pdfTxt.innerHTML = "Download PDF: " + "<i class='fas fa-download'></i>";
        downloadBtnPdf.appendChild(pdfTxt);

        btns.appendChild(downloadBtnPdf);
    }

    //download Epub
    if(b.downloadEpubLink != ""){

        var downloadBtnEpub = document.createElement("A");
        downloadBtnEpub.className = "linkBtn";
        downloadBtnEpub.href = b.downloadEpubLink;
        downloadBtnEpub.target = "_blank";
        var ePubTxt = document.createElement("P");
        ePubTxt.innerHTML = "Download Epub: " + "<i class='fas fa-download'></i>";
        downloadBtnEpub.appendChild(ePubTxt);

        btns.appendChild(downloadBtnEpub); 
    }

    //web reader
    if(b.webReaderLink != ""){
        
        var webReaderBtn = document.createElement("A");
        webReaderBtn.className = "linkBtn";                
        webReaderBtn.href = b.webReaderLink;
        webReaderBtn.target = "_blank";   
        var wRText = document.createElement("P");
        wRText.innerHTML = "Leggi l'estratto: " + "<i class='fas fa-book-open'></i>";
        webReaderBtn.appendChild(wRText);

        btns.appendChild(webReaderBtn);
    }

    var addBtn = document.createElement("A");
    addBtn.innerHTML = "Salva nella libreria: <i class='fas fa-plus'></i>";
    addBtn.className = "addBtns";
    addBtn.onclick = function(){

        if(this.innerHTML == 'Salva nella libreria: <i class="fas fa-plus" aria-hidden="true"></i>'){     
            //aggiungi alla libreria
            checkSession(addBtn, b.id, b.ind_id, b.ind_id_type, b.title, b.description, b.lang, b.yearOfPub, b.publisher, b.viewability, b.maturityRating, b.canonicalVolumeLink, b.imgLink, b.downloadPdfLink, b.downloadEpubLink, b.webReaderLink, b.pageCount, b.authors, b.pageCount, b.categories);
        }else{
            //elimina dalla libreria
            this.innerHTML = 'Salva nella libreria: <i class="fas fa-plus" aria-hidden="true"></i>';
            deleteDB(b.id);
        }
    };

    btns.appendChild(addBtn);
    flexboxRight.appendChild(btns);

    item.appendChild(flexboxLeft);
    item.appendChild(flexboxRight);
    item.appendChild(saveBook);

    flexbox.appendChild(item);
}
    