// ==UserScript==
// @name         Hyruleguessr hard settings
// @version      0.1
// @description  Press the H key to automatically set extremeguessr difficulty settings
// @author       SebastiÃ¡nTGD
// @match        https://hyruleguessr.com/*
// @grant        window.onurlchange
// ==/UserScript==

(function() {
    "use strict";
    const URL = "https://hyruleguessr.com/game";
    // Change these Key constants to change the letters on your keyboard, always use lowercase.
    const HardKey = "h";
    const NormalKey = "n";
    function run(e) {
        if (!window.location.href.startsWith(URL)) return;
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        if (e.key === HardKey || e.key === HardKey.toUpperCase()) {
            for (let i=0 ; i<checkboxes.length; i++){
                let checkbox = checkboxes[i]
                if (["displayTowers", "displayTowns", "displayStables"].includes(checkbox.id) && checkbox.checked) checkbox.click();
                else if (checkbox.id === "pictureLimitDuration" && !checkbox.checked) checkbox.click();
            }
            var sliders1 = document.querySelectorAll('#formControlRange');
            changeSliders(sliders1[0], 1);
            changeSliders(sliders1[1], 0);
        } else if (e.key === NormalKey || e.key === NormalKey.toUpperCase()) {
            checkboxes = document.querySelectorAll('input[type="checkbox"]');
            for (let i=0 ; i<checkboxes.length; i++) {
                let checkbox = checkboxes[i]
                if (checkbox.id === "displayTowers" && !checkbox.checked) checkbox.click()
                else if (["displayTowns", "displayStables", "pictureLimitDuration"].includes(checkbox.id) && checkbox.checked) checkbox.click()
            }
            var sliders2 = document.querySelector('#formControlRange');
            changeSliders(sliders2, 0);
        }
    }
    function changeSliders(slider, value){
        if(slider) {
            slider.value = value;
            slider.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
    addEventListener("keydown", run);
})();
