const fs = require('fs');
const path = require('path');

module.exports = cartController = {

    cart: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render('./products/productCart', { product: products, id: 'productCart', title: 'LUMEN - Carrito de compras' });
    }
}
