const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = productController = {

    detail: (req, res) => {
        const productDetail = products.find(elemento => { return elemento.id == req.params.id; });
        let cant = 0;
        let relatedProducts = products.filter(product => {
            if( product.category == productDetail.category && product.id != productDetail.id && cant < 5 ){
                cant++;
                return product;
            }
        });
        res.render('./products/productDetail', { id: 'productDetail', title: 'LUMEN - Detalle de productos', product: productDetail, products: relatedProducts });
    },

    category: (req, res) => {
        let productsFilter = products.filter(product => {
            return product.category === req.params.category;
        })
        res.render('./products/categories', { id: 'categories', category: req.params.category, title: 'LUMEN - Categoría - ' + req.params.category, products: productsFilter });
    },

    gallery: (req, res) => {
        res.render('./products/productList', { id: 'productList', category: req.params.category, title: 'LUMEN - Galería ', products: products });
    },

    create: (req, res) => {
        res.render('./products/productCreate', { id: 'productCreate', title: 'LUMEN - Creación de producto' });
    },

    store: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = fs.readFileSync(productsFilePath, 'utf-8');

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
        }

        //Creo el producto

        let productNew = {
            id: ide,
            name: req.body.name,
            description: req.body.description.split("."),
            img: req.file ? req.file.filename : 'default.jpg', //+ ide + "-" + Date.now() + path.extname(file.originalname),
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

    },

    edit: (req, res) => {
        const product = products.find(product => {
            return product.id === req.params.id;
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
            res.redirect('../result');
        }
        req.session.check = false;
        res.redirect('../result');
        
    }
}