import React from 'react'
import {  useNavigate } from 'react-router-dom'

// redux
import { useDispatch } from 'react-redux'
import { borrarProductoAction,obtenerProductoEditar } from '../actions/productoActions'
import Swal from 'sweetalert2'
const Producto = ({ producto }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // confirmar si desea eliminar
  const confirmarEliminarProducto = id => {
    // preguntar al usuario
    Swal.fire({
      title: 'Estás Seguro',
      text: "¿Deseas eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, BORRAR!',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.isConfirmed) {
        // pasarlo al action
        dispatch(borrarProductoAction(id))
       
      }
    })
  }
  const redireccionarEdicion = producto => {
    dispatch(obtenerProductoEditar(producto))
    navigate(`/productos/editar/${producto.id}`)
  }

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>{producto.precio}</td>
      <td>
        <button 
             onClick={()=>redireccionarEdicion(producto)}
             className="btn btn-outline-primary btn-sm mx-2">
             editar
        </button>
        <button
          onClick={() => confirmarEliminarProducto(producto.id)}
          className="btn btn-outline-danger btn-sm mx-2"
        >eliminar</button>
      </td>
    </tr>
  )
}

export default Producto