const wakuwakuMaster = {
    "同族加速": 20,
    "同族加速M": 26.6,
    "同族加速L": 33.3,
    "同族加速EL": 36.6,
    "同族加撃速": 16,
    "同族加速命": 16,
    "同族加撃速M": 21.2,
    "同族加速命M": 21.2,
    "同族加撃速L": 26.6,
    "同族加速命L": 26.6,
    "同族加撃速EL": 29.3,
    "同族加速命EL": 29.3,
    "撃種加速": 10,
    "戦型加速": 10,
    "撃種加速M": 13.3,
    "戦型加速M": 13.3,
    "撃種加速L": 16.6,
    "戦型加速L": 16.6,
    "撃種加速EL": 18.3,
    "戦型加速EL": 18.3,
    "撃種加撃速": 8,
    "戦型加撃速": 8,
    "撃種加速命": 8,
    "戦型加速命": 8,
    "撃種加撃速M": 10.6,
    "戦型加撃速M": 10.6,
    "撃種加速命M": 10.6,
    "戦型加速命M": 10.6,
    "撃種加撃速L": 13.2,
    "戦型加撃速L": 13.2,
    "撃種加速命L": 13.2,
    "戦型加速命L": 13.2,
    "撃種加撃速EL": 14.5,
    "戦型加撃速EL": 14.5,
    "撃種加速命EL": 14.5,
    "戦型加速命EL": 14.5,
  };
  
  const adjustSpeed = (speed) => {
    const patterns = [];
    for (const key in wakuwakuMaster) {
      const value = wakuwakuMaster[key];
      for (let i = 1; i <= 3; i++) {
        if (speed + i * value >= 417 && speed + i * value <= 421) {
          patterns.push({
            key,
            value,
            count: i,
            totalValue: i * value,
            totalSpeed: speed + i * value,
          });
        }
      }
    }
    return patterns.sort((a, b) => a.count - b.count);
  };
  
  const updateResult = (patterns) => {
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "";
    if (patterns.length === 0) {
      resultElement.innerHTML = "<p>調整可能なパターンが見つかりませんでした</p>";
      return;
    }
  
    for (const pattern of patterns) {
      const { key, value, count, totalValue, totalSpeed } = pattern;
      const text = `パターン${count}: ${key}を${count}、合計${totalValue}増加します。Speed: ${totalSpeed}`;
      const h2Element = document.createElement("h3");
      h2Element.textContent = text;
      resultElement.appendChild(h2Element);
    }
  };
  
  const speedInput = document.getElementById("speed");
  speedInput.addEventListener("input", () => {
    const speed = parseFloat(speedInput.value);
    const patterns = adjustSpeed(speed);
    updateResult(patterns);
  });
  
  const initialSpeed = speedInput.value;
  const patterns = adjustSpeed(initialSpeed);
  updateResult(patterns);
  