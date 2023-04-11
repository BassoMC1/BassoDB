BassoDB
---
Bassodb is a light and user-friendly database package for Node.js. and it's in beta version so it doesn't have everything implemented yet


How to Install Bassodb
```
npm install bassodb
```


**Usage**
``` javascript
const BassoDB = require('bassodb');

const UserSchema = new bassodb.Schema();
UserSchema.addField('name', { type: 'string', required: true });
UserSchema.addField('age', { type: 'number', required: true });
UserSchema.addField('email', { type: 'string' });

const DB = bassodb.model('text.txt', UserSchema);
module.exports = DB;

```
Get Data
```javascript
const DB = require("./index");

DB.findOne({ name: "BassoMC" }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
});

console.log(bassodb)
```
output
```
{ name: 'BassoMC', age: '17', email: 'test@test.com' }
```
Uptate Data
```javascript
const DB = require("./index");

DB.UptateData({ name: "BassoMC" }, { email: "BassoMC@gmail.com", age: 18, }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
});
```
output
```
{ name: 'BassoMC', age: 18, email: 'BassoMC@gmail.com' }
```





text.txt file:
```
name>age>email,BassoMC>17>test@test.com
name>age>email,jaacob>16>test@test.com
name>age>email,dibus>19>test@test.com
```
Removing data:
```javascript
DB.RemoveOne({ name: 'jaacob' }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
});
```
text.txt file:
```
name>age>email,BassoMC>17>test@test.com
name>age>email,dibus>19>test@test.com
```
Create new data:
```javascript
DB.create({ name: "jaacob", age: 25, email: "test@test.com"}, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
```
text.txt file:
```
name>age>email,BassoMC>17>test@test.com
name>age>email,dibus>19>test@test.com
name>age>email,jaacob>25>test@test.com
```
