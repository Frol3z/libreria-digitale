<?php
    
    if(!isset($_POST["email"])){
        header('Location: ../index.php');
    }

    include "connection.php";

    //controllo se esiste una corrispondenza
    $sql = 'SELECT id FROM utenti WHERE email = "'.$_POST["email"].'" AND password = "'.hash('sha256', $_POST["password"]).'"';
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        //se esiste avvio la sessione e reindirizzo all'index
        session_start();
        $row = $result -> fetch_assoc();
        $_SESSION["id"] = $row["id"];
        header('Location: ../index.php');
    } else {
        //se non esiste setto un cookie per la visualizzazione del messaggio di errore e lo reindirizzo al login
        $cookie_name = "successful";
        $cookie_value = "false";
        setcookie($cookie_name, $cookie_value, time() + 5, "/");
        header('Location: ../login.php');
    }

    $conn->close();
?>