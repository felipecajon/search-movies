import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getText } from "../../language";
import { addFavorites } from "../../actions";
import { removeService } from "./movieService";
import { StarHalf, Favorite, BrokenHeart} from '../icons';
import { color_01, color_02, color_04 } from '../../sass/config/colors.scss';
import { addToaster } from "../../components/toaster";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MovieDetails extends Component {
    state = {
        text: {}
    }
    
    componentDidMount () {
        this.setState({text: getText()})
    }

    createStarts (ratting) {
        let stars = [];
        let fullStarts = Math.round(ratting);
        
        for (let index = 0; index < 10; index++) {
            let colorFill = color_02;

            if (index < fullStarts) {
                colorFill = color_01
            }
            
            if (index % 2 === 0) {
                stars.push(<StarHalf fill={colorFill} key={index} width={20} height={20} className="star start-left"/>)
            } else {
                stars.push(<StarHalf fill={colorFill} key={index} width={20} height={20} className="star star-right rotate-y-180" />)
            }
        }
        
        return (
            <>
                {stars}
            </>
        );
    }
    
    getRatting (rattings) {
        const {text} = this.state;
        
        if (rattings) {
            const item = rattings.filter(function(item){
                return item.Source === "Internet Movie Database";         
            });

            if (item.length > 0) {
                const ratting = (parseFloat(item[0].Value.split('/')[0]));

                return (
                    <p className="d-flex v-center">
                        <span className="font-02 p-t-8 m-r-12">{text.movie_details_internet_ratting}:</span> {this.createStarts(ratting)}
                    </p>
                )
            }
        }
    }

    getActionButton (movie) {
        const {text} = this.state;
        const {favorites} = this.props;

        const isFavorite = favorites.filter(function (item) {
            return item.id === movie.imdbID
        }).length > 0;

        if (isFavorite) {
            return (
                <button data-testid="btn-remove-favorite" className="btn btn-primary m-t-20" onClick={() => this.removeMovie(movie)}>
                    {text.movie_details_disfavor} <BrokenHeart fill={color_04} width={15} height={15} />
                </button>
            )
        } else {
            return(
                <button data-testid="btn-add-favorite" className="btn btn-primary m-t-20" onClick={() => this.addMovie(movie)}>
                    {text.movie_details_favor} <Favorite fill={color_04} width={15} height={15} />
                </button>
            )
        }
    }

    addMovie (movie) {
        const {text} = this.state;
        const {addFavorites, favorites} = this.props;
        const newMovie = {id: movie.imdbID, name: movie.Title};
        addFavorites([...favorites, newMovie])
        addToaster({context: `${text.movie_details_add_text_1} ${movie.Title} ${text.movie_details_add_text_2}`, type: 'success'});
    }

    removeMovie (movie) {
        const {addFavorites, favorites} = this.props;
        removeService(favorites, movie, addFavorites);
    }

    render () {
        const { text } = this.state;
        const { movie } = this.props;

        return (
            <div data-testid="container-search-movie">
                <Row>
                    <Col md={movie.Poster !== 'N/A' ? 9 : 12}>
                        {movie.Title !== 'N/A' && (
                            <p className="font-03 fs-06">
                               {movie.Title}
                            </p>
                        )}
    
                        {movie.Plot !== 'N/A' && (
                            
                            <p>
                               {movie.Plot}
                            </p>
                        )}
    
                        <div className="m-t-20">
                            {movie.Director !== 'N/A' && (
                                <p>
                                    <span className="font-02">{text.movie_details_director}:</span> {movie.Director}
                                </p>
                            )}
    
                            {movie.Actors !== 'N/A' && (
                                <p>
                                    <span className="font-02">{text.movie_details_actor}:</span> {movie.Actors}
                                </p>
                            )}
    
                            {movie.Year !== 'N/A' && (
                                <p>
                                    <span className="font-02">{text.movie_details_year}:</span> {movie.Year}
                                </p>
                            )}
    
                            {movie.Genre !== 'N/A' && (
                                <p>
                                    <span className="font-02">{text.movie_details_genre}:</span> {movie.Genre}
                                </p>
                            )}
    
                            {movie.Ratings && (
                                <div className="d-flex v-center">
                                    {this.getRatting(movie.Ratings)}
                                </div>
                            )}
    
                            {movie.imdbID && (
                                this.getActionButton(movie)
                            )}
                        </div>
                    </Col>
    
                    {
                        movie.Poster !== 'N/A' && (
                            <Col className="t-a-c">
                                <img src={movie.Poster} alt={movie.Title} title={movie.Title}/>
                            </Col>
                        )
                    }
                </Row>
            </div>
        )
    }
}

const mapStateProps = store => ({
    favorites: store.state.favorites
});

const mapDispatchToProps = dispatch => bindActionCreators({addFavorites}, dispatch)

export default connect(mapStateProps, mapDispatchToProps)(MovieDetails)