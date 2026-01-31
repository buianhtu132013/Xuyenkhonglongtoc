// ===============================
// FIX LOAD + FONT ZOOM LIMIT
// ===============================

const chapterList = [
  { title: "Chương 1", file: "chapters/chuong1.txt" },
  { title: "Chương 2", file: "chapters/chuong2.txt" },
  { title: "Chương 3", file: "chapters/chuong3.txt" }
];

let currentChapter = 0;

// ===== FONT SIZE CONTROL =====
let fontSize = 18;          // mặc định
const minFont = 14;         // nhỏ nhất
const maxFont = 28;         // to nhất

// ===== HTML ELEMENTS =====
const chapterSelect = document.getElementById("chapterSelect");
const chapterContent = document.getElementById("chapterContent");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const fontMinus = document.getElementById("fontMinus");
const fontPlus = document.getElementById("fontPlus");

const toggleModeBtn = document.getElementById("toggleMode");

// ===============================
// MENU CHAPTER
// ===============================
function loadChapterMenu() {
  chapterSelect.innerHTML = "";

  chapterList.forEach((chap, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = chap.title;
    chapterSelect.appendChild(option);
  });
}

// ===============================
// LOAD CHAPTER FILE
// ===============================
async function loadChapter(index) {
  currentChapter = index;
  chapterSelect.value = index;

  const filePath = chapterList[index].file;

  chapterContent.innerHTML = "⏳ Đang tải...";

  try {
    const res = await fetch(filePath);

    if (!res.ok) throw new Error("Không tìm thấy: " + filePath);

    const text = await res.text();

    // ✅ Hiển thị đúng kiểu truyện (auto xuống dòng)
    chapterContent.innerHTML = `
      <div class="storyText">${text}</div>
    `;

    applyFontSize();
  } catch (err) {
    chapterContent.innerHTML = `
      <div class="errorBox">
        ❌ Lỗi load chương!<br><br>
        ${err.message}
      </div>
    `;
  }

  updateButtons();
}

// ===============================
// FONT SIZE APPLY
// ===============================
function applyFontSize() {
  const story = document.querySelector(".storyText");
  if (story) story.style.fontSize = fontSize + "px";
}

// ===============================
// UPDATE BUTTONS
// ===============================
function updateButtons() {
  prevBtn.disabled = currentChapter === 0;
  nextBtn.disabled = currentChapter === chapterList.length - 1;
}

// ===============================
// EVENT LISTENERS
// ===============================

// Chapter change
chapterSelect.addEventListener("change", (e) => {
  loadChapter(Number(e.target.value));
});

// Prev / Next
prevBtn.addEventListener("click", () => {
  if (currentChapter > 0) loadChapter(currentChapter - 1);
});

nextBtn.addEventListener("click", () => {
  if (currentChapter < chapterList.length - 1)
    loadChapter(currentChapter + 1);
});

// Font zoom -
fontMinus.addEventListener("click", () => {
  if (fontSize > minFont) {
    fontSize -= 2;
    applyFontSize();
  }
});

// Font zoom +
fontPlus.addEventListener("click", () => {
  if (fontSize < maxFont) {
    fontSize += 2;
    applyFontSize();
  }
});

// Dark mode
toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ===============================
// INIT
// ===============================
loadChapterMenu();
loadChapter(0);