/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-27 16:07:34
 * @version $Id$
 */

// asce 升序 Desc 降序
exports.arraySort = function(array, desc) {
    desc = desc || false;
    if (desc) {
        return array.sort(desSort)
    } else {
        return array.sort(ascSort)
    } 
}

// ascSort(a,b)传给sort()，数字数组作升序排列
function ascSort (a, b) {  // a和b是数组中相邻的两个数组项
    return a - b; 
    // 如果 return -1, 表示a小于b，a排列在b的前面
    // 如果 return 1, 表示a大于b,a排列在b的后面
    // 如果 return 0, 表示a等于b,a和b的位置保持不变
}

// desSort(a,b)传给sort()，数字数组作降序排列
function desSort (a, b) { // a和b是数组中相邻的两个数组项
    return b - a;
    // 如果 return -1, 表示b小于a，b排列在a的前面
    // 如果 return 1, 表示b大于a, b排列在a的后面
    // 如果 return 0, 表示 b等于a, b和a的位置保持不变
}