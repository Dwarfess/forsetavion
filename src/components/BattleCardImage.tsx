import React, {useMemo} from 'react';
import styled from "styled-components";
import {BattleCardType, Skill} from "./types";

interface IBattleCardImage {
    battleCard: BattleCardType | any,
    radius?: number,
    format?: string
}

const BattleCardImage: React.FC<IBattleCardImage> = ({battleCard, radius = 5, format = 'jpg'}) => {
    // const resolution = useMemo(() => battleCard.type === 'boss-part' ? 'png' : 'jpg', [battleCard]);

    return <>
        {battleCard.type === 'bossPart'
            ? <CardImageBackground />
            : (<CardImage src={`img/${battleCard.image}.${format}`} data-type={battleCard.type} data-radius={radius}/>)
        }
        {battleCard.subImage && (
            <CardImage src={`img/${battleCard.subImage}.png`} className={battleCard.type} data-radius={radius}/>
        )}
        <CardImageErrorBackground className="card-image-error-background" />
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

const CardImageErrorBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;

    background: rgba(255, 0, 0, 0.45);
    z-index: 5;
    
    display: none;
    
    &.card-image-error-background.error { display: block }
`;

const CardImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: ${(props: any) => props['data-radius']}px;

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
