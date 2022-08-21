const db = require('../database/models');

module.exports = cartController = {

    //Ver carrito
    cart: async (req, res) => {
        let products = [];
        for (let index = 0; index < req.session.cart.length; index++) {
            await db.Product.findByPk(
                req.session.cart[index],
                {
                attributes:['id', 'name', 'price', 'discount'],
                where: {
                   state: { [db.Sequelize.Op.eq] : 1 }
                },
                include: ['images']
            })
            .then(data => {
                // console.log(data.images.map(img => img.url));
                // let img = data.images.map(image => image.url);
                // console.log('imagenes :',img);
                // data.dataValues.images = img;
                products.push(data);
            })
            .catch(errors => { 
                console.log(errors);
                res.redirect('/error');
            })
        }
        let total = 0;
        products.forEach(product => {
            total += (product.price - (product.price * product.discount / 100));
        });
        res.render('./products/productCart', { product: products, id: 'productCart', title: 'LUMEN - Carrito de compras', total: total });
    }
}
