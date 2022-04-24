import React, { useEffect, useState } from 'react';
var createElementbackdrop = function (props) {
    var _a = props.id, id = _a === void 0 ? 'none' : _a, _b = props.activate, activate = _b === void 0 ? false : _b, scrollBarWidth = props.scrollBarWidth;
    var _c = useState(false), show = _c[0], setShow = _c[1];
    useEffect(function () {
        if (activate) {
            setTimeout(function () {
                setShow(true);
                document.body.classList.add('modal-open');
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = scrollBarWidth + "px";
            }, 1);
        }
        else {
            setShow(false);
        }
    });
    return (React.createElement("div", { "data-opera-id": "element-opera-" + id, className: ["modal-backdrop", "fade", show ? "show" : ""].join(" ") }));
};
var Modal = function (props, ref) {
    var id = props.id, _a = props.size, size = _a === void 0 ? "" : _a, className = props.className, children = props.children, _b = props.closing, closing = _b === void 0 ? true : _b, _c = props.activate, activate = _c === void 0 ? false : _c, onClickButton = props.onClickButton, _d = props.scrollBarWidth, scrollBarWidth = _d === void 0 ? 17 : _d;
    if (id == null || id == undefined)
        throw "Error not id found!";
    var activate_update = activate;
    var _e = useState(false), showbackdrop = _e[0], setShowbackdrop = _e[1];
    var _f = useState(false), showModalAnim = _f[0], setShowModalAnim = _f[1];
    useEffect(function () {
        if (activate_update) {
            //show modal
            setShowbackdrop(true);
            setTimeout(function () {
                setShowModalAnim(true);
            }, 1);
        }
        else {
            //close modal
            setShowModalAnim(false);
            setTimeout(function () {
                setShowbackdrop(false);
                document.body.classList.remove('modal-open');
                document.body.style.overflow = "";
                document.body.style.paddingRight = "";
            }, 100);
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: id, ref: ref, style: showbackdrop ? { display: 'block' } : {}, className: [className, "modal", 'fade', showModalAnim ? 'show' : '', size].join(" "), "data-aria-closing": closing, onClick: onClickButton },
            React.createElement("div", { className: "modal-dialog" },
                React.createElement("div", { className: "modal-content" }, children))),
        showbackdrop ? React.createElement(createElementbackdrop, { id: id, activate: activate_update, scrollBarWidth: scrollBarWidth }) : ""));
};
export default React.forwardRef(Modal);
//# sourceMappingURL=modal.js.map