import {memo, useEffect} from 'react';
// @ts-ignore
import styled from "styled-components";

import {getCardSizeInPercent} from "./utils";
import {HealthIndicator} from "./HealthIndicator";
import BattleCardImage from "./BattleCardImage";

const BattleCardField = memo(({onCardClick, gridLength, battleCard}: any) => {

    useEffect(() => {
        if (battleCard.subType) {
            console.log(battleCard.subType, 'battleCard.subType')
        }
    }, [])

    return <BattleCardFieldContainer
        // @ts-ignore
        tabIndex="0"
        card-size={getCardSizeInPercent(gridLength)}
    >
        <BlockWithMargin />
        <BattleCard
            onClick={() => onCardClick(battleCard.index)}
            className={`battle-card-${battleCard.index} ${battleCard.isNew && 'newCard'} dynamic-class-${battleCard.id} `}
            data-type={battleCard.type}
        >
            <HealthIndicator battleCard={battleCard} gridLength={gridLength}/>
            <BattleCardImage battleCard={battleCard}/>
            {/*<CardImage src={`${battleCard.image}.jpg`} data-type={battleCard.type} className={battleCard.types}/>*/}
        </BattleCard>
    </BattleCardFieldContainer>;
});

// const CardImage = styled.img`
//     max-width: ${(props: any) => props['data-type'] === 'hero' ? '100%' : '100%'};
//     max-height: ${(props: any) => props['data-type'] === 'hero' ? '100%' : '100%'};
//     border-radius: 5px;
//
//     &.portal::before {
//         content: "";
//         position: absolute;
//         width: 100%;
//         height: 100%;
//         background-image: url("portal-4.png");
//         background-size: cover;
//         -webkit-animation:spin 4s linear infinite;
//         -moz-animation:spin 4s linear infinite;
//         animation:spin 4s linear infinite;
//     }
//     @-moz-keyframes spin {
//         100% { -moz-transform: rotate(360deg); }
//     }
//     @-webkit-keyframes spin {
//         100% { -webkit-transform: rotate(360deg); }
//     }
//     @keyframes spin {
//         100% {
//             -webkit-transform: rotate(360deg);
//             transform:rotate(360deg);
//         }
//     }
// `;

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
    background-color: #e7f2fb;
    top: 0;
    z-index: 1;
    opacity: 1;


    // start border animation
    --borderWidth: 2px;

    &:after {
        content: "";
        height: calc(100% + var(--borderWidth) * 2);
        width: calc(100% + var(--borderWidth) * 2);
        background: ${(props: any) => props['data-type'] === 'hero'
                ? 'linear-gradient(60deg, #FFD700, #eae6e2, #FFD700, #eae6e2)'
                : 'linear-gradient(60deg, #eae6e2, #090707, #f1ebed, #0a080a)'};
        //background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
        background-size: 300% 300%;
        position: absolute;
        z-index: -1;
        border-radius: 5px;
        animation: animationGradient ${(props: any) => props['data-type'] === 'hero' ? '1s' : '10s'} ease alternate infinite;
    }

    @keyframes animationGradient {
        0% {
            background-position: 0% 50%;
        }
        25% {
            background-position: 25% 50%;
        }
        50% {
            background-position: 50% 75%;
        }
        75% {
            background-position: 75% 100%;
        }
        85% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 100% 0%;
        }
    }
    // finish border animation

    &.newCard {
        animation: slide-in 0.3s;
    }

    // contact card 
    &.contactItem {
        animation: hit 1s ease-in-out infinite alternate;

        &::after {
            content: "";
            width: 80%;
            height: 80%;
            //background-image: url('bloodEffect2.png');
            background-size: cover;
            position: absolute;
            display: inline-block;
            animation: fadeInFromNone 1s ease-in-out infinite alternate;
            z-index: 1;
        }

        &.contactEnemy::after {
            background-image: url('bloodEffect2.png');
            //position: absolute;
            //border: 4px solid #fcf;
            //width: 100%;
            //height: 100%;
            //opacity: 1;
            //border-radius: 50%;
            //animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

        &.contactPotion::after {
            width: 100%;
            height: 100%;
            background-image: url('potionEffect.png');
            animation: slide-up 1s ease-in-out infinite alternate;

            //content: "";
            //position: absolute;
            //border: 4px solid #807980;
            //opacity: 1;
            //border-radius: 50%;
            //animation: lds-ripple 0.6s cubic-bezier(1, 0.6, 0.8, 1) infinite;

        }
    }

    @keyframes lds-ripple {
        0% {
            top: 20%;
            left: 20%;
            width: 0;
            height: 0;
            opacity: 0;
        }
        4.9% {
            top: 20%;
            left: 20%;
            width: 20%;
            height: 20%;
            opacity: 0;
        }
        5% {
            top: 20%;
            left: 20%;
            width: 50%;
            height: 50%;
            opacity: 1;
        }
        100% {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }

    @keyframes hit {
        0% {
            transform: scale(1)
        }
        50% {
            transform: scale(.95)
        }
        100% {
            transform: scale(1)
        }
    }

    @keyframes slide-up {
        0% {
            transform: scale(0)
        }
        100% {
            transform: scale(2.5)
        }
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
        0% {
            opacity: 0
        }
        25% {
            opacity: .5
        }
        50% {
            opacity: 1
        }
        75% {
            opacity: .5
        }
        100% {
            opacity: 0
        }
    }

    // moving card
    &.hidden {
        visibility: hidden
    }

    &.moving {
        transition: transform 300ms;
    }

    // transformDuration
    &.movingHero {
        transition: transform 700ms;
    }

    //transformHeroDuration
    &.move-left {
        transform: translateX(calc(-100% - 10px))
    }

    &.move-right {
        transform: translateX(calc(100% + 10px))
    }

    &.move-top {
        transform: translateY(calc(-100% - 10px))
    }

    &.move-bottom {
        transform: translateY(calc(100% + 10px))
    }
`;

export { BattleCardField };
