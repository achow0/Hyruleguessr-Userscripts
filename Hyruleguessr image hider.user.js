// ==UserScript==
// @name         Hyruleguessr image hider
// @version      0.1
// @description  Hides images until they are fully loaded
// @author       achow
// @match        https://hyruleguessr.com/*
// ==/UserScript==

(function() {
    'use strict';
    const URL = "https://hyruleguessr.com/game";

    function hidePic(){
        const picDiv = document.querySelector(".viewer-loading");
        let pic = null;
        if (picDiv) pic = picDiv.firstChild
        if (!!pic && !pic.complete && pic.style.visibility !== "hidden"){
            pic.style.visibility = "hidden"
        }
    };
    function run(){
        if (!window.location.href.startsWith(URL)) return;
        hidePic();
        const targetNode = document.body;
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationList, observer) => {
            hidePic()
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    };
    run();
})();
