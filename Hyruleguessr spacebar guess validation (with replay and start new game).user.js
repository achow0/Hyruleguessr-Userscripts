// ==UserScript==
// @name         Hyruleguessr spacebar guess validation (with replay and start new game)
// @version      0.1
// @description  Press spacebar to validate guess, replay a game, and start a new game
// @author       achow
// @match        https://hyruleguessr.com/*
// ==/UserScript==

(function() {
    "use strict";
    const URL = "https://hyruleguessr.com/game";

    function run() {
        if (!window.location.href.startsWith(URL)) return;

        // Select buttons
        const guess_btn = document.querySelector(".guess-btn");
        const next_btn = document.querySelector(".next-btn");
        const replay_div = document.querySelector(".replay-container");
        const start_game_div = document.querySelector(".start-game-btn-container");

        if (next_btn) next_btn.click();
        else if (guess_btn) guess_btn.click();
        else if (start_game_div) start_game_div.firstChild.click();
        else if (replay_div) replay_div.firstChild.click();
    }

    // Handle spacebar key press
    addEventListener("keydown", e => {
        if (e.key === " " || e.key === "Enter") run();
    });
})();
