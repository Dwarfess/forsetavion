import { useSelector, useDispatch } from 'react-redux';
import {changeBattleFieldLength, changeHeroCardSlice, RootState} from './index';

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

    const setHeroCard = (val: number) => {
        dispatch(changeHeroCardSlice(val));
    }

    return { heroCard, setHeroCard };
}
