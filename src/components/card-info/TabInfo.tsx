import React, {ReactNode, useMemo } from 'react'
import {TabPane, Tab} from 'semantic-ui-react'
import styled from "styled-components";
import {TabInfoCardStats} from "./TabInfoCardStats";
import {TabInfoCardItem} from "./TabInfoCardItems";

const TabInfo = ({selectedBattleCard}: any) => {
    const panes = useMemo(() => {
        const getTabItem = (name: string, children: ReactNode) => ({
            menuItem: name,
            render: () => <TabPane>{children}</TabPane>
        });

        const tabItems = [];

        selectedBattleCard.stats?.length && tabItems.push(getTabItem('Stats', <TabInfoCardStats selectedItem={selectedBattleCard}/>));
        selectedBattleCard.skills?.length && tabItems.push(getTabItem('Skills', <TabInfoCardItem cardItems={selectedBattleCard.skills} />));
        selectedBattleCard.effects?.length && tabItems.push(getTabItem('Effects', <TabInfoCardItem cardItems={selectedBattleCard.effects} />));
        selectedBattleCard.artifacts?.length && tabItems.push(getTabItem('Artifacts', <TabInfoCardItem cardItems={selectedBattleCard.artifacts} />));

        return tabItems;
    }, [selectedBattleCard]);

    return <TabWrapper>
        <Tab panes={panes} defaultActiveIndex={0}/>
    </TabWrapper>
};

const TabWrapper = styled.div`
    .menu {
        border: none !important;
        font-size: 20px;
        
        .item {
            color: #8b0000 !important;
            padding: 0 10px !important;
            line-height: 15px !important;
            font-family: 'MagicalWorld' !important;

            border: 1px solid rgba(34, 36, 38, .15) !important;
            border-bottom: none !important;
            
            &.active {
                background: rgba(0, 0, 0, .1) !important;
                border: 1px solid rgba(34, 36, 38, .15) !important;
                border-bottom: none !important;
            }
        }
    }
    
    .segment {
        background: rgba(0, 0, 0, .1) !important;
        border: 1px solid rgba(34,36,38,.15) !important;
        font-size: 20px;
        color: #0f3e5b !important;       
    }
`;

export {TabInfo};
