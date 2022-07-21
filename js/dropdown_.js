/*!
 * Dropdown - Javascript 0.1.0 (https://opera.espoweb.it/)
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
        root.Dropdown = factory();
    }

}(this, function () {

    'use strict';

    /**
     * Create a new Dropdown.js module
     * @constructor Dropdown
     * @param {HTMLElement} reference - The reference element used to position the app
     * @param {HTMLElement|Object} app
     *      The HTML element used as app, or a configuration used to generate the app.
     * @param {String} [app.tagName='div'] The tag name of the generated app.
     * @param {Array} [app.classNames=['app']] Array of classes to apply to the generated app.
     */

    
    var Dropdown = function(elements ,options){
        return new Dropdown.lib.init(elements, options);
    },
    version = "1";

    Dropdown.defaults = {};

    
    Dropdown.lib = Dropdown.prototype = {
        toast: version,
        constructor: Dropdown,

        init: function(elements, options){

            if(!options) options = {};

            if(elements) this.elements = elements;

            this.options = {};

            this.x = 0;
            this.y = 0;

            elements.forEach(element => {
                const drp = element.dataset.opDropdown;
                const dropdownPos = element.dataset.opDropdownPosition;
                const inset = element.dataset.opDropdownInset;
                let insetX, insetY;
                if(inset){
                    insetX = (inset.split(',').length == 2 ? parseInt(inset.split(',')[0]) : 0);
                    insetY = (inset.split(',').length == 2 ? parseInt(inset.split(',')[1]) : 0);
                }else{
                    insetX = 0;
                    insetY = 0;
                }
                
                const elPos = element.getBoundingClientRect();

                if(drp){

                    element.addEventListener('click', this.handleClick)
                    document.addEventListener('click', this.handleClickOutSide)

                    const dropDownCard = document.querySelector(drp);

                    dropDownCard.style.inset = "0px auto auto 0px"; //top right bottom left 
                    dropDownCard.style.zIndex =  105;
                    
                    
                    const splitDropPos = dropdownPos.split('-'); // bottom[0]-left[1]
                    const dropDownCardRect = dropDownCard.getBoundingClientRect();

                    let sdpa, sbpb;
                    if(splitDropPos[0] == "bottom"){
                        sdpa = 0;
                    }else if(splitDropPos[0] == "top"){
                        sdpa = 0;
                    }else {
                        sdpa = 0;
                    }

                    if(splitDropPos[1] == "left"){
                        sbpb = - dropDownCardRect.width;
                    }else if(splitDropPos[1] == "right"){
                        sbpb = 0;
                    }else {
                        sbpb = 0;
                    }

                    let posX = elPos.left + insetX - dropDownCardRect.width;
                    let posY = (elPos.top + elPos.height) + insetY;
                    //console.log(dropDownCard, element);
                    
                    dropDownCard.style.transform = 'translate('+posX+'px, '+posY+'px)';  //x , y
                    

                    document.addEventListener('scroll', (e) => {
                        let y = window.scrollY;
                        let x = window.scrollX;
                        
                        const elPos = element.getBoundingClientRect();
                        
                        let posX = elPos.x + insetX;
                        let posY = (elPos.y + elPos.height) + insetY;
                        
                        

                        const dropDownCardRect = dropDownCard.getBoundingClientRect();
                        /*document.getElementById("asd").style.top = window.innerHeight + window.scrollY - 10 + "px";

                        document.getElementById("asd2").style.transform = "translate(0, "+(dropDownCardRect.y + dropDownCardRect.height + insetY)+"px)";
                        document.getElementById("asd3").style.transform = "translate(0, "+(dropDownCardRect.y  + insetY)+"px)";*/


                        if(window.innerHeight  <= elPos.y + elPos.height + insetY + dropDownCardRect.height){   //dropdown locked bottom screen
                            //dropDownCard.style.transform = 'translate('+posX+'px, '+posY - (dropDownCardRect.height + insetY) +'px)';  //x , y
                            dropDownCard.style.transform = 'translate('+posX+'px, '+ posY - (dropDownCardRect.height + insetY) +'px)';  //x , y
                        }else if(posY <= 0){    //dropdown locked in top screen
                            dropDownCard.style.transform = 'translate('+posX+'px, 0px)';  //x , y
                        }else{ // dropdown free position
                            dropDownCard.style.transform = 'translate('+posX+'px, '+posY+'px)';  //x , y
                        }
                        
                    });
                    

                }


            });

            return this;
        },

        handleClick: function(e){
            e.preventDefault();
            const drp = e.currentTarget.dataset.opDropdown;
            const inset = e.currentTarget.dataset.opDropdownInset;
                let insetX, insetY;
                if(inset){
                    insetX = (inset.split(',').length == 2 ? parseInt(inset.split(',')[0]) : 0);
                    insetY = (inset.split(',').length == 2 ? parseInt(inset.split(',')[1]) : 0);
                }else{
                    insetX = 0;
                    insetY = 0;
                }
            const drpElement = document.querySelector(drp);
            
            if(drpElement.classList.contains('show')){
                drpElement.classList.remove('show');
            }else{
                drpElement.classList.add('show');

                const drpElementRect = drpElement.getBoundingClientRect();
                if(drpElementRect.y + drpElementRect.height > window.innerHeight){
                    const element = e.currentTarget.getBoundingClientRect();
                    
                    drpElement.style.transform = 'translate('+element.left+'px, '+ (element.top - drpElementRect.height - insetY) +'px)';
                    console.log(drpElementRect.top - drpElementRect.height - element.height, drpElementRect.top - drpElementRect.height);
                }

            }


        },
        handleClickOutSide: function(event){
            const closeDropdown = document.querySelector('.op-dropdown.show');
            const trigger = document.querySelector('[data-op-dropdown]');
            if(closeDropdown === null) return;
            //data-op-dropdown-outsideclose

            const outsideclose = trigger.dataset.opDropdownOutsideclose;
            let outsidePermission = outsideclose == undefined ? true : outsideclose
            
            if ( event.target.closest("[data-op-dropdown]") != null) return
            
            if(outsidePermission === "false") return;
            
            closeDropdown.classList.remove('show');
        },
        
        
        

    }

    Dropdown.getTranslateXY = function(element) {
        const style = window.getComputedStyle(element)
        const matrix = new DOMMatrixReadOnly(style.transform)
        return {
            translateX: matrix.m41,
            translateY: matrix.m42
        }
    }


    Dropdown.lib.init.prototype = Dropdown.lib;

    return Dropdown;

}));