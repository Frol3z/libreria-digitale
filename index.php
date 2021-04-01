<html>
<head>
    <script>
    function liveSearch(str) {
    
    
    if (str.length == 0) {
        document.getElementById("livesearch").innerHTML = "";
        return;
    }

    //inizializzazione GET request all'API in AJAX
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        
        //document.getElementById("livesearch").innerHTML = this.reponseText;
        
        //lettura file JSON di risposta
        console.clear();
        var json = JSON.parse(this.responseText);

            for(var i=0; i < json.items.length; i++){
                
                console.log(json.items[i]);

                try {
                    
                    //accessInfo object
                    var accessViewStatus = json.items[i].accessInfo.accessViewStatus;
                    var country = json.items[i].accessInfo.country;
                    var downloadEpubLink = json.items[i].accessInfo.epub.downloadLink; 
                    var acsTokenLink = json.items[i].accessInfo.epub.acsTokenLink; 
                    var downloadPdfLink = json.items[i].accessInfo.pdf.downloadLink;
                    var acsTokenLink = json.items[i].accessInfo.pdf.acsTokenLink;  
                    var publicDomain = json.items[i].accessInfo.publicDomain;
                    var webReaderLink = json.items[i].accessInfo.webReaderLink;
                    var viewability = json.items[i].accessInfo.viewability;
                    
                    //saleInfo object
                    var buyLink = json.items[i].saleInfo.buyLink;
                    var isEbook = json.items[i].saleInfo.isEbook;
                    var saleability = json.items[i].saleInfo.saleability;
                    var amount = json.items[i].saleInfo.listPrice.amount;
                    var currencyCode = json.items[i].saleInfo.listPrice.currencyCode;
                    
                    //searchInfo object
                    var textSnippet = json.items[i].searchInfo.textSnippet;

                    //volumeInfo object            
                    var authors = [];
                    for(var c=0; c < json.items[i].volumeInfo.authors.length; c++){
                        authors.push(json.items[i].volumeInfo.authors[c]);
                    }
                    var canonicalVolumeLink = json.items[i].volumeInfo.canonicalVolumeLink;
                    var categories = [];
                    for(var c=0; c < json.items[i].volumeInfo.categories.length; c++){
                        categories.push(json.items[i].volumeInfo.categories[c]);
                    }
                    var description = json.items[i].volumeInfo.description;
                    var imageLink = json.items[i].volumeInfo.imageLinks.thumbnail;
                    var isbn_13 = json.items[i].volumeInfo.industryIdentifiers[0].identifier;
                    var isbn_10 = json.items[i].volumeInfo.industryIdentifiers[1].identifier;
                    var language = json.items[i].volumeInfo.language;
                    var maturityRating = json.items[i].volumeInfo.maturityRating;
                    var publishedDate = json.items[i].volumeInfo.publishedDate;
                    var publisher = json.items[i].volumeInfo.publisher;
                    var title = json.items[i].volumeInfo.title;

                    var etag = json.items[i].etag;
                    var id = json.items[i].id;
                    var kind = json.items[i].kind;
                    var selfLink = json.items[i].selfLink;

                } catch (error) {

                }
 
            }
        }
    }
    xmlhttp.open("GET","livesearch.php?q=" + str,true);
    xmlhttp.send();
    }
    </script>
</head>
<body>

    <form>
        <input type="text" onkeyup="liveSearch(this.value)">
    </form>
    <p id="livesearch"></p>
</body>
</html>