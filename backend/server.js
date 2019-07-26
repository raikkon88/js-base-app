const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let User = require('./models/user.model');
let bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const serverRoutes = express.Router();
const publicRoutes = express.Router();
const config = require('./config');
const auth = require('./auth');
const mongourl = "127.0.0.1:27017";

var middleware = require('./middleware');
serverRoutes.use(middleware.ensureAuthenticated);

const app = express();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

publicRoutes.post('/auth/login', auth.emailLogin);
publicRoutes.post('/auth/signup', auth.emailSignup);

mongoose.connect('mongodb://' + mongourl + "/" + config.DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

publicRoutes.route('/').get(function(req, res) {
  /** 
   * Put your code to return objects on the public routes.
   */
  res.json({"result": "this is a public text"});
});

serverRoutes.route('/').get(function(req, res){
  /**
   * Put your code to return objects on the private routes. 
   */
  res.json({"result": "this is a private text"});
})

app.use('/admin', serverRoutes, middleware.ensureAuthenticated);
app.use('/', publicRoutes);

app.listen(PORT, function() {

  User.find({}).exec(function(err, users){
    if(users.length === 0){
      // Create a default user
      bcrypt.hash(config.DEFAULT_PASSWORD, config.SALT, function(err, password){
        var user = new User({
            user_name: config.DEFAULT_USERNAME,
            user_email: config.DEFAULT_EMAIL,
            user_password: password
            
        });
        user.save(function(err){
          console.log('Admin user has been created with login : {user_email:"admin@admin.adm", user_password:"admin"}');
        });
      }); 
    }  
  });

  console.log("Server is running on Port: " + PORT);
});
