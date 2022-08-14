const db = require('../database/models');

module.exports = cartController = {

    //Ver carrito
    cart: async (req, res) => {
        let products = await db.Product.findAll({
            attributes:['id', 'name', 'price', 'discount'],
            where: {
                state: { [db.Sequelize.Op.eq] : 1 }
            },
            include: ['images'],
            limit: 3
        });

        res.render('./products/productCart', { product: products, id: 'productCart', title: 'LUMEN - Carrito de compras' });
    }
}
