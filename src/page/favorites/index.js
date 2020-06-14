import React, { Component } from 'react';
import { connect } from "react-redux";
import { addFavorites } from "../../actions";
import { Link } from "react-router-dom";
import {removeService} from '../../components/movieDetails/movieService';
import { Searching, BrokenHeart} from '../../icons';
import { color_01, color_04 } from '../../sass/config/colors.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { bindActionCreators } from 'redux';

class FavoritesPage extends Component {
    removeMovie (movie) {
        let {favorites, addFavorites} = this.props;
        removeService(favorites, movie, addFavorites);
    }

    getFavoriteList (favorites) {
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
                                        Desfavoritar <BrokenHeart fill={color_04} width={15} height={15} />
                                    </button>
                                </li>
                            ))
                        }
                    </ul>

                    <div className="w-100 d-flex h-center m-t-20">
                        <Link className="btn btn-outline-primary" to={'/'}>
                            <Searching width={15} height={15} fill={color_01} className="m-r-4" /> Buscar Mais...
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="t-a-c m-t-20">
                    <p>
                        Você ainda não possui favoritos
                    </p>

                    <Link data-testid="has-no-items" to={'/'} className="btn btn-primary m-t-20" > Clique aqui e comece a favoritar agora mesmo!!! </Link>
                </div>
            )
        }
    }

    render() {
        const { favorites } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <p className="font-01 fs-07">
                            Meus Favoritos
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