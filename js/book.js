class Book {
    
    title;
    description;
    yearOfPub;
    authors = [];
    canonicalVolumeLink;
    webReaderLink;
    viewability;
    imgLink;

    constructor(book) {

        /*
            //accessInfo object
            var accessViewStatus = json.items[i].accessInfo.accessViewStatus;
            var country = json.items[i].accessInfo.country;
            var publicDomain = json.items[i].accessInfo.publicDomain;
                            
            //saleInfo object
            var buyLink = json.items[i].saleInfo.buyLink;
            var saleability = json.items[i].saleInfo.saleability;
            var amount = json.items[i].saleInfo.listPrice.amount;
            var currencyCode = json.items[i].saleInfo.listPrice.currencyCode; 
                            
            //searchInfo object
            var textSnippet = json.items[i].searchInfo.textSnippet;

            //volumeInfo object            
            var categories = [];
                for(var c=0; c < json.items[i].volumeInfo.categories.length; c++){
                    categories.push(json.items[i].volumeInfo.categories[c]);
                }
            var isbn_13 = json.items[i].volumeInfo.industryIdentifiers[0].identifier;
            var isbn_10 = json.items[i].volumeInfo.industryIdentifiers[1].identifier;
            var language = json.items[i].volumeInfo.language;
            var maturityRating = json.items[i].volumeInfo.maturityRating;
            var publisher = json.items[i].volumeInfo.publisher;

            var etag = json.items[i].etag;
            var id = json.items[i].id;
            var kind = json.items[i].kind;
            var selfLink = json.items[i].selfLink;
        */

        //titolo
        this.title = book.volumeInfo.title;
        
        //descrizione (se disponibile)
        this.description = "";
        if(book.volumeInfo.hasOwnProperty("description")){
            this.description = book.volumeInfo.description;
        }

        //anno di pubblicazione (se disponibile)
        var date = new Date(book.volumeInfo.publishedDate);
        this.yearOfPub = "XXXX";          
        if(date.getFullYear()){
            this.yearOfPub = date.getFullYear();
        }

        //autore (se disponibile)
        //può comprendere più autori
        if(book.volumeInfo.hasOwnProperty("authors")){

            for(var i=0; i < book.volumeInfo.authors.length; i++){
                this.authors.push(book.volumeInfo.authors[i]);
            }
        } else{
            this.authors.push("Sconosciuto");
        }

        //link per informazioni sul libro (Google Books)
        this.canonicalVolumeLink = book.volumeInfo.canonicalVolumeLink;

        //link download Epub (se disponibile)
        //2 tipologie: ACSM e Epub
        this.downloadEpubLink = "";

        if(book.accessInfo.epub.isAvailable){
            
            if(book.accessInfo.epub.hasOwnProperty("downloadLink")){
            
                this.downloadEpubLink = book.accessInfo.epub.downloadLink;
            }

            if(book.accessInfo.epub.hasOwnProperty("acsTokenLink")){
                
                this.downloadEpubLink = book.accessInfo.epub.acsTokenLink;
            }
        }

        //link download Pdf (se disponibile)
        //2 tipologie: ACSM e Pdf
        this.downloadPdfLink = "";

        if(book.accessInfo.pdf.isAvailable){

            if(book.accessInfo.epub.hasOwnProperty("downloadLink")){
            
                this.downloadPdfLink = book.accessInfo.pdf.downloadLink;
            }

            if(book.accessInfo.epub.hasOwnProperty("acsTokenLink")){
                
                this.downloadPdfLink = book.accessInfo.pdf.acsTokenLink;
            }
        }

        //link web reader (se disponibile)
        //viewability = estratto (PARTIAL) o libro gratuito (ALL_PAGES)
        this.webReaderLink = ""; 
        this.viewability = "";

        if(book.saleInfo.isEbook){
        
            switch(book.accessInfo.viewability) {
                case "PARTIAL":
                    this.webReaderLink = book.accessInfo.webReaderLink; 
                    this.viewability = book.accessInfo.viewability;
                break;
                case "ALL_PAGES":
                    this.webReaderLink = book.accessInfo.webReaderLink; 
                    this.viewability = book.accessInfo.viewability;
                break;   
            }
        }

        //thumbnail link (se disponibile)
        this.imgLink = "https://i.ibb.co/6wD5pWM/Capture.png";
                    
        if(book.volumeInfo.hasOwnProperty("imageLinks")){
            this.imgLink = book.volumeInfo.imageLinks.thumbnail;
        }
    }
  }
