import React, { useState } from 'react'

export const PlayingHelper = ({ intentos, setMainDisplay, setTitle, setFinished }) => {
    // USESTATES
    const [flag, setFlag] = useState(0)


    // Con cada render
    if (intentos.length === 1 && !flag) {
        setTimeout(() => {
            setFlag(!flag)
            console.log('pase aqui');
        }, 6000);
    }

    return (
        <>
            {/* Todo el recuadro de Ronda */}
            <span className='relative shadow-sm shadow-blue-700 w-1/4 mx-2  ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md ' >

                {(intentos.length === 0) && (
                    <button
                        className='w-full h-full animate-wiggle'
                        onClick={() => { setMainDisplay('howto'); setTitle('Guías') }}
                    >
                        Tutorial
                    </button>
                )}

                {(intentos.length === 1) && (
                    <>
                        {(flag) ? (
                            <div
                                className='animate-bounceDelayed absolute top-[-30px] left-[-20px] w-36 text-center text-sm'
                            >
                                Presiona para pista
                            </div>
                        )
                            : ('')
                        }

                        <button
                            onClick={() => { setFinished('esta es pica') }}
                        >
                            Ronda: {intentos.length}
                        </button>
                    </>
                )}

                {(intentos.length === 2) && (
                    <>
                        {(flag) && (
                            <div
                                className='animate-wiggle absolute top-[-30px] left-[-20px] w-36 text-center text-sm'
                            >
                                Presiona para pista
                            </div>
                        )}

                        <div>
                            Ronda: {intentos.length}
                        </div>
                    </>
                )}

                {(intentos.length === 3) && (
                    <div>
                        okaydfasdf
                    </div>
                )}

            </span>

        </>
    )
}
