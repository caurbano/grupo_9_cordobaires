function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        // res.redirect('./profile'); reacomodar luego, con id dinamico
        res.send('Esta página es sólo para invitadxs')
    }
    next();
};

module.exports = guestMiddleware;
//Esto debe exportarse a userRouter e implementarlo como midd en el metodo de register y login (listo)

