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
        root.Toast = factory();
    }

}(this, function () {

    'use strict';

    /**
     * Create a new toast.js module
     * @constructor toast
     * @param {HTMLElement} reference - The reference element used to position the app
     * @param {HTMLElement|Object} app
     *      The HTML element used as app, or a configuration used to generate the app.
     * @param {String} [app.tagName='div'] The tag name of the generated app.
     * @param {Array} [app.classNames=['app']] Array of classes to apply to the generated app.
     */

    var Toast = function(options){
        return new Toast.lib.init(options);
    },
    version = "1.0";

    Toast.defaults = {
        text: 'Messaggio di test',
        duration: 3000,
        maxToast: 3,
        classNames: '',
        anchor: {
            horizontal: 'left', //[left, center, right]
            vertical: 'top' //[top, bottom]
        },
        persist: true,
        custom: function(){},
        callback: function(){},
        onClose: function(){},
        onEnter: function(){},
        variant: 'default',
        style: {
            background: ''
        }
    };

    Toast.lib = Toast.prototype = {
        toast: version,
        constructor: Toast,

        init: function(options){

            if(!options) options = {};

            this.options = {};

            this.toastElements = [];


            this.options.text = options.text || Toast.defaults.text;    //Display message
            this.options.duration = options.duration || Toast.defaults.duration;    //duration display, pass if the parameter is not null
            this.options.maxToast = options.maxToast || Toast.defaults.maxToast;    //Maximal toast displayed
            this.options.classNames = options.classNames || Toast.defaults.classNames;    //Class name Toast
            this.options.anchor = options.anchor || Toast.defaults.anchor;    //Position display
            this.options.persist = options.persist || Toast.defaults.persist;    //Persist toast if connection loast popup
            this.options.custom = options.custom || Toast.defaults.custom;    //Custom displayed Toast
            this.options.callback = options.callback || Toast.defaults.callback;    //Callback after display
            this.options.onClose = options.onClose || Toast.defaults.onClose;    //Callback before request to get close
            this.options.onEnter = options.onEnter || Toast.defaults.onEnter;    //Callnback before the transition is enterign
            this.options.variant = options.variant || Toast.defaults.variant;    //Used display different variant of Toast [default, error, success, warning, info] 


           // console.log(this.options);

            return this;
        },
        buildContainerToast: function(contentDiv, toast){
            if(!this.options) throw "Toast is not inizialized";


            //make a conainer toast
            contentDiv = document.createElement('div');
            contentDiv.classList.add("toast-container");
            //contentDiv.dataset.toastID = Date.now();

            
            if(this.options.anchor){
                if(this.options.anchor.horizontal == "left" ||
                    this.options.anchor.horizontal == "center" ||
                    this.options.anchor.horizontal == "right"  && 
                    this.options.anchor.vertical == "top" ||
                    this.options.anchor.vertical == "bottom") contentDiv.classList.add("toast-"+ this.options.anchor.vertical + "-" + this.options.anchor.horizontal);
            }

            
            return contentDiv;

        },
        buildToast: function(toast){
            if(!this.options) throw "Toast is not inizialized";


            //make a conainer toast
            toast = document.createElement('div');
            toast.classList.add("toast");
            toast.innerHTML = "<div class='toast-message'>"+this.options.text+"</div>";



            return toast;
        },

        //Display the toast
        show: function(){
             // Creating the DOM object for the toast
            this.containerToast = this.buildContainerToast();
            this.toastElements = this.buildToast();

            //Create container toast in body
            console.log(this.toastElements);


            const getContainerElementNumber = document.querySelectorAll(".toast-"+ this.options.anchor.vertical + "-" + this.options.anchor.horizontal).length;
            if(getContainerElementNumber == 0)
                document.body.appendChild(this.containerToast)

            //create Element toast in container toasts
            this.containerToast.appendChild(this.toastElements);


            //if the option persist is active not remove toast
            if(!this.options.persist){
                //get duration toast
                if(this.options.duration > 0){
                    this.toastElements.timeOut = window.setTimeout(function(){
                        //remove the toast from DOM
                        this.removeElement(this.toastElements);
                    }.bind(this), this.options.duration);
                }
            }


            //console.log("mostra", this.containerToast);
        },

        hide: function(){
            if(this.toastElements.timeOut){
                clearTimeout(this.toastElements.timeOut);
            }

            this.removeElement(this.toastElements);
        },

        removeElement: function(toastElements){

            //toastElements.classList.add("toast")

            window.setTimeout(function(){


                //Remove teh element from the DOM
                if (toastElements.parentNode) {
                    toastElements.parentNode.removeChild(toastElements);
                }

                //Callback the element toast from the DOM
                this.options.callback.call(toastElements);
            }.bind(this), 400);

            //console.log(toastElements);
        }
    }

    Toast.lib.init.prototype = Toast.lib;

    return Toast;

}));