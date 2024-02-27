import React, {useEffect, useState} from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal,
} from 'semantic-ui-react'
import styled from "styled-components";
import { Icon } from 'semantic-ui-react';
import {Skill} from "../types";
import BattleCardImage from "../BattleCardImage";
import {LevelIndicator} from "../LevelIndicator";
import {
    availableSkill,
    getHeroSkillsWithDecreasedSkill,
    getHeroSkillsWithIncreasedSkill,
    getHeroSkillsWithTemporaryPoints, getUpdatedBattleCardsByNewSkillLevels
} from "../utils";

const ModalLevelUp = ({
    heroCard,
    battleCards,
    setBattleCards,
    isOpen,
    setIsOpen,
}: any) => {
    const [heroSkills, setHeroSkills] = useState<Skill[]>([]);
    const [heroSkillPoints, setHeroSkillPoints] = useState<number>(0);

    useEffect(() => {
        setHeroSkills(getHeroSkillsWithTemporaryPoints(heroCard.skills));
        setHeroSkillPoints(heroCard.skillPoints);
    }, [battleCards]);

    const completePoints = () => {
        setBattleCards(getUpdatedBattleCardsByNewSkillLevels(battleCards, heroSkills));
        setIsOpen(false);
    }

    const increaseSkillLevel = (skill: Skill) => {
        const newHeroSkills = getHeroSkillsWithIncreasedSkill(skill, heroSkills, heroSkillPoints);

        setHeroSkills(newHeroSkills.skills);
        setHeroSkillPoints(newHeroSkills.leftPoints);
    }

    const decreaseSkillLevel = (skill: Skill) => {
        const newHeroSkills = getHeroSkillsWithDecreasedSkill(skill, heroSkills, heroSkillPoints);

        setHeroSkills(newHeroSkills.skills);
        setHeroSkillPoints(newHeroSkills.leftPoints);
    }

    return (
        <ModalWrapper
            dimmer={'blurring'}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={isOpen}
        >
            <ModalHeader>Level UP!</ModalHeader>
            <ModalContent>
                <p>Your current point amount - {heroSkillPoints}</p>
                {heroSkills.map((skill: Skill, index: number) => {
                    return <div className="skill-container" key={index}>
                        <div className="img-container">
                            <BattleCardImage battleCard={skill}/>
                            {skill.level ?
                                (<LevelIndicator battleCard={skill} size={5} position={{bottom: 5}}/>)
                                : <img src="lock.png" className='img-lock'/>
                            }
                        </div>
                        <div className="temporary-points">+{skill.temporaryPoints}</div>
                        {availableSkill(skill, heroSkills)
                            ? (<div className="btn-group">
                                {skill.temporaryPoints ? (
                                    <button className="btn" onClick={() => decreaseSkillLevel(skill)}>
                                        <Icon name='minus' size='big'/>
                                    </button>) : <></>
                                }

                                {heroSkillPoints ? (
                                    <button className="btn" onClick={() => increaseSkillLevel(skill)}>
                                        <Icon name='plus' size='big'/>
                                    </button>) : <></>
                                }
                            </div>) : <></>
                        }
                    </div>
                })}
            </ModalContent>
            <ModalActions>
                {heroSkillPoints ? <></> : <button className="btn" onClick={completePoints}>Complete</button>}
            </ModalActions>
        </ModalWrapper>
    )
}

const ModalWrapper = styled(Modal)`
    &&& {
        width: 700px;
        height: 700px;
        box-shadow: none;
        background-color: transparent;
        background-image: url("battle-over-modal.png");
        background-size: cover;
        padding: 100px;
        
        animation: slide-up 1s;

        @keyframes slide-up {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .header, .content, .actions {
            color: #8b0000;
            background: transparent;
            font-size: 30px;
            font-family: 'MagicalWorld';
            font-weight: bold;
        }
        
        .header {
            font-size: 50px;
            text-align: center;
        }
        
        .score {
            padding-top: 50px;
            text-align: right;
        }
        
        .btn {
            margin: 10px auto;
            width: 250px;
            letter-spacing: 2px;
            border-radius: 8px;
            font-family: 'Skranji', cursive;
            color: #ffc000;
            font-size: 18px;
            font-weight: 400;
            text-shadow: 0 1px 3px #000;
            text-align: center;
            padding: 10px 0;
            background: radial-gradient(circle, #8b0000, #8b0000);
            border-top: 4px ridge #ffb000;
            border-left: 4px groove #ffb000;
            border-right: 4px ridge #ffb000;
            border-bottom: 4px groove #ffb000;
            box-shadow: inset 0px 0px 5px 3px rgba(1,1,1,0.3);
        }

        .btn:hover{
            background: radial-gradient(circle, #e52b2b, #8b0000);
            box-shadow: 0px 0 5px 5px rgba(255,255,255,0.2)
        }

        .btn:active{
            background: radial-gradient(circle, #ec6a6a, #e52b2b);
            box-shadow: 0px 0 5px 5px rgba(255,255,255,0.2)
        }
        
        .skill-container {
            margin: 5px;
            display: flex;
            align-items: center;
            //justify-content: center;
            .img-container {
                width: 80px;
                height: 80px;
                position: relative;
                
                .img-lock {
                    width: 100%;
                    height: 100%;
                    opacity: 0.7;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
            
            .temporary-points {
                font-size: 1.5em;
                margin-left: 10px;
            }

            .btn-group {
                display: flex;
                margin-left: auto;
                .btn {
                    width: 70px;
                    height: 70px;
                    display: flex;
                    margin: 0 10px;
                    align-items: center;
                    justify-content: center;

                    i {margin: 0}
                }
            }
        }
    }
`;

export { ModalLevelUp };
