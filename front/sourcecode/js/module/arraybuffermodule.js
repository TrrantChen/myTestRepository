import * as util from '../common/util.js';

var path = util.getHost();

export function test4ArrayBuffer() {
    var arrayBuffer = new ArrayBuffer(32);
    var int8 = new Int8Array(arrayBuffer);
    var int16 = new Int16Array(arrayBuffer);
    for (var i = 0; i < int8.byteLength; i++) {
        int8[i] = i;
    }
    console.log(int8);
    console.log(int16);
}

export function getArraybufferFromServer() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", path + "test4getBlob", true);
    xhr.responseType = 'arraybuffer'
    xhr.onreadystatechange = function() {
        switch (xhr.readyState.toString()) {
            case "4":
                if (xhr.status.toString() == "200") {
                    var result = xhr.response;
                    var str = util.ab2string8(result);
                    alert(str)
                }
                break;
            default:
                console.log("error");
                break;
        }
    }
    xhr.send(null);
}

export function arrayBuffer2StringEn() {
    var str = "test";
    var arrayBuffer = util.string2ab8(str);
    alert(util.ab2string8(arrayBuffer));
}

export function arrayBuffer2StringCn() {
    var str = "联通";
    var arrayBuffer = util.string2ab16(str);
    alert(util.ab2string16(arrayBuffer));
}

export function transitionTest() {
    var blobIn = new Blob(["Hello world 中文!"], { type: "text/plain" });
    var arrayBufferIn = new ArrayBuffer(10);
    var typedArrayIn = new Int8Array([4, 5, 6]);
    var arrayIn = [1, 2, 3];

    var blobOut = arrayBuffer2blob(arrayBufferIn);
    var arrayBufferOut = blob2arrayBuffer(blobIn);
    var typedArrayOut = arraryBuffer2TypedArray(arrayBufferIn);
    var arrayBufferOut2 = typedArray2arrayBuffer(typedArrayIn);
    var arrayOut = typedArray2Array(typedArrayIn);
    var typedArrayOut2 = array2TypedArray(arrayIn);
}
   



