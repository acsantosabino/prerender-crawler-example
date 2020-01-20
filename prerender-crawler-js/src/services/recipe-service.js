const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const options = {
    referrer: "https://example.com/",
    includeNodeLocations: true,
    storageQuota: 10000000
};

function fetchAllRecipes() {
    JSDOM.fromURL(
        'http://localhost:3000/render?url=https://www.brewersfriend.com/homebrew-recipes/page/1/?sort=breweddown',
        options).then(dom => {
            table = dom.window.document.getElementsByTagName('tr');
            var i, j;
            for (i = 1; i < table.length; i++) {
                let beer = table[i].getElementsByTagName('td');
                for (j = 0; j < beer.length; j++) {
                    if (beer[j].childElementCount == 0) {//firstElementChild.tagName != 'beer'){

                        console.log(j + " : " + beer[j].outerHTML + '\n')
                    }
                }
                console.log(beer[1].getElementsByTagName('span')[0].textContent.trim());
                console.log(beer[2].getElementsByTagName('span')[0].textContent.trim());
                console.log(beer[3].textContent.trim());
                console.log(beer[4].textContent.trim());
                console.log(beer[5].textContent.trim());
                console.log(beer[6].textContent.trim());
                console.log(beer[7].textContent.trim());
                console.log(beer[8].textContent.trim());
                console.log(beer[9].textContent.trim());
                console.log(beer[10].textContent.trim());
                let rate = beer[11].getElementsByClassName("active").length;
                rate += parseFloat(beer[11].getElementsByClassName("last")[0].style.width) / 100;
                console.log(rate)
                i++;
                beer = table[i].getElementsByTagName('td');
                console.log(beer[0].getElementsByTagName('td')[0].textContent.trim());
            }
        });
}

module.exports.fetchAllRecipes = fetchAllRecipes