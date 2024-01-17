import styled from "styled-components";

import {BattleCardType, HeroBattleCardType} from "./types";
import {defaultFontSize} from "./constants";


const LevelIndicator = ({battleCard, gridLength}: { battleCard: BattleCardType | any, gridLength: number }) => {
    const cardsWithLevel = ['secret', 'boss'];
    return <LevelIndicatorWrapper data-length={gridLength}>
        {cardsWithLevel.includes(battleCard.type) && (<><span className="level-value">{battleCard.level}</span> lvl</>)}
    </LevelIndicatorWrapper>;
};

const LevelIndicatorWrapper = styled.div`
    position: absolute;
    right: 0px;
    bottom: 0px;
    height: 25%;
    overflow: hidden;
    padding: 0 5px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    font-size: ${(props: any) => (defaultFontSize * 5) / props['data-length']}px;
    font-family: 'MagicalWorld';
    font-weight: bold;
    z-index: 4;

    color: #0f3e5b;
    text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
    
    .level-value {font-size: 150%}
`;

export {LevelIndicator};