const greetingEl = document.querySelector(".greeting");
const timeEl = document.querySelector(".time");

function getGreeting(hour24) {
  if (hour24 >= 5 && hour24 < 12) return "Good Morning";
  if (hour24 >= 12 && hour24 < 17) return "Good Afternoon";
  if (hour24 >= 17 && hour24 < 21) return "Good Evening";
  return "Good Night";
}

function updateClock() {
  const now = new Date();
  const hour24 = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const period = hour24 < 12 ? "AM" : "PM";
  const hour12 = String(hour24 % 12 || 12).padStart(2, "0");

  greetingEl.textContent = getGreeting(hour24);
  timeEl.textContent = `${hour12}:${minutes}:${seconds} ${period}`;
}

updateClock();
setInterval(updateClock, 1000);
