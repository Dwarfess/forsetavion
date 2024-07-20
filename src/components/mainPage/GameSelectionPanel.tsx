import React from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { useBattleFieldLength } from "../../store/storeHooks";

const GameSelectionPanel = () => {
    // const navigate = useNavigate();
    const { battleFieldLength, setBattleFieldLength } = useBattleFieldLength();

    const onButtonClick = (val: number)=> {
        setBattleFieldLength(val);
        // navigate("/battle")
    }

    return <GameSelectionPanelContainer>
        <GameSelectionButton onClick={() => onButtonClick(3)}>3x3</GameSelectionButton>
        <GameSelectionButton onClick={() => onButtonClick(4)}>4x4</GameSelectionButton>
        <GameSelectionButton onClick={() => onButtonClick(5)}>5x5</GameSelectionButton>
    </GameSelectionPanelContainer>
}

const GameSelectionPanelContainer = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
`;

const GameSelectionButton = styled.div`
    background-image: url("game-selection-button2.png");
    background-size: cover;
    width: 100px;
    height: 100px;
    border-radius: 150px;
    margin: 30px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1b4041;
    text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
    font-family: 'Skranji', cursive;
    font-size: 30px;
    font-weight: 700;
    box-shadow: 0px 0px 10px 0px black;
    cursor: pointer;
    user-select: none;
    
    &:hover { box-shadow: 0px 0px 20px 0px black }
    &:active { box-shadow: none }
`;

export { GameSelectionPanel };
