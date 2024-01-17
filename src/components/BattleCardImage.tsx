import React, {useMemo} from 'react';
import styled from "styled-components";
import {BattleCardType} from "./types";

const BattleCardImage = ({battleCard}: {battleCard: BattleCardType}) => {
    // const resolution = useMemo(() => battleCard.type === 'boss-part' ? 'png' : 'jpg', [battleCard]);

    return <>
        {battleCard.type === 'bossPart'
            ? <CardImageBackground />
            : (<CardImage src={`${battleCard.image}.jpg`} data-type={battleCard.type}/>)
        }
        {battleCard.subImage && (
            <CardImage src={`${battleCard.subImage}.png`} className={battleCard.type}/>
        )}
    </>;
};

const CardImageBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    animation: backgroundAnimation 4s infinite linear;
    z-index: -1;

    @keyframes backgroundAnimation {
        0%, 100% {
            background-color: red;
        }
        50% {
            background-color: black;
        }
    }
`;

const CardImage = styled.img`
    max-width: ${(props: any) => props['data-type'] === 'hero' ? '100%' : '100%'};
    max-height: ${(props: any) => props['data-type'] === 'hero' ? '100%' : '100%'};
    border-radius: 5px;
    //z-index: 1;
    //
    //&:last-of-type {
    //    z-index: 2;
    //}

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
