function adminMiddleware(req, res, next) {
    if (!req.session.userLogged.admin) {
        return res.redirect('/');
    }
    next();
};

module.exports = adminMiddleware;