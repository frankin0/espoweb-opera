import React, { ReactNode, MouseEventHandler, useEffect, useState, ChangeEvent} from 'react';
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
    scrollBarWidth?: number,
    onClickButton?: React.MouseEventHandler<HTMLDivElement>;
}

interface BackPdropProps {
    id?: string,
    activate?: boolean,
    scrollBarWidth?: number
}

const CreateElementbackdrop: React.ForwardRefRenderFunction<HTMLDivElement, BackPdropProps> = (props) => {
    
    const {
        id = 'none',
        activate = false,
        scrollBarWidth
    } = props;

    
    
    const [ show, setShow ] = useState(false);

    useEffect(() => {

        if(activate){
            setTimeout(() => {
                setShow(true);
                document.body.classList.add('modal-open');
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = scrollBarWidth + "px";
                clearTimeout();
            }, 1);
        }else{
            setShow(false);
        }

    });

    return (
        <div data-opera-id={"element-opera-" + id} className={["modal-backdrop", "fade", show ? "show" : ""].join(" ")}></div>
    );
};

const Modal: React.ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (props, ref) =>{

    let {
        id,
        size = "",
        className,
        children,
        closing = true,
        activate = false,
        onClickButton,
        scrollBarWidth = 17
    } = props;


    
    if(id == null || id == undefined) throw "Error not id found!";
    
    let activate_update = activate;

    const [ showbackdrop, setShowbackdrop ] = useState<boolean>(false);

    const [ showModalAnim, setShowModalAnim ] = useState<boolean>(false);

    useEffect(() => {
        if(activate_update){
            //show modal
            setShowbackdrop(true);
            setTimeout(() => {
                setShowModalAnim(true);
                clearTimeout();
            }, 1);
        }else{    
            //close modal
            setShowModalAnim(false);
            setTimeout(() => {
                setShowbackdrop(false);
                document.body.classList.remove('modal-open');
                document.body.style.overflow = "";
                document.body.style.paddingRight  ="";
                clearTimeout();
            }, 100);
        }
    });


    
    return (
        <>
            <div 
                id={id}
                ref={ref}
                style={showbackdrop ? {display: 'block'} : {}}
                className={[className, "modal", 'fade', showModalAnim ? 'show' : '', size].join(" ")}
                data-aria-closing={closing}
                onClick={onClickButton}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>

            {showbackdrop ? React.createElement(CreateElementbackdrop, {id: id, activate: activate_update, scrollBarWidth: scrollBarWidth}) : ""}
        </>
    );
}

export default React.forwardRef<HTMLDivElement, ModalProps>(Modal);