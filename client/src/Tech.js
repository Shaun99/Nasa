import React, { Component } from "react";
import "./App.css";
import "react-table/react-table.css";
import axios from "axios";
import Popup from "react-popup";
import "./Popup.css";
import { Link } from "react-router-dom";

class Tech extends Component {
  constructor() {
    super();
    this.state = {
      tech: [],
    };
  }
  componentDidMount() {
    const query = `/gettech`;
    console.log(query);
    axios
      .get(query)
      .then((result) => {
        console.log(result);
        this.setState({
          tech: result.data.results,
        });
      })
      .catch((error) => {
        Popup.alert(error.response.data.msg);
        console.log(error.response.data.msg);
      });
  }

  render() {
    var items = this.state.tech;
    return (
      <>
      <title>Nasa</title>
        <Link style={{ color: " #d6b3b3" }} to={{ pathname: `/home` }}>
          <button className="mars_back_btn">Back to Home</button>
        </Link>

        <hr></hr>
        <center>
          <iframe
            src="https://mars.nasa.gov/layout/embed/image/insightweather/"
            width="1000"
            height="600"
            scrolling="no"
            frameborder="0"
          ></iframe>
        </center>
        <br></br>

        {items.map((item) => (
          <div>
              <p>Patent Code: {item[1]}</p>
              <p>Patent Item: {item[2]}</p>
              <p>Description: {item[3]}</p>
          </div>
        ))}
      </>
    );
  }
}

export default Tech;
