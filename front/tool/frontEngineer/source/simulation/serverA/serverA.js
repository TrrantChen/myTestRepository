/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-09 14:59:00
 * @version $Id$
 */

import * as gis from './gisA'
import * as util from '../common/util'
import * as domOperation from '../common/domOperation'

$(function(){
    alert("view a is ready kkk");
    let dom = domOperation.getDom();
    console.log("1")

    console.log(util.sortArray(dom));
})