const { check } = require ("express-validator");

const validatorRegister = [
    check('firstName').notEmpty().withMessage('Debes completar este campo.'),
    check('lastName').notEmpty().withMessage('Debes completar este campo.'),
    check('email').notEmpty().withMessage('Debes completar este campo.').bail().isEmail().withMessage('Debes ingresar un email.'),
    check('phone').notEmpty().withMessage('Debes completar este campo.'),
    check('password').notEmpty().withMessage('Debes completar este campo.').bail().isLength({ min: 6 }).withMessage('La contraseña debe contener 6 caracteres como mínimo.')
];

module.exports = validatorRegister;