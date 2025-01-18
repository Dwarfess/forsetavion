import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
// import { EventSourcePolyfill } from 'event-source-polyfill';
import {
    useJoinBattleMutation,
    useCreateBattleMutation,
    // useUpdateBattleMutation,
    useRandomBattleMutation,
    useGetBattleMutation,
    useDeleteBattleMutation,
} from '../../../store/apiSlice';
import {IBattleData} from "./types";
import { executeActionFromAnotherPlayer, updateBattleData } from './multiBattleUtils';
import {setStateValue} from "../../../store/storeUtils";
import { useCharacter, useMultiBattle, useMultiBattleSocket } from '../../../store/storeHooks';
// import { executeActionFromAnotherPlayer } from '../../utils';

export const useMultiBattleApiUtils = () => {
    const { character } = useCharacter();
    const { multiBattle } = useMultiBattle();
    const { multiBattleSocket, setMultiBattleSocket } = useMultiBattleSocket();

    const [randomBattle] = useRandomBattleMutation();
    const [getBattle] = useGetBattleMutation();
    const [createBattle] = useCreateBattleMutation();
    // const [updateBattle] = useUpdateBattleMutation();
    const [joinBattle] = useJoinBattleMutation();
    const [deleteBattle] = useDeleteBattleMutation();

    useEffect(() => {
        console.log('multiBattleSocket ************************', multiBattleSocket)
    }, [multiBattleSocket]);

    const connectToBattle = (battleId: string) => {
        const token = 'sertavion_unique_token';
        const newSocket: Socket = io('ws://localhost:8888', {
            query: { token, battleId }, // Передаємо токен і battleId в параметрах запиту
            transports: ['websocket'],  // Використовуємо тільки вебсокет як транспорт
        });

        // createMultiBattleSocket(battleId);

        newSocket.on('connect', () => {
            console.log('Socket.io connection opened');

            setMultiBattleSocket(newSocket);
        });

        // Обробка повідомлень від сервера
        newSocket.on('battleUpdate', (result: any) => {
            console.log('Received battle update:', result);

            // Логіка обробки повідомлень
            if (result.action && character.nickname !== result.nickname) {
                setStateValue('actionDataFromActivePlayer', result);
                executeActionFromAnotherPlayer(result);
                return;
            }

            if (result.battleCards) {
                setStateValue('multiBattle', {
                    _id: result._id,
                    players: result.players,
                    battleCards: result.battleCards,
                    mode: 'online',
                    isActive: true,
                });
                setStateValue('battleCards', result.battleCards);
            }
        });

        // Обробка помилок
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

        // Закриття WebSocket-з'єднання
        newSocket.on('disconnect', () => {
            console.log('Socket.io connection closed');
            setMultiBattleSocket(null);
            // deleteCurrentBattle(multiBattle._id as string);
            // setMultiBattleSocket(null);  // Очищаємо WebSocket, коли він закривається
        });

        // Відправка події при підключенні до батлу
        newSocket.emit('joinBattle', battleId);
    }

    const updateCurrentBattle = (selectedCardIndex: number, newBattleCard: any) => {
        const data = {
            battleId: multiBattle._id,
            action: 'move',
            battleCardFromAnotherPlayer: newBattleCard,
            selectedCardIndex,
            nickname: character.nickname
        };

        // Перевіряємо, чи є підключений сокет
        if (multiBattleSocket) {
            // Відправляємо дані через Socket.io
            multiBattleSocket.emit('battleAction', data);
            console.log('Battle action sent:', data);
        } else {
            console.error('Socket.io is not connected, cannot send data.');
        }
    };

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
                setStateValue('multiBattle', {
                    _id: result._id,
                    players: result.players,
                    battleCards: result.battleCards,
                    mode: 'online',
                    isActive: true,
                });
                setStateValue('battleCards', result.battleCards);
                setStateValue('activePage', 'battle-page');

                connectToBattle(result._id);
            })
            .catch((error) => console.error('Error joining battle:', error));
    }

    const deleteCurrentBattle = (battleId: string) => {
        multiBattleSocket?.close();
        // return deleteBattle(battleId)
        // .unwrap()
        // .then((result: any) => {
        //     console.log('Deleting current battle:', result);
        // })
        // .catch((error) => {
        //     console.error('Error deleting current battle:', error);
        // })
    }

    return {
        createNewBattle,
        updateCurrentBattle,
        getRandomBattleAndJoin,
        deleteCurrentBattle
    }
};
