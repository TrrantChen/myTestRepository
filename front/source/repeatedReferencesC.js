/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-08 16:31:02
 * @version $Id$
 */

// import './_jquery.js';
// import './jquery-ui.js';
import * as repeatedReferencesA from './repeatedReferencesA';
import * as repeatedReferencesB from './repeatedReferencesB';


repeatedReferencesA.print();
repeatedReferencesB.print();

$(function() {
    alert("this is c ready haha");
})