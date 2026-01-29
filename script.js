// ===============================
// WEBSITE ĐỌC TRUYỆN LONG TỘC
// FULL SCRIPT - AUTO TITLE
// ===============================

let currentChapter = 1;
let totalChapters = 5;
let fontSize = 20;

// ===============================
// LOAD CHƯƠNG
// ===============================
function loadChapter(id) {
  currentChapter = id;

  const titleEl = document.getElementById("chapterTitle");
  const storyEl = document.getElementById("story");

  storyEl.innerHTML = "⏳ Đang tải chương...";

  fetch(`chuong${id}.txt`)
    .then((res) => {
      if (!res.ok) throw new Error("Không tìm thấy file");
      return res.text();
    })
    .then((data) => {
      // Tách dòng
      const lines = data.split("\n");

      // Dòng đầu là tên chương
      const chapterName = lines[0].trim();

      // Nội dung còn lại
      const content = lines.slice(1).join("\n");

      // Hiển thị title
      titleEl.innerText = chapterName;

      // Hiển thị nội dung giữ xuống dòng
      storyEl.innerText = content;

      // Set font size
      storyEl.style.fontSize = fontSize + "px";
    })
    .catch(() => {
      titleEl.innerText = "❌ Lỗi";
      storyEl.innerHTML = `
        <div style="padding:20px;color:red;">
          Không tìm thấy file: <b>chuong${id}.txt</b><br>
          Hãy chắc chắn file tồn tại trong repo.
        </div>
      `;
    });

  renderChapterMenu();
}

// ===============================
// CHƯƠNG TRƯỚC / SAU
// ===============================
function prevChapter() {
  if (currentChapter > 1) {
    loadChapter(currentChapter - 1);
  }
}

function nextChapter() {
  if (currentChapter < totalChapters) {
    loadChapter(currentChapter + 1);
  }
}

// ===============================
// FONT SIZE
// ===============================
function increaseFont() {
  fontSize += 2;
  document.getElementById("story").style.fontSize = fontSize + "px";
}

function decreaseFont() {
  fontSize -= 2;
  if (fontSize < 14) fontSize = 14;
  document.getElementById("story").style.fontSize = fontSize + "px";
}

// ===============================
// DARK/LIGHT MODE
// ===============================
function toggleTheme() {
  document.body.classList.toggle("lightMode");
}

// ===============================
// DANH SÁCH CHƯƠNG
// ===============================
function renderChapterMenu() {
  const listEl = document.getElementById("chapterList");
  listEl.innerHTML = "";

  for (let i = 1; i <= totalChapters; i++) {
    const btn = document.createElement("button");
    btn.className = "chapterBtn";
    btn.innerText =
      i === currentChapter ? `▶ Chương ${i}` : `Chương ${i}`;

    btn.onclick = () => loadChapter(i);

    listEl.appendChild(btn);
  }
}

// ===============================
// MENU HIỆN / ẨN
// ===============================
function openChapterMenu() {
  document.getElementById("chapterMenu").style.display = "block";
}

function closeChapterMenu() {
  document.getElementById("chapterMenu").style.display = "none";
}

// ===============================
// KHỞI ĐỘNG WEB
// ===============================
window.onload = function () {
  loadChapter(1);
};
