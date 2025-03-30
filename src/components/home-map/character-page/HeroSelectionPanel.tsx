import React, { ReactNode } from "react";
// @ts-ignore
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";
import BattleCardImage from "../../BattleCardImage";
import {TabInfo} from "../../card-info/TabInfo";
import {generateHeroCards} from "../../utils/cardsBuilder";
import {useCharacter} from "../../../store/storeHooks";
import {IHeroBattleCard} from "../../types";
import mixins from "../../../mixins";

interface IHeroSelectionPanel {
    // children: ReactNode
}

const HeroSelectionPanel: React.FC<IHeroSelectionPanel> = () => {
    const { character, setCharacter } = useCharacter();

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

    const clickSelectButton  = (heroCard: IHeroBattleCard) => {
        setCharacter({ ...character, hero: heroCard });
    };

    return (
        <HeroSelectionPanelWrapper>
            <Slider {...settings}>
                {heroCards.map((heroCard, index) => {
                    const selectedHero = character.hero.name === heroCard.name;

                    return (<HeroSelectionPanelContainer key={index}>
                        <div className="header">
                            <div className="battle-card-image">
                                <BattleCardImage battleCard={heroCard}/>
                                <button className="btn" disabled={selectedHero} onClick={() => clickSelectButton(heroCard)}>Select</button>
                                {selectedHero && <div className="selected-hero-title">Selected</div>}
                            </div>
                            <div className="battle-card-content">
                                <div className="battle-card-name">{heroCard.name}</div>
                                <div className="battle-card-description">{heroCard.description || 'An ordinary monster'}</div>
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
        </HeroSelectionPanelWrapper>
    );
}

const HeroSelectionPanelWrapper = styled.div`
    width: 100%;
    display: flex;
    border: 1px solid transparent;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: 20px;
    
    .slick-slider {
        width: 90%;
        margin: 0 auto;
    }

    .btn {
        ${mixins.classicBtn};
        
        margin: 20px;
        width: 70px;
        height: 70px;
        font-size: 40px;
        
        &:before {
            display: none;
        }
    }
`;

const HeroSelectionPanelContainer = styled.div`
    ${mixins.stretchedBackground};
    
    background-image: url("img/select-hero-bg2.png");
    display: block !important;
    width: 600px !important;
    height: 600px;
    padding: 40px;
    margin: 0 auto;
    border-radius: 50px;
    box-sizing: border-box;

    .header, .content, .actions {
        ${mixins.secondTextColor};
        
        //background: transparent;
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
            height: max-content;
            margin-right: 10px;
            position: relative;
            
            .btn {
                ${mixins.classicBtn};
                
                width: 100%;
                margin-top: 5px;
            }
            
            .selected-hero-title {
                position: absolute;
                top: 40%;
                transform: rotate(-45deg);
                font-size: 40px;
                opacity: 0.6;
                text-shadow: 0px 0px 5px #fff;
            }
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
