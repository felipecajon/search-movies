import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./page/home";
import FavoritesPage from "./page/favorites";

const Routes = () => (
    <Switch>
        <Route path="/movieDetails" component={Home} />
        <Route path="/favorites" component={FavoritesPage} />
        <Route path="/" component={Home} />
    </Switch>
);

export default Routes;