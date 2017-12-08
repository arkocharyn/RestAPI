var Promise = require('promise');
var db = require('../db_connection');
var TABLE = "team";
module.exports = {
    getAllTeams: function () {
        return db.connection.any('SELECT * FROM ' + TABLE);
    },
    getTeam: function (team_id) {
        return db.connection.any('SELECT * FROM ' + TABLE + ' WHERE id=' + team_id);
    },
    updateTeam: function (team) {
        return new Promise(function (resolve,reject) {
            var team_id = team.id;
            var updateArr = [];
            if (team.name) {
                updateArr.push('name=${name}');
            }
            if (team.position) {
                updateArr.push('position=${position}');
            }
            if (team.budget) {
                updateArr.push('budget=${budget}');
            }

            db.connection.any('UPDATE ' + TABLE + ' set ' + updateArr.join(',') + ' where id=' + team_id + ' RETURNING *', team).then(function (data) {
                resolve(data);
            }).catch(reject);
        });

    },

    deleteTeam: function (team_id) {
        return new Promise(function (resolve, reject) {
            db.connection.any('DELETE FROM player where team_id=' + team_id).then(function () {
                db.connection.any('DELETE FROM ' + TABLE + ' WHERE id=' + team_id).then(function () {
                    resolve();
                }).catch(reject);
            }).catch(reject);
        });

    },

    addTeam: function (team) {
        return new Promise(function (resolve, reject) {
            db.connection.any('INSERT INTO ' + TABLE + ' (name, position, budget) values (${name},${position},${budget}) RETURNING *', team).then(function (data) {
                resolve(data);
            }).catch(reject);
        });
    }
};
