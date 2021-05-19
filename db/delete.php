<?php

    if(!isset($_POST["id"])){
        header('Location: ../index.php');
    }

    include "connection.php";

    session_start();

    $id = $_POST["id"];
    $user_id = $_SESSION["id"];

    $sql = "DELETE FROM librerie WHERE ID_libro = '" .$id. "' AND ID_utente = ".$user_id;

    if ($conn->query($sql) === TRUE) {
    //echo "Record removed successfully";
    } else {
    //echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>