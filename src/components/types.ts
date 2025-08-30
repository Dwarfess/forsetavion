import { IPotion } from './home-map/character-page/types';

export interface PrimaryBattleCardType {
    name: string;
    image: string;
    subImage?: string;
    description?: string;
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
    skills: Skill[];
    effects: any[];
    // active?: boolean;
    isNew?: boolean;
}

export interface BattleCardType extends SimpleBattleCardType, IArtifactCard, IHeroBattleCard {}

export interface IArtifactCard extends CommonBattleCardType {
    count: number;
    stats: Stat[];
    // active?: boolean;
    isNew?: boolean;
}

export interface Stat {
    name: string;
    title: string;
    value: number;
    defaultValue?: number;
    passiveSkillEffectValue?: number;
    buffEffectValue?: number;
    debuffEffectValue?: number;
    artifactValue?: number;
}

export interface Skill {
    name: string;
    label: string;
    description: string;
    image: string;
    type: string;
    useType: string;
    elementType? : string;
    level: number;
    temporaryPoints: number;
    // value: number;
    // maxCoolDown: number;
    coolDown?: number;
    nearbyCardsOnly?: boolean;
    active?: boolean;
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

export interface IHeroCollectionItem {
    name: string;
    image: string;
    maxHealth: number;
    pDef?: number;
    pAtk?: number;
    mDef?: number;
    mAtk?: number;
    fireResist?: number;
    iceResist?: number;
    poisonResist?: number;
    lifeDrain?: number;
    healBoost?: number;
    expBoost?: number;
    coinBoost?: number;
    skills: string[];
}

export interface IHeroBattleCard extends CommonBattleCardType {
    nickname?: string;
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
    artifacts: IArtifactCard[];
    selectedPotions: IPotion[]
}

export interface Direction {
    className: string;
    getOppositeIndex: any;
}
