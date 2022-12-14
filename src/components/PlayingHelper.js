import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const PlayingHelper = ( { intentos, setMainDisplay, setTitle, finished, setFinished } ) => {
    // language
    const { t } = useTranslation();


    // USESTATES
    const [flag, setFlag] = useState( 0 )

    // Con cada render
    if ( intentos.length > 2 && flag === 1 ) {
        setFlag( 1000 )
    }
    if ( flag === 0 ) {
        setTimeout( () => {
            setFlag( 1 )
        }, 3000 );
    }
    if ( intentos.length >= 1 && flag === 1000 ) {
        setTimeout( () => {
            setFlag( 2 )
        }, 10000 );
    }
    if ( intentos.length >= 1 && flag === 2 ) {
        setFlag( 3 )
        setTimeout( () => {
            setFlag( 1000 )
        }, 10000 );
    }


    return (
        <>
            {/* Todo el recuadro de Ronda */}
            <span className='rounded-xl relative shadow-sm shadow-blue-700 w-1/4 mx-2  ease-out duration-500 hover:shadow-md  hover:shadow-blue-700 focus:shadow-blue-700 focus:shadow-md ' >
                {( intentos.length === 0 ) && (
                    <button
                        className='rounded-xl w-full h-full animate-wiggle'
                        onClick={() => { setMainDisplay( 'howto' ); setTitle( t( "Guides" ) ) }}
                    >
                        Tutorial
                    </button>
                )}

                {( intentos.length !== 0 ) && (
                    <>
                        {( flag === 1 ) ? (
                            <div
                                className='animate-bounceDelayed absolute top-[-30px] left-[-20px] w-36 text-center text-sm'
                            >{t( "Touch for hints" )}
                            </div>
                        )
                            : ( '' )
                        }
                        <button
                            onClick={() => {
                                if ( flag >= 1 && finished[0] !== 1 ) {
                                    setFinished( [0, finished[2], finished[2]] )
                                    setFlag( 1000 )
                                }
                            }}
                            className={`w-full ${( flag === 3 ) ? 'animate-wiggle' : ''}`}
                        >{t( "Round" )}: {intentos.length}
                        </button>
                    </>
                )}
            </span>
        </>
    )
}

export default PlayingHelper