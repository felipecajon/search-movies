import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { Store } from './store';

import Header from './components/header';
import Routes from './routes'
import Footer from './components/footer';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={Store}>
          <BrowserRouter>
            <Header />
            <Routes />
            <Footer />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}
