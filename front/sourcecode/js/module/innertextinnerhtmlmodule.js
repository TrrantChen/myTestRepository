export function domCreate(length) {
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

export function innerHtml(length) {
    var mainContainer = document.querySelector(".container");
    var str = "";
    for (var i = 0; i < length; i++) {
        str += "<h2>title</h2><p>content</p>"
    }
    mainContainer.innerHTML = str;
}

export function innerText(length) {
    var mainContainer = document.querySelector(".container");
    var str = "";
    for (var i = 0; i < length; i++) {
        str += "<h2>title</h2><p>content</p>"
    }
    mainContainer.innerText = "<h2>title</h2><p>content</p>";
}

export function textContent(length) {
    var mainContainer = document.querySelector(".container");
    var str = "";
    for (var i = 0; i < length; i++) {
        str += "<h2>title</h2><p>content</p>"
    }
    mainContainer.textContent = "<h2>title</h2><p>content</p>";
}
