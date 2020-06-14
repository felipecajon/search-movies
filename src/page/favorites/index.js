import React, { Component } from 'react';
import { connect } from "react-redux";
import { addFavorites } from "../../actions";
import { Link } from "react-router-dom";
import {removeService} from '../../components/movieDetails/movieService';
import { Searching, BrokenHeart} from '../../components/icons';
import { color_01, color_04 } from '../../sass/config/colors.scss';
import { getText  } from "../../language";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { bindActionCreators } from 'redux';

class FavoritesPage extends Component {
    state = {
        text: {} 
    }

    componentDidMount () {
        this.setState({text: getText()});
    }

    removeMovie (movie) {
        let {favorites, addFavorites} = this.props;
        removeService(favorites, movie, addFavorites);
    }

    getFavoriteList (favorites) {
        const { text } = this.state;

        if (favorites.length > 0) {
            return (
                <div>
                    <ul className="list-group m-t-20">
                        {
                            favorites && favorites.map((e, index) => (
                                <li className="list-group-item list-group-item-action d-flex v-center h-space-between" key={e.id}>
                                    <Link to={`/movieDetails?id=${e.id}`}>
                                        {e.name}
                                    </Link>

                                    <button data-testid={`favorite-remove-item-${index}`} className="btn btn-primary" onClick={ () => this.removeMovie({imdbID: e.id, Title: e.name}) }>
                                        {text.favorites_disfavor} <BrokenHeart fill={color_04} width={15} height={15} />
                                    </button>
                                </li>
                            ))
                        }
                    </ul>

                    <div className="w-100 d-flex h-center m-t-20">
                        <Link className="btn btn-outline-primary" to={'/'}>
                            <Searching width={15} height={15} fill={color_01} className="m-r-4" /> {text.favorites_search_more}
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="t-a-c m-t-20">
                    <p>
                        {text.favorites_no_itens}
                    </p>

                    <Link data-testid="has-no-items" to={'/'} className="btn btn-primary m-t-20" > {text.favorites_click_here_get_more} </Link>
                </div>
            )
        }
    }

    render() {
        const { text } = this.state;
        const { favorites } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <p className="font-01 fs-07">
                            {text.favorites_title}
                        </p>

                        {favorites && this.getFavoriteList(favorites)}
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateProps = store => ({
    favorites: store.state.favorites
});

const updatePros = updates => bindActionCreators({addFavorites}, updates);

export default connect(mapStateProps, updatePros)(FavoritesPage)