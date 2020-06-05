// ==UserScript==
// @name         Dopamine Blocker
// @namespace    https://kishanbagaria.com/
// @version      0.1
// @description  Hides distracting elements on Twitter, YouTube, HN, Stack Exchange
// @author       Kishan Bagaria
// @match        https://www.youtube.com/*
// @match        https://twitter.com/*
// @match        https://news.ycombinator.com/
// @match        https://news.ycombinator.com/news
// @match        https://*.stackexchange.com/*
// @match        https://stackoverflow.com/*
// @grant        none
// ==/UserScript==

(function() {
    const $forEach = function (array, callback) {
      if (array && callback) {
        for (var i = 0; i < array.length; i++) callback(array[i], i)
      }
    }
    const waitForElements = function (parentNode, selector, callback) {
        const callbackOnlyOnce = function (n) {
            if (n.getAttribute('data-found')) return
            callback(n)
            n.setAttribute('data-found', '1')
        }
        const callForChildren = function () {
            if (parentNode.matches && parentNode.matches(selector)) callbackOnlyOnce(parentNode)
            if (!parentNode.querySelectorAll) return
            $forEach(parentNode.querySelectorAll(selector), callbackOnlyOnce)
        }
        callForChildren()
        new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                $forEach(m.addedNodes, callForChildren)
            })
        }).observe(parentNode, {
            childList: true,
            subtree: true,
        })
    }

    const hide = el => {
        el.style.display = 'none'
    }
    if (window.location.hostname.includes('youtube.com')) {
        waitForElements(document.body, 'ytd-rich-grid-renderer', hide)
    } else if (window.location.hostname.includes('twitter.com')) {
        waitForElements(document.body, '[aria-label="Timeline: Your Home Timeline"]', hide)
        waitForElements(document.body, '[aria-label="Timeline: Trending now"]', hide)
    } else if (window.location.hostname.includes('news.ycombinator.com')) {
        waitForElements(document.body, '.itemlist', hide)
    } else if (window.location.hostname.includes('stackoverflow.com') || window.location.hostname.includes('stackexchange.com')) {
        waitForElements(document.body, '#hot-network-questions', hide)
    }
})()
