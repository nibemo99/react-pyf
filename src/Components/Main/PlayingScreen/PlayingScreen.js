import React, { useState } from 'react'
import './../Main.css'
import { Intento } from './Intento'
import { Intentos } from './Intentos'



var arrayTemporal = [
    {
        numero: '1111',
        picas: '1',
        fijas: '1',
    },
    {
        numero: '2222',
        picas: '2',
        fijas: '2',
    },
    {
        numero: '3333',
        picas: '3',
        fijas: '3',
    },
    {
        numero: '4444',
        picas: '4',
        fijas: '4',
    },
]

export const PlayingScreen = ({ setMainDisplay, randomNumber }) => {
    // estados
    const [intentos, setIntentos] = useState(arrayTemporal)
    const estilos = 'border border-blue-400 '


    // funciones
    function clickHandler(e) {
        (e === 'main') && setMainDisplay('main')
        if (e === 'hola') {
            setIntentos([...intentos, { numero: randomNumber }])
        }
    }
    function inputHandler(e) {
        if (e.keyCode === 13) {
            validarResultado(e.target.value);
        }
    }
    function validarResultado(e) {
        // body
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

    return (
        <div className='border border-black w-4/5 mx-auto py-4 '>
            <div id='botonera' className='flex gap-8 justify-center'>
                <button
                    onClick={() => clickHandler('main')}
                    className={estilos}
                >Terminar</button>
                <span onClick={() => clickHandler('hola')} className={estilos} >tries</span>

            </div>

            <Intentos>
                {
                    intentos.map((element, index) => {
                        return <Intento key={index} element={element} />
                    })
                }
            </Intentos>

            <input type='number'  onKeyUp={inputHandler} onChange={validarInput} />
        </div>
    )
}
