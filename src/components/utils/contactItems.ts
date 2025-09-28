import {BattleCardType, Skill} from "../types";

export const addClassWhenUseSkill = async (battleCard: BattleCardType, skill: Skill) => {
    const skillEffectEl = document.querySelector(`.battle-card-${battleCard.index} .skill-usage-image`);
    const imgElement = skillEffectEl?.querySelector('img');

    if (!imgElement || !skillEffectEl) return;

    imgElement.src = `img/${skill.image}.jpg`

    skillEffectEl.classList.add('active');

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
        skillEffectEl.classList.remove('active');
    }, 2000));

    return true;
};

export const addClassWhenChangeHealth = async (battleCard: BattleCardType, value: any, type: string) => {
    const effectClassNameMap: any = {
        buff: 'positive-value',
        help: 'positive-value',
        debuff: 'negative-value',
        attack: 'negative-value',
        sphere: 'sphere-value',
    }

    const healthValueEffectEl = document.querySelector(`.battle-card-${battleCard.index} .${effectClassNameMap[type]}`);// const healthValueDebuffEffectEl = document.querySelector(`.battle-card-${battleCard.index} .debuff-effect`);

    if (!healthValueEffectEl) return;

    healthValueEffectEl.innerHTML = value;

    healthValueEffectEl.classList.add('active');

    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
        healthValueEffectEl.classList.remove('active');
    }, 1500));

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
