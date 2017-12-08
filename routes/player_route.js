var express = require('express'); // require Express
var router = express.Router(); // setup usage of the Express router engine

var db = require('../app/model/db_manager');

router.get('/', function (req, res, next) {
    var player_id = req.query.player_id;
    if (player_id) {
        db.Player.getPlayer(req.query.player_id).then(function (player) {
            res.json(player);
        }).catch(next);
    } else {
        db.Player.getAllPlayers().then(function (players) {
            res.json(players);
        }).catch(next);
    }
});

router.post('/', function (req, res, next) {
    var player = req.body.player;
    db.Player.updatePlayer(player).then(function (player) {
        res.json({
            status: "Status",
            player: player
        })
    }).catch(next);
});

router.put('/', function (req, res, next) {
    var player = req.body.player;
    db.Player.addPlayer(player).then(function (player) {
        res.json({
            status: "Status",
            player: player
        })
    }).catch(next);
});

router.delete('/', function (req, res, next) {
    var player_id = req.body.player_id;
    db.Player.deletePlayer(player_id).then(function () {
        res.json({
            status: "Status"
        })
    }).catch(next);
});

module.exports = router;