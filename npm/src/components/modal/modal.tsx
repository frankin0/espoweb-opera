import React, { ReactNode, MouseEventHandler} from 'react';
//import {  StyledWrapper } from './styled';
import '../../opera.css';   //test

export type componentSize = 'default' | 'fullscreen' | 'modal-xl' | 'modal-lg' | 'modal-sm' | 'modal-fluid';

export interface ModalProps{
    id?: string,
    size?: componentSize,
    className?: string,
    closing?: boolean,
    children?: ReactNode;
    activate?: boolean;
}

const Modal: React.ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (props, ref) =>{

    const {
        id,
        size = "",
        className,
        children,
        closing = true,
        activate = false,
    } = props;


    if(activate){
        const createElementbackdrop = document.createElement('div');
        createElementbackdrop.classList.add('modal-backdrop', 'fade');
        document.body.appendChild(createElementbackdrop);
        
        setTimeout(() => {
            createElementbackdrop.classList.add('show');
            document.body.classList.add('modal-open');
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = "17px";
        }, 1);
    }else{
        document.getElementsByClassName('modal-backdrop')[0].remove();
    }


    if(id == null || id == undefined) throw "Error not id found!";

    return (
        <div 
            id={id}
            ref={ref}
            style={activate ? {display: 'block'} : {}}
            className={[className, "modal", 'fade', activate ? 'show' : '', size].join(" ")}
            data-aria-closing={closing}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default React.forwardRef<HTMLDivElement, ModalProps>(Modal);