import React, {useState} from "react";
import styled from "styled-components";

import { HeroSelectionPanel } from "./HeroSelectionPanel";
import { CharacterInfo } from "./CharacterInfo";
import { AvatarSelection } from "./AvatarSelection";

import {useActivePage, useCharacter} from "../../../store/storeHooks";

import mixins from "../../../mixins";

const CharacterPage = () => {
    const { character } = useCharacter();
    const { setActivePage } = useActivePage();
    const [ characterSelectedPanel, setCharacterSelectedPanel ] = useState('character-info');

    return <CharacterPageContainer>
        <CharacterPanel>
            <div className="character-menu">
                <button className="avatar btn" onClick={() => setCharacterSelectedPanel('avatar-selection')}>
                    <img src={`${character.avatar}.jpg`} alt=""/>
                </button>
                <button className="inventory btn" onClick={() => setCharacterSelectedPanel('character-info')}></button>
                <button className="shop btn"></button>
                <button className="forge btn"></button>
            </div>
            <div className="character-selected-panel">
                { characterSelectedPanel === 'character-info' && <CharacterInfo /> }
                { characterSelectedPanel === 'avatar-selection' && <AvatarSelection /> }
            </div>
        </CharacterPanel>

        <div className="play-game-button" onClick={() => setActivePage('game-selection-page')}></div>

        <div className="hero-selection-panel-wrapper">
            <HeroSelectionPanel />
        </div>
    </CharacterPageContainer>
}

const CharacterPageContainer = styled.div`
    width: auto;
    height: 100%;
    overflow: hidden;
    //height: calc(100vh - 50px);
    position: relative;

    .play-game-button {
        width: 130px;
        height: 130px;
        background-image: url("play-game-button.png");
        background-size: cover;
        opacity: .5;
        position: absolute;
        top: 48%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 200px;
        box-shadow: 0 0 20px 5px black;
        cursor: pointer;

        &:hover { box-shadow: 0 0 10px 10px black }
        &:active { box-shadow: 0 0 10px 1px black }
    }

    .hero-selection-panel-wrapper {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        margin-bottom: 20px;
    }
`;

const CharacterPanel = styled.div`
    ${mixins.stretchedBackground};
    
    background-image: url('left-parchment.png');
    margin-left: 50px;
    height: 650px;
    display: flex;
    
    .character-menu {
        width: 150px;
        height: 100%;
        box-sizing: border-box;

        .btn {
            ${mixins.transparentBtn}
            
            width: 70px;
            height: 70px;
            margin: 20px auto;
        }
        
        .avatar {
            ${mixins.flexCenter}
            
            width: 100px;
            height: 100px;
            margin: 70px auto 20px;
            
            img { 
                width: 80px;
                height: 80px 
            }
        }
        
        .inventory { background-image: url('icon-character-info.png') }

        .shop { background-image: url('icon-shop.png') }
        
        .forge { background-image: url('icon-forge3.png') }        
    }

    .character-selected-panel {
        width: 500px;
        margin: 130px 10px;
    }
`;

export { CharacterPage }
