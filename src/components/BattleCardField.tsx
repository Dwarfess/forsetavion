import React, {useEffect, useLayoutEffect, useState} from 'react';
// @ts-ignore
import LazyLoad from 'react-lazyload';
import styled from "styled-components";

import {getCardSizeInPercent} from "./utils";
import {HealthIndicator} from "./HealthIndicator";

const BattleCardField = ({onCardClick, gridLength, battleCard}: any) => {
    return <BattleCardFieldContainer
        // @ts-ignore
        tabIndex="0"
        card-size={getCardSizeInPercent(gridLength)}
    >
        <BlockWithMargin />
        <BattleCard
            onClick={() => onCardClick(battleCard.index)}
            className={`battle-card-${battleCard.index} ${battleCard.isNew && 'newCard'} dynamic-class-${battleCard.id}`}
            data-type={battleCard.type}
        >
            <HealthIndicator battleCard={battleCard}/>
            <CardImage src={`${battleCard.image}.jpg`} data-type={battleCard.type}/>
        </BattleCard>
    </BattleCardFieldContainer>;
};

const CardImage = styled.img`
    max-width: ${(props: any) => props['data-type'] === 'hero' ? '100%' : '100%'};
    max-height: ${(props: any) => props['data-type'] === 'hero' ? '100%' : '100%'};
    border-radius: 10px;
`;

const BattleCardFieldContainer = styled.div`
    width: ${(props: any) => props['card-size']};
    margin: 5px;
    outline: none;
    position: relative;
    border-radius: 8px;
    z-index: 0;
`;

const BlockWithMargin = styled.div`
    margin-top: 100%;
`;

const BattleCard = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    box-shadow: ${(props: any) => props['data-type'] === 'hero'
            ? '0px 0px 20px 5px black' : '5px 5px 20px 5px black'};
    border: 3px solid black;
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;
    outline: none;
    position: absolute;
    background-color: #e7f2fb;
    top: 0;
    z-index: 1;
    opacity: 1;
    
    &.newCard {
        animation: slide-in 0.3s;
    }

    // contact card 
    &.hitEnemy {
        animation: hit 1s ease-in-out infinite alternate;
        
        &::after {
            content: "";
            width: 80%;
            height: 80%;
            background-image: url('bloodEffect2.png');
            background-size: cover;
            position: absolute;
            display: inline-block;
            animation: fadeInFromNone 1s ease-in-out infinite alternate;
        }
    }
    
    @keyframes hit {
        0% { transform: scale(1) }
        50% { transform: scale(.95) }
        100% { transform: scale(1) }
    }

    @keyframes slide-in {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes fadeInFromNone {
        0% { opacity: 0 }
        25% { opacity: .5 }
        50% { opacity: 1 }
        75% { opacity: .5 }
        100% { opacity: 0 }
    }
    
    // moving card
    &.hidden { visibility: hidden }
    &.moving { transition: transform 300ms; } // transformDuration
    &.movingHero { transition: transform 700ms; } //transformHeroDuration
    &.move-left { transform: translateX(calc(-100% - 10px)) }
    &.move-right { transform: translateX(calc(100% + 10px)) }
    &.move-top { transform: translateY(calc(-100% - 10px)) }
    &.move-bottom { transform: translateY(calc(100% + 10px)) }
`;

export default React.memo(BattleCardField);
