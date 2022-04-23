import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button, { ButtonProps } from './button';

export default {
	title: 'Components/Button',
	component: Button,
	argTypes: {
        types: {
            control: 'select',
            options: ['primary', 'link', 'info', 'success', 'warning', 'danger', 'white', 'light', 'dark', 'black', 'ghost']
        },
        //backgroundColor: { control: 'color' },
        size: {
            control: 'select',
            options: [ 'small', 'normal', 'large' ]
        },
        cartoon:{
            control: 'boolean'
        },
        outlined: {
            control: 'boolean'
        },
        linked: {
            control: 'boolean'
        },
        rounded: {
            control: 'boolean'
        },
        loading: {
            control: 'boolean'
        },
        disabled:{
            control: 'boolean'
        },
        fullwidth:{
            control: 'boolean'
        }
    }
} as Meta;


const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    //types: 'primary',
    children: 'Button',
};
