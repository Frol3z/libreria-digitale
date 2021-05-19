<html>

<head>
    <script src="js/navbar.js"></script>
    <script src="js/check.js"></script>
    <script src="https://kit.fontawesome.com/6beb1cdc68.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/bgLogReg.css">
    <link rel="icon" href="img/icon.png" type="image/icon type">
    <title>Login</title>
</head>

<body>

    <?php

    include "navbar.php";

    if(isset($_SESSION["id"])){
        header('Location: index.php');
    }

    ?>

    <div id="main">
        <div class="logRegFlexbox">
            <form class="userForm" method="POST" action="db/logincheck.php">
                <h1 class="logRegHeader">Login</h1>
                <label for="email">Email</label>
                <div class="inputContainer">
                    <i class="fas fa-envelope"></i>
                    <input type="email" name="email" required>
                </div>

                <label for="password">Password</label>
                <div class="inputContainer">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="password"  id="password" required>
                    <i class="fas fa-eye" id="showHide" onclick=showHidePsw()></i>
                </div>

                <?php

                    if(isset($_COOKIE["successful"]) == "false"){
                        echo "<p id='logError'><i class='fas fa-exclamation-triangle'></i> Dati di accesso non validi</p>"; 
                    }

                ?>

                <input type="submit" name="submit" value="Invia">
            </form>
        </div>
    </div>
</body>

</html>