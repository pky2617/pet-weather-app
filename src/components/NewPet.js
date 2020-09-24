import React, { Component } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import getLocations from "../api/Api";
import { getCityLocation } from "../api/Api";

import { SHELTER_API_URL } from "../config/config";
const Container = styled.div`
  margin-top: 15px;
`;
class NewPet extends Component {
  state = {
    fields: {},
    errors: {},
    name: "",
    type: "",
    breed: "",
    location: "",
    latitude: null,
    longitude: null,
    location_key: null,
    locdetails: null,
    country: null,
  };
  /* This is where the magic happens
   */

  searchCityLoc = (event) => {
    console.log("Inside search CityLoc");
    let fields = this.state.fields;
    this.setState({ location: fields["location"] });
    getCityLocation(fields["location"]).then((res) => {
      this.setState({ latitude: res[0].GeoPosition.Latitude });
      this.setState({ longitude: res[0].GeoPosition.Longitude });
      this.setState({ location_key: res[0].Key });
      this.setState({ location: res[0].EnglishName });
      this.setState({ country: res[0].Country.EnglishName });
      fields["latitude"] = res[0].GeoPosition.Latitude;
      fields["longitude"] = res[0].GeoPosition.Longitude;
      fields["location_key"] = res[0].Key;
      fields["location"] = res[0].EnglishName;
      fields["country"] = res[0].Country.EnglishName;
      this.setState({ fields });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.handleValidation()) {
      let fields = this.state.fields;
      const pet = {
        name: fields["name"],
        type: fields["type"],
        breed: fields["breed"],
        location: fields["location"],
        latitude: fields["latitude"],
        longitude: fields["longitude"],
        location_key: fields["location_key"],
        country: fields["country"],
      };
      axios
        .post(`${SHELTER_API_URL}pet`, JSON.parse(JSON.stringify(pet)))
        .then((res) => {
          if (res.status === 200) {
            window.location = "/"; //This line of code will redirect you once the submission is succeed
          } else {
            console.log(res);
            alert("Error occured while saving data");
          }
        })
        .catch((error) => {
          alert(`Error occured while saving data : ${error}`);
          console.log(error);
        });
    } else {
      console.log("Validation errors in form data");
    }
  };
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Pet's Name cannot be empty";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z0-9 ]+$/)) {
        formIsValid = false;
        errors["name"] = "Pet's Name should be alphanumeric";
      }
    }
    if (!fields["type"]) {
      formIsValid = false;
      errors["type"] = "Pet's Type cannot be empty";
    }

    if (typeof fields["type"] !== "undefined") {
      if (!fields["type"].match(/^[a-zA-Z0-9 ]+$/)) {
        formIsValid = false;
        errors["type"] = "Pet's Type should be alphanumeric";
      }
    }

    if (!fields["breed"]) {
      formIsValid = false;
      errors["breed"] = "Pet's Breed cannot be empty";
    }

    if (typeof fields["breed"] !== "undefined") {
      if (!fields["breed"].match(/^[a-zA-Z0-9 ]+$/)) {
        formIsValid = false;
        errors["breed"] = "Pet's Breed should be alphanumeric";
      }
    }

    if (!fields["location"]) {
      formIsValid = false;
      errors["location"] = "Pet's City cannot be empty";
    }

    if (typeof fields["location"] !== "undefined") {
      if (!fields["location"].match(/^[a-zA-Z0-9 ]+$/)) {
        formIsValid = false;
        errors["location"] = "Pet's City should be alphanumeric";
      }
    }
    if (!fields["latitude"]) {
      formIsValid = false;
      errors["latitude"] =
        "Wrong City! Please correct the city and search again";
    }

    if (!fields["longitude"]) {
      formIsValid = false;
      errors["longitude"] =
        "Wrong City! Please correct the city and search again";
    }

    if (!fields["country"]) {
      formIsValid = false;
      errors["Country"] =
        "Wrong Country! Please correct the city and search again";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <label>
            {" "}
            <b>Pet's Name:</b>
            <input
              type="text"
              onChange={this.handleChange.bind(this, "name")}
              value={this.state.fields["name"]}
            />
            <br />
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
          </label>
          <br />
          <label>
            {" "}
            <b>Pet's Type:</b>
            <input
              type="text"
              onChange={this.handleChange.bind(this, "type")}
              value={this.state.fields["type"]}
            />
            <br />
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
          </label>
          <br />
          <label>
            {" "}
            <b>Pet's Breed:</b>
            <input
              type="text"
              onChange={this.handleChange.bind(this, "breed")}
              value={this.state.fields["breed"]}
            />
            <br />
            <span style={{ color: "red" }}>{this.state.errors["breed"]}</span>
          </label>
          <br />
          <label>
            {" "}
            <b>City</b>(only City name allowed)<b>:</b>
            <input
              type="text"
              onChange={this.handleChange.bind(this, "location")}
              value={this.state.fields["location"]}
            />{" "}
            <a href="#" onClick={this.searchCityLoc}>
              <b>Search City</b>
            </a>
            <br />
            <span style={{ color: "red" }}>
              {this.state.errors["location"]}
            </span>
          </label>
          <br />
          <label>
            {" "}
            <b>Country:</b>
            <input
              type="text"
              disabled={true}
              onChange={this.handleChange.bind(this, "country")}
              value={this.state.fields["country"]}
            />
            <br />
            <span style={{ color: "red" }}>{this.state.errors["country"]}</span>
          </label>
          <br />
          <label>
            {" "}
            <b>Latitude:</b>
            <input
              type="float"
              disabled={true}
              onChange={this.handleChange.bind(this, "latitude")}
              value={this.state.fields["latitude"]}
            />
            <br />
            <span style={{ color: "red" }}>
              {this.state.errors["latitude"]}
            </span>
          </label>
          <br />
          <label>
            {" "}
            <b>Longitdue:</b>
            <input
              type="float"
              disabled={true}
              onChange={this.handleChange.bind(this, "longitude")}
              value={this.state.fields["longitude"]}
            />
            <br />
            <span style={{ color: "red" }}>
              {this.state.errors["longitude"]}
            </span>
          </label>

          <br />
          <br />
          <button align="center" type="submit">
            {" "}
            Save Pet
          </button>
        </form>
      </Container>
    );
  }
}
export default NewPet;
