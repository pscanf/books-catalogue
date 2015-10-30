import "babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import "init-scripts/view-menu";
import "init-scripts/zoomer";

import routes from "lib/routes";
import store from "lib/redux-store";

const App = (
    <Provider store={store}>
        {routes}
    </Provider>
);

ReactDOM.render(App, document.getElementById("root"));
