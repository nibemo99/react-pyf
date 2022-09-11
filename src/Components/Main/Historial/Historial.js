import React, { useState } from 'react'

export const Historial = ({ setMainDisplay }) => {
  // usestates
  const [renderLista, setRenderLista] = useState(0)


  //variables


  // funciones
  function clickHandler() {
    setMainDisplay('menu')
  }
  function eliminarRegistro(event) {
    let textoBoton = event.target.innerText
    if (textoBoton === 'Eliminar') {
      event.target.innerText = '¿Definitivo?'
    }
    if (textoBoton === '¿Definitivo?') {
      parsedHistory.splice(renderLista - 1, 1)
      localStorage.historial = JSON.stringify(parsedHistory)
      event.target.innerText = 'Eliminado!'
      setTimeout(() => {
        setRenderLista(0)
      }, 1500);
    }
  }


  // Con cada render
  var parsedHistory = localStorage.historial
  if (!parsedHistory) {
    localStorage.historial = JSON.stringify([])
  }
  parsedHistory = JSON.parse(localStorage.historial)


  return (

    <div className=' w-4/5 mx-auto mb-10 flex flex-col h-[450px] '>

      <button
        onClick={clickHandler}
        className='shadow-sm shadow-blue-700 py-4 mx-auto my-4 w-1/2 hover:bg-blue-700 hover:text-white hover:scale-105 ease-out duration-500 focus:bg-blue-700 focus:text-white focus:scale-105'

      >Regresar</button>


      {/* SI RENDERLISTA === 0, renderiza toda la lista */}
      {(renderLista === 0) && (
        <div className='flex flex-col'>

          {
            // Traigo el localstorage y lo mapeo para renderizar cada uno de las partidas.
            parsedHistory.map((element, index) => {
              return (
                <button
                  key={index}
                  onClick={() => { setRenderLista(index + 1) }}
                  className=' py-1 mx-5 my-2 hover:scale-105 ease-out duration-500 grid grid-cols-2 items-center gap-4 shadow-sm shadow-blue-700 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105'
                >

                  <p className='text-2xl tracking-widest hover:scale-110 ease-in-out duration-500 w-fit mx-auto'
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

          <div className='grid grid-cols-2'>
            <h1>{parsedHistory[renderLista - 1].date}</h1>
            <h1>Rondas: {parsedHistory[renderLista - 1].data.length}</h1>
          </div>

          <div className='my-4 max-h-[275px] overflow-auto grid grid-cols-3 mx-auto w-3/5'>
            {/* Espacio para renderizar las rondas: */}

            <p className='bg-blue-200 text-lg'>Picas</p>
            <p className='bg-blue-200 text-lg'>Número</p>
            <p className='bg-blue-200 text-lg'>Fijas</p>

            {


              parsedHistory[renderLista - 1].data.map(e => {
                return (
                  <>
                    <p className='py-[2px]' key={`${e.picas}p`}>{e.picas}</p>
                    <p className='py-[2px]' key={`${e.numero}n`}>{e.numero}</p>
                    <p className='py-[2px]' key={`${e.fijas}f`}>{e.fijas}</p>
                  </>
                )
              })
            }


          </div>

          <button
            onClick={(e) => { setRenderLista(0) }}
            className='shadow-sm shadow-blue-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105'
          >Volver</button>
          <button
            onClick={eliminarRegistro}
            className='shadow-sm shadow-red-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-red-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105 '
          >Eliminar</button>

        </div>
      )}





    </div>
  )
}
