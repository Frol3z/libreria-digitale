<?php    
    session_start();

    echo '<div id="mySidenav" class="sidenav">
          <a href="index.php"><i class="fas fa-home"></i>Home</a>';
    
    if(!isset($_SESSION["id"])) {
        
        //se l'utente non è loggato visualizzerà due opzioni:
        //  - Login
        //  - Registrati

        echo '<a href="login.php"><i class="fas fa-sign-in-alt"></i>Login</a>
              <a href="register.php"><i class="fas fa-user-plus"></i>Registrati</a>';
    }else{
        
        // se invece è loggato:
        //  - La mia libreria
        //  - Logout

        echo '<a href="library.php"><i class="fas fa-book"></i>La mia libreria</a>
              <a href="logout.php"><i class="fas fa-sign-out-alt"></i>Logout</a>';
    }
    
    echo '</div>

        <div class="container" id="hamburger" onclick="openNav(); changeIcon(this);">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>';
?>