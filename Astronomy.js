const mongoose = require('mongoose');
const db = 'mongodb+srv://Shaun_99:test123@cluster-demo-vmaa7.mongodb.net/Nasa?retryWrites=true&w=majority';
const path = require("path");
const express = require("express");
const app = express();

mongoose
  .connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  image       : { type: String },
  title       : { type: String },
  date        : { type: String },
  explanation : { type: String },
  userid      : { type: String }
});

const searchSchema = mongoose.Schema({
  searchKeyword   : { type: String },
  time            : { type: Date, default: Date.now },
  userid          : { type: String }
});

const userSchema = new mongoose.Schema({
	name      : { type: String },
	email     : { type: String },
	password  : { type: String },
	date      : { type: Date, default: Date.now }
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}

const Nasa    = mongoose.model('Nasa', schema, 'starsCollection');
const Search  = mongoose.model('Search_History', searchSchema);
const User    = mongoose.model("User", userSchema);

module.exports.Nasa   = Nasa;
module.exports.Search = Search;
module.exports.User   = User;