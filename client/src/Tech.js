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
        <br/>
        <hr/>
        <center>
       
        <h2>  
          <img
						src="https://image.flaticon.com/icons/svg/3203/3203410.svg"
						width="40"
						height="auto"
					/> 
          &nbsp; - Nasa Tech Transfer Info - &nbsp;
          <img
						src="https://image.flaticon.com/icons/svg/3203/3203410.svg"
						width="40"
						height="auto"
					/>  
          </h2>
        </center>
        <hr/>
        {items.map((item) => (
          <div className="tech">
              <p><b className="techinfo">Patent Code: </b> {item[1]}</p>
              <p><b className="techinfo">Patent Item: </b> {item[2]}</p>
              <p><b className="techinfo">Description: </b><br/> {item[3]}</p>
          </div>
        ))}
      </>
    );
  }
}

export default Tech;
