const products = [
    {
        'id': 'prod1',
        'nombre': 'Lámpara SILVER',
        'precio': '13500',
        'detalle': 'Lámpara de pie. Color: plateado. Base y brazo metálico. Pantalla de aluminio. Cable alimentación 1,5m negro. Medidas generales: Alto 210cm x base 55cm de diámetro. Medida pantalla: Alto 24 cm x 38cm de diámetro',
        // En detalle, haría un objeto más, CREO. onda: 
        // detalle: {
            // 'tipo': 'Lámpara de pie',
        //     'color': 'Plateado',
        //     'partes': 'Base y brazo metálico',
        //     'cable': 'Cable alimentación 1,5m negro',
        //     'medidasGenerales': 'Alto 210cm x base 55cm de diámetro',
        //     'pantalla': 'Alto 24 cm x 38cm de diámetro'
        // }
        'maxCuotas': '6'
    },
    {
        'id': 'prod2',
        'nombre': 'Lámpara GRECIA',
        'precio': '47550',
        'detalle': 'Lámpara de techo',
        'maxCuotas': '6'
    },
    {
        'id': 'prod3',
        'nombre': 'Aplique ECLIPSE',
        'precio': '24000',
        'detalle': 'Lámpara de pared',
        'maxCuotas': '6'
    },
    {
        'id': 'prod4',
        'nombre': 'Lámpara STRIPES',
        'precio': '81000',
        'detalle': 'Lámpara de techo',
        'maxCuotas': '6'
    },
    {
        'id': 'prod5',
        'nombre': 'Lámpara MINIMAL',
        'precio': '2700',
        'detalle': 'Lámpara de techo',
        'maxCuotas': '6'
    },
    {
        'id': 'relacionado1',
        'nombre': 'Lámpara BINOMIO',
        'precio': '8.400',
        'detalle': 'Lámpara de techo',
        'maxCuotas': '6'
    },
    {
        'id': 'relacionado2',
        'nombre': 'Lámpara ERIZO',
        'precio': '10.500',
        'detalle': 'Lámpara de techo',
        'maxCuotas': '6'
    },
    {
        'id': 'relacionado3',
        'nombre': 'Lámpara MEMBRANA',
        'precio': '6.000',
        'detalle': 'Lámpara de techo',
        'maxCuotas': '6'
    },
    {
        'id': 'relacionado4',
        'nombre': 'Lámpara GRUA',
        'precio': '15.000',
        'detalle': 'Lámpara de techo',
        'maxCuotas': '6'
    },
    {
        'id': 'relacionado5',
        'nombre': 'Lámpara TRIVENTO',
        'precio': '8.400',
        'detalle': 'Lámpara de techo',
        'maxCuotas': '6'
    },
    // COMPLETAR: A C/U AGREGARLE EL DETALLE.
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
        res.render('home', {id: 'home', title: 'LUMEN Lights Shop', products: products});
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