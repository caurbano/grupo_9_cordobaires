const db = require('../database/models');

const mainController = {
    home: async (req, res) => {
        await db.Product.findAll({
            include: ['images'],
            limit: 5
        })
        .then(function(products){
            res.render('home', { id: 'home', title: 'LUMEN Lights Shop', products: products });
        });
    }
}

module.exports = mainController;