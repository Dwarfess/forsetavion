import React, {MouseEventHandler, useEffect, useState} from 'react';
import styled from "styled-components";
import {
    getActiveSkill,
    getSkillClasses,
    getCardSkills,
    updateBattleCardsWithSelectedSkill
} from '../utils';
import {Skill} from "../types";
import BattleCardImage from "../BattleCardImage";
import {
    useBattleCards,
    useCharacter,
    useIsAnotherPlayerActive,
    useIsProcessingAction,
    useSelectedCardForInfo
} from '../../store/storeHooks';

const SkillPanel = () => {
    const { character } = useCharacter();
    const { heroCard, battleCards } = useBattleCards(character.nickname);
    const { setSelectedCardForInfo } = useSelectedCardForInfo();
    const { isProcessingAction } = useIsProcessingAction();
    const { isAnotherPlayerActive } = useIsAnotherPlayerActive();

    const [activeSkill, setActiveSkill] = useState<any>(null);

    useEffect(() => {
        setActiveSkill(getActiveSkill(heroCard));
    }, [battleCards]);

    const onItemClick = (selectedSkill: Skill) => {
        if (isProcessingAction || isAnotherPlayerActive) return;
        updateBattleCardsWithSelectedSkill(selectedSkill);
    }

    const onCardRightClick = (e: any, skill: Skill) => {
        e.preventDefault();
        if (isProcessingAction) return;

        setSelectedCardForInfo(skill);
    };

    return (
        <SkillPanelWrapper>
            {getCardSkills(heroCard).map((skill: Skill, index: number) => {
                return  <div
                    className={`skill-item-wrapper ${getSkillClasses(skill, activeSkill)}`}
                    onClick={() => onItemClick(skill)}
                    onContextMenu={(e: any) => onCardRightClick(e, skill)}
                    key={index}
                >
                    <div className="skill-item">
                        <BattleCardImage battleCard={skill} radius={50}/>
                        <img src="img/lock.png" className='img-lock'/>
                    </div>
                    {skill.coolDown ? <span className="count-value">{skill.coolDown}</span> : <></>}
                </div>
            })}
        </SkillPanelWrapper>
    )
};

const SkillPanelWrapper = styled.div`
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    font-size: 5em;
    font-family: 'MagicalWorld';
    color: rgba(0, 0, 0, 0.4);
    font-weight: bold;

    .skill-item-wrapper {
        position: relative;
        margin: 10px;
        width: 100px;
        height: 100px;

        overflow: hidden;
        border-radius: 50px;
        padding: 2px;
        cursor: pointer;
        box-shadow: 0 0 3px 0 black;

        //&:not(.disabled):active {
        //    transform: scale(0.95)
        //}

        &.disabled, &.block {
            pointer-events: none;
            cursor: inherit;
            
            .skill-item img {opacity: 0.4}
        }
        
        &.block {
            .img-lock {
                display: block !important;
            }
        } 

        &.active {
            animation: pulseSkill 2s ease infinite;

            @keyframes pulseSkill {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                    background: rgb(217, 12, 12);
                }
                100% {
                    transform: scale(1);
                }
            }
        }

        .count-value {
            position: absolute;
            top: 0;
            height: 100px;
            width: 100px;
            line-height: 100px;
            text-align: center;
            text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3;
        }

        .skill-item {
            display: flex;
            margin: auto;
            align-items: center;
            justify-content: center;

            position: relative;

            .img-lock {
                display: none;
                width: 100%;
                height: 100%;
                opacity: 0.7;
                position: absolute;
                top: 0;
                left: 0;
            }

            --borderWidth: 1px;

            &:before {
                content: "";
                height: calc(100% + var(--borderWidth) * 1);
                width: calc(100% + var(--borderWidth) * 1);
                background-image: conic-gradient(transparent, #efe9eb);
                background-size: 100% 100%;
                position: absolute;
                z-index: -2;
                animation: animate 4s linear infinite;
            }

            &:after {
                content: "";
                height: calc(100% + var(--borderWidth) * 1);
                width: calc(100% + var(--borderWidth) * 1);
                background-image: conic-gradient(transparent,
                transparent,
                transparent,
                transparent,
                #317da1);
                background-size: 200% 200%;
                position: absolute;
                z-index: -2;
                animation: animate 4s linear infinite;
            }

            @keyframes animate {
                0% {
                    transform: rotate(0deg)
                }
                25% {
                    transform: rotate(90deg)
                }
                50% {
                    transform: rotate(180deg)
                }
                75% {
                    transform: rotate(270deg)
                }
                100% {
                    transform: rotate(360deg)
                }
            }
        }
    }
`;

export { SkillPanel };
