import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { SHELTER_API_URL } from "../config/config";
import { getWeather } from "../api/Api";
import petsnorain from "../images/petsnorain.jpg";
import petwithumbrella from "../images/petwithumbrella.jpg";

class PetDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      pets: [],
      petid: props.match.params.id,
      lockey: props.match.params.loc,
      rainProb: true,
      iconPhrase: "",
      petname: "",
      petloc: "",
    };
  }

  callAPI() {
    fetch(`${SHELTER_API_URL}pets/${this.state.petid}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          isLoaded: true,
          pets: JSON.parse(JSON.stringify(result)),
          error: null,
        })
      )
      .catch(console.error);
    this.callWeatherAPI(this.state.lockey);
  }

  callWeatherAPI(lockey) {
    let rain = true;

    getWeather(lockey).then((res) => {
      this.setState({
        isLoaded: true,
        rainProb: res.DailyForecasts[0].Day.HasPrecipitation,
        iconPhrase: res.DailyForecasts[0].Day.IconPhrase,
        error: null,
      });
    });
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table" width="300px">
          <TableHead>
            <TableRow>
              <TableCell width="50px">
                <b>Pet's Name</b>
              </TableCell>

              <TableCell align="right" width="50px">
                <b>Pet's Location (City)</b>
              </TableCell>
              <TableCell align="right" width="50px">
                <b>Pet's Location (Country)</b>
              </TableCell>
              <TableCell align="right" width="50px">
                <b>Chances of Precipitation</b>
              </TableCell>
              <TableCell align="right" width="50px">
                <b> Weather Forecast</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell component="th" scope="row">
                  {pet.name}
                </TableCell>
                <TableCell align="right">{pet.location}</TableCell>
                <TableCell align="right">{pet.country}</TableCell>
                <TableCell align="right">
                  {this.state.rainProb ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">{this.state.iconPhrase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div hidden={this.state.rainProb}>
          <span>
            <img src={petsnorain}></img>
          </span>
          <a href="/">Check for another Pet</a>
        </div>

        <div hidden={!this.state.rainProb}>
          <span>
            <img src={petwithumbrella}></img>
          </span>
          <a href="/">Check for another Pet</a>
        </div>
      </TableContainer>
    );
  }
}

export default PetDetails;
