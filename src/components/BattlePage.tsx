import {useEffect, useState} from "react";
import styled from "styled-components";

import { BattleCardField } from "./BattleCardField";
import { BattleFieldLengthSwitcher } from './index';
import {TopPanel} from "./top-panel/TopPanel";
import {ModalBattleOver} from "./ModalBattleOver";
import {ModalSecretCard} from "./ModalSecretCard";
import {ModalBattleCardInfo} from "./card-info/ModalBattleCardInfo";
import {ModalLevelUp} from "./level-up/ModalLevelUp";
import {BottomPanel} from "./bottom-panel/BottomPanel";

import {
    cardHandler,
    keyDownHandler,
    getBattleCardsWithHero,
    executeMethodsAfterMoving,
} from "./utils";

import {
    useBattleCards,
    useBattleFieldLength,
    useIsProcessingAction,
    useIsOpenBattleOverModal,
    useIsOpenLevelUpModal,
    useSelectedCardForInfo,
    useSelectedSecretCard,
    useIsMoving,
    useCharacter,
    useIsAnotherPlayerActive,
} from '../store/storeHooks';
import mixins from "../mixins";

const BattlePage = () => {
    const { character } = useCharacter();
    const { heroCard, battleCards, setBattleCards } = useBattleCards(character.nickname);
    const { selectedCardForInfo } = useSelectedCardForInfo();
    const { selectedSecretCard } = useSelectedSecretCard();
    const { isOpenBattleOverModal } = useIsOpenBattleOverModal();
    const { isOpenLevelUpModal, setIsOpenLevelUpModal } = useIsOpenLevelUpModal();

    const { isProcessingAction, setIsProcessingAction } = useIsProcessingAction(); // block/unblock extra click action
    const { isAnotherPlayerActive } = useIsAnotherPlayerActive();

    const { isMoving } = useIsMoving();

    const { battleFieldLength } = useBattleFieldLength();

    useEffect(() => {
        if (battleCards.length && !isMoving) {
            executeMethodsAfterMoving();
        }
    }, [isMoving]);

    useEffect(() => {
        if (battleFieldLength && battleCards.length === 0) {
            setBattleCards(getBattleCardsWithHero());
        }
    }, [battleFieldLength]);

    useEffect(() => {
        // @ts-ignore
        if (battleCards.length) {
            document.addEventListener('keydown', onKeyDown);

            return () => {
                // @ts-ignore
                document.removeEventListener('keydown', onKeyDown);
            }
        }
    }, [battleCards, isProcessingAction]);

    useEffect(() => {
        // TODO: move this logic to executeMethodsAfterMoving
        if (heroCard?.skillPoints) {
            setIsOpenLevelUpModal(true);
        }
    }, [heroCard]);

    const onCardClick = (selectedCardIndex: number) => {
        if (isProcessingAction || isAnotherPlayerActive) return;
        setIsProcessingAction(true);

        cardHandler(selectedCardIndex);
    };

    const onKeyDown = (e: any): void => {
        e.stopPropagation();

        if (isProcessingAction || isAnotherPlayerActive) return;
        setIsProcessingAction(true);

        const selectedCardIndex = keyDownHandler(e.key);
        cardHandler(selectedCardIndex);
    };

    return <BattlePageContainer>
        <BattleFieldLengthSwitcher />
        {battleCards.length && (<>
            <TopPanel />

            <BattleField className={isAnotherPlayerActive ? "test-isAnotherPlayerActive" : ""}>
                {
                    battleCards.map((battleCard: any, index: number) => {
                        return <BattleCardField
                            onCardClick={onCardClick}
                            battleCard={battleCard}
                            key={index}
                        />
                    })
                }
            </BattleField>

            <BottomPanel />

            {isOpenBattleOverModal && <ModalBattleOver />}
            {isOpenLevelUpModal && <ModalLevelUp />}
            {!!selectedSecretCard && <ModalSecretCard />}
            {!!selectedCardForInfo && <ModalBattleCardInfo />}
        </>)}
    </BattlePageContainer>
};

const BattlePageContainer = styled.div`
    ${mixins.stretchedBackground};

    width: 700px;
    height: calc(100% - 40px);
    padding: 100px 20px 20px 20px;
    background-image: url("img/main-bg.jpg");
    //background-size: cover;
`;

const BattleField = styled.div`
    width: 700px;
    height: 700px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    position: relative;

    &.test-isAnotherPlayerActive {
        box-shadow: 0 0 5px 5px #61dafb;
    }
`;

export { BattlePage };
