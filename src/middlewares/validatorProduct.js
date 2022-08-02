const { check } = require ("express-validator");

const productMiddleware = [
    check('name').notEmpty().withMessage('Debes completar este campo.').bail().isLength({ min: 5 }).withMessage('Debe contener 5 caracteres como mínimo.'),
    check('description').isLength({ min: 20 }).withMessage('Debe contener 20 caracteres como mínimo.')
];

module.exports = productMiddleware;