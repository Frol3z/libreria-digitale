class Book {
    
    id;
    ind_id;
    ind_id_type;
    title;
    description;
    lang;
    yearOfPub;
    publisher;
    viewability;
    maturityRating;
    canonicalVolumeLink;
    imgLink;
    downloadPdfLink;
    downloadEpubLink;
    webReaderLink;    
    
    pageCount;
    
    authors = [];
    categories = []

    constructor(book) {

        //id
        this.id = book.id;

        //industry identifier
        this.ind_id = "Sconosciuto";
        this.ind_id_type = "Sconosciuto";
        
        if(book.volumeInfo.hasOwnProperty("industryIdentifiers")){        
                
            this.ind_id = book.volumeInfo.industryIdentifiers[0]["identifier"];
            this.ind_id_type = book.volumeInfo.industryIdentifiers[0]["type"];
        
        }

        //titolo
        this.title = book.volumeInfo.title;
        
        //descrizione (se disponibile)
        this.description = "";
        if(book.volumeInfo.hasOwnProperty("description")){
            this.description = book.volumeInfo.description;
        }

        //lingua
        this.lang = "";
        if(book.volumeInfo.hasOwnProperty("language")){
            this.lang = book.volumeInfo.language;
        }

        //editore
        this.publisher = "";
        if(book.volumeInfo.hasOwnProperty("publisher")){
            this.publisher = book.volumeInfo.publisher;
        }      

        //anno di pubblicazione (se disponibile)
        var date = new Date(book.volumeInfo.publishedDate);
        this.yearOfPub = "XXXX";          
        if(date.getFullYear()){
            this.yearOfPub = date.getFullYear();
        }

        //maturity rating
        this.maturityRating = "";
        if(book.volumeInfo.hasOwnProperty("maturityRating")){
            this.maturityRating = book.volumeInfo.maturityRating;
        }         

        //page count
        this.pageCount = "0";
        if(book.volumeInfo.hasOwnProperty("pageCount")){
            this.pageCount = book.volumeInfo.pageCount;
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

        if(book.volumeInfo.hasOwnProperty("categories")){

            for(var i=0; i < book.volumeInfo.categories.length; i++){
                this.categories.push(book.volumeInfo.categories[i]);
            }
        } else{
            this.categories.push("Sconosciuto");
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