var express = require('express'); // require Express
var router = express.Router(); // setup usage of the Express router engine

var db = require('../app/model/db_manager');

router.get('/', function (req, res, next) {
    var id = req.query.id;
    if (id) {
        db.Team.getTeam(req.query.id).then(function (team) {
            res.json({
                status: "success",
                team: team
            });
        }).catch(next);
    } else {
        db.Team.getAllTeams().then(function (teams) {
            res.json({
                status: "success",
                teams: teams
            });
        }).catch(next);
    }
});

router.post('/', function (req, res, next) {
    var team = req.body;
    db.Team.updateTeam(team).then(function (team) {
        res.json({
            status: "success",
            team: team
        })
    }).catch(next);
});

router.put('/', function (req, res, next) {
    var team = req.body;
    db.Team.addTeam(team).then(function (team) {
        res.json({
            status: "success",
            team: team
        })
    }).catch(next);
});

router.delete('/', function (req, res, next) {
    var id = req.body.id;
    db.Team.deleteTeam(id).then(function () {
        res.json({
            status: "success"
        })
    }).catch(next);
});

module.exports = router;