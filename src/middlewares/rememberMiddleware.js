function rememberMiddleware(req, res, next) {
    next();

    if (req.cookies.remember != undefined && 
        req.session.userLogin == undefined) {
            req.session.userLogin
            //seguir con video de Cookies min 10 aprox.
        }
}

module.exports = rememberMiddleware;

//despues se exporta en app.js: const rememberMiddleware = requie(...)
//luego app.use(rememberMiddleware);