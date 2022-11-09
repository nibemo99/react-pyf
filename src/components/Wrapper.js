import React from 'react'
import '../styles/Wrapper.css'

const Wrapper = ( { children } ) => {
    return (
        <section id='rooot' className='relative border border-black bg-slate-200 flex  flex-col'>
            {children}
        </section>
    )
}


export default Wrapper