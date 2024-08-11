import { IArtifactCard, IHeroBattleCard } from "../../types";


export interface ICommonShopItem {
    id: string;
    img: string;
    price: number;
    count?: number;
}

export interface IShopPotion extends ICommonShopItem {
    value: number;
    selected: boolean
}

export interface IInventory {
    potions: IShopPotion[]
}

export interface ICharacter {
    nickname: string;
    avatar: string;
    hero: IHeroBattleCard;
    coins: number;
    spheres: number;
    score: number;
    artifacts: IArtifactCard[],
    inventory: IInventory
}

export interface IShopItem extends IShopPotion {}
