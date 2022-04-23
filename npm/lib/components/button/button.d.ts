import React, { ElementType, ReactNode, MouseEventHandler } from 'react';
export declare type ButtonType = 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'light' | 'dark' | 'black' | 'ghost';
export declare type ComponentSize = 'default' | 'large' | 'small';
interface BaseButtonProps {
    type?: ButtonType;
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
declare type HTMLButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps;
declare type HTMLAnchorProps = {
    href?: string;
} & BaseButtonProps;
/**
 * For React Router Link
 */
declare type CustomNodeProps = {
    as?: ElementType;
    to?: string;
} & BaseButtonProps;
export declare type ButtonProps = HTMLButtonProps & HTMLAnchorProps & CustomNodeProps;
declare const _default: React.ForwardRefExoticComponent<{
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
} & BaseButtonProps & {
    href?: string | undefined;
} & {
    as?: React.ElementType<any> | undefined;
    to?: string | undefined;
} & React.RefAttributes<unknown>>;
export default _default;
//# sourceMappingURL=button.d.ts.map