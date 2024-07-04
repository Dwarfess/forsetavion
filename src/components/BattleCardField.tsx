import {memo, useCallback, useEffect} from 'react';
// @ts-ignore
import styled from "styled-components";

import {getCardSizeInPercent} from "./utils/utils";
import {HealthIndicator} from "./HealthIndicator";
import BattleCardImage from "./BattleCardImage";
import {LevelIndicator} from "./LevelIndicator";
import {EffectPanel} from "./bottom-panel/EffectPanel";
import {useBattleFieldLength, useIsProcessingAction, useSelectedCardForInfo} from "../store/storeHooks";

const BattleCardField = memo(({onCardClick, battleCard}: any) => {
    const { battleFieldLength } = useBattleFieldLength();
    const { setSelectedCardForInfo } = useSelectedCardForInfo();
    const { isProcessingAction } = useIsProcessingAction();
    const cardsWithLevel = ['secret', 'boss'];

    const onCardRightClick = (e: any) => {
        e.preventDefault();
        if (isProcessingAction) return;

        setSelectedCardForInfo(battleCard);
    };

    return <BattleCardFieldWrapper
            // @ts-ignore
            tabIndex="0"
            card-size={getCardSizeInPercent()}>
        <BattleCardFieldWrapperForAnimation
            onContextMenu={onCardRightClick}
            onClick={() => onCardClick(battleCard.index)}
            className={`battle-card-${battleCard.index} ${battleCard.isNew ? 'newCard' : ''} dynamic-class-${battleCard.id} ${battleCard.type}` }
        >
            <BattleCardFieldContainer>
                <BattleCard data-type={battleCard.type} className={`${battleCard.type}`} data-length={battleFieldLength}>
                    <HealthIndicator battleCard={battleCard} />
                    <BattleCardImage battleCard={battleCard}/>
                    <EffectPanel battleCard={battleCard}/>
                    {cardsWithLevel.includes(battleCard.type)
                        && (<LevelIndicator battleCard={battleCard} size={battleFieldLength}/>
                    )}
                    <div className="skill-usage-image"><img/></div>
                    <div className="health-value-effect">+2</div>
                </BattleCard>
            </BattleCardFieldContainer>
        </BattleCardFieldWrapperForAnimation>
    </BattleCardFieldWrapper>;
});

const BattleCardFieldWrapper = styled.div`
    width: ${(props: any) => props['card-size']};
    height: ${(props: any) => props['card-size']};
    position: relative;
    z-index: 0;
    padding: 3px;
    outline: none;
`;

const BattleCardFieldWrapperForAnimation = styled.div`
    width: 100%;
    height: 100%;
    padding: 2px;
    
    &.hero {
        overflow: hidden;
    }
    
    &.newCard {
        animation: slide-in 0.5s;
    }
    
    // contact card 
    &.contactItem {
        animation: hit 1s ease-in-out infinite alternate;

        &::after {
            content: "";
            width: 80%;
            height: 80%;
            background-size: cover;
            position: absolute;
            display: inline-block;
            animation: fadeInFromNone 1s ease-in-out infinite alternate;
            z-index: 1;
        }

        &.contactEnemy::after { background-image: url('bloodEffect2.png') }

        &.contactPotion::after {
            width: 100%;
            height: 100%;
            background-image: url('potionEffect.png');
            animation: slide-up 1s ease-in-out infinite alternate;
        }
    }

    @keyframes hit {
        0% {transform: scale(1)}
        50% {transform: scale(.95)}
        100% {transform: scale(1)}
    }

    @keyframes slide-up {
        0% {transform: scale(0)}
        100% {transform: scale(2.5)}
    }

    @keyframes slide-in {
        0% {transform: scale(0)}
        100% {transform: scale(1)}
    }

    @keyframes fadeInFromNone {
        0% {opacity: 0}
        25% {opacity: .5}
        50% {opacity: 1}
        75% {opacity: .5}
        100% {opacity: 0}
    }

    // ProcessingAction card
    &.hidden {visibility: hidden}

    &.ProcessingAction {transition: transform 300ms}

    // transformDuration
    &.ProcessingActionHero {transition: transform 700ms}

    //transformHeroDuration
    &.move-left {transform: translateX(calc(-100% - 6px))}

    &.move-right {transform: translateX(calc(100% + 6px))}

    &.move-top {transform: translateY(calc(-100% - 6px))}

    &.move-bottom {transform: translateY(calc(100% + 6px))}
`;

const BattleCardFieldContainer = styled.div`
    width: 100%;
    height: 100%;
    //margin: 5px;
    outline: none;
    position: relative;
    border-radius: 8px;
    z-index: 0;
`;

const BattleCard = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 15px;
    box-shadow: ${(props: any) => props['data-type'] === 'hero'
            ? '0px 0px 20px 5px black' : '5px 5px 20px 5px black'};
    border: 1px solid black;
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;
    outline: none;
    position: absolute;
    top: 0;
    z-index: 1;
    opacity: 1;
    
    // start border animation
    --borderWidth: 2px;

    &.hero {
        &:before {
            content: "";
            height: calc(100% + var(--borderWidth) * 2);
            width: calc(100% + var(--borderWidth) * 2);
            background-image: conic-gradient(
                    transparent,
                    transparent,
                    transparent,
                    #d400d4
            );
            background-size: 500% 500%;
            position: absolute;
            z-index: -2;
            border-radius: 5px;
            animation: animate 4s linear infinite;
        }
        
        &:after {
            content: "";
            height: calc(100% + var(--borderWidth) * 5);
            width: calc(100% + var(--borderWidth) * 5);
            background-image: conic-gradient(
                    transparent,
                    transparent,
                    transparent,
                    #00ccff
            );
            background-size: 500% 500%;
            position: absolute;
            z-index: -2;
            border-radius: 5px;
            animation: reverseAnimate 4s linear infinite;
        }
    }

    @keyframes animate {
        0% {transform: rotate(0deg)}
        25% {transform: rotate(75deg)}
        50% {transform: rotate(150deg)}
        75% {transform: rotate(225deg)}
        100% {transform: rotate(300deg)}
    }
    
    @keyframes reverseAnimate {
        0% {transform: rotate(35deg)}
        25% {transform: rotate(110deg)}
        50% {transform: rotate(185deg)}
        75% {transform: rotate(260deg)}
        100% {transform: rotate(335deg)}
    }
    
    &:after {
        content: "";
        height: calc(100% + var(--borderWidth) * 2);
        width: calc(100% + var(--borderWidth) * 2);
        background: ${(props: any) => props['data-type'] === 'hero'
                ? 'linear-gradient(60deg, #FFD700, #eae6e2, #FFD700, #eae6e2)'
                : 'linear-gradient(60deg, #eae6e2, #090707, #f1ebed, #0a080a)'};
        background-size: 300% 300%;
        position: absolute;
        z-index: -2;
        border-radius: 5px;
        animation: animationGradient ${(props: any) => props['data-type'] === 'hero' ? '1s' : '10s'} ease alternate infinite;
    }

    @keyframes animationGradient {
        0% {background-position: 0% 50%}
        25% {background-position: 25% 50%}
        50% {background-position: 50% 75%}
        75% {background-position: 75% 100%}
        85% {background-position: 100% 50%}
        100% {background-position: 100% 0%}
    }
    // finish border animation

    
    // skills animations
    .skill-usage-image {
        display: none;
        width: 80%;
        height: 80%;
        border-radius: 100px;
        overflow: hidden;
        position: absolute;
        top: 0;
        box-shadow: 0px 0px 10px 0px white;
        animation: slide-out 2.5s;

        &.active { display: flex }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .health-value-effect {
        display: none;
        position: absolute;
        margin: auto;
        font-family: 'MagicalWorld';
        font-size: ${(props: any) => 150 / props['data-length']}px;
        font-weight: bold;

        animation: move-up 2s;

        &.active { display: block }
        &.negativeEffect { color: red }
        &.positiveEffect { color: green }
    }

    @keyframes slide-out {
        0% {
            transform: scale(1);
            opacity: 0.2;
        }
        50% {
            //transform: scale(0.5);
            opacity: 0.5;
        }
        100% {
            transform: scale(0.4);
            opacity: 0.2;
        }
    } 
    
    @keyframes move-up {
        0% {
            //transform: translateY(0);
            opacity: 0.2;
        }
        70% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-300%);
            opacity: 0.4;
        }
    }
`;

export { BattleCardField };
