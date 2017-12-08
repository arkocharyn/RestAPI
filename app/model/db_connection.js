var promise = require('bluebird');
var parseDbUrl = require("parse-database-url");

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

module.exports = {
    createConnection: function () {
        var url_data = parseDbUrl("postgresql://rest_api:rest_api_password@93.187.165.87:5432/rest_api");

        var ssl = false;

        return pgp({
            user: url_data.user,
            password: url_data.password,
            database: url_data.database,
            host: url_data.host,
            port: url_data.port,
            ssl: ssl
        });
    },
    pgp: pgp
};
