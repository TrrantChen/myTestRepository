/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-24 20:20:11
 * @version $Id$
 */

 define(["common"], function(common){      
    function domCreate(length) {
        var mainContainer = document.querySelector(".container");
        for (var i = 0; i < length; i++) {
            var h2 = document.createElement('h2');
            var p = document.createElement('p');
            h2.textContent = 'title';
            p.textContent = 'content';
            mainContainer.appendChild(h2);
            mainContainer.appendChild(p);
        }
    }

    function innerHtml(length) {
        var mainContainer = document.querySelector(".container");
        var str = "";
        for (var i = 0; i < length; i++) {
            str += "<h2>title</h2><p>content</p>"
        }  
        mainContainer.innerHTML = str;           
    }

    function innerText(length) {
        var mainContainer = document.querySelector(".container");
        var str = "";
        for (var i = 0; i < length; i++) {
            str += "<h2>title</h2><p>content</p>"
        }   
        mainContainer.innerText = "<h2>title</h2><p>content</p>";           
    }

    function textContent(length) {
        var mainContainer = document.querySelector(".container");
        var str = "";
        for (var i = 0; i < length; i++) {
            str += "<h2>title</h2><p>content</p>"
        }   
        mainContainer.textContent = "<h2>title</h2><p>content</p>";           
    }    
     
     return {
        domCreate:domCreate,
        innerHtml:innerHtml,
        innerText:innerText,
        textContent:textContent
     }  
 })

