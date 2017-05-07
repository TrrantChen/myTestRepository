define(["common"], function(common){
    var path = common.getHost();

    function test4blob() {
        var blob = new Blob(["Hello world!"], { type: "text/plain" });
        alert(blob);
    }

    function downLoadBlobFromLocal() {
        var blob = new Blob(["Hello world 中文!"], { type: "text/plain" });
        var a = document.querySelector("#testA");
        a.href = window.URL.createObjectURL(blob);
        a.download = "test.txt";
    }

    function getBlobFromServer() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", path + "test4getBlob", true);
        xhr.responseType = 'blob'
        xhr.onreadystatechange = function() {
            switch (xhr.readyState.toString()) {
                case "4":
                    if (xhr.status.toString() == "200") {
                        var result = xhr.response;
                        var reader = new FileReader();
                        reader.addEventListener("loadend", function() {
                           var result = reader.result;
                           var str = common.ab2string8(result);
                           alert(str)
                        });
                        reader.readAsArrayBuffer(xhr.response);                                                                  
                    }
                    break;                    
                default:
                    console.log("error");
                    break;                                                                             
                }
        }            
        xhr.send(null);
    } 
       
    return {
        test4blob:test4blob,
        downLoadBlobFromLocal:downLoadBlobFromLocal,
        getBlobFromServer:getBlobFromServer
    }  
})