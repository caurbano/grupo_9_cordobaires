const db = require('../database/models')

async function userCookie(req, res, next){

    if( req.cookies.rememberEmail && !req.session.userLogged ){
        try{
            let user = await db.User.findOne({ 
                where: { 
                    email: req.cookies.rememberEmail,
                    state: { [db.Sequelize.Op.eq] : 1 }
                },
                attributes:['id', 'first_name', 'last_name', 'admin', 'email', 'phone', 'img']
            })
            
            if(user){
                req.session.userLogged = user.dataValues;
                res.locals.isLogged = true;
                return res.redirect('/');
            }else{
                res.clearCookie('rememberEmail');
            }
        }
        catch(errors){res.send(errors)};
    }
    next();
}

module.exports = userCookie;