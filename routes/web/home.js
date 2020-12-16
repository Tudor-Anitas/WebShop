var express = require("express");
var bcrypt = require('bcrypt');
var router = express.Router();
var bodyParser = require('body-parser');
// import the classes Database and User
var Database = require('../../models/Database.js');
const AuthController = require('../../controllers/AuthController.js')
const AccountInfo = require("../../controllers/AccountInfo.js");
// app/json parser
var jsonParser = bodyParser.json();
// urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

var session;

router.get("/", function(req,res){
    console.log("Start page :)")
    res.render("home/");
})

router.get("/login", function(req,res){
    res.render("home/login")
})
router.post("/login", urlencodedParser, AuthController.login)

router.get("/signup", function(req,res){
    res.render("home/signup")
})

router.post("/signup", urlencodedParser, AuthController.register)

router.get("/dashboard", function(req,res){
    console.log("dashboard");
    console.log(req.session);
    if(!req.session.user){
        return res.status(301).redirect("/login");
    }
    res.locals.user = req.session.user;
    return res.status(200).render("home/dashboard");
})
router.get("/modify", function(req,res){
    
    if(!req.session.user){
        return res.status(301).redirect("/login");
    }
    console.log("Modify get");
    
    return res.status(200).render("home/modify")
})
router.post("/modify", urlencodedParser, AccountInfo.changeDetails)

router.get("/clothing/hoodies", function(req,res){
    res.status(200).render("home/clothing/hoodies");
})
module.exports = router;