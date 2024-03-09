import {
    store,
    changeBattleFieldLength
} from './index';

export const getStateValue = (name: string) => {
    const state = structuredClone(store.getState() as any);
    return state[name].value;
}

export const setStateValue = (name: string, data: any) => {
    const reducerMap: any = {
        battleFieldLength: changeBattleFieldLength
    };

    store.dispatch(reducerMap[name](data));
}


