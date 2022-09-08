import React from 'react'

export const ComoJugar = ({ setMainDisplay }) => {

    // funciones
    function clickHandler() {
        setMainDisplay('main')
    }

    return (


        <div>
            <button
                onClick={clickHandler}
                className='border border-blue-400 '
            >Terminar</button>

            ComoJugar
        </div>
    )
}
