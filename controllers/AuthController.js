const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const Database = require('../models/Database.js');
const session = require('express-session');



const register = (req, res, next) =>{
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){
            throw err;
        }
        let user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            county: req.body.county,
            city: req.body.city,
            phone: req.body.phone
        })
        req.session.user = user;
        let db = new Database();
        db.addUser(user);
        res.render('home/');
    })
}

const login = (req, res, next) =>{
    var email = req.body.email;
    var password = req.body.password;

    let db = new Database();
    db.returnUser(email, req);
    db.checkPassword(email, password, res);

    
}
module.exports = {
    register, login
}