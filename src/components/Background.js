import React from 'react'
import '../styles/Background.css'

const Background = ( { children } ) => {
  return (
    <div id='appBackground' className='overflow-auto no-scrollbar'>
      {children}
    </div>
  )
}
export default Background