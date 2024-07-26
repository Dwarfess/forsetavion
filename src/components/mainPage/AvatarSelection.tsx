import styled from "styled-components";
import React, {useState} from "react";
import {useCharacter} from "../../store/storeHooks";

const avatars = [
    'default-avatar',
    'beast-5',
    'beast-6',
    'beast-7',
    'beast-8',
    'beast-9',
    'beast-10',
    'beast-11',
    'beast-12',
    'beast-13',
    'beast-14',
];

const AvatarSelection = () => {
    const { character, setCharacter } = useCharacter();
    const [ selectedAvatarName, setSelectedAvatarName ] = useState('');

    const clickApplyButton = () => {
        // @ts-ignore
        setCharacter({ ...character, avatar: selectedAvatarName });
        setSelectedAvatarName('');
    }

    const clickCancelButton = () => {
        setSelectedAvatarName('');
    }

    return <AvatarSelectionContainer>
        <h2>Select your avatar</h2>

        <div className="avatar-wrapper">
            <div className="avatar"><img src={`${selectedAvatarName || character.avatar}.jpg`} alt=""/></div>
            {selectedAvatarName && <button className="btn" onClick={clickApplyButton}>✔</button>}
            {selectedAvatarName && <button className="btn" onClick={clickCancelButton}>✖</button>}
        </div>
        <div className="avatar-collection">
            { avatars.map((name: string, index) => (
                <button className="btn" onClick={() => setSelectedAvatarName(name)} key={index}>
                    <img src={`${name}.jpg`} alt=""/>
                </button>
            ))}
            <button className="avatar btn">+</button>
        </div>
    </AvatarSelectionContainer>
}

const AvatarSelectionContainer = styled.div`
    h2 {
        margin: 0 0 5px 0;
        font-size: 35px;
        font-weight: bold;
        color: #494117;
        text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
    }
    
    .avatar-wrapper {

        margin-bottom: 10px;
        display: flex;
        align-items: end;

        .avatar {
            width: 100px;
            height: 100px;

            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px 1px black;
            border-radius: 5px;

            img { width: 80px }
        }
        
        .btn {
            margin-left: 10px;
            width: 40px;
            height: 35px;
            letter-spacing: 2px;
            border-radius: 8px;
            font-family: 'Skranji', cursive;
            color: #ffc000;
            font-size: 25px;
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

            &:hover {
                background: radial-gradient(circle, #e52b2b, #8b0000);
                box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
            }

            &:active {
                background: radial-gradient(circle, #ec6a6a, #e52b2b);
                box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
            }
        }
    }
    
    .avatar-collection {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        
        .btn {
            width: 70px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 100px;
            padding: 0;
            background-color: transparent;
            box-shadow: 0 0 10px 1px black;
            border-radius: 5px;
            cursor: pointer;

            &:hover { box-shadow: 0 0 10px 2px black; }

            &:active { box-shadow: none }

            img { width: 60px }
        }
    }
`;

export { AvatarSelection };
