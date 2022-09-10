import './App.css';
import { Wrapper } from './Components/Wrapper/Wrapper';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { MenuScreen } from './Components/Main/MenuScreen/MenuScreen';
import { PlayingScreen } from './Components/Main/PlayingScreen/PlayingScreen';
import { Historial } from './Components/Main/Historial/Historial'
import { useState } from 'react';
import { ComoJugar } from './Components/Main/ComoJugar/ComoJugar';



function App() {
  // useStatesss
  const [mainDisplay, setMainDisplay] = useState('menu')
  const [title, setTitle] = useState('Picas y Fijas')

  // funcionesss
  function addToLocalStorage(e, date, status) {
    if (localStorage.historial === undefined) localStorage.historial = JSON.stringify([])
    let temp = JSON.parse(localStorage.historial)
    temp.push({
      date: `${date}`,
      data: e,
      completed: status,
    })
    localStorage.historial = JSON.stringify(temp)
    console.log('recien lo guarde', JSON.parse(localStorage.historial));
  }
  console.log('render de app.js');

  //calculando el random number
  let randomNumber = 0
  let temp = 0
  

  if(title === 'Picas y Fijas')

  console.log('random number set', randomNumber);



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
          {(mainDisplay === 'menu') &&
            <MenuScreen
              setMainDisplay={setMainDisplay}
            />}

          {(mainDisplay === 'play') &&
            <PlayingScreen
              setMainDisplay={setMainDisplay}
              randomNumber={randomNumber}
              addToLocalStorage={addToLocalStorage}
              setTitle={setTitle}
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
