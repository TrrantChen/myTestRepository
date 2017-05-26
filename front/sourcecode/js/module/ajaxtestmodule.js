import * as ajax from '../common/ajax.js';
import $ from 'jquery';

export function originXmlHttpRequestTestReadyStateChange() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://" + document.domain  + ":8088/delayloadtest" + "?para0=1000");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.response);
        } 
    }           
    xhr.send(null);              
}

export function originXmlHttpRequestTestOnLoad() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://" + document.domain  + ":8088/delayloadtest" + "?para0=1000");
    xhr.onload = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.response);
        } 
    }           
    xhr.send(null);        
}

export function fetchTest() {
    var fetchThen = fetch("http://" + document.domain  + ":8088/delayloadtest?para0=1000", { method: 'get' })
    fetchThen.then(function(response) {
        console.log("this is response");
        return response.text()
     })
    .then(function(result) {
        console.log("this is result");
        console.log(result);
    })
    .catch(function(err) {
        console.log(err);
     });        
}

export function jqueryAjaxTest() {
    $.ajax({
        url: "http://" + document.domain  + ":8088/delayloadtest",
        type: 'post',
        async : true,
        datatype: "json",
        contentType:"application/json",
        data:JSON.stringify({para0:1000}),
        success:function(data) {
            console.log(data);
        },
        error:function(data) {
            console.error(data);
        }
    })  
}

export function mySelfAjaxTest() {
    var option = {
        url:"http://" + document.domain  + ":8088/delayloadtest",
        data:{para0:1000},
        success:function(result) {
            console.log("self ajax " + result);
        }
        ,error:function(readyState, status) {
            console.error(readyState + " " + status);
        }
    }   

    ajax.generalAjax(option);
}



