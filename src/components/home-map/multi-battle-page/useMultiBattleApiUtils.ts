import { io, Socket } from 'socket.io-client';
import {
    useJoinBattleMutation,
    useCreateBattleMutation,
    useRandomBattleMutation,
    useGetBattleMutation,
} from '../../../store/apiSlice';
import {IBattleData} from "./types";
import {
    executeActionFromAnotherPlayer,
    prepareUpdateBattleDataWithActionName,
} from './multiBattleUtils';
import {setStateValue} from "../../../store/storeUtils";
import { useCharacter, useMultiBattleSocket } from '../../../store/storeHooks';

export const useMultiBattleApiUtils = () => {
    const { character } = useCharacter();
    const { multiBattleSocket, setMultiBattleSocket } = useMultiBattleSocket();

    const [randomBattle] = useRandomBattleMutation();
    const [getBattle] = useGetBattleMutation();
    const [createBattle] = useCreateBattleMutation();
    const [joinBattle] = useJoinBattleMutation();

    const connectToBattle = (battleId: string) => {
        const token = 'sertavion_unique_token';
        const newSocket: Socket = io('https://forsetavion-server-3.onrender.com', {
            query: { token, battleId },
            transports: ['websocket'],
        });

        newSocket.on('connect', () => {
            console.log('Socket.io connection opened');

            setMultiBattleSocket(newSocket);
        });

        newSocket.on('battleUpdate', (result: any) => {
            console.log('Received battle update:', result);

            if (result.action && character.nickname !== result.nickname) {
                executeActionFromAnotherPlayer(result);
                return;
            }
        });

        newSocket.on('error', (error: any) => {
            console.warn('Error with Socket.io:', error);

            getBattle(battleId)
                .unwrap()
                .then((result: any) => {
                    console.log('Battle still exists:', result);
                })
                .catch((error) => {
                    newSocket.close();
                    console.log('Battle doesn’t exist:', error);
                });
        });

        newSocket.on('disconnect', () => {
            console.log('Socket.io connection closed');
            setMultiBattleSocket(null);
            setStateValue('actionDataFromActivePlayer', {});
            setStateValue('isAnotherPlayerActive', false);
        });

        newSocket.emit('joinBattle', battleId);
    }

    const createNewBattle = (data: IBattleData) => {
        return createBattle(data)
            .unwrap()
            .then((result: any) => {
                console.log('Battle created:', result);
                setStateValue('multiBattle', {
                    _id: result._id,
                    players: result.players,
                    battleCards: result.battleCards,
                    mode: 'online',
                    isActive: false,
                });

                setStateValue('isAnotherPlayerActive', true);
                setStateValue('battleCards', result.battleCards);
                setStateValue('activePage', 'battle-page');

                connectToBattle(result._id);
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
                joinToBattle(prepareUpdateBattleDataWithActionName(result));
            })
            .catch((error) => console.error('Error joining battle:', error));
    }

    const joinToBattle = (updatedBattleData: any) => {
        return joinBattle(updatedBattleData)
            .unwrap()
            .then((result: any) => {
                console.log('Joined battle:', result);
                setStateValue('battleFieldLength', result.battleFieldLength);
                setStateValue('multiBattle', {
                    _id: result._id,
                    players: result.players,
                    battleCards: result.battleCards,
                    mode: 'online',
                    isActive: true,
                });

                setStateValue('isAnotherPlayerActive', true);
                setStateValue('battleCards', result.battleCards);
                setStateValue('activePage', 'battle-page');

                connectToBattle(result._id);
            })
            .catch((error) => console.error('Error joining battle:', error));
    }

    const deleteCurrentBattle = (battleId: string) => {
        multiBattleSocket?.close();
    }

    return {
        createNewBattle,
        // updateCurrentBattle,
        getRandomBattleAndJoin,
        deleteCurrentBattle
    }
};
