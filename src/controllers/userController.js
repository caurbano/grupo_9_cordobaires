const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');

const usersController = {

    login: (req, res) => {
        res.render('./users/login', { id: 'login', title: 'LUMEN - Login' });
    },

    processLogin: (req, res) => {
        //En el video de Session, aca muestran un for que engloba el if.. min 15 aprox. VER. - kz.

        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const usersFilePath = path.join(__dirname, '../data/users.json');
            let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            let userLogin = users.find(user => user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password));
            if (userLogin) {
                delete userLogin.password; 
                req.session.userLogged = userLogin;
                if (req.body.remember != undefined) {
                    res.cookie('rememberEmail', userLogin.email, { maxAge: 1000 * 60 * 1 });
                }
                return res.redirect('/');
            }
            res.render('./users/login', { id: 'login', title: 'LUMEN - Formulario de login', error: { errorLogin: "Usuario o contraseña incorrectos" }, old: req.body });
        } 
        res.render('./users/login', { id: 'login', title: 'LUMEN - Formulario de login', error: errors.mapped(), old: req.body });

    },

    register: (req, res) => {
        res.render('./users/register', { id: 'register', title: 'LUMEN - Formulario de registro' });
    },

    processRegister: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
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

    updateUser: (req, res) => {
        // let user_old = await db.Product.findByPk(req.params.id);
        // let newUser = {};
        // for (const key in req.body) {
        //     if (req.body[key] != user_old[key]) {
        //         newUser[key] = req.body[key];
        //     }
        // }
        // await db.User.update( newUser, {
        //     where: {id: req.params.id}
        // })
        // .then(user => {
        //     res.redirect('/user/profile');
        // })
        // .catch(error => res.send(error));
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        //Edito el user

        users.find(element => {
            if ( element.id == req.session.userLogged.id ) {
                if (element.firstName != req.body.firstName) { element.firstName = req.body.firstName; }

                if (element.lastName != req.body.lastName) { element.lastName = req.body.lastName; }

                if (element.email != req.body.email) { element.email = req.body.email; }

                if (element.phone != req.body.phone) { element.phone = req.body.phone; }

                if (bcrypt.compareSync(req.body.password, element.password)) { bcrypt.hashSync(req.body.password, 10) }

                if (req.file) { element.img = req.file.filename; }
            }
        });

        //Actualizo

        users = JSON.stringify(users, null, "\t");
        fs.writeFileSync(usersFilePath, users);
        res.redirect('/user/profile');
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

    profile: (req, res) => {
        res.render('./users/profile', { id: 'profile', title: 'LUMEN - Perfil del usuario' });
    
    // Otra prueba:
    // return res.render('./users/profile', {
    //     users: req.session.userLogged
    // })
    },
    
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('rememberEmail');
        return res.redirect('/');
    }
    
}

module.exports = usersController;