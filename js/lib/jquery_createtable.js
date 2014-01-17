/*
 
 Name: CreateGTable;
 Version: 1.0;
 Created By: Gopal Rengaraj;
 Technology Used: Jquery, Javascript;
 Requires: jQuery v2+ ;
 Description: Drag and Drop table structure. It is not standalone table, it has some dependencies with other data/array.
 Developing Mode: In progress.
 
 */
<<<<<<< HEAD
=======
 
>>>>>>> Develop
(function ($) {

    $.fn.createGTable = function (options) {

<<<<<<< HEAD
        $(".tbleStru").html("");

        var defaults = {
            CountriesArr: ["India", "England"],
            YearsArr: ["2011", "2012"],
            SectorsArr: ["Agriculture", "Education"],
            datavalueNos: 8,
            datavalueArr: [20, 21, 22, 23, 24, 25, 26, 27],
            addClasses: "studDetails datstble",
            initPos: 15
        };

        var settings = $.extend({}, defaults, options);

=======

        var defaults = {
            CountriesArr: [],	//Country in ArrayList
            YearsArr: [], //Year in ArrayList
            SectorsArr: [], //Sectors in ArrayList
            datavalueArr: [], //Values in ArrayList
			arrageOrderByLeft: [], //Indicates the left side titles
			arrageOrderByTop: [], //Indicates the Top side titles
            initPos: 15 //Indicates the structure of table in numeric
        };

        var settings = $.extend({}, defaults, options);
		$(this).html("");
>>>>>>> Develop
        cntrNos = settings.CountriesArr.length;
        agriNos = settings.SectorsArr.length;
        yrsNos = settings.YearsArr.length;
        Sectors = settings.SectorsArr;
        Countries = settings.CountriesArr;
        Years = settings.YearsArr;
        dataValues1 = settings.datavalueArr;
<<<<<<< HEAD
        dataValues = [];


        $.each(dataValues1, function (i, v) {
            if (dataValues1[i].sectorCode == "true" && dataValues1[i].YearCode == "true" && dataValues1[i].countryCode == "true") {
                //console.log(dataValues1[i].country + "---" + dataValues1[i].sector + "---" + dataValues1[i].year + "---" + dataValues1[i].value + "---" + dataValues1[i].sectorCode + "---" + dataValues1[i].YearCode + "---" + dataValues1[i].countryCode);
                dataValues.push(dataValues1[i].value);
            } else {
                if (settings.datavalueNos != 8) {
                    dataValues = settings.datavalueArr;
                }
            }
        });

        var g = 0;
        var g1 = 0;
        var g2 = 0;
        var dataSeries = 0;
        content = "<table class='tbleBase' id='dataPageTable' cellspacing='0'>";
=======
		arrageOrderByLeft = settings.arrageOrderByLeft;
		arrageOrderByTop = settings.arrageOrderByTop;

		var g = 0;
        var g1 = 0;
        var g2 = 0;
        var dataSeries = 0;
        content = "<table class='tbleBase studDetails datstble' id='dataPageTable' cellspacing='0'>";
>>>>>>> Develop

        pos = settings.initPos.toString();

        switch (pos) {
        case '23':
            lftSide = "year Only in left";

            colNumss = cntrNos * agriNos + 1;
            rowNumss = yrsNos + 2;
<<<<<<< HEAD
            //if(cntrNos<agriNos){
            spanValue1 = agriNos;
            divValue = cntrNos;
            vall1 = Countries;
            vall2 = Sectors;
            /*}else{
				spanValue1 = cntrNos;
				divValue = 	agriNos;
				vall1 = Sectors;
				vall2 = Countries;
				}*/
            vall = Years;
=======
         	if(arrageOrderByTop[0]=="Sector"){
            spanValue1 = cntrNos;
			divValue = 	agriNos;
			var vall1 = Sectors;
			var vall2 = Countries;
			}else{					
            spanValue1 = agriNos;
            divValue = cntrNos;
            var vall1 = Countries;
            var vall2 = Sectors;
			}
			vall = Years;
>>>>>>> Develop
            showGTable();
            break;

        case '21':
            lftSide = "agri Only in left";

            colNumss = cntrNos * yrsNos + 1;
            rowNumss = agriNos + 2;
<<<<<<< HEAD
            spanValue1 = yrsNos;
            /*if(cntrNos<yrsNos){
				spanValue1 = yrsNos;
				divValue = 	cntrNos;
				vall1 = Countries;
				vall2 = Years;
				}else{*/
            spanValue1 = cntrNos;
            divValue = yrsNos;
            vall1 = Years;
            vall2 = Countries;
            /*}*/
=======
			
			if(arrageOrderByTop[0]=="Year"){
			spanValue1 = cntrNos;
            divValue = yrsNos;
            var vall1 = Years;
            var vall2 = Countries;
			}else{					
            spanValue1 = yrsNos;
            divValue = cntrNos;
            var vall1 = Countries;
            var vall2 = Years;
			}

>>>>>>> Develop
            vall = Sectors;
            showGTable();
            break;

        case '22':
            lftSide = "cntry Only in left";

            colNumss = agriNos * yrsNos + 1;
            rowNumss = cntrNos + 2;
<<<<<<< HEAD
            spanValue1 = yrsNos;
            /*if(agriNos<yrsNos){
				spanValue1 = yrsNos;
				divValue = 	agriNos;
				vall1 = Sectors;
				vall2 = Years;
				}else{*/
            spanValue1 = agriNos;
            divValue = yrsNos;
            vall1 = Years;
            vall2 = Sectors;
            /*}*/
            vall = Countries;
=======
			
			if(arrageOrderByTop[0]=="Sector"){
            spanValue1 = yrsNos;
            divValue = agriNos;
            var vall1 = Sectors;
            var vall2 = Years;
			}else{					
            spanValue1 = agriNos;
            divValue = yrsNos;
            var vall1 = Years;
            var vall2 = Sectors;
			}
			
			vall = Countries;
>>>>>>> Develop
            showGTable();
            break;

        case 1:
            lftSide = "nothing in left";
            rowNoss = 4;
            break;

        case '11':
            lftSide = "year & agri in left";
<<<<<<< HEAD

            rowNoss = agriNos * yrsNos;
            colNumss = cntrNos + 2;
            spanValue1 = yrsNos;
            vall1 = Countries;
            vall2 = Sectors;
            vall3 = Years;
=======
			console.log(arrageOrderByLeft[0])
			rowNoss = agriNos * yrsNos;
            colNumss = cntrNos + 2;
           
			
			if(arrageOrderByLeft[0]=="Year"){
			var vall1 = Countries;
            var vall2 = Years;
            var vall3 = Sectors;
			spanValue1 = agriNos;
			}else{
			var vall1 = Countries;
            var vall2 = Sectors;
            var vall3 = Years;
			spanValue1 = yrsNos;
			}

      
>>>>>>> Develop
            showGTable2();
            break;

        case '12':
            lftSide = "year & cntr in left";

            rowNoss = cntrNos * yrsNos;
            colNumss = agriNos + 2;
<<<<<<< HEAD
            spanValue1 = yrsNos;
            vall1 = Sectors;
            vall2 = Countries;
            vall3 = Years;
            showGTable2();
=======
			
			if(arrageOrderByLeft[0]=="Year"){
			spanValue1 = cntrNos;
            var vall1 = Sectors;
            var vall2 = Years;
            var vall3 = Countries;
			}else{
			spanValue1 = yrsNos;
            var vall1 = Sectors;
            var vall2 = Countries;
            var vall3 = Years;
			}
			
			showGTable2();
>>>>>>> Develop
            break;

        case '10':
            lftSide = "cntry & agri in left";

            rowNoss = cntrNos * agriNos;
            colNumss = yrsNos + 2;
<<<<<<< HEAD
            spanValue1 = agriNos;
            vall1 = Years;
            vall2 = Countries;
            vall3 = Sectors;
=======
			
			if(arrageOrderByLeft[0]=="Sector"){
            spanValue1 = cntrNos;
            var vall1 = Years;
            var vall2 = Sectors;
            var vall3 = Countries;
			}else{					
            spanValue1 = agriNos;
            var vall1 = Years;
            var vall2 = Countries;
            var vall3 = Sectors;
			}
			

>>>>>>> Develop
            showGTable2();
            break;

        case '0':
            lftSide = "All in left";
<<<<<<< HEAD

            rowNoss = yrsNos * cntrNos * agriNos;
            var sndColmn = cntrNos * yrsNos;
            var Colmnum = agriNos * yrsNos;
            vall1 = Sectors;
            vall2 = Countries;
            vall3 = Years;
=======
			
			//10-year, 11-country, 12-sector
			
            rowNoss = yrsNos * cntrNos * agriNos;
			
			if(arrageOrderByLeft[0]=="Sector"){
				var sndColmn = cntrNos * yrsNos;
				if(arrageOrderByLeft[1] == "Country"){	
					var spnValue = yrsNos;
					var vall1 = Sectors;
					var vall2 = Countries;
					var vall3 = Years;				
				}else{
					var spnValue = cntrNos;
					var vall1 = Sectors;
					var vall2 = Years;
					var vall3 = Countries;
				}
			}
			
			if(arrageOrderByLeft[0]=="Country"){
				var sndColmn = agriNos * yrsNos;
				if(arrageOrderByLeft[1] == "Sector"){
					var spnValue = yrsNos;
					var vall1 = Countries;
					var vall2 = Sectors;
					var vall3 = Years;					
				}else{
					var spnValue = agriNos;
					var vall1 = Countries;
					var vall2 = Years;
					var vall3 = Sectors;
				}
			}
			
			if(arrageOrderByLeft[0]=="Year"){
			var sndColmn = agriNos * cntrNos;
			if(arrageOrderByLeft[1] == "Sector"){
					var spnValue = cntrNos;
					var vall1 = Years;
					var vall2 = Sectors;
					var vall3 = Countries;					
				}else{
					var spnValue = agriNos;
					var vall1 = Years;
					var vall2 = Countries;
					var vall3 = Sectors;				
				}
			}
			
>>>>>>> Develop
            showGTable3();
            break;

        case '33':
            lftSide = "All in Top";

            var fstRow = cntrNos * agriNos * yrsNos;
            var sndColmn = cntrNos * yrsNos;
<<<<<<< HEAD
            vall1 = Sectors;
            vall2 = Countries;
            vall3 = Years;
=======
			
			if(arrageOrderByTop[0]=="Sector"){
				var sndColmn = cntrNos * yrsNos;
				if(arrageOrderByTop[1] == "Country"){	
					var spnValue = yrsNos;
					var vall1 = Sectors;
					var vall2 = Countries;
					var vall3 = Years;				
				}else{
					var spnValue = cntrNos;
					var vall1 = Sectors;
					var vall2 = Years;
					var vall3 = Countries;
				}
			}
			
			if(arrageOrderByTop[0]=="Country"){
				var sndColmn = agriNos * yrsNos;
				if(arrageOrderByTop[1] == "Sector"){
					var spnValue = yrsNos;
					var vall1 = Countries;
					var vall2 = Sectors;
					var vall3 = Years;					
				}else{
					var spnValue = agriNos;
					var vall1 = Countries;
					var vall2 = Years;
					var vall3 = Sectors;
				}
			}
			
			if(arrageOrderByTop[0]=="Year"){
			var sndColmn = agriNos * cntrNos;
			if(arrageOrderByTop[1] == "Sector"){
					var spnValue = cntrNos;
					var vall1 = Years;
					var vall2 = Sectors;
					var vall3 = Countries;					
				}else{
					var spnValue = agriNos;
					var vall1 = Years;
					var vall2 = Countries;
					var vall3 = Sectors;				
				}
			}
			
>>>>>>> Develop
            showGTable4();
            break;

        }

        function showGTable() {

            for (k = 0; k < rowNumss; k++) {


                content += "<tr>";
                for (j = 0; j < colNumss; j++) {
                    if (j == 0) {
                        if (k == 0) {
                            content += "<td class='cnts'></td>";
                        } else if (k == 1) {
                            content += "<td class='cnts'></td>";
                        } else {
                            content += "<td class='cnts'><b>" + vall[g] + "</b></td>";
                            g++;
                        }
                    } else if (k == 0) {

                        if (j <= divValue) {
                            content += "<td class='sects' colspan=" + spanValue1 + "><b>" + vall1[g1] + "</b></td>";
                            g1++;
                        }

                    } else if (k == 1) {
                        content += "<td class='yrs'><b>" + vall2[g2] + "</b></td>";
                        if (g2 < vall2.length - 1) {
                            g2++;
                        } else {
                            g2 = 0;
                        }
                    } else {

<<<<<<< HEAD
                        content += "<td>" + dataValues[dataSeries] + "</td>";

                        //content += "<td>25</td>";
=======
                        content += "<td>" + dataValues1[dataSeries] + "</td>";
>>>>>>> Develop
                        dataSeries++;
                    }

                }
                content += "</tr>";

            }
            content += "</table>";
        }


        function showGTable2() {

            for (k = 0; k < colNumss; k++) {
                if (k < 2) {
                    content += "<td><b></b></td>";
                } else {
                    var g2 = k - 2;
                    content += "<td class='sects'><b>" + vall1[g2] + "</b></td>";
                }
            }


            for (i = 0; i < rowNoss; i++) {
                content += "<tr>";
                for (j = 0; j < colNumss; j++) {
                    if (j == 0) {
                        if (i % spanValue1 == 0) {
                            content += "<td class='cnts' rowspan=" + spanValue1 + "><b>" + vall2[g] + "</b></td>";
                            g = g + 1;
                        }
                    } else if (j == 1) {
                        content += "<td class='yrs'><b>" + vall3[g1] + "</b></td>";
                        if (g1 < vall3.length - 1) {
                            g1 = g1 + 1;
                        } else {
                            g1 = 0;
                        }

                    } else {
<<<<<<< HEAD
                        //content += "<td>10</td>";
                        content += "<td>" + dataValues[dataSeries] + "</td>";
=======

						content += "<td>" + dataValues1[dataSeries] + "</td>";
>>>>>>> Develop
                        dataSeries++;
                    }
                }
                content += "</tr>";
            }
            content += "</table>";
        }

        function showGTable3() {

            for (i = 0; i < rowNoss; i++) {
                content += "<tr>";
                for (j = 0; j < 4; j++) {
                    if (j == 0) {
                        if (i % sndColmn == 0) {
                            content += "<td class='sects' rowspan=" + sndColmn + "><b>" + vall1[g] + "</b></td>";
                            g++;
                        }
                    } else if (j == 1) {
<<<<<<< HEAD
                        if (i % yrsNos == 0) {
                            content += "<td class='cnts' rowspan=" + yrsNos + "><b>" + vall2[g1] + "</b></td>";
=======
                        if (i % spnValue == 0) {
                            content += "<td class='cnts' rowspan=" + spnValue + "><b>" + vall2[g1] + "</b></td>";
>>>>>>> Develop
                            if (g1 < vall2.length - 1) {
                                g1++;
                            } else {
                                g1 = 0;
                            }
                        }
                    } else if (j == 2) {
                        content += "<td class='yrs'><b>" + vall3[g2] + "</b></td>";
                        if (g2 < vall3.length - 1) {
                            g2++;
                        } else {
                            g2 = 0;
                        }
                    } else {
<<<<<<< HEAD
                        //content += "<td>110</td>";
                        content += "<td>" + dataValues[dataSeries] + "</td>";
=======
                        
                        content += "<td>" + dataValues1[dataSeries] + "</td>";
>>>>>>> Develop
                        dataSeries++;
                    }
                }
                content += "</tr>";

            }
            content += "</table>";
        }


        function showGTable4() {

            for (k = 0; k < 4; k++) {

                content += "<tr>";
                for (j = 0; j < fstRow; j++) {
                    if (k == 0) {
                        if (j % sndColmn == 0) {
                            content += "<td class='sects' colspan=" + sndColmn + "><b>" + vall1[g] + "</b></td>";
                            g++;
                        }
                    } else if (k == 1) {
<<<<<<< HEAD
                        if (j % yrsNos == 0) {
                            content += "<td class='cnts' colspan=" + yrsNos + "><b>" + vall2[g1] + "</b></td>";
=======
                        if (j % spnValue == 0) {
                            content += "<td class='cnts' colspan=" + spnValue + "><b>" + vall2[g1] + "</b></td>";
>>>>>>> Develop
                            if (g1 < vall2.length - 1) {
                                g1++;
                            } else {
                                g1 = 0;
                            }
                        }

                    } else if (k == 2) {
                        content += "<td class='yrs'><b>" + vall3[g2] + "</b></td>";
                        if (g2 < vall3.length - 1) {
                            g2++;
                        } else {
                            g2 = 0;
                        }
                    } else {
<<<<<<< HEAD
                        //content += "<td>10</td>";
                        content += "<td>" + dataValues[dataSeries] + "</td>";
=======
                       
                        content += "<td>" + dataValues1[dataSeries] + "</td>";
>>>>>>> Develop
                        dataSeries++;
                    }
                }
                content += "</tr>";

            }

            content += "</table>";
        }


<<<<<<< HEAD
        $(".tbleStru").append(content);

        $(".tbleBase").addClass(settings.addClasses);
=======
        $(this).append(content);
>>>>>>> Develop

        return this.each(function () {
            //$(this).css("color", settings.textColor);
        });


    }


}(jQuery));