const { check } = require ("express-validator");

const validatorEditUser = [
    check('first_name').notEmpty().withMessage('Debes completar este campo.').bail().isLength({ min: 2 }).withMessage('Debe contener 2 caracteres como mínimo.'),
    check('last_name').notEmpty().withMessage('Debes completar este campo.').bail().isLength({ min: 2 }).withMessage('Debe contener 2 caracteres como mínimo.'),
    check('email').notEmpty().withMessage('Debes completar este campo.').bail().isEmail().withMessage('Debes ingresar un email.'),
    check('phone').notEmpty().withMessage('Debes completar este campo.').bail().isLength({ min: 7 }).withMessage('Debe contener 7 numeros como mínimo.'),
    check('password').notEmpty().withMessage(' ').bail().isLength({ min: 8 }).withMessage('La contraseña debe contener 8 caracteres como mínimo.').bail().matches(/\d/).withMessage('La contraseña debe tener un numero').bail().matches(/[A-Z]/).withMessage('La contraseña debe tener una letra mayuscula.')
];

module.exports = validatorEditUser;