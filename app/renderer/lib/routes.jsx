import React from "react";
import {Redirect, Route} from "react-router";
import {ReduxRouter} from "redux-router";

import Collection from "views/collection";
import Home from "views/home";
import Root from "views/root";

export default (
    <ReduxRouter>
        <Route component={Root} name="root">
            <Redirect from="/" to="/home" />
            <Route component={Home} name="home" path="/home" />
            <Route component={Collection} name="collection" path="/collection/:collection" />
            <Route component={Collection} name="collection-insert" path="/collection/:collection/new" />
            <Route component={Collection} name="collection-update" path="/collection/:collection/:_id/update" />
            <Route component={Collection} name="collection-remove" path="/collection/:collection/:_id/remove" />
        </Route>
    </ReduxRouter>
);
