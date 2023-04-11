const fs = require('fs');

function model(filename, schema) {
  const model = {};

  model.findOne = function(query, callback) {
    const lines = fs.readFileSync(filename, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const myArray = lines[i].split(",");
      const keys = myArray[0].split(">");
      const values = myArray[1].split(">");
      const bassodb = {};
      for (let i = 0; i < keys.length; i++) {
        bassodb[keys[i]] = values[i]
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
        bassodb[keys[i]] = values[i]
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

  model.create = function(data, callback) {
    const validation = validateData(data, schema.getSchema());
    if (validation.valid) {
      const line = convertToLine(data);
      fs.appendFile(filename, line, { encoding: 'utf8', flag: 'a' }, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, line);
        }
      });
    } else {
      callback(validation.errors);
    }
  };

  function validateData(data, schema) {
    const errors = [];
    let valid = true;
    for (const fieldName in schema) {
      if (schema[fieldName].required && !data[fieldName]) {
        valid = false;
        errors.push(`${fieldName} is required`);
      } else if (data[fieldName] && typeof data[fieldName] !== schema[fieldName].type) {
        valid = false;
        errors.push(`${fieldName} is not of type ${schema[fieldName].type}`);
      }
    }
    return { valid, errors };
  }

  function convertToLine(data) {
    let keys = '';
    let values = '';
    for (const fieldName in data) {
      keys += `${fieldName}>`;
      values += `${data[fieldName]}>`;
    }
    return `\n${keys.slice(0, -1)},${values.slice(0, -1)}`;
  }

  
  
  return model;
}

module.exports = {
  model,
};
