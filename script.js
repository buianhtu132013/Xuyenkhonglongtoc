// ================================
//  WEB ĐỌC TRUYỆN LONG TỘC (FULL)
//  5 CHƯƠNG + SIDEBAR + NEXT/PREV
//  FONT LIMIT + DARK/LIGHT MODE
// ================================


// ===== DANH SÁCH 5 CHƯƠNG =====
const chapters = [
  { title: "Chương 1: Huyết Long Thức Tỉnh", file: "chapters/chuong1.txt" },
  { title: "Chương 2: Long Hồn Tổ Tiên", file: "chapters/chuong2.txt" },
  { title: "Chương 3: Long Thần Quyền", file: "chapters/chuong3.txt" },
  { title: "Chương 4: Cổ Tộc Xuất Hiện", file: "chapters/chuong4.txt" },
  { title: "Chương 5: Bí Mật Long Tộc", file: "chapters/chuong5.txt" }
];


// ===== BIẾN HỆ THỐNG =====
let currentChapter = 0;
let fontSize = 18;


// ================================
// LOAD CHƯƠNG
// ================================
function loadChapter(index) {
  fetch(chapters[index].file)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Không tìm thấy file chương: " + chapters[index].file);
      }
      return res.text();
    })
    .then((text) => {
      // Title chương
      document.getElementById("chapterTitle").innerText =
        chapters[index].title;

      // Nội dung chương
      document.getElementById("content").innerText = text;

      // Update chương hiện tại
      currentChapter = index;

      // Highlight chương đang đọc
      highlightActiveChapter();

      // Auto scroll lên đầu
      document.querySelector(".main").scrollTop = 0;
    })
    .catch((err) => {
      document.getElementById("content").innerText =
        "❌ Lỗi load chương!\n\n" + err.message;
    });
}


// ================================
// HIỆN DANH SÁCH CHƯƠNG (SIDEBAR)
// ================================
function renderChapterList() {
  const listDiv = document.getElementById("chapterList");
  listDiv.innerHTML = "";

  chapters.forEach((chap, index) => {
    const item = document.createElement("div");
    item.className = "chapter-item";
    item.innerText = chap.title;

    // Click load chương
    item.onclick = () => loadChapter(index);

    listDiv.appendChild(item);
  });
}


// ================================
// HIGHLIGHT CHƯƠNG ĐANG ĐỌC
// ================================
function highlightActiveChapter() {
  const items = document.querySelectorAll(".chapter-item");

  items.forEach((item, i) => {
    if (i === currentChapter) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}


// ================================
// NEXT CHAPTER
// ================================
function nextChapter() {
  if (currentChapter < chapters.length - 1) {
    loadChapter(currentChapter + 1);
  } else {
    alert("✅ Hết chương rồi!");
  }
}


// ================================
// PREV CHAPTER
// ================================
function prevChapter() {
  if (currentChapter > 0) {
    loadChapter(currentChapter - 1);
  } else {
    alert("✅ Đây là chương đầu tiên!");
  }
}


// ================================
// FONT SIZE +
// ================================
function increaseFont() {
  if (fontSize < 40) {
    fontSize += 2;
    document.getElementById("content").style.fontSize = fontSize + "px";
  }
}


// ================================
// FONT SIZE -
// ================================
function decreaseFont() {
  if (fontSize > 14) {
    fontSize -= 2;
    document.getElementById("content").style.fontSize = fontSize + "px";
  }
}


// ================================
// DARK/LIGHT MODE
// ================================
function toggleTheme() {
  document.body.classList.toggle("light");
}


// ================================
// AUTO START KHI MỞ WEB
// ================================
window.onload = () => {
  renderChapterList();   // hiện danh sách chương
  loadChapter(0);        // auto load chương 1
};