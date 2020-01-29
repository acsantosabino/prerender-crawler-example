const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var recipe = require("../models/recipe").recipe;
const csv = require("../utils/json2csv")

const options = {
    referrer: "https://example.com/",
    includeNodeLocations: true,
    storageQuota: 10000000
};

var Crawler = require("crawler");
 
var c = new Crawler({
    maxConnections : 5,
    timeout: 50000,
    rateLimit: 100,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            const dom = new JSDOM(res.body);//, options);
            parseRecipe(dom);
        }
        done();
    }
});

function parseRecipe(dom){
    table = dom.window.document.getElementsByTagName('tr');
    var i, j=0;
    for (i = 1; i < table.length; i++) {
        let beer = table[i].getElementsByTagName('td');
        if(beer.length >= 12){
            j++;
            recipe.url = beer[0].getElementsByTagName("a")[1].getAttribute("href");
            recipe.id = beer[0].getElementsByTagName("a")[1].getAttribute("href").split('/')[4];
            recipe.style = beer[1].getElementsByTagName('span')[0].textContent.trim();
            recipe.size_l = beer[2].getElementsByTagName('span')[0].textContent.trim();
            recipe.og = beer[5].textContent.trim();
            recipe.fg = beer[6].textContent.trim();
            recipe.abv = beer[3].textContent.trim();
            recipe.ibu = beer[4].textContent.trim();
            recipe.color = beer[7].textContent.trim();
            recipe.brew_method = beer[8].textContent.trim();
            recipe.views = beer[9].textContent.trim();
            recipe.brewed = beer[10].textContent.trim();
            let rate = beer[11].getElementsByClassName("active").length;
            if(beer[11].getElementsByClassName("last").length > 0){
                rate += parseFloat(beer[11].getElementsByClassName("last")[0].style.width) / 100;
                recipe.rate = rate;
            }
            i++;
            beer = table[i].getElementsByTagName('td');
            recipe.name = beer[1].textContent.split(':')[1].trim();
            if(beer[4].getElementsByTagName('a').length > 0){
                recipe.user_id = beer[4].getElementsByTagName('a')[0].href.split('/').pop().trim();
            }
            recipe.boil_size = beer[5].textContent.split(':')[1].trim();
            recipe.boil_time = beer[6].textContent.split(':')[1].trim();
            recipe.boil_gravity = beer[7].textContent.split(':')[1].trim();
            recipe.efficiency = beer[8].textContent.split(':')[1].trim();
            recipe.mash_thickness = beer[9].textContent.split(':')[1].trim();
            recipe.sugar_scale = beer[10].textContent.split(':')[1].trim();
            recipe.brew_method = beer[11].textContent.split(':')[1].trim();
            recipe.pitch_rate = beer[12].textContent.split(':')[1].trim();
            recipe.primary_temp = beer[13].textContent.split(':')[1].trim();
            recipe.priming_method = beer[14].textContent.split(':')[1].trim();
            recipe.priming_amount = beer[15].textContent.split(':')[1].trim();
            csv.addRecipetoCsv("recipes.csv", recipe);
        }
    }
}

function fetchRecipes(id) {
    JSDOM.fromURL(  
        'https://www.brewersfriend.com/homebrew/recipe/view/'+id,
        options).then(dom => {
            recipe_stats = dom.window.document.getElementsByClassName("viewStats");
            recipe.url = dom.window.location.pathname;
            recipe.name = dom.window.document.getElementsByTagName("h3")[0].textContent.trim();
            recipe.brew_method = recipe_stats[0].getElementsByTagName("strong")[0].textContent.trim();
            recipe.style = recipe_stats[1].getElementsByTagName("a")[0].innerHTML;
            recipe.boil_time = recipe_stats[2].getElementsByTagName("strong")[0].textContent.trim();
            recipe.size_l = recipe_stats[3].getElementsByTagName("span")[1].innerHTML;
            recipe.boil_size = recipe_stats[4].getElementsByTagName("strong")[0].textContent.trim();
            recipe.boil_gravity = recipe_stats[5].getElementsByTagName("strong")[0].textContent.trim();
            recipe.efficiency = recipe_stats[6].getElementsByTagName("strong")[0].textContent.trim();
            recipe.og = dom.window.document.getElementsByClassName("value ogBatch")[0].textContent.trim();
            recipe.fg = dom.window.document.getElementsByClassName("value fgBatch")[0].textContent.trim();
            recipe.abv = dom.window.document.getElementsByClassName("value abvMin")[0].textContent.trim();
            recipe.ibu = dom.window.document.getElementsByClassName("value ibuMin")[0].textContent.trim();
            recipe.color = dom.window.document.getElementsByClassName("value srmMin")[0].textContent.trim();
            recipe.mash_thickness = dom.window.document.getElementsByClassName("value phMin")[0].textContent.trim();
            recipe.pitch_rate = dom.window.document.getElementsByTagName("td")[105].textContent.trim().split('\t')[0];
            recipe.primary_temp = dom.window.document.getElementsByTagName("td")[103].textContent.trim().split('\t')[0];
            recipe.priming_amount = dom.window.document.getElementsByTagName("td")[93].textContent.trim().split('\t')[0];
            recipe.priming_method = dom.window.document.getElementsByTagName("thead")[5].textContent.trim().split(' - ').pop();
            console.log(recipe)
        });
}

function fetchAllRecipes() {
    var page, list = [];
    csv.createRecipeCsv("recipes.csv")
    for(page=1;page<=7735;page++){
        list[page-1] = 'http://localhost:3000/render?url=https://www.brewersfriend.com/homebrew-recipes/page/'+page+'/?sort=breweddown';
    }
    c.queue(list)
}

module.exports.fetchRecipes = fetchRecipes
module.exports.fetchAllRecipes = fetchAllRecipes