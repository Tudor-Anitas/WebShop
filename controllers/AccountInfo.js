const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const Database = require('../models/Database.js');
const session = require('express-session');

const changeDetails = (req,res, next) =>{
    console.log(req.session.user.email);
    let db = new Database();

    if(req.body.password != ""){
        bcrypt.hash(req.body.password, 10, function(err, hash){
            if(err){
                throw err;
            }
            db.changePassword(req.session.user.email, hash);

        })
    }
    if(req.body.county != ""){
        db.changeCounty(req.session.user.email, req.body.county);
        req.session.user.county = req.body.county;
    }
    if(req.body.city != ""){
        db.changeCounty(req.session.user.city, req.body.city);
        req.session.user.city = req.body.city;
    }
    if(req.body.city_address != ""){
        db.changeCityAddress(req.session.user.city_address, req.body.city_address);
        req.session.user.city_address = req.body.city_address;
    }
    if(req.body.phone != ""){
        db.changeCityAddress(req.session.user.phone, req.body.phone);
        req.session.user.phone = req.body.phone;
    }
    res.render("home/");
}

module.exports = {
    changeDetails
}