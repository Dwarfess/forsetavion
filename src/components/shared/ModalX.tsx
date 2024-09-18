import { useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import mixins from "../../mixins";

const ModalX = ({children}: any) => {
    const modalContainer = document.getElementById('canvas');

    useEffect(() => {
        const canvasEl = document.querySelector('#canvas div:first-child') as HTMLElement;
        if (canvasEl) {
            canvasEl.style.filter = 'blur(5px) grayscale(0.7)';

            return () => {
                canvasEl.style.filter = 'none';
            }
        }
    }, []);

    return <>
        {modalContainer ? (ReactDOM.createPortal(
            <ModalWrapper
                // dimmer={'blurring'}
                // closeOnEscape={false}
                // closeOnDimmerClick={false}
                // open={true}
            >
                <div className="modal">
                    { children }
                </div>
            </ModalWrapper>, modalContainer)) : <div>Oops</div>}
    </>
};

const ModalWrapper = styled.div`
    ${mixins.flexCenter};

    background-color: rgba(0, 0, 0, .6);
    width: 800px;
    height: 1400px;
    position: fixed;
    top: 0;
    left: 0;
    
    .modal {
        width: 700px;
        height: 900px;
        box-shadow: none;
        background-color: transparent;
        background-image: url("img/battle-over-modal2.png");
        background-size: cover;
        padding: 100px;
        position: relative;

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
            ${mixins.secondTextColor};
            ${mixins.mainFontFace};
            
            font-weight: bold;
            //padding: 0px 20px;
            padding: 0px;
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
            right: 100px;
        }

        .btn {
            ${mixins.classicBtn};
            
            margin: 20px auto;
            width: 250px;
            padding: 10px 0;
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
