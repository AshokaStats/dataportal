/*
 
 Name: CreateGTable;
 Version: 1.0;
 Created By: Gopal Rengaraj;
 Technology Used: Jquery, Javascript;
 Requires: jQuery v2+ ;
 Description: Drag and Drop table structure. It is not standalone table, it has some dependencies with other data/array.
 Developing Mode: In progress.
 
 */
(function ($) {

    $.fn.createGTable = function (options) {

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

        cntrNos = settings.CountriesArr.length;
        agriNos = settings.SectorsArr.length;
        yrsNos = settings.YearsArr.length;
        Sectors = settings.SectorsArr;
        Countries = settings.CountriesArr;
        Years = settings.YearsArr;
        dataValues1 = settings.datavalueArr;
        dataValues = [];


        $.each(dataValues1, function (i, v) {
            if (dataValues1[i].sectorCode == "true" && dataValues1[i].YearCode == "true" && dataValues1[i].countryCode == "true") {
                console.log(dataValues1[i].country + "---" + dataValues1[i].sector + "---" + dataValues1[i].year + "---" + dataValues1[i].value + "---" + dataValues1[i].sectorCode + "---" + dataValues1[i].YearCode + "---" + dataValues1[i].countryCode);
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
        content = "<table class='tbleBase' cellspacing='0'>";

        pos = settings.initPos.toString();

        switch (pos) {
        case '23':
            lftSide = "year Only in left";

            colNumss = cntrNos * agriNos + 1;
            rowNumss = yrsNos + 2;
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
            showGTable();
            break;

        case '21':
            lftSide = "agri Only in left";

            colNumss = cntrNos * yrsNos + 1;
            rowNumss = agriNos + 2;
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
            vall = Sectors;
            showGTable();
            break;

        case '22':
            lftSide = "cntry Only in left";

            colNumss = agriNos * yrsNos + 1;
            rowNumss = cntrNos + 2;
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
            showGTable();
            break;

        case 1:
            lftSide = "nothing in left";
            rowNoss = 4;
            break;

        case '11':
            lftSide = "year & agri in left";

            rowNoss = agriNos * yrsNos;
            colNumss = cntrNos + 2;
            spanValue1 = yrsNos;
            vall1 = Countries;
            vall2 = Sectors;
            vall3 = Years;
            showGTable2();
            break;

        case '12':
            lftSide = "year & cntr in left";

            rowNoss = cntrNos * yrsNos;
            colNumss = agriNos + 2;
            spanValue1 = yrsNos;
            vall1 = Sectors;
            vall2 = Countries;
            vall3 = Years;
            showGTable2();
            break;

        case '10':
            lftSide = "cntry & agri in left";

            rowNoss = cntrNos * agriNos;
            colNumss = yrsNos + 2;
            spanValue1 = agriNos;
            vall1 = Years;
            vall2 = Countries;
            vall3 = Sectors;
            showGTable2();
            break;

        case '0':
            lftSide = "All in left";

            rowNoss = yrsNos * cntrNos * agriNos;
            var sndColmn = cntrNos * yrsNos;
            var Colmnum = agriNos * yrsNos;
            vall1 = Sectors;
            vall2 = Countries;
            vall3 = Years;
            showGTable3();
            break;

        case '33':
            lftSide = "All in Top";

            var fstRow = cntrNos * agriNos * yrsNos;
            var sndColmn = cntrNos * yrsNos;
            vall1 = Sectors;
            vall2 = Countries;
            vall3 = Years;
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

                        content += "<td>" + dataValues[dataSeries] + "</td>";

                        //content += "<td>25</td>";
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
                        //content += "<td>10</td>";
                        content += "<td>" + dataValues[dataSeries] + "</td>";
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
                        if (i % yrsNos == 0) {
                            content += "<td class='cnts' rowspan=" + yrsNos + "><b>" + vall2[g1] + "</b></td>";
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
                        //content += "<td>110</td>";
                        content += "<td>" + dataValues[dataSeries] + "</td>";
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
                        if (j % yrsNos == 0) {
                            content += "<td class='cnts' colspan=" + yrsNos + "><b>" + vall2[g1] + "</b></td>";
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
                        //content += "<td>10</td>";
                        content += "<td>" + dataValues[dataSeries] + "</td>";
                        dataSeries++;
                    }
                }
                content += "</tr>";

            }

            content += "</table>";
        }


        $(".tbleStru").append(content);

        $(".tbleBase").addClass(settings.addClasses);

        return this.each(function () {
            //$(this).css("color", settings.textColor);
        });


    }


}(jQuery));