window.onload = function () {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
    console.log(userAnswers);
    console.log(correctAnswers);
    let score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        score++;
      }
    }
  
    document.getElementById("score").innerText = `You scored ${score} out of ${correctAnswers.length}`;
  };
  
  function viewResponses() {
    window.location = "../view/responses.html";
  }
  