
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

                    console.log(element.attributes.count, element.attributes.count.nodeValue);
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
    } 

    return self;
}

document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    $('input[data-mask]').mask()

    $('textarea').textarea()
});


/***
class Form {

    constructor(){
        //super(props);
        this.element = document.querySelectorAll('input');
        this.dashIdxs = [];
        Form.dashItms = ['/', '-', ' ', '[', ']', '!', '@', '#', '$', '%', '&', '*', '(', ')', '=', '+', '/\/', '^', '?', '{', '}', ':', ';', ',', '_', '>', '<', '\'', '.'];
    }
    
    static x = 0;

    init(){
        for (let element of this.element) {
            //check mask element
            if(element.type == "text"){
                if(element.dataset.mask){
                    element.setAttribute('maxlength', element.dataset.mask.length);
                    element.setAttribute('placeholder', element.dataset.mask);
                    element.addEventListener('keydown', this.onKeyDownMask);
                    element.addEventListener('input', this.onInputMask, false);
                    element.ptrns = Form.getPattern(element.dataset.mask);
                    let mask = element.dataset.mask;

                    console.log(Form.getPatternChars(mask), element.ptrns, mask);
                }
            }
            
        }
    }

    static getPatternChars(mask){
        let arr = [];
        Form.getPattern(mask).forEach(element => {
            arr.push(mask.substr(element, 1));
        });
        
        return arr;

    }

    static getPattern(pattern) {
        let dashIdxs = [];
    
        pattern.split("").forEach((char, idx) => {
            if (Form.dashItms.indexOf(char) == -1) {
                return;
            }

    
            dashIdxs.push(idx);
        });
       
        return dashIdxs;
    }

    md(str){
        return m.trust(marked(str));
    }

    onKeyDownMask(e) {
        //console.log(e.target.ptrns);
        if (e.key === "Backspace" && e.target.ptrns.includes(e.target.value.length - 1)) {
            e.target.value = e.target.value.slice(0, -1);
            Form.x --;
        }
    }
    
    
    onInputMask(e, me = Form){
        String.prototype.replaceAt = function(index, replacement) {
            return this.substr(0, index) + replacement + this.substr(index + replacement.length);
        }
        
        let value = e.target.value;

        let mask = e.target.dataset.mask.replace(/[^a-zA-Z0-9 ]/g, "");
        if(mask.match(/^[0-9]+$/) != null){
            e.target.value = e.target.value.replace(/[^0-9./]/g, '');
        }
    
        var xx = me.getPatternChars(e.target.dataset.mask);
        let stringL = value.length;
        
        if (e.target.ptrns.includes(stringL)) {
            console.log(Form.x);
            e.target.value += xx[Form.x];
            Form.x++;
        }
    }
    
   
    code(){
        return this.init();
    }
}

const Components = [
    new Form
];

function Opera(components){
    for (let component of components) {
        component.code();
    }
}

Opera(Components);*/