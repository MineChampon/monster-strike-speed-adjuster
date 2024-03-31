// クソコードオブザイヤー受賞
const isInSpeedRange = (speed, range=[417.20, 422]) => {
    if (range[0] <= speed && speed <= range[1]){
        return true;
    };
    return false;
};

const adjustSpeed = (inputSpeed) => {
    const patterns = {
        count1: [],
        count2: [],
        count3: [],
        count4: [],
        count5: [],
    };
    const checkedPatterns = []

    console.log("inputSpeed: ", inputSpeed)

    // 1つ
    for (const key1 in wakuwakuMaster) {
        for (const key2 in wakuwakuMaster[key1]) {
            const addSpeed = wakuwakuMaster[key1][key2]
            const addedSpeed = inputSpeed + addSpeed
            if (isInSpeedRange(addedSpeed)){
                patterns.count1.push(
                    {
                        wakuwakuList: `${key1} ${key2}(+${wakuwakuMaster[key1][key2]})`,
                        totalValue: Math.round(addSpeed * 100) / 100,
                        totalSpeed: Math.round(addedSpeed * 100) / 100
                    }
                )
            }
        }
    }

    // 2つ
    for (const key1 in wakuwakuMaster) {
        for (const key2 in wakuwakuMaster[key1]) {
            for (const key3 in wakuwakuMaster) {
                for (const key4 in wakuwakuMaster[key3]) {
                    if(key1 == key3){
                        continue;
                    }
                    const pat = [
                        `${key1} ${key2}(+${wakuwakuMaster[key1][key2]})`,
                        `${key3} ${key4}(+${wakuwakuMaster[key3][key4]})`
                    ]
                    const patStr = pat.sort().join(' + ')
                    if (checkedPatterns.includes(patStr)){
                        continue;
                    }
                    checkedPatterns.push(patStr)

                    const addSpeed = wakuwakuMaster[key1][key2] + wakuwakuMaster[key3][key4]
                    const addedSpeed = inputSpeed + addSpeed
                    if (isInSpeedRange(addedSpeed)){
                        patterns.count2.push(
                            {
                                wakuwakuList: patStr,
                                totalValue: Math.round(addSpeed * 100) / 100,
                                totalSpeed: Math.round(addedSpeed * 100) / 100
                            }
                        )
                    }
                }
            }
        }
    }

    // 3つ
    for (const key1 in wakuwakuMaster) {
        for (const key2 in wakuwakuMaster[key1]) {
            for (const key3 in wakuwakuMaster) {
                for (const key4 in wakuwakuMaster[key3]) {
                    for (const key5 in wakuwakuMaster) {
                        for (const key6 in wakuwakuMaster[key5]) {
                            if(key1 == key3 || key1 == key5 || key3 == key5){
                                continue;
                            }
                            const pat = [
                                `${key1} ${key2}(+${wakuwakuMaster[key1][key2]})`,
                                `${key3} ${key4}(+${wakuwakuMaster[key3][key4]})`,
                                `${key5} ${key6}(+${wakuwakuMaster[key5][key6]})`
                            ]
                            const patStr = pat.sort().join(' + ')
                            if (checkedPatterns.includes(patStr)){
                                continue;
                            }
                            checkedPatterns.push(patStr)

                            const addSpeed = wakuwakuMaster[key1][key2]
                                + wakuwakuMaster[key3][key4]
                                + wakuwakuMaster[key5][key6]
                            const addedSpeed = inputSpeed + addSpeed
                            if (isInSpeedRange(addedSpeed)){
                                patterns.count3.push(
                                    {
                                        wakuwakuList: patStr,
                                        totalValue: Math.round(addSpeed * 100) / 100,
                                        totalSpeed: Math.round(addedSpeed * 100) / 100
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(patterns)
    return patterns;
};