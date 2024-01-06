import React from 'react'
import { Progress } from 'semantic-ui-react'
import styled from "styled-components";
import {BattleCardType, HeroBattleCardType} from "../types";
import {getMaxExpForCurrentLever} from "../recalculateHeroStats";


const TopPanel = ({heroCard}: { heroCard: HeroBattleCardType }) => {
    return (
        <TopPanelWrapper>
            <LevelBar>
                <img src="icon-level.png" className="level-icon"/>
                <div className="level-value">{heroCard.level}</div>
                <Progress value={heroCard.exp} total={getMaxExpForCurrentLever(heroCard)} progress='ratio' indicating />
            </LevelBar>
            <CoinsBar>
                <img src="icon-coins.png" className="coins-icon"/>
                <div className="coins-value">{heroCard.coins}</div>
                {/*<div className="coins-value2">{heroCard.coins}</div>*/}
            </CoinsBar>
            <CoinsBar>
                <img src="icon-crystals.png" className="coins-icon"/>
                <div className="coins-value">{heroCard.coins}</div>
                {/*<div className="coins-value2">{heroCard.coins}</div>*/}
            </CoinsBar>
            <CoinsBar>
                <img src="icon-spheres.png" className="coins-icon"/>
                <div className="coins-value">{heroCard.coins}</div>
                {/*<div className="coins-value2">{heroCard.coins}</div>*/}
            </CoinsBar>
        </TopPanelWrapper>
    )
};

const TopPanelWrapper = styled.div`
    margin: 10px 30px;
    display: flex;
    width: 700px;
    font-family: 'MagicalWorld';
`;

const LevelBar = styled.div`
    display: flex;
    position: relative;
    
    .level-icon {
        width: 60px;
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
        box-shadow: 0px 0px 10px 1px #0e344d;

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
    width: 200px;
    align-items: center;
    justify-content: center;

    .coins-icon {
        width: 60px;
        z-index: 1;
    }

    .coins-value {
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
    
    .coins-value2 {
        width: max-content;
        height: max-content;
        margin: 17px 0 0 -7px;
        box-shadow: 0px 0px 10px 1px #0e344d;
        font-weight: 400;
        font-size: 20px;
        color: rgba(255,255,255,.7);
        text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
        order: 1;
        padding: 2.8px 10px;
        margin-right: -10px;
        border-radius: 5px;
        background-color: rgb(161 147 44 / 70%)
    }
`;

export { TopPanel };