var express = require("express");
var path = require("path");
var session = require("express-session");

var app = express();


// set the port of the application
app.set("port", process.env.PORT || 5000);

// set the view engine
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");

// set the session
app.use(session({
    secret: "43F$dR%^fDFS2es%GFS4dyh",
    resave: false,
    saveUninitialized: true
}));

// routes of the URL
app.use("/", require("./routes/web"));



// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));

app.listen(app.get("port"), function(){
    console.log("Server started at port " + app.get("port"))
});