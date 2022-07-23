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
                const opDropdownOutsideclose = element.dataset.opDropdownOutsideclose;
                const opDropdownOutsideblock = element.dataset.opDropdownOutsideblock;
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
                    
                    
                    dropDownCard.setAttribute('op-close', opDropdownOutsideclose !== undefined ? true : false);
                    dropDownCard.setAttribute('op-block', opDropdownOutsideblock !== undefined ? true : false);

                    const splitDropPos = dropdownPos.split('-'); // bottom[0]-left[1]
                    const dropDownCardRect = dropDownCard.getBoundingClientRect();


                    let posX = elPos.left + insetX - dropDownCardRect.width;
                    let posY = (elPos.top + elPos.height) + insetY;
                    //console.log(dropDownCard, element);
                    
                    dropDownCard.style.transform = 'translate('+posX+'px, '+posY+'px)';  //x , y
                    

                    document.addEventListener('scroll', (e) => {
                        
                        const elPos = element.getBoundingClientRect();
                        
                        let posX, posY;

                        const dropDownCardRect = dropDownCard.getBoundingClientRect();

                        if(splitDropPos[0] == "bottom"){
                            posY = (elPos.y + elPos.height) + insetY;
                        }else if(splitDropPos[0] == "top"){
                            posY = (elPos.y + elPos.height) + insetY;
                        }else {
                            posY = (elPos.y + elPos.height) + insetY;
                        }
    
                        if(splitDropPos[1] === "left"){
                            posX = elPos.left + insetX;
                        } else if(splitDropPos[1] === "right"){ 
                            posX = elPos.left - dropDownCardRect.width + elPos.width + insetX;
                        } else {
                            posX = 0;
                        }

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

            //close all dropdown if opened
            const closeDropdown = document.querySelectorAll('.op-dropdown.show');
            closeDropdown.forEach(function(item) {
                item.classList.remove('show');
            });

            const drp = e.currentTarget.dataset.opDropdown;
            const inset = e.currentTarget.dataset.opDropdownInset;
            const position = e.currentTarget.dataset.opDropdownPosition;
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
                const element = e.currentTarget.getBoundingClientRect();

                //posizionamento alla scelta "position" left or right , top or bottom
                const splitDropPos = position.split('-'); // bottom[0]-left[1]
                let psx = 0, psy = 0;
                if(splitDropPos[0] === "bottom"){
                    psy = (element.top + element.height + insetY);
                } else if(splitDropPos[0] === "top"){

                } else {

                }

                if(splitDropPos[1] === "left"){
                    psx = element.left + insetX;
                } else if(splitDropPos[1] === "right"){ 
                    psx = element.left - drpElementRect.width + element.width + insetX;
                } else {
                    psx = 0;
                }
                
                //posizionamento in base alla posizione del dropdown nella finestra asse Y
                if(drpElementRect.y + drpElementRect.height > window.innerHeight){
                    drpElement.style.transform = 'translate('+psx+'px, '+ (element.top - drpElementRect.height - insetY) +'px)';
                }else{
                    drpElement.style.transform = 'translate('+psx+'px, '+ psy +'px)';
                }
                
                

                //positionamento in base alla posizione del dropdown nella finestra asse X
                
                

                

            }


        },
        handleClickOutSide: function(event){
            const closeDropdown = document.querySelectorAll('.op-dropdown.show');
            if(closeDropdown.length === 0) return;
            //data-op-dropdown-outsideclose

            if ( event.target.closest("[data-op-dropdown]") != null || event.target.closest("[op-block='true']") != null && event.target.closest("[op-close='true']") != null) return;
            
            //closeDropdown.classList.remove('show');
            // selecting all elements
            // Using forEach loop
            closeDropdown.forEach(function(item) {
                item.classList.remove('show');
            });
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