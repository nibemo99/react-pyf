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
        if (tutPage !== 7) {
            setTutPage(tutPage + 1)
        }
    }


    // Variables

    return (
        <div className='grid grid-cols-10 justify-center items-center h-full' >
            <button className='focus:scale-125 duration-300'><img
                alt=''
                src={`${(tutPage === 0) ? '' : 'https://cdn-icons-png.flaticon.com/512/271/271228.png'}`}
                onClick={moveCardsLeft}
                className='rotate-180 hover:scale-150 focus:scale-150 duration-300 px-2'
            /></button>
            <div className=' col-span-8 mx-4 h-full flex flex-col justify-center gap-4'>




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
                        <p className='text-xl' >¿Cómo lo vas a adivinar?</p>
                    </>
                )}

                {/* pagina4 */}
                {(tutPage === 3) && (
                    <>
                        <p className='text-lg' >En cada ronda envías tu intento </p>
                        <img
                            alt=''
                            src='https://media.giphy.com/media/Y3MckoFQyMEcXrclSR/giphy.gif'
                            className='w-5/6 mx-auto'
                        />
                        <p className='text-xl' >Y te doy <span className='animate-colorChange' >pistas</span></p>
                    </>
                )}







            </div>

            <button className='focus:scale-125 duration-300' ><img
                alt=''
                src='https://cdn-icons-png.flaticon.com/512/271/271228.png'
                onClick={moveCardsRight}
                className='hover:scale-150 focus:scale-150 duration-300 px-2'
            /></button>
        </div>
    )
}
