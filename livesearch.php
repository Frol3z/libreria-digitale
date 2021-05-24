<?php
//si prendono i parametri dalla GET (vedi livesearch.js)
$maxResults = $_GET["maxResults"];
$startIndex = $_GET["startIndex"];
$orderBy = $_GET["orderBy"];
$q = $_GET["q"];
//si assembla l'URL a cui effettuare la chiamata
$url = "https://www.googleapis.com/books/v1/volumes?q=" . $q . "&orderBy=". $orderBy . "&startIndex=" . $startIndex. "&maxResults=" . $maxResults;

//si rimpiazzano eventuali spazi
$rep = " ";
$url = str_replace($rep, "%", $url);

if (strlen($q) > 0) {
    //chiamata la funzione che effettuerà la chiamata a cui passeremo l'URL
    $response = CallAPI($url);
}

echo $response;

function CallAPI($url)
{
    //inseriamo nella variabile response il file JSON contenuto all'indirizzo inserito
    $response = file_get_contents($url);
    return $response;
}

?>