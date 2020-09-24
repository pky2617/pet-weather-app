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
    };
  }

  callAPI() {
    console.log("Inside callAPI");
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
      .then((result) => console.log("res", result));
    this.callWeatherAPI(this.state.lockey);
  }

  callWeatherAPI(lockey) {
    let rain = true;
    console.log("Inside CallWeatherapi");
    console.log(lockey);
    getWeather(lockey).then((res) => {
      console.log("Before displaying weahter results");
      console.log(res.DailyForecasts[0].Day);
      console.log(res.DailyForecasts[0].Day.HasPrecipitation);
      const date = new Date(res.DailyForecasts[0].Date);
      console.log(date);
      console.log("after displaying date");
      const weather = res.DailyForecasts[0].Temperature;
      this.setState({
        isLoaded: true,
        rainProb: res.DailyForecasts[0].Day.HasPrecipitation,
        iconPhrase: res.DailyForecasts[0].Day.IconPhrase,
        error: null,
      });

      console.log(res.DailyForecasts[0].Day.HasPrecipitation);
    });
  }

  componentWillMount() {
    console.log("Before calling API");
    console.log(this.state);
    this.callAPI();
    console.log("after calling API");
    console.log(this.state);
    // this.console.log("after calling api");
    //this.console.log(this.state.apiResponse);
  }

  render() {
    /*  {
      console.log(this.state.pets);
      {
        this.state.pets.map((pet) => {
          console.log(pet);
          console.log(pet.location_key);
          console.log(pet.name);
          let rain = this.callWeatherAPI(pet.location_key);
          console.log("Rain prob in render :");
          console.log(rain);
        });
      }
    }*/
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table" width="300px">
          <TableHead>
            <TableRow>
              <TableCell width="50px">
                <b>Pet's Name</b>
              </TableCell>

              <TableCell align="right" width="50px">
                <b>Pet's Location</b>
              </TableCell>
              <TableCell align="right" width="50px">
                <b>Precipitation Probability</b>
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
                <TableCell align="right">
                  {this.state.rainProb ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">{this.state.iconPhrase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div hidden={this.state.rainProb}>
          <p>
            <img src="https://lh3.googleusercontent.com/proxy/DiI6Ct6kJyUjsagOOM5jYEW94mtMKQA6biqdl7Mgl3qqSVr-zFxHLTMXUqY23ySvhRVYuv4pPMtGs510Z2vXSB6WXg5oN4MhwrsM1kt_yHs3wlkDadwQPytR-05QT6jl9LN34F30jwAtw6Dv"></img>
          </p>
        </div>
        <div hidden={!this.state.rainProb}>
          <p>
            <img src="data:image/jpeg;base64,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"></img>
          </p>
        </div>
      </TableContainer>
    );
  }
}

export default PetDetails;
