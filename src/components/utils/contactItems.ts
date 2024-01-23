import {BattleCardType} from "../types";

export const addClassWhenContactCard = async (battleCard: BattleCardType) => {
    const cardEl = document.querySelector(`.battle-card-${battleCard.index}`);
    // @ts-ignore
    cardEl.classList.add('contactItem', battleCard.type === 'enemy' ? 'contactEnemy' : 'contactPotion');

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
        // @ts-ignore
        cardEl.classList.remove('contactItem', battleCard.type === 'enemy' ? 'contactEnemy' : 'contactPotion');
    }, 600));

    return true;
};

export const addClassErrorWhenContactCard = async (battleCard: BattleCardType) => {
    const cardEl = document.querySelector(`.battle-card-${battleCard.index} .card-image-error-background`);
    // @ts-ignore
    cardEl.classList.add('error');

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
        // @ts-ignore
        cardEl.classList.remove('error');
    }, 300));

    return true;
};