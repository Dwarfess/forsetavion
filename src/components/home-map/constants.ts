import { IShopPotion } from "./character-page/types";

export const shopPotions: IShopPotion[] = [
    {
        id: Math.random().toString(16).slice(2),
        img: 'icon-potion',
        price: 10,
        value: 10,
        selected: false
    },
    {
        id: Math.random().toString(16).slice(2),
        img: 'icon-potion',
        price: 10,
        value: 20,
        selected: false
    },
    {
        id: Math.random().toString(16).slice(2),
        img: 'icon-potion',
        price: 10,
        value: 50,
        selected: false
    },
    {
        id: Math.random().toString(16).slice(2),
        img: 'icon-potion',
        price: 10,
        value: 100,
        selected: false
    }
];
