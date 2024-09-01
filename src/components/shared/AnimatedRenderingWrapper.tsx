import React, {FC, useEffect, useState} from "react";
import styled from "styled-components";

interface IAnimatedRenderingWrapper {
    children: React.ReactNode;
}

const AnimatedRenderingWrapper: FC<IAnimatedRenderingWrapper> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return <>
        <AnimatedRenderingContainer className={`${isVisible ? 'is-visible' : ''}`}>
            { children }
        </AnimatedRenderingContainer>
    </>
}

const AnimatedRenderingContainer = styled.div`
    width: 100%;
    height: 100%;

    opacity: 0;
    transition: opacity .5s ease-in-out, transform 1s ease-in-out;

    &.is-visible {opacity: 1 }
`;

export { AnimatedRenderingWrapper };
