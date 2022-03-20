/*!
 * Toast - Javascript 0.1.0 (https://opera.espoweb.it/)
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
    version = "1.5";

    Toast.defaults = {
        action: false,
        text: 'Messaggio di test',
        duration: 3000,
        maxToast: 3,
        classNames: '',
        offset: 6,
        anchor: {
            horizontal: 'left', //[left, center, right]
            vertical: 'top' //[top, bottom]
        },
        persist: false,
        custom: null,
        callback: function(){},
        onClose: function(){},
        onOnline: function(){},
        variant: 'default',
        dismissButton: false,
        style: {
            background: ''
        }
    };

    Toast.numbers = {
        'top-left': 0,
        'top-right': 0,
        'top-center': 0,
        'bottom-left': 0,
        'bottom-right': 0,
        'bottom-center': 0,
    };

    Toast.lib = Toast.prototype = {
        toast: version,
        constructor: Toast,

        init: function(options){

            if(!options) options = {};

            this.options = {};

            this.toastElement = null;


            this.options.text = options.text || Toast.defaults.text;    //Display message
            this.options.duration = options.duration || Toast.defaults.duration;    //duration display, pass if the parameter is not null
            this.options.maxToast = options.maxToast || Toast.defaults.maxToast;    //Maximal toast displayed
            this.options.classNames = options.classNames || Toast.defaults.classNames;    //Class name Toast
            this.options.anchor = options.anchor || Toast.defaults.anchor;    //Position display
            this.options.persist = options.persist || Toast.defaults.persist;    //Persist toast if connection loast popup
            this.options.custom = options.custom || Toast.defaults.custom;    //Custom displayed Toast
            this.options.onAction = options.onAction || Toast.defaults.onAction;    //Callback after display
            this.options.onClose = options.onClose || Toast.defaults.onClose;    //Callback before request to get close
            this.options.onOnline = options.onOnline || Toast.defaults.onOnline;    //Optional option onOnline event
            this.options.variant = options.variant || Toast.defaults.variant;    //Used display different variant of Toast [default, danger, success, warning, info] 
            this.options.offset = options.offset || Toast.defaults.offset;    //Space between toasts
            this.options.dismissButton = options.dismissButton || Toast.defaults.dismissButton;    //Show dismiss button
            this.options.action = options.action || Toast.defaults.action;    //Show action button

            //console.log(this);

            if(Toast.numbers[this.options.anchor.vertical + "-" + this.options.anchor.horizontal] >= this.options.maxToast) return;

            return this;
        },
        buildContainerToast: function(contentDiv, toast){
            if(!this.options) throw "Toast is not inizialized";

            if(Toast.numbers[this.options.anchor.vertical + "-" + this.options.anchor.horizontal] >= this.options.maxToast) return;

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

            if(Toast.numbers[this.options.anchor.vertical + "-" + this.options.anchor.horizontal] >= this.options.maxToast) return;

            //make a conainer toast
            toast = document.createElement('div');
            toast.classList.add("toast");
            if(this.options.variant == "success"){
                toast.classList.add("background-success");
                toast.innerHTML = '<i class="icon-success"></i>';
            }else if(this.options.variant == "danger"){
                toast.innerHTML = '<i class="icon-danger"></i>';
                toast.classList.add("background-danger");
            }else if(this.options.variant == "warning"){
                toast.classList.add("background-warning");
                toast.innerHTML = '<i class="icon-warning"></i>';
            }else if(this.options.variant == "info"){
                toast.innerHTML = '<i class="icon-info"></i>';
                toast.classList.add("background-info");
            }else{
                toast.innerHTML = '';
            }
            if(this.options.custom){
                if(this.options.custom.style){
                    Object.values(this.options.custom.style).map((style, index)=>{
                        let key = Object.keys(this.options.custom.style)[index];

                        toast.style[key] = style;
                    });
                }

                //toast.classList.add(this.options.custom.class);
                toast.className += " " + this.options.custom.class;

                this.HTMLElements(this.options.custom.header, toast);
                
                if(this.options.custom.main){
                    this.HTMLElements(this.options.custom.main, toast);
                }
            }else{
                toast.innerHTML += "<div class='toast-message'>"+this.options.text+"</div>";
            }
            if(this.options.action != "" || this.options.action !== false){
                if(this.options.action.includes('on-action')){
                    toast.innerHTML += "<div class='toast-button'>"+this.options.action+"</div>";
                }else throw "No button action sected"
            }
            if(this.options.dismissButton != "" || this.options.dismissButton !== false){
                if(this.options.dismissButton.includes('on-close')){
                    toast.innerHTML += "<div class='toast-button'>"+this.options.dismissButton+"</div>";
                }else throw "No button close sected"
            }

            
            return toast;
        },

        //Decode html elements JSON Framework by espoweb
        HTMLElements: function(data, parent = document.body, val = 0){
            if(!data) throw "Data HTMLElements not found!";

            let makeElement = HTMLElement;

            data.forEach(elements => {
                const keys = Object.keys(elements);
                const values = Object.values(elements);
                
                for (let i = 0; i < keys.length; i++) {
                    const element = keys[i];
                    const value = values[i];
                    
                    makeElement = document.createElement(element);
                    

                    Object.keys(value).map((attr, index) => {
                        if(attr == "HTMLElements"){
                            val++;
                            if(typeof Object.values(value)[index] == "object"){
                                this.HTMLElements(Object.values(value)[index], makeElement, val);
                            }else makeElement.innerHTML = Object.values(value)[index];
                            
                        }else if(attr == "onClick" ){ 
                            makeElement.addEventListener('click', Object.values(value)[index]);
                        }else makeElement.setAttribute(attr, Object.values(value)[index]);
                    });

                }

                return parent.appendChild(makeElement);
            });


        },

        //Display the toast
        show: function(){

            if(Toast.numbers[this.options.anchor.vertical + "-" + this.options.anchor.horizontal] >= this.options.maxToast) return;

            // Creating the DOM object for the toast
            this.containerToast  = this.buildContainerToast();
            this.toastElement = this.buildToast();

            //Create container toast in body
            var rootElement;
            rootElement = document.body;


            if(!rootElement) throw "Root element is not defined";

            rootElement.appendChild(this.containerToast)

           
            //create Element toast in container toasts
            this.containerToast.appendChild(this.toastElement);

            if(this.options.dismissButton != "" || this.options.dismissButton !== false){
                if(this.options.dismissButton.includes('on-close')){
                    this.toastElement.querySelector('[on-close]').addEventListener('click', function(event){
                        event.stopPropagation();
                        
                        this.options.onClose.call(this, event);
                        this.hide();
                    }.bind(this));
                }
            }

            if(this.options.action != "" || this.options.action !== false){
                if(this.options.action.includes('on-action')){
                    this.toastElement.querySelector('[on-action]').addEventListener('click', function(event){
                        event.stopPropagation();
                        
                        this.options.onAction.call(this, event);
                    }.bind(this));
                }
            }

            //Reposition the toasts in multiple solution
            this.position();

            //if the option persist is active not remove toast
            if(!this.options.persist){
                //get duration toast
                if(this.options.duration > 0){
                    this.toastElement.timeOut = window.setTimeout(function(){
                        //remove the toast from DOM
                        this.removeElement(this.toastElement);
                    }.bind(this), this.options.duration);
                }
            }


            Toast.numbers[this.options.anchor.vertical + "-" + this.options.anchor.horizontal] ++;
            return this;
        },

        hide: function(){
            if(this.toastElement.timeOut){
                clearTimeout(this.toastElement.timeOut);
            }

            this.removeElement(this.toastElement);
        },

        removeElement: function(toastElements){

            toastElements.parentNode.classList.add("toast-hide")

            window.setTimeout(function(){

                //Remove teh element from the DOM
                if (toastElements.parentNode) {
                    toastElements.parentNode.remove();
                }

                //Callback the element toast from the DOM
                this.options.onClose.call(toastElements);

                this.position();
                Toast.numbers[this.options.anchor.vertical + "-" + this.options.anchor.horizontal] --;
            }.bind(this), 400);

            //console.log(toastElements);
        },

        position: function (){

            //Get all toast on the DOM
            const toastElements = document.querySelectorAll('.toast-container');

            var offsetToast = {
                tl: this.options.offset,
                tr: this.options.offset,
                bl: this.options.offset, 
                br: this.options.offset,
                bc: this.options.offset,
                tc: this.options.offset
            };

            for (let i = 0; i < toastElements.length; i++) {
                
                var height = toastElements[i].offsetHeight;
                let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
                toastElements[i].classList.add('toast-reposition');

                //Show toast in center if screen with less than or equal to 360px
                if(width <= 360){ 
                    //Setting the position
                    if(toastElements[i].classList.contains('toast-top-left') === true){
                        toastElements[i].style.top = offsetToast.tc + "px";
                        offsetToast.tc += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-top-right') === true){
                        toastElements[i].style.top = offsetToast.tc + "px";
                        offsetToast.tc += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-bottom-left') === true){
                        toastElements[i].style.bottom = offsetToast.bc + "px";
                        offsetToast.bc += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-bottom-right') === true){
                        toastElements[i].style.bottom = offsetToast.bc + "px";
                        offsetToast.bc += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-bottom-center') === true){
                        toastElements[i].style.bottom = offsetToast.bc + "px";
                        offsetToast.bc += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-top-center') === true){
                        toastElements[i].style.top = offsetToast.tc + "px";
                        offsetToast.tc += height + this.options.offset;
                    }else{
                        toastElements[i].style.top = offsetToast.tc + "px";
                        offsetToast.tc += height + this.options.offset;
                    }

                }else{
                    if(toastElements[i].classList.contains('toast-top-left') === true){
                        // Setting the position
                        toastElements[i].style.top = offsetToast.tl + "px";
                        offsetToast.tl += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-top-right') === true){
                        toastElements[i].style.top = offsetToast.tr + "px";
                        offsetToast.tr += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-bottom-left') === true){
                        toastElements[i].style.bottom = offsetToast.bl + "px";
                        offsetToast.bl += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-bottom-right') === true){
                        toastElements[i].style.bottom = offsetToast.br + "px";
                        offsetToast.br += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-bottom-center') === true){
                        toastElements[i].style.bottom = offsetToast.bc + "px";
                        offsetToast.bc += height + this.options.offset;
                    }else if(toastElements[i].classList.contains('toast-top-center') === true){
                        toastElements[i].style.top = offsetToast.tc + "px";
                        offsetToast.tc += height + this.options.offset;
                    }else{
                        toastElements[i].style.top = offsetToast.tl + "px";
                        offsetToast.tl += height + this.options.offset;
                    }

                }

            }

            return this;
        }
    }

    Toast.lib.init.prototype = Toast.lib;

    return Toast;

}));