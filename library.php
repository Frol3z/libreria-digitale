<html>
<head>
    <script src="js/navbar.js"></script>
    <script src="js/graphic.js"></script>
    <script src="js/db.js"></script>
    <script src="https://kit.fontawesome.com/6beb1cdc68.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="icon" href="img/icon.png" type="image/icon type">
    <title>La mia libreria</title>
</head>
<body>

    <?php
        include "navbar.php";

        if(!isset($_SESSION["id"])){
            header('Location: index.php');
        }
    ?>   
    
    <div id="main">

        <div id="logo">
            <img src="img/libraryBanner.png" alt="Banner">
        </div>

            <?php

                include "db/connection.php";

                //leggo gli stati di lettura dalla relativa tabella
                $sql = 'SELECT valore FROM stati';

                $result = $conn->query($sql);

                if ($result->num_rows > 0) {

                    while($row = $result -> fetch_assoc()){

                        switch ($row["valore"]) {
                            case "r":
                              $statusR = "In Lettura";
                              break;
                            case "h":
                              $statusH = "In Pausa";
                              break;
                            case "c":
                                $statusC = "Completato";
                              break;
                          }
                    }
                }

                //leggo i libri salvati nella libreria dell'utente loggato e li ordino in base allo stato (In Lettura, In Pausa, Completato)
                $sql = 'SELECT * FROM libri 
                        INNER JOIN librerie
                        ON librerie.ID_libro = libri.ID
                        WHERE librerie.ID_utente='.$_SESSION["id"].'
                        ORDER BY librerie.stato ASC;';

                $result = $conn->query($sql);

                //stampo i risultati
                if ($result->num_rows > 0) {

                    echo '<div id="libraryTable">';
                    $i = 0;

                    while($row = $result -> fetch_assoc()){
                        
                        $i++;
                        $id = $row["ID"];
                        $ind_id = $row["industrial_ID"];
                        $ind_id_type = $row["industrial_ID_type"];
                        $title = $row["titolo"];
                        $description = $row["descrizione"];
                        $lang = $row["lingue"];
                        $yearOfPub = $row["anno_pubblicazione"];
                        $publisher = $row["editore"];
                        $viewability = $row["viewability"];
                        $maturityRating = $row["maturity_rating"];
                        $canonicalVolumeLink = $row["link"];
                        $imgLink = $row["img_link"];
                        $downloadPdfLink = $row["download_link_pdf"];
                        $downloadEpubLink = $row["download_link_epub"];
                        $webReaderLink = $row["web_reader_link"];
                        $readPage = $row["pagine_lette"];
                        $pageCount = $row["pagine_tot"]; if($pageCount == 0){$pageCount = "?";}; //se non si conoscono le pagine totali, si stampa "?"
                        $startDate = $row["data_inizio"];
                        $finishDate = $row["data_fine"];
                        $stato = $row["stato"];

                        echo '<div class="item">';

                        echo '<p id="identifier'.$i.'" style="display:none"">'.$id.'</p>';
                        echo '<i class="fas fa-times" onclick="deleteDB(document.getElementById(\'identifier'.$i.'\').innerHTML); window.location = \'db/redirect.php\';"></i>';

                            echo '<div class="flexboxLeft">';
                                echo '<div class="img">';

                                    echo '<img src="'.$imgLink.'">';

                                echo '</div>';

                                echo '<select class="status" name="status" value='.$stato.' oninput="updateStatus(document.getElementById(\'identifier'.$i.'\').innerHTML, this.value)">'; 
                                    
                                switch ($stato) {
                                    case "1":
                                        echo '<option selected="selected" value=1>'.$statusR.'</option>
                                              <option value=2>'.$statusH.'</option>
                                              <option value=3>'.$statusC.'</option>';
                                      break;
                                    case "2":
                                        echo '<option value=1>'.$statusR.'</option>
                                        <option selected="selected" value=2>'.$statusH.'</option>
                                        <option value=3>'.$statusC.'</option>';
                                      break;
                                    case "3":
                                        echo '<option value=1>'.$statusR.'</option>
                                        <option value=2>'.$statusH.'</option>
                                        <option selected="selected" value=3>'.$statusC.'</option>';
                                      break;
                                  };

                                echo '</select>';

                            echo '</div>';
                            
                            echo '<div class="flexboxRight">';

                                echo '<div class="title">';
                                    echo '<p>'.$title.'<span class="langSpan"> ['.$lang.']</span></p>';
                                echo '</div>';

                                echo '<div class="authorsYoP">';
                                    echo '<p class="page"> Codice identificativo ('.$ind_id_type.'): '.$ind_id.'</p>';
                                    echo '<p class="page">Pagine lette: <input type="number" name="readPage" class="readPage" min="0" max="'.$pageCount.'" value="'.$readPage.'" oninput="updateReadPage(document.getElementById(\'identifier'.$i.'\').innerHTML, this.value)"> su '.$pageCount.'</p>';
                                    echo '<p class="page">Data inizio: <input type="date" name="startDate" class="date" value="'.$startDate.'" oninput="updateStartDate(document.getElementById(\'identifier'.$i.'\').innerHTML, this.value)"> Data fine: <input type="date" name="endDate" class="date" value="'.$finishDate.'" min="'.$finishDate.'" oninput="updateFinishDate(document.getElementById(\'identifier'.$i.'\').innerHTML, this.value)"></p>';
                                echo '</div>';

                                echo '<div class="btns">';

                                        if($downloadPdfLink != ""){

                                            echo '<a class="linkButton" href="'.$downloadPdfLink.'">';
                                                echo '<p>Download PDF: <i class="fas fa-download" aria-hidden="true"></i></p>';
                                            echo '</a>';
                                        }

                                        if($downloadEpubLink != ""){

                                            echo '<a class="linkButton" href="'.$downloadEpubLink.'">';
                                                echo '<p>Download Epub: <i class="fas fa-download" aria-hidden="true"></i></p>';
                                            echo '</a>';
                                        }

                                        if($webReaderLink != ""){

                                            echo '<a class="linkButton" href="'.$webReaderLink.'">';
                                                echo '<p>Leggi l\'estratto: <i class="fas fa-book-open" aria-hidden="true"></i></p>';
                                            echo '</a>';
                                        }

                                echo '</div>';
                                
                            echo '</div>';

                        echo '</div>';

                    };

                    echo '</div>';

                } else {
                    echo "<p id='error'>Nessun libro salvato</p>";
                }

                $conn->close();
            ?>   

    </div>

</body>
</html>