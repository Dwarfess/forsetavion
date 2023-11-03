import styled from "styled-components";
import {cardHandler, getBattleCardsWithHero, keyDownHandler} from "./utils";
import { BattleCardField} from "./BattleCardField";
import {useEffect, useState} from "react";
import {GridLengthSwitcher} from "./GridLengthSwitcher";

const BattlePage = () => {
    const [battleCards, setBattleCards] = useState<any[]>([]);
    const [gridLength, setGridLength] = useState(0);

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
    }, [battleCards]);

    const onCardClick = (selectedCardIndex: number) => {
        cardHandler(selectedCardIndex, battleCards, setBattleCards, gridLength);
    };

    const onKeyDown = (e: any): void => {
        e.stopPropagation();
        keyDownHandler(e.key, battleCards, setBattleCards, gridLength);
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
    width: 1000px;
    height: 1000px;
    display: flex;
    flex-wrap: wrap;
    margin: 30px;
`;

export { BattlePage };
