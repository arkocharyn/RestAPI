var db_connection = require('./db_connection.js');
var Team = require('./js/team_model');
var Player = require('./js/player_model');
module.exports = {
    connection: db_connection.connection,
    Team: Team,
    Player: Player
};

