import React, {useEffect} from "react";
import styled from "styled-components";
import {CharacterPage} from "./character-page/CharacterPage";
import {BattlePage} from "../BattlePage";
import {useActivePage} from "../../store/storeHooks";
import {GameSelectionPanel} from "./GameSelectionPanel";
import {ShopPage} from "./shop-page/ShopPage";
import {RegistrationPage} from "./registration-page/RegistrationPage";
const HomeMap = () => {
    const { activePage, setActivePage } = useActivePage();

    useEffect(() => {
        setActivePage('registration-page');
    }, []);

    return <HomeMapContainer>
        { activePage === 'game-selection-page' && (<h2 className="map-name">Homeland</h2>)}

        { activePage === 'registration-page' && (<RegistrationPage />)}
        { activePage === 'character-page' && (<CharacterPage />)}
        { activePage === 'shop-page' && (<ShopPage />)}
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
    
    .map-name {
        font-family: 'MagicalWorld';
        font-size: 70px;
        text-align: center;
        color: #494117;
        text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
    }
`;

export { HomeMap };
