import './App.css';
import { Wrapper } from './Components/Wrapper/Wrapper';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { MainScreen } from './Components/Main/MainScreen/MainScreen';
import { PlayingScreen } from './Components/Main/PlayingScreen/PlayingScreen';
import { Historial } from './Components/Main/Historial/Historial'
import { useState } from 'react';
import { ComoJugar } from './Components/Main/ComoJugar/ComoJugar';



function App() {
  // useStatesss
  const [mainDisplay, setMainDisplay] = useState('main')
  const [randomNumber, setRandomNumber] = useState(0)


  // funcionesss
  function addToLocalStorage(e, status) {
    if (localStorage.historial === undefined) localStorage.historial = JSON.stringify([])
    let temp = JSON.parse(localStorage.historial)
    let date = bringDate()
    temp.push({
      date: `${date}`,
      data: e,
      completed: status,
    })
    localStorage.historial = JSON.stringify(temp)
    console.log('recien lo guarde', JSON.parse(localStorage.historial));
  }
  function bringDate () {
    let x = new Date()
    return x.toDateString()
  }


  return (
    <>
      <Wrapper>
        <Header>
          <h1 className='font-serif italic py-10 text-6xl hover:scale-x-105 hover:rotate-3 ease-in-out duration-100'>Picas y Fijas</h1>
        </Header>

        <Main>
          {/* aqui se renderizan los botones o lo que sea */}
          {(mainDisplay === 'main') &&
            <MainScreen
              setMainDisplay={setMainDisplay}
              setRandomNumber={setRandomNumber}
            />}

          {(mainDisplay === 'play') &&
            <PlayingScreen
              setMainDisplay={setMainDisplay}
              randomNumber={randomNumber}
              addToLocalStorage={addToLocalStorage}
            />}

          {(mainDisplay === 'hist') &&
            <Historial
              setMainDisplay={setMainDisplay}
            />}

          {(mainDisplay === 'howto') &&
            <ComoJugar
              setMainDisplay={setMainDisplay}
            />}



        </Main>



      </Wrapper>


    </>
  );
}

export default App;
