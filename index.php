<html>

<head>
    <script src="js/livesearch.js"></script>
    <script src="js/navbar.js"></script>
    <script src="js/book.js"></script>
    <script src="js/db.js"></script>
    <script src="js/graphic.js"></script>
    <script src="https://kit.fontawesome.com/6beb1cdc68.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="icon" href="img/icon.png" type="image/icon type">
    <title>Home</title>
</head>

<body onload="liveSearch(document.getElementById('searchBar').value, 0)">

    <?php
    include "navbar.php";
    ?>

    <div id="main">

       <div id="logo">
            <img src="img/libraryBanner.png" alt="Banner">
        </div>

        <form>
            <div class="searchBox">
                <div id="searchDiv">
                    <input type="text" oninput="liveSearch(this.value, 0)" id="searchBar" value="" placeholder="Cerca..." autocomplete="off">
                    <i class="fas fa-search"></i>
                </div>

                <div class="filter">
                    <div id="filterDiv">
                        <select name="filter" id="filter" onchange="liveSearch(document.getElementById('searchBar').value, 0)">
                            <option value="t" selected disabled hidden>Ricerca per</option>
                            <option value="t">Titolo</option>
                            <option value="a">Autore</option>
                            <option value="e">Editore</option>
                            <option value="i">ISBN</option>
                        </select>
                    </div>

                    <div id="orderDiv">
                        <select name="order" id="order" onchange="liveSearch(document.getElementById('searchBar').value, 0)">
                            <option value="ri" selected disabled hidden>Ordina per</option>
                            <option value="ri">Rilevanza</option>
                            <option value="re">Recente</option>
                        </select>
                    </div>

                    <div id="maxResultsDiv">
                        <select name="maxResults" id="maxResults" onchange="liveSearch(document.getElementById('searchBar').value, 0)">
                            <option value="10" selected disabled hidden>Libri per pagina</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>

        <p class="centeredText">Libri visualizzati: <span id="qFirst">0</span> su <span id="qLast">?</span></p>
        <div class="centeredButton">
            <button onclick="liveSearch(document.getElementById('searchBar').value, parseInt(document.getElementById('qFirst').innerHTML) - parseInt(document.getElementById('maxResults').value))"><i class="fas fa-chevron-left"></i> Indietro</button>
            <button onclick="liveSearch(document.getElementById('searchBar').value, parseInt(document.getElementById('qFirst').innerHTML) + parseInt(document.getElementById('maxResults').value))">Avanti <i class="fas fa-chevron-right"></i></button>
        </div>

        <div>
            <div id="resultTable"></div>
        </div>

        <div class="centeredButton">
            <button onclick="liveSearch(document.getElementById('searchBar').value, parseInt(document.getElementById('qFirst').innerHTML) - parseInt(document.getElementById('maxResults').value))"><i class="fas fa-chevron-left"></i> Indietro</button>
            <button onclick="liveSearch(document.getElementById('searchBar').value, parseInt(document.getElementById('qFirst').innerHTML) + parseInt(document.getElementById('maxResults').value))">Avanti <i class="fas fa-chevron-right"></i></button>
        </div>

    </div>
</body>

</html>