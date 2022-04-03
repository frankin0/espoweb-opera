
/**
 * OperaJS V Build 1
 */

/*
    *  Form
    */
var Mask = {
    option: [],
    init : function(options, me){
        var defaults = {
            dashItms: ['/', '-', ' ', '[', ']', '!', '@', '#', '$', '%', '&', '*', '(', ')', '=', '+', '/\/', '^', '?', '{', '}', ':', ';', ',', '_', '>', '<', '\'', '.']
        };

        const option = this.extend(defaults, options);
        this.option = option;
        
        const _this = this;
        
        return this.each(me, function(element){
            //variables
            var i;
            
            if(element.type == "text"){
                if(element.dataset.mask){
                    element.setAttribute('maxlength', element.dataset.mask.length);
                    element.setAttribute('placeholder', element.dataset.mask);
                    element['x_'] = 0;
                    element['prevValue'] = "";
                    element.addEventListener('keydown', _this.onKeyDownMask);
                    element.addEventListener('input', _this.onInputMask, false);
                    element.ptrns = _this.getPattern(element.dataset.mask, option);
                    let mask = element.dataset.mask;
                    
                    //console.log(_this.getPatternChars(mask), element.ptrns, mask);
                }
            }
            i++;
        });
    },
    getPatternChars(mask){
        let arr = [];
        this.getPattern(mask).forEach(element => {
            arr.push(mask.substr(element, 1));
        });
        
        return arr;

    },
    getPattern(pattern) {
        let dashIdxs = [];
    
        pattern.split("").forEach((char, idx) => {
            if (this.option.dashItms.indexOf(char) == -1) {
                return;
            }
    
            dashIdxs.push(idx);
        });
        
        return dashIdxs;
    },
    md(str){
        return m.trust(marked(str));
    },
    onKeyDownMask(e, me = Mask) {
        //console.log(e.target.ptrns);
        if (e.key === "Backspace" && e.target.ptrns.includes(e.target.value.length - 1)) {
            e.target.value = e.target.value.slice(0, -1);
            this.x_ --;
        }
    },
    onInputMask(e, me = Mask){
        String.prototype.replaceAt = function(index, replacement) {
            return this.substr(0, index) + replacement + this.substr(index + replacement.length);
        }
        
        let value = e.target.value;

        let mask = e.target.dataset.mask.replace(/[^a-zA-Z0-9 ]/g, "");

        if(mask.match(/^[0-9]+$/) != null){
            //e.target.value = e.target.value.replace(/[^0-9/]/g, '');
        }
        
        var maskchar = me.getPatternChars(e.target.dataset.mask);
        let stringL = value.length;
        
        if(e.target.ptrns[0] === 0 && this.x_ == 0){
            e.target.value = maskchar[0] + e.target.value.replace(/[^0-9/]/g, '');
            this.x_++;
        }else
        if (e.target.ptrns.includes(stringL)) {
            e.target.value += maskchar[this.x_].replace(/[^0-9/]+./g, '');
            this.x_++;
        }
    },
    each: (me, callback) => {
        me.element.forEach(i => {
            callback(i, me.element);
        });
    },
    extend: (defaults, options) => {
        let arr = {
            ...defaults,
            ...options
        };
        
        return arr;
    }
};

const Textarea = {
    option: [],
    init : function(options, me){
        var defaults = {
            minHeight: 45
        };

        const option = this.extend(defaults, options);
        this.option = option;
        
        const _this = this;

        
        return this.each(me, function(element){
            //variables
            var i;

            
            if(element.localName === "textarea"){
                if(element.attributes.autoresize){
                    element.style.overflow = "hidden";
                    
                    element.style.height = (element.scrollHeight) + "px";
    
                    _this.option['minHeightOffset'] = element.clientHeight;
                    element.addEventListener('input', _this.onKeyDown);
                }else if(element.attributes.count){
                    //set counter characters
                    const nodeCount = document.createElement('span');
                    nodeCount.className = 'badge background-light-primary textarea-count';
                    nodeCount.innerHTML = "0/"+element.attributes.count.nodeValue;
                    element.parentNode.appendChild(nodeCount);

                    element.addEventListener('input', _this.inputCount);

                }
            }else{
                console.error("This function is not supported on this html element!");
            }

        });

    },
    inputCount: (e) => {
        const value = e.target.value;
        const nodeCount = e.target.parentNode.querySelector('.badge');
        nodeCount.innerHTML = e.target.value.length + "/"+ e.target.attributes.count.nodeValue;

        if(e.target.value.length >= e.target.attributes.count.nodeValue){
            nodeCount.classList.add('text-danger');
        }else{
            nodeCount.classList.remove('text-danger');
        }
    },
    onKeyDown: (e) =>{
        var lines = e.target.value.split(/\r|\r\n|\n/);
        var count = lines.length;

        if(count <= 1){
            e.target.style.height = "";
        }else{
            e.target.style.height = "auto";
            e.target.style.height = (e.target.scrollHeight) + "px";
        }
    },
    each: (me, callback) => {
        me.element.forEach(i => {
            callback(i, me.element);
        });
    },
    extend: (defaults, options) => {
        let arr = {
            ...defaults,
            ...options
        };
        
        return arr;
    }
}

const Select = {
    option: [],
    getDoublesElementsArr: [],
    init : function(options, me){
        var defaults = {
            minHeight: 45
        };

        const option = this.extend(defaults, options);
        this.option = option;
        
        const _this = this;

        
        let i = 1;
        return this.each(me, function(element){
            //variables

            
            if(element.localName === "select"){
                const elementId = "operaSelect-id-"+ _this.random(6) +"-" + i;
                const createSelectComponentContainer = document.createElement('span');

                element.setAttribute("data-operaselect-element-id", elementId);

                createSelectComponentContainer.classList.add("operaSelect");
                if(element.dataset.class){
                   createSelectComponentContainer.classList.add(element.dataset.class);
                }
                createSelectComponentContainer.setAttribute("data-operaSelect-id", elementId);
                createSelectComponentContainer.style.width = "100%";
                if(element.dataset.multiple){
                    createSelectComponentContainer.classList.add('display-flex', 'multiple-select');
                }
                createSelectComponentContainer.innerHTML =  "<span class='operaSelect-selection form-select'>"+
                    (element.dataset.multiple ?"<ul class='no-list-style'></ul>" : "") +
                    (element.dataset.multiple ? "<input type='text' class='operaSelect-transparentInput' placeholder='"+element.dataset.placeholder+"' />" : "<span class='operaSelect-label'>"+element.dataset.placeholder+"</span>") + 
                    "<span class='operaSelect-arrow'></span>" + 
                "</span>"; 

                element.parentNode.appendChild(createSelectComponentContainer);

                //
                element.classList.add("select-hidden");
                
                createSelectComponentContainer.addEventListener('click', _this.handleClick, false);
                if(element.dataset.multiple){
                    createSelectComponentContainer.childNodes[0].childNodes[1].addEventListener('keyup', (input) => {
                        const list = document.querySelectorAll("#"+elementId+" ul li");
                        
                        const countHide = document.querySelectorAll("#"+elementId+" ul li.hide");
        
                        if(countHide.length == list.length){
                            if(!document.querySelectorAll("#"+elementId+" ul li#none")[0]){
                                const none = document.createElement('li');
                                none.id="none";
                                none.setAttribute("role", "alert");
                                none.setAttribute("disabled", "true");
                                none.classList.add('operaSelect-item');
                                none.innerHTML = (getSelectElement.dataset.noResults == undefined ? "No results found" : getSelectElement.dataset.noResults);
                                list[0].parentNode.appendChild(none);
                            }
                        }else{
                            if(document.querySelectorAll("#"+elementId+" ul li#none")[0]){
                                document.querySelectorAll("#"+elementId+" ul li#none")[0].remove();
                            }
                        }
                    });
                    createSelectComponentContainer.childNodes[0].childNodes[1].addEventListener('input', (input) => {
                        const list = document.querySelectorAll("#"+elementId+" ul li");
                        
                        let searchs = input.target.value.toLowerCase();
                        for (let i of list) {
                            let item = i.innerHTML.toLowerCase();
        
                            if (item.indexOf(searchs) == -1) {
                                i.classList.add("hide"); 
                            }else {
                                i.classList.remove("hide");
                            }
        
                        }
        
                    });
                }
                
                document.addEventListener('click', _this.removeAllSelects)
                document.addEventListener('scroll', _this.scrollPosition)
                
                i++;
            }else{
                console.error("This function is not supported on this html element!");
            }


        });

    },
    removeAllSelects: (event) => {

        if (!event.target.matches('.operaSelect-selection') && 
            !event.target.matches('.operaSelect-label') && 
            !event.target.matches('.operaSelect-serch__field') &&
            !event.target.matches('.operaSelect-search') &&
            !event.target.matches('.operaSelect-item') &&
            !event.target.matches('.operaSelect-dropdown')&&
            !event.target.matches('.operaSelect-group') &&
            !event.target.matches('.operaSelect-transparentInput') &&
            !event.target.matches('.rmn-node') ) {
            var dropdowns = document.querySelectorAll(".operaSelect-container");
            dropdowns.forEach(element => {
                element.remove();
            });
            
          }
    },
    handleClick: (e) => {
        //this.option['dataId'] = e.currentTarget.dataset.operaselectId;

        const dataId = e.currentTarget.dataset.operaselectId;
        let optionArr = [];
        const targetPosition = {
            x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop
        };
        const targetSize = {
            w: e.currentTarget.offsetWidth, h: e.currentTarget.offsetHeight
        }
        //this.option['targetPosition'] = targetPosition;
        //this.option['targetSize'] = targetSize;

        if(document.querySelector('#'+dataId)){
            return
        }


        const getSelectElement = document.querySelector('[data-operaselect-element-id="'+dataId+'"]');
        
        const createSeclectList = document.createElement('div');
        createSeclectList.classList.add("operaSelect-container");
        createSeclectList.id = dataId;
        //set style position
        createSeclectList.style.position = "absolute";
        createSeclectList.style.top = (targetPosition.y + targetSize.h) + "px";
        createSeclectList.style.left = targetPosition.x + "px";
        if(getSelectElement.dataset.multiple){
            createSeclectList.dataset.multiple = getSelectElement.dataset.multiple;
        }
        
        const dropdown = document.createElement('div');
        dropdown.classList.add('operaSelect-dropdown');
        dropdown.style.width = targetSize.w + "px";
        createSeclectList.appendChild(dropdown);
        

    
        
        if(getSelectElement.dataset.search == "true"){
            const search = document.createElement('div');
            search.classList.add('operaSelect-search');
            search.innerHTML = "<input type='text' class='operaSelect-serch__field' />";
            dropdown.appendChild(search);

            search.addEventListener('keyup', (input) => {
                const list = document.querySelectorAll("#"+dataId+" ul li");
                
                const countHide = document.querySelectorAll("#"+dataId+" ul li.hide");

                if(countHide.length == list.length){
                    if(!document.querySelectorAll("#"+dataId+" ul li#none")[0]){
                        const none = document.createElement('li');
                        none.id="none";
                        none.setAttribute("role", "alert");
                        none.setAttribute("disabled", "true");
                        none.classList.add('operaSelect-item');
                        none.innerHTML = (getSelectElement.dataset.noResults == undefined ? "No results found" : getSelectElement.dataset.noResults);
                        list[0].parentNode.appendChild(none);
                    }
                }else{
                    if(document.querySelectorAll("#"+dataId+" ul li#none")[0]){
                        document.querySelectorAll("#"+dataId+" ul li#none")[0].remove();
                    }
                }
            });
            
            search.addEventListener('input', (input) => {
                const list = document.querySelectorAll("#"+dataId+" ul li");
                
                let searchs = input.target.value.toLowerCase();
                for (let i of list) {
                    let item = i.innerHTML.toLowerCase();

                    if (item.indexOf(searchs) == -1) {
                        i.classList.add("hide"); 
                    }else {
                        i.classList.remove("hide");
                    }

                }

            });
        }

        const createlist = document.createElement('ul');
        createlist.classList.add('operaSelect-list');
        dropdown.appendChild(createlist);

        
        
        for (let i = 0; i < getSelectElement.children.length; i++) {
            const element = getSelectElement.children[i];
            if(element.value != ""){

                const createItem = document.createElement('li');

                if(!element.attributes.disabled){
                    createItem.classList.add('operaSelect-item');
                }else{
                    createItem.classList.add('operaSelect-group');
                }

                if(!getSelectElement.dataset.multiple){
                    if(e.currentTarget.dataset.selectedIndex == i){
                        createItem.classList.add('active');
                    }
                }else{
                    const getSelectElementMultiple = document.querySelector('[data-operaselect-id="'+dataId+'"] ul');
                    const listGetSelectElementMultiple = getSelectElementMultiple.childNodes;
                    listGetSelectElementMultiple.forEach(element => {
                        if(element.dataset.nodeid == i){
                            createItem.classList.add('active');
                        }
                    });

                    getSelectElementMultiple.arrayMultipleSect = new Array();
                }

                if(element.dataset.operaSelectImage){
                    createItem.innerHTML = '<div class="avatar mr-2">'+
                                                '<img src="https://landkit.goodthemes.co/assets/img/avatars/avatar-1.jpg" alt="..." class="avatar-img rounded-circle">'+
                                            '</div>' +element.innerText;
                }else{
                    createItem.innerText = element.innerText;
                }
                if(!element.attributes.disabled){
                    createItem.dataset.id = element.value;
                }

                createlist.appendChild(createItem);
                
                if(!element.attributes.disabled){
                    let setArtrayV = new Array();
                    createItem.addEventListener('click', (elm) => {
                        getSelectElement.selectedIndex = i;
                        for (let x = 0; x < elm.currentTarget.parentNode.children.length; x++) {
                            elm.currentTarget.parentNode.children[x].classList.remove('active');
                        }
                        
                        
                        if(!getSelectElement.dataset.multiple){
                            elm.currentTarget.classList.add('active');
                            e.target.parentNode.dataset.selectedIndex = i;
                        }else{
                            
                        }

                       

                        if(e.srcElement.children[0]){ 

                            if(getSelectElement.dataset.multiple){
                                if(!Select.getDoublesElements(e.target.childNodes[0].childNodes, i)){
                                    e.target.childNodes[0].innerHTML += "<li data-nodeID='"+i+"'><span class='badge badge-md background-grays-200 text-dark text-500'><a href='#"+dataId+"-remove' class='rmn-node' title='Remove item'>x</a> "+elm.currentTarget.innerText+"</span></li>";
                                }else{
                                    Select.removeDoublesElements(e.target.childNodes[0].childNodes, i);
                                }
                            }else{
                                e.srcElement.children[0].innerText = elm.currentTarget.innerText;
                            }
                        }else{
                            if(getSelectElement.dataset.multiple){
                                if(!Select.getDoublesElements(e.target.parentNode.childNodes[0].childNodes, i)){
                                    e.target.parentNode.childNodes[0].innerHTML += "<li data-nodeID='"+i+"'><span class='badge badge-md background-grays-200 text-dark text-500'><a href='#"+dataId+"-remove'  class='rmn-node' title='Remove item'>x</a> "+elm.currentTarget.innerText+"</span></li>";
                                }else{
                                    Select.removeDoublesElements(e.target.parentNode.childNodes[0].childNodes, i);
                                }
                            }else{
                                e.srcElement.innerText = elm.currentTarget.innerText;
                            }
                        }
                        
                        
                        const removeNode = document.querySelectorAll('.rmn-node');
                        removeNode.forEach(elmt => {
                            elmt.addEventListener('click', (rmn) => {
                                rmn.preventDefault();
                                //Select.getDoublesElementsArr.splice(rmn.target.parentElement.parentElement.dataset.nodeid, 1);
                                rmn.target.parentElement.parentElement.remove();
                                //console.log(elm.target.classList);
                                //elm.currentTarget.classList.remove('active');
                            });
                        });

                        createSeclectList.remove();
                    });

                    
                    

                }

            }
            
        }

        setTimeout(()=>{
            Select.scrollPosition()
        }, 100);
        
        document.body.appendChild(createSeclectList);
        

    },
    removeDoublesElements: (elems, i) => {
        
        elems.forEach(element => {
            if(element.dataset.nodeid == i){
                element.remove();
                Select.getDoublesElementsArr.splice(i, 1);
            }
        });
        
    },
    getDoublesElements: (children, n) => {
        let Arr = Select.getDoublesElementsArr;

        if(children.length == 0){
            Arr = [];
        }

        children.forEach(element => {
            
            if(element.dataset.nodeid == n){ 
                Arr.push(parseInt(element.dataset.nodeid));
            }
            //return element.dataset.nodeid;
        });

        Array.prototype.contains = function (obj) {
            var i = this.length;
            while (i--) {
                if (this[i] === obj) {
                    return true;
                }
            }
            return false;
        }
        console.log(Arr);
        return Arr.contains(n);
    },
    scrollPosition: () => { 
        const operaSelect = document.querySelectorAll('.operaSelect');
        operaSelect.forEach(element => {

            const windowSize = {
                w: window.innerWidth,
                h: window.innerHeight,
            };
            const windowPosition = {
                x: window.scrollX, y: window.scrollY
            }
            const targetPosition = {
                x: element.offsetLeft, y: element.offsetTop
            };
            const targetSize = {
                w: element.offsetWidth, h: element.offsetHeight
            }
    
            
            const getDropdown = document.querySelectorAll('.operaSelect-container');

            
            getDropdown.forEach(osc => {
                if(osc.children[0]){
                    //windowPosition.y = inizio schermata
                    let endWindow = (windowPosition.y + windowSize.h);   //fine schermata
                    let newPoint = (targetPosition.y - osc.children[0].offsetHeight);
            
                    ///////////////////////////////////////
                /* const test =document.createElement('div')
                    test.style.position = 'absolute';
                    test.style.top =  (getDropdown.offsetTop) + "px";
                    test.style.width = '100%';
                    test.style.height = '2px';
                    test.style.background = 'red';
                    test.style.zIndex = "999999";
                    document.body.appendChild(test)

                    const test2 =document.createElement('div')
                    test2.style.position = 'absolute';
                    test2.style.top =  (endWindow) + "px";
                    test2.style.width = '100%';
                    test2.style.height = '2px';
                    test2.style.background = 'red';
                    test2.style.zIndex = "999999";
                    document.body.appendChild(test2)*/
                    ///////////////////////////////////////

                    //se la lunghezza della pagina è > della fine della pagina e < della posizione della finestra  operaSelect-container
                    if( endWindow < (osc.offsetTop + osc.children[0].offsetHeight)){
                        osc.style.top = newPoint + "px";
                    }else if(windowPosition.y > osc.offsetTop ){
                        osc.style.top = (targetPosition.y + targetSize.h) + "px";
                    }
                }
            });

           
        });
        
    },
    random: (length = 8) => {
        return Math.random().toString(16).substr(2, length);
    },
    each: (me, callback) => {
        me.element.forEach(i => {
            callback(i, me.element);
        });
    },
    extend: (defaults, options) => {
        let arr = {
            ...defaults,
            ...options
        };
        
        return arr;
    }
}

const Modal = {
    option: [],
    init : function(options, me){
        var defaults = {
            
        };

        const option = this.extend(defaults, options);
        this.option = option;
        
        const _this = this;
        
        return this.each(me, function(element){
            //variables
            const id = element.dataset.modalTarget;
            if(id){
                if(id.includes(".") || id.includes("#")){
                   
                    element.addEventListener('click', _this.modalShow);
                    

                }else{
                    console.error("Modal id not found!");
                    return;
                }
            }
        });
    },
    modalShow: (element) => {
        const modal = document.querySelector(element.target.dataset.modalTarget);
        modal.style.display = "block";
        
       

        $('body').append('<div class="modal-backdrop fade"></div>', (element, selector, text) => {
            setTimeout(() => {
                element.classList.add('show');
                modal.classList.add('show');
                document.body.classList.add('modal-open');
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = "17px";
            }, 1);
        });

        let ariaclosing = modal.dataset.ariaClosing || true;

        if(ariaclosing == "true" || ariaclosing == true){
            window.onclick = function(event) {
                if(event.target == modal){
                    Modal.modalClose(modal);
                }
            }
        }

        $('.modal [data-modal-dismiss="'+element.target.dataset.modalTarget+'"]').on('click', function(e){
            e.preventDefault();

            Modal.modalClose(modal);
        });
        
    },
    modalClose: (modal) => {
        modal.classList.remove('show');
        const modalBackdrop = document.querySelectorAll('.modal-backdrop');
        modalBackdrop.forEach(element => {
            element.classList.remove('show');
        });
        
        setTimeout(() => {
            $('.modal-backdrop').remove();
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
            document.body.style.overflow = "";
            document.body.style.paddingRight  ="";
        }, 100);
    },
    each: (me, callback) => {
        me.element.forEach(i => {
            callback(i, me.element);
        });
    },
    extend: (defaults, options) => {
        let arr = {
            ...defaults,
            ...options
        };
        
        return arr;
    }
}

/*
const Tooltip = {
    option: [],
    init : function(options, me){
        var defaults = {
            
        };

        const option = this.extend(defaults, options);
        this.option = option;
        
        const _this = this;
        
        return this.each(me, function(element){
            //variables
            const id = element.dataset.tooltipToggle;
            if(id){
                element.addEventListener('mouseover', _this.mouseenter);
                element.addEventListener('mouseout', _this.mouseleave);
            }else{
                console.error("No tooltip found!");
            }
        });
    },
    mouseenter: (e) => {
        e.preventDefault();
        const id = Date.now();
        e.target.dataset.tooltipID = "title-u"+id;
        $('body').append("<div class='tooltip fade "+e.target.dataset.tooltipColor+"' id='title-u"+id+"'>"+e.target.dataset.title+"</div>", (element, selector, text) => {
            setTimeout(() => {
                //calcolo della posizione dell'elemento padre
                console.log(element);
                const elnPosition = {
                    x: e.target.offsetLeft,
                    y: e.target.offsetTop / 2,
                    w: e.target.offsetWidth / 2,
                    h: e.target.offsetWidth / 2
                };
                const toltPosition = {
                    w: element.offsetWidth / 2,
                    h:element.offsetWidth / 2
                };

                let calcPosX = elnPosition.x + elnPosition.w - toltPosition.w;
                let calcPosY = elnPosition.y;
                if(e.target.dataset.tooltipPlacement == "top"){
                    calcPosY = elnPosition.y - 15;
                }else if(e.target.dataset.tooltipPlacement == "bottom"){
                    calcPosY = elnPosition.y + elnPosition.h;
                }else if(e.target.dataset.tooltipPlacement == "left"){
                    calcPosY = (elnPosition.y *2) + 5;
                    calcPosX = elnPosition.x - (elnPosition.w  *2);
                }else if(e.target.dataset.tooltipPlacement == "right"){
                    calcPosY = (elnPosition.y *2) + 5;
                    calcPosX = elnPosition.x + (elnPosition.w *2) + 15;
                }else{
                    console.error("Error position " + e.target.dataset.tooltipPlacement + " [top, right, left, bottom]");
                    return;
                }

                element.classList.add("tooltip-" + e.target.dataset.tooltipPlacement);
                element.classList.add('show');
                element.style.left = calcPosX+"px";
                element.style.top = calcPosY+"px";
                element.style.bottom = "auto";
            }, 1);
        });
    },
    mouseleave: (e) => { console.log(e.target.id, e.target.dataset.tooltipID);
        //document.getElementById(e.target.id).classList.remove("show");
        document.getElementById(e.target.dataset.tooltipID).classList.remove("show");
        

        /*const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(element => {
            element.classList.remove('show');
        });*//*
        
        setTimeout(() => {
            //document.getElementById(e.target.id).remove();
            document.getElementById(e.target.dataset.tooltipID).remove();
        }, 100);
    },
    each: (me, callback) => {
        me.element.forEach(i => {
            callback(i, me.element);
        });
    },
    extend: (defaults, options) => {
        let arr = {
            ...defaults,
            ...options
        };
        
        return arr;
    }
}
*/


/*!
 * Tooltip - Javascript 0.1.0 (https://opera.espoweb.it/)
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
            attrDismiss = options.attrDismiss || 'data-tooltip-dismiss',
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

                const clicktodismiss = element.getAttribute(attrDismiss);
                if(clicktodismiss) element.addEventListener('click', pull, false);
            }else{
                element.addEventListener('touchstart', () => enter(element), false);

                element.addEventListener('touchend', off, false); 
            }
        }

        const enter = (element, text, already, ttips, doc, rect, top, left, margin, bgColor, placement) => {

            if(displayed > -1){
                if(element.tooltipped < displayed && element.getAttribute(attrText)){
                    pull();
                    
                    //if(element.getAttribute('data-tooltip-delay')){ self.delay = element.getAttribute('data-tooltip-delay') }else{ self.delay = options.delay};
                   // if(element.getAttribute('data-tooltip-duration')){ self.duration = element.getAttribute('data-tooltip-duration');  }else{ self.delay = options.delay};
                    
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
                            top = rect.top - (ttips.offsetHeight + ttips.offsetHeight / 2.5) +5;
                        }else if(placement == "bottom"){
                            //sign bottom position
                            top = (rect.top ) + (rect.height + ttips.offsetHeight / 2.5) - 5;
                        }else if(placement == "right" || placement == "left"){
                            //sign right position
                            top = rect.top;
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
            //document.addEventListener('click', pull, false);

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

function $(selector){
    const self = {
        element: document.querySelectorAll(selector), 
        html: ()=> self.element,
        each: (callback) => {
            self.element.forEach(i => {
                callback(i, self.element);
            });
        },
        remove: () => {
            self.element.forEach((element) => {
                element.remove();
            });
        },
        append: (elmn, callback = null)=> {
            self.element.forEach((element) => {
                
                const elID = "element-opera-"+Date.now(); 
                let newelmn = elmn.replace('<div', '<div data-opera-id="'+elID+'"');
                //console.log(newelmn, element);
                try {
                    element.insertAdjacentHTML('beforeend', newelmn);
                    console.log();
                    //var parser = new DOMParser();
                    //var doc = parser.parseFromString(elmn, 'text/html');
                    if(callback != null){
                        let elementCreated = null;
    
                        if(newelmn.includes('class')){
                            let cls = newelmn.match(/class="((?:\\.|[^"\\])*)"/) || newelmn.match(/class='((?:\\.|[^"\\])*)'/);
                            elementCreated = "." + cls[1].split(" ")[0];
                        }else if(newelmn.includes('id')){
                            let cls = newelmn.match(/id="((?:\\.|[^"\\])*)"/) || newelmn.match(/id='((?:\\.|[^"\\])*)'/);
                            elementCreated = "#" + cls[1];
                        }else{
                            elementCreated = "";
                        }
    
                        //document.querySelector(elementCreated).dataset.operaId = elID;
                        
                        //element created, selector, text declared
                        //console.log(document.querySelector("["+elID+"]"), elID);
                        callback(element.lastChild, element, newelmn);
                    } 
                } catch (error) {
                    console.error(error);
                    return;
                }

            })
        },
        prepend: (elmn, callback = null)=> {
            self.element.forEach((element) => {
                //console.log(elmn, element);
                element.insertAdjacentHTML('afterbegin', elmn);
                //https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

                if(callback != null){
                    let elementCreated = null;

                    if(elmn.includes('class')){
                        elementCreated = "." + elmn.match(/class="((?:\\.|[^"\\])*)"/)[1].split(" ")[0];
                    }else if(elmn.includes('id')){
                        elementCreated = "#" + elmn.match(/id="((?:\\.|[^"\\])*)"/)[1];
                    }else{
                        elementCreated = "";
                    }
                    
                    //element created, selector, text declared
                    callback(document.querySelector(elementCreated), element, elmn);
                } 
            })
        },
        on: (event, cbOrSelector, callback) => {
            if(typeof cbOrSelector === 'function'){
                self.element.forEach(e =>  e.addEventListener(event, cbOrSelector));
            }else{
                self.element.forEach(element => {
                    element.addEventListener(event, e => {
                        if(e.target.matches(cbOrSelector)) callback(e);
                    })
                });
            }
            //document.addEventListener(event, callback)
        },
        hide: () => {
            self.element.style.display = "none"
        },
        attr: (name, value) => {
            if(value == null){
                self.element.getAttribute(name);
            }else{
                self.element.getAttribute(name, value);
            }
        },
        css: (styles) => {
            for (let key in styles) {
                self.element.style[key] = styles[key];
            }
            return self.element;
        },
        mask: (options) =>{
            if(Mask[options]){
                Mask[options].apply(self, Array.prototype.slice.call(arguments, 1));
            }else if(typeof options === 'object' || !options){
                //Mask.init.apply(options);
                Mask.init(options, self);
            }else{
                console.error('This method is not recognized [' + options + ']');
            }
        },
        textarea: (options) => {
            if(Textarea[options]){
                Textarea[options].apply(self, Array.prototype.slice.call(arguments, 1));
            }else if(typeof options === 'object' || !options){
                //Mask.init.apply(options);
                Textarea.init(options, self);
            }else{
                console.error('This method is not recognized [' + options + ']');
            }
        },
        select: (options) => {
            if(Select[options]){
                Select[options].apply(self, Array.prototype.slice.call(arguments, 1));
            }else if(typeof options === 'object' || !options){
                //Mask.init.apply(options);
                Select.init(options, self);
            }else{
                console.error('This method is not recognized [' + options + ']');
            }
        },
        modal: (options) => {
            if(Modal[options]){
                Modal[options].apply(self, Array.prototype.slice.call(arguments, 1));
            }else if(typeof options === 'object' || !options){
                //Mask.init.apply(options);
                Modal.init(options, self);
            }else{
                console.error('This method is not recognized [' + options + ']');
            }
        },
        /*tooltips: (options) => {
            if(Tooltip[options]){
                Tooltip[options].apply(self, Array.prototype.slice.call(arguments, 1));
            }else if(typeof options === 'object' || !options){
                //Mask.init.apply(options);
                Tooltip.init(options, self);
            }else{
                console.error('This method is not recognized [' + options + ']');
            }
        },*/
    } 

    return self;
}

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

document.addEventListener("DOMContentLoaded", function(){
    console.log("Opera Project Status:");
    // Handler when the DOM is fully loaded
    $('input[data-mask]').mask()

    $('textarea').textarea()

    $('select').select()

    $('[data-modal-target]').modal()

    //$('[data-tooltip-toggle]').tooltips()

    var tooltips = new tooltip( document.querySelectorAll('[data-tooltip]'), {
        duration: 1500, //durata del popup dall'evento
        delay: 100,
        display: 100 //popup mostrati nella pagina
    });

    new OpToggle( document.querySelectorAll('[data-op-toggle]'));

    console.log(": -- Online");
});

