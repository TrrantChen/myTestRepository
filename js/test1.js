/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-27 10:08:38
 * @version $Id$
 */

var timeCallback = function() {
    console.log("this is callback 1");
}

setTimeout(function(){
    timeCallback.call(this);
}, 0);


