import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {
    getHeroCard,
    getActiveSkill,
    getCardSkills,
    getSkillClasses,
    getUpdatedBattleCardsWithSkills
} from "../utils";
import {Skill} from "../types";
import BattleCardImage from "../BattleCardImage";

const SkillPanel = ({
    battleCards,
    setBattleCards
}: any) => {
    const [activeSkill, setActiveSkill] = useState<any>(null);

    const onItemClick = (selectedSkill: Skill) => {
        setBattleCards(getUpdatedBattleCardsWithSkills(battleCards, selectedSkill));
    }

    useEffect(() => {
        setActiveSkill(getActiveSkill(getHeroCard(battleCards)));
    }, [battleCards])

    return (
        <SkillPanelWrapper>
            {getCardSkills(battleCards, 'hero').map((skill: Skill, index: number) => {
                return  <div
                    className={`skill-item-wrapper ${getSkillClasses(skill, activeSkill)}`}
                    onClick={() => onItemClick(skill)}
                    key={index}
                >
                    <div className="skill-item">
                        <BattleCardImage battleCard={skill} radius={50}/>
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

        &:not(.disabled):active {
            transform: scale(0.95)
        }

        &.disabled {
            pointer-events: none;
            cursor: inherit;
            
            .skill-item {opacity: 0.4}
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
