/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-07 15:41:18
 * @version $Id$
 */

define(["common"], function(common){
    // 利用决策树取3个值中的最大的两个
    function getTop2ByDecisionTree(func) {
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

    function getTop2ByDecisionTreeTest() {
        var squareFunc = function(a, b) {
            return a * a + b * b;
        };
        var squareTop2 = getTop2ByDecisionTree(squareFunc);
        console.log(squareTop2(4, 2, 3));
    }

    function factorialFuncWithRecursive(num) {
      if (num == 0 || num == 1) {
        return 1;
      } else {
        return num * factorialFuncWithRecursive(num - 1);
      }
    }

    function factorialFuncWithIteration(product, iter, counter) {
      if (iter == counter) {
        return product
      } else {
        return factorialFuncWithIteration(product * (++iter), iter, counter)
      }
    }  

    function fibonaccFuncWithRecursive(num) {
        switch(num)
          {
            case 0:
                return 0;
            case 1:
                return 1;    
            default:
                return fibonaccFuncWithRecursive(num - 1) + fibonaccFuncWithRecursive(num - 2);    
          }    
    }

    function fibonaccFuncWithIteration(product, iter, counter) {
        if (counter == 0) {            
            return iter;
        } else {
            return fibonaccFuncWithIteration(product + iter, product, --counter)
        } 
    }

    // 50,25,10,5,1换算100
    function countChangeWithRecursive(amount) {
        return cc(amount, 5);
    }

    function cc(amount, kindsOfCoins) {
        if (amount == 0) {
            return 1;
        } else if (amount < 0 || parseInt(kindsOfCoins) == 0) {
            return 0;
        } else {
            return cc(amount, kindsOfCoins - 1) + cc(amount - firstDenomination[kindsOfCoins], kindsOfCoins)
        }
    }

    var firstDenomination = {
        "1":1,
        "2":5,
        "3":10,
        "4":25,
        "5":50
    }

    function countChangeWithIteration(amount) {

    }

    function cct() {

    }
  
    return {
       getTop2ByDecisionTree:getTop2ByDecisionTree,
       getTop2ByDecisionTreeTest:getTop2ByDecisionTreeTest,
       factorialFuncWithRecursive:factorialFuncWithRecursive,
       factorialFuncWithIteration:factorialFuncWithIteration,
       fibonaccFuncWithRecursive:fibonaccFuncWithRecursive,
       fibonaccFuncWithIteration:fibonaccFuncWithIteration,
       countChangeWithRecursive:countChangeWithRecursive,
       countChangeWithIteration:countChangeWithIteration
    }  
})



