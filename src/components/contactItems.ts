import {BattleCardType} from "./types";

export const addClassWhenContactCard = async (battleCard: BattleCardType) => {
    const cardEl = document.querySelector(`.battle-card-${battleCard.index}`);
    // @ts-ignore
    cardEl.classList.add('hitEnemy');

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
    }, 500));

    return true;
};