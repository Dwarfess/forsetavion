import React, {useState} from "react";
import styled from "styled-components";
import mixins from "../../../mixins";
import {MultiBattleOptionPanel} from "./MultiBattleOptionPanel";
import {useBattleApiUtils} from "./useBattleApiUtils";
import {useActivePage, useBattleCards, useBattleFieldLength, useCharacter} from "../../../store/storeHooks";
import {IBattleOptions} from "./types";
import {getBattleCardsWithHero} from "../../utils";
import {prepareBattleData} from "./multiBattleUtils";
import { useMultiBattleApiUtils } from './useMultiBattleApiUtils';

const MultiBattlePage = () => {
    const { character } = useCharacter();
    const { setBattleFieldLength } = useBattleFieldLength();
    // const { createNewBattle, getRandomBattleAndJoin } = useBattleApiUtils();
    const { createNewBattle, getRandomBattleAndJoin } = useMultiBattleApiUtils();

    const onCreateBattleClick = async (battleOptions: IBattleOptions) => {
        setBattleFieldLength(battleOptions.battleFieldLength);
        await createNewBattle(prepareBattleData(battleOptions, character, getBattleCardsWithHero()));
    };

    const onJoinBattleClick = async () => {
        await getRandomBattleAndJoin();
    };

    return <MultiBattlePageContainer>
        <div className="create-battle-block">
            <MultiBattleOptionPanel
                title="Create battle"
                type="create"
                action={onCreateBattleClick}
            />
        </div>

        <div className="info-battle-block">
        </div>

        <div className="join-battle-block">
            <MultiBattleOptionPanel
                title="Join to battle"
                type="join"
                action={onJoinBattleClick}
            />
        </div>
    </MultiBattlePageContainer>
}

const MultiBattlePageContainer = styled.div`
    margin-top: 100px;
    width: 100%;
    height: 1200px;
    box-sizing: border-box;
    
    .info-battle-block {
        ${mixins.flexCenter}
        ${mixins.stretchedBackground}
        
        flex-direction: column;
        background-image: url("img/multi-center-bg.png"); 
        margin: 0 auto;
        width: 640px;
        height: 600px;
        font-size: 30px;
    }
    
    .create-battle-block,
    .join-battle-block {
        ${mixins.stretchedBackground}

        width: 690px;
        height: 300px;
        padding: 70px 20px;
        box-sizing: border-box;
    }

    .create-battle-block {
        background-image: url("img/multi-right-bg.png");
    }
    
    .join-battle-block {
        background-image: url("img/multi-left-bg.png");
        padding-left: 100px;
        margin-left: 50px;
    }
`;

export {MultiBattlePage};
