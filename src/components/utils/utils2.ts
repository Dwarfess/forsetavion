import {Skill} from "../types";
// import {getStateValue} from "../../store/storeUtils";

// TODO: move to another place (problem with call before initialize)

export const generateSkill = (skills: Skill[], name: string): Skill => {
    return structuredClone(skills).find((skill: Skill) => skill.name === name);
}

// export const generateStat = (stats: Stat[], name: string, value: number = 0) => {
//     return structuredClone(stats).find((stat: Stat) => {
//         stat.value = value;
//         return stat.name === name;
//     });
// }
