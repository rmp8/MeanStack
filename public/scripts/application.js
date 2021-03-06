var module = angular.module('MeanStack',['ngRoute','ngResource']);

module.config(function($routeProvider){
    
   
    $routeProvider.when('/',{
        templateUrl:'partials/login.html',
        controller:'LoginController'
    }); /**/
    
    $routeProvider.when('/user',{
        templateUrl:'partials/userdata.html',
        controller:'MessageController',
        //resolve:{loginRequired:loginRequired}
    })
    
    $routeProvider.otherwise({redirectTo: '/'});
});

function loginRequired($location, $q,$rootScope){
    
    var deferred = $q.defer();

    if(!$rootScope.isAuthenticated) {
        deferred.reject()
        $location.path('/');
    } else {
        deferred.resolve()
    }

    return deferred.promise;
}

