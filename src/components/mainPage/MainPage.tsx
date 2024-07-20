import { HeroSelectionPanel } from "./HeroSelectionPanel";
import {GameSelectionPanel} from "./GameSelectionPanel";
import styled from "styled-components";
import {CharacterPanel} from "./CharacterPanel";

const MainPage = () => {

    return <MainPageContainer>
        <CharacterPanel />
        <HeroSelectionPanel>
            Test2
        </HeroSelectionPanel>
        <GameSelectionPanel />
    </MainPageContainer>
}

const MainPageContainer = styled.div`
    //margin: 0 50px;
    //background-image: url('main-bg2.png');
    //width: 415px;
    //width: 700px;
    width: auto;
    height: calc(100vh - 50px);
    //background-size: cover;
    //
    //background-size: 100% 100%; /* Stretch the image to fill the block */
    //background-repeat: no-repeat; /* Prevent the image from repeating */
    //background-position: center center; /* Center the image within the block */
`;

export { MainPage }
