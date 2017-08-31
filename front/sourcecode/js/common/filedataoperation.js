/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-08-29 10:41:42
 * @version $Id$
 */

export function ab2string8(arrayBuffer) {
  return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
}

export function ab2string16(arrayBuffer) {
  return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer))
}

export function string2ab16(str) {
  let arrayBuffer = new ArrayBuffer(str.length * 2)
  let charBuf = new Uint16Array(arrayBuffer);
  for (var i = 0; i < str.length; i++) {
    charBuf[i] = str.charCodeAt(i)
  }
  return arrayBuffer;
}

export function string2ab8(str) {
  let arrayBuffer = new ArrayBuffer(str.length)
  let charBuf = new Uint8Array(arrayBuffer);
  for (var i = 0; i < str.length; i++) {
    charBuf[i] = str.charCodeAt(i)
  }
  return arrayBuffer;
}

export function blob2arrayBuffer(blob) {
  let result = null;
  let fileReader = new FileReader();
  fileReader.readAsArrayBuffer(blob);

  let promise = new Promsie((resolve, reject) => {
    fileReader.addEventListener("loadend", function() {
      result = fileReader.result;
      resolve(result);
    })    
  })

  return promise;
}

export function arrayBuffer2blob(arrayBuffer) {
  var blob = new Blob([arrayBuffer]);
  return blob;
}

export function arraryBuffer2TypedArray(arrayBuffer) {
  var int8 = new Int8Array(arrayBuffer);
  return int8;
}

export function typedArray2arrayBuffer(int8) {
  return int8.buffer;
}

export function typedArray2Array(int8) {
  var array = [];
  for (var i = 0; i < int8.length; i++) {
    array[i] = int8[i];
  }
  return array;
}

export function array2TypedArray(array) {
  var int8 = new Int8Array(array);
  return int8;
}

export function dataUrl2Blob(dataUrl) {
  let arr = dataUrl.split(',')
    ,mime = arr[0].match(/:(.*?)/)[1]
    ,bStr = atob(arr[1])
    ,length = bStr.length
    ,u8Arr = new Uint8Array(length);

    while(length--) {
      u8Arr[length] = bStr.charCodeAt[length];
    }
  return new Blob([u8Arr], {type:mime});
}

export function blob2DataUrl(blob) {
  let reader = new FileReader();
  let promise = new Promise((resolve, reject) => {
    reader.addEventListener("loadend", (evt) => {
      resolve(reader.result);
    })

    reader.addEventListener("error", (evt) => {
      reader.abort();
      reject(reader.error);
    })    
  })

  reader.readAsDataURL(blob);
  return promise; 
}

export function sliceBlob(blob, size) {
  let result = []
    ,n = Math.ceil(blob.size / size);

  for (var i = 0; i < n; i++) {
    let tmp = null
    if (i === n - 1) {
      tmp = blob.slice(i * size, blob.size - 1);
    } else {
      tmp = blob.slice(i * size, i * size + size - 1);
    }
    result.push(tmp);
  }

  return result;
}