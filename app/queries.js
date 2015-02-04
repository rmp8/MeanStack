var User = require('./database').User;
var Message = require('./database').Message;

//Use this for store new user for our application
module.exports.registerUser = function(req,res){
    
    var user = new User();
    user.name = req.body.username;
    user.password = user.generateHash(req.body.password);
    user.email = req.body.email;
    
    //Store model in database
    user.save(function(err){
        if(err){
            res.send({status:'Error'})
        }
        else{
            res.send({status:'Ok'});
        }
    });
}

module.exports.saveMessage = function(data,req) {
    User.findOne({name:req.session.user}).exec(function(err,user){
        var message = new Message();
        message.owner = user;
        message.subject = data.subject;
        message.text = data.text;
        message.timestamp = data.timestamp;
        message.save();
        user.messages.push(message);
        user.save();
    });
        
}

module.exports.getMessagesForUser = function(req,res) {
    
    var options = {
        path:'messages',
        //match: {subject:'Hello'},
        options:{limit:3},
        sort:{-id: -1} //descending
    }
    
    var query = User.find({name:req.session.user}).populate(options);   
    query.exec(function(err,data){
        console.log(data);
        res.send({messages:data});
    });
}