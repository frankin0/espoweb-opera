import React, { ReactNode } from 'react';
export declare type componentSize = 'default' | 'fullscreen' | 'modal-xl' | 'modal-lg' | 'modal-sm' | 'modal-fluid';
export interface ModalProps {
    id?: string;
    size?: componentSize;
    className?: string;
    closing?: boolean;
    children?: ReactNode;
    activate?: boolean;
    scrollBarWidth?: number;
    onClickButton?: React.MouseEventHandler<HTMLDivElement>;
}
declare const _default: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>>;
export default _default;
//# sourceMappingURL=modal.d.ts.map