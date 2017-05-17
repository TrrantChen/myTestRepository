export function isEven(num) {
    return num % 2 == 0;
}

/*------------利用决策树取3个值中的最大的两个------------*/
  export function getTop2ByDecisionTree(func) {
      return function() {
          var a = arguments[0] || 0,
              b = arguments[1] || 0,
              c = arguments[2] || 0;

          if (a > b) {
              if (b > c) {
                  return func(a, b);
              } else {
                  return func(a, c);
              }
          } else {
              if (a > c) {
                  return func(b, a);
              } else {
                  return func(b, c);
              }
          }
      }
  }

  export function getTop2ByDecisionTreeTest() {
      var squareFunc = function(a, b) {
          return a * a + b * b;
      };
      var squareTop2 = getTop2ByDecisionTree(squareFunc);
      console.log(squareTop2(4, 2, 3));
  }
/*------------利用决策树取3个值中的最大的两个------------*/

/*------------factorial------------*/
  export function factorialFuncWithRecursive(num) {
      if (num == 0 || num == 1) {
          return 1;
      } else {
          return num * factorialFuncWithRecursive(num - 1);
      }
  }

  export function factorialFuncWithIteration(product, iter, counter) {
      if (iter == counter) {
          return product
      } else {
          return factorialFuncWithIteration(product * (++iter), iter, counter)
      }
  }

  export function factorialFuncWithCirculation(num) {
      var result = num;
      while (--num > 0) {
          result *= num;
      }
      return result;
  }
/*------------factorial------------*/

/*------------fibonacc------------*/
  // f(1, 0, n);
  export function fibonaccFuncWithRecursive1(num) {
      console.log(num)
      switch (num) {
          case 0:
              return 0;
          case 1:
              return 1;
          default:
              return fibonaccFuncWithRecursive1(num - 1) + fibonaccFuncWithRecursive1(num - 2);
      }
  }

  export function fibonaccFuncWithIteration(product, iter, counter) {
      if (counter == 0) {
          return iter;
      } else {
          return fibonaccFuncWithIteration(product + iter, product, --counter)
      }
  }

  export function fibonaccFuncWithCirculation(num) {
      var result = 0,
          a = 0,
          b = 1;
      switch (num) {
          case 0:
              result = 0;
              break;
          case 1:
              result = 1;
              break;
          default:
              while (num-- > 1) {
                  result = a + b;
                  a = b;
                  b = result;
              };
              break;
      }
      return result;
  }

  // 减少了循环次数，理应是速度提高了，但实际并没有，理由不明，估计是底层做了优化。
  // a = 1 b = 0 p = 0 q = 1
  export function fibonaccFuncWithIterationFast(a, b, p, q, counter) {
      if (counter == 0) {
          return b;
      } else if (isEven(counter)) {
          return fibonaccFuncWithIterationFast(a, b, p * p + q * q, 2 * p * q + q * q, (counter / 2));
      } else {
          return fibonaccFuncWithIterationFast(a * (p + q) + b * q, b * p + a * q, p, q, counter - 1);
      }
  }
/*------------fibonacc------------*/

/*------------50,25,10,5,1换算100------------*/
  export function countChangeWithRecursive(amount) {
      return cc(amount, 5);
  }

  export function cc(amount, kindsOfCoins) {
      if (amount == 0) {
          return 1;
      } else if (amount < 0 || parseInt(kindsOfCoins) == 0) {
          return 0;
      } else {
          return cc(amount, kindsOfCoins - 1) + cc(amount - firstDenomination[kindsOfCoins], kindsOfCoins)
      }
  }

  var firstDenomination = {
      "1": 1,
      "2": 5,
      "3": 10,
      "4": 25,
      "5": 50
  }

  export function countChangeWithCirculationFromWeb(amount) {
      var denomination = [1, 5, 10, 25, 50];
      var tmp = new Array(amount + 1);
      tmp[0] = 1;

      for (var j = 1; j <= amount; j++) {
          tmp[j] = 0;
      }

      for (var i = 0; i < denomination.length; i++) {
          for (var j = denomination[i]; j <= amount; j++) {
              tmp[j] += tmp[j - denomination[i]];
          }
      }

      console.log(tmp);
      return tmp[amount];
  }

  export function countChangeWithCirculationByMySelf(amount, particleSizeArray) {
      var tmpSize = amount + 1,
          tmp = new Array(tmpSize).fill(0),
          length = particleSizeArray.length;
      tmp[0] = 1;
      for (var i = 0; i < length; i++) {
          for (var j = particleSizeArray[i]; j < tmpSize; j++) {
              tmp[j] += tmp[j - particleSizeArray[i]];
          }
      }

      return tmp[amount];
  }
/*------------50,2510,5,1换算100------------*/

/*------------1.11------------*/
  export function exercise111Recursive(n) {
      if (n < 3) {
          return n;
      } else {
          return exercise111Recursive(n - 1) + 2 * exercise111Recursive(n - 2) + 3 * exercise111Recursive(n - 3);
      }
  }

  export function exercise111Iteration(produce1, produce2, produce3, iter, counter) {
      if (iter == counter) {
          return produce3;
      } else {
          return exercise111Iteration(produce1 + produce2 * 2 + produce3 * 3, produce1, produce2, ++iter, counter);
      }
  }
/*------------1.11------------*/

/*------------1.12------------*/
  export function exercise112Recursive(n) {
      if (n == 2) {
          console.log([1]);
          console.log([1, 1]);
          return [1, 1];
      } else {
          var tmp = exercise112Recursive(--n);
          var length = tmp.length + 1;
          var result = new Array(length);
          for (var i = 0; i < length; i++) {
              if (i == 0 || i == length - 1) {
                  result[i] = 1;
              } else {
                  result[i] = tmp[i - 1] + tmp[i];
              }
          }
          console.log(result);
          return result;
      }
  }

  // ([1],1,7)
  export function exercise112Iteration(produce, iter, counter) {
      if (iter == counter) {
          return produce;
      } else {
          if (produce.length == 1) {
              console.log(produce);
          }
          var length = produce.length + 1;
          var result = new Array(length);
          for (var i = 0; i < length; i++) {
              if (i == 0 || i == length - 1) {
                  result[i] = 1;
              } else {
                  result[i] = produce[i] + produce[i - 1];
              }
          }
          console.log(result);
          return exercise112Iteration(result, ++iter, counter);
      }
  }
/*------------1.12------------*/

/*------------exponentiation ------------*/
  export function exptWithRecursive(b, n) {
      if (isEvent(n)) {
          return normExptWithRecursive(b, n);
      } else {
          return fastExptWithRecursive(b, n);
      }
  }

  export function fastExptWithRecursive(b, n) {
      if (n == 1)
          return b;
      else
          return fastExptWithRecursive(b, n / 2) * fastExptWithRecursive(b, n / 2);
  }

  export function normExptWithRecursive(b, n) {
      console.log(b + " " + n);
      if (n == 1)
          return b;
      else
          return b * normExptWithRecursive(b, --n);
  }

  export function isEvent(n) {
      return !(n % 2 == 0);
  }

  export function exptWithIteration(b, n) {
      if (isEvent(n)) {
          return normExptWithIteration(1, n, b);
      } else {
          return fastExptWithIteration(b, n);
      }
  }

  export function fastExptWithIteration(result, count) {
      if (count == 1)
          return result;
      else
          return fastExptWithIteration(result * result, count / 2);
  }

  export function normExptWithIteration(result, count, b) {
      if (count == 0)
          return result;
      else
          return normExptWithIteration(result * b, --count, b);
  }
/*------------exponentiation ------------*/

/*------------1.17------------*/
  export function exercise117Recursive(a, b) {
      if (isEvent(b)) {
          return exercise117normRecursive(a, b);
      } else {
          return exercise117fastRecursive(a, b);
      }
  }

  export function exercise117fastRecursive(a, b) {
      if (b == 1)
          return a;
      else
          return exercise117fastRecursive(a + a, b / 2);
  }

  export function exercise117normRecursive(a, b) {
      if (b == 0) {
          return 0;
      } else {
          return a + exercise117normRecursive(a, --b);
      }
  }

  export function exercise117Iteration(result, count, a) {
      if (count == 0)
          return result;
      else
          return exercise117Iteration(result + a, --count, a);
  }
/*------------1.17------------*/

/*------------1.19------------*/
  // f(1, 0, n);
  export function fibonaccFuncWithRecursive(num) {
      console.log(num)
      switch (num) {
          case 0:
              return 0;
          case 1:
              return 1;
          default:
              return fibonaccFuncWithRecursive(num - 1) + fibonaccFuncWithRecursive(num - 2);
      }
  }

  export function fibonaccFuncWithIteration1(product, iter, counter) {
      if (counter == 0) {
          return iter;
      } else {
          return fibonaccFuncWithIteration1(product + iter, product, --counter)
      }
  }

  export function fibonaccFuncFastWithRecursive() {

  }
/*------------1.19------------*/
