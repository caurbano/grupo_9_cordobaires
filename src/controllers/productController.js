const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = productController = {

    detail: (req, res) => {
        const productDetail = products.find(elemento => { return elemento.id == req.params.id; });
        let cant = 0;
        let relatedProducts = products.filter(product => {
            if( product.category == productDetail.category && product.id != productDetail.id && cant < 5 ){
                cant++;
                return product;
            }
        });
        res.render('./products/productDetail', { id: 'productDetail', title: 'LUMEN - Detalle de productos', product: productDetail, products: relatedProducts });
    },

    category: (req, res) => {
        let productsFilter = products.filter(product => {
            return product.category === req.params.category;
        })
        let category = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1);
        res.render('./products/categories', { id: 'categories', category: category, title: 'LUMEN - Categoría - ' + req.params.category, products: productsFilter });
    },

    gallery: (req, res) => {
        res.render('./products/productList', { id: 'productList', category: req.params.category, title: 'LUMEN - Galería ', products: products });
    },

    
}