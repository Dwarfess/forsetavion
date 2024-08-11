import React, {useState} from "react";
import styled from "styled-components";

import { HeroSelectionPanel } from "./HeroSelectionPanel";
import { CharacterInfo } from "./CharacterInfo";
import { AvatarSelection } from "./AvatarSelection";

import { useCharacter } from "../../../store/storeHooks";

import mixins from "../../../mixins";

const CharacterPage = () => {
    const { character } = useCharacter();
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

        <HeroSelectionPanel />
    </CharacterPageContainer>
}

const CharacterPageContainer = styled.div`
    width: auto;
    height: calc(100vh - 50px);
`;

const CharacterPanel = styled.div`
    ${mixins.stretchedBackground};
    
    background-image: url('left-parchment.png');
    margin: 20px 0 0 50px;
    height: 500px;
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
            margin: 50px auto 20px;
            
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
        margin: 90px 10px;
    }
`;

export { CharacterPage }
