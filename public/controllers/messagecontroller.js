module.controller('MessageController',['$scope','$rootScope','SocketFactory',function($scope,$rootScope,SocketFactory){
    $scope.message = {};
    $scope.message.messages = [];
    $scope.message.isVisible = false;
    
    $scope.message.new = function() {
        
        $scope.message.isVisible = true;
    }
    
    $scope.message.send = function() {
        
        $scope.message.isVisible = false;
        var message = {
            subject:$scope.message.subject,
            text:$scope.message.text
        };
        SocketFactory.sendMessage(message);
    }
            
    SocketFactory.notify = function(data){
        //console.log('we received:' +data);
        $scope.message.messages.push(data);
        $scope.$apply();
    };
}]);