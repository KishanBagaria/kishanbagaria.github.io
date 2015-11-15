// ==UserScript==
// @name                Show HN Karma
// @namespace           https://kishanbagaria.com/
// @description         Shows karmas after usernames
// @author              Kishan Bagaria | kishanbagaria.com
// @version             1.0
// @match               *://news.ycombinator.com/*
// @grant               none
// @downloadURL         https://kishanbagaria.com/userscripts/SHNK.user.js
// @updateURL           https://kishanbagaria.com/userscripts/SHNK.user.js
// ==/UserScript==
function contentEval(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();';
    }
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}
contentEval(function() {
    function get(url, callback) {
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                callback(this.response);
            } else {
                console.log(this.response);
            }
        };
        xhr.onerror = function() {
            console.log(this.response);
        };
        xhr.send();
    }

    function appendKarma(userName, karma) {
        var userNameLinks = document.querySelectorAll('a[href="user?id=' + userName + '"]');
        for (var i = 0; i < userNameLinks.length; i++) {
            userNameLinks[i].insertAdjacentHTML('afterend', ' (' + karma + ')');
        }
    }

    function getKarma(userName) {
        get('https://hacker-news.firebaseio.com/v0/user/' + userName + '/karma.json', function(karma) {
            appendKarma(userName, karma);
        });
    }

    var loggedUserName = document.getElementsByClassName('pagetop')[1].querySelectorAll('a')[0].href.split('=')[1],
        userNameLinks = document.querySelectorAll('a[href^="user?id="]'),
        done = [];
    for (var i = 0; i < userNameLinks.length; i++) {
        var userName = userNameLinks[i].href.split('=')[1];
        if (userName !== loggedUserName && done.indexOf(userName) === -1) {
            done.push(userName);
            getKarma(userName);
        }
    }
});