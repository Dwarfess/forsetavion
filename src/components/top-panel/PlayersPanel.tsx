import React from "react";
import styled from "styled-components";
import mixins from "../../mixins";
import { useMultiBattle } from '../../store/storeHooks';

interface IPlayersPanelPanel {
    // players: IBattlePlayer[]
}

const PlayersPanel: React.FC<IPlayersPanelPanel> = () => {
    const { multiBattle } = useMultiBattle();
    return <PlayersPanelContainer>
        <div className="timer">40</div>
        { multiBattle.players.map((player, index) => {
                return <div className="player-info" key={index}>
                    <div className="avatar"><img src={`img/${player.avatar}.jpg`} alt=""/></div>
                    <div className="nickname">{ player.nickname }</div>
                </div>
            })
        }

        { multiBattle.players.length === 1 ? <div className="loading">Loading ... </div> : <></> }
    </PlayersPanelContainer>
}

const PlayersPanelContainer = styled.div`
    ${mixins.flexBetween}
    
    margin-bottom: 20px;
    position: relative;
    
    .timer {
        ${mixins.standardH2}
        ${mixins.positionCenter}
        
        margin-top: -30px;
        font-size: 80px;
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
    }
    
    .loading {
        ${mixins.standardH2}


        font-size: 50px;
        margin: 10px;
    }
`;

export { PlayersPanel };
