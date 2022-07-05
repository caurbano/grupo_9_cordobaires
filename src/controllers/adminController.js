const fs = require('fs');
const path = require('path');
const db = require('../../database/models');

const adminController = {

    //USER

    editUser: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let user = users.find( user => {
            return user.id == req.params.id
        });

        res.render('./admin/userEdit', { id: 'userEdit', title: 'LUMEN - Edición de usuario', user: user});
    },

    updateUser: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        //Edito el user

        users.find(element => {
            if ( element.id == req.params.id ) {
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
        res.redirect('/admin/user/list');
    },

    deleteUser: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const user = users.find(user => {
            return user.id == req.params.id;
        });
        res.render('./admin/userDelete', { id: 'userDelete', title: 'LUMEN - Eliminar usuario', user: user });
    },

    destroyUser: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let newUsers = users.filter(user => {
            return user.id != req.params.id;
        });

        newUsers = JSON.stringify(newUsers, null, "\t");

        fs.writeFileSync(usersFilePath, newUsers);
        
        res.redirect('/admin/user/list');
    },

    list: (req, res) => {
        console.log(req.session);
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
       
        res.render('./admin/list', { id: 'list', title: 'LUMEN - Lista de usuarios', users: users });
    },

    setAdmin: (req, res) => {
        console.log(req.session);
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        
        const user = users.find(user => {
            return user.id == req.params.id;
        });

        if(user.admin){
            user.admin = false;
        }else{
            user.admin = true;
        }

        users = JSON.stringify(users, null, "\t");
        fs.writeFileSync(usersFilePath, users);
        res.redirect('/admin/user/list');
    },

    // PRODUCT

    create: (req, res) => {
        res.render('./products/productCreate', { id: 'productCreate', title: 'LUMEN - Creación de producto' });
    },

    store: (req, res) => {

        db.Product.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            color: req.body.color,
            price: req.body.price,
            discount: req.body.discount,
            stock: req.body.stock
        }).then(product => {
            db.Image.create({
                url: req.file ? req.file.filename : 'default.jpg',
                product_id: product.id
            }).then(function(image){
                res.redirect('/product/detail/' + image.product_id);
            });
        });

    },

    edit: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let product = products.find(product => {
            return product.id == req.params.id;
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
        res.redirect('./product/detail/' + req.params.id);

    },

    result: (req, res) => {
        result = req.session.check;
        req.session.check = null;
        res.render('./products/result', { id: 'result', title: 'LUMEN - Verificación', result: result });
    },

    delete: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const product = products.find(product => {
            return product.id == req.params.id;
        });
        res.render('./products/productDelete', { id: 'productDelete', title: 'LUMEN - Eliminar producto', product: product });
    },

    destroy: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let newProducts = products.filter(product => {
            return product.id != req.params.id;
        });

        newProducts = JSON.stringify(newProducts, null, "\t");

        fs.writeFileSync(productsFilePath, newProducts);

        if(products.find(product => {return product.id == req.params.id})){
            req.session.check = true;
            res.redirect('/admin/product/result');
        }
        req.session.check = false;
        res.redirect('/admin/product/result');
        
    }

}

module.exports = adminController;