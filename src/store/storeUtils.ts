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
    changeMultiBattle,
    changeMultiBattleSocket,
    changeCharacter,
    changeActiveMap,
    changeActivePage,
    changeOptions,
    changeActionDataFromActivePlayer,
    changeIsAnotherPlayerActive,
    changeActionCount,
} from './index';
import {apiSlice} from './apiSlice';

export const getStateValue = (name: string) => {
    const state = name === 'multiBattleSocket' ? store.getState() : structuredClone({
        ...store.getState(),
        multiBattleSocket: undefined // Виключаємо multiBattleSocket з копіювання
    });
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
        multiBattle: changeMultiBattle,
        multiBattleSocket: changeMultiBattleSocket,
        character: changeCharacter,
        options: changeOptions,
        actionDataFromActivePlayer: changeActionDataFromActivePlayer,
        isAnotherPlayerActive: changeIsAnotherPlayerActive,
        actionCount: changeActionCount,
    };

    store.dispatch(reducerMap[name](data));

    if (name === 'character') {
        store.dispatch(apiSlice.endpoints.updateCurrentCharacter.initiate(data) as any);
    }
}
