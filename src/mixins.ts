import { css } from 'styled-components';

const transparentBtn = css`
    display: block;
    width: 70px;
    height: 70px;
    margin: 20px auto;

    background-color: transparent;
    background-size: cover;
    box-shadow: 0 0 10px 1px black;
    border-radius: 5px;
    z-index: 1;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 10px 2px black;
    }

    &:active {
        box-shadow: 0 0 3px 0 black;
    }
`;

export default { transparentBtn };
