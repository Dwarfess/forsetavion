import { useMultiBattle } from '../../../store/storeHooks';
import { defaultMultiBattle } from '../../../store/constants';
import { useMultiBattleApiUtils } from './useMultiBattleApiUtils';

export const useMultiBattleUtils = () => {
    const {multiBattle, setMultiBattle} = useMultiBattle();
    // const {deleteCurrentBattle} = useBattleApiUtils();
    const {deleteCurrentBattle} = useMultiBattleApiUtils();
// TODO: (checked) logic for delete battle, setMultiBattle and setMultiBattleSocket(null) from newSocket.on('disconnect') SHOULD be in one place
    const resetMultiBattle = () => {
        if (multiBattle._id) {
            deleteCurrentBattle(multiBattle._id);
            setMultiBattle(defaultMultiBattle);
        }
    }

    return { resetMultiBattle };
}
