import React, { useState } from 'react'
import CreateGame from './CreateGame'
import MultBoard from './MultBoard'
import socket from '../utils/socket'
import { useEffect } from 'react'

const MultiplayerScreen = ( { setMainDisplay, setTitle } ) => {
    const [data, setData] = useState( {
        option: 1,
        host: {},
        guest: {},
        status: 'host'
    } )

    useEffect( () => {
        socket.on( 'user-disconected', () => {
            setData( prev => ( { ...prev, status: 'reset' } ) )
        } )

        socket.on( 'testtt', ( data ) => {
            console.log( data )
        } )


        return () => {
            socket.off( 'user-disconected' )
            socket.off( 'testtt' )
        }
    }, [] )




    const changeHandler = ( event ) => {
        const value = event.target.innerText
        if ( value === 'Create' ) setData( prev => ( { ...prev, option: 1, status: 'host' } ) )
        if ( value === 'Join' ) setData( prev => ( { ...prev, option: 2, status: 'guest' } ) )
        console.log( data.option )
    }

    const handleBack = () => {
        setMainDisplay( 'menu' )
        // socket.emit( 'test', '' )
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <button
                onClick={handleBack}
                className='rounded-xl shadow-sm shadow-blue-700 py-4 mx-auto my-4 w-1/2 hover:bg-blue-700 hover:text-white hover:scale-105 ease-out duration-500 focus:bg-blue-700 focus:text-white focus:scale-105'
            >Back</button>

            {( data.option < 3 ) ? (
                <>
                    <div className='flex w-full justify-evenly mt-5'>
                        <button className='p-4 text-xl cursor-pointer' onClick={changeHandler}>Create</button>
                        <button className='p-4 text-xl cursor-pointer' onClick={changeHandler}>Join</button>
                    </div>
                    <CreateGame option={data.option} setOption={setData} />
                </>
            ) : (
                <>
                    <MultBoard
                        data={data}
                        setTitle={setTitle}
                    />
                </>
            )}
            {data.status === 'reset' && ( 'se ha desconectado usuario' )}

        </div>
    )
}

export default MultiplayerScreen