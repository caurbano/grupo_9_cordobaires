const fs = require('fs');
const path = require('path');
const db = require('../../database/models');

const mainController = {
    home: async (req, res) => {
        await db.Product.findAll({
            include: ['images'],
            limit: 5
        })
        .then(function(products){
            res.render('home', { id: 'home', title: 'LUMEN Lights Shop', products: products });
        });
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        // const usersFilePath = path.join(__dirname, '../data/users.json');
        // let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        // res.render('home', { id: 'home', title: 'LUMEN Lights Shop', users: users });

    }
}

module.exports = mainController;