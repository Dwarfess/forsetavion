import React, {FC, useState} from "react";
import styled from "styled-components";

import {shopPotions} from "../constants";
import {IShopItem} from "../character-page/types";
import {AnimatedRenderingWrapper} from "../../shared/AnimatedRenderingWrapper";

import {useCharacter} from "../../../store/storeHooks";
import {addItemToInventory} from "./utils";
import mixins from "../../../mixins";

interface ICommonShopBench {
    title: string
    items: IShopItem[];
    type: string;
    currencyIcon: string;
}

const CommonShopBench: FC<ICommonShopBench> = ({
    title,
    items,
    type,
    currencyIcon
}) => {
    const { character } = useCharacter();
    const [ selectedItem, setSelectedItem ] = useState(shopPotions[0]);
    const [ selectedItemCount, setSelectedItemCount ] = useState(1);

    const decreaseItemCount = () => selectedItemCount > 1 && setSelectedItemCount(selectedItemCount - 1);
    const increaseItemCount = () => selectedItemCount < 10 && setSelectedItemCount(selectedItemCount + 1);

    const onBuyItemClick = () => addItemToInventory(selectedItem, selectedItemCount);

    const onSelectItemClick = (item: IShopItem) => {
        setSelectedItemCount(1);
        setSelectedItem(item);
    }

    return <AnimatedRenderingWrapper>
        <ShopBenchContainer>
            <div className="shop-bench-header">
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
            <div className="selected-shop-item-wrapper">
                <div className="shop-item selected-shop-item">
                    <img src={`img/${selectedItem.image}.png`} alt=""/>

                    <div className="shop-item-count-wrapper">
                        <div className="shop-item-count-button" onClick={decreaseItemCount}>-</div>
                        <div className="shop-item-count">{ selectedItemCount }</div>
                        <div className="shop-item-count-button" onClick={increaseItemCount}>+</div>
                    </div>
                </div>
                <div className="shop-item-info">
                    <p className="shop-item-description">This potion increase your health by { selectedItem.value }. Can be use only once per battle.</p>
                    <button className="buy-shop-item" onClick={onBuyItemClick}>
                        <div className="shop-item-price">{ selectedItem.price * selectedItemCount }</div>
                        <img src={`img/${currencyIcon}.png`} alt=""/>
                    </button>
                </div>
            </div>
            <div className="shop-item-collection">
                { items.map((item, index) => (
                    <div className="shop-item" onClick={() => onSelectItemClick(item)} key={index}>
                        <img src={`img/${item.image}.png`} alt=""/>
                    </div>
                ))}
            </div>
        </ShopBenchContainer>
    </AnimatedRenderingWrapper>
}

const ShopBenchContainer = styled.div`
    width: 100%;
    height: 100%;
    
    .shop-bench-header {
        display: flex;

        h2 {
            ${mixins.standardH2};
            
            width: 400px;
        }
    }
    
    .selected-shop-item-wrapper {
        display: flex;
        
        .selected-shop-item {
            box-shadow: none;
            cursor: inherit;
            &:hover, &:active { box-shadow: none }
        }
        
        .shop-item-info {
            margin-left: 10px;
            
            .shop-item-description {
                ${mixins.firstTextColor};
                
                font-size: 25px;
                font-weight: bold;
                margin: 0;
            }

            .buy-shop-item {
                ${mixins.classicBtn}

                height: 40px;
                font-size: 35px;

                .shop-item-price { padding: 5px; }
                img { height: 100%; width: 100%; }
            }
        }
    }
    
    .shop-item {
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
        
        .shop-item-count-wrapper {
            ${mixins.flexCenter};
            ${mixins.thirdColor};
            
            position: absolute;
            bottom: 0;
            
            .shop-item-count-button {
                ${mixins.flexCenter};

                width: 30px;
                height: 30px;
                font-size: 70px;
                padding: 0 30px;
                user-select: none;
                cursor: pointer;
            }
            
            .shop-item-count {
                ${mixins.flexCenter};
                
                width: 30px;
                height: 30px;
                font-size: 35px;
                background-color: rgba(0, 0, 0, 0.2);
                box-shadow: 0 0 5px 1px #ffc000;
                border-radius: 5px;
            }
        }
    }
    
    .shop-item-collection {
        display: flex; 
        
        .shop-item { zoom: 70% }
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

export { CommonShopBench };
