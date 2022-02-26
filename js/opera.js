
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
                                    e.target.childNodes[0].innerHTML += "<li data-nodeID='"+i+"'><span class='badge badge-md background-grays-200 text-dark text-500'><a href='#"+dataId+"-remove' class='rmn-node' title='Remove item'>x</a> "+elm.currentTarget.innerText+"</span></li>";

                            }else{
                                e.srcElement.children[0].innerText = elm.currentTarget.innerText;
                            }
                        }else{
                            if(getSelectElement.dataset.multiple){
                                    e.target.parentNode.childNodes[0].innerHTML += "<li data-nodeID='"+i+"'><span class='badge badge-md background-grays-200 text-dark text-500'><a href='#"+dataId+"-remove'  class='rmn-node' title='Remove item'>x</a> "+elm.currentTarget.innerText+"</span></li>";
                            }else{
                                e.srcElement.innerText = elm.currentTarget.innerText;
                            }
                        }
                        
                        
                        if(getSelectElement.dataset.multiple){
                            const getSelectElementMultiple = document.querySelector('[data-operaselect-id="'+dataId+'"] ul'); 
                            const listGetSelectElementMultiple = getSelectElementMultiple.childNodes;
                            
                            listGetSelectElementMultiple.forEach(element => {
                                getSelectElementMultiple.arrayMultipleSect.push(element.dataset.nodeid);
                                
                                
                                if(element.dataset.nodeid == i && getSelectElementMultiple.arrayMultipleSect.includes(i)){
                                    element.remove();
                                }
                            });
                            

                        }
                        
                        const removeNode = document.querySelector('.rmn-node');
                        removeNode.addEventListener('click', (rmn) => {
                            rmn.preventDefault();
                            
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

function $(selector){
    const self = {
        element: document.querySelectorAll(selector), 
        html: ()=> self.element,
        each: (callback) => {
            self.element.forEach(i => {
                callback(i, self.element);
            });
        },
        on: (event, callback) => {
            document.addEventListener(event, callback)
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
        }
    } 

    return self;
}

document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    $('input[data-mask]').mask()

    $('textarea').textarea()

    $('select').select()
});

