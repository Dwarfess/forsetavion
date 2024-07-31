import React, {useState} from "react";
import styled from "styled-components";
import {CharacterPage} from "../character-page/CharacterPage";
import {BattlePage} from "../BattlePage";
import {useActivePage} from "../../store/storeHooks";
import {GameSelectionPanel} from "../character-page/GameSelectionPanel";
const HomeMap = () => {
    const { activePage } = useActivePage();

    return <HomeMapContainer>
        { activePage === 'game-selection-page' && (<h2>Homeland</h2>)}

        { activePage === 'character-page' && (<CharacterPage />)}
        { activePage === 'game-selection-page' && (<GameSelectionPanel />)}
        { activePage === 'battle-page' && (<BattlePage />)}
    </HomeMapContainer>
};

const HomeMapContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url('main-bg-6.jpg');
    background-size: 100% 100%;
    position: relative;
    
    h2 {
        font-family: 'MagicalWorld';
        font-size: 70px;
        text-align: center;
        color: #494117;
        text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
    }
`;

export { HomeMap };
