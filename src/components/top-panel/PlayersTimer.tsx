import React, { useState, useEffect } from "react";

import styled from 'styled-components';
import mixins from '../../mixins';
import { IBattlePlayer } from '../home-map/multi-battle-page/types';
import { changeTurnAfterTimer } from './playersUtils';
import { useIsOpenBattleOverModal } from '../../store/storeHooks';

interface IPlayersTimer {
    players: IBattlePlayer[]
}

const PlayersTimer: React.FC<IPlayersTimer> = ({players}) => {
    const [ count, setCount ] = useState<number>(60);
    const { isOpenBattleOverModal } = useIsOpenBattleOverModal();

    useEffect(() => {
        if (players.length < 2) return;

        const timerId = setInterval(() => {
            // TODO: change logic to check that current hero health is 0
            if (isOpenBattleOverModal) return;
            if (count === 0) {
                clearInterval(timerId);
                changeTurnAfterTimer();
                return;
            }

            setCount((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [players, isOpenBattleOverModal, count]);

    useEffect(() => {
        setCount(60);
    }, [players]);

    return (
        <TimerContainer>
            {players.length === 2 && count}
        </TimerContainer>
    );
};

const TimerContainer = styled.div`
    ${mixins.standardH2}
    
    margin-top: -70px;
    font-size: 80px;

    //animation: pulse 1s infinite;
    //
    //@keyframes pulse {
    //    0% {
    //        transform: scale(1);
    //    }
    //    50% {
    //        transform: scale(1.1);
    //    }
    //    100% {
    //        transform: scale(1);
    //    }
    //}
`;

export { PlayersTimer };
