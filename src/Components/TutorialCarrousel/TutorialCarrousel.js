import React, { useState } from 'react'


export const TutorialCarrousel = () => {
    // USESTATES
    const [tutPage, setTutPage] = useState(0)

    // FUNCIONES
    function moveCardsLeft(event) {
        if (tutPage !== 0) {
            setTutPage(tutPage - 1)
        }
    }
    function moveCardsRight(event) {
        if (tutPage !== last) {
            setTutPage(tutPage + 1)
        }
    }


    // Variables
    let last = 12


    return (
        <div className='grid grid-cols-10 justify-center items-center h-full relative' >
            {/* BOTON PARA MOVER A LA IZQ */}
            <button
                className='h-1/2 hover:scale-150 focus:scale-125 duration-300'
                onClick={moveCardsLeft}

            ><img
                    alt=''
                    src={`${(tutPage === 0) ? '' : 'https://cdn-icons-png.flaticon.com/512/271/271228.png'}`}
                    className='rotate-180 px-2'
                /></button>

            {/* APP para tutorial */}
            <div className=' col-span-8 mx-4 h-full flex flex-col justify-center gap-4'>

                {/* Div para paginación */}
                <div className='text-sm text-gray-400 hover:text-gray-800 duration-150 w-10 h-10 absolute bottom-0 left-1' >{(tutPage === 0 || tutPage === last) ? '' : tutPage}</div>
                <div className='text-sm text-gray-400 hover:text-gray-800 duration-150 w-10 h-10 absolute bottom-0 right-1' >{(tutPage === last) ? '' : last}</div>





                {/* pagina1 */}
                {(tutPage === 0) && (
                    <>
                        <p className='text-xl' >Voy a pensar un número...</p>
                        <img
                            alt=''
                            src='https://media.giphy.com/media/3o72F1FXi8MxXbyIjS/giphy.gif'
                        />
                        <p className='text-xl' >¡Y tú lo adivinarás!</p>
                    </>
                )}

                {/* pagina2 */}
                {(tutPage === 1) && (
                    <>
                        <p className='text-lg' >El número no será complicado:</p>
                        <img
                            alt=''
                            src='https://i.imgur.com/70hiKtR.png'
                            className='w-2/3 mx-auto'
                        />
                        <p className='text-xl' >4 dígitos y sin repetir.</p>
                    </>
                )}

                {/* pagina3 */}
                {(tutPage === 2) && (
                    <>
                        <p className='text-lg' >Pero, </p>
                        <img
                            alt=''
                            src='https://media.giphy.com/media/kPtv3UIPrv36cjxqLs/giphy.gif'
                            className='w-5/6 mx-auto'
                        />
                        <p className='text-xl' >¿cómo lo vas a adivinar?</p>
                    </>
                )}

                {/* pagina4 */}
                {(tutPage === 3) && (
                    <>
                        <p className='text-lg' >En cada ronda, envías tu intento.</p>
                        <img
                            alt=''
                            src='https://media.giphy.com/media/Y3MckoFQyMEcXrclSR/giphy.gif'
                            className='w-5/6 mx-auto'
                        />
                        <p className='text-xl' >Y te doy <span className='animate-colorChange' >pistas.</span></p>
                    </>
                )}

                {/* pagina5 */}
                {(tutPage === 4) && (
                    <>
                        <p className='text-lg' >Miremos un ejemplo.</p>
                        <p className='text-base' >Número secreto:</p>
                        <p className='text-lg font-bold hover:scale-125 duration-75 animate-wiggle' >9641</p>
                        <p className='text-base' >Tu primer intento:</p>
                        <p className='text-lg font-bold hover:scale-125 duration-75 animate-wiggle' >1234</p>


                    </>
                )}

                {/* pagina6 */}
                {(tutPage === 5) && (
                    <div className='flex flex-col justify-evenly h-full' >
                        <p className='text-xl' >¡Acertaste el 1 y el 4!</p>
                        <p className='text-base mt-1' >Sin embargo, en la posición incorrecta.</p>
                        <div>
                            <p className='text-base' >Número secreto:</p>
                            <p className='text-lg font-bold hover:scale-125 duration-75' >96<span className='animate-colorChange' >41</span></p>
                            <p className='text-base' >Tu primer intento:</p>
                            <p className='text-lg font-bold hover:scale-125 duration-75 ' ><span className='animate-colorChange' >1</span>23<span className='animate-colorChange' >4</span></p>
                        </div>

                    </div>
                )}

                {/* pagina7 */}
                {(tutPage === 6) && (
                    <div className='flex flex-col justify-center gap-6 h-full' >
                        <p className='text-base mt-1' >Cuando aciertas algún número, pero en la posición incorrecta.</p>
                        <p className='text-2xl mt-1' >Lo llamaremos una <span className='inline-block animate-wiggle' >pica.</span></p>


                    </div>
                )}

                {/* pagina8 */}
                {(tutPage === 7) && (
                    <>
                        <p className='text-lg' >Continuando el ejemplo.</p>
                        <p className='text-base' >Número secreto:</p>
                        <p className='text-lg font-bold hover:scale-125 duration-75 animate-wiggle' >9641</p>
                        <p className='text-base' >Tu segundo intento:</p>
                        <p className='text-lg font-bold hover:scale-125 duration-75 animate-wiggle' >5678</p>

                    </>
                )}

                {/* pagina9 */}
                {(tutPage === 8) && (
                    <div className='flex flex-col justify-evenly h-full' >
                        <p className='text-xl' >¡Acertaste el 6!</p>
                        <p className='text-base mt-1' >¡Y en la posición correcta!</p>
                        <div>
                            <p className='text-base' >Número secreto:</p>
                            <p className='text-lg font-bold hover:scale-125 duration-75' >9<span className='animate-colorChange' >6</span>41</p>
                            <p className='text-base' >Tu segundo intento:</p>
                            <p className='text-lg font-bold hover:scale-125 duration-75 ' >5<span className='animate-colorChange' >6</span>78</p>
                        </div>

                    </div>

                )}

                {/* pagina10 */}
                {(tutPage === 9) && (
                    <div className='flex flex-col justify-center gap-6 h-full' >
                        <p className='text-base mt-1' >Cuando aciertas algún número y en la posición correcta.</p>
                        <p className='text-2xl mt-1' >Lo llamaremos una <span className='inline-block animate-wiggle' >fija.</span></p>


                    </div>
                )}

                {/* pagina11 last added*/}
                {(tutPage === 10) && (
                    <div className='flex flex-col justify-center gap-6 h-full' >
                        <p className='text-base mt-1' >Aunque jugando, esta, sería tu vista.</p>
                        <div>
                            <div className='grid grid-cols-3  mx-auto bg-blue-300 my-1 text-lg'>
                                <p>Picas</p>
                                <p>Número</p>
                                <p>Fijas</p>
                            </div>
                            <div className='grid grid-cols-3'>
                                <p>2</p>
                                <p>1234</p>
                                <p>0</p>
                                <p>0</p>
                                <p>5678</p>
                                <p>1</p>
                            </div>
                            <input
                                type='number'
                                className='text-center py-1 my-3 w-2/5 focus:scale-105 ease-out duration-300'
                                onChange={(e) => { e.target.value = '' }}
                                placeholder=''
                            />
                        </div>
                    </div>
                )}

                {/* pagina12 */}
                {(tutPage === 11) && (
                    <div className='flex flex-col justify-evenly h-full' >
                        <p className='text-xl' >¡Consigue 4 fijas para ganar!</p>
                        <div>
                            <p className='text-base' >Número secreto:</p>
                            <p className='text-lg font-bold hover:scale-125 duration-75' ><span className='animate-colorChange' >9641</span></p>
                            <p className='text-base' >Intento #101:</p>
                            <p className='text-lg font-bold hover:scale-125 duration-75 ' ><span className='animate-colorChange' >9641</span></p>
                        </div>

                    </div>
                )}

                {/* pagina13 */}
                {(tutPage === 12) && (
                    <>
                        <p className='text-lg' >¡Manos a la obra!</p>
                        <img
                            alt=''
                            src='https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif'
                            className='w-3/6 mx-auto '
                        />
                        <p className='text-lg animate-bounce' >¿Lo lograrás en menos de 10 rondas?</p>
                    </>
                )}









            </div>

            {/* BOTON PARA MOVER A LA DERECHA */}
            <button
                className='h-1/2 hover:scale-150 focus:scale-125 duration-300'
                onClick={moveCardsRight}
            ><img
                    alt=''
                    src={`${(tutPage === last) ? '' : 'https://cdn-icons-png.flaticon.com/512/271/271228.png'}`}
                    className='px-2'
                /></button>
        </div>
    )
}
