import React from 'react'
import './../Main.css'

export const MainScreen = ({ setMainDisplay }) => {
    console.log({ setMainDisplay })
    return (
        <div className=''>
            <button>Reanudar</button>
            <button>Nuevo juego</button>
            <button>Historial</button>
        </div>
    )
}
