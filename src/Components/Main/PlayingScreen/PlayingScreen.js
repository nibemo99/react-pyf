// INICIO
import React, { useState } from 'react'
import { PlayingHelper } from '../../PlayingHelper/PlayingHelper'
import './../Main.css'
import { Intento } from './Intento'
import { Intentos } from './Intentos'



export const PlayingScreen = ( { setMainDisplay, randomNumber, calcRandonNumber, setRandomNumber, addToLocalStorage, title, setTitle } ) => {
    // estados
    const [intentos, setIntentos] = useState( [] )
    const [finished, setFinished] = useState( [0, 'Intenta 1234'] )

    // funciones
    function clickHandler ( e ) {
        if ( e === 'menu' ) {
            setTitle( 'Picas & Fijas' )
            setMainDisplay( e )
            setTimeout( () => {
                // console.log('epa');
                setTitle( 'Picas & Fijas' )
            }, 1500 );
        }
        if ( e === 'reseteo' ) {
            setRandomNumber( calcRandonNumber() )
            setTitle( 'Reiniciado ✔️' )
            setFinished( [0, 'Intenta 1234'] )
            setIntentos( [] )

            // console.log(randomNumber);
            setTimeout( () => {
                setTitle( 'A jugar! ⌛' )
            }, 2000 );

        }
    }
    function inputHandler ( e ) {


        let ENTER_KEY = 13
        let inputValue = document.querySelector( '#input' ).value
        // si se presional enter
        if ( e.keyCode === ENTER_KEY || e.type === 'click' ) {


            // si la longitud es distinta de 4
            if ( inputValue.length !== 4 ) return avisoRevisarInput( 'lenght' )

            if ( !inputValue ) {
                inputValue = ''
                return avisoRevisarInput( 'undefined' )
            }

            ( !!!intentos[intentos.length - 1] )
                ? validarResultado( inputValue )
                : ( intentos[intentos.length - 1].numero === inputValue )
                    ? avisoRevisarInput( 'same' )
                    : validarResultado( inputValue )
        }
    }
    function bringDate () {
        let x = new Date()
        return x.toDateString()
    }
    function validarInput ( e ) {
        let input = e.target.value
        let temp = Array.from( input )



        // si se detecta un menos, se ataca de una
        if ( input[0] === '-' ) {
            temp.shift()
            e.target.value = temp.toString().replaceAll( ',', '' )
        }
        if ( temp.length === 5 ) {
            temp.pop()
            e.target.value = temp.toString().replaceAll( ',', '' )
        }
        if ( temp.length === 2 ) {
            if ( temp[1] === temp[0] ) {
                temp.pop()
                e.target.value = temp.toString().replaceAll( ',', '' )
            }
        }
        if ( temp.length === 3 ) {
            if ( temp[2] === temp[1] || temp[2] === temp[0] ) {
                temp.pop()
                e.target.value = temp.toString().replaceAll( ',', '' )
            }
        }
        if ( temp.length === 4 ) {
            if ( temp[3] === temp[2] || temp[3] === temp[1] || temp[3] === temp[0] ) {
                temp.pop()
                e.target.value = temp.toString().replaceAll( ',', '' )
            }
        }
    }
    function avisoRevisarInput ( e ) {
        // console.log(`revisa: ${e}`);
    }
    function validarResultado ( e ) {
        // console.log(e, typeof (e));
        let picas = 0
        let fijas = 0
        let pista = `Descarta ${e}`
        for ( let i = 0; i < 4; i++ ) {
            if ( e[i] === randomNumber[i] ) {
                fijas++;
                pista = `${e[i]} es fija`
            }
        }

        // console.log(pista);

        // console.log(e, randomNumber);
        for ( let i = 0; i < randomNumber.length; i++ ) {
            for ( let j = 0; j < e.length; j++ ) {
                if ( i !== j ) {
                    if ( randomNumber[i] === e[j] ) {
                        picas++
                        pista = `${e[j]} es pica`
                        // console.log(i, ' es igual a ', j);
                    }
                }
            }
        }
        // console.log(pista);

        if ( intentos.length === 0 ) {
            setFinished( [0, 'Intenta 5678', pista] )
        }
        if ( intentos.length >= 1 ) {
            setFinished( [0, '', pista] )
        }



        let temp = { numero: e, picas: `${picas}`, fijas: `${fijas}` }
        setIntentos( [...intentos, temp] )
        document.querySelector( '#input' ).value = ''

        if ( fijas === 4 ) {
            let date = bringDate()
            addToLocalStorage( [...intentos, temp,], date, true )
            setTitle( 'Felicidades!' )
            setFinished( [1, 'true'] )
            setTimeout( () => {
                setTitle( 'Picas & Fijas' )
            }, 3000 );
            // reemplazar el input por un boton de intentar de nuevo
            // cambiar el titulo del juego por 'Felicidades!'
            // Que salgan fuegos artificiales.
        }


    }



    // EN CADA RENDER
    if ( title !== 'A jugar! ⌛' ) {
        setTitle( 'A jugar! ⌛' )

    }

    return (
        <div className='w-4/5 mx-auto py-4 mb-8'>
            <div id='botonera' className='flex gap-3 justify-center mb-4'>
                <button
                    onClick={() => clickHandler( 'reseteo' )}
                    className={` shadow-blue-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105 ${( finished[0] ) ? 'animate-wiggle shadow-lg' : 'shadow-sm'} `}
                >Reiniciar</button>
                <button
                    onClick={() => clickHandler( 'menu' )}
                    className='shadow-sm shadow-blue-700 w-1/4 mx-2 hover:scale-105 ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md focus:scale-105'
                >Regresar</button>
                <PlayingHelper
                    finished={finished}
                    setFinished={setFinished}
                    setTitle={setTitle}
                    setMainDisplay={setMainDisplay}
                    intentos={intentos}
                />

            </div>
            <div className='grid grid-cols-3 w-3/5 mx-auto bg-blue-300 my-1 text-lg'>
                <p>Picas</p>
                <p>Número</p>
                <p>Fijas</p>
            </div>

            <Intentos>
                <div className=' '>
                    {
                        intentos.map( ( element, index ) => {
                            return <Intento key={index} element={element} />
                        } )
                    }

                </div>
            </Intentos>
            {( !finished[0] ) ? (
                <div
                    className='flex flex-col items-center justify-center'
                >
                    <input
                        id='input'
                        type='number'
                        onKeyUp={inputHandler}
                        onChange={validarInput}
                        className='text-center py-1 my-3 w-2/5 focus:scale-105 ease-out duration-300'
                        placeholder={finished[1]}
                    />
                    <button
                        className='pl-3 '
                        onClick={inputHandler}

                    >Enviar<img alt=''
                        src='https://cdn-icons-png.flaticon.com/512/271/271228.png'
                        className=' inline h-4 ml-1 mb-[2px] rounded-full object-cover'
                        /></button>
                </div>
            ) : ''}
            {( finished[0] ) ? (
                <>
                    <p className='text-2xl py-4'>¡Excelente investigación!</p>
                    <p className='text-xl'>Tu número es:
                        <span className='pl-2 animate-colorChange'>
                            {randomNumber}
                        </span>
                    </p>
                    <img
                        alt='you made it :)'
                        src='https://c.tenor.com/iWw4l4A9TZsAAAAC/the-hangover-zach-galifianakis.gif'
                        className='mx-auto mt-5'
                    />
                </>
            ) : ''}



        </div>
    )
}
