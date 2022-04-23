import React from 'react';


export const Button = (args) => {
    console.log(args);
    return (
        <button className={[
                'btn', 
                args.types ? 'btn-' + args.types : 'btn-primary', 
                args.size ? 'btn-' +args.size : '',
                args.cartoon ? 'btn-cartoon' : '',
                args.outlined ? 'btn-outlined' : '',
                args.linked ? 'btn-linked' : '',
                args.rounded ? 'btn-rounded' : '',
                args.loading ? 'btn-loading' : '', 
                args.fullwidth ? 'btn-fullwidth' : ''
            ].join(" ")}
            defaultDisabled={args.disabled ? true : false}
            style={args.style ? args.style : {}}
        >
            {args.label}
        </button>  
    );
}