import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Actions de Redux
import {crearNuevoProductoAction} from '../actions/productoActions'
import { useDispatch, useSelector } from 'react-redux'
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions'



const NuevoProducto = () => {

  // state local del componente
  const [nombre, guardarNombre] = useState('')
  const [precio, guardarPrecio] = useState(0)
  const navigate = useNavigate()

  // utilizar use dispatch y te crea una función
  const dispatch = useDispatch()

  // Acceder al state del Store

  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta)
 

  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))
  
  // Cuando el usuario haga submit  
   const submitNuevoProducto = e =>{
    e.preventDefault()

  // validar formulario
  if (nombre.trim() === '' || precio < 1){

    const alerta = {
      msg: 'Ambos campos son obligatorios',
      classes: 'alert alert-danger text-center text-uppercase p-3'
    }
    dispatch(mostrarAlerta(alerta))
    return;
  }

  // si no hay errores
  dispatch(ocultarAlertaAction())

  // crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    });

  // redireccionar
  navigate('/')
  }
  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoProducto}>
              <div className='form-group'>
               <label htmlFor='nombre'>Nombre Producto</label>
               <input 
                type='text'
                className='form-control'
                placeholder='Nombre Producto'
                name='nombre'
                value={nombre}
                onChange={e=>guardarNombre(e.target.value)}
               />
              </div>
              <div className='form-group'>
               <label htmlFor='precio'>Precio Producto</label>
               <input 
                type='number'
                className='form-control'
                placeholder='Precio Producto'
                name='precio'
                value={precio}
                onChange={e=>guardarPrecio(Number(e.target.value))}
               />
              </div>
              <button
               type='submit'
               className='btn btn-outline-primary font-weight-bold text-uppercase d-block w-100'
               >Agregar</button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto