
var subject = sessionStorage.getItem("subject");
var brandCode = sessionStorage.getItem("brandCode");
var studentName = sessionStorage.getItem("name");
var address = sessionStorage.getItem("address");
var fatherName = sessionStorage.getItem("fatherName");
var enrollment = sessionStorage.getItem("enrollment");
var imgUrl = sessionStorage.getItem("imgUrl");
var allQuestion = [];
var userAnswers = [];

const quizKey = brandCode + "_" + enrollment + "_" + subject + "_quizTaken";
if (localStorage.getItem(quizKey)) {
    swal("Not Allowed", "You have already attempted this quiz.", "error");
    setTimeout(() => {
        window.location.href = "../welcome/welcome.html"; // or welcome.html
    }, 2000);
}


let duration = 10 * 60; // 10 minutes in seconds
let timerInterval;


// reading question from localstorage
if (localStorage.getItem(brandCode + "_" + subject + "_question") != null) {
    allQuestion = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_question"));
    console.log(allQuestion);
    allQuestion.sort(() => Math.random() - 0.5);
}

var index = 0;
var total = allQuestion.length;
var right = 0;
var wrong = 0;
var allUserResult = [];
var particularUserResult = [];
startTimer(duration);
let mainBox = document.querySelector(".main");
var allOptionsEl = document.querySelectorAll(".option");
let questionEl = document.querySelector(".question-el");
var nextBtn = document.querySelector(".next-btn");
const getQuestionFunc = () => {
    if (index == total) {
        return endQuiz();
    }
    resetFuc();
    let data = allQuestion[index];
    document.getElementById("progress").innerText = `Question ${index + 1} of ${total}`;
    // Render media preview if available
    const mediaContainer = document.getElementById("media-preview");
    mediaContainer.innerHTML = ""; // clear previous
    if (data.mediaFile && data.mediaType) {
        if (data.mediaType.startsWith("image/")) {
            mediaContainer.innerHTML = `<img src="${data.mediaFile}" style="max-width: 50%; height: auto;">`;
        } else if (data.mediaType.startsWith("audio/")) {
            mediaContainer.innerHTML = `<audio controls src="${data.mediaFile}"></audio>`;
        } else if (data.mediaType.startsWith("video/")) {
            mediaContainer.innerHTML = `<video controls width="300" src="${data.mediaFile}"></video>`;
        }
    }
    questionEl.innerHTML = `Q-${index + 1} : ${data.question}`;
    let progress = ((index + 1) / total) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
    allOptionsEl[0].nextElementSibling.innerText = data.optionOne;
    allOptionsEl[1].nextElementSibling.innerText = data.optionTwo;
    allOptionsEl[2].nextElementSibling.innerText = data.optionThree;
    allOptionsEl[3].nextElementSibling.innerText = data.optionFour;
    updateProgress();
}
getQuestionFunc();

nextBtn.onclick = function () {
    let data = allQuestion[index];
    var ans = getAnswer();

    userAnswers[index] = ans;

    if (ans == data.correctAnswer) {
        right++;
        console.log("right ", right);
    } else {
        wrong++;
        console.log("wrong ", wrong);
    }
    index++;
    getQuestionFunc();
    updateProgress();
    return;
}

const getAnswer = () => {
    var answer;
    allOptionsEl.forEach((input) => {
        if (input.checked) {
            answer = input.value;
            console.log("ans is :", answer);
        }
    });
    return answer;
}

function resetFuc() {
    allOptionsEl.forEach((input) => {
        input.checked = false;
    })
}
const endQuiz = () => {
    mainBox.innerHTML = `
    <h2>Click On Submit button to complete your examination.<h2>
    <div align="center">    
        <button class="btn btn-primary quiz-submit-btn">Submit</button>
    </div>
    `;
    submitFunc();
    clearInterval(timerInterval);

}
const submitFunc = () => {
    if (localStorage.getItem(brandCode + "_" + subject + "_result") != null) {
        allUserResult = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_result"));
    }
    if (localStorage.getItem(brandCode + "_" + enrollment + "_result") != null) {
        particularUserResult = JSON.parse(localStorage.getItem(brandCode + "_" + enrollment + "_result"));
    }
    var submitBtn = document.querySelector(".quiz-submit-btn");
    submitBtn.onclick = function () {
        localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
        allQuestion = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_question"));
        let correctAnswers = allQuestion.map(q => q.correctAnswer);
        localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
        localStorage.setItem("allQuestion", JSON.stringify(allQuestion));

        localStorage.setItem(brandCode + "_" + enrollment + "_" + subject + "_quizTaken", true);

        allUserResultFunc();
        particularUserResultFunc();
        this.innerHTML = "please Wait...";
        this.disable = true;
    }
}

const allUserResultFunc = () => {
    allUserResult.push({
        name: studentName,
        fatherName: fatherName,
        enrollment: enrollment,
        rightAns: right,
        wrongAns: wrong,
        subject: subject,
        maxMark: total
    });
    localStorage.setItem(brandCode + "_" + subject + "_result", JSON.stringify(allUserResult));
    setTimeout(function () {
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("address");
        sessionStorage.removeItem("enrollment");
        sessionStorage.removeItem("fatherName");
        sessionStorage.removeItem("brandCode");
        sessionStorage.removeItem("subject");
        window.location = "../view/result.html";
    }, 2000)
}
const particularUserResultFunc = () => {
    particularUserResult.push({
        name: studentName,
        fatherName: fatherName,
        enrollment: enrollment,
        rightAns: right,
        wrongAns: wrong,
        subject: subject,
        maxMark: total,
        profilePic: imgUrl
    });
    localStorage.setItem(brandCode + "_" + enrollment + "_result", JSON.stringify(particularUserResult));
    setTimeout(function () {
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("address");
        sessionStorage.removeItem("enrollment");
        sessionStorage.removeItem("fatherName");
        sessionStorage.removeItem("brandCode");
        essionStorage.removeItem("subject");
        window.location = "../view/result.html";
    }, 2000)
}

function startTimer(seconds) {
    let remaining = seconds;
    const timeEl = document.getElementById("time");

    timerInterval = setInterval(() => {
        let min = Math.floor(remaining / 60);
        let sec = remaining % 60;
        timeEl.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

        if (remaining <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Time's up! Auto-submitting your quiz.");
            endQuiz();
        }

        remaining--;
    }, 1000);
}

let tabSwitchCount = 0;

window.addEventListener("blur", () => {
    tabSwitchCount++;
    swal(" Switching tabs is not allowed!", " If this continues, your quiz may be auto-submitted.", "warning");

    // Auto-submit after 3 tab switches (optional)
    if (tabSwitchCount >= 0) {
        swal("Switching tabs is not allowed! You switched tabs at a times.", " Auto-submitting the quiz.", "warning");
        endQuiz();
    }
});

// Disable back and forward navigation
window.onload = function () {
    // Push an extra history state to trap back navigation
    history.pushState(null, null, location.href);

    window.addEventListener("popstate", function (event) {
        // Push it again to stay on same page
        history.pushState(null, null, location.href);

        // Show warning and auto-submit
        swal(" Back/Forward navigation is not allowed!", "The quiz will now be submitted.", "warning");

        setTimeout(() => {
            endQuiz();
        }, 1500);
    });
};

function createQuestionProgress(total) {
    const container = document.getElementById('question-progress');
    container.innerHTML = ''; // Reset
    for (let i = 0; i < total; i++) {
        const box = document.createElement('div');
        box.classList.add('progress-box');
        box.id = `q-box-${i}`;
        container.appendChild(box);
    }
}

function updateProgress() {
    const tracker = document.getElementById("progress-tracker");
    tracker.innerHTML = "";

    for (let i = 0; i < allQuestion.length; i++) {
        const square = document.createElement("div");
        square.classList.add('progress-square');

        if (userAnswers[i]) {
            square.classList.add("answered");
        } else {
            square.classList.add("not-answered");
        }

        const tooltip = document.createElement("span");
        tooltip.classList.add('tooltip-text');
        tooltip.innerText = `Question ${i + 1}`;

        square.textContent = i + 1;
        square.setAttribute("data-question", i);
        square.setAttribute("onclick", `goToQuestion(${i})`);

        square.appendChild(tooltip);
        tracker.appendChild(square);
    }
}


function goToQuestion(i) {
    index = i;                // update the current question index
    getQuestionFunc();        // show the selected question
    updateProgress();         // update the progress UI
    window.scrollTo({ top: 0, behavior: 'smooth' }); // optional scroll to top
}
//tensoerflow.js and mediapipe for camera access
// Start camera and face detection when quiz loads
window.addEventListener('DOMContentLoaded', () => {
    startQuizWithCamera();
});

async function startQuizWithCamera() {
    const videoElement = document.getElementById('camera');
    const canvasElement = document.getElementById('faceCanvas');
    const canvasCtx = canvasElement.getContext('2d');
    let lastFaceDetectedTime = Date.now();
    const detectionThreshold = 2000;

    const faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    // faceMesh.onResults((results) => {
    //     canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    //     // Draw static green circle at center
    //     const centerX = canvasElement.width / 2;
    //     const centerY = canvasElement.height / 2;
    //     const radius = 140;
    
    //     canvasCtx.beginPath();
    //     canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    //     canvasCtx.strokeStyle = 'green';
    //     canvasCtx.lineWidth = 3;
    //     canvasCtx.stroke();
    
    //     // Face detection
    //     let faceInsideCircle = false;
    
    //     if (results.multiFaceLandmarks.length > 0) {
    //         const face = results.multiFaceLandmarks[0];
    
    //         // Get nose tip as reference point (landmark 1 is usually center-ish)
    //         const nose = face[1];
    //         const faceX = nose.x * canvasElement.width;
    //         const faceY = nose.y * canvasElement.height;
    
    //         // Calculate distance from circle center
    //         const dist = Math.sqrt(
    //             Math.pow(faceX - centerX, 2) + Math.pow(faceY - centerY, 2)
    //         );
    
    //         // Check if face center is inside circle
    //         if (dist < radius) {
    //             faceInsideCircle = true;
    //             lastFaceDetectedTime = Date.now(); // reset timer
    //         }
    //     }
    
    //     // Auto-submit if face outside circle for too long
    //     if (!faceInsideCircle && Date.now() - lastFaceDetectedTime > detectionThreshold) {
    //         autoSubmitQuiz();
    //     }
    // });
    faceMesh.onResults((results) => {
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
        // Draw static green circle at center
        const centerX = canvasElement.width / 2;
        const centerY = canvasElement.height / 2;
        const radius = 170;
    
        canvasCtx.beginPath();
        canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        canvasCtx.strokeStyle = 'green';
        canvasCtx.lineWidth = 3;
        canvasCtx.stroke();
    
        let faceInsideCircle = false;
    
        if (results.multiFaceLandmarks.length > 0) {
            const face = results.multiFaceLandmarks[0];
    
            // Choose multiple key landmarks: forehead, chin, left/right cheek, nose tip
            const keyLandmarks = [
                face[1],   // nose tip
                face[10],  // forehead
                face[152], // chin
                face[234], // left cheek
                face[454], // right cheek
            ];
    
            // Check all key landmarks are within the circle
            faceInsideCircle = keyLandmarks.every(point => {
                const x = point.x * canvasElement.width;
                const y = point.y * canvasElement.height;
                const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                return dist < radius - 10; // small margin for stricter check
            });
    
            if (faceInsideCircle) {
                lastFaceDetectedTime = Date.now(); // reset timer
            }
        }
    
        // Auto-submit if face outside circle for too long (2 seconds)
        if (!faceInsideCircle && Date.now() - lastFaceDetectedTime > detectionThreshold) {
            autoSubmitQuiz();
        }
    });
      

    const camera = new Camera(videoElement, {
        onFrame: async () => {
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
            await faceMesh.send({ image: videoElement });
        },
        width: 640,
        height: 480
    });

    camera.start();
}

let quizAlreadySubmitted = false;

function autoSubmitQuiz() {
    if (quizAlreadySubmitted) return;
    quizAlreadySubmitted = true;

    swal({
        title: "Quiz Auto-Submitted!",
        text: "Your face was not properly visible inside the circle.",
        icon: "warning",
        button: "OK",
    }).then(() => {
        endQuiz(); // Your actual quiz submission logic
    });
}



