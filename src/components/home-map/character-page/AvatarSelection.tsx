import React, {useState} from "react";
import styled from "styled-components";

import { useCharacter } from "../../../store/storeHooks";
import { avatars } from "./constants";
import mixins from "../../../mixins";

const AvatarSelection = () => {
    const { character, setCharacter } = useCharacter();
    const [ selectedAvatarName, setSelectedAvatarName ] = useState('');

    const clickApplyButton = () => {
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
            <button className="btn">+</button>
        </div>
    </AvatarSelectionContainer>
}

const AvatarSelectionContainer = styled.div`
    h2 {
        ${mixins.standardH2}
    }
    
    .avatar-wrapper {
        margin-bottom: 10px;
        display: flex;
        align-items: end;

        .avatar {
            ${mixins.flexCenter}
            
            width: 100px;
            height: 100px;
            
            box-shadow: 0 0 10px 1px black;
            border-radius: 5px;

            img { 
                width: 80px;
                height: 80px;
            }
        }
        
        .btn {
            ${mixins.classicBtn};

            margin-left: 10px;
            width: 40px;
        }
    }
    
    .avatar-collection {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        
        .btn {
            ${mixins.transparentBtn}
            
            width: 70px;
            height: 70px;
            font-size: 100px;
            
            img { 
                width: 60px;
                height: 60px;
            }
        }
    }
`;

export { AvatarSelection };
