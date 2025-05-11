// start get brand code from locallstorage

var i;
var allBrandKey = [];
for (i = 0; i < localStorage.length; i++) {
    var allkeys = localStorage.key(i);
    if (allkeys.match("_brand")) {
        allBrandKey.push(
            allkeys.replace("_brand", "")
        );
    }
}
// create option coding for brandcode
var brandCodeEl = document.querySelector("#brand-code-el");
allBrandKey.forEach((code, index) => {
    brandCodeEl.innerHTML += `
<option value="${code}">${code}</option>
`
})

// all global variable
var loginForm = document.querySelector(".login-form");
var allLoginInput = loginForm.querySelectorAll("input");
var loginBtn = loginForm.querySelector("button");
var brandCode;
var allUserData = [];
// start login coding
brandCodeEl.addEventListener('change', () => {
    if (brandCodeEl.value != "choose space code") {
        sessionStorage.setItem("brandCode", brandCodeEl.value);
        allLoginInput[0].disabled = false;
        allLoginInput[1].disabled = false;
        loginBtn.disabled = false;
        brandCode = sessionStorage.getItem("brandCode");
        loginUserFun();
    } else {
        allLoginInput[0].disabled = true;
        allLoginInput[1].disabled = true;
        loginBtn.disabled = true;
        swal("Please select brand!", "Please select brand code first!", "warning");
    }
});

const loginUserFun = () => {
    if (localStorage.getItem(brandCode + "_registrationData") != null) {
        allUserData = JSON.parse(localStorage.getItem(brandCode + "_registrationData"));
    }
    loginForm.onsubmit = function (e) {
        e.preventDefault();
        for (i = 0; i < allUserData.length; i++) {
            if (allUserData[i].enrollment == allLoginInput[0].value) {
                if (allUserData[i].password == allLoginInput[1].value) {
                    if(allUserData[i].userType == "teacher"){
                        sessionStorage.setItem("brandCode",brandCode);
                        window.location = "../dashboard/dashboard.html";  
                        return;
                    }else{ 
                        sessionStorage.setItem("enrollment",allUserData[i].enrollment);
                        sessionStorage.setItem("name",allUserData[i].name);
                        sessionStorage.setItem("address",allUserData[i].address);
                        sessionStorage.setItem("fatherName",allUserData[i].fatherName);
                        sessionStorage.setItem("brandCode",brandCode);    
                        sessionStorage.setItem("imgUrl",allUserData[i].profilePic);                  
                        window.location = "../welcome/welcome.html";
                        return;
                    }
                    return;
                }else {
                    swal("Wrong Password !", "Please contact your teacher!", "warning");
                    return;
                }
            } else {
                swal("Wrong Enrollment !", "Please contact your teacher!", "warning");
            }
        }
    }
}

