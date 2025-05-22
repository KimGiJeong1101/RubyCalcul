const inputs = document.querySelectorAll("input");

function animateValue(input, newValue) {
  const duration = 500; // 애니메이션 지속 시간 (ms)
  const frameRate = 30; // 프레임 간격 (ms)
  const totalFrames = duration / frameRate;
  let currentFrame = 0;

  const startValue = Number(input.value) || 0;
  const valueDiff = newValue - startValue;

  if (valueDiff === 0) return;

  clearInterval(input._animateTimer); // 기존 애니메이션 중단

  input._animateTimer = setInterval(() => {
    currentFrame++;
    const progress = currentFrame / totalFrames;
    const eased = progress < 1 ? Math.pow(progress, 0.6) : 1; // 부드러운 가속 느낌
    const displayValue = Math.round(startValue + valueDiff * eased);
    input.value = displayValue;

    if (currentFrame >= totalFrames) {
      clearInterval(input._animateTimer);
      input.value = newValue; // 정확히 맞춰줌
    }
  }, frameRate);

  // 빛나는 효과 유지
  input.classList.remove("animate");
  void input.offsetWidth;
  input.classList.add("animate");
}

function limitInput(input, max, warnEl, label) {
  if (input.value > max) {
    input.value = max;
    warnEl.textContent = `${label}는 최대 ${max}회까지만 가능합니다.`;
    warnEl.style.display = "block";
  } else {
    warnEl.style.display = "none";
  }
}

function updateProfitStyle(input, value) {
  input.classList.remove("profit", "loss", "neutral");
  if (value > 0) {
    input.classList.add("profit");
  } else if (value < 0) {
    input.classList.add("loss");
  } else {
    input.classList.add("neutral");
  }
}

function calc() {
  const keyPerBox = 60;
  const keyPerDungeon = 6;

  const buy50Input = document.getElementById("buy50");
  const buy80Input = document.getElementById("buy80");
  const warn50 = document.getElementById("warn50");
  const warn80 = document.getElementById("warn80");

  limitInput(buy50Input, 20, warn50, "50루비 상자");
  limitInput(buy80Input, 50, warn80, "80루비 상자");

  const buy50 = Number(buy50Input.value);
  const buy80 = Number(buy80Input.value);
  const rewardInterval = Number(inputs[2].value);

  const totalBox = buy50 + buy80;
  const totalUsedRuby = buy50 * 50 + buy80 * 80;
  const totalKeys = totalBox * keyPerBox;
  const totalDungeons = Math.floor(totalKeys / keyPerDungeon);
  const rubyRewardCount =
    rewardInterval > 0 ? Math.floor(totalDungeons / rewardInterval) : 0;
  const totalRubyReward = rubyRewardCount * 80;
  const rubyProfit = totalRubyReward - totalUsedRuby;

  animateValue(inputs[3], totalBox);
  animateValue(inputs[4], totalUsedRuby);
  animateValue(inputs[5], totalKeys);
  animateValue(inputs[6], totalDungeons);
  animateValue(inputs[7], rubyRewardCount);
  animateValue(inputs[8], totalRubyReward);
  animateValue(inputs[9], rubyProfit);
  updateProfitStyle(inputs[9], rubyProfit);

  // 그래프 데이터 업데이트
  rubyChart.data.datasets[0].data = [totalUsedRuby, totalRubyReward];
  rubyChart.update();
}

inputs[0].addEventListener("input", calc);
inputs[1].addEventListener("input", calc);
inputs[2].addEventListener("input", calc);
