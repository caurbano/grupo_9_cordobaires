const db = require('../database/models');

const mainController = {
    //Home
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

    //Vista de error
    error404: async (req, res) => {
        res.render('error404', { id: 'error404', title: 'LUMEN Lights Shop'});  
    }
}

module.exports = mainController;