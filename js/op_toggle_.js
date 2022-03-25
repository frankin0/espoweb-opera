/*!
 * OpToggle - Javascript 0.1.0 (https://opera.espoweb.it/)
 * Copyright 2022 espoweb.it (https://espoweb.it/)
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
        root.OpToggle = factory();
    }

}(this, function () {

    'use strict';

    /**
     * Create a new OpToggle.js module
     * @constructor OpToggle
     * @param {HTMLElement} reference - The reference element used to position the app
     * @param {HTMLElement|Object} app
     *      The HTML element used as app, or a configuration used to generate the app.
     * @param {String} [app.tagName='div'] The tag name of the generated app.
     * @param {Array} [app.classNames=['app']] Array of classes to apply to the generated app.
     */

    
    var OpToggle = function(elements ,options){
        return new OpToggle.lib.init(elements, options);
    },
    version = "1.5";

    OpToggle.defaults = {};


    OpToggle.lib = OpToggle.prototype = {
        toast: version,
        constructor: OpToggle,

        init: function(elements, options){

            if(!options) options = {};

            if(elements) this.elements = elements;

            this.options = {};


            elements.forEach(element => {
                const toggle = element.dataset.opToggle;


                if(toggle == "tab"){

                    element.addEventListener('click', this.tabHandleClick);
                    //console.log(toggle, idTab, document.getElementById(idTab));
                    
                }

            });

            return this;
        },
        tabHandleClick: function(el){
            el.preventDefault();
            const idTab = el.target.href.split("#")[1];
            const tab = el.target.dataset.tab;

            //remove class in all item nav
            const navItm = document.querySelectorAll('.nav.nav-tabs .nav-item');
            navItm.forEach(nit => {
                nit.children[0].classList.remove('active');
            });

            //add active class in nav item selected
            el.target.classList.add('active');

            //remove class in all items tab
            const els = document.querySelectorAll('#'+ tab + '.tab .tab-item');
            els.forEach(element => {
                element.classList.remove('active');

                setTimeout(() =>{
                    element.classList.remove('show');
                }, 300)
            });

            //add class in tab selected
            document.getElementById(idTab).classList.add('active');
            
            setTimeout(() =>{
                document.getElementById(idTab).classList.add('show');
            }, 300)

        },
        

    }


    //Set css in elements
    OpToggle.getCss = function(name, css){
        const els = document.querySelectorAll(name);
        els.forEach(element => {
            for (const c in css) {
                element.style[c] = css[c];
            }
            
        });
    }

    OpToggle.lib.init.prototype = OpToggle.lib;

    return OpToggle;

}));