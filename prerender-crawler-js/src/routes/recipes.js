var express = require('express');
var router = express.Router();
const service = require('../services/recipe-service')

/* GET users listing. */
router.get('/', function(req, res, next) {
    service.fetchAllRecipes();
    res.send("END")
});

module.exports = router;