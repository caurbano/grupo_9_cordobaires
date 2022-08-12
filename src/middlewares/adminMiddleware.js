const db = require('../database/models');

function adminMiddleware(req, res, next) {

    db.User.findOne({ 
        where: { 
            email: req.session.userLogged.email,
            state: { [db.Sequelize.Op.eq] : 1 }
        },
        attributes:['admin']
    })
    .then(user => {
        if(user && !user.dataValues.admin){
            req.session.userLogged.admin = user.dataValues.admin;
            return res.redirect('/');
        }
        next();
    })
    .catch(error => res.send(error));
    // if (!req.session.userLogged.admin) {
    //     return res.redirect('/');
    // }
};

module.exports = adminMiddleware;