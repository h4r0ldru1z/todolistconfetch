import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
  const [toDo, setToDo] = useState([]);
  const [tarea, setTarea] = useState("");

  const [refresh,setRefresh]=useState(true)

  const onSubmit = (e) => {
    e.preventDefault();
    addArraymetodoPut( [...toDo, {label: tarea, done: false}]); //enviar un array con toda la estructura para mapear
    //prev son los valores previos del array
    setTarea("");
  };
  //console.log(toDo);
  const elementDelete = (dIndex) => {
    addArraymetodoPut(toDo.filter((e, i) => i != dIndex));
    //resultado de un filter es un array, accedemos al array desde 0 hasta i
    // se guardan todos los elementos en el ToDo excepto los que son iguales al dIndex
  };

  const addArraymetodoPut=(toDo)=>{
    fetch("https://assets.breatheco.de/apis/fake/todos/user/haroldoruiz", {
      method: "PUT",
      body: JSON.stringify(toDo),
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then((resp)=>resp.json()) //respuesta de la API se convierte en JSON
    .then(()=>setRefresh((prev)=>!prev))//put solo devuleve OK
  }
  //método default del fetch es GET
  useEffect(()=>{
    fetch("https://assets.breatheco.de/apis/fake/todos/user/haroldoruiz")
    .then((resp)=>resp.json()) //respuesta de la API se convierte en JSON
    .then((data)=>setToDo(data))
  },[refresh])//[] especifica es que se ejecuta una sola vez. useEffect se ejecuta cada vez que la variable cambie
  //vacío lo ejecuta una sola vez
  return (
    <div className="container">
      <div>
        <h1 className="text-center">Tareas</h1>
        <form onSubmit={onSubmit}>
          <div className="input-group d-flex justify-content-center">
            <input
              type="text"
              placeholder="¿Qué hay pa' hacer?"
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
            />
          </div>
          <div>
            {toDo.map((element, dIndex) => {
              return (
                <div className="d-flex justify-content-between my-3 col-4 mx-auto">
                  <p>{element.label}</p>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => elementDelete(dIndex)}
                  >
                    {" "}
                  </button>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
