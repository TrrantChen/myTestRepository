onmessage = (e) => {
    console.log(e.data);
    console.log(Object.prototype.toString.call(e.data));

    let int8Array = e.data;

    for (var i = 0, length = int8Array.length; i < length; i++) {
        int8Array[i]++;
    }

    postMessage(int8Array);
};