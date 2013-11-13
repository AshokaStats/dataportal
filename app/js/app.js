angular.module('AshokaApp', ['ui.bootstrap', 'dataSetDataServices', 'ngDragDrop']).
config(['$routeProvider', '$locationProvider', 
    function ($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/homepage.html',
            controller: 'ContactController'
        }).
        when('/about', {
            templateUrl: 'partials/aboutpage.html',
            controller: 'ContactController'
        }).
        when('/data', {
            templateUrl: 'partials/datapage.html',
            controller: 'dataPageController'
        }).
        when('/inifini', {
            templateUrl: 'partials/infinitipage.html',
            controller: 'ContactController'
        });
        
    }
]);