<?php

    include "connection.php";
      
    $email = $_GET["email"];

    $sql = 'SELECT ID FROM utenti WHERE email="'.$email.'"';
    $result = $conn->query($sql);

    //controlla che la mail non esista nel database e che sia nel formato corretto
    //la mail esiste o non rispetta il formato - 1
    //la mail è disponibile e rispetta il formato - 0
    if ($result->num_rows > 0) {
        echo 1;
    } else {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo 1;
          }else{
              echo 0;
          }
    }
    $conn->close();
?>  