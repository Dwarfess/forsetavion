import React, { memo } from 'react';
import { Button } from 'semantic-ui-react';
import styled from "styled-components";

import { useBattleFieldLength } from '../store/storeHooks';

const BattleFieldLengthSwitcher = memo(() => {
    const { battleFieldLength, setBattleFieldLength } = useBattleFieldLength();

    const onButtonClick = (val: number)=> {
        setBattleFieldLength(val);
    }

    return (
        <ButtonGroupWrapper>
            {/*<Button.Group className={`active-field-length-${battleFieldLength}`}>*/}
            {/*    <Button className="field-length-3" onClick={() => onButtonClick(3)}>3</Button>*/}
            {/*    <Button.Or />*/}
            {/*    <Button className="field-length-4" onClick={() => onButtonClick(4)}>4</Button>*/}
            {/*    <Button.Or />*/}
            {/*    <Button className="field-length-5" onClick={() => onButtonClick(5)}>5</Button>*/}
            {/*</Button.Group>*/}
            {/*<ExitButton onClick={() => onButtonClick(0)} />*/}
        </ButtonGroupWrapper>
    )
});

const ButtonGroupWrapper = styled.div`
    width: 100%;
    text-align: right;

    .active-field-length-3 .field-length-3,
    .active-field-length-4 .field-length-4,
    .active-field-length-5 .field-length-5 {
        box-shadow: 1px 1px 3px 0 black !important;
    }
`;

const ExitButton = styled.div`
    background-image: url("img/exit-button.png");
    background-size: cover;
    width: 60px;
    height: 60px;
    display: inline-block;

    &:hover { box-shadow: 0px 0px 20px 0px black }
    &:active { box-shadow: none }
`;

export { BattleFieldLengthSwitcher };
