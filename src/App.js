import React, { useEffect,useState } from "react";
import { nanoid } from 'nanoid'

export default function App() {
  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  const [error, setError] = useState(null)

  let datos = [
    {id: 1, tarea: 'reactjs'},
    {id: 2, tarea: 'vuejs'},
    {id: 3, tarea: 'angularjs'},
  ];

  const fetchData = async () => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/`)
    const user = await data.json()
    console.log(user)
    setTareas(user)
}

  useEffect( ()=>{
    setTareas(datos);
    fetchData();
  },[]);


  const agregarTarea = e => {
    
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Campo vacio')
      setError('El campo no puede estar Vacío')
      return
    }

    setTareas([
      ...tareas,
      {tarea, id: nanoid(10)}
    ]);
    setTarea('')
    setError(null)
  }//agregarTarea

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')


const editar = item => {
  setModoEdicion(true)
  setTarea(item.tarea)
  setId(item.id)
}

const editarTarea = e => {
  e.preventDefault()
  if(!tarea.trim()){
    console.log('Campo vacio');
    setError('El campo no puede estar Vacío');
    return
  }

  const arrayEditado = tareas.map(item => item.id === id ? {id, tarea} : item)
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea('');
    setId('');
    setError(null);
}
  return (
      <>
        <div className="container mt-5">
          <h1 className="text-center">CRUD</h1>
          <hr/>
          <div className="row">

            <div className="col-8">
              <h4 className="text-center">Lista de empleados</h4>
              <ul className="list-group">
                {
                  tareas.length === 0 ? (
                    <li className="list-group-item"> <i> Sin Información</i></li>
                  ) : (
                    tareas.map(item => (
                      <li className="list-group-item" key={item.id}>
                        <span className="lead">{item.name}</span>
                        <button 
                          className="btn btn-sm btn-danger float-right mx-2"
                          onClick={() => eliminarTarea(item.id)}
                        >Eliminar</button>
                        <button 
                          className="btn btn-sm btn-warning float-right"
                          onClick={() => editar(item)}
                        >Editar</button>
                      </li>
                    ))
                  )
                }
              </ul>
            </div>

            <div className="col-4">
            <h4 className="text-center">
              {
                modoEdicion ? 'Editar' : 'Agregar'
              }
            </h4>
            <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
                error ? <span className="text-danger">{error}</span> : null
              }
                <input 
                  type="text" 
                  className="form-control mb-2"
                  placeholder="Ingrese Empleado"
                  onChange={e => setTarea(e.target.value)}
                  value={tarea}
                />
                {
                  modoEdicion ? (
                    <button className="btn btn-warning btn-block" type="submit">Editar</button>
                  ) : (
                    <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                  )
                }
              </form>
            </div>

  </div>
</div>
      </>
  );
}
