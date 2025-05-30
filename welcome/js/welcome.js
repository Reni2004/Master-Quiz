// global variable
var selectSubjectEl = document.querySelector("#select-subject-el");
var startQuizBtn = document.querySelector(".start-quiz-btn");
var brandCode = sessionStorage.getItem("brandCode");
var enrollment = sessionStorage.getItem("enrollment");
var allSubject = [];
// reading subject from localstorage

if (localStorage.getItem(brandCode + "_allSubject") != null) {
    allSubject = JSON.parse(localStorage.getItem(brandCode + "_allSubject"));
    allSubject.forEach((subject, index) => {
        selectSubjectEl.innerHTML += `
        <option>${subject.subjectName}</option>
        `;
    })
}
// console.log(document.cookie);
// selectSubjectEl.addEventListener("change", () => {
//     var allCookie = [];
//     var cookie = document.cookie.split(";");
//     cookie.forEach((data) => {
//         allCookie.push(data.trim());
//     })
//     if (cookie.indexOf(brandCode+"_"+selectSubjectEl.value+"_"+enrollment+"=done") != -1) {
//         swal("Already Attept!","Please contact your teacher","warning");
//         startQuizBtn.disabled = true;
//     } else {
//         startQuizBtn.disabled = false;
//     }
//     console.log(cookie);
//     console.log(allCookie);
// })

startQuizBtn.onclick = function () {
    if (selectSubjectEl.value != "choose subject") {
        var subject = selectSubjectEl.value;
        sessionStorage.setItem("subject", subject);
        window.location = "../quiz/quiz.html";
    } else {
        swal("Select Subject!", "Please select subject first!", "warning");
    }
}