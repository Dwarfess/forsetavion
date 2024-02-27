import React from 'react'
import { Button } from 'semantic-ui-react'
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { changeBattleFieldSize, RootState } from '../store';

const GridLengthSwitcher = ({gridLength, setGridLength}: any) => {

    // const count = useSelector((state: RootState) => state.battleFieldSize.value);
    const dispatch = useDispatch();

    const onButtonClick = (val: number)=> {
        dispatch(changeBattleFieldSize(val));
        // setGridLength(val);
    }

    return (
        <ButtonGroupWrapper>
            <Button.Group className={`active-grid-length-${gridLength}`}>
                <Button className="grid-length-3" onClick={() => onButtonClick(3)}>3</Button>
                <Button.Or />
                <Button className="grid-length-4"  onClick={() => onButtonClick(4)}>4</Button>
                <Button.Or />
                <Button className="grid-length-5"  onClick={() => onButtonClick(5)}>5</Button>
            </Button.Group>
        </ButtonGroupWrapper>
    )
};

const ButtonGroupWrapper = styled.div`
    width: 100%;
    text-align: center;
    padding: 10px 0;
  
    .active-grid-length-3 .grid-length-3,
    .active-grid-length-4 .grid-length-4,
    .active-grid-length-5 .grid-length-5 {
        box-shadow: 1px 1px 3px 0 black !important;
    }
`;

export { GridLengthSwitcher };
