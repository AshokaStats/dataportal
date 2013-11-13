/* Services */

angular.module('dataSetDataServices', ['ngResource']).
    factory('dataSetData', function($resource){  
  return $resource('dataa/:studentId.json', {}, {
    query: {method:'GET', params:{studentId:'datasetData'}, isArray:true}
  });
  
}).factory('getSurveyData', function($resource){  
 return $resource('/getSurveyData/', {flag: '2'}, {
    query: {method:'GET', params:{
    }, isArray:true}
  });
}).factory('getSurveyDataDrag', function($resource){  
 return $resource('/getSurveyData/', {flag: '3'}, { 
    query: {method:'GET', params:{}, isArray:true}
  });
})
