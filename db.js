var connection;
exports.setupDBAndTable = function (conn) {
    //save connection
    connection = conn;
};

exports.getCountries = function (callback) {
    connection.query("SELECT * FROM countries", callback);
};

exports.getCountry = function (id, callback) {
    connection.query("SELECT b.sector_name,a.year,a.value FROM adata a,sector b WHERE a.sector_id=b.id and a.country_id="+id, callback);
};


exports.getChartFromDb = function (callback) {
    connection.query('select * from "myTab" order by "year","Country"', callback);
};

exports.getSurveyDataFromDb = function (query,callback) {
    connection.query(query, callback);
};

exports.getSectorsFromDb = function (callback) {
    connection.query('SELECT * FROM "sector" where id in (select distinct "sectorID" from chart_data)', callback);
};

exports.getCountriesFromDb = function (callback) {
    connection.query('select * from Countries where id in (select distinct "countryID" from chart_data)', callback);
};

exports.getCountryDetailsFromDb = function (query,callback) {
    connection.query(query, callback);
};

exports.getSectorDataFromDb = function (query,callback) {
    connection.query(query, callback);
};

exports.getYearsFromDb = function (callback) {
    connection.query('SELECT "Year" FROM "Timestamp" where id in (select distinct "timestampID" from chart_data)', callback);
};

exports.getCountryDescriptionFromDb = function (callback) {
    connection.query("select * from country_description", callback);
};


