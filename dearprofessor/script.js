document.addEventListener("DOMContentLoaded", function () {
  const paragraphs = document.querySelectorAll("p");
  const textarea = document.getElementById("myTextarea");
  const copyBtn = document.querySelector(".copy");
  const recipientInput = document.getElementById("recipient");
  const senderInput = document.getElementById("sender");
  const allParagraphs = document.querySelectorAll(".list p");
  const sendBtn = document.getElementById("sendBtn");
  const emailInput = document.getElementById("toemail");

  //p 항목 클릭시 텍스트 영역에 자동 입력
  paragraphs.forEach(function (p) {
    p.addEventListener("click", function () {
      textarea.value += p.textContent + "\n";
    });
  });


  // 복사 버튼 클릭 → textarea 내용 복사
  copyBtn.addEventListener("click", function () {
    // 최신 방식 사용 (호환성 좋음)
    navigator.clipboard.writeText(textarea.value)
      .then(() => {
        copyBtn.textContent = "Copied";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 1500);
      })
      .catch(err => {
        alert("Copy failed 😥");
        console.error(err);
      });
  });
  
 // 각 문장의 원본 HTML 저장
  const originalTexts = [];
  allParagraphs.forEach(p => {
    originalTexts.push(p.innerHTML);
  });

  // 입력값 바뀔 때마다 실행
  recipientInput.addEventListener("input", updateParagraphs);
  senderInput.addEventListener("input", updateParagraphs);

  function updateParagraphs() {
    const recipient = recipientInput.value || "[recipient]";
    const sender = senderInput.value || "[sender]";

    allParagraphs.forEach((p, i) => {
      let updated = originalTexts[i];
      updated = updated.replace(/\[recipient\]/g, recipient);
      updated = updated.replace(/\[sender\]/g, sender);
      p.innerHTML = updated;
    });
  }
  
  sendBtn.addEventListener("click", function () {
    const recipient = emailInput.value.trim();
    const bodyText = textarea.value.trim();

    if (!recipient) {
      alert("Enter the recipient email address!");
      return;
    }

    // Gmail 전송 URL 구성
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(recipient)}` +
      `&body=${encodeURIComponent(bodyText)}`;

    window.open(gmailUrl, "_blank");
  });
  
});
