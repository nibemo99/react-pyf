// INICIO
import React, { useState } from 'react'
import './../Main.css'
import { Intento } from './Intento'
import { Intentos } from './Intentos'



export const PlayingScreen = ({ setMainDisplay, randomNumber, calcRandonNumber, setRandomNumber, addToLocalStorage, title, setTitle }) => {
    // estados
    const [intentos, setIntentos] = useState([])
    // const [intentos, setIntentos] = us eState([{ "numero": "1234", "picas": "1", "fijas": "0" }, { "numero": "1235", "picas": "1", "fijas": "0" }, { "numero": "1236", "picas": "1", "fijas": "0" }, { "numero": "1237", "picas": "2", "fijas": "0" }, { "numero": "1238", "picas": "2", "fijas": "0" }, { "numero": "1239", "picas": "2", "fijas": "0" }, { "numero": "1230", "picas": "1", "fijas": "0" }, { "numero": "1234", "picas": "1", "fijas": "0" }, { "numero": "1236", "picas": "1", "fijas": "0" }, { "numero": "1237", "picas": "2", "fijas": "0" }, { "numero": "1238", "picas": "2", "fijas": "0" }, { "numero": "1239", "picas": "2", "fijas": "0" }, { "numero": "1234", "picas": "1", "fijas": "0" }, { "numero": "1235", "picas": "1", "fijas": "0" }, { "numero": "1236", "picas": "1", "fijas": "0" }, { "numero": "1237", "picas": "2", "fijas": "0" }, { "numero": "7892", "picas": "0", "fijas": "4" }])
    const [finished, setFinished] = useState(false)
    // const estilos = 'border border-blue-400 '


    // randomNumber = Math.random() * 10
    console.log('render de playingscreen', randomNumber);

    // funciones
    function clickHandler(e) {
        if (e === 'menu') {
            setTitle('Picas y Fijas')
            setMainDisplay(e)
            setTimeout(() => {
                console.log('epa');
                setTitle('Picas y Fijas')
            }, 1500);
        }
        if (e === 'reseteo') {
            setRandomNumber(calcRandonNumber())
            setTitle('Reiniciado ✔️')
            setFinished(false)
            setIntentos([])

            console.log(randomNumber);
            setTimeout(() => {
                setTitle('A jugar! ⌛')
            }, 2000);

        }
    }
    function inputHandler(e) {
        let ENTER_KEY = 13
        // si se presional enter
        if (e.keyCode === ENTER_KEY) {

            // si la longitud es distinta de 4
            if (e.target.value.length !== 4) return avisoRevisarInput('lenght')

            if (!e.target.value) {
                e.target.value = ''
                return avisoRevisarInput('undefined')
            }

            (!!!intentos[intentos.length - 1])
                ? validarResultado(e.target.value, e)
                : (intentos[intentos.length - 1].numero === e.target.value)
                    ? avisoRevisarInput('same')
                    : validarResultado(e.target.value, e)
        }
    }
    function bringDate() {
        let x = new Date()
        return x.toDateString()
    }
    function validarInput(e) {
        let input = e.target.value
        let temp = Array.from(input)



        // si se detecta un menos, se ataca de una
        if (input[0] === '-') {
            temp.shift()
            e.target.value = temp.toString().replaceAll(',', '')
        }
        if (temp.length === 5) {
            temp.pop()
            e.target.value = temp.toString().replaceAll(',', '')
        }
        if (temp.length === 2) {
            if (temp[1] === temp[0]) {
                temp.pop()
                e.target.value = temp.toString().replaceAll(',', '')
            }
        }
        if (temp.length === 3) {
            if (temp[2] === temp[1] || temp[2] === temp[0]) {
                temp.pop()
                e.target.value = temp.toString().replaceAll(',', '')
            }
        }
        if (temp.length === 4) {
            if (temp[3] === temp[2] || temp[3] === temp[1] || temp[3] === temp[0]) {
                temp.pop()
                e.target.value = temp.toString().replaceAll(',', '')
            }
        }
    }
    function avisoRevisarInput(e) {
        console.log(`revisa: ${e}`);
    }
    function validarResultado(e, evento) {
        // console.log(e, typeof (e));
        let picas = 0
        let fijas = 0
        for (let i = 0; i < 4; i++) {
            if (e[i] === randomNumber[i]) { fijas++; console.log(e[i], 'es fija'); }
        }
        console.log(e, randomNumber);
        for (let i = 0; i < randomNumber.length; i++) {
            for (let j = 0; j < e.length; j++) {
                if (i !== j) {
                    if (randomNumber[i] === e[j]) {
                        picas++
                        console.log(i, ' es igual a ', j);
                    }
                }
            }
        }


        let temp = { numero: e, picas: `${picas}`, fijas: `${fijas}` }
        setIntentos([...intentos, temp])
        evento.target.value = ''

        if (fijas === 4) {
            let date = bringDate()
            addToLocalStorage([...intentos, temp,], date, true)
            setTitle('Felicidades!')
            setFinished(true)
            setTimeout(() => {
                setTitle('Picas y Fijas')
            }, 3000);
            // reemplazar el input por un boton de intentar de nuevo
            // cambiar el titulo del juego por 'Felicidades!'
            // Que salgan fuegos artificiales.
        }


    }



    // EN CADA RENDER

    return (
        <div className='w-4/5 mx-auto py-4 mb-8'>
            <div id='botonera' className='flex gap-3 justify-center mb-4'>
                <button
                    onClick={() => clickHandler('reseteo')}
                    className={` shadow-blue-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105 ${(finished) ? 'animate-wiggle shadow-lg' : 'shadow-sm'} `}
                >Reiniciar</button>
                <button
                    onClick={() => clickHandler('menu')}
                    className='shadow-sm shadow-blue-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105'
                >Regresar</button>
                <span onClick={() => console.log(randomNumber)} className='shadow-sm shadow-blue-700 w-1/4 mx-2  ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md ' >Ronda: {intentos.length}</span>

            </div>
            <div className='grid grid-cols-3 w-3/5 mx-auto bg-blue-300 my-1 text-lg'>
                <p>Picas</p>
                <p>Número</p>
                <p>Fijas</p>
            </div>

            <Intentos>
                <div className=' '>
                    {
                        intentos.map((element, index) => {
                            return <Intento key={index} element={element} />
                        })
                    }

                </div>
            </Intentos>
            {(!finished) && (
                <input
                    type='number'
                    onKeyUp={inputHandler}
                    onChange={validarInput}
                    className='text-center py-1 my-3 w-2/5'
                    placeholder='Escribe aquí'
                />
            )}
            {(finished) && (
                <>
                    <p className='text-2xl py-4'>¡Excelente investigación!</p>
                    <p className='text-xl'>Tu número es: 
                        <span className='pl-2 text-red-600'>
                             {randomNumber}
                        </span>
                    </p>
                    <img
                        alt='you made it :)'
                        src='https://c.tenor.com/iWw4l4A9TZsAAAAC/the-hangover-zach-galifianakis.gif'
                        className='mx-auto mt-5'
                    />
                </>
            )}



        </div>
    )
}
