const greetingEl = document.querySelector(".greeting");
const timeEl = document.querySelector(".time");
//const enableVoiceBtn = document.getElementById("enableVoiceBtn");
const statusEl = document.getElementById("statusEl");

let lastSpokenGreeting = "";
let currentUtterance = null;
let audioCtx = null;

function setStatus(msg) {
  if (statusEl) statusEl.textContent = msg;
}

function playChimeFallback() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(660, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.25);
}

function getGreeting(hour24) {
  if (hour24 >= 5 && hour24 < 12) return "Good Morning";
  if (hour24 >= 12 && hour24 < 17) return "Good Afternoon";
  if (hour24 >= 17 && hour24 < 21) return "Good Evening";
  return "Good Night";
}

function speakGreeting(text) {
  const cleanText = (text || "").trim();
  if (!cleanText) return;

  playChimeFallback();

  if (
    !("speechSynthesis" in window) ||
    typeof SpeechSynthesisUtterance === "undefined"
  ) {
    setStatus(`Chime played ("speechSynthesis" unavailable): "${cleanText}"`);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find((v) =>
    v.lang.toLowerCase().startsWith("en"),
  );
  if (englishVoice) {
    utterance.voice = englishVoice;
    utterance.lang = englishVoice.lang;
  }

  utterance.rate = 1;
  utterance.onstart = () => setStatus(`Speaking: "${cleanText}"`);
  utterance.onend = () => {
    currentUtterance = null;
    setStatus(`Finished: "${cleanText}"`);
  };
  utterance.onerror = (e) => {
    currentUtterance = null;
    setStatus(`TTS error (${e.error || "failed"}) — chime played.`);
  };

  currentUtterance = utterance;
  window.speechSynthesis.resume();
  window.speechSynthesis.speak(utterance);

  setTimeout(() => {
    if (currentUtterance && !window.speechSynthesis.speaking) {
      setStatus(`TTS silent on device — chime played for "${cleanText}".`);
    }
  }, 600);
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

// enableVoiceBtn.addEventListener("click", () => {
//     const text = greetingEl.textContent?.trim() || getGreeting(new Date().getHours());
//     lastSpokenGreeting = text;
//     speakGreeting(text);
// });

if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    window.speechSynthesis.getVoices();
  });
}

updateClock(false);
setInterval(() => updateClock(true), 1000);
