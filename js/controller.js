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

    // DataSet 'I'
    //Accordion Starts
    $scope.displayData = function (idd) {
        for (i in $scope.datasets) {
            if ($scope.datasets[i].id == idd) {
                $scope.contentHeader = $scope.datasets[i].name;
                $scope.contentDetails = $scope.datasets[i].snippet;
                $scope.countrry = $scope.datasets[i].cntry;
                $scope.yyear = $scope.datasets[i].dateyear;
               
            }
        }
        $scope.acc1open = true;
        $scope.acc2open = true;
        $scope.acc3open = false;
    };


    //Drags & table structure Starts here
    var valueArra = [];
    var cntryeArra = [];
    var sectorArra = [];
    var jusCheckS = [];
    var jusCheckY = [];
    var jusCheckC = [];
    var timestaArra = [];

    $scope.topDragList = [{
        'title': 'Sector',
        'drag': true,
        'val': '12'
    }];

    $scope.leftDragList = [{
        'title': 'Country',
        'drag': true,
        'val': '11'
    }, {
        'title': 'Year',    
        'drag': true,
        'val': '10'
    }];


    getSurveyDataActions.query({
        changeOrderBy: '100' // given '100' for building check box lists on the left side
    }, function (data) {
        surveyDataGlobal = data;

        for (k = 0; k < data.length; k++) {
            data[k].sectorCode = true;
            data[k].countryCode = true;
            data[k].YearCode = true;
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
            for (i = 0; i < $scope.topDragList.length; i++) {
                lftSideListArr = $scope.topDragList[i].val;
                valflag += parseInt(lftSideListArr);
            }

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

    });
    $scope.acc2open = true;
    $scope.openModal = function () {
        $("html").animate({
            scrollTop: 0
        }, 600).css("overflow-x", "hidden");
        $modal.open({
            templateUrl: 'partials/completeData.html',
            controller: function () {

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
                }, 10)
            }
        })
    };
    $scope.$on('$viewContentLoaded', datapageaddControls());
    $scope.activePath = null;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.$parent.activePath = "#" + $location.path();
    });

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

}

function infinitiPageController($scope, $http, $modal, $location) {
    $scope.activePath = null;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.$parent.activePath = "#" + $location.path();
    });
}

function datapageaddControls() {
    var timedelay = setTimeout(function () {
        $(".datasetList").children("li:first").find(".dataDetails").click();
    }, 1000);
    $("#closepop").live("click", function () {
        $(".modal-backdrop").trigger("click");
        $("html").css("overflow", "auto");
    });
    //hide and show by country, by sector
    $("#byCntry").live("click", function () {
        $("#countryDivList").show();
        $("#sectorDivList").hide();
    })
    $("#bysctor").live("click", function () {
        $("#countryDivList").hide();
        $("#sectorDivList").show();
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
        $(".bysctor").css({
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

function chartOpens1(classes, chartType, chartTitle, sectorValues, dataValues) {
    var jusCheckS = [];
    var jusCheckY = [];
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
    for (i in Arr) {
        if (obj == Arr[i])
            return true;
    }
    return false;
};

function rearrangeData() {
    //console.log("called rearrangeData");
    if ($.browser.msie) {
        setTimeout(function () {
            $("#sideDiv .btn:eq(0)").css("top", "10px");
            $("#sideDiv .btn:eq(1)").css("top", "45px");
            $("#sideDiv .btn:eq(2)").css("top", "85px");
        }, 100)
    }

}

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