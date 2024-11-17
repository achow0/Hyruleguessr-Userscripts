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
    addEventListener("keydown", e => {

        function run(info) {
            if (!info.url.startsWith(URL)) return;
            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            if (e.key === HardKey || e.key === HardKey.toUpperCase()) {
                console.log("h")
                if(checkboxes[1].checked){
                    checkboxes[1].click();
                }
                if(!checkboxes[4].checked){
                    checkboxes[4].click();
                }
                var sliders1 = document.querySelectorAll('#formControlRange');
                changeSliders(sliders1[0], 1);
                changeSliders(sliders1[1], 0);
            }else if (e.key === NormalKey || e.key === NormalKey.toUpperCase()){
                checkboxes = document.querySelectorAll('input[type="checkbox"]');
                if(!checkboxes[1].checked){
                    checkboxes[1].click();
                }
                if(checkboxes[4].checked){
                    checkboxes[4].click();
                }
                var sliders2 = document.querySelectorAll('#formControlRange');
                changeSliders(sliders2[0], 0);
            }
        }

        function changeSliders(slider, value){
            if(slider){
                slider.value = value;
                slider.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }

        if (window.onurlchange === null) window.addEventListener("urlchange", run);
        run({url: window.location.href});
    });
})();