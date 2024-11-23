import React, {useState} from "react";
import styled from "styled-components";
import mixins from "../../../mixins";
import {useActivePage, useBattleFieldLength} from "../../../store/storeHooks";
import {IBattleOptions} from "./types";

interface IMultiBattleOptionPanel {
    title: string;
    type: string;
    action: (data: IBattleOptions) => void;
}

const MultiBattleOptionPanel: React.FC<IMultiBattleOptionPanel> = ({
    title,
    type,
    action
}) => {
    const [ battleOptions, setBattleOptions ] = useState<IBattleOptions>({
        password: '',
        battleFieldLength: 3
    });

    const onApplyBattleClick = () => {
        action(battleOptions)
    }

    const onBattleFieldLengthClick = (val: number)=> {
        setBattleOptions({...battleOptions, battleFieldLength: val});
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setBattleOptions({...battleOptions, password: event.target.value});
    }

    return <MultiBattleOptionPanelContainer>
        <h3>{title}</h3>
        <div className="battle-content">
            <button className="btn apply-button" onClick={onApplyBattleClick}>{type === 'create' ? 'Create' : 'Join'}</button>
            <div className="battle-field-length">
                <button
                    className={`btn ${battleOptions.battleFieldLength === 3 ? 'selected' : ''}`}
                    onClick={() => onBattleFieldLengthClick(3)}
                >
                    3x3
                </button>
                <button
                    className={`btn ${battleOptions.battleFieldLength === 4 ? 'selected' : ''}`}
                    onClick={() => onBattleFieldLengthClick(4)}
                >
                    4x4
                </button>
                <button
                    className={`btn ${battleOptions.battleFieldLength === 5 ? 'selected' : ''}`}
                    onClick={() => onBattleFieldLengthClick(5)}
                >
                    5x5
                </button>
            </div>
            <div className="password-field">
                <input onChange={onPasswordChange} />
                <img src="img/lock.png" className='img-lock'/>
            </div>
        </div>
    </MultiBattleOptionPanelContainer>
}

const MultiBattleOptionPanelContainer = styled.div`    
    h3 {
        ${mixins.standardH2}
        
        margin: 0;
        font-size: 60px;
    }

    .password-field {
        ${mixins.flexCenter};

        margin: 0;

        label, input {
            ${mixins.secondTextColor};

            margin: 10px 0;
            font-size: 50px;
        }

        input {
            width: 75px;
            font-size: 40px;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, .2);
        }

        .img-lock {
            width: 50px;
            height: 50px;
            opacity: 0.7;
        }
    }
        
    .battle-content {
        ${mixins.flexStart}
        
        .apply-button {
            ${mixins.classicBtn}
            
            padding: 10px;
            font-size: 35px;
        }
        
        .battle-field-length {
            ${mixins.flexCenter}
            margin: 0 40px;

            .btn {
                ${mixins.classicBtn}
                
                border-radius: 100px;
                padding: 20px 10px;
            }
        }
    }
`;

export { MultiBattleOptionPanel };
