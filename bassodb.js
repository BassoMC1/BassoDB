const fs = require('fs');

function model(filename, Schema) {
    const model = {};
    //console.log(Schema)
    model.findOne = function(query) {
       // console.log(`Finding one document in ${filename} with query ${query}`);
      
        const lines = fs.readFileSync(filename, 'utf8').split('\n');
        for (let i = 0; i < lines.length; i++) {
          const myArray = lines[i].split(",");
          const keys = myArray[0].split(">");
          const values = myArray[1].split(">");
          const bassodb = {};
          for (let i = 0; i < keys.length; i++) {
            bassodb[keys[i]] = values[i].replace(/\r/g, '');
          }
          //console.log(user);
          if (Object.keys(query).every((key) => bassodb[key] === query[key])) {
            return bassodb;
          }
        }
        console.log("Document not found");
        return undefined
      };     
    return model;
}

module.exports = {
    model,
};




 