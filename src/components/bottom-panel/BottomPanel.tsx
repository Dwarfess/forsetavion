import React from 'react';
import styled from "styled-components";
import {BattleCardType, HeroBattleCardType} from "../types";
import {SkillPanel} from "./SkillPanel";


const BottomPanel = ({
    battleCards,
    setBattleCards
}: any) => {
    return (
        <BottomPanelWrapper>
            <SkillPanel battleCards={battleCards} setBattleCards={setBattleCards}/>
        </BottomPanelWrapper>
    )
};

const BottomPanelWrapper = styled.div`
    margin: 10px 30px;
    width: 100%;
    font-family: 'MagicalWorld';
    
    .top-side, .bottom-side {
        display: flex;
        width: 100%;
        height: max-content;
    }
`;

export { BottomPanel };