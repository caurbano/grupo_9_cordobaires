const sequelize = require('sequelize');
const db = require('../database/models');

const apiController = {

    //Devuelve un JSON de los usuarios (id, nombre completo y email).
    usersList: async (req, res) => {
        try {
            const usersList = await db.User.findAll({
                attributes:['id', 'first_name', 'last_name', 'email']
            })
            let data = {
                count : usersList.length,
                users : usersList.map(user => { 
                    return { 
                        id: user.id,
                        name: user.first_name + ' ' + user.last_name,
                        email: user.email,
                        detail: '/api/users/'+ user.id,
                    }
                }),
                status: 200
            };
            return res.status(200).json(data);
        }
        catch(error){ res.send(error) }
    },

    //Devuelve un JSON del detalle de usuario.
    user: async (req, res) => {
        try {
            const user = await db.User.findByPk(
                req.params.id,
                {
                    attributes:['id', 'first_name', 'last_name', 'email', 'phone', 'img', 'created_at', 'state']
                }
            );
            return res.status(200).json(user);
        }
        catch(error){ res.send(error) }
    },

    productsList: async (req, res) => {
        try {
            const categoryList = await db.Product.findAll({
                attributes: [
                  'category',
                  [sequelize.fn('COUNT', sequelize.col('category')), 'cant']
                ],
                group: 'category',
            });
            let objCategory = {}
            categoryList.forEach(element => {
                objCategory[element.category] = element.dataValues.cant;
            });
            
            const productsList = await db.Product.findAll({
                attributes:['id', 'name', 'description', 'category'],
                include: ['images']
            });

            let data = {
                count : productsList.length,
                countByCategory: objCategory,
                products : productsList.map(product => { 
                    return { 
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        img: product.images[0].url,
                        detail: '/api/products/'+ product.id,
                    }
                }),
                status: 200
            };
            return res.status(200).json(data);
        }
        catch(error){ res.send(error) }
    },

    product: async (req, res) => {
        try {
            const product = await db.Product.findByPk(
                req.params.id,
                {
                    attributes:['id', 'name', 'description', 'category', 'color', 'price', 'discount', 'stock'],
                    include: ['images']
                }
            );
            let data = {
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.category,
                color: product.color,
                price: product.price,
                stock: product.stock,
                images: {
                    count : product.images.length,
                    url: product.images.map(img => { return img.url })
                }
            }
            return res.status(200).json(data);
        }
        catch(error){ res.send(error) }
    },

    // createCart:  async (req, res) => {
    //     try {
    //         req.body.products.forEach(async (product) => {
    //             let data = await db.Product.findByPk(
    //                 product.id, 
    //                 {
    //                     attributes:['price', 'discount', 'stock']
    //                 }
    //             );
    //             console.log('data: ',data);
    //             await db.Product.update( {stock: data.stock-product.cant}, {
    //                 where: {id: product.id}
    //             })
                
    //             let result = await db.Cart.create({
    //                 total:(data.price - (data.price * data.discount / 100) * product.cant),
    //                 cant_product: product.cant,
    //                 product_id: product.id,
    //                 user_id: req.session.userLogged.id
    //             })
    //             console.log('result: ',result);
    //         });
    //         res.status(200);
    //     }
    //     catch(error){ res.send(error) }
    // }

}

module.exports = apiController;