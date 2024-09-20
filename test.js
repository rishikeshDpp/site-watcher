// ==UserScript==
// @name         Save time spent
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pointerpointer.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    alert("waitamin");
    let visitStartTime = Date.now();
    let visitEndTime = null;

    let savedData = localStorage.getItem('visitData');
    let visitData = savedData ? JSON.parse(savedData) : { visitStartTime: null, visitEndTime: null, timeSpent: 0 };
    let timeSpent = savedData ? visitData?.timeSpent : 0

    function storeData() {
        visitEndTime = Date.now();
        timeSpent += (visitEndTime - visitStartTime)/1000;
        visitData = {
            visitStartTime,
            visitEndTime,
            timeSpent,
        };

        localStorage.setItem('visitData', JSON.stringify(visitData));
        alert("visitData");
    }

    document.addEventListener('visibilitychange', () => {
        if(document.visibilityState === 'hidden') storeData();
    });
    window.addEventListener("beforeunload", () => {
        storeData();
        removeEventListener('visibilitychange');
    }, { once: true });
})();
