import React, { useState } from 'react'
import { NewtonsCradle } from '@uiball/loaders'

const CreateGame = ( { socket, option, setOption } ) => {
    const [form, setForm] = useState( {
        room: '',
        name: '',
        secret: '',
        state: '',
        roomCreated: ''
    } )


    socket.on( 'game-not-found', () => {
        setForm( prev => ( { ...prev, state: 'game-not-found' } ) )
        setTimeout( () => {
            setForm( prev => ( { ...prev, state: '' } ) )
        }, 2000 );
    } )

    socket.on( 'second-player-joined', ( data ) => {
        setForm( prev => ( { ...prev, state: 'second-player-joined', roomCreated: data } ) )
        setTimeout( () => {
            setOption( prev => ( { ...prev, option: 3 } ) )
        }, 3000 );
    } )

    socket.on( 'waiting', ( data ) => {
        setForm( prev => ( { ...prev, state: 'waiting', roomCreated: data } ) )
    } )


    let ready = Boolean( form.name.length && form.room.length && form.secret.length === 4 )

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
                    placeholder='Room ID'
                    name='room'
                    value={form.room}
                    onChange={handleChange}
                />
            ) : null}
            <input
                type='text'
                className='border-2 border-x-0 border-t-0 border-rose-300 bg-transparent text-center m-4 w-1/2 text-2xl'
                placeholder='Your name'
                name='name'
                value={form.name}
                onChange={handleChange}
            />
            <input
                type='text'
                className='border-2 border-x-0 border-t-0 border-rose-300 bg-transparent text-center m-4 w-1/2 text-2xl'
                placeholder='Your secret number'
                name='secret'
                value={form.secret}
                onChange={handleChange}
            />
            <button
                className={`text-2xl rounded-xl px-2 py-2 my-3 w-1/2 hover:scale-105 ease-out duration-500  focus:scale-105 ${( ready ) ? 'shadow-md shadow-rose-700 hover:bg-rose-700 focus:bg-rose-700 hover:text-white focus:text-white' : 'shadow-sm shadow-gray-700'}`}
                onClick={handleSubmit}
            >
                {( !form.state && option === 1 ) ? 'Create' : ''}
                {( !form.state && option === 2 ) ? 'Join' : ''}
                {( form.state === 'waiting' ) ? 'Created!' : ''}
                {( form.state === 'second-player-joined' ) ? 'Loading' : ''}
                {( form.state === 'game-not-found' ) ? 'Game does not exist' : ''}
            </button>
            {( form.state === 'waiting' ) ? (
                <>
                    <p className='text-lg'>Room ID: <strong>{form.roomCreated}</strong></p>
                    <p className='text-lg'>Waiting oponent</p>
                    <NewtonsCradle
                        size={40}
                        speed={2}
                        color="black"
                    />
                </>
            ) : ''}
            {( form.state === 'second-player-joined' ) ? (
                <>
                    <p className='text-lg'>Room ID: <strong>{form.roomCreated}</strong></p>
                    <p className='text-lg'>Ready to play ✅</p>
                </>
            ) : ''}

        </>
    )
}

export default CreateGame