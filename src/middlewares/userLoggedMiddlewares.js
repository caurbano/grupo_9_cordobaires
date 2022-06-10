const User = require('../models/User')

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    let remember = req.cookies.remember;
    let userFromCookie = User.findByField('email', remember);

    if(userFromCookie){
        res.cookie('remember', remember, { maxAge: 1000 * 60 * 5 });
        req.session.userLogged = userFromCookie;
        delete req.session.userLogged.password;
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;