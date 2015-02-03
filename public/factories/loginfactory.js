module.factory('LoginFactory',['$resource',function($resource){
    
    var factory = {};
    
    factory.userLogin = function(userData){
        
        return $resource('/app/login',{},{post:{method:'POST'}}).post(userData).$promise;
    }
    
    factory.userRegister = function(userData){
        return $resource('/app/register',{},{post:{method:'POST'}}).post(userData).$promise;
    }
    
    return factory;
}]);