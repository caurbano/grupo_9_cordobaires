function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect('/');
    }
    next();
};

module.exports = guestMiddleware;
//Esto debe exportarse a userRouter e implementarlo como midd en el metodo de register 


//en authMiddleware.js
// function authMiddleware(req, res, next) {
//     if (req.session.userLogin != undefined) {
//         next();
//     } else {
//         res.send('Esta página es sólo para usuarios');
//     } 
// };

// module.exports = authMiddleware;

