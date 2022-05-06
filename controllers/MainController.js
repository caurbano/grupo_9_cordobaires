const products = [
    {
        'id': 'prod1',
        'nombre': 'Lámpara de pie SILVER',
        'precio': '$13.500',
        'detalle': 'Lámpara de pie',
        'maxCuotas': '6'
    },
    {
        'id': 'prod2',
        'nombre': 'Lámpara de techo set GRECIA',
        'precio': '$47.550',
        'detalle': 'Lámpara de techo',
        'maxCuotas': '6'
    }
    // COMPLETAR CON LOS 10 PRODUCTOS Y A C/U AGREGARLE EL DETALLE.
]

// const views = [
//     {
//         'id': 'home',
//         'title': 'LUMEN Lights Shop'
//     },
//     {
//         'id': 'productCart',
//         'title': 'LUMEN - Carrito de compras'
//     },
//     {
//         'id': 'productCreate'
//     },
//     {
//         'id': 'productDetail'
//     },
//     {
//         'id': 'productEdit'
//     },
//     {
//         'id': 'login'
//     },
//     {
//         'id': 'register'
//     }

// ]
const MainController = {
    home: (req, res) => {
        // const view = views.find(view => {
        //     return view.id === 'home';
        // })
        res.render('home', {id: 'home', title: 'LUMEN Lights Shop'});
    },
    cart: (req, res) => {
        res.render('./products/productCart', {product: products, id: 'productCart', title: 'LUMEN - Carrito de compras'});
        
    },
    detail: (req, res) => {
        // const product = products.find(product => {
        //     return product.id === req.params.product;
        // })
        res.render('./products/productDetail', {id: 'productDetail', title: 'LUMEN - Detalle de productos'});
    },

    login: (req, res) => {
        res.render('./users/login', {id: 'login', title: 'LUMEN - Login'});
    },

    register: (req, res) => {
        res.render('./users/register', {id: 'register', title: 'LUMEN - Formulario de registro'});
    },

    create: (req, res) => {
        res.render('./products/productCreate', {id: 'productCreate', title: 'LUMEN - Creación de producto'});
    },

    edit: (req, res) => {
        res.render('./products/productEdit', {id: 'productEdit', title: 'LUMEN - Editar producto'});
    }
}

module.exports = MainController;