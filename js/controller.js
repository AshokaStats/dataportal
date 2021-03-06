<<<<<<< HEAD
function ContactController($scope, $location, dataSetData) {
	//$scope.datasets = dataSetData.query();
	$scope.acc2open = true;
	$scope.$on('$viewContentLoaded', addControls());
    $scope.activePath = null;
  	$scope.$on('$routeChangeSuccess', function(){
    	$scope.$parent.activePath ="#"+ $location.path();
  	});
  var labelsArr = '{labels : [', datasetsArr = 'datasets : [{"data":[', yearArr = new Array(), countryArr = new Array(), Series=" [", Category=" [";
	dataSetData.query(function(data)
	{
  //Category
		for(rowIndex in data)
		{
			if(!isPresent(data[rowIndex].year,yearArr)){
				yearArr.push(data[rowIndex].year);	
				Category=Category+JSON.stringify(data[rowIndex].year)+",";	
			}
			if(!isPresent(data[rowIndex].Country,countryArr)){
				countryArr.push(data[rowIndex].Country);	
			}
		}
		Category=Category.substring(0,Category.length-1);
		Category=Category+"]";
		Category=Category.replace(/"/g,"");
		//Series
		for(countryIndex in countryArr)
			{
				Series=Series+"{\"name\":"+JSON.stringify(countryArr[countryIndex])+", \"data\": [";
				var data1="";
				for(rowIndex in data)
				{
					if(JSON.stringify(data[rowIndex].Country)==JSON.stringify(countryArr[countryIndex])){
						data1=data1+JSON.stringify(data[rowIndex].population)+",";
					}
					else{
						rowIndex=rowIndex+yearArr.length;
					}
					data1=data1.replace(/"/g,"");
				}
			Series=Series+data1;
			Series=Series.substring(0,Series.length-1);	
			//console.log("series is :"+Series);
			Series=Series+"]},";
			}	
			Series=Series.substring(0,Series.length-1);	
		  Series=Series+"]";
		var options={
		   chart: {type: 'line'},
           title: {text: 'Worldwide Population Growth'},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
           	formatter: function() {
           		//console.log(this.value);
           		return this.value / 1000;}
           }},
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           area: {
           	stacking: 'normal',
           	lineColor: '#666666',
           	lineWidth: 1,
           	marker: {
           		lineWidth: 1,
           		lineColor: '#666666'
           		}}},
           series: JSON.parse(Series)
           };
           var optionsBar={
		   chart: {type: 'bar'},
           title: {text: 'Worldwide Population Growth'},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
           	formatter: function() {
           		//console.log(this.value);
           		return this.value / 1000;}
           	}
           	},
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           series: {
                    stacking: 'normal'
                }
           },
           series: JSON.parse(Series)
           };
        //HighCharts
			 jQuery('#TC1').highcharts(options);
			 jQuery('#TC2').highcharts(optionsBar);
	 
});	
};

function aboutController($scope, $http, $modal, $location, dataSetData) {
	$scope.acc2open = true;
	$scope.$on('$viewContentLoaded', addControls());
    $scope.activePath = null;
  	$scope.$on('$routeChangeSuccess', function(){
    	$scope.$parent.activePath ="#"+ $location.path();
  	});
  var labelsArr = '{labels : [';
	var datasetsArr = 'datasets : [{"data":[';
	var yearArr = new Array();
	var countryArr = new Array();
	var Series=" [";
	var Category=" [";
	dataSetData.query(function(data)
	{
		//Category
		for(rowIndex in data)
		{
			if(!isPresent(data[rowIndex].year,yearArr)){
				yearArr.push(data[rowIndex].year);	
				Category=Category+JSON.stringify(data[rowIndex].year)+",";	
			}
			if(!isPresent(data[rowIndex].Country,countryArr)){
				countryArr.push(data[rowIndex].Country);	
			}
		}
		Category=Category.substring(0,Category.length-1);
		Category=Category+"]";
		Category=Category.replace(/"/g,"");
		//Series
		for(countryIndex in countryArr)
			{
				Series=Series+"{\"name\":"+JSON.stringify(countryArr[countryIndex])+", \"data\": [";
				var data1="";
				for(rowIndex in data)
				{
					if(JSON.stringify(data[rowIndex].Country)==JSON.stringify(countryArr[countryIndex])){
						data1=data1+JSON.stringify(data[rowIndex].population)+",";
					}
					else{
						rowIndex=rowIndex+yearArr.length;
					}
					data1=data1.replace(/"/g,"");
				}
			Series=Series+data1;
			Series=Series.substring(0,Series.length-1);	
			//console.log("series is :"+Series);
			Series=Series+"]},";
			}	
			Series=Series.substring(0,Series.length-1);	
		Series=Series+"]";
	var options={
		   chart: {type: 'column'},
           title: {text: 'Worldwide Population Growth'},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
           	formatter: function() {
           		//console.log(this.value);
           		return this.value / 1000;}
           	}
           	},
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           area: {
           	stacking: 'normal',
           	lineColor: '#666666',
           	lineWidth: 1,
           	marker: {
           		lineWidth: 1,
           		lineColor: '#666666'
           		}
           	 }
           },
           series: JSON.parse(Series)
           };
           var optionsBar={
		   chart: {type: 'area'},
           title: {text: 'Worldwide Population Growth'},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
           	formatter: function() {
           		return this.value / 1000;}
           	}
           	},
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           series: {
                    stacking: 'normal'
                }
           },
           series: JSON.parse(Series)
           };
        //HighCharts
			 jQuery('#TestiChart1').highcharts(options);
			 jQuery('#TestiChart2').highcharts(optionsBar);
});	
};

function dataPageController($scope, $http, $modal, $location, getSurveyData, getSurveyDataDrag, getCountryDetails, cntryDesc) {
//    $scope.datasets = dataSetData.query();
	cntryDesc.query(function(data){
	$scope.datasets = data;
   // Pagination
    $scope.pageSize = 3;
    var intialPageSize = data.length;
    $scope.shLess = false;
    $scope.shMore = true;
    $scope.nxtPage = function (num) {
      if($scope.pageSize==$scope.intialPageSize){
         $scope.recordsShown=$scope.pageSize;
         $scope.shMore = false;
      }else{
        var EndPageSize = $scope.datasets.length - num;
        $scope.recordsShown=intialPageSize;
        if (($scope.pageSize - intialPageSize) == intialPageSize) {
            $scope.shMore = false;
        }
        if (EndPageSize > 0) {
            $scope.pageSize = num + 3;
            $scope.shLess = true;
        }
      }
    };
    $scope.prevPage = function (num) {
      if($scope.pageSize<=3){
        $scope.recordsShown=$scope.pageSize;
         $scope.shLess = false;
      }else{
        $scope.recordsShown=intialPageSize;
         if (($scope.pageSize - intialPageSize) == intialPageSize) {
            $scope.shLess = false;
        }
        if (num != intialPageSize) {
            $scope.pageSize = num - 3;
            $scope.shMore = true;
        }
      }
    };
// Pagination Ends
	}); 
	getCountryDetails.query(function(data){
	$scope.projects = data;
	});
=======
var surveyDataGlobal, sectorLis, countryChartData, sectorChartData, ChartHeader;

function ContactController($scope, $location, getSurveyDataActions, getSectors) {

    $scope.acc2open = true;
    $scope.$on('$viewContentLoaded', addControls());
    $scope.activePath = null;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.$parent.activePath = "#" + $location.path();
    });
    getSectors.query(function (data) {
        sectorList = data;
        for (rowIndex in data) {
            var name = JSON.stringify(data[rowIndex].name);
            name = name.replace(/"/g, "");
            $("#sectorSelectBox").append("<option value=" + JSON.stringify(data[rowIndex].id) + ">" + name + "</option>");
        }
        getSurveyDataActions.query({
            changeOrderBy: '77' //used to show the home and about page charts
        }, function (surveyData) {
            var typeofchart = checkCookie();
            surveyDataGlobal = surveyData;
            var name = JSON.stringify(data[0].name);
            name = name.replace(/"/g, "");
            if (typeofchart) {
                chartOpens1("topChart", typeofchart, name + " Stats", JSON.stringify(data[0].id), surveyData);
            } else {
                chartOpens1("topChart", "bar", name + " Stats", JSON.stringify(data[0].id), surveyData);
            }
            var radio = $("input:radio[name ='chartType']");
            for (i in radio) {
                if (radio[i].value == typeofchart) {
                    radio[i].checked = true;
                    break;
                }
            }
        });
    });
};

function aboutController($scope, $location, getSurveyDataActions, getSectors) {
    $scope.acc2open = true;
    $scope.$on('$viewContentLoaded', addControls());
    $scope.activePath = null;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.$parent.activePath = "#" + $location.path();
    });
    getSectors.query(function (data) {
        sectorList = data;
        //alert(SurveyDataService.data);
        for (rowIndex in data) {
            var name = JSON.stringify(data[rowIndex].name);
            name = name.replace(/"/g, "");
            $("#sectorSelectBox").append("<option value=" + JSON.stringify(data[rowIndex].id) + ">" + name + "</option>");
        }

        getSurveyDataActions.query({
            changeOrderBy: '77' //used to show the home and about page charts
        }, function (surveyData) {
            var typeofchart = checkCookie();
            surveyDataGlobal = surveyData;
            var name = JSON.stringify(data[0].name);
            name = name.replace(/"/g, "");
            if (typeofchart) {
                chartOpens1("topChart", typeofchart, name + " Stats", JSON.stringify(data[0].id), surveyData);
            } else {
                chartOpens1("topChart", "bar", name + " Stats", JSON.stringify(data[0].id), surveyData);
            }
            var radio = $("input:radio[name ='chartType']");
            for (i in radio) {
                if (radio[i].value == typeofchart) {
                    radio[i].checked = true;
                    break;
                }
            }
        });
    });

};

function dataPageController($scope, $http, $modal, $location, getSurveyDataActions, getSurveyDataActions, getCountryDetails, cntryDesc, getSectors) {

    cntryDesc.query(function (data) {
        $scope.datasets = data;

        /*for (var i in datasets) {
                    console.log(datasets[i]);
        }*/

        // Pagination
        $scope.pageSize = 3;
        var intialPageSize = data.length;
        $scope.shLess = false;
        $scope.shMore = true;
        $scope.recordsShown = 3;
        $scope.nxtPage = function (num) {
            if ($scope.pageSize == $scope.intialPageSize) {
                $scope.shMore = false;
            } else {
                var EndPageSize = $scope.datasets.length - num;
                if (($scope.pageSize - intialPageSize) == intialPageSize) {
                    $scope.shMore = false;
                }
                if (EndPageSize > 0) {
                    $scope.pageSize = num + 3;
                    $scope.shLess = true;
                }
            }
            if ($scope.pageSize > intialPageSize) {
                $scope.recordsShown = intialPageSize;
            } else {
                $scope.recordsShown = $scope.pageSize;
            }
        };
        $scope.prevPage = function (num) {
            if ($scope.pageSize <= 3) {
                $scope.shLess = false;
            } else {
                if (($scope.pageSize - intialPageSize) == intialPageSize) {
                    $scope.shLess = false;
                }
                if (num != intialPageSize) {
                    $scope.pageSize = num - 3;
                    $scope.shMore = true;
                }
            }

            if ($scope.pageSize > intialPageSize) {
                $scope.recordsShown = intialPageSize;
            } else {
                $scope.recordsShown = $scope.pageSize;
            }

        };
        // Pagination Ends
    });

    getCountryDetails.query(function (data) {
        $scope.projects = data;
        // for(var i in data){
        //     console.log(data[i]);
        // }
    });

    getSectors.query(function (data) {
        sectorList = data;
    });

>>>>>>> Develop
    // DataSet 'I'
    //Accordion Starts
    $scope.displayData = function (idd) {
        for (i in $scope.datasets) {
            if ($scope.datasets[i].id == idd) {
                $scope.contentHeader = $scope.datasets[i].name;
                $scope.contentDetails = $scope.datasets[i].snippet;
                $scope.countrry = $scope.datasets[i].cntry;
                $scope.yyear = $scope.datasets[i].dateyear;
<<<<<<< HEAD
=======
               
>>>>>>> Develop
            }
        }
        $scope.acc1open = true;
        $scope.acc2open = true;
        $scope.acc3open = false;
    };
<<<<<<< HEAD
    // DataSet 'II'
    //Drags Starts here
=======


    //Drags & table structure Starts here
>>>>>>> Develop
    var valueArra = [];
    var cntryeArra = [];
    var sectorArra = [];
    var jusCheckS = [];
    var jusCheckY = [];
    var jusCheckC = [];
    var timestaArra = [];
<<<<<<< HEAD
=======

>>>>>>> Develop
    $scope.topDragList = [{
        'title': 'Sector',
        'drag': true,
        'val': '12'
    }];
<<<<<<< HEAD
=======

>>>>>>> Develop
    $scope.leftDragList = [{
        'title': 'Country',
        'drag': true,
        'val': '11'
    }, {
<<<<<<< HEAD
        'title': 'Year',
        'drag': true,
        'val': '10'
    }];
    getSurveyData.query({changeOrderBy: '100'}, function (data) {
=======
        'title': 'Year',    
        'drag': true,
        'val': '10'
    }];


    getSurveyDataActions.query({
        changeOrderBy: '100' // given '100' for building check box lists on the left side
    }, function (data) {
        surveyDataGlobal = data;

>>>>>>> Develop
        for (k = 0; k < data.length; k++) {
            data[k].sectorCode = true;
            data[k].countryCode = true;
            data[k].YearCode = true;
<<<<<<< HEAD
            if(k==0 || k==1)
            {
              if (jusCheckY.indexOf(data[k].year) == -1) {
                jusCheckY.push(data[k].year);
                TimesArr = {
                    "name": data[k].year,
                    "code": "03",
                    "selectcode": true
                  }
                timestaArra.push(TimesArr);
                }
              if (jusCheckC.indexOf(data[k].country) == -1) {
                jusCheckC.push(data[k].country);
                Countryi = {
                    "name": data[k].country,
                    "code": "02",
                    "selectcode": true
                    }
                cntryeArra.push(Countryi);
                }
                if (jusCheckS.indexOf(data[k].sector) == -1) {
                jusCheckS.push(data[k].sector);
                //sectorArra.push(data[k].sector);
                Sectors = {
                    "name": data[k].sector,
                    "code": "01",
                    "selectcode": true
                  }
                sectorArra.push(Sectors);
                }
            }
            else
            {
              if (jusCheckY.indexOf(data[k].year) == -1) {
                jusCheckY.push(data[k].year);
                TimesArr = {
                    "name": data[k].year,
                    "code": "03",
                    "selectcode": false
                }
                timestaArra.push(TimesArr);
              }
              if (jusCheckC.indexOf(data[k].country) == -1) {
                jusCheckC.push(data[k].country);
                Countryi = {
                    "name": data[k].country,
                    "code": "02",
                    "selectcode": false
                    }
                cntryeArra.push(Countryi);
                }
                if (jusCheckS.indexOf(data[k].sector) == -1) {
                jusCheckS.push(data[k].sector);
                //sectorArra.push(data[k].sector);
                Sectors = {
                    "name": data[k].sector,
                    "code": "01",
                    "selectcode": false
                  }
                sectorArra.push(Sectors);
                }
            }
            valueArra.push(data[k].value);
        }
        $scope.Sectors1 = sectorArra;
        $scope.Years1 = timestaArra;
        $scope.Countries1 = cntryeArra;
        $scope.dragdataActions = function () {
            valflag = 0;
            lftSideListArr = [];
            $scope.selectedContr = [];
            $scope.selectedSects = [];
            $scope.selectedYyrs = [];
=======
            if (k == 0 || k == 1) {

                if (jusCheckY.indexOf(data[k].year) == -1) {
                    jusCheckY.push(data[k].year);
                    TimesArr = {
                        "name": data[k].year,
                        "code": "03",
                        "selectcode": true
                    }
                    timestaArra.push(TimesArr);
                }
                if (jusCheckC.indexOf(data[k].country) == -1) {
                    jusCheckC.push(data[k].country);
                    Countryi = {
                        "name": data[k].country,
                        "code": "02",
                        "selectcode": true
                    }
                    cntryeArra.push(Countryi);
                }
                if (jusCheckS.indexOf(data[k].sector) == -1) {
                    jusCheckS.push(data[k].sector);
                    Sectors = {
                        "name": data[k].sector,
                        "code": "01",
                        "selectcode": true
                    }
                    sectorArra.push(Sectors);
                }

                // for(var i in cntryeArra){
                //     console.log(cntryeArra[i] + "IF Loop");
                // }
            } else {
                if (jusCheckY.indexOf(data[k].year) == -1) {
                    jusCheckY.push(data[k].year);
                    TimesArr = {
                        "name": data[k].year,
                        "code": "03",
                        "selectcode": false
                    }
                    timestaArra.push(TimesArr);
                }

                if (jusCheckC.indexOf(data[k].country) == -1) {
                    jusCheckC.push(data[k].country);
                    Countryi = {
                        "name": data[k].country,
                        "code": "02",
                        "selectcode": false
                    }
                    cntryeArra.push(Countryi);
                }

                if (jusCheckS.indexOf(data[k].sector) == -1) {
                    jusCheckS.push(data[k].sector);

                    Sectors = {
                        "name": data[k].sector,
                        "code": "01",
                        "selectcode": false
                    }
                    sectorArra.push(Sectors);
                }

                //  for(var i in cntryeArra){
                //     console.log(cntryeArra[i].name);
                // }

            }
            valueArra.push(data[k].value);
        }


         for(var i in cntryeArra){
            console.log(cntryeArra[i].name);
        }

        $scope.Sectors1 = sectorArra;
        $scope.Years1 = timestaArra;
        $scope.Countries1 = cntryeArra;
        $scope.FirstLoad = true;

        //function starts for drag and drop and check box selection to generate table
        $scope.optionClickActions = function () {

            seecnm = yyes = cntries = "";
            timestaArrayy = [];
            secstaArrayy = [];
            cntystaArrayy = [];
            jj = kk = ii = 0;

            angular.forEach($scope.Sectors1, function (sec) {

                if (angular.isDefined(sec.selectcode) && sec.selectcode === true) {
                    seecnm = seecnm + "'" + sec.name + "', ";
                    secstaArrayy[jj++] = sec.name;

                }
            });

            angular.forEach($scope.Years1, function (yyrs) {

                if (angular.isDefined(yyrs.selectcode) && yyrs.selectcode === true) {
                    yyes = yyes + "'" + yyrs.name + "', ";
                    timestaArrayy[kk++] = yyrs.name;
                }

            });

            angular.forEach($scope.Countries1, function (ctry) {
                if (angular.isDefined(ctry.selectcode) && ctry.selectcode === true) {
                    cntries = cntries + "'" + ctry.name + "', ";
                    cntystaArrayy[ii++] = ctry.name;
                }
            });

            selectedSectors = seecnm.substr(0, seecnm.length - 2);
            selectedYears = yyes.substr(0, yyes.length - 2);
            selectedCountries = cntries.substr(0, cntries.length - 2);

            dataVal = [];
            valflag = 0;
>>>>>>> Develop
            for (i = 0; i < $scope.topDragList.length; i++) {
                lftSideListArr = $scope.topDragList[i].val;
                valflag += parseInt(lftSideListArr);
            }
<<<<<<< HEAD
            getSurveyDataDrag.query({
                changeOrderBy: valflag
            }, function (data) {
            for (k = 0; k < data.length; k++) {
                    data[k].sectorCode = true;
                    data[k].countryCode = true;
                    data[k].YearCode = true;
                }
                angular.forEach($scope.Sectors1, function (sec) {
                if (angular.isDefined(sec.selectcode) && sec.selectcode === true) {
                        $scope.selectedSects.push(sec.name);
                        $.each(data, function (j, v) {
                            if (data[j].sector == sec.name) {
                                delete data[j].sectorCode;
                                data[j].sectorCode = "true";
                                return;
                            }
                        });
                    } else {
                        $.each(data, function (i, v) {
                            if (data[i].sector == sec.name) {
                                delete data[i].sectorCode;
                                data[i].sectorCode = "false";
                                return;
                            }
                        });
                    }
                });
                angular.forEach($scope.Countries1, function (cont) {
                    if (angular.isDefined(cont.selectcode) && cont.selectcode === true) {
                        $scope.selectedContr.push(cont.name);
                        $.each(data, function (j, v) {
                            if (data[j].country == cont.name) {
                                delete data[j].countryCode;
                                data[j].countryCode = "true";
                                return;
                            }
                        });
                    } else {
                        $.each(data, function (i, v) {
                            if (data[i].country == cont.name) {
                                delete data[i].countryCode;
                                data[i].countryCode = "false";
                                return;
                            }
                        });
                    }
                });
                angular.forEach($scope.Years1, function (yyrs) {
                    if (angular.isDefined(yyrs.selectcode) && yyrs.selectcode === true) {
                        $scope.selectedYyrs.push(yyrs.name);
                        $.each(data, function (j, v) {
                            if (data[j].year == yyrs.name) {
                                delete data[j].YearCode;
                                data[j].YearCode = "true";
                                return;
                            }
                        });
                    } else {
                        $.each(data, function (i, v) {
                            if (data[i].year == yyrs.name) {
                                delete data[i].YearCode;
                                data[i].YearCode = "false";
                                return;
                            }
                        });
                    }
                });
                $(".tbleStru").createGTable({
                    SectorsArr: $scope.selectedSects,
                    CountriesArr: $scope.selectedContr,
                    YearsArr: $scope.selectedYyrs,
                    datavalueArr: data,
                    initPos: valflag
                });
            })
            rearrangeData();
            $("#sideDiv .thumbnail .btn").dblclick();
        }
        $scope.dragdataActions();
=======

            lftSideTitles = [];
            for (j = 0; j < $scope.leftDragList.length; j++) {
                lftSideTitles[j] = $scope.leftDragList[j].title;
            }

            topSideTitles = [];
            for (j = 0; j < $scope.topDragList.length; j++) {
                topSideTitles[j] = $scope.topDragList[j].title;
            }


            getSurveyDataActions.query({
                sectorValues: selectedSectors, //Sectors in ArrayList
                countryValues: selectedCountries, //Country in ArrayList
                yearValues: selectedYears, //Year in ArrayList
                changeOrderBy: valflag, //Indicates the structure of table in numeric
                arrageOrderByLeft: lftSideTitles, //Indicates the left side titles
                arrageOrderByTop: topSideTitles, //Indicates the Top side titles
            }, function (data) {

                angular.forEach(data, function (data, j) {
                    dataVal[j] = data.value;
                })

                //checking cookie
                if ($scope.FirstLoad) {
                    var c_name = "tableType"
                    var c_value = document.cookie;
                    var c_start = c_value.indexOf(" " + c_name + "=");
                    if (c_start == -1) {
                        c_start = c_value.indexOf(c_name + "=");
                    }
                    if (c_start == -1) {
                        c_value = null;
                    } else {
                        c_start = c_value.indexOf("=", c_start) + 1;
                        var c_end = c_value.indexOf(";", c_start);
                        if (c_end == -1) {
                            c_end = c_value.length;
                        }
                        c_value = unescape(c_value.substring(c_start, c_end));
                    }
                    if (c_value) {
                        valflag = c_value;
                    }
                }
                $scope.FirstLoad = false;
                document.cookie = "tableType" + "=" + valflag;

                //cookie checking done

                $(".tbleStru").createGTable({
                    SectorsArr: secstaArrayy, //Sectors in ArrayList
                    CountriesArr: cntystaArrayy, //Country in ArrayList
                    YearsArr: timestaArrayy, //Year in ArrayList
                    datavalueArr: dataVal, //Values in ArrayList
                    arrageOrderByLeft: lftSideTitles, //Indicates the left side titles
                    arrageOrderByTop: topSideTitles, //Indicates the Top side titles
                    initPos: valflag //Indicates the structure of table in numeric
                });

            })

            rearrangeData();
            $("#sideDiv .thumbnail .btn").dblclick();

        }
        $scope.optionClickActions();

>>>>>>> Develop
    });
    $scope.acc2open = true;
    $scope.openModal = function () {
        $("html").animate({
            scrollTop: 0
        }, 600).css("overflow-x", "hidden");
        $modal.open({
            templateUrl: 'partials/completeData.html',
            controller: function () {
<<<<<<< HEAD
                openPops = setTimeout(function () {
                    $("#tbleStru2 .tbleBase").clone().appendTo($("#appndTable"));
                    $(".modal").addClass("adjusModal");
                    getSurveyData.query({  changeOrderBy: '77' }, function (data) {
                      chartOpens1("agriChart", "bar", "Agriculture Stat", "1",data);
                      chartOpens1("educChart", "line", "Education Stat", "2",data);
                      chartOpens1("finaChart", "column", "Finance Stat", "3",data);
                      chartOpens1("healtChart", "area", "HealthCare Stat", "4",data);   
                    });
=======

                openPops = setTimeout(function () {
                    $("#tbleStru2 .tbleBase").clone().appendTo($("#appndTable"));
                    $(".modal").addClass("adjusModal");
                    var data = [];

                    for (index in surveyDataGlobal) {

                        if (isPresent(surveyDataGlobal[index].country, cntystaArrayy) && isPresent(surveyDataGlobal[index].sector, secstaArrayy) && isPresent(surveyDataGlobal[index].year, timestaArrayy)) {
                            data.push(surveyDataGlobal[index]);

                        }
                    }
                    var id = "";
                    var chartnumber = 1;
                    for (index in secstaArrayy) {
                        for (rowIndex in sectorList) {
                            if (sectorList[rowIndex].name == secstaArrayy[index]) {
                                id = sectorList[rowIndex].id;
                                break;
                            }
                        }
                        chartOpens1("chart" + chartnumber, "bar", secstaArrayy[index] + " Stat", id.toString(), data);
                        chartnumber++;
                    }
>>>>>>> Develop
                }, 10)
            }
        })
    };
    $scope.$on('$viewContentLoaded', datapageaddControls());
    $scope.activePath = null;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.$parent.activePath = "#" + $location.path();
    });
<<<<<<< HEAD
=======

    //for browse tab
    $("#countryDivList").show();
    $("#sectorDivList").hide();

}

function filterSurveyData() {
    var data = [];
    for (index in surveyDataGlobal) {
        if (isPresent(surveyDataGlobal[index].country, cntystaArrayy) && isPresent(surveyDataGlobal[index].sector, secstaArrayy) && isPresent(surveyDataGlobal[index].year, timestaArrayy)) {
            data.append(surveyDataGlobal[index]);
        }
    }

>>>>>>> Develop
}

function infinitiPageController($scope, $http, $modal, $location) {
    $scope.activePath = null;
<<<<<<< HEAD
  	$scope.$on('$routeChangeSuccess', function(){
    	$scope.$parent.activePath ="#"+ $location.path();
  	});
}

function datapageaddControls() { 
	var timedelay = setTimeout(function(){
	        $(".datasetList").children("li:first").find(".dataDetails").click();
	}, 1000);
=======
    $scope.$on('$routeChangeSuccess', function () {
        $scope.$parent.activePath = "#" + $location.path();
    });
}

function datapageaddControls() {
    var timedelay = setTimeout(function () {
        $(".datasetList").children("li:first").find(".dataDetails").click();
    }, 1000);
>>>>>>> Develop
    $("#closepop").live("click", function () {
        $(".modal-backdrop").trigger("click");
        $("html").css("overflow", "auto");
    });
<<<<<<< HEAD
     //hide and show by country, by sector
    $("#byCntry").live("click", function(){
    $("#countryDivList").show();
    $("#sectorDivList").hide();
    })
    $("#bysctor").live("click", function(){
    $("#countryDivList").hide();
    $("#sectorDivList").show();
=======
    //hide and show by country, by sector
    $("#byCntry").live("click", function () {
        $("#countryDivList").show();
        $("#sectorDivList").hide();
    })
    $("#bysctor").live("click", function () {
        $("#countryDivList").hide();
        $("#sectorDivList").show();
>>>>>>> Develop
    })
    $(".sectorMenu a").live("click", function () {
        $iid = $(this).attr("id");
        $nxtiid = $(this).siblings("a").attr("id");
        $(".selecType").fadeOut("fast");
        $('#TC1').children("div").remove();
        $('.' + $nxtiid).fadeOut("fast");
        $('.' + $iid).fadeIn("slow");
    });
    $(".mapChoosefnt li input").live("click", function () {
        var typeChart = $(this).val();
        chartOpens(typeChart, 0);
    });
    $(".listCountry a, .bysctor a").live("click", function () {
        $(this).parents().eq(2).fadeOut();
        $(".selecType").fadeIn();
        chartOpens();
    });
    $(".browseTab").live("click", function () {
        $(".selecType").fadeOut("fast");
    });
    rearrangeData();
}

<<<<<<< HEAD
function ChartCtrl($scope, $location, $routeParams, getCountryDetails) 
{
  $scope.ChartHeader=$routeParams.countryName;
  getCountryDetails.query({id: $routeParams.countryId},function(data){
  var yearArr=new Array();
  var sectorArr=new Array();
  var Series=" [";
  var Category=" [";
  for(rowIndex in data)
  		{
  			if(!isPresent(data[rowIndex].Year,yearArr)){
  				yearArr.push(data[rowIndex].Year);	
  				Category=Category+JSON.stringify(data[rowIndex].Year)+",";	
  			}
  			if(!isPresent(data[rowIndex].sector_name,sectorArr)){
  				sectorArr.push(data[rowIndex].sector_name);	
  			}
  		}
  	Category=Category.substring(0,Category.length-1);
		Category=Category+"]";
		Category=Category.replace(/"/g,"");
		//Series
		for(sectorIndex in sectorArr)
			{
				Series=Series+"{\"name\":"+JSON.stringify(sectorArr[sectorIndex])+", \"data\": [";
				var data1="";
				for(rowIndex in data)
				{
					if(JSON.stringify(data[rowIndex].sector_name)==JSON.stringify(sectorArr[sectorIndex])){
						data1=data1+JSON.stringify(data[rowIndex].value)+",";
					}
					else{
						rowIndex=rowIndex+sectorArr.length-1;
					}
					data1=data1.replace(/"/g,"");
				}
			Series=Series+data1;
			Series=Series.substring(0,Series.length-1);	
			Series=Series+"]},";
			}	
			Series=Series.substring(0,Series.length-1);	
			Series=Series+"]";
	   	var options={
      chart: {type: 'area'},
           title: {text: ''},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
            formatter: function() {
              return this.value / 1000;}
            }
            },
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           series: {
                    stacking: 'normal'
                }
           },
           series: JSON.parse(Series)
           };
           var options1={
       chart: {type: 'line'},
           title: {text: ''},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
            formatter: function() {
              //console.log(this.value);
              return this.value / 1000;}
            }
            },
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: '#666666'
              }
             }
           },
       series: JSON.parse(Series)
           };
        var options2={
         chart: {type: 'column'},
           title: {text: ''},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
            formatter: function() {
              return this.value / 1000;}
            }
            },
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: '#666666'
              }
             }
           },
           series: JSON.parse(Series)
           };
            var options3={
            chart: {type: 'bar'},
           title: {text: ''},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
            formatter: function() {
              return this.value / 1000;}
            }
            },
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           series: {
                    stacking: 'normal'
                }
           },
           series: JSON.parse(Series)
           };
		 jQuery('#topLeftChart').highcharts(options3);
     jQuery('#topRightChart').highcharts(options1);
     jQuery('#botLeftChart').highcharts(options2);
     jQuery('#botRightChart').highcharts(options);
});
}


function sectorChartCtrl($scope, $location, $routeParams, getSectorDetails) 
{
$scope.ChartHeader=$routeParams.sectorId;
getSectorDetails.query({id: $routeParams.sectorId},function(data){
var yearArr=new Array();
var CountryArr=new Array();
var Series=" [";
var Category=" [";
for(rowIndex in data)
    {
      if(!isPresent(data[rowIndex].Year,yearArr)){
        yearArr.push(data[rowIndex].Year);  
        Category=Category+JSON.stringify(data[rowIndex].Year)+",";  
      }
      if(!isPresent(data[rowIndex].country,CountryArr)){
        CountryArr.push(data[rowIndex].country); 
      }
    }
  Category=Category.substring(0,Category.length-1);
    Category=Category+"]";
    Category=Category.replace(/"/g,"");
    //Series
    for(cntryIndex in CountryArr)
      {
        Series=Series+"{\"name\":"+JSON.stringify(CountryArr[cntryIndex])+", \"data\": [";
        var data1="";
        for(rowIndex in data)
        {
          if(JSON.stringify(data[rowIndex].country)==JSON.stringify(CountryArr[cntryIndex])){
            data1=data1+JSON.stringify(data[rowIndex].value)+",";
          }
          else{
            rowIndex=rowIndex+CountryArr.length-1;
          }
          data1=data1.replace(/"/g,"");
        }
      Series=Series+data1;
      Series=Series.substring(0,Series.length-1); 
      Series=Series+"]},";
      } 
      Series=Series.substring(0,Series.length-1); 
      Series=Series+"]";
      var chartTitle=JSON.stringify(data[0].sector_name);
      var options={
           chart: {type: 'area'},
           title: {text: ''},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
            formatter: function() {
              return this.value / 1000;}
            }
            },
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           series: {
                    stacking: 'normal'
                }
           },
           series: JSON.parse(Series)
           };
           var options1={
       chart: {type: 'line'},
           title: {text: ''},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
            formatter: function() {
              return this.value / 1000;}
            }
            },
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: '#666666'
              }
             }
           },
       series: JSON.parse(Series)
           };
           var options2={
           chart: {type: 'column'},
           title: {text: ''},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
            formatter: function() {
              return this.value / 1000;}
            }
            },
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: '#666666'
              }
             }
           },
           series: JSON.parse(Series)
           };
            var options3={
            chart: {type: 'bar'},
           title: {text: ''},
           subtitle: {text: 'Source: Ashoka.org'},
           xAxis: {
           categories:JSON.parse(Category),
           tickmarkPlacement: 'on',
           title: {enabled: false}},
           yAxis: {title: {text: 'Billions'},
           labels: {
            formatter: function() {
              return this.value / 1000;}
            }
            },
           tooltip: {shared: true,valueSuffix: 'millions'},
           plotOptions: {
           series: {
                    stacking: 'normal'
                }
           },
           series: JSON.parse(Series)
           };
     jQuery('#topLeftChart').highcharts(options3);
     jQuery('#topRightChart').highcharts(options1);
     jQuery('#botLeftChart').highcharts(options2);
     jQuery('#botRightChart').highcharts(options);
});
}

function addControls() {
	 var t = 0; // the height of the highest element (after the function runs)
=======
function countryChartCtrl($scope, $location, $routeParams, getCountryDetails) {
    ChartHeader = $routeParams.countryName;
    $scope.ChartHeader = $routeParams.countryName;
    getCountryDetails.query({
        id: $routeParams.countryId
    }, function (data) {
        countryChartData = data;
        var typeofchart = checkCookie();

        if (typeofchart) {
            countryChartOpens("chart1", typeofchart, ChartHeader + " Stats", data);
        } else {
            countryChartOpens("chart1", "bar", ChartHeader + " Stats", data);
        }
        var radio = $("input:radio[name ='chartTypeDetailed']");
        for (i in radio) {
            if (radio[i].value == typeofchart) {
                radio[i].checked = true;
                break;
            }
        }
    });
}

function sectorChartCtrl($scope, $location, $routeParams, getSectorDetails) {
    $scope.ChartHeader = $routeParams.sectorId;
    ChartHeader = $routeParams.sectorId;
    var pos = 0;
    for (index in sectorList) {
        if (sectorList[index].name == $routeParams.sectorId) {
            pos = index;
            break;
        }
    }
    getSectorDetails.query({
        id: $routeParams.sectorId
    }, function (data) {
        sectorChartData = data;
        $scope.ChartHeader = ChartHeader;
        var typeofchart = checkCookie();
        if (typeofchart) {
            sectorChartOpens("chart1", typeofchart, sectorList[pos].name + " Stats", sectorList[pos].id + "", data);
        } else {
            sectorChartOpens("chart1", "bar", sectorList[pos].name + " Stats", sectorList[pos].id + "", data);
        }
        var radio = $("input:radio[name ='chartTypeDetailed']");
        for (i in radio) {
            if (radio[i].value == typeofchart) {
                radio[i].checked = true;
                break;
            }
        }
    });

}

function addControls() {
    var t = 0; // the height of the highest element (after the function runs)
>>>>>>> Develop
    var t_elem; // the highest element (after the function runs)
    $(".mainContent .clumContnt").each(function () {
        $this = $(this);
        if ($this.innerHeight() > t) {
            t_elem = this;
            t = $this.innerHeight();
        }
    });
    var hghtAdju = setTimeout(function () {
        if ($(document).width() > 640) {
            $(".mainContent .clumContnt").innerHeight(t);
        } else {
            $("#rightColum").insertAfter(".mainContent");
        }
<<<<<<< HEAD
       $(".bysctor").css({
=======
        $(".bysctor").css({
>>>>>>> Develop
            "margin-top": "20px",
            "display": "none"
        });
    }, 500);
    $("#slides").slidesjs({
        height: 300,
        play: {
            auto: true,
            interval: 3000
        },
        pagination: {
            active: false
        },
        navigation: {
            active: false
        }
    });
}

function chartOpens(typeval, mode, setHeight) {
    if (mode == 1) {
        $initId = $('.TC1');
    } else {
        $initId = $('#TC1');
    }
    if (!typeval) {
        var typeChart = 'bar';
    } else {
        var typeChart = typeval;
    }
    if ($initId.length) {
        $initId.highcharts({
            chart: {
                type: typeChart,
                height: setHeight
            },
            title: {
                text: 'Yearly Countries Stats'
            },
            xAxis: {
                categories: ['2000', '2003', '2004', '2005', '2010', '2011', '2012']
            },
            yAxis: {
                title: {
                    text: 'Stat Counts'
                }
            },
            tooltip: {
                enabled: true,
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'India',
                data: [7, 6, 9, 14, 18, 21, 25]
            }, {
                name: 'London',
                data: [3, 4, 5, 8, 11, 15, 17]
            }, {
                name: 'China',
                data: [13, 24, 25, 38, 6, 11, 7]
            }]
        });
    }
}

<<<<<<< HEAD
=======
function countryChartOpens(classes, chartType, chartTitle, dataValues) {
    var jusCheckS = [];
    var jusCheckY = [];
    var valueArra = [],
        addedSeries = [];
    $.each(dataValues, function (k, v) {
        if (jusCheckY.indexOf(dataValues[k].Year) == -1) {
            jusCheckY.push(dataValues[k].Year);
        }

        if (jusCheckS.indexOf(dataValues[k].name) == -1) {
            jusCheckS.push(dataValues[k].name);
        }
        valueArra.push(dataValues[k].value);
    })

    var addedSeries = "";
    for (sectorname in jusCheckS) {
        addedSeries = addedSeries + "{\"name\" :\"" + jusCheckS[sectorname] + "\", \"data\": [";
        for (yearIndex in jusCheckY) {
            for (index in dataValues) {
                if (dataValues[index].name.replace(/"/g, "") == jusCheckS[sectorname].replace(/"/g, "") && dataValues[index].Year == jusCheckY[yearIndex]) {
                    addedSeries += dataValues[index].value + ",";
                }
            }
        }

        addedSeries = addedSeries.slice(0, -1) + "]},";
    }
    vaaal = "[" + addedSeries.slice(0, -1) + "]";
    //console.log("vaal is :"+vaaal);
    $initId = $('.' + classes);
    var typeChart = chartType;
    if ($initId.length) {
        $initId.highcharts({
            chart: {
                type: typeChart
            },
            title: {
                text: chartTitle
            },
            xAxis: {
                categories: jusCheckY
            },
            yAxis: {
                title: {
                    text: 'Stat Counts'
                }
            },
            tooltip: {
                enabled: true,
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: JSON.parse(vaaal)
        });
    }
}

function sectorChartOpens(classes, chartType, chartTitle, sectorValues, dataValues) {
    var jusCheckY = [];
    var jusCheckC = [],
        valueArra = [],
        addedSeries = [];
    $.each(dataValues, function (k, v) {
        if (jusCheckY.indexOf(dataValues[k].Year) == -1) {
            jusCheckY.push(dataValues[k].Year);
        }
        if (jusCheckC.indexOf(dataValues[k].name) == -1) {
            jusCheckC.push(dataValues[k].name);
        }
        valueArra.push(dataValues[k].value);
    })
    var sector = "";
    for (index in sectorList) {
        if (sectorList[index].id == sectorValues.replace(/"/g, "")) {
            sector = sectorList[index].name;
        }
    }
    var addedSeries = "";
    for (countryname in jusCheckC) {
        addedSeries = addedSeries + "{\"name\" :\"" + jusCheckC[countryname] + "\", \"data\": [";
        for (yearIndex in jusCheckY) {
            for (index in dataValues) {
                if (dataValues[index].Year == jusCheckY[yearIndex] && dataValues[index].name == jusCheckC[countryname]) {
                    addedSeries += dataValues[index].value + ",";
                }
            }
        }
        addedSeries = addedSeries.slice(0, -1) + "]},";
    }
    vaaal = "[" + addedSeries.slice(0, -1) + "]";
    $initId = $('.' + classes);
    var typeChart = chartType;
    if ($initId.length) {
        $initId.highcharts({
            chart: {
                type: typeChart
            },
            title: {
                text: chartTitle
            },
            xAxis: {
                categories: jusCheckY
            },
            yAxis: {
                title: {
                    text: 'Stat Counts'
                }
            },
            tooltip: {
                enabled: true,
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: JSON.parse(vaaal)
        });
    }
}
>>>>>>> Develop

function chartOpens1(classes, chartType, chartTitle, sectorValues, dataValues) {
    var jusCheckS = [];
    var jusCheckY = [];
<<<<<<< HEAD
    var jusCheckC = [], valueArra = [], addedSeries = [];
    $.each(dataValues, function (k, v) {
        if (jusCheckY.indexOf(dataValues[k].year) == -1) {
                jusCheckY.push(dataValues[k].year);      
            }
            if (jusCheckC.indexOf(dataValues[k].country) == -1) {
                jusCheckC.push(dataValues[k].country);
                console.log(dataValues[k].country);
            }
            if (jusCheckS.indexOf(dataValues[k].sector) == -1) {
                jusCheckS.push(dataValues[k].sector);
            }
            valueArra.push(dataValues[k].value);
  })
  datavalNum = dataValues.length/jusCheckS.length;
  yrsnum = datavalNum/jusCheckY.length;
  agrivalues = valueArra.slice(0, datavalNum);
  eduValues = valueArra.slice(datavalNum, datavalNum+datavalNum);
  finValues = valueArra.slice(datavalNum+datavalNum, datavalNum+datavalNum*2);
  healthValues = valueArra.slice(datavalNum+datavalNum*2, datavalNum+datavalNum*3);
  if(sectorValues == 1){
    diviArray = agrivalues;
  }else if(sectorValues == 2){
    diviArray = eduValues;
  }else if(sectorValues == 3){
    diviArray = finValues;
  }else{
    diviArray = healthValues;
  }
  addNos = yrsnos = diviArray.length/jusCheckY.length;
  initval = 0;
  arr3 = [];
  for(j=0;j<yrsnos;j++){
    arr3[j] = diviArray.slice(initval, initval+addNos);
    initval = initval+addNos;
  }
  cuntryDiv = datavalNum / jusCheckC.length;
  for(countryname in jusCheckC){
      addedSeries = addedSeries +  "{\"name\" :\""+jusCheckC[countryname]+"\", \"data\": [";
      addedSeries += arr3[countryname];
      addedSeries=addedSeries+"]},";
  }
  vaaal = "["+addedSeries.slice(0, - 1)+"]";
    $initId = $('.'+classes);
=======
    var jusCheckC = [],
        valueArra = [],
        addedSeries = [];
    $.each(dataValues, function (k, v) {
        if (jusCheckY.indexOf(dataValues[k].year) == -1) {
            jusCheckY.push(dataValues[k].year);
        }
        if (jusCheckC.indexOf(dataValues[k].country) == -1) {
            jusCheckC.push(dataValues[k].country);
            //console.log(dataValues[k].country);
        }
        if (jusCheckS.indexOf(dataValues[k].sector) == -1) {
            jusCheckS.push(dataValues[k].sector);
        }
        valueArra.push(dataValues[k].value);
    })
    var sector = "";
    for (index in sectorList) {
        if (sectorList[index].id == sectorValues.replace(/"/g, "")) {
            sector = sectorList[index].name;
        }
    }
    var addedSeries = "";
    for (countryname in jusCheckC) {
        addedSeries = addedSeries + "{\"name\" :\"" + jusCheckC[countryname] + "\", \"data\": [";
        for (yearIndex in jusCheckY) {
            for (index in dataValues) {
                if (dataValues[index].sector.replace(/"/g, "") == sector.replace(/"/g, "") && dataValues[index].year == jusCheckY[yearIndex] && dataValues[index].country == jusCheckC[countryname]) {
                    addedSeries += dataValues[index].value + ",";
                }
            }
        }

        addedSeries = addedSeries.slice(0, -1) + "]},";
    }
    vaaal = "[" + addedSeries.slice(0, -1) + "]";
    //console.log("vaal is :"+vaaal);
    $initId = $('.' + classes);
>>>>>>> Develop
    var typeChart = chartType;
    if ($initId.length) {
        $initId.highcharts({
            chart: {
                type: typeChart
            },
            title: {
                text: chartTitle
            },
            xAxis: {
                categories: jusCheckY
            },
            yAxis: {
                title: {
                    text: 'Stat Counts'
                }
            },
            tooltip: {
                enabled: true,
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: JSON.parse(vaaal)
        });
    }
}

function isPresent(obj, Arr) {
<<<<<<< HEAD
	for(i in Arr)
	{
		if (obj==Arr[i])
		return true;
	}
	return false;
};

function rearrangeData() {
  //console.log("called rearrangeData");
=======
    for (i in Arr) {
        if (obj == Arr[i])
            return true;
    }
    return false;
};

function rearrangeData() {
    //console.log("called rearrangeData");
>>>>>>> Develop
    if ($.browser.msie) {
        setTimeout(function () {
            $("#sideDiv .btn:eq(0)").css("top", "10px");
            $("#sideDiv .btn:eq(1)").css("top", "45px");
            $("#sideDiv .btn:eq(2)").css("top", "85px");
        }, 100)
    }

}

<<<<<<< HEAD

var tableToExcel = (function () {
        var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        return function (table, name, filename) {
            if (!table.nodeType) table = document.getElementById('dataPageTable');
            console.log(table);
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }

            document.getElementById("dlink").href = uri + base64(format(template, ctx));
            document.getElementById("dlink").download = filename;
            document.getElementById("dlink").click();

        }
    })()
=======
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        }, format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        }
    return function (table, name, filename) {
        if (!table.nodeType) table = document.getElementById('dataPageTable');
        //console.log(table);
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML
        }

        document.getElementById("dlink").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").download = filename;
        document.getElementById("dlink").click();

    }
})()

$("#sectorSelectBox").live("change", sectorBoxChange);
$("#chartType").live("change", chartTypeChange);
$("#chartTypeDetailed").live("change", detailedChartTypeChange);

function sectorBoxChange() {
    var typeOfChart = $("input:radio[name ='chartType']:checked").val();
    for (rowindex in sectorList) {
        if (JSON.stringify(sectorList[rowindex].name).replace(/"/g, "") == $("#sectorSelectBox option:selected").text()) {
            var name = JSON.stringify(sectorList[rowindex].name).replace(/"/g, "");
            chartOpens1("topChart", typeOfChart, name + " Stats", JSON.stringify(sectorList[rowindex].id), surveyDataGlobal);
            break;
        }
    }
}

function chartTypeChange() {
    var typeOfChart = $("input:radio[name ='chartType']:checked").val();
    for (rowindex in sectorList) {
        if (JSON.stringify(sectorList[rowindex].name).replace(/"/g, "") == $("#sectorSelectBox option:selected").text()) {
            var name = JSON.stringify(sectorList[rowindex].name).replace(/"/g, "");
            chartOpens1("topChart", typeOfChart, name + " Stats", JSON.stringify(sectorList[rowindex].id), surveyDataGlobal);
            break;
        }
    }
    document.cookie = "homeChartType" + "=" + typeOfChart;
}

function detailedChartTypeChange($scope) {
    var typeOfChart = $("input:radio[name ='chartTypeDetailed']:checked").val();
    var pos = -1;
    for (index in sectorList) {
        if (sectorList[index].name == ChartHeader) {
            pos = index;
            break;
        }
    }

    if (pos == -1) {
        countryChartOpens("chart1", typeOfChart, ChartHeader + " Stats", countryChartData);
    } else {
        sectorChartOpens("chart1", typeOfChart, ChartHeader + " Stats", sectorList[pos].id + "", sectorChartData);
    }
    document.cookie = "homeChartType" + "=" + typeOfChart;
}

function checkCookie() {
    //checking cookie
    var c_name = "homeChartType"
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    if (c_value) {
        valflag = c_value;
    } else {
        valflag = $("input:radio[name ='chartType']:checked").val();
    }
    document.cookie = "homeChartType" + "=" + valflag;
    return valflag;

    //cookie checking done
}
>>>>>>> Develop
