import React, { useState } from 'react'
import { TutorialCarrousel } from '../../TutorialCarrousel/TutorialCarrousel'

export const ComoJugar = ({ setMainDisplay }) => {
    // USE STATES
    const [estadoBoton, setEstadoBoton] = useState('')


    // Funciones
    function clickHandler() {
        setMainDisplay('hist')
    }
    function primerosPasosHandler(event) {

        if (estadoBoton === '') {
            setEstadoBoton('animate-agrandar')
        }
        // if (estadoBoton === 'animate-agrandar') {
        //     setEstadoBoton('animate-disminuir')
        // }
        if (estadoBoton === 'animate-disminuir') {
            setEstadoBoton('animate-agrandar')
        }


    }

    return (


        <div className='w-4/5 mx-auto mb-10 flex flex-col overflow-auto no-scrollbar h-[450px]'>
            <button
                onClick={clickHandler}
                className='shadow-sm shadow-blue-700 py-4 mx-auto my-4 w-1/2 hover:bg-blue-700 hover:text-white hover:scale-105 ease-out duration-500 focus:bg-blue-700 focus:text-white focus:scale-105'

            >Regresar</button>

            <button
                onClick={primerosPasosHandler}
                className={`py-1 mx-5 my-2 ease-out duration-500 grid grid-cols-2 items-center gap-4 shadow-sm shadow-blue-700 hover:shadow-md   focus:shadow-md   ${estadoBoton} ${(estadoBoton === 'animate-agrandar') ? 'shadow-orange-500 shadow-sm hover:shadow-orange-500 focus:shadow-orange-500' : 'focus:scale-105  hover:scale-105 hover:shadow-orange-500 focus:shadow-orange-500 shadow-blue-700 '}`}
            >
                {/* Mostrar boton de tutorial */}
                {(estadoBoton === '' || estadoBoton === 'animate-disminuir') && (
                    <>
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
                    </>
                )}
                {/* Mostrar tutorial */}
                {(estadoBoton === 'animate-agrandar') && (
                    <div className='col-span-2 flex flex-col h-full'>
                        <button
                            onClick={() => setEstadoBoton('animate-disminuir')}
                            className='col-span-2 w-1/2 mx-auto my-1 hover:scale-125 duration-100 text-gray-400 hover:text-gray-800'
                        >

                            Cerrar</button>
                        <TutorialCarrousel />
                    </div>
                )
                }
            </button>

            {(estadoBoton === '' || estadoBoton === 'animate-disminuir') && (
                <>
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
                </>
            )}






        </div>
    )
}
