function liveSearch(str, startIndex) {

    if(startIndex > parseInt(document.getElementById("qLast").innerHTML)){
      return;
    }
  
    document.body.scrollTop = 0;

    window.addEventListener('keydown',function(e){
        if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
            if(e.target.nodeName=='INPUT'&&e.target.type=='text'){
                e.preventDefault();
                return false;}
            }
        },true);
    
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

      var order = document.getElementById("order").value;

      switch(order) {
          case "ri":
            order = "relevance";
          break;
          case "re":
            order = "newest";
          break;      
        } 
      
      var maxResults = document.getElementById("maxResults").value;

      

    //inizializzazione GET request all'API in AJAX
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        
          //lettura file JSON di risposta
          console.clear();
          var json = JSON.parse(this.responseText);

          var flexbox = document.getElementById('resultTable');
          flexbox.innerHTML = "";

          document.getElementById('qFirst').innerHTML = startIndex;
          document.getElementById('qLast').innerHTML = json.totalItems;
          console.log("q=" + filter + str + "&orderBy=" + order + "&startIndex=" + startIndex + "&maxResults=" + maxResults);

          try {

              for(var i=0; i < json.items.length; i++){
                  
                  var b = new Book(json.items[i]);

                  console.log(json.items[i]);
                  addTableRow(b, flexbox);
              }
          
            } catch (error) {
              console.log(error);
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

    xmlhttp.open("GET","livesearch.php?q=" + filter + str + "&orderBy=" + order + "&startIndex=" + startIndex + "&maxResults=" + maxResults, true);
    xmlhttp.send();
}