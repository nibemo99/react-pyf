import React from 'react'
import './Background.css'

export const Background = ({ children }) => {
  return (
    <div id='appBackground' className='overflow-auto no-scrollbar'>
      {children}
    </div>
  )
}
