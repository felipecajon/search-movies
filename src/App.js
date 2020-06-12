import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Header from './components/header';
import Routes from './routes'
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
