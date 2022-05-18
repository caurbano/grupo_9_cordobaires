const express = require('express');
const path = require('path'); 
const app = express();
const router = require('./routes/main');
const methodOverride =  require('method-override');

app.use(methodOverride('_method'));

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// app.listen(3030, () => {
//     console.log('Servidor corriendo en el puerto http://localhost:3030/');
// });

 app.listen(process.env.PORT || 3000, () => {
     console.log('Servidor corriendo en el puerto 3000');
 });

app.use('/', router);

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/home.ejs'))
// });

// app.get('/productDetail', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/products/productDetail.ejs'))
// });

// app.get('/productCart', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/products/productCart.ejs'))
// });

// app.get('/register', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/users/register.ejs'))
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/users/login.ejs'))
// });
