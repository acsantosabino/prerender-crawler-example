const fs = require('fs');
var recipe = require("../models/recipe").recipe;

function createRecipeCsv(filename){
    fs.writeFile(filename, Object.keys(recipe).join(';')+'\n', (err) => { 
        if (err) throw err; 
    })
}

function addRecipetoCsv(filename, new_recipe){
    fs.appendFile(filename, convertObjToCSV(new_recipe), (err) => { 
        if (err) throw err; 
    })
    
}

function convertObjToCSV(new_recipe){
    csv_line = ''
    Object.values(new_recipe).forEach((value)=>{
        if(value == '' || value == "N/A"){
            csv_line += '"";';
        } else if(isNaN(value)){
            csv_line += '"' + value + '";';
        } else {
            csv_line += value + ';';
        }
    });
    csv_line += '\n';
    return csv_line;
}

module.exports.createRecipeCsv = createRecipeCsv
module.exports.addRecipetoCsv = addRecipetoCsv