import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editarProductoAction } from '../actions/productoActions'


const EditarProducto = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  // state local de producto
  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0
  })

  // producto a editar
  const productoEditar =  useSelector(state => state.productos.productoeditar)
  const { nombre, precio }=producto
  
  // llenar el state automáticamente
  useEffect(() => {
    setProducto(productoEditar)
  }, [productoEditar])
  
  // leer los datos del formulario

  const onChangeFormulario = e =>{
    setProducto({
      ...producto,
     [e.target.name]: e.target.value
    })
  }
  const submitEditarProducto = e =>{
  e.preventDefault()
  dispatch ( editarProductoAction(producto) )
  
  
  navigate('/')    
 
}  
  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Editar Producto
            </h2>
            <form
                 onSubmit={submitEditarProducto}
                 >
              <div className='form-group'>
               <label htmlFor='nombre'>Nombre Producto</label>
               <input 
                type='text'
                className='form-control'
                placeholder='Nombre Producto'
                name='nombre'
                value={nombre}
                onChange={onChangeFormulario}
                
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
                onChange={onChangeFormulario}
                
               />
              </div>
              <button
               type='submit'
               className='btn btn-outline-primary font-weight-bold text-uppercase d-block w-100'
               >Guardar Cambios</button>
               
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto