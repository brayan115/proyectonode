const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  local: {
    nombre:String,
    apellido:String,
    dni:String,
    edad:Number,
    celular:Number,
    email: String,
    password: String

  },
  facebook: {
    nombre:String,
    apellido:String,
    dni:String,
    edad:Number,
    celular:Number,
    email: String,
    password: String
  },
  twitter: {
    nombre:String,
    apellido:String,
    dni:String,
    edad:Number,
    celular:Number,
    email: String,
    password: String
  },
  google: {
    nombre:String,
    apellido:String,
    dni:String,
    edad:Number,
    celular:Number,
    email: String,
    password: String
  }
});

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for user and expose it to our app
module.exports = mongoose.model('User', userSchema);