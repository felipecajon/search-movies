import React, {Component} from 'react';

import { Logo } from '../../icons';
import './style.scss';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render () {
        return (
            <header className="d-flex v-center h-space-between">
                <Link to={'/'} className="logo">
                    <Logo with={50} height={50}/>
                </Link>

                <div className="font-02 favorites">
                    <Link to={'/favorites'}>
                        Ver favoritos
                    </Link>
                </div>
            </header>
        )
    }
} 