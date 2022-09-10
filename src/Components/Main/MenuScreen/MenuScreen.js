import React from 'react'
import './../Main.css'

export const MenuScreen = ({ setMainDisplay }) => {
    // estados
    const estilos = 'w-2/3 py-4 border  border-blue-400 hover:bg-blue-400 hover:text-white hover:scale-105 ease-out duration-500'


    // funciones
    const clickHandler = (e) => {
        setMainDisplay(e)
    }


    return (
        <div className='flex flex-col justify-center items-center gap-5 mt-16 border bordergre'>
            {/* <button>Reanudar</button> */}
            <button onClick={() => clickHandler('play')} className={estilos} >Nuevo juego</button>
            <button onClick={() => clickHandler('hist')} className={estilos} >Historial</button>
            <button disabled onClick={() => clickHandler('howto')} className={estilos} >Como jugar</button>
        </div>
    )
}
