<html>
<head>
    <script src="js/livesearch.js"></script>
    <script src="js/navbar.js"></script>
    <script src="js/book.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/navbar.css">
</head>
<body>
    <div id="mySidenav" class="sidenav">
        <a href="#">Login</a>
        <a href="#">Registrati</a>
    </div>

    <div class="container" id="hamburger" onclick="openNav(); changeIcon(this);">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>

    <div id="main">    

        <form id="searchBox">
            <input type="text" onkeyup="liveSearch(this.value, 0)" id="searchBar">
            <select name="filter" id="filter" onchange="liveSearch(document.getElementById('searchBar').value, 0)">
                <option value="t">Titolo</option>
                <option value="a">Autore</option>
                <option value="e">Editore</option>
                <option value="i">ISBN</option>
            </select>
        </form>
        <p class="centeredText">Libri visualizzati: <span id="q">0</span>-?</p>
        <div class="centeredButton">
            <button onclick="liveSearch(document.getElementById('searchBar').value, parseInt(document.getElementById('q').innerHTML) - 10)">Indietro</button>
            <button onclick="liveSearch(document.getElementById('searchBar').value, parseInt(document.getElementById('q').innerHTML) + 10)">Avanti</button> 
        </div>
        <table id="resultTable" class="centeredElement"></table>
        <div class="centeredButton">
            <button onclick="liveSearch(document.getElementById('searchBar').value, parseInt(document.getElementById('q').innerHTML) - 10)">Indietro</button>
            <button onclick="liveSearch(document.getElementById('searchBar').value, parseInt(document.getElementById('q').innerHTML) + 10)">Avanti</button> 
        </div>

    </div>
</body>
</html>