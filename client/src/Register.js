import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Popup from "react-popup";
import "./Popup.css";

// link this page to another page
import { Link } from "react-router-dom";

// Page for showing the recipe detail for selected food recipe with ingredients and publisher link
class Register extends Component {
  constructor() {
    super();
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const name = this.refs.name.value,
          email = this.refs.email.value,
          password = this.refs.password.value,
          cpassword = this.refs.cpassword.value;

    var emailExisted;

    // check if there is similar email in user table
    await axios
      .get(`/getSameEmail?email=${email}`)
      .then((result) => {
        console.log(result);
        if (result.data) {
          // email existed in database
          emailExisted = true;
        } else {
          // email not existed in database
          emailExisted = false;
        }
      })
      .catch((error) => {
        alert("Error: ", error);
      });

    if (!emailExisted) {
      if (password === cpassword) {
        if (password.length >= 8) {
          fetch("/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                name: name,
                email: email,
                password: password,
              },
            }),
          })
            .then((result) => {
              console.log(result);
              // clear form input
              this.refs.name.value = "";
              this.refs.email.value = "";
              this.refs.password.value = "";
              this.refs.cpassword.value = "";
              alert("Register Successful");
              window.location.href = "/login";
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          alert("Password should be at least 8 characters");
        }
      } else {
        alert("Password does not match");
      }
    } else {
      alert("Email already existed");
    }
  };

  componentDidMount = async () => {};

  render() {
    return (
      <div>
        <div className="registerbackground">
				<br/>
				<div className="register">
				<Link class="back_link" to="/">
						<img
							src="https://image.flaticon.com/icons/svg/2879/2879564.svg"
							width="40"
							height="auto"

						/>
				</Link>
				<form
        name="register_form"
        method="post"
        id="register_form"
        onSubmit={this.handleSubmit}
				>
				<center>
                <h2>Register</h2>
				</center>
				<br/>
        <div className="form-group">
            <label>Name</label>
            <input
                placeholder="Enter name"
                type="text"
                className="form-control"
                name="name"
                ref="name"
                required
            />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
              placeholder="Enter email"
              type="email"
              className="form-control"
              name="email"
              ref="email"
              required
            />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
                placeholder="Enter password"
                type="password"
                className="form-control"
                name="password"
                ref="password"
                required
              />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            placeholder="Enter confirm password"
            type="password"
            className="form-control"
            name="cpassword"
            ref="cpassword"
            required
          />
        </div>
				<br/>
				<center>
        <input
          id="search_submit_btn"
          class="registerbtn"
          type="submit"
          value="Register"
        />
				</center>
			
      </form>
			<br />
			{/* Login link */}
      <p class="text-center">
        Already have an account? &nbsp;
          <Link to="/login">
            Sign In here
          </Link>
      </p>
			</div>
			</div>
      </div>
    );
  }
}

export default Register;
