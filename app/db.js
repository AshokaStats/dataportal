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
