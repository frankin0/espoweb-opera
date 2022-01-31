/**
 * OperaJS V Build 1
 */

class Form {

    constructor(){
        //super(props);
        this.element = document.querySelectorAll('input');
        this.dashIdxs = [];
    }

    init(){
        for (let element of this.element) {
            //check mask element
            if(element.dataset.mask){
                element.setAttribute('maxlength', element.dataset.mask.length);
                element.setAttribute('placeholder', element.dataset.mask);
                element.addEventListener('keydown', this.onKeyDown);
                element.addEventListener('input', this.onInput);
                element.ptrns = this.getPattern(element.dataset.mask);

                //console.log(this.element);
            }
            
        }
    }

    getPattern(pattern) {
        let dashIdxs = [];
    
        pattern.split("").forEach((char, idx) => {
            if (char !== "/") {
                return;
            }
    
            dashIdxs.push(idx);
        });
    
        return dashIdxs;
    }

    md(str){
        return m.trust(marked(str));
    }

    onKeyDown(e) {
        //console.log(e.target.ptrns);
        if (e.key === "Backspace" && e.target.ptrns.includes(e.target.value.length - 1)) {
            e.target.value = e.target.value.slice(0, -1);
        }
    }
    
    onInput(e){
        let value = e.target.value;

        let mask = e.target.dataset.mask.replace(/[^a-zA-Z0-9 ]/g, "");
        if(mask.match(/^[0-9]+$/) != null){
            e.target.value = e.target.value.replace(/[^0-9./]/g, '');
        }
    
        if (e.target.ptrns.includes(value.length)) {
            e.target.value += "/";
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

Opera(Components);