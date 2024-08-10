import { IArtifactCard, IHeroBattleCard } from "../types";

export interface IShopPotion {
    img: string;
    price: number;
    value: number;
    count?: number;
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
