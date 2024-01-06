import {useEffect, useState} from "react";
import styled from "styled-components";
import {cardHandler, getBattleCardsWithHero, getHeroCard} from "./utils";
import { keyDownHandler} from "./moveItems";
import { BattleCardField } from "./BattleCardField";
import {GridLengthSwitcher} from "./GridLengthSwitcher";
import {TopPanel} from "./top-panel/TopPanel";
import {BattleOverModal} from "./BattleOverModal";

const BattlePage = () => {
    const [battleCards, setBattleCards] = useState<any[]>([]);
    const [gridLength, setGridLength] = useState(0);
    const [isMoving, setIsMoving] = useState(false); // block/unblock extra click

    const [isOpenBattleOverModal, setIsOpenBattleOverModal] = useState(false);

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

    // useEffect(() => {
    //     if (getHeroCard(battleCards).health === 0)
    // }, [battleCards])

    const onCardClick = (selectedCardIndex: number) => {
        if (isMoving) return;

        setIsMoving(true);
        cardHandler(selectedCardIndex, battleCards, setBattleCards, gridLength, setIsMoving, setIsOpenBattleOverModal);
    };

    const onKeyDown = (e: any): void => {
        if (isMoving) return;

        setIsMoving(true);
        e.stopPropagation();
        keyDownHandler(e.key, battleCards, setBattleCards, gridLength, setIsMoving, setIsOpenBattleOverModal);
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
            >
                <GridLengthSwitcher gridLength={gridLength} setGridLength={setGridLength} />
            </BattleOverModal>
        </>)}
    </>
};

const BattleField = styled.div`
    // border: 2px solid #dda786;
    width: 700px;
    //height: 700px;
    display: flex;
    flex-wrap: wrap;
    //display: flex;
    //flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    margin: 30px;
    //border: 2px solid red;
`;

export { BattlePage };
