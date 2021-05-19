<html>

<head>
    <script src="js/check.js"></script>
    <script src="js/navbar.js"></script>
    <script src="https://kit.fontawesome.com/6beb1cdc68.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/bgLogReg.css">
    <link rel="icon" href="img/icon.png" type="image/icon type">
    <title>Registrazione</title>
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
            <form class="userForm" method="POST" action="db/insertuser.php">
                <h1 class="logRegHeader">Registrazione</h1>
                <label for="name">Nome</label>
                <div class="inputContainer">
                    <input type="text" name="name" autocomplete="off" required>
                    <i class="fas fa-user"></i>
                </div>

                <label for="surname">Cognome</label>
                <div class="inputContainer">
                    <input autocomplete="off" type="text" name="surname" required>
                    <i class="fas fa-user"></i>
                </div>

                <label for="email">Email</label>
                <div id="checkContainer">
                    <div class="inputContainer">
                        <i class="fas fa-envelope"></i>
                        <input autocomplete="off" type="email" name="email" id="emailReg" required oninput=checkEmail(this.value)>
                    </div>
                </div>

                <label for="password">Password</label>
                <div class="inputContainer">
                    <i class="fas fa-lock"></i>
                    <input autocomplete="off" type="password" name="password" id="password" required>
                    <i class="fas fa-eye" id="showHide" onclick=showHidePsw()></i>
                </div>

                <label for="confPassword">Conferma password</label>
                <div class="inputContainer">
                    <i class="fas fa-lock"></i>
                    <input autocomplete="off" type="password" name="confPassword" id="confPassword" required  oninput='checkConfPassw(this.value, document.getElementById("password").value)'>
                    <i class="fas fa-eye" id="showHideConf" onclick=showHidePswConf()></i>
                </div>

                <input id="submit" type="submit" name="submit" value="Invia">
            </form>
        </div>

    </div>
</body>

</html>