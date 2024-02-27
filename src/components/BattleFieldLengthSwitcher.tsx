import React, { memo } from 'react';
import { Button } from 'semantic-ui-react';
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { changeBattleFieldLength, RootState } from '../store';

const BattleFieldLengthSwitcher = memo(() => {
    const battleFieldLength = useSelector((state: RootState) => state.battleFieldLength.value);
    const dispatch = useDispatch();

    const onButtonClick = (val: number)=> {
        dispatch(changeBattleFieldLength(val));
    }

    return (
        <ButtonGroupWrapper>
            <Button.Group className={`active-field-length-${battleFieldLength}`}>
                <Button className="field-length-3" onClick={() => onButtonClick(3)}>3</Button>
                <Button.Or />
                <Button className="field-length-4" onClick={() => onButtonClick(4)}>4</Button>
                <Button.Or />
                <Button className="field-length-5" onClick={() => onButtonClick(5)}>5</Button>
            </Button.Group>
        </ButtonGroupWrapper>
    )
});

const ButtonGroupWrapper = styled.div`
    width: 100%;
    text-align: center;
    padding: 10px 0;
  
    .active-field-length-3 .field-length-3,
    .active-field-length-4 .field-length-4,
    .active-field-length-5 .field-length-5 {
        box-shadow: 1px 1px 3px 0 black !important;
    }
`;

export { BattleFieldLengthSwitcher };
