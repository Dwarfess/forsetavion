import styled from "styled-components";
import mixins from "../mixins";

const Options = () => {
    return <OptionsContainer>
        <div className="options-button"></div>

    </OptionsContainer>
}

const OptionsContainer = styled.div`
    //position: fixed;
    //lrft: 0;
    padding: 10px;
    
    .options-button {
        ${mixins.stretchedBackground}
        
        background-image: url("img/icon-options.png");
        width: 70px;
        height: 70px;
        transition: transform .3s ease-in-out;
        
        &:hover {
            cursor: pointer;
            transform: scale(1.1);
        }
    }
`;

export { Options };
