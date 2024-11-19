import React, {useState} from "react";
import styled from "styled-components";
import mixins from "../../../mixins";
import {MultiBattleOptionPanel} from "./MultiBattleOptionPanel";

const MultiBattlePage = () => {
    const onCreateBattleClick = () => {}
    const onJoinBattleClick = () => {}

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
  
        background-image: url("img/multi-center-bg.png"); 
        margin: 0 auto;
        width: 640px;
        height: 600px;
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
