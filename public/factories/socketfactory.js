module.factory('SocketFactory',function($resource){
    
    var factory={};
    //create client socket
    var socket = io();
    
    factory.notify;
    
    factory.getMessagesForUser = function() {
        return $resource('/app').get().$promise;
    }
    
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