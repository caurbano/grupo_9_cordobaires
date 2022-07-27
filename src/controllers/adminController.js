const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const adminController = {

    //USER

    editUser: async (req, res) => {
        await db.User.findByPk(req.params.id)
        .then(user => {
            res.render('./admin/userEdit', { 
                id: 'userEdit', 
                title: 'LUMEN - Edición de usuario', 
                user: user
            });
        })
        .catch(error => res.send(error));
    },

    updateUser: async (req, res) => {
        let errors = validationResult(req);
        //Si no cambio la imagen de prefil o la contraseña no lo tomo como error
        errors.errors = errors.errors.filter(error => {return error.msg != ' '});
        if (errors.isEmpty()) {
            //Pido los datos del usuario que voy a modificar
            let user_old = await db.User.findByPk(req.params.id)
            .catch(error => res.send(error));
            //Creo un objeto literal para almacenar los cambios
            let newUser = {};
            //Comparo los datos del formulario con los viejos datos del usuario
            for (const key in req.body) {
                //Guardo los cambios del usurio
                if (req.body[key] != user_old[key]) {
                    newUser[key] = req.body[key];
                }
            }
            //Verifico si cambio la contraseña
            if (req.body.password != '' && !bcrypt.compareSync(req.body.password, user_old.password)) { 
                newUser.password = bcrypt.hashSync(req.body.password, 10);
            } else {
                delete newUser.password;
            }
            delete newUser.confirm_password;
            //Verifico si subio una img
            if (req.file) { 
                newUser.img = req.file.filename;
            };

            await db.User.update( newUser, {
                where: {id: req.params.id}
            })
            .then(user => {
                res.redirect('/admin/user/list');
            })
            .catch(error => res.send(error));
        }
        await db.User.findByPk(req.params.id)
        .then(user => {
            res.render('./admin/userEdit', { 
                id: 'userEdit', 
                title: 'LUMEN - Edición de usuario',
                user: user, 
                error: errors.mapped()
            });
        })
        .catch(error => res.send(error));
        
    },

    deleteUser: async (req, res) => {
        await db.User.findByPk(req.params.id)
        .then(user => {
            res.render('./admin/userDelete', { 
                id: 'userDelete', 
                title: 'LUMEN - Eliminar usuario', 
                user: user 
            });
        })
        .catch(error => res.send(error));
    },

    destroyUser: async (req, res) => {
        //Elimina el Usuario
        //PD:Este codigo no sirve cuando el CARRITO este en funcionamiento
        await db.User.destroy({
            where:{
                id: req.params.id,
            },
            force: true
        })
        .then(user => {
            res.redirect('/admin/user/list');
        })
        .catch(error => res.send(error));
    },

    list: (req, res) => {
        db.User.findAll({
            attributes:['id', 'first_name', 'last_name', 'admin', 'email', 'phone', 'img'],
            where:{
                id: { [db.Sequelize.Op.ne] : req.session.userLogged.id}
            }
        })
        .then(users => {
            res.render('./admin/list', { id: 'list', title: 'LUMEN - Lista de usuarios', users: users });
        })
        .catch(error => res.send(error));
    },

    setAdmin: async (req, res) => {
        await db.User.findByPk(req.params.id)
        .then(user => {
            let booleanAdmin;
            if(user.dataValues.admin){
                booleanAdmin = 0;
            }else{
                booleanAdmin = 1;
            }
            db.User.update({admin : booleanAdmin}, {where:{id:req.params.id}})
            .then(user => {
                res.redirect('/admin/user/list');
            })
            .catch(error => res.send(error));         
        })
        .catch(error => res.send(error));
    },

    // PRODUCT

    create: (req, res) => {
        res.render('./products/productCreate', { 
            id: 'productCreate', 
            title: 'LUMEN - Creación de producto' 
        });
    },

    store: async (req, res) => {
        let errors = validationResult(req);
        if(!req.file){
            errors.errors.pop();
        }
        if (errors.isEmpty()) { 
            try {
                let newProduct = await db.Product.create({
                    name: req.body.name,
                    description: req.body.description,
                    category: req.body.category,
                    color: req.body.color,
                    price: req.body.price,
                    discount: req.body.discount,
                    stock: req.body.stock
                })
                let newImage = await db.Image.create({
                        url: req.file ? req.file.filename : 'default.jpg',
                        product_id: newProduct.id
                })
                if(newImage){
                    res.redirect('/product/detail/' + newImage.product_id);
                }
            } catch (error) {
                console.log(error);
            }

            // .then(product => {
            //     db.Image.create({
            //         url: req.file ? req.file.filename : 'default.jpg',
            //         product_id: product.id
            //     }).then(image => {
            //         res.redirect('/product/detail/' + image.product_id);
            //     })
            //     .catch(error => res.send(error));
            // })
            // .catch(error => res.send(error));
            // let newImage = await db.Image.create({
            //     url: req.file ? req.file.filename : 'default.jpg',
            //     product_id: newProduct.dataValues.id
            // })
            // .catch(error => res.send(error));
            // Promise.all([newProduct, newImage]).then(function([product, img]){
            //     res.redirect('/product/detail/' + product.dataValues.id);
            // });
        }
        res.render('./products/productCreate', { 
            id: 'productCreate', 
            title: 'LUMEN - Creación de producto', 
            error: errors.mapped(), 
            old: req.body 
        });
    },

    edit: async (req, res) => {
        db.Product.findByPk(req.params.id, {include: ['images']})
        .then(product => {
            res.render('./products/productEdit', { 
                id: 'productEdit',
                title: 'LUMEN - Edición de producto', 
                product: product 
            });
        });
    },

    update: async (req, res) => {
        let errors = validationResult(req);
        if(!req.file){
            errors.errors.pop();
        }
        if (errors.isEmpty()) {
            let product_old = await db.Product.findByPk(req.params.id);
            let newProduct = {};
            for (const key in req.body) {
                if (req.body[key] != product_old[key]) {
                    newProduct[key] = req.body[key];
                }
            }

            await db.Product.update( newProduct, {
                where: {id: req.params.id}
            }).then(product => {
                if(req.file){
                    let updateImg = db.Image.update({
                        url: req.file.filename
                    },{
                        where: {id: req.params.id}
                    })
                    .then(images =>{
                        res.redirect('/product/detail/' + req.params.id);
                    })
                    .catch(error => res.send(error));
                }else{
                    res.redirect('/product/detail/' + req.params.id);
                }
            })
            .catch(error => res.send(error));
        }
        let old = req.body;
        old.id = req.params.id;
        db.Product.findByPk(
            req.params.id, 
            {
                attributes:['id'],
                include: ['images']
            }
        )
        .then(product => {
            res.render('./products/productEdit', { 
            id: 'productEdit', 
            title: 'LUMEN - Edición de producto', 
            product: product,
            error: errors.mapped(), 
            old: old 
        });
        })
        .catch(error => res.send(error));
    },

    result: (req, res) => {
        result = req.session.check;
        req.session.check = null;
        res.render('./products/result', { id: 'result', title: 'LUMEN - Verificación', result: result });
    },

    delete: async (req, res) => {
        await db.Product.findByPk(
            req.params.id,
            {
                include: ['images']
            }
        )
        .then(product => {
            res.render('./products/productDelete', { 
                id: 'productDelete', 
                title: 'LUMEN - Eliminar producto', 
                product: product 
            });
        }).catch(error => res.send(error));
    },

    destroy: async (req, res) => {
        
        let destroyImg = await db.Image.destroy({
            where:{
                id: req.params.id,
            },
            force: true
        }).catch(error => res.send(error));

        let destroyProduct = await db.Product.destroy({
            where:{
                id: req.params.id,
            },
            force: true
        }).catch(error => res.send(error));

        Promise.all([destroyProduct, destroyImg]).then(function([product, img]){
            req.session.check = true;
            res.redirect('/admin/product/result');
        });
        
    }

}

module.exports = adminController;