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

app.listen(3030, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3030/');
});

// app.listen(process.env.PORT || 3030, () => {
//     console.log('Servidor corriendo en el puerto http://localhost:3030/');
// });

app.use('/', router);