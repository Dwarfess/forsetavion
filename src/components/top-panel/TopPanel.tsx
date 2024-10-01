import React from 'react'
import { Progress } from 'semantic-ui-react'
import styled from "styled-components";
import {getBossPartProgress, getMaxExpForCurrentLever} from "../utils/recalculateHeroStats";
import {ordinaryBossPartsCount} from "../constants";
import {useActivePage, useBattleCards, useBattleFieldLength} from "../../store/storeHooks";

const TopPanel = () => {
    // const { setActivePage } = useActivePage();
    const { heroCard } = useBattleCards();
    // const { setBattleFieldLength } = useBattleFieldLength();

    // const onExitButtonClick = () => {
    //     setBattleCards([]);
    //     setBattleFieldLength(0);
    //     setActivePage('game-selection-page');
    // }

    return (
        <TopPanelWrapper>
            <div className="top-side">
                <LevelBar>
                    <img src="img/icon-level.png" className="level-icon"/>
                    <div className="level-value">{heroCard.level}</div>
                    <Progress value={heroCard.exp} total={getMaxExpForCurrentLever(heroCard)} progress='ratio' indicating />
                </LevelBar>
                <CoinsBar>
                    <img src="img/icon-coins.png" className="coins-icon"/>
                    <div className="coins-value">{heroCard.coins}</div>
                </CoinsBar>
                <CoinsBar>
                    <img src="img/icon-sphere.png" className="coins-icon"/>
                    <div className="spheres-value">{heroCard.spheres}</div>
                </CoinsBar>
                {/*<ExitButton onClick={onExitButtonClick}>Exit</ExitButton>*/}
            </div>

            <div className="bottom-side">
                <BossBar>
                    {heroCard.bossParts === ordinaryBossPartsCount && (<div className="boss-icon-background"></div>)}
                    <img src="img/icon-boss.png" className="boss-icon"/>
                    <div className="boss-parts">
                        <Progress percent={getBossPartProgress(heroCard, 1)} indicating />
                        <Progress percent={getBossPartProgress(heroCard, 2)} indicating />
                        <Progress percent={getBossPartProgress(heroCard, 3)} indicating />
                        <Progress percent={getBossPartProgress(heroCard, 4)} indicating />
                        <Progress percent={getBossPartProgress(heroCard, 5)} indicating />
                    </div>
                </BossBar>
            </div>
        </TopPanelWrapper>
    )
};

const TopPanelWrapper = styled.div`
    margin: 10px 0;
    width: 100%;
    font-family: 'MagicalWorld';
    
    .top-side, .bottom-side {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: max-content;
        position: relative;
    }
`;
//
// const ExitButton = styled.div`
//     width: 120px;
//     background-color: rgba(0, 0, 0, .4);
//     position: absolute;
//     right: -20px;
//
//     line-height: 60px;
//     text-align: center;
//     font-size: 25px;
//     font-weight: bold;
//     color: #494117;
//     text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
//     text-transform: uppercase;
//     cursor: pointer;
//     user-select: none;
//
//     border-top-left-radius: 5px;
//     border-bottom-left-radius: 5px;
//
//     //&:hover { box-shadow: 0px 0px 20px 0px black }
//     //&:active { box-shadow: none }
// `;

const BossBar = styled.div`
    position: relative;
    order: 1;
    height: 60px;
    
    .boss-icon {
        width: 60px;
        height: 60px;
        z-index: 1;
        position: absolute;
    }
    
    .boss-icon-background {
        position: absolute;
        margin: 5px;
        width: 50px;
        border-radius: 50px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        animation: backgroundAnimation 4s infinite linear;
        z-index: 0;

        @keyframes backgroundAnimation {
            0%, 100% {
                background-color: red;
            }
            50% {
                background-color: black;
            }
        }
    }
    
    .boss-parts {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        margin-left: 55px;
        width: 250px;

        .ui.progress {
            //margin: 5px;
            width: 17%;
            height: max-content;
            margin: 17px 0 0 5px;
            box-shadow: 0px 0px 10px 3px #0e344d;
            background: rgba(255, 255, 255, .3);
            
            .bar {
                background-color: #8b0000 !important;
                min-width: 0;
            }
        }
    }
`;

const LevelBar = styled.div`
    display: flex;
    position: relative;
    
    .level-icon {
        width: 60px;
        height: 60px;
        z-index: 1;
    }

    .level-value {
        position: absolute;
        height: 60px;
        width: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #0f3e5b;
        text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
        z-index: 2;
    }

    .ui.progress {
        width: 250px;
        height: max-content;
        margin: 17px 0 0 -7px;
        box-shadow: 0px 0px 10px 3px #0e344d;
        background: rgba(255, 255, 255, .3);

        .bar {
            background-color: #0f3e5b !important;
            min-width: 0;
        }

        .progress {
            position: absolute;
            left: 100px;
            text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
            font-weight: 400;
            font-size: 20px;
        }
    }
`;

const CoinsBar = styled.div`
    display: flex;
    position: relative;
    width: 60px;
    align-items: center;
    justify-content: center;

    .coins-icon {
        width: 60px;
        z-index: 1;
    }

    .coins-value, .spheres-value {
        position: absolute;
        height: 60px;
        width: 100%;
        max-width: 100%;
        padding-top: 18px;
        line-height: 60px;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #494117;
        text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
        z-index: 2;
        order: 3;
    }
`;

export { TopPanel };
