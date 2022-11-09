import React, { useState } from 'react'
// import { io } from "socket.io";

const JoinGame = () => {
    const [form, setForm] = useState( {
        room: '',
        name: '',
        secret: ''
    } )

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

    }

    return (
        <>
            <input
                type='text'
                className='border-2 border-x-0 border-t-0 border-emerald-300 bg-transparent text-center m-10 w-1/2 text-2xl'
                placeholder='Room ID'
                name='room'
                value={form.room}
                onChange={handleChange}
            />
            <input
                type='text'
                className='border-2 border-x-0 border-t-0 border-emerald-300 bg-transparent text-center m-10 w-1/2 text-2xl'
                placeholder='Your name'
                name='name'
                value={form.name}
                onChange={handleChange}
            />
            <input
                type='text'
                className='border-2 border-x-0 border-t-0 border-emerald-300 bg-transparent text-center m-10 w-1/2 text-2xl'
                placeholder='Your secret number'
                name='secret'
                value={form.secret}
                onChange={handleChange}
            />
            <button
                className='text-3xl rounded-xl shadow-md shadow-emerald-700 px-5 py-2 my-4 w-1/2 hover:bg-rose-700 hover:text-white hover:scale-105 ease-out duration-500 focus:bg-rose-700 focus:text-white focus:scale-105'
                onClick={handleSubmit}
            >
                Join
            </button>
        </>
    )
}

export default JoinGame