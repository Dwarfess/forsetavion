import {BattleCardType, Effect, Skill} from "../types";
import {getItemStat} from "./recalculateHeroStats";

export const addClassWhenUseSkill = async (battleCard: BattleCardType, skill: Skill) => {
    const skillEffectEl = document.querySelector(`.battle-card-${battleCard.index} .skill-usage-image`);
    const imgElement = skillEffectEl?.querySelector('img');

    if (!imgElement || !skillEffectEl) return;

    imgElement.src = `${skill.image}.jpg`

    skillEffectEl.classList.add('active');

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
        skillEffectEl.classList.remove('active');
    }, 2000));

    return true;
};

export const addClassWhenChangeHealth = async (battleCard: BattleCardType, skill: Skill | Effect) => {
    const healthValueEffectEl = document.querySelector(`.battle-card-${battleCard.index} .health-value-effect`);

    if (!healthValueEffectEl) return;

    const skillPower = getItemStat(skill, 'power').value;
    healthValueEffectEl.innerHTML = skill.type === 'buff' ? `+${skillPower}` : `-${skillPower}`;

    healthValueEffectEl.classList.add('active', skill.type === 'buff' ? 'positiveEffect' : 'negativeEffect');

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
        healthValueEffectEl.classList.remove('active');
    }, 2000));

    return true;
};


export const addClassWhenContactCard = async (battleCard: BattleCardType) => {
    const cardEl = document.querySelector(`.battle-card-${battleCard.index}`);

    if (!cardEl) return;

    cardEl.classList.add('contactItem', battleCard.type === 'enemy' ? 'contactEnemy' : 'contactPotion');

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
        cardEl.classList.remove('contactItem', battleCard.type === 'enemy' ? 'contactEnemy' : 'contactPotion');
    }, 600));

    return true;
};

export const addClassErrorWhenContactCard = async (battleCard: BattleCardType) => {
    const cardEl = document.querySelector(`.battle-card-${battleCard.index} .card-image-error-background`);

    if (!cardEl) return;

    cardEl.classList.add('error');

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
        cardEl.classList.remove('error');
    }, 300));

    return true;
};
