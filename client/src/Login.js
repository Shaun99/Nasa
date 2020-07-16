import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Popup from "react-popup";
import "./Popup.css";

// link this page to another page
import { Link } from "react-router-dom";



// Page for showing the recipe detail for selected food recipe with ingredients and publisher link
class Login extends Component {
	constructor() {
		super();
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const email = this.refs.email.value,
			password = this.refs.password.value;

		await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: {
					email: email,
					password: password,
				},
			}),
		})
			.then((res) => {
				console.log(JSON.stringify(res.headers));
				return res.json();
			})
			.then((jsonData) => {
				console.log(jsonData);
				if (jsonData) {
					alert("Login successful");
					window.location.href = "/home";
				} else {
					alert("Email or password is incorrect");
				}
			})
			.catch((error) => {
				alert("Error: " + error);
			});
	};

	componentDidMount = async () => {};

	render() {
		return (
			
			<div>
				<div className="loginbackground">
				<br></br>
				<div className="login">
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
                <h2>Sign In</h2>
				</center>
				<br/>
                <div className="form-group">
                    <label>Email address</label>
					<input type="email" 
					className="form-control" 
					placeholder="Enter email"  
					name="email"		
					ref="email"
					required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
					<input type="password" 
					className="form-control" 
					placeholder="Enter password" 
					name="password"
					ref="password"
					required/>
                </div>
				<br/>
				<center>
				<input
					id="search_submit_btn"
					class="loginbtn"
					type="submit"
					value="Login"
				/>
				</center>
			
            </form>
			<br />
			{/* Register link */}
			<p class="text-center">
			Don't have an account yet? &nbsp;
			<Link to="/Register">
				 Register here
			</Link>
			</p>
			</div>
			</div>
	
			</div>
		);
	}
}

export default Login;