import {
    store,
    changeBattleFieldLength,
    changeIsOpenBattleOverModal,
    changeSelectedCardForInfo,
    changeSelectedSecretCard,
    changeIsOpenLevelUpModal,
    changeIsMoving,
    changeIsProcessingAction,
    changeBattleCards,
    changeCharacter,
    changeActiveMap,
    changeActivePage,
    changeOptions,
} from "./index";
import {apiSlice} from "./apiSlice";

export const getStateValue = (name: string) => {
    const state = structuredClone(store.getState() as any);
    return state[name].value;
}

export const setStateValue = (name: string, data: any) => {
    const reducerMap: any = {
        activeMap: changeActiveMap,
        activePage: changeActivePage,
        battleFieldLength: changeBattleFieldLength,
        isOpenBattleOverModal: changeIsOpenBattleOverModal,
        isOpenLevelUpModal: changeIsOpenLevelUpModal,
        selectedCardForInfo: changeSelectedCardForInfo,
        selectedSecretCard: changeSelectedSecretCard,
        isMoving: changeIsMoving,
        isProcessingAction: changeIsProcessingAction,
        battleCards: changeBattleCards,
        character: changeCharacter,
        options: changeOptions,
    };

    store.dispatch(reducerMap[name](data));

    if (name === 'character') {
        store.dispatch(apiSlice.endpoints.updateCurrentCharacter.initiate(data) as any);
    }
}
