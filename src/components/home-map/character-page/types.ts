import { IArtifactCard, IHeroBattleCard } from "../../types";

export interface ICommonShopItem {
    id: string;
    type: string;
    name: string;
    image: string;
    price: number;
    count?: number;
}

export interface IPotion extends ICommonShopItem {
    value: number;
    selected: boolean;
    index?: number;
}

export interface IInventory {
    potions: IPotion[];
    potionLimit: number;
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
    artifacts: IArtifactCard[];
    inventory: IInventory;
}

export interface IUser {
    id?: string;
    email: string;
    password: string;
    character?: ICharacter;
    role: string;
}

export interface IShopItem extends IPotion {}
