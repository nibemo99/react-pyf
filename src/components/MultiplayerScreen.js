import React, { useState } from 'react'
import CreateGame from './CreateGame'
import MultBoard from './MultBoard'
import socket from '../utils/socket'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const MultiplayerScreen = ( { setMainDisplay, setTitle } ) => {

    const { t } = useTranslation();

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
            >{t( `Back` )}</button>

            {( data.option < 3 ) ? (
                <>
                    <div className='relative flex w-full justify-evenly mt-5'>
                        {/* <div className={` absolute transition-all duration-500 bottom-2 rounded-xl left-[7.9rem] w-16 h-1 bg-rose-700  ${( data.option === 2 ) ? 'left-[20.2rem] w-12' : ''}`} /> */}
                        <button className={`px-4 my-4 text-xl cursor-pointer relative transition-all duration-500 before:absolute before:-bottom-1 before:right-0 before:left-0 before:bg-red-500 before:rounded-xl before:transition-all before:duration-300 ${( data.option === 1 ) ? 'before:h-[4px]' : 'before:h-[0px] text-gray-500'}`} onClick={changeHandler}>{t( `Create` )}</button>
                        <button className={`px-4 my-4 text-xl cursor-pointer relative transition-all duration-500 before:absolute before:-bottom-1 before:right-0 before:left-0 before:bg-red-500 before:rounded-xl before:transition-all before:duration-300 ${( data.option === 2 ) ? 'before:h-[4px]' : 'before:h-[0px] text-gray-500'}`} onClick={changeHandler}>{t( `Join` )}</button>
                    </div>
                    <CreateGame key={data.option} option={data.option} setOption={setData} />
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