const User = require('../models/User')

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    if( req.cookies.rememberEmail ){
        let rememberEmail = req.cookies.rememberEmail;
    let userFromCookie = User.findByField('email', rememberEmail);

    if( userFromCookie ){
        res.cookie('rememberEmail', rememberEmail, { maxAge: 1000 * 60 * 5 });
        req.session.userLogged = userFromCookie;
        delete req.session.userLogged.password;
    }
    }
    
    
    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;