import React from 'react'

const Intento = ( { element, multi } ) => {
    return (
        <div className={`grid grid-cols-3 justify-center items-center mx-auto my-2 ${( multi ) ? '' : 'w-3/5'}`}>
            <p>{element.picas}</p>
            <p>{element.numero}</p>
            <p>{element.fijas}</p>
        </div>
    )
}

export default Intento