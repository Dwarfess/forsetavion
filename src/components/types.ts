export interface PrimaryBattleCardType {
    name: string;
    image: string;
    type: string;
}

export interface BattleCardType extends PrimaryBattleCardType {
    id: string;
    health: number;
    index: number;
    topCardIndex?: number | null;
    topBottomIndex?: number | null;
    topRightIndex?: number | null;
    topLeftIndex?: number | null;
    active: boolean;
}
