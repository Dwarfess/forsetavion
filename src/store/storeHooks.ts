import { useSelector, useDispatch } from 'react-redux';
import {
    changeBattleFieldLength,
    changeHeroCard,
    changeSelectedCardForInfo,
    changeSelectedSecretCard,
    changeIsOpenBattleOverModal,
    changeIsOpenLevelUpModal,
    changeIsMoving,
    changeBattleCards,
    RootState
} from './index';
import {getHeroCard} from "../components/utils";

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

export const useBattleCards = () => {
    const dispatch = useDispatch();
    const battleCards = useSelector((state: RootState) => state.battleCards.value);
    const heroCard = getHeroCard(battleCards);

    const setBattleCards = (val: any) => {
        dispatch(changeBattleCards(val));
    }

    return { heroCard, battleCards, setBattleCards };
}
