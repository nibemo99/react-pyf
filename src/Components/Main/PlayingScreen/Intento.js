import React from 'react'

export const Intento = ({ element }) => {
    return (
        <div className='grid grid-cols-3 justify-center items-center w-3/5 mx-auto my-2'>
            <p>{element.picas}</p>
            <p>{element.numero}</p>
            <p>{element.fijas}</p>
        </div>
    )
}
