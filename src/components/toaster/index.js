import React from 'react';
import toaster from 'toasted-notes';
import { Close } from "../../icons";
import { color_03 } from "../../sass/config/colors.scss";
import './style.scss';

export function addToaster(props) {
    const CustomNotification = ({ context, onClose }) => {
        return <div className="custom-toaster bd">
            <span className="mark"></span>
            <p>
                {context}
            </p>
            <Close className="close-toaster" onClick={onClose} width={10} height={10} fill={color_03}/>
        </div>;
    };

    const CustomNotificationWithTheme = CustomNotification;
    
    toaster.notify(({onClose}) => <CustomNotificationWithTheme context={props.context} onClose={onClose}/>, {
        position: 'top-right',
    });
}