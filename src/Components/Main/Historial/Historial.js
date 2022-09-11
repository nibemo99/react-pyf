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

    <div className=' w-4/5 mx-auto mb-10 flex flex-col h-[450px] overflow-y-auto'>

      <button
        onClick={clickHandler}
        className='shadow-sm shadow-blue-700 py-4 mx-auto my-2 w-1/2 hover:bg-blue-700 hover:text-white hover:scale-105 ease-out duration-500 focus:bg-blue-700 focus:text-white focus:scale-105'

      >Regresar</button>


      {/* SI RENDERLISTA === 0, renderiza toda la lista */}
      {(renderLista === 0) && (
        <div className='flex flex-col'>

          {
            // Traigo el localstorage y lo mapeo para renderizar cada uno de las partidas.
            JSON.parse(localStorage.historial).map((element, index) => {
              return (
                <button
                  key={index}
                  onClick={() => { setRenderLista(index + 1) }}
                  className=' py-1 mx-5 my-2 hover:scale-105 ease-out duration-500 grid grid-cols-2 items-center gap-4 shadow-sm shadow-blue-700 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105'

                >

                  <p
                    className='text-2xl tracking-widest hover:scale-110 ease-in-out duration-500 w-fit mx-auto'

                  >
                    {element.data[element.data.length - 1].numero}
                  </p>

                  <div className='flex flex-col gap-1 justify-between'>
                    <p className='text-gray-500 hover:text-blue-700 ease-in-out duration-500' >{element.date}</p>
                    <p>Rondas: {element.data.length}</p>
                  </div>
                </button>
              )

            })
          }




        </div>
      )}

      {/* SI RENDERLISTA !== 0, renderiza el item con index === RENDERLISTA */}
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
