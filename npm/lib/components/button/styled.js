var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from "styled-components";
export var sidePaddings = {
    large: 30,
    default: 25,
    small: 20
};
export var heights = {
    large: 55,
    default: 45,
    small: 35
};
export var typeColors = {
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
/* Real tag is assigned dynamically */
export var StyledButton = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    /* Add margin in case of loading or icon */\n    & > *:nth-child(1) {\n        margin-left: ", "px;\n    }\n    font-size: 15px;\n    border: none;\n    cursor: pointer;\n    background-color: ", ";\n    padding: 0 ", "px;\n    height: ", "px;\n    color: ", ";\n    ", "\n    border-radius: 0;\n    outline: none;\n    &:focus {\n        box-shadow: 0 0 0 1px #fff, 0 0 0 2px ", ";\n    }\n    &:hover {\n        background-color: ", ";\n    }\n"], ["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    /* Add margin in case of loading or icon */\n    & > *:nth-child(1) {\n        margin-left: ", "px;\n    }\n    font-size: 15px;\n    border: none;\n    cursor: pointer;\n    background-color: ", ";\n    padding: 0 ", "px;\n    height: ", "px;\n    color: ", ";\n    ", "\n    border-radius: 0;\n    outline: none;\n    &:focus {\n        box-shadow: 0 0 0 1px #fff, 0 0 0 2px ", ";\n    }\n    &:hover {\n        background-color: ", ";\n    }\n"])), function (pr) { return pr.withText ? 7 : 0; }, function (pr) { return typeColors[pr.innerType].regular; }, function (pr) { return sidePaddings[pr.size]; }, function (pr) { return heights[pr.size]; }, function (pr) { return pr.innerType === 'ghost'
    ? typeColors['primary'].regular
    : '#fff'; }, function (pr) { return pr.disabled ? "\n        background-color: #a6a6a6;\n        color: #5e5e5e;\n        cursor: not-allowed;\n        &:hover {\n            background-color: #a6a6a6 !important;\n            color: #5e5e5e !important;\n        }\n    " : ''; }, function (pr) { return typeColors[pr.innerType].regular; }, function (pr) { return typeColors[pr.innerType].hover; });
export var StyledIcon = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    height: 20px;\n"], ["\n    height: 20px;\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=styled.js.map