import React, { Component } from "react";
import "./App.css";
import "react-table/react-table.css";
import axios from "axios";
import Popup from "react-popup";
import "./Popup.css";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      stars   : [],
      Loading : false,
      value   : "",
      username: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAllStars = () => {
    axios
      .get("/getallstar")
      .then((result) => {
        this.setState({ Loading: true, stars: result.data });
        console.log(this.state.stars);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = async () => {
    this.getAllStars();
    const query_uname = `/getUserName`;
    console.log(query_uname);
    await axios
      .get(query_uname)
      .then((result) => {
        console.log(result);
        this.setState({ username: result.data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // empty input
    if (this.input.value.trim() === "") {
      Popup.alert("Empty input");
      return;
    } else {
      this.setState({ Loading: false });
    }
    // display the data
    const query = `/getstar?title=${this.input.value}`;
    console.log(query);
    axios
      .get(query)
      .then((result) => {
        console.log(result);

        result.data["image"] = result.data["url"];
        this.setState({
          Loading: true,
          stars: [...this.state.stars, result.data]
        });
      })
      .catch((error) => {
        Popup.alert(error.response.data.msg);
        console.log(error.response.data.msg);
        this.setState({ Loading: true });
      });
    // Save search keyword in history
    const query1 = `/saveSearch?title=${this.input.value}`;
    console.log(query1);
    axios
      .get(query1)
      .then((result) => {
        
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Delete the search history
  deleteRecord = (title) => {
    console.log("to delete: ", title);
    const query = `/deletesearch?title=${title}`;
    axios
      .get(query)
      .then((result) => {
        this.getAllStars();
      })
      .catch((error) => {
        alert("Error: ", error);
      });
  };

  //Delete the astronomy post
  removeStars(title) {
    this.setState({
      items: this.state.stars.filter((item) => {
        if (item.title !== title) return item;
      }),
    });
    const query = `/deletestar?title=${title}`;
    axios
      .get(query)
      .then((result) => {
        this.getAllStars();
      })
      .catch((error) => {
        alert("Error: ", error);
      });
  }

  render() {
    var items = this.state.stars.reverse();
    var username = this.state.username;
    console.log(items);

    return (
      <div className="App">
        <div className= "container home_navHeader">
          <div className= "username">
            <h2>Welcome, {username}</h2>
          </div>
        
          {/* Logout button */}
          <div className="logout">
            <Link to="/logout">
              <button class="manage_btn btn btn-danger btn-lg">Logout</button>
            </Link>
          </div>
       
          {/* Search History button */}
          <div className="historybtn">
            <Link to="/history">
              <button class="manage_btn btn btn-primary btn-lg">Manage Search History</button>
            </Link>
          </div>
        </div>

        <div className="jumbotron text-center home_header">
          <br/>
          <img
            src="https://i.ya-webdesign.com/images/nasa-logo-transparent-background-png-2.png"
            width="30%"
            height="auto"
          ></img>
          <p>Search for Astronomy Picture of the Day (APOD)</p>
          <div className="col-sm-8">
            <div className="container search">
              <form onSubmit={this.handleSubmit}>
                <label>Enter the date:</label>
                <div className="display">
                  <input
                    placeholder=" Sample Format: YYYY-MM-DD"
                    type="text"
                    class="form-control"
                    ref={(input) => (this.input = input)}
                  />
                  &emsp;
                  <input className="reset" type="reset" value="Clear" />
                </div>
                <input type="submit" value="Search" className="submitBtn" />
              </form>
            </div>
            <div>
              <Popup />
            </div>
          </div>
          <div className="col-sm-1">
            <div className="text">OR</div>
          </div>
          <div className="col-sm-3">
            {/* View Mars Weather button */}
            <Link style={{ color: "white" }} to={{ pathname: `/tech` }}>
              <button className="marsbtn">
                Click here to view Mars Weather and TechTransfer 
              </button>
            </Link>
          </div>
        </div>

        {this.state.Loading ? (
          ""
        ) : (
          <button className="loadingBtn" type="button" disabled>
            Loading... Please Wait
          </button>
        )}
        <br/>

        <div className="container">
          <div className="col-sm-12">
            {items.map((item) => (
              <div>
                <div class="item" key={item.id}>
                  <img
                    class="item_head"
                    src={item.image}
                    width="70%"
                    height="auto"
                    alt="Star Image"
                  />
                  <h2>{item.title}</h2>
                  <p className="">{item.date}</p>
                  <p className="explanation">{item.explanation}</p>
                  <hr/>
                  <button
                    className="delete"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this post?"
                        )
                      ) {
                        this.removeStars(item.title);
                      }
                    }}
                  >
                    Delete Post
                  </button>
                </div>
                <Popup />
                <br/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
