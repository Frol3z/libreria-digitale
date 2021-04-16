function openNav() {

    if(document.getElementsByClassName("change").length == 0){
        
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("hamburger").style.marginLeft = "200px";
        document.getElementById("hamburger").style.transition = ".4s";
    }else{

        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("hamburger").style.marginLeft = "0";
        document.getElementById("hamburger").style.transition = ".4s";
    }
  }

  function changeIcon(x) {
    x.classList.toggle("change");
  }