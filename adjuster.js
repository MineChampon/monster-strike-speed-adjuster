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
    const inElPatterns = [];
  
    // wakuwakuMasterのkeyをすべてリストに格納
    const keys = Object.keys(wakuwakuMaster);
  
    // 1つ選択
    for (const key1 of keys) {
      const value1 = wakuwakuMaster[key1];
      const totalValue1 = value1;
      const totalSpeed1 = speed + totalValue1;
  
      // 417.5〜421に収まる場合、パターンに追加
      if (totalSpeed1 >= 417.5 && totalSpeed1 <= 421) {
        if (key1.includes("EL")) {
          inElPatterns.push({
            wakuwakuList: [key1],
            totalValue: totalValue1,
            totalSpeed: totalSpeed1,
          });
        } else {
          patterns.push({
            wakuwakuList: [key1],
            totalValue: totalValue1,
            totalSpeed: totalSpeed1,
          });
        }
      }
  
      // 2つ選択
      for (const key2 of keys) {
        if (key1 === key2) {
          continue;
        }
        const value2 = wakuwakuMaster[key2];
        const totalValue2 = value1 + value2;
        const totalSpeed2 = speed + totalValue2;
  
        // 417.5〜421に収まる場合、パターンに追加
        if (totalSpeed2 >= 417.5 && totalSpeed2 <= 421) {
          if (key1.includes("EL") || key2.includes("EL")) {
            inElPatterns.push({
              wakuwakuList: [key1, key2],
              totalValue: totalValue2,
              totalSpeed: totalSpeed2,
            });
          } else {
            patterns.push({
              wakuwakuList: [key1, key2],
              totalValue: totalValue2,
              totalSpeed: totalSpeed2,
            });
          }
        }
  
        // 3つ選択
        for (const key3 of keys) {
          if (key1 === key3 || key2 === key3) {
            continue;
          }
          const value3 = wakuwakuMaster[key3];
          const totalValue3 = value1 + value2 + value3;
          const totalSpeed3 = speed + totalValue3;
  
          // 417.5〜421に収まる場合、パターンに追加
          if (totalSpeed3 >= 417.5 && totalSpeed3 <= 421) {
            if (key1.includes("EL") || key2.includes("EL") || key3.includes("EL")) {
              inElPatterns.push({
                wakuwakuList: [key1, key2, key3],
                totalValue: totalValue3,
                totalSpeed: totalSpeed3,
              });
            } else {
              patterns.push({
                wakuwakuList: [key1, key2, key3],
                totalValue: totalValue3,
                totalSpeed: totalSpeed3,
              });
            }
          }
        }
      }
    }
  
    // パターンをkeyでソート
    patterns.sort((a, b) => a.wakuwakuList.join(",") < b.wakuwakuList.join(","));
    inElPatterns.sort((a, b) => a.wakuwakuList.join(",") < b.wakuwakuList.join(","));
  
    // 重複を除去
    const uniquePatterns = [];
    for (const pattern of patterns) {
      const key = pattern.wakuwakuList.join(",");
      if (!uniquePatterns.some(p => p.wakuwakuList.join(",") === key)) {
        uniquePatterns.push(pattern);
      }
    }
    const uniqueInElPatterns = [];
    for (const pattern of inElPatterns) {
      const key = pattern.wakuwakuList.join(",");
      if (!uniqueInElPatterns.some(p => p.wakuwakuList.join(",") === key)) {
        uniqueInElPatterns.push(pattern);
      }
    }
  
    return [uniquePatterns, uniqueInElPatterns];
  };
  
  const updateResult = (patterns, inElPatterns) => {
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "";
    if (patterns.length === 0 || inElPatterns.length === 0) {
      resultElement.innerHTML = "<p>調整可能なパターンが見つかりませんでした</p>";
      return;
    }
    const h2Element = document.createElement("h2");
    h2Element.textContent = 'ELなし';
    resultElement.appendChild(h2Element);
    let patternCount = 0
    for (const pattern of patterns) {
      const { wakuwakuList, totalValue, totalSpeed } = pattern;
      const text = `パターン${patternCount += 1}: ${wakuwakuList.join('と')}で合計${totalValue}増加します。スピード: ${totalSpeed}`;
      const h3Element = document.createElement("h3");
      h3Element.textContent = text;
      resultElement.appendChild(h3Element);
    }
    const elh2Element = document.createElement("h2");
    elh2Element.textContent = 'ELあり';
    resultElement.appendChild(elh2Element);
    let elpatternCount = 0
    for (const pattern of inElPatterns) {
      const { wakuwakuList, totalValue, totalSpeed } = pattern;
      const text = `パターン${elpatternCount += 1}: ${wakuwakuList}合計${totalValue}増加します。スピード: ${totalSpeed}`;
      const h3Element = document.createElement("h3");
      h3Element.textContent = text;
      resultElement.appendChild(h3Element);
    }
  };
  
  const speedInput = document.getElementById("speed");
  speedInput.addEventListener("input", () => {
    const speed = parseFloat(speedInput.value);
    const pat = adjustSpeed(speed);
    updateResult(pat[0], pat[1]);
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
  