import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {BattlePage} from './components/BattlePage';
import styled from "styled-components";
import {MainPage} from "./components/mainPage/MainPage";
import {useBattleFieldLength} from "./store/storeHooks";

function App() {
    const { battleFieldLength } = useBattleFieldLength();
    return (
        <AppContainer>
            {battleFieldLength === 0 && (<MainPage />)}
            <BattlePage/>
        </AppContainer>);
}

const AppContainer = styled.div`
    margin: 20px;
    border-radius: 20px;
    background-image: url('main1.jpg');
    //width: 415px;
    width: 740px;
    box-shadow: 0 0 30px 5px black;
    //width: auto;
    height: calc(100vh - 50px);
    overflow: hidden;
    background-size: cover;
    box-sizing: content-box;
`;

export default App;
