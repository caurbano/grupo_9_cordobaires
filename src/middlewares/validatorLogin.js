const { check } = require ("express-validator");

const validatorLogin = [
    check('email').notEmpty().isEmail().withMessage('Debes completar este campo.'),
    check('password').notEmpty().withMessage('Debes completar este campo.')
];

module.exports = validatorLogin;