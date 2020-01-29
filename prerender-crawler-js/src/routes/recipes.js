var express = require('express');
var router = express.Router();
const service = require('../services/recipe-service')

/* GET users listing. */
router.get('/', function(req, res, next) {
    service.fetchAllRecipes();
    res.send("END")
});
router.get('/find', function(req, res, next){
    service.crawlRecipesXML();
    res.send("list");
})
router.get('/:id', function(req, res, next){
    service.fetchRecipes(req.params.id);
    res.send("recipe "+req.params.id);
})

module.exports = router;