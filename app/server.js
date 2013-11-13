var express = require('express'),
    http = require('http'),
    path = require('path');
var pg = require('pg');
var url = require("url");
lib = require('./db.js');

//Congifure eXxpress
var app = express();

//var conString = "postgres://fuotbizevfhggj:q8DhvxsH1x_lim4xjNouIHrKDw@ec2-107-22-186-169.compute-1.amazonaws.com:5432/d8phhsdnscr56l";
var conString = "postgres://postgres:123456@localhost:5432/ashokadb";

var connection = new pg.Client(conString);
connection.connect(function () {
    lib.setupDBAndTable(connection);
});

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('Cookies'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '/')));
    app.use(function (req, res) {
        // Use res.sendfile, as it streams instead of reading the file into memory.
        res.sendfile(__dirname + '/index.html');
    });
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/getSurveyData', function (request, response) {
    var jsobObject, jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
    var client = new pg.Client(conString);

    var fistOrder = request.query.orderby1;
    var scndOrder = request.query.changeOrderBy;

    if (scndOrder == 12 || scndOrder == 100) {
        fistOrder = '"countries"."country", "Timestamp"."Year" DESC,  "sector"."sector_name"';
    }
    if (scndOrder == 0 || scndOrder == 33) {
        fistOrder = '"sector"."sector_name", "countries"."country", "Timestamp"."Year" DESC';
    }
    if (scndOrder == 10) {
        fistOrder = '"countries"."country", "sector"."sector_name", "Timestamp"."Year" DESC';
    }
    if (scndOrder == 11) {
        fistOrder = '"sector"."sector_name", "Timestamp"."Year" DESC, "countries"."country"';
    }
    if (scndOrder == 23) {
        fistOrder = '"Timestamp"."Year" DESC,  "countries"."country", "sector"."sector_name"';
    }
    if (scndOrder == 22) {
        fistOrder = '"countries"."country", "Timestamp"."Year" DESC, "sector"."sector_name"';
    }
    if (scndOrder == 21) {
        fistOrder = '"sector"."sector_name", "Timestamp"."Year" DESC, "countries"."country"';
    }

    query1 = 'select countries.country as country, sector.sector_name as sector, "Timestamp"."Year" as year, chart_data.value as value FROM ';
    query1 += 'public.countries, public.chart_data, public.sector, public."Timestamp" WHERE countries.id = chart_data."countryID" AND ';
    query1 += 'chart_data."timestampID" = "Timestamp".id AND sector.id = chart_data."sectorID" ORDER BY ';
    query1 += fistOrder;

    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query(query1, function (err, result) {
            if (err) {
                console.error('error running query', err);
                return response.send(500);
            }

            for (i = 0; i <= result.rows.length; i++) {
                if (result.rows[i] != null) {
                    jsobObject = JSON.stringify(result.rows[i]);
                    stringArray.push(result.rows[i]);
                }
            }
            client.end();
            jsobObjectFullSet = JSON.stringify(stringArray);
            response.setHeader('Access-Control-Allow-Origin', "*");
            response.setHeader('Content-Type', "application/json");
            response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
            response.end(jsobObjectFullSet);
        });
    });


});

//start the Server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});