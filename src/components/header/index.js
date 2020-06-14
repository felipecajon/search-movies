import React, {Component} from 'react';

import { getText } from "../../language";
import { Logo } from '../icons';
import './style.scss';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    state = {
        text: {}
    }

    componentDidMount () {
        this.setState({text: getText()})
    }

    render () {
        const { text } = this.state;
        
        return (
            <header className="d-flex v-center h-space-between">
                <Link to={'/'} className="logo">
                    <Logo with={50} height={50}/>
                </Link>

                <div className="font-02 favorites">
                    <Link to={'/favorites'} data-testid="header-navigate-to-favorites">
                        {text.header_see_favorites}
                    </Link>
                </div>
            </header>
        )
    }
} 