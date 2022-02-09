import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.min.css";
import "assets/styles/docs.css";

// Product Pages - START
// // admin
import Dashboard from "views/admin/Dashboard.js";

// Product Pages - STOP

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* Product Pages - START */}
      {/* admin */}
      <Route
        path="/dashboard"
        exact
        render={() => (
          <React.Fragment>
            <div className="pt-17">
              <Dashboard />
            </div>
          </React.Fragment>
        )}
      />
      {/* Product Pages - STOP */}
      {/* <Redirect from="*" to="/components" /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
