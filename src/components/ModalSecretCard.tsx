import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal, Icon,
} from 'semantic-ui-react'
import styled from "styled-components";
import {CountdownCircleTimer} from 'react-countdown-circle-timer';

import {calculateAnswer, getEquation, resetBattleCardsAfterSecret, updateAnswer} from "./utils";
import {symbols} from "./constants";

const ModalSecretCard = ({
     battleCards,
     setBattleCards,
     isOpen,
     setIsOpen
 }: any) => {
    const [answer, setAnswer] = useState('');
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<any>(null);
    const [duration, setDuration] = useState<number>(20);

    const onButtonClick = () => {
        setBattleCards(resetBattleCardsAfterSecret(battleCards, isCorrectAnswer));
        setIsOpen(false);
    }

    const onButtonCheckClick = () => {
        setIsCorrectAnswer(answer === String(calculateAnswer(equation)));
        setDuration(0);
    }

    useEffect(() => {
        setAnswer('')
    }, [battleCards]);

    const onSymbolClick = (symbol: string) => {
        setAnswer(updateAnswer(answer, symbol));
    }

    const equation = useMemo(() => {
        return getEquation(battleCards);
    }, [battleCards]);

    const timerContent = useCallback((remainingTime: number) => {
        const iconName = isCorrectAnswer ? 'thumbs up' : 'thumbs down';
        return <>
            {isCorrectAnswer === null && remainingTime !== 0
                ? remainingTime
                : (<Icon name={iconName} className={isCorrectAnswer ? 'correct' : ''} size='large'/>)
            }
        </>
    }, [isCorrectAnswer]);

    const onCompleteTimer = useCallback(() => {
        setIsCorrectAnswer(answer === String(calculateAnswer(equation)));
    }, [answer]);

    return (
        <ModalWrapper
            dimmer={'blurring'}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={isOpen}
        >
            <ModalHeader>
                <p className="equation">
                    {equation} = <span className={isCorrectAnswer === false ? 'incorrect' : ''}>
                    {answer || '?'}
                </span> {isCorrectAnswer === false && calculateAnswer(equation)}
                </p>
            </ModalHeader>
            <ModalContent>
                <p className="level">Write correct answer and get the gift</p>

                <SymbolsAndTimerWrapper>
                    <SymbolsContainer>
                        {symbols.map((symbol: string, index: number) => {
                            return (
                                <button className="btn symbol-btn"
                                        onClick={() => onSymbolClick(symbol)}
                                        key={index}
                                >{symbol}</button>
                            );
                        })}
                    </SymbolsContainer>


                    <CountdownCircleTimerContainer>
                        <CountdownCircleTimer
                            isPlaying
                            duration={duration}
                            colors={['#3a7700', '#a36f00', '#F7B801', '#8b0000']}
                            colorsTime={[7, 5, 2, 0]}
                            trailColor={'#8b0000'}
                            onComplete={onCompleteTimer}
                        >
                            {({remainingTime}) => timerContent(remainingTime)}
                        </CountdownCircleTimer>
                    </CountdownCircleTimerContainer>
                </SymbolsAndTimerWrapper>
            </ModalContent>
            <ModalActions>
                {isCorrectAnswer === null
                    ? (<button className="btn" onClick={onButtonCheckClick}>Check</button>)
                    : (<button className="btn" onClick={onButtonClick}>Close</button>)}
            </ModalActions>
        </ModalWrapper>
    )
};

const SymbolsAndTimerWrapper = styled.div`
    width: 100%;
    display: flex;
`;

const SymbolsContainer = styled.div`
    width: 50%;
    height: max-content;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
`;

const CountdownCircleTimerContainer = styled.div`
    font-size: 50px;
    
    .icon {
        animation: slide-from 0.5s;
        text-shadow: 1px 1px 5px #ffb000;
    }

    @keyframes slide-from {
        0% {
            transform: scale(5);
        }
        100% {
            transform: scale(1);
        }
    }
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
        
        animation: slide-up 1s;

        @keyframes slide-up {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }

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
            font-size: 50px;
            
            .incorrect {
                text-decoration: line-through;
                text-decoration-color: #ffc000;
            }
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
            box-shadow: inset 0px 0px 5px 3px rgba(1, 1, 1, 0.3);
        }

        .symbol-btn {
            width: 25%;
        }

        .btn:hover {
            background: radial-gradient(circle, #e52b2b, #8b0000);
            box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
        }

        .btn:active {
            background: radial-gradient(circle, #ec6a6a, #e52b2b);
            box-shadow: 0px 0 5px 5px rgba(255, 255, 255, 0.2)
        }
    }
`;

export {ModalSecretCard};
