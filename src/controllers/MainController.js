const db = require('../database/models');

const mainController = {
    home: async (req, res) => {
        await db.Product.findAll({
            attributes:['id', 'name', 'price', 'discount'],
            include: ['images'],
            limit: 5
        })
        .then(function(products){
            res.render('home', { id: 'home', title: 'LUMEN Lights Shop', products: products });
        });
    },

    error404: async (req, res) => {
        res.render('error404', { id: 'error404', title: 'LUMEN Lights Shop'});  
    }
}

module.exports = mainController;