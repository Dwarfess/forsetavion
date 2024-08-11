import React, {FC, useEffect, useState} from "react";
import styled from "styled-components";
import {useCharacter} from "../../../store/storeHooks";
import {IShopItem} from "../../character-page/types";

interface ICommonInventoryBench {
    title: string
    items: IShopItem[];
    type: string;
}

const CommonInventoryBench: FC<ICommonInventoryBench> = ({
    title,
    items,
    type
}) => {
    const { character, setCharacter } = useCharacter();
    const [ selectedItem, setSelectedItem ] = useState(items[0]);
    const [ selectedItemCount, setSelectedItemCount ] = useState(1);

    const decreasePurchaseCount = () => selectedItemCount > 1 && setSelectedItemCount(selectedItemCount - 1);
    const increasePurchaseCount = () => selectedItemCount < 10 && setSelectedItemCount(selectedItemCount + 1);

    const onSelectClick = () => {
        const updatedItems = structuredClone(items).map((item: IShopItem) => {
            item.selected = item.id === selectedItem.id;

            return item;
        });

        setCharacter({
            ...character,
            inventory: {
                // TODO: move to utils
                // potions: []
                potions: updatedItems
            }
        });
    }

    const removeItem = (e: any, selectedItemId: string) => {
        e.stopPropagation();

        setCharacter({
            ...character,
            inventory: {
                // TODO: move to utils
                // potions: []
                potions: items.filter(item => item.id !== selectedItemId)
            }
        });
    }

    useEffect(() => {
        const definedSelectedItem = items.find(item => item.selected)
        setSelectedItem(definedSelectedItem || items[0]);
    }, [character]);

    return <InventoryContainer>
        <div className="inventory-header">
            <h2>{ title }</h2>
            <CoinsBar>
                <img src="icon-coins.png" className="coins-icon"/>
                <div className="coins-value">{character.coins}</div>
            </CoinsBar>
            <CoinsBar>
                <img src="icon-sphere.png" className="coins-icon"/>
                <div className="spheres-value">{character.spheres}</div>
            </CoinsBar>
        </div>
        { selectedItem && (<div className="selected-inventory-item-wrapper">
            <div className="inventory-item selected-inventory-item">
                <img src={`${selectedItem.img}.png`} alt=""/>
                { selectedItem.selected && <div className="selected-title">Selected</div>}
                {/*<div className="inventory-item-count">{ selectedItemCount }</div>*/}
            </div>
            <div className="inventory-item-info">
                <p className="inventory-item-description">This potion increase your health by { selectedItem.value }. Can be use only once per battle.</p>
                { !selectedItem.selected && <button className="btn select-btn" onClick={onSelectClick}>Select</button>}
            </div>
        </div>)}
        <div className="inventory-item-collection">
            { items.map((item, index) => (
                <div className="inventory-item btn" onClick={() => setSelectedItem(item)} key={index}>
                    <img src={`${item.img}.png`} alt=""/>
                    <div className="inventory-item-count">{ item.count }</div>
                    <div className="inventory-item-remove" onClick={(e) => removeItem(e, item.id)}>×</div>
                </div>
            ))}
        </div>
    </InventoryContainer>
}

const InventoryContainer = styled.div`
    width: 100%;
    height: 100%;
    
    .selected-inventory-item-wrapper {
        display: flex;
        //align-items: end;
        margin-bottom: 10px;
        
        .selected-inventory-item {
            .selected-title {
                position: absolute;
                top: 40%;
                transform: rotate(-45deg);
                font-size: 40px;
                opacity: 0.6;
                text-shadow: 0px 0px 5px #fff;
            }
        }
        
        .inventory-item-info {
            margin-left: 10px;
            .inventory-item-description {
                font-size: 25px;
                font-weight: bold;
                margin: 0;
                color: #494117;
                text-shadow: 0px 0px 3px #E6E6E6,
                0px 0px 3px #1A1A1A,
                0px 0px 3px #E6E6E6,
                0px 0px 3px #E6E6E6,
                0px 0px 3px #E6E6E6;
            }

            .select-btn {
                width: max-content;
                height: max-content;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 25px;
            }

            .btn {
                margin: 0;
                letter-spacing: 2px;
                border-radius: 8px;
                font-family: 'Skranji', cursive !important;
                color: #ffc000;
                font-weight: 400;
                text-shadow: 0 1px 3px #000;
                text-align: center;
                padding: 5px;
                background: radial-gradient(circle, #8b0000, #8b0000);
                border-top: 4px ridge #ffb000;
                border-left: 4px groove #ffb000;
                border-right: 4px ridge #ffb000;
                border-bottom: 4px groove #ffb000;
                box-shadow: inset 0px 0px 5px 3px rgba(1, 1, 1, 0.3);
            }
        }
    }
    
    .inventory-item {
        min-width: 120px;
        max-width: 120px;
        height: 120px;

        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        position: relative;
        //box-shadow: 0 0 10px 1px black;
        //border-radius: 5px;
        box-sizing: border-box;

        img {
            width: 100%;
            height: 100%;
        }

        .inventory-item-value {
            font-size: 50px;
            color: #ffc000 !important;
            text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3,  0px 0px 3px #1A1A1A;
            position: absolute;
            top: 60px;
        }
        
        .inventory-item-count, .inventory-item-remove {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 0;
            right: 0;
            width: 30px;
            height: 30px;
            font-size: 35px;
            background-color: rgba(0, 0, 0, 0.2);
            color: #ffc000;
            text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3, 0px 0px 3px #1A1A1A;
            box-shadow: 0 0 5px 1px #ffc000;
            border-radius: 5px;
        }
        
        .inventory-item-remove {
            display: none;
            top: 0;
            cursor: pointer;
        }
        
        &:hover {
            .inventory-item-remove {
                display: flex;
            }
        } 
    }
    
    .inventory-item-collection {
        display: flex;
        
        .inventory-item { zoom: 70% }
    }
    
    .inventory-header {
        display: flex;
        
        h2 {
            width: 400px;
        }
    }
`;

const CoinsBar = styled.div`
    display: flex;
    position: relative;
    width: 100px;
    align-items: center;
    justify-content: center;

    .coins-icon {
        width: 60px;
        z-index: 1;
    }

    .coins-value, .spheres-value {
        position: absolute;
        height: 60px;
        width: 100%;
        max-width: 100%;
        padding-top: 18px;
        line-height: 60px;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #494117;
        text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
        z-index: 2;
        order: 3;
    }
`;

export { CommonInventoryBench };
