import React, { useState } from "react";
import styled from "styled-components";

import {CoinShop} from "./CoinShop";
import {SphereShop} from "./SphereShop";
import {BossShop} from "./BossShop";
import {PvPShop} from "./PvPShop";
import {PotionInventory} from "./PotionInventory";
import {ArtifactInventory} from "./ArtifactInventory";

import {useActivePage} from "../../../store/storeHooks";
import mixins from "../../../mixins";

interface IShopPage {}

const ShopPage: React.FC<IShopPage> = () => {
    const { setActivePage } = useActivePage();
    const [ selectedShop, setSelectedShop ] = useState('coin-shop');
    const [ selectedInventory, setSelectedInventory ] = useState('potion-inventory');
    return (
        <ShopPageContainer>
            <ShopPanel>
                <div className="shop-list">
                    <button className="coin-shop btn" onClick={() => setSelectedShop('coin-shop')}></button>
                    <button className="pvp-shop btn" onClick={() => setSelectedShop('pvp-shop')}></button>
                    <button className="boss-shop btn" onClick={() => setSelectedShop('boss-shop')}></button>
                    <button className="sphere-shop btn" onClick={() => setSelectedShop('sphere-shop')}></button>
                </div>
                <div className="shop-items-container">
                    { selectedShop === 'coin-shop' && <CoinShop /> }
                    { selectedShop === 'pvp-shop' && <PvPShop /> }
                    { selectedShop === 'boss-shop' && <BossShop /> }
                    { selectedShop === 'sphere-shop' && <SphereShop /> }
                </div>
            </ShopPanel>
            <div className="play-game-button" onClick={() => setActivePage('game-selection-page')}></div>
            <InventoryPanel>
                <div className="inventory-items-container">
                    { selectedInventory === 'potion-inventory' && <PotionInventory /> }
                    { selectedInventory === 'artifact-inventory' && <ArtifactInventory /> }
                </div>
                <div className="inventory-list">
                    <button className="potion-inventory btn" onClick={() => setSelectedInventory('potion-inventory')}></button>
                    <button className="artifact-inventory btn" onClick={() => setSelectedInventory('artifact-inventory')}></button>
                </div>
            </InventoryPanel>
        </ShopPageContainer>
    )
}

const ShopPageContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    
    .shop-list, .inventory-list {
        width: 150px;
        height: 100%;
        margin-top: 70px;
        box-sizing: border-box;
        
        .btn {
            ${mixins.transparentBtn};

            width: 70px;
            height: 70px;
            margin: 20px auto;
        }
    }

    .shop-items-container, 
    .inventory-items-container {
        width: 520px;
        margin: 130px 10px;
    }

    .play-game-button {
        width: 150px;
        height: 150px;
        background-image: url("play-game-button.png");
        background-size: cover;
        opacity: .5;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 200px;
        box-shadow: 0 0 20px 5px black;
        cursor: pointer;

        &:hover { box-shadow: 0 0 10px 10px black }
        &:active { box-shadow: 0 0 10px 1px black }
    }
`;

const ShopPanel = styled.div`
    ${mixins.stretchedBackground};
    
    background-image: url('left-parchment.png');
    margin-left: 50px;
    height: 650px;
    display: flex;

    .shop-list {
        .coin-shop {
            background-image: url('icon-coins.png');
        }

        .pvp-shop {
            background-image: url('icon-pvp-2.png')
        }

        .boss-shop {
            background-image: url('icon-boss.png')
        }

        .sphere-shop {
            background-image: url('icon-sphere.png')
        }
    }
`;

const InventoryPanel = styled.div`
    ${mixins.stretchedBackground};
    
    background-image: url('right-parchment.png');
    margin-right: 50px;
    height: 650px;
    display: flex;

    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    
    .inventory-list {
        .potion-inventory {
            background-image: url('icon-potion-2.png');
        }
    }
`;

export { ShopPage };
