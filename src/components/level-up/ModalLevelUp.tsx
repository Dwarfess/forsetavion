import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Icon } from 'semantic-ui-react';
import {Skill} from "../types";
import BattleCardImage from "../BattleCardImage";
import { LevelIndicator } from "../LevelIndicator";
import {
    availableSkill,
    getHeroSkillsWithDecreasedSkill,
    getHeroSkillsWithIncreasedSkill,
    getHeroSkillsWithTemporaryPoints,
    updateBattleCardsByNewSkillLevels
} from "../utils";
import {useBattleCards, useIsProcessingAction, useIsOpenLevelUpModal, useSelectedCardForInfo} from "../../store/storeHooks";
import { ModalX } from "../shared";

const ModalLevelUp = () => {
    const { setIsOpenLevelUpModal } = useIsOpenLevelUpModal();
    const { setSelectedCardForInfo } = useSelectedCardForInfo();
    const { isProcessingAction } = useIsProcessingAction();
    const { heroCard } = useBattleCards();

    const [heroSkills, setHeroSkills] = useState<Skill[]>([]);
    const [heroSkillPoints, setHeroSkillPoints] = useState<number>(0);

    useEffect(() => {
        setHeroSkills(getHeroSkillsWithTemporaryPoints(heroCard.skills));
        setHeroSkillPoints(heroCard.skillPoints);
    }, [heroCard]);

    const completePoints = () => {
        updateBattleCardsByNewSkillLevels(heroSkills);
        setIsOpenLevelUpModal(false);
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

    const onCardRightClick = (e: any, skill: Skill) => {
        e.preventDefault();
        if (isProcessingAction) return;

        setSelectedCardForInfo(skill);
    };

    return (
        <ModalX>
            <ModalXContainer>
                <div className="header">Level UP!</div>
                <div className="content">
                    <p>Your current point amount - {heroSkillPoints}</p>
                    {heroSkills.map((skill: Skill, index: number) => {
                        return <div className="skill-container" key={index} onContextMenu={(e: any) => onCardRightClick(e, skill)}>
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
                </div>
                <div className="actions">
                    {heroSkillPoints ? <></> : <button className="btn" onClick={completePoints}>Complete</button>}
                </div>
            </ModalXContainer>
        </ModalX>
    );
}

const ModalXContainer = styled.div`
    .header {
        font-size: 50px;
        text-align: center;
    }
        
    .skill-container {
        margin: 5px;
        display: flex;
        align-items: center;
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
`;

export { ModalLevelUp };
