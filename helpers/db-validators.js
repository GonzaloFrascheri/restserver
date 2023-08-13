const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

// Email
const emailExiste = async( correo = '' ) => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

// Usuario
const existeUsuarioPorId = async( id ) => {
    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

// Categoria
const existeCategoriaPorId = async( id ) => {
    // Verificar si existe categoria
    const existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ){
        throw new Error(`El id ${id} de la categoría no existe`);
    } 
}

// Productos
const existeProductoPorId = async( id ) => {
    // Verificar si existe categoria
    const existeProducto = await Producto.findById(id);
    if( !existeProducto ){
        throw new Error(`El id ${id} del producto no existe`);
    } 
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}

