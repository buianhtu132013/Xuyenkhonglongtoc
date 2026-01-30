let currentChapter = 1;
let fontSize = 20;

const totalChapters = 5;

function loadChapter(num) {
  currentChapter = num;

  fetch(`chapters/chuong${num}.txt`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy chương");
      return res.text();
    })
    .then(text => {
      let lines = text.split("\n");
      let title = lines[0];

      document.getElementById("chapterTitle").innerText = title;
      document.getElementById("storyText").innerText =
        lines.slice(1).join("\n");

      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch(() => {
      document.getElementById("storyText").innerText =
        "❌ Lỗi load chương!";
    });
}

/* NEXT / PREV */
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

/* FONT SIZE */
function fontPlus() {
  fontSize += 2;
  document.getElementById("storyText").style.fontSize = fontSize + "px";
}

function fontMinus() {
  fontSize -= 2;
  document.getElementById("storyText").style.fontSize = fontSize + "px";
}

/* THEME */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* MENU */
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

/* CHAPTER LIST */
function buildChapterList() {
  let list = document.getElementById("chapterList");

  for (let i = 1; i <= totalChapters; i++) {
    let btn = document.createElement("button");
    btn.innerText = "Chương " + i;
    btn.onclick = () => {
      loadChapter(i);
      toggleMenu();
    };
    list.appendChild(btn);
  }
}

/* AUTO HIDE TOP BAR WHEN SCROLL DOWN */
let lastScroll = 0;
window.addEventListener("scroll", () => {
  let topBar = document.getElementById("topBar");
  let currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 120) {
    topBar.style.top = "-80px"; // hide
  } else {
    topBar.style.top = "0"; // show
  }

  lastScroll = currentScroll;
});

/* START */
buildChapterList();
loadChapter(1);