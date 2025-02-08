export interface IBattleOptions {
    password: string;
    battleFieldLength: number;
}

export interface IBattlePlayer {
    nickname: string;
    avatar: string;
    isActive?: boolean;
}

export interface IBattleData {
    _id?: string;
    password: string;
    battleFieldLength: number;
    battleCards: any;
    players: IBattlePlayer[];
    isActive: boolean,
}
