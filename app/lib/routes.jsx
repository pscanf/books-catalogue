import React from "react";
import {Redirect, Route} from "react-router";
import {ReduxRouter} from "redux-router";

import Books from "views/books";
import Boxes from "views/boxes";
import Home from "views/home";
import Root from "views/root";

export default (
    <ReduxRouter>
        <Route component={Root} name="root">
            <Redirect from="/" to="/home" />
            <Route component={Home} name="home" path="/home" />
            <Route component={Books} name="books" path="/books" />
            <Route component={Books} name="book" path="/books/:id" />
            <Route component={Boxes} name="boxes" path="/boxes" />
            <Route component={Boxes} name="box" path="/boxes/:id" />
        </Route>
    </ReduxRouter>
);
