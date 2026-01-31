const chapters = [
  "chuong1.txt",
  "chuong2.txt",
  "chuong3.txt",
  "chuong4.txt"
];

let currentIndex = 0;

const selectBox = document.getElementById("chapterSelect");

// Dropdown chương
chapters.forEach((file, i) => {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = "Chương " + (i + 1);
  selectBox.appendChild(option);
});

// Load chương
async function loadChapter(index) {
  const box = document.getElementById("chapterContent");

  if (index < 0 || index >= chapters.length) return;

  currentIndex = index;
  selectBox.value = index;

  const fileName = chapters[index];

  // ✅ ĐÚNG: folder tên chapters/
  const url = "./chapters/" + fileName;

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
    box.innerHTML =
      "❌ Lỗi load chương!<br><br>" +
      err.message;
  }
}

// Next / Prev
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

// Chọn chương
function selectChapter() {
  loadChapter(parseInt(selectBox.value));
}

// Dark mode
function toggleDark() {
  document.body.classList.toggle("dark");
}

// Auto load chương cuối
window.onload = function () {
  let saved = localStorage.getItem("lastChapter");
  loadChapter(saved ? parseInt(saved) : 0);
};