import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NewPet from "./components/NewPet";

import PetDetails from "./components/PetDetails";
import Error from "./components/Error";
import Navigation from "./components/Navigation";

class App extends Component {
  id = 1;
  render() {
    return (
      <BrowserRouter>
        <main>
          <div>
            <Navigation />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/pets/new" exact component={NewPet} />
              <Route path="/pets" exact component={Home} />
              <Route path="/pets/:id/:loc" exact component={PetDetails} />
              <Route component={Error} />
            </Switch>
          </div>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
