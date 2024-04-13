import styled from "styled-components";
import {BattleCardType, Effect} from "../types";
import BattleCardImage from "../BattleCardImage";

const EffectPanel = ({
    battleCard
}: { battleCard: BattleCardType}) => {
    return <>
        {battleCard.effects?.length ? (<EffectPanelWrapper>
            {battleCard.effects.map((effect: Effect, index: number) => {
                return  <EffectItem className="effect-item" effect-type={effect.type} key={index}>
                    <BattleCardImage battleCard={effect} radius={50}/>
                    <div className="effect-background"></div>
                </EffectItem>
            })}
        </EffectPanelWrapper>) : <></>}
    </>;
};

const EffectPanelWrapper = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10px;
`;

const EffectItem = styled.div`
    --effectColor: ${(props: any) => props['effect-type'] === 'buff' ? '34,139,34' : '255,0,0'};
    
    width: 20%;
    height: 100%;
    margin: 0 5px;
    border-radius: 50px;
    box-shadow: 0px 0px 10px 0px rgb(var(--effectColor));
    position: relative;
    animation:blinking 2s linear infinite;
    
    @keyframes blinking {
        0%, 100% {opacity: 0.5}
        50% {opacity: 0.9}
    }
    
    .effect-background {
        background: rgba(var(--effectColor), 0.4);
        border-radius: 50px;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
`;

export {EffectPanel};
