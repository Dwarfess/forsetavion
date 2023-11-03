import styled from "styled-components";
import { getCardSizeInPercent } from "./utils";
import {HealthIndicator} from "./HealthIndicator";

const BattleCardField = ({onCardClick, onKeyPress, gridLength, battleCard}: any) => {
    return <BattleCardFieldContainer
        onClick={() => onCardClick(battleCard.index)}
        // @ts-ignore
        tabIndex="0"
        card-size={getCardSizeInPercent(gridLength)}
    >
        <BattleCard
            className={`battle-card-${battleCard.index}`}
            data-name={battleCard.image}
        >
            <HealthIndicator battleCard={battleCard}/>
            <CardImage src={battleCard.image} data-name={battleCard.image} />
        </BattleCard>
    </BattleCardFieldContainer>;
};

const CardImage = styled.img`
    max-width: ${(props: any) => props['data-name'] === 'hero.png' ? '100%' : '60%'};
    max-height: ${(props: any) => props['data-name'] === 'hero.png' ? '100%' : '60%'};
    border-radius: 5px;
`;

const BattleCardFieldContainer = styled.div`
    width: ${(props: any) => props['card-size']};
    height: ${(props: any) => props['card-size']};
    flex: 1 0 ${(props: any) => props['card-size']};
    margin: 10px;
    border-radius: 5px;
    outline: none;
    position: relative;
    z-index: 0;
`;

const BattleCard = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    box-shadow: ${(props: any) => props['data-name'] === 'hero.png'
          ? '0px 0px 20px 5px gold' : '5px 5px 20px 5px black'};
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    position: absolute;
    background-color: #e7f2fb;
    z-index: 1;
    //transition: flex 0.7s ease-in;
  transition: transform 3500ms;
  //transition: height 10s linear;
    &.active {
      //height: calc(100% + 320px);
      transform: translateX(calc(100% + 20px));
    }

  @-webkit-keyframes run {
    0% {
      left: 0;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 0;
    }
  }
`;

export { BattleCardField };
