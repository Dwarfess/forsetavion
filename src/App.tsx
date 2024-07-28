import React from 'react';
import styled from "styled-components";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { HomeMap } from "./components/home-map/HomeMap";

function App() {

    return (
        <AppContainer>
            <HomeMap />
        </AppContainer>);
}

const AppContainer = styled.div`
    margin: 20px;
    border-radius: 20px;
    //width: 415px;
    width: 740px;
    box-shadow: 0 0 30px 5px black;
    //width: auto;
    height: calc(100vh - 50px);
    overflow: hidden;
    box-sizing: content-box;
`;

export default App;
