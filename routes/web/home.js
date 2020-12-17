var express = require("express");
var bcrypt = require('bcrypt');
var router = express.Router();
var bodyParser = require('body-parser');
// import the classes Database and User
var Database = require('../../models/Database.js');
const AuthController = require('../../controllers/AuthController.js')
const AccountInfo = require("../../controllers/AccountInfo.js");
const { connection } = require("mongoose");
const { db } = require("../../models/User.js");
// app/json parser
var jsonParser = bodyParser.json();
// urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

var session;

router.get("/", function(req,res){
    console.log("Start page :)")
    res.render("home/");
})
// ________________________________________ User account 
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

// ________________________________________________ Subcategories of items

// _____________________ Clothing
router.get("/clothing/hoodies", function(req,res){
    let db = new Database();
    db.showSubCategory('clothing','hoodies',res);   
})
router.get("/clothing/tshirts", function(req,res){
    let db = new Database();
    db.showSubCategory('clothing','tshirts',res);
})
router.get("/clothing/jeans", function(req,res){
    let db = new Database();
    db.showSubCategory('clothing','jeans',res);
})
router.get("/clothing/pants", function(req,res){
    let db = new Database();
    db.showSubCategory('clothing','pants',res);
})
router.get("/clothing/shorts", function(req,res){
    let db = new Database();
    db.showSubCategory('clothing','shorts',res);
})
router.get("/clothing/hats", function(req,res){
    let db = new Database();
    db.showSubCategory('clothing','hats',res);
})
router.get("/clothing/street-jackets", function(req,res){
    let db = new Database();
    db.showSubCategory('clothing','street-jacket',res);
})
router.get("/clothing/rain-jackets", function(req,res){
    let db = new Database();
    db.showSubCategory('clothing','rain-jacket',res);
})

// _____________________ Shoes
router.get("/shoes/skate-shoes", function(req,res){
    let db = new Database();
    db.showSubCategory('shoes','skate-shoes',res);
})
router.get("/shoes/slip-ones", function(req,res){
    let db = new Database();
    db.showSubCategory('shoes','slip-ones',res);
})
router.get("/shoes/sneakers", function(req,res){
    let db = new Database();
    db.showSubCategory('shoes','sneakers',res);
})
router.get("/shoes/snowboard-boots", function(req,res){
    let db = new Database();
    db.showSubCategory('shoes','snowboard-boots',res);
})
router.get("/shoes/ski-boots", function(req,res){
    let db = new Database();
    db.showSubCategory('shoes','ski-boots',res);
})

// _____________________ Accessories
router.get("/accessories/sunglasses", function(req,res){
    let db = new Database();
    db.showSubCategory('accessories','sunglasses',res);
})
router.get("/accessories/backpacks", function(req,res){
    let db = new Database();
    db.showSubCategory('accessories','backpacks',res);
})
router.get("/accessories/belts", function(req,res){
    let db = new Database();
    db.showSubCategory('accessories','belts',res);
})
router.get("/accessories/socks", function(req,res){
    let db = new Database();
    db.showSubCategory('accessories','socks',res);
})
router.get("/accessories/wallets", function(req,res){
    let db = new Database();
    db.showSubCategory('accessories','wallets',res);
})
module.exports = router;