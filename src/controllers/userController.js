const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { log } = require('console');


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

    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const usersFilePath = path.join(__dirname, '../data/users.json');
            let users = fs.readFileSync(usersFilePath, 'utf-8');

            //Verifico que el JSON esta vacio

            let array;
            let ide;
            let admin;
            if (users == "[]") {
                array = [];
                ide = 1;
                admin = true;
            } else {
                users = JSON.parse(users);
                array = users;
                ide = parseInt(array[array.length - 1].id) + 1;
                ide = ide.toString();
                admin = false;
            }

            //Creo el usuario

            let userNew = {
                id: ide,
                admin: admin,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: bcrypt.hashSync(req.body.password, 10),
                img: req.file ? req.file.filename : 'default.jpg',
            }

            //Lo sumo con los demas

            array.push(userNew);
            newUsers = JSON.stringify(array, null, "\t");
            fs.writeFileSync(usersFilePath, newUsers);
            res.redirect('login');
        }
        res.render('./users/register', { id: 'register', title: 'LUMEN - Formulario de registro', error: errors.mapped(), old: req.body });
    },

    editUser: (req, res) => {
        res.render('./users/userEdit', { id: 'userEdit', title: 'LUMEN - Edición de usuario'});
    },

    updateUser: (req, res) => {
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