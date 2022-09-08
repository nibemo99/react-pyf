import React from 'react'

export const Historial = ({ setMainDisplay }) => {

  function clickHandler() {
    setMainDisplay('main')
  }


  return (

    <div>

      <button
        onClick={clickHandler}
        className='border-blue-400'
      >
        Regresar</button>


      Historial


    </div>
  )
}
