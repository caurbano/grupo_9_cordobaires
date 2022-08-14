const express = require('express');
const path = require('path'); 
const app = express();
const mainRouter = require('./routes/mainRouter');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLoggedMiddlewares = require('./middlewares/userLoggedMiddlewares');
const cors = require('cors');

app.use(cors());

app.use(methodOverride('_method'));

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(session({ secret: 'shhh', resave: false, saveUninitialized: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(userLoggedMiddlewares);

app.listen(process.env.PORT || 3030, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3030/');
});

app.use('/', mainRouter);