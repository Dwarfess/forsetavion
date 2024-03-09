import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import styled from "styled-components";
import { BattleCardField } from "./BattleCardField";
import { BattleFieldLengthSwitcher } from './index';
import {TopPanel} from "./top-panel/TopPanel";
import {ModalBattleOver} from "./ModalBattleOver";
import {ModalSecretCard} from "./ModalSecretCard";
import {ModalBattleCardInfo} from "./card-info/ModalBattleCardInfo";
import {BottomPanel} from "./bottom-panel/BottomPanel";
import {
    cardHandler,
    keyDownHandler,
    getBattleCardsWithHero,
    getHeroCard
} from "./utils";
import {ModalLevelUp} from "./level-up/ModalLevelUp";
import {useBattleFieldLength, useHeroCard, useIsOpenBattleOverModal, useSelectedCardForInfo} from "../store/storeHooks";

const BattlePage = () => {
    const [battleCards, setBattleCards] = useState<any[]>([]);
    const { selectedCardForInfo, setSelectedCardForInfo } = useSelectedCardForInfo();
    const { isOpenBattleOverModal } = useIsOpenBattleOverModal();

    const [isMoving, setIsMoving] = useState(false); // block/unblock extra click
    const [isOpenSecretModal, setIsOpenSecretModal] = useState(false);
    const [isOpenLevelUpModal, setIsOpenLevelUpModal] = useState(false);

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
            setIsMoving,
            setIsOpenSecretModal
        );
    };

    const onCardDoubleClick = (selectedCardIndex: number) => {
        if (isMoving) return;
        setSelectedCardForInfo(battleCards[selectedCardIndex]);
    };

    const onKeyDown = (e: any): void => {
        if (isMoving) return;

        setIsMoving(true);
        e.stopPropagation();
        const selectedCardIndex = keyDownHandler(e.key);

        cardHandler(
            selectedCardIndex,
            battleCards,
            setBattleCards,
            setIsMoving,
            setIsOpenSecretModal
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
                            onCardDoubleClick={onCardDoubleClick}
                            battleCard={battleCard}
                            key={index}
                        />
                    })
                }
            </BattleField>
            <BottomPanel battleCards={battleCards} setBattleCards={setBattleCards}/>

            {isOpenBattleOverModal && <ModalBattleOver />}

            {isOpenSecretModal && <ModalSecretCard
                battleCards={battleCards}
                setBattleCards={setBattleCards}
                isOpen={isOpenSecretModal}
                setIsOpen={setIsOpenSecretModal}
            />}

            {isOpenLevelUpModal && <ModalLevelUp
                battleCards={battleCards}
                setBattleCards={setBattleCards}
                isOpen={isOpenLevelUpModal}
                setIsOpen={setIsOpenLevelUpModal}
            />}

            {selectedCardForInfo && <ModalBattleCardInfo />}
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
