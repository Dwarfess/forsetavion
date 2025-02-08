import React, { useEffect } from 'react';
import styled from "styled-components";
import mixins from "../../mixins";
import { useIsAnotherPlayerActive, useMultiBattle } from '../../store/storeHooks';
import { PlayersTimer } from './PlayersTimer';
import { IBattlePlayer } from '../home-map/multi-battle-page/types';

interface IPlayersPanelPanel {
    // players: IBattlePlayer[]
}

const PlayersPanel: React.FC<IPlayersPanelPanel> = () => {
    const { multiBattle } = useMultiBattle();
    const { isAnotherPlayerActive } = useIsAnotherPlayerActive();
    const [ players, setPlayers ] = React.useState<IBattlePlayer[]>([]);

    useEffect(() => {
        setPlayers(multiBattle.players);
    }, [multiBattle]);

    useEffect(() => {

    }, [isAnotherPlayerActive]);

    return <PlayersPanelContainer>
        <div className="timer"><PlayersTimer players={players}/></div>
        { players.map((player, index) => {
                return <div className={`player-info ${player.isActive ? 'active' : ''}`} key={index}>
                    <div className={"avatar"}><img src={`img/${player.avatar}.jpg`} alt=""/></div>
                    <div>
                        {/*<div className={`active-indicator ${player.isActive ? 'active' : ''}`}>active</div>*/}
                        <div className="nickname">{ player.nickname }</div>
                    </div>
                </div>
            })
        }

        { players.length === 1 ? <div className="loading">Loading ... </div> : <></> }
    </PlayersPanelContainer>
}

const PlayersPanelContainer = styled.div`
    ${mixins.flexBetween}

    margin-bottom: 20px;
    position: relative;

    .timer {
        ${mixins.positionCenter}
    }

    .player-info {
        ${mixins.flexCenterEnd}
        .avatar {
            ${mixins.flexCenter}

            width: 80px;
            height: 80px;

            box-shadow: 0 0 10px 1px black;
            border-radius: 5px;

            img {
                width: 70px;
                height: 70px;
            }
        }

        .active-indicator {
            ${mixins.firstTextColor}

            font-size: 35px;
            padding: 10px;
            text-align: end;
        }

        .nickname {
            ${mixins.standardH2}

            font-size: 50px;
            margin: 10px;
        }

        &:nth-of-type(3) {
            .avatar {
                order: 1;
            }
        }

        &.active {
            //position: relative;
            //animation: pulse-shadow 2s infinite;
            //
            //@keyframes pulse-shadow {
            //    0% {
            //        box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
            //    }
            //    50% {
            //        box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.6);
            //    }
            //    100% {
            //        box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
            //    }
            //}
            .avatar {
                box-shadow: 0 0 10px 1px #E6E6E6;
            }
                animation: pulse 2s infinite;

                @keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.04);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            //}
        }
    }

    .loading {
        ${mixins.standardH2}


        font-size: 50px;
        margin: 10px;
    }
`;

export { PlayersPanel };
