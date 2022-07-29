const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = productController = {

    //Detalle
    detail: async (req, res) => {
        let productDetail = await db.Product.findByPk(
            req.params.id, 
            {
                attributes:['id', 'name', 'description', 'category', 'price', 'discount', 'stock'],
                include: ['images']
            }
        );

        let relatedProducts = await db.Product.findAll({
            attributes:['id', 'name', 'price', 'discount'],
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

    //Categorías
    category: async (req, res) => {
        let category = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1);
        await db.Product.findAll({
            attributes:['id', 'name', 'price', 'discount'],
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

    //Galería completa
    gallery: async (req, res) => {
        await db.Product.findAll({
            attributes:['id', 'name', 'price', 'discount'],
            include: ['images']
        })
        .then(function(products){
            res.render('./products/productList', { 
                id: 'productList', 
                category: req.params.category, title: 'LUMEN - Galería ', 
                products: products 
            });
        })
        .catch(error => res.send(error));
    },

    //Búsqueda por NOMBRE
    search: async (req, res) => {
        await db.Product.findAll({
            attributes:['id', 'name', 'price', 'discount'],
            where: {
                name: {[Op.substring]: req.body.search}
            },
            include: ['images']
        })
        .then(products => {
            res.render('./products/categories', { 
                id: 'productList', 
                category: req.body.search,
                title: 'LUMEN - Galería ', 
                products: products 
            });
        })
        .catch(error => res.send(error));
    }
    
}