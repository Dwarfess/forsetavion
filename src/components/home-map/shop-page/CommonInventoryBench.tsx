import React, {FC, useEffect, useState} from "react";
import styled from "styled-components";
import {useCharacter} from "../../../store/storeHooks";
import {IShopItem} from "../character-page/types";
import {
    getSelectedItemLength,
    getUnselectedItemLength,
    removeCharacterInventoryItem,
    updateInventoryItem
} from './utils';
import mixins from "../../../mixins";

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
    const { character } = useCharacter();
    const [ selectedItem, setSelectedItem ] = useState<IShopItem>(items[0]);
    // const [ selectedItemCount, setSelectedItemCount ] = useState(1);

    // const decreasePurchaseCount = () => selectedItemCount > 1 && setSelectedItemCount(selectedItemCount - 1);
    // const increasePurchaseCount = () => selectedItemCount < 10 && setSelectedItemCount(selectedItemCount + 1);

    const onSelectClick = () => updateInventoryItem(selectedItem, setSelectedItem);

    const onRemoveClick = (e: any, selectedItem: IShopItem) => {
        e.stopPropagation();

        removeCharacterInventoryItem(selectedItem);
        setSelectedItem(items[0]);
    }

    // useEffect(() => {
    //     const definedSelectedItem = items.find(item => item.selected)
    //     setSelectedItem(definedSelectedItem || items[0]);
    // }, [character]);

    useEffect(() => {
        (!selectedItem || items.length === 0) && setSelectedItem(items[0]);
    }, [items]);

    const isDisabledSelectBtn = () => selectedItem.selected || getUnselectedItemLength(selectedItem.type) === 0;
    const isDisabledUnselectBtn = () => !selectedItem.selected;

    return <InventoryContainer>
        <div className="inventory-header">
            <h2>{ title }</h2>
            <CoinsBar>
                <img src="img/icon-coins.png" className="coins-icon"/>
                <div className="coins-value">{character.coins}</div>
            </CoinsBar>
            <CoinsBar>
                <img src="img/icon-sphere.png" className="coins-icon"/>
                <div className="spheres-value">{character.spheres}</div>
            </CoinsBar>
        </div>
        { selectedItem ? (<div className="selected-inventory-item-wrapper">
            <div className="inventory-item selected-inventory-item">
                <img src={`img/${selectedItem.image}.png`} alt=""/>
                { selectedItem.selected && <div className="selected-title">Selected</div>}
                {/*<div className="inventory-item-count">{ selectedItemCount }</div>*/}
            </div>
            <div className="inventory-item-info">
                <p className="inventory-item-description">This potion increase your health by { selectedItem.value }. Can be use only once per battle.</p>
                <div className="inventory-buttons">
                    <button className="btn select-btn" disabled={isDisabledSelectBtn()} onClick={onSelectClick}>
                        Select
                        <div className="inventory-item-limit">{getSelectedItemLength(selectedItem.type)}</div>
                    </button>
                    <button className="btn select-btn" disabled={isDisabledUnselectBtn()} onClick={onSelectClick}>
                        Unselect
                        <div className="inventory-item-limit">{getUnselectedItemLength(selectedItem.type)}</div>
                    </button>
                </div>
            </div>
        </div>) : <div className="empty-inventory-wrapper">No items</div>}
        <div className="inventory-item-collection">
            {items.map((item, index) => (
                <div className="inventory-item" onClick={() => setSelectedItem(item)} key={index}>
                    <img src={`img/${item.image}.png`} alt="" />
                    <div className="inventory-item-count">{ item.count }</div>
                    <div className="inventory-item-remove" onClick={(e) => onRemoveClick(e, item)}>×</div>
                    { item.selected && <div className="selected-title">Selected</div>}
                </div>
            ))}
        </div>
    </InventoryContainer>
}

const InventoryContainer = styled.div`
    width: 100%;
    height: 100%;

    .inventory-header { 
        display: flex;

        h2 {
            ${mixins.standardH2};

            width: 400px;
        }
    }
    
    .selected-inventory-item-wrapper {
        height: 140px;
        display: flex;
        
        .selected-inventory-item {
            box-shadow: none;
            cursor: inherit;
            &:hover, &:active { box-shadow: none }
        }
        
        .inventory-item-info {
            margin-left: 10px;
            
            .inventory-item-description {
                ${mixins.firstTextColor};
                
                font-size: 25px;
                font-weight: bold;
                margin: 0;
            }

            .select-btn {
                ${mixins.classicBtn};
                
                width: max-content;
                height: max-content;
                font-size: 25px;
            }
                
            .inventory-buttons {
                ${mixins.flexStart};
                gap: 10px;
                
                .inventory-item-limit {
                    border-left: 1px solid #ffc000;
                    font-size: 30px;
                    margin-left: 10px;
                    padding: 0 10px;
                }
            }
        }
    }
    
    .empty-inventory-wrapper {
        ${mixins.firstTextColor};
        ${mixins.flexCenter};
        
        font-size: 50px;
        height: 140px;
    }

    .inventory-item {
        ${mixins.transparentBtn};

        min-width: 120px;
        max-width: 120px;
        height: 120px;
        margin: 10px;
        position: relative;
        box-sizing: border-box;

        img {
            width: 100%;
            height: 100%;
        }
        
        .inventory-item-count, .inventory-item-remove {
            ${mixins.flexCenter};
            ${mixins.thirdColor};
            
            position: absolute;
            bottom: 0;
            right: 0;
            width: 40px;
            height: 40px;
            font-size: 40px;
            background-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 0 5px 1px #ffc000;
            border-radius: 5px;
        }
        
        .inventory-item-remove {
            display: none;
            top: 0;
            font-size: 50px;
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


    .selected-title {
        position: absolute;
        top: 40%;
        transform: rotate(-45deg);
        font-size: 40px;
        opacity: 0.6;
        text-shadow: 0px 0px 5px #fff;
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
