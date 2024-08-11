import React, {FC, useEffect, useState} from "react";
import {useCharacter} from "../../../store/storeHooks";
import {shopPotions} from "../constants";
import styled, { css } from "styled-components";
import {IShopItem} from "../character-page/types";

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
    const { character, setCharacter } = useCharacter();
    const [ selectedItem, setSelectedItem ] = useState(shopPotions[0]);
    const [ selectedItemCount, setSelectedItemCount ] = useState(1);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const decreaseItemCount = () => selectedItemCount > 1 && setSelectedItemCount(selectedItemCount - 1);
    const increaseItemCount = () => selectedItemCount < 10 && setSelectedItemCount(selectedItemCount + 1);

    const onBuyItemClick = () => {
        setCharacter({
            ...character,
            inventory: {
                // TODO: move to utils
                // potions: []
                potions: [
                    ...character.inventory.potions,
                    {
                        ...selectedItem,
                        id: Math.random().toString(16).slice(2),
                        count: selectedItemCount,
                    }]
            }
        });
    }

    const onSelectItemClick = (item: IShopItem) => {
        setSelectedItemCount(1);
        setSelectedItem(item);
    }

    return <ShopBenchContainer className={`${isVisible ? 'is-visible' : ''}`}>
        <div className="shop-bench-header">
            {/*<h2>Coin Shop</h2>*/}
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
        <div className="selected-shop-item-wrapper">
            <div className="shop-item selected-shop-item">
                {/*<div className="purchase-value">{ selectedPotion.value }</div>*/}
                <img src={`${selectedItem.img}.png`} alt=""/>

                <div className="shop-item-count-wrapper">
                    <div className="shop-item-count-button" onClick={decreaseItemCount}>-</div>
                    <div className="shop-item-count">{ selectedItemCount }</div>
                    <div className="shop-item-count-button" onClick={increaseItemCount}>+</div>
                </div>
            </div>
            <div className="shop-item-info">
                <p className="shop-item-description">This potion increase your health by { selectedItem.value }. Can be use only once per battle.</p>
                <button className="btn buy-shop-item" onClick={onBuyItemClick}>
                    <div className="shop-item-price">{ selectedItem.price * selectedItemCount }</div>
                    <img src={`${currencyIcon}.png`} alt=""/>
                </button>
            </div>
        </div>
        <div className="shop-item-collection">
            { items.map((item, index) => (
                <div className="shop-item btn" onClick={() => onSelectItemClick(item)} key={index}>
                    <img src={`${item.img}.png`} alt=""/>
                    {/*<div className="purchase-value">{ potion.value }</div>*/}
                </div>
            ))}
        </div>
    </ShopBenchContainer>
}

const ShopBenchContainer = styled.div`
    width: 100%;
    height: 100%;

    opacity: 0;
    //transform: translateY(20px);
    transition: opacity 1s ease-in-out, transform 1s ease-in-out;

    &.is-visible {
      opacity: 1;
      //transform: translateY(0);
    }
    //transition: all 0.5s ease;
    
    .shop-bench-header {
        display: flex;

        h2 {
            width: 400px;
        }
    }
    
    .selected-shop-item-wrapper {
        display: flex;
        //align-items: end;
        margin-bottom: 10px;
        
        .selected-shop-item {
            //zoom: 120%;
        }
        
        .shop-item-info {
            margin-left: 10px;
            .shop-item-description {
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

            .buy-shop-item {
                width: max-content;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 35px;

                .shop-item-price { padding: 5px; }
                img { height: 100% }
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
    
    .shop-item {
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

        .shop-item-value {
            font-size: 50px;
            color: #ffc000 !important;
            text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3,  0px 0px 3px #1A1A1A;
            position: absolute;
            top: 60px;
        }
        
        .shop-item-count-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            
            position: absolute;
            bottom: 0;
            //right: 0;
            
            .shop-item-count-button {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 30px;
                height: 30px;
                font-size: 70px;
                padding: 0 30px;
                user-select: none;
                cursor: pointer;
                //background-color: rgba(0, 0, 0, 0.2);
                color: #ffc000;
                text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3, 0px 0px 3px #1A1A1A;
            }
            
            .shop-item-count {
                display: flex;
                align-items: center;
                justify-content: center;
                
                width: 30px;
                height: 30px;
                font-size: 35px;
                background-color: rgba(0, 0, 0, 0.2);
                color: #ffc000;
                text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3, 0px 0px 3px #1A1A1A;
                box-shadow: 0 0 5px 1px #ffc000;
                border-radius: 5px;
            }
        }
    }
    
    .shop-item-collection {
        display: flex; 
        
        .shop-item { zoom: 70% }

        //.purchase {
        //    zoom: 80%;
        //    //margin: 12px;
        //}
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
