import { Modal } from 'semantic-ui-react';
import styled from "styled-components";

const ModalX = ({children}: any) => {
    return (
        <ModalWrapper
            dimmer={'blurring'}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={true}
        > { children } </ModalWrapper>
    )
}

const ModalWrapper = styled(Modal)`
    &&& {
        width: 700px;
        height: 900px;
        box-shadow: none;
        background-color: transparent;
        background-image: url("battle-over-modal2.png");
        background-size: cover;
        padding: 100px;

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
            font-family: 'MagicalWorld';
            font-weight: bold;
            padding: 0px 20px;
        }

        .content, .actions { 
            font-size: 30px;
        }

        .header {
            border-bottom: 1px solid rgba(34, 36, 38, .15);
            padding-bottom: 20px;
            margin-bottom: 20px;
        }

        .actions {
            position: absolute;
            bottom: 50px;
            right: 50px;
        }

        .btn {
            margin: 10px auto;
            width: 250px;
            letter-spacing: 2px;
            border-radius: 8px;
            font-family: 'Skranji', cursive !important;
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

export { ModalX };
