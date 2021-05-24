//inserimento nel database
function insertDB(addBtn, id, ind_id, ind_id_type, title, description, lang, yearOfPub, publisher, viewability, maturityRating, canonicalVolumeLink, imgLink, downloadPdfLink, downloadEpubLink, webReaderLink, pageCount, authors, pageCount, categories){  
  
  //normalizzazione di caratteri speciali che andrebbero in conflitto con l'URL della POST
  for(var i = 0; i<categories.length; i++){
    categories[i] = categories[i].replaceAll("&", "%26");
  }

  var categories = JSON.stringify(categories);

  for(var i = 0; i<authors.length; i++){
    authors[i] = authors[i].replaceAll("&", "%26");
  }

  var authors = JSON.stringify(authors);

  title = title.replaceAll("&", "%26");
  description = description.replaceAll("&", "%26");
  publisher = publisher.replaceAll("&", "%26");
  canonicalVolumeLink = canonicalVolumeLink.replaceAll("&", "%26");
  imgLink = imgLink.replaceAll("&", "%26");
  downloadPdfLink = downloadPdfLink.replaceAll("&", "%26");
  downloadEpubLink = downloadEpubLink.replaceAll("&", "%26");
  webReaderLink = webReaderLink.replaceAll("&", "%26");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this.responseText);
        if(this.responseText == "error"){
            addBtn.innerHTML = 'Già salvato (clicca per rimuovere): <i class="fas fa-minus" aria-hidden="true"></i>';
        }
    }
  };
  xhttp.open("POST", "db/insertbook.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id + "&ind_id=" + ind_id + "&ind_id_type=" + ind_id_type + "&title=" + title + "&description=" + description + "&lang=" + lang + "&yearOfPub=" + yearOfPub + "&publisher=" + publisher + "&viewability=" + viewability + "&maturityRating=" + maturityRating + "&canonicalVolumeLink=" + canonicalVolumeLink + "&imgLink=" + imgLink + "&downloadPdfLink=" + downloadPdfLink + "&downloadEpubLink=" + downloadEpubLink + "&webReaderLink=" + webReaderLink + "&pageCount=" + pageCount + "&authors=" + authors + "&pageCount=" + pageCount + "&categories=" + categories);
}

//eliminazione dal db
function deleteDB(id){

    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    }
  };
  xhttp.open("POST", "db/delete.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

//aggiornamento pagine lette
function updateReadPage(id, value){

    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    }
  };
  xhttp.open("POST", "db/updatebook.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id + "&readPage=" + value);
}

//aggiornamento stato di lettura
function updateStatus(id, value){

  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
  }
};
xhttp.open("POST", "db/updatebook.php", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("id=" + id + "&status=" + value);
}

//aggiornamento data di inizio
function updateStartDate(id, value){

  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
  }
};
xhttp.open("POST", "db/updatebook.php", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("id=" + id + "&startDate=" + value);
}

//aggiornamento data di fine
function updateFinishDate(id, value){

  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
  }
};
xhttp.open("POST", "db/updatebook.php", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("id=" + id + "&finishDate=" + value);
}

//controllo che l'utente sia registrato prima di inserire un libro
function checkSession(addBtn, id, ind_id, ind_id_type, title, description, lang, yearOfPub, publisher, viewability, maturityRating, canonicalVolumeLink, imgLink, downloadPdfLink, downloadEpubLink, webReaderLink, pageCount, authors, pageCount, categories){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(ret) {
      if (this.readyState == 4 && this.status == 200) {
        //se la funzione non esiste (false):
        if(this.responseText == false){

            //controllo che il popup non sia già mostrato a schermo
            if(document.getElementsByClassName("popUp").length == 0){
                var div = document.createElement("DIV");
                div.className = "popUp";
                var p = document.createElement("P");
                p.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Devi possedere un account per poter utilizzare questa funzione.<br>Creane uno nuovo o loggati se ne possiedi già uno.';
                var container = document.createElement("DIV");
                var reg = document.createElement("A");
                reg.href = "register.php";
                reg.appendChild(document.createTextNode("Registrazione"));
                
                var log = document.createElement("A");
                log.href = "login.php";
                log.appendChild(document.createTextNode("Login"));
    
                var close = document.createElement("A");
                close.id = "closePopUp";
                close.onclick = function() {
                    div.style.display = "none";
                    div.style.zIndex = "-5";
                  };
                var closeSymbol = document.createElement("P");
                closeSymbol.innerHTML = '<i class="fas fa-times"></i>';
                close.appendChild(closeSymbol);
                
                container.appendChild(reg);
                container.appendChild(log);
                div.appendChild(close);
                div.appendChild(document.createElement("BR"));
                div.appendChild(p);
                div.appendChild(document.createElement("BR"));
                div.appendChild(container);  
                document.getElementById("main").appendChild(div);
            }else{
                document.getElementsByClassName("popUp")[0].style.display = "block";
                document.getElementsByClassName("popUp")[0].style.zIndex = "2";
            }
        }else{
            insertDB(addBtn, id, ind_id, ind_id_type, title, description, lang, yearOfPub, publisher, viewability, maturityRating, canonicalVolumeLink, imgLink, downloadPdfLink, downloadEpubLink, webReaderLink, pageCount, authors, pageCount, categories);
            addBtn.innerHTML = 'Rimuovi dalla libreria: <i class="fas fa-minus" aria-hidden="true"></i>';
        }
      }
    };
    xhttp.open("GET", "db/session.php", true);
    xhttp.send();
}