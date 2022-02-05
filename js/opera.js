'use strict';  

/**
 * OperaJS V Build 1
 */

 ;(function($) {
    /*
     *  Form
     */
    var Mask = {
		init : function(options){
			var defaults = {};
			options = $.extend(defaults, options);

			return this.each(function(i){
				//variables
				var i;
                
                
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
            });
		},
        getPatternChars(mask){
            let arr = [];
            Form.getPattern(mask).forEach(element => {
                arr.push(mask.substr(element, 1));
            });
            
            return arr;
    
        },
        getPattern(pattern) {
            let dashIdxs = [];
        
            pattern.split("").forEach((char, idx) => {
                if (Form.dashItms.indexOf(char) == -1) {
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
                Form.x --;
            }
        },
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
	};
	
    $.fn.mask = function (options){
        if(Mask[options]){
            return Mask[options].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof options === 'object' || !options){
            return Mask.init.apply(this, arguments);
        }else{
            console.error('This method is not recognized [' + options + ']');
        }
    }
    $(document).ready(function(){
		$('input[data-mask]').mask();
    });
}());


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