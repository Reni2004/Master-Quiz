window.onload = function () {
    const allQuestion = JSON.parse(localStorage.getItem("allQuestion")) || [];
    const userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
    const correctAnswers = JSON.parse(localStorage.getItem("correctAnswers")) || [];
  
    const responsesContainer = document.getElementById("responsesContainer");
  
    allQuestion.forEach((q, index) => {
      const correct = correctAnswers[index] || "Not Available"; // "A", "B", etc.
      const user = userAnswers[index] || "Not Answered";
       // may be "A", "B", etc. or undefined
  
      const block = document.createElement("div");
      block.className = "question-block";
  
      const question = document.createElement("h3");
      question.innerText = `Q${index + 1}: ${q.question}`;
      block.appendChild(question);
      // ✅ Media preview block
      if (q.mediaFile && q.mediaType) {
        const mediaWrapper = document.createElement("div");
        mediaWrapper.style.margin = "10px 0";

        if (q.mediaType.startsWith("image/")) {
          mediaWrapper.innerHTML = `<img src="${q.mediaFile}" style="max-width: 50%; height: auto;" alt="Image Question">`;
        } else if (q.mediaType.startsWith("audio/")) {
          mediaWrapper.innerHTML = `<audio controls src="${q.mediaFile}"></audio>`;
        } else if (q.mediaType.startsWith("video/")) {
          mediaWrapper.innerHTML = `<video controls width="300" src="${q.mediaFile}"></video>`;
        }

        block.appendChild(mediaWrapper);
      }

  
      const options = ['optionOne', 'optionTwo', 'optionThree', 'optionFour'];
      options.forEach((opt, optIndex) => {
        const letter = String.fromCharCode(65 + optIndex); // A, B, C, D
        const optionText = q[opt];
  
        const div = document.createElement("div");
        div.className = "option";
  
        // Add icons and styles
        if (letter === correct) {
          div.classList.add("correct");
          div.innerHTML = `<i class="fas fa-check-circle"></i> ${letter}. ${optionText}`;
        } else if (letter === user && letter !== correct && user !== "Not Answered" && correct !== "Not Available") {
          div.classList.add("incorrect");
          div.innerHTML = `<i class="fas fa-times-circle"></i> ${letter}. ${optionText}`; 
        } else {
          div.innerHTML = `${letter}. ${optionText}`;
        }
  
        block.appendChild(div);
      });
      console.log("Question", index + 1);
console.log("User:", userAnswers[index]);
console.log("Correct:", correctAnswers[index]);

  
      // Summary section
      const summary = document.createElement("p");
      summary.innerHTML = `
        <strong>Your Answer:</strong> ${user || "Not Answered"} <br/>
        <strong>Correct Answer:</strong> ${correct}
      `;
      summary.style.marginTop = "10px";
      block.appendChild(summary);
  
      responsesContainer.appendChild(block);
    });
  };
  function downloadPDF() {
    const target = document.getElementById("responsesContainer");
  
    html2canvas(target, {
      scale: 2,
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let position = 0;
      if (imgHeight > pageHeight) {
        // Multi-page PDF
        let heightLeft = imgHeight;
  
        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= pageHeight;
          if (heightLeft > 0) pdf.addPage();
        }
      } else {
        // Single-page PDF
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }
  
      pdf.save("quiz_responses.pdf");
    });
  }
  
  function goHome() {
    window.location.href = "../homepage/homepage.html"; 
  }
  