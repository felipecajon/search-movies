import React, {useState, useEffect} from 'react';
import { StarHalf, Favorite, BrokenHeart} from '../../icons';
import { color_01, color_02, color_04 } from '../../sass/config/colors.scss';
import { addToaster } from "../../components/toaster";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function removeService (array, movie) {
    let indexMovie = undefined;

    array.forEach((item, index) => {
        if (item.id === movie.imdbID) {
            indexMovie = index;
        }
    })

    addToaster({context: `O filme ${movie.Title} foi removido da sua lista de favoritos`, type: 'success'});
    return array.splice(indexMovie, 1);
}

export function MovieDetails (props) {
    let {movie} = props;
    let [favorites, setFavorite] = useState(JSON.parse(localStorage.getItem('searchMovie_favorites')) || []);
    
    useEffect(() => {
            localStorage.setItem('searchMovie_favorites', JSON.stringify(favorites));
    }, [favorites]);

    function createStarts (ratting) {
        let stars = [];
        let fullStarts = Math.round(ratting * 2);
        
        for (let index = 2; index < 22; index++) {
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
    
    function getRatting (rattings) {
        if (rattings) {
            const item = rattings.filter(function(item){
                return item.Source === "Internet Movie Database";         
            });

            if (item.length > 0) {
                const ratting = (parseFloat(item[0].Value.split('/')[0]));

                return (
                    <p className="d-flex v-center">
                        <span className="font-02 p-t-8 m-r-12">Avaliação da Internet:</span> {createStarts(ratting)}
                    </p>
                )
            }
        }
    }

    function getActionButton (movie) {
        const isFavorite = favorites.filter(function (item) {
            return item.id === movie.imdbID
        }).length > 0;

        if (isFavorite) {
            return (
                <button className="btn btn-primary m-t-20" onClick={() => removeMovie(movie)}>
                    Desfavoritar <BrokenHeart fill={color_04} width={15} height={15} />
                </button>
            )
        } else {
            return(
                <button className="btn btn-primary m-t-20" onClick={() => addMovie(movie)}>
                    Favoritar <Favorite fill={color_04} width={15} height={15} />
                </button>
            )
        }
    }

    function addMovie (movie) {
        const newMovie = {id: movie.imdbID, name: movie.Title};
        favorites.push(newMovie);
        setFavorite([...favorites]);
        addToaster({context: `O filme ${movie.Title} foi adicionado na sua lista de favoritos`, type: 'success'});
    }

    function removeMovie (movie) {
        removeService(favorites, movie)
        setFavorite([...favorites]);
    }

    return (
        <div className="">
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
                                <span className="font-02">Diretor:</span> {movie.Director}
                            </p>
                        )}

                        {movie.Actors !== 'N/A' && (
                            <p>
                                <span className="font-02">Atores:</span> {movie.Actors}
                            </p>
                        )}

                        {movie.Year !== 'N/A' && (
                            <p>
                                <span className="font-02">Ano:</span> {movie.Year}
                            </p>
                        )}

                        {movie.Genre !== 'N/A' && (
                            <p>
                                <span className="font-02">Genero:</span> {movie.Genre}
                            </p>
                        )}

                        {movie.Ratings && (
                            <div className="d-flex v-center">
                                {getRatting(movie.Ratings)}
                            </div>
                        )}

                        {movie.imdbID && (
                            getActionButton(movie)
                        )}
                    </div>
                </Col>

                {
                    movie.Poster !== 'N/A' && (
                        <Col>
                            <img src={movie.Poster} alt={movie.Title} title={movie.Title}/>
                        </Col>
                    )
                }
            </Row>
        </div>
    )
}