import {useEffect, useState} from "react";
import styled from "styled-components";
import { BattleCardField } from "./BattleCardField";
import {GridLengthSwitcher} from "./GridLengthSwitcher";
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

const BattlePage = () => {
    const [battleCards, setBattleCards] = useState<any[]>([]);
    const [heroCard, setHeroCard] = useState<any>(null);
    const [selectedBattleCardForInfo, setSelectedBattleCardForInfo] = useState<any>(null);
    // const [activeHeroSkill, setActiveHeroSkill] = useState<any>(null);
    const [gridLength, setGridLength] = useState(0);
    const [isMoving, setIsMoving] = useState(false); // block/unblock extra click

    const [isOpenBattleOverModal, setIsOpenBattleOverModal] = useState(false);
    const [isOpenSecretModal, setIsOpenSecretModal] = useState(false);

    useEffect(() => {
        gridLength && setBattleCards(getBattleCardsWithHero(gridLength));
        setIsOpenBattleOverModal(false);
    }, [gridLength]);

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

    const onCardClick = (selectedCardIndex: number) => {
        if (isMoving) return;

        setIsMoving(true);
        cardHandler(
            selectedCardIndex,
            battleCards,
            setBattleCards,
            gridLength,
            setIsMoving,
            setIsOpenBattleOverModal,
            setIsOpenSecretModal
        );
    };

    const onCardDoubleClick = (selectedCardIndex: number) => {
        if (isMoving) return;
        setSelectedBattleCardForInfo(battleCards[selectedCardIndex]);
    };

    const onKeyDown = (e: any): void => {
        if (isMoving) return;

        setIsMoving(true);
        e.stopPropagation();
        const selectedCardIndex = keyDownHandler(
            e.key,
            battleCards,
            setBattleCards,
            gridLength,
            // setIsMoving,
            // setIsOpenBattleOverModal,
            // setIsOpenSecretModal
        );

        cardHandler(
            selectedCardIndex,
            battleCards,
            setBattleCards,
            gridLength,
            setIsMoving,
            setIsOpenBattleOverModal,
            setIsOpenSecretModal
        );
    };

    // console.log(battleCards)
    return <>
        <GridLengthSwitcher gridLength={gridLength} setGridLength={setGridLength} />
        {!!gridLength && battleCards.length && (<>
            <TopPanel heroCard={getHeroCard(battleCards)} />

            <BattleField>
                {
                    battleCards.map((battleCard: any, index: number) => {
                        return <BattleCardField
                            onCardClick={onCardClick}
                            onCardDoubleClick={onCardDoubleClick}
                            battleCard={battleCard}
                            gridLength={gridLength}
                            key={index}
                        />
                    })
                }
            </BattleField>
            <BottomPanel battleCards={battleCards} setBattleCards={setBattleCards}/>
            <ModalBattleOver
                heroCard={getHeroCard(battleCards)}
                isOpen={isOpenBattleOverModal}
                setIsOpen={setIsOpenBattleOverModal}
                setGridLength={setGridLength}
            />

            {isOpenSecretModal && <ModalSecretCard
                battleCards={battleCards}
                setBattleCards={setBattleCards}
                isOpen={isOpenSecretModal}
                setIsOpen={setIsOpenSecretModal}
            />}

            {selectedBattleCardForInfo && <ModalBattleCardInfo
                heroCard={heroCard}
                selectedBattleCard={selectedBattleCardForInfo}
                setSelectedBattleCard={setSelectedBattleCardForInfo}
            />}
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
