import React, { Component } from 'react';
import { ArrowLeft_01 as ArrowLeft01, ArrowRight_01 as ArrowRight01 } from "../../../icons";
import { color_03 } from "../../../sass/config/colors.scss";
import './style.scss';

export default class Arrow extends Component {
    
    getArrow = (props) => {
        const { onClick, direction, classNameCustom } = this.props;
        let iconDirection = direction === 'left' ? <ArrowLeft01 widt={15} height={20} fill={color_03}/> : <ArrowRight01 widt={15} height={20} fill={color_03}/>;

        return (
            <div className={`${classNameCustom} ${direction}`} onClick={onClick} >
                <span className="material-icons icon-open m-r-4">
                    {iconDirection}
                </span>
            </div>
        )
    }
    
    render () {
        return this.getArrow();
    }
}
