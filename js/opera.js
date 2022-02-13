
/**
 * OperaJS V Build 1
 */

/*
    *  Form
    */
var Mask = {
    
    init : function(options){
        var defaults = {
            dashItms: ['/', '-', ' ', '[', ']', '!', '@', '#', '$', '%', '&', '*', '(', ')', '=', '+', '/\/', '^', '?', '{', '}', ':', ';', ',', '_', '>', '<', '\'', '.']
        };

        console.log(options);
        /*var tempData = {};
        for ( var index=0; index<options.length; index++ ) {
            if ( options[index]) {

                tempData.push(options );
            }
        }


        options = options.push(defaults);//$.extend(defaults, options); */
return;
        return this.each(function(element){
            //variables
            var i;
            
            if(element.type == "text"){
                if(element.dataset.mask){
                    element.setAttribute('maxlength', element.dataset.mask.length);
                    element.setAttribute('placeholder', element.dataset.mask);
                    element.addEventListener('keydown', this.onKeyDownMask);
                    element.addEventListener('input', this.onInputMask, false);
                    element.ptrns = Mask.getPattern(element.dataset.mask);
                    let mask = element.dataset.mask;
                    
                    console.log(element);
                    //console.log(Mask.getPatternChars(mask), element.ptrns, mask);
                }
            }
            
        });
    },
    getPatternChars(mask){
        let arr = [];
        Mask.getPattern(mask).forEach(element => {
            arr.push(mask.substr(element, 1));
        });
        
        return arr;

    },
    getPattern(pattern) {
        let dashIdxs = [];
    
        pattern.split("").forEach((char, idx) => {
            if (Mask.dashItms.indexOf(char) == -1) {
                return;
            }

    
            dashIdxs.push(idx);
        });
        
        return dashIdxs;
    },
    md(str){
        return m.trust(marked(str));
    },
    onKeyDownMask(e) {
        //console.log(e.target.ptrns);
        if (e.key === "Backspace" && e.target.ptrns.includes(e.target.value.length - 1)) {
            e.target.value = e.target.value.slice(0, -1);
            Mask.x --;
        }
    },
    onInputMask(e, me = Mask){
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
            console.log(Mask.x);
            e.target.value += xx[Mask.x];
            Mask.x++;
        }
    }
};

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
                Mask.init.apply(options);
            }else{
                console.error('This method is not recognized [' + options + ']');
            }
        }
    } 

    return self;
}

document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    $('input[data-mask]').mask({
        test: 'ok'
    })
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