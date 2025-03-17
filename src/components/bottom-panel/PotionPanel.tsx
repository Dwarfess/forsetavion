import React from 'react';
import styled from "styled-components";
import BattleCardImage from "../BattleCardImage";
import {
    useBattleCards,
    useCharacter,
    useIsAnotherPlayerActive,
    useIsProcessingAction,
    useSelectedCardForInfo
} from '../../store/storeHooks';
import { IPotion } from '../home-map/character-page/types';
import { applySelectedPotion } from './potionUtils';

const PotionPanel = () => {
    const { character } = useCharacter();
    const { heroCard, battleCards } = useBattleCards(character.nickname);
    const { setSelectedCardForInfo } = useSelectedCardForInfo();
    const { isProcessingAction } = useIsProcessingAction();
    const { isAnotherPlayerActive } = useIsAnotherPlayerActive();

    const onItemClick = (selectedPotion: IPotion) => {
        if (isProcessingAction || isAnotherPlayerActive || !selectedPotion) return;
        applySelectedPotion(selectedPotion);
    }

    const onCardRightClick = (e: any, selectedPotion: IPotion) => {
        e.preventDefault();
        if (isProcessingAction || !selectedPotion) return;

        setSelectedCardForInfo(selectedPotion);
    };

    return (
        <PotionPanelWrapper>
            {Array(4).fill(null).map((_, index: number) => {
                const isBlocked = index > ((character.inventory.potionLimit || 1) - 1);
                const potion: IPotion = heroCard.selectedPotions?.[index];

                return  <div
                    className={`potion-item-wrapper ${isBlocked ? 'block' : ''} ${!potion ? 'disabled' : ''}`}
                    onClick={() => onItemClick(potion)}
                    onContextMenu={(e: any) => onCardRightClick(e, potion)}
                    key={index}
                >
                    <div className={`potion-item potion-item-${potion?.index}`}>
                        {potion && <BattleCardImage battleCard={potion} radius={50} format={'png'}/>}
                        <img src="img/lock.png" className='img-lock'/>
                    </div>
                </div>
            })}
        </PotionPanelWrapper>
    )
};

const PotionPanelWrapper = styled.div`
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

    .potion-item-wrapper {
        position: relative;
        margin: 10px;
        width: 100px;
        height: 100px;

        overflow: hidden;
        padding: 2px;
        cursor: pointer;
        border-radius: 50px;
        box-shadow: 0 0 3px 0 black;

        &.block {
            pointer-events: none;
            cursor: inherit;
            
            .potion-item { opacity: 0.4 }
            .img-lock { display: block !important}
        }
        
        &.disabled {
            pointer-events: none;
            cursor: inherit;
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

        .potion-item {
            display: flex;
            margin: auto;
            align-items: center;
            justify-content: center;
            height: 100%;
            position: relative;

            &.active {
                animation: potionClickEffect 1.6s forwards;
            }

            @keyframes potionClickEffect {
                0% {
                    transform: scale(1);
                    //opacity: 1;
                }
                30% {
                    transform: scale(1.1);
                    opacity: 1;
                }
                100% {
                    transform: scale(0.5);
                    opacity: 0; 
                }
            }

            .img-lock {
                display: none;
                width: 100%;
                height: 100%;
                opacity: 0.7;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }
`;

export { PotionPanel };
