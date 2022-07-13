const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');

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
        res.render('./users/register', { id: 'register', title: 'LUMEN - Formulario de registro' });
    },

    processRegister: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            //Verifico si el email que ingreso existe
            let user = await db.User.findOne({ 
                where: { email: req.body.email } 
            })
            .catch(error => res.send(error));
            if(user){
                res.render('./users/register', { 
                    id: 'register', 
                    title: 'LUMEN - Formulario de registro', 
                    error: { email: { msg: 'Este email ya está registrado.'} },
                    old: req.body 
                });
            }
            //Verifico si escribio bien la contraseña
            if(req.body.password != req.body.confirm_password){
                res.render('./users/register', { 
                    id: 'register', 
                    title: 'LUMEN - Formulario de registro', 
                    error: { confirm_password: { msg: 'La contraseña no coinciden'} },
                    old: req.body 
                });
            }
            //Registro la cuenta
            await db.User.create({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                admin: 0,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                phone: req.body.phone,
                img: req.file ? req.file.filename : 'default.jpg',
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

    editUser: (req, res) => {
        res.render('./users/userEdit', { id: 'userEdit', title: 'LUMEN - Edición de usuario'});
    },

    updateUser: async (req, res) => {
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
            console.log('hubo cambios');
            res.redirect('/user/profile');
        })
        .catch(error => res.send(error));
    },

    deleteUser: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const user = users.find(user => {
            return user.id == req.session.userLogged.id;
        });
        res.render('./users/userDelete', { id: 'userDelete', title: 'LUMEN - Eliminar usuario', user: user });
    },

    destroyUser: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let newUsers = users.filter(user => {
            return user.id != req.session.userLogged.id;
        });

        newUsers = JSON.stringify(newUsers, null, "\t");

        fs.writeFileSync(usersFilePath, newUsers);
        req.session.destroy();
        console.log(req.session);
        res.clearCookie('rememberEmail');
        
        res.redirect('/');
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