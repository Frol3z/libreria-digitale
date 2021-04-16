<?php
$startIndex = $_GET["startIndex"];
$q = $_GET["q"];
$url = "https://www.googleapis.com/books/v1/volumes?q=" . $q . "&orderBy=relevance&startIndex=". $startIndex;

$rep = " ";
$url = str_replace($rep, "%", $url);

if (strlen($q) > 0) {
    $response = CallAPI($url);
}

echo $response;

function CallAPI($url)
{
    $response = file_get_contents($url);
    return $response;
}

?>