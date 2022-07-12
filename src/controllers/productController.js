const fs = require('fs');
const path = require('path');
const db = require('../../database/models');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = productController = {

    detail: async (req, res) => {
        let productDetail = await db.Product.findByPk(
            req.params.id, 
            {include: ['images']}
        );

        let relatedProducts = await db.Product.findAll({
            where: {
                id: { [db.Sequelize.Op.ne] : req.params.id },
                category: { [db.Sequelize.Op.eq] : productDetail.category },
            },
            include: ['images'],
            limit: 5
        });

        Promise.all([productDetail, relatedProducts])
        .then(function([product, products]){
            res.render('./products/productDetail', { 
                id: 'productDetail', 
                title: 'LUMEN - Detalle de productos', 
                product: product, 
                products: products 
            });
        })
        .catch(error => res.send(error));
        // const productDetail = products.find(elemento => { return elemento.id == req.params.id; });
        // let cant = 0;
        // let relatedProducts = products.filter(product => {
        //     if( product.category == productDetail.category && product.id != productDetail.id && cant < 5 ){
        //         cant++;
        //         return product;
        //     }
        // });
        // res.render('./products/productDetail', { id: 'productDetail', title: 'LUMEN - Detalle de productos', product: productDetail, products: relatedProducts });
    },

    category: async (req, res) => {
        let category = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1);
        let categoryProducts = await db.Product.findAll({
            where: {
                category: { [db.Sequelize.Op.eq] : category }
            },
            include: ['images']
        })
        .then(function(products){
            res.render('./products/categories', { 
                id: 'categories', 
                title: 'LUMEN - Categoría - ' + req.params.category, 
                category: category, 
                products: products
            });
        });

        
        // let productsFilter = products.filter(product => {
        //     return product.category === req.params.category;
        // });

        // let category = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1);

        // res.render('./products/categories', { 
        //     id: 'categories', category: category, 
        //     title: 'LUMEN - Categoría - ' + req.params.category, 
        //     products: productsFilter 
        // });
    },

    gallery: async (req, res) => {
        try{
            const resProduct = await db.Product.findAll({include: ['images']});
            res.render('./products/productList', 
                { 
                    id: 'productList', 
                    category: req.params.category, title: 'LUMEN - Galería ', 
                    products: resProduct
                });
        }
        catch{
            error => res.send(error)
        }
        // await db.Product.findAll()
        // .then(function(products){
        //     res.render('./products/productList', { 
        //         id: 'productList', 
        //         category: req.params.category, title: 'LUMEN - Galería ', 
        //         products: products 
        //     });
        // })
        // .catch(error => res.send(error));
    }
    
}