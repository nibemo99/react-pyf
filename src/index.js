import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { Background } from './Components/Background/Background';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Background>
        <App />

    </Background>
);
