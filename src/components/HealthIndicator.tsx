import styled from "styled-components";

import {BattleCardType, HeroBattleCardType} from "./types";


const HealthIndicator = ({battleCard, gridLength}: { battleCard: BattleCardType | any, gridLength: number }) => {
    return <HealthIndicatorWrapper
        data-health={battleCard.health}
        data-max-health={battleCard.maxHealth}
        data-length={gridLength}
    >
        {battleCard.type === 'hero' && (
            <>
                <div className="indicatorBottle"/>
                <img src="hp-indicator60.png" className="health"/>
                <span className="healthAmount">{battleCard.health}</span>
            </>
        )}
        {battleCard.type === 'potion' && (
            <>
                <img src="hp-indicator60.png" className="health"/>
                <span className="healthAmount">{battleCard.value}</span>
            </>
        )}
        {battleCard.type === 'enemy' && (
            <>
                <img src="might-indicator.png" className="might"/>
                <span className="mightAmount">{battleCard.value}</span>
            </>
        )}

    </HealthIndicatorWrapper>;
};

const HealthIndicatorWrapper = styled.span`
    position: absolute;
    left: 3px;
    top: 3px;
    width: 25%;
    height: 25%;
    overflow: hidden;
    border-radius: 50px;
    animation: pulse 5s ease infinite;

    .indicatorBottle {
        position: absolute;
        bottom: 0;
        height: ${(props: any) => 100 / props['data-max-health'] * props['data-health']}%;
        width: 100%;
        background-color: red;
    }

    .health {
        position: relative;
        width: 100%;
    }

    .might {
        position: relative;
        width: 100%;
        //animation: lds-dual-ring 45s linear infinite;
    }

    span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: ${(props: any) => 100 / props['data-length']}px;
        font-family: 'MagicalWorld';
        font-weight: bold;

        &.healthAmount {
            color: #871812;
            text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
        }

        &.mightAmount {
            color: black;
            text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0)
        }
        100% {
            transform: rotate(360deg)
        }
    }
`;

export {HealthIndicator};