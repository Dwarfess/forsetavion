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
    description?: string;
    active?: boolean;
}

export interface SimpleBattleCardType extends CommonBattleCardType {
    value: number;
    expReward: number;
    skills: Skill[];
    effects: any[];
    // active?: boolean;
    isNew?: boolean;
}

export interface BattleCardType extends SimpleBattleCardType, IArtifactCard, IHeroBattleCard {};

export interface IArtifactCard extends CommonBattleCardType {
    count: number;
    stats: Stat[];
    // active?: boolean;
    isNew?: boolean;
}

export interface Stat {
    name: string;
    title: string;
    defaultValue?: number;
    value: number;
}

export interface Skill {
    name: string;
    description: string;
    image: string;
    type: string;
    level: number;
    temporaryPoints: number;
    // value: number;
    // maxCoolDown: number;
    coolDown: number;
    nearbyCardsOnly: boolean;
    active: boolean;
    // duration: number;
    // period: number;
    stats: Stat[];
}

export interface Effect {
    name: string,
    image: string,
    type: string,
    stats: Stat[]
}

export interface IHeroBattleCard extends CommonBattleCardType {
    health: number;
    // healthBoost: number;
    topCardIndex: number | null;
    topBottomIndex: number | null;
    topRightIndex: number | null;
    topLeftIndex: number | null;
    exp: number;
    skillPoints: number;
    coins: any;
    crystals: number;
    spheres: number;
    bossParts: number;
    // active: boolean;
    stats: Stat[];
    skills: Skill[];
    effects: any[];
    artifacts: IArtifactCard[]
}

export interface Direction {
    className: string;
    getOppositeIndex: any;
}
