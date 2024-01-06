import {BattleCardType, HeroBattleCardType} from "./types";
import {addClassWhenContactCard} from "./contactItems";

export const recalculateHeroStatsAfterContact = async (
    heroCard: HeroBattleCardType,
    selectedCard: BattleCardType,
) => {
    const audioMap: any = {
        enemy: 'punch',
        potion: 'blob',
        coins: 'coins'
    };

    const recalculateHeroStatsMap: any = {
        enemy: recalculateHeroHealthAfterEnemy,
        potion: recalculateHeroHealthAfterPotion,
        coins: recalculateHeroCoins,
    };

    const recalculateHeroStatsHandler = recalculateHeroStatsMap[selectedCard.type];
    recalculateHeroStatsHandler && recalculateHeroStatsHandler(heroCard, selectedCard);

    const audioName = audioMap[selectedCard.type];
    audioName && new Audio(`sounds/${audioMap[selectedCard.type]}.mp3`).play();
    await addClassWhenContactCard(selectedCard);
};

const recalculateHeroHealthAfterEnemy = (heroCard: HeroBattleCardType, selectedCard: BattleCardType) => {
    const heroHealth = heroCard.health - selectedCard.value;

    if (heroHealth <= 0) {
        heroCard.health = 0;
    } else {
        heroCard.health = heroHealth;
        recalculateHeroExp(heroCard)
    }
};

const recalculateHeroHealthAfterPotion = (heroCard: HeroBattleCardType, selectedCard: BattleCardType) => {
    const heroHealth = heroCard.health + selectedCard.value;
    heroCard.health = heroCard.maxHealth < heroHealth ? heroCard.maxHealth : heroHealth;
};

const recalculateHeroCoins = (heroCard: HeroBattleCardType, selectedCard: BattleCardType) => {
    heroCard.coins += selectedCard.value;
};

const recalculateHeroCrystals = (heroCard: HeroBattleCardType, selectedCard: BattleCardType) => {
    heroCard.crystals += selectedCard.value;
};

const recalculateHeroExp = (heroCard: HeroBattleCardType) => {
    if (heroCard.health < 0) return;

    const maxLevelExp = getMaxExpForCurrentLever(heroCard);
    let heroExp = heroCard.exp + 10;

    if (heroExp >= maxLevelExp) {
        heroExp -= maxLevelExp;
        heroCard.level++;

        heroCard.maxHealth++;
        heroCard.health = heroCard.maxHealth;
    }

    heroCard.exp = heroExp;
};

export const getMaxExpForCurrentLever = (heroCard: HeroBattleCardType): number => {
    const maxExpForDefaultLever = 50;
    return maxExpForDefaultLever + (maxExpForDefaultLever/2 * (heroCard.level - 1));
};
