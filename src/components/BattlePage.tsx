import {useEffect, useState} from "react";
import styled from "styled-components";
import {cardHandler, getBattleCardsWithHero} from "./utils";
import { keyDownHandler} from "./moveItems";
import BattleCardField from "./BattleCardField";
import {GridLengthSwitcher} from "./GridLengthSwitcher";

const BattlePage = () => {
    const [battleCards, setBattleCards] = useState<any[]>([]);
    const [gridLength, setGridLength] = useState(0);
    const [isMoving, setIsMoving] = useState(false); // block/unblock extra click

    useEffect(() => {
        gridLength && setBattleCards(getBattleCardsWithHero(gridLength));
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

    useEffect(() => {
        setIsMoving(false);
    }, [battleCards])

    const onCardClick = (selectedCardIndex: number) => {
        if (isMoving) return;

        setIsMoving(true);
        cardHandler(selectedCardIndex, battleCards, setBattleCards, gridLength, setIsMoving);
    };

    const onKeyDown = (e: any): void => {
        if (isMoving) return;

        setIsMoving(true);
        e.stopPropagation();
        keyDownHandler(e.key, battleCards, setBattleCards, gridLength, setIsMoving);
    };

    console.log(battleCards)
    return <>
        <GridLengthSwitcher gridLength={gridLength} setGridLength={setGridLength} />
        {!!gridLength && (<BattleField>
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
        </BattleField>)}
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
