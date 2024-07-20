import React, { ReactNode } from "react";
// @ts-ignore
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";
import BattleCardImage from "../BattleCardImage";
import {getRecalculatedExpRewardString} from "../utils";
import {TabInfo} from "../card-info/TabInfo";
import {defaultHeroCard} from "../constants";
import {generateHeroCards} from "../utils/cardsBuilder";

interface IHeroSelectionPanel {
    children: ReactNode
}

const HeroSelectionPanel: React.FC<IHeroSelectionPanel> = ({ children }) => {
    const NavigateButton = ({className, symbol, onClick}: any) => <button className={`${className} btn`} onClick={onClick}>{symbol}</button>;

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NavigateButton symbol={">"} />,
        prevArrow: <NavigateButton symbol={"<"} />
    };
    const heroCards = generateHeroCards();
    // const heroCard = heroCards[3]
    return (
        <HeroSelectionPanelWrapper>
            {/*<button className="btn" onClick={() => {}}>⬅</button>*/}

                <Slider {...settings}>
                    {heroCards.map((heroCard, index) => {
                        return (<HeroSelectionPanelContainer key={index}>
                            <div className="header">
                                <div className="battle-card-image"><BattleCardImage battleCard={heroCard}/></div>
                                <div className="battle-card-content">
                                    <div className="battle-card-name">{heroCard.name}</div>
                                    <div
                                        className="battle-card-description">{heroCard.description || 'An ordinary monster'}</div>
                                </div>
                            </div>
                            <div className="content">
                                <TabInfo selectedBattleCard={heroCard}/>
                            </div>
                            <div className="actions">
                                {/*<button className="btn" onClick={onCloseClick}>Close</button>*/}
                            </div>
                        </HeroSelectionPanelContainer>);
                    })}
                </Slider>
            {/*<button className="btn" onClick={() => {}}>⮕</button>*/}
        </HeroSelectionPanelWrapper>
    )
}

const HeroSelectionPanelWrapper = styled.div`
    width: 100%;
    display: flex;
    //border: 1px solid red;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    
    .slick-slider {
        width: 90%;
        margin: 0 auto;
    }

    .btn {
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
        border-top: 4px ridge #ffb000;
        border-left: 4px groove #ffb000;
        border-right: 4px ridge #ffb000;
        border-bottom: 4px groove #ffb000;
        box-shadow: inset 0px 0px 5px 3px rgba(1, 1, 1, 0.3);
        z-index: 1;
        
        &:before {
            display: none;
        }
        
        &:hover {
            background: radial-gradient(circle, #e52b2b, #8b0000);
            box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
        }
        
        &:active {
            background: radial-gradient(circle, #ec6a6a, #e52b2b);
            box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
        }
    }
`;

const HeroSelectionPanelContainer = styled.div`
    //width: 700px;
    //height: 900px;
    //box-shadow: none;
    //background-color: transparent;
    display: block !important;
    width: 500px !important;
    height: 500px;
    background-image: url("select-hero-bg2.png");
    background-size: 100% 100%; /* Stretch the image to fill the block */
    background-repeat: no-repeat; /* Prevent the image from repeating */
    background-position: center center; /* Center the image within the block */
    //background-size: cover;
    //padding: 100px;
    //background-color: rgba(239, 233, 233, 0.47);
    padding: 40px;
    margin: 0 auto;
    border-radius: 50px;
    box-sizing: border-box;

    .header, .content, .actions {
        color: #8b0000;
        background: transparent;
        font-family: 'MagicalWorld';
        font-weight: bold;
        padding: 0px 20px;
    }

    .content, .actions {
        font-size: 30px;
    }

    .header {
        border-bottom: 1px solid rgba(34, 36, 38, .15);
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .actions {
        position: absolute;
        bottom: 50px;
        right: 50px;
    }

    .header {
        display: flex;
        font-size: 30px;

        .battle-card-image {
            width: 30%;
            margin-right: 10px;
            position: relative;
            display: flex;
        }
    }

    .battle-card-content {
        width: 70%;

        .battle-card-name {
            font-size: 50px;
            margin-bottom: 10px;
        }

        .battle-card-description {

        }
    }
`;

export { HeroSelectionPanel };
