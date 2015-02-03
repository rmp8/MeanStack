module.factory('SocketFactory',function(){
    
    var factory={};
    //create client socket
    var socket = io();
    
    factory.notify;
    
    //this will trigger when server broadcasts message
    //broadcast_msg
    socket.on('broadcast_msg',function(data){
        factory.notify(data);
    });
    
    factory.sendMessage = function(data) {
        socket.emit('new message',data);   
    }
    
    return factory;
});