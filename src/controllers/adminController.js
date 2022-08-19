const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const adminController = {

    //USER

    //Edición
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
        //Si subio una imagen, verifico el tipo de formato
        if(req.file && req.file.filename.search(/jpg$|jpeg$|png$|gif$/m) == -1){
            errors.errors.push({msg: 'Solo formatos JPG, JPEG, PNG o GIF.', param:'img'});
        }
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

    //Eliminación
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

    //Lista completa
    list: (req, res) => {
        db.User.findAll({
            attributes:['id', 'first_name', 'last_name', 'admin', 'email', 'phone', 'img', 'state'],
            where:{
                id: { [db.Sequelize.Op.ne] : req.session.userLogged.id}
            }
        })
        .then(users => {
            res.render('./admin/list', { id: 'list', title: 'LUMEN - Lista de usuarios', users: users });
        })
        .catch(error => res.send(error));
    },

    //Dar/Quitar perfil de ADMIN
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

    //Cambio de estado: Habilita/Deshabilita
    setStateUser: async (req, res) => {
        db.User.findByPk(req.params.id)
        .then(user => {
            let booleanState;
            if(user.dataValues.state){
                booleanState = 0;
            }else{
                booleanState = 1;
            }
            db.User.update({state : booleanState}, {where:{id:req.params.id}})
            .then(user => {
                res.redirect('/admin/user/list');
            })
            .catch(error => res.send(error));         
        })
        .catch(error => res.send(error));
    },


    // PRODUCT

    //Creación
    create: (req, res) => {
        res.render('./products/productCreate', { 
            id: 'productCreate', 
            title: 'LUMEN - Creación de producto' 
        });
    },

    store: async (req, res) => {
        let errors = validationResult(req);
        //Si subio una imagen, verifico el tipo de formato
        if(req.file && req.file.filename.search(/jpg$|jpeg$|png$|gif$|mp4$/m) == -1){
            errors.errors.push({msg: 'Solo formatos JPG, JPEG, PNG, GIF o MP4.', param:'img'});
        }
        //Verifico si el nombre del producto que ingreso ya fue registrado
        let user = await db.User.findOne({ 
            where: { email: req.body.name } 
        })
        .catch(error => res.send(error));
        if(user){
            errors.errors.push({msg: 'Este nombre ya está registrado.', param:'name'})
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
                    stock: req.body.stock,
                    state: 1
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
        }
        res.render('./products/productCreate', { 
            id: 'productCreate', 
            title: 'LUMEN - Creación de producto', 
            error: errors.mapped(), 
            old: req.body 
        });
    },

    //Edición
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
        //Si subio una imagen verifico el formato de la imagen
        if(req.file && req.file.filename.search(/jpg$|jpeg$|png$|gif$|mp4$/m) == -1){
            errors.errors.push({msg: 'Solo formatos JPG, JPEG, PNG, GIF o MP4.', param:'img'});
        }
        //Verifico si el nombre del producto que ingreso ya fue registrado
        let user = await db.User.findOne({ 
            where: { email: req.body.name } 
        })
        .catch(error => res.send(error));
        if(user){
            errors.errors.push({msg: 'Este nombre ya está registrado.', param:'name'})
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
                    let updateImg = db.Image.create({
                        url: req.file.filename,
                        product_id:req.params.id
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

    //Eliminación
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
        
            db.Image.destroy({
                where:{
                    product_id: req.params.id,
                },
                force: true
            })
            .then(img => {
                console.log('img: ',img);
                db.Product.destroy({
                    where:{
                        id: req.params.id,
                    },
                    force: true
                })
                .then( product => {
                    req.session.check = true;
                    res.redirect('/admin/product/result');
                })
                .catch(errors =>{ 
                    console.log(errors);
                    res.redirect('/error');
                })
            }) 
       
        .catch(errors => { 
            console.log(errors);
            res.redirect('/error');
        })
        
        
    },

    //Cambio de estado: Habilita/Deshabilita
    setStateProduct: async (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(product => {
            let booleanState;
            if(product.dataValues.state){
                booleanState = 0;
            }else{
                booleanState = 1;
            }
            db.Product.update({state : booleanState}, {where:{id:req.params.id}})
            .then(product => {
                res.redirect('/product/gallery');
            })
            .catch(error => res.send(error));         
        })
        .catch(error => res.send(error));
    },

}

module.exports = adminController;