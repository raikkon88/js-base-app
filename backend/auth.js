// auth.js
var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('./service');
let bcrypt = require('bcrypt');
let config = require('./config');

exports.emailSignup = function(req, res) {

    /** 
     * Put your sign up code here. 
     * 
     * Here you have an example.... 
     */

    /* NOT WORK'S! YOU MUST HAVE TO MODIFY!!!
    
    bcrypt.hash(req.password, config.SALT, function(err, password){
        console.log(password);
        var user = new User({
            user_name: req.name,
            user_email: req.email,
            user_password: password
            
        });
        user.save(function(err){
            return res
                .status(200)
                .send({token: service.createToken(user)});
        });
    }); 
    */
};

exports.emailLogin = function(req, res) {
    User.findOne({'user_email': req.body.user_nameOrEmail}).exec(function(err, user){
        if(!user){
            return res.status(401).send("Invalid user or password.");
        }
        else{    
            bcrypt.compare(req.body.user_password, user.user_password, function (err, result){
                if(result){
                    return res
                        .status(200)
                        .send({token: service.createToken(user)});
                }
                else{
                    return res.status(401).send("Invalid user or password.");
                }
            });
        }
    });
};