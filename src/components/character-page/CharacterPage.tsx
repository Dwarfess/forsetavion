import React, {useState} from "react";
import { HeroSelectionPanel } from "./HeroSelectionPanel";
import styled from "styled-components";
// import { CharacterPanel } from "./CharacterPanel";
import {useCharacter} from "../../store/storeHooks";
import {CharacterInfo} from "./CharacterInfo";
import {AvatarSelection} from "./AvatarSelection";

const CharacterPage = () => {
    const { character } = useCharacter();
    const [ characterSelectedPanel, setCharacterSelectedPanel ] = useState('character-info');

    return <CharacterPageContainer>
        <CharacterPanel>
            <div className="character-menu">
                <button className="avatar btn" onClick={() => setCharacterSelectedPanel('avatar-selection')}>
                    <img src={`${character.avatar}.jpg`} alt=""/>
                    {/*<div className="avatar-border"></div>*/}
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

        <HeroSelectionPanel />
    </CharacterPageContainer>
}

const CharacterPageContainer = styled.div`
    width: auto;
    height: calc(100vh - 50px);
`;

const CharacterPanel = styled.div`
    background-image: url('left-parchment.png');
    margin: 20px 0 0 50px;
    height: 500px;
    display: flex;

    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    
    .character-menu {
        width: 150px;
        height: 100%;
        box-sizing: border-box;

        .btn {
            display: block;
            width: 70px;
            height: 70px;
            margin: 20px auto;

            background-color: transparent;
            background-size: cover;
            box-shadow: 0 0 10px 1px black;
            border-radius: 5px;
            z-index: 1;
            cursor: pointer;

            &:hover { box-shadow: 0 0 10px 2px black; }

            &:active { box-shadow: none }
        }
        
        .avatar {
            width: 100px;
            height: 100px;
            margin: 50px auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            
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
        //border: 1px solid red;
        width: 500px;
        margin: 90px 10px;
    }
`;

export { CharacterPage }
