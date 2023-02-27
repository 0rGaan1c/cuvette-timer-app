const getValue = (element) => {
  return Number(element.value);
};

const getElement = (id) => {
  return document.getElementById(id);
};

let isTimerStarted = false;
const startBtn = getElement("start");
const resetBtn = getElement("reset");
const pauseBtn = getElement("pause");
const hourInput = getElement("hour");
const minuteInput = getElement("minute");
const secondInput = getElement("second");
const dismissBtn = getElement("dismiss");

const getTotalSeconds = () => {
  const hourVal = getValue(hourInput);
  const minuteVal = getValue(minuteInput);
  const secondVal = getValue(secondInput);

  let totalSeconds = 0;

  if (hourVal !== 0) {
    totalSeconds = hourVal * 60 * 60;
  }
  if (minuteVal !== 0) {
    totalSeconds += minuteVal * 60;
  }
  if (secondVal !== 0) {
    totalSeconds += secondVal;
  }

  return totalSeconds;
};

const resetTimer = () => {
  clearInterval(timer);
  secondInput.value = 0;
  minuteInput.value = 0;
  hourInput.value = 0;
  isTimerStarted = false;
};

const pauseTimer = () => {
  clearInterval(timer);
};

const showDialogBox = () => {
  const modal = getElement("modal");
  modal.classList.remove("hide");
};

const audio = new Audio("timeout.mp3");
const startTimer = () => {
  if (!isTimerStarted) {
    isTimerStarted = true;
  }
  let totalSeconds = getTotalSeconds();
  let totalMinutes = (totalSeconds - (totalSeconds % 60)) / 60;
  let totalHours = getValue(hourInput);

  timer = setInterval(() => {
    if (totalSeconds === 0) {
      audio.play();
      showDialogBox();
      resetTimer();
      return;
    }

    if (totalMinutes % 60 === 0 && totalSeconds % 60 === 0 && totalHours > 0) {
      totalHours--;
      hourInput.value = totalHours;
    }

    if (totalSeconds % 60 === 0 && totalMinutes > 0) {
      totalMinutes--;
      minuteInput.value = totalMinutes % 60;
    }

    totalSeconds--;
    secondInput.value = totalSeconds % 60;
  }, 1000);
};

const canStartTimer = () => {
  const hourVal = getValue(hourInput);
  const minuteVal = getValue(minuteInput);
  const secondVal = getValue(secondInput);
  if (hourVal === 0 && minuteVal === 0 && secondVal === 0) {
    return false;
  }

  if (minuteVal > 59 || secondVal > 59) {
    return false;
  }

  return true;
};

startBtn.addEventListener("click", () => {
  if (canStartTimer()) {
    startTimer();
  }
});

resetBtn.addEventListener("click", () => {
  if (isTimerStarted) resetTimer();
});

pauseBtn.addEventListener("click", () => {
  if (isTimerStarted) pauseTimer();
});

dismissBtn.addEventListener("click", () => {
  const modal = getElement("modal");
  modal.classList.add("hide");
  audio.pause();
  audio.currentTime = 0;
});
