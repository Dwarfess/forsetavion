import { defaultHeroCard } from "../constants";
import { ICharacter } from "./types";

export const defaultCharacter: ICharacter = {
    nickname: 'Sirocco',
    avatar: 'default-avatar',
    hero: defaultHeroCard,
    coins: 0,
    spheres: 0,
    score: 0,
    artifacts: []
};
