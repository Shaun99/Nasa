import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
  }
 
  render() {
    return (
    <>
      <div className=" container main_navHeader">
        <marquee behavior="scroll" direction="left" scrollamount="12">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/NASA_Worm_logo.svg/508px-NASA_Worm_logo.svg.png"
            width="10%"
          />
            &emsp; Welcome to National Aeronautics and Space Administration ! &emsp; 
            Get Ready to Explore by clicking Sign In or Register Now !
        
        </marquee>
      </div>   
      <div className=" text-center main_header">
        <br/>
          <img
            src="https://i.ya-webdesign.com/images/nasa-logo-transparent-background-png-2.png"
            width="30%"
            height="auto"
          />
        <br/>
          <h3 className="quote">
            “There is something in the sky awaiting discovery.” <br></br>― Steven Magee
          </h3>
        <br/>
        {/* Redirect user to register page */}
        <Link to='/register'>
          <button className="register_link_btn">
            Register
          </button>
        </Link>
            | 
        {/* Redirect user to login page */}
        <Link to='/login'>
          <button className="login_link_btn">
            Sign In
          </button>
        </Link>
         
      </div>
    </>
    );
  }
}

export default App;