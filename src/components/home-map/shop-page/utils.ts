import { getStateValue, setStateValue } from "../../../store/storeUtils";
import { ICharacter, IPotion, IShopItem } from '../character-page/types';

export const addItemToInventory = (selectedItem: IShopItem, count: number) => {
    const character = getStateValue('character');
    const collectionName = `${selectedItem.type}s`;
    const collectionItems = structuredClone(character.inventory[collectionName]);
    const collectionItem = collectionItems.find((item: IShopItem)  => {
        return item.name === selectedItem.name && item.value === selectedItem.value;
    });

    if (collectionItem) {
        collectionItem.count += count;
    } else {
        collectionItems.push({
            ...selectedItem,
            count,
            id: Math.random().toString(16).slice(2)
        });
    }

    setStateValue('character', {
        ...character,
        inventory: {
            ...character.inventory,
            [collectionName]: collectionItems
        }
    });
}

export const updateInventoryItem = (selectedItem: IShopItem, setSelectedItem: any) => {
    const character = getStateValue('character');
    if (getUnselectedItemLength(selectedItem.type) === 0 && !selectedItem.selected) return;

    const collectionName = `${selectedItem.type}s`;

    const collectionItems = structuredClone(character.inventory[collectionName]);
    const collectionItem = collectionItems.find((item: IShopItem)  => item.id === selectedItem.id);
    collectionItem.selected = !collectionItem.selected;
    // character.inventory.potionLimit += collectionItem.selected ? 1 : -1;

    updateHeroSelectedPotions(character, collectionItems, collectionName);

    setStateValue('character', {
        ...character,
        inventory: { ...character.inventory, [collectionName]: collectionItems }
    });

    setSelectedItem(collectionItem);
}

const updateHeroSelectedPotions = (character: ICharacter, items: IPotion[], collectionName: string) => {
    if (collectionName !== 'potions') return;

    character.hero.selectedPotions = items
        .filter((item) => item.selected).map((item, index) => {
            item.index = index;
            return item;
        });
}

export const getSelectedItemLength = (type: string) => {
    const character = getStateValue('character');

    const collectionName = `${type}s`;
    const collectionItems = structuredClone(character.inventory[collectionName]);

    return collectionItems.filter((item: IShopItem) => item.selected).length;
}

export const getUnselectedItemLength = (type: string) => {
    const character = getStateValue('character');

    const collectionName = `${type}s`;
    const collectionItems = structuredClone(character.inventory[collectionName]);

    return character.inventory.potionLimit - collectionItems.filter((item: IShopItem) => item.selected).length;
}

export const removeCharacterInventoryItem = (selectedItem: IShopItem) => {
    const character = getStateValue('character');
    const collectionName = `${selectedItem.type}s`;

    const items: IShopItem[] = structuredClone(character.inventory[collectionName]);

    setStateValue('character', {
        ...character,
        inventory: {
            ...character.inventory,
            [collectionName]: items.filter(item => item.id !== selectedItem.id)
        }
    });
}
