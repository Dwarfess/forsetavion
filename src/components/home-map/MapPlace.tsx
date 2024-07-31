import styled from "styled-components";
import React from "react";

interface IMapPlace {
    imgName: string;
    title1?: string;
    title2?: string;
    topPosition: string;
    leftPosition: string;
    onClickHandler: () => void;
}

const MapPlace: React.FC<IMapPlace> = ({
    imgName,
    title1,
    title2,
    topPosition,
    leftPosition,
    onClickHandler,
}) => {
    return (
        <MapPlaceContainer
            img-name={imgName}
            top-position={topPosition}
            left-position={leftPosition}
            onClick={onClickHandler}
        >
            <div className="map-pace-highlight"></div>
            <div className="map-place-icon">
                <div className="map-place-title1">{ title1 }</div>
                <div className="map-place-title2">{ title2 }</div>
            </div>
        </MapPlaceContainer>
    );
}

const MapPlaceContainer = styled.div`
    height: 150px;
    width: 150px;
    /* border: 1px solid grey; */
    //margin: 100px auto;
    border-radius: 200px;
    //box-shadow: 0 0 59px 30px white;
    position: absolute;
    font-size: 35px;
    color: #494117;
    text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
    //transform: rotate(20deg);
    text-align: center;
    //padding: 50px 0;
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.5s;
    background-size: cover;
    //transition-delay: 0.5s;
    top: ${(props: any) => props['top-position']}px;
    left: ${(props: any) => props['left-position']}px;

    transform-origin: 50% 50%;
    animation: jump 2s linear alternate infinite;

    @keyframes jump {
        0%   {transform: translate3d(0,0,0) scale3d(1,1,1);}
        20%  {transform: translate3d(0,1%,0) scale3d(1,1,1);}
        100% {transform: translate3d(0,15%,0) scale3d(1.1,.9,1);}
    }

    &:hover { transform: scale(1.05) }

    &:active { transform: scale(1) }
    
    .map-place-icon {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
        background-image: url("${(props: any) => props['img-name']}.png");
        background-size: cover;
        position: absolute;
    }
    
    .map-pace-highlight {
        width: 40%;
        height: 40%;
        border-radius: 100px;
        position: absolute;
        top: 30%;
        left: 30%;
        box-shadow: 19px 50px 30px 20px #000;
    }
`;

export { MapPlace };
