import React from 'react'

export const ComoJugar = ({ setMainDisplay }) => {

    // funciones
    function clickHandler() {
        setMainDisplay('hist')
    }

    return (


        <div className='w-4/5 mx-auto mb-10 flex flex-col overflow-auto no-scrollbar h-[450px]'>
            <button
                onClick={clickHandler}
                className='shadow-sm shadow-blue-700 py-4 mx-auto my-4 w-1/2 hover:bg-blue-700 hover:text-white hover:scale-105 ease-out duration-500 focus:bg-blue-700 focus:text-white focus:scale-105'

            >Regresar</button>

            <button
                className=' py-1 mx-5 my-2 hover:scale-105 ease-out duration-500 grid grid-cols-2 items-center gap-4 shadow-sm shadow-blue-700 hover:shadow-md  hover:shadow-orange-500 focus:shadow-orange-500 focus:shadow-md focus:scale-105 '
            >
                <p className='text-xl pl-4'>Primeros pasos</p>
                <div className='flex justify-around items-center'>
                    <p
                        className='text-sm text-gray-500  hover:text-orange-700 duration-[4000ms]'
                    >Est: <span>3mins</span></p>
                    <img
                        alt='GO!'
                        src='https://cdn-icons-png.flaticon.com/512/271/271228.png'
                        className='w-6 py-3 hover:animate-bounceToRight'
                    />
                </div>
            </button>
            <button
                className=' py-1 mx-5 my-2 hover:scale-105 ease-out duration-500 grid grid-cols-2 items-center gap-4 shadow-sm shadow-blue-700 hover:shadow-md  hover:shadow-orange-500 focus:shadow-orange-500 focus:shadow-md focus:scale-105'
            >
                <p className='text-xl pl-4'>Next</p>
                <div className='flex justify-around items-center'>
                    <p
                        className='text-sm text-gray-500  hover:text-orange-700 duration-[4000ms]'
                    >Est: <span>5mins</span></p>
                    <img
                        alt='GO!'
                        src='https://cdn-icons-png.flaticon.com/512/271/271228.png'
                        className='w-6 py-3 hover:animate-bounceToRight'
                    />
                </div>
            </button>






        </div>
    )
}
