const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if( esMongoId ){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );// Hace que no sea case sensitive

    const usuarios = await Usuario.find({ 
        $or: [ {nombre: termino}, { correo: regex }],
        $and: [{ estado: true}]
    });

    res.json({
        results: usuarios
    });
}

const buscarCategorias = async( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if( esMongoId ){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );// Hace que no sea case sensitive

    const categorias = await Categorias.find({ nombre:regex, estado:true });

    res.json({
        results: categorias
    });
}

const buscarProducto = async( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if( esMongoId ){
        const productos = await Producto.findById(termino)
                                .populate('categoria','nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );// Hace que no sea case sensitive

    const productos = await Producto.find({ nombre:regex, estado:true })
                            .populate('categoria','nombre');

    res.json({
        results: productos
    });
}


const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes(coleccion) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (key) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;

        case 'producto':
            buscarProducto(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
}

module.exports = {
    buscar,
}