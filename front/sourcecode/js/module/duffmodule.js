import util from '../common/util.js';

/*------------GlobalParaCalc------------*/
    var result = 0;
    export function withDuffGlobalParaCalc(length) {
        result = 0;
        util.logTime("withDuffGlobalParaCalc", duffProcess, withDuffGlobalParaCalcTest, length);
    }

    export function withDuffGlobalParaCalcTest() {++result;}        

    export function withDuffPromoteGlobalParaCalc(length) {
        result = 0;
        util.logTime("withDuffPromoteGlobalParaCalc", duffPromoteProcess, withDuffPromoteGlobalParaCalcTest, length);
    }

    export function withDuffPromoteGlobalParaCalcTest() {++result;}

    export function withoutDiffGlobalParaCalc(length) {
        result = 0; 
        util.logTime("withoutDiffGlobalParaCalc", forProcess, withoutDiffGlobalParaCalcTest, length);        
    }  

    export function withoutDiffGlobalParaCalcTest() {++result;}           
/*------------GlobalParaCalc------------*/

/*------------Circulate------------*/
    export function withDuffCirculate(length) {
        util.logTime("withDuffCirculate", duffProcessCirlce, withDuffCirculateTest, length);
    }

    export function withDuffCirculateTest(n) {return ++n;}

    export function withDuffPromoteCirculate(length) {
        util.logTime("withDuffPromoteCirculate", duffPromoteProcessCircle, withDuffPromoteCirculateTest, length);
    }

    export function withDuffPromoteCirculateTest(n) {return ++n;}        

    export function withoutDiffCirculate(length) {
        util.logTime("withoutDiffCirculate", forProcess, withoutDiffCirculateTest, length);
    } 

    function withoutDiffCirculateTest() {}               
/*------------Circulate------------*/

/*------------singlefunc------------*/
    export function withDuffSingleFunc(length) {
        util.logTime("withDuffSingleFunc", duffProcess, withDuffSingleFuncTest, length);
    }

    export function withDuffSingleFuncTest() {}

    export function withDuffPromoteSingleFunc(length) {
        util.logTime("withDuffPromoteSingleFunc", duffPromoteProcess, withDuffPromoteSingleFuncTest, length);
    }

    export function withDuffPromoteSingleFuncTest() {}        

    export function withoutDiffSingleFunc(length) {
        util.logTime("withoutDiffSingleFunc", forProcess, withoutDiffSingleFuncTest, length);
    } 

    function withoutDiffSingleFuncTest() {}  
/*------------singlefunc------------*/

export function duffProcess(process, length) {
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

export function duffProcessCirlce(process, length) {
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

export function duffPromoteProcess(process, length) {
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

export function duffPromoteProcessCircle(process, length) {  
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

export function forProcess(process, length) {
    for (var i = 0; i < length; i++) {
        process();
    }
}

