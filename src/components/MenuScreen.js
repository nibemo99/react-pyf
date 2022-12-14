import React from 'react'
import { useTranslation } from "react-i18next";
import '../styles/Main.css'

const MenuScreen = ( { setMainDisplay, calcRandomNumber, setRandomNumber, title, setTitle } ) => {
    // language setup
    const { t, i18n } = useTranslation();
    const handleChangeLng = () => {
        if ( language === 'es' ) {
            i18n.changeLanguage( 'en' );
            localStorage.setItem( "lng", 'en' );
            language = 'en'
        }
        else if ( language === 'en' ) {
            i18n.changeLanguage( 'es' );
            localStorage.setItem( "lng", 'es' );
            language = 'es'
        }
    };

    // variables
    let language = localStorage.getItem( 'lng' ) || 'en'

    // functions
    const clickHandler = ( e ) => {
        if ( e === 'play' ) {
            setRandomNumber( calcRandomNumber )
            setTitle( `${t( "Let's play!" )} ⌛` )
        }
        if ( e === 'hist' ) {
            setTitle( t( "History" ) )
        }
        if ( e === 'howto' ) {
            setTitle( `${t( "Guides" )}` )
        }
        if ( e === 'multiplayer' ) {
            setTitle( `${t( "Multiplayer" )}` )
        }
        setMainDisplay( e )
    }

    // En cada render
    if ( title !== 'Picas & Fijas' ) {
        setTitle( 'Picas & Fijas' )
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center gap-5 mt-16'>
                {/* <button>Reanudar</button> */}
                <button
                    className='w-2/3 py-4 rounded-xl shadow-sm shadow-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105 focus:bg-blue-700 focus:text-white focus:scale-105 ease-out duration-500 '
                    onClick={() => clickHandler( 'play' )}
                >
                    {t( "New game" )}
                </button>
                <button
                    onClick={() => clickHandler( 'multiplayer' )}
                    className='w-2/3 py-4 rounded-xl shadow-sm shadow-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105 focus:bg-blue-700 focus:text-white focus:scale-105 ease-out duration-500'
                >
                    {t( "Multiplayer" )}
                </button>
                <button
                    onClick={() => clickHandler( 'hist' )}
                    className='w-2/3 py-4 rounded-xl shadow-sm shadow-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105 focus:bg-blue-700 focus:text-white focus:scale-105 ease-out duration-500'
                >
                    {t( "History" )}
                </button>
                <button
                    onClick={() => clickHandler( 'howto' )}
                    className='w-2/3 py-4 rounded-xl shadow-sm shadow-blue-700 hover:bg-blue-700 hover:text-white hover:scale-105 focus:bg-blue-700 focus:text-white focus:scale-105 ease-out duration-500'
                >
                    {t( "How to play" )}
                </button>

            </div>
            <label
                htmlFor="teal-toggle"
                className="inline-flex absolute left-28 bottom-10 -translate-x-1/2 items-center mr-5 cursor-pointer"
            >
                <input
                    type="checkbox"
                    value=""
                    id="teal-toggle"
                    className="sr-only peer"
                    checked={( language === 'en' ) ? false : true}
                    onClick={handleChangeLng}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-blue-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600">
                    <span className='text-white absolute w-full bottom-[2px] left-0'>
                        en es
                    </span>
                </div>
            </label>

            <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/nibemo99/react-pyf'
                className='flex gap-3 absolute left-1/2 bottom-10 -translate-x-1/2 hover:scale-110 duration-300'
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
            </a>
        </>
    )
}

export default MenuScreen