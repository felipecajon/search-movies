import React, { Component } from "react";
import Slider from "react-slick";

import Arrow from "../../components/slick/arrow";
import './style.scss';

export default class Slide extends Component {
    render () {
        let settings = this.props.settings;

        if (settings.arrowCustom === 'arrow-default') {
            settings.prevArrow = <Arrow classNameCustom="arrow-default" direction="left"/>;
            settings.nextArrow = <Arrow classNameCustom="arrow-default" direction="right"/>;
        }
        
        return (
            <Slider className={`${settings.dotsCustom}`} {...settings}>
                {
                    settings.items.map((e, index) => (
                        <div key={`slide-index-${index}`}>
                            {e}
                        </div>
                    ))
                }
            </Slider>
        )
    }
}