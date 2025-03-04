import React, {useCallback, useEffect, useMemo, useState} from 'react'
import { Icon } from 'semantic-ui-react'
import styled from "styled-components";
import {CountdownCircleTimer} from 'react-countdown-circle-timer';

import {calculateAnswer, getDuration, getEquation, updateBattleCardsAfterSecret, updateAnswer} from "./utils";
import {symbols} from "./constants";
import {ModalX} from "./shared";
import { useIsAnotherPlayerActive, useSelectedSecretCard } from '../store/storeHooks';
import { updateCurrentBattleAndResetActivePlayer } from './home-map/multi-battle-page/multiBattleUtils';

const ModalSecretCard = () => {
    const { selectedSecretCard, setSelectedSecretCard } = useSelectedSecretCard();
    const [answer, setAnswer] = useState<string>('');
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<any>(null);
    const [duration, setDuration] = useState<number>(getDuration());
    const { isAnotherPlayerActive } = useIsAnotherPlayerActive();

    const onCloseClick = () => {
        updateBattleCardsAfterSecret(isCorrectAnswer);
        setSelectedSecretCard(false);
    }

    const onCheckButtonClick = () => {
        setIsCorrectAnswer(answer === String(calculateAnswer(equation)));
        setDuration(0);

        updateCurrentBattleAndResetActivePlayer({
            action: 'equationAnswer',
            switchActivePlayer: false,
            answer
        });
    }

    useEffect(() => {
        setAnswer('');
        updateCurrentBattleAndResetActivePlayer({
            action: 'selectedSecretCard',
            switchActivePlayer: false,
            battleCardFromAnotherPlayer: selectedSecretCard,
            equation
        });
    }, []);

    const onSymbolClick = (symbol: string) => {
        setAnswer((prevAnswer) => updateAnswer(prevAnswer, symbol, isCorrectAnswer));
    }

    const equation = useMemo(() => getEquation(), []);

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
        <ModalX>
            <ModalXContainer className={isAnotherPlayerActive ? 'disabled' : ''}>
                <div className="header">
                    <p className="equation">
                        {equation} = <span className={isCorrectAnswer === false ? 'incorrect' : ''}>
                        {answer || '?'}
                        </span> {isCorrectAnswer === false && calculateAnswer(equation)}
                    </p>
                </div>
                <div className="content">
                    <p className="level">Write correct answer and get the gift</p>

                    <div className="symbols-timer-container">
                        <div className="symbols-container">
                            {symbols.map((symbol: string, index: number) => {
                                return (
                                    <button className="btn symbol-btn"
                                            onClick={() => onSymbolClick(symbol)}
                                            key={index}
                                    >{symbol}</button>
                                );
                            })}
                        </div>

                        <div className="timer-container">
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
                        </div>
                    </div>
                </div>
                <div className="actions">
                    {isCorrectAnswer === null
                        ? (<button className="btn check-btn" onClick={onCheckButtonClick}>Check</button>)
                        : (<button className="btn close-btn" onClick={onCloseClick}>Close</button>)}
                </div>
            </ModalXContainer>
        </ModalX>
    );
};

const ModalXContainer = styled.div`
    &.disabled {
        .symbols-container, .actions {
            visibility: hidden;
        }
    }
    
    .header {
        font-size: 50px;
        text-align: center;
    }

    .equation {
        font-size: 50px;
        text-align: center;
        
        .incorrect {
            text-decoration: line-through;
            text-decoration-color: #ffc000;
        }
    }
    
    .symbols-timer-container {
        width: 100%;
        display: flex;

        .symbols-container {
            width: 50%;
            height: max-content;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;

            .btn.symbol-btn {
                width: 25%;
                margin: 10px;
            }
        }
    }
    
    .timer-container {
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
    }
`;

export {ModalSecretCard};
