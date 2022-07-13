const fs = require('fs');
const path = require('path');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

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
    },

    gallery: async (req, res) => {
        await db.Product.findAll({include: ['images']})
        .then(function(products){
            res.render('./products/productList', { 
                id: 'productList', 
                category: req.params.category, title: 'LUMEN - Galería ', 
                products: products 
            });
        })
        .catch(error => res.send(error));
    },

    // search: async (req, res) => {
    //     db.Product.findAll({
    //         where: {
    //             category: {[Op.like]: '%%'}
    //             //req.body
    //         }
    //     })
        
        // catch{
        //     error => res.send(error)
        // }}
    
}