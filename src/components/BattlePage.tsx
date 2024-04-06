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
    getHeroCard
} from "./utils";

import {
    useBattleCards,
    useBattleFieldLength,
    useHeroCard,
    useIsMoving,
    useIsOpenBattleOverModal,
    useIsOpenLevelUpModal,
    useSelectedCardForInfo,
    useSelectedSecretCard
} from "../store/storeHooks";

const BattlePage = () => {
    // const [battleCards, setBattleCards] = useState<any[]>([]);
    const { battleCards, setBattleCards } = useBattleCards();
    const { selectedCardForInfo, setSelectedCardForInfo } = useSelectedCardForInfo();
    const { selectedSecretCard } = useSelectedSecretCard();
    const { isOpenBattleOverModal } = useIsOpenBattleOverModal();
    const { isOpenLevelUpModal, setIsOpenLevelUpModal } = useIsOpenLevelUpModal();

    const { isMoving, setIsMoving } = useIsMoving(); // block/unblock extra click

    const { battleFieldLength } = useBattleFieldLength();
    const { heroCard, setHeroCard } = useHeroCard();

    useEffect(() => {
        battleFieldLength && setBattleCards(getBattleCardsWithHero());
    }, [battleFieldLength]);

    useEffect(() => {
        if (battleCards.length) {
            setHeroCard(getHeroCard(battleCards));
        }
    }, [battleCards]);

    useEffect(() => {
        // @ts-ignore
        if (battleCards.length) {
            document.addEventListener('keydown', onKeyDown);

            return () => {
                // @ts-ignore
                document.removeEventListener('keydown', onKeyDown);
            }
        }
    }, [battleCards, isMoving]);

    useEffect(() => {
        if(heroCard?.skillPoints) {
            setIsOpenLevelUpModal(true);
        }
    }, [heroCard]);

    const onCardClick = (selectedCardIndex: number) => {
        if (isMoving) return;

        setIsMoving(true);
        cardHandler(
            selectedCardIndex,
            battleCards,
            setBattleCards,
        );
    };

    const onCardRightClick = (selectedCardIndex: number) => {
        if (isMoving) return;
        setSelectedCardForInfo(battleCards[selectedCardIndex]);
    };

    //TODO needs to be handle double method (like onCardClick)
    const onKeyDown = (e: any): void => {
        if (isMoving) return;

        setIsMoving(true);
        e.stopPropagation();
        const selectedCardIndex = keyDownHandler(e.key);

        cardHandler(
            selectedCardIndex,
            battleCards,
            setBattleCards,
        );
    };

    return <>
        <BattleFieldLengthSwitcher />
        {!!battleFieldLength && heroCard && (<>
            <TopPanel />

            <BattleField>
                {
                    battleCards.map((battleCard: any, index: number) => {
                        return <BattleCardField
                            onCardClick={onCardClick}
                            onCardRightClick={onCardRightClick}
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
    </>
};

const BattleField = styled.div`
    width: 700px;
    height: 700px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    margin: 30px;
`;

export { BattlePage };
