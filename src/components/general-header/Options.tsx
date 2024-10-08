import React, { useState } from "react";
import { Dropdown } from 'semantic-ui-react';
import styled from "styled-components";
import mixins from "../../mixins";
import { ModalX } from "../shared";
import {useOptions} from "../../store/storeHooks";

const countryOptions = [
    { key: 'uk', value: 'uk', flag: 'uk', text: 'English' },
    { key: 'cn', value: 'cn', flag: 'cn', text: 'Chinese' },
    { key: 'ua', value: 'ua', flag: 'ua', text: 'Ukrainian' },
];

const Options = () => {
    const [ isOpenOptionsModal, setIsOpenOptionsModal ] = useState<boolean>(false);
    const { options, setOptions } = useOptions();

    const onOpenButtonClick = () => {
        setIsOpenOptionsModal(true);
    }

    const onCloseButtonClick = () => {
        setIsOpenOptionsModal(false);
    }

    const onMusicVolumeChange = (e: any) => setOptions({
        name: 'music',
        value: e.target.value
    });

    const onSoundsVolumeChange = (e: any) => setOptions({
        name: 'sounds',
        value: e.target.value
    });

    const onLanguageChange = (e: any, data: any) => setOptions({
        name: 'language',
        value: data.value
    });

    return <OptionsWrapper>
        <div className="options-button" onClick={onOpenButtonClick}></div>

        {isOpenOptionsModal && (<ModalX>
            <OptionsContainer>

                <div className="volume-block">
                    <label>Music</label>
                    <div className="range-wrapper">
                        <input type="range" min="0" max="100" value={options.music} step="12.5" onChange={onMusicVolumeChange}/>
                    </div>
                </div>

                <div className="volume-block">
                    <label>Sounds</label>
                    <div className="range-wrapper">
                        <input type="range" min="0" max="100" value={options.sounds} step="12.5" onChange={onSoundsVolumeChange}/>
                    </div>
                </div>

                <div className="volume-block">
                    <label>Language</label>
                    <Dropdown
                        placeholder='Select Country'
                        fluid
                        selection
                        value={options.language}
                        options={countryOptions}
                        onChange={onLanguageChange}
                    />
                </div>

                <div className="actions">
                    <button className="btn" onClick={onCloseButtonClick}>Close</button>
                </div>
            </OptionsContainer>
        </ModalX>)}
    </OptionsWrapper>
}

const OptionsWrapper = styled.div`
    padding: 10px;
    
    .options-button {
        ${mixins.stretchedBackground}
        
        background-image: url("img/icon-options.png");
        width: 70px;
        height: 70px;
        transition: transform .3s ease-in-out;
        
        &:hover {
            cursor: pointer;
            transform: scale(1.1);
        }
    }
`;

const OptionsContainer = styled.div`
    width: 450px;
    margin: 30px auto;
    
    .ui.dropdown {
        ${mixins.firstTextColor}
        
        font-size: 50px;
        padding: 10px;
        margin: 10px auto;
        min-height: max-content;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 10px !important;
        border: 3px solid rgba(0, 0, 0, 0.2) !important;
        
        &.active.selection {
            border-radius: 10px !important;            
        }
        
        .text {
            ${mixins.firstTextColor}
        }
        
        //.search {
        //    min-height: max-content;
        //}

        .dropdown.icon {
            padding: 10px;
        }

        i.flag:not(.icon) {
            zoom: 3;
            margin-right: 10px;
            
            &:before {
                position: absolute;
            }
        }
        
        .menu {
            background-color: rgba(0, 0, 0, 0.1);
            min-height: max-content;
            //border: 3px solid rgba(0, 0, 0, 0.5) !important;
            border-color: rgba(34, 36, 38, .15) !important;
            
            .item {
                border: 2px solid rgba(34, 36, 38, .15);
                .text {
                    ${mixins.firstTextColor}

                    font-size: 50px;
                }
            }
        }
    }

    .volume-block {
        margin-bottom: 50px;
        
        label {
            ${mixins.firstTextColor}
            ${mixins.mainFontFace}
            
            font-size: 50px;
        }
        
        .range-wrapper {
            position: relative;
            width: 100%;
            height: 50px;
            margin: 10px auto;

            &::before,
            &::after {
                ${mixins.firstTextColor}

                position: absolute;
                z-index: 99;
                text-align: center;
                font-size: 40px;
                line-height: 1;
                padding: 8px 15px;
                pointer-events: none;
            }

            &::before {
                content: "+";
                left: 0;
            }

            &::after {
                content: "−";
                right: 0;
            }
        }

        input[type="range"] {
            -webkit-appearance: none;
            background-color: rgba(0, 0, 0, 0.3);
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            border: 3px solid rgba(0, 0, 0, 0.5);
            box-sizing: border-box;

            &[step] {
                background-color: transparent;
                background-image: repeating-linear-gradient(to right,
                rgba(255, 255, 255, 0.2),
                rgba(255, 255, 255, 0.2) 11%,
                rgba(0, 0, 0, 0.1) 12.5%);
            }

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 0;
                box-shadow: -20rem 0 0 20rem rgba(0, 0, 0, 0.3);
            }

            &::-moz-range-thumb {
                border: none;
                width: 0;
                box-shadow: -20rem 0 0 20rem rgba(0, 0, 0, 0.3);
            }
        }
    }
`;

export { Options };
