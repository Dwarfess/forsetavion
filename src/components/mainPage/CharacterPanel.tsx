import React, { ReactNode } from "react";
import styled from "styled-components";
import BattleCardImage from "../BattleCardImage";
import {getRecalculatedExpRewardString} from "../utils";
import {TabInfo} from "../card-info/TabInfo";
import {defaultHeroCard} from "../constants";

interface ICharacterPanel {
    // children: ReactNode
}

const CharacterPanel: React.FC<ICharacterPanel> = () => {
    return (
        <CharacterPanelContainer>
            <div className="character-menu">
                <div className="avatar">
                    <img src="tmp-avatar.jpg" alt=""/>
                    <div className="avatar-border"></div>
                </div>
                <button className="inventory btn"></button>
                <button className="shop btn"></button>
                <button className="forge btn"></button>
            </div>
            <div className="character-info"></div>
        </CharacterPanelContainer>
    )
}

const CharacterPanelContainer = styled.div`
    background-image: url('character-bg6.png');
    margin: 20px 0 0 50px;
    height: 500px;
    display: flex;
    //width: 700px;
    //width: auto;
    //height: calc(100vh - 50px);

    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    
    .character-menu {
        width: 150px;
        height: 100%;
        //padding: 20px;
        box-sizing: border-box;
        //border: 1px solid red;

        .btn {
            display: block;
            margin: 20px;
            width: 70px;
            min-width: 70px;
            height: 70px;
            letter-spacing: 2px;
            border-radius: 8px;
            font-family: 'Skranji', cursive;
            color: #ffc000;
            font-size: 40px;
            font-weight: 400;
            text-shadow: 0 1px 3px #000;
            text-align: center;
            //padding: 10px 0;
            background: radial-gradient(circle, #8b0000, #8b0000);
            border-top: 4px groove #ffb000;
            border-left: 4px groove #ffb000;
            border-right: 4px groove #ffb000;
            border-bottom: 4px groove #ffb000;
            box-shadow: inset 0px 0px 5px 3px rgba(1, 1, 1, 0.3);
            z-index: 1;
            cursor: pointer;

            &:hover {
                //background: radial-gradient(circle, #e52b2b, #8b0000);
                box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
            }

            &:active {
                //background: radial-gradient(circle, #ec6a6a, #e52b2b);
                box-shadow: none;
            }
        }
        
        .avatar {
            width: 100px;
            height: 100px;
            margin: 50px auto 20px;
            background-image: url('avatar-bg.png');
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            
            img {
                max-width: 70px;
                max-height: 70px;
                border-radius: 70px;
                position: absolute;
                //top: 0;
                z-index: 1;
            }

            .avatar-border {
                width: 100%;
                height: 100%;
                background-image: url('avatar-bg.png');
                background-size: cover;
                position: absolute;
                top: 0;
                z-index: 2;
            }
        }
        
        .inventory {
            width: 70px;
            height: 70px;
            margin: 20px auto;

            background-image: url('icon-inventory3.png');
            background-size: cover;
            box-shadow: 0 0 10px 1px black;
            border-radius: 5px;
        }

        .shop {
            width: 70px;
            height: 70px;
            margin: 20px auto;

            background-image: url('icon-shop.png');
            background-size: cover;
            box-shadow: 0 0 10px 1px black;
            border-radius: 5px;
        }
        
        .forge {
            width: 70px;
            height: 70px;
            margin: 20px auto;

            background-image: url('icon-forge3.png');
            background-size: cover;
            box-shadow: 0 0 10px 1px black;
            border-radius: 5px;
        }
        
    }
`;

export { CharacterPanel };
