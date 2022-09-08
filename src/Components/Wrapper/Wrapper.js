import React from 'react'
import './Wrapper.css'

const Wrapper = ({ children }) => {
    return (
        <section id='rooot'>
            {children}
        </section>
    )
}

export { Wrapper }