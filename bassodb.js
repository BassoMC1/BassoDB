const fs = require('fs');

function model(filename, Schema) {
  const model = {};

  model.findOne = function(query, callback) {
    const lines = fs.readFileSync(filename, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const myArray = lines[i].split(",");
      const keys = myArray[0].split(">");
      const values = myArray[1].split(">");
      const bassodb = {};
      for (let i = 0; i < keys.length; i++) {
        bassodb[keys[i]] = values[i].replace(/\r/g, '');
      }
      if (Object.keys(query).every((key) => bassodb[key] === query[key])) {
        return callback(null, bassodb);
      }
    }
    callback("Document not found", null);
  };

  model.UptateData = function(query, update, callback) {
    const lines = fs.readFileSync(filename, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const myArray = lines[i].split(",");
      const keys = myArray[0].split(">");
      const values = myArray[1].split(">");
      const bassodb = {};
      for (let i = 0; i < keys.length; i++) {
        bassodb[keys[i]] = values[i].replace(/\r/g, '');
      }
      if (Object.keys(query).every((key) => bassodb[key] === query[key])) {
        // Update the data in the file
        const updatedData = Object.assign({}, bassodb, update);
        const updatedLine = `${Object.keys(updatedData).join('>')},${Object.values(updatedData).join('>')}\n`;
        const data = fs.readFileSync(filename, 'utf8');
        const newData = data.replace(lines[i] + '\n', updatedLine);
        fs.writeFileSync(filename, newData, 'utf8');
        
        return callback(null, updatedData);
      }
    }
    callback("Document not found", null);
  };
  
  return model;
}

module.exports = {
  model,
};
