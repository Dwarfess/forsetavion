import React, {useMemo, useState} from 'react'
import {TabPane, Tab} from 'semantic-ui-react'
import styled from "styled-components";
import {Stat} from "../types";
import BattleCardImage from "../BattleCardImage";

const TabInfoCardStats = ({
    selectedItem
}: any) => {
    return <TabInfoDescriptionWrapper>
        {/*<p className="card-description">*/}
        {/*    {selectedItem.description || 'An ordinary monster'}*/}
        {/*</p>*/}
        <div className="item-stats">
            {selectedItem.stats?.map((stat: Stat, index: number) => {
                return <p className="item-stat" key={index}>{stat.title}:
                    <span className="item-stat-value"> {stat.value}</span>
                </p>
            })}
        </div>
    </TabInfoDescriptionWrapper>
};

const TabInfoDescriptionWrapper = styled.div`
    //background: rgba(0, 0, 0, .1) !important;
    //border: 1px solid rgba(34, 36, 38, .15) !important;
    font-size: 25px;
    color: #8b0000; !important;
    //color: #0f3e5b !important;

    .card-description {
        width: 100%;
    }

    .item-stats {
        width: 100%;
        font-size: 20px;

        .item-stat {
            margin: 0;

            .item-stat-value {
                color: #ffc000 !important;
                text-shadow: 0px 0px 3px #1A1A1A, 0px 0px 3px #E3E3E3,  0px 0px 3px #1A1A1A;
            }
        }
    }
`;

export {TabInfoCardStats};