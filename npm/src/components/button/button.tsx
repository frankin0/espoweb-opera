import React, { ElementType, ReactNode, MouseEventHandler} from 'react';
import { StyledButton, StyledIcon } from './styled';

export type ButtonType = 'primary'| 'link' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'light' | 'dark' | 'black' | 'ghost';

export type ComponentSize = 'default' | 'large' | 'small';


interface BaseButtonProps{
    type?: ButtonType,
    icon?: ElementType;
    size?: ComponentSize; 
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
    loading?: boolean;
    cartoon?: boolean;
    outlined?: boolean;
    linked?: boolean;
    rounded?: boolean;
    fullwidth?: boolean;
}

type HTMLButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps;

type HTMLAnchorProps = {
    href?: string
} & BaseButtonProps;

/**
 * For React Router Link
 */
type CustomNodeProps = {
    as?: ElementType,
    to?: string;
} & BaseButtonProps;

export type ButtonProps = HTMLButtonProps & HTMLAnchorProps & CustomNodeProps;

const Button: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) =>{
    const { 
        type = 'primary', 
        icon,
        size = 'default',
        className = '',
        children,
        disabled = false,
        loading = false,
        onClick,
        href,
        as,
        to,
        cartoon = false,
        outlined = false,
        linked = false,
        rounded = false,
        fullwidth = false
    } = props;

    const styles = {
        innerType: true,
        size,
        disabled,
        withText: children !== null
    }

    const spinnerStyles = {
        size: size === 'large' ? 25 : size === 'default' ? 20 : 15,
        light: true,
    }

    const childrenWithIcon = !icon ? children : (
        <>
            {children}
            <StyledIcon as={icon} />
        </>
    );

    if(as && !disabled){
        return (
            <StyledButton
                as={as}
                to={to}
                ref={ref}
                className={[className, 'btn', 
                type ? 'btn-' + type : 'btn-primary', 
                size ? 'btn-' +size : '',
                cartoon ? 'btn-cartoon' : '',
                outlined ? 'btn-outlined' : '',
                linked ? 'btn-linked' : '',
                rounded ? 'btn-rounded' : '',
                loading ? 'btn-loading' : '', 
                fullwidth ? 'btn-fullwidth' : ''].join(" ")}
                {...styles}
            >
            {loading ?  'Loading...' : children} 
            </StyledButton>
        );
    }

    if(href && !disabled){
        return (
            <a
                href={href}
                ref={ref as React.MutableRefObject<HTMLAnchorElement>}
                className={[className, 'btn', 
                type ? 'btn-' + type : 'btn-primary', 
                size ? 'btn-' +size : '',
                cartoon ? 'btn-cartoon' : '',
                outlined ? 'btn-outlined' : '',
                linked ? 'btn-linked' : '',
                rounded ? 'btn-rounded' : '',
                loading ? 'btn-loading' : '', 
                fullwidth ? 'btn-fullwidth' : ''].join(" ")}
                {...styles}
            >
                {loading ?  'Loading...' : children} 
            </a>
        ); 
    }

    return (
        <button
            type='button'
            onClick={onClick}
            ref={ref as React.MutableRefObject<HTMLButtonElement>}
            className={[className, 'btn', 
            type ? 'btn-' + type : 'btn-primary', 
            size ? 'btn-' +size : '',
            cartoon ? 'btn-cartoon' : '',
            outlined ? 'btn-outlined' : '',
            linked ? 'btn-linked' : '',
            rounded ? 'btn-rounded' : '',
            loading ? 'btn-loading' : '', 
            fullwidth ? 'btn-fullwidth' : ''].join(" ")}
            {...styles}
        >
            {loading ?  'Loading...' : children} 
        </button>
    );
}

export default React.forwardRef<unknown, ButtonProps>(Button);