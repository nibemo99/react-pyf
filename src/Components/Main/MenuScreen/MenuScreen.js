import React from 'react'
import './../Main.css'

export const MenuScreen = ({ setMainDisplay, calcRandonNumber, setRandomNumber, title, setTitle }) => {
    // estados
    const estilos = 'w-2/3 py-4 shadow-sm shadow-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105 focus:bg-blue-700 focus:text-white focus:scale-105 ease-out duration-500'


    // funciones
    const clickHandler = (e) => {
        if (e === 'play') {
            setRandomNumber(calcRandonNumber)
            setTitle('A jugar! ⌛')
        }
        if (e === 'howto') {
            setTitle('Guías')
        }
        setMainDisplay(e)
    }


    // En cada render
    if (title !== 'Picas y Fijas') {
        setTitle('Picas y Fijas')
    }

    return (
        <div className='flex flex-col justify-center items-center gap-5 mt-16 border bordergre'>
            {/* <button>Reanudar</button> */}
            <button onClick={() => clickHandler('play')} className='w-2/3 py-4 shadow-sm shadow-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105 focus:bg-blue-700 focus:text-white focus:scale-105 ease-out duration-500 '


            >Nuevo juego</button>
            <button onClick={() => clickHandler('hist')} className={estilos} >Historial</button>
            <button onClick={() => clickHandler('howto')} className={estilos} >Como jugar</button>
        </div>
    )
}
