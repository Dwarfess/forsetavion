// import {shopPotions} from "../constants";
// import React, {useEffect, useState} from "react";
// import styled from "styled-components";
// import {useCharacter} from "../../../store/storeHooks";
//
// const PotionInventory = () => {
//     const { character } = useCharacter();
//     const [ selectedPurchase, setSelectedPurchase ] = useState(character.inventory.potions[0]);
//     const [ purchaseCount, setPurchaseCount ] = useState(1);
//
//     const decreasePurchaseCount = () => purchaseCount > 1 && setPurchaseCount(purchaseCount - 1);
//     const increasePurchaseCount = () => purchaseCount < 10 && setPurchaseCount(purchaseCount + 1);
//
//     const onBuyPurchaseClick = () => {
//
//     }
//
//     useEffect(() => {
//         setSelectedPurchase(character.inventory.potions[0])
//     }, [character])
//     return <InventoryContainer>
//         <div className="inventory-header">
//             <h2>Potion Inventory</h2>
//             <CoinsBar>
//                 <img src="icon-coins.png" className="coins-icon"/>
//                 <div className="coins-value">{character.coins}</div>
//             </CoinsBar>
//             <CoinsBar>
//                 <img src="icon-sphere.png" className="coins-icon"/>
//                 <div className="spheres-value">{character.spheres}</div>
//             </CoinsBar>
//         </div>
//         { selectedPurchase && (<div className="selected-purchase-wrapper">
//             <div className="purchase selected-purchase">
//                 <img src={`${selectedPurchase.img}.png`} alt=""/>
//                 <div className="purchase-count">{ purchaseCount }</div>
//             </div>
//             <div className="purchase-info">
//                 <p className="purchase-description">This potion increase your health by { selectedPurchase.value }. Can be use only once per battle.</p>
//                 <button className="btn select-btn" onClick={onBuyPurchaseClick}>
//                     Select
//                 </button>
//             </div>
//         </div>)}
//         <div className="purchase-collection">
//             { character.inventory.potions.map((item, index) => (
//                 <div className="purchase btn" onClick={() => setSelectedPurchase(item)} key={index}>
//                     <img src={`${item.img}.png`} alt=""/>
//                     <div className="purchase-count">{ item.count }</div>
//                 </div>
//             ))}
//         </div>
//         {/*<div className="purchase-container">*/}
//         {/*    <div className="purchase btn">10</div>*/}
//         {/*    <div className="purchase btn">20</div>*/}
//         {/*    <div className="purchase btn">50</div>*/}
//         {/*    <div className="purchase btn">100</div>*/}
//         {/*</div>*/}
//     </InventoryContainer>
// }
//
// const InventoryContainer = styled.div`
//     width: 100%;
//     height: 100%;
//
//     .selected-purchase-wrapper {
//         display: flex;
//         align-items: end;
//         margin-bottom: 10px;
//
//         .selected-purchase {
//             zoom: 120%;
//         }
//
//         .purchase-info {
//             margin-left: 10px;
//             .purchase-description {
//                 font-size: 25px;
//                 font-weight: bold;
//                 margin: 0;
//                 color: #494117;
//                 text-shadow: 0px 0px 3px #E6E6E6,
//                 0px 0px 3px #1A1A1A,
//                 0px 0px 3px #E6E6E6,
//                 0px 0px 3px #E6E6E6,
//                 0px 0px 3px #E6E6E6;
//             }
//
//             .select-btn {
//                 width: max-content;
//                 height: max-content;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 font-size: 25px;
//             }
//
//             .btn {
//                 margin: 0;
//                 letter-spacing: 2px;
//                 border-radius: 8px;
//                 font-family: 'Skranji', cursive !important;
//                 color: #ffc000;
//                 font-weight: 400;
//                 text-shadow: 0 1px 3px #000;
//                 text-align: center;
//                 padding: 5px;
//                 background: radial-gradient(circle, #8b0000, #8b0000);
//                 border-top: 4px ridge #ffb000;
//                 border-left: 4px groove #ffb000;
//                 border-right: 4px ridge #ffb000;
//                 border-bottom: 4px groove #ffb000;
//                 box-shadow: inset 0px 0px 5px 3px rgba(1, 1, 1, 0.3);
//             }
//         }
//     }
//
//     .purchase {
//         min-width: 80px;
//         min-height: 80px;
//
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         margin: 10px;
//         position: relative;
//         //box-shadow: 0 0 10px 1px black;
//         //border-radius: 5px;
//         box-sizing: border-box;
//
//         img {
//             width: 100%;
//             height: 100%;
//         }
//
//         .purchase-value {
//             font-size: 50px;
//             color: #ffc000 !important;
//             text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3,  0px 0px 3px #1A1A1A;
//             position: absolute;
//             top: 60px;
//         }
//
//         .purchase-count {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             position: absolute;
//             bottom: 0;
//             width: 30px;
//             height: 30px;
//             font-size: 35px;
//             background-color: rgba(0, 0, 0, 0.2);
//             color: #ffc000;
//             text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3, 0px 0px 3px #1A1A1A;
//             box-shadow: 0 0 5px 1px #ffc000;
//             border-radius: 5px;
//         }
//     }
//
//     .purchase-collection {
//         display: flex;
//     }
//
//     .inventory-header {
//         display: flex;
//
//         h2 {
//             width: 400px;
//         }
//     }
// `;
//
// const CoinsBar = styled.div`
//     display: flex;
//     position: relative;
//     width: 100px;
//     align-items: center;
//     justify-content: center;
//
//     .coins-icon {
//         width: 60px;
//         z-index: 1;
//     }
//
//     .coins-value, .spheres-value {
//         position: absolute;
//         height: 60px;
//         width: 100%;
//         max-width: 100%;
//         padding-top: 18px;
//         line-height: 60px;
//         text-align: center;
//         font-size: 25px;
//         font-weight: bold;
//         color: #494117;
//         text-shadow: 0px 0px 3px #E6E6E6, 0px 0px 3px #1A1A1A, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6, 0px 0px 3px #E6E6E6;
//         z-index: 2;
//         order: 3;
//     }
// `;
import { CommonInventoryBench } from "./CommonInventoryBench";
import {useCharacter} from "../../../store/storeHooks";

const PotionInventory = () => {
    const { character } = useCharacter();

    return <CommonInventoryBench
        title="Potion Inventory"
        items={character.inventory.potions}
        type="potion"
    />
}

export { PotionInventory };
