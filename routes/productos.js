const { Router } = require('express');

const { obtenerProductos, 
        obtenerProducto, 
        crearProducto, 
        actualizarProducto, 
        borrarProducto 
    } = require('../controllers/productos');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { check } = require('express-validator');

const router = Router();


// Obtener todos los productos - público
router.get('/', obtenerProductos);

// Obtener un producto por id - público
router.get('/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

// Crear producto - privado - cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

// Actualizar - privado - cualquier persona con un token válido
router.put('/:id',[
    validarJWT,
    check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], actualizarProducto);

// Borrar un producto - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], borrarProducto);

module.exports = router;