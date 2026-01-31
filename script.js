// =============================
// DANH SÁCH CHƯƠNG
// =============================
const chapters = [
  "chuong1.txt",
  "chuong2.txt",
  "chuong3.txt"
];

let currentIndex = 0;

const selectBox = document.getElementById("chapterSelect");

// =============================
// TẠO DROPDOWN
// =============================
chapters.forEach((file, i) => {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = "Chương " + (i + 1);
  selectBox.appendChild(option);
});

// =============================
// LOAD CHƯƠNG
// =============================
async function loadChapter(index) {
  const box = document.getElementById("chapterContent");

  if (index < 0 || index >= chapters.length) return;

  currentIndex = index;
  selectBox.value = index;

  const fileName = chapters[index];
  const url = "./chapter/" + fileName;

  box.innerHTML = "⏳ Đang tải chương...";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Không tìm thấy file: " + url);
    }

    const text = await res.text();
    box.innerHTML = text;

    localStorage.setItem("lastChapter", index);

    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (err) {
    box.innerHTML = "❌ Lỗi load chương!<br><br>" + err.message;
  }
}

// =============================
// NEXT / PREV
// =============================
function nextChapter() {
  if (currentIndex < chapters.length - 1) {
    loadChapter(currentIndex + 1);
  }
}

function prevChapter() {
  if (currentIndex > 0) {
    loadChapter(currentIndex - 1);
  }
}

function selectChapter() {
  loadChapter(parseInt(selectBox.value));
}

// =============================
// DARK MODE
// =============================
function toggleDark() {
  document.body.classList.toggle("dark");
}

// =============================
// AUTO LOAD
// =============================
window.onload = function () {
  let saved = localStorage.getItem("lastChapter");
  if (saved !== null) {
    loadChapter(parseInt(saved));
  } else {
    loadChapter(0);
  }
};

// =============================
// ẨN THANH TRÊN KHI SCROLL
// =============================
let lastScroll = 0;
const topBar = document.getElementById("topBar");

window.addEventListener("scroll", () => {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 100) {
    topBar.classList.add("hideBar");
  } else {
    topBar.classList.remove("hideBar");
  }

  lastScroll = currentScroll;
});