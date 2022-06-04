const { log } = require('console');
const fs = require('fs');
const path = require('path');


// SEGUIR CON EXPESS VALIDATOR AVANZADO
// EN EL CONTROLADOR:
const { validationResult } = require('express-validator');



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
        
        let userLogin = users.find( user => user.email == req.body.email && user.password == req.body.password );
        if(userLogin){
            return res.redirect('/');
        }
        res.redirect('login');
    },

    register: (req, res) => {
        res.render('./users/register', { id: 'register', title: 'LUMEN - Formulario de registro' });
    },

    register2: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = fs.readFileSync(usersFilePath, 'utf-8');
        //
        if (req.file) {
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
                password: req.body.password,
                img: req.file.filename,
            }

            //Lo sumo con los demas

            array.push(userNew);
            newUsers = JSON.stringify(array, null, "\t");
            fs.writeFileSync(usersFilePath, newUsers);
            res.redirect('login');

        } else {
            res.redirect('register');
        }
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
        res.render('./users/result', { id: 'result', title: 'LUMEN - Verificación'});
    },
}

module.exports = usersController;