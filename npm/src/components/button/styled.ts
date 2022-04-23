import styled from "styled-components";
//import { ComponentSize, heights, sidePaddings } from "../../config/sizes";
import { ButtonType } from "./button";

export type ComponentSize = 'default' | 'large' | 'small';

export const sidePaddings: {[key in ComponentSize] : number} = {
    large: 30,
    default: 25,
    small: 20
}
export const heights: {[key in ComponentSize] : number} = {
    large: 55,
    default: 45,
    small: 35
}

type StateColors = {
    regular: string;
    hover: string;
}

export const typeColors: {[key in ButtonType]: StateColors} = {

    primary: {
        regular: '#0018cf',
        hover: '#2e27cc',
    },
    link: {
        regular: '#d93848',
        hover: '#eb4d5d',
    },
    info: {
        regular: 'transparent',
        hover: '#dbdbdb',
    },
    success: {
        regular: '#000',
        hover: '#3d3d3d',
    },
    warning: {
        regular: '#0018cf',
        hover: '#2e27cc',
    },
    danger: {
        regular: '#d93848',
        hover: '#eb4d5d',
    },
    white: {
        regular: 'transparent',
        hover: '#fff',
    },
    light: {
        regular: '#000',
        hover: '#3d3d3d',
    },
    dark: {
        regular: '#0018cf',
        hover: '#2e27cc',
    },
    black: {
        regular: '#d93848',
        hover: '#0000',
    },
    ghost: {
        regular: 'transparent',
        hover: '#fff',
    }
};

interface StyledButtonProps {
    innerType: ButtonType;
    size: ComponentSize;
    withText: boolean;
}

/* Real tag is assigned dynamically */
export const StyledButton = styled.button<StyledButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    /* Add margin in case of loading or icon */
    & > *:nth-child(1) {
        margin-left: ${pr => pr.withText ? 7 : 0}px;
    }
    font-size: 15px;
    border: none;
    cursor: pointer;
    background-color: ${ (pr) => typeColors[pr.innerType].regular };
    padding: 0 ${ pr => sidePaddings[pr.size]}px;
    height: ${ pr => heights[pr.size]}px;
    color: ${ pr => pr.innerType === 'ghost' 
        ? typeColors['primary'].regular
        : '#fff'
    };
    ${ pr => pr.disabled ? `
        background-color: #a6a6a6;
        color: #5e5e5e;
        cursor: not-allowed;
        &:hover {
            background-color: #a6a6a6 !important;
            color: #5e5e5e !important;
        }
    ` : ''}
    border-radius: 0;
    outline: none;
    &:focus {
        box-shadow: 0 0 0 1px #fff, 0 0 0 2px ${ (pr) => typeColors[pr.innerType].regular };
    }
    &:hover {
        background-color: ${ (pr) => typeColors[pr.innerType].hover };
    }
`;

export const StyledIcon = styled.div`
    height: 20px;
`;