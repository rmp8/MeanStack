var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/mean_stack',function(err,success){
    
    if(err){
        console.log(err + " check that your mongodb is running.");
    }
    else{
        console.log('We are connected to database');
    }
});

var Schema = mongoose.Schema;

var user = new Schema({
    name:{type:String,unique:true},
    password:String,
    email:String
});

user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var message = new Schema({
    owner:String,
    messages:[{subject:String,text:String,votes:Number,timestamp:Date}]
});
    
var User = mongoose.model('User',user);

module.exports.User = User;