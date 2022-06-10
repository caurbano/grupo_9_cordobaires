const fs = require('fs');
const path = require('path');

const User = {

    fileName: '../data/users.json',

    getData: function(){
        let usersFilePath = path.join(__dirname, this.fileName);
        return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    },

    generateId: function(){
        let usersList = this.findAll();
        let lastUser = usersList.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function(){
        return this.getData();
    },

    findByPk: function(id){
        let usersList = this.findAll();
        let user = usersList.find(oneUser => oneUser.id == id);
        return user;
    },

    findByField: function(field, text){
        let usersList = this.findAll();
        let userFound = usersList.find(user => user[field] == text);
        return userFound;
    },

    create: function(userData){
        let usersList = this.findAll();
        let newUsers = {
            id: this.generateId(),
            ...userData
        }
        usersList.push(newUsers);
        fs.writeFileSync(path.join(__dirname, this.fileName), JSON.stringify(usersList, null, "\t"));
        return true;
    },

    delete: function(id){
        let usersList = this.findAll();
        let newUsersList = usersList.filter(user => {
            return user.id != id;
        });
        fs.writeFileSync(path.join(__dirname, this.fileName), JSON.stringify(newUsersList, null, "\t"));
        return true;
    }

}

module.exports = User;