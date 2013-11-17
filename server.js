var express = require('express'),
 http = require('http'),
 path = require('path');
var pg = require('pg'); 
var url = require("url");
 lib = require('./db.js');
  
 //Congifure eXxpress
var app = express();

//var conString = "postgres://nngkaduymeakiv:zviiKPnEWEslub1JM6NCFT4Mfn@ec2-54-204-41-249.compute-1.amazonaws.com:5432/d8ghvp9f4kefd5";
var conString = "postgres://postgres:postpass@localhost:5432/ashoka";

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
    app.use(function(req, res) {
 	 // Use res.sendfile, as it streams instead of reading the file into memory.
 		 res.sendfile(__dirname + '/index.html');
	});
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/getChartData', function(request, response){
  
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
		lib.getChartFromDb(function(err, result){
		    if(err) {
		   	  console.error('could not connect to postgres', err);
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		 });
		
		
});

app.get('/getSurveyData', function(request, response){
	var jsobObject, jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
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

    if(scndOrder == 77){
        fistOrder = '"sector"."sector_name", "countries"."country", "Timestamp"."Year" DESC';           
    }
	query1 = 'select countries.country as country, sector.sector_name as sector, "Timestamp"."Year" as year, chart_data.value as value FROM ';
    query1 += 'public.countries, public.chart_data, public.sector, public."Timestamp" WHERE countries.id = chart_data."countryID" AND ';
    query1 += 'chart_data."timestampID" = "Timestamp".id AND sector.id = chart_data."sectorID" ORDER BY ';
    query1 += fistOrder;
    lib.getSurveyDataFromDb(query1, function (err, result) {
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
            jsobObjectFullSet = JSON.stringify(stringArray);
            response.setHeader('Access-Control-Allow-Origin', "*");
            response.setHeader('Content-Type', "application/json");
            response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
            response.end(jsobObjectFullSet);
        });
});




app.get('/getSectors', function(request, response){
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
		 lib.getSectorsFromDb(function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
		
});

app.get('/getCountries', function(request, response){
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
	var client = new pg.Client(conString);
		  lib.getCountriesFromDb(function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
});


app.get('/getCountryDetails', function(request, response){
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
    //if id is passed, return that country
		if (request.query.id) {
			lib.getCountryDetailsFromDb('SELECT b.sector_name,c."Year",a.value FROM chart_data a,sector b,"Timestamp" c WHERE a."sectorID"=b.id and a."timestampID"=c.id and a."countryID"='+request.query.id, function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
		} else { //return all countries
			lib.getCountryDetailsFromDb('select * from Countries', function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
		}
});


app.get('/getSectorData', function(request, response){
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
			//if id is passed, return that country
			lib.getSectorDataFromDb('select "Timestamp"."Year", sector.sector_name, countries.country, chart_data."value" from chart_data, sector, countries, "Timestamp" where countries.id=chart_data."countryID" and "Timestamp"."id"=chart_data."timestampID" and chart_data."sectorID"='+'(select id from sector where sector_name=\''+request.query.id+'\') and sector.id='+'(select id from sector where sector_name=\''+request.query.id+'\') group by "Timestamp"."Year",sector.sector_name, countries.country, chart_data."value"', function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
});


app.get('/getYears', function(request, response){
    var jsobObject,jsobObjectFullSet;
    var stringArray = [];
    var countArray = [];
    var locationArray = [];
		  lib.getYearsFromDb(function(err, result)
		  {
		    if(err) {
		      console.error('error running query', err);
		      return response.send(500);
		    }
		   
		    for(i=0;i<=result.rows.length;i++)
			{ 
			if(result.rows[i]!=null)
			{
				jsobObject=JSON.stringify(result.rows[i]);
				stringArray.push(result.rows[i]);
			}	
			}
		  	jsobObjectFullSet= JSON.stringify(stringArray);
		  	response.setHeader('Access-Control-Allow-Origin', "*");
			response.setHeader('Content-Type', "application/json");
			response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    		response.end(jsobObjectFullSet);
		  });
});


app.get('/getCountryDescription', function(request, response){


    var jsobObject, jsobObjectFullSet;
    var stringArray = [];
        lib.getCountryDescriptionFromDb(function (err, result) {
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
            jsobObjectFullSet = JSON.stringify(stringArray);
            response.setHeader('Access-Control-Allow-Origin', "*");
            response.setHeader('Content-Type', "application/json");
            response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
            response.end(jsobObjectFullSet);
        });		
});


//start the Server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});