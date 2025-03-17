import React, { useState } from "react";
import styled from "styled-components";

import {CoinShop} from "./CoinShop";
import {SphereShop} from "./SphereShop";
import {BossShop} from "./BossShop";
import {PvPShop} from "./PvPShop";
import {PotionInventory} from "./PotionInventory";
import {ArtifactInventory} from "./ArtifactInventory";

// import {useActivePage} from "../../../store/storeHooks";
import mixins from "../../../mixins";

interface IShopPage {}

const ShopPage: React.FC<IShopPage> = () => {
    // const { setActivePage } = useActivePage();
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
            {/*<div className="play-game-button" onClick={() => setActivePage('game-selection-page')}></div>*/}
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
    //position: relative;
    
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
`;

const ShopPanel = styled.div`
    ${mixins.stretchedBackground};
    
    background-image: url('img/left-parchment.png');
    margin: 50px 0 0 50px;
    height: 650px;
    display: flex;

    .shop-list {
        .coin-shop {
            background-image: url('img/icon-coins.png');
        }

        .pvp-shop {
            background-image: url('img/icon-pvp-2.png')
        }

        .boss-shop {
            background-image: url('img/icon-boss.png')
        }

        .sphere-shop {
            background-image: url('img/icon-sphere.png')
        }
    }
`;

const InventoryPanel = styled.div`
    ${mixins.stretchedBackground};
    
    background-image: url('img/right-parchment.png');
    margin-right: 50px;
    height: 650px;
    display: flex;

    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    
    .inventory-list {
        .potion-inventory {
            background-image: url('img/icon-potion-2.png');
        }
    }
`;

export { ShopPage };
