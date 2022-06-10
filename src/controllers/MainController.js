const fs = require('fs');
const path = require('path');

const mainController = {
    home: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('home', { id: 'home', title: 'LUMEN Lights Shop', products: products });

        // const usersFilePath = path.join(__dirname, '../data/users.json');
        // let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        // res.render('home', { id: 'home', title: 'LUMEN Lights Shop', users: users });

    }
}

module.exports = mainController;