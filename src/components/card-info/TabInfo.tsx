import React, {ReactNode, useMemo, useState} from 'react'
import {TabPane, Tab} from 'semantic-ui-react'
import styled from "styled-components";
import {TabInfoCardStats} from "./TabInfoCardStats";
import {TabInfoCardItem} from "./TabInfoCardItems";

const TabInfo = ({
    heroCard,
    selectedBattleCard
}: any) => {
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
    }, [heroCard, selectedBattleCard]);

    // const panes = [
    //     {
    //         menuItem: 'Stats',
    //         render: () => <TabPane><TabInfoCardStats selectedItem={selectedBattleCard}/></TabPane>
    //     },
    //     {
    //         menuItem: 'Skills',
    //         render: () => <TabPane><TabInfoCardItem cardItems={selectedBattleCard.skills} /></TabPane>
    //     },
    //     {
    //         menuItem: 'Artifacts',
    //         render: () => <TabPane><TabInfoCardItem cardItems={selectedBattleCard.artifacts} /></TabPane>
    //     }
    // ];

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
                //text-decoration: underline;
                //text-decoration-color: #ffc000;
                //text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3,  0px 0px 3px #1A1A1A;
                //box-shadow: 0px 0px 5px 0px black !important;
            }
        }
    }
    
    .segment {
        background: rgba(0, 0, 0, .1) !important;
        border: 1px solid rgba(34,36,38,.15) !important;
        font-size: 20px;
        color: #0f3e5b !important;
        
        //.card-description {
        //    width: 100%;
        //}
        //
        //.item-stats {
        //    width: 100%;
        //    
        //    .item-stat {
        //        margin: 0;
        //        .stat-value {
        //            color: #ffc000 !important ;
        //        }   
        //    }
        //}        
    }

    //.card-items {
    //    display: flex;
    //    flex-wrap: wrap;
    //    //justify-content: center;
    //    align-items: flex-start;
    //
    //    .card-item {
    //        width: 20%;
    //        position: relative;
    //        padding: 5px;
    //    }
    //}
`;

export {TabInfo};
