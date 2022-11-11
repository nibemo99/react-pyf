import React, { useState } from 'react'
import { NewtonsCradle, Orbit } from '@uiball/loaders'
import socket from '../utils/socket'
import { useEffect } from 'react'
import { success, whosh } from '../utils/audios'

const CreateGame = ( { option, setOption } ) => {
    const [form, setForm] = useState( {
        room: '',
        name: '',
        secret: '',
        state: '',
        roomCreated: ''
    } )

    useEffect( () => {
        socket.on( 'game-not-found', () => {
            setForm( prev => ( { ...prev, state: 'game-not-found' } ) )
            setTimeout( () => {
                setForm( prev => ( { ...prev, state: '' } ) )
            }, 2000 );
        } )

        socket.on( 'second-player-joined', ( data ) => {
            setForm( prev => ( { ...prev, state: 'second-player-joined', roomCreated: data.host.gameId } ) )
            // console.log( data )
            // console.log( option )
            success.play()
            setTimeout( () => {
                setForm( prev => ( { ...prev, state: 'second-player-joined-3' } ) )
            }, 2000 );
            setTimeout( () => {
                setForm( prev => ( { ...prev, state: 'second-player-joined-2' } ) )
            }, 3000 );
            setTimeout( () => {
                setForm( prev => ( { ...prev, state: 'second-player-joined-1' } ) )
            }, 4000 );
            setTimeout( () => {
                whosh.play()
                if ( option === 1 ) {
                    setOption( prev => ( { ...prev, option: 3, host: data.host, guest: data.guest } ) )
                } else if ( option === 2 ) {
                    setOption( prev => ( { ...prev, option: 3, host: data.host, guest: data.guest } ) )
                } else {
                    setOption( prev => ( { ...prev, option: 3, host: data.host, guest: data.guest } ) )
                }
            }, 5000 );
        } )

        socket.on( 'waiting', ( data ) => {
            setForm( prev => ( { ...prev, state: 'waiting', roomCreated: data.gameId } ) )
        } )


        return () => {
            socket.off( 'game-not-found' )
            socket.off( 'second-player-joined' )
            socket.off( 'waiting' )
        }
    }, [] )




    let ready = Boolean( ( option === 1 ) ? ( form.name.length && form.secret.length === 4 ) : ( option === 2 ) ? ( form.room.length && form.name.length && form.secret.length === 4 ) : '' )


    const checkSecret = ( e, name ) => {
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
        setForm( prev => ( { ...prev, [name]: value } ) )
    }
    const checkName = ( e, name ) => {
        let value = e.target.value
        if ( value.includes( '<' ) ||
            value.includes( '>' ) ||
            value.includes( '`' ) ||
            value.includes( '^' ) ||
            value.includes( '&' ) ||
            value.includes( '@' )
        ) value = ''
        setForm( prev => ( { ...prev, [name]: value } ) )
    }
    const checkRoom = ( e, name ) => {
        let value = e.target.value
        if ( value.includes( '<' ) ||
            value.includes( '>' ) ||
            value.includes( '`' ) ||
            value.includes( '^' ) ||
            value.includes( '&' ) ||
            value.includes( '@' )
        ) value = ''
        setForm( prev => ( { ...prev, [name]: value } ) )
    }
    const handleChange = ( e ) => {
        const name = e.target.name
        if ( name === 'name' ) checkName( e, name )
        if ( name === 'secret' ) checkSecret( e, name )
        if ( name === 'room' ) checkRoom( e, name )
    }
    const handleSubmit = ( event ) => {
        if ( !ready ) return
        if ( option === 1 ) {
            socket.emit( 'createMatch', form )
        } else {
            socket.emit( 'joinMatch', form )
        }
    }

    return (
        <>
            {( option === 2 ) ? (
                <input
                    type='text'
                    className='border-2 border-x-0 border-t-0 border-rose-300 bg-transparent text-center m-4 w-1/2 text-2xl'
                    placeholder='Game ID'
                    name='room'
                    value={form.room}
                    onChange={handleChange}
                />
            ) : null}
            <input
                type='text'
                className='border-2 border-x-0 border-t-0 border-rose-300 bg-transparent text-center m-4 w-1/2 text-2xl'
                placeholder='Name'
                name='name'
                value={form.name}
                onChange={handleChange}
            />
            <input
                type='text'
                className='border-2 border-x-0 border-t-0 border-rose-300 bg-transparent text-center m-4 w-1/2 text-2xl'
                placeholder='Secret number'
                name='secret'
                value={form.secret}
                onChange={handleChange}
            />
            <button
                className={`text-2xl rounded-xl px-2 py-2 my-3 w-1/2 hover:scale-105 ease-out duration-500  focus:scale-105 ${( ready ) ? 'shadow-md shadow-rose-700 hover:bg-rose-700 focus:bg-rose-700 hover:text-white focus:text-white text-black' : 'shadow-sm shadow-gray-700 text-gray-400'}`}
                onClick={handleSubmit}
            >
                {( !form.state && option === 1 ) ? 'Create game' : ''}
                {( !form.state && option === 2 ) ? 'Join game' : ''}
                {( form.state === 'waiting' ) ? 'Created!' : ''}
                {( form.state === 'second-player-joined' ) ? ( 'Loading' ) : ''}
                {( form.state === 'second-player-joined-3' ) ? ( '3' ) : ''}
                {( form.state === 'second-player-joined-2' ) ? ( '2' ) : ''}
                {( form.state === 'second-player-joined-1' ) ? ( '1' ) : ''}
                {( form.state === 'game-not-found' ) ? 'Game does not exist' : ''}
            </button>
            {( form.state === 'waiting' ) ? (
                <>
                    <p className='text-lg'>Game ID: <strong>{form.roomCreated}</strong></p>
                    <p className='text-lg'>Waiting oponent</p>
                    <NewtonsCradle
                        size={40}
                        speed={2}
                        color="black"
                    />
                </>
            ) : ''}
            {( form.state.includes( 'second-player-joined' ) ) ? (
                <>
                    <Orbit />
                    {/* <p className='text-lg'>Room ID: <strong>{form.roomCreated}</strong></p>
                    <p className='text-lg'>Ready to play ✅</p> */}
                </>
            ) : ''}

        </>
    )
}

export default CreateGame