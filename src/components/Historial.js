import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Intento from './Intento';

const Historial = ( { setMainDisplay } ) => {
  // language
  const { t } = useTranslation();

  // usestates
  const [renderLista, setRenderLista] = useState( 0 )

  // funciones
  function clickHandler () {
    setMainDisplay( 'menu' )
  }
  function eliminarRegistro ( event ) {
    let textoBoton = event.target.innerText
    if ( textoBoton === t( 'Delete' ) ) {
      event.target.innerText = t( 'Sure?' )
    }
    if ( textoBoton === t( 'Sure?' ) ) {
      parsedHistory.splice( renderLista - 1, 1 )
      localStorage.historial = JSON.stringify( parsedHistory )
      event.target.innerText = t( 'Deleted!' )
      setTimeout( () => {
        setRenderLista( 0 )
      }, 1500 );
    }
  }

  // Con cada render
  var parsedHistory = localStorage.historial
  if ( !parsedHistory ) {
    localStorage.historial = JSON.stringify( [] )
  }
  parsedHistory = JSON.parse( localStorage.historial )
  parsedHistory.reverse()


  return (
    <div className={` w-full mx-auto mb-10 flex flex-col overflow-auto no-scrollbar ${( renderLista === 0 ) ? 'h-[450px]' : ''}`}>
      <button
        onClick={clickHandler}
        className='rounded-xl shadow-sm shadow-blue-700 py-4 mx-auto my-4 w-1/2 hover:bg-blue-700 hover:text-white hover:scale-105 ease-out duration-500 focus:bg-blue-700 focus:text-white focus:scale-105'
      >{t( "Back" )}</button>

      {/* SI RENDERLISTA === 0, renderiza toda la lista */}
      {( renderLista === 0 ) && (
        <div className='flex flex-col'>

          {( parsedHistory.length === 0 ) && (
            <>
              <p className='mx-auto w-2/3 py-3 animate-wiggle' >¡Ups!</p>
              <p className='mx-auto w-2/3 py-3' >{t( "You don't have games saved yet." )}</p>
            </>
          )}

          {
            // Traigo el localstorage y lo mapeo para renderizar cada uno de las partidas.
            parsedHistory.map( ( element, index ) => {
              return (
                <button
                  key={index}
                  onClick={() => { setRenderLista( index + 1 ) }}
                  className='rounded-xl py-1 mx-5 my-2 hover:scale-105 ease-out duration-500 grid grid-cols-2 items-center gap-4 shadow-sm shadow-blue-700 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105'
                >
                  {( isNaN( element.data.length ) ) ? (
                    <>
                      <p className={`text-xl hover:scale-110 ease-in-out duration-500 w-fit mx-auto ${( index === 0 ) ? 'animate-wiggle' : ''}`}
                      >
                        {element.data.meName} <strong> vs </strong> {element.data.oponentName}
                      </p>
                      <div className='flex flex-col gap-1 justify-between'>
                        <p className='text-gray-500 hover:text-blue-700 ease-in-out duration-500' >{element.date}</p>
                        <p className={`${( element.data.me[element.data.me.length - 1]?.fijas === 4 ) ? 'text-lime-500' : 'text-rose-500'}`}>
                          {t( "Round" )}s:
                          {( element.data.me[element.data.me.length - 1]?.fijas === 4 ) ? ( element.data.me.length ) : ( element.data.oponent.length )}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className={`text-xl tracking-widest hover:scale-110 ease-in-out duration-500 w-fit mx-auto ${( index === 0 ) ? 'animate-wiggle' : ''}`}
                      >
                        {element.data[element.data.length - 1].numero}
                      </p>
                      <div className='flex flex-col gap-1 justify-between'>
                        <p className='text-gray-500 hover:text-blue-700 ease-in-out duration-500' >{element.date}</p>
                        <p>{t( "Round" )}s: {element.data.length}</p>
                      </div>
                    </>
                  )}
                </button>
              )

            } )
          }
        </div>
      )}

      {/* SI RENDERLISTA !== 0, renderiza el item con index === RENDERLISTA */}
      {( renderLista !== 0 ) && (
        <>
          {( isNaN( parsedHistory[renderLista - 1].data.length ) ) ? (
            <>
              {/* MULTIPLAYER GAME */}
              <div className='py-1'>
                <div className='grid grid-cols-2'>
                  <h1>{parsedHistory[renderLista - 1].date}</h1>
                  <h1>{t( "Round" )}s: {( parsedHistory[renderLista - 1].data.me[parsedHistory[renderLista - 1].data.me.length - 1]?.fijas === 4 ) ? ( parsedHistory[renderLista - 1].data.me.length ) : ( parsedHistory[renderLista - 1].data.oponent.length )}</h1>
                </div>

                <div className='border-2 w-full px-3 pb-8 grid grid-cols-2 gap-2'>
                  <div>
                    <p className={` ${( parsedHistory[renderLista - 1].data.me[parsedHistory[renderLista - 1].data.me.length - 1]?.fijas === 4 ) ? 'text-2xl font-bold animate-wiggle animate-colorChange' : 'text-2xl'}`}>{parsedHistory[renderLista - 1].data.meName}</p>
                    <div className='grid grid-cols-3 mx-auto bg-blue-300 my-1 text-lg'>
                      <p>Picas</p>
                      <p>Number</p>
                      <p>Fijas</p>
                    </div>
                    {parsedHistory[renderLista - 1].data.me.map( ( element, index ) => {
                      return <Intento key={index} element={element} multi={true} />
                    } )}
                  </div>

                  <div>
                    <p className={`${( parsedHistory[renderLista - 1].data.oponent[parsedHistory[renderLista - 1].data.oponent.length - 1]?.fijas === 4 ) ? 'text-2xl font-bold animate-wiggle animate-colorChange' : 'text-2xl'}`} >{parsedHistory[renderLista - 1].data.oponentName}</p>
                    <div className='grid grid-cols-3 mx-auto bg-blue-300 my-1 text-lg'>
                      <p>Picas</p>
                      <p>Number</p>
                      <p>Fijas</p>
                    </div>
                    {parsedHistory[renderLista - 1].data.oponent.map( ( element, index ) => {
                      return <Intento key={index} element={element} multi={true} />
                    } )}

                  </div>
                </div>

                <button
                  onClick={( e ) => { setRenderLista( 0 ) }}
                  className='rounded-xl shadow-sm shadow-blue-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105'
                >{t( "Return" )}</button>
                <button
                  onClick={eliminarRegistro}
                  className='rounded-xl shadow-sm shadow-red-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-red-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105 '
                >{t( "Delete" )}</button>
              </div>

            </>
          ) : (
            <>
              {/* IF IT'S A NORMAL GAME */}
              <div className='py-1'>
                <div className='grid grid-cols-2'>
                  <h1>{parsedHistory[renderLista - 1].date}</h1>
                  <h1>{t( "Round" )}s: {parsedHistory[renderLista - 1].data.length}</h1>
                </div>
                <div className='my-4  grid grid-cols-3 mx-auto w-3/5 pb-2'>
                  {/* Espacio para renderizar las rondas: */}
                  <p className='bg-blue-200 text-lg'>Picas</p>
                  <p className='bg-blue-200 text-lg'>{t( "Number" )}</p>
                  <p className='bg-blue-200 text-lg'>Fijas</p>

                  {parsedHistory[renderLista - 1].data.map( ( e, i, a ) => {
                    return (
                      <>
                        <p className='py-[2px]' key={`${e.picas}p`}>{e.picas}</p>
                        <p className={`py-[2px] ${( i === a.length - 1 ) ? 'animate-colorChange' : ''}`} key={`${e.numero}n`}>{e.numero}</p>
                        <p className='py-[2px]' key={`${e.fijas}f`}>{e.fijas}</p>
                      </>
                    )
                  } )}

                </div>
                <button
                  onClick={( e ) => { setRenderLista( 0 ) }}
                  className='rounded-xl shadow-sm shadow-blue-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105'
                >{t( "Return" )}</button>
                <button
                  onClick={eliminarRegistro}
                  className='rounded-xl shadow-sm shadow-red-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-red-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105 '
                >{t( "Delete" )}</button>
              </div>

            </>
          )}
        </>
      )
      }





    </div >
  )
}

export default Historial