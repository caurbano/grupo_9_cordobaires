const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const usersController = {

    login: (req, res) => {
        res.render('./users/login', { id: 'login', title: 'LUMEN - Login' });
    },

    login2: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    
        // let errors = validationResult(req);
        // // res.send(errors);
        // if (errors.isEmpty()) {
        //     //sin errores: continuar
        //     res.redirect('/');
        // } else {
        //     //si hay error, redirecciona al login
        //     res.render('./users/login', { id: 'login', title: 'LUMEN - Formulario de login', errors: errors.array(), old: req.body });
        // }


        // // console.log(req.body);
        
        // let userLogin = users.find( user => user.email == req.body.email && user.password == req.body.password );
        // if(userLogin){
        //     return res.redirect('/');

        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const usersFilePath = path.join(__dirname, '../data/users.json');
            let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            let userLogin = users.find(user => user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password));
            if (userLogin) {
                delete userLogin.password; 
                req.session.userLogged = userLogin;
                return res.redirect('/');
            }
            res.render('./users/login', { id: 'login', title: 'LUMEN - Formulario de login', error: { errorLogin: "Usuario o contraseña incorrectos" }, old: req.body });
        }
        // res.render('./users/login', { id: 'login', title: 'LUMEN - Formulario de login', error: errors.mapped(), old: req.body });
    },

    register: (req, res) => {
        res.render('./users/register', { id: 'register', title: 'LUMEN - Formulario de registro' });
    },

    register2: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const usersFilePath = path.join(__dirname, '../data/users.json');
            let users = fs.readFileSync(usersFilePath, 'utf-8');

            //Verifico que el JSON esta vacio

            let array;
            let ide;
            if (users == "") {
                array = [];
                ide = 1;
            } else {
                users = JSON.parse(users);
                array = users;
                ide = parseInt(array[array.length - 1].id) + 1;
                ide = ide.toString();
            }

            //Creo el usuario

            let userNew = {
                id: ide,
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
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const user = users.find(user => {
            return user.id == req.params.id;
        });
        res.render('./users/userEdit', { id: 'userEdit', title: 'LUMEN - Edición de usuario', user: user });
    },

    updateUser: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        //Edito el user

        users.find(element => {
            if (element.id == req.params.id) {
                if (element.firstName != req.body.firstName) { element.firstName = req.body.firstName; }

                if (element.lastName != req.body.lastName) { element.lastName = req.body.lastName; }

                if (element.email != req.body.email) { element.email = req.body.email; }

                if (element.phone != req.body.phone) { element.phone = req.body.phone; }

                if (element.password != req.body.password) { element.password = req.body.password; }

                if (element.img != req.file.filename) { element.img = req.file.filename; }
            }
        });

        //Actualizo

        users = JSON.stringify(users, null, "\t");
        fs.writeFileSync(usersFilePath, users);

        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = fs.readFileSync(productsFilePath, 'utf-8');
        res.redirect('/',);

    },
    deleteUser: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let newUsers = users.filter(user => {
            return user.id != req.params.id;
        });

        newUsers = JSON.stringify(newUsers, null, "\t");

        fs.writeFileSync(usersFilePath, newUsers);
        res.redirect('/');
    },
    result: (req, res) => {
        res.render('./users/result', { id: 'result', title: 'LUMEN - Verificación' });
    },
    list: (req, res) => {
        res.render('./users/list', { id: 'list', title: 'LUMEN - Lista de usuarios' });
    }
}

module.exports = usersController;