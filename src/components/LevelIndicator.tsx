import styled from "styled-components";
import {BattleCardType} from "./types";
import {defaultFontSize} from "./constants";

const LevelIndicator = ({
    battleCard,
    size,
    position
}: { battleCard: BattleCardType | any, size?: number, position?: any }) => {
    return <>
        <LevelIndicatorWrapper data-size={size} data-bottom={position?.bottom}>
            <span className="level-value">{battleCard.level}</span> lvl
        </LevelIndicatorWrapper>
    </>;
};

const LevelIndicatorWrapper = styled.div`
    position: absolute;
    right: ${(props: any) => props['data-position']?.right || 0}px;
    bottom: ${(props: any) => props['data-bottom'] || 0}px;
    height: 25%;
    overflow: hidden;
    padding: 0 5px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    font-size: ${(props: any) => (defaultFontSize * 5) / props['data-size']}px;
    font-family: 'MagicalWorld';
    font-weight: bold;
    z-index: 4;

    color: #0f3e5b;
    text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
    
    .level-value {font-size: 150%}
`;

export {LevelIndicator};
