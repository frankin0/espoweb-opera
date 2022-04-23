var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { StyledButton, StyledIcon } from './styled';
var Button = function (props, ref) {
    var _a = props.type, type = _a === void 0 ? 'primary' : _a, icon = props.icon, _b = props.size, size = _b === void 0 ? 'default' : _b, _c = props.className, className = _c === void 0 ? '' : _c, children = props.children, _d = props.disabled, disabled = _d === void 0 ? false : _d, _e = props.loading, loading = _e === void 0 ? false : _e, onClick = props.onClick, href = props.href, as = props.as, to = props.to, _f = props.cartoon, cartoon = _f === void 0 ? false : _f, _g = props.outlined, outlined = _g === void 0 ? false : _g, _h = props.linked, linked = _h === void 0 ? false : _h, _j = props.rounded, rounded = _j === void 0 ? false : _j, _k = props.fullwidth, fullwidth = _k === void 0 ? false : _k;
    var styles = {
        innerType: true,
        size: size,
        disabled: disabled,
        withText: children !== null
    };
    var spinnerStyles = {
        size: size === 'large' ? 25 : size === 'default' ? 20 : 15,
        light: true,
    };
    var childrenWithIcon = !icon ? children : (React.createElement(React.Fragment, null,
        children,
        React.createElement(StyledIcon, { as: icon })));
    if (as && !disabled) {
        return (React.createElement(StyledButton, __assign({ as: as, to: to, ref: ref, className: [className, 'btn',
                type ? 'btn-' + type : 'btn-primary',
                size ? 'btn-' + size : '',
                cartoon ? 'btn-cartoon' : '',
                outlined ? 'btn-outlined' : '',
                linked ? 'btn-linked' : '',
                rounded ? 'btn-rounded' : '',
                loading ? 'btn-loading' : '',
                fullwidth ? 'btn-fullwidth' : ''].join(" ") }, styles), loading ? 'Loading...' : children));
    }
    if (href && !disabled) {
        return (React.createElement("a", __assign({ href: href, ref: ref, className: [className, 'btn',
                type ? 'btn-' + type : 'btn-primary',
                size ? 'btn-' + size : '',
                cartoon ? 'btn-cartoon' : '',
                outlined ? 'btn-outlined' : '',
                linked ? 'btn-linked' : '',
                rounded ? 'btn-rounded' : '',
                loading ? 'btn-loading' : '',
                fullwidth ? 'btn-fullwidth' : ''].join(" ") }, styles), loading ? 'Loading...' : children));
    }
    return (React.createElement("button", __assign({ type: 'button', onClick: onClick, ref: ref, className: [className, 'btn',
            type ? 'btn-' + type : 'btn-primary',
            size ? 'btn-' + size : '',
            cartoon ? 'btn-cartoon' : '',
            outlined ? 'btn-outlined' : '',
            linked ? 'btn-linked' : '',
            rounded ? 'btn-rounded' : '',
            loading ? 'btn-loading' : '',
            fullwidth ? 'btn-fullwidth' : ''].join(" ") }, styles), loading ? 'Loading...' : children));
};
export default React.forwardRef(Button);
//# sourceMappingURL=button.js.map