// get data from session storage
var brandCode;
brandCode = sessionStorage.getItem("brandCode");
if (brandCode == null) {
    document.body.innerHTML = "";
    document.body.style.background = "black";
    swal("Un Authrised User!", "Don Not Waste Your Time!", "warning");
}
var allUserData = JSON.parse(localStorage.getItem(brandCode + "_brand"));
var brandNameEl = document.getElementById("brand-name");
brandNameEl.innerHTML = "Welcome Mr: " + allUserData.brandName;

// start logout coding
var logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
    this.innerHTML = "plaese waitt...";
    logoutBtn.disabled = true;
    this.style.background = "#ccc";
    setTimeout(function () {
        window.location = "../company/company.html";
        sessionStorage.removeItem("brandCode");
    }, 3000)
}

// start store subject coding
var visibleSubject = document.querySelector(".visible-subject");
var subjectBtn = document.querySelector(".subject-btn");
var subjectEl = document.querySelector(".subject");
var allSubject = [];
subjectBtn.onclick = function (e) {
    e.preventDefault();
    if (subjectEl.value != "") {
        newSubject();
        subjectEl.value = "";
    } else {
        swal("Subject is Empty!", "Please Enter Subject!", "warning");
    }
    updateSubject();
}

const newSubject = (subject, index) => {
    var subjectName = subjectEl.value;
    if (subject) {
        subjectName = subject.subjectName;
    }
    visibleSubject.innerHTML += `
    <div class="d-flex subject-box justify-content-between align-items-center">  
        <h3 index='${index}'>${subjectName}</h3>   
        <div>
            <i class="fa fa-edit mx-2 edit-btn" style="font-size: 22px;"></i>    
            <i class="fa fa-save save-btn mx-2 d-none" style="font-size: 22px;"></i> 
            <i class="fa fa-trash mx-2 del-btn" style="font-size: 22px;"></i>  
        </div>
    </div>

    `;

    // start delete coding
    var i;
    var delAllBtn = visibleSubject.querySelectorAll(".del-btn");
    for (i = 0; i < delAllBtn.length; i++) {
        delAllBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement;
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        parent.remove();
                        updateSubject();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }
    // end delete coding

    // start update coding

    var allEditBtn = visibleSubject.querySelectorAll(".edit-btn");
    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement;
            var h3 = parent.getElementsByTagName("H3");
            var saveBtn = parent.querySelector(".save-btn");
            h3[0].contentEditable = true;
            h3[0].focus();
            this.classList.add("d-none");
            saveBtn.classList.remove("d-none");
            saveBtn.onclick = function () {
                var editedSub = h3[0].innerHTML;
                var id = h3[0].getAttribute("index");
                updateSubject(editedSub, id)
                saveBtn.classList.add("d-none");
                allEditBtn[id].classList.remove("d-none");
                h3[0].contentEditable = false;
            }
        }

    }
}

if (localStorage.getItem(brandCode + "_allSubject") != null) {
    allSubject = JSON.parse(localStorage.getItem(brandCode + "_allSubject"));
    allSubject.forEach((subject, index) => {
        newSubject(subject, index);
    })
}

function updateSubject(subject, id) {
    if (subject != undefined && id != undefined) {
        allSubject[id] = {
            subjectName: subject
        }
    } else {
        var i;
        allSubject = [];
        var subjectBox = visibleSubject.querySelectorAll(".subject-box");
        for (i = 0; i < subjectBox.length; i++) {
            var h3 = subjectBox[i].getElementsByTagName("H3");
            allSubject.push({
                subjectName: h3[0].innerHTML
            });
        }
    }
    localStorage.setItem(brandCode + "_allSubject", JSON.stringify(allSubject));
}
// start return subject in question form
var chooseSubject = document.querySelector("#choose-subject");
// var firstOption = chooseSubject.querySelectorAll("OPTION");
var questionForm = document.querySelector(".question-form");
var allQuesInput = questionForm.querySelectorAll("INPUT");
var selectSubject = document.querySelector("#select-subject");
var subjectResultEl = document.querySelector("#subject-result-el");
var subject;
var allQuestion = [];
questionForm.onsubmit = (e) => {
    e.preventDefault();
    insertQuesrtionFunc();
}

const chooseSubjectFunc = () => {
    allSubject.forEach((subject, index) => {
        chooseSubject.innerHTML += `
        <option vlaue='${subject.subjectName}'>${subject.subjectName}</option>
        `;
        selectSubject.innerHTML += `
        <option vlaue='${subject.subjectName}'>${subject.subjectName}</option>
        `;
        subjectResultEl.innerHTML += `
        <option vlaue='${subject.subjectName}'>${subject.subjectName}</option>
        `;
    })
}
chooseSubjectFunc();

chooseSubject.addEventListener('change', () => {
    checkSubject();
    checkSubjectKey();
})

// var firstOption = chooseSubject.querySelectorAll("OPTION")[1];
function checkSubject() {
    // if (chooseSubject.value == "choose subject") {
    //     subject = firstOption.value;
    // } else {
    subject = chooseSubject.value;
    // }
}
checkSubject();

function checkSubjectKey() {
    if (localStorage.getItem(brandCode + "_" + subject + "_question") != null) {
        allQuestion = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_question"));
    } else {
        allQuestion = [];
    }
}

function insertQuesrtionFunc(sub, id, question, opOne, opTwo, opThree, opFour, corAns) {
    if (sub != undefined && id != undefined) {
        allQuestion[id] = {
            question: question,
            optionOne: opOne,
            optionTwo: opTwo,
            optionThree: opThree,
            optionFour: opFour,
            correctAnswer: corAns
        }
        localStorage.setItem(brandCode + "_" + sub + "_question", JSON.stringify(allQuestion))
        swal("Success!", "Data Updated successfully!", "success");
    } else {
        if (chooseSubject.value != "choose subject") {
            allQuestion.push({
                question: allQuesInput[0].value,
                optionOne: allQuesInput[1].value,
                optionTwo: allQuesInput[2].value,
                optionThree: allQuesInput[3].value,
                optionFour: allQuesInput[4].value,
                correctAnswer: allQuesInput[5].value
            });

            localStorage.setItem(brandCode + "_" + chooseSubject.value + "_question", JSON.stringify(allQuestion));
            swal("Success!", "Data Inserted successfully!", "success");
            questionForm.reset('');
        } else {
            swal("Choose Subject!", "Please Select a Subject!", "warning");
        }
    }
}

// start returning questions from localstorage

var newQuestions = [];
var visibleQuestion = document.querySelector(".visible-question");
selectSubject.onchange = () => {
    if (localStorage.getItem(brandCode + "_" + selectSubject.value + "_question") != null) {
        newQuestions = JSON.parse(localStorage.getItem(brandCode + "_" + selectSubject.value + "_question"));
        visibleQuestion.innerHTML = "";
        newQuestionFunc();
    } else {
        visibleQuestion.innerHTML = "<b style='color:red'>No Data Available!</b>"
    }
}

const newQuestionFunc = () => {
    newQuestions.forEach((question, index) => {
        let mediaHTML = "";
        if (question.mediaFile && question.mediaType) {
            if (question.mediaType.startsWith("image/")) {
                mediaHTML = `<img src="${question.mediaFile}" alt="Image Question" style="max-width: 300px; height: auto;"><br><br>`;
            } else if (question.mediaType.startsWith("audio/")) {
                mediaHTML = `<audio controls src="${question.mediaFile}"></audio><br><br>`;
            } else if (question.mediaType.startsWith("video/")) {
                mediaHTML = `<video controls width="300" src="${question.mediaFile}"></video><br><br>`;
            }
        }
        let questionHTML = `
  <div class="mb-5" index="${index}">
      <br>
      <div class="d-flex justify-content-between">
          <h3>${index + 1}) ${question.question || "No Question Text"}</h3>
          <div>
              <i class="fa fa-edit edit-btn mx-3"></i>
              <i class="fa fa-save save-btn mx-3 d-none"></i>
              <i class="fa fa-trash del-btn mx-3"></i>
          </div>
      </div>
<div>
    ${mediaHTML}
    ${question.optionOne ? `<span>1) ${question.optionOne}</span><br><br>` : ""}
    ${question.optionTwo ? `<span>2) ${question.optionTwo}</span><br><br>` : ""}
    ${question.optionThree ? `<span>3) ${question.optionThree}</span><br><br>` : ""}
    ${question.optionFour ? `<span>4) ${question.optionFour}</span><br><br>` : ""}
    ${question.correctAnswer ? `<span class="bg-info text-white p-3">${question.correctAnswer}</span><br><br>` : ""}
</div>
  </div>
`;
        visibleQuestion.innerHTML += questionHTML;
    });

    //start delete coding
    var allDelBtn = visibleQuestion.querySelectorAll(".del-btn");
    var i, j;
    for (i = 0; i < allDelBtn.length; i++) {
        allDelBtn[i].onclick = (e) => {
            var parent = e.target.parentElement.parentElement.parentElement;
            var index = parent.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        newQuestions.splice(index, 1);
                        localStorage.setItem(brandCode + "_" + selectSubject.value + "_question", JSON.stringify(newQuestions));
                        parent.remove();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }

    // start edit coding
    var allEditBtn = visibleQuestion.querySelectorAll(".edit-btn");
    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement.parentElement;
            var index = parent.getAttribute("index");
            var saveBtn = parent.querySelector(".save-btn");
            this.classList.add("d-none");
            saveBtn.classList.remove("d-none");
            var h3 = parent.querySelector("h3");
            var span = parent.querySelectorAll("span");
            h3.contentEditable = true;
            h3.focus();
            for (j = 0; j < span.length; j++) {
                span[j].contentEditable = true;
                span[j].style.border = "2px solid red";
            }
            saveBtn.onclick = function () {
                var subject = selectSubject.value;
                var question = h3.innerHTML.replace(`${index + 1})`, "");
                var opOne = span[0].innerHTML.replace("1) ", "");
                var opTwo = span[1].innerHTML.replace("2) ", "");
                var opThree = span[2].innerHTML.replace("3) ", "");
                var opFour = span[3].innerHTML.replace("4) ", "");
                var corAns = span[4].innerHTML;
                swal({
                    title: "Are you sure?",
                    text: "Once Updated, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willUpdated) => {
                        if (willUpdated) {
                            insertQuesrtionFunc(subject, index, question, opOne, opTwo, opThree, opFour, corAns);
                            allEditBtn[i].classList.remove("d-none");
                            saveBtn.classList.add("d-none");
                            h3.contentEditable = false;
                            for (j = 0; j < span.length; j++) {
                                span[j].contentEditable = false;
                                span[j].style.border = "none";
                            }
                        } else {
                            swal("Your imaginary file is safe!");
                        }
                    });
            }
        }
    }
}
// start registration coding

var registrationForm = document.querySelector(".registration-form");
var allRegInput = registrationForm.querySelectorAll("INPUT");
var userType = registrationForm.querySelector("select");
var address = registrationForm.querySelector("textarea");
var registrationDataEl = document.querySelector(".registration-data");
var profileBox = document.querySelector(".upload-box");
var uploadInput = document.querySelector(".upload-input");
var modalImgUrl;
var registrationData = [];

registrationForm.onsubmit = function (e) {
    e.preventDefault();
    var checkData = checkEnrollment();
    if (checkData == "find") {
        swal({
            title: "Already Registered!!",
            text: "please change enrollment number!",
            icon: "warning",
        });
    } else {
        registrationFunc();
        getRegisrationDataFuc();
    }
}
// get data
if (localStorage.getItem(brandCode + "_registrationData") != null) {
    registrationData = JSON.parse(localStorage.getItem(brandCode + "_registrationData"));
}
// prevent to dubkicate enrollment
function checkEnrollment() {
    var i;
    var checkData = "";
    for (i = 0; i < registrationData.length; i++) {
        if (registrationData[i].enrollment == allRegInput[4].value) {
            checkData = "find";
            break;
        } else {
            checkData = "not found";
        }
    }
    return checkData;
}

const registrationFunc = () => {
    if (userType.value != "choose type") {
        registrationData.push({
            name: allRegInput[0].value,
            fatherName: allRegInput[1].value,
            dob: allRegInput[2].value,
            userType: userType.value,
            mobile: allRegInput[3].value,
            enrollment: allRegInput[4].value,
            password: allRegInput[5].value,
            address: address.value,
            profilePic: "https://i.pinimg.com/originals/05/5a/91/055a91979264664a1ee12b9453610d82.png"
        });
        localStorage.setItem(brandCode + "_registrationData", JSON.stringify(registrationData));
        swal("Data Inserted!", "Registration done successfully!", "success");
        registrationForm.reset('');
    } else {
        swal("Choose type!", "Please Select a user!", "warning");
    }
}

const getRegisrationDataFuc = () => {
    registrationDataEl.innerHTML = "";
    registrationData.forEach((allData, index) => {
        registrationDataEl.innerHTML += `

        <tr index="${index}">
            <th scope="row">${index + 1}</th>
            <td>
            <div class="profile">
                <img src="${allData.profilePic}" width="40" height="40" alt="">
            </div>
            </td>
            <td class="text-nowrap" style="width: 8rem; ">${allData.name}</td>
            <td class="text-nowrap" style="width: 8rem; ">${allData.fatherName}</td>
            <td class="text-nowrap" style="width: 8rem; ">${allData.dob}</td>
            <td class="text-nowrap" style="width: 8rem; ">${allData.userType}</td>
            <td class="text-nowrap" style="width: 8rem; ">${allData.mobile}</td>
            <td class="text-nowrap" style="width: 8rem; ">${allData.enrollment}</td>
            <td class="text-nowrap" style="width: 8rem; ">${allData.password}</td>
            <td style="width: 8rem; ">${allData.address}</td>
            <td class="text-nowrap" style="width: 8rem; ">
                <i class='fa fa-trash del-btn mx-3'></i>
                <i class='fa fa-eye edit-btn' data-bs-toggle="modal" data-bs-target="#myModal"></i>
            </td>
        </tr>
        
        `
    });
    // start delete coding
    var i, j;
    var allDelBtn = registrationDataEl.querySelectorAll(".del-btn");
    for (i = 0; i < allDelBtn.length; i++) {
        allDelBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement;
            var index = parent.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        registrationData.splice(index, 1);
                        localStorage.setItem(brandCode + "_registrationData", JSON.stringify(registrationData));
                        parent.remove();
                        getRegisrationDataFuc();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }

    // update coding
    var allEditBtn = registrationDataEl.querySelectorAll(".edit-btn");
    var modalEditBtn = document.querySelector(".modal-edit");
    var modalUpdateBtn = document.querySelector(".modal-update-btn");
    var modalForm = document.querySelector(".modal-form");
    var allModalInput = modalForm.querySelectorAll("input");
    var modalTextarea = modalForm.querySelector("textarea");
    var closeBtn = document.querySelector(".btn-close");
    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement;
            var index = parent.getAttribute("index");
            var td = parent.querySelectorAll("td");
            var imgUrl = td[0].querySelector("img").src;
            var name = td[1].innerHTML;
            var fatherName = td[2].innerHTML;
            var dob = td[3].innerHTML;
            var userType = td[4].innerHTML;
            var mobile = td[5].innerHTML;
            var enrollment = td[6].innerHTML;
            var password = td[7].innerHTML;
            var address = td[8].innerHTML;
            profileBox.style.backgroundImage = `url(${imgUrl})`;
            allModalInput[0].value = name;
            allModalInput[1].value = fatherName;
            allModalInput[2].value = dob;
            allModalInput[3].value = userType;
            allModalInput[4].value = mobile;
            allModalInput[5].value = enrollment;
            allModalInput[6].value = password;
            modalTextarea.value = address;
            for (j = 0; j < allModalInput.length; j++) {
                allModalInput[j].disabled = true;
            }
            modalTextarea.disabled = true;
            uploadInput.disabled = true;
            modalEditBtn.onclick = function () {
                for (j = 0; j < allModalInput.length; j++) {
                    allModalInput[j].disabled = false;
                }
                modalTextarea.disabled = false;
                uploadInput.disabled = false;
                this.classList.add("d-none");
                modalUpdateBtn.classList.remove("d-none");

                modalUpdateBtn.onclick = function () {
                    var name = allModalInput[0].value;
                    var fatherName = allModalInput[1].value;
                    var dob = allModalInput[2].value;
                    var userType = allModalInput[3].value;
                    var mobile = allModalInput[4].value;
                    var enrollment = allModalInput[5].value;
                    var password = allModalInput[6].value
                    var address = modalTextarea.value;

                    swal({
                        title: "Are you sure?",
                        text: "Once Updated, you will not be able to recover this imaginary file!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willUpdated) => {
                            if (willUpdated) {
                                registrationData[index] = {
                                    name: name,
                                    fatherName: fatherName,
                                    dob: dob,
                                    userType: userType,
                                    mobile: mobile,
                                    enrollment: enrollment,
                                    password: password,
                                    address: address,
                                    profilePic: modalImgUrl == undefined ? imgUrl : modalImgUrl
                                }
                                localStorage.setItem(brandCode + "_registrationData", JSON.stringify(registrationData));
                                this.classList.add("d-none");
                                modalEditBtn.classList.remove("d-none");
                                getRegisrationDataFuc();
                                closeBtn.click();
                            } else {
                                swal("Your imaginary file is safe!");
                            }
                        });
                }
            }
        }
    }
}
getRegisrationDataFuc();

// read photo coding
uploadInput.onchange = function () {
    var fReader = new FileReader();
    fReader.onload = function (e) {
        var modalImgUrl = e.target.result;
        profileBox.style.backgroundImage = `url(${modalImgUrl})`;
    }
    fReader.readAsDataURL(uploadInput.files[0]);
}

// start toggler coding
var togglersBtn = document.querySelectorAll(".toggler-icon");
var sideNav = document.querySelector(".side-nav");
togglersBtn[0].onclick = function () {
    sideNav.classList.add("active");
    this.classList.add("d-none");
    togglersBtn[1].classList.remove("d-none");
}
togglersBtn[1].onclick = function () {
    sideNav.classList.remove("active");
    this.classList.add("d-none");
    togglersBtn[0].classList.remove("d-none");
}

// start get result coding from database
let allResult = [];
var allUserResultBox = document.querySelector(".subject-result-data");
subjectResultEl.addEventListener('change', () => {
    allUserResultBox.innerHTML = "";
    if (subjectResultEl.value != "choose subject") {
        if (localStorage.getItem(brandCode + "_" + subjectResultEl.value + "_result") != null) {
            allResult = JSON.parse(localStorage.getItem(brandCode + "_" + subjectResultEl.value + "_result"));
            allResult.forEach((data, index) => {
                allUserResultBox.innerHTML += `
                <tr>
                    <td class="text-nowrap" style="width: 8rem;">${index + 1}</td>
                    <td class="text-nowrap" style="width: 8rem;">${data.name}</td>
                    <td class="text-nowrap" style="width: 8rem;">${data.enrollment}</td>
                    <td class="text-nowrap" style="width: 8rem;">${data.subject}</td>
                    <td class="text-nowrap" style="width: 8rem;">${data.rightAns}</td>
                    <td class="text-nowrap" style="width: 8rem;">${data.wrongAns}</td>
                    <td class="text-nowrap" style="width: 8rem;">${data.maxMark}</td>
                </tr>
                `
            });
        }
    } else {
        swal("Select Subject!", "Please Select a first", "warning");
    }
});

// start get certificate coding
let closeBtn = document.querySelector(".certificate-close-btn");
let certificateMainBox = document.querySelector(".certificate-main");
let certificateForm = document.querySelector(".certificate-form");
var cirInput = certificateForm.querySelector("input");
let cirBrandName = certificateMainBox.querySelector(".brand-name");
let cirAddress = certificateMainBox.querySelector(".brand-address");
let cirName = certificateMainBox.querySelector(".cir-name");
let cirEnrollment = certificateMainBox.querySelector(".cir-enrollment");
let cirFather = certificateMainBox.querySelector(".cir-father");
let cirData = certificateMainBox.querySelector(".cir-data");
let cirTotal = certificateMainBox.querySelectorAll(".cir-total");
let cirProfile = certificateMainBox.querySelector(".cir-profile");
let finalResultBox = certificateMainBox.querySelector(".final-result-box");
//getting result from db
certificateForm.onsubmit = function (e) {
    e.preventDefault();
    getUserResult();
}

const getUserResult = () => {
    if (cirInput.value != "") {
        cirData.innerHTML = "";
        if (localStorage.getItem(brandCode + "_" + cirInput.value + "_result") != null) {
            var resultData = JSON.parse(localStorage.getItem(brandCode + "_" + cirInput.value + "_result"));
            certificateMainBox.classList.add("active");
            cirBrandName.innerHTML = allUserData.brandName;
            cirAddress.innerHTML = allUserData.address;
            cirName.innerHTML = resultData[0].name;
            cirEnrollment.innerHTML = resultData[0].enrollment;
            cirFather.innerHTML = resultData[0].fatherName;
            cirProfile.src = resultData[0].profilePic;
            let maxMark = 0;
            let mark = 0;
            let total = 0;
            resultData.forEach((data, index) => {
                cirData.innerHTML += `
                <tr>
                        <td>${index + 1}</td>
                        <td>${data.subject}</td>
                        <td>${data.maxMark}</td>
                        <td>${data.rightAns}</td>
                        <td>${data.rightAns}</td>
                    </tr>
                `;

                maxMark += data.maxMark;
                mark += data.rightAns;
                total += data.rightAns;
            });

            cirTotal[0].innerHTML = maxMark;
            cirTotal[1].innerHTML = mark;
            cirTotal[2].innerHTML = total;

            let finalResult = (total / maxMark * 100).toFixed(2);
            if (finalResult <= 32.99) {
                finalResultBox.innerHTML = "FAIL";
            } else {
                finalResultBox.innerHTML = "PASS";
            }
        } else {
            swal({
                title: "No Result Found!",
                text: "There is no result related enrollment",
                icon: "warning",
            });
        }
    } else {
        swal({
            title: "Input field is empty!",
            text: "Please enter enrollment first",
            icon: "warning",
        });
    }
}

// closing modal coding
closeBtn.onclick = function () {
    certificateMainBox.classList.remove("active");
}
function showQuestionForm() {
    const selectedType = document.getElementById("questionType").value;

    // Hide all forms initially
    document.querySelectorAll(".question-form").forEach(form => {
        form.style.display = "none";
    });

    // Show the selected form
    if (selectedType === "manual") {
        document.getElementById("manualForm").style.display = "block";
    } else if (selectedType === "ai") {
        document.getElementById("ai-question-box").style.display = "block";
    } else if (selectedType === "truefalse") {
        document.getElementById("trueFalseForm").style.display = "block";
    } else if (selectedType === "audiovideo") {
        document.getElementById("audioVideoForm").style.display = "block";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const allForms = document.querySelectorAll(".question-form");

    allForms.forEach((form) => {
        form.onsubmit = (e) => {
            e.preventDefault();

            const visibleForm = e.target; // form that was submitted
            const allQuesInput = visibleForm.querySelectorAll("input");
            const chooseSubject = document.getElementById("choose-subject");
            const correctAnswer = visibleForm.querySelector("#correct-answer");

            if (!chooseSubject || chooseSubject.value === "choose subject") {
                swal("Choose Subject!", "Please select a subject.", "warning");
                return;
            }

            // Push data to your insert function
            insertQuesrtionFunc(
                chooseSubject.value,
                undefined,
                allQuesInput[0].value,
                allQuesInput[1].value,
                allQuesInput[2].value,
                allQuesInput[3].value,
                allQuesInput[4].value,
                correctAnswer.value
            );

            visibleForm.reset(); // optional: clear form
        };
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tfForm = document.getElementById("trueFalseForm");

    tfForm.onsubmit = function (e) {
        e.preventDefault();

        const subject = document.getElementById("choose-subject").value;
        const question = document.getElementById("tf-question").value;
        const optionOne = document.getElementById("tf-option-one").value;
        const optionTwo = document.getElementById("tf-option-two").value;
        const optionThree = document.getElementById("tf-option-three").value;
        const optionFour = document.getElementById("tf-option-four").value;
        const correctAnswer = document.getElementById("tf-correct-answer").value;

        if (subject === "choose subject" || !subject) {
            swal("Choose Subject!", "Please select a subject.", "warning");
            return;
        }

        // Load existing questions or initialize array
        let existingQuestions = [];
        const storageKey = brandCode + "_" + subject + "_question";

        if (localStorage.getItem(storageKey)) {
            existingQuestions = JSON.parse(localStorage.getItem(storageKey));
        }

        // Add the new true/false question
        existingQuestions.push({
            question: question,
            optionOne: optionOne,
            optionTwo: optionTwo,
            optionThree: optionThree,
            optionFour: optionFour,
            correctAnswer: correctAnswer
        });

        // Save to localStorage
        localStorage.setItem(storageKey, JSON.stringify(existingQuestions));
        swal("Success!", "True/False question stored successfully!", "success");

        tfForm.reset();
    };
});

document.addEventListener("DOMContentLoaded", function () {
    const avForm = document.getElementById("audioVideoForm");

    avForm.onsubmit = function (e) {
        e.preventDefault();

        const subject = document.getElementById("choose-subject").value;
        const question = document.getElementById("av-question").value;
        const file = document.getElementById("av-file").files[0];
        const optionOne = document.getElementById("av-option-one").value;
        const optionTwo = document.getElementById("av-option-two").value;
        const optionThree = document.getElementById("av-option-three").value;
        const optionFour = document.getElementById("av-option-four").value;
        const correctAnswer = document.getElementById("av-correct-answer").value;

        if (!subject || subject === "choose subject") {
            swal("Choose Subject!", "Please select a subject.", "warning");
            return;
        }

        if (!file) {
            swal("Upload Required!", "Please upload an audio or video file.", "warning");
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const mediaData = reader.result; // Base64 string

            const newQuestion = {
                question: question,
                mediaFile: mediaData, // base64 file
                mediaType: file.type, // e.g., video/mp4
                optionOne,
                optionTwo,
                optionThree,
                optionFour,
                correctAnswer
            };

            const storageKey = brandCode + "_" + subject + "_question";
            let allQuestions = [];

            if (localStorage.getItem(storageKey)) {
                allQuestions = JSON.parse(localStorage.getItem(storageKey));
            }

            allQuestions.push(newQuestion);
            localStorage.setItem(storageKey, JSON.stringify(allQuestions));

            swal("Success!", "Audio/Video question stored!", "success");
            avForm.reset();
        };

        reader.readAsDataURL(file); // convert to base64
    };
});
// // ============ AI Question Generation Logic ===========

// const aiTopicInput = document.getElementById("aiTopic");
// const aiCountInput = document.getElementById("aiCount");
// const generateBtn = document.getElementById("generateAIQuestions");
// const storeBtn = document.getElementById("storeAIQuestions");
// const previewBox = document.getElementById("generatedQuestionsPreview");

// let aiGeneratedQuestions = [];

// generateBtn.addEventListener("click", async function () {
//     const topic = aiTopicInput.value.trim();
//     const count = parseInt(aiCountInput.value);
//     const subject = chooseSubject.value;

//     // Check for missing information
//     if (!topic || !count || subject === "choose subject") {
//         swal("Missing Info", "Select a subject, enter a topic, and number of questions.", "warning");
//         return;
//     }

//     previewBox.innerHTML = "⏳ Generating questions...";

//     const prompt = `
// Generate ${count} multiple-choice questions on "${topic}". 
// Each question must include:
// - A question line
// - Four options labeled 1) to 4)
// - A correct answer in the format: Correct Answer: option-3

// Structure:
// Question:
// 1) ...
// 2) ...
// 3) ...
// 4) ...
// Correct Answer:
// `;

//     try {
//         const response = await fetch("https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-question-generation-ap", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer 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"
//             },
//             body: JSON.stringify({
//                 inputs: `generate questions: ${topic}`
//             })
//         });

//         const data = await response.json();
//         console.log("HuggingFace API raw output:", data);

//         if (data && Array.isArray(data) && data.length > 0) {
//             const output = data[0]?.generated_text || "";
//             const parsed = parseAIQuestionsFromText(output);
//             aiGeneratedQuestions = parsed;

//             if (parsed.length === 0) {
//                 previewBox.innerHTML = "<p style='color:red;'>⚠️ Could not extract questions. Try a simpler topic or check the Hugging Face model.</p>";
//                 return;
//             }

//             // Show preview of generated questions
//             previewBox.innerHTML = "";
//             parsed.forEach((q, i) => {
//                 previewBox.innerHTML += `
//                     <div class="card p-3 mb-2 border bg-light">
//                         <h5>${i + 1}) ${q.question}</h5>
//                         <p>1) ${q.optionOne}</p>
//                         <p>2) ${q.optionTwo}</p>
//                         <p>3) ${q.optionThree}</p>
//                         <p>4) ${q.optionFour}</p>
//                         <p><strong>Correct:</strong> ${q.correctAnswer}</p>
//                     </div>
//                 `;
//             });

//             storeBtn.style.display = "inline-block";
//         } else {
//             previewBox.innerHTML = "<p style='color:red;'>⚠️ No questions generated. Try a simpler topic or check the Hugging Face model.</p>";
//         }
//     } catch (err) {
//         console.error("Fetch error:", err);
//         swal("Error", "Failed to generate questions. Try again.", "error");
//         previewBox.innerHTML = "<p style='color:red;'>⚠️ Error occurred. Please try again later.</p>";
//     }
// });


// // Function to parse AI-generated questions
// function parseAIQuestionsFromText(text) {
//     const blocks = text.trim().split(/\n{2,}/);
//     const questions = [];

//     for (let block of blocks) {
//         const lines = block.trim().split("\n");
//         if (lines.length < 6) continue;

//         const questionLine = lines[0].replace(/^\d+\)\s*/, "").replace(/^Question:\s*/, "").trim();
//         const optionOne = lines[1].replace(/^1\)\s*/, "").trim();
//         const optionTwo = lines[2].replace(/^2\)\s*/, "").trim();
//         const optionThree = lines[3].replace(/^3\)\s*/, "").trim();
//         const optionFour = lines[4].replace(/^4\)\s*/, "").trim();
//         const correctMatch = lines[5].match(/option[-\s]?(\d)/i);
//         const correctAnswer = correctMatch ? `option-${correctMatch[1]}` : "option-1";

//         questions.push({
//             question: questionLine,
//             optionOne,
//             optionTwo,
//             optionThree,
//             optionFour,
//             correctAnswer,
//         });
//     }

//     return questions;
// }



