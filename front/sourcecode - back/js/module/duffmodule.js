/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-24 19:46:34
 * @version $Id$
 */
define(["common"], function(common){ 
    /*------------GlobalParaCalc------------*/
        var result = 0;
        function withDuffGlobalParaCalc(length) {
            result = 0;
            common.logTime("withDuffGlobalParaCalc", duffProcess, withDuffGlobalParaCalcTest, length);
        }

        function withDuffGlobalParaCalcTest() {++result;}        

        function withDuffPromoteGlobalParaCalc(length) {
            result = 0;
            common.logTime("withDuffPromoteGlobalParaCalc", duffPromoteProcess, withDuffPromoteGlobalParaCalcTest, length);
        }

        function withDuffPromoteGlobalParaCalcTest() {++result;}

        function withoutDiffGlobalParaCalc(length) {
            result = 0; 
            common.logTime("withoutDiffGlobalParaCalc", forProcess, withoutDiffGlobalParaCalcTest, length);        
        }  

        function withoutDiffGlobalParaCalcTest() {++result;}           
    /*------------GlobalParaCalc------------*/

    /*------------Circulate------------*/
        function withDuffCirculate(length) {
            common.logTime("withDuffCirculate", duffProcessCirlce, withDuffCirculateTest, length);
        }

        function withDuffCirculateTest(n) {return ++n;}

        function withDuffPromoteCirculate(length) {
            common.logTime("withDuffPromoteCirculate", duffPromoteProcessCircle, withDuffPromoteCirculateTest, length);
        }

        function withDuffPromoteCirculateTest(n) {return ++n;}        

        function withoutDiffCirculate(length) {
            common.logTime("withoutDiffCirculate", forProcess, withoutDiffCirculateTest, length);
        } 

        function withoutDiffCirculateTest() {}               
    /*------------Circulate------------*/

    /*------------singlefunc------------*/
        function withDuffSingleFunc(length) {
            common.logTime("withDuffSingleFunc", duffProcess, withDuffSingleFuncTest, length);
        }

        function withDuffSingleFuncTest() {}

        function withDuffPromoteSingleFunc(length) {
            common.logTime("withDuffPromoteSingleFunc", duffPromoteProcess, withDuffPromoteSingleFuncTest, length);
        }

        function withDuffPromoteSingleFuncTest() {}        

        function withoutDiffSingleFunc(length) {
            common.logTime("withoutDiffSingleFunc", forProcess, withoutDiffSingleFuncTest, length);
        } 

        function withoutDiffSingleFuncTest() {}  
    /*------------singlefunc------------*/

    function duffProcess(process, length) {
        var iteration = Math.ceil(length / 8);
        var startAt = length % 8
        do {
          switch(startAt) {
              case 0 :process();
              case 7 :process();
              case 6 :process();
              case 5 :process();
              case 4 :process();
              case 3 :process();
              case 2 :process();
              case 1 :process();
          }
          startAt = 0;
        } while(--iteration > 0)            
    }

    function duffProcessCirlce(process, length) {
        var n = 0;
        var iteration = Math.ceil(length / 8);
        var startAt = length % 8
        do {
          switch(startAt) {
              case 0 :n = process(n);
              case 7 :n = process(n);
              case 6 :n = process(n);
              case 5 :n = process(n);
              case 4 :n = process(n);
              case 3 :n = process(n);
              case 2 :n = process(n);
              case 1 :n = process(n);
          }
          startAt = 0;
        } while(--iteration > 0)                  
    }

    function duffPromoteProcess(process, length) {
          var iterations = Math.floor(length / 8);
          var leftover = length % 8;
          var i = 0; 
          if(leftover > 0) {
              do {
                  process();
              }while(--leftover > 0);
          }    
          do {
              process();
              process();
              process();
              process();
              process();
              process();
              process();
              process();
          } while(--iterations > 0);            
    }

    function duffPromoteProcessCircle(process, length) {  
          var n = 0;      
          var iterations = Math.floor(length / 8);
          var leftover = length % 8;
          var i = 0; 
          if(leftover > 0) {
              do {
                  n = process(n);
              }while(--leftover > 0);
          }    
          do {
               n = process(n);
               n = process(n);
               n = process(n);
               n = process(n);
               n = process(n);
               n = process(n);
               n = process(n);
               n = process(n);
          } while(--iterations > 0);               
    }

    function forProcess(process, length) {
        for (var i = 0; i < length; i++) {
            process();
        }
    }

    return {
       withDuffGlobalParaCalc:withDuffGlobalParaCalc,
       withDuffPromoteGlobalParaCalc:withDuffPromoteGlobalParaCalc,
       withoutDiffGlobalParaCalc:withoutDiffGlobalParaCalc,
       withDuffCirculate:withDuffCirculate,
       withDuffPromoteCirculate:withDuffPromoteCirculate,
       withoutDiffCirculate:withoutDiffCirculate,
       withDuffSingleFunc:withDuffSingleFunc,
       withDuffPromoteSingleFunc:withDuffPromoteSingleFunc,
       withoutDiffSingleFunc:withoutDiffSingleFunc
    }  
})
