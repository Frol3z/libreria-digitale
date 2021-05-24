<?php

    if(!isset($_POST["id"])){
        header('Location: ../index.php');
    }

    include "connection.php";

    session_start();

    $id = $_POST["id"];
    $user_id = $_SESSION["id"];

    //in base ai valori passati in POST, aggiorno il database
    if(isset($_POST["readPage"])){

        $readPage = $_POST["readPage"];

        $sql = 'UPDATE librerie
                SET pagine_lette = '.$readPage.'
                WHERE ID_libro = "'.$id.'" AND ID_utente = '.$user_id.'';
    }

    if(isset($_POST["status"])){

        $status = $_POST["status"];

        $sql = 'UPDATE librerie
                SET stato = '.$status.'
                WHERE ID_libro = "'.$id.'" AND ID_utente = '.$user_id.'';
    }

    if(isset($_POST["startDate"])){

        $startDate = $_POST["startDate"];

        $sql = 'UPDATE librerie
                SET data_inizio = "'.$startDate.'"
                WHERE ID_libro = "'.$id.'" AND ID_utente = '.$user_id.'';
    }

    if(isset($_POST["finishDate"])){

        $finishDate = $_POST["finishDate"];

        $sql = 'UPDATE librerie
                SET data_fine = "'.$finishDate.'"
                WHERE ID_libro = "'.$id.'" AND ID_utente = '.$user_id.'';
    }

    if ($conn->query($sql) === TRUE) {
    //echo "Record removed successfully";
    } else {
    //echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>