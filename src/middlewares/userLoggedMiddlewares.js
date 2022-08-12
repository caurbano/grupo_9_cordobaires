const db = require('../database/models')

async function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    if( req.cookies && req.cookies.rememberEmail ){
        res.cookie('rememberEmail', req.cookies.rememberEmail, { maxAge: 1000 * 60 * 5 });
    //     let rememberEmail = req.cookies.rememberEmail;
    // let userFromCookie = User.findByField('email', rememberEmail);

    // if( userFromCookie ){
    //     res.cookie('rememberEmail', rememberEmail, { maxAge: 1000 * 60 * 5 });
    //     req.session.userLogged = userFromCookie;
    //     delete req.session.userLogged.password;
    // }
    }
    
    
    if(req.session.userLogged){
        try{
            let user = await db.User.findOne({ 
                where: { 
                    email: req.session.userLogged.email,
                    state: { [db.Sequelize.Op.eq] : 1 }
                },
                attributes:['id', 'first_name', 'last_name', 'admin', 'email', 'phone', 'img']
            })
            if(user){
                req.session.userLogged = user.dataValues;
            }
        }
        catch(errors){res.send(errors)};
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;