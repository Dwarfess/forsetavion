import {useJoinBattleMutation, useCreateBattleMutation, useRandomBattleMutation} from "../../../store/apiSlice";
import {IBattleData} from "./types";
import {updateBattleData} from "./battleUtils";
import {setStateValue} from "../../../store/storeUtils";

export const useBattleApiUtils = () => {
    const [randomBattle] = useRandomBattleMutation();
    const [createBattle] = useCreateBattleMutation();
    const [joinBattle] = useJoinBattleMutation();

    const createNewBattle = (data: IBattleData) => {
        return createBattle(data)
            .unwrap()
            .then((result: any) => {
                console.log('Battle created:', result);
                setStateValue('battleCards', result.battleCards);
                setStateValue('activePage', 'battle-page');
            })
            .catch((error) => {
                console.error('Error creating battle:', error);
                setStateValue('battleFieldLength', 0);
            });
    }

    const getRandomBattleAndJoin = () => {
        return randomBattle()
            .unwrap()
            .then((result: any) => {
                console.log('Get random battle:', result);
                joinToBattle(updateBattleData(result));
            })
            .catch((error) => console.error('Error joining battle:', error));
    }

    const joinToBattle = (updatedBattleData: IBattleData) => {
        return joinBattle(updatedBattleData)
            .unwrap()
            .then((result: any) => {
                console.log('Joined battle:', result);
                setStateValue('battleFieldLength', result.battleFieldLength);
                setStateValue('activePage', 'battle-page');
                setStateValue('battleCards', result.battleCards);
            })
            .catch((error) => console.error('Error joining battle:', error));
    }

    return {
        createNewBattle,
        getRandomBattleAndJoin
    }
};
