import React from 'react'

export const Intento = ({ element }) => {
    return (
        <div className='flex justify-center items-center gap-3 my-2'>
            <p>{element.picas}</p>
            <p>{element.numero}</p>
            <p>{element.fijas}</p>
        </div>
    )
}
