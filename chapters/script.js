let currentChapter = 1;
const maxChapters = 5;

/* ===== Elements ===== */
const storyContent = document.getElementById("story-content");
const chapterTitle = document.getElementById("chapter-title");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const prevBtn2 = document.getElementById("prev-btn2");
const nextBtn2 = document.getElementById("next-btn2");

const chapterMenu = document.getElementById("chapter-menu");
const chapterListBtn = document.getElementById("chapter-list-btn");

const themeBtn = document.getElementById("theme-btn");

const marqueeBar = document.getElementById("marquee-bar");
const marqueeText = document.getElementById("marquee-text");
const closeMarquee = document.getElementById("close-marquee");


/* ===== Load Chapter ===== */
function loadChapter(chapter) {
  storyContent.innerHTML = "⏳ Đang tải...";
  chapterTitle.innerText = `Chương ${chapter}`;

  fetch(`chapters/chuong${chapter}.txt`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy chương");
      return res.text();
    })
    .then(text => {
      storyContent.innerHTML = text.replace(/\n/g, "<br>");
      restartMarquee();
    })
    .catch(() => {
      storyContent.innerHTML = "❌ Chương chưa tồn tại!";
    });
}


/* ===== Restart Marquee (Fix Acode) ===== */
function restartMarquee() {
  marqueeBar.style.display = "flex";

  marqueeText.classList.remove("run");

  setTimeout(() => {
    marqueeText.classList.add("run");
  }, 100);
}


/* ===== Buttons ===== */
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
prevBtn.onclick = prevChapter;

nextBtn2.onclick = nextChapter;
prevBtn2.onclick = prevChapter;


/* ===== Chapter List ===== */
chapterListBtn.onclick = () => {
  chapterMenu.style.display =
    chapterMenu.style.display === "block" ? "none" : "block";
};

function buildChapterMenu() {
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
  document.body.classList.toggle("dark");
};


/* ===== Close Marquee ===== */
closeMarquee.onclick = () => {
  marqueeBar.style.display = "none";
};


/* ===== Start ===== */
buildChapterMenu();
loadChapter(currentChapter);

/* chạy lại mỗi 1 phút */
setInterval(restartMarquee, 60000);