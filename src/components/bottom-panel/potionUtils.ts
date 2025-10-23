import { IPotion } from '../home-map/character-page/types';
import { getStateValue, setStateValue } from '../../store/storeUtils';
import {
    addClassWhenChangeHealth,
    getHeroCard,
    playSoundEffect,
    recalculateHeroHealthAfterHeal,
    SoundEffects
} from '../utils';

export const applySelectedPotion = async (selectedPotion: IPotion) => {
    const battleCards = getStateValue('battleCards');
    const heroCard = getHeroCard(battleCards);

    addClassWhenUsePotion(selectedPotion.index);
    await addClassWhenChangeHealth(heroCard, selectedPotion.value, 'buff');

    heroCard.selectedPotions = heroCard.selectedPotions
        .filter((potion: IPotion) => potion.index !== selectedPotion.index);
    // heroCard.selectedPotions[selectedPotion.index || 0] = null;

    recalculateHeroHealthAfterHeal(heroCard, selectedPotion.value, 'healBoost');
    setStateValue('battleCards', battleCards);
}

export const addClassWhenUsePotion = async (index: number | undefined) => {
    const potionEffectEl = document.querySelector(`.potion-item-${index}`);

    if (!potionEffectEl) return;

    potionEffectEl.classList.add('active');
    playSoundEffect(SoundEffects.Blob);
    await new Promise<void>((resolve) => setTimeout(() => {
        resolve();
        potionEffectEl.classList.remove('active');
    }, 1600));

    return true;
};
