
//Loading NPM Modules
var express = require('express'),
    http = require('http'),
    path = require('path');
var pg = require('pg'),
    url = require("url");

//Database Queries    
var lib = require('./db.js');

//Start Express
var app = express();

//var conString = "postgres://nngkaduymeakiv:zviiKPnEWEslub1JM6NCFT4Mfn@ec2-54-204-41-249.compute-1.amazonaws.com:5432/d8ghvp9f4kefd5";
var conString = "postgres://postgres:postpass@localhost:5432/ashokaNew";

//Configure Node-Postgre Driver
var connection = new pg.Client(conString);
connection.connect(function () {
    lib.setupDBAndTable(connection);
});

//Setting Headers Globally
function setAllHeaders(response){
	   response.setHeader('Access-Control-Allow-Origin', "*");
        response.setHeader('Content-Type', "application/json");
        response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
};


//Configure Express
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
        res.sendfile(__dirname + '/index.html');
    });
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

//Express WebServices RESTFul

app.get('/getChartData', function (request, response) {
	lib.getChartFromDb(function (err, result) {
       return err ? response.json(err) : response.json(result.rows);
        setAllHeaders(response);
    });
});

app.get('/getSurveyData', function (request, response) {
    var fistOrder = request.query.orderby1,
    scndOrder = request.query.changeOrderBy;
    if (scndOrder == 12 || scndOrder == 100) {
        fistOrder = '"countries"."name", "Timestamp"."Year" DESC,  "sectors"."name"';
    }
    if (scndOrder == 0 || scndOrder == 33) {
        fistOrder = '"sectors"."name", "countries"."name", "Timestamp"."Year" DESC';
    }
    if (scndOrder == 10) {
        fistOrder = '"countries"."name", "sectors"."name", "Timestamp"."Year" DESC';
    }
    if (scndOrder == 11) {
        fistOrder = '"sectors"."name", "Timestamp"."Year" DESC, "countries"."name"';
    }
    if (scndOrder == 23) {
        fistOrder = '"Timestamp"."Year" DESC,  "countries"."name", "sectors"."name"';
    }
    if (scndOrder == 22) {
        fistOrder = '"countries"."name", "Timestamp"."Year" DESC, "sectors"."name"';
    }
    if (scndOrder == 21) {
        fistOrder = '"sectors"."name", "Timestamp"."Year" DESC, "countries"."name"';
    }

    if (scndOrder  ==  77) {      
        fistOrder  =  '"sectors"."name", "countries"."name", "Timestamp"."Year" DESC';              
    }

    //Dynamic Query
    query1 = 'select countries.name as country, sectors.name as sector, "Timestamp"."Year" as year, chart_data.value as value FROM ';
    query1 += 'public.countries, public.chart_data, public.sectors, public."Timestamp" WHERE countries.id = chart_data."countryID" AND ';
    query1 += 'chart_data."timestampID" = "Timestamp".id AND sectors.id = chart_data."sectorID" ORDER BY ';
    query1 += fistOrder;

    lib.getSurveyDataFromDb(query1, function (err, result) {
         return err ? response.json(err) : response.json(result.rows);
		setAllHeaders(response);
	});
});

app.get('/getSectors', function (request, response) {

    lib.getSectorsFromDb(function (err, result) {
        return err ? response.json(err) : response.json(result.rows);
        setAllHeaders(response);
	});
});

app.get('/getCountries', function (request, response) {
    var client = new pg.Client(conString);
    lib.getCountriesFromDb(function (err, result) {
         return err ? response.json(err) : response.json(result.rows);
	    setAllHeaders(response);
    });
});


app.get('/getCountryDetails', function (request, response) {
    //if id is passed, return that country
    if (request.query.id) {
        lib.getCountryDetailsFromDb('SELECT b.name,c."Year",a.value FROM chart_data a,sectors b,"Timestamp" c WHERE a."sectorID"=b.id and a."timestampID"=c.id and a."countryID"=' + request.query.id, function (err, result) {
            return err ? response.json(err) : response.json(result.rows);
		  setAllHeaders(response);
	  });
    } else { //return all countries
        lib.getCountryDetailsFromDb('select * from countries', function (err, result) {
             return err ? response.json(err) : response.json(result.rows);
            setAllHeaders(response);
	  });
    }
});

app.get('/getSectorData', function (request, response) {
    //if id is passed, return that country
    lib.getSectorDataFromDb('select "Timestamp"."Year", sectors.name, countries.name, chart_data."value" from chart_data, sectors, countries, "Timestamp" where countries.id=chart_data."countryID" and "Timestamp"."id"=chart_data."timestampID" and chart_data."sectorID"=' + '(select id from sectors where name=\'' + request.query.id + '\') and sectors.id=' + '(select id from sectors where name=\'' + request.query.id + '\') group by "Timestamp"."Year",sectors.name, countries.name, chart_data."value"', function (err, result) {
        return err ? response.json(err) : response.json(result.rows);
	   setAllHeaders(response);
	});
});


app.get('/getYears', function (request, response) {
	lib.getYearsFromDb(function (err, result) {
        return err ? response.json(err) : response.json(result.rows);
	   setAllHeaders(response);
	});
});


app.get('/getCountryDescription', function (request, response) {
	lib.getCountryDescriptionFromDb(function (err, result) {
         return err ? response.json(err) : response.json(result.rows);
	    setAllHeaders(response);
     });
});

//start the Server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});