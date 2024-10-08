import React, { useState, useEffect } from 'react';
import { Progress } from 'semantic-ui-react';
import styled from "styled-components";
import mixins from "../../mixins";
import {useActivePage} from "../../store/storeHooks";

const LoadingPage = () => {
    const { setActivePage } = useActivePage();

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 100 : prevProgress + 1
            );
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                setActivePage('registration-page');
            }, 1000);
        }
    }, [progress])

    // useEffect(() => {
    //     if (progress === 1) {
    //         const audio = new Audio('/sounds/track.mp3');
    //         audio.loop = true;  // Додаємо безперервне відтворення
    //
    //         // Спроба автоматичного запуску
    //         audio.play().catch((error) => {
    //             console.log('Автоматичне відтворення заблоковане: ', error);
    //         });
    //     }
    // }, [progress]);

    return (
        <LoadingContainer>
            <h1>Sertavion</h1>
            <div className="loading-container">

                <Progress percent={progress}
                          size='big'
                          color='orange'
                          progress
                />
            </div>
        </LoadingContainer>
    );
};

const LoadingContainer = styled.div`
    ${mixins.stretchedBackground}
    
    background-image: url("img/bg-loading.jpg");
    width: 100%;
    height: 100%;
    padding: 50px 0;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: space-between;   
    
    h1 {
        ${mixins.modernH1}
    }

    .loading-container {
        //border: 1px solid red;
        //width: 60%;
        //margin: 0 auto;
        //display: flex;
        //alignItems: center;
        //justifyContent: center;
        //background: #f4f4f4;
        .bar {
            opacity: .8;
            //height: 50px !important;
            .progress {
                //right: 50% !important;
                //left: 50%;
                font-size: 30px;
            }
        }
    }
`;

export  { LoadingPage };
