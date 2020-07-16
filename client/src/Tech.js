import React, { Component } from "react";
import "./App.css";
import "react-table/react-table.css";
import axios from "axios";
import Popup from "react-popup";
import "./Popup.css";
import { Link } from "react-router-dom";

class Tech extends Component {
    render(){
       
        return(
          
            <>
            <Link style={{"color":" #d6b3b3"}}to = {{pathname: `/home`}}>
            <button className="mars_back_btn">
                Back to Home
            </button>
            </Link>
            
            <hr></hr>
            <center>
            <iframe src='https://mars.nasa.gov/layout/embed/image/insightweather/' width='1000' height='600'  scrolling='no' frameborder='0'></iframe>
            </center>
            <br></br>

           </>
        );
    }
}

export default Tech;