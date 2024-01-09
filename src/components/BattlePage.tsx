import {useEffect, useState} from "react";
import styled from "styled-components";
import {cardHandler, getBattleCardsWithHero, getHeroCard} from "./utils";
import { keyDownHandler} from "./moveItems";
import { BattleCardField } from "./BattleCardField";
import {GridLengthSwitcher} from "./GridLengthSwitcher";
import {TopPanel} from "./top-panel/TopPanel";
import {BattleOverModal} from "./BattleOverModal";
import {SecretModal} from "./SecretModal";

const BattlePage = () => {
    const [battleCards, setBattleCards] = useState<any[]>([]);
    const [gridLength, setGridLength] = useState(0);
    const [isMoving, setIsMoving] = useState(false); // block/unblock extra click

    const [isOpenBattleOverModal, setIsOpenBattleOverModal] = useState(false);
    const [isOpenSecretModal, setIsOpenSecretModal] = useState(false);

    useEffect(() => {
        gridLength && setBattleCards(getBattleCardsWithHero(gridLength));
        setIsOpenBattleOverModal(false);
    }, [gridLength]);

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

    const onKeyDown = (e: any): void => {
        if (isMoving) return;

        setIsMoving(true);
        e.stopPropagation();
        keyDownHandler(
            e.key,
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
                            battleCard={battleCard}
                            gridLength={gridLength}
                            key={index}
                        />
                    })
                }
            </BattleField>

            <BattleOverModal
                heroCard={getHeroCard(battleCards)}
                isOpen={isOpenBattleOverModal}
                setIsOpen={setIsOpenBattleOverModal}
                setGridLength={setGridLength}
            />

            <SecretModal
                heroCard={getHeroCard(battleCards)}
                battleCards={battleCards}
                setBattleCards={setBattleCards}
                isOpen={isOpenSecretModal}
                setIsOpen={setIsOpenSecretModal}
            />
        </>)}
    </>
};

const BattleField = styled.div`
    width: 100%;
    //height: 700px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    padding: 30px;
    //border: 2px solid red;
`;

export { BattlePage };
