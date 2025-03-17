import React from 'react';
import styled from "styled-components";
import { SkillPanel } from "./SkillPanel";
import { PotionPanel } from './PotionPanel';

const BottomPanel = () => {
    return (
        <BottomPanelWrapper>
            <SkillPanel />
            <PotionPanel />
        </BottomPanelWrapper>
    )
};

const BottomPanelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 10px 0;
    width: 100%;
    font-family: 'MagicalWorld';
    
    .top-side, .bottom-side {
        display: flex;
        width: 100%;
        height: max-content;
    }
`;

export { BottomPanel };
