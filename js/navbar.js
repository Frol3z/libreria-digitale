function openNav() {

    if(document.getElementsByClassName("change").length == 0){
        
        document.getElementById("mySidenav").style.left = "0";
        document.getElementById("hamburger").style.left = "220";
        document.getElementById("hamburger").style.transition = ".4s";
    }else{

        document.getElementById("mySidenav").style.left = "-275";
        document.getElementById("hamburger").style.left = "20";
        document.getElementById("hamburger").style.transition = ".4s";
    }
  }

  function changeIcon(x) {
    x.classList.toggle("change");
  }