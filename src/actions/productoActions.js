import Swal from 'sweetalert2'
import clienteAxios from '../config/axios'
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types'


// crear nuevos productos

export function crearNuevoProductoAction(producto) {

    return async (dispatch)=>{
        dispatch(agregarProducto())
        
        try {
            // insertar en la API
           await clienteAxios.post('/productos', producto)
            // si todo sale bien actualizar state
            dispatch(agregarProductoExito(producto))
            //alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            //si hay error cambiar state
            dispatch(agregarProdductoError(true))
            
            //alerta de error
            Swal.fire({
                icon: 'error',
                title:'Error',
                text:'Hubo un error, Intenta de nuevo'
            })
        }
       
    }
}

const agregarProducto =()=>({
    type:AGREGAR_PRODUCTO,
    payload:true
    
})

// si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type:AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
// si hubo un error
const agregarProdductoError = estado =>({
    type:AGREGAR_PRODUCTO_ERROR,
    payload:estado
})
// Funcion que descarga los productos de la DB
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() )
        try {
           const respuesta = await clienteAxios('/productos')
           dispatch (descargaProductosExitosa(respuesta.data))
        } catch (error) {
           console.log(error) 
           dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = ()=>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos=>({
    type:DESCARGA_PRODUCTOS_EXITO,
    payload:productos

})

const descargaProductosError = ()=>({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload:true
})
// Selecciona y elimina el producto

export function borrarProductoAction(id){
    return async (dispatch) =>{
        dispatch( obtenerProductoEliminar(id) )
try {
     await clienteAxios.delete(`/productos/${id}`)
        dispatch( elimnarProductoExito() )
        Swal.fire(
            'BORRADO',
            'El Producto ha sido eliminado',
            'success'
          )
} catch (error) {
    console.log(error)
        dispatch(eliminarProductoError())
}
        
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})
const elimnarProductoExito = ()=>({
    type: PRODUCTO_ELIMINADO_EXITO,

})
const eliminarProductoError = ()=>({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// colocar en activo producto en edicion

export function obtenerProductoEditar (producto) {
    return (dispatch) => {
        dispatch (obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto =>({
   type: OBTENER_PRODUCTO_EDITAR,
   payload: producto
})

// edita un registro en la api

export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch ( editarProducto())
        try {
        await clienteAxios.put(`/productos/${producto.id}`, producto)
        dispatch ( editarProductoExito(producto))
        } catch (error) {
        console.log(error)
        dispatch ( editarProductoError())
        }
    }
}
const editarProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO,
    
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})
const editarProductoError = ()=>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})