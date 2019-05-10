import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch}  from "react-router-dom";
import routes from "./routes.js";
import "./assets/styles/index.css";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
      <Switch>
          {routes.map((prop, key) => {
              return <Route path={prop.path} key={key} component={prop.component} />;
          })}
      </Switch>
    </Router>,
    document.getElementById("root")
);