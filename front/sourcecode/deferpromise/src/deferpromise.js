import * as util from '../../js/common/util'
import * as othertestmodule from '../../js/module/othertestmodule'
import '../../../node_modules/babel-polyfill/browser'

function demo1() {
  othertestmodule.promiseResult("get", "delayloadtest", 500).then(function(result) {
    console.log(result);
    return othertestmodule.promiseResult("get", "delayloadtest", 400)
  }).then(function(result) {
    console.log(result);
    return othertestmodule.promiseResult("get", "delayloadtest", 300)
  }).then(function(result) {
    console.log(result);
  })
}

function demo2() {
  var promiseAjax = new Promise(function(resolve) {
    othertestmodule.verifyTheNormalAjaxResult("get", "delayloadtest", 400).success(resolve);
  })

  promiseAjax.then(function(result) {
    console.log(result);
    var para = parseInt(result.split(" ")[3]) + 100;
    othertestmodule.verifyTheNormalAjaxResult("get", "delayloadtest", para).success(function(result) {
      return result
    })
  }).then(function(result) {
    console.log(result);
  })
}

function demo4() {
  console.time("promise start");
  console.time("promise then start");
  console.time("ajax return");
  console.time("promise then done");
  var ajaxPromise = new Promise(function(resolve) {
    console.timeEnd("promise start");
    $.ajax({
      url: "http://" + document.domain + ":8088/delayloadtest",
      type: 'GET',
      async: true,
      datatype: "text",
      contentType: "application/json",
      data: {
        para0: 500
      },
      success: function(result) {
        console.timeEnd("ajax return");
        resolve(result);
      }
    })
  })

  setTimeout(function() {
    console.timeEnd("promise then start");
    ajaxPromise.then(function(asyncPara) {
      console.timeEnd("promise then done");
      console.log(asyncPara);
    })
  }, 5000)
}

function demo5() {
  var ajaxOption = {
    url: "http://" + document.domain + ":8088/delayloadtest",
    type: 'GET',
    async: true,
    datatype: "text",
    contentType: "application/json",
    data: {
      para0: 500
    }
  }

  $.ajax(ajaxOption).then(function(result1) {
    console.log(result1);
    ajaxOption.data.para0 = parseInt(result1) + 100;
    $.ajax(ajaxOption).then(function(result2) {
      console.log(result2);
      ajaxOption.data.para0 = parseInt(result2) + 150;
      $.ajax(ajaxOption).then(function(result3) {
        console.log(result3);
        ajaxOption.data.para0 = parseInt(result3) + 200;
        $.ajax(ajaxOption).then(function(result4) {
          console.log(result4)
        })
      })
    })
  })

  // 一种改进写法
  $.ajax(ajaxOption).then((result1) => {
    ajaxOption.data.para0 = parseInt(result1) + 100;
    return $.ajax(ajaxOption)
  })
  .then((result2) => {
    ajaxOption.data.para0 = parseInt(result2) + 150;
    return $.ajax(ajaxOption)
  })
  .then((result3) => {
    ajaxOption.data.para0 = parseInt(result3) + 200;
    return $.ajax(ajaxOption)
  })
  .then((result4) => {
    console.log(result4);
  })
}

function demo6() {
  var ajaxOption = {
    url: "http://" + document.domain + ":8088/delayloadtest",
    type: 'GET',
    async: true,
    datatype: "text",
    contentType: "application/json",
    data: {
      para0: 500
    }
  }

  function ajaxPromise(option) {
    var promise = new Promise(function(resolve) {
      $.ajax(ajaxOption).then(function(result) {
        resolve(result);
      })
    })
    return promise;
  }

  var a = ajaxPromise(ajaxOption).then(function(result1) {
    console.log(result1);
    ajaxOption.data.para0 = parseInt(result1) + 100;
    return ajaxPromise(ajaxOption);
  })
  console.log("a");
  console.log(a);
  var b = a.then(function(result2) {
    console.log(result2);
    ajaxOption.data.para0 = parseInt(result2) + 150;
    return ajaxPromise(ajaxOption);
  })
  console.log("b");
  console.log(b);
  var c = b.then(function(result3) {
    console.log(result3);
    ajaxOption.data.para0 = parseInt(result3) + 200;
    return ajaxPromise(ajaxOption);
  })
  console.log("c");
  console.log(c);
  var d = c.then(function(result4) {
    console.log(result4);
  })
  console.log("d");
  console.log(d);

  //------------------------------------
  var a = new Promise(function(resolve) {
    $.ajax(ajaxOption).then(function(result) {
      resolve(result);
    })
  })

  console.log("a");
  console.log(a);

  var b = a.then(function(result) {
    console.log(result);
    return parseInt(result) + 1;
  })

  console.log("b");
  console.log(b);

  var c = b.then(function(result) {
    console.log(result);
    return parseInt(result) + 2;
  })

  console.log("c");
  console.log(c);

  var d = c.then(function(result) {
    console.log(result);
    return parseInt(result) + 3;
  })

  console.log("d");
  console.log(d);
}

function demo0() {
  function timePromise(para) {
    var promise = new Promise(function(resolve) {
      setTimeout(function() {
        resolve(para);
      }, 500);
    });
    return promise;
  }

  var a = timePromise(100).then(function(result1) {
    console.log(result1);
    return timePromise(parseInt(result1) + 100);
  })
  console.log("a");
  console.log(a);
  var b = a.then(function(result2) {
    console.log(result2);
    return timePromise(parseInt(result2) + 100);
  })
  console.log("b");
  console.log(b);
  var c = b.then(function(result3) {  
    console.log(result3);
    return timePromise(parseInt(result3) + 100);
  })
  console.log("c");
  console.log(c);
  var d = c.then(function(result4) {
    console.log(result4);
  })
  console.log("d");
  console.log(d);
}

function demo8() {
  function getURLCallback(URL, callback) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function() {
      if (req.status === 200) {
        callback(null, req.responseText);
      } else {
        callback(new Error(req.statusText), req.response);
      }
    };
    req.onerror = function() {
      callback(new Error(req.statusText));
    };
    req.send();
  }
  // <1> 对JSON数据进行安全的解析
  function jsonParse(callback, error, value) {
    if (error) {
      callback(error, value);
    } else {
      try {
        // var result = JSON.parse(value);
        callback(null, value);
      } catch (e) {
        callback(e, value);
      }
    }
  }
  // <2> 发送XHR请求
  var request = {
    comment: function getComment(callback) {
      return getURLCallback("http://" + document.domain + ":8088/delayloadtest?para0=400", jsonParse.bind(null, callback));
    },
    people: function getPeople(callback) {
      return getURLCallback("http://" + document.domain + ":8088/delayloadtest?para0=500", jsonParse.bind(null, callback));
    }
  };
  // <3> 启动多个XHR请求，当所有请求返回时调用callback
  function allRequest(requests, callback, results) {
    if (requests.length === 0) {
      return callback(null, results);
    }
    var req = requests.shift();
    req(function(error, value) {
      if (error) {
        callback(error, value);
      } else {
        results.push(value);
        allRequest(requests, callback, results);
      }
    });
  }

  function main(callback) {
    allRequest([request.comment, request.people], callback, []);
  }
  // 运行的例子
  main(function(error, results) {
    if (error) {
      return console.error(error);
    }
    console.log(results);
  });
}

function demo9() {
  var oldData = 99;

  function updateCacheAndUse(isUpdate) {
    return new Promise(function(resolve) {
      if (isUpdate) {
        $.ajax({
          url: "http://" + document.domain + ":8088/delayloadtest",
          type: 'GET',
          async: true,
          datatype: "text",
          contentType: "application/json",
          data: {
            para0: 500
          },
          success: function(result) {
            oldData = result;
            resolve(result);
          }
        })
      } else {
        resolve(oldData);
      }
    })
  };
  updateCacheAndUse(true).then(function(result) {
    console.log(result);
  });
}

function demo10() {
  othertestmodule.promiseResult("get", "delayloadtest", 500).then(doSomething())
  othertestmodule.promiseResult("get", "delayloadtest", 500).then(doOtherThing)

  function doSomething() {
    console.log("do something");
  }

  function doOtherThing() {
    console.log("do other thing");
  }
}

// a simple callback
function demo11() {
  function A() {
    var name = "this is A";
    this.callback = function(func) {
      func(name);
    }
  }

  function B() {
    this.callback = function() {
      var a = new A();
      a.callback(printSometing)
    }

    function printSometing(name) {
      console.log(name)
    }
  }

  var b = new B();
  b.callback();
}

function demo12() {
  othertestmodule.promiseResult("get", "getArrayResut").then(function(result) {
    console.log(result);
  })
}

function onloadAndPromiseAll() {
  var span = document.querySelector(".spanStyle");
  var subframe1 = document.querySelector("#iframe1");
  // onload 被覆盖掉
  // subframe1.onload = function() {
  //   console.log(subframe1.contentWindow.iframeFun());
  // }

  var subframe2 = document.querySelector("#iframe2");
  // onload 被覆盖掉
  // subframe2.onload = function() {
  //   console.log(subframe2.contentWindow.iframeFun());
  // }

  function promiseFrame(dom) {
    var promise = new Promise(function(resolve) {
      dom.onload = function() {
        resolve();
      };
      // 可以简写为 dom.onload = resolve;
    })
    return promise;
  }

  Promise.all([promiseFrame(subframe1), promiseFrame(subframe2)]).then(function() {
    span.innerText = parseInt(subframe1.contentWindow.iframeFun()) + parseInt(subframe2.contentWindow.iframeFun())
  })
}

function aopTest() {
  util.promiseAop(function() {
    console.log("not test");
  });
  var timePromise = new Promise(function(resolve, reject) {
    try {
      setTimeout(function() {
        resolve();
      }, 0);
    } catch (err) {
      reject();
    }
  })

  timePromise.then(function() {
    console.log("this is time");
  })
}

function demo7() {
  console.log("before")
  var promise = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
      console.log("ttt");
    }, 200)

    console.log("test")
  })
  promise.then(function() {
    console.log("then");
    // return "test"
  }).then(function(value) {
    console.log("this is " + value);
  })

  console.log("after");
}

function mySelfPromise() {
  let MyPromise = function(fn) {
    let deferreds = []
      ,state = 'pending'
      ,value = null;

    // this.then = function(onFulfilled) {
    //   if (state.toLowerCase() === "pending") {
    //     deferreds.push(onFulfilled);
    //     return this;
    //   }
    //   onFulfilled(value);
    //   return this;
    // }
    
    this.then = function(onFulfilled) {
      return new MyPromise((resolve) => {
        handle({
          onFulfilled:onFulfilled || null,
          resolve:resolve
        })
      })
    }

    function handle(deferred) {
      if(state.toLowerCase() === "pending") {
        deferreds.push(deferred);
      } else {
        let ret = deferred.onFulfilled(value);

        deferred.resolve(ret);        
      }
    }

    // function resolve(newValue) {
    //   value = newValue;
    //   state = "fulfilled";
    //   setTimeout(() => {
    //     deferreds.forEach((privateResolve) => {
    //         privateResolve(value);
    //     })        
    //   }, 0)
    // }
    
    function resolve(newValue) {
      if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
        let then = newValue.then;

        if(typeof then === "function") {
          then.call(newValue, resolve);
          return;
        }
      }
      state = 'fulfilled';
      value = newValue;
      setTimeout(() => {
        deferreds.forEach((deferred) => {
          handle(deferred);
        })
      }, 0);
    }

    fn(resolve);
  } 

  /*
    最简单的测试
   */
  function testCase1() {
    function promiseConstruct(resolve) {
      setTimeout(() => {
        resolve();
      }, 0)
    }

    function thenCallBack() {
      console.log("this is then callback");
    }

    function otherCallBack() {
      console.log("this is other callback");
    }

    let myPromise = new MyPromise(promiseConstruct);
    myPromise.then(thenCallBack).then(otherCallBack);  

    let promise = new Promise(promiseConstruct);
    promise.then(thenCallBack).then(otherCallBack); 
  }

  /*
    构造函数中使用同步方法
   */
  function testCase2() {
    function promiseConstruct(resolve) {
      resolve();
    }

    function thenCallBack(value) {
      console.log("this is then callback");
    }

    let myPromise = new MyPromise(promiseConstruct);
    myPromise.then(thenCallBack);  

    let promise = new Promise(promiseConstruct);
    promise.then(thenCallBack);    
  }

  /*
    测试pending, fulfilled, rejected各种状态
   */
  function testCase3() {
    function promiseConstruct(resolve) {
      resolve();
    }

    let myPromise = new MyPromise(promiseConstruct);

    myPromise.then(() => {
      myPromise.then(() => {
        console.log("this is inner promise");
      })
    })

    let promise = new Promise(promiseConstruct);

    promise.then(() => {
      promise.then(() => {
        console.log("this is inner promise");
      })
    })
  }

  /*
    测试构造函数中的打印语句与then中打印语句的顺序,因为resolve中的执行是异步的
   */
  function testCase4() {
    function promiseConstruct(resolve) {
      resolve();
      console.log("this is construct");
    }

    function thenCallBack(value) {
      console.log("this is then callback");
    }

    let myPromise = new MyPromise(promiseConstruct);

    myPromise.then(thenCallBack);

    let promise = new Promise(promiseConstruct);

    promise.then(thenCallBack);  
  }

  // 未通过
  /*
    单个promise连续传递参数
   */
  function testCase5() {
    function promiseConstruct(resolve) {
      setTimeout(() => {
        resolve("yc");
      }, 0)
    }

    function thenFn(value) {
      console.log(value);
      return "test";      
    }

    function otherFn(value) {
      console.log(value);
    }

    let myPromise = new MyPromise(promiseConstruct);
    myPromise.then(thenFn).then(otherFn);

    let promise = new Promise(promiseConstruct);
    promise.then(thenFn).then(otherFn);
  }

  /*
    多个promise传递参数
   */
  function testCase6() {
    function promiseConstruct(resolve) {
      setTimeout(() => {
        resolve("yc");
      }, 0)
    }

    function thenFn(value) {
      console.log("then " + value);
    }

    function otherFn(value) {
      console.log("other " + value);
    }

    let myPromise = new MyPromise(promiseConstruct);
    myPromise.then(thenFn);
    myPromise.then(otherFn);

    let promise = new Promise(promiseConstruct);
    promise.then(thenFn);
    promise.then(otherFn);
  }

  /*
    内嵌传递参数
   */
  function testCase7() {
    function promiseConstruct(resolve) {
      resolve("yc");
    }

    let myPromise = new MyPromise(promiseConstruct);

    myPromise.then(() => {
      myPromise.then((value) => {
        console.log(value);
      })
    })

    let promise = new Promise(promiseConstruct);

    promise.then(() => {
      promise.then((value) => {
        console.log(value);
      })
    })
  }

  // 未通过
  /*
    多个连续then传递参数
   */
  function testCase8() {
    function promiseConstruct(resolve) {
      setTimeout(() => {
        resolve("yc");
      }, 0)
    }

    function thenFn(value) {
      console.log(value);
      return "test2";      
    }

    function otherFn(value) {
      console.log(value);
    }

    function anotherFn(value) {
      console.log(value);
      return "another";
    }

    let myPromise = new MyPromise(promiseConstruct);
    myPromise.then(thenFn).then(otherFn);
    myPromise.then(anotherFn).then(otherFn);

    let promise = new Promise(promiseConstruct);
    promise.then(thenFn).then(otherFn);
    promise.then(anotherFn).then(otherFn);
  }

  // 未通过
  /*
    内嵌连续then传递参数
   */
  function testCase9() {
    function promiseConstruct(resolve) {
      resolve("yc");
    }

    let myPromise = new MyPromise(promiseConstruct);

    myPromise.then(() => {
      myPromise.then((value) => {
        console.log(value);
        return "test";
      }).then((value) => {
        console.log(value);
      })
    })

    let promise = new Promise(promiseConstruct);

    promise.then(() => {
      promise.then((value) => {
        console.log(value);
        return "test";
      }).then((value) => {
        console.log(value);
      })
    })
  }

  // 未通过
  /*
    串行promise，即参数的传递，如何通过then将不同的value给串起来
   */
  function testCase10() {
    // function timePromise(value) {
    //   // let promise = new Promise((resolve) => {
    //   //   setTimeout(() => {
    //   //     resolve(value);
    //   //   }, 0)
    //   // })       
    //   let promise = new MyPromise((resolve) => {
    //     setTimeout(() => {
    //       resolve(value);
    //     }, 0)
    //   }) 

    //   return promise;     
    // }


    // timePromise(1).then((value) => {
    //   ++value;
    //   console.log("first then " + value);
    //   return timePromise(value);
    // })
    // .then((value) => {
    //   console.log("second then " + value);
    // })
    

    function getID() {
      return new MyPromise(function(resolve, reject) {
        console.log("get id...");
        setTimeout(function() {
          resolve("666");
        }, 1000);
      })
    }
    function getNameByID(id) {
      return new MyPromise(function(resolve, reject) {
        console.log(id);
        console.log("get name...");
        setTimeout(function() {
          resolve("hjm");
        }, 1000);
      })
    }
    getID().then(getNameByID).then(function(name) {
      console.log(name);
    }, function(err) {
      console.log(err);
    });

    // new MyPromise((resolve) => {
    //   setTimeout(() => {
    //     resolve(1);
    //   }, 0)
    // }).then((value) => {
    //   return new MyPromise((resolve) => {
    //     setTimeout(() => {
    //       resolve(++value);
    //     })
    //   }).then((value) => {
    //     console.log(value);
    //   })
    // })

  }

  testCase10();
}

(function promiseCallback() {
  let testBtn = document.querySelector("#testBtn");
  let index = 0;

  // function promiseFn() {
  //   let promise = new Promise((resolve) => {
  //     testBtn.addEventListener("click", (evt) => {
  //       ++index;
  //       resolve(index);
  //     })         
  //   })
  //   return promise;
  // }


  // promiseFn().then((index) => {
  //   console.log(index);
  // })
  
  // function callbakFn(fn) {
  //   let num = 1;
  //   testBtn.addEventListener("click", (evt) => {
  //     ++window.index;
  //     fn();
  //   })  
  // }

  // callbakFn(() => {
  //   console.log(window.index);
  // })
})()





