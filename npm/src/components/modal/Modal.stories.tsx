import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Modal, { ModalProps } from './modal';
import { fireEvent, screen, userEvent } from '@storybook/testing-library';

export default {
	title: 'Components/Modal',
	component: Modal,
	argTypes: {
        scrollBarWidth:{
            control: 'number'
        },
        activate: {
            control: 'boolean'
        },
        size: {
            control: 'select',
            options: ['default','fullscreen' , 'modal-xl' , 'modal-lg' , 'modal-sm' , 'modal-fluid']
        },
        closing: {
            control: 'boolean'
        }
    }
} as Meta;


const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
    //types: 'primary',
    activate: false,
    id: 'test',
    scrollBarWidth: 17,
    children: (
        <>
            <div className="modal-header">
                <h4 className="modal-title">Modal title</h4>
                <a href="#close" data-modal-dismiss="#test"><span className="modal-close">x</span></a>
            </div>
            <div className="modal-body">
                <p className="mb-0">This is a modal text</p>
            </div>
            <div className="modal-footer text-right">
                <button className="btn btn-ghost" data-modal-dismiss="#test">Close</button>
                <button className="btn btn-primary">Sava changes</button>
            </div>
        </>
    ),
};
