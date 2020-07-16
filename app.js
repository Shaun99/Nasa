const express = require("express");
const app     = express();
const axios   = require("axios");
const Nasa    = require("./Astronomy").Nasa;
const Search  = require("./Astronomy").Search;
const User    = require("./Astronomy").User;
const bcrypt  = require("bcryptjs");
var path = require("path");

// cookie parser
var cookieParser = require("cookie-parser");
app.use(cookieParser());

const api_key = "xzRsafyzbYcufAqZDbHji0PliFmIYjOtgUEUbOY5";
//const api_key = 'PjezYgmOkRjRlZQRhr0RlEvFmG4cIESPeVA2q1Mc';

//localhost:5000/getstar?title=date
app.get("/getstar", (req, res) => {
  var title = req.query.title;
  const querystr = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${title}`;

  axios
    .get(querystr)
    .then((response) => {
      const nasa = new Nasa({
        image       : response.data.url,
        title       : response.data.title,
        date        : response.data.date,
        explanation : response.data.explanation,
        userid      : req.cookies["uid"],
      });
      if (!nasa.title) {
        res.status(200).json("Not found");
        return;
      }
      nasa
        .save()
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
      res.send(response.data);
    })
    .catch((error) => {
      res.status(400).send(error.response.data);
    });
});

//localhost:5000/getstar?title=date
app.get("/gettech", (req, res) => {
  const querystr = `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${api_key}`;

  axios
    .get(querystr)
    .then((response) => {
      const tech = new Tech({
        tech       : response.data.results[0],
      });
      nasa
        .save()
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
      res.send(response.data);
    })
    .catch((error) => {
      res.status(400).send(error.response.data);
    });
});

//localhost:5000/getallstar
app.get("/getallstar", (req, res) => {
  Nasa.find({ userid: req.cookies["uid"] })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//localhost:5000/deletestar?title=date
app.get("/deletestar", (req, res) => {
  Nasa.deleteOne({ title: req.query.title })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.get("/saveSearch", (req, res) => {
  var title = req.query.title;

  const search = new Search({
    searchKeyword : title,
    userid        : req.cookies["uid"],
  });
  search
    .save()
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.get('/deletesearch', async (req, res) => {
  try{
    var title = req.query.title;
    res.send(await Search.findByIdAndDelete(req.query.title));
  }catch(err){
    res.send(err)
  } 
});

// post search history from database
app.post("/searchHistory", async (req, res) => {
  var data = await Search.find({ userid: req.cookies["uid"] });
  res.send(data);
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//localhost:5000/getSameEmail
app.get("/getSameEmail", (req, res) => {
  User.findOne({ email: req.query.email })
    .then((response) => {
      console.log(response);
      if (response) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//localhost:5000/register
app.post("/register", async (req, res) => {
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPsw = await bcrypt.hash(req.body.user.password, salt);

  const user = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: hashPsw,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).json(error);
  }
});

//localhost:5000/login
app.post("/login", async (req, res) => {
  // check if the user email is existed
  const user = await User.findOne({ email: req.body.user.email });
  if (!user) {
    return res.send(false);
  }

  //check if the password is correct
  const validPsw = await bcrypt.compare(req.body.user.password, user.password);
  if (!validPsw) {
    return res.send(false);
  }

  // save user id to cookie
  res.cookie("uid", user._id);
  res.cookie("uname", user.name);
  res.send(true);
});

app.post("/logout", async (req, res) => {
  // clear user id cookie
  res
    .clearCookie("uid")
    .clearCookie("uname")
    .send(true);
});

app.get("/getUsername", (req, res) => {
  //get the username and display on the homepage
  const username = req.cookies["uname"];
  res.send(username);
});

// heroku
if (process.env.NODE_ENV === "production") {
	// Exprees will serve up production assets
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);

});
