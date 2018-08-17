import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav     from "./components/Nav";
import Main    from "./pages/Main";
import Search  from "./pages/Search";
import Saved   from "./pages/Saved";
import NoMatch from "./pages/NoMatch";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/"       component={Search} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/saved"  component={Saved} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
