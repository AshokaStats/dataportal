
angular.module('AshokaApp', ['ui.bootstrap', 'dataSetDataServices', 'ngDragDrop']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
     	 when('/', {
            templateUrl: 'partials/homepage.html',
            controller: 'ContactController'
        }).
        when('/about', {
            templateUrl: 'partials/aboutpage.html',
            controller: 'aboutController'
        }).
        when('/data', {
            templateUrl: 'partials/datapage.html',
            controller: 'dataPageController'
        }).
        when('/inifini', {
            templateUrl: 'partials/infinitipage.html',
            controller: 'infinitiPageController'
        })
}]);      
      
      
    