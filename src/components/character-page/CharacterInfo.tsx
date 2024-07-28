import React, {ReactNode, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useActivePage, useCharacter} from "../../store/storeHooks";

interface ICharacterPanel {}

const CharacterInfo: React.FC<ICharacterPanel> = () => {
    const { setActivePage } = useActivePage();
    const { character, setCharacter } = useCharacter();
    const [ nicknameEditMode, setNicknameEditMode ] = useState(false);

    const editableRef = useRef(null);

    const toggleNicknameEditMode = (state: boolean) => setNicknameEditMode(state);

    const clickEditButton = () => {
        toggleNicknameEditMode(true);
    }

    const clickApplyButton = () => {
        // @ts-ignore
        setCharacter({ ...character, nickname: editableRef.current?.innerHTML });
        toggleNicknameEditMode(false);
    }

    const clickCancelButton = () => {
        // @ts-ignore
        editableRef.current.innerHTML = character.name;
        toggleNicknameEditMode(false);
    }

    return (
        <CharacterInfoContainer>
            <div className="info-item nickname-wrapper">
                <h2
                    className={nicknameEditMode ? "nickname-edit-mode nickname" : "nickname"}
                    ref={editableRef}
                    suppressContentEditableWarning={true}
                    contentEditable={nicknameEditMode}
                >
                    {character.nickname}
                </h2>

                {!nicknameEditMode && <button className="btn" onClick={clickEditButton}>✎</button>}
                {nicknameEditMode && <button className="btn" onClick={clickApplyButton}>✔</button>}
                {nicknameEditMode && <button className="btn" onClick={clickCancelButton}>✖</button>}
            </div>
            <div className="info-item">
                <p className="info-item-title">Hero: </p>
                <div className="img-bar">
                    <div className="img-value">{character.hero.name}</div>
                    <img src={`${character.hero.image}.jpg`} className="img-icon"/>
                </div>
            </div>
            <div className="info-item">
                <p className="info-item-title">Coins: </p>
                <div className="img-bar">
                    <div className="img-value">{character.coins}</div>
                    <img src="icon-coins.png" className="img-icon"/>
                </div>
            </div>
            <div className="info-item">
                <p className="info-item-title">Spheres: </p>
                <div className="img-bar">
                    <div className="img-value">{character.spheres}</div>
                    <img src="icon-sphere.png" className="img-icon"/>
                </div>
            </div>
            <div className="info-item">
                <p className="info-item-title">Score: </p>
                <div className="img-bar">
                    <div className="img-value">{character.score}</div>
                    <img src="icon-score6.png" className="img-icon"/>
                </div>
            </div>

            <div className="play-game-button" onClick={() => setActivePage('game-selection-page')}></div>
        </CharacterInfoContainer>
    )
}

const CharacterInfoContainer = styled.div`
    position: relative;
    
    .info-item {
        display: flex;
        align-items: center;

        &.nickname-wrapper {
            height: 100px;
            
            .nickname {
                font-family: 'MagicalWorld';
                font-size: 70px;
                font-weight: bold;
                line-height: 70px;
                color: #494117;
                text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
                
                &.nickname-edit-mode {
                    //width: max-content;
                    //font-size: 50px;
                    background-color: rgba(0, 0, 0, .2);
                    caret-color: #494117;
                    border: 3px solid #8b0000;
                    border-radius: 5px;
                    outline: none;
                }
            }

            .btn {
                margin-left: 10px;
                width: 40px;
                height: 35px;
                letter-spacing: 2px;
                border-radius: 8px;
                font-family: 'Skranji', cursive;
                color: #ffc000;
                font-size: 25px;
                font-weight: 400;
                text-shadow: 0 1px 3px #000;
                text-align: center;
                //padding: 10px 0;
                background: radial-gradient(circle, #8b0000, #8b0000);
                border-top: 4px ridge #ffb000;
                border-left: 4px groove #ffb000;
                border-right: 4px ridge #ffb000;
                border-bottom: 4px groove #ffb000;
                box-shadow: inset 0px 0px 5px 3px rgba(1, 1, 1, 0.3);
                z-index: 1;

                &:hover {
                    background: radial-gradient(circle, #e52b2b, #8b0000);
                    box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
                }

                &:active {
                    background: radial-gradient(circle, #ec6a6a, #e52b2b);
                    box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
                }
            }
        }
        
        .hero-icon {
            width: 40px;
            border-radius: 5px;
            margin-right: 10px;
        }
        
        .hero-name {
            font-size: 40px;
            font-weight: bold;
            color: #8b0000;
            padding: 5px;
        }
        
        .info-item-title {
            //width: 100px;
            margin: 0 20px 0 0;
            //padding-right: 20px;
            font-size: 30px;
            font-weight: bold;
            color: #8b0000;
        }

        .img-bar {
            display: flex;
            //position: relative;
            //width: 30px;
            align-items: center;
            justify-content: center;

            .img-icon {
                width: 35px;
                margin-left: 10px;
                //z-index: 1;
            }

            .img-value {
                font-size: 35px;
                font-weight: bold;
                color: #494117;
                text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
            }
        }
    }
    
    .play-game-button {
        width: 150px;
        height: 150px;
        background-image: url("play-game-button.png");
        background-size: cover;
        opacity: .5;
        position: absolute;
        top: calc(50% - 50px);
        right: 10px;
        border-radius: 200px;
        box-shadow: 0 0 20px 5px black;
        cursor: pointer;
        
        &:hover { box-shadow: 0 0 10px 10px black }
        &:active { box-shadow: 0 0 10px 1px black }
    }
`;

export { CharacterInfo };
