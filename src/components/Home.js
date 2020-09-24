import React, { Component } from "react";

import Pets from "./Pets";
import AllPets from "./AllPets";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Does my pet need an umbrella?</h1>
        <p>Select a pet to find out</p>
        <div>
          <AllPets />
        </div>
      </div>
    );
  }
}

export default Home;
