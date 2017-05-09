/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-09 15:03:05
 * @version $Id$
 */

import $ from '../lib/_jquery'
import * as gis from './gisB'
import * as util from '../common/util'
import * as dataOperation from '../common/dataOperation'

$(function(){
    alert("view b is ready");
    let data = dataOperation.getData();
    console.log(util.sortArray(data));
})