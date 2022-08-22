const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const usersController = {

    //Logueo
    login: (req, res) => {
        res.render('./users/login', { id: 'login', title: 'LUMEN - Login' });
    },

    processLogin: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = await db.User.findOne({ 
                where: { 
                    email: req.body.email,
                    state: { [db.Sequelize.Op.eq] : 1 }
                }
            })
            .catch(error => res.send(error));
            
            if(user && user.dataValues.email == req.body.email && bcrypt.compareSync(req.body.password, user.dataValues.password)){
                let userLogin = {};
                for (const key in user.dataValues) {
                    userLogin[key] = user.dataValues[key];
                }
                delete userLogin.password;
                delete userLogin.created_at;
                delete userLogin.updated_at;
                delete userLogin.state;
                req.session.userLogged = userLogin;
                req.session.cart = [];
                if (req.body.remember != undefined) {
                    res.cookie('rememberEmail', userLogin.email, { maxAge: 1000 * 60 * 1 });
                }
                return res.redirect('/');
            }
            res.render('./users/login', { 
                id: 'login', 
                title: 'LUMEN - Formulario de login', 
                error: { errorLogin: "Usuario o contraseña incorrectos" }, 
                old: req.body 
            });
        }
        res.render('./users/login', { 
            id: 'login', 
            title: 'LUMEN - Formulario de login', 
            error: errors.mapped(), 
            old: req.body 
        });

    },

    //Registro
    register: (req, res) => {
        res.render('./users/register', { 
            id: 'register', 
            title: 'LUMEN - Formulario de registro' 
        });
    },

    processRegister: async (req, res) => {
        let errors = validationResult(req);
        if(req.file && req.file.filename.search(/jpg$|jpeg$|png$/m) == -1){
            errors.errors.push({msg: 'Solo formatos JPG, JPEG o PNG.', param:'img'});
        }
        if (errors.isEmpty()) {
            //Verifico si el email que ingreso ya fue registrado
            let user = await db.User.findOne({ 
                where: { email: req.body.email } 
            })
            .catch(error => res.send(error));
            if(user){
                errors.errors.push({msg: 'Este email ya está registrado.', param:'email'})
            }
            //Verifico si escribio bien la contraseña
            if(req.body.password != req.body.confirm_password){
                errors.errors.push({msg: 'La contraseña no coincide.', param:'password'})
            }
            //Pregunto si hubo errores
            if(errors.errors.length > 0){
                res.render('./users/register', { 
                    id: 'register', 
                    title: 'LUMEN - Formulario de registro', 
                    error: errors.mapped(), 
                    old: req.body 
                }); 
            }
            //Registro la cuenta
            db.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                admin: 0,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                phone: req.body.phone,
                img: req.file ? req.file.filename : 'default.jpg',
                state: 1
            })
            .then(user => {
                res.redirect('/user/login');
            })
            .catch(error => res.send(error));
        }
        res.render('./users/register', { 
            id: 'register', 
            title: 'LUMEN - Formulario de registro', 
            error: errors.mapped(), 
            old: req.body 
        });
    },

    //Edición
    editUser: (req, res) => {
        res.render('./users/userEdit', { 
            id: 'userEdit', 
            title: 'LUMEN - Edición de usuario'
        });
    },

    updateUser: async (req, res) => {
        let errors = validationResult(req);
        //Si no cambio la contraseña no lo tomo como error
        errors.errors = errors.errors.filter(error => {return error.msg != ' '});
        //Si subio una imagen verifico el tipo de formato de la imagen
        if(req.file && req.file.filename.search(/jpg$|jpeg$|png$|gif$/m) == -1){
            errors.errors.push({msg: 'Solo formatos JPG, JPEG, PNG o GIF.', param:'img'});
        }
        if (errors.isEmpty()) {
            
            //Pido los datos del usuario que voy a modificar
            let user_old = await db.User.findByPk(req.session.userLogged.id)
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
                where: {id: req.session.userLogged.id}
            })
            .then(user => {
                //Actualizo los datos de session
                for (const key in req.session.userLogged) {
                    if (newUser[key] && req.session.userLogged[key] != newUser[key]) {
                        req.session.userLogged[key] = newUser[key];
                    }
                }
                res.redirect('/user/profile');
            })
            .catch(error => res.send(error));

        }
        res.render('./users/userEdit', { 
            id: 'userEdit', 
            title: 'LUMEN - Edición de usuario', 
            error: errors.mapped()
        });
    },

    //Eliminación
    deleteUser: (req, res) => {
        res.render('./users/userDelete', { 
            id: 'userDelete', 
            title: 'LUMEN - Eliminar usuario',
        });
    },

    destroyUser: async (req, res) => {
        //Elimina el Usuario
        //Cambia el estado de la cuenta de habilitado a deshabilitado
        db.User.update({ state: 0}, {
            where:{
                id: req.session.userLogged.id,
            },
            force: true
        })
        .then(user => {
            req.session.destroy();
            res.clearCookie('rememberEmail');
            res.redirect('/');
        })
        .catch(error => res.send(error));
        
    },

    //Ver perfil
    profile: async (req, res) => {
        res.render('./users/profile', { id: 'profile', title: 'LUMEN - Perfil del usuario' });
    },
    
    //Deslogueo
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('rememberEmail');
        return res.redirect('/');
    },

    //Carrito de compras
    addProduct: (req, res) => {
        if(!req.session.cart.includes(req.params.id)){
            req.session.cart.push(req.params.id);
        }
        res.redirect('/product/gallery');
    },

    buy:(req, res) => {
        console.log(req.session);
        req.session.cart= [];
        console.log(req.session);
        res.redirect('/');
    },

    deleteCart:(req, res) => {
        req.session.cart = req.session.cart.filter(element => element != req.params.id);
        res.redirect('/cart');
    }
    
}

module.exports = usersController;