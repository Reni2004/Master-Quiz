// start form controll coding

var signupBtn = document.querySelector(".signup-btn");
var loginBtn = document.querySelector(".login-btn");
var loginBox = document.querySelector(".login-box");
var signupBox = document.querySelector(".signup-box");

signupBtn.onclick = function(){
    signupBox.classList.add("active");
    loginBox.classList.remove("active");
    loginBtn.classList.remove("d-none");
    signupBtn.classList.add("d-none");
}

loginBtn.onclick = function(){
    signupBox.classList.remove("active");
    loginBox.classList.add("active");
    loginBtn.classList.add("d-none");
    signupBtn.classList.remove("d-none");
}

// start register coding

var registerForm = document.querySelector(".signup-form");
var allInput = registerForm.querySelectorAll("INPUT");
var textArea = registerForm.querySelector("textarea");
// console.log(allInput,textArea);

registerForm.onsubmit = function(e){
    e.preventDefault();
    registrationData();
}

const registrationData = () => {
    if(localStorage.getItem(allInput[0].value+"_brand") ==null){
        const userData = {
            brandCode : allInput[0].value,
            brandName : allInput[1].value,
            website : allInput[2].value,
            contact : allInput[3].value,
            address : textArea.value,
            username : allInput[4].value,
            password : allInput[5].value
        }
        let userString = JSON.stringify(userData);
        localStorage.setItem(allInput[0].value+"_brand",userString);
        registerForm.reset('');
        swal("Registration Done", "Please Sign in !", "success");
    }else{
        swal("Change brand code", "This brand already tacken !", "warning");
    }
}

//start sign in coding//dom menupulation 

var signinBtn = document.querySelector(".signin-btn");
var brandCode = document.querySelector("#brand-code");
var username = document.querySelector("#username");
var password = document.querySelector("#password");

signinBtn.onclick = function(e){
    e.preventDefault();
    if(brandCode.value && username.value && password.value != ""){
        if(localStorage.getItem(brandCode.value+"_brand") != null){
            var allData = JSON.parse(localStorage.getItem(brandCode.value+"_brand"));
            console.log(allData);
            if(allData.username == username.value){
                if(allData.password == password.value){
                    signinBtn.innerHTML = "Please Wait...";
                    signinBtn.disabled =true;
                    setTimeout(function(){
                        window.location = "../dashboard/dashboard.html";
                        sessionStorage.setItem("brandCode",brandCode.value)
                    },3000)
                }else{
                    swal("wrong password", "Please Check !", "warning");
                }
            }else{
                swal("wrong Username", "Please Check !", "warning");
            }
        }else{
            swal("wrong Brandcode", "Please Sign Up first !", "warning");
        }
    }else{
        swal("Empty Field", "Please Fill All the Field !", "warning");
    }
}
