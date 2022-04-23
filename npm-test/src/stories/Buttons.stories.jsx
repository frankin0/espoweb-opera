// Button.stories.js|jsx

import React from 'react';

import { Button } from '../components/Button'; 

import '../opera.css'

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'espoweb-opera/Button',
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
    },
};

const Template = (args) => <Button {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    types: 'primary',
    label: 'Button',
}
