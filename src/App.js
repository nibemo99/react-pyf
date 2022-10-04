import './App.css';
import { Wrapper } from './Components/Wrapper/Wrapper';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { MenuScreen } from './Components/Main/MenuScreen/MenuScreen';
import { PlayingScreen } from './Components/Main/PlayingScreen/PlayingScreen';
import { Historial } from './Components/Main/Historial/Historial'
import { useState } from 'react';
import { ComoJugar } from './Components/Main/ComoJugar/ComoJugar';



function App () {
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



        </Main>



      </Wrapper>


    </>
  );
}

export default App;
