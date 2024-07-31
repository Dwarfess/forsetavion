import React from "react";
import styled from "styled-components";
import {useActivePage, useBattleFieldLength} from "../../store/storeHooks";
import {MapPlace} from "../home-map/MapPlace";

const GameSelectionPanel = () => {
    const { setActivePage } = useActivePage();
    const { setBattleFieldLength } = useBattleFieldLength();

    const onBattleIconClick = (val: number)=> {
        setBattleFieldLength(val);
        setActivePage('battle-page');
    }

    const onCharacterIconClick = ()=> {
        setActivePage('character-page');
    }

    return <GameSelectionPanelContainer>
        <MapPlace
            imgName="icon-place-character"
            // title1="Battle"
            title2="Character"
            topPosition="720"
            leftPosition="40"
            onClickHandler={onCharacterIconClick}
        />

        <MapPlace
            imgName="icon-battle-3"
            title1="Battle"
            title2="3x3"
            topPosition="390"
            leftPosition="20"
            onClickHandler={() => onBattleIconClick(3)}
        />

        <MapPlace
            imgName="icon-battle-4"
            title1="Battle"
            title2="4x4"
            topPosition="460"
            leftPosition="340"
            onClickHandler={() => onBattleIconClick(4)}
        />

        <MapPlace
            imgName="icon-battle-5"
            title1="Battle"
            title2="5x5"
            topPosition="250"
            leftPosition="450"
            onClickHandler={() => onBattleIconClick(5)}
        />
    </GameSelectionPanelContainer>
}

const GameSelectionPanelContainer = styled.div`
    margin: 10px;
    width: 100%;
    position: relative;
    display: flex;
`;

export { GameSelectionPanel };
