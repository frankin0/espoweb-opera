/*!
 * Tooltip - Javascript 0.1.0 (https://opera.espoweb.it/)
 * Copyright 2017 Hesam Bayat (https://espoweb.it/)
 * Licensed under MIT ()
 */
;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function(){ return factory })
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.tooltip = factory();
    }

}(this, function () {

    'use strict';

    /**
     * Create a new tooltip.js module
     * @constructor tooltip
     * @param {HTMLElement} reference - The reference element used to position the app
     * @param {HTMLElement|Object} app
     *      The HTML element used as app, or a configuration used to generate the app.
     * @param {String} [app.tagName='div'] The tag name of the generated app.
     * @param {Array} [app.classNames=['app']] Array of classes to apply to the generated app.
     */

    function tooltip(elements, options){

        //if element not exist
        if(!elements){ return }

        var self = this,
            options = options || {},
            attrText = options.attrText || 'data-tooltip',
            attrPlacement = options.attrPlacement || 'data-tooltip-placement',
            attrColor = options.attrColor || 'data-tooltip-color',
            once = options.once || 0,
            displayed = options.display || 1,
            isTouch = false,
            copies = [],
            tooltips = [];
            
        self.delay = options.delay || 150;
        self.duration = options.duration || 2500;
        self.offset = options.offsetTop || 0;
        

        const apply = (element) => {
            
            element.tooltipped = 0;

            if(!isTouch){
                element.addEventListener('mouseover', () => enter(element), false);

                element.addEventListener('mouseout', off, false);
            }else{
                element.addEventListener('touchstart', () => enter(element), false);

                element.addEventListener('touchend', off, false); 
            }
        }

        const enter = (element, text, already, ttips, doc, rect, top, left, margin, bgColor, placement) => {

            if(displayed > -1){
                if(element.tooltipped < displayed && element.getAttribute(attrText)){
                    pull();
                    
                    self.timeoff = setTimeout(() => {
                        
                        //get a title
                        text = element.getAttribute(attrText).trim();
                        bgColor = element.getAttribute(attrColor).trim();
                        placement = element.getAttribute(attrPlacement).trim();

                        //if title isn't exist
                        if(!text) return;

                        //if position isn't exist
                        if(!placement) return;

                        already = copies.indexOf(text) !== -1;

                        if(once && already) return;

                        if(!already) copies.push(text);

                        element.tooltipped++;

                        ttips = document.createElement('div');
                        ttips.className = 'tooltip ' + bgColor;
                        ttips.innerHTML = '<span class="tooltip-copy ">'+text+'</span>';
                        ttips.original = element;

                        document.body.appendChild(ttips);

                        doc = document.body.getBoundingClientRect();
                        rect = element.getBoundingClientRect();


                        if(placement == "top"){
                            //sign top position
                            top = rect.top - (ttips.offsetHeight + ttips.offsetHeight / 2.5);
                        }else if(placement == "bottom"){
                            //sign bottom position
                            top = (rect.top ) + (rect.height + ttips.offsetHeight / 2.5);
                        }else if(placement == "right" || placement == "left"){
                            //sign right position
                            top = rect.top + 7;
                        }

                        
                        if(placement == "right"){
                            left = ((rect.left + doc.left) + rect.width ) + 10;
                        } else if(placement == "left"){
                            left = ((rect.left + doc.left) - ttips.offsetWidth) - 10;
                        }else{
                            left = ((rect.left + doc.left) + rect.width /2 ) - ttips.offsetWidth / 2;
                        }
                        
                        //if the screen covers the tooltips, move the tooltip below the element
                        if(top < (window.pageYOffset || document.documentElement.scrollTop) + self.offset){
                            top = (rect.top ) + (rect.height + ttips.offsetHeight / 2.5);
                            left = ((rect.left + doc.left) + rect.width /2 ) - ttips.offsetWidth / 2;
                            ttips.className += ' tooltip-btm';
                        }

                        if(left < 0){
                            left = 0;
                        }

                        if(doc.width < left + ttips.offsetWidth){
                            margin = left + ttips.offsetWidth - doc.width;
                            left = left - margin;
                        }
                        ttips.style.top = top + "px";
                        ttips.style.left = left + "px";

                        //element.classList.add('tooltip-on');

                        tooltips.push(ttips);

                        options.onpop ? options.onpop(element, ttips) : null;
                        

                        //remove tooltips on schedule
                        off();

                    }, self.delay);

                }
            }

        }

        const off = () => {
            clear();
            self.timeoff = setTimeout(pull, self.duration)
        }

        const clear = () => {
            if(self.timeoff) clearTimeout(self.timeoff)
        }
            
        const pull = (e) => { 
            clear();

            if(!tooltips.length) return;
            
            e = tooltips.shift();

            options.ondrop ? options.ondrop(e.original) : null;

            e.parentElement.removeChild(e);
        }

        const init = () => {

            try {
                isTouch = 'ontouchstart' in window || navigator.maxTouchPoints;
            } catch (e) {
                //not a touch device
            }

            if(-1 !== displayed ){
                displayed = !isNaN(parseFloat(displayed)) && isFinite(displayed) ? displayed : -1;
            }

            for (let i = 0; i < elements.length; i++) {
                apply(elements[i]);
            }


            window.addEventListener('scroll', pull, false);
            window.addEventListener('resizze', pull, false);
            document.addEventListener('click', pull, false);

            //console.log(elements, option, self);
            
        }


        init();

        return self;
    }

    tooltip.prototype.set = function(option, value){
        this[option] = value;
    }

    return tooltip;

}));