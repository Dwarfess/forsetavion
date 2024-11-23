import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {Tab} from "semantic-ui-react";
import mixins from "../../../mixins";
import {Leaderboard} from "./Leaderboard";
import {ICharacter} from "../character-page/types";
import {useAuthApiUtils} from "../register-page/useAuthApiUtils";

const LeaderboardsPage = () => {
    const { getAllCharacters } = useAuthApiUtils();
    const [characterList, setCharacterList] = useState<ICharacter[]>([]);

    useEffect(() => {
        updateCharacterList();
    }, []);

    const updateCharacterList = () => {
        getAllCharacters(setCharacterList);
    }

    const panes = [
        { menuItem: 'Score', render: () => <Leaderboard
                characterList={characterList}
                type="score"
            />
        },
        { menuItem: 'Money', render: () => <Leaderboard
                characterList={characterList}
                type="coins"
            />
        },
    ];

    return <LeaderboardsContainer>
            <Tab panes={panes} defaultActiveIndex={0}/>
        </LeaderboardsContainer>
}

const LeaderboardsContainer = styled.div`
    ${mixins.stretchedBackground}
    
    background-image: url("img/leaderboards-bg2.png");
    margin-top: 100px;
    width: 100%;
    height: 1200px;
    padding: 110px;
    box-sizing: border-box;

    .menu {
        border: none !important;
        margin-bottom: 50px !important;

        .item {
            ${mixins.firstTextColor};

            width: 50%;
            justify-content: center;
            font-size: 60px;
            background-color: rgba(0, 0, 0, 0.2) !important;

            border: 1px solid rgba(0, 0, 0, 0.2) !important;
            border-radius: 5px;
            margin: 0 !important;
            padding: 20px !important;

            &.active {
                background-color: transparent !important;
            }
        }
    }
`;

export { LeaderboardsPage };
