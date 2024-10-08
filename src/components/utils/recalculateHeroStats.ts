import { IArtifactCard, BattleCardType, IHeroBattleCard, SimpleBattleCardType, Stat } from "../types";
import {getStateValue} from "../../store/storeUtils";
import {getHeroCard} from "./utils";
import {playSoundEffect} from "./skillUtils";

export const recalculateHeroStatsAfterContact = (
    heroCard: IHeroBattleCard,
    selectedCard: BattleCardType,
) => {
    const audioMap: any = {
        enemy: 'punch-2',
        boss: 'punch-2',
        potion: 'blob',
        superPotion: 'blob',
        coin: 'coins',
        superCoin: 'coins',
        equipment: 'punch-2',
        sphere: 'punch-2',
        artifact: 'punch-2',
        bossPart: 'punch-2',
    };

    const recalculateHeroStatsMap: any = {
        enemy: recalculateHeroHealthAfterEnemy,
        boss: recalculateHeroHealthAfterBoss,
        potion: recalculateHeroHealthAfterPotion,
        superPotion: recalculateHeroHealthAfterPotion,
        coin: recalculateHeroCoins,
        superCoin: recalculateHeroCoins,
        sphere: recalculateHeroSpheres,
        artifact: recalculateHeroArtifact,
        bossPart: recalculateHeroBossPart,
    };

    const recalculateHeroStatsHandler = recalculateHeroStatsMap[selectedCard.type];
    recalculateHeroStatsHandler && recalculateHeroStatsHandler(heroCard, selectedCard);

    const audioName = audioMap[selectedCard.type];
    // audioName && new Audio(`sounds/${audioMap[selectedCard.type]}.mp3`).play();
    audioName && playSoundEffect(audioName);
};

const recalculateHeroHealthAfterEnemy = (heroCard: IHeroBattleCard, selectedCard: BattleCardType) => {
    const beastHealth = selectedCard.value - getItemStat(heroCard, 'def').value;
    const heroHealth = beastHealth > 0 ? heroCard.health - beastHealth : heroCard.health;

    if (heroHealth <= 0) {
        heroCard.health = 0;
    } else {
        heroCard.health = heroHealth;
        recalculateHeroExp(heroCard, selectedCard)
    }
};

const recalculateHeroHealthAfterBoss = (heroCard: IHeroBattleCard, selectedCard: BattleCardType) => {
    recalculateHeroHealthAfterEnemy(heroCard, selectedCard);

    heroCard.bossParts = 0;
};

const recalculateHeroHealthAfterPotion = (heroCard: IHeroBattleCard, selectedCard: BattleCardType) => {
    const heroHealth = heroCard.health + selectedCard.value;
    const heroStatMaxHealth = getItemStat(heroCard, 'maxHealth');

    heroCard.health = heroStatMaxHealth.value < heroHealth ? heroStatMaxHealth.value : heroHealth;
};

const recalculateHeroCoins = (heroCard: IHeroBattleCard, selectedCard: BattleCardType) => {
    heroCard.coins += selectedCard.value;
};

const recalculateHeroSpheres = (heroCard: IHeroBattleCard, selectedCard: BattleCardType) => {
    heroCard.spheres += selectedCard.value;
};

export const getItemStat = (item: any, name: string) => {
    return item.stats.find((stat: Stat) => stat.name === name) || {};
};

const recalculateHeroStatAfterAddArtifact = (
    heroCard: IHeroBattleCard,
    selectedCard: BattleCardType,
    name: string
) => {
    const selectedCardStat = getItemStat(selectedCard, name);
    if (selectedCardStat.value) {
        const heroStat = getItemStat(heroCard, name);
        heroStat.value += selectedCardStat.value;

        if (name === 'maxHealth') heroCard.health += selectedCardStat.value;
    }
};

const recalculateHeroArtifact = (heroCard: IHeroBattleCard, selectedCard: BattleCardType) => {
    const selectedArtifact = heroCard.artifacts.find((artifact: IArtifactCard) => artifact.name === selectedCard.name);

    if (selectedArtifact) {
        selectedArtifact.count++;
    } else {
        heroCard.artifacts.push(selectedCard);
    }

    recalculateHeroStatAfterAddArtifact(heroCard, selectedCard, 'maxHealth');
    recalculateHeroStatAfterAddArtifact(heroCard, selectedCard, 'def');
    recalculateHeroStatAfterAddArtifact(heroCard, selectedCard, 'lifeDrain');
    recalculateHeroStatAfterAddArtifact(heroCard, selectedCard, 'expBoost');
    recalculateHeroStatAfterAddArtifact(heroCard, selectedCard, 'coinBoost');
};

export const recalculateHeroExp = (heroCard: IHeroBattleCard, selectedCard: SimpleBattleCardType) => {
    if (heroCard.health <= 0) return;

    const maxLevelExp = getMaxExpForCurrentLever(heroCard);
    const heroExpBoostValue = getItemStat(heroCard, 'expBoost').value;
    let heroExp = heroCard.exp + getRecalculatedExpReward(selectedCard.expReward, heroExpBoostValue);

    if (heroExp >= maxLevelExp) {
        heroExp -= maxLevelExp;
        heroCard.level++;
        heroCard.skillPoints += 4;

        const heroStatMaxHealth = getItemStat(heroCard, 'maxHealth');
        heroStatMaxHealth.value += 3;
        heroCard.health = heroStatMaxHealth.value;
    }

    heroCard.exp = heroExp;
};

const recalculateHeroBossPart = (heroCard: IHeroBattleCard) => {
    heroCard.bossParts++;
};

export const getRecalculatedExpReward = (expReward: number, heroExpBoostValue: number) => {
    return expReward * heroExpBoostValue;
};

export const getRecalculatedExpRewardString = (selectedCard: SimpleBattleCardType) => {
    if (!selectedCard.expReward) return;

    const heroCard = getHeroCard(getStateValue('battleCards'));
    const heroExpBoostValue = getItemStat(heroCard, 'expBoost').value;
    let expRewardString: string = 'Exp: ';
    if (heroExpBoostValue !== 1) {
        expRewardString += `${selectedCard.expReward} * ${heroExpBoostValue} = ${getRecalculatedExpReward(selectedCard.expReward, heroExpBoostValue)}`;
    } else {
        expRewardString += `${selectedCard.expReward}`;
    }

    return expRewardString;
};

export const getMaxExpForCurrentLever = (heroCard: IHeroBattleCard): number => {
    const maxExpForDefaultLever = 50;
    return maxExpForDefaultLever + (maxExpForDefaultLever/2 * (heroCard.level - 1));
};

export const getBossPartProgress = (heroCard: IHeroBattleCard, level: number) => {
    return heroCard.bossParts >= level ? 100 : 0;
}
