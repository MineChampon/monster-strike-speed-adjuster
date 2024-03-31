const updateResult = (speed, patterns) => {
  if (!patterns) return
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = "";
  const {count1, count2, count3, count4, count5} = patterns
  const lengths = [count1, count2, count3, count4, count5].map(count => count.length);

  // すべての要素数が0であればtrueを返す
  if (lengths.every(length => length === 0)) {
    resultElement.innerHTML = `<p>${speed}kmは調整可能なパターンが見つかりませんでした</p>`;
    return;
  }
  let patternCount = 0
  for (const pattern of patterns.count1) {
    const { wakuwakuList, totalValue, totalSpeed } = pattern;
    const text = `パターン${patternCount += 1}: ${wakuwakuList}で合計${totalValue}増加します。スピード: ${totalSpeed}`;
    const h3Element = document.createElement("h5");
    h3Element.textContent = text;
    resultElement.appendChild(h3Element);
  }
  for (const pattern of patterns.count2) {
    const { wakuwakuList, totalValue, totalSpeed } = pattern;
    const text = `パターン${patternCount += 1}: ${wakuwakuList}で合計${totalValue}増加します。スピード: ${totalSpeed}`;
    const h3Element = document.createElement("h5");
    h3Element.textContent = text;
    resultElement.appendChild(h3Element);
  }
  for (const pattern of patterns.count3) {
    const { wakuwakuList, totalValue, totalSpeed } = pattern;
    const text = `パターン${patternCount += 1}: ${wakuwakuList}で合計${totalValue}増加します。スピード: ${totalSpeed}`;
    const h3Element = document.createElement("h5");
    h3Element.textContent = text;
    resultElement.appendChild(h3Element);
  }
};

const speedInput = document.getElementById("speed");
speedInput.addEventListener("input", () => {
  const speed = speedInput.value ? parseFloat(speedInput.value) : 0;
  const pat = adjustSpeed(speed);
  updateResult(speed, pat);
});

// エンターキー無効化
speedInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});
  
const initialSpeed = speedInput.value;
const pat = adjustSpeed(initialSpeed);
updateResult(pat[0], pat[1]);
