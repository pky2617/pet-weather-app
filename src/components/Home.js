import React, { Component } from "react";
import AllPets from "./AllPets";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Does my pet need an umbrella?</h1>
        <h2>Select a pet to find out</h2>
        <div>
          <AllPets />
        </div>
      </div>
    );
  }
}

export default Home;
