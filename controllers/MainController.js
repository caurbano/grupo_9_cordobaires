const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const MainController = {
    home: (req, res) => {
        // const view = views.find(view => {
        //     return view.id === 'home';
        // })
        res.render('home', {id: 'home', title: 'LUMEN Lights Shop', products: products});
    },
    cart: (req, res) => {
        res.render('./products/productCart', {product: products, id: 'productCart', title: 'LUMEN - Carrito de compras'});
        
    },
    detail: (req, res) => {
        const product = products.find(elemento => { return elemento.id === req.params.product; })
        res.render('./products/productDetail', {id: 'productDetail', title: 'LUMEN - Detalle de productos', product:product, products:products});
    },

    login: (req, res) => {
        res.render('./users/login', {id: 'login', title: 'LUMEN - Login'});
    },

    login2: (req, res) => {
        res.send('LOGIN');
    },

    register: (req, res) => {
        res.render('./users/register', {id: 'register', title: 'LUMEN - Formulario de registro'});
    },

    create: (req, res) => {
        res.render('./products/productCreate', {id: 'productCreate', title: 'LUMEN - Creación de producto'});
    },

    edit: (req, res) => {
        const product = products.find(product => {
            return product.id === req.params.product
        });
        res.render('./products/productEdit', {id: 'productEdit', title: 'LUMEN - Editar producto', product: product});
    }
}

module.exports = MainController;