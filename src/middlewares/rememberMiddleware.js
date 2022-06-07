function rememberMiddleware(req, res, next) {
   

    if (req.cookies.remember != undefined && 
        req.session.userLogin == undefined) {
            console.log(req.session.userLogin)
            //seguir con video de Cookies min 10 aprox.
        }

    next();
}

module.exports = rememberMiddleware;

//despues se exporta en app.js: const rememberMiddleware = require(...)
//luego app.use(rememberMiddleware);