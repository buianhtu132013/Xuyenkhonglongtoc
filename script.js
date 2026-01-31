let currentChapter = 1;
const totalChapters = 5;

const contentDiv = document.getElementById("content");
const titleDiv = document.getElementById("chapterTitle");
const menuDiv = document.getElementById("menu");

function loadMenu() {
  menuDiv.innerHTML = "";
  for (let i = 1; i <= totalChapters; i++) {
    let btn = document.createElement("button");
    btn.innerText = "Chương " + i;
    btn.onclick = () => loadChapter(i);
    menuDiv.appendChild(btn);
  }
}

function toggleMenu() {
  menuDiv.classList.toggle("hidden");
}

async function loadChapter(chap) {
  currentChapter = chap;
  titleDiv.innerText = "Chương " + chap;
  contentDiv.innerText = "Đang tải...";

  let file = `chapters/chuong${chap}.txt`;

  try {
    let res = await fetch(file);

    if (!res.ok) {
      contentDiv.innerHTML =
        "❌ Không tìm thấy chương<br><b>" + file + "</b>";
      return;
    }

    let text = await res.text();
    contentDiv.innerText = text;

  } catch (err) {
    contentDiv.innerHTML =
      "❌ Lỗi load chương!<br>" + err;
  }
}

function nextChapter() {
  if (currentChapter < totalChapters) {
    loadChapter(currentChapter + 1);
  }
}

function prevChapter() {
  if (currentChapter > 1) {
    loadChapter(currentChapter - 1);
  }
}

/* Khởi động */
loadMenu();
loadChapter(1);