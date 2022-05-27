const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const MainController = {
    home: (req, res) => {
        // const view = views.find(view => {
        //     return view.id === 'home';
        // })
        res.render('home', { id: 'home', title: 'LUMEN Lights Shop', products: products });
    },
    cart: (req, res) => {
        res.render('./products/productCart', { product: products, id: 'productCart', title: 'LUMEN - Carrito de compras' });

    },
    detail: (req, res) => {
        const product = products.find(elemento => { return elemento.id === req.params.product; })
        res.render('./products/productDetail', { id: 'productDetail', title: 'LUMEN - Detalle de productos', product: product, products: products });
    },

    gallery: (req, res) => {
        let productsFilter = products.filter(product => {
            return product.category === req.params.category;
        })
        res.render('./products/categories', { id: 'categories', category: req.params.category, title: 'LUMEN - Categoría - ' + req.params.category, products: productsFilter });
    },

    // login: (req, res) => {
    //     res.render('./users/login', { id: 'login', title: 'LUMEN - Login' });
    // },

    // login2: (req, res) => {
    //     res.send('LOGIN');
    // },

    // register: (req, res) => {
    //     res.render('./users/register', { id: 'register', title: 'LUMEN - Formulario de registro' });
    // },

    // register2: (req, res) => {
    //     const usersFilePath = path.join(__dirname, '../data/users.json');
    //     let users = fs.readFileSync(usersFilePath, 'utf-8');
    //     //
    //     if (req.file) {
    //         //Verifico que el JSON esta vacio
    //         let array;
    //         let ide;
    //         if (users == "") {
    //             array = [];
    //             ide = 1;
    //         } else {
    //             users = JSON.parse(users);
    //             array = users;
    //             ide = parseInt(array[array.length - 1].id) + 1;
    //             ide = ide.toString();
    //         }

    //         //Creo el usuario

    //         let userNew = {
    //             id: ide,
    //             firstName: req.body.firstName,
    //             lastName: req.body.lastName,
    //             email: req.body.email,
    //             phone: req.body.phone,
    //             password: req.body.password,
    //             img: req.file.filename, //+ ide + "-" + Date.now() + path.extname(file.originalname),
    //         }

    //         //Lo sumo con los demas

    //         array.push(userNew);
    //         newUsers = JSON.stringify(array, null, "\t");
    //         fs.writeFileSync(usersFilePath, newUsers);
    //         res.render('./users/login', { id: 'login', title: 'LUMEN - Login' });

    //     } else {
    //         res.render('./users/register', { id: 'register', title: 'LUMEN - Formulario de registro' });
    //     }
    // },

    // editUser: (req, res) => {
    //     const usersFilePath = path.join(__dirname, '../data/users.json');
    //     let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    //     const user = users.find(user => {
    //         return user.id == req.params.id;
    //     });
    //     res.render('./users/userEdit', { id: 'userEdit', title: 'LUMEN - Edición de usuario', user: user });
    // },
    // updateUser: (req, res) => {
    //     const usersFilePath = path.join(__dirname, '../data/users.json');
    //     let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    //     //Edito el user

    //     users.find(element => {
    //         if (element.id == req.params.id) {
    //             if (element.firstName != req.body.firstName) { element.firstName = req.body.firstName; }

    //             if (element.lastName != req.body.lastName) { element.lastName = req.body.lastName; }

    //             if (element.email != req.body.email) { element.email = req.body.email; }

    //             if (element.phone != req.body.phone) { element.phone = req.body.phone; }

    //             if (element.password != req.body.password) { element.password = req.body.password; }

    //             if (element.img != req.file.filename) { element.img = req.file.filename; }
    //         }
    //     });

    //     //Actualizo

    //     users = JSON.stringify(users, null, "\t");
    //     fs.writeFileSync(usersFilePath, users);
    //     const productsFilePath = path.join(__dirname, '../data/products.json');
    //     let products = fs.readFileSync(productsFilePath, 'utf-8');
    //     res.redirect('/');

    // },
    // deleteUser: (req, res) => {
    //     const usersFilePath = path.join(__dirname, '../data/users.json');
    //     let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    //     let newUsers = users.filter(user => {
    //         return user.id != req.params.id;
    //     });

    //     newUsers = JSON.stringify(newUsers, null, "\t");

    //     fs.writeFileSync(usersFilePath, newUsers);
    //     res.redirect('/');
    // },

    create: (req, res) => {
        res.render('./products/productCreate', { id: 'productCreate', title: 'LUMEN - Creación de producto' });
    },

    store: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = fs.readFileSync(productsFilePath, 'utf-8');
        if (req.file) {

            //Verifico que el JSON esta vacio

            let array;
            let ide;
            if (products == undefined) {
                array = [];
                ide = 1;
            } else {
                products = JSON.parse(products);
                array = products;
                ide = parseInt(array[array.length - 1].id) + 1;
                ide = ide.toString();
            }

            //Creo el producto

            let productNew = {
                id: ide,
                name: req.body.name,
                description: req.body.description.split("."),
                img: req.file.filename, //+ ide + "-" + Date.now() + path.extname(file.originalname),
                category: req.body.category,
                color: req.body.color,
                price: req.body.price,
                discount: req.body.discount,
                payments: req.body.payments
            }

            //Lo sumo con los demas

            array.push(productNew);
            newProducts = JSON.stringify(array, null, "\t");
            fs.writeFileSync(productsFilePath, newProducts);
            res.redirect('/product/detail/' + ide);

        } else {
            res.render('./products/productCreate', { id: 'productCreate', title: 'LUMEN - Creación de producto' });
        }
    },

    edit: (req, res) => {
        const product = products.find(product => {
            return product.id === req.params.product;
        });
        res.render('./products/productEdit', { id: 'productEdit', title: 'LUMEN - Edición de producto', product: product });
    },

    update: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        //Edito el producto

        products.find(element => {
            if (element.id == req.params.id) {
                if (element.name != req.body.name) { element.name = req.body.name; }

                if (element.price != req.body.price) { element.price = req.body.price; }

                if (element.discount != req.body.discount) { element.discount = req.body.discount; }

                if (element.category != req.body.category) { element.category = req.body.category; }

                if (element.description != req.body.description) { element.description = req.body.description; }

                if (element.img != req.file.filename) { element.img = req.file.filename; }

                if (element.color != req.body.color) { element.color = req.body.color; }

                if (element.payments != req.body.payments) { element.payments = req.body.payments; }

            }
        });

        //Actualizo

        products = JSON.stringify(products, null, "\t");
        fs.writeFileSync(productsFilePath, products);
        res.redirect('/product/detail/' + req.params.product);

    },

    delete: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let newProducts = products.filter(product => {
            return product.id != req.params.product;
        });

        newProducts = JSON.stringify(newProducts, null, "\t");

        fs.writeFileSync(productsFilePath, newProducts);
        res.render('home', { id: 'home', title: 'LUMEN Lights Shop', products: products });
    }
}

module.exports = MainController;