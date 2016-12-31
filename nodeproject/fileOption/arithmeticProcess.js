/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-27 15:29:31
 * @version $Id$
 */

var commonProcess = require('./commonProcess');
var classicArithmeticProcess = require('./classicArithmeticProcess');
var randomProcess = require("./randomProcess");

/* Two Sum
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution.
 * Example:
 * Given nums = [2, 7, 11, 15], target = 9,
 * Because nums[0] + nums[1] = 2 + 7 = 9,
 * return [0, 1].
 */
/*------------twosum------------*/
    exports.twoSum = function() {
        var length = 100000
        var randomArray = commonProcess.createRandomArray(length, 0, 10000000);
        var randomIndex = commonProcess.createRandomArray(2, 0, length);
        console.log("randomArray")
        var targetNum = randomArray[randomIndex[0]] + randomArray[randomIndex[1]] 
        console.log("randomIndex")
        randomIndex.forEach(function(num) {
            console.log(num);
        })
        console.log("targetNum:" + targetNum);
        commonProcess.calculateSpanTime(callFunc, "callFunc", randomArray, targetNum)
        commonProcess.calculateSpanTime(improveFunc, "improveFunc", randomArray, targetNum)
    }

    function getTragetIndeByBinaryWay(randomArray, targetNum, length) {
        var startIndex = 0;
        var endIndex = length - 1;
        var result = [];
        if (targetNum < randomArray[endIndex]) {
            getTargetIndexMovingMin(startIndex, endIndex, randomArray, targetNum, result, -1)
        } else {
            getTargetIndexMovingMax(startIndex, endIndex, randomArray, targetNum, result, 1)
        }

        result.forEach(function(num) {
            console.log(num);
        })
        console.log("result:" + (randomArray[result[0]] + randomArray[result[1]]))

        if (isNaN(randomArray[result[0]] + randomArray[result[1]])) {
            console.log("result[0]:" + result[0] + " result[1]:" + result[1])
            for (var i = 0; i < length; i++) {
                console.log(randomArray[i]);
            }
        }

        function getTargetIndexMovingMin(startIndex, endIndex, array, targetNum, result, dir) {
            labelout: for (var i = endIndex; i >= startIndex; i--) {
                var tmp = array[i] + array[startIndex]
                if (tmp == targetNum) {
                    result.push(i);
                    result.push(startIndex);
                    console.log("i:" + i + " startIndex:" + startIndex)
                    break labelout;
                } else {
                    if (i == startIndex) {
                        arguments.callee(startIndex + 1, endIndex, array, targetNum, result)
                    }
                }
            }
        }

        function getTargetIndexMovingMax(startIndex, endIndex, array, targetNum, result, dir) {
            labelout: for (var i = startIndex; i <= endIndex; i++) {
                var tmp = array[i] + array[endIndex]
                if (tmp == targetNum) {
                    result.push(i);
                    result.push(endIndex);
                    console.log("i:" + i + " endIndex:" + endIndex)
                    break labelout;
                } else {
                    if (i == endIndex) {
                        arguments.callee(startIndex, endIndex - 1, array, targetNum, result)
                    }
                }
            }
        }
    }

    function getTragetIndeByNormalWay(randomArray, targetNum) {
        var startIndex = 0;
        var length = randomArray.length
        var endIndex = length - 1;
        var result = [];

        outermost: for (var i = 0; i < length; i++) {
            for (var j = i + 1; j < length; j++) {
                if (randomArray[i] + randomArray[j] == targetNum) {
                    result.push(i);
                    result.push(j);
                    break outermost;
                }
            }
        }
        result.forEach(function(num) {
            console.log(num);
        })
        console.log("result:" + (randomArray[result[0]] + randomArray[result[1]]))
    }

    function callFunc(nums, target) {
        var result = wayFromWeb(nums, target)
        console.log("wayFromWeb:" + (result[0] - 1) + ", " + (result[1] - 1))

        function wayFromWeb(nums, target) {
            // Use a hash to store value-to-index pairs
            var hash = nums.reduce(function(prev, item, index) {
                if (prev[item] === undefined) {
                    prev[item] = index;
                    return prev;
                }
                /**
                 * Maybe there are two same numbers, for example:
                 * Input: numbers={2, 5, 5, 7}, target = 10
                 * Output: index1=1, index2=2
                 * So we save the index array
                 */
                prev[item] = [prev[item], index];
                return prev;
            }, {});
            var i;
            // Loop over hash
            for (i in hash) {
                // If hash[i] is an array, then check if i * 2 equals to target
                if (hash[i] instanceof Array && i * 2 === target) {
                    return [hash[i][0] + 1, hash[i][1] + 1].sort(function(a, b) {
                        return a - b;
                    });
                    // Check if hash[target - 1] is undefined, only take O(1) time complexity
                } else if (hash[target - i] !== undefined) {
                    return [hash[i] + 1, hash[target - i] + 1].sort(function(a, b) {
                        return a - b;
                    });
                }
            }
        };
    }

    function improveFunc(array, target) {
        var tmpObj = {}
        array.forEach(function(num, index) {
            tmpObj[num] = index;
        })

        labelOut: for (var num in tmpObj) {
            if (tmpObj[target - num] != void 0) {
                if (num > (target - num)) {
                    console.log(tmpObj[target - num] + " " + tmpObj[num])
                } else {
                    console.log(tmpObj[num] + " " + tmpObj[target - num])
                }
                break labelOut
            }
        }
    }
/*------------twosum------------*/

/**  002-add-two-numbers
 * https://leetcode.com/problems/add-two-numbers/
 *
 * You are given two linked lists representing two non-negative numbers.
 * The digits are stored in reverse order and each of their nodes contain a
 * single digit.
 * Add the two numbers and return it as a linked list.
 *
 * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 * Output: 7 -> 0 -> 8
 */
/*------------add-two-numbers------------*/
    exports.addTwoNumbers = function() {

    }
/*------------add-two-numbers------------*/

/** 003-longest-substring-without-repeating-characters
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *
 * Given a string, find the length of the longest substring without repeating
 * characters.
 * For example, the longest substring without repeating letters for "abcabcbb"
 * is "abc", which the length is 3. For "bbbbb" the longest substring is "b",
 * with the length of 1.
 */
/*------------longest-substring-without-repeating-characters------------*/
    exports.longestLengthWithoutReapet = function() {
        // var randomstr = commonProcess.createRandomString(27);
        var randomstr = "mgljkvpmhdecxhbnyjwzmfgmyjz";
        console.log(randomstr);
        // console.log(getThelongestLengthWithoutReapet(randomstr));
        commonProcess.calculateSpanTime(getThelongestLengthWithoutReapet, "getThelongestLengthWithoutReapet", randomstr)
        commonProcess.calculateSpanTime(getThelongestLengthWithoutReapetOnline, "getThelongestLengthWithoutReapetOnline", randomstr)

    }

    function getThelongestLengthWithoutReapet(randomstr) {
        var str = { "a":[], "b":[], "c":[], "d":[], "e":[], "f":[], "g":[], "h":[], "i":[], "j":[], "k":[], "l":[], "n":[], "m":[], "o":[], "p":[], "q":[], "r":[], "s":[], "t":[], "u":[], "v":[], "w":[], "x":[], "y":[], "z":[] };
        var length = randomstr.length;
        var max = 0;
        var tmpindex1 = 0;
        var tmpindex2 = 0;
        for (var i = 0; i < length; i++) {
            var tmparray = str[randomstr[i]];
            tmparray.push(i);
            var tmparrayLength = tmparray.length
            if (tmparrayLength > 1) {
                if (max  < tmparray[tmparrayLength - 1] - tmparray[tmparrayLength - 2] + 1) {
                    max = tmparray[tmparrayLength - 1] - tmparray[tmparrayLength - 2] + 1;
                    tmpindex1 = tmparray[tmparrayLength - 1];
                    tmpindex2 = tmparray[tmparrayLength - 2];
                }
            } 
        }
        console.log("tmpindex1 " + tmpindex1 + " tmpindex2 " + tmpindex2);
        console.log("my result " + max);
        return max;
    }

    function getThelongestLengthWithoutReapetOnline(s) {
      if (s.length === 0) {
        return 0;
      }
      var result = 1;
      var j;
      var k;
      var i = 0;
      for (j = i + 1; j < s.length; j++) {
        for (k = i; k < j; k++) {
          if (s[k] === s[j]) {
            result = Math.max(result, j - i);
            i = k + 1;
            break;
          }
        }
      }
      result = Math.max(result, j - i);
      console.log("inline result  " + result)
      return result;
    };
/*------------longest-substring-without-repeating-characters------------*/

/** 004-median-of-two-sorted-arrays
 * https://leetcode.com/problems/median-of-two-sorted-arrays/
 *
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.
 * Find the median of the two sorted arrays.
 * The overall run time complexity should be O(log (m+n)).
 */
/*------------median-of-two-sorted-arrays------------*/
   exports.medianoftwosortedarrays = function() {
        var array1 = commonProcess.createRandomArray(3000001, 1, 10000000);
        var array2 = commonProcess.createRandomArray(300000, 1, 10000000);
        commonProcess.calculateSpanTime(medianoftwosortedarraysOnline, "medianoftwosortedarraysOnline", array1, array2);
        commonProcess.calculateSpanTime(medianoftwosortedarraysSelf, "medianoftwosortedarraysSelf", array1, array2);
   }
   function medianoftwosortedarraysSelf(array1, array2) {
        var lengthN = array1.length;
        var lengthM = array2.length;
        var totalLength = lengthN + lengthM;

        var indexN = 0;
        var indexM = 0;
        var result1 = 0;
        var result2 = 0;
        var middleIndex = (totalLength % 2 == 0 ? totalLength / 2 : (totalLength + 1)/ 2);
        for (var i = 0; i <= middleIndex; i++) {
            if(array1[indexN] > array2[indexM]) {
                if (i == middleIndex - 1) {
                    result1 = array2[indexM]
                }

                if (i == middleIndex) {
                    result2 = array2[indexM]
                }

                indexM++;
            } else {
                if (i == middleIndex - 1) {
                    result1 = array1[indexN]
                }

                if (i == middleIndex) {
                    result2 = array1[indexN]
                }                                
                indexN++;
            }
        }

        return totalLength % 2 == 0 ? (result1 + result2) / 2 : result1;
   }
   function medianoftwosortedarraysOnline(nums1, nums2) {
        function merge(nums1, nums2) {
          var i = 0;
          var j = 0;
          var result = [];
          var nums1Length = nums1.length;
          var nums2Length = nums2.length;
          if (nums1Length === 0) {
            return nums2;
          }
          if (nums2Length === 0) {
            return nums1;
          }
          while (i !== nums1Length && j !== nums2Length) {
            if (nums1[i] < nums2[j]) {
              result.push(nums1[i]);
              i = i + 1;
            } else {
              result.push(nums2[j]);
              j = j + 1;
            }
          }
          if (i === nums1Length) {
            result = result.concat(nums2.slice(j));
          } else if (j === nums2Length) {
            result = result.concat(nums1.slice(i));
          }
          return result;
        }

        function findMedian(array) {
          var arrayLength = array.length;
          var medianIndex = (arrayLength - 1) / 2;
          var floor = Math.floor(medianIndex);
          if (floor === medianIndex) {
            return array[medianIndex];
          }
          return (array[floor] + array[floor + 1]) / 2;
        }

        return findMedian(merge(nums1, nums2));
   };
/*------------median-of-two-sorted-arrays------------*/


/** 005-longest-palindromic-substring
 * https://leetcode.com/problems/longest-palindromic-substring/
 *
 * Given a string S, find the longest palindromic substring in S.
 * You may assume that the maximum length of S is 1000,
 * and there exists one unique longest palindromic substring.
 */
/*------------longest-palindromic-substring------------*/
    exports.longestPalindromicSubstring = function() {
        // var randomstr = commonProcess.createRandomString(1000000);
        var randomstr = "aaab"
        // var randomstr = ""
        // for (var i = 0; i < 1000; i++) {
        //     randomstr += "a"
        // }
        // randomstr += "b";
        commonProcess.calculateSpanTime(longestPalindromicSubstringOnline, "longestPalindromicSubstringOnline", randomstr)
        // commonProcess.calculateSpanTime(longestPalindromicSubstringByManacher, "longestPalindromicSubstringByManacher", randomstr)
        // commonProcess.calculateSpanTime(longestPalindromicSubstringSelf, "longestPalindromicSubstringSelf", randomstr);
        // commonProcess.calculateSpanTime(manacher, "manacher", randomstr);
        commonProcess.calculateSpanTime(findBMstr, "findBMstr", randomstr)
    }

    function longestPalindromicSubstringOnline(s) {
      if (s.length === 0) return '';
      /**
       * 将 s 字符之间插入 #
       * banana => #b#a#n#a#n#a#
       * abba => #a#b#b#a#
       * abcd => #a#b#c#d#
       * 这样处理的好处是 aba 和 abba 的两种情况可以一起处理
       */
      var onlineIndex = 0;
      var insertedS = '#' + s.split('').join('#') + '#';
      var length = insertedS.length;
      var result = '';
      for (var i = 1; i < length - 1; i++) {
        // j 表示往左走和往右走的长度
        var j = 1;
        // 当两边的字符相同 j++
        while (i - j >= 0 && i + j <= length - 1 && insertedS[i - j] === insertedS[i + j]) {
          j++;
          onlineIndex++;
        }
        // j - 1 正好就是回文字符串的长度
        if (j - 1 > result.length) {
          result = insertedS.substr(i - j + 1, j * 2 - 1).replace(/#/g, '');
        }
      }
      console.log("onlineIndex " + onlineIndex);
      return result;
    };

    function longestPalindromicSubstringSelf(s) {
        var result = ""
        var length = s.length;
        var selfIndex = 0;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < i; j++) {
                var tmp = palindromicSubString(s, j, i);
                if (tmp != "") {
                    result = result.length > tmp.length ? result : tmp;
                } 
            }
        }
        console.log("selfIndex " + selfIndex);
        return result;

        function palindromicSubString(s, j, i) {
            var isPalindromic = true;
            var originI = i;
            var originJ = j;
            while (j < i) {
                selfIndex++;
                if (s[i--] != s[j++]) {
                    isPalindromic = false;
                }
            }

            if (isPalindromic) {
                    var result = ""
                    for (var n = originJ; n <= originI; n++) {
                        result += s[n];
                    }
                    return result;
                } else {
                    return "";
                }
        };
    };

    function longestPalindromicSubstringByManacher(s) {
        var result = "";
        var tmpS = '#' + s.split('').join('#') + '#';
        var axis = 0;
        var calculateLength = tmpS.length;
        var maxRadius = 0;
        var manacherIndex1 = 0;
        for (var i = 1; i < calculateLength; i++) {
            var radius = 0;
            while(++radius && i - radius > -1 && i + radius < calculateLength && tmpS[i - radius] == tmpS[i + radius]) {
                manacherIndex1++;
            }

            if (maxRadius < radius) {
                maxRadius = radius;
                axis = i;
            }     
        }
        console.log("manacherIndex1 " + manacherIndex1);
        var resultLength = axis + maxRadius
        for (var j  = axis + 1 - maxRadius; j < resultLength; j++) {
            if (tmpS[j] != "#") {
                result += tmpS[j];
            }         
        }
        return result;
    };

    function manacher(s) {
        s = '#' + s.split('').join('#') + '#';
        var sLength = s.length;  
        var RL = new Array(sLength).fill(0),
        MaxRight=0,
        pos=0,
        MaxLen=0;
        var manacherIndex2 = 0;
        for (var i = 0; i < sLength; i++) {
            if (i < MaxRight) {
                RL[i] = Math.min(RL[2*pos - i], MaxRight - i);
            } else {
                RL[i] = 1;
            }

            while (i - RL[i] > 0 && i + RL[i] < sLength && s[i - RL[i]] == s[i + RL[i]]) {
                manacherIndex2++;
                RL[i] += 1;
            }

            if (RL[i] + i - 1 > MaxRight) {
                MaxRight = RL[i] + i - 1;
                pos = i;
            }
            MaxLen = Math.max(MaxLen, RL[i]);
        }
        console.log("manacherIndex2 " + manacherIndex2);
        return MaxLen - 1;
    };

    function findBMstr(s) {
        s = '#' + s.split('').join('#') + '#';
        var sLength = s.length;
        var p = new Array(sLength).fill(0);
        var mx = 0, id = 0, axis = 0, radius = 0;
        var findBMstrIndex = 0;
        for (var i = 1; i < sLength; i++) {
            if (mx > i) {
                p[i] = ((p[2*id - i] < (mx - i)) ? p[2*id - i] : (mx - i));
            } else {
                p[i] = 1;
            }

            while (i - p[i] > -1 && i + p[i] < sLength && s[i - p[i]] == s[i + p[i]]) {
                findBMstrIndex++;
                p[i]++;
            }

            if (i + p[i] > mx) {
                mx = i + p[i];
                id = i;
            }

            if (p[i] > radius) {
                radius =  p[i];
                axis = i;
            };
        }
        console.log("findBMstrIndex " + findBMstrIndex);
        var result =""
        var resultLength = axis + radius;
        for (var j  = axis + 1 - radius; j < resultLength; j++) {
            if (s[j] != "#") {
                result += s[j];
            }         
        }        
        return result;
    };     
/*------------longest-palindromic-substring------------*/

/** 006-zigzag-conversion
 * https://leetcode.com/problems/zigzag-conversion/
 *
 * The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number
 * of rows like this: (you may want to display this pattern in a fixed font for
 * better legibility)
 *
 * ```
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * ```
 *
 * And then read line by line: `"PAHNAPLSIIGYIR"`
 *
 * Write the code that will take a string and make this conversion given a
 * number of rows:
 *
 * ```
 * string convert(string text, int nRows);
 * ```
 *
 * `convert("PAYPALISHIRING", 3)` should return `"PAHNAPLSIIGYIR"`.
 */
/*------------zigzag-conversion------------*/
    exports.zigzagConversion = function() {
        var randomstr = commonProcess.createRandomString(50000);
        // console.log(conversionOnline(randomstr, 4))
        // console.log(conversionSelf(randomstr, 4))
        commonProcess.calculateSpanTime(conversionSelf, "conversionSelf",  randomstr, 40);
        commonProcess.calculateSpanTime(conversionOnline, "conversionOnline",  randomstr, 40);
        

        // console.log(commonProcess.asserts(conversionOnline, randomstr, 4)(conversionSelf, randomstr, 4));
    }


    function conversionOnline(s, numRows) {
      if (s.length <= 2) return s;
      if (numRows === 1) return s;
      var sMatrix = [];
      var i;
      for (i = 0; i < numRows; i++) {
        sMatrix[i] = [];
      }
      var sLength = s.length;
      i = 0;
      var j = 0;
      // downward
      var downward = true;
      for (var k = 0; k < sLength; k++) {
        sMatrix[i][j] = s[k];
        if (downward) {
          i++;
          // touched bottom
          if (i === numRows - 1) {
            downward = false;
          }
        } else {
          i--;
          j++;
          // touched top
          if (i === 0) {
            downward = true;
          }
        }
      }
      var result = sMatrix.map(function (row) {
        return row.filter(function (item) {
          return !!item;
        }).join('');
      }).join('');
      return result;
    };

    function conversionSelf(s, numRows) {
        var result = "";
        var sLength = s.length;
        var maxSpan =  2 * (numRows - 1); 
        var sIndex = 0;
        if (sLength <= numRows) {
            return s;
        } else {
            for (var i = 0; i < sLength; i += maxSpan) {
                result += s[i];
            }
            for (var j = 1; j < numRows - 1; j++) {
                for (var i = j; i < sLength; i += maxSpan) {
                    result += s[i];
                    if (i + (numRows - 1 - j) * 2 < sLength) {
                        result += s[i + (numRows - 1 - j) * 2] ; 
                    }             
                }
            }

            for (var i = numRows - 1; i < sLength; i += maxSpan) {
                result += s[i]
            }
            return result;
        }
    }
/*------------zigzag-conversion------------*/

/** 007-reverse-integer
 * https://leetcode.com/problems/reverse-integer/
 *
 * Reverse digits of an integer.
 *
 * Example1: x = 123, return 321
 * Example2: x = -123, return -321
 *
 * Have you thought about this?
 *
 * Here are some good questions to ask before coding. Bonus points for you if
 * you have already thought through this!
 *
 * If the integer's last digit is 0, what should the output be? ie, cases such
 * as 10, 100.
 *
 * Did you notice that the reversed integer might overflow? Assume the input is
 * a 32-bit integer, then the reverse of 1000000003 overflows. How should you
 * handle such cases?
 *
 * For the purpose of this problem, assume that your function returns 0 when the
 * reversed integer overflows.
 */
/*------------reverse-integer------------*/
    exports.reverseInteger = function() {
    };

    function reverseIntegerOnline(x) {
        var pn = x >= 0 ? '' : '-';
        var num = Math.abs(x);
        var result = Number(pn + num.toString().split('').reverse().join(''));
        if (result > Math.pow(2, 31)) {
            return 0;
        }
        if (result < 1 - Math.pow(2, 31)) {
            return 0;
        }
        return result;
    };
/*------------reverse-integer------------*/

/** 009-palindrome-number
 * https://leetcode.com/problems/palindrome-number/
 *
 * Determine whether an integer is a palindrome. Do this without extra space.
 *
 * Some hints:
 *
 * Could negative integers be palindromes? (ie, -1)
 *
 * If you are thinking of converting the integer to string,
 * note the restriction of using extra space.
 *
 * You could also try reversing an integer.
 * However, if you have solved the problem "Reverse Integer",
 * you know that the reversed integer might overflow.
 * How would you handle such case?
 *
 * There is a more generic way of solving this problem.
 */
/*------------palindrome-number------------*/
    exports.palindromeNumber = function() {
        var num = randomProcess.getRandomIntInclusive(0, 100);
        console.log("num " + num);
        commonProcess.calculateSpanTime(palindromeNumberSelf, "palindromeNumberSelf", num);
    };

    function palindromeNumberSelf(num) {
        if (num < 0) {
            return false;
        }
        if (num < 10) {
            return true;
        }
        var numLength = Math.floor(Math.log10(num)) + 1;
        console.log(numLength);
        var left = 0, right = numLength - 1, leftNum = 0, rightNum = 0;
        while(left <=  right) {
            if (left == right) {
                return true;
            }
            leftNum = Math.floor(num / Math.pow(10, right)) - leftNum * Math.pow(10, left);
            rightNum = (num % Math.pow(10, left + 1) - num %  Math.pow(10, left)) / Math.pow(10, left);
            if (leftNum != rightNum) {
                return false;
            }
            ++left;
            --right;
        }
        return true;
    }

    function palindromeNumberOnline(x) {
      if (x < 0) return false;
      if (x < 10) return true;
      // get the length of the number
      var numLength = Math.floor(Math.log10(x)) + 1;
      // compare halfNumLength times
      var halfNumLength = Math.floor(numLength / 2);
      var highDigital;
      var lowDigital;
      for (var i = 0; i < halfNumLength; i++) {
        // get the low ist digital
        // TODO Math.pow runs too many times, it can be optimized
        lowDigital = (Math.floor(x / Math.pow(10, i))) % 10;
        // get the high ist digital
        highDigital = Math.floor((x % Math.pow(10, numLength - i)) / Math.pow(10, numLength - i - 1));
        // if they are equal, them x is not a palindrome number
        if (lowDigital !== highDigital) {
          return false;
        }
      }
      return true;
    };

/*------------palindrome-number------------*/

/** 011-container-with-most-water
 * https://leetcode.com/problems/container-with-most-water/
 *
 * Given n non-negative integers a1, a2, ..., an,
 * where each represents a point at coordinate (i, ai).
 * n vertical lines are drawn such that the two endpoints of line i is
 * at (i, ai) and (i, 0).
 * Find two lines, which together with x-axis forms a container,
 * such that the container contains the most water.
 *
 * Note: You may not slant the container.
 */
/*------------container-with-most-water------------*/
    exports.containerWithMostWater = function() {
        var array = commonProcess.createRandomArray(10, 0, 100)
        console.log("");
        array.forEach(function(value){
            console.log(value);
        })
        console.log("==========================")
        containerWithMostWaterOnline(array);
        console.log("==========================")
        containerWithMostWaterSelf(array);
    }

    function containerWithMostWaterOnline(height) {
        var maxArea = 0;
        var i = 0;
        var j = height.length - 1;
        if (j <= 0) return 0;
        while (i < j) {
            var area = calculateArea(height[i], height[j], j - i);
            if (height[i] < height[j]) {
                i++;
            } else {
                j--;
            }
            if (area > maxArea) maxArea = area;
        }

        console.log("area:" + maxArea);   

        function calculateArea(r1, r2, h) {
            return Math.abs(r1 - r2) * h
        }             
    };

    function containerWithMostWaterSelf(array) {
        var leftIndex = 0, 
            rightIndex = array.length - 1, 
            maxArea = 0,
            tmpArea = 0,
            maxLeftValue = 0,
            maxRightValue = 0;
        while (leftIndex != rightIndex) {
            tmpArea = calculateArea(array[leftIndex], array[rightIndex], rightIndex - leftIndex)
            if (tmpArea > maxArea) {
                maxArea = tmpArea;
                maxLeftValue = array[leftIndex];
                maxRightValue = array[rightIndex];
            };
            if (array[leftIndex] < array[rightIndex]) {
                leftIndex++;
            } else {
                rightIndex--;
            }
        }

        function calculateArea(r1, r2, h) {
            return Math.abs(r1 - r2) * h
        }

        console.log("left:" + maxLeftValue + " right:" + maxRightValue + " area:" + maxArea);
    }

    exports.containerWithMostWater();
/*------------container-with-most-water------------*/


