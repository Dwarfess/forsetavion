import React from "react";
import styled from "styled-components";
import {useActivePage, useBattleFieldLength} from "../../store/storeHooks";
import {MapPlace} from "./MapPlace";

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

    const onShopIconClick = ()=> {
        setActivePage('shop-page');
    }

    const onLeaderboardsIconClick = ()=> {
        setActivePage('leaderboards-page');
    }

    return <GameSelectionPanelContainer>
        <MapPlace
            // imgName="icon-place-character"
            imgName=""
            hasHighlight={false}
            // title1="Battle"
            title2="Character"
            topPosition="400"
            leftPosition="190"
            onClickHandler={onCharacterIconClick}
        />

        <MapPlace
            // imgName="icon-shop-3"
            imgName=""
            hasHighlight={false}
            // title1="Battle"
            title2="Shop"
            topPosition="450"
            leftPosition="500"
            onClickHandler={onShopIconClick}
        />

        <MapPlace
            // imgName="icon-shop-3"
            imgName=""
            hasHighlight={false}
            // title1="Battle"
            title2="Leaderboards"
            topPosition="700"
            leftPosition="220"
            onClickHandler={onLeaderboardsIconClick}
        />

        <MapPlace
            imgName="icon-battle-3"
            title1="Battle"
            title2="3x3"
            topPosition="950"
            leftPosition="320"
            onClickHandler={() => onBattleIconClick(3)}
        />

        <MapPlace
            imgName="icon-battle-4"
            title1="Battle"
            title2="4x4"
            topPosition="870"
            leftPosition="470"
            onClickHandler={() => onBattleIconClick(4)}
        />

        <MapPlace
            imgName="icon-battle-5"
            title1="Battle"
            title2="5x5"
            topPosition="960"
            leftPosition="590"
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
