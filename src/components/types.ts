export interface PrimaryBattleCardType {
    name: string;
    image: string;
    subImage?: string;
    type: string;
    subType?: string;
}

export interface CommonBattleCardType extends PrimaryBattleCardType {
    id: string;
    index: number;
    level: number;
    isVisible: boolean;
    active?: boolean;
}

export interface SimpleBattleCardType extends CommonBattleCardType {
    value: number;
    expReward: number;
    // active?: boolean;
    isNew?: boolean;
}

export interface BattleCardType extends SimpleBattleCardType, ArtifactCardType, HeroBattleCardType {};

export interface ArtifactCardType extends CommonBattleCardType {
    count: number;
    stats: Stat[];
    // active?: boolean;
    isNew?: boolean;
}

export interface Stat {
    name: string;
    title: string;
    value: number;
}

export interface HeroBattleCardType extends CommonBattleCardType {
    health: number;
    // healthBoost: number;
    topCardIndex: number | null;
    topBottomIndex: number | null;
    topRightIndex: number | null;
    topLeftIndex: number | null;
    exp: number | any;
    coins: any;
    crystals: number;
    spheres: number;
    bossParts: number;
    // active: boolean;
    stats: Stat[];
    artifacts: ArtifactCardType[]
}

export interface Direction {
    className: string;
    getOppositeIndex: any;
}
