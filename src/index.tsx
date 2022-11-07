import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Game from "./components/Game";
import SocialBar from "./components/SocialBar";
import {ReactComponent as ForkMeIcon} from "./assets/forkme.svg";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <a href="https://github.com/sakibulalam/tic-tac-toe-react" className="absolute top-0 right-0"
           aria-label="Fork Me on Github Link" target="_blank" rel="noopener noreferrer">
            <ForkMeIcon/>
        </a>
        <Game/>
        <SocialBar/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
