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
  };
  /* This is where the magic happens
   */

  searchCityLoc = (event) => {
    console.log("Inside search CityLoc");
    let fields = this.state.fields;
    this.setState({ location: fields["location"] });
    getCityLocation(fields["location"]).then((res) => {
      console.log(res);
      console.log(res[0].Key);
      console.log(res[0].GeoPosition.Latitude);
      console.log(res[0].GeoPosition.Longitude);
      this.setState({ latitude: res[0].GeoPosition.Latitude });
      this.setState({ longitude: res[0].GeoPosition.Longitude });
      this.setState({ location_key: res[0].Key });
      this.setState({ location: res[0].EnglishName });
      fields["latitude"] = res[0].GeoPosition.Latitude;
      fields["longitude"] = res[0].GeoPosition.Longitude;
      fields["location_key"] = res[0].Key;
      fields["location"] = res[0].EnglishName;
      this.setState({ fields });
      console.log(this.state);
      // console.log(res.Key);
      // console.log(res.GeoPosition.Latitude);
      // console.log(res.GeoPosition.Longitude);
    });
  };

  handleSubmit = (event) => {
    console.log("Handle submit:");
    console.log(this.state);
    event.preventDefault();
    let fields = this.state.fields;
    const pet = {
      name: fields["name"],
      type: fields["type"],
      breed: fields["breed"],
      location: fields["location"],
      latitude: fields["latitude"],
      longitude: fields["longitude"],
      location_key: fields["location_key"],
    };
    axios
      .post(`${SHELTER_API_URL}pet`, JSON.parse(JSON.stringify(pet)))
      .then((res) => {
        console.log(res);
        console.log(res.data);
        window.location = "/"; //This line of code will redirect you once the submission is succeed
      });
  };
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
    console.log("Handle change:");
    console.log(this.state);
  };
  handleChangeType = (event) => {
    this.setState({ type: event.target.value });
    console.log("Handle change:");
    console.log(this.state);
  };
  handleChangeBreed = (event) => {
    this.setState({ breed: event.target.value });
    console.log("Handle change:");
    console.log(this.state);
  };
  handleChangeLocation = (event) => {
    this.setState({ location: event.target.value });
    console.log("Handle change:");
    console.log(this.state);
  };

  handleChangeLatitude = (event) => {
    this.setState({ latitude: event.target.value });
    console.log("Handle change:");
    console.log(this.state);
  };
  handleChangeLongitude = (event) => {
    this.setState({ longitude: event.target.value });
    console.log("Handle change:");
    console.log(this.state);
  };
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
            Pet Name:
            <input
              type="text"
              onChange={this.handleChange.bind(this, "name")}
              value={this.state.fields["name"]}
            />
          </label>
          <br />
          <label>
            {" "}
            Type:
            <input
              type="text"
              onChange={this.handleChange.bind(this, "type")}
              value={this.state.fields["type"]}
            />
          </label>
          <br />
          <label>
            {" "}
            Breed:
            <input
              type="text"
              onChange={this.handleChange.bind(this, "breed")}
              value={this.state.fields["breed"]}
            />
          </label>
          <br />
          <label>
            {" "}
            City:
            <input
              type="text"
              onChange={this.handleChange.bind(this, "location")}
              value={this.state.fields["location"]}
            />{" "}
            <a href="#" onClick={this.searchCityLoc}>
              Search City
            </a>
          </label>
          <br />
          <label>
            {" "}
            Latitude:
            <input
              type="float"
              disabled={true}
              onChange={this.handleChange.bind(this, "latitude")}
              value={this.state.fields["latitude"]}
            />
          </label>
          <br />
          <label>
            {" "}
            Longitdue:
            <input
              type="float"
              disabled={true}
              onChange={this.handleChange.bind(this, "longitude")}
              value={this.state.fields["longitude"]}
            />
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
