import React, {ReactNode, useEffect, useState} from "react";
import styled from "styled-components";
// import {CharacterInfo} from "./CharacterInfo";
// import {AvatarSelection} from "./AvatarSelection";
import {useActivePage, useCharacter} from "../../../store/storeHooks";
import {CoinShop} from "./CoinShop";
import {SphereShop} from "./SphereShop";
import {BossShop} from "./BossShop";
import {PvPShop} from "./PvPShop";
import {PotionInventory} from "./PotionInventory";
import {ArtifactInventory} from "./ArtifactInventory";

import mixins from "../../../mixins";

interface IShopPage {}

const ShopPage: React.FC<IShopPage> = () => {
    const { character } = useCharacter();
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
                <div className="purchases-container">
                    { selectedShop === 'coin-shop' && <CoinShop /> }
                    { selectedShop === 'pvp-shop' && <PvPShop /> }
                    { selectedShop === 'boss-shop' && <BossShop /> }
                    { selectedShop === 'sphere-shop' && <SphereShop /> }
                </div>
            </ShopPanel>
            <div className="play-game-button" onClick={() => setActivePage('game-selection-page')}></div>
            <InventoryPanel>
                <div className="purchases-container">
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

const ShopPanel = styled.div`
    background-image: url('left-parchment.png');
    margin: 20px 0 0 50px;
    height: 500px;
    display: flex;

    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;

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
    background-image: url('right-parchment.png');
    margin: 20px 50px 0 0;
    height: 500px;
    display: flex;

    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    
    .inventory-list {
        .potion-inventory {
            background-image: url('icon-potion-2.png');
        }
    }
`;

const ShopPageContainer = styled.div`
    h2 {
        font-family: 'MagicalWorld';
        margin: 0 0 5px 0;
        font-size: 35px;
        font-weight: bold;
        color: #494117;
        text-shadow: 0px 0px 3px #E6E6E6,
        0px 0px 3px #1A1A1A,
        0px 0px 3px #E6E6E6,
        0px 0px 3px #E6E6E6,
        0px 0px 3px #E6E6E6;
    }

    .shop-list, .inventory-list {
        width: 150px;
        height: 100%;
        margin-top: 50px;
        box-sizing: border-box;
    }

    .purchases-container {
        //border: 1px solid red;
        width: 520px;
        margin: 90px 10px;
    }

    .btn {
        ${mixins.transparentBtn};
        
        width: 70px;
        height: 70px;
        margin: 20px auto;

    }

    .play-game-button {
        width: 150px;
        height: 150px;
        background-image: url("play-game-button.png");
        background-size: cover;
        opacity: .5;
        position: absolute;
        top: calc(50% - 90px);
        right: 40%;
        border-radius: 200px;
        box-shadow: 0 0 20px 5px black;
        cursor: pointer;

        &:hover { box-shadow: 0 0 10px 10px black }
        &:active { box-shadow: 0 0 10px 1px black }
    }
`;

export { ShopPage };
