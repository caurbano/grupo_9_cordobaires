const fs = require('fs');
const path = require('path');

const MainController = {
    home: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('home', { id: 'home', title: 'LUMEN Lights Shop', products: products });
    },
}

module.exports = MainController;