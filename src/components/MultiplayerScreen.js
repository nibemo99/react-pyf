import React, { useState } from 'react'
import { io } from "socket.io-client";
import CreateGame from './CreateGame'
import MultBoard from './MultBoard'

const MultiplayerScreen = ( { setMainDisplay } ) => {
    const socket = io( "http://localhost:3001" );
    const [data, setData] = useState( {
        option: 1,

    } )

    const changeHandler = ( event ) => {
        const value = event.target.innerText
        console.log( value )
        if ( value === 'Create' ) setData( prev => ( { ...prev, option: 1 } ) )
        if ( value === 'Join' ) setData( prev => ( { ...prev, option: 2 } ) )
    }

    const handleBack = () => {
        setMainDisplay( 'menu' )
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
                    <CreateGame socket={socket} option={data.option} setOption={setData} />
                </>
            ) : (
                <>
                    <MultBoard socket={socket} data={data} />
                </>
            )}

        </div>
    )
}

export default MultiplayerScreen