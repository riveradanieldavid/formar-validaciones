const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

// Validaciones. //ESTO PODRIA ESTAR EN OTRO ARCHIVO EN OTRA CARPETA DISPONIBLE A REQUERIR
const { body, check } = require('express-validator');
const validateCreateForm = [
    body('first_name').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('last_name').notEmpty().withMessage('Debes completar el campo de apellido'),
    body('email').isEmail().withMessage('Debes completar un email válido'),
    check('password') //check OTRA FORMA DE VALIDAR...
        .notEmpty().withMessage('Debes elegir una contraseña.').bail() // bail() TIRA ERROR Y CORTA. NECESARIO PARA EVITAR ERROR: "value invalid"
        .isLength({ min: 5 }).withMessage('Debe tener mínimo 5 caracteres la contraseña.'),
    check('category').notEmpty().withMessage('Debes elegir una categoría.')
];
// Validaciones. //ESTO PODRIA ESTAR EN OTRO ARCHIVO EN OTRA CARPETA DISPONIBLE A REQUERIR/

// Todos los usuarios
router.get('/', controller.index);

// Formulario de creación
router.get('/create', controller.create);

// Procesamiento del formulario de creación
// PONER        validateCreateForm  VALIDADOR DE form, CONFIGURADO ANTES, ENTRE LA RUTA Y EL MÉTODO
router.post('/', validateCreateForm, controller.store);

// Detalle de un usuario
router.get('/:id', controller.show);

module.exports = router;