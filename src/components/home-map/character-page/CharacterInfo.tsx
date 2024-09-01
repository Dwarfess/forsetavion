import React, { useRef, useState} from 'react';
import styled from 'styled-components';

import { useCharacter } from '../../../store/storeHooks';
import mixins from '../../../mixins';

interface ICharacterPanel {}

const CharacterInfo: React.FC<ICharacterPanel> = () => {
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
        editableRef.current.innerHTML = character.nickname;
        toggleNicknameEditMode(false);
    }

    return (
        <CharacterInfoContainer>
            <div className="item-info nickname-wrapper">
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
            <div className="item-info">
                <p className="item-title">Hero: </p>
                <div className="item-icon-wrapper">
                    <div className="item-value">{character.hero.name}</div>
                    <img src={`${character.hero.image}.jpg`} className="item-icon"/>
                </div>
            </div>
            <div className="item-info">
                <p className="item-title">Coins: </p>
                <div className="item-icon-wrapper">
                    <div className="item-value">{character.coins}</div>
                    <img src="icon-coins.png" className="item-icon"/>
                </div>
            </div>
            <div className="item-info">
                <p className="item-title">Spheres: </p>
                <div className="item-icon-wrapper">
                    <div className="item-value">{character.spheres}</div>
                    <img src="icon-sphere.png" className="item-icon"/>
                </div>
            </div>
            <div className="item-info">
                <p className="item-title">Score: </p>
                <div className="item-icon-wrapper">
                    <div className="item-value">{character.score}</div>
                    <img src="icon-score6.png" className="item-icon"/>
                </div>
            </div>
        </CharacterInfoContainer>
    )
}

const CharacterInfoContainer = styled.div`
    position: relative;
    
    .item-info {
        ${mixins.flexStart}

        &.nickname-wrapper {
            height: 100px;
            
            .nickname {
                ${mixins.standardH2}
                
                font-size: 70px;
                line-height: 70px;
                
                &.nickname-edit-mode {
                    background-color: rgba(0, 0, 0, .2);
                    caret-color: #494117;
                    border: 3px solid #8b0000;
                    border-radius: 5px;
                    outline: none;
                }
            }

            .btn {
                ${mixins.classicBtn};

                margin-left: 10px;
                width: 40px;
            }
        }
        
        .hero-icon {
            width: 40px;
            border-radius: 5px;
            margin-right: 10px;
        }
        
        .item-title {
            margin: 0 20px 0 0;
            font-size: 30px;
            font-weight: bold;
            color: #8b0000;
        }

        .item-icon-wrapper {
            ${mixins.flexCenter}

            .item-icon {
                width: 35px;
                margin-left: 10px;
            }

            .item-value {
                ${mixins.firstTextColor}
                
                font-size: 35px;
                font-weight: bold;
            }
        }
    }
`;

export { CharacterInfo };
