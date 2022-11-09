import React, { useState } from 'react'
import CreateGame from './CreateGame'
import JoinGame from './JoinGame'

const MultiplayerScreen = ( { setMainDisplay } ) => {
    const [option, setOption] = useState( true )

    const changeHandler = ( event ) => {
        setOption( prev => !prev )
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

            <div className='flex w-full justify-evenly mt-5'>
                <p className='p-4 text-xl cursor-pointer' onClick={changeHandler}>Create</p>
                <p className='p-4 text-xl cursor-pointer' onClick={changeHandler}>Join</p>
            </div>

            {( option ) ? <CreateGame /> : <JoinGame />}

        </div>
    )
}

export default MultiplayerScreen