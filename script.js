let currentChapter = 1;
let fontSize = 20;
let darkMode = true;

const totalChapters = 5;

function loadChapter(num) {
  if (num < 1 || num > totalChapters) return;

  currentChapter = num;

  document.getElementById("storyText").innerText = "Đang tải...";

  fetch(`chuong${num}.txt`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy file");
      return res.text();
    })
    .then(text => {
      let lines = text.split("\n");

      let title = lines[0].trim();
      let content = lines.slice(1).join("\n");

      document.getElementById("chapterTitle").innerText = title;
      document.getElementById("storyText").innerText = content;

      updateButtons();

      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch(() => {
      document.getElementById("storyText").innerText =
        "❌ Lỗi load chương! Kiểm tra file chuong" + num + ".txt";
    });
}

function updateButtons() {
  document.getElementById("prevBtn").disabled = currentChapter === 1;
  document.getElementById("nextBtn").disabled =
    currentChapter === totalChapters;

  document.getElementById("prevBtn2").disabled = currentChapter === 1;
  document.getElementById("nextBtn2").disabled =
    currentChapter === totalChapters;
}

function nextChapter() {
  loadChapter(currentChapter + 1);
}

function prevChapter() {
  loadChapter(currentChapter - 1);
}

function fontPlus() {
  fontSize += 2;
  document.getElementById("storyText").style.fontSize = fontSize + "px";
}

function fontMinus() {
  fontSize -= 2;
  if (fontSize < 14) fontSize = 14;
  document.getElementById("storyText").style.fontSize = fontSize + "px";
}

function toggleMode() {
  darkMode = !darkMode;

  document.body.className = darkMode ? "dark" : "light";
}

window.onload = () => {
  loadChapter(1);
};