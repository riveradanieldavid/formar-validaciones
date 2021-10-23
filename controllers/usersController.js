const jsonTable = require('../database/jsonTable');
const usersModel = jsonTable('users');
//       ERRORES         EXTRAER  DE  express-validator
const { validationResult } = require('express-validator');

module.exports = {
    index: (req, res) => {
        let users = usersModel.all()
        res.render('users/index', { users });
    },

    create: (req, res) => {
        res.render('users/create');
    },

    store: (req, res) => {
        // PONER ERRORES EN UNA VARIABLE
        let errors = validationResult(req);
        //CONDICIONAL NECESARIO PARA MOSTRAR ERRORES SOLO SI LOS HAY, O CUANDO LOS HAYA. SINO MOSTRARÍA ERROR
        if (errors.isEmpty()) {
            let user = req.body;
            userId = usersModel.create(user);
            res.redirect('/users/' + userId);
            res.send(errors); // COMENTAR RESTO DEL CODIGO (MENOS let errors) PARA COMPROBAR Y VER  ARRAY DE ERRORES
        } else {
            // RENDER form  create    :
            res.render('users/create', {
                errors: errors.array(), // Errors COMO array DE ERRORES SINO COMPLETA form DE CREACIÓN DE USUARIO
                old: req.body, // old: req.body RECORDAR VIEJO DATO INGRESADO
            });
        }
    },

    show: (req, res) => {
        let user = usersModel.find(req.params.id);
        res.render('users/detail', { user });
    }
}
/*
// REPASANDO ARRAYS XD!
{
    errorss = [
        {
            "value": "",
            "msg": "Debes completar el campo de nombre",
            "param": "first_name",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Debes completar el campo de apellido",
            "param": "last_name",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Debes completar un email válido",
            "param": "email",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Debes elegir una contraseña.",
            "param": "password",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Debes elegir una categoría.",
            "param": "category",
            "location": "body"
        }
    ]
}
// ACCEDIENDO SIN ITERAR
//                   NOMBRE[INDICE]+NOMBRE INDICE
// console.log(errorss[0].msg);
// PRINT: Debes completar el campo de nombre

//ACCEDIENDO ITERANDO
//INDICE + NOMBRE INDICE
// index.msg
*/


