import {BattleCardType, Direction, HeroBattleCardType} from "./types";
import {cardHandler, generateBattleCards} from "./utils";

export const addClassForMovingCard = async (battleCard: BattleCardType, className: string) => {
    const transformDuration = 300;
    const transformHeroDuration = 600;
    const cardEl = document.querySelector(`.battle-card-${battleCard.index}`);
    // @ts-ignore
    cardEl.classList.remove('newCard');
    // @ts-ignore
    cardEl.classList.add(className, `${battleCard.name === 'hero' ? 'movingHero' : 'moving'}`);

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
    }, battleCard.name === 'hero' ? transformHeroDuration : transformDuration));

    return true;
};

export const moveBattleCards = async(
    heroCard: HeroBattleCardType,
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    gridLength: number
):Promise<boolean> => {
    const newBattleCards = generateBattleCards(heroCard.level);
    hideSelectedCard(selectedCardIndex);
    const calcLastCardIndex = await moveBattleCard(heroCard.index, selectedCardIndex, battleCards, gridLength);
    newBattleCards[calcLastCardIndex].isNew = true;
    battleCards[calcLastCardIndex] = newBattleCards[calcLastCardIndex];
    return true;
}

export const moveBattleCard = async (
    previousCardIndex: number,
    nextCardIndex: number,
    battleCards: BattleCardType[],
    gridLength: number,
): Promise<number> => {
    // previousCard is a hero card and next
    // nextCard is a selected card and next
    const direction = getDirection(previousCardIndex, nextCardIndex);

    battleCards[previousCardIndex].isNew = false;
    await addClassForMovingCard(battleCards[previousCardIndex], direction.className);

    battleCards[nextCardIndex] = battleCards[previousCardIndex];
    battleCards[nextCardIndex].index = nextCardIndex;

    const calcNewPreviousCardIndex = direction.getOppositeIndex(previousCardIndex, gridLength);

    if (calcNewPreviousCardIndex !== null) {
        return moveBattleCard(calcNewPreviousCardIndex, previousCardIndex, battleCards, gridLength);
    } else {
        return previousCardIndex;
    }
};

export const hideSelectedCard = (selectedCardIndex: number) => {
    const selectedCardEl = document.querySelector(`.battle-card-${selectedCardIndex}`);
    // @ts-ignore
    selectedCardEl.classList.remove('newCard');
    // @ts-ignore
    selectedCardEl.classList.add('hidden');
};

export const getMoveClass = ((heroCardIndex: number, selectedCardIndex: number) => {
    let moveClass;
    if ((heroCardIndex - 1) === selectedCardIndex) {
        moveClass = directionList[0].className;
    } else if ((heroCardIndex + 1) === selectedCardIndex) {
        moveClass = directionList[1].className;
    } else if (heroCardIndex > selectedCardIndex) {
        moveClass = directionList[2].className;
    } else if (heroCardIndex < selectedCardIndex) {
        moveClass = directionList[3].className;
    }

    return moveClass;
});

export const getDirection = ((heroCardIndex: number, selectedCardIndex: number): Direction => {
    let direction = {className: '', getOppositeIndex: () => null};
    if ((heroCardIndex - 1) === selectedCardIndex) {
        direction = directionList[0]
    } else if ((heroCardIndex + 1) === selectedCardIndex) {
        direction = directionList[1]
    } else if (heroCardIndex > selectedCardIndex) {
        direction = directionList[2]
    } else if (heroCardIndex < selectedCardIndex) {
        direction = directionList[3]
    }

    return direction;
});

// const moveClassList = ['move-left', 'move-right', 'move-top', 'move-bottom', 'moving'];

export const getTopCardIndex = (currentCardIndex: number, gridLength: number) => {
    const newCardIndex = currentCardIndex - gridLength;

    return (newCardIndex >= 0) ? newCardIndex : null;
};

export const getBottomCardIndex = (currentCardIndex: number, gridLength: number) => {
    const cardLength = gridLength * gridLength;
    const newCardIndex = currentCardIndex + gridLength;

    return (newCardIndex < cardLength) ? newCardIndex : null;
};

export const getRightCardIndex = (currentCardIndex: number, gridLength: number) => {
    const newCardIndex = currentCardIndex + 1;

    return (!currentCardIndex || (currentCardIndex + 1) % gridLength) ? newCardIndex : null;
};

export const getLeftCardIndex = (currentCardIndex: number, gridLength: number) => {
    const newCardIndex = currentCardIndex - 1;

    return (!newCardIndex || currentCardIndex % gridLength) ? newCardIndex : null;
};

const directionList: Direction[] = [
    {
        className: 'move-left',
        getOppositeIndex: getRightCardIndex
    },
    {
        className: 'move-right',
        getOppositeIndex: getLeftCardIndex
    },
    {
        className: 'move-top',
        getOppositeIndex: getBottomCardIndex
    },
    {
        className: 'move-bottom',
        getOppositeIndex: getTopCardIndex
    },
];

export const keyDownHandler = (
    key: string,
    battleCards: BattleCardType[],
    setBattleCards: (item: BattleCardType[]) => void,
    gridLength: number,
    setIsMoving: (val: boolean) => void,
    setIsOpenBattleOverModal: (val: boolean) => void,
) => {
    const allowedKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    if (!allowedKeys.includes(key)) return;

    const heroCardIndex: any = battleCards.find((card: BattleCardType) => card.type === 'hero')?.index;

    const keyMap: any = {
        ArrowRight: () => heroCardIndex + 1,
        ArrowLeft: () => heroCardIndex - 1,
        ArrowUp: () => heroCardIndex - gridLength,
        ArrowDown: () => heroCardIndex + gridLength,
    };

    const selectedCardIndex = keyMap[key]();
    const cardLength = gridLength * gridLength;

    if (selectedCardIndex >= 0 && selectedCardIndex < cardLength) {
        cardHandler(selectedCardIndex, battleCards, setBattleCards, gridLength, setIsMoving, setIsOpenBattleOverModal);
    }
};
