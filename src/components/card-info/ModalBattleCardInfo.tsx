import styled from "styled-components";
import BattleCardImage from "../BattleCardImage";
import {TabInfo} from "./TabInfo";
import {getRecalculatedExpRewardString} from "../utils";
import { useSelectedCardForInfo} from "../../store/storeHooks";
import { ModalX } from "../shared";

const ModalBattleCardInfo = () => {
    const { selectedCardForInfo, setSelectedCardForInfo } = useSelectedCardForInfo();

    const onCloseClick = () => {
        setSelectedCardForInfo(null);
    }

    return (
        <ModalX>
            <ModalXContainer>
                <div className="header">
                    <div className="battle-card-image"><BattleCardImage battleCard={selectedCardForInfo}/></div>
                    <div className="battle-card-content">
                        <div className="battle-card-name">{selectedCardForInfo.name}</div>
                        <div className="battle-card-description">{selectedCardForInfo.description || 'An ordinary monster'}</div>
                        <div className="exp-reward">
                            {getRecalculatedExpRewardString(selectedCardForInfo)}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <TabInfo selectedBattleCard={selectedCardForInfo}/>
                </div>
                <div className="actions">
                    <button className="btn" onClick={onCloseClick}>Close</button>
                </div>
            </ModalXContainer>
        </ModalX>
    );
};

const ModalXContainer = styled.div`
    .header {
        display: flex;
        font-size: 30px;
        line-height: 30px;
        
        .battle-card-image {
            width: 30%;
            margin-right: 10px;
            position: relative;
            display: flex;
        }
    }
    
    .battle-card-content {
        width: 70%;
        
        .battle-card-name {
            font-size: 50px;
            line-height: 50px;
            text-transform: capitalize;
            //margin-bottom: 10px;
        }
        
        .battle-card-description {
            
        }
    }
`;

export { ModalBattleCardInfo };
