const chapterSelect = document.getElementById("chapterSelect");
const chapterTitle = document.getElementById("chapterTitle");
const chapterContent = document.getElementById("chapterContent");

let currentChapter = 1;
let fontSize = 18;
const totalChapters = 5;

/* Load danh sách chương */
for (let i = 1; i <= totalChapters; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = "Chương " + i;
  chapterSelect.appendChild(option);
}

/* Load chương */
function loadChapter(num) {
  currentChapter = num;
  chapterTitle.innerText = "Chương " + num;
  chapterSelect.value = num;

  fetch(`chapters/chuong${num}.txt`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy file chương!");
      return res.text();
    })
    .then(text => {
      chapterContent.innerText = text;
    })
    .catch(err => {
      chapterContent.innerText = "❌ " + err.message;
    });
}

/* Nút chương */
document.getElementById("prevBtn").onclick = () => {
  if (currentChapter > 1) loadChapter(currentChapter - 1);
};

document.getElementById("nextBtn").onclick = () => {
  if (currentChapter < totalChapters) loadChapter(currentChapter + 1);
};

/* Dropdown */
chapterSelect.onchange = () => {
  loadChapter(Number(chapterSelect.value));
};

/* Dark mode */
document.getElementById("toggleMode").onclick = () => {
  document.body.classList.toggle("dark");
};

/* Font */
document.getElementById("fontPlus").onclick = () => {
  fontSize += 2;
  chapterContent.style.fontSize = fontSize + "px";
};

document.getElementById("fontMinus").onclick = () => {
  fontSize -= 2;
  chapterContent.style.fontSize = fontSize + "px";
};

/* Start */
loadChapter(1);