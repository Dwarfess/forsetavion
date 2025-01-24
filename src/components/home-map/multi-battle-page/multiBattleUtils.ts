import {ICharacter} from "../character-page/types";
import {IBattleData, IBattleOptions} from "./types";
import { getStateValue, setStateValue } from '../../../store/storeUtils';
import {
    cardHandler,
    resetBattleCards,
    updateBattleCardsByNewSkillLevels,
    updateBattleCardsWithSelectedSkill
} from '../../utils';

export const prepareBattleData = (
    {password, battleFieldLength}: IBattleOptions,
    {nickname, avatar}: ICharacter,
    battleCards: any): IBattleData =>
{
    return {
        password,
        battleFieldLength,
        battleCards,
        players: [{nickname, avatar}],
        isActive: false
    }
}

export const updateBattleData = ({ _id, password, battleFieldLength, battleCards, players }: IBattleData): IBattleData => {
    const character = getStateValue('character');

    const newBattleCards = structuredClone(battleCards);
    const heroCard = structuredClone(character.hero);
    heroCard.nickname = character.nickname;
    heroCard.index = newBattleCards.length - 1;

    newBattleCards[newBattleCards.length - 1] = heroCard;

    const newPlayer = {
       nickname: character.nickname,
       avatar: character.avatar
    };

    const newPlayers = [...players, newPlayer];

    return {
        _id,
        password,
        battleFieldLength,
        battleCards: newBattleCards,
        players: newPlayers,
        isActive: true,
    }
}

export const updateCurrentBattleAndResetActivePlayer = (actionDataFromCurrentPlayer: any) => {
    updateCurrentBattle(actionDataFromCurrentPlayer);
    setStateValue('actionDataFromActivePlayer', {});
}

export const updateCurrentBattle = (actionDataFromCurrentPlayer: any) => {
    const multiBattle = getStateValue('multiBattle');
    const actionDataFromActivePlayer = getStateValue('actionDataFromActivePlayer');

    if (!multiBattle.isActive || Object.keys(actionDataFromActivePlayer).length) return;

    const multiBattleSocket = getStateValue('multiBattleSocket');
    const character = getStateValue('character');

    const data = {
        ...actionDataFromCurrentPlayer,
        battleId: multiBattle._id,
        nickname: character.nickname
    };

    // Перевіряємо, чи є підключений сокет
    if (multiBattleSocket) {
        // Відправляємо дані через Socket.io
        multiBattleSocket.emit('battleAction', data);
        console.log('Battle action sent:', data);
    } else {
        console.error('Socket.io is not connected, cannot send data.');
    }
};


export const executeActionFromAnotherPlayer = (data: any) => {
    setStateValue('actionDataFromActivePlayer', data);

    // TODO: simplify all calls without internal methods
    // example - move: () => executeMove,
    const actionsMap: any = {
        move: () => resetBattleCards(data.selectedCardIndex),
        selectedSecretCard: () => executeSelectedSecretCardFromAnotherPlayer(data.battleCardFromAnotherPlayer),
        closeSecretCard: () => executeCloseSecretCardFromAnotherPlayer(),
        equationAnswer: () => executeEquationAnswer(data.answer),
        useActiveSkill: () => executeUseActiveSkill(data),
        updateHeroSkills: () => executeUpdateHeroSkills(data.heroSkills),
    }

    actionsMap[data.action]();
};

const executeSelectedSecretCardFromAnotherPlayer = (selectedCard: any) => {
    setStateValue('selectedSecretCard', selectedCard);
}

const executeCloseSecretCardFromAnotherPlayer = () => {
    document.querySelector<HTMLButtonElement>('.close-btn')?.click();
}

const executeEquationAnswer = (answer: string) => {
    const symbolButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.symbols-container .symbol-btn'));
    answer.split('').forEach((symbol: string)=> {
        const symbolButton = symbolButtons.find((symbolButton: HTMLButtonElement) => symbolButton.innerHTML === symbol);
        symbolButton?.click();
    });

    setTimeout(() => {
        document.querySelector<HTMLButtonElement>('.check-btn')?.click();
    }, 500);
}

const executeUseActiveSkill = (data: any) => {
    updateBattleCardsWithSelectedSkill(data.activeSkill);

    setTimeout(() => {
        cardHandler(data.selectedCardIndex);
    }, 500);
}

const executeUpdateHeroSkills = (heroSkills: any) => {
    updateBattleCardsByNewSkillLevels(structuredClone(heroSkills));
}
