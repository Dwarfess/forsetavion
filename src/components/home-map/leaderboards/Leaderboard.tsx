import React from "react";
import styled from "styled-components";
import mixins from "../../../mixins";
import {ICharacter} from "../character-page/types";

interface ILeaderboard {
    characterList: ICharacter[];
    type: string;
}

const Leaderboard: React.FC<ILeaderboard> = ({
    characterList,
    type
}) => {
    return <LeaderboardContainer>
        <div className="leaderboard-inner-container">
            {characterList.map((character: any, index: number) => {
                return <div className="leaderboard-item" key={index}>
                    <div className="item-block">
                        <div className="item-index">{index + 1}.</div>
                        <div className="item-avatar"><img src={`img/${character.avatar}.jpg`} alt=""/></div>
                        <div className="item-nickname">{character.nickname}</div>
                    </div>
                    <div className="item-score">{character[type]}</div>
                </div>
            })}
        </div>
    </LeaderboardContainer>
}

const LeaderboardContainer = styled.div`
    width: 100%;
    max-height: 850px;
    overflow: auto;
    box-sizing: border-box;
    
    .leaderboard-item {
        ${mixins.flexBetween}
        ${mixins.secondTextColor}
        
        width: 100%;
        border-bottom: 2px solid #8b0000;
        padding: 10px;
        font-size: 50px;
        
        .item-block {
            ${mixins.flexCenter}
            
            .item-index {
                font-size: 40px;
                width: 30px;
            }
            
            .item-avatar {
                ${mixins.flexCenter}

                width: 50px;
                height: 50px;
                margin: 0 10px;

                box-shadow: 0 0 10px 1px black;
                border-radius: 5px;

                img {
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }
`;

export { Leaderboard };
