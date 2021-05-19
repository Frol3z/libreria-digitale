<?php
    
    if(!isset($_POST["email"])){
        header('Location: ../index.php');
    }

    include "connection.php";

    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $email = $_POST["email"];
    $password = hash('sha256', $_POST["password"]);

    $sql = 'INSERT INTO utenti(nome, cognome, email, password) 
            VALUES ("'.$name.'","'.$surname.'","'.$email.'","'.$password.'")';

    if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    $last_id = $conn->insert_id;
    } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
    }

    session_start();
    $_SESSION["id"] = $last_id;

    header('Location: ../index.php');

    $conn->close();
?>