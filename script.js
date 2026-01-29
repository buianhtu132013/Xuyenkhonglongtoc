// ===============================
// LONG TỘC STORY - SCRIPT FULL
// ===============================

// Danh sách chương
const chapterList = [
  { id: 1, title: "Chương 1: Huyết Long Thức Tỉnh" },
  { id: 2, title: "Chương 2: Long Hồn Tổ Tiên" },
  { id: 3, title: "Chương 3: Long Thần Quyền" },
  { id: 4, title: "Chương 4: Cổ Tộc Xuất Hiện" },
  { id: 5, title: "Chương 5: Bí Mật Long Tộc" }
];

let currentChapter = 1;
let fontSize = 20;

// ===============================
// Load chương từ file txt
// ===============================
function loadChapter(id) {
  currentChapter = id;

  const chapterTitle = document.getElementById("chapterTitle");
  const storyBox = document.getElementById("story");

  chapterTitle.innerText = chapterList[id - 1].title;

  // ✅ Load file đúng: chuong1.txt, chuong2.txt...
  fetch(`chuong${id}.txt`)
    .then((res) => {
      if (!res.ok) throw new Error("Không tìm thấy file");
      return res.text();
    })
    .then((data) => {
      storyBox.innerText = data;
    })
    .catch(() => {
      storyBox.innerHTML = `
        <div class="errorBox">
          ❌ Lỗi load chương! <br><br>
          Không tìm thấy file: <b>chuong${id}.txt</b>
        </div>
      `;
    });

  closeChapterMenu();
}

// ===============================
// Chương trước / sau
// ===============================
function prevChapter() {
  if (currentChapter > 1) {
    loadChapter(currentChapter - 1);
  }
}

function nextChapter() {
  if (currentChapter < chapterList.length) {
    loadChapter(currentChapter + 1);
  }
}

// ===============================
// Font chữ A+ / A-
// ===============================
function increaseFont() {
  fontSize += 2;
  document.getElementById("story").style.fontSize = fontSize + "px";
}

function decreaseFont() {
  fontSize -= 2;
  if (fontSize < 12) fontSize = 12;
  document.getElementById("story").style.fontSize = fontSize + "px";
}

// ===============================
// Dark / Light Mode
// ===============================
function toggleTheme() {
  document.body.classList.toggle("lightMode");
}

// ===============================
// MENU CHƯƠNG (Popup gọn)
// ===============================
function openChapterMenu() {
  const menu = document.getElementById("chapterMenu");
  menu.style.display = "block";
}

function closeChapterMenu() {
  const menu = document.getElementById("chapterMenu");
  menu.style.display = "none";
}

// ===============================
// Render danh sách chương
// ===============================
function renderChapterMenu() {
  const menuList = document.getElementById("chapterList");

  menuList.innerHTML = "";

  chapterList.forEach((chap) => {
    const btn = document.createElement("button");
    btn.className = "chapterBtn";
    btn.innerText = chap.title;

    btn.onclick = () => loadChapter(chap.id);

    menuList.appendChild(btn);
  });
}

// ===============================
// Khi mở web
// ===============================
window.onload = function () {
  renderChapterMenu();
  loadChapter(1);
};
