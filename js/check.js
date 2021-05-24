//controllo email con AJAX (registrazione)
function checkEmail(str){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var e = document.getElementById("emailReg");
            var submit = document.getElementById("submit");

            if(this.responseText == 0){
                e.style.border = "2px solid green";
                submit.disabled = false;
            }else{
                e.style.border = "2px solid red";
                submit.disabled = true;
            }

        }
    }

    xmlhttp.open("GET","db/email.php?email=" + str, true);
    xmlhttp.send();
}

//controllo di conferma della password
function checkConfPassw(str, check){
   
    var e = document.getElementById("confPassword");
    var passw = document.getElementById("password");
    var submit = document.getElementById("submit");

    if(str === check){
        passw.style.border = "2px solid green";
        e.style.border = "2px solid green";
        submit.disabled = false;
    }else{
        passw.style.border = "2px solid red";
        e.style.border = "2px solid red";
        submit.disabled = true;
    }
}

//funziona nascondi/mostra password
function showHidePsw(){

    var e = document.getElementById("showHide");
    var input = document.getElementById("password");

    if(e.classList.contains("fa-eye")){
        e.classList.remove("fa-eye");
        e.classList.add("fa-eye-slash");
        input.type = "text";
    }else{
        e.classList.remove("fa-eye-slash"); 
        e.classList.add("fa-eye");      
        input.type = "password";
    }
}

//funziona nascondi/mostra conferma password
function showHidePswConf(){

    var e = document.getElementById("showHideConf");
    var input = document.getElementById("confPassword");

    if(e.classList.contains("fa-eye")){
        e.classList.remove("fa-eye");
        e.classList.add("fa-eye-slash");
        input.type = "text";
    }else{
        e.classList.remove("fa-eye-slash"); 
        e.classList.add("fa-eye");      
        input.type = "password";
    }
}