import styled from "styled-components";
import React, {useState} from "react";
import {shopPotions} from "../constants";

const CoinShop = () => {
    const [ selectedPurchase, setSelectedPurchase ] = useState(shopPotions[0]);
    const [ purchaseCount, setPurchaseCount ] = useState(1);

    const decreasePurchaseCount = () => purchaseCount > 1 && setPurchaseCount(purchaseCount - 1);
    const increasePurchaseCount = () => purchaseCount < 10 && setPurchaseCount(purchaseCount + 1);

    const onBuyPurchaseClick = () => {

    }

    return <CoinShopContainer>
        <h2>Coin Shop</h2>
        <div className="selected-purchase-wrapper">
            <div className="purchase selected-purchase">
                {/*<div className="purchase-value">{ selectedPotion.value }</div>*/}
                <img src={`${selectedPurchase.img}.png`} alt=""/>

                <div className="purchase-count-wrapper">
                    <div className="purchase-count-button" onClick={decreasePurchaseCount}>-</div>
                    <div className="purchase-count">{ purchaseCount }</div>
                    <div className="purchase-count-button" onClick={increasePurchaseCount}>+</div>
                </div>
            </div>
            <div className="purchase-info">
                <p className="purchase-description">This potion increase your health by { selectedPurchase.value }. Can be use only once per battle.</p>
                <button className="btn buy-purchase" onClick={onBuyPurchaseClick}>
                    <div className="purchase-price">{ selectedPurchase.price * purchaseCount }</div>
                    <img src="indicator-sphere.png" alt=""/>
                </button>

            </div>
        </div>
        <div className="purchase-collection">
            { shopPotions.map((purchase, index) => (
                <div className="purchase btn" onClick={() => setSelectedPurchase(purchase)} key={index}>
                    <img src={`${purchase.img}.png`} alt=""/>
                    {/*<div className="purchase-value">{ potion.value }</div>*/}
                </div>
            ))}
        </div>
        {/*<div className="purchase-container">*/}
        {/*    <div className="purchase btn">10</div>*/}
        {/*    <div className="purchase btn">20</div>*/}
        {/*    <div className="purchase btn">50</div>*/}
        {/*    <div className="purchase btn">100</div>*/}
        {/*</div>*/}
    </CoinShopContainer>
}

const CoinShopContainer = styled.div`
    width: 100%;
    height: 100%;
    
    .selected-purchase-wrapper {
        display: flex;
        align-items: end;
        margin-bottom: 10px;
        
        .selected-purchase {
            zoom: 120%;
        }
        
        .purchase-info {
            margin-left: 10px;
            .purchase-description {
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

            .buy-purchase {
                width: max-content;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 35px;

                .purchase-price { padding: 5px; }
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
    
    .purchase {
        min-width: 80px;
        min-height: 80px;

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

        .purchase-value {
            font-size: 50px;
            color: #ffc000 !important;
            text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3,  0px 0px 3px #1A1A1A;
            position: absolute;
            top: 60px;
        }
        
        .purchase-count-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            
            position: absolute;
            bottom: 0;
            //right: 0;
            
            .purchase-count-button {
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
            
            .purchase-count {
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
    
    .purchase-collection {
        display: flex;

        //.purchase {
        //    zoom: 80%;
        //    //margin: 12px;
        //}
    }
`;

export { CoinShop };
