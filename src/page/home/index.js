import React, {Component}  from 'react';
import * as yup from 'yup';
import * as tools from '../../tools';
import * as suggestions from '../../config.json';
import { getMovie } from '../../services/api';
import { getText  } from "../../language";

import  {Formik, Form} from 'formik';
import {MovieDetails} from '../../components/movieDetails';

import { Input } from "../../components/form";
import { Searching, Broom} from "../../icons";

import Slide from "../../components/slick";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {color_01, color_04} from '../../sass/config/colors.scss';

export default class Home extends Component {
    state = {
        text: {},
        movie: {}
    }

    componentDidMount () {
        this.setState({text: getText()});
        this.testParams();
        // this.submitForm({title: 'The Lord of the rings'});
    }

    testParams = () => {
        const id = tools.getParamsURL('id');
        if (id) {
            this.submitForm({id});
        } else {
            this.setState({ movie: {} });
        }
    }

    submitForm = async (params) => {
        const response = await getMovie(params);
        this.setState({ movie: response.data });
    }

    clearSearch = () => {
        this.setState({ movie: {} });
    }

    getSlideConfg = () => {
        let items = suggestions.default.suggestions;

        let createItems = () => {
            return (
                items.map(e => (
                    <img className="w-100 p-lr-12 c-pointer" src={e.poster} alt={e.name} title={e.name} onClick={() => this.submitForm({id: e.id})}/>
                ))
            )
        }

        let settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            cssEase: "linear",
            arrowCustom: "arrow-default",
            dotsCustom: "dots-default",
            items: createItems()
        };

        return settings;
    }
    
    render () {
        const settingsSlider = this.getSlideConfg();
        const { text, movie } = this.state;

        let validationSchema = yup.object().shape({
            title: yup.string().required(text.error_required_field)
        });

        let initialValues = {
            title: ''
        };

        return (
            <main>
                <Container>
                    <Row className="h-center m-t-40">
                        <Col md={10} className="t-a-c">
                            <p className="font-01 fs-07 color-02">
                                {text.home_title}
                            </p>

                            <p>
                                {text.home_text_attention}
                            </p>
                        </Col>
                    </Row>

                    <Row className="m-t-40">
                        <Col xs={12}>
                            <Formik onReset={this.clearSearch} initialValues={initialValues} onSubmit={this.submitForm} validationSchema={validationSchema}>
                                <Form>
                                    <Row className="h-center">
                                        <Col xs={12} md={4}>
                                            <Input name="title" placeholder="Nome do filme..."/>
                                        </Col>

                                        <Col xs={12} md={4} lg={2} >
                                            <button type="submit" className="btn btn-block btn-primary">
                                                <Searching width={15} height={15} fill={color_04} className="m-r-4" /> {text.home_search_buttons}
                                            </button>
                                        </Col>

                                        <Col xs={12} md={4} lg={2} >
                                            <button type="reset" className="btn btn-block btn-outline-primary m-t-12-sm m-t-12-xs">
                                                <Broom width={15} height={15} fill={color_01} className="m-r-4" /> Limpar Busca
                                            </button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Formik>
                        </Col>
                    </Row>

                    {movie.imdbID && (
                        <div className="m-t-40">
                            <MovieDetails movie={movie} />
                        </div>
                    )}

                    <div>
                        <p className="t-a-c font-01 fs-07 m-t-40 m-b-20">
                            Sugestões de Filmes
                        </p>

                        <Slide settings={settingsSlider} />
                    </div>
                </Container>
            </main>
        )
    }
}