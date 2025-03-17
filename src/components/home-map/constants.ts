import { IPotion } from './character-page/types';

export const shopPotions: IPotion[] = [
    {
        id: Math.random().toString(16).slice(2),
        type: 'potion',
        name: 'health',
        image: 'icon-health-potion-1',
        price: 10,
        value: 10,
        selected: false
    },
    {
        id: Math.random().toString(16).slice(2),
        type: 'potion',
        name: 'health',
        image: 'icon-health-potion-2',
        price: 20,
        value: 20,
        selected: false
    },
    {
        id: Math.random().toString(16).slice(2),
        type: 'potion',
        name: 'health',
        image: 'icon-health-potion-3',
        price: 50,
        value: 50,
        selected: false
    },
    {
        id: Math.random().toString(16).slice(2),
        type: 'potion',
        name: 'health',
        image: 'icon-health-potion-4',
        price: 100,
        value: 100,
        selected: false
    }
];
