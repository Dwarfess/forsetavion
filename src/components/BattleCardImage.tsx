import React from 'react';
import styled from "styled-components";
import {BattleCardType} from "./types";

const BattleCardImage = ({battleCard}: {battleCard: BattleCardType}) => {
    return <>
        <CardImage src={`${battleCard.image}.jpg`} data-type={battleCard.type}/>
        {battleCard.secondImage && (
            <CardImage src={`${battleCard.secondImage}.png`} className={battleCard.type}/>
        )}
    </>;
};

const CardImage = styled.img`
    max-width: ${(props: any) => props['data-type'] === 'hero' ? '100%' : '100%'};
    max-height: ${(props: any) => props['data-type'] === 'hero' ? '100%' : '100%'};
    border-radius: 5px;

    &.secret {
        position: absolute;
        animation:spin 10s linear infinite;
    }
    
    @-moz-keyframes spin {
        100% { -moz-transform: rotate(360deg); }
    }
    @-webkit-keyframes spin {
        100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes spin {
        100% {
            -webkit-transform: rotate(360deg);
            transform:rotate(360deg);
        }
    }
`;

export default React.memo(BattleCardImage);
