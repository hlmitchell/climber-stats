const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.pre('save', function(next){
  const that = this; 
  bcrypt.hash(that.password, SALT_WORK_FACTOR = 10)
  .then(function(hash){
    that.password = hash; 
    next();
  }).catch(function(err) {
    next(err);
  })
})

userSchema.methods.checkPassword = function(password) {
  const that = this;
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, that.password)
    .then(function(result) {
      resolve(result);
    }).catch(function(err) {
      reject(err);
    });
  });
};

module.exports = mongoose.model('User', userSchema);