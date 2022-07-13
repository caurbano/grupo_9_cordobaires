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

    store: async (req, res) => {

        await db.Product.create({
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
        }).catch(error => res.send(error));

    },

    edit: async (req, res) => {
        await db.Product.findByPk(req.params.id, {include: ['images']})
        .then(product => {
            res.render('./products/productEdit', { id: 'productEdit', title: 'LUMEN - Edición de producto', product: product });
        });
    },

    update: async (req, res) => {
        let product_old = await db.Product.findByPk(req.params.id);
        let newProduct = {};
        for (const key in req.body) {
            if (req.body[key] != product_old[key]) {
                newProduct[key] = req.body[key];
            }
        }

        let updateProduct = await db.Product.update( newProduct, {
            where: {id: req.params.id}
        }).then(product => {
            if(req.file){
                let updateImg = db.Image.update({
                    url: req.file.filename
                },{
                    where: {id: req.params.id}
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

        
        // if(req.file){
        //     let updateImg = await db.Image.update({
        //         url: req.file.filename
        //     },{
        //         where: {id: req.params.id}
        //     })
        //     .then(images =>{
        //         res.redirect('/product/detail/' + req.params.id);
        //     })
        //     .catch(error => res.send(error));
        // }
        // console.log('Me pase de largo');
        // Promise.all([updateProduct]).then(function([product]){
        //     res.redirect('/product/detail/' + req.params.id);
        // });

    },

    result: (req, res) => {
        result = req.session.check;
        req.session.check = null;
        res.render('./products/result', { id: 'result', title: 'LUMEN - Verificación', result: result });
    },

    delete: async (req, res) => {
        await db.Product.findByPk(req.params.id,{include: ['images']})
        .then(product => {
            res.render('./products/productDelete', { 
                id: 'productDelete', 
                title: 'LUMEN - Eliminar producto', 
                product: product 
            });
        }).catch(error => res.send(error));
        // const productsFilePath = path.join(__dirname, '../data/products.json');
        // let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // const product = products.find(product => {
        //     return product.id == req.params.id;
        // });
        // res.render('./products/productDelete', { id: 'productDelete', title: 'LUMEN - Eliminar producto', product: product });
    },

    destroy: async (req, res) => {
        
        let destroyImg = await db.Image.destroy({
            where:{
                id: req.params.id,
            },
            force: true
        }).catch(error => res.send(error));

        let destroyProduct = await db.Product.destroy({
            where:{
                id: req.params.id,
            },
            force: true
        }).catch(error => res.send(error));

        Promise.all([destroyProduct, destroyImg]).then(function([product, img]){
            req.session.check = true;
            res.redirect('/admin/product/result');
        });
        
    }

}

module.exports = adminController;