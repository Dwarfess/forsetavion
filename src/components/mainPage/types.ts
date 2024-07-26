import { IArtifactCard, IHeroBattleCard } from "../types";

export interface ICharacter {
    nickname: string;
    avatar: string;
    hero: IHeroBattleCard;
    coins: number;
    spheres: number;
    score: number;
    artifacts: IArtifactCard[]
}
