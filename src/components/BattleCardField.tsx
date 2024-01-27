import {memo, useCallback, useEffect} from 'react';
// @ts-ignore
import styled from "styled-components";

import {getCardSizeInPercent} from "./utils/utils";
import {HealthIndicator} from "./HealthIndicator";
import BattleCardImage from "./BattleCardImage";
import {LevelIndicator} from "./LevelIndicator";
import {EffectPanel} from "./bottom-panel/EffectPanel";

const BattleCardField = memo(({onCardClick, onCardDoubleClick, gridLength, battleCard}: any) => {

    useEffect(() => {
        if (battleCard.subType) {
            console.log(battleCard.subType, 'battleCard.subType')
        }
    }, []);

    const onDoubleClick = useCallback((e: any) => {
        e.preventDefault();
        onCardDoubleClick(battleCard.index);
    }, [battleCard]);

    return <BattleCardFieldWrapper
            // @ts-ignore
            tabIndex="0"
            card-size={getCardSizeInPercent(gridLength)}>
        <BattleCardFieldWrapperForAnimation
            onContextMenu={onDoubleClick}
            onClick={() => onCardClick(battleCard.index)}
            className={`battle-card-${battleCard.index} ${battleCard.isNew ? 'newCard' : ''} test-card dynamic-class-${battleCard.id} ${battleCard.type}` }
        >
            <BattleCardFieldContainer>
                <BattleCard data-type={battleCard.type} className={`${battleCard.type}`}>
                    <HealthIndicator battleCard={battleCard} gridLength={gridLength}/>
                    <BattleCardImage battleCard={battleCard}/>
                    <EffectPanel battleCard={battleCard}/>
                    <LevelIndicator battleCard={battleCard} gridLength={gridLength}/>
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
    //border: 1px solid red;
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

    //@keyframes lds-ripple {
    //    0% {
    //        top: 20%;
    //        left: 20%;
    //        width: 0;
    //        height: 0;
    //        opacity: 0;
    //    }
    //    4.9% {
    //        top: 20%;
    //        left: 20%;
    //        width: 20%;
    //        height: 20%;
    //        opacity: 0;
    //    }
    //    5% {
    //        top: 20%;
    //        left: 20%;
    //        width: 50%;
    //        height: 50%;
    //        opacity: 1;
    //    }
    //    100% {
    //        top: 0;
    //        left: 0;
    //        width: 100%;
    //        height: 100%;
    //        opacity: 0;
    //    }
    //}

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

    // moving card
    &.hidden {visibility: hidden}

    &.moving {transition: transform 300ms}

    // transformDuration
    &.movingHero {transition: transform 700ms}

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
`;

export { BattleCardField };
