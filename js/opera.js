
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
                createSelectComponentContainer.setAttribute("data-operaSelect-id", elementId);
                createSelectComponentContainer.style.width = "100%";
                createSelectComponentContainer.innerHTML = "<span class='operaSelect-selection form-select'>"+
                    "<span class='operaSelect-label'>"+element.dataset.placeholder+"</span>" + 
                    "<span class='operaSelect-arrow'></span>" + 
                "</span>"; 

                element.parentNode.appendChild(createSelectComponentContainer);

                //
                element.classList.add("select-hidden");
                
                createSelectComponentContainer.addEventListener('click', _this.handleClick, false);
                document.addEventListener('click', _this.removeAllSelects)
                
                i++;
            }else{
                console.error("This function is not supported on this html element!");
            }


        });

    },
    removeAllSelects: (e) => {
        const operaSelect = document.getElementsByClassName('operaSelect');
        const operadropdown = document.getElementsByClassName('operaSelect-container');

        for (let i = 0; i < operadropdown.length; i++) {
            if(!e.path.includes(operadropdown[i]) && !e.path.includes(operaSelect[i])){
                operadropdown[i].remove();
            }
        }
        
    },
    handleClick: (e) => {
        const dataId = e.currentTarget.dataset.operaselectId;
        let optionArr = [];
        const targetPosition = {
            x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop
        };
        const targetSize = {
            w: e.currentTarget.offsetWidth, h: e.currentTarget.offsetHeight
        }

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

        const dropdown = document.createElement('div');
        dropdown.classList.add('operaSelect-dropdown');
        dropdown.style.width = targetSize.w + "px";
        createSeclectList.appendChild(dropdown);
        
        if(getSelectElement.dataset.search == "true"){
            const search = document.createElement('div');
            search.classList.add('operaSelect-search');
            search.innerHTML = "<input type='text' class='operaSelect-serch__field' />";
            dropdown.appendChild(search);

            search.addEventListener('input', (input) => {
                const list = document.querySelectorAll("#"+dataId+" ul li");
                
                let searchs = input.target.value.toLowerCase();
                let count = new Array();
                for (let i of list) {
                    let item = i.innerHTML.toLowerCase();
console.log(count , list.length);
                    if(count.length == list.length){
                        if(!document.querySelectorAll("#"+dataId+" ul li#none")[0]){
                            const none = document.createElement('li');
                            none.id="none";
                            none.setAttribute("role", "alert");
                            none.setAttribute("disabled", "true");
                            none.classList.add('operaSelect-item');
                            none.innerHTML = "No results found";
                            list[0].parentNode.appendChild(none);
                        }
                    }else{
                        if(document.querySelectorAll("#"+dataId+" ul li#none")[0]){
                            document.querySelectorAll("#"+dataId+" ul li#none")[0].remove();
                        }
                    }
                    if (item.indexOf(searchs) == -1) {
                        i.classList.add("hide"); 
                        count.push(i);
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
                createItem.classList.add('operaSelect-item');
                if(e.currentTarget.dataset.selectedIndex == i){
                    createItem.classList.add('active');
                }

                createItem.innerText = element.innerText;
                createItem.dataset.id = element.value;

                createlist.appendChild(createItem);
                
                createItem.addEventListener('click', (elm) => {
                    getSelectElement.selectedIndex = i;
                    for (let x = 0; x < elm.currentTarget.parentNode.children.length; x++) {
                        elm.currentTarget.parentNode.children[x].classList.remove('active');
                    }
                    
                    elm.currentTarget.classList.add('active');
                    e.target.parentNode.dataset.selectedIndex = i;
                    e.srcElement.children[0].innerText = elm.currentTarget.innerText;
                });
            }
            
        }

        document.body.appendChild(createSeclectList);
        

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

