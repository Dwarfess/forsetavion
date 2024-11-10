import styled from "styled-components";

import {Music} from "./Music";
import {Options} from "./Options";
import mixins from "../../mixins";
import React from "react";
import {useActivePage, useBattleCards, useBattleFieldLength, useIsProcessingAction} from "../../store/storeHooks";

const GeneralHeader = () => {
    const {setActivePage} = useActivePage();
    const {setBattleCards} = useBattleCards();
    const {setBattleFieldLength} = useBattleFieldLength();
    const {setIsProcessingAction} = useIsProcessingAction();

    const onExitButtonClick = () => {
        setBattleCards([]);
        setBattleFieldLength(0);
        setIsProcessingAction(false);
        setActivePage('game-selection-page');
    }

    return <GeneralHeaderContainer>
        {/*<Music />*/}
        <Options/>
        {/*<h2>Sertavion</h2>*/}

        <ExitButton onClick={onExitButtonClick}>Exit</ExitButton>
    </GeneralHeaderContainer>

}

const GeneralHeaderContainer = styled.div`
    ${mixins.flexBetween}

    width: 740px;
    height: 100px;

    position: fixed;
    //border-bottom: 1px solid grey;
    //background-color: rgba(0, 0, 0, .3);
    box-sizing: border-box;
    //box-shadow: 0 0 4px 0 black;

    h2 {
        ${mixins.standardH2}

        font-size: 70px;
    }
`;

const ExitButton = styled.div`
    width: 120px;
    background-color: rgba(0, 0, 0, .4);
    //position: absolute;
    //right: -20px;

    line-height: 60px;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: #494117;
    text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    transition: transform .3s ease-in-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }

    //&:hover { box-shadow: 0px 0px 20px 0px black }
    //&:active { box-shadow: none }
`;

export {GeneralHeader};
