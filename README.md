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

```javascript
const DB = require("./index");
const bassodb = DB.findOne({name: "BassoMC"})

console.log(bassodb)
```
output
```
{ name: 'BassoMC', age: '17', email: 'test@test.com' }
```


text.txt file 
```
name>age>email,BassoMC>17>test@test.com
name>age>email,jaacob>16>test@test.com
name>age>email,dibus>19>test@test.com
```

