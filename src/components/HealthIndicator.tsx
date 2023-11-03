import styled from "styled-components";

import { BattleCardType } from "./types";


const HealthIndicator = ({ battleCard }: { battleCard: BattleCardType }) => {
    return <HealthIndicatorWrapper >
        { (battleCard.type === 'hero' || battleCard.type === 'potion') && (
            <>
                <img src="heart-indicator.png" className="heart"/>
                <span className="healthAmount">{battleCard.health}</span>
            </>
        )}
        { battleCard.type === 'enemy' && (
            <>
                <img src="shield-indicator2.png" className="shield"/>
                <span className="mightAmount">{battleCard.health}</span>
            </>
        )}

    </HealthIndicatorWrapper>;
};

const HealthIndicatorWrapper = styled.span`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 25%;
  
  .heart {
    position: relative;
    width: 100%;
    animation: pulse 2s ease infinite;
  }

  .shield {
    position: relative;
    width: 100%;
    animation: lds-dual-ring 5s linear infinite;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-width: 600;
    font-family: 'Arial';

    &.healthAmount {
      color: white;
    }

    &.mightAmount {
      color: black;
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  @keyframes lds-dual-ring {
    0% {transform: rotate(0)}
    100% {transform: rotate(360deg)}
  }

`;

export { HealthIndicator };