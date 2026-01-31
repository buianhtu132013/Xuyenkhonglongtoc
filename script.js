// ===============================
// LONG TỘC CUỐI CÙNG - SCRIPT FULL
// Load file: chuong1.txt, chuong2.txt...
// ===============================

let currentChapter = 1;
let fontSize = 20;
let darkMode = true;

// Danh sách tên chương
const chapterTitles = {
  1: "Huyết Long Thức Tỉnh",
  2: "Cổ Ấn Trong Huyết",
  3: "Long Thần Quyền",
  4: "Cổ Tộc Xuất Hiện",
  5: "Bí Mật Long Tộc"
};

// ===============================
// LOAD CHƯƠNG TXT (ROOT)
// ===============================
function loadChapter(num) {
  currentChapter = num;

  const title = chapterTitles[num] || `Chương ${num}`;
  document.getElementById("chapterTitle").innerText =
    `Chương ${num}: ${title}`;

  const contentBox = document.getElementById("chapterContent");

  contentBox.innerHTML = "⏳ Đang tải...";

  // ✅ ĐÚNG: file nằm root
  fetch(`chuong${num}.txt`)
    .then((res) => {
      if (!res.ok) throw new Error("Không tìm thấy file");
      return res.text();
    })
    .then((text) => {
      contentBox.innerHTML = "";

      // Hiển thị từng dòng
      const lines = text.split("\n");
      lines.forEach((line) => {
        const p = document.createElement("p");
        p.textContent = line;
        contentBox.appendChild(p);
      });
    })
    .catch(() => {
      contentBox.innerHTML = `
        ❌ Lỗi load chương!<br>
        Kiểm tra file: <b>chuong${num}.txt</b>
      `;
    });
}

// ===============================
// NÚT TRƯỚC / SAU
// ===============================
function prevChapter() {
  if (currentChapter > 1) loadChapter(currentChapter - 1);
}

function nextChapter() {
  loadChapter(currentChapter + 1);
}

// ===============================
// FONT SIZE
// ===============================
function increaseFont() {
  fontSize += 2;
  document.getElementById("chapterContent").style.fontSize = fontSize + "px";
}

function decreaseFont() {
  fontSize -= 2;
  if (fontSize < 14) fontSize = 14;
  document.getElementById("chapterContent").style.fontSize = fontSize + "px";
}

// ===============================
// DARK MODE
// ===============================
function toggleTheme() {
  darkMode = !darkMode;

  if (darkMode) {
    document.body.style.background = "#111";
    document.body.style.color = "white";
  } else {
    document.body.style.background = "white";
    document.body.style.color = "black";
  }
}

// ===============================
// LOAD CHƯƠNG 1 KHI MỞ WEB
// ===============================
window.onload = () => {
  loadChapter(1);
};