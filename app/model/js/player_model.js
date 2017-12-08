/**
 * Created by Hayk on 30/03/2017.
 */
var Promise = require('promise');
var db = require('../db_connection');
var TABLE = "player";
module.exports = {
    getAllPlayers: function () {
        return db.connection.any('SELECT * FROM ' + TABLE);
    },
    getPlayer: function (player_id) {
        return db.connection.oneOrNone('SELECT * FROM ' + TABLE + ' where id = ' + player_id);
    },
    updatePlayer: function (player) {
        return new Promise(function (resolve, reject) {
            var player_id = player.id;
            var updateArr = [];
            if (player.name) {
                updateArr.push('name=${name}');
            }
            if (player.number) {
                updateArr.push('number=${number}');
            }
            if (player.salary) {
                updateArr.push('salary=${salary}');
            }
            if (player.team_id) {
                updateArr.push('team_id=${team_id}');
            }

            db.connection.any('UPDATE ' + TABLE + ' set ' + updateArr.join(',') + ' where id=' + player_id + ' RETURNING *', player).then(function (data) {
                resolve(data);
            }).catch(reject);
        });
    },

    deletePlayer: function (player_id) {
        return db.connection.any('DELETE FROM ' + TABLE + ' WHERE id=' + player_id);
    },

    addPlayer: function (player) {
        return new Promise(function (resolve, reject) {
            db.connection.any('INSERT INTO ' + TABLE + ' (name, number, salary, team_id) values (${name},${number},${salary},${team_id}) RETURNING *', player).then(function (data) {
                resolve(data);
            }).catch(reject);
        });
    }
};
