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
    email:String,
    messages:[{type:Schema.Types.ObjectId,ref:'Message'}]
});

var message = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    subject:{type:String,min:3},
    text:String,
    timestamp:Date
    //messages:[{subject:String,text:String,votes:Number,timestamp:Date}]
});

user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
    
var User = mongoose.model('User',user);
var Message = mongoose.model('Message',message);

module.exports.User = User;
module.exports.Message = Message;