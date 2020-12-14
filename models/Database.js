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
        
        let sql = "INSERT INTO users VALUES(?,?,?);";
        let data = [user.username, user.password, user.email];
        
        
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
                    username: element.username,
                    email: element.email,
                    password: element.password
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
    showUsers(){
        this.connection.query("SELECT * FROM users" , function(err, result, fields){
            if(err) throw err;
            console.log(result);
        })
    }
    
}

module.exports = Database;