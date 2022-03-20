/*!
 * Tabs - Javascript 0.1.0 (https://opera.espoweb.it/)
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
        root.Tabs = factory();
    }

}(this, function () {

    'use strict';

    /**
     * Create a new Tabs.js module
     * @constructor Tabs
     * @param {HTMLElement} reference - The reference element used to position the app
     * @param {HTMLElement|Object} app
     *      The HTML element used as app, or a configuration used to generate the app.
     * @param {String} [app.tagName='div'] The tag name of the generated app.
     * @param {Array} [app.classNames=['app']] Array of classes to apply to the generated app.
     */

    
    var Tabs = function(elements ,options){
        return new Tabs.lib.init(elements, options);
    },
    version = "1.5";

    Tabs.defaults = {
        text: 'Messaggio di test',
    };


    Tabs.lib = Tabs.prototype = {
        toast: version,
        constructor: Tabs,

        init: function(elements, options){

            if(!options) options = {};

            if(elements) this.elements = elements;

            this.options = {};

            this.options.text = options.text || Tabs.defaults.text;    //Display message

            console.log(this);

            

            return this;
        },
    }

    Tabs.lib.init.prototype = Tabs.lib;

    return Tabs;

}));