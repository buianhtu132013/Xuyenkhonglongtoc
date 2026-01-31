const content = document.getElementById("content");

const prevBtnTop = document.getElementById("prevBtnTop");
const nextBtnTop = document.getElementById("nextBtnTop");
const prevBtnBottom = document.getElementById("prevBtnBottom");
const nextBtnBottom = document.getElementById("nextBtnBottom");

const topControls = document.getElementById("topControls");
const bottomControls = document.getElementById("bottomControls");

const menuBtn = document.getElementById("menuBtn");
const chapterMenu = document.getElementById("chapterMenu");

const marqueeText = document.getElementById("marqueeText");

let currentChapter = 1;

/* Neon chạy lại mỗi lần load chương */
function restartMarquee() {
  marqueeText.parentElement.innerHTML =
    `<marquee id="marqueeText" scrollamount="3">
      ✨ Tác Giả Tú chúc bạn đọc truyện vui vẻ. Thanks ✨
    </marquee>`;
}

/* Load chương */
async function loadChapter(chap) {
  const file = `chapters/chuong${chap}.txt`;

  try {
    const res = await fetch(file);
    if (!res.ok) throw "no";

    const text = await res.text();
    content.innerText = text;

    currentChapter = chap;
    restartMarquee();
  } catch {
    content.innerText = "❌ Chương chưa tồn tại!";
  }
}

/* Tạo menu chương tự động */
async function generateChapters() {
  chapterMenu.innerHTML = "";

  for (let i = 1; i <= 200; i++) {
    const res = await fetch(`chapters/chuong${i}.txt`);
    if (!res.ok) break;

    const btn = document.createElement("button");
    btn.innerText = `Chương ${i}`;
    btn.onclick = () => {
      loadChapter(i);
      chapterMenu.classList.add("hidden");
    };

    chapterMenu.appendChild(btn);
  }
}

/* Menu bật tắt */
menuBtn.onclick = () => {
  chapterMenu.classList.toggle("hidden");
};

/* Điều hướng */
prevBtnTop.onclick = () => loadChapter(currentChapter - 1);
prevBtnBottom.onclick = () => loadChapter(currentChapter - 1);

nextBtnTop.onclick = () => loadChapter(currentChapter + 1);
nextBtnBottom.onclick = () => loadChapter(currentChapter + 1);

/* Scroll hiện nút */
window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  let scrollBottom =
    window.innerHeight + scrollTop >= document.body.offsetHeight - 50;

  // Nút trên: chỉ hiện ở đầu
  if (scrollTop < 100) {
    topControls.style.display = "flex";
  } else {
    topControls.style.display = "none";
  }

  // Nút dưới: chỉ hiện ở cuối
  if (scrollBottom) {
    bottomControls.style.display = "flex";
  } else {
    bottomControls.style.display = "none";
  }
});

/* Khởi động */
generateChapters();
loadChapter(1);
restartMarquee();