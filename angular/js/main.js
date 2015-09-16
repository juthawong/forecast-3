var APP = angular.module('APP', []);

APP.filter('split', function () {
    
    return function (text) {
        return text.split('').join('_');
    };
    
});

APP.ApplicationCtrl = function ($scope) {
    
    $scope.name = 'Hello World';
    
};