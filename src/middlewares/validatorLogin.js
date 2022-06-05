const { check } = require ("express-validator");

const validatorLogin = [
    check('email').notEmpty().withMessage('Debes completar este campo.'),
    check('password').notEmpty().withMessage('Debes completar este campo.')
];

module.exports = validatorLogin;

// const { body } = require('express-validator');

// let validateLogin = [
//     body('email').notEmpty().withMessage('Debes completar este campo con tu email de registro'),
//     // .bail()
//     // .isEmail().withMessage('Debes ingresar un email válido'),
//     body('password').notEmpty().withMessage('Debes completar este campo con tu contraseña')
//     // .bail()
//     // .isLength({ min: 6 }).withMessage('La contraseña debe contener 6 caracteres como mínimo')
// ]; 