import React, { useEffect } from 'react';
import styled from "styled-components";

const ScaleContent = ({children}: any) => {
    useEffect(() => {
        const scaleContent = () => {
            console.log('scaleContent')
            const canvas = document.getElementById('canvas');
            if (!canvas) return;

            const canvasWidth = canvas.offsetWidth;
            const canvasHeight = canvas.offsetHeight;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const scaleX = windowWidth / canvasWidth;
            const scaleY = windowHeight / canvasHeight;

            const scale = Math.min(scaleX, scaleY);

            // @ts-ignore
            canvas.style.zoom = scale;
            console.log('scale', scale)
            // canvas.style.transform = `scale(${scale})`

            document.body.style.height = `${canvasHeight * scale}px`;
        };

        // window.addEventListener('resize', scaleContent);
        window.addEventListener('orientationchange', scaleContent);
        window.addEventListener('load', scaleContent);

        scaleContent();

        return () => {
            // window.removeEventListener('resize', scaleContent);
            window.removeEventListener('orientationchange', scaleContent);
            window.removeEventListener('load', scaleContent);
        };
    }, []);

    return (
        <>
        <ScaleContentContainer id="canvas">
            { children }
        </ScaleContentContainer>
        </>
    );
};

const ScaleContentContainer = styled.div`
    width: 2540px;
    transform-origin: top left;

    @media (max-width: 800px) {
        width: 800px;
    }
`;

export { ScaleContent };
