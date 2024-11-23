import {ICharacter} from "../character-page/types";
import {IBattleData, IBattleOptions} from "./types";
import {getStateValue} from "../../../store/storeUtils";

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
