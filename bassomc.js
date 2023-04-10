const fs = require('fs');

function isBassoMC(filename, username) {
    const lines = fs.readFileSync(filename, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
            // console.log(lines[i]);
            const myArray = lines[i].split(",");
            //console.log(myArray[1])
            const keys = myArray[0].split(">");
            const values = myArray[1].split(">");
            const user = {};
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = values[i];
            }
            if(user.user1 === username) {
                console.log(user.user1, user.pass1, user.id1)
            }
    }

}



module.exports = {
    isBassoMC,
};