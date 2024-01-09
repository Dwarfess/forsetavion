export interface PrimaryBattleCardType {
    name: string;
    image: string;
    secondImage?: string;
    type: string;
}

export interface CommonBattleCardType extends PrimaryBattleCardType {
    id: string;
    index: number;
    level: number;
    isVisible: boolean;
}

export interface BattleCardType extends CommonBattleCardType {
    value: number;
    active?: boolean;
    isNew?: boolean;
}

export interface HeroBattleCardType extends CommonBattleCardType {
    health: number;
    maxHealth: number;
    healthBoost: number;
    topCardIndex: number | null;
    topBottomIndex: number | null;
    topRightIndex: number | null;
    topLeftIndex: number | null;
    exp: number | any;
    coins: any;
    crystals: number;
    active: boolean;
}

export interface Direction {
    className: string;
    getOppositeIndex: any;
}
