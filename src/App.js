import './styles/App.css';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import Main from './components/Main';
import MenuScreen from './components/MenuScreen';
import PlayingScreen from './components/PlayingScreen';
import Historial from './components/Historial'
import ComoJugar from './components/ComoJugar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MultiplayerScreen from './components/MultiplayerScreen';



function App () {
  // language
  const { t } = useTranslation();

  // useStatesss
  const [mainDisplay, setMainDisplay] = useState( 'menu' )
  const [title, setTitle] = useState( 'Picas & Fijas' )
  const [randomNumber, setRandomNumber] = useState( 0 )

  // funcionesss
  function addToLocalStorage ( e, date, status ) {
    if ( localStorage.historial === undefined ) localStorage.historial = JSON.stringify( [] )
    let temp = JSON.parse( localStorage.historial )
    temp.push( {
      date: `${date}`,
      data: e,
      completed: status,
    } )
    localStorage.historial = JSON.stringify( temp )
    // console.log('recien lo guarde', JSON.parse(localStorage.historial));
  }
  function calcRandomNumber () {
    setTitle( `${t( "Let's play!" )} ⌛` )
    let temp = 0
    while ( !temp ) {
      temp++
      temp = `${Math.trunc( ( Math.random() * 10000 ) )}`
      temp =
        ( temp.length === 4 ) &&
        ( temp[0] !== temp[1] ) &&
        ( temp[0] !== temp[2] ) &&
        ( temp[0] !== temp[3] ) &&
        ( temp[1] !== temp[2] ) &&
        ( temp[1] !== temp[3] ) &&
        ( temp[2] !== temp[3] ) && temp
    }
    return temp

  }

  // EN CADA RENDER ↓


  return (
    <>
      <Wrapper>
        <Header>
          <div>
            <h1 className='font-serif italic py-10 text-6xl hover:scale-x-105 hover:rotate-3 ease-in-out duration-100'>
              {title}
            </h1>

          </div>
        </Header>

        <Main className=''>
          {/* aqui se renderizan los botones o lo que sea */}
          {( mainDisplay === 'menu' ) &&
            <MenuScreen
              calcRandomNumber={calcRandomNumber}
              setRandomNumber={setRandomNumber}
              setMainDisplay={setMainDisplay}
              setTitle={setTitle}
            />}

          {( mainDisplay === 'play' ) &&
            <PlayingScreen
              setMainDisplay={setMainDisplay}
              addToLocalStorage={addToLocalStorage}
              title={title}
              setTitle={setTitle}
              randomNumber={randomNumber}
              calcRandomNumber={calcRandomNumber}
              setRandomNumber={setRandomNumber}
            />}

          {( mainDisplay === 'hist' ) &&
            <Historial
              setMainDisplay={setMainDisplay}
            />}

          {( mainDisplay === 'howto' ) &&
            <ComoJugar
              setRandomNumber={setRandomNumber}
              calcRandomNumber={calcRandomNumber}
              setMainDisplay={setMainDisplay}
            />}
          {( mainDisplay === 'multiplayer' ) &&
            <MultiplayerScreen
              setMainDisplay={setMainDisplay}
            />}



        </Main>



      </Wrapper>


    </>
  );
}

export default App;
