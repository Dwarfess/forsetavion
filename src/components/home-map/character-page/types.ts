import { IArtifactCard, IHeroBattleCard } from "../../types";

export interface ICommonShopItem {
    id: string;
    type: string;
    image: string;
    price: number;
    count?: number;
}

export interface IShopPotion extends ICommonShopItem {
    value: number;
    selected: boolean;
}

export interface IInventory {
    potions: IShopPotion[]
}

export interface ICharacter {
    _id?: string;
    userId: string;
    userRole: string;
    nickname: string;
    avatar: string;
    hero: IHeroBattleCard;
    coins: number;
    spheres: number;
    score: number;
    artifacts: IArtifactCard[],
    inventory: IInventory
}

export interface IUser {
    id?: string;
    email: string;
    password: string;
    character?: ICharacter;
    role: string;
}

export interface IShopItem extends IShopPotion {}
