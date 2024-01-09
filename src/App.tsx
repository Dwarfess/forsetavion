import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {BattlePage} from './components/BattlePage';
import styled from "styled-components";

function App() {
    return (
        <AppContainer>
            <BattlePage/>
        </AppContainer>);
}

const AppContainer = styled.div`
    margin: 0 50px;
    //background-image: url('mobile-case.png');
    //width: 415px;
    width: 700px;
    height: 100vh;
    background-size: cover;
`;

export default App;
