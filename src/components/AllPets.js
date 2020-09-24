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
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

class AllPets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      pets: [],
    };
  }

  callAPI() {
    fetch(`${SHELTER_API_URL}pets`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          loading: false,
          pets: JSON.parse(JSON.stringify(result)),
          error: null,
        })
      )
      .then((result) => console.log("res", result));
  }

  componentWillMount() {
    this.callAPI();
    console.log(this.state.pets);
    // this.console.log("after calling api");
    //this.console.log(this.state.apiResponse);
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <div className="sweet-loading">
          <ClipLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        <Table size="small" aria-label="a dense table" width="300px">
          <TableHead>
            <TableRow>
              <TableCell width="50px">
                <b>Pet's Name</b>
              </TableCell>
              <TableCell align="right" width="50px">
                <b>Pet's Type</b>
              </TableCell>
              <TableCell align="right" width="50px">
                <b>Pet's Breed</b>
              </TableCell>
              <TableCell align="right" width="50px">
                <b> Location (City)</b>
              </TableCell>
              <TableCell align="right" width="50px">
                <b> Location (Country)</b>
              </TableCell>

              <TableCell align="right" width="50px">
                <b>View Details</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell component="th" scope="row">
                  {pet.name}
                </TableCell>
                <TableCell align="right">{pet.type}</TableCell>
                <TableCell align="right">{pet.breed}</TableCell>
                <TableCell align="right">{pet.location}</TableCell>
                <TableCell align="right">{pet.country}</TableCell>

                <TableCell align="right">
                  <Link to={`/pets/${pet.id}/${pet.location_key}`}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default AllPets;
