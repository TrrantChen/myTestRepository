
function set() {
    let value = (document.querySelector('input').value || '').toString() ;
    console.log(CryptoJS.enc.Utf8.parse(value).words);
    console.log(myUtff8Parse(value));
}

function myUtff8Parse(latin1Str) {
    var latin1StrLength = latin1Str.length;

    // Convert
    var words = [];
    for (var i = 0; i < latin1StrLength; i++) {
        // x |= y 就是 x = x | y
        // a >>> b	将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位，并使用 0 在左侧填充。
        // 按位或（OR）	a | b	对于每一个比特位，当两个操作数相应的比特位至少有一个1时，结果为1，否则为0。
        // 按位与（ AND）	a & b	对于每一个比特位，只有两个操作数相应的比特位都是1时，结果才为1，否则为0。
        // 左移（Left shift）	a << b	将 a 的二进制形式向左移 b (< 32) 比特位，右边用0填充。
        words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
        // words[i >>> 2] = words[i >>> 2] | ((latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8));
    }

    return words;
}
