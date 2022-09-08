import React from 'react'
import './Wrapper.css'

const Wrapper = ({ children }) => {
    return (
        <section id='rooot' className='border border-black bg-slate-200'>
            {children}
        </section>
    )
}

export { Wrapper }