// import mysql module
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const User = require('./User');

class Database{

    constructor(){

        // mysql config
        this.connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            database: 'shop',
            user: 'root',
            password: 'qazxswedc'
        });
                    
        // executing connection
        this.connection.connect(function(err){
            if(err) throw err;
            console.log("Connected to the database");
        });
    }

    addUser(user){
        
        let sql = "INSERT INTO users VALUES(?,?,?,?,?,?,?,?);";
        let data = [user.firstname, user.lastname, user.password, user.email, user.county, user.city, user.city_address, user.phone];
        
        
        this.connection.query(sql, data, function(err, result, fields){
            if(err) throw err;
            console.log(result);
        })
    }
    returnUser(email, req){
        // find the account by the email in the database
        this.connection.query("SELECT * FROM users WHERE email = '" + email + "'", function(err, result, fields){
            if(err) throw err;
            
            // iterate in the result set to get the account information
            result.forEach(element => {
                var user = {
                    firstname: element.first_name,
                    lastname: element.last_name,
                    email: element.email,
                    password: element.password,
                    county: element.county,
                    city: element.city,
                    city_address: element.city_address,
                    phone: element.phone
                }

                req.session.user = user;
            });
        });
    }

    // search if a password exists in the database
    checkPassword(email, password, res){
        this.connection.query("SELECT * FROM users WHERE email = '" + email + "'", function(err, result, fields){
            if(err) throw err;
            // iterate in the result set to get the hashed password
            result.forEach(element => {
                bcrypt.compare(password, element.password, function(err, result) {
                    if(result == true){
                        console.log('Login successfull!');
                        res.render('home/');
                    }
                    else{
                        console.log('Incorrect password');
                        res.render("home/login");    
                    }
                })
                
            });
        });
    }

    changePassword(email, newPassword){
        this.connection.query("UPDATE users SET password = '" + newPassword + "' WHERE email ='" + email + "';", function(err,result){
            if(err) throw err;
        })
    }
    changeCounty(email, newCounty){
        this.connection.query("UPDATE users SET county = '" + newCounty + "' WHERE email ='" + email + "';", function(err,result){
            if(err) throw err;
        })
    }
    changeCity(email, newCity){
        this.connection.query("UPDATE users SET city = '" + newCity + "' WHERE email ='" + email + "';", function(err,result){
            if(err) throw err;
        })
    }
    changeCityAddress(email, newAddress){
        this.connection.query("UPDATE users SET city_address = '" + newAddress + "' WHERE email ='" + email + "';", function(err,result){
            if(err) throw err;
        })
    }
    changePhone(email, newPhone){
        this.connection.query("UPDATE users SET phone = '" + newPhone + "' WHERE email ='" + email + "';", function(err,result){
            if(err) throw err;
        })
    }
    showUsers(){
        this.connection.query("SELECT * FROM users" , function(err, result, fields){
            if(err) throw err;
            console.log(result);
        })
    }
    
}

module.exports = Database;