import { useSelector, useDispatch } from 'react-redux';
import {
    changeBattleFieldLength,
    changeHeroCard,
    changeSelectedCardForInfo,
    changeIsOpenBattleOverModal,
    RootState
} from './index';

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

export const useIsOpenBattleOverModal = () => {
    const dispatch = useDispatch();
    const isOpenBattleOverModal = useSelector((state: RootState) => state.isOpenBattleOverModal.value);

    const setIsOpenBattleOverModal = (val: any) => {
        dispatch(changeIsOpenBattleOverModal(val));
    }

    return { isOpenBattleOverModal, setIsOpenBattleOverModal };
}
