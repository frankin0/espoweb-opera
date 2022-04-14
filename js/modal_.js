/*!
 * Modal - Javascript 0.1.0 (https://opera.espoweb.it/)
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
        root.Modal = factory();
    }

}(this, function () {

    'use strict';

    /**
     * Create a new Modal.js module
     * @constructor Modal
     * @param {HTMLElement} reference - The reference element used to position the app
     * @param {HTMLElement|Object} app
     *      The HTML element used as app, or a configuration used to generate the app.
     * @param {String} [app.tagName='div'] The tag name of the generated app.
     * @param {Array} [app.classNames=['app']] Array of classes to apply to the generated app.
     */

    
    var Modal = function(elements ,options){
        return new Modal.lib.init(elements, options);
    },
    version = "1.0";

    Modal.defaults = {
        
    };

    Modal.lib = Modal.prototype = {
        toast: version,
        constructor: Modal,

        init: function(elements, options){

            if(!options) options = {};

            if(elements) this.elements = elements;

            this.options = {};


            elements.forEach(element => {
                const toggle = element.dataset.toggle;

                document.addEventListener('click', ()=>{
                    this.handleClick(element);
                }, true);
            });

            return this;
        },

        handleClick(e){
            console.log(e.target, e, this);
        }

    }

    Modal.lib.init.prototype = Modal.lib;

    return Modal;

}));