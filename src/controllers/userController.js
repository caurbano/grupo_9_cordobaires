const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const usersController = {

    login: (req, res) => {
        res.render('./users/login', { id: 'login', title: 'LUMEN - Login' });
    },

    processLogin: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = await db.User.findOne({ 
                where: { email: req.body.email } 
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
                req.session.userLogged = userLogin;
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

    register: (req, res) => {
        res.render('./users/register', { 
            id: 'register', 
            title: 'LUMEN - Formulario de registro' 
        });
    },

    processRegister: async (req, res) => {
        let errors = validationResult(req);
        if(!req.file){
            errors.errors.pop();
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
            await db.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                admin: 0,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                phone: req.body.phone,
                img: req.file ? req.file.filename : 'default.jpg',
            })
            .then(user => {
                console.log('Chau');

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

    editUser: (req, res) => {
        res.render('./users/userEdit', { 
            id: 'userEdit', 
            title: 'LUMEN - Edición de usuario'
        });
    },

    updateUser: async (req, res) => {
        let errors = validationResult(req);
        //Si no cambio la imagen de prefil o la contraseña no lo tomo como error
        errors.errors = errors.errors.filter(error => {return error.msg != ' '});
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

    deleteUser: (req, res) => {
        console.log(req.session);
        console.log(req.session.userLogged);
        res.render('./users/userDelete', { 
            id: 'userDelete', 
            title: 'LUMEN - Eliminar usuario',
        });
    },

    destroyUser: async (req, res) => {
        //Elimina el Usuario
        //PD:Este codigo no sirve cuando el CARRITO este en funcionamiento
        await db.User.destroy({
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

    profile: async (req, res) => {
        res.render('./users/profile', { id: 'profile', title: 'LUMEN - Perfil del usuario' });
    },
    
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('rememberEmail');
        return res.redirect('/');
    }
    
}

module.exports = usersController;