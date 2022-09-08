import React from 'react'
import './../Main.css'

export const MainScreen = ({ setMainDisplay, setRandomNumber }) => {
    // estados
    const estilos = 'w-2/3 py-4 border  border-blue-400 hover:bg-blue-400 hover:text-white hover:scale-105 ease-out duration-500'


    // funciones
    const clickHandler = (e) => {
        if (e === 'play') {
            let randomNumber = 0
            let temp
            while (!randomNumber) {
                randomNumber++
                temp = `${Math.trunc((Math.random() * 10000))}`
                randomNumber =
                    (temp.length === 4) &&
                    (temp[0] !== temp[1]) &&
                    (temp[0] !== temp[2]) &&
                    (temp[0] !== temp[3]) &&
                    (temp[1] !== temp[2]) &&
                    (temp[1] !== temp[3]) &&
                    (temp[2] !== temp[3]) && temp
            }
            setRandomNumber(randomNumber)

        }
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
