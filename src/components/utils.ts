import {
    heroCard,
    newEnemyCards,
    newPotionCards,
    equipmentCards,
    secretCards, coinsCards
} from "./constants";
import {BattleCardType, HeroBattleCardType, PrimaryBattleCardType} from "./types";
import {
    getBottomCardIndex,
    getLeftCardIndex,
    getRightCardIndex,
    getTopCardIndex, hideSelectedCard,
    moveBattleCard, moveBattleCards,
    // resetBattleCard
} from "./moveItems";
import {addClassWhenContactCard} from "./contactItems";
import {recalculateHeroStatsAfterContact} from "./recalculateHeroStats";

export const getBattleCardsWithHero = (gridLength: number): (BattleCardType | HeroBattleCardType)[] => {

    const battleCards: (BattleCardType | HeroBattleCardType)[] = generateBattleCards(heroCard.level, gridLength);

    battleCards[0] = heroCard;

    return battleCards.splice(0, gridLength * gridLength);
};

export const generateBattleCards = (heroLevel: number, gridLength: number): BattleCardType[] => {
    const battleCards: any[] = [
        ...secretCards,
        ...newEnemyCards,
        ...newPotionCards,
        // ...newPotionCards,
        ...coinsCards,
        // ...equipmentCards,
        ...secretCards,
        ...newEnemyCards,
        ...newPotionCards,
        // ...newPotionCards,
        ...coinsCards,
        // ...equipmentCards,
    ].map((battleCard: PrimaryBattleCardType) => ({
        ...battleCard,
        id: Math.random().toString(16).slice(2),
        value: getRandomValue(battleCard, heroLevel, gridLength),
        level: heroLevel,
        isVisible: true,
    }));

    battleCards.sort(() => .5 - Math.random());

    battleCards.forEach((card: BattleCardType, index: number) => card.index = index);

    return battleCards;
};

const getRandomValue = (battleCard: PrimaryBattleCardType, heroLevel: number, gridLength: number) => {
    const defaultValue = gridLength;
    const enemyDefaultValue = defaultValue * (1 + ((heroLevel - 1) / 5));

    const healthMap: any = {
        enemy: randomHealth(enemyDefaultValue),
        potion: randomHealth(defaultValue * 3),
        coins: randomHealth(defaultValue * 3),
        // boss:
    };

    // const limitedValue = battleCard.type === 'enemy' ? enemyDefaultHealth : 10;
    return healthMap[battleCard.type] || 0;
};

const randomHealth = (health: number) => Math.floor(Math.random() * health) + 1;

export const getHeroCard = (battleCards: BattleCardType[]): any => {
    return battleCards.find((card: BattleCardType) => card.type === 'hero');
}

export const cardHandler = (
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    setBattleCards: any,
    gridLength: number,
    setIsMoving: (val: boolean) => void,
    setIsOpenBattleOverModal: (val: boolean) => void,
    setIsOpenSecretModal: (val: boolean) => void,
) => {
    const clonedBattleCards = structuredClone(battleCards);

    const heroCard = getHeroCard(clonedBattleCards);

    heroCard.topCardIndex = getTopCardIndex(heroCard.index, gridLength);
    heroCard.bottomCardIndex = getBottomCardIndex(heroCard.index, gridLength);
    heroCard.rightCardIndex = getRightCardIndex(heroCard.index, gridLength);
    heroCard.leftCardIndex = getLeftCardIndex(heroCard.index, gridLength);

    const allowedIndexes: any[] = [
        heroCard.topCardIndex,
        heroCard.bottomCardIndex,
        heroCard.rightCardIndex,
        heroCard.leftCardIndex
    ];

    if (allowedIndexes.includes(selectedCardIndex)) {
        resetBattleCards(
            heroCard,
            selectedCardIndex,
            clonedBattleCards,
            gridLength,
            setBattleCards,
            setIsMoving,
            setIsOpenBattleOverModal,
            setIsOpenSecretModal
        );
    } else {
        setIsMoving(false);
    }
};

const resetBattleCards = async (
    heroCard: HeroBattleCardType,
    selectedCardIndex: number,
    battleCards: BattleCardType[],
    gridLength: number,
    setBattleCards: (item: BattleCardType[]) => void,
    setIsMoving: (val: boolean) => void,
    setIsOpenBattleOverModal: (val: boolean) => void,
    setIsOpenSecretModal: (val: boolean) => void,
) => {
    const selectedCard = battleCards[selectedCardIndex];

    if (selectedCard.type === 'secret') {
        selectedCard.active = true;

        setIsMoving(false);
        setBattleCards(battleCards);
        setIsOpenSecretModal(true);

        return;
    }

    recalculateHeroStatsAfterContact(heroCard, selectedCard);
    await addClassWhenContactCard(selectedCard);
    setBattleCards(battleCards);

    if (heroCard.health === 0) {
        setIsMoving(false);
        setIsOpenBattleOverModal(true);

        return;
    }

    battleCards = structuredClone(battleCards);
    await moveBattleCards(heroCard, selectedCardIndex, battleCards, gridLength);

    setBattleCards(battleCards);
    setIsMoving(false);
};

export const getCardSizeInPercent = (gridLength: number): string => {
    return `${100/gridLength - 2}%`;
};

export const getHeroScore = (heroCard: HeroBattleCardType) => {
    const levelPoints = heroCard.level * 100;
    const coinPoints = heroCard.coins * 5;
    const crystalPoints = heroCard.crystals * 20;

    return levelPoints + coinPoints + crystalPoints;
};

export const updateAnswer = (answer: string, symbol: string): string => {
    if (symbol === '←') {
        answer = answer.slice(0, -1);
    } else {
        answer += symbol;
    }

    return answer;
};

export const getEquation = (battleCards: BattleCardType[]) => {
    const secretCard = battleCards.find((battleCard: BattleCardType) => battleCard.type === 'secret' && battleCard.active);
    const signs = ['+', '-', '*', '/'];
    // const randomSignsIndex = randomNumberRange(0, signs.length);
    // const randomSign = signs[randomSignsIndex];

    console.log(secretCard?.level, 'secretCardLevel *************' )
    return `${buildTree(secretCard?.level, signs)} = `;
};

const randomNumberRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
};

const buildTree = (numNodes: number = 1, signs: string[]): any => {
    if (numNodes === 1) return randomNumberRange(1, 10);

    const numLeft = Math.floor(numNodes / 2);
    const leftSubTree = buildTree(numLeft, signs);
    const numRight = Math.ceil(numNodes / 2);
    const rightSubTree = buildTree(numRight, signs);

    const m = randomNumberRange(0, signs.length);
    const operator = signs[m];
    return treeNode(leftSubTree, rightSubTree, operator);
};

const treeNode = (left: number, right: number, operator: string) => {
    return '(' + left + ' ' + operator + ' ' + right + ')';
};
