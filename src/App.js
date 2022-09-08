import './App.css';
import { Wrapper } from './Components/Wrapper/Wrapper';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { MainScreen } from './Components/Main/MainScreen/MainScreen';
import { PlayingScreen } from './Components/Main/PlayingScreen/PlayingScreen';
import { Historial } from './Components/Main/Historial/Historial'
import { useState } from 'react';



function App() {

  const [mainDisplay, setMainDisplay] = useState('main')

  return (
    <>
      <Wrapper>
        <Header>
          <h1>app principal</h1>
        </Header>

        <Main>
          {/* aqui se renderizan los botones o lo que sea */}
          {(mainDisplay === 'main') && <MainScreen setMainDisplay={setMainDisplay} />}
          {(mainDisplay === 'play') && <PlayingScreen setMainDisplay={setMainDisplay} />}
          {(mainDisplay === 'play') && <Historial setMainDisplay={setMainDisplay} />}


        </Main>



      </Wrapper>


    </>
  );
}

export default App;
