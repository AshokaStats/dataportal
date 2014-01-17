/* Services */

angular.module('dataSetDataServices', ['ngResource'])
.factory('dataSetData', function($resource){  
  return $resource('/getChartData', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
  
})
.factory('getSectors', function($resource){  
 return $resource('/getSectors', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('getCountries', function($resource){  
 return $resource('/getCountries', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('getCountryDetails', function($resource){  
 return $resource('/getCountryDetails', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('getSectorDetails', function($resource){  
 return $resource('/getSectorData', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('getYears', function($resource){  
 return $resource('/getYears', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('getSurveyData', function($resource){  
 return $resource('/getSurveyData', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('getSurveyDataDrag', function($resource){  
 return $resource('/getSurveyData/', {flag: '3'}, { 
    query: {method:'GET', params:{orderby1:''}, isArray:true}
  });
})
.factory('cntryDesc', function($resource){  
return $resource('/getCountryDescription', {}, {
        query: {
            method: 'GET',
            params: {
               
            },
            isArray: true
        }
    });
<<<<<<< HEAD
})
.factory('getSurveyDataDrag', function($resource){  
 return $resource('/getSurveyData/', {flag: '3'}, { 
    query: {method:'GET', params:{}, isArray:true}
  });
})


;
=======
}).factory('getSurveyDataActions', function($resource){  
 return $resource('/getSurveyDataActions', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
});
>>>>>>> Develop

