var connection;
exports.setupDBAndTable = function (conn) {
    //save connection
    connection = conn;
};

exports.getCountries = function (callback) {
    connection.query("SELECT * FROM countries", callback);
};

exports.getCountry = function (id, callback) {
	console.log("line 1 reached");
    connection.query("SELECT b.name,a.year,a.value FROM adata a,sectors b WHERE a.sectors_id=b.id and a.country_id="+id, callback);
};


exports.getChartFromDb = function (callback) {
	console.log("line 2 reached");
    connection.query('select * from "myTab" order by "year","Country"', callback);
};

exports.getSurveyDataFromDb = function (query,callback) {
console.log("line 3 reached");
    connection.query(query, callback);
};

exports.getSectorsFromDb = function (callback) {
	console.log("line 4 reached");
    connection.query('SELECT * FROM "sectors" where id in (select distinct "sectorID" from chart_data)', callback);
};

exports.getCountriesFromDb = function (callback) {
	console.log("line 5 reached");
    connection.query('select * from countries where id in (select distinct "countryID" from chart_data)', callback);
};

exports.getCountryDetailsFromDb = function (query,callback) {
	console.log("line 6 reached");
    connection.query(query, callback);
};

exports.getSectorDataFromDb = function (query,callback) {
	console.log("line 7 reached");
    connection.query(query, callback);
};

exports.getYearsFromDb = function (callback) {
	console.log("line 8 reached");
    connection.query('SELECT "Year" FROM "Timestamp" where id in (select distinct "timestampID" from chart_data)', callback);
};

exports.getCountryDescriptionFromDb = function (callback) {
    connection.query("select * from country_description", callback);
};


