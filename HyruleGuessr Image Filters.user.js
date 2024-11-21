// ==UserScript==
// @name         HyruleGuessr Image Filters
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Applies one or multiple filters to the images to create more of a challenge.
// @author       Noci27
// @match        https://hyruleguessr.com/*
// ==/UserScript==

(function() {
    'use strict';

    //Change the values below to your liking. Instructions are given next to the filter. Set "radnom" to "true" if you want randomized values for every filter.

    var blur = 0; //the higher the number, the blurrier it gets; Recommendation: 5
    var brightness = "100%"; //100% is unchanged, anything below 100% makes it darker, anything above 100% makes it brighter; Recommendation: 200% or 10%
    var contrast = "100%"; //100% is unchanged, anything below 100% decreases contrast, anything above 100% increases contrast; Recommendation: 700%
    var grayscale = "0%" //0% is unchanged, 100% is complete grayscale; Recommendation: 100%
    var hue_rotate = 0; //0deg and 360deg is unchanged; Recommendation: 45deg < x deg < 325deg
    var invert = "0%"; //0% is unchanged, 100% is complete invert, using anything other than 0% or 100% is not recommended; Recommendation: 100%
    var opacity = "100%"; //0% is completely invisible, 100% is unchanged; Recommendation: 10%
    var saturate = "100%" //100% is unchanged, anything below 100% decreases saturation, anything above 100% increases saturation; Recommendation: 700% or 30%
    var sepia = "0%"; //0% is unchanged, 100% is complete sepia; Recommendation: 100%
    const random = false; //set to true for insane mode; reload HyruleGuessr for different randomization

    if(random){
        grayscale = Math.floor(Math.random() * 50) + "%";
        invert = Math.floor(Math.random() * 2) * 100 + "%";
        opacity = 30 + Math.floor(Math.random() * 70) + "%";
        sepia = Math.floor(Math.random() * 50) + "%";
        brightness = 30 + Math.floor(Math.random() * 200) + "%";
        contrast = 30 + Math.floor(Math.random() * 400) + "%";
        saturate = 30 + Math.floor(Math.random() * 400) + "%";
        blur = Math.floor(Math.random() * 7);
        hue_rotate = Math.floor(Math.random() * 360);
        console.log(grayscale + "\n" + invert + "\n" + opacity + "\n" + sepia + "\n" + brightness + "\n" + contrast + "\n" + saturate + "\n" + blur + "\n" + hue_rotate);
    }
    const filters = `blur(${blur}px) brightness(${brightness}) contrast(${contrast}) grayscale(${grayscale}) hue-rotate(${hue_rotate}deg) invert(${invert}) opacity(${opacity}) saturate(${saturate}) sepia(${sepia})`;

    const URL = "https://hyruleguessr.com/game";
    function applyFilters(){
        if (window.location.href.startsWith(URL)){
            const image = document.querySelector(".viewer-move");
            if (!!image && !image.style.filter) {
                image.style.filter = filters;
            }
        }
    };

    const targetNode = document.body;
    const config = {attributes: true, childList: true, subtree: true};
    const observer = new MutationObserver(applyFilters);
    observer.observe(targetNode, config);
})();
