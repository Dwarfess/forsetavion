import {BattleCardType} from "../types";
import {generatePrizeCards, getHeroCard} from "./utils";
import {getStateValue, setStateValue} from "../../store/storeUtils";

export const updateAnswer = (answer: string, symbol: string, isCorrectAnswer: any): string => {
    if (isCorrectAnswer !== null) return answer;

    if (symbol === '←') return answer.slice(0, -1);

    if (answer.length === 3 || symbol === '-' && answer.length) return answer;

    return answer + symbol;
};

// export const getActiveSecretCard = (battleCards: BattleCardType[]) => {
//     return battleCards.find((battleCard: BattleCardType) => battleCard.type === 'secret' && battleCard.active);
// };

export const getDuration = (): number => {
    const selectedSecretCard = getStateValue('selectedSecretCard');
    if (!selectedSecretCard) return 0;

    return 30 - Math.floor(selectedSecretCard.level / 3);
}

export const getEquation = (): string => {
    const selectedSecretCard = getStateValue('selectedSecretCard');
    if (!selectedSecretCard) return '';

    const signs = ['+', '-'];

    let level = selectedSecretCard.level;
    if (selectedSecretCard?.level > 3) {
        signs.push('*', '/');
        level = Math.floor(level / 1.5);
    }

    return buildTreeAndCheck(level + 1, signs);
};

const randomNumberRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
};

const buildTreeAndCheck = (level: number, signs: string[]): string => {
    const equation = buildTree(level, signs);
    const answer = calculateAnswer(equation);
    if (Number.isInteger(answer) && Math.abs(answer) <= 100) {
        return equation;
    } else {
        return buildTreeAndCheck(level, signs);
    }
}

const buildTree = (numNodes: number = 2, signs: string[]): any => {
    if (numNodes === 1) return randomNumberRange(1, 10);

    const numLeft = Math.floor(numNodes / 2);
    const leftSubTree = buildTree(numLeft, signs);
    const numRight = Math.ceil(numNodes / 2);
    const rightSubTree = buildTree(numRight, signs);

    const m = randomNumberRange(0, signs.length);
    const operator = signs[m];
    return treeNode(leftSubTree, rightSubTree, operator);
};

const treeNode = (left: number, right: number, operator: string) => `${left} ${operator} ${right}`;

export const calculateAnswer = (mathProblem: string): number => eval(mathProblem);

export const updateBattleCardsAfterSecret = (isCorrectAnswer: boolean) => {
    const battleCards = getStateValue('battleCards');
    const selectedSecretCard = getStateValue('selectedSecretCard');
    if (!selectedSecretCard) return '';

    if (isCorrectAnswer) {
        const secretPrizeCard = generatePrizeCards(selectedSecretCard.level)[0];

        secretPrizeCard.index = selectedSecretCard.index;
        battleCards[selectedSecretCard.index] = secretPrizeCard;
    } else {
        const heroCard = getHeroCard(battleCards);

        heroCard.health > 1 && heroCard.health--;
        selectedSecretCard.level > 1 && decreaseSelectedSecretCardLevel(battleCards, selectedSecretCard.index);
    }

    setStateValue('battleCards', battleCards);
};

const decreaseSelectedSecretCardLevel = (battleCards: BattleCardType[], selectedSecretCardIndex: number) => {
    battleCards.forEach((battleCard: BattleCardType) => {
        if (battleCard.index === selectedSecretCardIndex) battleCard.level--;
    });
};
