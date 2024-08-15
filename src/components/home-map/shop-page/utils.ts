import { getStateValue, setStateValue } from "../../../store/storeUtils";
import { IShopItem } from "../character-page/types";

export const addCharacterInventoryItem = (selectedItem: IShopItem, count: number) => {
    const character = getStateValue('character');
    const collectionName = `${selectedItem.type}s`;

    setStateValue('character', {
        ...character,
        inventory: {
            [collectionName]: [
                ...character.inventory[collectionName],
                {
                    ...selectedItem,
                    count,
                    id: Math.random().toString(16).slice(2)
                }
            ]
        }
    })
}

export const updateCharacterInventoryItem = (selectedItem: IShopItem) => {
    const character = getStateValue('character');
    const collectionName = `${selectedItem.type}s`;

    const items: IShopItem[] = structuredClone(character.inventory[collectionName]);
    const updatedItems = structuredClone(items).map((item: IShopItem) => {
        item.selected = item.id === selectedItem.id;

        return item;
    });

    setStateValue('character', {
        ...character,
        inventory: { [collectionName]: updatedItems }
    });
}

export const removeCharacterInventoryItem = (selectedItem: IShopItem) => {
    const character = getStateValue('character');
    const collectionName = `${selectedItem.type}s`;

    const items: IShopItem[] = structuredClone(character.inventory[collectionName]);

    setStateValue('character', {
        ...character,
        inventory: { [collectionName]: items.filter(item => item.id !== selectedItem.id) }
    });
}
