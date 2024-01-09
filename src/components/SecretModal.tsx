import React, {useMemo, useState} from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal,
} from 'semantic-ui-react'
import styled from "styled-components";
import {getEquation, getHeroScore, updateAnswer} from "./utils";

const SecretModal = ({
     heroCard,
     battleCards,
     setBattleCards,
     isOpen,
     setIsOpen
 }: any) => {
    const [answer, setAnswer] = useState('');
    const symbols = ['1','2','3','4','5','6','7','8','9','0', '.', '←'];
    const onButtonClick = () => {
        setIsOpen(false);
    }

    const onSymbolClick = (symbol: string) => {
        console.log(symbol);
        setAnswer(updateAnswer(answer, symbol));
    }

    const equation = useMemo(() => {
        return getEquation(battleCards);
    }, [battleCards]);

    return (
        <ModalWrapper
            dimmer={'blurring'}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={isOpen}
            // onOpen={() => setIsOpen(true)}
            // onClose={() => setIsOpen(false)}
            // trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Secret</ModalHeader>
            <ModalContent>
                <p className="level">Write correct answer and get the gift</p>
                <p className="equation">{equation}{answer}</p>

                <NumberContainer>
                    {symbols.map((symbol: string, index: number) => {
                        return (
                            <button className="btn symbol-btn"
                                   onClick={() => onSymbolClick(symbol)}
                                   key={index}
                            >{symbol}</button>
                        );
                    })}
                </NumberContainer>
            </ModalContent>
            <ModalActions>
                <button className="btn" onClick={onButtonClick}>Again</button>
            </ModalActions>
        </ModalWrapper>
    )
}

const NumberContainer = styled.div`
    width: 50%;
    height: max-content;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
`;

const ModalWrapper = styled(Modal)`
    &&& {
        width: 700px;
        height: 700px;
        box-shadow: none;
        background-color: transparent;
        background-image: url("battle-over-modal.png");
        background-size: cover;
        padding: 60px 100px;
        
        .header, .content, .actions {
            color: #8b0000;
            background: transparent;
            font-size: 30px;
            font-family: 'MagicalWorld';
            font-weight: bold;
        }
        
        .header {
            font-size: 50px;
            text-align: center;
        }
        
        .equation {
            font-size: 40px;
        }
        
        .btn {
            margin: 10px auto;
            width: 250px;
            letter-spacing: 2px;
            border-radius: 8px;
            font-family: 'Skranji', cursive;
            color: #ffc000;
            font-size: 18px;
            font-weight: 400;
            text-shadow: 0 1px 3px #000;
            text-align: center;
            padding: 10px 0;
            background: radial-gradient(circle, #8b0000, #8b0000);
            border-top: 4px ridge #ffb000;
            border-left: 4px groove #ffb000;
            border-right: 4px ridge #ffb000;
            border-bottom: 4px groove #ffb000;
            box-shadow: inset 0px 0px 5px 3px rgba(1,1,1,0.3);
        }
        
        .symbol-btn {
            width: 30%;
        }

        .btn:hover{
            background: radial-gradient(circle, #e52b2b, #8b0000);
            box-shadow: 0px 0 5px 5px rgba(255,255,255,0.2)
        }

        .btn:active{
            background: radial-gradient(circle, #ec6a6a, #e52b2b);
            box-shadow: 0px 0 5px 5px rgba(255,255,255,0.2)
        }
    }
`;

export { SecretModal };