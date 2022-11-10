import React from 'react'
import { useState } from 'react'
import Intento from './Intento'
import socket from '../utils/socket'
import { useEffect } from 'react'

const MultBoard = ( { data, setTitle } ) => {

    const [intentos, setIntentos] = useState( {
        host: [],
        guest: [],
        current: ''
    } )

    useEffect( () => {
        socket.on( 'oponent-guess', ( data ) => {
            console.count( data )
            const { guess, rol } = data
            setIntentos( prev => ( { ...prev, [rol]: [...prev[rol], guess] } ) )
        } )
        return () => {
            socket.off( 'oponent-guess' )
        }
    }, [] )


    const checkSecret = ( e ) => {
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
        let randomNumber = data[who].secret
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
        // setIntentos( prev => ( { ...prev, [who]: [...prev[who], guess], current: '' } ) )
        if ( fijas === 4 ) {
            let dataa = {
                host: intentos.host,
                guest: intentos.guest,
                hostName: data.host.name,
                guestName: data.guest.name
            }
            addToLocalStorage( dataa, true )
            if ( data.status === who ) {
                setTitle( `Congratulations!` )
            } else {
                setTitle( `Maybe next time!` )
            }
        }
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
        <div className='border-2 border-lime-400 w-full px-3 grid grid-cols-2 gap-2'>
            <div>
                <p>Host: {data.host.name}</p>
                <div className='grid grid-cols-3 mx-auto bg-blue-300 my-1 text-lg'>
                    <p>Picas</p>
                    <p>Number</p>
                    <p>Fijas</p>
                </div>
                {intentos.host.map( ( element, index ) => {
                    return <Intento key={index} element={element} />
                } )}
                {data.status === 'host' ? (
                    <>
                        <div
                            className='flex flex-col items-center justify-center'
                        >
                            <input
                                id='input'
                                value={intentos.current}
                                onKeyUp={submitHandler}
                                onChange={checkSecret}
                                className='text-center py-1 my-3 w-2/5 focus:scale-105 ease-out duration-300'
                            // placeholder={finished[1]}
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

            </div>
            <div>
                <p>Guest: {data.guest.name}</p>
                <div className='grid grid-cols-3 mx-auto bg-blue-300 my-1 text-lg'>
                    <p>Picas</p>
                    <p>Number</p>
                    <p>Fijas</p>
                </div>
                {intentos.guest.map( ( element, index ) => {
                    return <Intento key={index} element={element} />
                } )}
                {data.status === 'guest' ? (
                    <>
                        <div
                            className='flex flex-col items-center justify-center'
                        >
                            <input
                                id='input'
                                value={intentos.current}
                                onKeyUp={submitHandler}
                                onChange={checkSecret}
                                className='text-center py-1 my-3 w-2/5 focus:scale-105 ease-out duration-300'
                            // placeholder={finished[1]}
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
            </div>
        </div>
    )
}

export default MultBoard