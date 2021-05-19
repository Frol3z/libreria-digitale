<?php
    
    if(!isset($_POST["id"])){
        header('Location: ../index.php');
    }

    include "connection.php";

    session_start();

    $user_id = $_SESSION["id"];

    $id = $_POST["id"];
    $ind_id = $_POST["ind_id"];
    $ind_id_type = $_POST["ind_id_type"];
    $title = str_replace('"',"\\\"",$_POST["title"]); $title = str_replace("'","\'",$title);
    $description = str_replace('"',"\\\"",$_POST["description"]); $description = str_replace("'","\'",$description);
    $lang = strtoupper($_POST["lang"]);
    $yearOfPub = $_POST["yearOfPub"];
    $publisher = str_replace('"',"\\\"",$_POST["publisher"]); $publisher = str_replace("'","\'",$publisher);
    $viewability = $_POST["viewability"];
    $maturityRating = $_POST["maturityRating"];
    $canonicalVolumeLink = $_POST["canonicalVolumeLink"];
    $imgLink = $_POST["imgLink"];
    $downloadPdfLink = $_POST["downloadPdfLink"];
    $downloadEpubLink = $_POST["downloadEpubLink"];
    $webReaderLink = $_POST["webReaderLink"];
    
    $authors = json_decode($_POST["authors"]);

    for($i = 0; $i < sizeof($authors); $i++){
        $authors[$i] = str_replace('"',"\\\"",$authors[$i]); $authors[$i] = str_replace("'","\'",$authors[$i]);
    }

    $categories = json_decode($_POST["categories"]);

    for($i = 0; $i < sizeof($categories); $i++){
        $categories[$i] = str_replace('"',"\\\"",$categories[$i]); $categories[$i] = str_replace("'","\'",$categories[$i]);
    }

    $pageCount = $_POST["pageCount"];
    $readPage = 0;
    $startDate = date("Y-m-d");
    $finishDate = "00000000";

    $sql = "INSERT INTO libri(ID, industrial_ID, industrial_ID_type, titolo, descrizione, lingue, anno_pubblicazione, editore, viewability, maturity_rating, link, img_link, download_link_pdf, download_link_epub, web_reader_link) 
            VALUES (\"".$id."\",\"".$ind_id."\",\"".$ind_id_type."\",\"".$title."\",\"".$description."\",\"".$lang."\",\"".$yearOfPub."\",\"".$publisher."\",\"".$viewability."\",\"".$maturityRating."\",\"".$canonicalVolumeLink."\",\"".$imgLink."\",\"".$downloadPdfLink."\",\"".$downloadEpubLink."\",\"".$webReaderLink."\");";

    if ($conn->query($sql) === TRUE) {
        //autori;
        for($i=0;$i<sizeof($authors);$i++){

            $check = "SELECT ID FROM autori WHERE nome = '".$authors[$i]."';";
            $result = $conn->query($check);

            if ($result->num_rows > 0) {
                //insert libri_autori
                while($row = $result->fetch_assoc()) {

                    $insert = "INSERT INTO libri_autori(ID_libro, ID_autore) VALUES ('".$id."',".$row["ID"].")";
                    $conn->query($insert);
                  }
            } else {
                //insert autori e libri_autori
                $insert = "INSERT INTO autori(nome) VALUES ('".$authors[$i]."');";

                if ($conn->query($insert) === TRUE) {
                    $last_id = $conn->insert_id;
                    $insert2 = "INSERT INTO libri_autori(ID_libro, ID_autore) VALUES ('".$id."',".$last_id.")";
                    $conn->query($insert2);
                }else{
                    //echo "Error: " . $sql . "<br>" . $conn->error;
                }
            }
        }

        //generi
        for($i=0;$i<sizeof($categories);$i++){

            $check = "SELECT ID FROM generi WHERE valore = '".$categories[$i]."';";
            $result = $conn->query($check);

            if ($result->num_rows > 0) {
                //insert libri_generi
                while($row = $result->fetch_assoc()) {

                    $insert = "INSERT INTO libri_generi(ID_libro, ID_genere) VALUES ('".$id."',".$row["ID"].")";
                    $conn->query($insert);
                  }
            } else {
                //insert generi e libri_generi
                $insert = "INSERT INTO generi(valore) VALUES ('".$categories[$i]."');";

                if ($conn->query($insert) === TRUE) {
                    $last_id = $conn->insert_id;
                    $insert2 = "INSERT INTO libri_generi(ID_libro, ID_genere) VALUES ('".$id."',".$last_id.")";
                    $conn->query($insert2);
                }else{
                    //echo "Error: " . $sql . "<br>" . $conn->error;
                }
            }
        }
    }else{
        //echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $sql = "INSERT INTO librerie(ID_libro, ID_utente, pagine_lette, pagine_tot, data_inizio, stato) 
    VALUES (\"".$id."\",".$user_id.",".$readPage.",".$pageCount.",\"".$startDate."\",". 1 .");";

    if ($conn->query($sql) === TRUE) {
        //echo "New record created successfully";
    } else {
        echo "error";
    }

    $conn->close();

?>