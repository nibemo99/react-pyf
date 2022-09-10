import React, { useState } from 'react'

export const Historial = ({ setMainDisplay }) => {
  // usestates
  const [renderLista, setRenderLista] = useState(0)


  //variables



  // funciones
  function clickHandler() {
    setMainDisplay('menu')
  }


  return (

    <div className='border border-black w-4/5 mx-auto mb-10 py-4 flex flex-col h-[450px] overflow-y-auto'>

      <button onClick={clickHandler} className='border-blue-400' >Regresar</button>

      {(renderLista === 0) && (
        <div className='flex flex-col'>

          {
            JSON.parse(localStorage.historial).map((element, index) => {
              return <button key={index} id={index} onClick={(e) => { setRenderLista(e.target.attributes.id.nodeValue); }} >{element.date}</button>

            })
          }




        </div>
      )}

      {(renderLista !== 0) && (
        <div>
          <h1>Esta es la partida # : {renderLista}</h1>
          <h3>Fecha {JSON.parse(localStorage.historial)[renderLista].date}</h3>
          <button onClick={(e) => { setRenderLista(0); console.log(renderLista); }} >Volver</button>
        </div>
      )}





    </div>
  )
}
