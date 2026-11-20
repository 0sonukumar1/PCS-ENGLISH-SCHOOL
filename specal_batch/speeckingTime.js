const greetingEl = document.querySelector(".greeting");
const timeEl = document.querySelector(".time");
let lastSpokenGreeting = "";

function getGreeting(hour24) {
  if (hour24 >= 5 && hour24 < 12) return "Good Morning";
  if (hour24 >= 12 && hour24 < 17) return "Good Afternoon";
  if (hour24 >= 17 && hour24 < 21) return "Good Evening";
  return "Good Night";
}

function speakGreeting(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
}

function updateClock(shouldSpeakIfChanged = false) {
  const now = new Date();
  const hour24 = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const period = hour24 < 12 ? "AM" : "PM";
  const hour12 = String(hour24 % 12 || 12).padStart(2, "0");

  const currentGreeting = getGreeting(hour24);
  greetingEl.textContent = currentGreeting;
  timeEl.textContent = `${hour12}:${minutes}:${seconds} ${period}`;

  if (shouldSpeakIfChanged && currentGreeting !== lastSpokenGreeting) {
    lastSpokenGreeting = currentGreeting;
    speakGreeting(currentGreeting);
  }
}

document.addEventListener(
  "pointerdown",
  () => {
    if (!lastSpokenGreeting && greetingEl.textContent) {
      lastSpokenGreeting = greetingEl.textContent;
      speakGreeting(greetingEl.textContent);
    }
  },
  { once: true },
);

window.addEventListener("load", () => {
  updateClock(true);
});

updateClock(false);
setInterval(() => updateClock(true), 1000);
