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

    register2: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        let users = fs.readFileSync(usersFilePath, 'utf-8');
        //
        if(req.file){
			//Verifico que el JSON esta vacio
            let array;
            let ide;
			if(users == ""){
				array = [];
                ide = 1;
			} else {
                users =  JSON.parse(users);
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
                img: req.file.filename, //+ ide + "-" + Date.now() + path.extname(file.originalname),
			}

			//Lo sumo con los demas

			array.push(userNew);
			newUsers = JSON.stringify(array, null, "\t");
			fs.writeFileSync(usersFilePath, newUsers);
			res.render('./users/login', {id: 'login', title: 'LUMEN - Login'});

		} else {
            res.render('./users/register', {id: 'register', title: 'LUMEN - Formulario de registro'});
        }
    },

    create: (req, res) => {
        res.render('./products/productCreate', {id: 'productCreate', title: 'LUMEN - Creación de producto'});
    },
    
    create2: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        let products = fs.readFileSync(productsFilePath, 'utf-8');
        console.log(req.file);
        if(req.file){

			//Verifico que el JSON esta vacio

            let array;
            let ide;
			if(products == undefined){
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
                description: req.body.description,
                img: req.file.filename, //+ ide + "-" + Date.now() + path.extname(file.originalname),
				category: req.body.category,
                color: req.body.color,
                price: req.body.price,
				discount: req.body.discount,
                coutas: req.body.payments
			}

			//Lo sumo con los demas

			array.push(productNew);
			newProducts = JSON.stringify(array, null, "\t");
			fs.writeFileSync(productsFilePath, newProducts);
			res.redirect('/product/detail/'+ ide)

		} else {
			res.render('./products/productCreate', {id: 'productCreate', title: 'LUMEN - Creación de producto'});
		}
    },

    edit: (req, res) => {
        const product = products.find(product => {
            return product.id === req.params.product
        });
        res.render('./products/productEdit', {id: 'productEdit', title: 'LUMEN - Editar producto', product: product});
    }
}

module.exports = MainController;