// ==UserScript==
// @name         Hyruleguessr game counter
// @version      0.1
// @description  Game counter for speedruns.
// @author       achow
// @match        https://hyruleguessr.com/*
// @grant        none
// ==/UserScript==

(function() {
    "use strict";
    const URL = "https://hyruleguessr.com/game";
    let counted = false;
    let game = 0;
    let gameText = document.createElement("h4"); // create game counter
    gameText.innerText = "Perfect Games: " + game;
    gameText.style.color = "white";
    document.querySelector(".navbar").insertAdjacentElement("afterend", gameText);

    function run() {
        if (!window.location.href.startsWith(URL)) return;

        // Select buttons
        const replay_div = document.querySelector(".replay-container");
        const start_game_div = document.querySelector(".start-game-btn-container");

        if (start_game_div) counted = false // set "counted" to false if new game
        if (replay_div) { // if end of game
            let score_div = document.querySelector(".total-container");
            if (!counted && score_div && score_div.innerText.match(/\d+/g)[0] == 25000) { // if perfect, update game number
                game++;
                gameText.innerText = "Perfect Games: " + game;
                counted = true // set "counted" to true to prevent double counting of games
            }
        }
    }

    // Handle key press
    addEventListener("keydown", e => {
        run();
        if (e.key === "r") { // reset game number if r is pressed
            game = 0;
            gameText.innerText = "Perfect Games: 0"
        };
    });

    // Handle clicks
    addEventListener("click", run)
})();
