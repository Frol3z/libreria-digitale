function liveSearch(str, startIndex) {

    //se l'indice supera il massimo numero di risultati non lo incremento
    if(startIndex > parseInt(document.getElementById("qLast").innerHTML)){
      return;
    }
  
    //ritornare in cima alla pagina quando si va avanti o indietro
    document.body.scrollTop = 0;

    //blocca l'invio dell'input di ricerca (cancelerebbe il testo inserito facendo risultare la ricerca nulla)
    window.addEventListener('keydown',function(e){
        if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
            if(e.target.nodeName=='INPUT'&&e.target.type=='text'){
                e.preventDefault();
                return false;}
            }
        },true);
    
    //ricavo il filtro di ricerca dal select-option
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

      //ricavo il filtro di ordinamento dal select-option
      var order = document.getElementById("order").value;

      switch(order) {
          case "ri":
            order = "relevance";
          break;
          case "re":
            order = "newest";
          break;      
        } 
      
      //ricavo il filtro di impaginazione dal select-option
      var maxResults = document.getElementById("maxResults").value;

    //inizializzazione GET request all'API in AJAX
    var xmlhttp = new XMLHttpRequest();
    
    //in caso la richiesta abbia un risultato positivo:
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        
          console.clear();
          //lettura file JSON in risposta
          var json = JSON.parse(this.responseText);

          //pulisco il div che contiene i libri precedenti
          var flexbox = document.getElementById('resultTable');
          flexbox.innerHTML = "";

          //imposto l'indice di partenza e il massimo numero di risultati
          document.getElementById('qFirst').innerHTML = startIndex;
          document.getElementById('qLast').innerHTML = json.totalItems;

          //stampa dell'URL di chiamata (DEBUG)
          //console.log("q=" + filter + str + "&orderBy=" + order + "&startIndex=" + startIndex + "&maxResults=" + maxResults);

          try {

              //converto ogni oggetto "item" del JSON in un oggetto JavaScript "Book"
              for(var i=0; i < json.items.length; i++){
                  
                  var b = new Book(json.items[i]);

                  //console.log(json.items[i]);

                  //funzione che gestisce la grafica (vedi graphic.js)
                  addTableRow(b, flexbox);
              }
          
            } catch (error) {

              //gestione degli errori
              //console.log(error);
              var errorText = document.createElement("p");
              var resultTable = document.getElementById("resultTable");
              errorText.style.textAlign = "center";
              errorText.style.color = "white";
              errorText.style.textShadow = "0px 1px 1px black";
              
              errorText.innerHTML = "Nessun risultato";

              resultTable.appendChild(errorText);
          }
        }
    }

    //chiamata API
    xmlhttp.open("GET","https://www.googleapis.com/books/v1/volumes?q=" + filter + str + "&orderBy=" + order + "&startIndex=" + startIndex + "&maxResults=" + maxResults, true);
    xmlhttp.send();
}