import {Skill} from "../types";

export const bossCardBuilder = () => {
    return true;
}

export const getSkill = (skills: Skill[], name: string): Skill => {
    return structuredClone(skills.find((skill: Skill) => skill.name === name));
}
