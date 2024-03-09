import styled from "styled-components";
import {getHeroScore} from "./utils/utils";
import {setStateValue} from "../store/storeUtils";
import {useHeroCard} from "../store/storeHooks";
import {ModalX} from "./shared";

const ModalBattleOver = ({
    isOpen,
    setIsOpen,
}: any) => {
    const { heroCard } = useHeroCard();
    const onButtonClick = () => {
        setIsOpen(false);
        setStateValue('battleFieldLength', 0);
    }

    return (
        <ModalX>
            <ModalXContainer>
                <div className="header">The battle is over</div>
                <div className="content">
                    <p className="level">Level - {heroCard.level} (100 points)</p>
                    <p className="coins">Coins - {heroCard.coins} (5 points)</p>
                    <p className="crystal">Spheres - {heroCard.spheres} (20 points)</p>
                    <p className="score">Score - {getHeroScore(heroCard)} points</p>
                </div>
                <div className="actions">
                    <button className="btn" onClick={onButtonClick}>Again</button>
                </div>
            </ModalXContainer>
        </ModalX>
    );
};

const ModalXContainer = styled.div`
    .header {
        font-size: 50px;
        text-align: center;
    }
        
    .score {
        padding-top: 50px;
        text-align: right;
    }
`;

export { ModalBattleOver };
