const chapters = [
  "chuong1.txt",
  "chuong2.txt",
  "chuong3.txt",
  "chuong4.txt"
];

let currentIndex = 0;

const selectBox = document.getElementById("chapterSelect");

chapters.forEach((file, i) => {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = "Chương " + (i + 1);
  selectBox.appendChild(option);
});

// ✅ Base path chuẩn cho repo không phải username.github.io
const basePath = window.location.pathname.replace(/\/index\.html$/, "");

async function loadChapter(index) {
  const box = document.getElementById("chapterContent");

  if (index < 0 || index >= chapters.length) return;

  currentIndex = index;
  selectBox.value = index;

  const fileName = chapters[index];

  // ✅ URL chuẩn tuyệt đối
  const url = basePath + "/chapters/" + fileName;

  box.innerHTML = "⏳ Đang tải chương...";

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("Không tìm thấy: " + url);

    const text = await res.text();
    box.innerHTML = text;

    localStorage.setItem("lastChapter", index);

  } catch (err) {
    box.innerHTML = "❌ Lỗi load chương!<br><br>" + err.message;
  }
}

function nextChapter() {
  if (currentIndex < chapters.length - 1) loadChapter(currentIndex + 1);
}

function prevChapter() {
  if (currentIndex > 0) loadChapter(currentIndex - 1);
}

function selectChapter() {
  loadChapter(parseInt(selectBox.value));
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

window.onload = function () {
  loadChapter(0);
};