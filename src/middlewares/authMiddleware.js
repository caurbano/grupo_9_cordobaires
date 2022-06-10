function authMiddleware(req, res, next) {
    if (!req.session.userLogin) {
        res.redirect('./login');
    }
    next();
};

module.exports = authMiddleware;