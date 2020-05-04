import React from 'react';

interface Props {
    type: string;
    label: string;
    onClick?: (event: React.MouseEvent) => void;
}


export const Button = (props: Props) => {

    const className = `button ${props.type}`;
    const label = props.label;
    const onClick = (props.onClick ? props.onClick : () => {});

    return  (
        <span className={className} onClick={onClick}>
            {label}
        </span>
    );
}