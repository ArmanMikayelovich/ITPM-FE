import React from 'react';
import {Header} from './headers/Header'
import './App.css';
import {Main} from "./Main";


export let promptValue = {flag: false, text: ''};

export const changePromptContext = (flag, text) => {
    Object.assign(promptValue, {flag: flag, text: text})
    console.clear();
    console.log(promptValue);
}
export const ConfirmFlagContext = React.createContext(promptValue);

function App() {

    return (

        <ConfirmFlagContext.Provider value={false}>
            <div>
                <Header/>
                <Main/>
            </div>
        </ConfirmFlagContext.Provider>

    );
}

export default App;
