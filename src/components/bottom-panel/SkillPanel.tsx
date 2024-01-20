import React from 'react';
import styled from "styled-components";
import {BattleCardType, HeroBattleCardType} from "../types";


const SkillPanel = ({heroCard}: { heroCard: HeroBattleCardType }) => {
    return (
        <BottomPanelWrapper>
            <h1>{heroCard.name}</h1>
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

export { SkillPanel };