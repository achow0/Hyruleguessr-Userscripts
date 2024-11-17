// ==UserScript==
// @name         Hyruleguessr image cropper
// @version      0.1
// @description  Crops the images during each round for an extra challenge! (follow instructions within the userscript for some customization)
// @author       achow
// @match        https://hyruleguessr.com/*
// @grant        window.onurlchange
// ==/UserScript==

( function() {
    "use strict";
    const direction = "RU"; // choose D (Down), U (Up), R (Right), or L (Left) to choose which part of the image to keep
                            // choose L or R, then U or D to choose to keep a quarter of the image
    const polygonPicker = {
        "D": "0 50%, 0 100%, 100% 100%, 100% 50%",
        "U": "0 0, 100% 0, 100% 50%, 0 50%",
        "R": "50% 0, 100% 0, 100% 100%, 50% 100%",
        "L": "0 0, 50% 0, 50% 100%, 0 100%",
        "RU": "50% 0, 100% 0, 100% 50%, 50% 50%",
        "RD": "50% 50%, 100% 50%, 100% 100%, 50% 100%",
        "LU": "0 0, 50% 0, 50% 50%, 0 50%",
        "LD": "0 50%, 50% 50%, 50% 100%, 0 100%"
    };
    const URL = "https://hyruleguessr.com/game";
    function picTest() {
        const pic = document.querySelector(".viewer-move");
            if (!!pic && !pic.style.clipPath) {
                pic.style.clipPath = `polygon(${polygonPicker[direction]})`;
            }
    };
    function run(info) {
        if (!info.url.startsWith(URL)) return;
        picTest()
        const targetNode = document.body;
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationList, observer) => {
            picTest()
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    };
    if (window.onurlchange === null) window.addEventListener("urlchange", run);
    run({url: window.location.href});
})();