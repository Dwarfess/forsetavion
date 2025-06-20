import { css } from 'styled-components';

const mainFontFace = css`
    font-family: 'MagicalWorld';
`;

const secondFontFace = css`
    font-family: 'Skranji', cursive;
`;

const firstTextColor = css`
    color: #494117 !important;
    text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
`;

const secondTextColor = css`
    color: #8b0000 !important;
`;

const thirdColor = css`
    color: #ffc000 !important;
    text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3,  0px 0px 3px #1A1A1A;
`;

const flexStart = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const flexEnd = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const flexBetween = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const flexCenterEnd = css`
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

const modernH1 = css`
    ${mainFontFace}
    
    background-image: url("gifs/giphy.webp");
    background-size: cover;
    color: transparent !important;
    -webkit-background-clip: text;
    
    margin: 0;
    font-size: 200px;
    line-height: 200px;
    text-align: center;
`;

const modernH2 = css`
    ${modernH1}

    font-size: 80px;
    line-height: 80px;
`;

const standardH2 = css`
    ${firstTextColor};
    ${mainFontFace};

    font-size: 35px;
`;

const stretchedBackground = css`
    background-size: 100% 100%; /* Stretch the image to fill the block */
    background-repeat: no-repeat; /* Prevent the image from repeating */
    background-position: center center; /* Center the image within the block */
`;

const transparentBtn = css`
    ${mainFontFace};
    ${flexCenter};
    ${firstTextColor};
    
    margin: 0;
    padding: 0;
    background-color: transparent;
    background-size: cover;
    box-shadow: 0 0 10px 1px black;
    border-radius: 5px;
    z-index: 1;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 10px 2px black;
    }

    &:active {
        box-shadow: 0 0 3px 0 black;
    }
    
    &:disabled {
        opacity: .5;
        pointer-events: none;
    }
`;

const classicBtn = css`
    ${secondFontFace};
    ${flexCenter};
    
    //margin-left: 10px;
    width: max-content;
    height: max-content;
    padding: 5px;
    margin: 0;
    letter-spacing: 2px;
    border-radius: 8px;
    color: #ffc000;
    font-size: 25px;
    font-weight: 400;
    text-shadow: 0 1px 3px #000;
    text-align: center;
    background: radial-gradient(circle, #8b0000, #8b0000);
    border-top: 4px ridge #ffb000;
    border-left: 4px groove #ffb000;
    border-right: 4px ridge #ffb000;
    border-bottom: 4px groove #ffb000;
    box-shadow: inset 0px 0px 5px 3px rgba(1, 1, 1, 0.3);
    cursor: pointer;
    z-index: 1;

    &:hover {
        background: radial-gradient(circle, #e52b2b, #8b0000);
        box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
    }

    &:active {
        background: radial-gradient(circle, #ec6a6a, #e52b2b);
        box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
    }

    &:disabled {
        opacity: .5;
        pointer-events: none;
    }

    &.selected {
        background: radial-gradient(circle, #e52b2b, #8b0000);
        box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2);
        transform: scale(1.2);
        margin: 0 5px;
    }
`;

const linkBtn = css`
    ${mainFontFace}
    ${secondTextColor}
    
    cursor: pointer;
    padding: 10px 30px;
    text-decoration: underline;
`;

const positionCenter = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default {
    mainFontFace,
    secondFontFace,
    firstTextColor,
    secondTextColor,
    thirdColor,
    flexStart,
    flexEnd,
    flexBetween,
    flexCenter,
    flexCenterEnd,
    modernH1,
    modernH2,
    standardH2,
    stretchedBackground,
    transparentBtn,
    classicBtn,
    linkBtn,
    positionCenter,
};
