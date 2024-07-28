import React, {useState} from "react";
import styled from "styled-components";
import {CharacterPage} from "../character-page/CharacterPage";
import {BattlePage} from "../BattlePage";
import {useActivePage, useBattleFieldLength} from "../../store/storeHooks";
import {GameSelectionPanel} from "../character-page/GameSelectionPanel";

const HomeMap = () => {
    const { battleFieldLength } = useBattleFieldLength();
    const { activePage } = useActivePage();

    return <HomeMapContainer>
        { activePage === 'character-page' && (<CharacterPage />)}
        { activePage === 'game-selection-page' && (<GameSelectionPanel />)}
        { activePage === 'battle-page' && (<BattlePage />)}
    </HomeMapContainer>
};

const HomeMapContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url('main-bg.jpg');
    background-size: cover;
`;

export { HomeMap };
