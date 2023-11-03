import React from 'react'
import { Button } from 'semantic-ui-react'
import styled from "styled-components";

const GridLengthSwitcher = ({gridLength, setGridLength}: any) => {
    return (
        <ButtonGroupWrapper>
            <Button.Group className={`active-grid-length-${gridLength}`}>
                <Button className="grid-length-3" onClick={() => setGridLength(3)}>3</Button>
                <Button.Or />
                <Button className="grid-length-4"  onClick={() => setGridLength(4)}>4</Button>
                <Button.Or />
                <Button className="grid-length-5"  onClick={() => setGridLength(5)}>5</Button>
            </Button.Group>
        </ButtonGroupWrapper>
    )
};

const ButtonGroupWrapper = styled.div`
    text-align: center;
    margin: 10px 0;
  
    .active-grid-length-3 .grid-length-3,
    .active-grid-length-4 .grid-length-4,
    .active-grid-length-5 .grid-length-5 {
        box-shadow: 1px 1px 3px 0 black !important;
    }
`;

export { GridLengthSwitcher };