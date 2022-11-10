import React from 'react'
import { useState } from 'react'
import Intento from './Intento'
import socket from '../utils/socket'
import { useEffect } from 'react'
import { DotWave } from '@uiball/loaders'

const MultBoard = ( { data, setTitle } ) => {

    const [intentos, setIntentos] = useState( {
        host: [],
        guest: [],
        current: '',
        winner: ''
    } )

    useEffect( () => {
        socket.on( 'oponent-guess', ( res ) => {
            console.count( res )
            const { guess, rol } = res
            setIntentos( prev => ( { ...prev, [rol]: [...prev[rol], guess] } ) )
            if ( guess.fijas === 4 ) {
                setIntentos( prev => ( { ...prev, winner: data[rol].name } ) )
                let temp
                if ( data.status === 'host' ) {
                    temp = 'guest'
                } else {
                    temp = 'host'
                }
                let dataa = {
                    me: intentos[data.status],
                    oponent: intentos[temp],
                    meName: data[data.status].name,
                    oponentName: data[temp].name
                }
                addToLocalStorage( dataa, true )
                if ( rol === data.status ) {
                    setTitle( 'You won!' )
                } else {
                    setTitle( `${data[rol].name} won!` )
                }
            }
        } )
        return () => {
            socket.off( 'oponent-guess' )
        }
    }, [] )


    const checkSecret = ( e ) => {
        if ( intentos.winner ) return setIntentos( prev => ( { ...prev, current: '' } ) )
        let value = e.target.value
        let temp = Array.from( value )
        if ( isNaN( value ) ) {
            value = ''
        }
        if ( temp.length === 5 ) {
            temp.pop()
            value = temp.toString().replaceAll( ',', '' )
        }
        if ( temp.length === 2 ) {
            if ( temp[1] === temp[0] ) {
                temp.pop()
                value = temp.toString().replaceAll( ',', '' )
            }
        }
        if ( temp.length === 3 ) {
            if ( temp[2] === temp[1] || temp[2] === temp[0] ) {
                temp.pop()
                value = temp.toString().replaceAll( ',', '' )
            }
        }
        if ( temp.length === 4 ) {
            if ( temp[3] === temp[2] || temp[3] === temp[1] || temp[3] === temp[0] ) {
                temp.pop()
                value = temp.toString().replaceAll( ',', '' )
            }
        }
        setIntentos( prev => ( { ...prev, current: value } ) )
    }

    const submitHandler = ( e ) => {
        if ( intentos.winner ) return
        let ENTER_KEY = 13
        let inputValue = intentos.current
        if ( e.keyCode === ENTER_KEY || e.type === 'click' ) {
            // si la longitud es distinta de 4
            if ( inputValue.length !== 4 ) return
            getResult( inputValue, data.status )
        }
    }

    const getResult = ( e, who ) => {
        // console.log(e, typeof (e));
        let randomNumber = 0
        if ( who === 'host' ) {
            randomNumber = data['guest'].secret
        } else {
            randomNumber = data['host'].secret
        }
        let picas = 0
        let fijas = 0
        for ( let i = 0; i < 4; i++ ) {
            if ( e[i] === randomNumber[i] ) {
                fijas++;
            }
        }
        for ( let i = 0; i < randomNumber.length; i++ ) {
            for ( let j = 0; j < e.length; j++ ) {
                if ( i !== j ) {
                    if ( randomNumber[i] === e[j] ) {
                        picas++
                    }
                }
            }
        }
        let guess = { numero: e, picas, fijas }
        socket.emit( 'send-guess', { guess, userId: data[data.status].userId } )
        setIntentos( prev => ( { ...prev, current: '' } ) )
    }

    const addToLocalStorage = ( dataa, status ) => {
        let date = new Date()
        date.toDateString()
        if ( localStorage.historial === undefined ) localStorage.historial = JSON.stringify( [] )
        let temp = JSON.parse( localStorage.historial )
        temp.push( {
            date: `${date}`,
            data: dataa,
            completed: status,
        } )
        localStorage.historial = JSON.stringify( temp )
    }

    return (
        <div className='border-2 w-full px-3 pb-8 grid grid-cols-2 gap-2'>
            <div>
                <p className={` ${( data.host.name === intentos.winner ) ? 'text-2xl font-bold animate-wiggle animate-colorChange' : 'text-2xl'}`}>{data.host.name}</p>
                <div className='grid grid-cols-3 mx-auto bg-blue-300 my-1 text-lg'>
                    <p>Picas</p>
                    <p>Number</p>
                    <p>Fijas</p>
                </div>
                {intentos.host.map( ( element, index ) => {
                    return <Intento key={index} element={element} multi={true} />
                } )}
                {( data.status === 'host' && !intentos.winner ) ? (
                    <>
                        <div className='flex flex-col items-center justify-center' >
                            <input
                                id='input'
                                value={intentos.current}
                                onKeyUp={submitHandler}
                                onChange={checkSecret}
                                className='text-center py-1 my-3 w-2/5 focus:scale-105 ease-out duration-300'
                            />
                            <button
                                className='pl-3 '
                                onClick={submitHandler}
                            >
                                Send
                                <img
                                    alt=''
                                    src='https://cdn-icons-png.flaticon.com/512/271/271228.png'
                                    className=' inline h-4 ml-1 mb-[2px] rounded-full object-cover'
                                />
                            </button>
                        </div>
                    </>
                ) : null}
                {data.status === 'host' && !intentos.winner ? (
                    <>
                        <div className='flex flex-col items-center justify-center pt-4' >
                            <DotWave size={47} speed={2} />
                        </div>
                    </>
                ) : null}
            </div>
            <div>
                <p className={`${( data.guest.name === intentos.winner ) ? 'text-2xl font-bold animate-wiggle animate-colorChange' : 'text-2xl'}`} >{data.guest.name}</p>
                <div className='grid grid-cols-3 mx-auto bg-blue-300 my-1 text-lg'>
                    <p>Picas</p>
                    <p>Number</p>
                    <p>Fijas</p>
                </div>
                {intentos.guest.map( ( element, index ) => {
                    return <Intento key={index} element={element} multi={true} />
                } )}
                {( data.status === 'guest' && !intentos.winner ) ? (
                    <>
                        <div className='flex flex-col items-center justify-center'>
                            <input
                                id='input'
                                value={intentos.current}
                                onKeyUp={submitHandler}
                                onChange={checkSecret}
                                className='text-center py-1 my-3 w-2/5 focus:scale-105 ease-out duration-300'
                            />
                            <button
                                className='pl-3 '
                                onClick={submitHandler}
                            >
                                Send
                                <img
                                    alt=''
                                    src='https://cdn-icons-png.flaticon.com/512/271/271228.png'
                                    className=' inline h-4 ml-1 mb-[2px] rounded-full object-cover'
                                />
                            </button>
                        </div>
                    </>
                ) : null}
                {data.status === 'guest' && !intentos.winner ? (
                    <>
                        <div className='flex flex-col items-center justify-center pt-4' >
                            <DotWave size={47} speed={2} />
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default MultBoard