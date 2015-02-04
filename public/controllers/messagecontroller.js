module.controller('MessageController',['$scope','$rootScope','SocketFactory','LoginFactory',function($scope,$rootScope,SocketFactory,LoginFactory){
    
    $scope.message = {};
    $scope.message.messages = [];
    $scope.message.isVisible = false;
    $scope.message.name = LoginFactory.userName;
        
    SocketFactory.getMessagesForUser().then(function(data) {
        console.log(data);   
        $scope.message.messages = data.message[0].messages;
    });
                                            
    $scope.message.new = function() {
        
        $scope.message.isVisible = true;
    }
    
    $scope.message.send = function() {
        
        $scope.message.isVisible = false;
        var message = {
            subject:$scope.message.subject,
            text:$scope.message.text,
            timestamp:new Date()
        };
        SocketFactory.sendMessage(message);
    }
            
    SocketFactory.notify = function(data){
        //console.log('we received:' +data);
        $scope.message.messages.push(data);
        $scope.$apply();
    };
}]);