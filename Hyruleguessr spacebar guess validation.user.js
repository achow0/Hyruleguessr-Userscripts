// ==UserScript==
// @name         Hyruleguessr spacebar guess validation
// @version      0.1
// @description  Press the spacebar to validate a guess; it only works if the map is open and the button is visible. Press the spacebar to press "Next" in between rounds.
// @author       achow
// @match        https://hyruleguessr.com/*
// ==/UserScript==

( function() {
    "use strict";
    const URL = "https://hyruleguessr.com/game";
    function run() {
        if (!window.location.href.startsWith(URL)) return;
        const guess_btn = document.querySelector(".guess-btn");
        const next_btn = document.querySelector(".next-btn");

        if (next_btn) next_btn.click();
        if (guess_btn) guess_btn.click();
    };
    addEventListener("keydown", e => {
        if (e.key === " " || e.key === "Enter") run()
    });
})();
