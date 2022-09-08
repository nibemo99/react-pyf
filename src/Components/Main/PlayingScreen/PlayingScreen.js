import React, { useState } from 'react'
import './../Main.css'
import { Intento } from './Intento'
import { Intentos } from './Intentos'



// var arrayTemporal = [
//     {
//         numero: '1111',
//         picas: '1',
//         fijas: '1',
//     },
//     {
//         numero: '2222',
//         picas: '2',
//         fijas: '2',
//     },
//     {
//         numero: '3333',
//         picas: '3',
//         fijas: '3',
//     },
//     {
//         numero: '4444',
//         picas: '4',
//         fijas: '4',
//     },
// ]

export const PlayingScreen = ({ setMainDisplay, randomNumber, addToLocalStorage }) => {
    // estados
    const [intentos, setIntentos] = useState([])
    const estilos = 'border border-blue-400 '

    var flagEqualInput = false


    // funciones
    function clickHandler(e) {
        if (e === 'main') {
            setMainDisplay('main')

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
                ? validarResultado(e.target.value)
                : (intentos[intentos.length - 1].numero === e.target.value)
                    ? avisoRevisarInput('same')
                    : validarResultado(e.target.value)

        }
    }
    function validarResultado(e) {
        // console.log(e, typeof (e));
        let picas = 0
        let fijas = 0
        for (let i = 0; i < 4; i++) {
            if (e[i] === randomNumber[i]) fijas++
        }
        if (e[0] === randomNumber[1] || e[0] === randomNumber[2] || e[0] === randomNumber[3]) picas++
        if (e[1] === randomNumber[2] || e[1] === randomNumber[3]) picas++
        if (e[2] === randomNumber[3]) picas++

        let temp = { numero: e, picas: `${picas}`, fijas: `${fijas}` }
        setIntentos([...intentos, temp])

        if (fijas === 4) {
            let date = bringDate()
            addToLocalStorage([...intentos, temp], date, true)
            // reemplazar el input por un boton de intentar de nuevo
            // cambiar el titulo del juego por 'Felicidades!'
            // Que salgan fuegos artificiales.
        }


    }
    function bringDate() {
        let x = new Date()
        return x.toTimeString()
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


    return (
        <div className='border border-black w-4/5 mx-auto py-4 '>
            <div id='botonera' className='flex gap-8 justify-center'>
                <button
                    onClick={() => clickHandler('main')}
                    className={estilos}
                >Terminar</button>
                <span onClick={() => console.log(randomNumber)} className={estilos} >{intentos.length}</span>

            </div>

            <Intentos>
                {
                    intentos.map((element, index) => {
                        return <Intento key={index} element={element} />
                    })
                }
            </Intentos>

            <input type='number' onKeyUp={inputHandler} onChange={validarInput} />
        </div>
    )
}
