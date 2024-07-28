import { useSelector, useDispatch } from 'react-redux';
import {
    RootState,
    changeBattleFieldLength,
    changeHeroCard,
    changeSelectedCardForInfo,
    changeSelectedSecretCard,
    changeIsOpenBattleOverModal,
    changeIsOpenLevelUpModal,
    changeIsMoving,
    changeIsProcessingAction,
    changeBattleCards,
    changeCharacter,
    changeActiveMap,
    changeActivePage,
} from './index';
import { getHeroCard } from "../components/utils";
import {ICharacter} from "../components/character-page/types";

export const useActiveMap = () => {
    const dispatch = useDispatch();
    const activeMap = useSelector((state: RootState) => state.activeMap.value);

    const setActiveMap = (val: string) => {
        dispatch(changeActiveMap(val));
    }

    return { activeMap, setActiveMap };
}

export const useActivePage = () => {
    const dispatch = useDispatch();
    const activePage = useSelector((state: RootState) => state.activePage.value);

    const setActivePage = (val: string) => {
        dispatch(changeActivePage(val));
    }

    return { activePage, setActivePage };
}

export const useBattleFieldLength = () => {
    const dispatch = useDispatch();
    const battleFieldLength = useSelector((state: RootState) => state.battleFieldLength.value);

    const setBattleFieldLength = (val: number) => {
        dispatch(changeBattleFieldLength(val));
    }

    return { battleFieldLength, setBattleFieldLength };
}

export const useHeroCard = () => {
    const dispatch = useDispatch();
    const heroCard = useSelector((state: RootState) => state.heroCard.value);

    const setHeroCard = (val: any) => {
        dispatch(changeHeroCard(val));
    }

    return { heroCard, setHeroCard };
}

export const useSelectedCardForInfo = () => {
    const dispatch = useDispatch();
    const selectedCardForInfo = useSelector((state: RootState) => state.selectedCardForInfo.value);

    const setSelectedCardForInfo = (val: any) => {
        dispatch(changeSelectedCardForInfo(val));
    }

    return { selectedCardForInfo, setSelectedCardForInfo };
}

export const useSelectedSecretCard = () => {
    const dispatch = useDispatch();
    const selectedSecretCard = useSelector((state: RootState) => state.selectedSecretCard.value);

    const setSelectedSecretCard = (val: any) => {
        dispatch(changeSelectedSecretCard(val));
    }

    return { selectedSecretCard, setSelectedSecretCard };
}

export const useIsOpenBattleOverModal = () => {
    const dispatch = useDispatch();
    const isOpenBattleOverModal = useSelector((state: RootState) => state.isOpenBattleOverModal.value);

    const setIsOpenBattleOverModal = (val: any) => {
        dispatch(changeIsOpenBattleOverModal(val));
    }

    return { isOpenBattleOverModal, setIsOpenBattleOverModal };
}

export const useIsOpenLevelUpModal = () => {
    const dispatch = useDispatch();
    const isOpenLevelUpModal = useSelector((state: RootState) => state.isOpenLevelUpModal.value);

    const setIsOpenLevelUpModal = (val: any) => {
        dispatch(changeIsOpenLevelUpModal(val));
    }

    return { isOpenLevelUpModal, setIsOpenLevelUpModal };
}

export const useIsMoving = () => {
    const dispatch = useDispatch();
    const isMoving = useSelector((state: RootState) => state.isMoving.value);

    const setIsMoving = (val: any) => {
        dispatch(changeIsMoving(val));
    }

    return { isMoving, setIsMoving };
}

export const useIsProcessingAction = () => {
    const dispatch = useDispatch();
    const isProcessingAction = useSelector((state: RootState) => state.isProcessingAction.value);

    const setIsProcessingAction = (val: any) => {
        dispatch(changeIsProcessingAction(val));
    }

    return { isProcessingAction, setIsProcessingAction };
}

export const useBattleCards = () => {
    const dispatch = useDispatch();
    const battleCards = useSelector((state: RootState) => state.battleCards.value);
    const heroCard = getHeroCard(battleCards);

    const setBattleCards = (val: any) => {
        dispatch(changeBattleCards(val));
    }

    return { heroCard, battleCards, setBattleCards };
}

export const useCharacter = () => {
    const dispatch = useDispatch();
    const character = useSelector((state: RootState) => state.character.value);

    const setCharacter = (val: ICharacter) => {
        dispatch(changeCharacter(val));
    }

    return { character, setCharacter };
}
