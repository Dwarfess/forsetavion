import {
    store,
    changeBattleFieldLength,
    changeIsOpenBattleOverModal,
    changeSelectedCardForInfo,
    changeSelectedSecretCard,
    changeIsOpenLevelUpModal,
    changeIsMoving,
    changeBattleCards
} from "./index";

export const getStateValue = (name: string) => {
    const state = structuredClone(store.getState() as any);
    return state[name].value;
}

export const setStateValue = (name: string, data: any) => {
    const reducerMap: any = {
        battleFieldLength: changeBattleFieldLength,
        isOpenBattleOverModal: changeIsOpenBattleOverModal,
        isOpenLevelUpModal: changeIsOpenLevelUpModal,
        selectedCardForInfo: changeSelectedCardForInfo,
        selectedSecretCard: changeSelectedSecretCard,
        isMoving: changeIsMoving,
        battleCards: changeBattleCards
    };

    store.dispatch(reducerMap[name](data));
}
