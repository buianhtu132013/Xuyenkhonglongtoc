let currentChapter = 1;
const maxChapters = 5;

const storyContent = document.getElementById("story-content");
const chapterTitle = document.getElementById("chapter-title");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn2 = document.getElementById("prev-btn2");
const nextBtn2 = document.getElementById("next-btn2");

const chapterBtn = document.getElementById("chapter-btn");
const chapterMenu = document.getElementById("chapter-menu");

const themeBtn = document.getElementById("theme-btn");

const closeMarquee = document.getElementById("close-marquee");
const marqueeBar = document.getElementById("marquee-bar");

/* ===== Load Chapter ===== */
function loadChapter(chap) {
  storyContent.innerHTML = "⏳ Đang tải...";
  chapterTitle.innerText = "Chương " + chap;

  fetch(`chapters/chuong${chap}.txt`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy");
      return res.text();
    })
    .then(text => {
      storyContent.innerHTML = text.replace(/\n/g, "<br>");
    })
    .catch(() => {
      storyContent.innerHTML = "❌ Chưa có chương này!";
    });
}

/* ===== Next/Prev ===== */
function nextChapter() {
  if (currentChapter < maxChapters) {
    currentChapter++;
    loadChapter(currentChapter);
  }
}

function prevChapter() {
  if (currentChapter > 1) {
    currentChapter--;
    loadChapter(currentChapter);
  }
}

nextBtn.onclick = nextChapter;
nextBtn2.onclick = nextChapter;
prevBtn.onclick = prevChapter;
prevBtn2.onclick = prevChapter;

/* ===== Menu Chapter ===== */
chapterBtn.onclick = () => {
  chapterMenu.style.display =
    chapterMenu.style.display === "block" ? "none" : "block";
};

function buildMenu() {
  chapterMenu.innerHTML = "";
  for (let i = 1; i <= maxChapters; i++) {
    let btn = document.createElement("button");
    btn.innerText = "Chương " + i;
    btn.onclick = () => {
      currentChapter = i;
      loadChapter(i);
      chapterMenu.style.display = "none";
    };
    chapterMenu.appendChild(btn);
  }
}

/* ===== Dark Mode ===== */
themeBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");
};

/* ===== Close Marquee ===== */
closeMarquee.onclick = () => {
  marqueeBar.style.display = "none";
};

/* START */
buildMenu();
loadChapter(currentChapter);