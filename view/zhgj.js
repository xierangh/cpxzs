import x from './globalUtils'

export default {
    erXing() {
        var erXingArr = [];
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                erXingArr.push(i + "" + j);
            }
        }
        return erXingArr;
    },
    // 生成三星做号全部数据
    sanXing() {
        var sanXingArr = [];
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                for (var k = 0; k <= 9; k++) {
                    sanXingArr.push(i + "" + j + "" + k);
                }
            }
        }
        return sanXingArr;
    },
    // 生成四星做号全部数据
    siXing() {
        var siXingArr = [];
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                for (var k = 0; k <= 9; k++) {
                    for (var m = 0; m <= 9; m++) {
                        siXingArr.push(i + "" + j + "" + k + "" + m);
                    }
                }
            }
        }
        return siXingArr;
    },

// 生成五星做号全部数据
    wuXing() {
        var wuXingArr = [];
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                for (var k = 0; k <= 9; k++) {
                    for (var m = 0; m <= 9; m++) {
                        for (var n = 0; n <= 9; n++) {
                            wuXingArr.push(i + "" + j + "" + k + "" + m + "" + n);
                        }
                    }
                }
            }
        }
        return wuXingArr;
    },
    // 转为组选
    // targetArr:目标数组
    turnZuXuan(targetArr) {
        var resultArr = [], subNumArr = null, length = null;
        if (targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            subNumArr = item.split("");
            subNumArr.sort();
            length = subNumArr.length;
            //去掉一致的号码
            // if (subNumArr[0] != subNumArr[length - 1]) {
            if (resultArr.indexOf(subNumArr.join("")) == -1) {
                resultArr.push(item);
            }
            // }
        }
        return resultArr;
    },
    // 定位杀
    // targetArr：目标数组，shaArr：要杀的数组，index:位置：万位1，千位2，其他同理
    removeDingWei(targetArr, shaArr, posIndex) {
        var resultArr = [], tempArr = null;
        if (shaArr == null || shaArr.length == 0 || targetArr.length == 0) {
            return targetArr;
        }

        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split('');
            var flagsha = false;
            for(var subindex=0;subindex<shaArr.length;subindex++){
                if(shaArr[subindex] == tempArr[posIndex - 1]){
                    flagsha = true;
                    break;
                }
            }
            if (!flagsha) {
                resultArr.push(item);
            }
            // if (shaArr.indexOf(parseInt(tempArr[posIndex - 1])) == -1) {
            //     resultArr.push(item);
            // }
        }
        return resultArr;
    },
    // 合尾杀
    // targetArr:目标数组，weiNumArr:合尾数组
    heWei(targetArr, weiNumArr) {
        var resultArr = [], tempArr = null, sum = 0, sumLength = 0;
        if (weiNumArr == null || weiNumArr.length == 0 || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            sum = 0;
            tempArr = item.split('');
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subItem = tempArr[subindex];
                sum += parseInt(subItem);
            }
            sum=sum+'';
            tempArr = sum.split('');
            sumLength = tempArr.length;
            if (weiNumArr.indexOf(parseInt(tempArr[sumLength - 1])) == -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },
// 和值选
    // targetArr:目标数组，weiNumArr:和值数组
    heZhi(targetArr, weiNumArr) {
        var resultArr = [], tempArr = null, sum = 0, sumLength = 0;
        if (weiNumArr == null || weiNumArr.length == 0 || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            sum = 0;
            tempArr = item.split("");
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subItem = tempArr[subindex];
                sum += parseInt(subItem);
            }
            if (weiNumArr.indexOf(sum) != -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },
// 跨度选
// targetArr：目标数组，kuaDuArr：跨度数组
    kuaDu(targetArr, kuaDuArr) {
        var resultArr = [], tempArr = null, length = 0, diff = 0;
        if (kuaDuArr == null || kuaDuArr.length == 0 || targetArr.length == 0) {
            return targetArr;
        }
        length = targetArr[0].length;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("").sort();
            diff = tempArr[length - 1] - tempArr[0];
            if (kuaDuArr.indexOf(diff) != -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

    // 跨度杀
// targetArr：目标数组，kuaDuArr：跨度数组
    removekKuaDu(targetArr, kuaDuArr) {
        var resultArr = [], tempArr = null, length = 0, diff = 0;
        if (kuaDuArr == null || kuaDuArr.length == 0 || targetArr.length == 0) {
            return targetArr;
        }
        length = targetArr[0].length;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("").sort();
            diff = tempArr[length - 1] - tempArr[0];
            if (kuaDuArr.indexOf(diff) == -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 胆码选
// targetArr：目标数组，danMaArr：胆码数组
    danMa(targetArr, danMaArr) {
        var resultArr = [], tempArr = null;
        if (danMaArr == null || danMaArr.length == 0 || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            for (var subIndex = 0; subIndex < tempArr.length; subIndex++) {
                var subItem = tempArr[subIndex];
                if (danMaArr.indexOf(parseInt(subItem)) != -1) {
                    resultArr.push(item);
                    break;
                }
            }
        }
        return resultArr;
    },
    // 和值杀
    // targetArr：目标数组，sumArr：和值数组
    removeSum(targetArr, sumArr) {
        var resultArr = [], tempArr = null, sum = 0;
        if (sumArr == null || sumArr.length == 0 || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            sum = 0;
            tempArr = item.split("");
            for (var subIndex = 0; subIndex < tempArr.length; subIndex++) {
                var subItem = tempArr[subIndex];
                sum += parseInt(subItem);
            }

            if (sumArr.indexOf(sum) == -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },
    // 杀大小
    // targetArr：目标数组，sumArr：和值数组
    removeBigSmall(targetArr, bigSmallArr) {
        var resultArr = [], tempArr = null, pattern = null;
        if (bigSmallArr == null || bigSmallArr.length == 0
            || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            pattern = "";
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subItem = tempArr[subindex];
                if (subItem >= 5) {
                    pattern += "大";
                } else {
                    pattern += "小";
                }
            }
            if (bigSmallArr.indexOf(pattern) == -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 杀奇偶
// targetArr：目标数组，oddEvenArr：奇偶数组
    removeOddEven (targetArr, oddEvenArr) {
        var resultArr = [], tempArr = null, pattern = null;
        if (oddEvenArr == null || oddEvenArr.length == 0
            || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            pattern = "";
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subItem = tempArr[subindex];
                if (subItem % 2 == 0) {
                    pattern += "偶";
                } else {
                    pattern += "奇";
                }
            }
            if (oddEvenArr.indexOf(pattern) == -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 杀质合
// targetArr：目标数组，primeCompoArr：质合数组
    removePrimeCompos(targetArr, primeCompoArr) {
        var resultArr = [], tempArr = null, pattern = null;
        if (primeCompoArr == null || primeCompoArr.length == 0
            || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            pattern = "";
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subItem = tempArr[subindex];
                if (this.isPrime(subItem)) {
                    pattern += "质";
                } else {
                    pattern += "合";
                }
            }
            if (primeCompoArr.indexOf(pattern) == -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

    // 是否是质数
    isPrime(num) {
        var isPrime = true, numTemp = null;
        if (num == 1 || num == 2) {
            isPrime = true;
        } else {
            if (num % 2 == 0) {
                isPrime = false;
            } else {
                numTemp = Math.sqrt(num);
                for (var i = 3; i <= numTemp; i += 2) {
                    if (num % i == 0) {
                        break;
                    }
                }
                if (i > numTemp) {
                    isPrime = true;
                } else {
                    isPrime = false;
                }
            }
        }
        return isPrime;
    },
// 杀012路
// targetArr：目标数组，zotArr：012路数组
    removeZeroOneTwo(targetArr, zotArr) {
        var resultArr = [], tempArr = null, pattern = null, tempNum = null;
        if (zotArr == null || zotArr.length == 0 || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            pattern = "";
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subItem = tempArr[subindex];
                tempNum = subItem % 3;
                if (tempNum == 0) {
                    pattern += "0";
                } else if (tempNum == 1) {
                    pattern += "1";
                } else {
                    pattern += "2";
                }
            }
            if (zotArr.indexOf(pattern) == -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

    // 大小比
    // targetArr：目标数组，bigSmallArr：大小比数组
    bigSmallPercent(targetArr, bigSmallArr) {
        var resultArr = [], tempArr = null, bigCount = 0, smallCount = 0, percentStr = null;
        if (bigSmallArr == null || bigSmallArr.length == 0
            || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            bigCount = 0;
            smallCount = 0;
            tempArr = item.split("");
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subItem = parseInt(tempArr[subindex]);
                if (subItem >= 5) {
                    bigCount++;
                } else {
                    smallCount++;
                }
            }
            percentStr = bigCount + ":" + smallCount;
            if (bigSmallArr.indexOf(percentStr) != -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },
    // 质合比
    // targetArr：目标数组，primeArr：质合比数组
    primePercent(targetArr, primeArr) {
        var resultArr = [], tempArr = null, primeCount = 0, compositeCount = 0, percentStr = null, numTemp = null;
        if (primeArr == null || primeArr.length == 0 || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            primeCount = 0;
            compositeCount = 0;
            tempArr = item.split("");
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subItem = parseInt(tempArr[subindex]);
                if (this.isPrime(subItem)) {
                    primeCount++;
                } else {
                    compositeCount++;
                }
            }
            percentStr = primeCount + ":" + compositeCount;
            if (primeArr.indexOf(percentStr) != -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 奇偶比
// targetArr：目标数组，oddEvenArr：奇偶比数组
    oddEvenPercent(targetArr, oddEvenArr)
    {
        var resultArr = [], tempArr = null, oddCount = 0, evenCount = 0, percentStr = null;
        if (oddEvenArr == null || oddEvenArr.length == 0
            || targetArr.length == 0) {
            return targetArr;
        }
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            oddCount = 0;
            evenCount = 0;
            tempArr = item.split("");
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subItem = parseInt(tempArr[subindex]);
                if (subItem % 2 == 0) {
                    evenCount++;
                } else {
                    oddCount++;
                }
            }
            percentStr = oddCount + ":" + evenCount;
            if (oddEvenArr.indexOf(percentStr) != -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },


    // 胆组计算
    danZuResult(targetArr, numArr, countArr) {
        var resultArr = [], tempArr = [], tempCount = 0;
        numArr = numArr.uniquelize();
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempCount = 0;
            tempArr = item.split("");
            tempArr = tempArr.uniquelize();
            for (var subindex = 0; subindex < tempArr.length; subindex++) {
                var subitem = parseInt(tempArr[subindex]);
                if (numArr.indexOf(subitem) != -1) {
                    tempCount++;
                }
            }

            if (countArr.indexOf(tempCount) != -1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 求胆组
// targetArr：目标数组，firstNumArr：第一个胆组数组，firstCount：出胆数量，其他依次排列，如果没有值，则传null
// 注意，这里的顺序是按照有值到无值的顺序排列的，并不是按照万千百十个排列的，有值之间是无序的
    danZu(targetArr, firstNumArr, firstCountArr) {
        var resultArr = [];
        if (targetArr.length == 0
            || firstNumArr == null|| firstNumArr.length == 0
            || firstCountArr == null|| firstCountArr.length == 0
        ) {
            return targetArr;
        }
        resultArr = this.danZuResult(targetArr, firstNumArr,firstCountArr);

        return resultArr;
    },

    // 连数个数计算
    consecutiveCount(targetNum) {
        var targetArr = targetNum.split("");
        targetArr.sort();
        var length = 0;
        var numPrev = 0, numNext = 0;
        var resultArr = targetArr.uniquelize();
        length = resultArr.length;
        if (resultArr[length - 1] - resultArr[0] == 9) {
            var addIndex = 0;
            for (var i = 0; i < length - 1; i++) {
                numPrev = resultArr[i];
                numNext = resultArr[i + 1];
                if (numNext - numPrev != 1) {
                    addIndex = i;
                    break;
                }
            }
            var addArr = [];
            for (var index = 0; index < resultArr.length; index++) {
                var item = resultArr[index];
                item = parseInt(item);
                if (item <= addIndex) {
                    item += 10;
                }
                addArr.push(item);
            }
            addArr.sort(function (a, b) {
                return a - b;
            });
            resultArr = addArr;
        }
        var maxNumArr = [];
        var indexFlag = 1;
        for (var i = 0; i < length - 1; i++) {
            numPrev = resultArr[i];
            numNext = resultArr[i + 1];
            if (numNext - numPrev != 1) {
                maxNumArr.push(indexFlag);
                indexFlag = 1;
            } else {
                indexFlag++;
            }
        }
        maxNumArr.push(indexFlag);
        maxNumArr.sort();
        var count = maxNumArr[maxNumArr.length - 1];
        return count;
    },
    // 不连
    // targetArr:目标数组
    removeUnconsecutive(targetArr) {
        var resultArr = [], count = 0;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            count = this.consecutiveCount(item);
            if (count != 1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 二连
// targetArr:目标数组
    removeTwoConsecutive(targetArr) {
        var resultArr = [], count = 0;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            count = this.consecutiveCount(item);
            if (count != 2) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 三连
// targetArr:目标数组
    removeThreeConsecutive(targetArr) {
        var resultArr = [], count = 0;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            count = this.consecutiveCount(item);
            if (count != 3) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 四连
// targetArr:目标数组
    removeFourConsecutive(targetArr) {
        var resultArr = [], count = 0;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            count = this.consecutiveCount(item);
            if (count != 4) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 五连
// targetArr:目标数组
    removeFiveConsecutive(targetArr){
        var resultArr = [], count = 0;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            count = this.consecutiveCount(item);
            if (count != 5) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },
    // 移除豹子
    // targetArr：目标数组
    removeBaoZi(targetArr) {
        var resultArr = [], tempArr = null, countArr = null, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            countArr = [];
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            if (countArr.length != 1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },
    //移除组三
    //targetArr:目标数组
    removeZuSan(targetArr){
        var resultArr = [], tempArr = [], countArr = null, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            countArr = [];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            if (tempUniqueArr.length != 2) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },
    //移除组三
    //targetArr:目标数组
    zuSan(targetArr){
        var resultArr = [], tempArr = [], countArr = null, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            countArr = [];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            if (tempUniqueArr.length == 2) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },
//移除组六
//targetArr:目标数组
    removeZuLiu(targetArr){
        var resultArr = [], tempArr = [], countArr = null, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            countArr = [];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            if (tempUniqueArr.length != 3) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

    // aaaaa形态
    // targetArr：目标数组
    removeAaaaa(targetArr) {
        var resultArr = [], tempArr = null, length = 0;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            tempArr = tempArr.uniquelize();
            length = tempArr.length;
            if (length != 1) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// aabcd形态
// targetArr：目标数组
    removeAabcd (targetArr) {
        var resultArr = [], tempArr = null, countArr = null, length = 0, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            countArr = [];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            length = countArr.length;
            if (length == 4) {
                countArr.sort();
                if (countArr[0] != 1 || countArr[1] != 1 || countArr[2] != 1
                    || countArr[3] != 2) {
                    resultArr.push(item);
                }
            } else {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// aabbc形态
// targetArr：目标数组
    removeAabbc(targetArr) {
        var resultArr = [], tempArr = null, countArr = null, length = 0, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            countArr = [];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            length = countArr.length;
            if (length == 3) {
                countArr.sort();
                if (countArr[0] != 1 || countArr[1] != 2 || countArr[2] != 2) {
                    resultArr.push(item);
                }
            } else {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// aaabb形态
// targetArr：目标数组
    removeAaabb(targetArr) {
        var resultArr = [], tempArr = null, countArr = null, length = 0, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            countArr = [];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            length = countArr.length;
            if (length == 2) {
                countArr.sort();
                if (countArr[0] != 2 || countArr[1] != 3) {
                    resultArr.push(item);
                }
            } else {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// aaabc形态
// targetArr：目标数组
    removeAaabc(targetArr) {
        var resultArr = [], tempArr = null, countArr = null, length = 0, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            countArr = [];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            length = countArr.length;
            if (length == 3) {
                countArr.sort();
                if (countArr[0] != 1 || countArr[1] != 1 || countArr[2] != 3) {
                    resultArr.push(item);
                }
            } else {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// aaaab形态
// targetArr：目标数组
    removeAaaab(targetArr) {
        var resultArr = [], tempArr = null, countArr = null, length = 0, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            countArr = [];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            length = countArr.length;
            if (length == 2) {
                countArr.sort();
                if (countArr[0] != 1 || countArr[1] != 4) {
                    resultArr.push(item);
                }
            } else {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// abcde形态
// targetArr：目标数组
    removeAbcde(targetArr){
        var resultArr = [], tempArr = null, countArr = null, length = 0, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            countArr = [];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            length = countArr.length;
            if (length == 5) {
                countArr.sort();
                if (countArr[0] != 1 || countArr[1] != 1 || countArr[2] != 1
                    || countArr[3] != 1 || countArr[4] != 1) {
                    resultArr.push(item);
                }
            } else {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

    // 移除散号
    // targetArr:目标数组
    removeSanHao(targetArr) {
        var resultArr = [], tempArr = null, countArr = null, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            countArr = [];
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            if (countArr.length != 4) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 移除对子
// targetArr:目标数组
    removeDuizi(targetArr) {
        var resultArr = [], tempArr = null, countArr = null, tempUniqueArr = null;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            countArr = [];
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            if (countArr.length == 4) {
                resultArr.push(item);
            }
        }
        return resultArr;
    },

// 移除三同号
// targetArr:目标数组
    removeSanTongHao(targetArr) {
        var resultArr = [], tempArr = null, countArr = null, tempUniqueArr = null, tempLength = 0;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            countArr = [];
            tempLength = 0;
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            countArr.sort();
            tempLength = countArr.length;
            if (tempLength == 2) {
                if (countArr[0] != 1 || countArr[1] != 3) {
                    resultArr.push(item);
                }
            } else {
                if (tempLength != 1) {
                    resultArr.push(item);
                }
            }
        }
        return resultArr;
    },

// 移除两个对子
// targetArr:目标数组
    removeTwoDuiZi(targetArr) {
        var resultArr = [], tempArr = null, countArr = null, tempUniqueArr = null, tempLength = 0;
        for (var index = 0; index < targetArr.length; index++) {
            var item = targetArr[index];
            tempArr = item.split("");
            tempUniqueArr = tempArr.uniquelize();
            countArr = [];
            tempLength = 0;
            for (var subindex = 0; subindex < tempUniqueArr.length; subindex++) {
                var subItem = tempUniqueArr[subindex];
                countArr.push(tempArr.itemCount(subItem));
            }
            countArr.sort();
            tempLength = countArr.length;
            if (tempLength == 2) {
                if (countArr[0] != 2) {
                    resultArr.push(item);
                }
            } else {
                resultArr.push(item);
            }
        }
        return resultArr;
    },
    // 移除特殊排除项
    // targetArr：目标数组
    //specArr:特殊形态名字，豹子，二连，组三等等
    removeSpec(targetArr,specArr){
        if (targetArr.length == 0
            || specArr == null|| specArr.length == 0) {
            return targetArr;
        }
        var resultArr=targetArr;
        console.log(specArr);
        for(var index=0;index<specArr.length;index++){
            var item = specArr[index];
            switch (item){
                case '不连':
                    resultArr = this.removeUnconsecutive(resultArr);break;
                case '2连':
                    resultArr = this.removeTwoConsecutive(resultArr);break;
                case '3连':
                    resultArr = this.removeThreeConsecutive(resultArr);break;
                case '4连':
                    resultArr = this.removeFourConsecutive(resultArr);break;
                case '5连':
                    resultArr = this.removeFiveConsecutive(resultArr);break;
                case '豹子':
                    resultArr = this.removeBaoZi(resultArr);break;
                case '组三':
                    resultArr = this.removeZuSan(resultArr);break;
                case '组六':
                    resultArr = this.removeZuLiu(resultArr);break;
                case '散号':
                    resultArr = this.removeSanHao(resultArr);break;
                case '对子号':
                    resultArr = this.removeDuizi(resultArr);break;
                case '三同号':
                    resultArr = this.removeSanTongHao(resultArr);break;
                case '两个对子':
                    resultArr = this.removeTwoDuiZi(resultArr);break;
                case 'AAAAA':
                    resultArr = this.removeAaaaa(resultArr);break;
                case 'AABCD':
                    resultArr = this.removeAabcd(resultArr);break;
                case 'AABBC':
                    resultArr = this.removeAabbc(resultArr);break;
                case 'AAABB':
                    resultArr = this.removeAaabb(resultArr);break;
                case 'AAABC':
                    resultArr = this.removeAaabc(resultArr);break;
                case 'AAAAB':
                    resultArr = this.removeAaaab(resultArr);break;
                case 'ABCDE':
                    resultArr = this.removeAbcde(resultArr);break;
            }
        }

        return resultArr;
    },
}